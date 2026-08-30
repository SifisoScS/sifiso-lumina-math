import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  conceptRelationship,
  DomainValidationError,
  functionsSeedKnowledge,
  knowledgeAsset,
  learningExperience,
} from "../src/index.js";
import { evidenceTypeCollection } from "../cli/session.js";

test("Functions seed knowledge resolves as a consistent versioned catalog", () => {
  assert.equal(functionsSeedKnowledge.domains.length, 1);
  assert.equal(functionsSeedKnowledge.topics.length, 1);

  // Floors, not exact figures. An exact count turns every addition to the
  // corpus into a failing test, which teaches whoever is writing content that
  // the guards are an obstacle rather than a help -- and the guards worth
  // having are the ones about whether the content reaches a learner, not the
  // ones about how much of it there is.
  assert.ok(functionsSeedKnowledge.concepts.length >= 3);
  assert.ok(functionsSeedKnowledge.relationships.length >= 4);
  assert.ok(functionsSeedKnowledge.assets.length >= 33);
  assert.ok(functionsSeedKnowledge.experiences.length >= 17);

  // Looked up by kind rather than by position, so reordering the corpus is not
  // a failure and adding to it does not shift what is being asserted.
  const semantics = new Map(
    functionsSeedKnowledge.relationships.map((relationship) => [relationship.kind, relationship.semanticKind]),
  );
  assert.equal(semantics.get("prerequisite"), "prerequisite-of");
  assert.equal(semantics.get("related"), "related-to");
  assert.equal(semantics.get("concept-bridge"), "bridges-to");
});

test("every experience intent a layer can offer has content behind it", () => {
  // `concept-bridge` was a declared intent, suitable at the intuition layer,
  // with no experience anywhere in the corpus. The vocabulary said a learner
  // could be shown how one idea leads to another, and nothing ever was.
  //
  // The set of intents is derived from the pedagogical guidance rather than
  // written out here, so a new intent that some layer can offer joins this
  // check on the day it is declared.
  const offerable = new Set(
    canonicalPedagogicalGuidance.flatMap((guidance) => guidance.suitableExperienceIntents),
  );
  const written = new Set(functionsSeedKnowledge.experiences.map((experience) => experience.intent));

  for (const intent of offerable) {
    assert.ok(
      written.has(intent),
      `no experience has intent "${intent}", so a layer that would offer it has nothing to offer`,
    );
  }
});

test("every concept a learner can reach has somewhere to go from it", () => {
  // A concept with no relationship is a dead end: nothing bridges to it, no
  // prerequisite points at it, and a learner who opens it can only leave the
  // way they came.
  for (const concept of functionsSeedKnowledge.concepts) {
    const connected = functionsSeedKnowledge.relationships.some((relationship) =>
      relationship.sourceConceptId === concept.id || relationship.targetConceptId === concept.id,
    );
    assert.ok(connected, `${concept.title} is not connected to anything else in the graph`);
  }
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
  const representation = functionsSeedKnowledge.assets.find((candidate) => candidate.id === "asset.function.table-representation");
  assert.equal(representation?.representationForm, "numerical");
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

// ---------------------------------------------------------------------------
// Content that cannot be reached is content that does not exist
// ---------------------------------------------------------------------------

test("every published experience can actually be offered to a learner", () => {
  // `experience.function.practice-input-output` declared intent "practice" at
  // the "intuition" layer. Practice is suitable at "mechanics" and
  // "exam-patterns" and never at "intuition", so the only practice experience
  // in the corpus was filtered out of every decision. No learner was ever
  // offered a single question to try, in any concept, and nothing said so --
  // the catalogue validated, the experience existed, and it was simply
  // unreachable. A corpus can be wrong in ways a type cannot catch.
  for (const experience of functionsSeedKnowledge.experiences) {
    const reachable = canonicalPedagogicalGuidance.some((guidance) =>
      experience.pedagogicalLayers.includes(guidance.layer) &&
      guidance.suitableExperienceIntents.includes(experience.intent),
    );
    assert.ok(
      reachable,
      `${experience.id} declares intent "${experience.intent}" at ${experience.pedagogicalLayers.join("/")}, ` +
        "where that intent is not suitable, so it can never be offered",
    );
  }
});

test("every concept carries material at more than one pedagogical layer", () => {
  // Two of the three concepts had a single asset each. A learner picking one
  // saw one sentence and ran out.
  for (const concept of functionsSeedKnowledge.concepts) {
    const layers = new Set(
      functionsSeedKnowledge.assets
        .filter((asset) => asset.conceptIds.includes(concept.id))
        .flatMap((asset) => asset.supportedLayers),
    );
    assert.ok(
      layers.size > 1,
      `${concept.title} has material at only ${[...layers].join(", ") || "no layer"}`,
    );
  }
});

test("every concept can be practised, not only read", () => {
  for (const concept of functionsSeedKnowledge.concepts) {
    const practisable = functionsSeedKnowledge.experiences.some((experience) =>
      experience.targetConceptIds.includes(concept.id) &&
      experience.expectedEvidenceTypes.includes("practice-attempt"),
    );
    assert.ok(practisable, `${concept.title} offers a learner nothing to attempt`);
  }
});

test("every knowledge asset is used by at least one experience", () => {
  const used = new Set(functionsSeedKnowledge.experiences.flatMap((e) => e.knowledgeAssetIds));
  for (const asset of functionsSeedKnowledge.assets) {
    assert.ok(used.has(asset.id), `${asset.id} is written but no experience shows it to anyone`);
  }
});

test("a learner can actually supply every kind of evidence the corpus asks for", () => {
  // An experience declaring `expectedEvidenceTypes` is a promise that a learner
  // can do that thing. Three practice experiences made that promise while no
  // surface could take an answer: a learner was shown a question and given
  // nowhere to put a response. Offerable is not the same as answerable, and
  // nothing connected what the corpus declares to what a surface implements.
  for (const experience of functionsSeedKnowledge.experiences) {
    if (experience.status !== "published") continue;
    for (const type of experience.expectedEvidenceTypes) {
      assert.equal(
        evidenceTypeCollection(type),
        "collected",
        `${experience.id} expects ${type}, which no surface can collect`,
      );
    }
  }
});
