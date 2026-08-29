import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  functionsSeedKnowledge,
  LearnerChoiceKind,
  evolveLearnerRecord,
  learnerChoice,
  learnerReflection,
  LearningOpportunityKind,
  opportunityAcceptanceEffect,
  learnerRecord,
  offerAdvancement,
  submitLearnerChoiceCommand,
  submitReflectionCommand,
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
function respondToOffer(
  choiceKind: LearnerChoiceKind,
  idPart: string,
  opportunityKind: LearningOpportunityKind = "explore-representation",
) {
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

  const offer = first.decision.offers.find((candidate) => candidate.opportunity.kind === opportunityKind);
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
  // Deliberately an offer that leads somewhere else. Accepting an offer for the
  // concept already open moves nobody, so testing movement with one of those
  // proved only that a commitment was written -- which is what O8 was about.
  const { responded } = respondToOffer("select-offer", "select", "explore-concept-bridge");

  assert.equal(responded.transition.kind, "committed");
  assert.equal(responded.transition.nextState.activeConceptId, "concept.inverse-function");
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), true);
});

test("accepting an offer for where the learner already is commits nothing", () => {
  // O8. `stateDeltaDimensions` reported what a delta mentioned rather than what
  // it altered, so this wrote a commitment recording an `active-concept` change
  // to the concept the learner had never left.
  const { priorState, responded } = respondToOffer("select-offer", "already-here", "explore-representation");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  if (responded.transition.kind === "not-committed") {
    assert.equal(responded.transition.learnerAction, "learner-action-stands");
  }
});

test("taking up an offer is recorded even when it moves nothing", () => {
  const { responded } = respondToOffer("select-offer", "still-recorded", "explore-representation");

  // The acceptance happened and is in the history. What is absent is a
  // commitment, and that absence is what says the learner did not move.
  const accepted = responded.events.find((event) => event.kind === "learning-path-accepted");
  assert.ok(accepted, "the learner took up an offer and nothing recorded it");
  assert.equal(accepted.stateCommitmentId, undefined);
  assert.equal(accepted.evidenceId, "choice.agency.still-recorded.001");
});

test("decline-offer creates no commitment and leaves state untouched", () => {
  const { priorState, responded } = respondToOffer("decline-offer", "decline");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);

  // O9. The decline is recorded, and what makes it a decline rather than an
  // acceptance is that the event carries no state commitment. This used to
  // assert that nothing at all was recorded, which is how a decline came to be
  // unprovable after the fact.
  const [event, ...rest] = responded.events;
  assert.equal(rest.length, 0, "a decline should record one event and no more");
  assert.equal(event?.kind, "learning-path-declined");
  assert.equal(event?.evidenceId, "choice.agency.decline.001");
  assert.equal(
    event?.stateCommitmentId,
    undefined,
    "a declined path recorded a state commitment, which is the defect this project began with",
  );
});

