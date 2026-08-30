import { evaluateNonEvaluativeText, evaluateSelfAuthorityClaim } from "../domain/policy-governance.js";
import { DecisionProvenance } from "../domain/provenance.js";
import {
  DomainValidationError,
  IsoTimestamp,
  readonlyList,
  requiredText,
  StableId,
  stableId,
  uncertainty,
  UncertaintyStatement,
  uniqueStableIds,
} from "../domain/primitives.js";

export type ReasoningTaskKind =
  | "reflection-analysis"
  | "explanation-generation"
  | "representation-generation"
  | "misconception-hypothesis"
  | "practice-generation"
  | "adaptive-path-suggestion"
  | "dialogue-assistance";

/**
 * The engine-side request for optional reasoning. It names purpose, permitted
 * evidence, concept context, output constraints, and provenance requirements,
 * but contains no provider/model/prompt implementation detail.
 */
export interface ReasoningTask {
  readonly id: StableId;
  readonly kind: ReasoningTaskKind;
  readonly conceptIds: readonly StableId[];
  /** Learner-scoped references the proposal may cite: evidence, events, interpretations. */
  readonly permittedEvidenceIds: readonly StableId[];
  /** Content, pedagogy, and delivery references the proposal may cite. */
  readonly permittedBasisIds: readonly StableId[];
  readonly requestedAt: IsoTimestamp;
  readonly purpose: string;
}

export interface ReasoningProposal {
  readonly id: StableId;
  readonly taskId: StableId;
  readonly kind: ReasoningTaskKind;
  readonly summary: string;
  readonly evidenceIds: readonly StableId[];
  readonly uncertainty: UncertaintyStatement;
  readonly provenance: DecisionProvenance;
}

export type ReasoningProposalValidationOutcome = "accepted" | "rejected";

export interface ReasoningProposalValidation {
  readonly outcome: ReasoningProposalValidationOutcome;
  readonly reasons: readonly string[];
}

/**
 * A provider implements this port later. The domain kernel only depends on the
 * provider-agnostic task and proposal structures.
 */
export interface ReasoningPort {
  propose(task: ReasoningTask): Promise<ReasoningProposal | undefined>;
}

export function reasoningTask(input: {
  readonly id: string;
  readonly kind: ReasoningTaskKind;
  readonly conceptIds: readonly string[];
  readonly permittedEvidenceIds?: readonly string[];
  readonly permittedBasisIds?: readonly string[];
  readonly requestedAt: IsoTimestamp;
  readonly purpose: string;
}): ReasoningTask {
  if (input.conceptIds.length === 0) {
    throw new DomainValidationError("A reasoning task must reference at least one concept.");
  }
  return Object.freeze({
    id: stableId(input.id, "Reasoning task identifier"),
    kind: input.kind,
    conceptIds: uniqueStableIds(
      input.conceptIds.map((id) => stableId(id, "Reasoning task concept identifier")),
      "Reasoning task concept identifiers",
    ),
    permittedEvidenceIds: uniqueStableIds(
      (input.permittedEvidenceIds ?? []).map((id) => stableId(id, "Reasoning task evidence identifier")),
      "Reasoning task permitted evidence identifiers",
    ),
    permittedBasisIds: uniqueStableIds(
      (input.permittedBasisIds ?? []).map((id) => stableId(id, "Reasoning task basis identifier")),
      "Reasoning task permitted basis identifiers",
    ),
    requestedAt: input.requestedAt,
    purpose: requiredText(input.purpose, "Reasoning task purpose"),
  });
}

export function reasoningProposal(input: {
  readonly id: string;
  readonly taskId: string;
  readonly kind: ReasoningTaskKind;
  readonly summary: string;
  readonly evidenceIds: readonly string[];
  readonly uncertainty?: UncertaintyStatement;
  readonly provenance: DecisionProvenance;
}): ReasoningProposal {
  return Object.freeze({
    id: stableId(input.id, "Reasoning proposal identifier"),
    taskId: stableId(input.taskId, "Reasoning proposal task identifier"),
    kind: input.kind,
    summary: requiredText(input.summary, "Reasoning proposal summary"),
    evidenceIds: uniqueStableIds(
      input.evidenceIds.map((id) => stableId(id, "Reasoning proposal evidence identifier")),
      "Reasoning proposal evidence identifiers",
    ),
    uncertainty: input.uncertainty ?? uncertainty("unknown", "Reasoning proposal uncertainty has not been calibrated."),
    provenance: input.provenance,
  });
}

/**
 * This validation is deliberately deterministic and provider-independent. A
 * proposal that passes it is still not a learning decision or state commitment;
 * a later policy evaluation and decisioning slice must govern any use.
 */
export function validateReasoningProposal(
  task: ReasoningTask,
  proposal: ReasoningProposal,
): ReasoningProposalValidation {
  const reasons: string[] = [];
  if (proposal.taskId !== task.id) {
    reasons.push("Reasoning proposal task reference does not match the reasoning task.");
  }
  if (proposal.kind !== task.kind) {
    reasons.push("Reasoning proposal kind does not match the reasoning task kind.");
  }
  const permittedEvidence = new Set(task.permittedEvidenceIds);
  if (proposal.evidenceIds.some((evidenceId) => !permittedEvidence.has(evidenceId))) {
    reasons.push("Reasoning proposal references evidence outside the task's permitted evidence scope.");
  }
  if (evaluateNonEvaluativeText(proposal.summary).outcome === "prohibited") {
    reasons.push("Reasoning proposal violates the non-evaluative language policy guard.");
  }
  // O7. A proposal whose learner-facing text speaks about the system's own
  // standing is refused rather than admitted-and-inert. It never reaches
  // governance, so it never reaches a learner.
  if (evaluateSelfAuthorityClaim(proposal.summary).outcome === "prohibited") {
    reasons.push("Reasoning proposal makes a claim about the system's own authority.");
  }
  return Object.freeze({
    outcome: reasons.length === 0 ? "accepted" : "rejected",
    reasons: readonlyList(reasons),
  });
}
