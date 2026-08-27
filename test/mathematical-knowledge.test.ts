import assert from "node:assert/strict";
import test from "node:test";

import {
  conceptRelationship,
  DomainValidationError,
  functionsSeedKnowledge,
  knowledgeAsset,
  learningExperience,
} from "../src/index.js";

test("minimal Functions seed knowledge resolves as a consistent versioned catalog", () => {
  assert.equal(functionsSeedKnowledge.domains.length, 1);
  assert.equal(functionsSeedKnowledge.topics.length, 1);
  assert.equal(functionsSeedKnowledge.concepts.length, 3);
  assert.equal(functionsSeedKnowledge.relationships.length, 2);
  assert.equal(functionsSeedKnowledge.assets.length, 7);
  assert.equal(functionsSeedKnowledge.experiences.length, 4);
  assert.equal(functionsSeedKnowledge.relationships[0]?.kind, "prerequisite");
  assert.equal(functionsSeedKnowledge.relationships[1]?.kind, "concept-bridge");
});

test("concept relationships remain explicit, typed, and non-self-referential", () => {
  assert.throws(
    () => conceptRelationship({
      id: "relationship.invalid-self",
      kind: "prerequisite",
      sourceConceptId: "concept.function",
      targetConceptId: "concept.function",
      rationale: "Invalid self relationship.",
      version: "math-lumina.seed.v1",
    }),
    DomainValidationError,
  );
});

test("knowledge assets preserve non-judgmental misconception semantics and layer context", () => {
  const asset = knowledgeAsset({
    id: "asset.function.test-misconception",
    kind: "misconception",
    title: "Potential input-output confusion",
    content: "A misconception asset describes a possible interpretation pattern without assigning it to a learner.",
    conceptIds: ["concept.function"],
    supportedLayers: ["intuition", "mechanics"],
    version: "math-lumina.seed.v1",
  });
  assert.deepEqual(asset.supportedLayers, ["intuition", "mechanics"]);
  assert.equal(asset.kind, "misconception");
});

test("learning experiences use generic delivery requirements rather than presentation components", () => {
  const experience = learningExperience({
    id: "experience.function.voice-compatible",
    title: "Function relationship spoken explanation",
    intent: "intuition",
    targetConceptIds: ["concept.function"],
    knowledgeAssetIds: ["asset.function.vending-machine-representation"],
    pedagogicalLayers: ["intuition"],
    deliveryRequirements: ["spoken-output"],
    version: "math-lumina.seed.v1",
  });
  assert.deepEqual(experience.deliveryRequirements, ["spoken-output"]);
  assert.ok(!Object.keys(experience).some((key) => /route|page|component|jsx|html/i.test(key)));
});
