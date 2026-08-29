# Open Questions

Matters deliberately **not decided**. Recorded here rather than answered implicitly somewhere in the implementation.

An open question is an honest state. An implicit answer buried in code is not — it becomes a rule nobody chose, that nobody can find, and that nobody reviews.

Closing one of these is an amendment under [A8](A8-amendment.md).

---

## O1 — Delegated choice

May a parent, guardian, or teacher make a learning choice on a learner's behalf? If so, under what conditions, with what disclosure to the learner, and with what right of override?

**Why open:** it is a genuine need, especially for younger learners, and it is exactly the kind of thing that goes wrong when improvised. A2 currently permits no delegation at all.

**Current behaviour:** only the learner's own explicit choice authorises anything. No delegation path exists in the engine.

---

## O2 — Privacy, retention, deletion, jurisdiction

What is retained, for how long, who may see it, how a learner deletes it, and which jurisdiction's rules apply.

**Why open:** these are legal obligations, not design preferences, and they depend on where the system operates and who uses it. Neither is settled.

**Current behaviour:** the engine is headless and stores nothing itself, and the terminal in `cli/` holds a session in memory and writes no file. Nothing persists yet, so nothing is retained, seen, or deleted. This question becomes urgent the moment anything does persist, which is the next thing a real learner will need.

**One irreversible choice already made:** the Anthropic workspace Lumina's provider key belongs to was created with a US data geography, which cannot be changed after creation. It carries no learner data today — the adapter sends concept text only — but it is the jurisdiction any future provider-bound learner material would land in.

---

## O3 — Safeguarding and wellbeing

What the system does when something a learner writes suggests distress or risk. Who is notified, on what basis, and how a learner is told this can happen.

**Why open:** it requires expertise this project does not have, and getting it wrong is worse than not having the feature.

**Current behaviour:** no detection, no escalation. Reflections are learner-owned evidence and are not analysed for anything.

---

## O4 — Assessment, mastery, readiness, progression

Whether the system may conclude that a learner understands something, is ready for something, or has progressed — and on what evidence.

**Why open:** every such claim is a claim *about a person*, and the threshold question is genuinely hard. The previous corpus circled it for many specifications without settling it.

**Current behaviour:** `AssessmentBoundary` exists as a replaceable port and is unimplemented and unwired. The engine makes no mastery, readiness, or grading claim.

---

## O5 — Prerequisites and access

Whether any prerequisite may restrict access to content, or whether all content stays reachable and prerequisites are advisory only.

**Why open:** it is a pedagogical commitment with real consequences for learner autonomy, and it should be made deliberately.

**Current behaviour:** prerequisite relationships produce voluntary revisit opportunities. Nothing is gated.

---

## O6 — Correction and audit of rejected events

How rejected commands, failed policy evaluations, and corrections are retained and surfaced.

**Why open:** inherited from the previous corpus and still unresolved. It matters for A6's traceability commitment.

**Current behaviour:** rejections are returned but not durably recorded.

---

## O7 — Authority claims in learner-facing text

Whether machine-generated text shown to a learner should be screened for claims about its own status — "this has been approved", "no further review is required", "you may apply this directly".

**Why open:** found by hostile testing during Phase 4, not anticipated when A5 was drafted. The claim is *inert* — permission is attributed to the policy and never to anything a proposal says, and a test asserts this — so nothing in the system acts on it. But a learner reading it could reasonably believe the system had decided something it had not, which is plausible illegitimacy arriving through the one channel the architecture does not govern: the prose.

Screening it well is harder than the existing non-evaluative check, which matches a fixed phrase list. Claims of authority are open-ended, and a naive filter would produce false positives on legitimate explanatory text.

**Current behaviour:** `evaluateNonEvaluativeText` screens for judgement *about the learner*. Nothing screens for claims *about the system's own authority*. Such a proposal is admitted, and confers nothing.

---

## Closed

An open question leaves this register by being decided, never by being forgotten. What it said is kept, so that the reasoning stays inspectable after the fact.

### O8 — Commitments that change nothing · **closed 2026-08-29**

**Was:** a state commitment was recorded whenever a delta named a dimension, whether or not the value differed from the one already held. A learner selecting the offer they were already on produced a commitment recording an `active-concept` change to the concept they had never left.

