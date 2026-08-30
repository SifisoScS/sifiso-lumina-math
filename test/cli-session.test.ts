import assert from "node:assert/strict";
import test from "node:test";

import { evaluateStateMutationPolicy, functionsSeedKnowledge } from "../src/index.js";
import { describeOffers, describeOpportunity, materialFor } from "../cli/describe.js";
import { decodeRecord, encodeRecord } from "../cli/record-format.js";
import { activePedagogicalLayer, pedagogicalLayerFor } from "../src/domain/learner-record.js";
import {
  applyChoice,
  applyConfidence,
  applyReflection,
  chooseDepth,
  choicesMade,
  reflectionsWritten,
  startSession,
} from "../cli/session.js";

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
      activePedagogicalLayer(after) !== activePedagogicalLayer(before);

    if (result.outcome.kind === "moved") {
      assert.ok(moved, `attempt ${attempt}: reported movement, but nothing changed`);
    }
    if (!moved && result.outcome.kind !== "no-such-offer") {
      assert.notEqual(result.outcome.kind, "moved", `attempt ${attempt}: nothing changed`);
    }
  }
});

test("a learner who has written nothing is not told they have written something", () => {
  // The second field session showed "Written down: 1" to someone who had only
  // picked an option from a menu. A choice is evidence and is stored alongside
  // reflections, so counting the record wholesale counted their selection as
  // their words. A6 -- what a learner is told about their own record has to be
  // true, and this is the record of the person reading it.
  let session = startSession("concept.function");
  assert.equal(reflectionsWritten(session), 0);

  session = applyChoice(session, "select-offer", 0).session;
  assert.equal(reflectionsWritten(session), 0, "a choice was counted as something written");
  assert.ok(choicesMade(session) > 0, "the choice itself is still recorded");

  session = applyReflection(session, "A function takes one thing to one thing.", "concept.function").session;
  assert.equal(reflectionsWritten(session), 1);
});

test("the two counts never collapse into each other", () => {
  let session = startSession("concept.function");
  session = applyChoice(session, "select-offer", 0).session;
  session = applyReflection(session, "first", "concept.function").session;
  session = applyChoice(session, "decline-offer", 0).session;
  session = applyReflection(session, "second", "concept.function").session;

  assert.equal(reflectionsWritten(session), 2);
  assert.equal(
    reflectionsWritten(session) + choicesMade(session),
    session.record.evidence.length,
    "some evidence is neither a reflection nor a choice and is going unreported",
  );

  // Both choices are here: the one that moved the learner and the one that
  // deliberately did not. Before O9 was closed this was 1, because a decline
  // was kept only if the system had agreed to move.
  assert.equal(choicesMade(session), 2);
});

test("a learner who pauses stays paused until they act", () => {
  const opened = startSession("concept.function");
  const stop = opened.offers.findIndex((offer) => offer.opportunity.kind === "pause");
  assert.ok(stop >= 0);

  const paused = applyChoice(opened, "select-offer", stop);
  assert.equal(paused.outcome.kind, "paused");
  assert.equal(paused.session.record.state.engagementFocus, "paused");

  // Picking something up again is the learner's move, and theirs alone. The
  // engine must not return them to active focus on its own.
  const resumed = applyChoice(paused.session, "select-offer", 0);
  assert.equal(resumed.session.record.state.engagementFocus, "active-focus");
});

// ---------------------------------------------------------------------------
// Actually showing the learner something
//
// Three field sessions in, nobody had been shown any learning material at all.
// A learner who chose "see this shown a different way" was told "you are
// already there - nothing moved" and shown nothing. Showing someone something
// is not a state change, and the terminal had been treating it as one.
// ---------------------------------------------------------------------------

test("choosing to see a representation actually shows it", () => {
  const session = startSession("concept.inverse-function");
  const offer = session.offers.find((candidate) => candidate.opportunity.kind === "explore-representation");
  assert.ok(offer, "there is nothing to show a learner");

  const lines = materialFor(offer.opportunity, catalogue);
  assert.ok(lines.length > 0, "the learner asked to be shown something and got nothing");

  const asset = catalogue.assets.find((a) => a.id === offer.opportunity.knowledgeAssetId);
  assert.ok(asset);
  assert.ok(lines.includes(asset.content), "the asset was named but its content was never shown");
});

