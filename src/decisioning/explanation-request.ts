import { aiProposalAcceptancePolicy } from "../governance/proposal-policy.js";
import { evaluateGovernance } from "../governance/authorization.js";
import { IsoTimestamp, PolicyVersionRef, StableId, UncertaintyLevel } from "../domain/primitives.js";
import {
  ReasoningPort,
  ReasoningTask,
  reasoningTask,
} from "../contracts/reasoning-port.js";

/**
 * Asking a model to put a mathematical idea another way, and deciding whether
 * what comes back may be shown. Phase 5b.
 *
 * This is a sibling of the deterministic engine, not a stage inside it.
 * `executeDeterministicLearningInteraction` stays deterministic and its
 * `reasoningInvolved` stays the literal `false`, because nothing a model
 * produces here reaches a decision, an offer, a commitment, or a learner's
 * record. The plan written before Phase 3 expected reasoning to become a field
 * the engine computes; putting it there would have meant widening a type that
 * currently proves the engine cannot involve a model, in exchange for a field
 * that would always be false. The guarantee is worth more than the field.
 *
 * What a learner gets from this path is words on a screen, once, because they
 * asked. Nothing is stored, nothing is inferred, and nothing about where they
 * are changes.
 *
 * **No learner-owned material can travel this way, and not because the caller
 * is careful.** There is no parameter for it. The task is built here with an
 * empty evidence scope, so a caller holding a learner's reflections has nothing
 * to pass them through — the same shape as `ConceptContent`, which prevents the
 * same thing by having no field for it.
 */

export type ExplanationOutcome =
  | {
      readonly kind: "explained";
      /** The model's words, admitted by policy. Never presented as Lumina's own. */
      readonly summary: string;
      readonly uncertaintyLevel: UncertaintyLevel;
      readonly uncertaintyRationale: string;
      readonly conceptId: StableId;
      readonly proposalId: StableId;
      /** Attribution taken from the minted token, never from anything the proposal said. */
      readonly policyId: StableId;
      readonly policyVersion: PolicyVersionRef;
    }
  | {
      /** Governance refused it. The learner is told, and shown nothing. */
      readonly kind: "refused";
      readonly reasons: readonly string[];
    }
  | {
      /** The provider was asked and produced nothing usable. */
      readonly kind: "no-proposal";
    }
  | {
      /** No provider is configured. The ordinary case, and not an error. */
      readonly kind: "unavailable";
    };

/**
 * Builds the task for an explanation request.
 *
 * Exported so a test can assert what it contains rather than trusting a comment:
 * one concept, the kind that says nothing about a learner, and an evidence scope
 * that is empty because there is no way to make it anything else.
 */
export function explanationTask(input: {
  readonly id: string;
  readonly conceptId: string;
  readonly requestedAt: IsoTimestamp;
}): ReasoningTask {
  return reasoningTask({
    id: input.id,
    kind: "explanation-generation",
    conceptIds: [input.conceptId],
    // Empty, always. An explanation of a mathematical idea needs nothing a
    // learner wrote, so nothing a learner wrote is put in reach of it.
    permittedEvidenceIds: [],
    permittedBasisIds: [input.conceptId],
    requestedAt: input.requestedAt,
    purpose: "Offer another way to describe a mathematical idea to a learner who asked for one.",
  });
}

export async function requestExplanation(input: {
  /** Absent when no provider is configured, which is the default. */
  readonly port: ReasoningPort | undefined;
  readonly taskId: string;
  readonly conceptId: string;
  readonly requestedAt: IsoTimestamp;
}): Promise<ExplanationOutcome> {
  if (input.port === undefined) {
    return Object.freeze({ kind: "unavailable" as const });
  }

  const task = explanationTask({
    id: input.taskId,
    conceptId: input.conceptId,
    requestedAt: input.requestedAt,
  });

  const proposal = await input.port.propose(task);
  if (proposal === undefined) {
    return Object.freeze({ kind: "no-proposal" as const });
  }

  const governance = evaluateGovernance({
    task,
    proposal,
    policyId: aiProposalAcceptancePolicy.id,
    authorizedAt: input.requestedAt,
  });

  if (governance.kind === "refused") {
    // A7. Refused means nothing is shown, not that something is shown with a
    // warning attached to it.
    return Object.freeze({ kind: "refused" as const, reasons: governance.reasons });
  }

  return Object.freeze({
    kind: "explained" as const,
    summary: proposal.summary,
    uncertaintyLevel: proposal.uncertainty.level,
    uncertaintyRationale: proposal.uncertainty.rationale,
    conceptId: task.conceptIds[0] as StableId,
    proposalId: proposal.id,
    // Read off the minted token. The proposal's own words about its standing
    // are worth nothing, and O7 refuses them before they get this far.
    policyId: governance.action.policyId,
    policyVersion: governance.action.policyVersion,
  });
}
