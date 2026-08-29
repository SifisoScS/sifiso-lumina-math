import {
  LearnerChoice,
  LearnerReflection,
  LearningContextReport,
  PracticeAttempt,
  ConfidenceReport,
} from "../domain/learner-record.js";
import { PedagogicalLayer } from "../domain/mathematical-knowledge.js";
import { DecisionProvenance } from "../domain/provenance.js";
import {
  commandReference,
  CommandReference,
  DomainValidationError,
  IsoTimestamp,
  learnerReference,
  LearnerReference,
  policyVersionRef,
  PolicyVersionRef,
  readonlyList,
  requiredText,
  StableId,
  stableId,
  uniqueStableIds,
} from "../domain/primitives.js";

export type Permission =
  | "read-learner-record"
  | "submit-learner-evidence"
  | "make-learner-choice"
  | "request-learning-decision";

/**
 * Identity technology is intentionally outside the core. This value object is
 * only the trusted authorization/consent context handed to the engine.
 */
export interface TrustedActorContext {
  readonly actorId: StableId;
  readonly learnerScope: readonly LearnerReference[];
  readonly permissions: readonly Permission[];
  readonly consentReferences: readonly StableId[];
}

export function trustedActorContext(input: {
  readonly actorId: string;
  readonly learnerScope: readonly string[];
  readonly permissions: readonly Permission[];
  readonly consentReferences?: readonly string[];
}): TrustedActorContext {
  if (input.learnerScope.length === 0) {
    throw new DomainValidationError("Trusted actor context must provide at least one learner scope reference.");
  }
  if (input.permissions.length === 0) {
    throw new DomainValidationError("Trusted actor context must provide at least one permission.");
  }
  const learnerScope = uniqueStableIds(
    input.learnerScope.map((id) => learnerReference(id)),
    "Trusted actor learner scope",
  ) as readonly LearnerReference[];
  const permissionSet = new Set(input.permissions);
  if (permissionSet.size !== input.permissions.length) {
    throw new DomainValidationError("Trusted actor permissions must not contain duplicates.");
  }
  return Object.freeze({
    actorId: stableId(input.actorId, "Trusted actor identifier"),
    learnerScope,
    permissions: readonlyList(input.permissions),
    consentReferences: uniqueStableIds(
      (input.consentReferences ?? []).map((id) => stableId(id, "Consent reference")),
      "Consent references",
    ),
  });
}

export type DeliveryCapability =
  | "spoken-output"
  | "displayed-text"
  | "displayed-notation"
  | "visual-representation"
  | "typed-input"
  | "spoken-input";

/**
 * This profile deliberately contains generic capabilities, not a browser,
 * client framework, application route, UI component, or device identity.
 */
export interface DeliveryCapabilityProfile {
  readonly capabilities: readonly DeliveryCapability[];
}

export function deliveryCapabilityProfile(
  capabilities: readonly DeliveryCapability[],
): DeliveryCapabilityProfile {
  if (capabilities.length === 0) {
    throw new DomainValidationError("Delivery capability profile must include at least one capability.");
  }
  if (new Set(capabilities).size !== capabilities.length) {
    throw new DomainValidationError("Delivery capability profile must not contain duplicates.");
  }
  return Object.freeze({ capabilities: readonlyList(capabilities) });
}

interface CommandBase {
  readonly id: StableId;
  readonly commandReference: CommandReference;
  readonly learnerId: LearnerReference;
  readonly issuedAt: IsoTimestamp;
}

export interface ExploreConceptCommand extends CommandBase {
  readonly kind: "explore-concept";
  readonly conceptId: StableId;
  readonly pedagogicalLayer?: PedagogicalLayer;
}

export interface RequestAlternativeRepresentationCommand extends CommandBase {
  readonly kind: "request-alternative-representation";
  readonly conceptId: StableId;
}

export interface RequestLearningGuidanceCommand extends CommandBase {
  readonly kind: "request-learning-guidance";
  readonly conceptId: StableId;
}

export interface SubmitReflectionCommand extends CommandBase {
  readonly kind: "submit-reflection";
  readonly reflection: LearnerReflection;
}

export interface SubmitPracticeAttemptCommand extends CommandBase {
  readonly kind: "submit-practice-attempt";
  readonly practiceAttempt: PracticeAttempt;
}

export interface SubmitConfidenceReportCommand extends CommandBase {
  readonly kind: "submit-confidence-report";
  readonly confidenceReport: ConfidenceReport;
}

export interface SubmitLearningContextCommand extends CommandBase {
  readonly kind: "submit-learning-context";
  readonly learningContextReport: LearningContextReport;
}

