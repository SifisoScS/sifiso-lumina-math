import { PolicyDefinition, kernelPolicyEvaluation } from "../domain/policy-governance.js";
import { PolicyEvaluation } from "../contracts/core-contracts.js";
import {
  ReasoningProposal,
  ReasoningTask,
  ReasoningTaskKind,
  validateReasoningProposal,
} from "../contracts/reasoning-port.js";
import { IsoTimestamp, PolicyVersionRef, readonlyList, StableId } from "../domain/primitives.js";

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
  readonly policy: PolicyDefinition;
  readonly admissibleKinds: readonly ReasoningTaskKind[];
  readonly authorizedAt: IsoTimestamp;
}): GovernanceEvaluation {
  const reasons: string[] = [];

  if (input.policy.scope !== "ai-proposal-acceptance") {
    reasons.push(
      `Admitting a reasoning proposal requires a policy scoped to ai-proposal-acceptance; the supplied policy is scoped to ${input.policy.scope}.`,
    );
  }

  const validation = validateReasoningProposal(input.task, input.proposal);
  if (validation.outcome === "rejected") {
    reasons.push(...validation.reasons);
  }

  if (!input.admissibleKinds.includes(input.proposal.kind)) {
    reasons.push(
      `Reasoning task kind ${input.proposal.kind} is not admissible under the supplied policy.`,
    );
  }

  if (reasons.length > 0) {
    return Object.freeze({
      kind: "refused",
      reasons: readonlyList(reasons),
      policyEvaluation: kernelPolicyEvaluation({
        policy: input.policy,
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
    policyId: input.policy.id,
    policyVersion: input.policy.version,
    admittedEvidenceIds: input.proposal.evidenceIds,
    authorizedAt: input.authorizedAt,
  }) as unknown as AuthorizedAction<"admit-proposal-to-decision">;

  mintedAuthorizations.add(action);

  return Object.freeze({
    kind: "authorized",
    action,
    policyEvaluation: kernelPolicyEvaluation({
      policy: input.policy,
      outcome: "permitted",
      rationale: `Proposal ${input.proposal.id} admitted to the decision under ${input.policy.id}. Admission is not a state change and creates no learner commitment.`,
    }),
  });
}