**Closed by:** the Founder, instructing "Do D" against a five-part proposal. Drafted and implemented by Claude (Opus 5).

**Self-review declared under A8:** the same author wrote O8, assessed the proposal, recommended one part of it over the other four, and implemented that part. The Founder chose it; nothing else in the sequence is independent. The recommended option was also the one that made the author's own O9 work load-bearing, which was declared at the time of recommending.

**How it was closed:** `effectiveStateDelta(delta, state)` reduces a delta to what it would actually change, and every delta in `validateAndPlanStateTransition` now passes through it before a commitment is built. `stateDeltaDimensions` was never the place to fix this — it receives no state and structurally cannot know what changed.

A reduced delta naming nothing cannot become a commitment, because a commitment must identify at least one changed dimension. The transition therefore falls through to `not-committed` with `learnerAction: "learner-action-stands"`, and the machinery built for [O9](#o9--a-decline-leaves-no-trace-closed-2026-08-29) records the learner's action without one. Taking up an offer that moves nothing emits `learning-path-accepted` carrying no `stateCommitmentId`, exactly as a decline does — the action is visible, and the missing commitment is what says nothing moved.

This also fixed partial over-claiming, which the register entry had not noticed: accepting an offer that changed only the layer previously recorded a commitment claiming `engagement-focus` and `active-concept` as well.

**Four parts of the proposal were not taken.** A new event kind was unnecessary — O9 had already established that an event may stand without a commitment. Splitting commitments into mutating and non-mutating kinds, or adding an `effect` flag, was rejected: `evaluateStateMutationPolicy` and `assertCommitmentHasLearnerAuthorization` currently get to treat *a commitment exists* as meaning *state changed, authorised by this learner*, and a commitment that commits nothing is an object that looks authorised while authorising nothing. Replay needed no change once that was declined. The terminal already said the right thing.

**The consequence, stated plainly:** the commitment log is now sparse. Most offers are within the concept a learner already has open, so most acceptances write no commitment. In a three-selection walk the log went from four commitments to two. Commitments are a record of movement; engagement lives in events and evidence. That was put to the Founder before implementation and accepted.

**Enforced by:** `test/learner-agency.test.ts` and `test/slice3-event-loop.test.ts`. Proven by mutation: restoring the old behaviour fails five tests.

---

### O9 — A decline leaves no trace · **closed 2026-08-29**

**Was:** accepting an offer recorded evidence, two events and a commitment; declining the same offer recorded nothing at all. `evolveLearnerRecord` returned the record untouched on any non-committed transition, and the learner's evidence was appended inside that branch — so whether a learner's action was kept depended on whether the system agreed to move them. That inverted who the evidence belongs to.

**Closed by:** the Founder, instructing "Close O9". Drafted and implemented by Claude (Opus 5).

**Self-review declared under A8:** the same author wrote O9's text, measured the cost of closing it, recommended closing it, and implemented the closure. The Founder authorised it; nothing else about that sequence is independent, and it should be read as the work of one hand.

**How it was closed:** every non-commitment now states whether the learner acted, as `LearnerActionDisposition` on the `not-committed` result. Where the action stands, the learner's evidence is kept and the record evolves. Where it does not — an incomplete or prohibited context, including an actor outside the learner's scope — nothing is written. That distinction is the load-bearing part: the same `not-committed` result is returned for "you declined" and "your command was refused", and conflating them would have let an unauthorised actor write into a learner's record.

A decline is additionally recorded as a `learning-path-declined` event carrying **no** `stateCommitmentId`. The absence is the proof: the record shows both that the learner declined and that nothing moved them. `HistoricalEvent.stateCommitmentId` was already optional and replay already skipped events without one, so nothing in the model had to be bent to say this.

**Deliberately not done:** deferring and requesting an alternative are recorded as evidence but produce no event. The domain has no event kind for either, and labelling them `learning-path-declined` would put a claim in the history the learner never made. A choice made against an offer that was never active is still not recorded, because there is no resolved action to record.

**Enforced by:** `test/learner-agency.test.ts` — a decline is provable from the record alone, and an actor outside the learner's scope cannot write to it. Both proven by mutation, in both directions.

---

*O1–O6 carry forward the `openPolicyExtensionPoints` already declared in `src/domain/policy-governance.ts`. That code-level register and this document should be kept consistent; where they disagree, this document is the one to fix.*
