import { kernelPolicyEvaluation, policyDefinition } from "../domain/policy-governance.js";
import { ProposalEnvelope, provenanceScope, resolveApprovedEnvelope } from "./proposal-policy.js";
import { PolicyEvaluation } from "../contracts/core-contracts.js";
import { ReasoningProposal, ReasoningTask, validateReasoningProposal } from "../contracts/reasoning-port.js";
import {
  claimsMoreConfidenceThan,
  IsoTimestamp,
  PolicyVersionRef,
  readonlyList,
  StableId,
} from "../domain/primitives.js";

/**
 * The authority seam (foundation A4). Permission is a value, not a state of
 * mind, and it can only be produced here.
 *
 * `AuthorizedAction` carries a phantom brand keyed by a symbol this module does
 * not export. No code outside this file can construct a value of the type: the
 * property key is unnameable elsewhere. A deliberate type assertion could still
 * fabricate the shape, so every minted action is additionally recorded in a
 * module-private WeakSet — `isMintedAuthorization` is the runtime check, and a
 * fabricated action fails it.
 *
 * Note what an authorized action does *not* permit. It authorizes admitting a
 * proposal's content into a learner-facing decision. It never authorizes a
 * state change. Under A2 only a learner's explicit choice may move a learner,
 * and `StateCommitmentAuthorization` deliberately has no AI-originated or
 * policy-originated variant.
 */

declare const AUTHORIZED: unique symbol;

export type AuthorizedActionKind = "admit-proposal-to-decision";

export interface AuthorizedAction<K extends AuthorizedActionKind = AuthorizedActionKind> {
  /** Phantom brand. The symbol is not exported, so this shape is unconstructable elsewhere. */
  readonly [AUTHORIZED]: true;
  readonly kind: K;
  readonly proposalId: StableId;
  readonly taskId: StableId;
  readonly policyId: StableId;
  readonly policyVersion: PolicyVersionRef;
  readonly admittedEvidenceIds: readonly StableId[];
  readonly authorizedAt: IsoTimestamp;
}

export type GovernanceEvaluation =
  | {
      readonly kind: "authorized";
      readonly action: AuthorizedAction<"admit-proposal-to-decision">;
      readonly policyEvaluation: PolicyEvaluation;
    }
  | {
      readonly kind: "refused";
      readonly reasons: readonly string[];
      readonly policyEvaluation: PolicyEvaluation;
    };

/** Used only to report a refusal when no approved policy could be resolved. */
const unapprovedPolicyPlaceholder = policyDefinition({
  id: "policy.unapproved.000",
  scope: "ai-proposal-acceptance",
  version: "policy.unapproved.v0",
  statement: "No approved policy envelope was resolved. Admission is refused.",
});

const mintedAuthorizations = new WeakSet<object>();

/**
 * True only for an action minted by `evaluateGovernance` in this process. A
 * value cast into the type without passing governance returns false.
 */
export function isMintedAuthorization(value: AuthorizedAction): boolean {
  return mintedAuthorizations.has(value);
}

/**
 * The governance stage between a validated proposal and any use of it. This is
 * the only function that mints permission.
 *
 * Refusal is the default: every check must pass affirmatively. The policy is
 * supplied by the caller rather than selected here, so which policy authorized
 * an admission is recorded rather than implied.
 */
