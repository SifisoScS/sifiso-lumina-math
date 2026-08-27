import {
  CandidateLearningOpportunity,
  InteractionCommand,
  LearningDecision,
  LearningOffer,
} from "../contracts/core-contracts.js";
import {
  CurrentLearnerState,
  HistoricalEvent,
  historicalEvent,
  StateCommitment,
  stateCommitment,
} from "../domain/learner-record.js";
import { IsoTimestamp, readonlyList } from "../domain/primitives.js";

export type StateTransitionResult =
  | {
      readonly kind: "committed";
      readonly commitment: StateCommitment;
      readonly events: readonly HistoricalEvent[];
      readonly nextState: CurrentLearnerState;
    }
  | { readonly kind: "not-committed"; readonly reason: string; readonly nextState: CurrentLearnerState };

export interface StateTransitionInput {
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  readonly currentState: CurrentLearnerState;
  readonly activeOffers: readonly LearningOffer[];
  readonly committedAt: IsoTimestamp;
}

function appendUnique<T>(items: readonly T[], item: T): readonly T[] {
  return items.includes(item) ? readonlyList(items) : readonlyList([...items, item]);
}

function equivalentOpportunity(
  left: CandidateLearningOpportunity,
  right: CandidateLearningOpportunity,
): boolean {
  return left.kind === right.kind &&
    left.conceptId === right.conceptId &&
    left.relatedConceptId === right.relatedConceptId &&
    left.learningExperienceId === right.learningExperienceId &&
    left.pedagogicalLayer === right.pedagogicalLayer;
}

function evidenceSubmission(command: InteractionCommand) {
  switch (command.kind) {
    case "submit-reflection":
      return { evidence: command.reflection, eventKind: "reflection-submitted" as const };
    case "submit-practice-attempt":
      return { evidence: command.practiceAttempt, eventKind: "practice-attempted" as const };
    case "submit-confidence-report":
      return { evidence: command.confidenceReport, eventKind: "confidence-reported" as const };
    case "submit-learning-context":
      return { evidence: command.learningContextReport, eventKind: undefined };
    default:
      return undefined;
  }
}

function nextStateAfterEvidence(
  current: CurrentLearnerState,
  evidenceId: string,
): CurrentLearnerState {
  return Object.freeze({
    ...current,
    engagementFocus: current.engagementFocus === "unobserved" ? "encountered" : current.engagementFocus,
    evidenceIds: appendUnique(current.evidenceIds, evidenceId as never),
  });
}

function selectedOffer(command: InteractionCommand, activeOffers: readonly LearningOffer[]): LearningOffer | undefined {
  if (command.kind !== "submit-learner-choice" || command.learnerChoice.offerId === undefined) {
    return undefined;
  }
  return activeOffers.find((offer) => offer.id === command.learnerChoice.offerId);
}

function selectedOpportunityStillAllowed(
  selected: LearningOffer,
  decision: LearningDecision,
): boolean {
  return decision.opportunities.some((candidate) => equivalentOpportunity(candidate, selected.opportunity));
}

function nextStateAfterSelectedOffer(
  current: CurrentLearnerState,
  offer: LearningOffer,
): CurrentLearnerState {
  const opportunity = offer.opportunity;
  const activeConceptId = opportunity.relatedConceptId ?? opportunity.conceptId;
  return Object.freeze({
    ...current,
    engagementFocus: "active-focus" as const,
    activeConceptId,
    ...(opportunity.pedagogicalLayer === undefined
      ? {}
      : { activePedagogicalLayer: opportunity.pedagogicalLayer }),
  });
}

function stateCommittedEvent(input: {
  readonly command: InteractionCommand;
  readonly commitment: StateCommitment;
  readonly occurredAt: IsoTimestamp;
  readonly conceptId?: string;
}): HistoricalEvent {
  return historicalEvent({
    id: `event.${input.command.id}.state-committed`,
    kind: "state-committed",
    learnerId: input.command.learnerId,
    occurredAt: input.occurredAt,
    ...(input.conceptId === undefined ? {} : { conceptId: input.conceptId }),
    stateCommitmentId: input.commitment.id,
  });
}

function commandFocusTransition(input: StateTransitionInput): StateTransitionResult | undefined {
  if (input.command.kind !== "explore-concept") {
    return undefined;
  }
  const nextState = Object.freeze({
    ...input.currentState,
    engagementFocus: "active-focus" as const,
    activeConceptId: input.command.conceptId,
    ...(input.command.pedagogicalLayer === undefined
      ? {}
      : { activePedagogicalLayer: input.command.pedagogicalLayer }),
  });
  const changedDimensions = ["engagement-focus", "active-concept"];
  if (input.command.pedagogicalLayer !== undefined) {
    changedDimensions.push("active-pedagogical-layer");
  }
  const commitment = stateCommitment({
    id: `commitment.${input.command.id}`,
    learnerId: input.command.learnerId,
    authorization: { kind: "accepted-interaction-command", commandId: input.command.id },
    learningDecisionId: input.decision.id,
    changedDimensions,
    committedAt: input.committedAt,
    provenance: input.decision.provenance,
  });
  const events: HistoricalEvent[] = [
    historicalEvent({
      id: `event.${input.command.id}.concept-viewed`,
      kind: "concept-viewed",
      learnerId: input.command.learnerId,
      occurredAt: input.committedAt,
      conceptId: input.command.conceptId,
      stateCommitmentId: commitment.id,
    }),
  ];
  if (input.command.pedagogicalLayer !== undefined) {
    events.push(historicalEvent({
      id: `event.${input.command.id}.layer-entered`,
      kind: "layer-entered",
      learnerId: input.command.learnerId,
      occurredAt: input.committedAt,
      conceptId: input.command.conceptId,
      stateCommitmentId: commitment.id,
    }));
  }
  events.push(stateCommittedEvent({
    command: input.command,
    commitment,
    occurredAt: input.committedAt,
    conceptId: input.command.conceptId,
  }));
  return Object.freeze({ kind: "committed", commitment, events: readonlyList(events), nextState });
}

