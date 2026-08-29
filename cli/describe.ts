import {
  CandidateLearningOpportunity,
  Concept,
  KnowledgeAsset,
  LearningExperience,
  LearningOffer,
} from "../src/index.js";

/**
 * Presentation. Deliberately outside the engine.
 *
 * The engine is headless by design: an opportunity carries identifiers and a
 * kind, never words. Turning that into something a person can read is a choice
 * about audience and tone, and it belongs to whatever is doing the showing —
 * here, a terminal. A different surface would render the same opportunity
 * differently without the engine knowing or caring.
 *
 * Nothing here decides anything. It reads identifiers and returns sentences.
 */

export interface Catalogue {
  readonly concepts: readonly Concept[];
  readonly assets: readonly KnowledgeAsset[];
  readonly experiences: readonly LearningExperience[];
}

function conceptTitle(catalogue: Catalogue, id: string | undefined): string {
  if (id === undefined) return "this idea";
  return catalogue.concepts.find((concept) => concept.id === id)?.title ?? id;
}

function assetTitle(catalogue: Catalogue, id: string | undefined): string | undefined {
  if (id === undefined) return undefined;
  return catalogue.assets.find((asset) => asset.id === id)?.title;
}

/**
 * Two opportunities can share a concept and a layer and differ only by which
 * learning experience they lead to. Naming the experience is what makes them
 * distinguishable to a person; without it a learner sees the same sentence
 * twice and cannot choose between them.
 */
function experienceTitle(catalogue: Catalogue, id: string | undefined): string | undefined {
  if (id === undefined) return undefined;
  return catalogue.experiences.find((experience) => experience.id === id)?.title;
}

/** A short sentence a learner can act on, in the second person. */
export function describeOpportunity(
  opportunity: CandidateLearningOpportunity,
  catalogue: Catalogue,
): string {
  const here = conceptTitle(catalogue, opportunity.conceptId);
  const there = conceptTitle(catalogue, opportunity.relatedConceptId);
  const asset = assetTitle(catalogue, opportunity.knowledgeAssetId);
  const experience = experienceTitle(catalogue, opportunity.learningExperienceId);
  const layer = opportunity.pedagogicalLayer;

  switch (opportunity.kind) {
    case "continue":
      return experience === undefined
        ? `Carry on with ${here}${layer === undefined ? "" : ` (${layer})`}`
        : `Carry on with ${here} — ${experience}`;
    case "explore-representation":
      return asset === undefined
        ? `See ${here} shown a different way`
        : `See ${here} shown a different way — ${asset}`;
    case "revisit":
      return `Look at ${here} again`;
    case "revisit-prerequisite":
      return `Go back to ${there} first`;
    case "explore-concept-bridge":
      return `See how ${here} connects to ${there}`;
    case "move-toward-layer":
      return `Go deeper into ${here}${layer === undefined ? "" : ` — ${layer}`}`;
    case "practise":
      return experience === undefined
        ? `Try a question on ${here}`
        : `Try a question — ${experience}`;
    case "reflect":
      return experience === undefined
        ? `Write down what you are thinking about ${here}`
        : `Write down what you are thinking — ${experience}`;
    case "pause":
      return "Stop for now";
    case "allow-learner-choice":
      return "Decide for yourself what to do next";
    default: {
      const unrendered: never = opportunity.kind;
      return String(unrendered);
    }
  }
}

/** Numbered list of what is on offer, or a plain note when there is nothing. */
export function describeOffers(
  offers: readonly LearningOffer[],
  catalogue: Catalogue,
): readonly string[] {
  return offers.map(
    (offer, index) => `  ${index + 1}. ${describeOpportunity(offer.opportunity, catalogue)}`,
  );
}

export function conceptSummary(concept: Concept): string {
  return `${concept.title}\n\n${concept.conceptualDescription}`;
}
