import assert from "node:assert/strict";
import test from "node:test";

import {
  commandReference,
  decisionProvenance,
  DomainValidationError,
  isoTimestamp,
  provenanceReference,
  stableId,
  uncertainty,
  versionRef,
} from "../src/index.js";

test("stable identifiers and version references accept canonical lower-case syntax", () => {
  assert.equal(stableId("concept.function"), "concept.function");
  assert.equal(versionRef("math-lumina.seed.v1"), "math-lumina.seed.v1");
  assert.equal(commandReference("interaction.0001"), "interaction.0001");
});

test("stable identifiers reject blanks and UI-oriented non-canonical syntax", () => {
  assert.throws(() => stableId(" "), DomainValidationError);
  assert.throws(() => stableId("Home Page"), DomainValidationError);
  assert.throws(() => stableId("/topics/functions"), DomainValidationError);
});

test("timestamps and uncertainty statements are validated value objects", () => {
  assert.equal(isoTimestamp("2026-08-27T09:00:00.000Z"), "2026-08-27T09:00:00.000Z");
  assert.throws(() => isoTimestamp("not-a-timestamp"), DomainValidationError);
  assert.deepEqual(uncertainty("medium", "Evidence is incomplete."), {
    level: "medium",
    rationale: "Evidence is incomplete.",
  });
});

test("decision provenance requires observable references rather than hidden reasoning", () => {
  const provenance = decisionProvenance({
    id: "provenance.test.observable-basis",
    references: [provenanceReference("knowledge", "concept.function")],
    uncertainty: uncertainty("low", "Known concept context is available."),
    rationale: "Uses a resolved concept reference.",
  });
  assert.equal(provenance.references[0]?.kind, "knowledge");
  assert.throws(
    () => decisionProvenance({
      id: "provenance.test.missing-basis",
      references: [],
      uncertainty: uncertainty("unknown", "No basis."),
      rationale: "Missing observable basis.",
    }),
    DomainValidationError,
  );
});
