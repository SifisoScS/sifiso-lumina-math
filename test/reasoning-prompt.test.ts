import assert from "node:assert/strict";
import test from "node:test";

import {
  conceptContent,
  conceptContentForTask,
  explanationPrompt,
  luminaCurriculum,
  learnerReflection,
  reasoningTask,
} from "../src/index.js";
import { timestamp } from "./fixtures.js";

/**
 * Foundation A2 and A6, and the Phase 5 data boundary: no learner-owned
 * material reaches a model provider.
 *
 * The prompt is assembled by a pure function precisely so this can be asserted
 * without a network call, an API key, or a provider. If a future change routes
 * learner text into a prompt, these tests fail before anything is sent.
 */

const concepts = luminaCurriculum.concepts;

/** A learner's own words. Nothing in the prompt path should ever carry these. */
const reflection = learnerReflection({
  id: "evidence.reflection.ada.001",
  learnerId: "learner.ada",
  conceptId: "concept.function",
  originalText: "I keep mixing up which side is the input. It makes me feel stupid.",
  submittedAt: timestamp,
});

const task = reasoningTask({
  id: "task.prompt.001",
  kind: "explanation-generation",
  conceptIds: ["concept.function"],
  permittedEvidenceIds: [reflection.id],
  permittedBasisIds: ["concept.function"],
  requestedAt: timestamp,
  purpose: "Offer another way to describe a function.",
});

// ---------------------------------------------------------------------------
// The content type has nowhere to put learner material
// ---------------------------------------------------------------------------

test("concept content carries exactly three fields, none of them learner-scoped", () => {
  const concept = concepts.find((candidate) => candidate.id === "concept.function");
  assert.ok(concept);

  const content = conceptContent(concept);
  assert.deepEqual(Object.keys(content).sort(), [
    "conceptId",
    "conceptualDescription",
    "title",
  ]);
});

test("only concepts the task names can be resolved", () => {
  const resolved = conceptContentForTask(task, concepts);

  assert.equal(resolved.length, 1);
  assert.equal(resolved[0]?.conceptId, "concept.function");

  // The catalogue holds more than the task named; the extras are not resolvable.
  assert.ok(concepts.length > 1, "the seed catalogue should hold more than one concept");
  const resolvedIds = new Set(resolved.map((content) => content.conceptId));
  for (const concept of concepts) {
    if (concept.id !== "concept.function") {
      assert.equal(resolvedIds.has(concept.id), false, `${concept.id} leaked into scope`);
    }
  }
});

// ---------------------------------------------------------------------------
// The assembled prompt
// ---------------------------------------------------------------------------

function assembled(): string {
  const prompt = explanationPrompt({
    task,
    concepts: conceptContentForTask(task, concepts),
    maxSummaryCharacters: 2000,
  });
  return `${prompt.system}\n${prompt.user}`;
}

test("the prompt contains no learner-owned text", () => {
  const text = assembled();

  assert.equal(text.includes(reflection.originalText), false, "reflection text reached the prompt");
  for (const fragment of ["mixing up", "feel stupid", "input. It makes"]) {
    assert.equal(text.includes(fragment), false, `learner fragment "${fragment}" reached the prompt`);
  }
});

test("the prompt contains no learner-scoped identifier", () => {
  const text = assembled();

  assert.equal(text.includes(reflection.id), false, "an evidence id reached the prompt");
  assert.equal(text.includes("learner.ada"), false, "a learner id reached the prompt");
  assert.equal(text.toLowerCase().includes("learner."), false, "a learner-scoped id reached the prompt");
});

test("the prompt carries the concept material it is supposed to", () => {
  const text = assembled();
  const concept = concepts.find((candidate) => candidate.id === "concept.function");
  assert.ok(concept);

  // Without this the suite could pass by sending an empty prompt.
  assert.ok(text.includes(concept.title));
  assert.ok(text.includes(concept.conceptualDescription));
  assert.ok(text.includes(task.purpose));
});

test("the prompt states the constraints governance will enforce anyway", () => {
  const text = assembled().toLowerCase();

  assert.ok(text.includes("2000 characters"));
  assert.ok(text.includes("say nothing about any learner"));
  assert.ok(text.includes("proposal, not a decision"));
});