export interface SubmitLearnerChoiceCommand extends CommandBase {
  readonly kind: "submit-learner-choice";
  readonly learnerChoice: LearnerChoice;
}

export type InteractionCommand =
  | ExploreConceptCommand
  | RequestAlternativeRepresentationCommand
  | RequestLearningGuidanceCommand
  | SubmitReflectionCommand
  | SubmitPracticeAttemptCommand
  | SubmitConfidenceReportCommand
  | SubmitLearningContextCommand
  | SubmitLearnerChoiceCommand;

function baseCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
}): CommandBase {
  return Object.freeze({
    id: stableId(input.id, "Interaction command identifier"),
    commandReference: commandReference(input.commandReference),
    learnerId: learnerReference(input.learnerId),
    issuedAt: input.issuedAt,
  });
}

export function exploreConceptCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly conceptId: string;
  readonly pedagogicalLayer?: PedagogicalLayer;
}): ExploreConceptCommand {
  return Object.freeze({
    ...baseCommand(input),
    kind: "explore-concept",
    conceptId: stableId(input.conceptId, "Explored concept identifier"),
    ...(input.pedagogicalLayer === undefined ? {} : { pedagogicalLayer: input.pedagogicalLayer }),
  });
}

export function requestAlternativeRepresentationCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly conceptId: string;
}): RequestAlternativeRepresentationCommand {
  return Object.freeze({
    ...baseCommand(input),
    kind: "request-alternative-representation",
    conceptId: stableId(input.conceptId, "Alternative representation concept identifier"),
  });
}

export function requestLearningGuidanceCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly conceptId: string;
}): RequestLearningGuidanceCommand {
  return Object.freeze({
    ...baseCommand(input),
    kind: "request-learning-guidance",
    conceptId: stableId(input.conceptId, "Learning guidance concept identifier"),
  });
}

function evidenceCommand<T extends LearnerReflection | PracticeAttempt | ConfidenceReport | LearningContextReport | LearnerChoice>(
  input: {
    readonly id: string;
    readonly commandReference: string;
    readonly learnerId: string;
    readonly issuedAt: IsoTimestamp;
    readonly evidence: T;
  },
): CommandBase & { readonly evidence: T } {
  const base = baseCommand(input);
  if (base.learnerId !== input.evidence.learnerId) {
    throw new DomainValidationError("Interaction command learner must match submitted learner-owned evidence.");
  }
  return Object.freeze({ ...base, evidence: input.evidence });
}

export function submitReflectionCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly reflection: LearnerReflection;
}): SubmitReflectionCommand {
  const command = evidenceCommand({ ...input, evidence: input.reflection });
  return Object.freeze({ ...command, kind: "submit-reflection", reflection: input.reflection });
}

export function submitPracticeAttemptCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly practiceAttempt: PracticeAttempt;
}): SubmitPracticeAttemptCommand {
  const command = evidenceCommand({ ...input, evidence: input.practiceAttempt });
  return Object.freeze({ ...command, kind: "submit-practice-attempt", practiceAttempt: input.practiceAttempt });
}

export function submitConfidenceReportCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly confidenceReport: ConfidenceReport;
}): SubmitConfidenceReportCommand {
  const command = evidenceCommand({ ...input, evidence: input.confidenceReport });
  return Object.freeze({ ...command, kind: "submit-confidence-report", confidenceReport: input.confidenceReport });
}

export function submitLearningContextCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly learningContextReport: LearningContextReport;
}): SubmitLearningContextCommand {
  const command = evidenceCommand({ ...input, evidence: input.learningContextReport });
  return Object.freeze({ ...command, kind: "submit-learning-context", learningContextReport: input.learningContextReport });
}

export function submitLearnerChoiceCommand(input: {
  readonly id: string;
  readonly commandReference: string;
  readonly learnerId: string;
  readonly issuedAt: IsoTimestamp;
  readonly learnerChoice: LearnerChoice;
}): SubmitLearnerChoiceCommand {
  const command = evidenceCommand({ ...input, evidence: input.learnerChoice });
  return Object.freeze({ ...command, kind: "submit-learner-choice", learnerChoice: input.learnerChoice });
}

export type LearningOpportunityKind =
  | "continue"
  | "practise"
  | "reflect"
  | "revisit"
  | "explore-representation"
  | "revisit-prerequisite"
  | "explore-concept-bridge"
  | "move-toward-layer"
  | "pause"
  | "allow-learner-choice";

