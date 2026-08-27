# Math Lumina Learning Engine — Phase 2, Slice 3 Delivery Report

**Slice:** Learner State Evolution & Event Loop  
**Status:** Complete and awaiting approval  
**Implementation baseline:** Slice 2 commit `da5d5f9`  
**Verification:** Strict TypeScript checking and the complete headless suite passed with **40/40 tests**.

## Scope completed

Slice 3 proves that the headless engine can process a sequence of interactions for one learner, preserve learner-owned evidence and derived interpretations separately, construct later decisions from accumulated context, plan authorized state changes, record causal historical events, and reconstruct the same supported learner state from ordered history.

The implementation remains a **domain and behaviour kernel**. It includes no UI, React, Base44 dependency, API transport, database, persistence adapter, event bus, message queue, real AI provider, prompt, mathematics evaluator, or scoring algorithm.

> **Implemented lifecycle:** Interaction → Evidence → Decision → Approved State Effect → Historical Event → Updated Learner Context → Subsequent Decision.

## 1. Exact contract changes

| Contract | Slice 3 extension | Constraint preserved |
|---|---|---|
| `DecisionProvenance` | Added immutable `id`. | Causal records can reference provenance without copying a large mutable object or exposing chain-of-thought. |
| `StateCommitment` | Added required `contextVersion`, `stateDelta`, and `provenanceId`. `changedDimensions` must exactly match the state delta. | A commitment is the sole authoritative, immutable resulting-state payload. It retains the decision link, authorization, version, and structured provenance. |
| `LearnerStateDelta` | Added an explicit immutable delta with set/clear values for engagement focus, active concept, active pedagogical layer, and additive evidence/interpretation identifiers. | No mastery percentage, score, ranking, psychological state, or opaque inferred state was added. |
| `HistoricalEvent` | Added optional immutable causal references for interaction command, Learning Decision, provenance, and context version. | Events remain chronological/audit records, not competing state snapshots. |
| `PracticeAttempt` | Added optional `observedOutcome`. Absent outcome resolves explicitly to `not-assessed`. | Learner response remains immutable; raw response is not an assessment result. |
| `ObservedPracticeOutcome` | Added `evidence-of-understanding` and `evidence-of-uncertainty`, each with `assessmentBoundaryRef` and `outcomeEvidenceRef`. | The engine consumes externally supplied observations. It does not calculate correctness. |
| `AssessmentBoundary` | Added a provider-neutral `AssessmentBoundary` port contract. | No implementation, rubric, model, provider, or external integration is present. |
| `EngineExecutionResult` | Added qualified `derivedInterpretations` and evidence-evaluation diagnostics. | Inferences are explicitly separated from observed learner evidence. |

## 2. StateCommitment representation

A StateCommitment is now replay-capable without being persistence-dependent. It contains the decision reference that caused it, the learner-authorized basis, the deterministic context version, an explicit state delta, its timestamp, structured provenance, and a stable provenance reference.

| Commitment field | Replay/audit role |
|---|---|
| `id` | Identifies the unique authorized transition. |
| `authorization` | Demonstrates that the effect arose from an explicit command, accepted evidence, or confirmed learner choice—not AI. |
| `learningDecisionId` | Preserves the causal decision identity. |
| `contextVersion` | Identifies the applicable deterministic rule/context version. |
| `changedDimensions` | Human-readable list that must exactly agree with the delta. |
| `stateDelta` | The authoritative resulting-state information used in replay. |
| `provenance` / `provenanceId` | Retains structured evidence, knowledge, policy, and boundary references without private reasoning. |

## 3. HistoricalEvent additions and causal chain

A historical event records the chronological audit trail. It does not reconstruct state itself. State reconstruction uses only ordered StateCommitment deltas referenced by `state-committed` events.

> **Replay authority:** Historical Events → ordered State Commitments → resulting Learner State.

State-affecting events now preserve immutable references to the interaction command, Learning Decision, StateCommitment, provenance, and context version, plus applicable learner, timestamp, concept, and evidence references. The learner-record invariant rejects a state-affecting event whose causal references do not match its referenced commitment. It also rejects a commitment without a corresponding `state-committed` event.

## 4. Provenance linkage

Material decisions cite structured references to the interaction command, trusted actor context, knowledge, observed learner evidence, pedagogical guidance, policy, delivery capabilities, and—where supplied—assessment-boundary and assessment-evidence references. Qualified derived interpretations have their own provenance identity and are cited as **derived interpretations**, not as observations.