/**
 * Plans the only Slice 2 state effects. It is intentionally separate from
 * context assembly, candidate generation, policy evaluation, and decision
 * construction. A material decision does not itself alter learner state, and
 * a safe non-material outcome never produces a commitment.
 */
export function validateAndPlanStateTransition(input: StateTransitionInput): StateTransitionResult {
  if (input.decision.type === "safe-non-material") {
    return Object.freeze({
      kind: "not-committed",
      reason: "Safe non-material outcomes cannot create learner-state commitments.",
      nextState: input.currentState,
    });
  }
  if (input.decision.status !== "offer-available") {
    return Object.freeze({
      kind: "not-committed",
      reason: "Only a policy-permitted material decision with available offers can support a transition.",
      nextState: input.currentState,
    });
  }

  const directFocusResult = commandFocusTransition(input);
  if (directFocusResult !== undefined) {
    return directFocusResult;
  }

  const evidence = evidenceSubmission(input.command);
  if (evidence !== undefined) {
    const commitment = stateCommitment({
      id: `commitment.${input.command.id}`,
      learnerId: input.command.learnerId,
      authorization: { kind: "accepted-evidence", evidenceId: evidence.evidence.id },
      learningDecisionId: input.decision.id,
      changedDimensions: ["evidence"],
      committedAt: input.committedAt,
      provenance: input.decision.provenance,
    });
    const nextState = nextStateAfterEvidence(input.currentState, evidence.evidence.id);
    const events: HistoricalEvent[] = [];
    if (evidence.eventKind !== undefined) {
      events.push(historicalEvent({
        id: `event.${input.command.id}.${evidence.eventKind}`,
        kind: evidence.eventKind,
        learnerId: input.command.learnerId,
        occurredAt: input.committedAt,
        ...("conceptId" in evidence.evidence ? { conceptId: evidence.evidence.conceptId } : {}),
        evidenceId: evidence.evidence.id,
        stateCommitmentId: commitment.id,
      }));
    }
    events.push(stateCommittedEvent({
      command: input.command,
      commitment,
      occurredAt: input.committedAt,
      ...("conceptId" in evidence.evidence ? { conceptId: evidence.evidence.conceptId } : {}),
    }));
    return Object.freeze({ kind: "committed", commitment, events: readonlyList(events), nextState });
  }

  if (input.command.kind !== "submit-learner-choice") {
    return Object.freeze({
      kind: "not-committed",
      reason: "A recommendation, offer, or guidance request is not a learner path commitment.",
      nextState: input.currentState,
    });
  }

  const choice = input.command.learnerChoice;
  if (choice.choiceKind === "pause") {
    const commitment = stateCommitment({
      id: `commitment.${input.command.id}`,
      learnerId: input.command.learnerId,
      authorization: { kind: "learner-choice", learnerChoiceId: choice.id },
      learningDecisionId: input.decision.id,
      changedDimensions: ["engagement-focus"],
      committedAt: input.committedAt,
      provenance: input.decision.provenance,
    });
    const nextState = Object.freeze({ ...input.currentState, engagementFocus: "paused" as const });
    return Object.freeze({
      kind: "committed",
      commitment,
      events: readonlyList([stateCommittedEvent({
        command: input.command,
        commitment,
        occurredAt: input.committedAt,
        ...(input.currentState.activeConceptId === undefined ? {} : { conceptId: input.currentState.activeConceptId }),
      })]),
      nextState,
    });
  }

  const offer = selectedOffer(input.command, input.activeOffers);
  if (offer === undefined) {
    return Object.freeze({
      kind: "not-committed",
      reason: "A learner choice that targets an offer requires a currently active offer.",
      nextState: input.currentState,
    });
  }
  if (!selectedOpportunityStillAllowed(offer, input.decision)) {
    return Object.freeze({
      kind: "not-committed",
      reason: "The selected offer is no longer compatible with the current material decision.",
      nextState: input.currentState,
    });
  }

  const commitment = stateCommitment({
    id: `commitment.${input.command.id}`,
    learnerId: input.command.learnerId,
    authorization: { kind: "learner-choice", learnerChoiceId: choice.id },
    learningDecisionId: input.decision.id,
    changedDimensions: ["engagement-focus"],
    committedAt: input.committedAt,
    provenance: input.decision.provenance,
  });
  const accepted = choice.choiceKind === "select-offer" || choice.choiceKind === "request-alternative";
  const conceptId = offer.opportunity.relatedConceptId ?? offer.opportunity.conceptId;
  const pathEvent = historicalEvent({
    id: `event.${input.command.id}.${accepted ? "learning-path-accepted" : "learning-path-declined"}`,
    kind: accepted ? "learning-path-accepted" : "learning-path-declined",
    learnerId: input.command.learnerId,
    occurredAt: input.committedAt,
    conceptId,
    evidenceId: choice.id,
    stateCommitmentId: commitment.id,
  });

  return Object.freeze({
    kind: "committed",
    commitment,
    events: readonlyList([
      pathEvent,
      stateCommittedEvent({ command: input.command, commitment, occurredAt: input.committedAt, conceptId }),
    ]),
    nextState: nextStateAfterSelectedOffer(input.currentState, offer),
  });
}
