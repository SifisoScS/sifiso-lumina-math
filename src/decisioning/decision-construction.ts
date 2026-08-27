import {
  learningDecision,
  LearningDecision,
  LearningOffer,
  learningOffer,
  learningRecommendation,
  PolicyEvaluation,
  policyEvaluation,
  TrustedActorContext,
} from "../contracts/core-contracts.js";
import { decisionProvenance, provenanceReference } from "../domain/provenance.js";
import { uncertainty } from "../domain/primitives.js";
import { AssembledLearningContext, ContextIssue } from "./context.js";
import { CandidatePolicyResult, DecisionPolicyResult } from "./policy-evaluation.js";

function baseDecisionProvenance(input: {
  readonly commandId: string;
  readonly actorId: string;
  readonly deliveryCapabilities: readonly string[];
  readonly rationale: string;
  readonly uncertaintyLevel: "low" | "medium" | "high" | "unknown";
}): ReturnType<typeof decisionProvenance> {
  const references = [
    provenanceReference("interaction-command", input.commandId),
    provenanceReference("trusted-actor-context", input.actorId),
  ];
  for (const capability of input.deliveryCapabilities) {
    references.push(provenanceReference("delivery-capability", `capability.${capability}`));
  }
  return decisionProvenance({
    references,
    uncertainty: uncertainty(input.uncertaintyLevel, input.rationale),
    rationale: input.rationale,
  });
}

function incompleteContextPolicy(issue: ContextIssue): PolicyEvaluation {
  if (issue.kind === "learner-outside-actor-scope") {
    return policyEvaluation({
      policyId: "policy.command-scope",
      policyVersion: "policy.v1",
      outcome: "prohibited",
      rationale: issue.message,
    });
  }
  return policyEvaluation({
    policyId: "policy.safe-incomplete-context",
    policyVersion: "policy.v1",
    outcome: "constrained",
    rationale: issue.message,
  });
}

/**
 * Safe non-material outcomes deliberately omit concept references, learning
 * opportunities, recommendations, and offers. They never invent a concept to
 * satisfy a schema and cannot authorize a learner-state transition.
 */
export function constructSafeNonMaterialDecision(input: {
  readonly decisionId: string;
  readonly commandId: string;
  readonly learnerId: string;
  readonly actor: TrustedActorContext;
  readonly deliveryCapabilities: readonly string[];
  readonly issues: readonly ContextIssue[];
}): LearningDecision {
  const hasProhibitedScopeIssue = input.issues.some((issue) => issue.kind === "learner-outside-actor-scope");
  const reason = input.issues.map((issue) => issue.message).join(" ");
  return learningDecision({
    id: input.decisionId,
    learnerId: input.learnerId,
    type: "safe-non-material",
    status: hasProhibitedScopeIssue ? "declined" : "incomplete-context",
    policyEvaluations: input.issues.map(incompleteContextPolicy),
    provenance: baseDecisionProvenance({
      commandId: input.commandId,
      actorId: input.actor.actorId,
      deliveryCapabilities: input.deliveryCapabilities,
      rationale: reason,
      uncertaintyLevel: "high",
    }),
  });
}

