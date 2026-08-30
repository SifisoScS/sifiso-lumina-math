import { PedagogicalLayer } from "./mathematical-knowledge.js";
import { DecisionProvenance } from "./provenance.js";
import {
  DomainValidationError,
  IsoTimestamp,
  learnerReference,
  LearnerReference,
  readonlyList,
  requiredText,
  StableId,
  stableId,
  uniqueStableIds,
  VersionRef,
  versionRef,
} from "./primitives.js";

export type LearnerEvidenceKind =
  | "reflection"
  | "practice-attempt"
  | "confidence-report"
  | "learning-context-report"
  | "learner-choice";

export type HistoricalEventKind =
  | "concept-viewed"
  | "layer-entered"
  | "practice-attempted"
  | "reflection-submitted"
  | "confidence-reported"
  | "insight-generated"
  | "learning-path-suggested"
  | "learning-path-accepted"
  | "learning-path-declined"
  | "concept-revisited"
  | "state-committed";

export type InterpretationKind =
  | "understanding-signal"
  | "curiosity-thread"
  | "tone-observation"
  | "misconception-hypothesis";

export type EngagementFocus = "unobserved" | "encountered" | "active-focus" | "paused";

export interface LearnerReflection {
  readonly id: StableId;
  readonly kind: "reflection";
  readonly learnerId: LearnerReference;
  readonly conceptId: StableId;
  readonly originalText: string;
  readonly submittedAt: IsoTimestamp;
}

export type ObservedPracticeOutcomeKind =
  | "evidence-of-understanding"
  | "evidence-of-uncertainty";

/**
 * This is an observed assessment-boundary statement, not an engine-calculated
 * score or interpretation. Its absence means the attempt is not assessed.
 */
export interface ObservedPracticeOutcome {
  readonly kind: ObservedPracticeOutcomeKind;
  readonly observedAt: IsoTimestamp;
  readonly assessmentBoundaryRef: StableId;
  readonly outcomeEvidenceRef: StableId;
}

export function observedPracticeOutcome(input: {
  readonly kind: ObservedPracticeOutcomeKind;
  readonly observedAt: IsoTimestamp;
  readonly assessmentBoundaryRef: string;
  readonly outcomeEvidenceRef: string;
}): ObservedPracticeOutcome {
  return Object.freeze({
    kind: input.kind,
    observedAt: input.observedAt,
    assessmentBoundaryRef: stableId(input.assessmentBoundaryRef, "Assessment boundary reference"),
    outcomeEvidenceRef: stableId(input.outcomeEvidenceRef, "Practice outcome evidence reference"),
  });
}

export type PracticeOutcomeStatus = "not-assessed" | ObservedPracticeOutcomeKind;

export interface PracticeAttempt {
  readonly id: StableId;
  readonly kind: "practice-attempt";
  readonly learnerId: LearnerReference;
  readonly conceptId: StableId;
  readonly learningExperienceId: StableId;
  /** Immutable learner-owned response; it is never interpreted as an outcome. */
  readonly learnerResponse: string;
  readonly submittedAt: IsoTimestamp;
  /** Optional external observation. Absent means `not-assessed`. */
  readonly observedOutcome?: ObservedPracticeOutcome;
}

export function practiceOutcomeStatus(attempt: PracticeAttempt): PracticeOutcomeStatus {
  return attempt.observedOutcome?.kind ?? "not-assessed";
}

/**
 * Confidence remains the learner's own report. Its scale is deliberately
 * captured as supplied rather than being normalized to an unapproved score.
 */
export interface ConfidenceReport {
  readonly id: StableId;
  readonly kind: "confidence-report";
  readonly learnerId: LearnerReference;
  readonly conceptId: StableId;
  readonly reportedValue: string;
  readonly scaleLabel: string;
  readonly reportedAt: IsoTimestamp;
}

export interface LearningContextReport {
  readonly id: StableId;
  readonly kind: "learning-context-report";
  readonly learnerId: LearnerReference;
  readonly learningIntention: string;
  readonly selfReportedEnergyContext?: string;
  readonly reportedAt: IsoTimestamp;
}

export type LearnerChoiceKind =
  | "select-offer"
  | "decline-offer"
  | "defer-offer"
  | "request-alternative"
  | "pause";

