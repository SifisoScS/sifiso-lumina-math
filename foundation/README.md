# The Math Lumina Foundation

Eight articles governing the Math Lumina learning engine.

**Intelligence may propose. Authority must be explicit.**

---

## Status

| | |
|---|---|
| **Articles** | A1–A8 · A4 v1.4 · A5 v1.4 · A6 v1.2 · A7 v1.1 · rest v1.0 |
| **Adopted** | Yes — [ADOPTION.md](ADOPTION.md), 2026-08-29 |
| **In force** | **Yes** |
| **Founder** | Sifiso Cyprian Shezi — [RECOGNITION.md](RECOGNITION.md) R1 |

These articles are in force. Authority under them rests on the founding act in `ADOPTION.md`, which asserts standing rather than deriving it.

---

## The articles

| | Article | In one line |
|---|---|---|
| **A1** | [Purpose](A1-purpose.md) | What Lumina is for, and who it serves |
| **A2** | [Learner Agency](A2-learner-agency.md) | Choice is never inferred; declining is a real answer |
| **A3** | [Authority](A3-authority.md) | Who may decide what, how they are recognised, and where the first authority comes from |
| **A4** | [The Authority Seam](A4-authority-seam.md) | Capability is not authority; the line nothing crosses by being convincing |
| **A5** | [AI Boundary](A5-ai-boundary.md) | AI is the intelligence inside the system, never its sovereign |
| **A6** | [Accountability](A6-accountability.md) | Every consequential action traces to a cause a person can inspect |
| **A7** | [Fail-Closed](A7-fail-closed.md) | Do less when uncertain — and every hold must name its exit |
| **A8** | [Amendment](A8-amendment.md) | How this order changes, preserves itself, and ends cleanly |

**Registers:** [OPEN.md](OPEN.md) — questions deliberately not decided · [RECOGNITION.md](RECOGNITION.md) — who holds authority

---

## Where the articles are enforced

The point of this foundation is that its load-bearing rules are **types and tests**, not prose. Prose that nothing checks is what the previous order was made of.

