import { decisionProvenance, provenanceReference } from "../src/domain/provenance.js";
import {
  confidenceReport,
  currentLearnerState,
  derivedInterpretation,
  DerivedInterpretation,
  historicalEvent,
  HistoricalEvent,
  learnerChoice,
  LearnerEvidence,
  LearnerRecord,
  learnerRecord,
  learnerReflection,
  learnerStateDelta,
  StateCommitment,
  stateCommitment,
} from "../src/domain/learner-record.js";
import { DomainValidationError, isoTimestamp } from "../src/domain/primitives.js";
import { replayLearnerHistory } from "../src/decisioning/replay.js";

/**
 * What a stored learner record looks like, and how to read one back.
 *
 * Shared by the terminal, which keeps it in a file, and the browser, which
 * keeps it in local storage. Only where the bytes live differs; what counts as
 * a valid record must not, or the two surfaces would drift into disagreeing
 * about the same person's history.
 *
 * The stored form is never trusted. What is written is the causal history; the
 * learner's state is reconstructed from it by `replayLearnerHistory` on every
 * load. A stored state could disagree with the events that produced it, and a
 * derived one cannot. Nothing enters the domain without passing through a
 * domain constructor, so a stored record cannot introduce something the engine
 * would have refused to create.
 */

const FORMAT = "math-lumina.learner-record.v1";

export type LoadResult =
  | { readonly kind: "none" }
  | { readonly kind: "loaded"; readonly record: LearnerRecord }
  | { readonly kind: "unreadable"; readonly reason: string };

function object(value: unknown, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new DomainValidationError(`${what} is not an object.`);
  }
  return value as Record<string, unknown>;
}

function array(value: unknown, what: string): readonly unknown[] {
  if (!Array.isArray(value)) throw new DomainValidationError(`${what} is not a list.`);
  return value;
}

function text(value: unknown, what: string): string {
  if (typeof value !== "string") throw new DomainValidationError(`${what} is not text.`);
  return value;
}

function optionalText(value: unknown, what: string): string | undefined {
  return value === undefined ? undefined : text(value, what);
}

function texts(value: unknown, what: string): readonly string[] {
  return array(value, what).map((item) => text(item, `${what} entry`));
}

function readProvenance(value: unknown, what: string): ReturnType<typeof decisionProvenance> {
  const source = object(value, what);
  const uncertainty = object(source.uncertainty, `${what} uncertainty`);
  return decisionProvenance({
    id: text(source.id, `${what} identifier`),
    references: array(source.references, `${what} references`).map((entry) => {
      const reference = object(entry, `${what} reference`);
      return provenanceReference(
        text(reference.kind, `${what} reference kind`) as Parameters<typeof provenanceReference>[0],
        text(reference.id, `${what} reference identifier`),
      );
    }),
    uncertainty: {
      level: text(uncertainty.level, `${what} uncertainty level`) as "low" | "medium" | "high" | "unknown",
      rationale: text(uncertainty.rationale, `${what} uncertainty rationale`),
    },
    rationale: text(source.rationale, `${what} rationale`),
  });
}

function readEvidence(value: unknown): LearnerEvidence {
  const source = object(value, "Stored evidence");
  const kind = text(source.kind, "Stored evidence kind");
  if (kind === "reflection") {
    return learnerReflection({
      id: text(source.id, "Stored reflection identifier"),
      learnerId: text(source.learnerId, "Stored reflection learner"),
      conceptId: text(source.conceptId, "Stored reflection concept"),
      originalText: text(source.originalText, "Stored reflection text"),
      submittedAt: isoTimestamp(text(source.submittedAt, "Stored reflection timestamp")),
    });
  }
  if (kind === "learner-choice") {
    const offerId = optionalText(source.offerId, "Stored choice offer");
    return learnerChoice({
      id: text(source.id, "Stored choice identifier"),
      learnerId: text(source.learnerId, "Stored choice learner"),
      choiceKind: text(source.choiceKind, "Stored choice kind") as Parameters<typeof learnerChoice>[0]["choiceKind"],
      ...(offerId === undefined ? {} : { offerId }),
      chosenAt: isoTimestamp(text(source.chosenAt, "Stored choice timestamp")),
    });
  }
  if (kind === "confidence-report") {
    return confidenceReport({
      id: text(source.id, "Stored confidence identifier"),
      learnerId: text(source.learnerId, "Stored confidence learner"),
      conceptId: text(source.conceptId, "Stored confidence concept"),
      reportedValue: text(source.reportedValue, "Stored confidence value"),
      scaleLabel: text(source.scaleLabel, "Stored confidence scale"),
      reportedAt: isoTimestamp(text(source.reportedAt, "Stored confidence timestamp")),
    });
  }
  // Only the kinds a Lumina surface actually writes are read back. Anything
  // else was not put there by this program, and is refused rather than guessed.
  throw new DomainValidationError(`Stored evidence of kind '${kind}' is not something Lumina wrote.`);
}

