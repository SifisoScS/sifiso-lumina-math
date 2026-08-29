import {
  CandidateLearningOpportunity,
  DeliveryCapabilityProfile,
  InteractionCommand,
  LearningOffer,
  TrustedActorContext,
} from "../contracts/core-contracts.js";
import {
  CurrentLearnerState,
  LearnerEvidence,
  LearnerRecord,
} from "../domain/learner-record.js";
import {
  Concept,
  ConceptRelationship,
  KnowledgeCatalog,
  LearningExperience,
  PedagogicalLayer,
} from "../domain/mathematical-knowledge.js";
import { PedagogicalGuidance } from "../domain/pedagogical-model.js";
import {
  KnowledgeContextResolution,
  resolveKnowledgeContext as resolveKnowledgeGraphContext,
  ResolvedKnowledgeRelation,
  VersionedKnowledgeReference,
} from "./knowledge-context.js";
import { DomainValidationError, readonlyList, StableId } from "../domain/primitives.js";

export type ContextIssueKind =
  | "learner-outside-actor-scope"
  | "missing-concept-context"
  | "missing-knowledge"
  | "missing-offer-context";

export interface ContextIssue {
  readonly kind: ContextIssueKind;
  readonly message: string;
}

export interface DeclaredEvidenceConflict {
  /** References observed learner evidence whose interpretation is unresolved. */
  readonly evidenceIds: readonly StableId[];
  readonly description: string;
}

export function declaredEvidenceConflict(input: {
  readonly evidenceIds: readonly StableId[];
  readonly description: string;
}): DeclaredEvidenceConflict {
  if (input.evidenceIds.length < 2) {
    throw new DomainValidationError("A declared evidence conflict must reference at least two evidence records.");
  }
  if (new Set(input.evidenceIds).size !== input.evidenceIds.length) {
    throw new DomainValidationError("A declared evidence conflict must not repeat an evidence reference.");
  }
  if (input.description.trim().length === 0) {
    throw new DomainValidationError("A declared evidence conflict requires a description.");
  }
  return Object.freeze({ evidenceIds: readonlyList(input.evidenceIds), description: input.description.trim() });
}

export interface ResolvedKnowledgeContext {
  readonly concept: Concept;
  readonly prerequisiteRelationships: readonly ConceptRelationship[];
  readonly prerequisiteConcepts: readonly Concept[];
  readonly relatedRelationships: readonly ConceptRelationship[];
  readonly relatedConcepts: readonly Concept[];
  readonly outgoingConceptBridges: readonly ConceptRelationship[];
  readonly bridgeConcepts: readonly Concept[];
  readonly assets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly representationAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly exampleAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly nonExampleAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly procedureAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly misconceptionAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly applicationAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly examPatternAssets: readonly import("../domain/mathematical-knowledge.js").KnowledgeAsset[];
  readonly experiences: readonly LearningExperience[];
  readonly semanticRelations: readonly ResolvedKnowledgeRelation[];
  readonly versionReferences: readonly VersionedKnowledgeReference[];
}

export interface AssembledLearningContext {
  readonly command: InteractionCommand;
  readonly actor: TrustedActorContext;
  readonly deliveryCapabilities: DeliveryCapabilityProfile;
  readonly learnerRecord: LearnerRecord;
  readonly knowledge: ResolvedKnowledgeContext;
  readonly selectedPedagogicalLayer?: PedagogicalLayer;
  readonly pedagogicalGuidance: readonly PedagogicalGuidance[];
  readonly observedEvidence: readonly LearnerEvidence[];
  /** Declared conflicts are preserved as uncertainty; Slice 2 does not invent conflict-detection heuristics. */
  readonly declaredEvidenceConflicts: readonly DeclaredEvidenceConflict[];
  readonly activeOffers: readonly LearningOffer[];
}

export type ContextAssemblyResult =
  | { readonly kind: "assembled"; readonly context: AssembledLearningContext }
  | { readonly kind: "incomplete"; readonly issues: readonly ContextIssue[] };

