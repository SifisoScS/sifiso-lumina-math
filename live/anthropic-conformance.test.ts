import assert from "node:assert/strict";
import test from "node:test";

import {
  aiProposalAcceptancePolicy,
  anthropicReasoningPort,
  evaluateGovernance,
  functionsSeedKnowledge,
  isMintedAuthorization,
  reasoningProviderEnabled,
  reasoningTask,
  resolveApprovedEnvelope,
} from "../src/index.js";

/**
 * Phase 5 live conformance. Runs a real model through the real seam.
 *
 * Deliberately not under `test/`: these calls cost money and need a network, so
 * they must never run as part of `pnpm check`. Run them with `pnpm test:live`
 * after setting LUMINA_REASONING_ENABLED=1 and ANTHROPIC_API_KEY.
 *
 * The hostile suite already proves the architecture holds against an adversary.
 * This suite asks the two questions only a real provider can answer: can it
 * produce something admissible at all, and does the seam still hold against
 * output nobody wrote by hand.
 */

// Load .env if one is present, so credentials need not be set by hand on every
// shell. Optional by design: an absent file is the normal case and not an error.
// .env is gitignored; see .env.example for the shape. Only this suite reads it —
// nothing in src/ touches environment files.
try {
  process.loadEnvFile(".env");
} catch {
  // No .env, or unreadable. Fall through to whatever the environment already has.
}

const skip = reasoningProviderEnabled()
  ? false
  : "set LUMINA_REASONING_ENABLED=1 and ANTHROPIC_API_KEY (or create .env) to run";

const envelope = resolveApprovedEnvelope(aiProposalAcceptancePolicy.id);
if (envelope === undefined) throw new Error("the approved envelope should resolve");

const timestamp = new Date().toISOString() as never;

const task = reasoningTask({
  id: "task.live.001",
  kind: "explanation-generation",
  conceptIds: ["concept.function"],
  permittedEvidenceIds: [],
  permittedBasisIds: ["concept.function"],
  requestedAt: timestamp,
  purpose: "Offer another way to describe a function.",
});

function port() {
  return anthropicReasoningPort({
    catalogue: functionsSeedKnowledge.concepts,
    maxSummaryCharacters: envelope!.maxSummaryCharacters,
  });
}

test("a real model produces a proposal that governance admits", { skip }, async () => {
  const proposal = await port().propose(task);
  assert.ok(proposal, "the provider returned nothing");

  console.log(`\n  model summary: ${proposal.summary}\n`);

  const result = evaluateGovernance({
    task,
    proposal,
    policyId: aiProposalAcceptancePolicy.id,
    authorizedAt: timestamp,
  });

  assert.equal(
    result.kind,
    "authorized",
    result.kind === "refused" ? result.reasons.join(" ") : "",
  );
  if (result.kind !== "authorized") return;
  assert.equal(isMintedAuthorization(result.action), true);
});

test("the model cannot set the fields it does not own", { skip }, async () => {
  const proposal = await port().propose(task);
  assert.ok(proposal);

  // Identity, task reference, and kind come from the task, not the response.
  assert.equal(proposal.id, `proposal.${task.id}`);
  assert.equal(proposal.taskId, task.id);
  assert.equal(proposal.kind, "explanation-generation");

  // No learner-owned material was sent, so none may be claimed.
  assert.deepEqual([...proposal.evidenceIds], []);

  // Provenance may reference only concepts actually supplied.
  for (const reference of proposal.provenance.references) {
    assert.equal(reference.kind, "knowledge");
    assert.ok(
      task.conceptIds.includes(reference.id),
      `provenance cited ${reference.id}, which the task never named`,
    );
  }
});

test("real output respects the policy's length bound", { skip }, async () => {
  const proposal = await port().propose(task);
  assert.ok(proposal);

  assert.ok(
    proposal.summary.length <= envelope!.maxSummaryCharacters,
    `summary was ${proposal.summary.length} characters`,
  );
  assert.ok(proposal.summary.length > 0);
});

test("real output carries an uncertainty statement", { skip }, async () => {
  const proposal = await port().propose(task);
  assert.ok(proposal);

  assert.ok(["low", "medium", "high", "unknown"].includes(proposal.uncertainty.level));
  assert.ok(proposal.uncertainty.rationale.length > 0);
  // The proposal may not be more confident than the basis it rests on; the
  // adapter derives both from the same statement, so this holds by construction.
  assert.equal(proposal.uncertainty.level, proposal.provenance.uncertainty.level);
});

test("a task kind that is not admitted is never sent to the provider", { skip }, async () => {
  const misconception = reasoningTask({
    id: "task.live.002",
    kind: "misconception-hypothesis",
    conceptIds: ["concept.function"],
    permittedEvidenceIds: [],
    permittedBasisIds: ["concept.function"],
    requestedAt: timestamp,
    purpose: "Hypothesise a misconception.",
  });

  // Returns without a network call: the adapter refuses before spending anything.
  assert.equal(await port().propose(misconception), undefined);
});
