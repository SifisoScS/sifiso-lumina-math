import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  luminaCurriculum,
  isoTimestamp,
  learnerRecord,
  learnerReflection,
  requestLearningGuidanceCommand,
  resolveKnowledgeContext,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.demo.slice4";
const timestamp = isoTimestamp("2026-08-27T14:00:00.000Z");
const state = currentLearnerState({
  learnerId,
  engagementFocus: "encountered",
  activeConceptId: "concept.function",
  activePedagogicalLayer: "intuition",
});
const reflection = learnerReflection({
  id: "evidence.demo.slice4.reflection",
  learnerId,
  conceptId: "concept.function",
  originalText: "I would like another way to picture the input-output relationship.",
  submittedAt: timestamp,
});
const learnerContext = learnerRecord({
  learnerId: state.learnerId,
  evidence: [reflection],
  events: [],
  interpretations: [],
  state,
  commitments: [],
});
const actor = trustedActorContext({
  actorId: "actor.demo.slice4",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision"],
});
const deliveryCapabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);
const command = requestLearningGuidanceCommand({
  id: "command.demo.slice4.guidance",
  commandReference: "occurrence.demo.slice4.guidance",
  learnerId,
  issuedAt: timestamp,
  conceptId: "concept.function",
});
const knowledge = resolveKnowledgeContext({
  catalog: luminaCurriculum,
  conceptId: "concept.function" as never,
  pedagogicalLayer: "intuition",
});
if (knowledge === undefined) {
  throw new Error("The published Functions seed must resolve for the Slice 4 demonstration.");
}
const execution = executeDeterministicLearningInteraction({
  command,
  actor,
  deliveryCapabilities,
  learnerRecord: learnerContext,
  knowledgeCatalog: luminaCurriculum,
  pedagogicalGuidance: canonicalPedagogicalGuidance,
  evaluatedAt: timestamp,
});

console.log(JSON.stringify({
  engine: {
    deterministic: true,
    uiImplemented: false,
    persistenceImplemented: false,
    providerInvoked: false,
    reasoningInvolved: execution.diagnostics.reasoningInvolved,
  },
  learnerContext: {
    learnerId,
    activeConceptId: state.activeConceptId,
    activePedagogicalLayer: state.activePedagogicalLayer,
    observedEvidence: learnerContext.evidence.map((item) => ({ id: item.id, kind: item.kind })),
  },
  relevantConcept: { id: knowledge.targetConcept.id, version: knowledge.targetConcept.version },
  knowledgeGraphResolution: {
    prerequisiteConcepts: knowledge.prerequisiteConcepts.map((concept) => concept.id),
    relatedConcepts: knowledge.relatedConcepts.map((concept) => concept.id),
    bridgeConcepts: knowledge.bridgeConcepts.map((concept) => concept.id),
    representations: knowledge.representationAssets.map((asset) => ({ id: asset.id, form: asset.representationForm })),
    examples: knowledge.exampleAssets.map((asset) => asset.id),
    nonExamples: knowledge.nonExampleAssets.map((asset) => asset.id),
    procedures: knowledge.procedureAssets.map((asset) => asset.id),
    learningExperiences: knowledge.relevantExperiences.map((experience) => ({ id: experience.id, layers: experience.pedagogicalLayers })),
    semanticRelations: knowledge.semanticRelations,
    versionReferences: knowledge.versionReferences,
  },
  pedagogicalEvaluation: execution.diagnostics.contextAssembly.kind === "complete"
    ? execution.diagnostics.contextAssembly.context.pedagogicalGuidance.map((guidance) => ({
      layer: guidance.layer,
      ruleRef: guidance.ruleRef,
      suitableExperienceIntents: guidance.suitableExperienceIntents,
    }))
    : [],
  evidenceEvaluation: execution.diagnostics.evidenceEvaluation,
  candidateOpportunities: execution.decision.opportunities.map((opportunity) => ({
    kind: opportunity.kind,
    conceptId: opportunity.conceptId,
    relatedConceptId: opportunity.relatedConceptId,
    knowledgeAssetId: opportunity.knowledgeAssetId,
    knowledgeRelationshipId: opportunity.knowledgeRelationshipId,
    learningExperienceId: opportunity.learningExperienceId,
    pedagogicalLayer: opportunity.pedagogicalLayer,
  })),
  policy: execution.decision.policyEvaluations,
  materialLearningDecision: {
    type: execution.decision.type,
    status: execution.decision.status,
    conceptIds: execution.decision.conceptIds,
    offerCount: execution.decision.offers.length,
  },
  structuredProvenance: execution.decision.provenance,
}, null, 2));
