import { PolicyEvaluation } from "../contracts/core-contracts.js";
import { ReasoningTaskKind } from "../contracts/reasoning-port.js";
import { ProvenanceReferenceKind } from "../domain/provenance.js";
import { StateCommitment } from "../domain/learner-record.js";
import { DomainValidationError } from "../domain/primitives.js";
import { kernelPolicyEvaluation, PolicyDefinition, policyDefinition } from "../domain/policy-governance.js";

/**
 * Concrete policies for the two `PolicyScope` members that were declared with
 * nothing behind them, and the envelope that binds what each policy permits.
 */

// ---------------------------------------------------------------------------
// Classification of reasoning task kinds
// ---------------------------------------------------------------------------

export type ProposalKindClass =
  /** Produces material a learner reads. Makes no claim about them, changes no state. */
  | "learner-facing-material"
  /** Interprets or judges the learner. Assessment authority is open (OPEN.md O4). */
  | "claim-about-learner"
  /** Shapes what a learner is offered next, which bears on autonomy (A2) and O5. */
  | "shapes-what-is-offered"
  /** Produces material whose outcome would be treated as evidence; sufficiency unsettled. */
  | "produces-evidence";

export interface ProposalKindClassification {
  readonly kindClass: ProposalKindClass;
  readonly reason: string;
}

/**
 * Every ReasoningTaskKind must be classified. The `never` assertion makes the
 * switch exhaustive, so a new task kind cannot be added without an explicit
 * decision about whether machine material of that kind may reach a learner.
 * The unclassified default is deliberately the restrictive one.
 */
export function classifyProposalKind(kind: ReasoningTaskKind): ProposalKindClassification {
  switch (kind) {
    case "explanation-generation":
      return Object.freeze({
        kindClass: "learner-facing-material",
        reason: "Restates a mathematical idea. Says nothing about the learner.",
      });
    case "representation-generation":
      return Object.freeze({
        kindClass: "learner-facing-material",
        reason: "Offers another form of the same content. Says nothing about the learner.",
      });
    case "dialogue-assistance":
      return Object.freeze({
        kindClass: "learner-facing-material",
        reason: "Responds to what a learner asked. Carries no conclusion about them.",
      });
    case "reflection-analysis":
      return Object.freeze({
        kindClass: "claim-about-learner",
        reason: "Interprets learner-owned evidence. Interpretation of a person is not admitted while O4 stands.",
      });
    case "misconception-hypothesis":
      return Object.freeze({
        kindClass: "claim-about-learner",
        reason: "A claim about a learner's understanding. Assessment authority is open (O4).",
      });
    case "practice-generation":
      return Object.freeze({
        kindClass: "produces-evidence",
        reason: "Produces material whose outcome would be treated as evidence; sufficiency is unsettled.",
      });
    case "adaptive-path-suggestion":
      return Object.freeze({
        kindClass: "shapes-what-is-offered",
        reason: "Shapes what a learner is offered next, bearing on autonomy (A2) and prerequisites (O5).",
      });
    default: {
      const unclassified: never = kind;
      throw new DomainValidationError(`Reasoning task kind is not classified: ${String(unclassified)}`);
    }
  }
}

const ALL_TASK_KINDS: readonly ReasoningTaskKind[] = Object.freeze([
  "reflection-analysis",
  "explanation-generation",
  "representation-generation",
  "misconception-hypothesis",
  "practice-generation",
  "adaptive-path-suggestion",
  "dialogue-assistance",
]);

/**
 * Derived, never hand-listed. Only `learner-facing-material` is admissible, so
 * the list cannot drift from the classifications that justify it.
 */
export const admissibleProposalKinds: readonly ReasoningTaskKind[] = Object.freeze(
  ALL_TASK_KINDS.filter((kind) => classifyProposalKind(kind).kindClass === "learner-facing-material"),
);

// ---------------------------------------------------------------------------
// Classification of provenance reference kinds
// ---------------------------------------------------------------------------

