import { InteractionCommand } from "../contracts/core-contracts.js";
import {
  LearnerEvidence,
  LearnerRecord,
  learnerRecord,
} from "../domain/learner-record.js";
import { DomainValidationError, readonlyList, StableId } from "../domain/primitives.js";
import { EngineExecutionResult } from "./engine.js";

export interface LearnerRecordEvolutionResult {
  readonly disposition: "evolved" | "unchanged";
  readonly learnerRecord: LearnerRecord;
  readonly addedEvidenceIds: readonly StableId[];
  readonly addedEventIds: readonly StableId[];
  readonly addedInterpretationIds: readonly StableId[];
  readonly addedCommitmentIds: readonly StableId[];
  readonly reason?: string;
}

function commandEvidence(command: InteractionCommand): LearnerEvidence | undefined {
  switch (command.kind) {
    case "submit-reflection":
      return command.reflection;
    case "submit-practice-attempt":
      return command.practiceAttempt;
    case "submit-confidence-report":
      return command.confidenceReport;
    case "submit-learning-context":
      return command.learningContextReport;
    case "submit-learner-choice":
      return command.learnerChoice;
    // These carry no learner-authored evidence. Named explicitly rather than
    // caught by a default, so a new command kind cannot be silently treated as
    // evidence-free -- which would drop a learner's own words on the floor.
    case "explore-concept":
    case "request-alternative-representation":
    case "request-learning-guidance":
      return undefined;
    default: {
      const unhandled: never = command;
      throw new DomainValidationError(
        `Interaction command kind is not classified for evidence: ${JSON.stringify(unhandled)}`,
      );
    }
  }
}

function appendIfAbsent<T extends { readonly id: StableId }>(items: readonly T[], item: T): readonly T[] {
  return items.some((candidate) => candidate.id === item.id)
    ? readonlyList(items)
    : readonlyList([...items, item]);
}

/**
 * Applies a newly planned, validated effect to an in-memory domain record. This
 * is deterministic domain evolution, not persistence: the caller owns the
 * returned immutable record. A replayed command returns the original record so
 * that it cannot duplicate evidence, commitments, or historical events.
 */
export function evolveLearnerRecord(
  record: LearnerRecord,
  command: InteractionCommand,
  execution: EngineExecutionResult,
): LearnerRecordEvolutionResult {
  if (command.commandReference !== execution.idempotency.outcome.commandReference ||
      command.learnerId !== execution.idempotency.outcome.learnerId) {
    throw new DomainValidationError("Learner-record evolution requires the command that produced the execution outcome.");
  }
  if (execution.idempotency.disposition === "replayed") {
    return Object.freeze({
      disposition: "unchanged",
      learnerRecord: record,
      addedEvidenceIds: readonlyList([]),
      addedEventIds: readonlyList([]),
      addedInterpretationIds: readonlyList([]),
      addedCommitmentIds: readonlyList([]),
      reason: "A replayed command outcome cannot apply a second learner-record effect.",
    });
  }
  if (execution.transition.kind !== "committed") {
    const unchanged = Object.freeze({
      disposition: "unchanged" as const,
      learnerRecord: record,
      addedEvidenceIds: readonlyList([]),
      addedEventIds: readonlyList([]),
      addedInterpretationIds: readonlyList([]),
      addedCommitmentIds: readonlyList([]),
      reason: execution.transition.reason,
    });

    // O9. A learner action that plans no state change is still something the
    // learner did, and it is kept. Only when the action stands: an incomplete
    // or prohibited context is not the learner acting, and must write nothing.
    if (execution.transition.learnerAction !== "learner-action-stands") {
      return unchanged;
    }

    const acted = commandEvidence(command);
    const evidence = acted === undefined
      ? readonlyList(record.evidence)
      : appendIfAbsent(record.evidence, acted);
    const events = execution.events.reduce(
      (accumulated, event) => appendIfAbsent(accumulated, event),
      readonlyList(record.events),
    );
    if (evidence.length === record.evidence.length && events.length === record.events.length) {
      return unchanged;
    }

    return Object.freeze({
      disposition: "evolved",
      learnerRecord: learnerRecord({
        learnerId: record.learnerId,
        evidence,
        events,
        interpretations: record.interpretations,
        state: record.state,
        commitments: record.commitments,
      }),
      addedEvidenceIds: readonlyList(acted === undefined ? [] : [acted.id]),
      addedEventIds: readonlyList(execution.events.map((event) => event.id)),
      addedInterpretationIds: readonlyList([]),
      addedCommitmentIds: readonlyList([]),
      reason: execution.transition.reason,
    });
  }

  const commitment = execution.transition.commitment;
  const submittedEvidence = commandEvidence(command);
  const evidence = submittedEvidence === undefined
    ? readonlyList(record.evidence)
    : appendIfAbsent(record.evidence, submittedEvidence);
  const events = execution.events.reduce(
    (accumulated, event) => appendIfAbsent(accumulated, event),
    readonlyList(record.events),
  );
  const commitments = appendIfAbsent(record.commitments, commitment);
  const interpretations = execution.derivedInterpretations.reduce(
    (accumulated, interpretation) => appendIfAbsent(accumulated, interpretation),
    readonlyList(record.interpretations),
  );
  const evolved = learnerRecord({
    learnerId: record.learnerId,
    evidence,
    events,
    interpretations,
    state: execution.transition.nextState,
    commitments,
  });

  return Object.freeze({
    disposition: "evolved",
    learnerRecord: evolved,
    addedEvidenceIds: submittedEvidence === undefined || record.evidence.some((item) => item.id === submittedEvidence.id)
      ? readonlyList([])
      : readonlyList([submittedEvidence.id]),
    addedEventIds: readonlyList(execution.events.filter((event) => !record.events.some((item) => item.id === event.id)).map((event) => event.id)),
    addedInterpretationIds: readonlyList(execution.derivedInterpretations
      .filter((interpretation) => !record.interpretations.some((item) => item.id === interpretation.id))
      .map((interpretation) => interpretation.id)),
    addedCommitmentIds: record.commitments.some((item) => item.id === commitment.id)
      ? readonlyList([])
      : readonlyList([commitment.id]),
  });
}
