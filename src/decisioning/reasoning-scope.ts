import { AssembledLearningContext } from "./context.js";
import { readonlyList, StableId } from "../domain/primitives.js";

/**
 * What a reasoning task may put in scope, derived from the assembled context
 * rather than assembled by hand.
 *
 * This exists because of the worst thing hostile testing found: a proposal
 * could cite one learner's derived interpretation as the basis for material
 * shown to another. Governance now refuses that. This closes it a second way,
 * earlier — a scope derived from a single learner's own record cannot name
 * another learner's material, because it has no access to any.
 *
 * The governance check is the guarantee. This is the reason the guarantee
 * should never have to fire.
 */
export interface ReasoningScope {
  /** Learner-scoped references: this learner's evidence, events, interpretations. */
  readonly permittedEvidenceIds: readonly StableId[];
  /** Content, pedagogy, and delivery references resolved for this decision. */
  readonly permittedBasisIds: readonly StableId[];
}

function distinct(ids: readonly StableId[]): readonly StableId[] {
  return readonlyList([...new Set(ids)]);
}

/**
 * Derives both scopes for a reasoning task.
 *
 * Learner scope comes only from `context.learnerRecord`, which belongs to one
 * learner. Content scope comes only from the knowledge actually resolved for
 * this decision, so a proposal cannot claim material the decision never
 * touched.
 *
 * Nothing here constructs a `ReasoningTask`. What a task is *for* — its kind,
 * purpose, and identity — is not knowable from context alone and is left to
 * whoever asks for reasoning.
 */
export function reasoningScopeForContext(context: AssembledLearningContext): ReasoningScope {
  const record = context.learnerRecord;
  const knowledge = context.knowledge;

  const learnerScoped: StableId[] = [
    ...record.evidence.map((item) => item.id),
    ...record.events.map((item) => item.id),
    ...record.interpretations.map((item) => item.id),
  ];

  const contentScoped: StableId[] = [
    knowledge.concept.id,
    ...knowledge.prerequisiteConcepts.map((concept) => concept.id),
    ...knowledge.relatedConcepts.map((concept) => concept.id),
    ...knowledge.bridgeConcepts.map((concept) => concept.id),
    ...knowledge.assets.map((asset) => asset.id),
    ...knowledge.representationAssets.map((asset) => asset.id),
    ...knowledge.exampleAssets.map((asset) => asset.id),
    ...knowledge.nonExampleAssets.map((asset) => asset.id),
    ...knowledge.procedureAssets.map((asset) => asset.id),
    ...knowledge.misconceptionAssets.map((asset) => asset.id),
    ...knowledge.applicationAssets.map((asset) => asset.id),
    ...knowledge.examPatternAssets.map((asset) => asset.id),
    ...knowledge.experiences.map((experience) => experience.id),
    ...knowledge.versionReferences.map((reference) => reference.objectId),
  ];

  return Object.freeze({
    permittedEvidenceIds: distinct(learnerScoped),
    permittedBasisIds: distinct(contentScoped),
  });
}