For an externally observed practice outcome, the Learning Decision retains both `assessment-boundary` and `assessment-evidence` references. The StateCommitment carries the resulting structured provenance, and each causal event refers to its immutable provenance identity. No private chain-of-thought is stored.

## 5. Observed-practice-outcome model and assessment boundary

| Case | Engine treatment |
|---|---|
| No `observedOutcome` | Explicitly `not-assessed`; raw response cannot imply success or failure. |
| `evidence-of-understanding` outcome | An externally supplied, provenance-linked observation. It can create a qualified interpretation that supports a later optional layer-movement opportunity. |
| `evidence-of-uncertainty` outcome | An externally supplied, provenance-linked observation. It can create a qualified interpretation that supports a later optional revisit opportunity. |
| High qualitative confidence plus uncertainty observation | Two distinct observed records. The engine produces high uncertainty and a qualified conflict interpretation, never a numerical score, “wrong” label, readiness claim, or fabricated misconception. |

The `AssessmentBoundary` is deliberately only an interface. Slice 3 does not call it and does not include an evaluator, rubric, solver, provider, AI assessment mechanism, or scoring model.

## 6. Evidence semantics and deterministic adaptation

| Information class | Slice 3 treatment |
|---|---|
| Observed | Learner reflection, raw practice response, optional external practice outcome, confidence report, learner choice, historical event, and supplied assessment-boundary references. |
| Inferred | Qualified curiosity thread, qualified understanding signal, confidence/practice conflict signal, and adaptation rationale. |
| Prohibited conversion | An inference is never stored as learner-owned evidence, and raw practice response is never converted into a correct/incorrect assessment. |

`evidence-evaluation.ts` is a deterministic rule module. It uses only approved observed facts. It does not call AI, parse raw answers as mathematics correctness, create mastery scores, rank learners, infer psychological state, or automatically choose a learner path. Its signals can make later **offers** differ—for example, a reflection can support a representation opportunity, an external uncertainty observation can support revisit, and external understanding evidence can support an optional move toward another pedagogical layer.

## 7. Learner-record evolution and event loop

`evolveLearnerRecord` applies only a newly planned, validated execution effect to an immutable returned LearnerRecord. It appends submitted learner-owned evidence, causal events, StateCommitment, and qualified derived interpretations to their respective collections. It neither persists anything nor mutates the existing record. A replayed command returns the existing record unchanged.

The engine therefore maintains the approved separation:

| Learner-record component | Role |
|---|---|
| Evidence | Immutable learner-owned observation; includes practice response and optional external assessment observation only as a distinct field. |
| Historical events | Chronological causal audit entries. |
| Derived interpretations | Qualified, revisable engine interpretation with supporting evidence and provenance. |
| Current state | Present projection resulting from approved commitment deltas. |
| State commitments | Authoritative approved changes from which replay reconstructs state. |

## 8. Replay algorithm and impact

`replayLearnerHistory` is a pure, headless operation. It accepts an initial state, chronologically ordered historical events, and StateCommitments. It validates learner ownership, ordering, unique commitment IDs, mandatory causal references, and agreement between each `state-committed` event and its referenced commitment. It then applies each commitment’s immutable `stateDelta` exactly once.

The replay operation rejects incomplete or ambiguous history. In particular, it cannot fabricate a missing commitment, reuse a commitment twice, apply a commitment not represented by a state-committed event, or use an event whose decision/provenance/context references disagree with the commitment.

The deterministic demonstration produces four commitments across five interactions, then replays its history. The replay result is structurally equivalent to the evolved final learner state.

## 9. Multi-step scenario results

| Scenario | Result |
|---|---|
| A — Progressive learning | Multiple interactions for the same learner accumulate evidence, commitments, causal events, and updated context. Later decisions are evaluated from the evolved LearnerRecord. |
| B — Reflection changes direction | Before reflection, a guidance request does not offer representation exploration. Submitting a learner reflection records observed evidence and a qualified curiosity interpretation. A later guidance request offers representation exploration, but does not commit it automatically. |
| C — Practice contradicts confidence | A high qualitative confidence report and a separate external `evidence-of-uncertainty` outcome coexist. The subsequent decision carries high uncertainty, retains assessment provenance, and offers revisit without declaring failure, readiness, or misconception. |
| D — Learner autonomy | An engine offer remains only an offer. A second commitment is created only after a validated explicit learner `select-offer` choice. |
| E — Replay | Events and commitments reproduce the same final supported CurrentLearnerState. Replaying with missing commitments is rejected. |
| Idempotent repeat | Resubmission with the same command reference returns `replayed`; record evolution is unchanged and no second evidence, event, or commitment is added. |
| Policy rejection during evolution | A request lacking decision permission returns a declined material decision and produces no commitment or record change. |

