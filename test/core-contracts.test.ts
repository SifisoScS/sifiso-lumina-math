import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
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
    type: "material",
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
      type: "material",
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

// ---------------------------------------------------------------------------
// The line A1 says is a line
// ---------------------------------------------------------------------------

test("AssessmentBoundary is implemented by nothing and wired to nothing", () => {
  // A1 v1.1, closing O4: Math Lumina does not conclude that a learner has
  // understood, mastered, is ready for, or is capable of anything. The article
  // says `AssessmentBoundary` staying an unimplemented contract is where the
  // line is, rather than a gap to be tidied up later.
  //
  // Nothing enforced that. The port could have been implemented and called in
  // an ordinary change, every other test would have stayed green, and the
  // article would have quietly become false -- which is the failure this
  // project treats as worse than an admitted gap.
  //
  // Reading the source is the only way to check *absence*. A test that imports
  // things can prove what exists; it cannot prove that nothing anywhere calls
  // a method.
  const root = join(import.meta.dirname, "..");
  const declaredIn = join("src", "contracts", "assessment-boundary.js");
  const reExportedIn = join("src", "index.ts");

  const sources: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        walk(full);
      } else if (entry.name.endsWith(".ts")) {
        sources.push(full);
      }
    }
  };
  for (const dir of ["src", "cli", "web"]) walk(join(root, dir));
  assert.ok(sources.length > 20, "the source scan found almost nothing, so it is proving nothing");

  for (const file of sources) {
    const here = relative(root, file);
    if (here === join("src", "contracts", "assessment-boundary.ts")) continue;

    const text = readFileSync(file, "utf8");
    assert.ok(
      !text.includes("observePracticeOutcome"),
      `${here} calls the assessment port, which A1 says nothing may do`,
    );
    // A re-export is not a wiring. `src/index.ts` publishes the contract so a
    // future authorised implementation has something to implement.
    if (here === reExportedIn) {
      assert.ok(text.includes(declaredIn.split("\\").join("/")) || text.includes("assessment-boundary.js"));
      continue;
    }
    assert.ok(
      !text.includes("AssessmentBoundary"),
      `${here} refers to AssessmentBoundary; the contract is meant to be unimplemented and unwired`,
    );
  }
});
