import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { forgetRecord, loadRecord, recordExists, saveRecord } from "../cli/store.js";
import { applyChoice, applyReflection, startSession } from "../cli/session.js";

/**
 * Keeping a record between sessions.
 *
 * Until this existed the engine's whole causal apparatus -- commitments,
 * events, replay -- was created and discarded inside one process.
 * `replayLearnerHistory` had never reconstructed a real learner's state. These
 * tests are the first time the record is written down and read back.
 */

function scratch(): string {
  return join(mkdtempSync(join(tmpdir(), "lumina-store-")), "record.json");
}

function aSessionWithHistory() {
  let session = startSession("concept.function");
  session = applyChoice(session, "decline-offer", 0).session;
  session = applyReflection(session, "A function sends each input to one output.", "concept.function").session;
  const bridge = session.offers.findIndex((offer) => offer.opportunity.kind === "explore-concept-bridge");
  if (bridge >= 0) session = applyChoice(session, "select-offer", bridge).session;
  return session;
}

test("a record survives being written and read back", () => {
  const path = scratch();
  const session = aSessionWithHistory();

  saveRecord(session.record, path);
  const loaded = loadRecord(path);

  assert.equal(loaded.kind, "loaded");
  if (loaded.kind !== "loaded") return;
  assert.equal(loaded.record.evidence.length, session.record.evidence.length);
  assert.equal(loaded.record.events.length, session.record.events.length);
  assert.equal(loaded.record.commitments.length, session.record.commitments.length);
  assert.equal(loaded.record.interpretations.length, session.record.interpretations.length);
});

test("the learner's state is rebuilt from their history, not read from the file", () => {
  // The stored state could disagree with the events that produced it. Replaying
  // is what makes the file checkable rather than merely loadable.
  const path = scratch();
  const session = aSessionWithHistory();
  saveRecord(session.record, path);

  const stored = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  assert.equal("state" in stored, false, "the state was written down instead of being derived");

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "loaded");
  if (loaded.kind !== "loaded") return;
  assert.deepEqual(loaded.record.state, session.record.state);
});

test("a learner's own words come back exactly as they wrote them", () => {
  const path = scratch();
  const words = "I think the domain is the inputs you are allowed to use.";
  let session = startSession("concept.function");
  session = applyReflection(session, words, "concept.function").session;
  saveRecord(session.record, path);

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "loaded");
  if (loaded.kind !== "loaded") return;
  const written = loaded.record.evidence.find((item) => item.kind === "reflection");
  assert.ok(written);
  if (written.kind !== "reflection") return;
  assert.equal(written.originalText, words);
});

test("a returning learner keeps what they did last time", () => {
  const path = scratch();
  const first = aSessionWithHistory();
  saveRecord(first.record, path);

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "loaded");
  if (loaded.kind !== "loaded") return;

  const second = startSession("concept.function", loaded.record);
  assert.ok(
    second.record.evidence.length >= first.record.evidence.length,
    "the returning learner lost evidence they had already given",
  );
  for (const item of first.record.evidence) {
    assert.ok(
      second.record.evidence.some((candidate) => candidate.id === item.id),
      `${item.id} was dropped when the learner came back`,
    );
  }
});

test("a second session does not mint identifiers that collide with the first", () => {
  // Numbering from one again would produce `command.cli.open.001` a second
  // time, and the record would absorb the new work as a duplicate of the old.
  const path = scratch();
  const first = aSessionWithHistory();
  saveRecord(first.record, path);
  const loaded = loadRecord(path);
  if (loaded.kind !== "loaded") throw new Error("setup");

  const second = applyReflection(
    startSession("concept.function", loaded.record),
    "Coming back to this.",
    "concept.function",
  ).session;

  const ids = second.record.evidence.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, "two pieces of evidence share an identifier");
  const eventIds = second.record.events.map((item) => item.id);
  assert.equal(new Set(eventIds).size, eventIds.length, "two events share an identifier");
});