test("every offer that names material can show it", () => {
  for (const concept of functionsSeedKnowledge.concepts) {
    for (const offer of startSession(concept.id).offers) {
      const names = offer.opportunity.knowledgeAssetId !== undefined ||
        offer.opportunity.learningExperienceId !== undefined ||
        offer.opportunity.relatedConceptId !== undefined;
      if (!names) continue;
      assert.ok(
        materialFor(offer.opportunity, catalogue).length > 0,
        `${offer.opportunity.id} names material a learner cannot be shown`,
      );
    }
  }
});

test("nothing is shown for an offer that names nothing", () => {
  const session = startSession("concept.function");
  for (const kind of ["pause", "allow-learner-choice"] as const) {
    const offer = session.offers.find((candidate) => candidate.opportunity.kind === kind);
    assert.ok(offer);
    assert.deepEqual(materialFor(offer.opportunity, catalogue), []);
  }
});

test("nothing shown to a learner is invented", () => {
  // The one line that must never drift: every word a learner reads as material
  // is a word the catalogue contains. Not paraphrased, not summarised, not
  // generated -- A5 keeps a model out of this path entirely, and this keeps the
  // terminal itself out of it too.
  const permitted = new Set<string>();
  for (const asset of catalogue.assets) {
    permitted.add(asset.title);
    permitted.add(asset.content);
  }
  for (const concept of catalogue.concepts) {
    permitted.add(concept.title);
    permitted.add(concept.conceptualDescription);
  }

  for (const concept of functionsSeedKnowledge.concepts) {
    for (const offer of startSession(concept.id).offers) {
      for (const line of materialFor(offer.opportunity, catalogue)) {
        assert.ok(permitted.has(line), `a learner would be shown text no asset contains: ${line}`);
      }
    }
  }
});

test("a retired asset is never shown to a learner", () => {
  const session = startSession("concept.inverse-function");
  const offer = session.offers.find((candidate) => candidate.opportunity.kind === "explore-representation");
  assert.ok(offer);

  const retired = {
    ...catalogue,
    assets: catalogue.assets.map((asset) => ({ ...asset, status: "retired" as const })),
  };
  const lines = materialFor(offer.opportunity, retired);
  for (const asset of catalogue.assets) {
    assert.equal(lines.includes(asset.content), false, "retired material reached a learner");
  }
});

// ---------------------------------------------------------------------------
// Offers describe where the learner is now
//
// Offers belong to a decision, and a decision is computed before the state
// change it causes. So the list shown after a choice described where the
// learner had been. Following a bridge to another concept left them being
// offered the one they had just left, and picking it would have been refused as
// no longer compatible and reported as "put off for now" -- for something they
// had actively chosen.
// ---------------------------------------------------------------------------

test("after moving to another concept, every offer belongs to the new one", () => {
  let session = startSession("concept.function");
  const bridge = session.offers.findIndex((offer) => offer.opportunity.kind === "explore-concept-bridge");
  assert.ok(bridge >= 0, "there is no bridge to follow");

  session = applyChoice(session, "select-offer", bridge).session;
  const now = session.record.state.activeConceptId;
  assert.equal(now, "concept.inverse-function");

  for (const offer of session.offers) {
    assert.equal(
      offer.opportunity.conceptId,
      now,
      `offered ${offer.opportunity.id} while the learner is on ${now}`,
    );
  }
});

test("a learner is never offered something the engine would then refuse", () => {
  // The failure this prevents: being shown an option, choosing it, and being
  // told it was put off for now.
  let session = startSession("concept.function");
  const bridge = session.offers.findIndex((offer) => offer.opportunity.kind === "explore-concept-bridge");
  session = applyChoice(session, "select-offer", bridge).session;

  for (let index = 0; index < session.offers.length; index += 1) {
    const outcome = applyChoice(session, "select-offer", index).outcome;
    assert.notEqual(
      outcome.kind,
      "no-such-offer",
      `offer ${index + 1} was shown but could not be taken`,
    );
    if (outcome.kind === "held") {
      assert.fail(`offer ${index + 1} was shown, chosen, and then refused`);
    }
  }
});

