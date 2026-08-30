import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  concept,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  luminaCurriculum,
  isoTimestamp,
  knowledgeAsset,
  knowledgeCatalog,
  learnerRecord,
  practiceAttempt,
  resolveKnowledgeContext,
  requestLearningGuidanceCommand,
  submitPracticeAttemptCommand,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.slice4";
const timestamp = isoTimestamp("2026-08-27T13:00:00.000Z");
const actor = trustedActorContext({
  actorId: "actor.slice4",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision", "submit-learner-evidence"],
});
const capabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);

function record() {
  const state = currentLearnerState({ learnerId, engagementFocus: "unobserved" });
  return learnerRecord({ learnerId: state.learnerId, evidence: [], events: [], interpretations: [], state, commitments: [] });
}

function execute(command: Parameters<typeof executeDeterministicLearningInteraction>[0]["command"], catalog = luminaCurriculum) {
  return executeDeterministicLearningInteraction({
    command,
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: record(),
    knowledgeCatalog: catalog,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });
}

test("Slice 4 knowledge graph uses stable identity, explicit approved semantics, and a deliberately bounded local resolver", () => {
  const functionContext = resolveKnowledgeContext({ catalog: luminaCurriculum, conceptId: "concept.function" as never });
  const domainRangeContext = resolveKnowledgeContext({ catalog: luminaCurriculum, conceptId: "concept.domain-range" as never });
  assert.notEqual(functionContext, undefined);
  assert.notEqual(domainRangeContext, undefined);
  if (functionContext === undefined || domainRangeContext === undefined) throw new Error("Published seed concepts must resolve.");
  assert.equal(functionContext.targetConcept.id, "concept.function");
  assert.equal(domainRangeContext.prerequisiteConcepts[0]?.id, "concept.function");
  assert.equal(functionContext.relatedConcepts[0]?.id, "concept.domain-range");
  assert.equal(functionContext.bridgeConcepts[0]?.id, "concept.inverse-function");
  assert.equal(domainRangeContext.semanticRelations.some((relation) => relation.semantic === "prerequisite-of"), true);
  assert.equal(functionContext.semanticRelations.some((relation) => relation.semantic === "related-to"), true);
  assert.equal(functionContext.semanticRelations.some((relation) => relation.semantic === "bridges-to"), true);
  assert.equal(functionContext.semanticRelations.some((relation) => relation.semantic === "represents"), true);
  assert.equal(functionContext.semanticRelations.some((relation) => relation.semantic === "exemplifies"), true);
  assert.equal(functionContext.semanticRelations.some((relation) => relation.semantic === "contrasts-with"), true);
  assert.ok(functionContext.versionReferences.every((reference) => reference.objectId.length > 0 && reference.version === "math-lumina.seed.v1"));
});

test("multiple independently addressable representation forms and layer-compatible experiences resolve without UI coupling", () => {
  const all = resolveKnowledgeContext({ catalog: luminaCurriculum, conceptId: "concept.function" as never });
  const intuition = resolveKnowledgeContext({
    catalog: luminaCurriculum,
    conceptId: "concept.function" as never,
    pedagogicalLayer: "intuition",
  });
  const mechanics = resolveKnowledgeContext({
    catalog: luminaCurriculum,
    conceptId: "concept.function" as never,
    pedagogicalLayer: "mechanics",
  });
  assert.notEqual(all, undefined);
  assert.notEqual(intuition, undefined);
  assert.notEqual(mechanics, undefined);
  if (all === undefined || intuition === undefined || mechanics === undefined) throw new Error("Expected knowledge contexts to resolve.");
  assert.deepEqual(
    new Set(all.representationAssets.map((asset) => asset.representationForm)),
    // "verbal" arrived with the bridge asset that speaks from a function
    // toward reversing one.
    new Set(["contextual", "visual", "symbolic", "numerical", "graphical", "verbal"]),
  );
  assert.equal(intuition.relevantExperiences.every((experience) => experience.pedagogicalLayers.includes("intuition")), true);
  assert.equal(mechanics.relevantExperiences.every((experience) => experience.pedagogicalLayers.includes("mechanics")), true);
  assert.equal(mechanics.procedureAssets.some((asset) => asset.id === "asset.function.notation-procedure"), true);
});

test("misconception knowledge is available only through explicit supported context and is never inferred from a raw practice response", () => {
  const unsupported = resolveKnowledgeContext({ catalog: luminaCurriculum, conceptId: "concept.function" as never });
  const supported = resolveKnowledgeContext({
    catalog: luminaCurriculum,
    conceptId: "concept.function" as never,
    supportedMisconceptionAssetIds: ["asset.function.input-output-misconception" as never],
  });
  assert.equal(unsupported?.misconceptionAssets.length, 0);
  assert.equal(supported?.misconceptionAssets[0]?.id, "asset.function.input-output-misconception");

  const rawPractice = practiceAttempt({
    id: "evidence.slice4.raw-practice",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "Any free-text answer remains learner-owned response, not a misconception label.",
    submittedAt: timestamp,
  });
  const result = execute(submitPracticeAttemptCommand({
    id: "command.slice4.raw-practice",
    commandReference: "occurrence.slice4.raw-practice",
    learnerId,
    issuedAt: timestamp,
    practiceAttempt: rawPractice,
  }));
  assert.equal(result.derivedInterpretations.some((interpretation) => interpretation.kind === "misconception-hypothesis"), false);
});

