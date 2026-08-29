import {
  candidateLearningOpportunity,
  CandidateLearningOpportunity,
} from "../contracts/core-contracts.js";
import { LearningExperience, PedagogicalLayer } from "../domain/mathematical-knowledge.js";
import { DomainValidationError } from "../domain/primitives.js";
import {
  DeliveryFilteringResult,
  filterExperiencesForDelivery,
} from "./delivery-compatibility.js";
import { AssembledLearningContext } from "./context.js";
import { EvidenceEvaluation } from "./evidence-evaluation.js";

function pedagogicallyCompatible(
  experience: LearningExperience,
  context: AssembledLearningContext,
): boolean {
  const selectedLayer = context.selectedPedagogicalLayer;
  if (selectedLayer !== undefined && !experience.pedagogicalLayers.includes(selectedLayer)) {
    return false;
  }
  return context.pedagogicalGuidance.some((guidance) =>
    experience.pedagogicalLayers.includes(guidance.layer) && guidance.suitableExperienceIntents.includes(experience.intent),
  );
}

/** Published experience candidates before delivery capability filtering. */
export function deliveryRelevantExperiences(context: AssembledLearningContext): readonly LearningExperience[] {
  return Object.freeze(context.knowledge.experiences.filter((experience) => pedagogicallyCompatible(experience, context)));
}

/** Provider-neutral declared-capability evaluation for pedagogically relevant experiences. */
export function evaluateContextDeliveryCompatibility(context: AssembledLearningContext): DeliveryFilteringResult {
  return filterExperiencesForDelivery(deliveryRelevantExperiences(context), context.deliveryCapabilities);
}

function opportunityId(context: AssembledLearningContext, suffix: string): string {
  return `opportunity.${context.command.id}.${suffix}`;
}

/**
 * How an experience is offered, from what the experience is for.
 *
 * Every intent is named. The two-line version this replaces returned "continue"
 * for anything it did not recognise, so a new intent would have been offered to
 * a learner as "carry on with this" without anyone deciding that it should be.
 */
function experienceOpportunityKind(experience: LearningExperience): "continue" | "practise" | "reflect" {
  switch (experience.intent) {
    case "practice":
      return "practise";
    case "reflection":
      return "reflect";
    case "intuition":
    case "mechanics":
    case "exam-patterns":
    case "low-energy":
    case "concept-bridge":
      return "continue";
    default: {
      const unclassified: never = experience.intent;
      throw new DomainValidationError(
        `Learning experience intent is not classified for offering: ${String(unclassified)}`,
      );
    }
  }
}

function addLayerMovementCandidates(
  context: AssembledLearningContext,
  delivery: DeliveryFilteringResult,
  candidates: CandidateLearningOpportunity[],
): void {
  const currentLayer = context.selectedPedagogicalLayer;
  const targetLayerExperiences = context.knowledge.experiences.filter((experience) =>
    experience.deliveryRequirements.every((requirement) => context.deliveryCapabilities.capabilities.includes(requirement)),
  );
  for (const experience of targetLayerExperiences) {
    for (const layer of experience.pedagogicalLayers) {
      if (layer !== currentLayer) {
        candidates.push(candidateLearningOpportunity({
          id: opportunityId(context, `move-toward-${layer}.${experience.id}`),
          kind: "move-toward-layer",
          conceptId: context.knowledge.concept.id,
          learningExperienceId: experience.id,
          pedagogicalLayer: layer,
        }));
      }
    }
  }
}

function firstCompatibleExperienceUsingAsset(
  delivery: DeliveryFilteringResult,
  assetId: string,
): LearningExperience | undefined {
  return delivery.compatible.find((candidate) =>
    candidate.experience.knowledgeAssetIds.includes(assetId as never),
  )?.experience;
}

/**
 * Produces semantic candidates grounded in published experience, asset, or graph
 * objects. Delivery filtering uses only explicitly supplied capabilities. An
 * unavailable experience is not silently substituted with an unrelated one.
 */
