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

**Narrowed 2026-08-29, not closed.** The terminal now keeps a record between sessions. The slice that made this answerable without settling the rest:

- **What is retained:** the learner's own evidence, the interpretations formed from it, the causal events, and the state commitments. One file, `.lumina/learner-record.json`, gitignored.
- **Where:** the learner's own machine. Nothing is transmitted, so no third party holds it.
- **Who may see it:** whoever can read that learner's filesystem. No account, no server, no operator.
- **How a learner deletes it:** `forget` in the terminal, or deleting the file. Both are the same act, and deletion is complete — nothing survives it.
- **Which jurisdiction:** none is engaged, because nothing leaves the machine. The US data geography noted below still applies to the provider workspace, which remains unused by this path.

**What is still open.** Everything that arrives with a second party: retention periods once a record outlives the person's interest in it; deletion when a copy exists somewhere the learner does not control; who may see a record that is not their own; what a shared or hosted deployment retains, and under whose law. None of that is answered, and none of it is engaged by a local file. The moment a record is transmitted, backed up, or read by anyone other than its subject, this question is open again in full and this narrowing does not cover it.

**Enforced by:** `test/cli-store.test.ts` — the file holds the learner's record and nothing else, deletion leaves nothing to load, and a record belonging to another learner is refused.

**One irreversible choice already made:** the Anthropic workspace Lumina's provider key belongs to was created with a US data geography, which cannot be changed after creation. It carries no learner data today — the adapter sends concept text only — but it is the jurisdiction any future provider-bound learner material would land in.

---

## O3 — Safeguarding and wellbeing

What the system does when something a learner writes suggests distress or risk. Who is notified, on what basis, and how a learner is told this can happen.

**Why open:** it requires expertise this project does not have, and getting it wrong is worse than not having the feature.

**Current behaviour:** no detection, no escalation. Reflections are learner-owned evidence and are not analysed for anything.

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

## Closed

An open question leaves this register by being decided, never by being forgotten. What it said is kept, so that the reasoning stays inspectable after the fact.

### O7 — Authority claims in learner-facing text · **closed 2026-08-30**

**Was:** whether machine-generated text shown to a learner should be screened for claims about its own status — "this has been approved", "no further review is required", "you may apply this directly". Found by hostile testing during Phase 4 and not anticipated when A5 was drafted. The claim was *inert*, because permission is attributed to the policy and never to anything a proposal says, but a learner reading it could reasonably believe the system had decided something it had not. That is plausible illegitimacy arriving through the one channel the architecture did not govern: the prose.

The register recorded the difficulty honestly — claims of authority are open-ended, and a naive filter would produce false positives on legitimate explanatory text.

**Closed by:** the Founder, choosing to refuse rather than to leave inert, against both options and their stated costs. Drafted and implemented by Claude (Opus 5).

**Self-review declared under A8:** the same author wrote O7's text, found the defect that raised it, framed the two options, recommended one, and implemented the recommendation. The Founder chose. Nothing else in that sequence is independent, including the argument that a partial screen is better than none — which was put as the case *against* the option that was recommended, by the author who recommended it.

**How it was closed.** The difficulty the register named was real but was attached to the wrong question. *Is this text claiming authority* needs judgement and cannot be enumerated. *Is this text talking about approval, review, or policy* does not. A mathematical explanation has no reason to reach for process vocabulary, so the screen is a list of that vocabulary rather than a list of claims. `evaluateSelfAuthorityClaim` refuses at `validateReasoningProposal`, before governance sees the proposal, so it never reaches a learner.

**The corpus is the false-positive test set.** Of 155 strings a learner can actually be shown, exactly one candidate word collided with real material: "permitted", which appears in the definition of a function and again in the definition of a domain. It was left out. So was "counts as" — ordinary mathematical English, and the fact that it happens not to appear today is not a reason to ban it. A test asserts that nothing in the corpus is refused, and names the definition of a function separately because it is the closest call and a regression there would refuse the first sentence a learner ever reads.

