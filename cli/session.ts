import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  deliveryCapabilityProfile,
  EngineExecutionResult,
  evolveLearnerRecord,
  executeDeterministicLearningInteraction,
  exploreConceptCommand,
  functionsSeedKnowledge,
  isoTimestamp,
  LearnerChoiceKind,
  LearnerRecord,
  learnerChoice,
  learnerRecord,
  learnerReflection,
  LearningOffer,
  submitLearnerChoiceCommand,
  submitReflectionCommand,
  trustedActorContext,
} from "../src/index.js";

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
}

/** What the caller needs to say back to the learner, decided without any I/O. */
export type Outcome =
  | { readonly kind: "moved"; readonly conceptId: string | undefined }
  | { readonly kind: "held"; readonly choice: LearnerChoiceKind; readonly stateUnchanged: boolean }
  | { readonly kind: "paused" }
  | { readonly kind: "written-down" }
  | { readonly kind: "no-such-offer" };

function now() {
  return isoTimestamp(new Date().toISOString());
}

function ids(session: Session, prefix: string) {
  const suffix = String(session.step + 1).padStart(3, "0");
  return {
    id: `command.cli.${prefix}.${suffix}`,
    commandReference: `occurrence.cli.${prefix}.${suffix}`,
  };
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
  return {
    session: {
      record: evolveLearnerRecord(session.record, command, execution).learnerRecord,
      offers: execution.decision.offers,
      step: session.step + 1,
    },
    execution,
  };
}

/** Opens a session on a concept. Nothing exists before this. */
export function startSession(conceptId: string): Session {
  const openingState = currentLearnerState({
    learnerId: LEARNER_ID,
    engagementFocus: "unobserved",
  });
  const empty: Session = {
    record: learnerRecord({
      learnerId: openingState.learnerId,
      evidence: [],
      events: [],
      interpretations: [],
      state: openingState,
      commitments: [],
    }),
    offers: [],
    step: 0,
  };

  return advance(
    empty,
    exploreConceptCommand({
      ...ids(empty, "open"),
      learnerId: LEARNER_ID,
      issuedAt: now(),
      conceptId,
      pedagogicalLayer: "intuition",
    }),
  ).session;
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
        id: `choice.cli.${session.step + 1}`,
        learnerId: LEARNER_ID,
        choiceKind,
        ...(offer === undefined ? {} : { offerId: offer.id }),
        chosenAt: now(),
      }),
    }),
  );

  if (choiceKind === "pause") {
    return { session: next.session, outcome: { kind: "paused" } };
  }

  if (next.execution.transition.kind === "not-committed") {
    return {
      session: next.session,
      outcome: {
        kind: "held",
        choice: choiceKind,
        stateUnchanged:
          next.session.record.state.activeConceptId === before.activeConceptId &&
          next.session.record.state.engagementFocus === before.engagementFocus,
      },
    };
  }

  return {
    session: next.session,
    outcome: { kind: "moved", conceptId: next.session.record.state.activeConceptId },
  };
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
        id: `evidence.reflection.${session.step + 1}`,
        learnerId: LEARNER_ID,
        conceptId: session.record.state.activeConceptId ?? conceptId,
        originalText: text,
        submittedAt: now(),
      }),
    }),
  );
  return { session: next.session, outcome: { kind: "written-down" } };
}
