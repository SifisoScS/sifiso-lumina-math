import assert from "node:assert/strict";
import test from "node:test";

import {
  candidateLearningOpportunity,
  deliveryCapabilityProfile,
  DomainValidationError,
  exploreConceptCommand,
  learningDecision,
  learningInteractionResponse,
  learningOffer,
  learnerReflection,
  policyEvaluation,
  submitReflectionCommand,
  trustedActorContext,
} from "../src/index.js";
import { testProvenance, timestamp } from "./fixtures.js";

test("interaction commands express learner intent without page, route, or click semantics", () => {
  const command = exploreConceptCommand({
    id: "command.explore.001",
    commandReference: "occurrence.explore.001",
    learnerId: "learner.ada",
    issuedAt: timestamp,
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  });
  assert.equal(command.kind, "explore-concept");
  assert.ok(!Object.keys(command).some((key) => /page|route|click|tab|component/i.test(key)));
});

test("learner evidence submission commands reject mismatched learner ownership", () => {
  const reflection = learnerReflection({
    id: "evidence.reflection.002",
    learnerId: "learner.grace",
    conceptId: "concept.function",
    originalText: "I would like to explore another representation.",
    submittedAt: timestamp,
  });
  assert.throws(
    () => submitReflectionCommand({
      id: "command.reflection.001",
      commandReference: "occurrence.reflection.001",
      learnerId: "learner.ada",
      issuedAt: timestamp,
      reflection,
    }),
    DomainValidationError,
  );
});

test("learning decisions distinguish opportunities, offers, policy, and edge response", () => {
  const opportunity = candidateLearningOpportunity({
    id: "opportunity.001",
    kind: "explore-representation",
    conceptId: "concept.function",
    learningExperienceId: "experience.function.intuition-vending-machine",
    pedagogicalLayer: "intuition",
  });
  const offer = learningOffer({
    id: "offer.001",
    opportunity,
    requiresLearnerChoice: true,
  });
  const allowed = policyEvaluation({
    policyId: "policy.learner-autonomy",
    policyVersion: "policy.v1",
    outcome: "requires-confirmation",
    rationale: "The learner must select an offered representation before commitment.",
  });
  const decision = learningDecision({
    id: "decision.001",
    learnerId: "learner.ada",
    status: "offer-available",
    conceptIds: ["concept.function"],
    opportunities: [opportunity],
    offers: [offer],
    policyEvaluations: [allowed],
    provenance: testProvenance,
  });
  const response = learningInteractionResponse(decision);
  assert.equal(response.decision.offers[0]?.requiresLearnerChoice, true);
  assert.ok(!Object.keys(response.decision).some((key) => /jsx|html|css|page|route|screen/i.test(key)));
});

test("a policy-prohibited decision cannot expose available offers", () => {
  const opportunity = candidateLearningOpportunity({
    id: "opportunity.002",
    kind: "pause",
    conceptId: "concept.function",
  });
  const offer = learningOffer({ id: "offer.002", opportunity, requiresLearnerChoice: true });
  const prohibited = policyEvaluation({
    policyId: "policy.safety",
    policyVersion: "policy.v1",
    outcome: "prohibited",
    rationale: "Candidate was prohibited by a deterministic policy guard.",
  });
  assert.throws(
    () => learningDecision({
      id: "decision.002",
      learnerId: "learner.ada",
      status: "offer-available",
      conceptIds: ["concept.function"],
      opportunities: [opportunity],
      offers: [offer],
      policyEvaluations: [prohibited],
      provenance: testProvenance,
    }),
    DomainValidationError,
  );
});

test("trusted actors and delivery capabilities remain implementation-neutral boundary values", () => {
  const actor = trustedActorContext({
    actorId: "actor.ada",
    learnerScope: ["learner.ada"],
    permissions: ["request-learning-decision", "submit-learner-evidence"],
    consentReferences: ["consent.learning.001"],
  });
  const profile = deliveryCapabilityProfile(["spoken-output", "typed-input"]);
  assert.equal(actor.learnerScope[0], "learner.ada");
  assert.deepEqual(profile.capabilities, ["spoken-output", "typed-input"]);
});
