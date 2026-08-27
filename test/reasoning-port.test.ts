import assert from "node:assert/strict";
import test from "node:test";

import {
  decisionProvenance,
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