/**
 * Whether a choice kind may move the learner toward the opportunity that was
 * offered. Foundation article A2: only acceptance may advance; declining,
 * deferring, requesting an alternative, and pausing must not.
 */
export type OfferAdvancement = "may-advance-toward-offer" | "must-not-advance-toward-offer";

/**
 * Every LearnerChoiceKind must be classified here. The `never` assertion makes
 * the switch exhaustive at compile time, so a new choice kind cannot be added
 * without an explicit decision about whether it may advance the learner. The
 * unclassified default is deliberately the restrictive one.
 */
export function offerAdvancement(choiceKind: LearnerChoiceKind): OfferAdvancement {
  switch (choiceKind) {
    case "select-offer":
      return "may-advance-toward-offer";
    case "decline-offer":
    case "defer-offer":
    case "request-alternative":
    case "pause":
      return "must-not-advance-toward-offer";
    default: {
      const unclassified: never = choiceKind;
      throw new DomainValidationError(
        `Learner choice kind is not classified for offer advancement: ${String(unclassified)}`,
      );
    }
  }
}

export interface LearnerChoice {
  readonly id: StableId;
  readonly kind: "learner-choice";
  readonly choiceKind: LearnerChoiceKind;
  readonly learnerId: LearnerReference;
  readonly offerId?: StableId;
  readonly chosenAt: IsoTimestamp;
}

export type LearnerEvidence =
  | LearnerReflection
  | PracticeAttempt
  | ConfidenceReport
  | LearningContextReport
  | LearnerChoice;

export interface HistoricalEvent {
  readonly id: StableId;
  readonly kind: HistoricalEventKind;
  readonly learnerId: LearnerReference;
  readonly occurredAt: IsoTimestamp;
  /** Immutable causal chain; transport and UI details are deliberately absent. */
  readonly interactionCommandId?: StableId;
  readonly learningDecisionId?: StableId;
  readonly provenanceId?: StableId;
  readonly contextVersion?: VersionRef;
  readonly conceptId?: StableId;
  readonly evidenceId?: StableId;
  readonly stateCommitmentId?: StableId;
}

/**
 * An interpretation is derived, qualified, and revisable. It is deliberately
 * separate from learner-owned evidence and does not claim to be learner speech.
 */
export interface DerivedInterpretation {
  readonly id: StableId;
  readonly kind: InterpretationKind;
  readonly learnerId: LearnerReference;
  readonly conceptId: StableId;
  readonly summary: string;
  readonly evidenceIds: readonly StableId[];
  readonly provenance: DecisionProvenance;
}

/**
 * A depth a learner chose, and the concept they chose it for.
 *
 * The pairing is load-bearing. A bare `PedagogicalLayer` on the learner said
 * "this person is working at mechanics", when what the learner had actually
 * said was "show me *this concept* at mechanics". Opening a concept they had
 * never seen then inherited a depth chosen for a different one, hiding the new
 * concept's intuition material and its practice behind a choice nobody made
 * about it. That is a choice inferred from behaviour, which A2 forbids.
 */
export interface PedagogicalLayerChoice {
  readonly conceptId: StableId;
  readonly layer: PedagogicalLayer;
}

export interface CurrentLearnerState {
  readonly learnerId: LearnerReference;
  readonly engagementFocus: EngagementFocus;
  readonly activeConceptId?: StableId;
  /** Every depth this learner has chosen, each held against its own concept. */
  readonly pedagogicalLayerByConcept: readonly PedagogicalLayerChoice[];
  readonly evidenceIds: readonly StableId[];
  readonly interpretationIds: readonly StableId[];
}

/** The depth this learner chose for a concept, if they chose one for it. */
export function pedagogicalLayerFor(
  state: CurrentLearnerState,
  conceptId: string,
): PedagogicalLayer | undefined {
  return state.pedagogicalLayerByConcept.find((choice) => choice.conceptId === conceptId)?.layer;
}

/**
 * The depth in force now: the one chosen for the concept currently open.
 *
 * Derived rather than stored, so a "current depth" cannot come to disagree with
 * the per-concept choices it is supposed to be one of. A learner with no
 * concept open has no depth in force, and a concept they have never chosen a
 * depth for has none either -- which is what puts every layer back on offer.
 */
export function activePedagogicalLayer(state: CurrentLearnerState): PedagogicalLayer | undefined {
  return state.activeConceptId === undefined
    ? undefined
    : pedagogicalLayerFor(state, state.activeConceptId);
}

