import assert from "node:assert/strict";
import test from "node:test";

import {
  candidateLearningOpportunity,
  DomainValidationError,
  learningDecision,
  policyEvaluation,
} from "../src/index.js";
import { testProvenance } from "./fixtures.js";

const constrainedPolicy = policyEvaluation({
  policyId: "policy.safe-context",
  policyVersion: "policy.v1",
  outcome: "constrained",
  rationale: "The supplied interaction context is incomplete.",
});

test("material Learning Decisions require a concept reference and cannot use incomplete-context status", () => {
  assert.throws(
    () => learningDecision({
      id: "decision.classification.material-without-concept",
      learnerId: "learner.ada",
      type: "material",
      status: "constrained",
      policyEvaluations: [constrainedPolicy],
      provenance: testProvenance,
    }),
    DomainValidationError,
  );
  assert.throws(
    () => learningDecision({
      id: "decision.classification.material-incomplete",
      learnerId: "learner.ada",
      type: "material",
      status: "incomplete-context",
      conceptIds: ["concept.function"],
      policyEvaluations: [constrainedPolicy],
      provenance: testProvenance,
    }),
    DomainValidationError,
  );
});

test("safe non-material outcomes are conceptless and cannot carry material learning actions", () => {
  const opportunity = candidateLearningOpportunity({
    id: "opportunity.classification.001",
    kind: "reflect",
    conceptId: "concept.function",
  });
  assert.throws(
    () => learningDecision({
      id: "decision.classification.safe-with-concept",
      learnerId: "learner.ada",
      type: "safe-non-material",
      status: "incomplete-context",
      conceptIds: ["concept.function"],
      policyEvaluations: [constrainedPolicy],
      provenance: testProvenance,
    }),
    DomainValidationError,
  );
  assert.throws(
    () => learningDecision({
      id: "decision.classification.safe-with-action",
      learnerId: "learner.ada",
      type: "safe-non-material",
      status: "incomplete-context",
      opportunities: [opportunity],
      policyEvaluations: [constrainedPolicy],
      provenance: testProvenance,
    }),
    DomainValidationError,
  );
  const safe = learningDecision({
    id: "decision.classification.safe-valid",
    learnerId: "learner.ada",
    type: "safe-non-material",
    status: "incomplete-context",
    policyEvaluations: [constrainedPolicy],
    provenance: testProvenance,
  });
  assert.deepEqual(safe.conceptIds, []);
  assert.deepEqual(safe.opportunities, []);
  assert.deepEqual(safe.offers, []);
});
