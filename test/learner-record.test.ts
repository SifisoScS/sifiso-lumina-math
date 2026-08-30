import assert from "node:assert/strict";
import test from "node:test";

import {
  assertCommitmentHasLearnerAuthorization,
  assertReflectionPreserved,
  currentLearnerState,
  derivedInterpretation,
  DomainValidationError,
  learnerChoice,
  learnerRecord,
  learnerReflection,
  learnerStateDelta,
  practiceAttempt,
  stateCommitment,
} from "../src/index.js";
import { testProvenance, timestamp } from "./fixtures.js";

test("learner-owned reflection remains immutable and distinct from interpretation", () => {
  const reflection = learnerReflection({
    id: "evidence.reflection.001",
    learnerId: "learner.ada",
    conceptId: "concept.function",
    originalText: "I can imagine an input going in, but I want another way to picture the output.",
    submittedAt: timestamp,
  });
  assertReflectionPreserved(reflection, reflection.originalText);
  assert.throws(
    () => assertReflectionPreserved(reflection, "Rewritten system summary."),
    DomainValidationError,
  );

  const interpretation = derivedInterpretation({
    id: "interpretation.001",
    kind: "curiosity-thread",
    learnerId: "learner.ada",
    conceptId: "concept.function",
    summary: "The learner has expressed interest in another representation.",
    evidenceIds: [reflection.id],
    provenance: testProvenance,
  });

  const record = learnerRecord({
    learnerId: reflection.learnerId,
    evidence: [reflection],
    events: [],
    interpretations: [interpretation],
    state: currentLearnerState({
      learnerId: "learner.ada",
      engagementFocus: "active-focus",
      activeConceptId: "concept.function",
      pedagogicalLayerByConcept: [{ conceptId: "concept.linear-functions", layer: "intuition" }],
      evidenceIds: [reflection.id],
      interpretationIds: [interpretation.id],
    }),
    commitments: [],
  });

  assert.equal(record.evidence[0]?.kind, "reflection");
  assert.equal(record.interpretations[0]?.kind, "curiosity-thread");
  assert.notEqual(record.evidence[0]?.id, record.interpretations[0]?.id);
});

test("current learner state rejects invalid focus transitions", () => {
  assert.throws(
    () => currentLearnerState({
      learnerId: "learner.ada",
      engagementFocus: "active-focus",
    }),
    DomainValidationError,
  );
  assert.throws(
    () => currentLearnerState({
      learnerId: "learner.ada",
      engagementFocus: "unobserved",
      activeConceptId: "concept.function",
    }),
    DomainValidationError,
  );
});

test("learner choices cannot be created from an offer without a confirmed semantic choice", () => {
  assert.throws(
    () => learnerChoice({
      id: "choice.invalid.001",
      learnerId: "learner.ada",
      choiceKind: "select-offer",
      chosenAt: timestamp,
    }),
    DomainValidationError,
  );
  const pause = learnerChoice({
    id: "choice.pause.001",
    learnerId: "learner.ada",
    choiceKind: "pause",
    chosenAt: timestamp,
  });
  assert.equal(pause.choiceKind, "pause");
});

test("state commitments require learner-originated evidence or a learner choice", () => {
  const practice = practiceAttempt({
    id: "evidence.practice.001",
    learnerId: "learner.ada",
    conceptId: "concept.function",
    learningExperienceId: "experience.function.mechanics-notation",
    learnerResponse: "For x = 2, f(x) = 7.",
    submittedAt: timestamp,
  });
  const commitment = stateCommitment({
    id: "commitment.001",
    learnerId: "learner.ada",
    authorization: { kind: "accepted-evidence", evidenceId: practice.id },
    learningDecisionId: "decision.001",
    contextVersion: "engine.behaviour.v1",
    changedDimensions: ["evidence"],
    stateDelta: learnerStateDelta({ evidenceIdsToAdd: [practice.id] }),
    committedAt: timestamp,
    provenance: testProvenance,
  });
  assert.doesNotThrow(() => assertCommitmentHasLearnerAuthorization(commitment));

  const maliciousCommitment = {
    ...commitment,
    authorization: { kind: "ai-proposal", proposalId: "proposal.001" },
  } as unknown as typeof commitment;
  assert.throws(() => assertCommitmentHasLearnerAuthorization(maliciousCommitment), DomainValidationError);
});

test("a delta cannot record a depth for a concept it is not moving the learner to", () => {
  // Nothing in the engine builds such a delta. It is refused rather than
  // reconciled because there is no correct guess: silently keeping either the
  // concept or the layer writes a choice the learner never made.
  assert.throws(
    () => learnerStateDelta({
      engagementFocus: "active-focus",
      activeConcept: { kind: "set", value: "concept.domain-range" },
      pedagogicalLayer: { kind: "set", conceptId: "concept.function", value: "mechanics" },
    }),
    /cannot record a pedagogical layer for a different concept/,
  );
});

test("a learner cannot hold two depths for the same concept", () => {
  assert.throws(
    () => currentLearnerState({
      learnerId: "learner.ada",
      engagementFocus: "unobserved",
      pedagogicalLayerByConcept: [
        { conceptId: "concept.function", layer: "mechanics" },
        { conceptId: "concept.function", layer: "intuition" },
      ],
    }),
    /two pedagogical layers for the same concept/,
  );
});