export type StableIdStateChange =
  | { readonly kind: "set"; readonly value: StableId }
  | { readonly kind: "clear" };

export type PedagogicalLayerStateChange =
  | { readonly kind: "set"; readonly conceptId: StableId; readonly value: PedagogicalLayer }
  | { readonly kind: "clear"; readonly conceptId: StableId };

/**
 * An explicit delta is the authoritative resulting-state information for a
 * commitment. It contains no inferred readiness, ranking, or score. The
 * optional fields mean 'unchanged'; set and clear changes are unambiguous.
 */
export interface LearnerStateDelta {
  readonly engagementFocus?: EngagementFocus;
  readonly activeConcept?: StableIdStateChange;
  readonly pedagogicalLayer?: PedagogicalLayerStateChange;
  readonly evidenceIdsToAdd: readonly StableId[];
  readonly interpretationIdsToAdd: readonly StableId[];
}

/**
 * What a caller may ask for when building a delta.
 *
 * Exported so that a call site assembling a delta conditionally can write
 * `satisfies Pick<LearnerStateDeltaInput, "pedagogicalLayer">` on the fragment
 * it spreads in. Spreading bypasses excess-property checking, so without that
 * annotation a stale or misspelled field name is silently dropped instead of
 * failing to compile -- which is exactly how a layer change could go missing.
 */
export interface LearnerStateDeltaInput {
  readonly engagementFocus?: EngagementFocus;
  readonly activeConcept?: { readonly kind: "set"; readonly value: string } | { readonly kind: "clear" };
  readonly pedagogicalLayer?:
    | { readonly kind: "set"; readonly conceptId: string; readonly value: PedagogicalLayer }
    | { readonly kind: "clear"; readonly conceptId: string };
  readonly evidenceIdsToAdd?: readonly string[];
  readonly interpretationIdsToAdd?: readonly string[];
}

export function learnerStateDelta(input: LearnerStateDeltaInput): LearnerStateDelta {
  const activeConcept = input.activeConcept === undefined
    ? undefined
    : input.activeConcept.kind === "clear"
      ? Object.freeze({ kind: "clear" as const })
      : Object.freeze({ kind: "set" as const, value: stableId(input.activeConcept.value, "State delta active concept identifier") });
  const pedagogicalLayer = input.pedagogicalLayer === undefined
    ? undefined
    : input.pedagogicalLayer.kind === "clear"
      ? Object.freeze({
          kind: "clear" as const,
          conceptId: stableId(input.pedagogicalLayer.conceptId, "State delta pedagogical layer concept identifier"),
        })
      : Object.freeze({
          kind: "set" as const,
          conceptId: stableId(input.pedagogicalLayer.conceptId, "State delta pedagogical layer concept identifier"),
          value: input.pedagogicalLayer.value,
        });
  // A depth belongs to the concept it was chosen for. A delta that moves a
  // learner to one concept while recording a depth for another would write a
  // choice into the record that the learner never made about the concept they
  // are now on. Refused rather than reconciled: there is no correct guess.
  if (activeConcept !== undefined && activeConcept.kind === "set" &&
      pedagogicalLayer !== undefined && pedagogicalLayer.conceptId !== activeConcept.value) {
    throw new DomainValidationError(
      "A state delta that moves a learner to a concept cannot record a pedagogical layer for a different concept.",
    );
  }
  const evidenceIdsToAdd = uniqueStableIds(
    (input.evidenceIdsToAdd ?? []).map((id) => stableId(id, "State delta evidence identifier")),
    "State delta evidence identifiers",
  );
  const interpretationIdsToAdd = uniqueStableIds(
    (input.interpretationIdsToAdd ?? []).map((id) => stableId(id, "State delta interpretation identifier")),
    "State delta interpretation identifiers",
  );
  if (input.engagementFocus === undefined && activeConcept === undefined && pedagogicalLayer === undefined &&
      evidenceIdsToAdd.length === 0 && interpretationIdsToAdd.length === 0) {
    throw new DomainValidationError("A state delta must identify at least one resulting state change.");
  }
  return Object.freeze({
    ...(input.engagementFocus === undefined ? {} : { engagementFocus: input.engagementFocus }),
    ...(activeConcept === undefined ? {} : { activeConcept }),
    ...(pedagogicalLayer === undefined ? {} : { pedagogicalLayer }),
    evidenceIdsToAdd,
    interpretationIdsToAdd,
  });
}

