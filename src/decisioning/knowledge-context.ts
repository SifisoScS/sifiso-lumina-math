import {
  Concept,
  ConceptRelationship,
  KnowledgeAsset,
  KnowledgeCatalog,
  KnowledgeRelationshipSemantic,
  LearningExperience,
  PedagogicalLayer,
} from "../domain/mathematical-knowledge.js";
import { readonlyList, StableId, VersionRef } from "../domain/primitives.js";

export interface VersionedKnowledgeReference {
  readonly objectId: StableId;
  readonly version: VersionRef;
}

/** An explicit graph edge between independently addressable knowledge objects. */
export interface ResolvedKnowledgeRelation {
  readonly semantic: KnowledgeRelationshipSemantic;
  readonly sourceId: StableId;
  readonly targetId: StableId;
  readonly relationshipId?: StableId;
  readonly version: VersionRef;
}

export interface KnowledgeContextResolution {
  readonly targetConcept: Concept;
  readonly prerequisiteRelationships: readonly ConceptRelationship[];
  readonly prerequisiteConcepts: readonly Concept[];
  readonly relatedRelationships: readonly ConceptRelationship[];
  readonly relatedConcepts: readonly Concept[];
  readonly bridgeRelationships: readonly ConceptRelationship[];
  readonly bridgeConcepts: readonly Concept[];
  readonly representationAssets: readonly KnowledgeAsset[];
  readonly exampleAssets: readonly KnowledgeAsset[];
  readonly nonExampleAssets: readonly KnowledgeAsset[];
  readonly procedureAssets: readonly KnowledgeAsset[];
  readonly applicationAssets: readonly KnowledgeAsset[];
  /** Included only when explicitly supported by approved external evidence context. */
  readonly misconceptionAssets: readonly KnowledgeAsset[];
  readonly examPatternAssets: readonly KnowledgeAsset[];
  readonly relevantExperiences: readonly LearningExperience[];
  readonly semanticRelations: readonly ResolvedKnowledgeRelation[];
  readonly versionReferences: readonly VersionedKnowledgeReference[];
}

export interface KnowledgeContextResolutionInput {
  readonly catalog: KnowledgeCatalog;
  readonly conceptId: StableId;
  readonly pedagogicalLayer?: PedagogicalLayer;
  /** Misconception assets are not inferred from an error or raw learner response. */
  readonly supportedMisconceptionAssetIds?: readonly StableId[];
}

function publishedAssetsFor(
  catalog: KnowledgeCatalog,
  conceptId: StableId,
  layer: PedagogicalLayer | undefined,
): readonly KnowledgeAsset[] {
  return readonlyList(catalog.assets.filter((asset) =>
    asset.status === "published" && asset.conceptIds.includes(conceptId) &&
    (layer === undefined || asset.supportedLayers.includes(layer)),
  ));
}

function publishedExperiencesFor(
  catalog: KnowledgeCatalog,
  conceptId: StableId,
  layer: PedagogicalLayer | undefined,
): readonly LearningExperience[] {
  return readonlyList(catalog.experiences.filter((experience) =>
    experience.status === "published" && experience.targetConceptIds.includes(conceptId) &&
    (layer === undefined || experience.pedagogicalLayers.includes(layer)),
  ));
}

function conceptsById(catalog: KnowledgeCatalog): ReadonlyMap<StableId, Concept> {
  return new Map(catalog.concepts.filter((concept) => concept.status === "published").map((concept) => [concept.id, concept]));
}

function versionReferences(items: readonly { readonly id: StableId; readonly version: VersionRef }[]): readonly VersionedKnowledgeReference[] {
  const references = new Map<StableId, VersionedKnowledgeReference>();
  for (const item of items) {
    references.set(item.id, Object.freeze({ objectId: item.id, version: item.version }));
  }
  return readonlyList([...references.values()]);
}

function assetSemantic(asset: KnowledgeAsset): KnowledgeRelationshipSemantic | undefined {
  switch (asset.kind) {
    case "representation": return "represents";
    case "example":
    case "application": return "exemplifies";
    case "non-example": return "contrasts-with";
    case "procedure":
    case "misconception":
    case "exam-pattern": return undefined;
  }
}

/**
 * Resolves only the local, decision-relevant knowledge graph around a target
 * concept. It is bounded and deterministic; it is not an unrestricted graph
 * query system and it neither evaluates learner responses nor infers a
 * misconception from an error.
 */