test("changing depth changes what is on offer straight away", () => {
  let session = startSession("concept.function");
  const exam = session.offers.findIndex(
    (offer) => offer.opportunity.learningExperienceId === "experience.function.exam-patterns-identifying-function",
  );
  assert.ok(exam >= 0);
  const before = session.offers.length;

  session = applyChoice(session, "select-offer", exam).session;

  assert.equal(activePedagogicalLayer(session.record.state), "exam-patterns");
  assert.notEqual(session.offers.length, before, "the offer list still describes the old depth");
  for (const offer of session.offers) {
    const layer = offer.opportunity.pedagogicalLayer;
    if (layer !== undefined) assert.equal(layer, "exam-patterns");
  }
});

test("re-asking what is on offer is not the learner doing something", () => {
  let session = startSession("concept.function");
  const commitments = session.record.commitments.length;
  const bridge = session.offers.findIndex((offer) => offer.opportunity.kind === "explore-concept-bridge");

  session = applyChoice(session, "select-offer", bridge).session;

  // One commitment for the move the learner made, and none for the terminal
  // asking again afterwards.
  assert.equal(session.record.commitments.length, commitments + 1);
  for (const commitment of session.record.commitments) {
    assert.equal(evaluateStateMutationPolicy(commitment).outcome, "permitted");
  }
});

test("asking to see a representation shows the representation, not everything near it", () => {
  // Five assets were wired into the experience holding the vending machine, and
  // asking to see it a different way returned all five, burying the one thing
  // that was asked for.
  const session = startSession("concept.function");
  const offer = session.offers.find((candidate) => candidate.opportunity.kind === "explore-representation");
  assert.ok(offer);

  const lines = materialFor(offer.opportunity, catalogue);
  const asset = catalogue.assets.find((item) => item.id === offer.opportunity.knowledgeAssetId);
  assert.ok(asset);
  assert.deepEqual(lines, [asset.title, asset.content]);
});

// ---------------------------------------------------------------------------
// Things a learner can say for themselves
// ---------------------------------------------------------------------------

test("a learner can say how they want to approach an idea", () => {
  // Depth used to be a side effect of which offer someone happened to take.
  let session = startSession("concept.function");
  assert.equal(activePedagogicalLayer(session.record.state), undefined);

  session = chooseDepth(session, "concept.function", "mechanics");
  assert.equal(activePedagogicalLayer(session.record.state), "mechanics");

  session = chooseDepth(session, "concept.function", "intuition");
  assert.equal(activePedagogicalLayer(session.record.state), "intuition", "a learner could not go back");
});

test("a depth chosen for one idea is not applied to another", () => {
  // Found in the field. A learner chose a depth on Function Notation, opened
  // Domain and Range -- a concept they had never looked at -- and found it
  // already filtered to that depth. Its intuition material and its practice
  // were hidden behind a choice nobody had made about it. The state held one
  // layer for the whole learner, so every later concept inherited it (A2).
  const first = chooseDepth(startSession("concept.function"), "concept.function", "exam-patterns");
  assert.equal(activePedagogicalLayer(first.record.state), "exam-patterns");

  const second = startSession("concept.domain-range", first.record);

  assert.equal(
    activePedagogicalLayer(second.record.state),
    undefined,
    "a depth chosen for one concept was carried into another",
  );
  assert.ok(
    second.offers.some((offer) => offer.opportunity.pedagogicalLayer === "intuition"),
    "the new concept opened with its intuition material already filtered out",
  );
});

test("a depth a learner chose is still there when they come back to it", () => {
  const chosen = chooseDepth(startSession("concept.function"), "concept.function", "mechanics");
  const elsewhere = startSession("concept.domain-range", chosen.record);
  const back = startSession("concept.function", elsewhere.record);

  assert.equal(activePedagogicalLayer(back.record.state), "mechanics");
});