export type ProvenanceClass =
  /** Legitimately prior to a proposal; may be claimed as its basis. */
  | "upstream-basis"
  /** At or after policy evaluation; citing it reads as approval not yet given. */
  | "downstream-stage"
  /** Actor or authority context; citing it implies standing a proposal lacks. */
  | "authority-context"
  /** Assessment; O4 is open and A5 bars AI assessment outright. */
  | "assessment";

/**
 * Exhaustive by the same discipline. A new provenance reference kind cannot be
 * added without deciding whether a proposal may claim it as its own basis.
 */
export function classifyProvenanceReference(kind: ProvenanceReferenceKind): ProvenanceClass {
  switch (kind) {
    case "learner-evidence":
    case "knowledge":
    case "knowledge-version":
    case "pedagogical-rule":
    case "historical-event":
    case "derived-interpretation":
    case "learning-experience":
    case "learning-experience-version":
    case "delivery-capability":
    case "delivery-compatibility":
      return "upstream-basis";
    case "policy":
    case "learning-decision":
    case "reasoning-proposal":
      return "downstream-stage";
    case "interaction-command":
    case "trusted-actor-context":
      return "authority-context";
    case "assessment-boundary":
    case "assessment-evidence":
      return "assessment";
    default: {
      const unclassified: never = kind;
      throw new DomainValidationError(`Provenance reference kind is not classified: ${String(unclassified)}`);
    }
  }
}

export type ProvenanceScope =
  /** About a specific learner. Must fall within the task's permitted evidence scope. */
  | "learner-scoped"
  /** Content or pedagogy. Must fall within the task's permitted basis. */
  | "content-scoped"
  /** Capability description. Must fall within the task's permitted basis. */
  | "delivery-context"
  /** Downstream, authority, or assessment. Refused outright; never a basis. */
  | "not-a-basis";

/**
 * Whose scope a reference falls in, and therefore what it must be checked
 * against.
 *
 * Hostile testing found that only `learner-evidence` was scope-checked, while
 * `derived-interpretation` and `historical-event` are equally about a specific
 * person and were not checked at all. A proposal could cite another learner's
 * interpretation as its basis. That is a leak, not merely scope creep, and it
 * is why this classifier exists separately from the admissibility one.
 */
export function provenanceScope(kind: ProvenanceReferenceKind): ProvenanceScope {
  switch (kind) {
    case "learner-evidence":
    case "historical-event":
    case "derived-interpretation":
      return "learner-scoped";
    case "knowledge":
    case "knowledge-version":
    case "pedagogical-rule":
    case "learning-experience":
    case "learning-experience-version":
      return "content-scoped";
    case "delivery-capability":
    case "delivery-compatibility":
      return "delivery-context";
    case "policy":
    case "learning-decision":
    case "reasoning-proposal":
    case "interaction-command":
    case "trusted-actor-context":
    case "assessment-boundary":
    case "assessment-evidence":
      return "not-a-basis";
    default: {
      const unscoped: never = kind;
      throw new DomainValidationError(`Provenance reference kind has no scope: ${String(unscoped)}`);
    }
  }
}

const ALL_PROVENANCE_KINDS: readonly ProvenanceReferenceKind[] = Object.freeze([
  "interaction-command",
  "trusted-actor-context",
  "learner-evidence",
  "historical-event",
  "knowledge",
  "pedagogical-rule",
  "policy",
  "reasoning-proposal",
  "learning-decision",
  "delivery-capability",
  "assessment-boundary",
  "assessment-evidence",
  "derived-interpretation",
  "knowledge-version",
  "learning-experience",
  "learning-experience-version",
  "delivery-compatibility",
]);

/** Derived from the classification, for the same reason as above. */
export const admissibleProvenanceKinds: readonly ProvenanceReferenceKind[] = Object.freeze(
  ALL_PROVENANCE_KINDS.filter((kind) => classifyProvenanceReference(kind) === "upstream-basis"),
);

// ---------------------------------------------------------------------------
// Policies
// ---------------------------------------------------------------------------

