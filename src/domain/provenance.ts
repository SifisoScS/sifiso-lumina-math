import {
  DomainValidationError,
  readonlyList,
  requiredText,
  StableId,
  stableId,
  UncertaintyStatement,
  uniqueStableIds,
} from "./primitives.js";

export type ProvenanceReferenceKind =
  | "interaction-command"
  | "trusted-actor-context"
  | "learner-evidence"
  | "historical-event"
  | "knowledge"
  | "pedagogical-rule"
  | "policy"
  | "reasoning-proposal"
  | "learning-decision"
  | "delivery-capability";

export interface ProvenanceReference {
  readonly kind: ProvenanceReferenceKind;
  readonly id: StableId;
}

export interface DecisionProvenance {
  readonly references: readonly ProvenanceReference[];
  readonly uncertainty: UncertaintyStatement;
  readonly rationale: string;
}

export function provenanceReference(kind: ProvenanceReferenceKind, id: string): ProvenanceReference {
  return Object.freeze({ kind, id: stableId(id, `${kind} provenance identifier`) });
}

/**
 * Provenance records observable references and high-level rationale only. It is
 * deliberately not a representation of hidden model reasoning or chain-of-thought.
 */
export function decisionProvenance(input: {
  readonly references: readonly ProvenanceReference[];
  readonly uncertainty: UncertaintyStatement;
  readonly rationale: string;
}): DecisionProvenance {
  if (input.references.length === 0) {
    throw new DomainValidationError("Decision provenance must reference at least one observable basis.");
  }
  const referenceKeys = input.references.map((reference) =>
    stableId(`${reference.kind}.${reference.id}`, "Provenance reference key"),
  );
  uniqueStableIds(referenceKeys, "Decision provenance references");

  return Object.freeze({
    references: readonlyList(input.references),
    uncertainty: input.uncertainty,
    rationale: requiredText(input.rationale, "Decision provenance rationale"),
  });
}