export function stateDeltaDimensions(delta: LearnerStateDelta): readonly string[] {
  const dimensions: string[] = [];
  if (delta.engagementFocus !== undefined) dimensions.push("engagement-focus");
  if (delta.activeConcept !== undefined) dimensions.push("active-concept");
  if (delta.pedagogicalLayer !== undefined) dimensions.push("pedagogical-layer");
  if (delta.evidenceIdsToAdd.length > 0) dimensions.push("evidence");
  if (delta.interpretationIdsToAdd.length > 0) dimensions.push("interpretation");
  return readonlyList(dimensions);
}

/**
 * A layer change is compared against the depth held for its own concept, never
 * against whatever depth happens to be in force. Comparing against the latter
 * is how the defect worked: a learner moving to a new concept at the depth they
 * had used on the previous one looked like "no change" and was silently kept.
 */
function layerChangesNothing(
  change: PedagogicalLayerStateChange,
  state: CurrentLearnerState,
): boolean {
  const current = pedagogicalLayerFor(state, change.conceptId);
  return change.kind === "clear" ? current === undefined : change.value === current;
}

function changesNothing<T>(
  change: { readonly kind: "set"; readonly value: T } | { readonly kind: "clear" } | undefined,
  current: T | undefined,
): boolean {
  if (change === undefined) return true;
  return change.kind === "clear" ? current === undefined : change.value === current;
}

/**
 * Reduces a delta to what it would actually change.
 *
 * `stateDeltaDimensions` reports what a delta *mentions*, and it never receives
 * a state to compare against, so it cannot do otherwise. A learner selecting the
 * offer they were already on therefore produced a commitment recording an
 * `active-concept` change to the concept they had never left: the record
 * claimed a movement that did not happen (O8).
 *
 * A reduced delta naming nothing cannot become a commitment, because a state
 * commitment must identify at least one changed dimension. That is the intended
 * outcome rather than an obstacle. The learner acted, and their action is kept
 * as evidence and as an event; what is not written is a commitment asserting a
 * change nobody made.
 */
export function effectiveStateDelta(
  delta: LearnerStateDelta,
  state: CurrentLearnerState,
): LearnerStateDelta {
  const alreadyKnown = new Set<string>(state.evidenceIds);
  const alreadyInterpreted = new Set<string>(state.interpretationIds);
  // Built directly rather than through `learnerStateDelta`, which rejects a
  // delta that changes nothing. Here that is the meaningful answer, not an
  // invalid input: these values were validated when the delta was first made,
  // and this only removes the ones that would change nothing.
  return Object.freeze({
    ...(delta.engagementFocus === undefined || delta.engagementFocus === state.engagementFocus
      ? {}
      : { engagementFocus: delta.engagementFocus }),
    ...(changesNothing(delta.activeConcept, state.activeConceptId)
      ? {}
      : { activeConcept: delta.activeConcept }),
    ...(delta.pedagogicalLayer === undefined || layerChangesNothing(delta.pedagogicalLayer, state)
      ? {}
      : { pedagogicalLayer: delta.pedagogicalLayer }),
    evidenceIdsToAdd: readonlyList(delta.evidenceIdsToAdd.filter((id) => !alreadyKnown.has(id))),
    interpretationIdsToAdd: readonlyList(
      delta.interpretationIdsToAdd.filter((id) => !alreadyInterpreted.has(id)),
    ),
  });
}

/**
 * Records one depth choice against its concept, replacing any earlier choice
 * for that same concept in place. Replacing in place rather than appending
 * keeps the order the learner's own history produced, so replaying the same
 * events always rebuilds exactly the same state.
 */
function applyPedagogicalLayerChoice(
  existing: readonly PedagogicalLayerChoice[],
  change: PedagogicalLayerStateChange,
): readonly PedagogicalLayerChoice[] {
  if (change.kind === "clear") {
    return readonlyList(existing.filter((choice) => choice.conceptId !== change.conceptId));
  }
  const entry = Object.freeze({ conceptId: change.conceptId, layer: change.value });
  return readonlyList(existing.some((choice) => choice.conceptId === change.conceptId)
    ? existing.map((choice) => (choice.conceptId === change.conceptId ? entry : choice))
    : [...existing, entry]);
}