export const aiProposalAcceptancePolicy = policyDefinition({
  id: "policy.ai-proposal-acceptance.001",
  scope: "ai-proposal-acceptance",
  version: "policy.ai-proposal-acceptance.v1",
  statement:
    "A reasoning proposal may be admitted into a learner-facing decision only when it matches its task, cites evidence within the task's permitted scope, carries no evaluative language about the learner, claims as its basis only stages upstream of itself, stays within the permitted length, and is of an admissible task kind. Admission permits the proposal's content to be offered. It authorizes no learner conclusion, no assessment, and no state change; a learner's explicit choice remains the only thing that may move them.",
});

export const stateMutationPolicy = policyDefinition({
  id: "policy.state-mutation.001",
  scope: "state-mutation",
  version: "policy.state-mutation.v1",
  statement:
    "A learner-state commitment may be authorized only by an accepted interaction command, accepted learner evidence, or an explicit learner choice. No proposal, computation, model output, policy, delivery, or elapsed time may originate a commitment.",
});

// ---------------------------------------------------------------------------
// The policy envelope
// ---------------------------------------------------------------------------

/**
 * What a policy actually permits, bound to the policy rather than supplied by
 * whoever is calling.
 *
 * Hostile testing found that passing the admissible-kind list as a parameter
 * made the policy advisory: a caller could simply widen it and admit a
 * misconception hypothesis. A6 requires a consequential action to trace to a
 * named policy; if the caller supplies the limits, the policy names nothing.
 */
export interface ProposalEnvelope {
  readonly policy: PolicyDefinition;
  readonly admissibleKinds: readonly ReasoningTaskKind[];
  readonly admissibleProvenanceKinds: readonly ProvenanceReferenceKind[];
  /** Bound on learner-facing text. A provider returning megabytes is refused, not truncated. */
  readonly maxSummaryCharacters: number;
}

function approvedEnvelope(envelope: ProposalEnvelope): ProposalEnvelope {
  if (envelope.policy.scope !== "ai-proposal-acceptance") {
    throw new DomainValidationError(
      "A proposal envelope must wrap a policy scoped to ai-proposal-acceptance.",
    );
  }
  return Object.freeze(envelope);
}

const approvedEnvelopes: ReadonlyMap<string, ProposalEnvelope> = new Map([
  [
    aiProposalAcceptancePolicy.id,
    approvedEnvelope({
      policy: aiProposalAcceptancePolicy,
      admissibleKinds: admissibleProposalKinds,
      admissibleProvenanceKinds,
      maxSummaryCharacters: 2000,
    }),
  ],
]);

/**
 * Resolves what a policy permits. A policy identifier that is not in the
 * approved set resolves to nothing, and governance refuses — an unapproved
 * policy cannot be conjured by constructing an object with the right shape.
 */
export function resolveApprovedEnvelope(policyId: string): ProposalEnvelope | undefined {
  return approvedEnvelopes.get(policyId);
}

export const approvedPolicyIds: readonly string[] = Object.freeze([...approvedEnvelopes.keys()]);

// ---------------------------------------------------------------------------
// State mutation
// ---------------------------------------------------------------------------

/**
 * Evaluates a commitment against the state-mutation policy. This duplicates, as
 * a policy outcome, what the type system already prevents — deliberately, so
 * that the guarantee is reportable and not only structural.
 */
export function evaluateStateMutationPolicy(commitment: StateCommitment): PolicyEvaluation {
  const permitted =
    commitment.authorization.kind === "accepted-interaction-command" ||
    commitment.authorization.kind === "accepted-evidence" ||
    commitment.authorization.kind === "learner-choice";

  return kernelPolicyEvaluation({
    policy: stateMutationPolicy,
    outcome: permitted ? "permitted" : "prohibited",
    rationale: permitted
      ? `Commitment ${commitment.id} is authorized by ${commitment.authorization.kind}.`
      : `Commitment ${commitment.id} lacks a learner-originated authorization.`,
  });
}