export function evaluateGovernance(input: {
  readonly task: ReasoningTask;
  readonly proposal: ReasoningProposal;
  /** Identifier of an approved policy. What it permits is resolved, not supplied. */
  readonly policyId: string;
  readonly authorizedAt: IsoTimestamp;
}): GovernanceEvaluation {
  // The envelope is resolved from the approved set rather than accepted from
  // the caller. Hostile testing found that passing the admissible-kind list as
  // a parameter made the policy advisory - a caller could widen it and admit a
  // claim about a learner. A policy that does not bind is not a policy.
  const envelope = resolveApprovedEnvelope(input.policyId);
  if (envelope === undefined) {
    return Object.freeze({
      kind: "refused",
      reasons: readonlyList([
        `No approved policy envelope exists for ${input.policyId}; admission requires an approved policy.`,
      ]),
      policyEvaluation: kernelPolicyEvaluation({
        policy: unapprovedPolicyPlaceholder,
        outcome: "prohibited",
        rationale: `Policy ${input.policyId} is not in the approved set.`,
      }),
    });
  }

  const policy = envelope.policy;
  const reasons: string[] = [];

  if (input.proposal.summary.length > envelope.maxSummaryCharacters) {
    reasons.push(
      `Reasoning proposal summary is ${input.proposal.summary.length} characters; the policy permits at most ${envelope.maxSummaryCharacters}.`,
    );
  }

  const validation = validateReasoningProposal(input.task, input.proposal);
  if (validation.outcome === "rejected") {
    reasons.push(...validation.reasons);
  }

  if (!envelope.admissibleKinds.includes(input.proposal.kind)) {
    reasons.push(
      `Reasoning task kind ${input.proposal.kind} is not admissible under the supplied policy.`,
    );
  }

  // Provenance is a second channel into the same decision, and it was not
  // checked before hostile testing found it. Two ways through it:
  //
  //   1. Claiming a later stage as the proposal's own basis - citing the very
  //      policy about to evaluate it, or a decision downstream of it. That
  //      inverts the ladder A4 keeps in one direction and reads as prior
  //      approval the proposal does not have.
  //   2. Citing learner evidence the task never permitted, while keeping
  //      `evidenceIds` clean so the scope check passes.
  const inadmissibleKinds = [
    ...new Set(
      input.proposal.provenance.references
        .filter((reference) => !envelope.admissibleProvenanceKinds.includes(reference.kind))
        .map((reference) => reference.kind),
    ),
  ];
  if (inadmissibleKinds.length > 0) {
    reasons.push(
      `Reasoning proposal provenance claims a basis it may not claim: ${inadmissibleKinds.join(", ")}.`,
    );
  }

  // Every reference must fall inside the scope the task actually declared.
  // Checking only `learner-evidence` was not enough: `derived-interpretation`
  // and `historical-event` are equally about a specific person, and a proposal
  // could cite another learner's interpretation as its basis.
  const permittedEvidence = new Set<string>(input.task.permittedEvidenceIds);
  const permittedBasis = new Set<string>(input.task.permittedBasisIds);

  const outOfScopeLearner = input.proposal.provenance.references.filter(
    (reference) =>
      provenanceScope(reference.kind) === "learner-scoped" && !permittedEvidence.has(reference.id),
  );
  if (outOfScopeLearner.length > 0) {
    reasons.push(
      "Reasoning proposal provenance references learner-scoped material outside the task's permitted evidence scope.",
    );
  }

  const outOfScopeBasis = input.proposal.provenance.references.filter((reference) => {
    const scope = provenanceScope(reference.kind);
    return (scope === "content-scoped" || scope === "delivery-context") && !permittedBasis.has(reference.id);
  });
  if (outOfScopeBasis.length > 0) {
    reasons.push(
      "Reasoning proposal provenance references content outside the task's permitted basis.",
    );
  }

  // A6: uncertainty survives and is never converted into confidence along the
  // way. A shaky basis cannot yield a confident claim.
  if (claimsMoreConfidenceThan(input.proposal.uncertainty, input.proposal.provenance.uncertainty)) {
    reasons.push(
      `Reasoning proposal claims ${input.proposal.uncertainty.level} uncertainty on a basis stated as ${input.proposal.provenance.uncertainty.level}; a claim may not be more confident than what it rests on.`,
    );
  }

  if (reasons.length > 0) {
    return Object.freeze({
      kind: "refused",
      reasons: readonlyList(reasons),
      policyEvaluation: kernelPolicyEvaluation({
        policy,
        outcome: "prohibited",
        rationale: reasons.join(" "),
      }),
    });
  }

  // The brand has no runtime representation, so the shape is asserted here and
  // witnessed in the WeakSet. This assertion is the reason the module is small
  // and the reason nothing else may perform it.
  const action = Object.freeze({
    kind: "admit-proposal-to-decision",
    proposalId: input.proposal.id,
    taskId: input.task.id,
    policyId: policy.id,
    policyVersion: policy.version,
    admittedEvidenceIds: input.proposal.evidenceIds,
    authorizedAt: input.authorizedAt,
  }) as unknown as AuthorizedAction<"admit-proposal-to-decision">;

  mintedAuthorizations.add(action);

  return Object.freeze({
    kind: "authorized",
    action,
    policyEvaluation: kernelPolicyEvaluation({
      policy,
      outcome: "permitted",
      rationale: `Proposal ${input.proposal.id} admitted to the decision under ${policy.id}. Admission is not a state change and creates no learner commitment.`,
    }),
  });
}
