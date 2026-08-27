import {
  candidateLearningOpportunity,
  CandidateLearningOpportunity,
} from "../contracts/core-contracts.js";
import { LearningExperience, PedagogicalLayer } from "../domain/mathematical-knowledge.js";
import { AssembledLearningContext } from "./context.js";

function isExperienceCompatible(
  experience: LearningExperience,
  context: AssembledLearningContext,
): boolean {
  const hasRequiredCapabilities = experience.deliveryRequirements.every((requirement) =>
    context.deliveryCapabilities.capabilities.includes(requirement),
  );
  if (!hasRequiredCapabilities) {
    return false;
  }
  if (context.selectedPedagogicalLayer === undefined) {
    return true;
  }
  return experience.pedagogicalLayers.includes(context.selectedPedagogicalLayer);
}

function opportunityId(
  context: AssembledLearningContext,
  suffix: string,
): string {
  return `opportunity.${context.command.id}.${suffix}`;
}

function experienceOpportunityKind(experience: LearningExperience): "continue" | "practise" | "reflect" {
  if (experience.intent === "practice") {
    return "practise";
  }
  if (experience.intent === "reflection") {
    return "reflect";
  }
  return "continue";
}

function addLayerMovementCandidates(
  context: AssembledLearningContext,
  candidates: CandidateLearningOpportunity[],
): void {
  const currentLayer = context.selectedPedagogicalLayer;
  const availableLayers = new Set<PedagogicalLayer>();
  for (const experience of context.knowledge.experiences) {
    if (!experience.deliveryRequirements.every((requirement) => context.deliveryCapabilities.capabilities.includes(requirement))) {
      continue;
    }
    for (const layer of experience.pedagogicalLayers) {
      availableLayers.add(layer);
    }
  }
  for (const layer of availableLayers) {
    if (layer !== currentLayer) {
      candidates.push(candidateLearningOpportunity({
        id: opportunityId(context, `move-toward-${layer}`),
        kind: "move-toward-layer",
        conceptId: context.knowledge.concept.id,
        pedagogicalLayer: layer,
      }));
    }
  }
}

/**
 * Produces semantic candidate opportunities only. It makes no recommendation,
 * offer, policy result, learner choice, state commitment, event, provider call,
 * persistence call, or presentation instruction.
 */
export function generateCandidateLearningOpportunities(
  context: AssembledLearningContext,
): readonly CandidateLearningOpportunity[] {
  const candidates: CandidateLearningOpportunity[] = [];
  const compatibleExperiences = context.knowledge.experiences.filter((experience) =>
    isExperienceCompatible(experience, context),
  );

  for (const experience of compatibleExperiences) {
    const primaryLayer = experience.pedagogicalLayers[0];
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `${experienceOpportunityKind(experience)}.${experience.id}`),
      kind: experienceOpportunityKind(experience),
      conceptId: context.knowledge.concept.id,
      learningExperienceId: experience.id,
      ...(primaryLayer === undefined ? {} : { pedagogicalLayer: primaryLayer }),
    }));
  }

  if (context.knowledge.assets.some((asset) => asset.kind === "representation")) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, "explore-representation"),
      kind: "explore-representation",
      conceptId: context.knowledge.concept.id,
      ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
    }));
  }

  if (context.observedEvidence.length > 0) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, "revisit"),
      kind: "revisit",
      conceptId: context.knowledge.concept.id,
      ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
    }));
  }

  for (const relationship of context.knowledge.prerequisiteRelationships) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `revisit-prerequisite.${relationship.sourceConceptId}`),
      kind: "revisit-prerequisite",
      conceptId: context.knowledge.concept.id,
      relatedConceptId: relationship.sourceConceptId,
    }));
  }

  for (const relationship of context.knowledge.outgoingConceptBridges) {
    candidates.push(candidateLearningOpportunity({
      id: opportunityId(context, `explore-concept-bridge.${relationship.targetConceptId}`),
      kind: "explore-concept-bridge",
      conceptId: context.knowledge.concept.id,
      relatedConceptId: relationship.targetConceptId,
    }));
  }

  addLayerMovementCandidates(context, candidates);

  candidates.push(candidateLearningOpportunity({
    id: opportunityId(context, "reflect"),
    kind: "reflect",
    conceptId: context.knowledge.concept.id,
    ...(context.selectedPedagogicalLayer === undefined ? {} : { pedagogicalLayer: context.selectedPedagogicalLayer }),
  }));
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
