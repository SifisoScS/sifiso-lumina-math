import { LearnerRecord } from "../src/domain/learner-record.js";
import { decodeRecord, encodeRecord, LoadResult } from "../cli/record-format.js";

/**
 * Keeping a learner's record in the browser.
 *
 * The same posture as the terminal's file: it stays on this machine, nobody
 * else can read it, and deleting means deleting. `localStorage` is this
 * surface's equivalent of the file -- origin-scoped, under the person's own
 * control, and cleared by the same act that clears their browser data.
 *
 * The parsing, validation, and replay all live in `cli/record-format.ts` and
 * are shared with the terminal, so the two surfaces cannot drift into
 * disagreeing about what a valid record is. Only where the bytes live differs.
 */

export const STORAGE_KEY = "math-lumina.learner-record";

export function saveRecord(record: LearnerRecord): void {
  window.localStorage.setItem(STORAGE_KEY, encodeRecord(record));
}

export function loadRecord(): LoadResult {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === null) return { kind: "none" };
  return decodeRecord(raw);
}

export function forgetRecord(): boolean {
  const existed = window.localStorage.getItem(STORAGE_KEY) !== null;
  window.localStorage.removeItem(STORAGE_KEY);
  return existed;
}

export function recordExists(): boolean {
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}
