import assert from "node:assert/strict";
import test from "node:test";

import {
  admissibleProposalKinds,
  aiProposalAcceptancePolicy,
  AuthorizedAction,
  evaluateGovernance,
  evaluateStateMutationPolicy,
  isMintedAuthorization,
  learnerStateDelta,
  policyDefinition,
  reasoningProposal,
  reasoningTask,
  stateCommitment,
  stableId,
  stateDeltaDimensions,
  stateMutationPolicy,
} from "../src/index.js";
import { testProvenance, timestamp } from "./fixtures.js";

/**
 * Foundation A4 (the authority seam) and A5 (the AI boundary). Permission to
 * admit machine-originated material is a value that only the governance module
 * can produce. These tests prove that at compile time and at runtime.
 */

const task = reasoningTask({
  id: "task.governance.001",
  kind: "explanation-generation",
  conceptIds: ["concept.function"],
  permittedEvidenceIds: ["evidence.reflection.001"],
  requestedAt: timestamp,
  purpose: "Offer another way to describe a function.",
});

function proposalWith(overrides: {
  readonly id?: string;
  readonly taskId?: string;
  readonly kind?: Parameters<typeof reasoningProposal>[0]["kind"];
  readonly summary?: string;
  readonly evidenceIds?: readonly string[];
}) {
  return reasoningProposal({
    id: overrides.id ?? "proposal.governance.001",
    taskId: overrides.taskId ?? "task.governance.001",
    kind: overrides.kind ?? "explanation-generation",
    summary: overrides.summary ?? "A function can be described as a rule pairing each input with one output.",
    evidenceIds: overrides.evidenceIds ?? ["evidence.reflection.001"],
    provenance: testProvenance,
  });
}

function authorize(proposal: ReturnType<typeof reasoningProposal>) {
  return evaluateGovernance({
    task,
    proposal,
    policy: aiProposalAcceptancePolicy,
    admissibleKinds: admissibleProposalKinds,
    authorizedAt: timestamp,
  });
}

// ---------------------------------------------------------------------------
// Minting
// ---------------------------------------------------------------------------

test("a grounded, admissible proposal is authorized and the action records what permitted it", () => {
  const result = authorize(proposalWith({}));

  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  assert.equal(result.action.kind, "admit-proposal-to-decision");
  assert.equal(result.action.proposalId, "proposal.governance.001");
  assert.equal(result.action.taskId, "task.governance.001");
  assert.equal(result.action.policyId, aiProposalAcceptancePolicy.id);
  assert.equal(result.action.policyVersion, aiProposalAcceptancePolicy.version);
  assert.deepEqual([...result.action.admittedEvidenceIds], ["evidence.reflection.001"]);
  assert.equal(result.policyEvaluation.outcome, "permitted");
});

test("only an action minted by governance passes the runtime witness check", () => {
  const result = authorize(proposalWith({}));
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  assert.equal(isMintedAuthorization(result.action), true);

  // A deliberate assertion can fabricate the shape. It cannot fabricate the
  // witness, because the WeakSet is module-private and never written to
  // outside evaluateGovernance.
  const fabricated = {
    kind: "admit-proposal-to-decision",
    proposalId: result.action.proposalId,
    taskId: result.action.taskId,
    policyId: result.action.policyId,
    policyVersion: result.action.policyVersion,
    admittedEvidenceIds: result.action.admittedEvidenceIds,
    authorizedAt: result.action.authorizedAt,
  } as unknown as AuthorizedAction;

  assert.equal(isMintedAuthorization(fabricated), false);
});

test("an authorized action cannot be constructed outside the governance module", () => {
  const result = authorize(proposalWith({}));
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  // Every field below is sourced from a genuinely minted action, so their types
  // are exactly right. The only thing missing is the brand, whose symbol this
  // module cannot name. If the seam is ever weakened so that this construction
  // compiles, the suppression directive below becomes unused and typecheck
  // fails. (The directive is deliberately not spelled out in prose above it —
  // TypeScript reads the first occurrence in any comment as the directive.)
  // @ts-expect-error - AuthorizedAction is unconstructable outside src/governance.
  const unconstructable: AuthorizedAction = Object.freeze({
    kind: "admit-proposal-to-decision" as const,
    proposalId: result.action.proposalId,
    taskId: result.action.taskId,
    policyId: result.action.policyId,
    policyVersion: result.action.policyVersion,
    admittedEvidenceIds: result.action.admittedEvidenceIds,
    authorizedAt: result.action.authorizedAt,
  });

  assert.equal(isMintedAuthorization(unconstructable), false);
});

