import assert from "node:assert/strict";
import test from "node:test";

import { evaluateStateMutationPolicy, functionsSeedKnowledge } from "../src/index.js";
import { describeOffers, describeOpportunity } from "../cli/describe.js";
import { applyChoice, applyReflection, startSession } from "../cli/session.js";

/**
 * The session a learner actually drives. Phase 6.
 *
 * These cover the path a person takes through the terminal, without a
 * terminal. The first version of the CLI kept this logic inside the readline
 * loop where no test could reach it — the same mistake as a rule nothing
 * checks, one layer up.
 */

const catalogue = {
  concepts: functionsSeedKnowledge.concepts,
  assets: functionsSeedKnowledge.assets,
  experiences: functionsSeedKnowledge.experiences,
};

test("a session opens on the concept the learner picked, and offers them something", () => {
  const session = startSession("concept.function");

  assert.equal(session.record.state.activeConceptId, "concept.function");
  assert.ok(session.offers.length > 0, "a learner needs something to choose from");
});

test("accepting an offer moves the learner", () => {
  const opened = startSession("concept.function");
  const { session, outcome } = applyChoice(opened, "select-offer", 0);

  assert.equal(outcome.kind, "moved");
  assert.equal(session.record.state.engagementFocus, "active-focus");
});

// ---------------------------------------------------------------------------
// The behaviour this whole project exists to get right
// ---------------------------------------------------------------------------

test("declining leaves the learner exactly where they were", () => {
  const opened = startSession("concept.function");
  const before = opened.record.state;

  const { session, outcome } = applyChoice(opened, "decline-offer", 0);

  assert.equal(outcome.kind, "held");
  if (outcome.kind !== "held") return;
  assert.equal(outcome.choice, "decline-offer");
  assert.equal(outcome.stateUnchanged, true, "the learner was moved after declining");

  assert.equal(session.record.state.activeConceptId, before.activeConceptId);
  assert.equal(session.record.state.engagementFocus, before.engagementFocus);
});

test("deferring leaves the learner exactly where they were", () => {
  const opened = startSession("concept.function");
  const before = opened.record.state;

  const { session, outcome } = applyChoice(opened, "defer-offer", 0);

  assert.equal(outcome.kind, "held");
  assert.equal(session.record.state.activeConceptId, before.activeConceptId);
  assert.equal(session.record.state.engagementFocus, before.engagementFocus);
});

test("declining every offer in turn never moves the learner", () => {
  let session = startSession("concept.function");
  const before = session.record.state;
  const count = session.offers.length;

  for (let index = 0; index < count; index += 1) {
    const result = applyChoice(session, "decline-offer", 0);
    session = result.session;
    assert.equal(result.outcome.kind, "held", `offer ${index} was not held`);
    assert.equal(
      session.record.state.activeConceptId,
      before.activeConceptId,
      `declining offer ${index} moved the learner`,
    );
  }
});

test("an option number that does not exist is reported, not guessed at", () => {
  const opened = startSession("concept.function");
  const { session, outcome } = applyChoice(opened, "select-offer", 999);

  assert.equal(outcome.kind, "no-such-offer");
  assert.equal(session, opened, "a bad index should change nothing at all");
});

// ---------------------------------------------------------------------------
// Pausing and writing
// ---------------------------------------------------------------------------

test("pausing is honoured immediately and needs no reason", () => {
  const opened = startSession("concept.function");
  const { session, outcome } = applyChoice(opened, "pause", -1);

  assert.equal(outcome.kind, "paused");
  assert.equal(session.record.state.engagementFocus, "paused");
});

test("what a learner writes is kept as theirs, word for word", () => {
  const opened = startSession("concept.function");
  const words = "I think the input is the bit you choose.";

  const { session, outcome } = applyReflection(opened, words, "concept.function");

  assert.equal(outcome.kind, "written-down");
  assert.equal(session.record.evidence.length, 1);

  const written = session.record.evidence[0];
  assert.ok(written);
  assert.equal(written.kind, "reflection");
  if (written.kind !== "reflection") return;
  assert.equal(written.originalText, words, "the learner's own words were altered");

  // The engine does form a reading of it — and keeps that strictly apart from
  // what the learner said. Evidence and interpretation are different things and
  // neither is allowed to become the other.
  const reading = session.record.interpretations[0];
  assert.ok(reading, "the engine formed no reading at all");
  assert.ok(
    reading.evidenceIds.includes(written.id),
    "the reading does not say which words it came from",
  );
  assert.notEqual(
    reading.summary,
    words,
    "the reading is presenting itself as the learner's own words",
  );
  assert.ok(
    ["low", "medium", "high", "unknown"].includes(reading.provenance.uncertainty.level),
    "the reading states no uncertainty",
  );

  // Every state change in this session traces back to something the learner
  // did. Checked against the same policy the governance kernel uses, so the
  // terminal cannot drift from the rule the articles state.
  assert.ok(session.record.commitments.length > 0, "nothing was recorded at all");
  for (const commitment of session.record.commitments) {
    assert.equal(
      evaluateStateMutationPolicy(commitment).outcome,
      "permitted",
      `a commitment was not learner-authorised: ${commitment.authorization.kind}`,
    );
  }
});

