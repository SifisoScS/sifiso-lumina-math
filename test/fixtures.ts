import {
  decisionProvenance,
  isoTimestamp,
  policyDefinition,
  uncertainty,
} from "../src/index.js";

export const timestamp = isoTimestamp("2026-08-27T09:00:00.000Z");

export const testProvenance = decisionProvenance({
  references: [{ kind: "knowledge", id: "concept.function" as never }],
  uncertainty: uncertainty("low", "The fixture uses explicit seed knowledge."),
  rationale: "Fixture provenance for a domain-kernel test.",
});

export const autonomyPolicy = policyDefinition({
  id: "policy.learner-autonomy",
  scope: "learner-autonomy",
  version: "policy.v1",
  statement: "A recommendation or offer cannot be treated as a learner choice.",
});
