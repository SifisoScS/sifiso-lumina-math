# Math Lumina Learning Engine — Phase 2, Slice 5 Delivery Report

**Slice:** Learning Experience & Delivery Contract
**Status:** Complete and awaiting approval
**Baseline preserved:** Approved Slice 4 commit `b133ce9`
**Verification:** Strict TypeScript checking and the complete headless suite passed with **54/54 tests**.

## Scope completed

Slice 5 defines the provider-neutral boundary between the engine’s semantic learning decision and a client’s ability to deliver an experience. It extends the existing headless engine without adding a client, UI, transport layer, persistence implementation, evaluation service, or AI system. A client supplies declared semantic capabilities; the engine uses those declarations to retain compatible pedagogically relevant experiences or to return a constrained material decision when none can be delivered.

> **Implemented boundary:** Learning Decision → grounded Learning Opportunity → versioned Learning Experience → declared Delivery Requirement → client.

Delivery is intentionally distinct from learning. The engine never concludes that an experience was completed merely because it was deliverable or displayed, never manufactures learner evidence, and never authorizes a learner-state effect from delivery compatibility or completion evaluation alone.

## 1. LearningExperience contract

`LearningExperience` remains a semantic, versioned Mathematical Knowledge object. Slice 5 adds explicit learner interaction requirements, expected evidence types, and completion semantics. These declarations make the client/engine boundary inspectable without turning an experience into a screen, component, route, or transport payload.

| Contract element | Slice 5 meaning |
|---|---|
| Stable `id` and `version` | Preserve independently addressable experience identity and the exact version used by a historical decision. |
| `deliveryRequirements` | Provider-neutral semantic output/input capabilities necessary for delivery. |
| `learnerInteractionRequirements` | Required learner activity, such as reflection or practice input; these are not UI widgets. |
| `expectedEvidenceTypes` | Evidence categories that a completed experience expects to have been observed through the existing learner-record boundary. |
| `completionSemantics` | States whether interaction and evidence are required, while explicitly prohibiting delivery alone from counting as completion. |

The Functions seed now declares these semantics for all experiences and adds a grounded inverse-function reflection experience. The deliberately small seed therefore contains **13 typed knowledge assets** and **7 learning experiences**.

## 2. Delivery-capability contract

`DeliveryContext` is an alias for the existing `DeliveryCapabilityProfile`. It accepts only declared semantic capabilities from the client; the engine performs no browser, device, platform, accessibility-tool, or provider detection.

| Existing semantic capability vocabulary | Role in this slice |
|---|---|
| `spoken-output` | Client declares that it can present spoken output. |
| `displayed-text` | Client declares that it can present text. |
| `displayed-notation` | Client declares that it can present mathematical notation. |
| `visual-representation` | Client declares that it can present semantic visual representations. |
| `typed-input` | Client declares that it can collect typed learner input. |
| `spoken-input` | Client declares that it can collect spoken learner input. |

The capability context is deliberately client-neutral. A voice client, a text client, or another delivery client can describe the capabilities it offers without requiring any change to the mathematical or pedagogical decision logic.

## 3. Evidence requirements

Completion evaluation accepts only explicitly supplied `observedEvidenceTypes`. It compares them with the experience’s declared expected evidence and returns structured statuses rather than generating evidence, assessing a raw response, assigning a score, or changing learner state.

| Condition | Completion evaluation result | Evidence or state effect |
|---|---|---|
| Experience cannot be delivered | `delivery-unavailable` | No evidence fabricated; no state effect authorized. |
| Deliverable experience lacks required evidence | `missing-required-evidence` | Missing evidence is reported; no state effect authorized. |
| Deliverable experience has expected observed evidence | `evidence-bearing-completion` | Records the declared semantic result only; no state effect authorized by this module. |
| Deliverable experience has no evidence requirement | `delivered-without-evidence` | Does not infer learning or create a learner-state mutation. |

The existing assessment boundary remains unchanged: a learner response may be observed externally, an optional observed outcome may be supplied, and the deterministic engine may then handle it according to previously approved evidence contracts. Slice 5 adds no evaluator, rubric, scorer, assessment provider, or assessment transport.

## 4. Completion semantics

Every `LearningExperience` completion definition explicitly enforces `deliveryAloneIsCompletion: false`. When an experience requires interaction and/or evidence, the constructor requires compatible semantic declarations rather than assuming that delivery is sufficient.

> **Completion rule:** Deliverability and display are prerequisites for a delivery attempt, not proof that learning occurred.