export interface ContextAssemblyInput {
  readonly command: InteractionCommand;
  readonly actor: TrustedActorContext;
  readonly deliveryCapabilities: DeliveryCapabilityProfile;
  readonly learnerRecord: LearnerRecord;
  readonly knowledgeCatalog: KnowledgeCatalog;
  readonly pedagogicalGuidance: readonly PedagogicalGuidance[];
  /** Explicit conflict notices may be supplied by an approved future evidence evaluator. */
  readonly declaredEvidenceConflicts?: readonly DeclaredEvidenceConflict[];
  /**
   * Active offers are supplied as interaction context. Slice 2 does not
   * implement persistence or a durable offer store.
   */
  readonly activeOffers?: readonly LearningOffer[];
}

function commandConceptId(
  command: InteractionCommand,
  state: CurrentLearnerState,
  offers: readonly LearningOffer[],
): StableId | undefined {
  switch (command.kind) {
    case "explore-concept":
    case "request-alternative-representation":
    case "request-learning-guidance":
      return command.conceptId;
    case "submit-reflection":
      return command.reflection.conceptId;
    case "submit-practice-attempt":
      return command.practiceAttempt.conceptId;
    case "submit-confidence-report":
      return command.confidenceReport.conceptId;
    case "submit-learning-context":
      return state.activeConceptId;
    case "submit-learner-choice": {
      if (command.learnerChoice.choiceKind === "pause") {
        return state.activeConceptId;
      }
      const offer = offers.find((candidate) => candidate.id === command.learnerChoice.offerId);
      return offer?.opportunity.conceptId;
    }
  }
}

function commandPedagogicalLayer(
  command: InteractionCommand,
  state: CurrentLearnerState,
): PedagogicalLayer | undefined {
  if (command.kind === "explore-concept") {
    return command.pedagogicalLayer ?? state.activePedagogicalLayer;
  }
  return state.activePedagogicalLayer;
}