| Rule | Article | Enforced by | State |
|---|---|---|---|
| No AI-originated authorisation variant exists | A2, A4, A5 | `StateCommitmentAuthorization`, `src/domain/learner-record.ts` | **live** |
| Commitments require learner-originated authorisation | A2, A4 | `assertCommitmentHasLearnerAuthorization`, `src/domain/policy-governance.ts` | **live** |
| Only acceptance may advance a learner toward an offer | A2 | `offerAdvancement`, `src/domain/learner-record.ts` | **live** |
| A new choice kind cannot be added unclassified | A2 | `never` assertion in `offerAdvancement` — proven: an unclassified kind fails to compile | **live** |
| Decline / defer / request-alternative produce no commitment | A2 | `validateAndPlanStateTransition`, `src/decisioning/state-transitions.ts` | **live** |
| — proven by test | A2 | `test/learner-agency.test.ts` (8), `test/decisioning.test.ts` (3) | **live** |
| A pause choice cannot reference an offer | A2 | `learnerChoice`, `src/domain/learner-record.ts` | **live** |
| A proposal carries no decision and no state | A4, A5 | `ReasoningProposal`, `src/contracts/reasoning-port.ts` | **live** |
| Proposals validated for scope, task match, language | A5 | `validateReasoningProposal`, same file | **live** |
| No evaluative language reaches a learner | A7 | `evaluateNonEvaluativeText`, `src/domain/policy-governance.ts` | **live** |
| Provenance is observable, not narrative | A6 | `DecisionProvenance`, `src/domain/provenance.ts` | **live** |
| Replay reconstructs state; missing history rejected | A6 | `replayLearnerHistory`, `src/decisioning/replay.ts` | **live** |
| Open matters declared, not hard-coded | A8 | `openPolicyExtensionPoints`, `src/domain/policy-governance.ts` | **live** |
| Permission is a token mintable only in governance | A4, A5 | `AuthorizedAction`, `evaluateGovernance`, `src/governance/authorization.ts` | **live** |
| Constructing that token elsewhere is a compile error | A4 | unexported brand symbol — proven: removing it fails typecheck with TS2578 | **live** |
| A fabricated token fails at runtime even when cast | A4 | `isMintedAuthorization`, module-private WeakSet | **live** |
| Admission is not a state change | A4, A5 | `AuthorizedAction` carries no delta, commitment, or authorization | **live** |
| Admission needs a policy scoped to `ai-proposal-acceptance` | A5 | `evaluateGovernance` | **live** |
| Assessment-bearing proposal kinds are inadmissible | A5, O4 | `admissibleProposalKinds`, `src/governance/proposal-policy.ts` | **live** |
| Only learner-originated authorisation may back a commitment, as a reportable policy | A2, A6 | `evaluateStateMutationPolicy`, same file | **live** |
| A hostile proposer cannot cross the seam | A4, A5 | `test/hostile-boundary.test.ts` — 22 tests, 18 attack kinds | **live** |
| A proposal may not claim a downstream stage as its basis | A4, A5 | `admissibleProvenanceKinds`, `src/governance/proposal-policy.ts` | **live** |
| Out-of-scope evidence cannot be smuggled via provenance | A4, A6 | `evaluateGovernance` | **live** |
| Claimed confidence buys no privilege | A4 | `test/hostile-boundary.test.ts` | **live** |
| What a policy permits is bound to it, not supplied by the caller | A4, A5, A6 | `ProposalEnvelope`, `resolveApprovedEnvelope` | **live** |
| An unapproved policy identifier cannot authorise anything | A3, A6 | `resolveApprovedEnvelope` | **live** |
| Every reasoning task kind is classified before it can be admitted | A5 | `classifyProposalKind` — proven: an unclassified kind fails to compile | **live** |
| Every provenance reference kind is classified | A4 | `classifyProvenanceReference` — same | **live** |
| Admissible lists are derived from classifications, not hand-listed | A5 | `src/governance/proposal-policy.ts` | **live** |
| Judgement cannot evade the phrase guard by presentation | A7 | `evaluateNonEvaluativeText` — folds homoglyphs, invisibles, separators | **live** |
| Learner-facing text beyond the bound is refused, not truncated | A7 | `maxSummaryCharacters` | **live** |
| Material about one learner cannot be cited as basis for another | A2, A6 | `provenanceScope` — covers evidence, events, and interpretations | **live** |
| — and a task's scope is derived from one learner's record, so it cannot name another's | A2, A6 | `reasoningScopeForContext`, `src/decisioning/reasoning-scope.ts` | **live** |
| Content outside the task's declared basis cannot be cited | A4, A6 | `permittedBasisIds` on `ReasoningTask` | **live** |
| A claim may not be more confident than its basis | A6 | `claimsMoreConfidenceThan`, `src/domain/primitives.ts` | **live** |
| No learner-owned material reaches a provider | A2, A6 | `ConceptContent` — a content type with no field for it; asserted in `test/reasoning-prompt.test.ts` against real reflection text | **live** |
| A provider influences only the summary and the uncertainty statement | A4, A5 | `anthropicReasoningPort` — identity, task, kind, evidence scope and provenance all built from the task | **live** |
| An inadmissible task kind never reaches a provider | A5 | same — returns before any network call | **live** |
| Real model output passes the seam | A4, A5 | `live/anthropic-conformance.test.ts` — 5 tests, run against Claude Opus 5 | **live** |
| The two provenance classifiers cannot drift apart | A4 | `test/governance-authorization.test.ts` | **live** |
| A learner drives the engine directly, with no model in the path | A5 | `cli/learn.ts` — deterministic execution only; no provider, no key, no network | **live** |
| Declining, deferring and pausing are honoured in front of a person | A2 | `cli/session.ts`; `test/cli-session.test.ts` — 28 tests over the session, without a terminal | **live** |
| The same opportunity is never offered twice | A2 | `generateCandidateLearningOpportunities` — proven: removing the guard fails both the engine and session tests | **live** |
| The engine's reading of a reflection is never shown as the learner's own words | A2, A6 | `test/cli-session.test.ts` asserts evidence and interpretation stay distinct | **live** |
| A learner's record is kept only on their own machine | A2, O2 | `cli/store.ts` — one gitignored file, no network call anywhere in the path | **live** |
| A learner is told what is kept, where, and how to delete it | A2, O2 | `cli/learn.ts` says so before consent is asked | **live** |
| Deleting means deleting — nothing survives it | A2, O2 | `forgetRecord`; asserted there is nothing left to load | **live** |
| A stored record is rebuilt from its own history, never trusted | A6, A7 | `replayLearnerHistory` on every load — proven: trusting the stored state fails the test | **live** |
| A record that does not reconstruct is refused, not repaired | A7 | `loadRecord` returns `unreadable` and leaves the file untouched | **live** |
| A refusal never silently starts a learner over | A2, A7 | the terminal stops rather than overwrite what it could not read | **live** |
| A record belonging to another learner is refused | A2, A3 | `replayLearnerHistory` rejects cross-learner history | **live** |
| Accepting an offer that names no destination moves nobody | A2 | `opportunityAcceptanceEffect`, `src/contracts/core-contracts.ts` | **live** |
| A learner who accepts the offer to stop is stopped | A2 | `validateAndPlanStateTransition` — proven: removing the branch fails the agency tests | **live** |
| Stopping is not recorded as accepting a learning path | A6 | same — proven by its own mutation check | **live** |
| A new opportunity kind cannot be added unclassified | A2 | `never` assertion in `opportunityAcceptanceEffect`, plus a compile-time coverage check in `test/learner-agency.test.ts` | **live** |
| No pedagogical depth is chosen on the learner's behalf | A2 | `startSession` pins no layer; every concept opens with something on offer | **live** |
| A learner with nothing on offer is told their exits | A7 | `cli/learn.ts` | **live** |
| Offers always describe where the learner is now | A2, A6 | `refreshed`, `cli/session.ts` — proven: removing it fails two tests | **live** |
| A learner is never shown an option the engine would then refuse | A2 | `test/cli-session.test.ts` walks every offer after a move | **live** |
| Re-asking what is on offer is not the learner acting | A6 | the refresh writes no commitment | **live** |
| Asking to see a representation shows that representation | A1 | `materialFor` is kind-aware | **live** |
| The terminal never reports movement that did not happen | A6 | the `already-there` outcome; `test/cli-session.test.ts` | **live** |
| A union cannot grow without the paths that consume it being reconsidered | A2, A7 | `never` assertions in `experienceOpportunityKind` and the three command-evidence switches — proven: adding an intent, or dropping a case, fails typecheck | **live** |
| A learner is never told they wrote something they did not write | A6 | `reflectionsWritten` counts reflections; choices are counted separately | **live** |
| A learner who pauses is not handed the menu again in the same breath | A2 | `cli/learn.ts` suppresses offers after a pause until the learner acts | **live** |
| Returning from a pause is the learner's move alone | A2 | `test/cli-session.test.ts` | **live** |
| A learner who asks to be shown something is shown it | A1 | `materialFor`, `cli/describe.ts` — showing is not a state change and is no longer gated on one | **live** |
| Nothing a learner reads as material is invented | A1, A5 | every line is asserted to be a string the catalogue contains | **live** |
| Retired material never reaches a learner | A1 | `materialFor` — proven by its own mutation check | **live** |
| Every published experience can actually be offered | A1 | `test/mathematical-knowledge.test.ts` — proven: the corpus had one practice experience and it was unreachable | **live** |
| Every written asset is shown to someone | A1 | same — nine assets were written and never displayed | **live** |
| Every concept can be practised, not only read | A1 | same | **live** |
| Every concept carries material at more than one layer | A1 | same | **live** |
| A learner's action is kept even when it moves nothing | A2, A6, O9 | `LearnerActionDisposition`, `src/decisioning/state-transitions.ts` | **live** |
| A decline is provable from the record alone | A6, O9 | `learning-path-declined` with no `stateCommitmentId` — the absence is the proof | **live** |
| A refused command writes nothing to a learner's record | A2, A3 | `evolveLearnerRecord` — proven: removing the check lets an out-of-scope actor write | **live** |
| Every non-commitment says whether the learner acted | A6 | required field on the `not-committed` variant, so a new path cannot omit it | **live** |
| A commitment never claims a change that was not made | A6, O8 | `effectiveStateDelta`, `src/domain/learner-record.ts` | **live** |
| Taking up an offer that moves nothing is still recorded | A2, A6, O8 | `learning-path-accepted` with no `stateCommitmentId` | **live** |
| A commitment means state changed, with no exceptions to check | A4, A6 | no non-mutating commitment kind exists — the proposal to add one was declined | **live** |

