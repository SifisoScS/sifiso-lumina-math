import {
  LearningOffer,
  deliveryCapabilityProfile,
  exploreConceptCommand,
  opportunityAcceptanceEffect,
  submitConfidenceReportCommand,
  submitLearnerChoiceCommand,
  submitReflectionCommand,
  trustedActorContext,
} from "../src/contracts/core-contracts.js";
import {
  EngineExecutionResult,
  executeDeterministicLearningInteraction,
} from "../src/decisioning/engine.js";
import { evolveLearnerRecord } from "../src/decisioning/learner-record-evolution.js";
import {
  CurrentLearnerState,
  LearnerChoiceKind,
  LearnerRecord,
  activePedagogicalLayer,
  currentLearnerState,
  confidenceReport,
  learnerChoice,
  learnerRecord,
  learnerReflection,
} from "../src/domain/learner-record.js";
import { PedagogicalLayer } from "../src/domain/mathematical-knowledge.js";
import { canonicalPedagogicalGuidance } from "../src/domain/pedagogical-model.js";
import { isoTimestamp } from "../src/domain/primitives.js";
import { functionsSeedKnowledge } from "../src/seed/functions-seed.js";

/**
 * The session, with no terminal in it.
 *
 * Separated from `learn.ts` so that what happens when a learner chooses,
 * declines, or writes something down can be tested without a keyboard. The
 * first attempt kept this inside the readline loop, where nothing could reach
 * it — which is the same mistake as prose nothing checks, one layer up.
 *
 * No file is written and no network call is made. The record lives here, in
 * memory, for as long as the session does.
 */

export const LEARNER_ID = "learner.local";