function uniqueProvenanceReferences<T extends { readonly kind: string; readonly id: string }>(
  references: readonly T[],
): readonly T[] {
  const seen = new Set<string>();
  return references.filter((reference) => {
    const key = `${reference.kind}.${reference.id}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function recommendationRationale(candidate: CandidatePolicyResult): string {
  const suffix = candidate.opportunity.relatedConceptId === undefined
    ? ""
    : ` It references the related concept '${candidate.opportunity.relatedConceptId}'.`;
  return `This is a policy-permitted, pedagogically compatible '${candidate.opportunity.kind}' learning opportunity.${suffix}`;
}

function offersFromCandidates(candidates: readonly CandidatePolicyResult[]): readonly LearningOffer[] {
  return candidates
    .filter((candidate) => candidate.permitted)
    .map((candidate) => learningOffer({
      id: `offer.${candidate.opportunity.id}`,
      opportunity: candidate.opportunity,
      requiresLearnerChoice: candidate.requiresLearnerChoice,
    }));
}

/**
 * Material decision construction is separate from context assembly, candidate
 * generation, policy evaluation, and state commitment. It returns offers and
 * recommendations but never commits a learner path or mutates learner state.
 */
export function constructMaterialDecision(
  context: AssembledLearningContext,
  policy: DecisionPolicyResult,
): LearningDecision {
  const commandReference = provenanceReference("interaction-command", context.command.id);
  const actorReference = provenanceReference("trusted-actor-context", context.actor.actorId);
  const knowledgeReferences = [
    provenanceReference("knowledge", context.knowledge.concept.id),
    ...context.knowledge.prerequisiteRelationships.map((relationship) =>
      provenanceReference("knowledge", relationship.id)),
    ...context.knowledge.outgoingConceptBridges.map((relationship) =>
      provenanceReference("knowledge", relationship.id)),
  ];
  const evidenceReferences = context.observedEvidence.map((evidence) =>
    provenanceReference("learner-evidence", evidence.id));
  const declaredConflictEvidenceReferences = context.declaredEvidenceConflicts.flatMap((conflict) =>
    conflict.evidenceIds.map((evidenceId) => provenanceReference("learner-evidence", evidenceId)));
  const pedagogyReferences = context.pedagogicalGuidance.map((guidance) =>
    provenanceReference("pedagogical-rule", guidance.ruleRef));
  const policyReferences = policy.evaluations.map((evaluation) =>
    provenanceReference("policy", evaluation.policyId));
  const deliveryReferences = context.deliveryCapabilities.capabilities.map((capability) =>
    provenanceReference("delivery-capability", `capability.${capability}`));

  const provenance = decisionProvenance({
    references: uniqueProvenanceReferences([
      commandReference,
      actorReference,
      ...knowledgeReferences,
      ...evidenceReferences,
      ...declaredConflictEvidenceReferences,
      ...pedagogyReferences,
      ...policyReferences,
      ...deliveryReferences,
    ]),
    uncertainty: uncertainty(
      context.declaredEvidenceConflicts.length > 0
        ? "high"
        : context.observedEvidence.length === 0
          ? "medium"
          : "low",
      context.declaredEvidenceConflicts.length > 0
        ? "The decision preserves declared conflicting evidence and does not resolve it into fabricated certainty."
        : context.observedEvidence.length === 0
          ? "The decision is grounded in available knowledge and context without concept-specific learner evidence."
          : "The decision includes relevant observed learner evidence and available knowledge context.",
    ),
    rationale: "The decision is grounded in resolved mathematical knowledge, pedagogical guidance, observed evidence, and policy evaluation.",
  });

  if (!policy.permitted) {
    return learningDecision({
      id: `decision.${context.command.id}`,
      learnerId: context.command.learnerId,
      type: "material",
      status: "declined",
      conceptIds: [context.knowledge.concept.id],
      policyEvaluations: policy.evaluations,
      provenance,
    });
  }

  const permittedCandidates = policy.candidates.filter((candidate) => candidate.permitted);
  const recommendations = permittedCandidates.map((candidate) => learningRecommendation({
    id: `recommendation.${candidate.opportunity.id}`,
    opportunity: candidate.opportunity,
    rationale: recommendationRationale(candidate),
  }));
  const offers = offersFromCandidates(permittedCandidates);

  return learningDecision({
    id: `decision.${context.command.id}`,
    learnerId: context.command.learnerId,
    type: "material",
    status: "offer-available",
    conceptIds: [context.knowledge.concept.id],
    opportunities: permittedCandidates.map((candidate) => candidate.opportunity),
    recommendations,
    offers,
    policyEvaluations: policy.evaluations,
    provenance,
  });
}
