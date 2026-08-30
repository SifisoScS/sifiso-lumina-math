import {
  conceptRelationship,
  knowledgeCatalog,
  mathematicsDomain,
} from "../domain/mathematical-knowledge.js";
import { functionsTopicSeed } from "./functions-seed.js";
import { sequencesTopicSeed } from "./sequences-seed.js";
import { TopicSeed } from "./topic-seed.js";

const topics: readonly TopicSeed[] = [functionsTopicSeed, sequencesTopicSeed];

/**
 * The edges between topics.
 *
 * These live here and nowhere else, because a relationship from a function to a
 * sequence is not owned by either topic: putting it in one file would make that
 * file claim a concept it does not hold, and putting it in both would give the
 * catalogue two relationships for one connection.
 *
 * They also carry the argument for the second topic. Sequences were not added
 * because a learner needed more pages; they were added because a sequence is a
 * function whose input happens to be a position, so a learner arriving from
 * functions arrives with something that transfers. Each edge below names the
 * transfer rather than asserting a vague affinity -- a `related` edge whose
 * rationale could be swapped for any other pair of concepts is decoration.
 */
const crossTopicRelationships = [
  conceptRelationship({
    id: "relationship.function-bridge-sequence-as-function",
    kind: "concept-bridge",
    sourceConceptId: "concept.function",
    targetConceptId: "concept.sequence-as-function",
    rationale: "One output for each input is the defining condition of a function and is exactly what a sequence does with a position.",
    version: "math-lumina.seed.v1",
  }),
  conceptRelationship({
    id: "relationship.linear-function-related-arithmetic-sequence",
    kind: "related",
    sourceConceptId: "concept.linear-function",
    targetConceptId: "concept.arithmetic-sequence",
    rationale: "The fixed amount added between terms is the gradient of the line the terms sit on, so d and m are the same number reached two ways.",
    version: "math-lumina.seed.v1",
  }),
  conceptRelationship({
    id: "relationship.quadratic-function-related-quadratic-sequence",
    kind: "related",
    sourceConceptId: "concept.quadratic-function",
    targetConceptId: "concept.quadratic-sequence",
    rationale: "A constant second difference in a table and an x-squared term in a rule are the same fact stated numerically and symbolically.",
    version: "math-lumina.seed.v1",
  }),
  conceptRelationship({
    id: "relationship.sequence-as-function-related-function-graph",
    kind: "related",
    sourceConceptId: "concept.sequence-as-function",
    targetConceptId: "concept.function-graph",
    rationale: "A sequence graphs as separated points rather than a line, which is what makes the domain visible on a graph instead of merely stated.",
    version: "math-lumina.seed.v1",
  }),
] as const;

/**
 * Everything a learner can reach, assembled from its topics.
 *
 * `knowledgeCatalog` re-checks every reference across the whole assembly, so a
 * concept, asset, or experience named in one topic and defined in none is
 * caught here rather than at the surface. That check is the reason assembly is
 * a single call in a single place.
 *
 * This was `functionsSeedKnowledge` while functions were all there was. It was
 * renamed when it stopped being true, which is a small thing and the same
 * discipline as everywhere else in this project: a name that claims less than
 * it holds is a gap, and a name that claims something it does not hold is a
 * defect. `functionsTopicSeed` still means what it says, and now holds only
 * what it says.
 */
export const luminaCurriculum = knowledgeCatalog({
  domains: [
    mathematicsDomain({
      id: "mathematics.school-foundations",
      title: "School Mathematics Foundations",
      description: "Foundational school mathematics: rules that turn inputs into outputs, and the patterns those rules describe.",
      version: "math-lumina.seed.v1",
    }),
  ],
  topics: topics.map((seed) => seed.topic),
  concepts: topics.flatMap((seed) => seed.concepts),
  relationships: [...topics.flatMap((seed) => seed.relationships), ...crossTopicRelationships],
  assets: topics.flatMap((seed) => seed.assets),
  experiences: topics.flatMap((seed) => seed.experiences),
});