## 10. Tests added and full verification

| Test artifact | Coverage |
|---|---|
| `test/slice3-event-loop.test.ts` | Practice outcomes; no-assessment semantics; reflection adaptation; confidence/practice conflict; raw-response non-assessment; explicit learner choice; causal event chain; state evolution; replay equivalence/determinism; missing-history rejection; idempotency; evolving policy rejection. |
| Existing suite updates | Provenance identity, StateCommitment delta/context requirements, and the seed practice experience. |
| `demo/slice3-event-loop.ts` | Five-step deterministic headless event-loop demonstration. |
| `demo/slice3-event-loop-output.json` | Captured structured demonstration output. |

| Verification command | Result |
|---|---|
| `pnpm typecheck` | Passed under strict TypeScript settings. |
| `pnpm test` | Passed: **40 tests**, 0 failed, 0 skipped, 0 cancelled. |
| `pnpm check` | Passed: strict type check followed by complete tests. |
| `pnpm demo:slice3` | Passed: five interaction steps, four commitments, equivalent replay state, and no reasoning involvement. |
| `git diff --check` | Passed: no whitespace errors. |
| Boundary scan | Passed: no UI, API, persistence, infrastructure, provider, or queue module was introduced. |

## 11. Files changed

| Status | Files |
|---|---|
| Created | `src/contracts/assessment-boundary.ts`; `src/decisioning/evidence-evaluation.ts`; `src/decisioning/learner-record-evolution.ts`; `src/decisioning/replay.ts`; `test/slice3-event-loop.test.ts`; `demo/slice3-event-loop.ts`; `demo/slice3-event-loop-output.json`; `SLICE-3-REPORT.md`. |
| Changed | `package.json`; `src/domain/provenance.ts`; `src/domain/learner-record.ts`; `src/contracts/core-contracts.ts`; `src/decisioning/context.ts`; `src/decisioning/opportunities.ts`; `src/decisioning/decision-construction.ts`; `src/decisioning/state-transitions.ts`; `src/decisioning/engine.ts`; `src/seed/functions-seed.ts`; `src/index.ts`; `test/fixtures.ts`; `test/learner-record.test.ts`; `test/mathematical-knowledge.test.ts`; `test/primitives.test.ts`; `test/reasoning-port.test.ts`. |

## 12. Architectural deviations

**None beyond the two explicitly approved minimum contract extensions.** The replay-capable StateCommitment/HistoricalEvent extension and the optional observed-practice-outcome extension were authorised before implementation. No new core domain or infrastructure architecture was introduced.

## 13. Remaining OPEN DECISIONS

| Open decision | Slice 3 treatment |
|---|---|
| Assessment authority and production outcome source | Represented only as a replaceable assessment-boundary contract. No evaluator or integration exists. |
| Outcome vocabulary beyond the two approved observed outcomes | Not added. |
| Curriculum-level prerequisite semantics | Prerequisites still generate voluntary revisit opportunities only. |
| Readiness, mastery, completion, or score semantics | Not implemented. |
| Confidence scale normalization | Not implemented; only the explicitly demonstrated qualitative `high` value is recognized by the deterministic conflict rule. |
| Broader conflict-detection rules | Not implemented. The engine preserves declared or narrowly explicit confidence/outcome conflict; it does not infer psychological conclusions. |
| Interpretation correction, expiry, review, or removal governance | Not implemented. Interpretations remain qualified/revisable model objects. |
| Durable history storage, event ordering source, idempotency storage, and retention | Not implemented; all history and prior outcomes are supplied as context. |
| AI proposal acceptance into decisioning | Not implemented; no real reasoning provider is invoked. |

> **Approval gate:** Slice 3 is complete. No Slice 4, UI, persistence, API transport, database, message queue, real AI integration, or additional architecture work will begin without explicit approval.
