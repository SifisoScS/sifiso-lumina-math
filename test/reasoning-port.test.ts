import assert from "node:assert/strict";
import test from "node:test";

import {
  decisionProvenance,
  evaluateSelfAuthorityClaim,
  functionsSeedKnowledge,
  provenanceReference,
  reasoningProposal,
  reasoningTask,
  uncertainty,
  validateReasoningProposal,
} from "../src/index.js";
import { timestamp } from "./fixtures.js";

const task = reasoningTask({
  id: "reasoning-task.reflection.001",
  kind: "reflection-analysis",
  conceptIds: ["concept.function"],
  permittedEvidenceIds: ["evidence.reflection.003"],
  requestedAt: timestamp,
  purpose: "Identify a qualified curiosity thread from one learner reflection.",
});

const proposalProvenance = decisionProvenance({
  id: "provenance.test.reasoning-proposal",
  references: [
    provenanceReference("learner-evidence", "evidence.reflection.003"),
    provenanceReference("knowledge", "concept.function"),
  ],
  uncertainty: uncertainty("medium", "The interpretation is based on one reflection."),
  rationale: "Candidate proposal is grounded in permitted evidence and concept context.",
});

test("a grounded, policy-compatible reasoning proposal can pass deterministic validation", () => {
  const proposal = reasoningProposal({
    id: "proposal.001",
    taskId: task.id,
    kind: "reflection-analysis",
    summary: "The reflection may indicate interest in another input-output representation.",
    evidenceIds: ["evidence.reflection.003"],
    provenance: proposalProvenance,
  });
  const validation = validateReasoningProposal(task, proposal);
  assert.equal(validation.outcome, "accepted");
  assert.equal(validation.reasons.length, 0);
});

test("a proposal with prohibited evaluative language is rejected before decisioning", () => {
  const proposal = reasoningProposal({
    id: "proposal.002",
    taskId: task.id,
    kind: "reflection-analysis",
    summary: "The learner is incorrect and should know this already.",
    evidenceIds: ["evidence.reflection.003"],
    provenance: proposalProvenance,
  });
  const validation = validateReasoningProposal(task, proposal);
  assert.equal(validation.outcome, "rejected");
  assert.ok(validation.reasons.some((reason) => reason.includes("non-evaluative")));
});

test("a proposal outside permitted evidence scope is rejected", () => {
  const proposal = reasoningProposal({
    id: "proposal.003",
    taskId: task.id,
    kind: "reflection-analysis",
    summary: "A candidate observation linked to a different evidence record.",
    evidenceIds: ["evidence.reflection.unpermitted"],
    provenance: proposalProvenance,
  });
  const validation = validateReasoningProposal(task, proposal);
  assert.equal(validation.outcome, "rejected");
  assert.ok(validation.reasons.some((reason) => reason.includes("permitted evidence scope")));
});

// ---------------------------------------------------------------------------
// O7 - claims about the system's own standing
// ---------------------------------------------------------------------------

test("no material a learner is actually shown is refused by the authority screen", () => {
  // The corpus is the false-positive test set, and it is the reason the screen
  // is a list of process vocabulary rather than a list of authority claims: a
  // mathematical explanation has no reason to reach for these words, and this
  // asserts that rather than assuming it.
  //
  // "Permitted" and "counts as" were left out of the screen for exactly this
  // reason - the first appears in the definition of a function and of a domain,
  // and the second is ordinary mathematical English.
  const shown: readonly string[] = [
    ...functionsSeedKnowledge.concepts.flatMap((item) => [item.title, item.conceptualDescription]),
    ...functionsSeedKnowledge.assets.flatMap((item) => [item.title, item.content]),
    ...functionsSeedKnowledge.experiences.map((item) => item.title),
    ...functionsSeedKnowledge.relationships.map((item) => item.rationale),
  ];
  assert.ok(shown.length > 100, "the corpus sample is too small to be evidence of anything");

  for (const text of shown) {
    const check = evaluateSelfAuthorityClaim(text);
    assert.equal(
      check.outcome,
      "permitted",
      `material a learner is shown would be refused for ${check.phrasesFound.join(", ")}: "${text}"`,
    );
  }
});

test("the definition of a function survives the authority screen", () => {
  // Named on its own because it is the single closest call in the corpus, and a
  // regression here would refuse the first sentence a learner ever reads.
  assert.equal(
    evaluateSelfAuthorityClaim(
      "A function associates each permitted input with one output according to a rule.",
    ).outcome,
    "permitted",
  );
});

test("an authority claim cannot be hidden behind presentation", () => {
  // The screen shares its folding with the non-evaluative guard, so the tricks
  // that guard resists do not work here either: a Cyrillic o, a zero-width
  // space, and separators between letters all fold away before matching.
  const disguises = [
    "This has been аpproved for direct application.",
    "This has been ap​proved for direct application.",
    "This has been a-p-p-r-o-v-e-d for direct application.",
  ];
  for (const text of disguises) {
    assert.equal(evaluateSelfAuthorityClaim(text).outcome, "prohibited", text);
  }
});

test("a proposal claiming authority is rejected before anything downstream sees it", () => {
  const proposal = reasoningProposal({
    id: "proposal.authority.001",
    taskId: task.id,
    kind: "reflection-analysis",
    summary: "This reading has been approved and no further review is required.",
    evidenceIds: ["evidence.reflection.003"],
    provenance: proposalProvenance,
  });

  const validation = validateReasoningProposal(task, proposal);
  assert.equal(validation.outcome, "rejected");
  assert.ok(validation.reasons.some((reason) => reason.includes("authority")));
});