function commandSubmittedEvidence(command: InteractionCommand): LearnerEvidence | undefined {
  switch (command.kind) {
    case "submit-reflection":
      return command.reflection;
    case "submit-practice-attempt":
      return command.practiceAttempt;
    case "submit-confidence-report":
      return command.confidenceReport;
    case "submit-learning-context":
      return command.learningContextReport;
    case "submit-learner-choice":
      return command.learnerChoice;
    // These carry no learner-authored evidence. Named explicitly rather than
    // caught by a default, so a new command kind cannot be silently treated as
    // evidence-free -- which would drop a learner's own words on the floor.
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

function evidenceForConcept(
  evidence: LearnerEvidence,
  conceptId: StableId,
): boolean {
  switch (evidence.kind) {
    case "reflection":
    case "practice-attempt":
    case "confidence-report":
      return evidence.conceptId === conceptId;
    case "learning-context-report":
    case "learner-choice":
      return false;
  }
}

function deduplicateEvidence(evidence: readonly LearnerEvidence[]): readonly LearnerEvidence[] {
  const seen = new Set<StableId>();
  const output: LearnerEvidence[] = [];
  for (const item of evidence) {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      output.push(item);
    }
  }
  return readonlyList(output);
}

function resolveKnowledgeContext(
  catalog: KnowledgeCatalog,
  conceptId: StableId,
): ResolvedKnowledgeContext | undefined {
  const resolved: KnowledgeContextResolution | undefined = resolveKnowledgeGraphContext({ catalog, conceptId });
  if (resolved === undefined) {
    return undefined;
  }
  const assets = readonlyList([
    ...resolved.representationAssets,
    ...resolved.exampleAssets,
    ...resolved.nonExampleAssets,
    ...resolved.procedureAssets,
    ...resolved.applicationAssets,
    ...resolved.misconceptionAssets,
    ...resolved.examPatternAssets,
  ]);
  return Object.freeze({
    concept: resolved.targetConcept,
    prerequisiteRelationships: resolved.prerequisiteRelationships,
    prerequisiteConcepts: resolved.prerequisiteConcepts,
    relatedRelationships: resolved.relatedRelationships,
    relatedConcepts: resolved.relatedConcepts,
    outgoingConceptBridges: resolved.bridgeRelationships,
    bridgeConcepts: resolved.bridgeConcepts,
    assets,
    representationAssets: resolved.representationAssets,
    exampleAssets: resolved.exampleAssets,
    nonExampleAssets: resolved.nonExampleAssets,
    procedureAssets: resolved.procedureAssets,
    misconceptionAssets: resolved.misconceptionAssets,
    applicationAssets: resolved.applicationAssets,
    examPatternAssets: resolved.examPatternAssets,
    experiences: resolved.relevantExperiences,
    semanticRelations: resolved.semanticRelations,
    versionReferences: resolved.versionReferences,
  });
}

function missingOfferIssue(command: InteractionCommand, offers: readonly LearningOffer[]): ContextIssue | undefined {
  if (command.kind !== "submit-learner-choice") {
    return undefined;
  }
  if (command.learnerChoice.choiceKind === "pause") {
    return undefined;
  }
  const matchingOffer = offers.some((offer) => offer.id === command.learnerChoice.offerId);
  return matchingOffer
    ? undefined
    : {
        kind: "missing-offer-context",
        message: "The learner choice references an offer that is not active in the supplied interaction context.",
      };
}

/**
 * This function only assembles and resolves context. It does not create an
 * opportunity, make a decision, invoke reasoning, mutate state, or persist.
 */
export function assembleLearningContext(input: ContextAssemblyInput): ContextAssemblyResult {
  const issues: ContextIssue[] = [];
  const activeOffers = readonlyList(input.activeOffers ?? []);
  if (!input.actor.learnerScope.includes(input.command.learnerId)) {
    issues.push({
      kind: "learner-outside-actor-scope",
      message: "The interaction command learner is outside the trusted actor scope.",
    });
  }

  const offerIssue = missingOfferIssue(input.command, activeOffers);
  if (offerIssue !== undefined) {
    issues.push(offerIssue);
  }

  const conceptId = commandConceptId(input.command, input.learnerRecord.state, activeOffers);
  if (conceptId === undefined) {
    issues.push({
      kind: "missing-concept-context",
      message: "The interaction does not resolve to a concept and no active concept context is available.",
    });
  }

  const knowledge = conceptId === undefined ? undefined : resolveKnowledgeContext(input.knowledgeCatalog, conceptId);
  if (conceptId !== undefined && knowledge === undefined) {
    issues.push({
      kind: "missing-knowledge",
      message: "The interaction references knowledge that is unavailable, unpublished, or unresolved.",
    });
  }

  if (issues.length > 0 || conceptId === undefined || knowledge === undefined) {
    return Object.freeze({ kind: "incomplete", issues: readonlyList(issues) });
  }

  const submittedEvidence = commandSubmittedEvidence(input.command);
  const relatedRecordEvidence = input.learnerRecord.evidence.filter((item) => evidenceForConcept(item, conceptId));
  const observedEvidence = deduplicateEvidence(
    submittedEvidence === undefined ? relatedRecordEvidence : [...relatedRecordEvidence, submittedEvidence],
  );
  const availableEvidenceIds = new Set([
    ...input.learnerRecord.evidence.map((item) => item.id),
    ...(submittedEvidence === undefined ? [] : [submittedEvidence.id]),
  ]);
  const declaredEvidenceConflicts = readonlyList(input.declaredEvidenceConflicts ?? []);
  if (declaredEvidenceConflicts.some((conflict) => conflict.evidenceIds.some((id) => !availableEvidenceIds.has(id)))) {
    throw new DomainValidationError("A declared evidence conflict must reference evidence available in the interaction context.");
  }
  const selectedPedagogicalLayer = commandPedagogicalLayer(input.command, input.learnerRecord.state);
  const guidance = selectedPedagogicalLayer === undefined
    ? input.pedagogicalGuidance
    : input.pedagogicalGuidance.filter((item) => item.layer === selectedPedagogicalLayer);

  if (guidance.length === 0) {
    throw new DomainValidationError("Resolved pedagogical context must contain at least one guidance record.");
  }

  return Object.freeze({
    kind: "assembled",
    context: Object.freeze({
      command: input.command,
      actor: input.actor,
      deliveryCapabilities: input.deliveryCapabilities,
      learnerRecord: input.learnerRecord,
      knowledge,
      ...(selectedPedagogicalLayer === undefined ? {} : { selectedPedagogicalLayer }),
      pedagogicalGuidance: readonlyList(guidance),
      observedEvidence,
      declaredEvidenceConflicts,
      activeOffers,
    }),
  });
}
