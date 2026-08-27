import { DeliveryCapabilityProfile } from "../contracts/core-contracts.js";
import {
  DeliveryRequirement,
  ExperienceEvidenceType,
  LearningExperience,
} from "../domain/mathematical-knowledge.js";
import { readonlyList } from "../domain/primitives.js";

/** A provider-neutral delivery context: capabilities are declared, never detected. */
export type DeliveryContext = DeliveryCapabilityProfile;

export interface ExperienceDeliveryCompatibility {
  readonly experience: LearningExperience;
  readonly deliverable: boolean;
  readonly missingCapabilities: readonly DeliveryRequirement[];
}

export interface DeliveryFilteringResult {
  readonly compatible: readonly ExperienceDeliveryCompatibility[];
  readonly incompatible: readonly ExperienceDeliveryCompatibility[];
  /** True when no pedagogically relevant experience can be delivered. */
  readonly noCompatibleExperience: boolean;
  readonly allRelevantExperiencesUnavailable: boolean;
}

export type ExperienceCompletionStatus =
  | "evidence-bearing-completion"
  | "delivered-without-evidence"
  | "missing-required-evidence"
  | "delivery-unavailable";

export interface ExperienceCompletionEvaluation {
  readonly experienceId: LearningExperience["id"];
  readonly status: ExperienceCompletionStatus;
  readonly satisfiedEvidenceTypes: readonly ExperienceEvidenceType[];
  readonly missingEvidenceTypes: readonly ExperienceEvidenceType[];
  /** This is always false: delivery/display is not evidence-bearing completion. */
  readonly learnerEvidenceFabricated: false;
  readonly learnerStateEffectAuthorized: false;
}

function missingCapabilities(
  experience: LearningExperience,
  context: DeliveryContext,
): readonly DeliveryRequirement[] {
  return readonlyList(experience.deliveryRequirements.filter((requirement) =>
    !context.capabilities.includes(requirement),
  ));
}

/**
 * Filters a supplied experience set only by its declared semantic requirements.
 * It does not substitute an unrelated experience, detect a client/device, or
 * invoke a delivery provider.
 */
export function filterExperiencesForDelivery(
  experiences: readonly LearningExperience[],
  context: DeliveryContext,
): DeliveryFilteringResult {
  const evaluated = experiences.map((experience) => {
    const missing = missingCapabilities(experience, context);
    return Object.freeze({
      experience,
      deliverable: missing.length === 0,
      missingCapabilities: missing,
    });
  });
  const compatible = readonlyList(evaluated.filter((item) => item.deliverable));
  const incompatible = readonlyList(evaluated.filter((item) => !item.deliverable));
  return Object.freeze({
    compatible,
    incompatible,
    noCompatibleExperience: compatible.length === 0,
    allRelevantExperiencesUnavailable: evaluated.length > 0 && compatible.length === 0,
  });
}

/**
 * Evaluates whether a delivered experience has the evidence it declares. It
 * never creates evidence, treats display as learning, or authorizes a state
 * change; state effects remain governed by the existing command and policy flow.
 */
export function evaluateExperienceCompletion(input: {
  readonly experience: LearningExperience;
  readonly delivery: ExperienceDeliveryCompatibility;
  readonly observedEvidenceTypes?: readonly ExperienceEvidenceType[];
}): ExperienceCompletionEvaluation {
  const observed = new Set(input.observedEvidenceTypes ?? []);
  const expected = input.experience.expectedEvidenceTypes;
  const satisfiedEvidenceTypes = readonlyList(expected.filter((type) => observed.has(type)));
  const missingEvidenceTypes = readonlyList(expected.filter((type) => !observed.has(type)));
  const status: ExperienceCompletionStatus = !input.delivery.deliverable
    ? "delivery-unavailable"
    : input.experience.completionSemantics.evidenceRequiredForCompletion && missingEvidenceTypes.length > 0
      ? "missing-required-evidence"
      : satisfiedEvidenceTypes.length > 0
        ? "evidence-bearing-completion"
        : "delivered-without-evidence";
  return Object.freeze({
    experienceId: input.experience.id,
    status,
    satisfiedEvidenceTypes,
    missingEvidenceTypes,
    learnerEvidenceFabricated: false,
    learnerStateEffectAuthorized: false,
  });
}
