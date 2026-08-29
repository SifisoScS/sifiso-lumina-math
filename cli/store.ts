import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

import {
  currentLearnerState,
  decisionProvenance,
  derivedInterpretation,
  DerivedInterpretation,
  DomainValidationError,
  HistoricalEvent,
  historicalEvent,
  isoTimestamp,
  LearnerEvidence,
  LearnerRecord,
  learnerChoice,
  learnerRecord,
  learnerReflection,
  learnerStateDelta,
  provenanceReference,
  replayLearnerHistory,
  StateCommitment,
  stateCommitment,
} from "../src/index.js";

/**
 * Keeping a learner's record between sessions. Deliberately outside the engine,
 * which is headless and stores nothing.
 *
 * Everything here stays on this machine. One file, owned by the person who
 * wrote it, deleted by deleting it. Nothing is transmitted, so no third party
 * holds it and no jurisdiction question arises -- which is the only reason the
 * privacy question (O2) could be narrowed far enough to build this at all.
 *
 * The file is never trusted. What is stored is the causal history; the learner's
 * state is reconstructed from it by `replayLearnerHistory` on every load. A file
 * that disagrees with its own history is refused rather than repaired, and a
 * refusal never silently starts someone over -- losing a person's history
 * without telling them is worse than failing to open it.
 */

const FORMAT = "math-lumina.learner-record.v1";

export const DEFAULT_RECORD_PATH = ".lumina/learner-record.json";

export type LoadResult =
  | { readonly kind: "none" }
  | { readonly kind: "loaded"; readonly record: LearnerRecord }
  | { readonly kind: "unreadable"; readonly reason: string };

// --------------------------------------------------------------------------
// Reading untrusted JSON. Nothing enters the domain without going through a
// domain constructor, so the file cannot introduce a record the engine would
// have refused to create.
// --------------------------------------------------------------------------

function object(value: unknown, what: string): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new DomainValidationError(`${what} is not an object.`);
  }
  return value as Record<string, unknown>;
}

function array(value: unknown, what: string): readonly unknown[] {
  if (!Array.isArray(value)) throw new DomainValidationError(`${what} is not a list.`);
  return value;
}

function text(value: unknown, what: string): string {
  if (typeof value !== "string") throw new DomainValidationError(`${what} is not text.`);
  return value;
}

function optionalText(value: unknown, what: string): string | undefined {
  return value === undefined ? undefined : text(value, what);
}

function texts(value: unknown, what: string): readonly string[] {
  return array(value, what).map((item) => text(item, `${what} entry`));
}

function readProvenance(value: unknown, what: string): ReturnType<typeof decisionProvenance> {
  const source = object(value, what);
  const uncertainty = object(source.uncertainty, `${what} uncertainty`);
  return decisionProvenance({
    id: text(source.id, `${what} identifier`),
    references: array(source.references, `${what} references`).map((entry) => {
      const reference = object(entry, `${what} reference`);
      return provenanceReference(
        text(reference.kind, `${what} reference kind`) as Parameters<typeof provenanceReference>[0],
        text(reference.id, `${what} reference identifier`),
      );
    }),
    uncertainty: {
      level: text(uncertainty.level, `${what} uncertainty level`) as "low" | "medium" | "high" | "unknown",
      rationale: text(uncertainty.rationale, `${what} uncertainty rationale`),
    },
    rationale: text(source.rationale, `${what} rationale`),
  });
}

function readEvidence(value: unknown): LearnerEvidence {
  const source = object(value, "Stored evidence");
  const kind = text(source.kind, "Stored evidence kind");
  if (kind === "reflection") {
    return learnerReflection({
      id: text(source.id, "Stored reflection identifier"),
      learnerId: text(source.learnerId, "Stored reflection learner"),
      conceptId: text(source.conceptId, "Stored reflection concept"),
      originalText: text(source.originalText, "Stored reflection text"),
      submittedAt: isoTimestamp(text(source.submittedAt, "Stored reflection timestamp")),
    });
  }
  if (kind === "learner-choice") {
    const offerId = optionalText(source.offerId, "Stored choice offer");
    return learnerChoice({
      id: text(source.id, "Stored choice identifier"),
      learnerId: text(source.learnerId, "Stored choice learner"),
      choiceKind: text(source.choiceKind, "Stored choice kind") as Parameters<typeof learnerChoice>[0]["choiceKind"],
      ...(offerId === undefined ? {} : { offerId }),
      chosenAt: isoTimestamp(text(source.chosenAt, "Stored choice timestamp")),
    });
  }
  // The terminal only ever writes reflections and choices. Anything else in the
  // file was not put there by this program, and is refused rather than guessed at.
  throw new DomainValidationError(`Stored evidence of kind '${kind}' is not something this terminal wrote.`);
}

function readInterpretation(value: unknown): DerivedInterpretation {
  const source = object(value, "Stored interpretation");
  return derivedInterpretation({
    id: text(source.id, "Stored interpretation identifier"),
    kind: text(source.kind, "Stored interpretation kind") as Parameters<typeof derivedInterpretation>[0]["kind"],
    learnerId: text(source.learnerId, "Stored interpretation learner"),
    conceptId: text(source.conceptId, "Stored interpretation concept"),
    summary: text(source.summary, "Stored interpretation summary"),
    evidenceIds: texts(source.evidenceIds, "Stored interpretation evidence"),
    provenance: readProvenance(source.provenance, "Stored interpretation provenance"),
  });
}

