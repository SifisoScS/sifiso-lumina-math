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

export interface CurrentLearnerState {
  readonly learnerId: LearnerReference;
  readonly engagementFocus: EngagementFocus;
  readonly activeConceptId?: StableId;
  readonly activePedagogicalLayer?: PedagogicalLayer;
  readonly evidenceIds: readonly StableId[];
  readonly interpretationIds: readonly StableId[];
}

export type StableIdStateChange =
  | { readonly kind: "set"; readonly value: StableId }
  | { readonly kind: "clear" };

export type PedagogicalLayerStateChange =
  | { readonly kind: "set"; readonly value: PedagogicalLayer }
  | { readonly kind: "clear" };

/**
 * An explicit delta is the authoritative resulting-state information for a
 * commitment. It contains no inferred readiness, ranking, or score. The
 * optional fields mean 'unchanged'; set and clear changes are unambiguous.
 */
export interface LearnerStateDelta {
  readonly engagementFocus?: EngagementFocus;
  readonly activeConcept?: StableIdStateChange;
  readonly activePedagogicalLayer?: PedagogicalLayerStateChange;
  readonly evidenceIdsToAdd: readonly StableId[];
  readonly interpretationIdsToAdd: readonly StableId[];
}

export function learnerStateDelta(input: {
  readonly engagementFocus?: EngagementFocus;
  readonly activeConcept?: { readonly kind: "set"; readonly value: string } | { readonly kind: "clear" };
  readonly activePedagogicalLayer?: { readonly kind: "set"; readonly value: PedagogicalLayer } | { readonly kind: "clear" };
  readonly evidenceIdsToAdd?: readonly string[];
  readonly interpretationIdsToAdd?: readonly string[];
}): LearnerStateDelta {
  const activeConcept = input.activeConcept === undefined
    ? undefined
    : input.activeConcept.kind === "clear"
      ? Object.freeze({ kind: "clear" as const })
      : Object.freeze({ kind: "set" as const, value: stableId(input.activeConcept.value, "State delta active concept identifier") });
  const activePedagogicalLayer = input.activePedagogicalLayer === undefined
    ? undefined
    : input.activePedagogicalLayer.kind === "clear"
      ? Object.freeze({ kind: "clear" as const })
      : Object.freeze({ kind: "set" as const, value: input.activePedagogicalLayer.value });
  const evidenceIdsToAdd = uniqueStableIds(
    (input.evidenceIdsToAdd ?? []).map((id) => stableId(id, "State delta evidence identifier")),
    "State delta evidence identifiers",
  );
  const interpretationIdsToAdd = uniqueStableIds(
    (input.interpretationIdsToAdd ?? []).map((id) => stableId(id, "State delta interpretation identifier")),
    "State delta interpretation identifiers",
  );
  if (input.engagementFocus === undefined && activeConcept === undefined && activePedagogicalLayer === undefined &&
      evidenceIdsToAdd.length === 0 && interpretationIdsToAdd.length === 0) {
    throw new DomainValidationError("A state delta must identify at least one resulting state change.");
  }
  return Object.freeze({
    ...(input.engagementFocus === undefined ? {} : { engagementFocus: input.engagementFocus }),
    ...(activeConcept === undefined ? {} : { activeConcept }),
    ...(activePedagogicalLayer === undefined ? {} : { activePedagogicalLayer }),
    evidenceIdsToAdd,
    interpretationIdsToAdd,
  });
}

export function stateDeltaDimensions(delta: LearnerStateDelta): readonly string[] {
  const dimensions: string[] = [];
  if (delta.engagementFocus !== undefined) dimensions.push("engagement-focus");
  if (delta.activeConcept !== undefined) dimensions.push("active-concept");
  if (delta.activePedagogicalLayer !== undefined) dimensions.push("active-pedagogical-layer");
  if (delta.evidenceIdsToAdd.length > 0) dimensions.push("evidence");
  if (delta.interpretationIdsToAdd.length > 0) dimensions.push("interpretation");
  return readonlyList(dimensions);
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
  const activePedagogicalLayer = delta.activePedagogicalLayer === undefined
    ? previous.activePedagogicalLayer
    : delta.activePedagogicalLayer.kind === "clear"
      ? undefined
      : delta.activePedagogicalLayer.value;
  return currentLearnerState({
    learnerId: previous.learnerId,
    engagementFocus: delta.engagementFocus ?? previous.engagementFocus,
    ...(activeConceptId === undefined ? {} : { activeConceptId }),
    ...(activePedagogicalLayer === undefined ? {} : { activePedagogicalLayer }),
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
  readonly activePedagogicalLayer?: PedagogicalLayer;
  readonly evidenceIds?: readonly string[];
  readonly interpretationIds?: readonly string[];
}): CurrentLearnerState {
  const base = {
    learnerId: learnerReference(input.learnerId),
    engagementFocus: input.engagementFocus,
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
    ...(input.activePedagogicalLayer === undefined ? {} : { activePedagogicalLayer: input.activePedagogicalLayer }),
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
