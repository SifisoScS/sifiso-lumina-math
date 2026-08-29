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

**Current behaviour:** the engine is headless and stores nothing itself. This question becomes urgent the moment anything persists — see Phase 6.

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

*O1–O6 carry forward the `openPolicyExtensionPoints` already declared in `src/domain/policy-governance.ts`. That code-level register and this document should be kept consistent; where they disagree, this document is the one to fix.*
