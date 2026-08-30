import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  exploreConceptCommand,
  luminaCurriculum,
  isoTimestamp,
  learnerRecord,
  trustedActorContext,
} from "../src/index.js";

const evaluatedAt = isoTimestamp("2026-08-27T10:00:00.000Z");
const learnerId = "learner.demo";
const command = exploreConceptCommand({
  id: "command.demo.explore-function",
  commandReference: "occurrence.demo.explore-function",
  learnerId,
  issuedAt: evaluatedAt,
  conceptId: "concept.function",
  pedagogicalLayer: "intuition",
});

const result = executeDeterministicLearningInteraction({
  command,
  actor: trustedActorContext({
    actorId: "actor.demo",
    learnerScope: [learnerId],
    permissions: ["request-learning-decision"],
  }),
  deliveryCapabilities: deliveryCapabilityProfile(["displayed-text", "typed-input"]),
  learnerRecord: learnerRecord({
    learnerId,
    evidence: [],
    events: [],
    interpretations: [],
    state: currentLearnerState({ learnerId, engagementFocus: "unobserved" }),
    commitments: [],
  }),
  knowledgeCatalog: luminaCurriculum,
  pedagogicalGuidance: canonicalPedagogicalGuidance,
  evaluatedAt,
});

console.log(JSON.stringify({
  input: { commandKind: command.kind, conceptId: command.conceptId, pedagogicalLayer: command.pedagogicalLayer },
  engine: { deterministic: true, reasoningInvolved: result.diagnostics.reasoningInvolved },
  candidateOpportunities: result.decision.opportunities.map((opportunity) => ({
    kind: opportunity.kind,
    conceptId: opportunity.conceptId,
    relatedConceptId: opportunity.relatedConceptId,
    pedagogicalLayer: opportunity.pedagogicalLayer,
  })),
  policy: result.decision.policyEvaluations.map((evaluation) => ({
    policyId: evaluation.policyId,
    outcome: evaluation.outcome,
  })),
  learningDecision: {
    type: result.decision.type,
    status: result.decision.status,
    conceptIds: result.decision.conceptIds,
    offerCount: result.decision.offers.length,
  },
  stateEffect: result.transition.kind === "committed"
    ? { kind: "committed", focus: result.transition.nextState.engagementFocus, activeConceptId: result.transition.nextState.activeConceptId }
    : { kind: "not-committed", reason: result.transition.reason },
  historicalEvents: result.events.map((event) => event.kind),
  provenance: {
    evidenceReferences: result.diagnostics.consideredEvidenceIds,
    knowledgeReferences: result.diagnostics.consideredKnowledgeIds,
    policyCount: result.diagnostics.policyEvaluations.length,
  },
}, null, 2));