/**
 * What accepting an opportunity means for the learner's state.
 *
 * Most of these kinds name somewhere to go. Two do not. `pause` is a request to
 * stop and `allow-learner-choice` is a request to be left to decide; neither is
 * a destination. Both used to be treated as movement toward the offer, so a
 * learner who chose "stop for now" was committed into active focus -- the
 * system answering an explicit request with its opposite. Found by a person
 * using the terminal, not by a test.
 *
 * The distinction was always real; it just was not written down anywhere the
 * compiler could see. It is here now, so a new opportunity kind is a compile
 * error until someone says what accepting it does.
 */
export type OpportunityAcceptanceEffect =
  | "advance-toward-opportunity"
  | "suspend-engagement"
  | "no-state-effect";

export function opportunityAcceptanceEffect(kind: LearningOpportunityKind): OpportunityAcceptanceEffect {
  switch (kind) {
    case "continue":
    case "practise":
    case "reflect":
    case "revisit":
    case "explore-representation":
    case "revisit-prerequisite":
    case "explore-concept-bridge":
    case "move-toward-layer":
      return "advance-toward-opportunity";
    case "pause":
      return "suspend-engagement";
    case "allow-learner-choice":
      return "no-state-effect";
    default: {
      const unclassified: never = kind;
      throw new DomainValidationError(
        `Learning opportunity kind is not classified for acceptance: ${String(unclassified)}`,
      );
    }
  }
}

export interface CandidateLearningOpportunity {
  readonly id: StableId;
  readonly kind: LearningOpportunityKind;
  readonly conceptId: StableId;
  /** A prerequisite or bridge target where the opportunity crosses concepts. */
  readonly relatedConceptId?: StableId;
  /** Stable grounding reference for representation/example/procedure knowledge assets. */
  readonly knowledgeAssetId?: StableId;
  /** Stable grounding reference for prerequisite, related, or bridge graph edges. */
  readonly knowledgeRelationshipId?: StableId;
  readonly learningExperienceId?: StableId;
  readonly pedagogicalLayer?: PedagogicalLayer;
}

export function candidateLearningOpportunity(input: {
  readonly id: string;
  readonly kind: LearningOpportunityKind;
  readonly conceptId: string;
  readonly relatedConceptId?: string;
  readonly knowledgeAssetId?: string;
  readonly knowledgeRelationshipId?: string;
  readonly learningExperienceId?: string;
  readonly pedagogicalLayer?: PedagogicalLayer;
}): CandidateLearningOpportunity {
  return Object.freeze({
    id: stableId(input.id, "Learning opportunity identifier"),
    kind: input.kind,
    conceptId: stableId(input.conceptId, "Learning opportunity concept identifier"),
    ...(input.relatedConceptId === undefined
      ? {}
      : { relatedConceptId: stableId(input.relatedConceptId, "Learning opportunity related concept identifier") }),
    ...(input.knowledgeAssetId === undefined
      ? {}
      : { knowledgeAssetId: stableId(input.knowledgeAssetId, "Learning opportunity knowledge asset identifier") }),
    ...(input.knowledgeRelationshipId === undefined
      ? {}
      : { knowledgeRelationshipId: stableId(input.knowledgeRelationshipId, "Learning opportunity knowledge relationship identifier") }),
    ...(input.learningExperienceId === undefined
      ? {}
      : { learningExperienceId: stableId(input.learningExperienceId, "Learning opportunity experience identifier") }),
    ...(input.pedagogicalLayer === undefined ? {} : { pedagogicalLayer: input.pedagogicalLayer }),
  });
}

export interface LearningRecommendation {
  readonly id: StableId;
  readonly opportunity: CandidateLearningOpportunity;
  readonly rationale: string;
}

export interface LearningOffer {
  readonly id: StableId;
  readonly opportunity: CandidateLearningOpportunity;
  readonly requiresLearnerChoice: boolean;
  readonly status: "available";
}

export function learningRecommendation(input: {
  readonly id: string;
  readonly opportunity: CandidateLearningOpportunity;
  readonly rationale: string;
}): LearningRecommendation {
  return Object.freeze({
    id: stableId(input.id, "Learning recommendation identifier"),
    opportunity: input.opportunity,
    rationale: requiredText(input.rationale, "Learning recommendation rationale"),
  });
}

export function learningOffer(input: {
  readonly id: string;
  readonly opportunity: CandidateLearningOpportunity;
  readonly requiresLearnerChoice: boolean;
}): LearningOffer {
  return Object.freeze({
    id: stableId(input.id, "Learning offer identifier"),
    opportunity: input.opportunity,
    requiresLearnerChoice: input.requiresLearnerChoice,
    status: "available",
  });
}