test("a decline is provable after the fact from the record alone", () => {
  const { responded } = respondToOffer("decline-offer", "provable");

  // The whole point of closing O9: someone auditing the record later can see
  // both that the learner declined and that nothing moved them, without
  // needing to have been there.
  const declined = responded.events.find((event) => event.kind === "learning-path-declined");
  assert.ok(declined, "nothing in the record says the learner declined");
  assert.equal(declined.stateCommitmentId, undefined);
  assert.equal(responded.transition.kind, "not-committed");
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

// ---------------------------------------------------------------------------
// Accepting an offer that is not a destination
//
// Found by a person using the terminal. Two of the offered kinds do not name
// anywhere to go, and both were reaching the movement delta: a learner who
// chose "Stop for now" was committed into active focus. The system answered an
// explicit request with its opposite, which is the harm this whole project is
// organised against, and 126 tests did not notice.
// ---------------------------------------------------------------------------

const allOpportunityKinds = [
  "continue",
  "practise",
  "reflect",
  "revisit",
  "explore-representation",
  "revisit-prerequisite",
  "explore-concept-bridge",
  "move-toward-layer",
  "pause",
  "allow-learner-choice",
] as const;

/** Same compile-time coverage check as for choice kinds, one union along. */
type UncoveredOpportunity = Exclude<LearningOpportunityKind, (typeof allOpportunityKinds)[number]>;
const allOpportunityKindsCovered: UncoveredOpportunity extends never ? true : never = true;

test("every learning opportunity kind is classified for acceptance", () => {
  assert.equal(allOpportunityKindsCovered, true);
  for (const kind of allOpportunityKinds) {
    const effect = opportunityAcceptanceEffect(kind);
    assert.ok(
      effect === "advance-toward-opportunity" ||
        effect === "suspend-engagement" ||
        effect === "no-state-effect",
      `${kind} must be classified`,
    );
  }
});

test("only the two autonomy controls are exempt from advancing the learner", () => {
  assert.equal(opportunityAcceptanceEffect("pause"), "suspend-engagement");
  assert.equal(opportunityAcceptanceEffect("allow-learner-choice"), "no-state-effect");
  for (const kind of allOpportunityKinds.filter((k) => k !== "pause" && k !== "allow-learner-choice")) {
    assert.equal(opportunityAcceptanceEffect(kind), "advance-toward-opportunity", `${kind} names a destination`);
  }
});

test("accepting the offer to stop stops the learner", () => {
  const { responded } = respondToOffer("select-offer", "accept-pause", "pause");

  assert.equal(responded.transition.kind, "committed");
  assert.equal(
    responded.transition.nextState.engagementFocus,
    "paused",
    "the learner asked to stop and was not stopped",
  );
});

test("accepting the offer to stop is not recorded as accepting a learning path", () => {
  // A6. The history is what happened. A learner who stopped did not take up a
  // path, and a record saying otherwise is a claim they never made.
  const { responded } = respondToOffer("select-offer", "pause-event", "pause");

  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), false);
  assert.equal(responded.events.some((event) => event.kind === "state-committed"), true);
});

test("accepting the offer to decide for yourself commits nothing", () => {
  const { priorState, responded } = respondToOffer("select-offer", "self-choice", "allow-learner-choice");

  assert.equal(responded.transition.kind, "not-committed");
  assert.equal(responded.transition.nextState.activeConceptId, priorState.activeConceptId);
  assert.equal(responded.transition.nextState.engagementFocus, priorState.engagementFocus);
});

// ---------------------------------------------------------------------------
// The other half of closing O9
//
// Keeping a learner's action when the system planned no state change is only
// safe if "the system planned no state change" is distinguished from "the
// command was refused". An actor outside the learner's scope reaches the same
// not-committed result, and must write nothing at all.
// ---------------------------------------------------------------------------

test("an actor outside the learner's scope cannot write to their record", () => {
  const intruder = trustedActorContext({
    actorId: "actor.someone-else",
    learnerScope: ["learner.someone-else"],
    permissions: ["request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
    consentReferences: ["consent.someone-else"],
  });

  const before = recordWithState(currentLearnerState({ learnerId, engagementFocus: "unobserved" }));
  const command = submitReflectionCommand({
    id: "command.agency.intruder",
    commandReference: "occurrence.agency.intruder",
    learnerId,
    issuedAt: timestamp,
    reflection: learnerReflection({
      id: "evidence.reflection.intruder",
      learnerId,
      conceptId: "concept.function",
      originalText: "Written by someone who is not this learner.",
      submittedAt: timestamp,
    }),
  });

  const execution = executeDeterministicLearningInteraction({
    command,
    actor: intruder,
    deliveryCapabilities: capabilities,
    learnerRecord: before,
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: timestamp,
  });

  assert.equal(execution.transition.kind, "not-committed");
  if (execution.transition.kind === "not-committed") {
    assert.equal(execution.transition.learnerAction, "no-learner-action");
  }

  const evolved = evolveLearnerRecord(before, command, execution);
  assert.equal(evolved.disposition, "unchanged");
  assert.equal(evolved.learnerRecord.evidence.length, 0, "a refused command wrote into a learner's record");
  assert.equal(evolved.learnerRecord.events.length, 0);
  assert.equal(evolved.learnerRecord.commitments.length, 0);
});

test("every non-commitment states whether the learner acted", () => {
  // The disposition is what separates "you declined" from "you were refused".
  // If a new non-commitment path forgets to say which it is, it does not
  // compile -- the field is required on the variant.
  for (const kind of allChoiceKinds) {
    const { responded } = respondToOffer(kind, `disposition-${kind}`);
    if (responded.transition.kind !== "not-committed") continue;
    assert.ok(
      responded.transition.learnerAction === "learner-action-stands" ||
        responded.transition.learnerAction === "no-learner-action",
      `${kind} produced a non-commitment that says nothing about who acted`,
    );
  }
});
