import {
  DomainValidationError,
  readonlyList,
  requiredText,
  StableId,
  stableId,
  uniqueStableIds,
  VersionRef,
  versionRef,
} from "./primitives.js";

/**
 * Pedagogical layers are domain concepts. They deliberately do not represent
 * routes, tabs, screens, or any other presentation concern.
 */
export type PedagogicalLayer = "intuition" | "mechanics" | "exam-patterns";

export type ConceptRelationshipKind =
  | "prerequisite"
  | "concept-bridge"
  | "related";

export type KnowledgeAssetKind =
  | "representation"
  | "example"
  | "non-example"
  | "procedure"
  | "misconception"
  | "application"
  | "exam-pattern";

export type LearningExperienceIntent =
  | "intuition"
  | "mechanics"
  | "exam-patterns"
  | "practice"
  | "reflection"
  | "low-energy"
  | "concept-bridge";

/**
 * A generic capability requirement describes learning material needs without
 * referring to any device, browser, framework, or user-interface component.
 */
export type DeliveryRequirement =
  | "spoken-output"
  | "displayed-text"
  | "displayed-notation"
  | "visual-representation"
  | "typed-input"
  | "spoken-input";

export interface MathematicsDomain {
  readonly id: StableId;
  readonly title: string;
  readonly description: string;
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

export interface Topic {
  readonly id: StableId;
  readonly domainId: StableId;
  readonly title: string;
  readonly description: string;
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

export interface Concept {
  readonly id: StableId;
  readonly topicId: StableId;
  readonly title: string;
  readonly conceptualDescription: string;
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

/**
 * Prerequisites and concept bridges are deliberately relationship kinds, not
 * navigation links or unqualified lists on a UI-oriented content record.
 */
export interface ConceptRelationship {
  readonly id: StableId;
  readonly kind: ConceptRelationshipKind;
  readonly sourceConceptId: StableId;
  readonly targetConceptId: StableId;
  readonly rationale: string;
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

/**
 * Knowledge assets are versioned content owned by the knowledge domain.
 * A misconception asset describes a possible conceptual pattern; it never
 * labels an individual learner.
 */
export interface KnowledgeAsset {
  readonly id: StableId;
  readonly kind: KnowledgeAssetKind;
  readonly title: string;
  readonly content: string;
  readonly conceptIds: readonly StableId[];
  readonly supportedLayers: readonly PedagogicalLayer[];
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

/**
 * A learning experience is the stable, versioned object decisioning can later
 * offer. It is not a page, route, activity widget, or UI configuration.
 */
export interface LearningExperience {
  readonly id: StableId;
  readonly title: string;
  readonly intent: LearningExperienceIntent;
  readonly targetConceptIds: readonly StableId[];
  readonly knowledgeAssetIds: readonly StableId[];
  readonly pedagogicalLayers: readonly PedagogicalLayer[];
  readonly deliveryRequirements: readonly DeliveryRequirement[];
  readonly version: VersionRef;
  readonly status: "published" | "retired";
}

interface VersionedKnowledgeInput {
  readonly id: string;
  readonly version: string;
  readonly status?: "published" | "retired";
}

const publishedByDefault = (status: "published" | "retired" | undefined): "published" | "retired" =>
  status ?? "published";

function distinctLayers(layers: readonly PedagogicalLayer[], label: string): readonly PedagogicalLayer[] {
  if (layers.length === 0) {
    throw new DomainValidationError(`${label} must include at least one pedagogical layer.`);
  }
  const unique = new Set(layers);
  if (unique.size !== layers.length) {
    throw new DomainValidationError(`${label} must not include duplicate pedagogical layers.`);
  }
  return readonlyList(layers);
}

function distinctRequirements(
  requirements: readonly DeliveryRequirement[],
): readonly DeliveryRequirement[] {
  const unique = new Set(requirements);
  if (unique.size !== requirements.length) {
    throw new DomainValidationError("Delivery requirements must not contain duplicates.");
  }
  return readonlyList(requirements);
}

export function mathematicsDomain(input: {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly version: string;
  readonly status?: "published" | "retired";
}): MathematicsDomain {
  return Object.freeze({
    id: stableId(input.id, "Mathematics domain identifier"),
    title: requiredText(input.title, "Mathematics domain title"),
    description: requiredText(input.description, "Mathematics domain description"),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export function topic(input: {
  readonly id: string;
  readonly domainId: string;
  readonly title: string;
  readonly description: string;
  readonly version: string;
  readonly status?: "published" | "retired";
}): Topic {
  return Object.freeze({
    id: stableId(input.id, "Topic identifier"),
    domainId: stableId(input.domainId, "Topic domain identifier"),
    title: requiredText(input.title, "Topic title"),
    description: requiredText(input.description, "Topic description"),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export function concept(input: {
  readonly id: string;
  readonly topicId: string;
  readonly title: string;
  readonly conceptualDescription: string;
  readonly version: string;
  readonly status?: "published" | "retired";
}): Concept {
  return Object.freeze({
    id: stableId(input.id, "Concept identifier"),
    topicId: stableId(input.topicId, "Concept topic identifier"),
    title: requiredText(input.title, "Concept title"),
    conceptualDescription: requiredText(input.conceptualDescription, "Conceptual description"),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export function conceptRelationship(input: {
  readonly id: string;
  readonly kind: ConceptRelationshipKind;
  readonly sourceConceptId: string;
  readonly targetConceptId: string;
  readonly rationale: string;
  readonly version: string;
  readonly status?: "published" | "retired";
}): ConceptRelationship {
  const sourceConceptId = stableId(input.sourceConceptId, "Relationship source concept identifier");
  const targetConceptId = stableId(input.targetConceptId, "Relationship target concept identifier");
  if (sourceConceptId === targetConceptId) {
    throw new DomainValidationError("A concept relationship cannot relate a concept to itself.");
  }
  return Object.freeze({
    id: stableId(input.id, "Concept relationship identifier"),
    kind: input.kind,
    sourceConceptId,
    targetConceptId,
    rationale: requiredText(input.rationale, "Concept relationship rationale"),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export function knowledgeAsset(input: {
  readonly id: string;
  readonly kind: KnowledgeAssetKind;
  readonly title: string;
  readonly content: string;
  readonly conceptIds: readonly string[];
  readonly supportedLayers: readonly PedagogicalLayer[];
  readonly version: string;
  readonly status?: "published" | "retired";
}): KnowledgeAsset {
  if (input.conceptIds.length === 0) {
    throw new DomainValidationError("A knowledge asset must reference at least one concept.");
  }
  const conceptIds = uniqueStableIds(
    input.conceptIds.map((id) => stableId(id, "Knowledge asset concept identifier")),
    "Knowledge asset concept identifiers",
  );
  return Object.freeze({
    id: stableId(input.id, "Knowledge asset identifier"),
    kind: input.kind,
    title: requiredText(input.title, "Knowledge asset title"),
    content: requiredText(input.content, "Knowledge asset content"),
    conceptIds,
    supportedLayers: distinctLayers(input.supportedLayers, "Knowledge asset supported layers"),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export function learningExperience(input: {
  readonly id: string;
  readonly title: string;
  readonly intent: LearningExperienceIntent;
  readonly targetConceptIds: readonly string[];
  readonly knowledgeAssetIds: readonly string[];
  readonly pedagogicalLayers: readonly PedagogicalLayer[];
  readonly deliveryRequirements?: readonly DeliveryRequirement[];
  readonly version: string;
  readonly status?: "published" | "retired";
}): LearningExperience {
  if (input.targetConceptIds.length === 0) {
    throw new DomainValidationError("A learning experience must target at least one concept.");
  }
  if (input.knowledgeAssetIds.length === 0) {
    throw new DomainValidationError("A learning experience must reference at least one knowledge asset.");
  }
  return Object.freeze({
    id: stableId(input.id, "Learning experience identifier"),
    title: requiredText(input.title, "Learning experience title"),
    intent: input.intent,
    targetConceptIds: uniqueStableIds(
      input.targetConceptIds.map((id) => stableId(id, "Learning experience target concept identifier")),
      "Learning experience target concept identifiers",
    ),
    knowledgeAssetIds: uniqueStableIds(
      input.knowledgeAssetIds.map((id) => stableId(id, "Learning experience knowledge asset identifier")),
      "Learning experience knowledge asset identifiers",
    ),
    pedagogicalLayers: distinctLayers(input.pedagogicalLayers, "Learning experience pedagogical layers"),
    deliveryRequirements: distinctRequirements(input.deliveryRequirements ?? []),
    version: versionRef(input.version),
    status: publishedByDefault(input.status),
  });
}

export interface KnowledgeCatalog {
  readonly domains: readonly MathematicsDomain[];
  readonly topics: readonly Topic[];
  readonly concepts: readonly Concept[];
  readonly relationships: readonly ConceptRelationship[];
  readonly assets: readonly KnowledgeAsset[];
  readonly experiences: readonly LearningExperience[];
}

/**
 * Validates only domain-kernel referential integrity. It deliberately does not
 * make editorial, curriculum, prerequisite-blocking, or delivery-policy rules.
 */
export function knowledgeCatalog(input: KnowledgeCatalog): KnowledgeCatalog {
  const domainIds = new Set(input.domains.map((domain) => domain.id));
  const topicIds = new Set(input.topics.map((item) => item.id));
  const conceptIds = new Set(input.concepts.map((item) => item.id));
  const assetIds = new Set(input.assets.map((item) => item.id));

  if (domainIds.size !== input.domains.length || topicIds.size !== input.topics.length ||
      conceptIds.size !== input.concepts.length || assetIds.size !== input.assets.length) {
    throw new DomainValidationError("Knowledge catalog entities must have unique stable identifiers by type.");
  }

  for (const item of input.topics) {
    if (!domainIds.has(item.domainId)) {
      throw new DomainValidationError(`Topic '${item.id}' references an unknown mathematics domain.`);
    }
  }
  for (const item of input.concepts) {
    if (!topicIds.has(item.topicId)) {
      throw new DomainValidationError(`Concept '${item.id}' references an unknown topic.`);
    }
  }
  for (const item of input.relationships) {
    if (!conceptIds.has(item.sourceConceptId) || !conceptIds.has(item.targetConceptId)) {
      throw new DomainValidationError(`Relationship '${item.id}' references an unknown concept.`);
    }
  }
  for (const item of input.assets) {
    if (item.conceptIds.some((conceptId) => !conceptIds.has(conceptId))) {
      throw new DomainValidationError(`Knowledge asset '${item.id}' references an unknown concept.`);
    }
  }
  for (const item of input.experiences) {
    if (item.targetConceptIds.some((conceptId) => !conceptIds.has(conceptId))) {
      throw new DomainValidationError(`Learning experience '${item.id}' references an unknown concept.`);
    }
    if (item.knowledgeAssetIds.some((assetId) => !assetIds.has(assetId))) {
      throw new DomainValidationError(`Learning experience '${item.id}' references an unknown knowledge asset.`);
    }
  }

  return Object.freeze({
    domains: readonlyList(input.domains),
    topics: readonlyList(input.topics),
    concepts: readonlyList(input.concepts),
    relationships: readonlyList(input.relationships),
    assets: readonlyList(input.assets),
    experiences: readonlyList(input.experiences),
  });
}
