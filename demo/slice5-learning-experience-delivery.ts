import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  functionsSeedKnowledge,
  isoTimestamp,
  learnerRecord,
  requestLearningGuidanceCommand,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.demo.slice5";
const timestamp = isoTimestamp("2026-08-27T16:00:00.000Z");
const actor = trustedActorContext({
  actorId: "actor.demo.slice5",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision"],
});
const learnerState = currentLearnerState({
  learnerId,
  engagementFocus: "active-focus",
  activeConceptId: "concept.function",
  activePedagogicalLayer: "mechanics",
});
const record = learnerRecord({
  learnerId,
  evidence: [],
  events: [],
  interpretations: [],
  state: learnerState,
  commitments: [],
});

function evaluateScenario(
  scenario: "compatible" | "incompatible",
  capabilities: readonly ("displayed-text" | "displayed-notation")[],
) {
  const execution = executeDeterministicLearningInteraction({
    command: requestLearningGuidanceCommand({
      id: `command.demo.slice5.${scenario}`,
      commandReference: `occurrence.demo.slice5.${scenario}`,
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.function",
    }),
    actor,
    deliveryCapabilities: deliveryCapabilityProfile(capabilities),
    learnerRecord: record,
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });
  const delivery = execution.diagnostics.deliveryCompatibility;

  return {
    declaredDeliveryCapabilities: capabilities,
    deliveryCompatibility: {
      compatibleExperiences: delivery?.compatible.map((item) => ({
        id: item.experience.id,
        version: item.experience.version,
        requiredCapabilities: item.experience.deliveryRequirements,
      })) ?? [],
      incompatibleExperiences: delivery?.incompatible.map((item) => ({
        id: item.experience.id,
        version: item.experience.version,
        missingCapabilities: item.missingCapabilities,
      })) ?? [],
      noCompatibleExperience: delivery?.noCompatibleExperience ?? false,
    },
    materialLearningDecision: {
      type: execution.decision.type,
      status: execution.decision.status,
      conceptIds: execution.decision.conceptIds,
      offers: execution.decision.offers.map((offer) => ({
        id: offer.id,
        selectedOpportunityId: offer.selectedOpportunityId,
      })),
      experienceOpportunities: execution.decision.opportunities
        .filter((opportunity) => opportunity.learningExperienceId !== undefined)
        .map((opportunity) => ({
          id: opportunity.id,
          kind: opportunity.kind,
          learningExperienceId: opportunity.learningExperienceId,
          learningExperienceVersion: opportunity.learningExperienceVersion,
          pedagogicalLayer: opportunity.pedagogicalLayer,
        })),
    },
    stateEffects: {
      transitionKind: execution.transition.kind,
      commitmentCreated: execution.transition.kind === "committed",
      eventCount: execution.events.length,
      learnerEvidenceFabricated: false,
    },
    structuredProvenance: execution.decision.provenance.references.filter((reference) =>
      reference.kind === "learning-experience" ||
      reference.kind === "learning-experience-version" ||
      reference.kind === "delivery-compatibility"),
  };
}

console.log(JSON.stringify({
  engineBoundary: {
    headless: true,
    clientCapabilityDetection: false,
    persistenceImplemented: false,
    externalAssessmentInvoked: false,
    providerInvoked: false,
  },
  scenarioACompatibleDelivery: evaluateScenario("compatible", ["displayed-text", "displayed-notation"]),
  scenarioBIncompatibleDelivery: evaluateScenario("incompatible", ["displayed-text"]),
}, null, 2));
