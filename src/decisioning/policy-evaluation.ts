import {
  CandidateLearningOpportunity,
  InteractionCommand,
  PolicyEvaluation,
  policyEvaluation,
  TrustedActorContext,
} from "../contracts/core-contracts.js";
import { readonlyList } from "../domain/primitives.js";
import { AssembledLearningContext } from "./context.js";

export interface CandidatePolicyResult {
  readonly opportunity: CandidateLearningOpportunity;
  readonly permitted: boolean;
  readonly requiresLearnerChoice: boolean;
}

export interface DecisionPolicyResult {
  readonly permitted: boolean;
  readonly evaluations: readonly PolicyEvaluation[];
  readonly candidates: readonly CandidatePolicyResult[];
}

function needsEvidencePermission(command: InteractionCommand): boolean {
  return command.kind === "submit-reflection" ||
    command.kind === "submit-practice-attempt" ||
    command.kind === "submit-confidence-report" ||
    command.kind === "submit-learning-context";
}

function needsChoicePermission(command: InteractionCommand): boolean {
  return command.kind === "submit-learner-choice";
}

function hasPermission(actor: TrustedActorContext, permission: string): boolean {
  return actor.permissions.includes(permission as never);
}

/**
 * Slice 2 evaluates only approved, deterministic policies. The open policy
 * questions from earlier phases remain extension points and are not silently
 * translated into prerequisite blocks, readiness scores, or ranking rules.
 */
export function evaluateDecisionPolicy(
  context: AssembledLearningContext,
  candidates: readonly CandidateLearningOpportunity[],
): DecisionPolicyResult {
  const evaluations: PolicyEvaluation[] = [];
  const actorCanRequestDecision = hasPermission(context.actor, "request-learning-decision");
  evaluations.push(policyEvaluation({
    policyId: "policy.command-permission",
    policyVersion: "policy.v1",
    outcome: actorCanRequestDecision ? "permitted" : "prohibited",
    rationale: actorCanRequestDecision
      ? "The trusted actor is permitted to request a learning decision."
      : "The trusted actor is not permitted to request a learning decision.",
  }));

  const evidencePermissionSatisfied = !needsEvidencePermission(context.command) ||
    hasPermission(context.actor, "submit-learner-evidence");
  if (!evidencePermissionSatisfied) {
    evaluations.push(policyEvaluation({
      policyId: "policy.evidence-permission",
      policyVersion: "policy.v1",
      outcome: "prohibited",
      rationale: "The trusted actor is not permitted to submit learner-owned evidence.",
    }));
  }

  const choicePermissionSatisfied = !needsChoicePermission(context.command) ||
    hasPermission(context.actor, "make-learner-choice");
  if (!choicePermissionSatisfied) {
    evaluations.push(policyEvaluation({
      policyId: "policy.choice-permission",
      policyVersion: "policy.v1",
      outcome: "prohibited",
      rationale: "The trusted actor is not permitted to submit a learner choice.",
    }));
  }

  /**
   * Every candidate has to become an explicit offer before it can be selected.
   * This is an executable learner-autonomy boundary: the engine never converts
   * an available opportunity directly into a path change.
   */
  const autonomyEvaluation = policyEvaluation({
    policyId: "policy.learner-autonomy",
    policyVersion: "policy.v1",
    outcome: "requires-confirmation",
    rationale: "A candidate learning opportunity requires an explicit learner choice before path commitment.",
  });
  evaluations.push(autonomyEvaluation);

  const permitted = actorCanRequestDecision && evidencePermissionSatisfied && choicePermissionSatisfied;
  const candidateResults = candidates.map((opportunity) => Object.freeze({
    opportunity,
    permitted,
    requiresLearnerChoice: true,
  }));

  return Object.freeze({
    permitted,
    evaluations: readonlyList(evaluations),
    candidates: readonlyList(candidateResults),
  });
}