function readEvent(value: unknown): HistoricalEvent {
  const source = object(value, "Stored event");
  const optional = {
    interactionCommandId: optionalText(source.interactionCommandId, "Stored event command"),
    learningDecisionId: optionalText(source.learningDecisionId, "Stored event decision"),
    provenanceId: optionalText(source.provenanceId, "Stored event provenance"),
    contextVersion: optionalText(source.contextVersion, "Stored event context version"),
    conceptId: optionalText(source.conceptId, "Stored event concept"),
    evidenceId: optionalText(source.evidenceId, "Stored event evidence"),
    stateCommitmentId: optionalText(source.stateCommitmentId, "Stored event commitment"),
  };
  return historicalEvent({
    id: text(source.id, "Stored event identifier"),
    kind: text(source.kind, "Stored event kind") as HistoricalEvent["kind"],
    learnerId: text(source.learnerId, "Stored event learner"),
    occurredAt: isoTimestamp(text(source.occurredAt, "Stored event timestamp")),
    ...Object.fromEntries(Object.entries(optional).filter(([, item]) => item !== undefined)),
  });
}

type DeltaInput = Parameters<typeof learnerStateDelta>[0];

function readDelta(delta: Record<string, unknown>): ReturnType<typeof learnerStateDelta> {
  const focus = delta.engagementFocus as DeltaInput["engagementFocus"];
  const concept = delta.activeConcept as DeltaInput["activeConcept"];
  const layer = delta.activePedagogicalLayer as DeltaInput["activePedagogicalLayer"];
  return learnerStateDelta({
    ...(focus === undefined ? {} : { engagementFocus: focus }),
    ...(concept === undefined ? {} : { activeConcept: concept }),
    ...(layer === undefined ? {} : { activePedagogicalLayer: layer }),
    evidenceIdsToAdd: texts(delta.evidenceIdsToAdd ?? [], "Stored commitment evidence additions"),
    interpretationIdsToAdd: texts(
      delta.interpretationIdsToAdd ?? [],
      "Stored commitment interpretation additions",
    ),
  });
}

function readCommitment(value: unknown): StateCommitment {
  const source = object(value, "Stored commitment");
  const authorization = object(source.authorization, "Stored commitment authorization");
  const delta = object(source.stateDelta, "Stored commitment delta");
  return stateCommitment({
    id: text(source.id, "Stored commitment identifier"),
    learnerId: text(source.learnerId, "Stored commitment learner"),
    authorization: authorization as unknown as Parameters<typeof stateCommitment>[0]["authorization"],
    learningDecisionId: text(source.learningDecisionId, "Stored commitment decision"),
    contextVersion: text(source.contextVersion, "Stored commitment context version"),
    changedDimensions: texts(source.changedDimensions, "Stored commitment dimensions"),
    stateDelta: readDelta(delta),
    committedAt: isoTimestamp(text(source.committedAt, "Stored commitment timestamp")),
    provenance: readProvenance(source.provenance, "Stored commitment provenance"),
  });
}

// --------------------------------------------------------------------------

/** Writes the record. The learner's state is not stored; it is derived on load. */
export function saveRecord(record: LearnerRecord, path: string = DEFAULT_RECORD_PATH): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(
    path,
    `${JSON.stringify(
      {
        format: FORMAT,
        learnerId: record.learnerId,
        evidence: record.evidence,
        interpretations: record.interpretations,
        events: record.events,
        commitments: record.commitments,
      },
      undefined,
      2,
    )}\n`,
    "utf8",
  );
}

/**
 * Reads the record and rebuilds the learner's state from its own history.
 *
 * The stored state is not read back, because a stored state can disagree with
 * the events that produced it. Replaying is what makes the file checkable
 * rather than merely loadable.
 */
export function loadRecord(path: string = DEFAULT_RECORD_PATH): LoadResult {
  if (!existsSync(path)) return { kind: "none" };

  let parsed: unknown;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    return { kind: "unreadable", reason: `the file is not readable JSON (${describe(error)})` };
  }

  try {
    const source = object(parsed, "Stored record");
    const format = text(source.format, "Stored record format");
    if (format !== FORMAT) {
      return { kind: "unreadable", reason: `it is in format '${format}', which this version does not read` };
    }

    const learnerId = text(source.learnerId, "Stored record learner");
    const evidence = array(source.evidence, "Stored evidence").map(readEvidence);
    const interpretations = array(source.interpretations, "Stored interpretations").map(readInterpretation);
    const events = array(source.events, "Stored events").map(readEvent);
    const commitments = array(source.commitments, "Stored commitments").map(readCommitment);

    const replay = replayLearnerHistory({
      initialState: currentLearnerState({ learnerId, engagementFocus: "unobserved" }),
      events,
      commitments,
    });

    return {
      kind: "loaded",
      record: learnerRecord({
        learnerId: replay.reconstructedState.learnerId,
        evidence,
        events,
        interpretations,
        state: replay.reconstructedState,
        commitments,
      }),
    };
  } catch (error) {
    return { kind: "unreadable", reason: describe(error) };
  }
}

/** Deletes the record. This is what "delete my data" means here: the file goes. */
export function forgetRecord(path: string = DEFAULT_RECORD_PATH): boolean {
  if (!existsSync(path)) return false;
  rmSync(path);
  return true;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
