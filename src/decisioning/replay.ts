import {
  applyLearnerStateDelta,
  CurrentLearnerState,
  HistoricalEvent,
  StateCommitment,
} from "../domain/learner-record.js";
import { DomainValidationError, readonlyList, StableId } from "../domain/primitives.js";

export class ReplayValidationError extends DomainValidationError {
  public constructor(message: string) {
    super(message);
    this.name = "ReplayValidationError";
  }
}

export interface LearnerHistoryReplayInput {
  readonly initialState: CurrentLearnerState;
  readonly events: readonly HistoricalEvent[];
  readonly commitments: readonly StateCommitment[];
}

export interface LearnerHistoryReplayResult {
  readonly reconstructedState: CurrentLearnerState;
  readonly appliedCommitmentIds: readonly StableId[];
  readonly auditEventIds: readonly StableId[];
}

function assertChronologicalEvents(events: readonly HistoricalEvent[]): void {
  for (let index = 1; index < events.length; index += 1) {
    const previous = events[index - 1];
    const current = events[index];
    if (previous !== undefined && current !== undefined && previous.occurredAt > current.occurredAt) {
      throw new ReplayValidationError("Historical events must be supplied in chronological order for deterministic replay.");
    }
  }
}

function commitmentForEvent(
  event: HistoricalEvent,
  commitmentsById: ReadonlyMap<StableId, StateCommitment>,
): StateCommitment {
  if (event.stateCommitmentId === undefined) {
    throw new ReplayValidationError("A state-committed historical event must reference a StateCommitment.");
  }
  const commitment = commitmentsById.get(event.stateCommitmentId);
  if (commitment === undefined) {
    throw new ReplayValidationError("Replay cannot fabricate a missing StateCommitment referenced by historical history.");
  }
  if (event.learnerId !== commitment.learnerId) {
    throw new ReplayValidationError("Historical event and StateCommitment must belong to the same learner.");
  }
  if (event.interactionCommandId === undefined || event.learningDecisionId === undefined || event.provenanceId === undefined || event.contextVersion === undefined) {
    throw new ReplayValidationError("A state-committed historical event must preserve command, decision, provenance, and context-version references.");
  }
  if (event.learningDecisionId !== commitment.learningDecisionId ||
      event.provenanceId !== commitment.provenanceId ||
      event.contextVersion !== commitment.contextVersion) {
    throw new ReplayValidationError("Historical event causal references must agree with its StateCommitment.");
  }
  return commitment;
}

/**
 * Reconstructs current learner state exclusively from chronologically ordered
 * `state-committed` events and their authoritative StateCommitment deltas.
 * Events supply ordering/audit context; commitments supply state truth. This is
 * a pure, headless operation with no persistence or event-bus dependency.
 */
export function replayLearnerHistory(input: LearnerHistoryReplayInput): LearnerHistoryReplayResult {
  const commitmentIds = new Set(input.commitments.map((commitment) => commitment.id));
  if (commitmentIds.size !== input.commitments.length) {
    throw new ReplayValidationError("Replay commitments must have unique identifiers.");
  }
  if (input.commitments.some((commitment) => commitment.learnerId !== input.initialState.learnerId)) {
    throw new ReplayValidationError("All replay commitments must belong to the initial-state learner.");
  }
  if (input.events.some((event) => event.learnerId !== input.initialState.learnerId)) {
    throw new ReplayValidationError("All replay events must belong to the initial-state learner.");
  }
  assertChronologicalEvents(input.events);

  const commitmentsById = new Map(input.commitments.map((commitment) => [commitment.id, commitment]));
  let reconstructedState = input.initialState;
  const appliedCommitmentIds: StableId[] = [];
  const auditEventIds: StableId[] = [];

  for (const event of input.events) {
    auditEventIds.push(event.id);
    if (event.kind !== "state-committed") {
      continue;
    }
    const commitment = commitmentForEvent(event, commitmentsById);
    if (appliedCommitmentIds.includes(commitment.id)) {
      throw new ReplayValidationError("A StateCommitment cannot be replayed more than once.");
    }
    reconstructedState = applyLearnerStateDelta(reconstructedState, commitment.stateDelta);
    appliedCommitmentIds.push(commitment.id);
  }

  if (appliedCommitmentIds.length !== input.commitments.length) {
    throw new ReplayValidationError("Replay cannot reconstruct state from an unrepresented StateCommitment.");
  }

  return Object.freeze({
    reconstructedState,
    appliedCommitmentIds: readonlyList(appliedCommitmentIds),
    auditEventIds: readonlyList(auditEventIds),
  });
}
