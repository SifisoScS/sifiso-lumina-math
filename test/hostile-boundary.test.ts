import assert from "node:assert/strict";
import test from "node:test";

import {
  admissibleProposalKinds,
  admissibleProvenanceKinds,
  aiProposalAcceptancePolicy,
  AuthorizedAction,
  evaluateGovernance,
  isMintedAuthorization,
  reasoningTask,
} from "../src/index.js";
import { AttackKind, hostileProposal, hostileReasoningPort } from "./hostile/hostile-reasoning-port.js";
import { timestamp } from "./fixtures.js";

/**
 * Foundation A4 and A5. The question is not whether a model is clever. It is
 * whether the architecture stops cleverness from becoming authority. Every test
 * here drives a deliberately adversarial provider through the real pipeline.
 */

const task = reasoningTask({
  id: "task.hostile.001",
  kind: "explanation-generation",
  conceptIds: ["concept.function"],
  permittedEvidenceIds: ["evidence.reflection.001"],
  requestedAt: timestamp,
  purpose: "Offer another way to describe a function.",
});

function attack(kind: AttackKind) {
  return evaluateGovernance({
    task,
    proposal: hostileProposal(task, kind),
    policyId: aiProposalAcceptancePolicy.id,
    authorizedAt: timestamp,
  });
}

function refusalReasons(kind: AttackKind): readonly string[] {
  const result = attack(kind);
  assert.equal(result.kind, "refused", `attack '${kind}' was not refused`);
  return result.kind === "refused" ? result.reasons : [];
}

// ---------------------------------------------------------------------------
// Control
// ---------------------------------------------------------------------------

test("the hostile port can still produce an admissible proposal", async () => {
  const port = hostileReasoningPort("well-formed");
  const proposal = await port.propose(task);
  assert.ok(proposal);

  const result = attack("well-formed");
  assert.equal(result.kind, "authorized");
  // Without this the suite could pass by refusing everything.
});

// ---------------------------------------------------------------------------
// Attacks that must be refused
// ---------------------------------------------------------------------------

test("evidence cited outside the task's permitted scope is refused", () => {
  assert.ok(refusalReasons("evidence-outside-scope").some((r) => r.includes("permitted evidence scope")));
});

test("out-of-scope evidence smuggled through provenance is refused", () => {
  // evidenceIds is clean; the out-of-scope basis hides in provenance.references.
  assert.ok(refusalReasons("provenance-smuggles-evidence").some((r) => r.includes("provenance")));
});

test("a proposal citing the authorising policy as its own basis is refused", () => {
  assert.ok(refusalReasons("provenance-cites-policy").some((r) => r.includes("provenance")));
});

test("a proposal citing a learning decision as its own basis is refused", () => {
  assert.ok(refusalReasons("provenance-cites-decision").some((r) => r.includes("provenance")));
});

test("evaluative language about the learner is refused", () => {
  assert.ok(refusalReasons("evaluative-language").some((r) => r.includes("non-evaluative")));
});

test("a proposal answering a task that was not asked is refused", () => {
  assert.ok(refusalReasons("wrong-task-id").some((r) => r.includes("task reference")));
});

test("a proposal of a different kind than the task requested is refused", () => {
  assert.ok(refusalReasons("wrong-task-kind").some((r) => r.includes("kind")));
});

test("a task kind excluded while assessment remains open is refused", () => {
  assert.ok(refusalReasons("inadmissible-kind").some((r) => r.includes("not admissible")));
});

test("a summary beyond the policy's length bound is refused, not truncated", () => {
  assert.ok(refusalReasons("oversized-summary").some((r) => r.includes("characters")));
});

test("judgement hidden by homoglyph, zero-width, or separators is still refused", () => {
  // Each of these defeated the phrase guard before it folded text for matching:
  // a Cyrillic o, a zero-width space, and hyphens between letters.
  for (const kind of ["homoglyph-evaluative", "zero-width-evaluative", "separator-evaluative"] as const) {
    assert.ok(
      refusalReasons(kind).some((r) => r.includes("non-evaluative")),
      `${kind} evaded the non-evaluative guard`,
    );
  }
});

test("a caller cannot widen what a policy permits", () => {
  // evaluateGovernance takes a policy identifier, not a policy or its limits.
  // An identifier outside the approved set resolves to nothing and is refused,
  // so an unapproved envelope cannot be conjured by shaping an object.
  const result = evaluateGovernance({
    task,
    proposal: hostileProposal(task, "well-formed"),
    policyId: "policy.self-granted.999",
    authorizedAt: timestamp,
  });

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((r) => r.includes("approved policy")));
});