export function generateCandidateLearningOpportunities(
  context: AssembledLearningContext,
  evidenceEvaluation?: EvidenceEvaluation,
  delivery: DeliveryFilteringResult = evaluateContextDeliveryCompatibility(context),
): readonly CandidateLearningOpportunity[] {
  const candidates: CandidateLearningOpportunity[] = [];

  for (const compatible of delivery.compatible) {
    const experience = compatible.experience;
    const primaryLayer = experience.pedagogicalLayers[0];
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `${experienceOpportunityKind(experience)}.${experience.id}`),
      kind: experienceOpportunityKind(experience),
      conceptId: context.knowledge.concept.id,
      learningExperienceId: experience.id,
      ...(primaryLayer === undefined ? {} : { pedagogicalLayer: primaryLayer }),
    }));
  }

  const representationAsset = context.knowledge.representationAssets[0];
  const explicitRepresentationRequest = context.command.kind === "request-alternative-representation";
  const preservesSlice2Baseline = context.command.kind === "explore-concept" || context.command.kind === "submit-learner-choice";
  const reflectionSupportsRepresentation = evidenceEvaluation?.inferred.supportsAlternativeRepresentation ?? false;
  const representationExperience = representationAsset === undefined
    ? undefined
    : firstCompatibleExperienceUsingAsset(delivery, representationAsset.id);
  if (representationAsset !== undefined && representationExperience !== undefined &&
      (explicitRepresentationRequest || preservesSlice2Baseline || reflectionSupportsRepresentation)) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `explore-representation.${representationAsset.id}`),
      kind: "explore-representation",
      conceptId: context.knowledge.concept.id,
      knowledgeAssetId: representationAsset.id,
      learningExperienceId: representationExperience.id,
      ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
    }));
  }

  if (evidenceEvaluation?.inferred.supportsRevisit ?? false) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, "revisit"),
      kind: "revisit",
      conceptId: context.knowledge.concept.id,
      ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
    }));
  }

  for (const relationship of context.knowledge.prerequisiteRelationships) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `revisit-prerequisite.${relationship.id}`),
      kind: "revisit-prerequisite",
      conceptId: context.knowledge.concept.id,
      relatedConceptId: relationship.sourceConceptId,
      knowledgeRelationshipId: relationship.id,
    }));
  }

  for (const relationship of context.knowledge.outgoingConceptBridges) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `explore-concept-bridge.${relationship.id}`),
      kind: "explore-concept-bridge",
      conceptId: context.knowledge.concept.id,
      relatedConceptId: relationship.targetConceptId,
      knowledgeRelationshipId: relationship.id,
    }));
  }

  if (evidenceEvaluation?.inferred.supportsMoveTowardAnotherLayer ?? false) {
    addLayerMovementCandidates(context, delivery, candidates);
  }

  // An experience that expects reflection evidence can be offered as a place to
  // write, even when reflecting is not what the experience is for. That is what
  // this candidate is for.
  //
  // The loop above already offers every compatible experience, and an experience
  // whose own intent is reflection is offered there as `reflect` under this
  // identical id. Adding it again put the same opportunity in front of the
  // learner twice, with nothing to choose between the two. An opportunity is
  // offered once; a person cannot make a choice between two identical options.
  const reflectionExperience = delivery.compatible.find((candidate) =>
    candidate.experience.expectedEvidenceTypes.includes("reflection"),
  )?.experience;
  if (reflectionExperience !== undefined &&
      experienceOpportunityKind(reflectionExperience) !== "reflect") {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `reflect.${reflectionExperience.id}`),
      kind: "reflect",
      conceptId: context.knowledge.concept.id,
      learningExperienceId: reflectionExperience.id,
      ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
    }));
  }

  // These are learner-autonomy controls, not content-delivery claims. They do
  // not name a display, component, or fabricated learning completion.
  candidates.push(candidateLearningOpportunity({
    id: opportunityId(context, "pause"),
    kind: "pause",
    conceptId: context.knowledge.concept.id,
  }));
  candidates.push(candidateLearningOpportunity({
    id: opportunityId(context, "allow-learner-choice"),
    kind: "allow-learner-choice",
    conceptId: context.knowledge.concept.id,
  }));

  return Object.freeze(candidates);
}
