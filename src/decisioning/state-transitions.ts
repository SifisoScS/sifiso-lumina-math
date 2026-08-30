import {
  CandidateLearningOpportunity,
  InteractionCommand,
  LearningDecision,
  LearningOffer,
  opportunityAcceptanceEffect,
} from "../contracts/core-contracts.js";
import {
  applyLearnerStateDelta,
  CurrentLearnerState,
  HistoricalEvent,
  historicalEvent,
  LearnerStateDelta,
  LearnerStateDeltaInput,
  effectiveStateDelta,
  learnerStateDelta,
  offerAdvancement,
  StateCommitment,
  stateCommitment,
  stateDeltaDimensions,
} from "../domain/learner-record.js";
import { DomainValidationError, IsoTimestamp, readonlyList, StableId } from "../domain/primitives.js";

export const DETERMINISTIC_CONTEXT_VERSION = "engine.behaviour.v1";

export type StateTransitionResult =
  | {
      readonly kind: "committed";
      readonly commitment: StateCommitment;
      readonly events: readonly HistoricalEvent[];
      readonly nextState: CurrentLearnerState;
    }
  | {
      readonly kind: "not-committed";
      readonly reason: string;
      readonly nextState: CurrentLearnerState;
      /**
       * Whether the learner did something here. A decline is a learner action
       * that changes no state; a prohibited context is not a learner action at
       * all, and nothing of it may be written into a learner's record.
       */
      readonly learnerAction: LearnerActionDisposition;
      readonly events: readonly HistoricalEvent[];
    };

/**
 * O9. Accepting an offer recorded evidence, two events and a commitment, while
 * declining the same offer recorded nothing at all -- so a decline could not be
 * shown afterwards to have been honoured. Whether a learner's action was kept
 * depended on whether the system agreed to move, which inverts who the evidence
 * belongs to: the evidence is the learner's, the commitment is the system's.
 *
 * Stated on every non-commitment rather than inferred, because the same
 * `not-committed` result is also returned for an incomplete or prohibited
 * context -- where an actor outside the learner's scope must write nothing.
 */
export type LearnerActionDisposition = "learner-action-stands" | "no-learner-action";

export interface StateTransitionInput {
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  readonly currentState: CurrentLearnerState;
  readonly activeOffers: readonly LearningOffer[];
  readonly committedAt: IsoTimestamp;
  /** Kept explicit to make rule/context versioning auditable and replay-safe. */
  readonly contextVersion?: string;
  /** Qualified derived interpretations formed from the current observed evidence. */
  readonly derivedInterpretationIds?: readonly StableId[];
}

function equivalentOpportunity(
  left: CandidateLearningOpportunity,
  right: CandidateLearningOpportunity,
): boolean {
  return left.kind === right.kind &&
    left.conceptId === right.conceptId &&
    left.relatedConceptId === right.relatedConceptId &&
    left.knowledgeAssetId === right.knowledgeAssetId &&
    left.knowledgeRelationshipId === right.knowledgeRelationshipId &&
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
    // A learner choice is evidence, but it is committed by the choice branch
    // below rather than here, so it is excluded deliberately and not by
    // omission. The remaining kinds carry no evidence at all.
    case "submit-learner-choice":
    case "explore-concept":
    case "request-alternative-representation":
    case "request-learning-guidance":
      return undefined;
    default: {
      const unhandled: never = command;
      throw new DomainValidationError(
        `Interaction command kind is not classified for evidence: ${JSON.stringify(unhandled)}`,
      );
    }
  }
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

function commitmentFor(input: {
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  readonly authorization: StateCommitment["authorization"];
  readonly delta: LearnerStateDelta;
  readonly committedAt: IsoTimestamp;
  readonly contextVersion: string;
}): StateCommitment {
  return stateCommitment({
    id: `commitment.${input.command.id}`,
    learnerId: input.command.learnerId,
    authorization: input.authorization,
    learningDecisionId: input.decision.id,
    contextVersion: input.contextVersion,
    changedDimensions: stateDeltaDimensions(input.delta),
    stateDelta: input.delta,
    committedAt: input.committedAt,
    provenance: input.decision.provenance,
  });
}

