import {
  Concept,
  ConceptRelationship,
  KnowledgeAsset,
  LearningExperience,
  Topic,
} from "../domain/mathematical-knowledge.js";

/**
 * One topic's content, before it is placed in a catalogue.
 *
 * A topic seed is deliberately *not* a `KnowledgeCatalog`. A catalogue
 * validates that every reference it contains resolves inside itself, which is
 * the right rule for the thing a learner actually reads, and the wrong rule for
 * a file that is one part of it: the relationship connecting functions to
 * sequences belongs to neither topic on its own, and a per-topic catalogue
 * would have to either omit it or claim a concept it does not hold.
 *
 * So the topics are parts and `luminaCurriculum` is the whole. Assembly is the
 * only place a catalogue is built, and therefore the only place the references
 * are checked -- once, across everything, rather than topic by topic where a
 * cross-topic edge could hide.
 */
export interface TopicSeed {
  readonly topic: Topic;
  readonly concepts: readonly Concept[];
  readonly relationships: readonly ConceptRelationship[];
  readonly assets: readonly KnowledgeAsset[];
  readonly experiences: readonly LearningExperience[];
}