The completion evaluation is intentionally informational. It neither appends immutable learner evidence nor creates an interpretation, commitment, event, offer acceptance, or learner-state delta. Any future state change must still pass the established learner-originated authorization, policy, state-transition, and replay contracts.

## 5. Delivery filtering rules

`filterExperiencesForDelivery` evaluates a supplied pedagogically relevant set one experience at a time. An experience is deliverable only when every declared semantic delivery requirement is present in the declared delivery context. The result retains compatible and incompatible records, including the exact missing capabilities for every incompatible experience.

| Rule | Implemented behaviour |
|---|---|
| Compatible experience | Retained for experience-backed candidate generation. |
| Incompatible experience | Excluded from experience-backed candidates and recorded with missing capability declarations. |
| Unrelated substitution | Prohibited. The filter does not replace an undeliverable experience with unrelated content. |
| Client detection | Prohibited. The engine only reads the capability declaration supplied to it. |
| Pedagogical relevance | Preserved. Delivery filtering operates on the bounded, pedagogically relevant experience set resolved for the decision context. |
| Cross-layer path | Preserved only where a target-layer experience is separately grounded and compatible; delivery filtering does not impose a linear curriculum. |

Candidate opportunities for representations, prerequisites, bridges, pause, and learner choice remain semantic controls. They do not claim that an unavailable experience has been delivered or silently complete an experience.

## 6. Failure behaviour

If no pedagogically relevant `LearningExperience` is compatible with the declared capability context, the engine applies the explicit `policy.delivery-capability` evaluation with outcome `constrained`. It retains a material, knowledge-grounded decision for the requested concept but sets the decision to `declined`, permits no opportunities, produces no offers, and plans no commitment or event.

| Failure output | Guaranteed behaviour |
|---|---|
| Learning decision | Material and still grounded in the requested concept, but `status: declined`. |
| Policy result | Contains `policy.delivery-capability` with `outcome: constrained`. |
| Opportunities and offers | Empty; nothing unavailable is offered. |
| Learner evidence | None fabricated. |
| State transition / events | `not-committed`; no commitment and no event. |
| Unrelated fallback | None. The engine does not silently downgrade to unrelated content. |

This is deliberately not a safe non-material decision because the requested mathematical concept remains fully resolved and interpretable. The constraint describes an unavailable delivery route, not a lack of knowledge grounding.

## 7. Version and provenance changes

The structured provenance vocabulary now includes `learning-experience`, `learning-experience-version`, and `delivery-compatibility` references. Material decisions retain actual compatible experience identity/version where it is offered. An incompatible delivery context records the unavailable experience/version through a `delivery-compatibility` reference. No hidden reasoning, client internals, or chain-of-thought is stored.

| Provenance reference | Example role |
|---|---|
| `learning-experience` | Identifies the semantic experience grounded in a material decision. |
| `learning-experience-version` | Identifies the exact historical experience version, such as `experience.function.mechanics-notation.math-lumina.seed.v1`. |
| `delivery-compatibility` | Identifies an experience/version unavailable under the declared semantic capability context. |

The test suite constructs a later version of the mechanics experience and confirms a prior decision remains interpretable using only the original `v1` reference while the later decision cites `v2`.

## 8. Files changed

| Status | Files |
|---|---|
| Created | `src/decisioning/delivery-compatibility.ts`; `test/slice5-learning-experience-delivery.test.ts`; `demo/slice5-learning-experience-delivery.ts`; `demo/slice5-learning-experience-delivery.json`; `SLICE-5-REPORT.md`. |
| Changed | `package.json`; `src/domain/mathematical-knowledge.ts`; `src/domain/provenance.ts`; `src/decisioning/opportunities.ts`; `src/decisioning/decision-construction.ts`; `src/decisioning/engine.ts`; `src/index.ts`; `src/seed/functions-seed.ts`; `test/mathematical-knowledge.test.ts`. |

The package description now accurately identifies Slices 1–5, and `pnpm demo:slice5` runs the captured deterministic demonstration.

## 9. Tests added

`test/slice5-learning-experience-delivery.test.ts` adds seven headless contract tests. They cover the versioned experience contract; declared capability filtering without client detection; compatible selection; incompatible rejection without silent downgrade; evidence-bearing completion versus mere delivery; unavailable delivery; no fabricated evidence or state effects; historical experience-version provenance; and rejection of invalid completion declarations.

The existing suite continues to cover all approved Slice 1–4 contracts, including safe non-material outcomes, learner autonomy, immutable learner evidence, assessment boundaries, deterministic state commitments, replay, grounded knowledge, and pedagogical compatibility.

## 10. Full verification results

