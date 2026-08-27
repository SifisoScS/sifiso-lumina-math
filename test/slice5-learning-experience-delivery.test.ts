import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  evaluateExperienceCompletion,
  executeDeterministicLearningInteraction,
  filterExperiencesForDelivery,
  functionsSeedKnowledge,
  isoTimestamp,
  knowledgeCatalog,
  learnerRecord,
  learningExperience,
  requestLearningGuidanceCommand,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.slice5";
const timestamp = isoTimestamp("2026-08-27T15:00:00.000Z");
const actor = trustedActorContext({
  actorId: "actor.slice5",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision"],
});

function record(layer: "intuition" | "mechanics" | "exam-patterns") {
  const state = currentLearnerState({
    learnerId,
    engagementFocus: "active-focus",
    activeConceptId: "concept.function",
    activePedagogicalLayer: layer,
  });
  return learnerRecord({ learnerId: state.learnerId, evidence: [], events: [], interpretations: [], state, commitments: [] });
}

function decisionFor(input: {
  readonly layer: "intuition" | "mechanics" | "exam-patterns";
  readonly capabilities: readonly ("displayed-text" | "displayed-notation" | "typed-input")[];
  readonly commandId: string;
  readonly catalog?: typeof functionsSeedKnowledge;
}) {
  return executeDeterministicLearningInteraction({
    command: requestLearningGuidanceCommand({
      id: input.commandId,
      commandReference: `occurrence.${input.commandId}`,
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.function",
    }),
    actor,
    deliveryCapabilities: deliveryCapabilityProfile(input.capabilities),
    learnerRecord: record(input.layer),
    knowledgeCatalog: input.catalog ?? functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });
}

test("LearningExperience declares stable identity, version, interaction requirements, expected evidence, and completion semantics", () => {
  const practice = functionsSeedKnowledge.experiences.find((experience) => experience.id === "experience.function.practice-input-output");
  assert.notEqual(practice, undefined);
  assert.equal(practice?.version, "math-lumina.seed.v1");
  assert.deepEqual(practice?.learnerInteractionRequirements, ["practice-input"]);
  assert.deepEqual(practice?.expectedEvidenceTypes, ["practice-attempt"]);
  assert.deepEqual(practice?.completionSemantics, {
    deliveryAloneIsCompletion: false,
    requiresLearnerInteraction: true,
    evidenceRequiredForCompletion: true,
  });
});

test("Delivery capability declarations filter compatible experiences without client or device detection", () => {
  const mechanics = functionsSeedKnowledge.experiences.filter((experience) => experience.id === "experience.function.mechanics-notation");
  const compatible = filterExperiencesForDelivery(mechanics, deliveryCapabilityProfile(["displayed-text", "displayed-notation"]));
  const incompatible = filterExperiencesForDelivery(mechanics, deliveryCapabilityProfile(["displayed-text"]));
  assert.equal(compatible.compatible.length, 1);
  assert.equal(compatible.incompatible.length, 0);
  assert.equal(incompatible.compatible.length, 0);
  assert.deepEqual(incompatible.incompatible[0]?.missingCapabilities, ["displayed-notation"]);
  assert.equal(incompatible.noCompatibleExperience, true);
});

test("a compatible delivery context returns only compatible experience opportunities and keeps the decision semantic", () => {
  const result = decisionFor({
    layer: "mechanics",
    capabilities: ["displayed-text", "displayed-notation"],
    commandId: "command.slice5.compatible",
  });
  assert.equal(result.decision.type, "material");
  assert.equal(result.decision.status, "offer-available");
  const mechanicsOpportunity = result.decision.opportunities.find((opportunity) =>
    opportunity.learningExperienceId === "experience.function.mechanics-notation",
  );
  assert.notEqual(mechanicsOpportunity, undefined);
  assert.equal(result.diagnostics.deliveryCompatibility?.compatible.some((item) => item.experience.id === "experience.function.mechanics-notation"), true);
  assert.equal(Object.keys(result.decision).some((key) => /route|component|dom|css|screen|browser/i.test(key)), false);
});

test("an incompatible delivery context cannot silently downgrade an experience and returns a non-committing material decline", () => {
  const result = decisionFor({
    layer: "mechanics",
    capabilities: ["displayed-text"],
    commandId: "command.slice5.incompatible",
  });
  assert.equal(result.diagnostics.deliveryCompatibility?.noCompatibleExperience, true);
  assert.equal(result.diagnostics.deliveryCompatibility?.incompatible[0]?.experience.id, "experience.function.mechanics-notation");
  assert.equal(result.decision.type, "material");
  assert.equal(result.decision.status, "declined");
  assert.deepEqual(result.decision.offers, []);
  assert.equal(result.transition.kind, "not-committed");
  assert.equal(result.decision.policyEvaluations.some((evaluation) => evaluation.policyId === "policy.delivery-capability"), true);
});