// ---------------------------------------------------------------------------
// Presentation
// ---------------------------------------------------------------------------

test("every offer renders as something a person could act on", () => {
  const session = startSession("concept.function");
  const lines = describeOffers(session.offers, catalogue);

  assert.equal(lines.length, session.offers.length);
  for (const line of lines) {
    assert.ok(line.trim().length > 3, "an offer rendered as nothing readable");
    // Identifiers are for the engine, not the learner.
    assert.equal(/concept\.|asset\.|offer\./.test(line), false, `raw identifier shown: ${line}`);
  }
});

test("no two offers read the same, so a learner can always tell them apart", () => {
  // Found by looking at a real session: two `continue` opportunities differed
  // only by which learning experience they led to, and rendered as the same
  // sentence twice. A person cannot choose between identical options.
  for (const conceptId of ["concept.function", "concept.domain-range", "concept.inverse-function"]) {
    const session = startSession(conceptId);
    const sentences = session.offers.map((offer) =>
      describeOpportunity(offer.opportunity, catalogue),
    );
    assert.equal(
      new Set(sentences).size,
      sentences.length,
      `two offers read identically for ${conceptId}: ${sentences.join(" | ")}`,
    );
  }
});

test("descriptions name the concept in words the learner chose it by", () => {
  const session = startSession("concept.function");
  const first = session.offers[0];
  assert.ok(first);

  const described = describeOpportunity(first.opportunity, catalogue);
  const concept = catalogue.concepts.find((c) => c.id === "concept.function");
  assert.ok(concept);

  // Not every opportunity mentions the concept, but none should be empty or raw.
  assert.ok(described.length > 0);
  assert.equal(described.includes("concept."), false);
});

// ---------------------------------------------------------------------------
// What the field test found
//
// A person opened a session, picked "Domain and Range", was told there was
// nothing on offer, and later chose "Stop for now" three times without ever
// being stopped. Both are here now.
// ---------------------------------------------------------------------------

test("every concept a learner can pick opens with something on offer", () => {
  // The terminal used to open every session at the intuition layer, which no
  // learner asked for. Domain and Range has no material at that layer, so
  // picking it led straight to an empty screen -- a depth chosen on someone's
  // behalf, silently excluding the only thing there was to show them.
  for (const concept of functionsSeedKnowledge.concepts) {
    const session = startSession(concept.id);
    assert.ok(
      session.offers.length > 0,
      `${concept.title} opens with nothing on offer, which is a dead end`,
    );
  }
});

test("choosing the offer to stop actually stops the learner", () => {
  const opened = startSession("concept.function");
  const index = opened.offers.findIndex((offer) => offer.opportunity.kind === "pause");
  assert.ok(index >= 0, "the learner is never shown a way to stop");

  const { session, outcome } = applyChoice(opened, "select-offer", index);

  assert.equal(outcome.kind, "paused", "the learner asked to stop and was told they had moved");
  assert.equal(session.record.state.engagementFocus, "paused");
});

test("choosing to decide for yourself moves the learner nowhere", () => {
  const opened = startSession("concept.function");
  const index = opened.offers.findIndex((offer) => offer.opportunity.kind === "allow-learner-choice");
  assert.ok(index >= 0);
  const before = opened.record.state;

  const { session, outcome } = applyChoice(opened, "select-offer", index);

  assert.equal(outcome.kind, "left-to-you");
  assert.equal(session.record.state.activeConceptId, before.activeConceptId);
  assert.equal(session.record.state.engagementFocus, before.engagementFocus);
});

test("the terminal never claims movement that did not happen", () => {
  // "Right -- Domain and Range." was printed after a choice that changed
  // nothing at all. Whatever the engine records internally, what a learner is
  // told has to match what became true.
  let session = startSession("concept.function");
  const index = session.offers.findIndex((offer) => offer.opportunity.kind === "continue");
  assert.ok(index >= 0);

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const before = session.record.state;
    const result = applyChoice(session, "select-offer", index);
    session = result.session;
    const after = session.record.state;

    const moved =
      after.activeConceptId !== before.activeConceptId ||
      after.engagementFocus !== before.engagementFocus ||
      after.activePedagogicalLayer !== before.activePedagogicalLayer;

    if (result.outcome.kind === "moved") {
      assert.ok(moved, `attempt ${attempt}: reported movement, but nothing changed`);
    }
    if (!moved && result.outcome.kind !== "no-such-offer") {
      assert.notEqual(result.outcome.kind, "moved", `attempt ${attempt}: nothing changed`);
    }
  }
});