function readInterpretation(value: unknown): DerivedInterpretation {
  const source = object(value, "Stored interpretation");
  return derivedInterpretation({
    id: text(source.id, "Stored interpretation identifier"),
    kind: text(source.kind, "Stored interpretation kind") as Parameters<typeof derivedInterpretation>[0]["kind"],
    learnerId: text(source.learnerId, "Stored interpretation learner"),
    conceptId: text(source.conceptId, "Stored interpretation concept"),
    summary: text(source.summary, "Stored interpretation summary"),
    evidenceIds: texts(source.evidenceIds, "Stored interpretation evidence"),
    provenance: readProvenance(source.provenance, "Stored interpretation provenance"),
  });
}

function readEvent(value: unknown): HistoricalEvent {
  const source = object(value, "Stored event");
  const optional = {
    interactionCommandId: optionalText(source.interactionCommandId, "Stored event command"),
    learningDecisionId: optionalText(source.learningDecisionId, "Stored event decision"),
    provenanceId: optionalText(source.provenanceId, "Stored event provenance"),
    contextVersion: optionalText(source.contextVersion, "Stored event context version"),
    conceptId: optionalText(source.conceptId, "Stored event concept"),
    evidenceId: optionalText(source.evidenceId, "Stored event evidence"),
    stateCommitmentId: optionalText(source.stateCommitmentId, "Stored event commitment"),
  };
  return historicalEvent({
    id: text(source.id, "Stored event identifier"),
    kind: text(source.kind, "Stored event kind") as HistoricalEvent["kind"],
    learnerId: text(source.learnerId, "Stored event learner"),
    occurredAt: isoTimestamp(text(source.occurredAt, "Stored event timestamp")),
    ...Object.fromEntries(Object.entries(optional).filter(([, item]) => item !== undefined)),
  });
}

type DeltaInput = Parameters<typeof learnerStateDelta>[0];

function readDelta(delta: Record<string, unknown>): ReturnType<typeof learnerStateDelta> {
  const focus = delta.engagementFocus as DeltaInput["engagementFocus"];
  const concept = delta.activeConcept as DeltaInput["activeConcept"];
  const layer = delta.activePedagogicalLayer as DeltaInput["activePedagogicalLayer"];
  return learnerStateDelta({
    ...(focus === undefined ? {} : { engagementFocus: focus }),
    ...(concept === undefined ? {} : { activeConcept: concept }),
    ...(layer === undefined ? {} : { activePedagogicalLayer: layer }),
    evidenceIdsToAdd: texts(delta.evidenceIdsToAdd ?? [], "Stored commitment evidence additions"),
    interpretationIdsToAdd: texts(
      delta.interpretationIdsToAdd ?? [],
      "Stored commitment interpretation additions",
    ),
  });
}

function readCommitment(value: unknown): StateCommitment {
  const source = object(value, "Stored commitment");
  const authorization = object(source.authorization, "Stored commitment authorization");
  return stateCommitment({
    id: text(source.id, "Stored commitment identifier"),
    learnerId: text(source.learnerId, "Stored commitment learner"),
    authorization: authorization as unknown as Parameters<typeof stateCommitment>[0]["authorization"],
    learningDecisionId: text(source.learningDecisionId, "Stored commitment decision"),
    contextVersion: text(source.contextVersion, "Stored commitment context version"),
    changedDimensions: texts(source.changedDimensions, "Stored commitment dimensions"),
    stateDelta: readDelta(object(source.stateDelta, "Stored commitment delta")),
    committedAt: isoTimestamp(text(source.committedAt, "Stored commitment timestamp")),
    provenance: readProvenance(source.provenance, "Stored commitment provenance"),
  });
}

/** The stored form. The learner's state is deliberately absent; it is derived. */
export function encodeRecord(record: LearnerRecord): string {
  return `${JSON.stringify(
    {
      format: FORMAT,
      learnerId: record.learnerId,
      evidence: record.evidence,
      interpretations: record.interpretations,
      events: record.events,
      commitments: record.commitments,
    },
    undefined,
    2,
  )}\n`;
}

/** Reads a stored record and rebuilds the learner's state from its own history. */
export function decodeRecord(raw: string): LoadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return { kind: "unreadable", reason: `it is not readable JSON (${describe(error)})` };
  }

  try {
    const source = object(parsed, "Stored record");
    const format = text(source.format, "Stored record format");
    if (format !== FORMAT) {
      return { kind: "unreadable", reason: `it is in format '${format}', which this version does not read` };
    }

    const learnerId = text(source.learnerId, "Stored record learner");
    const evidence = array(source.evidence, "Stored evidence").map(readEvidence);
    const interpretations = array(source.interpretations, "Stored interpretations").map(readInterpretation);
    const events = array(source.events, "Stored events").map(readEvent);
    const commitments = array(source.commitments, "Stored commitments").map(readCommitment);

    const replay = replayLearnerHistory({
      initialState: currentLearnerState({ learnerId, engagementFocus: "unobserved" }),
      events,
      commitments,
    });

    return {
      kind: "loaded",
      record: learnerRecord({
        learnerId: replay.reconstructedState.learnerId,
        evidence,
        events,
        interpretations,
        state: replay.reconstructedState,
        commitments,
      }),
    };
  } catch (error) {
    return { kind: "unreadable", reason: describe(error) };
  }
}

export function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