| Verification command or check | Result |
|---|---|
| `pnpm typecheck` | Passed under strict TypeScript settings. |
| `pnpm test` | Passed: **54 tests**, 0 failed, 0 skipped, 0 cancelled. |
| `pnpm check` | Passed: strict TypeScript check followed by the entire 54-test suite. |
| `pnpm demo:slice5` | Passed and emitted the compatible and incompatible delivery scenarios as JSON. |
| JSON validation | Passed: `demo/slice5-learning-experience-delivery.json` parses as valid JSON. |
| `git diff --check` | Passed: no whitespace errors. |
| Prohibited-module path scan | Passed: no `ui`, `api`, `persistence`, `infrastructure`, `providers`, or `cms` module was introduced under `src`, `demo`, or `test`. |

During the first full test run after delivery filtering was introduced, two approved regression assertions exposed an ungrounded reflection path and an overly narrow current-layer delivery filter. The implementation was refined strictly within Slice 5 by adding the explicit, versioned inverse-function reflection experience and restoring separately grounded compatible cross-layer candidates; no prior contract was weakened. The final full validation passed with 54/54 tests.

## 11. Compatible delivery demonstration

Scenario A declares `displayed-text` and `displayed-notation` for a learner focused on Function Mechanics. The engine identifies `experience.function.mechanics-notation` at version `math-lumina.seed.v1` as compatible, returns a material `offer-available` decision for `concept.function`, and emits grounded semantic experience opportunities and structured experience/version provenance.

The demonstration intentionally does not create a learner commitment or event because no learner choice has been confirmed. It reports `learnerEvidenceFabricated: false`.

| Demonstration fact | Result |
|---|---|
| Declared capabilities | `displayed-text`, `displayed-notation` |
| Compatible experience | `experience.function.mechanics-notation` (`math-lumina.seed.v1`) |
| Decision | Material, `offer-available` |
| State effect | No commitment, no events |
| Provenance | Learning-experience and learning-experience-version references |

## 12. Incompatible delivery demonstration

Scenario B declares only `displayed-text` for the same Function Mechanics context. The required `displayed-notation` capability is absent. The engine records the mechanics experience as incompatible, declines the material decision under the explicit delivery-capability constraint, creates no opportunities or offers, and leaves learner state unchanged.

| Demonstration fact | Result |
|---|---|
| Declared capability | `displayed-text` only |
| Missing requirement | `displayed-notation` |
| Compatible experience count | 0 |
| Decision | Material, `declined` |
| Offers / events / commitment | 0 / 0 / none |
| Provenance | Delivery-compatibility reference for the unavailable experience version |

The captured JSON is `demo/slice5-learning-experience-delivery.json`. It contains semantic capability declarations and engine results only; it contains no client implementation, device data, interface fields, or provider invocation.

## 13. Architectural deviations

**None.** Slice 5 uses the previously approved Mathematical Knowledge, Pedagogical Model, Learning Decisioning, Learner Record, and Policy & Governance boundaries. It introduces only the approved semantic delivery/completion declarations, compatibility filtering, constrained failure behavior, and structured provenance necessary for the issued slice.

No UI, React, Base44, browser or device detection, API transport, persistence, database, CMS, graph database, real AI, prompts, external assessment service, event bus, or Slice 6 work was introduced.

## 14. OPEN DECISIONS

| Open decision | Slice 5 treatment |
|---|---|
| Capability vocabulary expansion and formal accessibility-equivalence policy | Not invented. Slice 5 uses the existing approved semantic vocabulary only. |
| Whether a client may negotiate alternatives, request capability changes, or provide a human handoff | Not implemented. The engine returns an explicit constraint and does not perform delivery orchestration. |
| Formal mapping between specific learner interactions and assessment-boundary observation schemas | Not decided. The completion contract names evidence categories but does not create assessment logic. |
| Evidence sufficiency, quality thresholds, scoring, or correctness rules | Not decided. Slice 5 accepts only supplied observed evidence types and implements no evaluator. |
| Cross-version experience equivalence or migration | Not implemented. Historical decisions retain the exact experience/version reference they used. |
| Delivery execution, retries, delivery receipts, or content rendering | Not implemented. These belong outside the engine boundary. |
| Persistence, API, UI, external assessment service, real AI/provider, prompts, queue, CMS, or database | Explicitly not implemented. |

> **Approval gate:** Slice 5 is complete. Work stops here pending explicit approval. No Slice 6, UI, React/Base44, persistence, API transport, CMS, database, graph database, real AI/provider, prompt system, external assessment service, or additional architecture work will begin without your authorization.
