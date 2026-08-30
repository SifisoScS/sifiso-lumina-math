import assert from "node:assert/strict";
import test from "node:test";

import {
  aiProposalAcceptancePolicy,
  canonicalPedagogicalGuidance,
  currentLearnerState,
  decisionProvenance,
  deliveryCapabilityProfile,
  evaluateGovernance,
  executeDeterministicLearningInteraction,
  luminaCurriculum,
  learnerReflection,
  learnerRecord,
  provenanceReference,
  reasoningProposal,
  reasoningScopeForContext,
  reasoningTask,
  trustedActorContext,
  uncertainty,
} from "../src/index.js";
import { testProvenance, timestamp } from "./fixtures.js";
import { exploreConceptCommand } from "../src/contracts/core-contracts.js";

/**
 * Foundation A2 and A6. Hostile testing found that a proposal could cite one
 * learner's derived interpretation as the basis for material shown to another.
 * Governance refuses that. These tests cover the earlier guarantee: a scope
 * derived from one learner's own record cannot name another learner's
 * material, because it never has access to any.
 */

const capabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);

function actorFor(learnerId: string) {
  return trustedActorContext({
    actorId: `actor.${learnerId}`,
    learnerScope: [learnerId],
    permissions: ["request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
    consentReferences: [`consent.${learnerId}`],
  });
}

function recordFor(learnerId: string, reflection: ReturnType<typeof learnerReflection>) {
  const state = currentLearnerState({ learnerId, engagementFocus: "encountered", evidenceIds: [reflection.id] });
  return learnerRecord({
    learnerId: state.learnerId,
    evidence: [reflection],
    events: [],
    interpretations: [],
    state,
    commitments: [],
  });
}

/** Runs the real engine for one learner and returns its assembled context. */
function contextFor(learnerId: string, evidenceSuffix: string) {
  const reflection = learnerReflection({
    id: `evidence.reflection.${evidenceSuffix}`,
    learnerId,
    conceptId: "concept.function",
    originalText: "I am not sure what makes something a function.",
    submittedAt: timestamp,
  });

  const result = executeDeterministicLearningInteraction({
    command: exploreConceptCommand({
      id: `command.scope.${evidenceSuffix}`,
      commandReference: `occurrence.scope.${evidenceSuffix}`,
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.function",
      pedagogicalLayer: "intuition",
    }),
    actor: actorFor(learnerId),
    deliveryCapabilities: capabilities,
    learnerRecord: recordFor(learnerId, reflection),
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });

  const assembly = result.diagnostics.contextAssembly;
  assert.equal(assembly.kind, "assembled");
  if (assembly.kind !== "assembled") throw new Error("context did not assemble");
  return { context: assembly.context, reflectionId: reflection.id };
}

test("learner scope is derived from the learner's own record and nothing else", () => {
  const { context, reflectionId } = contextFor("learner.ada", "ada");
  const scope = reasoningScopeForContext(context);

  assert.deepEqual([...scope.permittedEvidenceIds], [reflectionId]);
});

test("a scope derived for one learner cannot name another learner's material", () => {
  const ada = contextFor("learner.ada", "ada");
  const bob = contextFor("learner.bob", "bob");

  const adaScope = reasoningScopeForContext(ada.context);
  const bobScope = reasoningScopeForContext(bob.context);

  // The learner-scoped halves are disjoint. They are derived from separate
  // records, so there is no path by which one could contain the other's ids.
  const adaIds = new Set<string>(adaScope.permittedEvidenceIds);
  for (const id of bobScope.permittedEvidenceIds) {
    assert.equal(adaIds.has(id), false, `Ada's scope named Bob's ${id}`);
  }
  assert.equal((adaScope.permittedEvidenceIds as readonly string[]).includes(bob.reflectionId), false);
  assert.equal((bobScope.permittedEvidenceIds as readonly string[]).includes(ada.reflectionId), false);

  // Content scope is shared, because content is not about anyone.
  assert.deepEqual([...adaScope.permittedBasisIds], [...bobScope.permittedBasisIds]);
});

test("content scope covers what the decision actually resolved", () => {
  const { context } = contextFor("learner.ada", "ada");
  const scope = reasoningScopeForContext(context);

  const basis: readonly string[] = scope.permittedBasisIds;
  assert.ok(basis.includes("concept.function"));
  assert.ok(scope.permittedBasisIds.length > 1, "a resolved context should put more than the concept in scope");
  // Deduplicated: assets appear in both the combined and the per-kind arrays.
  assert.equal(new Set(scope.permittedBasisIds).size, scope.permittedBasisIds.length);
});

test("a task built from a derived scope refuses a proposal citing another learner", () => {
  const ada = contextFor("learner.ada", "ada");
  const bob = contextFor("learner.bob", "bob");
  const scope = reasoningScopeForContext(ada.context);

  // The task can only declare what Ada's context yielded.
  const task = reasoningTask({
    id: "task.scope.001",
    kind: "explanation-generation",
    conceptIds: ["concept.function"],
    permittedEvidenceIds: [...scope.permittedEvidenceIds],
    permittedBasisIds: [...scope.permittedBasisIds],
    requestedAt: timestamp,
    purpose: "Offer another way to describe a function.",
  });

  const result = evaluateGovernance({
    task,
    proposal: reasoningProposal({
      id: "proposal.scope.001",
      taskId: "task.scope.001",
      kind: "explanation-generation",
      summary: "A function pairs each input with exactly one output.",
      evidenceIds: [ada.reflectionId],
      uncertainty: uncertainty("unknown", "Not calibrated."),
      provenance: decisionProvenance({
        id: "provenance.scope.001",
        references: [
          provenanceReference("learner-evidence", ada.reflectionId),
          // Bob's reflection, cited as basis for material shown to Ada.
          provenanceReference("learner-evidence", bob.reflectionId),
        ],
        uncertainty: uncertainty("unknown", "Not calibrated."),
        rationale: "Informed by reflections from several learners.",
      }),
    }),
    policyId: aiProposalAcceptancePolicy.id,
    authorizedAt: timestamp,
  });

  assert.equal(result.kind, "refused");
  if (result.kind !== "refused") return;
  assert.ok(result.reasons.some((reason) => reason.includes("learner-scoped")));
});

test("a well-grounded proposal within a derived scope is admitted", () => {
  const ada = contextFor("learner.ada", "ada");
  const scope = reasoningScopeForContext(ada.context);

  const task = reasoningTask({
    id: "task.scope.002",
    kind: "explanation-generation",
    conceptIds: ["concept.function"],
    permittedEvidenceIds: [...scope.permittedEvidenceIds],
    permittedBasisIds: [...scope.permittedBasisIds],
    requestedAt: timestamp,
    purpose: "Offer another way to describe a function.",
  });

  const result = evaluateGovernance({
    task,
    proposal: reasoningProposal({
      id: "proposal.scope.002",
      taskId: "task.scope.002",
      kind: "explanation-generation",
      summary: "A function pairs each input with exactly one output.",
      evidenceIds: [ada.reflectionId],
      uncertainty: uncertainty("unknown", "Not calibrated."),
      provenance: decisionProvenance({
        id: "provenance.scope.002",
        references: [
          provenanceReference("learner-evidence", ada.reflectionId),
          provenanceReference("knowledge", "concept.function"),
        ],
        uncertainty: uncertainty("unknown", "Not calibrated."),
        rationale: "Derived from the learner's own reflection and the resolved concept.",
      }),
    }),
    policyId: aiProposalAcceptancePolicy.id,
    authorizedAt: timestamp,
  });

  // Without this the suite could pass by refusing everything.
  assert.equal(result.kind, "authorized", result.kind === "refused" ? result.reasons.join(" ") : "");
});

test("the fixture provenance still resolves inside a derived scope", () => {
  // testProvenance cites knowledge "concept.function"; a real derived scope
  // must actually contain it, or the derivation is too narrow to be usable.
  const { context } = contextFor("learner.ada", "ada");
  const scope = reasoningScopeForContext(context);
  for (const reference of testProvenance.references) {
    assert.ok(
      (scope.permittedBasisIds as readonly string[]).includes(reference.id) ||
        (scope.permittedEvidenceIds as readonly string[]).includes(reference.id),
      `derived scope omitted ${reference.kind} ${reference.id}`,
    );
  }
});