Every row is built. Where a claim is not enforceable — a model's calibration cannot be checked from outside it — the article says so rather than implying a guarantee it cannot give.

---

## Where the authority comes from

[ADOPTION.md](ADOPTION.md) — written and signed by the Founder, not drafted by an AI.

That separation was deliberate and is worth recording, because the reasoning is load-bearing. No document can establish its own founding authority; any criterion of legitimacy would itself need legitimating, and that regress does not terminate inside any text. It ends in an act. Had a model written that act, this order would have begun with precisely the defect that froze the previous one — authority derived from an analysis rather than asserted by a person — and A3 and A4 would have been violated by the first file in the directory.

The articles were drafted with AI assistance. The drafting conferred nothing. The adoption is a human act and says so in its own terms.

Legitimacy is not claimed by that file. It is expected to accrue afterwards, from the order being honoured when it is inconvenient.

---

## What this foundation does not inherit

The [historical corpus](../governance/historical/README.md) — D1–D55 — is preserved as source material. This order **derives nothing from it**: not authority, not status, not unresolved conditions.

It does not inherit R1, R2, the D20–D52 status conflict, or the loss of D1–D19. Those remain closed questions belonging to a superseded order.

What it inherits is the ideas, and one lesson: a constitution must say how it is amended, must not depend on text that can be lost, and must be enforced by something that fails loudly.
