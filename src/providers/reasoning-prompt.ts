import { Concept } from "../domain/mathematical-knowledge.js";
import { ReasoningTask } from "../contracts/reasoning-port.js";
import { readonlyList, requiredText, StableId } from "../domain/primitives.js";

/**
 * What a provider is permitted to see.
 *
 * Foundation A2 and A6. A `ReasoningTask` carries identifiers, never content —
 * so whatever the adapter sends to a provider is assembled here, from local
 * sources, and this type is the whole of it. It has three fields, all drawn
 * from a `Concept`, and no field in which learner-owned material could travel.
 *
 * That is the structural form of the boundary: not "the adapter must not send
 * learner text" as a rule someone has to remember, but a content type with
 * nowhere to put any.
 */
export interface ConceptContent {
  readonly conceptId: StableId;
  readonly title: string;
  readonly conceptualDescription: string;
}

/** Projects a concept down to exactly what a provider may be shown. */
export function conceptContent(concept: Concept): ConceptContent {
  return Object.freeze({
    conceptId: concept.id,
    title: requiredText(concept.title, "Concept title"),
    conceptualDescription: requiredText(concept.conceptualDescription, "Concept description"),
  });
}

/**
 * Resolves the concepts a task names, dropping any the catalogue does not hold.
 * Nothing outside `task.conceptIds` can be resolved, so the task bounds what a
 * provider is shown just as `permittedEvidenceIds` bounds what it may cite.
 */
export function conceptContentForTask(
  task: ReasoningTask,
  catalogue: readonly Concept[],
): readonly ConceptContent[] {
  const named = new Set<string>(task.conceptIds);
  return readonlyList(
    catalogue.filter((concept) => named.has(concept.id)).map(conceptContent),
  );
}

export interface ReasoningPrompt {
  readonly system: string;
  readonly user: string;
}

/**
 * Assembles the prompt. Pure and provider-independent, so the boundary can be
 * asserted in a test without a network call or an API key.
 *
 * The model is told the constraints it must satisfy, but nothing here relies on
 * it obeying them: every constraint is separately enforced downstream by
 * `evaluateGovernance`, and the fields a model could abuse are not fields it
 * gets to supply. Telling it is a courtesy that reduces refusals, not a control.
 */
export function explanationPrompt(input: {
  readonly task: ReasoningTask;
  readonly concepts: readonly ConceptContent[];
  readonly maxSummaryCharacters: number;
}): ReasoningPrompt {
  const system = [
    "You explain mathematical ideas for a learning system.",
    "",
    "Write one alternative explanation of the concept below. Constraints:",
    `- At most ${input.maxSummaryCharacters} characters.`,
    "- Describe the mathematics only. Say nothing about any learner: no judgement,",
    "  no assessment, no claims about what anyone understands or has done.",
    "- Do not use the words correct, incorrect, wrong, easy, or hard.",
    "- Do not claim your explanation is approved, authorised, verified, or reviewed.",
    "- Cite only the concept identifiers supplied to you.",
    "- State your uncertainty honestly. An uncalibrated answer is 'unknown'.",
    "",
    "You are producing a proposal, not a decision. Whether it reaches a learner",
    "is determined elsewhere, by a policy you are not part of.",
  ].join("\n");

  const conceptBlock = input.concepts
    .map(
      (concept) =>
        `Concept id: ${concept.conceptId}\nTitle: ${concept.title}\nDescription: ${concept.conceptualDescription}`,
    )
    .join("\n\n");

  const user = [`Purpose: ${input.task.purpose}`, "", conceptBlock].join("\n");

  return Object.freeze({ system, user });
}