function causalEvent(input: {
  readonly idSuffix: string;
  readonly kind: HistoricalEvent["kind"];
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  /**
   * Absent when the action changed no state. The event still records that the
   * learner acted; the missing commitment records that nothing moved.
   */
  readonly commitment?: StateCommitment;
  readonly occurredAt: IsoTimestamp;
  readonly contextVersion: string;
  readonly conceptId?: string;
  readonly evidenceId?: string;
}): HistoricalEvent {
  return historicalEvent({
    id: `event.${input.command.id}.${input.idSuffix}`,
    kind: input.kind,
    learnerId: input.command.learnerId,
    occurredAt: input.occurredAt,
    interactionCommandId: input.command.id,
    learningDecisionId: input.decision.id,
    contextVersion: input.contextVersion,
    ...(input.conceptId === undefined ? {} : { conceptId: input.conceptId }),
    ...(input.evidenceId === undefined ? {} : { evidenceId: input.evidenceId }),
    ...(input.commitment === undefined
      ? {}
      : { provenanceId: input.commitment.provenanceId, stateCommitmentId: input.commitment.id }),
  });
}

function commandFocusTransition(input: StateTransitionInput, contextVersion: string): StateTransitionResult | undefined {
  if (input.command.kind !== "explore-concept") {
    return undefined;
  }
  const delta = learnerStateDelta({
    engagementFocus: "active-focus",
    activeConcept: { kind: "set", value: input.command.conceptId },
    ...(input.command.pedagogicalLayer === undefined
      ? {}
      : {
          pedagogicalLayer: {
            kind: "set" as const,
            conceptId: input.command.conceptId,
            value: input.command.pedagogicalLayer,
          },
        } satisfies Pick<LearnerStateDeltaInput, "pedagogicalLayer">),
  });
  const effective = effectiveStateDelta(delta, input.currentState);
  if (stateDeltaDimensions(effective).length === 0) {
    // Looking again at the concept already open, at the layer already selected.
    // It happened, and it moved nothing.
    const seen: HistoricalEvent[] = [causalEvent({
      idSuffix: "concept-viewed",
      kind: "concept-viewed",
      command: input.command,
      decision: input.decision,
      occurredAt: input.committedAt,
      contextVersion,
      conceptId: input.command.conceptId,
    })];
    return Object.freeze({
      kind: "not-committed",
      reason: "The learner is already where this command would place them.",
      nextState: input.currentState,
      learnerAction: "learner-action-stands",
      events: readonlyList(seen),
    });
  }
  const commitment = commitmentFor({
    command: input.command,
    decision: input.decision,
    authorization: { kind: "accepted-interaction-command", commandId: input.command.id },
    delta: effective,
    committedAt: input.committedAt,
    contextVersion,
  });
  const events: HistoricalEvent[] = [
    causalEvent({
      idSuffix: "concept-viewed",
      kind: "concept-viewed",
      command: input.command,
      decision: input.decision,
      commitment,
      occurredAt: input.committedAt,
      contextVersion,
      conceptId: input.command.conceptId,
    }),
  ];
  if (input.command.pedagogicalLayer !== undefined) {
    events.push(causalEvent({
      idSuffix: "layer-entered",
      kind: "layer-entered",
      command: input.command,
      decision: input.decision,
      commitment,
      occurredAt: input.committedAt,
      contextVersion,
      conceptId: input.command.conceptId,
    }));
  }
  events.push(causalEvent({
    idSuffix: "state-committed",
    kind: "state-committed",
    command: input.command,
    decision: input.decision,
    commitment,
    occurredAt: input.committedAt,
    contextVersion,
    conceptId: input.command.conceptId,
  }));
  return Object.freeze({
    kind: "committed",
    commitment,
    events: readonlyList(events),
    nextState: applyLearnerStateDelta(input.currentState, effective),
  });
}

