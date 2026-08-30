import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  conceptRelationship,
  ConceptRelationshipKind,
  DomainValidationError,
  luminaCurriculum,
  knowledgeAsset,
  LearningExperience,
  learningExperience,
} from "../src/index.js";
import { candidateLearningOpportunity } from "../src/contracts/core-contracts.js";
import { materialFor } from "../cli/describe.js";
import { evidenceTypeCollection } from "../cli/session.js";

test("the curriculum resolves as a consistent versioned catalogue", () => {
  // One domain is a scope decision rather than a quantity, so it is asserted
  // exactly: a second mathematics domain would be a change worth stopping for.
  assert.equal(luminaCurriculum.domains.length, 1);

  // Everything below is a floor, not an exact figure. An exact count turns
  // every addition to the corpus into a failing test, which teaches whoever is
  // writing content that the guards are an obstacle rather than a help -- and
  // the guards worth having are the ones about whether the content reaches a
  // learner, not the ones about how much of it there is.
  //
  // More than one topic is the floor that matters here. A learner who finishes
  // one topic has to have somewhere to go, and a single topic can be completed
  // in a sitting or two.
  assert.ok(luminaCurriculum.topics.length >= 2);
  assert.ok(luminaCurriculum.concepts.length >= 10);
  assert.ok(luminaCurriculum.relationships.length >= 18);
  assert.ok(luminaCurriculum.assets.length >= 100);
  assert.ok(luminaCurriculum.experiences.length >= 60);

  // Looked up by kind rather than by position, so reordering the corpus is not
  // a failure and adding to it does not shift what is being asserted.
  const semantics = new Map(
    luminaCurriculum.relationships.map((relationship) => [relationship.kind, relationship.semanticKind]),
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
  const written = new Set(luminaCurriculum.experiences.map((experience) => experience.intent));

  for (const intent of offerable) {
    assert.ok(
      written.has(intent),
      `no experience has intent "${intent}", so a layer that would offer it has nothing to offer`,
    );
  }
});

test("no part of the curriculum is cut off from the rest of it", () => {
  // The per-concept check below cannot see an island. Two topics can each be
  // connected inside themselves and never touch, and every concept in both
  // still passes: a learner who started in one would simply never discover that
  // the other existed, and nothing in the corpus would say so.
  //
  // This is what makes the cross-topic relationships load-bearing rather than
  // decorative. Delete them and this fails; the per-concept check does not.
  const neighbours = new Map<string, string[]>();
  for (const item of luminaCurriculum.concepts) {
    neighbours.set(item.id, []);
  }
  for (const relationship of luminaCurriculum.relationships) {
    neighbours.get(relationship.sourceConceptId)?.push(relationship.targetConceptId);
    neighbours.get(relationship.targetConceptId)?.push(relationship.sourceConceptId);
  }

  const start = luminaCurriculum.concepts[0];
  assert.ok(start, "the curriculum has no concepts at all");
  const reached = new Set<string>([start.id]);
  const queue: string[] = [start.id];
  while (queue.length > 0) {
    const current = queue.shift();
    if (current === undefined) break;
    for (const next of neighbours.get(current) ?? []) {
      if (reached.has(next)) continue;
      reached.add(next);
      queue.push(next);
    }
  }

  const stranded = luminaCurriculum.concepts
    .filter((item) => !reached.has(item.id))
    .map((item) => item.title);
  assert.deepEqual(stranded, [], `unreachable from ${start.title}: ${stranded.join(", ")}`);
});

test("every concept has material of its own at every depth", () => {
  // Phase 10 is about a learner returning across sessions, and the reason to
  // return to a concept already read is to meet it at a different depth. A
  // depth with nothing of its own is a depth that gives a returning learner
  // back what they have already seen.
  //
  // The first version of this test asked only whether *something* was offerable
  // at each layer, and a deliberate break did not fail it: every concept has a
  // reflection experience declared at all three layers, so the answer was
  // always yes and the test proved nothing. Hence the second condition below --
  // at each layer there must be something offerable *there* that is not
  // offerable everywhere.
  //
  // Note also what this checks that "carries material at more than one layer"
  // does not: an asset supporting a layer is content sitting in the corpus,
  // while an experience offerable at that layer is content a learner can
  // actually be handed. The corpus had assets at layers nothing could offer.
  const offerableLayers = (experience: LearningExperience) =>
    canonicalPedagogicalGuidance
      .filter((guidance) =>
        experience.pedagogicalLayers.includes(guidance.layer) &&
        guidance.suitableExperienceIntents.includes(experience.intent),
      )
      .map((guidance) => guidance.layer);

  for (const item of luminaCurriculum.concepts) {
    const here = luminaCurriculum.experiences.filter((experience) =>
      experience.targetConceptIds.includes(item.id),
    );
    for (const guidance of canonicalPedagogicalGuidance) {
      const specific = here.filter((experience) => {
        const layers = offerableLayers(experience);
        return layers.includes(guidance.layer) && layers.length < canonicalPedagogicalGuidance.length;
      });
      assert.ok(
        specific.length > 0,
        `${item.title} has nothing of its own at the ${guidance.layer} layer, ` +
          "so a learner returning at that depth meets what they already read",
      );
    }
  }
});

test("a bridge experience actually crosses to somewhere", () => {
  // An experience with intent "concept-bridge" promises a learner that one idea
  // leads to another. Showing only material from where they already are keeps
  // the promise in the title and nowhere else, and the type system is happy
  // either way -- `concept-bridge` is a string, and a bridge to nowhere is
  // spelled exactly like a bridge.
  //
  // So: it must carry material from a concept it does not target, at least one
  // of those concepts must be somewhere the graph says it bridges to, and every
  // one of them must at least be connected to where the learner is standing.
  //
  // The middle clause and the last clause are separate on purpose, and the
  // first run of this test is why. Demanding a bridge edge to *every* far-side
  // concept failed a bridge that also carries one sentence about number
  // patterns -- which arithmetic sequences have as a prerequisite, so it is
  // material the learner has already met rather than a stray crossing. The
  // check was wrong there, and it is still the check that stops a bridge
  // reaching a concept nothing connects it to.
  const edges = (kinds: readonly ConceptRelationshipKind[]) =>
    new Set(
      luminaCurriculum.relationships
        .filter((relationship) => kinds.includes(relationship.kind))
        .flatMap((relationship) => [
          `${relationship.sourceConceptId}->${relationship.targetConceptId}`,
          `${relationship.targetConceptId}->${relationship.sourceConceptId}`,
        ]),
    );
  const bridged = edges(["concept-bridge"]);
  const connected = edges(["concept-bridge", "prerequisite", "related"]);

  for (const experience of luminaCurriculum.experiences) {
    if (experience.intent !== "concept-bridge") continue;
    const here = [...new Set<string>(experience.targetConceptIds)];
    const farSide = [
      ...new Set(
        luminaCurriculum.assets
          .filter((asset) => experience.knowledgeAssetIds.includes(asset.id))
          .flatMap((asset) => asset.conceptIds)
          .filter((conceptId) => !here.includes(conceptId)),
      ),
    ];

    assert.ok(
      farSide.length > 0,
      `${experience.id} is a bridge that shows nothing from the other side`,
    );
    assert.ok(
      farSide.some((there) => here.some((from) => bridged.has(`${from}->${there}`))),
      `${experience.id} reaches ${farSide.join(", ")}, none of which ${here.join("/")} bridges to`,
    );
    for (const there of farSide) {
      assert.ok(
        here.some((from) => connected.has(`${from}->${there}`)),
        `${experience.id} carries material from ${there}, which is unconnected to ${here.join("/")}`,
      );
    }
  }
});

test("every concept a learner can reach has somewhere to go from it", () => {
  // A concept with no relationship is a dead end: nothing bridges to it, no
  // prerequisite points at it, and a learner who opens it can only leave the
  // way they came.
  for (const concept of luminaCurriculum.concepts) {
    const connected = luminaCurriculum.relationships.some((relationship) =>
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
  const representation = luminaCurriculum.assets.find((candidate) => candidate.id === "asset.function.table-representation");
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
  for (const experience of luminaCurriculum.experiences) {
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
  for (const concept of luminaCurriculum.concepts) {
    const layers = new Set(
      luminaCurriculum.assets
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
  for (const concept of luminaCurriculum.concepts) {
    const practisable = luminaCurriculum.experiences.some((experience) =>
      experience.targetConceptIds.includes(concept.id) &&
      experience.expectedEvidenceTypes.includes("practice-attempt"),
    );
    assert.ok(practisable, `${concept.title} offers a learner nothing to attempt`);
  }
});

test("every knowledge asset is used by at least one experience", () => {
  const used = new Set(luminaCurriculum.experiences.flatMap((e) => e.knowledgeAssetIds));
  for (const asset of luminaCurriculum.assets) {
    assert.ok(used.has(asset.id), `${asset.id} is written but no experience shows it to anyone`);
  }
});

test("an experience that asks for an answer poses a question", () => {
  // Twenty-four experiences declared `expectedEvidenceTypes: ["practice-attempt"]`,
  // both surfaces collected an answer, every guard in this file passed, and no
  // asset in the corpus posed a question. A learner who chose "Try a question"
  // was shown a worked example -- which gave away the method -- and then an
  // answer prompt, and typed a number in reply to nothing at all.
  //
  // Nothing could see it. `expectedEvidenceTypes` said what the surface should
  // collect and never what the learner should be asked, and there was no asset
  // kind that could hold a question, so the corpus could not be wrong about
  // this in a way any type or test could detect. Found by walking a session.
  //
  // The check is on `question` assets rather than on a question mark, because
  // "Write down the next two terms" is a question and does not end in one.
  for (const experience of luminaCurriculum.experiences) {
    if (experience.status !== "published") continue;
    if (!experience.expectedEvidenceTypes.includes("practice-attempt")) continue;

    const asks = experience.knowledgeAssetIds.some((assetId) => {
      const asset = luminaCurriculum.assets.find((candidate) => candidate.id === assetId);
      return asset?.kind === "question" && asset.status === "published";
    });
    assert.ok(
      asks,
      `${experience.id} takes an answer from a learner without asking them anything`,
    );
  }
});

test("a question is the last thing a learner reads before answering", () => {
  // A question shown above the material that supports it is a question asked
  // too early. The thing immediately above the answer box has to be the thing
  // being asked.
  //
  // The experience is built here, with the question declared FIRST, because the
  // corpus happens to list its questions last already -- so a test using real
  // content would pass whether or not anything sorted, and did. Declaration
  // order must not be what makes this true.
  const question = luminaCurriculum.assets.find((asset) => asset.kind === "question");
  assert.ok(question);
  const support = luminaCurriculum.assets.find((asset) =>
    asset.kind === "example" && asset.conceptIds.some((id) => question.conceptIds.includes(id)),
  );
  assert.ok(support, "no supporting material shares a concept with a question");

  const experience = learningExperience({
    id: "experience.test.question-ordering",
    title: "Question first, on purpose",
    intent: "practice",
    targetConceptIds: [question.conceptIds[0] as string],
    knowledgeAssetIds: [question.id, support.id],
    pedagogicalLayers: ["mechanics"],
    deliveryRequirements: ["displayed-text", "typed-input"],
    learnerInteractionRequirements: ["practice-input"],
    expectedEvidenceTypes: ["practice-attempt"],
    completionSemantics: { requiresLearnerInteraction: true, evidenceRequiredForCompletion: true },
    version: "math-lumina.seed.v1",
  });

  const lines = materialFor(
    candidateLearningOpportunity({
      id: "opportunity.test.practise",
      kind: "practise",
      conceptId: question.conceptIds[0] as string,
      learningExperienceId: experience.id,
    }),
    {
      topics: luminaCurriculum.topics,
      concepts: luminaCurriculum.concepts,
      assets: luminaCurriculum.assets,
      experiences: [...luminaCurriculum.experiences, experience],
    },
  );

  assert.ok(lines.includes(support.content), "the supporting material was not shown at all");
  assert.equal(lines.at(-1), question.content, "the question was not the last thing shown");
});

test("a learner can actually supply every kind of evidence the corpus asks for", () => {
  // An experience declaring `expectedEvidenceTypes` is a promise that a learner
  // can do that thing. Three practice experiences made that promise while no
  // surface could take an answer: a learner was shown a question and given
  // nowhere to put a response. Offerable is not the same as answerable, and
  // nothing connected what the corpus declares to what a surface implements.
  for (const experience of luminaCurriculum.experiences) {
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