/** Applies a validated commitment delta without inspecting an external store. */
export function applyLearnerStateDelta(
  previous: CurrentLearnerState,
  delta: LearnerStateDelta,
): CurrentLearnerState {
  const activeConceptId = delta.activeConcept === undefined
    ? previous.activeConceptId
    : delta.activeConcept.kind === "clear"
      ? undefined
      : delta.activeConcept.value;
  const pedagogicalLayerByConcept = delta.pedagogicalLayer === undefined
    ? previous.pedagogicalLayerByConcept
    : applyPedagogicalLayerChoice(previous.pedagogicalLayerByConcept, delta.pedagogicalLayer);
  return currentLearnerState({
    learnerId: previous.learnerId,
    engagementFocus: delta.engagementFocus ?? previous.engagementFocus,
    ...(activeConceptId === undefined ? {} : { activeConceptId }),
    pedagogicalLayerByConcept,
    evidenceIds: uniqueStableIds([...previous.evidenceIds, ...delta.evidenceIdsToAdd], "Replayed learner state evidence identifiers"),
    interpretationIds: uniqueStableIds([...previous.interpretationIds, ...delta.interpretationIdsToAdd], "Replayed learner state interpretation identifiers"),
  });
}

export type StateCommitmentAuthorization =
  | { readonly kind: "accepted-interaction-command"; readonly commandId: StableId }
  | { readonly kind: "accepted-evidence"; readonly evidenceId: StableId }
  | { readonly kind: "learner-choice"; readonly learnerChoiceId: StableId };

/**
 * A State Commitment may result from an accepted explicit learner command,
 * accepted learner evidence, or a confirmed learner choice. It intentionally
 * has no authorization form for an AI proposal.
 */
export interface StateCommitment {
  readonly id: StableId;
  readonly learnerId: LearnerReference;
  readonly authorization: StateCommitmentAuthorization;
  readonly learningDecisionId: StableId;
  /** Version of the deterministic context/rules that formed this commitment. */
  readonly contextVersion: VersionRef;
  readonly changedDimensions: readonly string[];
  /** The sole authoritative resulting-state payload for deterministic replay. */
  readonly stateDelta: LearnerStateDelta;
  readonly committedAt: IsoTimestamp;
  /** Structured provenance is retained once on the commitment. */
  readonly provenance: DecisionProvenance;
  /** Events hold this immutable reference instead of duplicating provenance. */
  readonly provenanceId: StableId;
}

export interface LearnerRecord {
  readonly learnerId: LearnerReference;
  readonly evidence: readonly LearnerEvidence[];
  readonly events: readonly HistoricalEvent[];
  readonly interpretations: readonly DerivedInterpretation[];
  readonly state: CurrentLearnerState;
  readonly commitments: readonly StateCommitment[];
}

export function learnerReflection(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly conceptId: string;
  readonly originalText: string;
  readonly submittedAt: IsoTimestamp;
}): LearnerReflection {
  return Object.freeze({
    id: stableId(input.id, "Reflection identifier"),
    kind: "reflection",
    learnerId: learnerReference(input.learnerId),
    conceptId: stableId(input.conceptId, "Reflection concept identifier"),
    originalText: requiredText(input.originalText, "Original reflection text"),
    submittedAt: input.submittedAt,
  });
}

export function practiceAttempt(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly conceptId: string;
  readonly learningExperienceId: string;
  readonly learnerResponse: string;
  readonly submittedAt: IsoTimestamp;
  readonly observedOutcome?: ObservedPracticeOutcome;
}): PracticeAttempt {
  return Object.freeze({
    id: stableId(input.id, "Practice attempt identifier"),
    kind: "practice-attempt",
    learnerId: learnerReference(input.learnerId),
    conceptId: stableId(input.conceptId, "Practice attempt concept identifier"),
    learningExperienceId: stableId(input.learningExperienceId, "Practice learning experience identifier"),
    learnerResponse: requiredText(input.learnerResponse, "Practice learner response"),
    submittedAt: input.submittedAt,
    ...(input.observedOutcome === undefined ? {} : { observedOutcome: input.observedOutcome }),
  });
}