export function resolveKnowledgeContext(input: KnowledgeContextResolutionInput): KnowledgeContextResolution | undefined {
  const targetConcept = input.catalog.concepts.find((concept) =>
    concept.id === input.conceptId && concept.status === "published",
  );
  if (targetConcept === undefined) {
    return undefined;
  }
  const publishedConcepts = conceptsById(input.catalog);
  const prerequisiteRelationships = readonlyList(input.catalog.relationships.filter((relationship) =>
    relationship.status === "published" && relationship.kind === "prerequisite" && relationship.targetConceptId === input.conceptId,
  ));
  const relatedRelationships = readonlyList(input.catalog.relationships.filter((relationship) =>
    relationship.status === "published" && relationship.kind === "related" &&
    (relationship.sourceConceptId === input.conceptId || relationship.targetConceptId === input.conceptId),
  ));
  const bridgeRelationships = readonlyList(input.catalog.relationships.filter((relationship) =>
    relationship.status === "published" && relationship.kind === "concept-bridge" && relationship.sourceConceptId === input.conceptId,
  ));
  const prerequisiteConcepts = readonlyList(prerequisiteRelationships.flatMap((relationship) => {
    const concept = publishedConcepts.get(relationship.sourceConceptId);
    return concept === undefined ? [] : [concept];
  }));
  const relatedConcepts = readonlyList(relatedRelationships.flatMap((relationship) => {
    const relatedId = relationship.sourceConceptId === input.conceptId
      ? relationship.targetConceptId
      : relationship.sourceConceptId;
    const concept = publishedConcepts.get(relatedId);
    return concept === undefined ? [] : [concept];
  }));
  const bridgeConcepts = readonlyList(bridgeRelationships.flatMap((relationship) => {
    const concept = publishedConcepts.get(relationship.targetConceptId);
    return concept === undefined ? [] : [concept];
  }));
  const assets = publishedAssetsFor(input.catalog, input.conceptId, input.pedagogicalLayer);
  const byKind = (kind: KnowledgeAsset["kind"]) => readonlyList(assets.filter((asset) => asset.kind === kind));
  const supportedMisconceptionIds = new Set(input.supportedMisconceptionAssetIds ?? []);
  const misconceptionAssets = readonlyList(byKind("misconception").filter((asset) => supportedMisconceptionIds.has(asset.id)));
  const relevantExperiences = publishedExperiencesFor(input.catalog, input.conceptId, input.pedagogicalLayer);
  const semanticRelations: ResolvedKnowledgeRelation[] = [
    ...prerequisiteRelationships.map((relationship) => Object.freeze({
      semantic: relationship.semanticKind,
      sourceId: relationship.sourceConceptId,
      targetId: relationship.targetConceptId,
      relationshipId: relationship.id,
      version: relationship.version,
    })),
    ...relatedRelationships.map((relationship) => Object.freeze({
      semantic: relationship.semanticKind,
      sourceId: relationship.sourceConceptId,
      targetId: relationship.targetConceptId,
      relationshipId: relationship.id,
      version: relationship.version,
    })),
    ...bridgeRelationships.map((relationship) => Object.freeze({
      semantic: relationship.semanticKind,
      sourceId: relationship.sourceConceptId,
      targetId: relationship.targetConceptId,
      relationshipId: relationship.id,
      version: relationship.version,
    })),
    ...assets.flatMap((asset) => {
      const semantic = assetSemantic(asset);
      return semantic === undefined ? [] : asset.conceptIds.map((conceptId) => Object.freeze({
        semantic,
        sourceId: asset.id,
        targetId: conceptId,
        version: asset.version,
      }));
    }),
  ];
  return Object.freeze({
    targetConcept,
    prerequisiteRelationships,
    prerequisiteConcepts,
    relatedRelationships,
    relatedConcepts,
    bridgeRelationships,
    bridgeConcepts,
    representationAssets: byKind("representation"),
    exampleAssets: byKind("example"),
    nonExampleAssets: byKind("non-example"),
    procedureAssets: byKind("procedure"),
    applicationAssets: byKind("application"),
    misconceptionAssets,
    examPatternAssets: byKind("exam-pattern"),
    relevantExperiences,
    semanticRelations: readonlyList(semanticRelations),
    versionReferences: versionReferences([
      targetConcept,
      ...prerequisiteRelationships,
      ...relatedRelationships,
      ...bridgeRelationships,
      ...assets,
      ...relevantExperiences,
    ]),
  });
}
