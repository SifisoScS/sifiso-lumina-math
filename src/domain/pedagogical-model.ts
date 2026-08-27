import { LearningExperienceIntent, PedagogicalLayer } from "./mathematical-knowledge.js";
import { pedagogicalRuleRef, PedagogicalRuleRef, readonlyList, requiredText } from "./primitives.js";

/**
 * Pedagogical guidance classifies the learning purpose of experiences. It does
 * not choose a learner path, render a tab, or implement an automatic transition.
 */
export interface PedagogicalGuidance {
  readonly ruleRef: PedagogicalRuleRef;
  readonly layer: PedagogicalLayer;
  readonly purpose: string;
  readonly suitableExperienceIntents: readonly LearningExperienceIntent[];
  readonly guidanceNotes: readonly string[];
}

export function pedagogicalGuidance(input: {
  readonly ruleRef: string;
  readonly layer: PedagogicalLayer;
  readonly purpose: string;
  readonly suitableExperienceIntents: readonly LearningExperienceIntent[];
  readonly guidanceNotes: readonly string[];
}): PedagogicalGuidance {
  const intents = new Set(input.suitableExperienceIntents);
  if (intents.size !== input.suitableExperienceIntents.length) {
    throw new Error("Pedagogical guidance experience intents must not contain duplicates.");
  }
  if (input.guidanceNotes.length === 0) {
    throw new Error("Pedagogical guidance must contain at least one note.");
  }
  return Object.freeze({
    ruleRef: pedagogicalRuleRef(input.ruleRef),
    layer: input.layer,
    purpose: requiredText(input.purpose, "Pedagogical guidance purpose"),
    suitableExperienceIntents: readonlyList(input.suitableExperienceIntents),
    guidanceNotes: readonlyList(
      input.guidanceNotes.map((note) => requiredText(note, "Pedagogical guidance note")),
    ),
  });
}

/**
 * Canonical layer guidance expresses the approved model at the domain level.
 * The statements describe teaching intent rather than a compulsory ordering.
 */
export const canonicalPedagogicalGuidance: readonly PedagogicalGuidance[] = readonlyList([
  pedagogicalGuidance({
    ruleRef: "pedagogy.intuition.v1",
    layer: "intuition",
    purpose: "Build an accessible mental model before formal notation dominates.",
    suitableExperienceIntents: ["intuition", "low-energy", "concept-bridge", "reflection"],
    guidanceNotes: [
      "Use everyday metaphors, micro-stories, physical or visual connections, and core insights where available.",
      "Offer multiple entry points and do not compel symbolic progression.",
    ],
  }),
  pedagogicalGuidance({
    ruleRef: "pedagogy.mechanics.v1",
    layer: "mechanics",
    purpose: "Support clear formal processes, notation, and the reasons behind procedures.",
    suitableExperienceIntents: ["mechanics", "practice", "reflection"],
    guidanceNotes: [
      "Introduce symbols gradually and make the purpose of each step available.",
      "The layer may be offered or requested; it is not an automatic UI progression.",
    ],
  }),
  pedagogicalGuidance({
    ruleRef: "pedagogy.exam-patterns.v1",
    layer: "exam-patterns",
    purpose: "Support practical recognition of common exam formats, strategies, and potential traps.",
    suitableExperienceIntents: ["exam-patterns", "practice", "reflection"],
    guidanceNotes: [
      "Keep exam-oriented work practical and pattern-focused without defining learner worth by performance.",
      "Make the layer an available opportunity rather than a compulsory measure of completion.",
    ],
  }),
]);
