import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  functionsSeedKnowledge,
  LearnerChoiceKind,
  learnerChoice,
  learnerRecord,
  offerAdvancement,
  submitLearnerChoiceCommand,
  trustedActorContext,
} from "../src/index.js";
import { timestamp } from "./fixtures.js";
import { exploreConceptCommand } from "../src/contracts/core-contracts.js";

/**
 * Foundation article A2 — learner agency. These tests exist because the engine
 * previously recorded declines as commitments identical to acceptance, with
 * only the event label differing, for the entire lifetime of the preceding
 * governance corpus and with no test covering it.
 */

const learnerId = "learner.agency";
const actor = trustedActorContext({
  actorId: "actor.agency",
  learnerScope: [learnerId],
  permissions: ["request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
  consentReferences: ["consent.agency.001"],
});
const capabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);

function recordWithState(state: ReturnType<typeof currentLearnerState>) {
  return learnerRecord({
    learnerId: state.learnerId,
    evidence: [],
    events: [],
    interpretations: [],
    state,
    commitments: [],
  });
}

/** Establishes an active offer, then responds to it with the given choice kind. */
function respondToOffer(choiceKind: LearnerChoiceKind, idPart: string) {
  const first = executeDeterministicLearningInteraction({
    command: exploreConceptCommand({
      id: `command.agency.${idPart}.initial`,
      commandReference: `occurrence.agency.${idPart}.initial`,
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.function",
      pedagogicalLayer: "intuition",
    }),
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: recordWithState(currentLearnerState({ learnerId, engagementFocus: "unobserved" })),
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });

  const offer = first.decision.offers.find((candidate) => candidate.opportunity.kind === "explore-representation");
  assert.ok(offer, "setup requires a currently active offer");

  const responded = executeDeterministicLearningInteraction({
    command: submitLearnerChoiceCommand({
      id: `command.agency.${idPart}.choice`,
      commandReference: `occurrence.agency.${idPart}.choice`,
      learnerId,
      issuedAt: timestamp,
      // The domain rejects a pause choice that references an offer, so pause is
      // constructed without one. Every other kind targets the active offer.
      learnerChoice: learnerChoice({
        id: `choice.agency.${idPart}.001`,
        learnerId,
        choiceKind,
        ...(choiceKind === "pause" ? {} : { offerId: offer?.id }),
        chosenAt: timestamp,
      }),
    }),
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: recordWithState(first.transition.nextState),
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    activeOffers: first.decision.offers,
    evaluatedAt: timestamp,
  });

  return { priorState: first.transition.nextState, responded };
}

// ---------------------------------------------------------------------------
// Classification — every kind is classified, and only acceptance may advance.
// ---------------------------------------------------------------------------

const allChoiceKinds = [
  "select-offer",
  "decline-offer",
  "defer-offer",
  "request-alternative",
  "pause",
] as const;

/**
 * Compile-time coverage check. If a LearnerChoiceKind is added without being
 * listed here, `Uncovered` stops being `never` and this assignment fails to
 * compile. `offerAdvancement` fails to compile independently at its own `never`
 * assertion, so a new kind cannot slip through unclassified in either place.
 */
type Uncovered = Exclude<LearnerChoiceKind, (typeof allChoiceKinds)[number]>;
const allKindsCovered: Uncovered extends never ? true : never = true;

test("every learner choice kind is classified for offer advancement", () => {
  assert.equal(allKindsCovered, true);
  for (const kind of allChoiceKinds) {
    const advancement = offerAdvancement(kind);
    assert.ok(
      advancement === "may-advance-toward-offer" || advancement === "must-not-advance-toward-offer",
      `${kind} must be classified`,
    );
  }
});

test("only acceptance may advance the learner toward an offer", () => {
  assert.equal(offerAdvancement("select-offer"), "may-advance-toward-offer");
  for (const kind of allChoiceKinds.filter((k) => k !== "select-offer")) {
    assert.equal(offerAdvancement(kind), "must-not-advance-toward-offer", `${kind} must not advance`);
  }
});

// ---------------------------------------------------------------------------
// Behaviour — one test per choice kind.
// ---------------------------------------------------------------------------

test("select-offer commits and moves the learner toward the offered concept", () => {
  const { responded } = respondToOffer("select-offer", "select");

  assert.equal(responded.transition.kind, "committed");
  assert.equal(responded.transition.nextState.activeConceptId, "concept.function");
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), true);
});

test("decline-offer creates no commitment and leaves state untouched", () => {
  const { priorState, responded } = respondToOffer("decline-offer", "decline");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.length, 0);
});

test("defer-offer creates no commitment and leaves state untouched", () => {
  const { priorState, responded } = respondToOffer("defer-offer", "defer");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.length, 0);
});

test("request-alternative creates no commitment toward the original offer", () => {
  const { priorState, responded } = respondToOffer("request-alternative", "alternative");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.length, 0);
});

test("pause changes engagement only and never advances toward the offer", () => {
  const { priorState, responded } = respondToOffer("pause", "pause");

  assert.equal(responded.transition.kind, "committed");
  assert.equal(responded.transition.nextState.engagementFocus, "paused");
  // Engagement changed; the learner did not move toward the offered opportunity.
  assert.equal(responded.transition.nextState.activeConceptId, priorState.activeConceptId);
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), false);
});

test("no non-advancing choice produces a state commitment under any circumstance", () => {
  for (const kind of allChoiceKinds) {
    if (offerAdvancement(kind) !== "must-not-advance-toward-offer") continue;
    const { priorState, responded } = respondToOffer(kind, `sweep-${kind}`);
    assert.equal(
      responded.transition.nextState.activeConceptId,
      priorState.activeConceptId,
      `${kind} moved the learner toward the offered concept`,
    );
  }
});