export function confidenceReport(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly conceptId: string;
  readonly reportedValue: string;
  readonly scaleLabel: string;
  readonly reportedAt: IsoTimestamp;
}): ConfidenceReport {
  return Object.freeze({
    id: stableId(input.id, "Confidence report identifier"),
    kind: "confidence-report",
    learnerId: learnerReference(input.learnerId),
    conceptId: stableId(input.conceptId, "Confidence report concept identifier"),
    reportedValue: requiredText(input.reportedValue, "Confidence reported value"),
    scaleLabel: requiredText(input.scaleLabel, "Confidence scale label"),
    reportedAt: input.reportedAt,
  });
}

export function learningContextReport(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly learningIntention: string;
  readonly selfReportedEnergyContext?: string;
  readonly reportedAt: IsoTimestamp;
}): LearningContextReport {
  const base = {
    id: stableId(input.id, "Learning context report identifier"),
    kind: "learning-context-report" as const,
    learnerId: learnerReference(input.learnerId),
    learningIntention: requiredText(input.learningIntention, "Learning intention"),
    reportedAt: input.reportedAt,
  };
  return Object.freeze(
    input.selfReportedEnergyContext === undefined
      ? base
      : { ...base, selfReportedEnergyContext: requiredText(input.selfReportedEnergyContext, "Energy context") },
  );
}

export function learnerChoice(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly choiceKind: LearnerChoiceKind;
  readonly offerId?: string;
  readonly chosenAt: IsoTimestamp;
}): LearnerChoice {
  const needsOffer = input.choiceKind !== "pause";
  if (needsOffer && input.offerId === undefined) {
    throw new DomainValidationError(`Learner choice '${input.choiceKind}' must reference an offer.`);
  }
  if (!needsOffer && input.offerId !== undefined) {
    throw new DomainValidationError("A pause learner choice must not reference an offer.");
  }
  const base = {
    id: stableId(input.id, "Learner choice identifier"),
    kind: "learner-choice" as const,
    choiceKind: input.choiceKind,
    learnerId: learnerReference(input.learnerId),
    chosenAt: input.chosenAt,
  };
  return Object.freeze(input.offerId === undefined ? base : { ...base, offerId: stableId(input.offerId, "Learner choice offer identifier") });
}

export function historicalEvent(input: {
  readonly id: string;
  readonly kind: HistoricalEventKind;
  readonly learnerId: string;
  readonly occurredAt: IsoTimestamp;
  readonly interactionCommandId?: string;
  readonly learningDecisionId?: string;
  readonly provenanceId?: string;
  readonly contextVersion?: string;
  readonly conceptId?: string;
  readonly evidenceId?: string;
  readonly stateCommitmentId?: string;
}): HistoricalEvent {
  const base = {
    id: stableId(input.id, "Historical event identifier"),
    kind: input.kind,
    learnerId: learnerReference(input.learnerId),
    occurredAt: input.occurredAt,
  };
  return Object.freeze({
    ...base,
    ...(input.interactionCommandId === undefined ? {} : { interactionCommandId: stableId(input.interactionCommandId, "Historical event interaction command identifier") }),
    ...(input.learningDecisionId === undefined ? {} : { learningDecisionId: stableId(input.learningDecisionId, "Historical event learning decision identifier") }),
    ...(input.provenanceId === undefined ? {} : { provenanceId: stableId(input.provenanceId, "Historical event provenance identifier") }),
    ...(input.contextVersion === undefined ? {} : { contextVersion: versionRef(input.contextVersion) }),
    ...(input.conceptId === undefined ? {} : { conceptId: stableId(input.conceptId, "Historical event concept identifier") }),
    ...(input.evidenceId === undefined ? {} : { evidenceId: stableId(input.evidenceId, "Historical event evidence identifier") }),
    ...(input.stateCommitmentId === undefined
      ? {}
      : { stateCommitmentId: stableId(input.stateCommitmentId, "Historical event state commitment identifier") }),
  });
}

export function derivedInterpretation(input: {
  readonly id: string;
  readonly kind: InterpretationKind;
  readonly learnerId: string;
  readonly conceptId: string;
  readonly summary: string;
  readonly evidenceIds: readonly string[];
  readonly provenance: DecisionProvenance;
}): DerivedInterpretation {
  if (input.evidenceIds.length === 0) {
    throw new DomainValidationError("A derived interpretation must reference supporting learner evidence.");
  }
  return Object.freeze({
    id: stableId(input.id, "Derived interpretation identifier"),
    kind: input.kind,
    learnerId: learnerReference(input.learnerId),
    conceptId: stableId(input.conceptId, "Derived interpretation concept identifier"),
    summary: requiredText(input.summary, "Derived interpretation summary"),
    evidenceIds: uniqueStableIds(
      input.evidenceIds.map((id) => stableId(id, "Derived interpretation evidence identifier")),
      "Derived interpretation evidence identifiers",
    ),
    provenance: input.provenance,
  });
}