// ---------------------------------------------------------------------------
// Failing closed
// ---------------------------------------------------------------------------

test("no record is not an error", () => {
  assert.equal(loadRecord(scratch()).kind, "none");
});

test("a file that is not readable JSON is refused, not silently discarded", () => {
  const path = scratch();
  writeFileSync(path, "{ this is not json", "utf8");

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "unreadable");
  // The file is still there. Losing someone's history without telling them is
  // worse than failing to open it.
  assert.equal(readFileSync(path, "utf8"), "{ this is not json");
});

test("a history that does not reconstruct is refused", () => {
  const path = scratch();
  const session = aSessionWithHistory();
  saveRecord(session.record, path);

  const stored = JSON.parse(readFileSync(path, "utf8")) as { commitments: unknown[] };
  stored.commitments = [];
  writeFileSync(path, JSON.stringify(stored), "utf8");

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "unreadable", "a record whose commitments are missing was accepted");
});

test("a record belonging to someone else is refused", () => {
  const path = scratch();
  const session = aSessionWithHistory();
  saveRecord(session.record, path);

  const stored = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  stored.learnerId = "learner.someone-else";
  writeFileSync(path, JSON.stringify(stored), "utf8");

  assert.equal(loadRecord(path).kind, "unreadable");
});

test("a record written by a future version is refused rather than guessed at", () => {
  const path = scratch();
  saveRecord(aSessionWithHistory().record, path);
  const stored = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  stored.format = "math-lumina.learner-record.v99";
  writeFileSync(path, JSON.stringify(stored), "utf8");

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "unreadable");
  if (loaded.kind !== "unreadable") return;
  assert.ok(loaded.reason.includes("v99"), "the refusal does not say what it found");
});

test("evidence this terminal never writes is refused", () => {
  const path = scratch();
  saveRecord(aSessionWithHistory().record, path);
  const stored = JSON.parse(readFileSync(path, "utf8")) as { evidence: unknown[] };
  stored.evidence.push({ kind: "confidence-report", id: "evidence.smuggled" });
  writeFileSync(path, JSON.stringify(stored), "utf8");

  const loaded = loadRecord(path);
  assert.equal(loaded.kind, "unreadable");
  if (loaded.kind !== "unreadable") return;
  // Asserting the reason, not merely the refusal. Without this the test passes
  // whenever anything downstream happens to reject the record, which is not the
  // same as this guard doing its job.
  assert.ok(
    loaded.reason.includes("confidence-report"),
    `refused for the wrong reason: ${loaded.reason}`,
  );
});

// ---------------------------------------------------------------------------
// Deletion
// ---------------------------------------------------------------------------

test("forgetting deletes the file, and there is nothing left to load", () => {
  const path = scratch();
  saveRecord(aSessionWithHistory().record, path);

  assert.equal(forgetRecord(path), true);
  assert.equal(loadRecord(path).kind, "none");
  assert.equal(forgetRecord(path), false, "forgetting twice should not claim a second deletion");
});

test("what is written contains only this learner's own material", () => {
  // A local file is still a file. Anything in it that is not the learner's
  // record is something nobody agreed to keep.
  const path = scratch();
  const session = aSessionWithHistory();
  saveRecord(session.record, path);

  const stored = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  assert.deepEqual(
    Object.keys(stored).sort(),
    ["commitments", "events", "evidence", "format", "interpretations", "learnerId"],
    "the file holds something other than the learner's record",
  );
  rmSync(path);
});

test("whether anything is kept can be asked before it is claimed", () => {
  // Found by running the terminal: a learner who typed `forget` and then quit
  // was told "Saved to .lumina/learner-record.json. It will be here next time."
  // The file was gone. Of everything this terminal says, a false assurance
  // about deletion is the worst one to get wrong.
  const path = scratch();
  assert.equal(recordExists(path), false);

  saveRecord(aSessionWithHistory().record, path);
  assert.equal(recordExists(path), true);

  forgetRecord(path);
  assert.equal(recordExists(path), false, "something was kept after being forgotten");
});
