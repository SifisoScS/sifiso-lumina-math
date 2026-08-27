import {
  DerivedInterpretation,
  derivedInterpretation,
  LearnerEvidence,
  ObservedPracticeOutcomeKind,
  PracticeAttempt,
} from "../domain/learner-record.js";
import { decisionProvenance, provenanceReference } from "../domain/provenance.js";
import { readonlyList, uncertainty } from "../domain/primitives.js";
import { AssembledLearningContext } from "./context.js";

export interface EvidenceEvaluation {
  /** Observed facts are copied from learner evidence / assessment observations. */
  readonly observed: {
    readonly hasReflection: boolean;
    readonly practiceOutcomes: readonly ObservedPracticeOutcomeKind[];
    readonly hasUnassessedPractice: boolean;
    readonly hasHighQualitativeConfidence: boolean;
  };
  /** Inferred signals are qualified and remain separate from learner evidence. */
  readonly inferred: {
    readonly supportsAlternativeRepresentation: boolean;
    readonly supportsRevisit: boolean;
    readonly supportsMoveTowardAnotherLayer: boolean;
    readonly confidencePracticeConflict: boolean;
  };
  readonly newInterpretations: readonly DerivedInterpretation[];
  readonly relevantExistingInterpretations: readonly DerivedInterpretation[];
}

function isPracticeAttempt(evidence: LearnerEvidence): evidence is PracticeAttempt {
  return evidence.kind === "practice-attempt";
}

function isHighQualitativeConfidence(evidence: LearnerEvidence): boolean {
  return evidence.kind === "confidence-report" &&
    evidence.scaleLabel.trim().toLowerCase() === "qualitative" &&
    evidence.reportedValue.trim().toLowerCase() === "high";
}

function interpretationExists(
  existing: readonly DerivedInterpretation[],
  id: string,
): boolean {
  return existing.some((interpretation) => interpretation.id === id);
}

function evidenceInterpretation(input: {
  readonly id: string;
  readonly kind: DerivedInterpretation["kind"];
  readonly context: AssembledLearningContext;
  readonly evidenceIds: readonly string[];
  readonly summary: string;
}): DerivedInterpretation {
  return derivedInterpretation({
    id: input.id,
    kind: input.kind,
    learnerId: input.context.command.learnerId,
    conceptId: input.context.knowledge.concept.id,
    summary: input.summary,
    evidenceIds: input.evidenceIds,
    provenance: decisionProvenance({
      id: `provenance.${input.id}`,
      references: [
        ...input.evidenceIds.map((evidenceId) => provenanceReference("learner-evidence", evidenceId)),
        provenanceReference("pedagogical-rule", "pedagogy.evidence-evaluation.v1"),
      ],
      uncertainty: uncertainty(
        "medium",
        "The interpretation is a deterministic, qualified reading of observed evidence and is not learner-owned fact.",
      ),
      rationale: "The evidence-evaluation rule records a qualified adaptation signal without assigning mastery, score, or psychological state.",
    }),
  });
}

/**
 * Evaluates accumulated evidence using only explicit, approved facts. It never
 * parses raw practice-response text for correctness, never invokes AI, and
 * never creates a score, readiness label, or psychological interpretation.
 */
export function evaluateAccumulatedEvidence(
  context: AssembledLearningContext,
): EvidenceEvaluation {
  const relevantExistingInterpretations = readonlyList(
    context.learnerRecord.interpretations.filter(
      (interpretation) => interpretation.conceptId === context.knowledge.concept.id,
    ),
  );
  const practiceAttempts = context.observedEvidence.filter(isPracticeAttempt);
  const practiceOutcomes = readonlyList(
    practiceAttempts.flatMap((attempt) => attempt.observedOutcome === undefined ? [] : [attempt.observedOutcome.kind]),
  );
  const hasReflection = context.observedEvidence.some((evidence) => evidence.kind === "reflection");
  const hasUnassessedPractice = practiceAttempts.some((attempt) => attempt.observedOutcome === undefined);
  const hasHighQualitativeConfidence = context.observedEvidence.some(isHighQualitativeConfidence);
  const hasUncertaintyObservation = practiceOutcomes.includes("evidence-of-uncertainty");
  const hasUnderstandingObservation = practiceOutcomes.includes("evidence-of-understanding");
  const confidencePracticeConflict = hasHighQualitativeConfidence && hasUncertaintyObservation;
  const hasExistingCuriosityThread = relevantExistingInterpretations.some(
    (interpretation) => interpretation.kind === "curiosity-thread",
  );
  const existingIds = new Set(relevantExistingInterpretations.map((interpretation) => interpretation.id));
  const newInterpretations: DerivedInterpretation[] = [];

  for (const attempt of practiceAttempts) {
    if (attempt.observedOutcome === undefined) {
      continue;
    }
    const interpretationId = `interpretation.${attempt.id}.${attempt.observedOutcome.kind}`;
    if (interpretationExists(relevantExistingInterpretations, interpretationId)) {
      continue;
    }
    const observationText = attempt.observedOutcome.kind === "evidence-of-understanding"
      ? "The external assessment boundary supplied evidence of understanding for this practice attempt."
      : "The external assessment boundary supplied evidence of uncertainty for this practice attempt.";
    newInterpretations.push(evidenceInterpretation({
      id: interpretationId,
      kind: "understanding-signal",
      context,
      evidenceIds: [attempt.id],
      summary: observationText,
    }));
    existingIds.add(interpretationId as never);
  }

  for (const reflection of context.observedEvidence.filter((evidence) => evidence.kind === "reflection")) {
    const interpretationId = `interpretation.${reflection.id}.reflection-opportunity`;
    if (existingIds.has(interpretationId as never)) {
      continue;
    }
    newInterpretations.push(evidenceInterpretation({
      id: interpretationId,
      kind: "curiosity-thread",
      context,
      evidenceIds: [reflection.id],
      summary: "A learner reflection is available; an optional alternative representation may be considered without treating the reflection as a mastery claim.",
    }));
    existingIds.add(interpretationId as never);
  }

  if (confidencePracticeConflict) {
    const confidence = context.observedEvidence.find(isHighQualitativeConfidence);
    const uncertainPractice = practiceAttempts.find((attempt) => attempt.observedOutcome?.kind === "evidence-of-uncertainty");
    if (confidence !== undefined && uncertainPractice !== undefined) {
      const interpretationId = `interpretation.${confidence.id}.${uncertainPractice.id}.evidence-conflict`;
      if (!existingIds.has(interpretationId as never)) {
        newInterpretations.push(evidenceInterpretation({
          id: interpretationId,
          kind: "understanding-signal",
          context,
          evidenceIds: [confidence.id, uncertainPractice.id],
          summary: "A high qualitative confidence report and an external uncertainty observation coexist; the engine preserves this as uncertainty and makes no readiness conclusion.",
        }));
      }
    }
  }

  return Object.freeze({
    observed: Object.freeze({
      hasReflection,
      practiceOutcomes,
      hasUnassessedPractice,
      hasHighQualitativeConfidence,
    }),
    inferred: Object.freeze({
      supportsAlternativeRepresentation: hasReflection || hasExistingCuriosityThread,
      supportsRevisit: hasUncertaintyObservation || confidencePracticeConflict,
      supportsMoveTowardAnotherLayer: hasUnderstandingObservation,
      confidencePracticeConflict,
    }),
    newInterpretations: readonlyList(newInterpretations),
    relevantExistingInterpretations,
  });
}