export function currentLearnerState(input: {
  readonly learnerId: string;
  readonly engagementFocus: EngagementFocus;
  readonly activeConceptId?: string;
  readonly pedagogicalLayerByConcept?: readonly {
    readonly conceptId: string;
    readonly layer: PedagogicalLayer;
  }[];
  readonly evidenceIds?: readonly string[];
  readonly interpretationIds?: readonly string[];
}): CurrentLearnerState {
  const pedagogicalLayerByConcept = readonlyList(
    (input.pedagogicalLayerByConcept ?? []).map((choice) => Object.freeze({
      conceptId: stableId(choice.conceptId, "Current learner state pedagogical layer concept identifier"),
      layer: choice.layer,
    })),
  );
  if (new Set(pedagogicalLayerByConcept.map((choice) => choice.conceptId)).size !== pedagogicalLayerByConcept.length) {
    throw new DomainValidationError("A learner cannot hold two pedagogical layers for the same concept.");
  }
  const base = {
    learnerId: learnerReference(input.learnerId),
    engagementFocus: input.engagementFocus,
    pedagogicalLayerByConcept,
    evidenceIds: uniqueStableIds(
      (input.evidenceIds ?? []).map((id) => stableId(id, "Current learner state evidence identifier")),
      "Current learner state evidence identifiers",
    ),
    interpretationIds: uniqueStableIds(
      (input.interpretationIds ?? []).map((id) => stableId(id, "Current learner state interpretation identifier")),
      "Current learner state interpretation identifiers",
    ),
  };

  if (input.engagementFocus === "active-focus" && input.activeConceptId === undefined) {
    throw new DomainValidationError("An active learner focus must identify an active concept.");
  }
  if (input.engagementFocus === "unobserved" && input.activeConceptId !== undefined) {
    throw new DomainValidationError("An unobserved learner focus cannot identify an active concept.");
  }

  return Object.freeze({
    ...base,
    ...(input.activeConceptId === undefined
      ? {}
      : { activeConceptId: stableId(input.activeConceptId, "Current learner state active concept identifier") }),
  });
}

export function stateCommitment(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly authorization: StateCommitmentAuthorization;
  readonly learningDecisionId: string;
  readonly contextVersion: string;
  readonly changedDimensions: readonly string[];
  readonly stateDelta: LearnerStateDelta;
  readonly committedAt: IsoTimestamp;
  readonly provenance: DecisionProvenance;
}): StateCommitment {
  if (input.changedDimensions.length === 0) {
    throw new DomainValidationError("A state commitment must identify at least one changed dimension.");
  }
  const changedDimensions = input.changedDimensions.map((dimension) => requiredText(dimension, "State commitment changed dimension"));
  if (new Set(changedDimensions).size !== changedDimensions.length) {
    throw new DomainValidationError("State commitment changed dimensions must not contain duplicates.");
  }
  const resultingDeltaDimensions = stateDeltaDimensions(input.stateDelta);
  if (changedDimensions.length !== resultingDeltaDimensions.length ||
      changedDimensions.some((dimension, index) => dimension !== resultingDeltaDimensions[index])) {
    throw new DomainValidationError("State commitment changed dimensions must exactly describe its resulting state delta.");
  }
  return Object.freeze({
    id: stableId(input.id, "State commitment identifier"),
    learnerId: learnerReference(input.learnerId),
    authorization: input.authorization,
    learningDecisionId: stableId(input.learningDecisionId, "State commitment learning decision identifier"),
    contextVersion: versionRef(input.contextVersion),
    changedDimensions: readonlyList(changedDimensions),
    stateDelta: input.stateDelta,
    committedAt: input.committedAt,
    provenance: input.provenance,
    provenanceId: input.provenance.id,
  });
}

/**
 * Validates the kernel-level separation and cross-reference invariants. It is
 * intentionally storage-agnostic and does not implement event replay or state
 * projection logic, which are later slices.
 */