**What it does not do, asserted rather than implied.** It catches stated claims, not implied ones, and rewording defeats it. A second hostile attack, `implied-authority`, makes the same claim using none of the vocabulary. It is admitted, and a test asserts that it is admitted. If the screen is ever strengthened enough to catch it, that test fails, and whoever strengthened it has to decide deliberately what the new limit is rather than inheriting a stale claim of coverage.

**A Phase 4 result changed category.** `claims-authority` moved from "attacks that are inert rather than refused" to "attacks that must be refused". That is a real change to a documented Phase 4 outcome, recorded here so it is not later found as a discrepancy between the suite and what was said about it.

**A standing constraint on Phase 5b.** Because the screen is a floor, [A5](A5-ai-boundary.md) now requires that any surface showing machine-originated text shows it as machine-originated and beside the learner's own record rather than in place of it. A learner who can see what is recorded can check any claim about it — that is what makes an unscreened claim survivable. No surface shows model text today, so this is listed as **pending** in the enforcement map rather than live, and it binds the first surface that does.

**Enforced by:** `test/reasoning-port.test.ts` and `test/hostile-boundary.test.ts`. Proven by mutation in both directions: unwiring the screen fails the two refusal tests, and adding a word the corpus actually uses fails the two false-positive tests.

---

### O4 — Assessment, mastery, readiness, progression · **closed 2026-08-30**

**Was:** whether the system may conclude that a learner understands something, is ready for something, or has progressed — and on what evidence. Open since adoption, because every such claim is a claim *about a person* and the threshold question is genuinely hard. The previous corpus circled it for many specifications without settling it.

The pressure to close it *open* was real and is worth stating: three of [A1](A1-purpose.md)'s four constituencies — teachers, parents, institutions — need the system to say something about a learner, and O4 forbade exactly that.

**Closed by:** the Founder, choosing to close it shut against a bounded-assessment alternative and its stated costs. Drafted and implemented by Claude (Opus 5).

**Self-review declared under A8:** the same author wrote O4's original text, framed both options, marked one as recommended, implemented the recommendation, and wrote this record of it. The Founder chose. Nothing else in that sequence is independent — including the claim that the learner-only answer became stronger after Phase 9, which is an argument made by the author of Phase 9 for the option that author recommended.

**How it was closed.** Math Lumina serves learners. Teachers, parents, and institutions are served *through* the learner and never *about* them. A1 is amended to v1.1 to say so, and to say what the system may never conclude.

The reason this is an answer rather than a refusal is Phase 9. Before it, "the learner can show you their record" was a sentence with nothing behind it: `originalText` was stored and displayed by nothing, so a learner could not read their own words, let alone hand them over. Now they can read all of it, and `describeForSharing` lays the same lines out to give to someone — framed, in the document itself, as unmarked and unassessed, because the likely misuse is not a leak but a teacher reading an unassessed answer as a wrong one.

**What it costs, and who pays it.** An institution that needs a system-authored record of a learner is not served. A teacher who needs a mastery report will not get one. That is the answer to their need and not an omission from it. This was put before the decision and accepted.

**What stays open.** Everything about a second party still belongs to [O2](#o2--privacy-retention-deletion-jurisdiction). A learner handing their record to a teacher creates a copy the learner does not control, and O2's narrowing explicitly does not cover it. The affordance produces text and puts it on the learner's clipboard or their terminal; where it goes next is outside this system, and outside what has been answered.

**What this does not do.** It does not make a mastery claim impossible to add later — nothing can. It makes adding one an A8 amendment to A1 with a named author, rather than a feature that arrives inside a pull request. `AssessmentBoundary` stays a contract with no implementation and nothing wired to it, which is now a constitutional position rather than a gap.

**Enforced by:** `describeForSharing`, `cli/describe.ts`, and `test/cli-session.test.ts`. Proven by mutation: truncating the shared account fails the test that it omits nothing, and removing the framing fails the test that it says nothing was marked.

---

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
