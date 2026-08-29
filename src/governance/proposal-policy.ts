import { PolicyEvaluation } from "../contracts/core-contracts.js";
import { ReasoningTaskKind } from "../contracts/reasoning-port.js";
import { StateCommitment } from "../domain/learner-record.js";
import { kernelPolicyEvaluation, policyDefinition } from "../domain/policy-governance.js";

/**
 * Concrete policies for the two `PolicyScope` members that were declared with
 * nothing behind them. A named scope with no policy is an open question wearing
 * the costume of a decision; these close two of them.
 */

/**
 * Reasoning task kinds a proposal may currently be admitted for.
 *
 * Deliberately narrow. Each admitted kind produces material a learner reads —
 * it makes no claim *about* the learner and has no state effect. The excluded
 * kinds are excluded for stated reasons, not by oversight:
 *
 *   reflection-analysis      interprets learner-owned evidence; interpretation
 *                            of a person is not admitted while OPEN.md O4 stands
 *   misconception-hypothesis a claim about a learner's understanding; assessment
 *                            authority is open (O4)
 *   practice-generation      produces material whose outcome would be treated as
 *                            evidence; evidence sufficiency is not settled
 *   adaptive-path-suggestion shapes what a learner is offered next, which bears
 *                            on autonomy (A2) and on prerequisites (O5)
 *
 * Widening this list is an amendment under A8, not a configuration change.
 */
export const admissibleProposalKinds: readonly ReasoningTaskKind[] = Object.freeze([
  "explanation-generation",
  "representation-generation",
  "dialogue-assistance",
]);

/**
 * Fills `PolicyScope: "ai-proposal-acceptance"`. Authorizes admission of
 * machine-originated material into a learner-facing decision, and nothing else.
 */
export const aiProposalAcceptancePolicy = policyDefinition({
  id: "policy.ai-proposal-acceptance.001",
  scope: "ai-proposal-acceptance",
  version: "policy.ai-proposal-acceptance.v1",
  statement:
    "A reasoning proposal may be admitted into a learner-facing decision only when it matches its task, cites evidence within the task's permitted scope, carries no evaluative language about the learner, and is of an admissible task kind. Admission permits the proposal's content to be offered. It authorizes no learner conclusion, no assessment, and no state change; a learner's explicit choice remains the only thing that may move them.",
});

/**
 * Fills `PolicyScope: "state-mutation"`. States, as an evaluable policy, the
 * boundary that `StateCommitmentAuthorization` already enforces structurally.
 */
export const stateMutationPolicy = policyDefinition({
  id: "policy.state-mutation.001",
  scope: "state-mutation",
  version: "policy.state-mutation.v1",
  statement:
    "A learner-state commitment may be authorized only by an accepted interaction command, accepted learner evidence, or an explicit learner choice. No proposal, computation, model output, policy, delivery, or elapsed time may originate a commitment.",
});

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