export type PolicyOutcome = "permitted" | "constrained" | "prohibited" | "requires-confirmation";

export interface PolicyEvaluation {
  readonly policyId: StableId;
  readonly policyVersion: PolicyVersionRef;
  readonly outcome: PolicyOutcome;
  readonly rationale: string;
}

export function policyEvaluation(input: {
  readonly policyId: string;
  readonly policyVersion: string;
  readonly outcome: PolicyOutcome;
  readonly rationale: string;
}): PolicyEvaluation {
  return Object.freeze({
    policyId: stableId(input.policyId, "Policy identifier"),
    policyVersion: policyVersionRef(input.policyVersion),
    outcome: input.outcome,
    rationale: requiredText(input.rationale, "Policy evaluation rationale"),
  });
}

export type LearningDecisionStatus = "offer-available" | "incomplete-context" | "constrained" | "declined";
export type LearningDecisionType = "material" | "safe-non-material";

/**
 * LearningDecision is the canonical semantic outcome of the engine. A material
 * decision is concept-grounded and may authorize a later state commitment. A
 * safe non-material outcome records that the engine cannot responsibly form a
 * concept-specific opportunity; it cannot create opportunities or state effects.
 */
export interface LearningDecision {
  readonly id: StableId;
  readonly learnerId: LearnerReference;
  readonly type: LearningDecisionType;
  readonly status: LearningDecisionStatus;
  readonly conceptIds: readonly StableId[];
  readonly opportunities: readonly CandidateLearningOpportunity[];
  readonly recommendations: readonly LearningRecommendation[];
  readonly offers: readonly LearningOffer[];
  readonly policyEvaluations: readonly PolicyEvaluation[];
  readonly provenance: DecisionProvenance;
}

export function learningDecision(input: {
  readonly id: string;
  readonly learnerId: string;
  readonly type: LearningDecisionType;
  readonly status: LearningDecisionStatus;
  readonly conceptIds?: readonly string[];
  readonly opportunities?: readonly CandidateLearningOpportunity[];
  readonly recommendations?: readonly LearningRecommendation[];
  readonly offers?: readonly LearningOffer[];
  readonly policyEvaluations: readonly PolicyEvaluation[];
  readonly provenance: DecisionProvenance;
}): LearningDecision {
  const conceptIds = input.conceptIds ?? [];
  const opportunities = input.opportunities ?? [];
  const offers = input.offers ?? [];
  const recommendations = input.recommendations ?? [];

  if (input.type === "material" && conceptIds.length === 0) {
    throw new DomainValidationError("A material learning decision must reference at least one concept.");
  }
  if (input.type === "material" && input.status === "incomplete-context") {
    throw new DomainValidationError("A material learning decision cannot use incomplete-context status.");
  }
  if (input.type === "safe-non-material") {
    if (conceptIds.length > 0) {
      throw new DomainValidationError("A safe non-material outcome must not fabricate or carry a concept reference.");
    }
    if (input.status !== "incomplete-context" && input.status !== "declined") {
      throw new DomainValidationError("A safe non-material outcome must use incomplete-context or declined status.");
    }
    if (opportunities.length > 0 || recommendations.length > 0 || offers.length > 0) {
      throw new DomainValidationError("A safe non-material outcome must not contain material learning opportunities, recommendations, or offers.");
    }
  }
  if (input.status === "offer-available" && offers.length === 0) {
    throw new DomainValidationError("An offer-available learning decision must include at least one offer.");
  }
  if (input.policyEvaluations.some((evaluation) => evaluation.outcome === "prohibited") && offers.length > 0) {
    throw new DomainValidationError("A decision with a prohibited policy evaluation cannot contain available offers.");
  }

  return Object.freeze({
    id: stableId(input.id, "Learning decision identifier"),
    learnerId: learnerReference(input.learnerId),
    type: input.type,
    status: input.status,
    conceptIds: uniqueStableIds(
      conceptIds.map((id) => stableId(id, "Learning decision concept identifier")),
      "Learning decision concept identifiers",
    ),
    opportunities: readonlyList(opportunities),
    recommendations: readonlyList(recommendations),
    offers: readonlyList(offers),
    policyEvaluations: readonlyList(input.policyEvaluations),
    provenance: input.provenance,
  });
}

/**
 * An edge response is deliberately a thin representation of the domain decision.
 * It has no URL, route, JSX, HTML, CSS, screen, or component fields.
 */
export interface LearningInteractionResponse {
  readonly decision: LearningDecision;
}

export function learningInteractionResponse(decision: LearningDecision): LearningInteractionResponse {
  return Object.freeze({ decision });
}
