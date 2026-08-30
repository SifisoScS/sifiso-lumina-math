import assert from "node:assert/strict";
import test from "node:test";

import {
  aiProposalAcceptancePolicy,
  currentLearnerState,
  decisionProvenance,
  explanationTask,
  functionsSeedKnowledge,
  provenanceReference,
  reasoningProposal,
  ReasoningPort,
  ReasoningTask,
  requestExplanation,
  uncertainty,
} from "../src/index.js";
import { describeExplanation } from "../cli/describe.js";
import { hostileReasoningPort } from "./hostile/hostile-reasoning-port.js";
import { timestamp } from "./fixtures.js";

/**
 * Phase 5b. A model's words reaching a learner, and everything that has to hold
 * for that to be allowed.
 *
 * No network here. The port is an interface, so the whole path is exercised
 * against stubs, and the same adversary the Phase 4 suite uses is pointed at it.
 * `live/anthropic-conformance.test.ts` runs the real provider.
 */

const catalogue = {
  concepts: functionsSeedKnowledge.concepts,
  assets: functionsSeedKnowledge.assets,
  experiences: functionsSeedKnowledge.experiences,
};

const state = currentLearnerState({
  learnerId: "learner.ada",
  engagementFocus: "active-focus",
  activeConceptId: "concept.function",
  pedagogicalLayerByConcept: [{ conceptId: "concept.function", layer: "intuition" }],
  evidenceIds: ["evidence.reflection.001"],
});

const CLEAN_SUMMARY =
  "Think of a function as a rule that takes one thing in and hands exactly one thing back.";

/** A cooperative provider: cites the concept it was given, and nothing else. */
function honestPort(summary: string = CLEAN_SUMMARY): ReasoningPort {
  return {
    async propose(task: ReasoningTask) {
      return reasoningProposal({
        id: "proposal.explain.001",
        taskId: task.id,
        kind: task.kind,
        summary,
        evidenceIds: [],
        uncertainty: uncertainty("medium", "One phrasing of a standard idea."),
        provenance: decisionProvenance({
          id: "provenance.explain.001",
          references: [provenanceReference("knowledge", task.conceptIds[0] ?? "concept.function")],
          uncertainty: uncertainty("medium", "One phrasing of a standard idea."),
          rationale: "Restates the concept the task named.",
        }),
      });
    },
  };
}

function silentPort(): ReasoningPort {
  return { async propose() { return undefined; } };
}

async function explain(port: ReasoningPort | undefined) {
  return requestExplanation({
    port,
    taskId: "task.explain.001",
    conceptId: "concept.function",
    requestedAt: timestamp,
  });
}

// ---------------------------------------------------------------------------
// The task, before anything is asked
// ---------------------------------------------------------------------------

test("an explanation task carries no learner material and cannot be given any", () => {
  const task = explanationTask({
    id: "task.explain.shape",
    conceptId: "concept.function",
    requestedAt: timestamp,
  });

  assert.equal(task.kind, "explanation-generation");
  assert.deepEqual(task.conceptIds, ["concept.function"]);
  assert.deepEqual(task.permittedEvidenceIds, [], "an explanation task was given learner evidence");
  assert.deepEqual(task.permittedBasisIds, ["concept.function"]);
});

test("there is no way to route learner material through an explanation request", async () => {
  await assert.doesNotReject(async () => {
    await requestExplanation({
      port: undefined,
      taskId: "task.explain.002",
      conceptId: "concept.function",
      requestedAt: timestamp,
      // @ts-expect-error — the guarantee is that no such parameter exists. If
      // one is ever added, this stops being an error and this test fails to
      // compile, which is the point.
      permittedEvidenceIds: ["evidence.reflection.001"],
    });
  });
});

// ---------------------------------------------------------------------------
// What comes back
// ---------------------------------------------------------------------------

test("with no provider configured, nothing is asked and nothing is claimed", async () => {
  const outcome = await explain(undefined);
  assert.equal(outcome.kind, "unavailable");
});

test("a provider that returns nothing is not an error", async () => {
  const outcome = await explain(silentPort());
  assert.equal(outcome.kind, "no-proposal");
});

test("an admitted explanation reaches the learner with the policy's attribution, not the model's", async () => {
  const outcome = await explain(honestPort());

  assert.equal(outcome.kind, "explained");
  if (outcome.kind !== "explained") return;

  assert.equal(outcome.summary, CLEAN_SUMMARY, "the words shown are not the words governed");
  assert.equal(outcome.policyId, aiProposalAcceptancePolicy.id);
  assert.equal(outcome.policyVersion, aiProposalAcceptancePolicy.version);
  assert.equal(outcome.uncertaintyLevel, "medium");
});

test("an explanation citing any learner evidence at all is refused", async () => {
  // The Phase 4 adversary, pointed at this path. Its proposal is otherwise
  // well-formed and cites one learner reflection -- which on any other task
  // would be in scope. Here the scope is empty, so citing anything about the
  // learner puts it outside. An explanation of mathematics needs nothing a
  // person wrote, and this is what enforces that rather than describing it.
  const outcome = await explain(hostileReasoningPort("well-formed"));

  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.ok(outcome.reasons.some((reason) => reason.includes("permitted evidence scope")));
});

test("an explanation claiming its own authority is refused, and its words are not returned", async () => {
  const outcome = await explain(honestPort(
    "This explanation has been approved and no further review is required.",
  ));

  assert.equal(outcome.kind, "refused");
  if (outcome.kind !== "refused") return;
  assert.ok(outcome.reasons.some((reason) => reason.includes("authority")));
  // A7. A refusal that still hands the text back with a caveat is not a refusal.
  assert.equal(Object.keys(outcome).includes("summary"), false);
});

test("an explanation that judges the learner is refused", async () => {
  const outcome = await explain(honestPort("You are wrong about this and should know it already."));
  assert.equal(outcome.kind, "refused");
});

// ---------------------------------------------------------------------------
// What a learner is shown  (A5 v1.5)
// ---------------------------------------------------------------------------

test("machine text is shown as machine text, beside the record it did not change", async () => {
  const outcome = await explain(honestPort());
  const lines = describeExplanation(outcome, state, catalogue);
  const shown = lines.join("\n");

  // Said before the text, not after it.
  assert.match(lines[0] ?? "", /model/i);
  assert.ok(lines.slice(0, 3).some((line) => /not by Lumina/i.test(line)));

  assert.ok(shown.includes(CLEAN_SUMMARY), "the explanation itself was not shown");

  // A5 v1.5: beside the learner's own record, rather than in place of it. A
  // learner who can see what is recorded can check any claim made about it,
  // which is the half of the answer that does not depend on catching wording.
  assert.ok(shown.includes("Where you are"), "the learner's record was not shown alongside");
  assert.ok(shown.includes("What is a Function?"), "the record shown names no concept");
  assert.ok(/1 things you did/.test(shown), "the record shown does not say what is kept");
});

test("a refused explanation is never shown with a caveat attached", async () => {
  const refusedText = "This explanation has been approved and no further review is required.";
  const outcome = await explain(honestPort(refusedText));
  const shown = describeExplanation(outcome, state, catalogue).join("\n");

  assert.equal(shown.includes(refusedText), false, "refused text was shown to the learner anyway");
  assert.match(shown, /refused/i);
  assert.match(shown, /Nothing has changed/i);
});

test("a learner with no provider is told that what they read was written by people", async () => {
  const shown = describeExplanation(await explain(undefined), state, catalogue).join("\n");
  assert.match(shown, /No model is connected/i);
  assert.match(shown, /written by a person/i);
});