test("material decisions cite resolved knowledge and version context while safe outcomes remain conceptless", () => {
  const material = execute(requestLearningGuidanceCommand({
    id: "command.slice4.material",
    commandReference: "occurrence.slice4.material",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }));
  assert.equal(material.decision.type, "material");
  assert.equal(material.decision.provenance.references.some((reference) => reference.kind === "knowledge" && reference.id === "concept.function"), true);
  assert.equal(material.decision.provenance.references.some((reference) => reference.kind === "knowledge-version" && reference.id === "concept.function.math-lumina.seed.v1"), true);

  const missing = executeDeterministicLearningInteraction({
    command: requestLearningGuidanceCommand({
      id: "command.slice4.safe",
      commandReference: "occurrence.slice4.safe",
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.not-published",
    }),
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: record(),
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });
  assert.equal(missing.decision.type, "safe-non-material");
  assert.deepEqual(missing.decision.conceptIds, []);
  assert.deepEqual(missing.decision.opportunities, []);
});

test("candidate opportunities reference real knowledge objects and preserve voluntary non-linear pedagogical paths", () => {
  const domainRangeResult = execute(requestLearningGuidanceCommand({
    id: "command.slice4.grounded-prerequisite",
    commandReference: "occurrence.slice4.grounded-prerequisite",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.domain-range",
  }));
  const functionResult = execute(requestLearningGuidanceCommand({
    id: "command.slice4.grounded-bridge",
    commandReference: "occurrence.slice4.grounded-bridge",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }));
  const prerequisite = domainRangeResult.decision.opportunities.find((opportunity) => opportunity.kind === "revisit-prerequisite");
  const bridge = functionResult.decision.opportunities.find((opportunity) => opportunity.kind === "explore-concept-bridge");
  assert.equal(prerequisite?.relatedConceptId, "concept.function");
  assert.equal(prerequisite?.knowledgeRelationshipId, "relationship.function-prerequisite-domain-range");
  assert.equal(bridge?.relatedConceptId, "concept.inverse-function");
  assert.equal(bridge?.knowledgeRelationshipId, "relationship.function-bridge-inverse-function");
  assert.equal(functionResult.decision.opportunities.some((opportunity) => opportunity.kind === "move-toward-layer"), false);
  assert.equal(domainRangeResult.transition.kind, "not-committed");
});

test("a later knowledge version creates a new decision context without rewriting the immutable earlier decision provenance", () => {
  const original = execute(requestLearningGuidanceCommand({
    id: "command.slice4.version.original",
    commandReference: "occurrence.slice4.version.original",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }));
  const revisedConcept = concept({
    id: "concept.function",
    topicId: "topic.functions",
    title: "What is a Function?",
    conceptualDescription: "A function associates each input with one output according to a rule; this version clarifies the same concept.",
    version: "math-lumina.seed.v2",
  });
  const revisedCatalog = knowledgeCatalog({
    ...luminaCurriculum,
    concepts: luminaCurriculum.concepts.map((candidate) => candidate.id === revisedConcept.id ? revisedConcept : candidate),
  });
  const revised = execute(requestLearningGuidanceCommand({
    id: "command.slice4.version.revised",
    commandReference: "occurrence.slice4.version.revised",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }), revisedCatalog);
  assert.equal(original.decision.provenance.references.some((reference) => reference.id === "concept.function.math-lumina.seed.v1"), true);
  assert.equal(revised.decision.provenance.references.some((reference) => reference.id === "concept.function.math-lumina.seed.v2"), true);
  assert.equal(original.decision.provenance.references.some((reference) => reference.id === "concept.function.math-lumina.seed.v2"), false);
});

test("representation assets require an explicit form and cannot be confused with non-representation knowledge", () => {
  assert.throws(() => knowledgeAsset({
    id: "asset.slice4.invalid-representation",
    kind: "representation",
    title: "Invalid untyped representation",
    content: "A representation requires a form.",
    conceptIds: ["concept.function"],
    supportedLayers: ["intuition"],
    version: "math-lumina.seed.v1",
  }));
  assert.throws(() => knowledgeAsset({
    id: "asset.slice4.invalid-example",
    kind: "example",
    representationForm: "numerical",
    title: "Invalid typed example",
    content: "Only representation assets identify a representation form.",
    conceptIds: ["concept.function"],
    supportedLayers: ["intuition"],
    version: "math-lumina.seed.v1",
  }));
});