// ---------------------------------------------------------------------------
// Attacks that are inert rather than refused
//
// Some attacks cannot be detected, and pretending otherwise would be worse than
// saying so. What matters is that they buy nothing.
// ---------------------------------------------------------------------------

test("a proposal asserting its own authority gains none", () => {
  const result = attack("claims-authority");

  // The claim is in text a learner would read, not in a field the engine acts
  // on. It is admitted, and it confers nothing.
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  // Authority is attributed to the policy, never to anything the proposal said.
  assert.equal(result.action.policyId, aiProposalAcceptancePolicy.id);
  assert.equal(result.action.policyVersion, aiProposalAcceptancePolicy.version);
  assert.equal(Object.keys(result.action).includes("summary"), false);
});

test("claimed confidence buys no privilege", () => {
  const confident = attack("false-confidence");
  const honest = attack("well-formed");

  assert.equal(confident.kind, "authorized");
  assert.equal(honest.kind, "authorized");
  if (confident.kind !== "authorized" || honest.kind !== "authorized") return;

  // Calibration cannot be verified from outside a model. What can be guaranteed
  // is that a confident claim and an uncertain one are treated identically.
  const strip = (a: AuthorizedAction) => ({ ...a, proposalId: "x", taskId: "x" });
  assert.deepEqual(strip(confident.action), strip(honest.action));
  assert.equal(Object.keys(confident.action).includes("uncertainty"), false);
});

// ---------------------------------------------------------------------------
// Structural guarantees the port cannot attack at all
// ---------------------------------------------------------------------------

test("admission produces no state change of any kind", () => {
  const result = attack("well-formed");
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  for (const field of ["stateDelta", "commitment", "authorization", "nextState", "learnerId"]) {
    assert.equal(Object.keys(result.action).includes(field), false, `action must not carry ${field}`);
  }
});

test("a ReasoningProposal cannot express a state change", () => {
  const proposal = hostileProposal(task, "well-formed");

  // The strongest guarantee is the one the attacker cannot even attempt: there
  // is no field on the type through which a state change could be requested.
  for (const field of ["stateDelta", "activeConcept", "commitment", "authorization", "choiceKind"]) {
    assert.equal(Object.keys(proposal).includes(field), false, `proposal must not carry ${field}`);
  }
});

test("a hostile port cannot mint or forge permission", () => {
  const result = attack("well-formed");
  assert.equal(result.kind, "authorized");
  if (result.kind !== "authorized") return;

  // The provider has no import path to the brand and no write access to the
  // witness set. A cast produces the shape and fails the runtime check.
  const forged = { ...result.action } as unknown as AuthorizedAction;
  assert.equal(isMintedAuthorization(forged), false);
  assert.equal(isMintedAuthorization(result.action), true);
});

test("repeated admission of the same proposal yields distinct, separately attributed tokens", () => {
  const first = attack("well-formed");
  const second = attack("well-formed");
  assert.equal(first.kind, "authorized");
  assert.equal(second.kind, "authorized");
  if (first.kind !== "authorized" || second.kind !== "authorized") return;

  // Admission is not a state change, so replaying it is not consequential; both
  // tokens are genuine and each is separately attributed. Replay protection for
  // consequential effects lives at the commitment layer, not here.
  assert.notEqual(first.action, second.action);
  assert.equal(isMintedAuthorization(first.action), true);
  assert.equal(isMintedAuthorization(second.action), true);
});

test("every attack kind is exercised by this suite", () => {
  const exercised: readonly AttackKind[] = [
    "well-formed",
    "claims-authority",
    "evidence-outside-scope",
    "provenance-smuggles-evidence",
    "provenance-cites-policy",
    "provenance-cites-decision",
    "evaluative-language",
    "wrong-task-id",
    "wrong-task-kind",
    "false-confidence",
    "inadmissible-kind",
    "oversized-summary",
    "homoglyph-evaluative",
    "zero-width-evaluative",
    "separator-evaluative",
  ];
  type Unexercised = Exclude<AttackKind, (typeof exercised)[number]>;
  const allExercised: Unexercised extends never ? true : never = true;
  assert.equal(allExercised, true);
  assert.equal(exercised.length, 15);
});