test("experience completion distinguishes delivered material from evidence-bearing completion and never fabricates learner evidence", () => {
  const practice = functionsSeedKnowledge.experiences.find((experience) => experience.id === "experience.function.practice-input-output");
  if (practice === undefined) throw new Error("Expected practice seed experience.");
  const available = filterExperiencesForDelivery([practice], deliveryCapabilityProfile(["displayed-text", "typed-input"])).compatible[0];
  const unavailable = filterExperiencesForDelivery([practice], deliveryCapabilityProfile(["displayed-text"])).incompatible[0];
  if (available === undefined || unavailable === undefined) throw new Error("Expected both delivery evaluations.");

  const missing = evaluateExperienceCompletion({ experience: practice, delivery: available });
  const completed = evaluateExperienceCompletion({
    experience: practice,
    delivery: available,
    observedEvidenceTypes: ["practice-attempt"],
  });
  const deliveryFailure = evaluateExperienceCompletion({ experience: practice, delivery: unavailable });
  assert.equal(missing.status, "missing-required-evidence");
  assert.deepEqual(missing.missingEvidenceTypes, ["practice-attempt"]);
  assert.equal(completed.status, "evidence-bearing-completion");
  assert.equal(deliveryFailure.status, "delivery-unavailable");
  assert.equal(missing.learnerEvidenceFabricated, false);
  assert.equal(completed.learnerStateEffectAuthorized, false);
});

test("newer LearningExperience versions create new provenance without silently rewriting historical decisions", () => {
  const original = decisionFor({
    layer: "mechanics",
    capabilities: ["displayed-text", "displayed-notation"],
    commandId: "command.slice5.version.original",
  });
  const priorExperience = functionsSeedKnowledge.experiences.find((experience) => experience.id === "experience.function.mechanics-notation");
  if (priorExperience === undefined) throw new Error("Expected mechanics seed experience.");
  const revisedExperience = learningExperience({
    id: priorExperience.id,
    title: priorExperience.title,
    intent: priorExperience.intent,
    targetConceptIds: priorExperience.targetConceptIds,
    knowledgeAssetIds: priorExperience.knowledgeAssetIds,
    pedagogicalLayers: priorExperience.pedagogicalLayers,
    deliveryRequirements: priorExperience.deliveryRequirements,
    learnerInteractionRequirements: priorExperience.learnerInteractionRequirements,
    expectedEvidenceTypes: priorExperience.expectedEvidenceTypes,
    completionSemantics: {
      requiresLearnerInteraction: priorExperience.completionSemantics.requiresLearnerInteraction,
      evidenceRequiredForCompletion: priorExperience.completionSemantics.evidenceRequiredForCompletion,
    },
    version: "math-lumina.seed.v2",
  });
  const revisedCatalog = knowledgeCatalog({
    ...functionsSeedKnowledge,
    experiences: functionsSeedKnowledge.experiences.map((experience) =>
      experience.id === revisedExperience.id ? revisedExperience : experience),
  });
  const revised = decisionFor({
    layer: "mechanics",
    capabilities: ["displayed-text", "displayed-notation"],
    commandId: "command.slice5.version.revised",
    catalog: revisedCatalog,
  });
  assert.equal(original.decision.provenance.references.some((reference) =>
    reference.kind === "learning-experience-version" && reference.id === "experience.function.mechanics-notation.math-lumina.seed.v1"), true);
  assert.equal(revised.decision.provenance.references.some((reference) =>
    reference.kind === "learning-experience-version" && reference.id === "experience.function.mechanics-notation.math-lumina.seed.v2"), true);
  assert.equal(original.decision.provenance.references.some((reference) =>
    reference.id === "experience.function.mechanics-notation.math-lumina.seed.v2"), false);
});

test("invalid semantic completion definitions are rejected rather than assuming evidence or learner interaction", () => {
  assert.throws(() => learningExperience({
    id: "experience.slice5.invalid-evidence",
    title: "Invalid evidence completion",
    intent: "reflection",
    targetConceptIds: ["concept.function"],
    knowledgeAssetIds: ["asset.function.vending-machine-representation"],
    pedagogicalLayers: ["intuition"],
    learnerInteractionRequirements: ["reflection"],
    expectedEvidenceTypes: [],
    completionSemantics: { requiresLearnerInteraction: true, evidenceRequiredForCompletion: true },
    version: "math-lumina.seed.v1",
  }));
});