test("depths chosen for different ideas do not overwrite each other", () => {
  const first = chooseDepth(startSession("concept.function"), "concept.function", "mechanics");
  const second = chooseDepth(
    startSession("concept.domain-range", first.record),
    "concept.domain-range",
    "intuition",
  );

  assert.equal(activePedagogicalLayer(second.record.state), "intuition");
  assert.equal(pedagogicalLayerFor(second.record.state, "concept.function"), "mechanics");
  assert.equal(pedagogicalLayerFor(second.record.state, "concept.domain-range"), "intuition");
});

test("depths are rebuilt from a learner's own history, not stored alongside it", () => {
  const first = chooseDepth(startSession("concept.function"), "concept.function", "mechanics");
  const second = chooseDepth(
    startSession("concept.domain-range", first.record),
    "concept.domain-range",
    "exam-patterns",
  );

  const loaded = decodeRecord(encodeRecord(second.record));
  assert.equal(loaded.kind, "loaded");
  if (loaded.kind !== "loaded") return;

  // The stored form carries no state at all; both depths come back out of the
  // commitments that recorded them.
  assert.equal(pedagogicalLayerFor(loaded.record.state, "concept.function"), "mechanics");
  assert.equal(pedagogicalLayerFor(loaded.record.state, "concept.domain-range"), "exam-patterns");
});

test("a record written before depth had a concept is refused, not guessed at", () => {
  // A v1 record's layer changes name no concept. Rather than carry migration
  // code for it, an unrecognised version is refused, named, and left untouched
  // -- which keeps the record migratable by anyone who later decides it is
  // worth it, and keeps a learner from being silently started over (A7).
  const stored = JSON.parse(encodeRecord(startSession("concept.function").record));
  stored.format = "math-lumina.learner-record.v1";

  const loaded = decodeRecord(JSON.stringify(stored));

  assert.equal(loaded.kind, "unreadable");
  if (loaded.kind === "unreadable") assert.match(loaded.reason, /v1/);
});

test("choosing a depth changes what is offered, without choosing anything for them", () => {
  const opened = startSession("concept.function");
  const deep = chooseDepth(opened, "concept.function", "exam-patterns");

  assert.notEqual(deep.offers.length, opened.offers.length);
  for (const offer of deep.offers) {
    const layer = offer.opportunity.pedagogicalLayer;
    if (layer !== undefined) assert.equal(layer, "exam-patterns");
  }
  assert.equal(deep.record.state.activeConceptId, opened.record.state.activeConceptId);
});

test("a learner's own account of their confidence is recorded as theirs", () => {
  // `confidence-report` has been a LearnerEvidenceKind all along and nothing
  // collected one. It is the learner's statement about themselves, not an
  // assessment of them -- O4 is untouched by it.
  let session = startSession("concept.function");
  const { session: next, outcome } = applyConfidence(session, "Getting there", "concept.function");
  session = next;

  assert.equal(outcome.kind, "confidence-recorded");
  const reported = session.record.evidence.find((item) => item.kind === "confidence-report");
  assert.ok(reported, "the learner said how sure they were and nothing kept it");
  if (reported.kind !== "confidence-report") return;
  assert.equal(reported.reportedValue, "Getting there");
  assert.equal(reported.scaleLabel, "learner-stated confidence");

  // It is evidence, not a verdict: nothing derived a claim about them from it.
  for (const interpretation of session.record.interpretations) {
    assert.equal(
      interpretation.evidenceIds.includes(reported.id),
      false,
      "a conclusion was drawn from the learner's own confidence report",
    );
  }
});

test("a confidence report survives being written down and read back", () => {
  let session = startSession("concept.function");
  session = applyConfidence(session, "Not yet", "concept.function").session;

  const encoded = encodeRecord(session.record);
  const decoded = decodeRecord(encoded);
  assert.equal(decoded.kind, "loaded");
  if (decoded.kind !== "loaded") return;
  const reported = decoded.record.evidence.find((item) => item.kind === "confidence-report");
  assert.ok(reported);
});
