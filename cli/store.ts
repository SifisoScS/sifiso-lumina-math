import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import { LearnerRecord } from "../src/domain/learner-record.js";
import { decodeRecord, describe, encodeRecord, LoadResult } from "./record-format.js";

/**
 * Keeping a learner's record between sessions, in a file. Deliberately outside
 * the engine, which is headless and stores nothing.
 *
 * Everything here stays on this machine. One file, owned by the person who
 * wrote it, deleted by deleting it. Nothing is transmitted, so no third party
 * holds it and no jurisdiction question arises -- which is the only reason the
 * privacy question (O2) could be narrowed far enough to build this at all.
 *
 * What a valid record *is* lives in `record-format.ts`, shared with the browser
 * surface, so the two cannot drift into disagreeing about the same history.
 */

export const DEFAULT_RECORD_PATH = ".lumina/learner-record.json";
export type { LoadResult };

/** Writes the record. The learner's state is not stored; it is derived on load. */
export function saveRecord(record: LearnerRecord, path: string = DEFAULT_RECORD_PATH): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, encodeRecord(record), "utf8");
}

/**
 * Reads the record and rebuilds the learner's state from its own history.
 *
 * A file that cannot be read is refused rather than repaired, and a refusal
 * never silently starts someone over -- losing a person's history without
 * telling them is worse than failing to open it.
 */
export function loadRecord(path: string = DEFAULT_RECORD_PATH): LoadResult {
  if (!existsSync(path)) return { kind: "none" };
  try {
    return decodeRecord(readFileSync(path, "utf8"));
  } catch (error) {
    return { kind: "unreadable", reason: `the file could not be read (${describe(error)})` };
  }
}

/** Whether anything is being kept. Asked before telling a learner anything is. */
export function recordExists(path: string = DEFAULT_RECORD_PATH): boolean {
  return existsSync(path);
}

/** Deletes the record. This is what "delete my data" means here: the file goes. */
export function forgetRecord(path: string = DEFAULT_RECORD_PATH): boolean {
  if (!existsSync(path)) return false;
  rmSync(path);
  return true;
}