// ---------------------------------------------------------------------------
// Refusal is the default
// ---------------------------------------------------------------------------

test("a policy scoped to something other than ai-proposal-acceptance cannot authorize admission", () => {
  const wrongScope = policyDefinition({
    id: "policy.wrong-scope.001",
    scope: "learner-autonomy",
    version: "policy.wrong-scope.v1",
    statement: "A policy about a different subject entirely.",
  });

  const result = evaluateGovernance({
    task,
    proposal: proposalWith({}),
    policy: wrongScope,
    admissibleKinds: admissibleProposalKinds,
    authorizedAt: timestamp,
  });

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("ai-proposal-acceptance")));
  assert.equal(result.policyEvaluation.outcome, "prohibited");
});

test("a proposal citing evidence outside the task's permitted scope is refused", () => {
  const result = authorize(proposalWith({ evidenceIds: ["evidence.not-permitted.999"] }));

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("permitted evidence scope")));
});

test("a proposal answering a different task is refused", () => {
  const result = authorize(proposalWith({ taskId: "task.governance.other" }));

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("task reference")));
});

test("a proposal carrying evaluative language about the learner is refused", () => {
  const result = authorize(proposalWith({ summary: "That answer is incorrect, but this is easy once you see it." }));

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("non-evaluative")));
});

test("an inadmissible task kind is refused even when the proposal is otherwise well formed", () => {
  const misconceptionTask = reasoningTask({
    id: "task.governance.002",
    kind: "misconception-hypothesis",
    conceptIds: ["concept.function"],
    permittedEvidenceIds: ["evidence.reflection.001"],
    requestedAt: timestamp,
    purpose: "Hypothesise a misconception.",
  });

  const result = evaluateGovernance({
    task: misconceptionTask,
    proposal: reasoningProposal({
      id: "proposal.governance.002",
      taskId: "task.governance.002",
      kind: "misconception-hypothesis",
      summary: "The learner may be treating the notation as multiplication.",
      evidenceIds: ["evidence.reflection.001"],
      provenance: testProvenance,
    }),
    policy: aiProposalAcceptancePolicy,
    admissibleKinds: admissibleProposalKinds,
    authorizedAt: timestamp,
  });

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("not admissible")));
});

test("kinds bearing on assessment or learner autonomy are not admissible", () => {
  for (const kind of ["reflection-analysis", "misconception-hypothesis", "practice-generation", "adaptive-path-suggestion"] as const) {
    assert.equal(admissibleProposalKinds.includes(kind), false, `${kind} must not be admissible`);
  }
});

// ---------------------------------------------------------------------------
// Admission is not a state change
// ---------------------------------------------------------------------------

test("an authorized action carries no state delta and no commitment", () => {
  const result = authorize(proposalWith({}));
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  const fields = Object.keys(result.action);
  assert.equal(fields.includes("stateDelta"), false);
  assert.equal(fields.includes("commitment"), false);
  assert.equal(fields.includes("authorization"), false);
});

test("the state-mutation policy permits learner-originated commitments and prohibits others", () => {
  const delta = learnerStateDelta({ engagementFocus: "active-focus" });
  const permitted = stateCommitment({
    id: "commitment.governance.001",
    learnerId: "learner.governance",
    authorization: {
      kind: "learner-choice",
      learnerChoiceId: stableId("choice.governance.001", "Learner choice identifier"),
    },
    learningDecisionId: "decision.governance.001",
    contextVersion: "engine.behaviour.v1",
    changedDimensions: stateDeltaDimensions(delta),
    stateDelta: delta,
    committedAt: timestamp,
    provenance: testProvenance,
  });

  assert.equal(evaluateStateMutationPolicy(permitted).outcome, "permitted");
  assert.equal(evaluateStateMutationPolicy(permitted).policyId, stateMutationPolicy.id);

  // There is no AI- or policy-originated variant of StateCommitmentAuthorization,
  // so an unpermitted commitment can only be produced by a deliberate cast.
  const forged = {
    ...permitted,
    authorization: { kind: "reasoning-proposal", proposalId: "proposal.governance.001" },
  } as unknown as typeof permitted;

  assert.equal(evaluateStateMutationPolicy(forged).outcome, "prohibited");
});