const actor = trustedActorContext({
  actorId: "actor.local",
  learnerScope: [LEARNER_ID],
  permissions: ["request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
  consentReferences: ["consent.local.session"],
});

const capabilities = deliveryCapabilityProfile([
  "displayed-text",
  "displayed-notation",
  "typed-input",
]);

export interface Session {
  readonly record: LearnerRecord;
  readonly offers: readonly LearningOffer[];
  readonly step: number;
  /**
   * Distinguishes this session's command identifiers from every earlier one.
   *
   * A returning learner carries a record that already contains
   * `command.cli.open.001`. Numbering from one again would mint identifiers
   * that collide with their own history, and the record would silently absorb
   * the new work as a duplicate of the old.
   */
  readonly token: string;
}

/** What the caller needs to say back to the learner, decided without any I/O. */
export type Outcome =
  | { readonly kind: "moved"; readonly conceptId: string | undefined }
  | { readonly kind: "already-there" }
  | { readonly kind: "held"; readonly choice: LearnerChoiceKind; readonly stateUnchanged: boolean }
  | { readonly kind: "paused" }
  | { readonly kind: "left-to-you" }
  | { readonly kind: "written-down" }
  | { readonly kind: "confidence-recorded" }
  | { readonly kind: "no-such-offer" };

function now() {
  return isoTimestamp(new Date().toISOString());
}

function ids(session: Session, prefix: string) {
  const suffix = `${session.token}.${String(session.step + 1).padStart(3, "0")}`;
  return {
    id: `command.cli.${prefix}.${suffix}`,
    commandReference: `occurrence.cli.${prefix}.${suffix}`,
  };
}

/**
 * Re-asks the engine what is on offer, now that the learner has moved.
 *
 * Offers belong to a decision, and a decision is computed before the state
 * change it causes -- so the list shown after a choice described where the
 * learner had been, not where they now were. A learner who followed a bridge to
 * another concept was still offered the one they had left, and picking it would
 * have been refused as no longer compatible and reported as "put off for now",
 * for something they had actively chosen.
 *
 * Only done when the learner has actually moved, because that is the only time
 * the list can be wrong -- if nothing changed, the offers still describe where
 * they are. A guidance request looked like the instrument for this, but
 * guidance deliberately withholds an alternative representation until the
 * learner's own reflection supports offering one, so refreshing that way would
 * quietly remove an option they could see a moment earlier.
 */
function refreshed(session: Session, before: CurrentLearnerState): Session {
  const after = session.record.state;
  const conceptId = after.activeConceptId;
  if (conceptId === undefined) return session;
  const layer = activePedagogicalLayer(after);
  if (after.activeConceptId === before.activeConceptId &&
      layer === activePedagogicalLayer(before)) {
    return session;
  }

  const execution = executeDeterministicLearningInteraction({
    command: exploreConceptCommand({
      ...ids(session, "arrived"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      conceptId,
      ...(layer === undefined ? {} : { pedagogicalLayer: layer }),
    }),
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: session.record,
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    activeOffers: session.offers,
    evaluatedAt: now(),
  });

  return { ...session, offers: execution.decision.offers, step: session.step + 1 };
}

function advance(
  session: Session,
  command: Parameters<typeof executeDeterministicLearningInteraction>[0]["command"],
): { readonly session: Session; readonly execution: EngineExecutionResult } {
  const execution = executeDeterministicLearningInteraction({
    command,
    actor,
    deliveryCapabilities: capabilities,
    learnerRecord: session.record,
    knowledgeCatalog: functionsSeedKnowledge,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    activeOffers: session.offers,
    evaluatedAt: now(),
  });
  const moved: Session = {
    record: evolveLearnerRecord(session.record, command, execution).learnerRecord,
    offers: execution.decision.offers,
    step: session.step + 1,
    token: session.token,
  };
  return { session: refreshed(moved, session.record.state), execution };
}

/**
 * Opens a session on a concept, continuing an existing record when there is one.
 *
 * No pedagogical layer is pinned. An earlier version opened every session at
 * `intuition`, which the learner had never asked for; for a concept whose only
 * experience sits at another layer that filtered everything away and the
 * learner was shown "nothing on offer" on the first screen. Choosing a depth on
 * someone's behalf and then hiding what it excluded is not a small thing.
 */
export function startSession(conceptId: string, prior?: LearnerRecord): Session {
  const openingState = currentLearnerState({
    learnerId: LEARNER_ID,
    engagementFocus: "unobserved",
  });
  const opening: Session = {
    record: prior ?? learnerRecord({
      learnerId: openingState.learnerId,
      evidence: [],
      events: [],
      interpretations: [],
      state: openingState,
      commitments: [],
    }),
    offers: [],
    step: 0,
    token: Date.now().toString(36),
  };

  return advance(
    opening,
    exploreConceptCommand({
      ...ids(opening, "open"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      conceptId,
    }),
  ).session;
}

/**
 * What the learner has written, as distinct from what they have chosen.
 *
 * A learner choice is evidence and is stored alongside reflections, so counting
 * the record wholesale reported "Written down: 1" to someone who had written
 * nothing and had only picked an option from a menu. Telling a person something
 * untrue about their own record is not a rounding error.
 */
export function reflectionsWritten(session: Session): number {
  return session.record.evidence.filter((item) => item.kind === "reflection").length;
}

/** Choices the learner has made. Recorded as evidence, but not as their words. */
export function choicesMade(session: Session): number {
  return session.record.evidence.filter((item) => item.kind === "learner-choice").length;
}

/**
 * Applies a learner's choice about an offer.
 *
 * `offerIndex` is zero-based and ignored for `pause`, which is not about an
 * offer. An index with no offer behind it is reported rather than guessed at.
 */
export function applyChoice(
  session: Session,
  choiceKind: LearnerChoiceKind,
  offerIndex: number,
): { readonly session: Session; readonly outcome: Outcome } {
  const offer = choiceKind === "pause" ? undefined : session.offers[offerIndex];
  if (choiceKind !== "pause" && offer === undefined) {
    return { session, outcome: { kind: "no-such-offer" } };
  }

  const before = session.record.state;
  const next = advance(
    session,
    submitLearnerChoiceCommand({
      ...ids(session, "choice"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      learnerChoice: learnerChoice({
        id: `choice.cli.${session.token}.${session.step + 1}`,
        learnerId: LEARNER_ID,
        choiceKind,
        ...(offer === undefined ? {} : { offerId: offer.id }),
        chosenAt: now(),
      }),
    }),
  );

  const after = next.session.record.state;
  const unchanged =
    after.activeConceptId === before.activeConceptId &&
    after.engagementFocus === before.engagementFocus &&
    activePedagogicalLayer(after) === activePedagogicalLayer(before);

  if (choiceKind === "pause" || after.engagementFocus === "paused") {
    return { session: next.session, outcome: { kind: "paused" } };
  }

  // Accepting "decide for yourself" is a real choice and is recorded as one,
  // but it is not a destination and moves nobody. The engine's own classifier
  // decides that, so this surface cannot drift from the rule the engine applies.
  if (offer !== undefined && opportunityAcceptanceEffect(offer.opportunity.kind) === "no-state-effect") {
    return { session: next.session, outcome: { kind: "left-to-you" } };
  }

  if (next.execution.transition.kind === "not-committed") {
    // O8. Taking up an offer for where you already are is not a decline, and
    // must not be reported as one. The engine says which it was; this reads it
    // rather than guessing from whether the state looks different.
    if (choiceKind === "select-offer" &&
        next.execution.transition.learnerAction === "learner-action-stands") {
      return { session: next.session, outcome: { kind: "already-there" } };
    }
    return {
      session: next.session,
      outcome: { kind: "held", choice: choiceKind, stateUnchanged: unchanged },
    };
  }

  return {
    session: next.session,
    outcome: { kind: "moved", conceptId: after.activeConceptId },
  };
}

/**
 * Opens a concept at a depth the learner picked.
 *
 * Depth is already learner state and `move-toward-layer` is already an
 * opportunity kind, but nothing let a learner simply say how they wanted to
 * approach an idea -- depth was only ever a side effect of which offer they
 * happened to take. The choice is recorded against this concept, and applies to
 * no other.
 */
export function chooseDepth(
  session: Session,
  conceptId: string,
  layer: PedagogicalLayer,
): Session {
  return advance(
    session,
    exploreConceptCommand({
      ...ids(session, "depth"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      conceptId,
      pedagogicalLayer: layer,
    }),
  ).session;
}

/**
 * Records how sure the learner says they are.
 *
 * `confidence-report` has been a `LearnerEvidenceKind` all along -- modelled,
 * validated and replayable -- and no surface collected one. It is the learner's
 * own account of themselves, not an assessment of them: A4 and O4 both stand,
 * and nothing reads this to conclude anything about what they understand.
 */
export function applyConfidence(
  session: Session,
  reportedValue: string,
  conceptId: string,
): { readonly session: Session; readonly outcome: Outcome } {
  const next = advance(
    session,
    submitConfidenceReportCommand({
      ...ids(session, "confidence"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      confidenceReport: confidenceReport({
        id: `evidence.confidence.${session.token}.${session.step + 1}`,
        learnerId: LEARNER_ID,
        conceptId: session.record.state.activeConceptId ?? conceptId,
        reportedValue,
        scaleLabel: "learner-stated confidence",
        reportedAt: now(),
      }),
    }),
  );
  return { session: next.session, outcome: { kind: "confidence-recorded" } };
}

/** Records something the learner wrote. It is theirs; nothing is inferred from it. */
export function applyReflection(
  session: Session,
  text: string,
  conceptId: string,
): { readonly session: Session; readonly outcome: Outcome } {
  const next = advance(
    session,
    submitReflectionCommand({
      ...ids(session, "reflect"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      reflection: learnerReflection({
        id: `evidence.reflection.${session.token}.${session.step + 1}`,
        learnerId: LEARNER_ID,
        conceptId: session.record.state.activeConceptId ?? conceptId,
        originalText: text,
        submittedAt: now(),
      }),
    }),
  );
  return { session: next.session, outcome: { kind: "written-down" } };
}