/**
 * Plans state effects without persistence. A StateCommitment carries the sole
 * authoritative delta for reconstruction; HistoricalEvents form the ordered,
 * causally linked audit trail. A LearningDecision alone has no state effect.
 */
export function validateAndPlanStateTransition(input: StateTransitionInput): StateTransitionResult {
  if (input.decision.type === "safe-non-material") {
    return Object.freeze({
      kind: "not-committed",
      reason: "Safe non-material outcomes cannot create learner-state commitments.",
      nextState: input.currentState,
      learnerAction: "no-learner-action",
      events: readonlyList([]),
    });
  }
  if (input.decision.status !== "offer-available") {
    return Object.freeze({
      kind: "not-committed",
      reason: "Only a policy-permitted material decision with available offers can support a transition.",
      nextState: input.currentState,
      learnerAction: "no-learner-action",
      events: readonlyList([]),
    });
  }

  const contextVersion = input.contextVersion ?? DETERMINISTIC_CONTEXT_VERSION;
  const directFocusResult = commandFocusTransition(input, contextVersion);
  if (directFocusResult !== undefined) {
    return directFocusResult;
  }

  const evidence = evidenceSubmission(input.command);
  if (evidence !== undefined) {
    const delta = learnerStateDelta({
      ...(input.currentState.engagementFocus === "unobserved" ? { engagementFocus: "encountered" } : {}),
      evidenceIdsToAdd: [evidence.evidence.id],
      interpretationIdsToAdd: input.derivedInterpretationIds ?? [],
    });
    const effective = effectiveStateDelta(delta, input.currentState);
    if (stateDeltaDimensions(effective).length === 0) {
      return Object.freeze({
        kind: "not-committed",
        reason: "This evidence is already part of the learner's state.",
        nextState: input.currentState,
        learnerAction: "learner-action-stands",
        events: readonlyList([]),
      });
    }
    const commitment = commitmentFor({
      command: input.command,
      decision: input.decision,
      authorization: { kind: "accepted-evidence", evidenceId: evidence.evidence.id },
      delta: effective,
      committedAt: input.committedAt,
      contextVersion,
    });
    const events: HistoricalEvent[] = [];
    if (evidence.eventKind !== undefined) {
      events.push(causalEvent({
        idSuffix: evidence.eventKind,
        kind: evidence.eventKind,
        command: input.command,
        decision: input.decision,
        commitment,
        occurredAt: input.committedAt,
        contextVersion,
        ...("conceptId" in evidence.evidence ? { conceptId: evidence.evidence.conceptId } : {}),
        evidenceId: evidence.evidence.id,
      }));
    }
    events.push(causalEvent({
      idSuffix: "state-committed",
      kind: "state-committed",
      command: input.command,
      decision: input.decision,
      commitment,
      occurredAt: input.committedAt,
      contextVersion,
      ...("conceptId" in evidence.evidence ? { conceptId: evidence.evidence.conceptId } : {}),
      evidenceId: evidence.evidence.id,
    }));
    return Object.freeze({
      kind: "committed",
      commitment,
      events: readonlyList(events),
      nextState: applyLearnerStateDelta(input.currentState, delta),
    });
  }

  if (input.command.kind !== "submit-learner-choice") {
    return Object.freeze({
      kind: "not-committed",
      reason: "A recommendation, offer, or guidance request is not a learner path commitment.",
      nextState: input.currentState,
      learnerAction: "no-learner-action",
      events: readonlyList([]),
    });
  }

  const choice = input.command.learnerChoice;
  if (choice.choiceKind === "pause") {
    const delta = effectiveStateDelta(
      learnerStateDelta({ engagementFocus: "paused" }),
      input.currentState,
    );
    if (stateDeltaDimensions(delta).length === 0) {
      return Object.freeze({
        kind: "not-committed",
        reason: "The learner is already paused.",
        nextState: input.currentState,
        learnerAction: "learner-action-stands",
        events: readonlyList([]),
      });
    }
    const commitment = commitmentFor({
      command: input.command,
      decision: input.decision,
      authorization: { kind: "learner-choice", learnerChoiceId: choice.id },
      delta,
      committedAt: input.committedAt,
      contextVersion,
    });
    return Object.freeze({
      kind: "committed",
      commitment,
      events: readonlyList([causalEvent({
        idSuffix: "state-committed",
        kind: "state-committed",
        command: input.command,
        decision: input.decision,
        commitment,
        occurredAt: input.committedAt,
        contextVersion,
        ...(input.currentState.activeConceptId === undefined ? {} : { conceptId: input.currentState.activeConceptId }),
        evidenceId: choice.id,
      })]),
      nextState: applyLearnerStateDelta(input.currentState, delta),
    });
  }

  // Foundation article A2: only acceptance may move the learner toward what was
  // offered. The classification lives in `offerAdvancement`, which is exhaustive
  // at compile time, so a new choice kind cannot reach here unclassified. A
  // commitment cannot express "no movement" — a state commitment must identify
  // at least one changed dimension — so a non-advancing choice plans no state
  // effect at all; the choice itself remains recorded as an InteractionCommand.
  // The guard precedes offer resolution so the invariant does not depend on
  // offer validity.
  if (offerAdvancement(choice.choiceKind) === "must-not-advance-toward-offer") {
    // O9. The learner's "no" is a fact and belongs in the record. It is written
    // as an event carrying no state commitment, because there is no state
    // commitment -- and that absence is exactly what shows the decline was
    // honoured. `HistoricalEvent.stateCommitmentId` is optional and replay
    // already skips events without one, so nothing had to be bent to say this.
    // Only an actual decline is written as a decline. Deferring and asking for
    // an alternative are not refusals, and the domain has no event kind for
    // them -- labelling them `learning-path-declined` would put a claim in the
    // history the learner never made. Their choice is still kept as evidence,
    // which carries the exact choiceKind.
    const declined = choice.choiceKind !== "decline-offer" ? undefined : causalEvent({
      idSuffix: "learning-path-declined",
      kind: "learning-path-declined",
      command: input.command,
      decision: input.decision,
      occurredAt: input.committedAt,
      contextVersion,
      ...(input.currentState.activeConceptId === undefined
        ? {}
        : { conceptId: input.currentState.activeConceptId }),
      evidenceId: choice.id,
    });
    return Object.freeze({
      kind: "not-committed",
      reason: "Only an explicit acceptance may authorize a commitment toward the offered opportunity.",
      nextState: input.currentState,
      learnerAction: "learner-action-stands",
      events: readonlyList(declined === undefined ? [] : [declined]),
    });
  }

  const offer = selectedOffer(input.command, input.activeOffers);
  if (offer === undefined) {
    return Object.freeze({
      kind: "not-committed",
      reason: "A learner choice that targets an offer requires a currently active offer.",
      nextState: input.currentState,
      learnerAction: "no-learner-action",
      events: readonlyList([]),
    });
  }
  if (!selectedOpportunityStillAllowed(offer, input.decision)) {
    return Object.freeze({
      kind: "not-committed",
      reason: "The selected offer is no longer compatible with the current material decision.",
      nextState: input.currentState,
      learnerAction: "learner-action-stands",
      events: readonlyList([]),
    });
  }

  const opportunity = offer.opportunity;
  const acceptanceEffect = opportunityAcceptanceEffect(opportunity.kind);

  // Foundation article A2. Accepting an offer moves the learner toward it only
  // when the offer names somewhere to go. "Decide for yourself what to do next"
  // names nothing, so accepting it changes no state -- as with the non-advancing
  // choice kinds above, the choice itself is still recorded as an
  // InteractionCommand. `opportunityAcceptanceEffect` is exhaustive at compile
  // time, so a new opportunity kind cannot reach here unclassified.
  if (acceptanceEffect === "no-state-effect") {
    return Object.freeze({
      kind: "not-committed",
      reason: "Choosing to decide for oneself does not move the learner toward anything.",
      nextState: input.currentState,
      learnerAction: "learner-action-stands",
      events: readonlyList([]),
    });
  }

  const conceptId = opportunity.relatedConceptId ?? opportunity.conceptId;
  // A learner who accepts a pause is asking to stop, and is stopped -- the same
  // state effect as the `pause` choice kind, reached by a different route.
  const delta = acceptanceEffect === "suspend-engagement"
    ? learnerStateDelta({ engagementFocus: "paused" })
    : learnerStateDelta({
        engagementFocus: "active-focus",
        activeConcept: { kind: "set", value: conceptId },
        ...(opportunity.pedagogicalLayer === undefined
          ? {}
          : {
              pedagogicalLayer: {
                kind: "set" as const,
                conceptId,
                value: opportunity.pedagogicalLayer,
              },
            } satisfies Pick<LearnerStateDeltaInput, "pedagogicalLayer">),
      });
  // O8. A commitment must not claim a change that was not made. Accepting an
  // offer for the concept and layer already open moves nothing, and most offers
  // are within the concept the learner is already on -- so this is the common
  // case, not an edge one. The acceptance is still recorded as an event; it
  // simply carries no commitment, which is what says nothing moved.
  const effective = effectiveStateDelta(delta, input.currentState);
  if (stateDeltaDimensions(effective).length === 0) {
    const acceptedEvents: HistoricalEvent[] = acceptanceEffect !== "advance-toward-opportunity"
      ? []
      : [causalEvent({
          idSuffix: "learning-path-accepted",
          kind: "learning-path-accepted",
          command: input.command,
          decision: input.decision,
          occurredAt: input.committedAt,
          contextVersion,
          conceptId,
          evidenceId: choice.id,
        })];
    return Object.freeze({
      kind: "not-committed",
      reason: "The learner took up an offer that changes nothing about where they are.",
      nextState: input.currentState,
      learnerAction: "learner-action-stands",
      events: readonlyList(acceptedEvents),
    });
  }
  const commitment = commitmentFor({
    command: input.command,
    decision: input.decision,
    authorization: { kind: "learner-choice", learnerChoiceId: choice.id },
    delta: effective,
    committedAt: input.committedAt,
    contextVersion,
  });
  const stateEvent = causalEvent({
    idSuffix: "state-committed",
    kind: "state-committed",
    command: input.command,
    decision: input.decision,
    commitment,
    occurredAt: input.committedAt,
    contextVersion,
    conceptId,
    evidenceId: choice.id,
  });

  // Accepting a pause is not accepting a learning path. Recording one would put
  // a claim in the causal history that the learner never made, which A6 exists
  // to prevent: history is what happened, not a tidier version of it.
  if (acceptanceEffect === "suspend-engagement") {
    return Object.freeze({
      kind: "committed",
      commitment,
      events: readonlyList([stateEvent]),
      nextState: applyLearnerStateDelta(input.currentState, effective),
    });
  }

  // Only `select-offer` reaches here: `pause` and the three non-advancing
  // choice kinds have already returned. The `learning-path-declined` event kind
  // is retained in the domain so previously recorded histories remain replayable.
  const pathEvent = causalEvent({
    idSuffix: "learning-path-accepted",
    kind: "learning-path-accepted",
    command: input.command,
    decision: input.decision,
    commitment,
    occurredAt: input.committedAt,
    contextVersion,
    conceptId,
    evidenceId: choice.id,
  });

  return Object.freeze({
    kind: "committed",
    commitment,
    events: readonlyList([pathEvent, stateEvent]),
    nextState: applyLearnerStateDelta(input.currentState, effective),
  });
}