export function learnerRecord(input: LearnerRecord): LearnerRecord {
  const learnerId = input.learnerId;
  const evidenceIds = new Set(input.evidence.map((item) => item.id));
  const eventIds = new Set(input.events.map((item) => item.id));
  const interpretationIds = new Set(input.interpretations.map((item) => item.id));
  const commitmentIds = new Set(input.commitments.map((item) => item.id));

  if (evidenceIds.size !== input.evidence.length || eventIds.size !== input.events.length ||
      interpretationIds.size !== input.interpretations.length || commitmentIds.size !== input.commitments.length) {
    throw new DomainValidationError("Learner record items must have unique identifiers within each category.");
  }

  for (const evidence of input.evidence) {
    if (evidence.learnerId !== learnerId) {
      throw new DomainValidationError("Learner-owned evidence must belong to the learner record owner.");
    }
  }
  for (const event of input.events) {
    if (event.learnerId !== learnerId) {
      throw new DomainValidationError("Historical events must belong to the learner record owner.");
    }
    if (event.evidenceId !== undefined && !evidenceIds.has(event.evidenceId)) {
      throw new DomainValidationError("Historical event references evidence absent from the learner record.");
    }
    if (event.stateCommitmentId !== undefined && !commitmentIds.has(event.stateCommitmentId)) {
      throw new DomainValidationError("Historical event references a state commitment absent from the learner record.");
    }
  }
  const commitmentsById = new Map(input.commitments.map((commitment) => [commitment.id, commitment]));
  for (const event of input.events) {
    if (event.stateCommitmentId === undefined) {
      continue;
    }
    const commitment = commitmentsById.get(event.stateCommitmentId);
    if (commitment === undefined) {
      throw new DomainValidationError("Historical event references a state commitment absent from the learner record.");
    }
    if (event.interactionCommandId === undefined || event.learningDecisionId === undefined ||
        event.provenanceId === undefined || event.contextVersion === undefined) {
      throw new DomainValidationError("A state-affecting historical event must preserve causal command, decision, provenance, and context references.");
    }
    if (event.learningDecisionId !== commitment.learningDecisionId ||
        event.provenanceId !== commitment.provenanceId ||
        event.contextVersion !== commitment.contextVersion) {
      throw new DomainValidationError("Historical event causal references must agree with its StateCommitment.");
    }
  }
  for (const commitment of input.commitments) {
    const hasStateCommittedEvent = input.events.some((event) =>
      event.kind === "state-committed" && event.stateCommitmentId === commitment.id,
    );
    if (!hasStateCommittedEvent) {
      throw new DomainValidationError("Every state-affecting commitment requires a state-committed historical event.");
    }
  }

  for (const interpretation of input.interpretations) {
    if (interpretation.learnerId !== learnerId) {
      throw new DomainValidationError("Derived interpretations must belong to the learner record owner.");
    }
    if (interpretation.evidenceIds.some((id) => !evidenceIds.has(id))) {
      throw new DomainValidationError("Derived interpretation references evidence absent from the learner record.");
    }
  }
  for (const commitment of input.commitments) {
    if (commitment.learnerId !== learnerId) {
      throw new DomainValidationError("State commitments must belong to the learner record owner.");
    }
    if (commitment.authorization.kind === "accepted-evidence" && !evidenceIds.has(commitment.authorization.evidenceId)) {
      throw new DomainValidationError("Evidence-authorized commitment references evidence absent from the learner record.");
    }
    if (commitment.authorization.kind === "learner-choice" && !evidenceIds.has(commitment.authorization.learnerChoiceId)) {
      throw new DomainValidationError("Choice-authorized commitment references a choice absent from the learner record.");
    }
  }
  if (input.state.learnerId !== learnerId) {
    throw new DomainValidationError("Current learner state must belong to the learner record owner.");
  }
  if (input.state.evidenceIds.some((id) => !evidenceIds.has(id))) {
    throw new DomainValidationError("Current learner state references evidence absent from the learner record.");
  }
  if (input.state.interpretationIds.some((id) => !interpretationIds.has(id))) {
    throw new DomainValidationError("Current learner state references an interpretation absent from the learner record.");
  }

  return Object.freeze({
    learnerId,
    evidence: readonlyList(input.evidence),
    events: readonlyList(input.events),
    interpretations: readonlyList(input.interpretations),
    state: input.state,
    commitments: readonlyList(input.commitments),
  });
}
