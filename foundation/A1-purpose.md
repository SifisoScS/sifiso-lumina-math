# A1 — Purpose

*Article 1 of the Math Lumina foundation. Version 1.1 — amended 2026-08-30 to answer [O4](OPEN.md#o4--assessment-mastery-readiness-progression).*

## What Math Lumina is

Math Lumina is a learning system for mathematics in which **intelligence may be powerful and adaptive, while authority remains explicit, bounded, and accountable to humans**.

It is a learning engine first. Governance exists to serve the learning, not the other way round.

## What it is for

To help a person understand mathematics, on terms they can see and control.

Three commitments follow from that, and everything else in these articles is downstream of them:

1. **The learner is a participant, not an object.** The system offers; the learner chooses. It does not decide on their behalf and then present the decision as theirs.
2. **Nothing consequential happens silently.** Anything that changes what the system holds about a learner is traceable to an explicit cause a person could inspect.
3. **Capability does not confer permission.** That the system *can* do something — including anything an AI model inside it can do — is not a reason it *may*.

## Who it serves

**Math Lumina serves learners.** That is the whole of its direct constituency, and it is a narrowing, decided on 2026-08-30 in closing O4.

Three other constituencies are real and are served **through the learner, never about them**:

- **Teachers**, who need to trust what a system reports before acting on it — and who receive it from the learner, who has read it first.
- **Parents and guardians**, who need to know a system is not quietly deciding things about a child — answered here by the system not deciding anything about a child at all.
- **Institutions**, which need a record they can be accountable for — and which Math Lumina does not produce.

The mechanism is not a permission model. It is that **the system forms no conclusion about a learner at all**, and that everything it holds about them as a person — their own words, the answers they gave, the choices they made, and the system's readings of those — is readable by them and shareable by them. The only account of a learner that exists is one they have read. `describeForSharing` is that affordance; the amendment rests on it.

**One thing it holds is not shown, and this says so rather than smoothing over it.** The engine also keeps a movement log — the commitments and causal events recording what changed and when. That is machinery rather than a claim about a person, and neither surface displays it today. It is a gap in *readability*, not in the narrowing: nothing in that log concludes anything, and none of it goes anywhere.

**What this costs, stated rather than implied.** An institution that needs a system-authored record of a learner is not served by Math Lumina. A teacher who needs a mastery report will not get one. That is the answer to their need, not an omission from it, and anyone who requires otherwise requires a different system or a separately governed authority that does not yet exist.

And, less obviously: **other systems**. Math Lumina is intended to demonstrate that an AI-bearing system can be genuinely useful while remaining subordinate to human authority. If the demonstration is worth anything, it is worth something to people who never use the product.

## What the system may never conclude about a learner

Closed under O4, and binding until an amendment says otherwise:

> Math Lumina does not conclude that a learner has understood, mastered, is ready for, has progressed past, or is capable of anything. It does not do so internally, and it does not do so for anyone else.

`DerivedInterpretation` remains permitted and remains what it says it is: provisional, evidence-linked, revisable, shown to the person it describes, and separated from their own words wherever it appears. It is a reading, and a reading is not a verdict.

`AssessmentBoundary` remains a contract with no implementation and nothing wired to it. That is not an oversight to be tidied up later; it is where this article now says the line is.

## What good looks like

The system succeeds when a learner understands more than they did, chose to get there, and could explain how the system helped. It fails if it produces the right answer by the wrong route — if the learner advances because the system moved them rather than because they moved.

A useful test: **if the learner declines, does anything happen anyway?** If yes, the system is wrong regardless of how good its reasoning was.

## Scope

These articles govern the Math Lumina learning engine in this repository: its domain model, decisioning, state transitions, delivery, and any AI admitted into it.

They do not govern the founder's other work, other systems, or anything outside this repository.

## What this does not establish

- Any pedagogical claim. What good mathematics teaching *is* remains an open question, not settled here.
- Any assessment, mastery, readiness, or grading standard.
- Any commercial, legal, institutional, or regulatory status.
- Any obligation on anyone to use, fund, continue, or complete the system.
- Any authority. Purpose explains what the system is for; it permits nothing. Authority is A3.

## Enforced by

Purpose is mostly not directly enforceable in code. It is the article the others are answerable to, and the one to cite when a proposed change is technically sound but points the wrong way.

The O4 narrowing is an exception, and is enforced:

- `describeForSharing`, `cli/describe.ts` — built from the same lines the learner reads, so the copy handed to a teacher cannot be a tidied one, and framed so that whoever opens it is told nothing was marked.
- `test/cli-session.test.ts` — the shared account omits nothing the learner can see, carries the learner's own words unchanged, and writes nothing.
- `AssessmentBoundary` is imported by nothing outside its own module, asserted in `test/core-contracts.test.ts`.
- `applyPractice`, `cli/session.ts` — an answer a learner gives is kept and attaches no `ObservedPracticeOutcome`.

---

*Related: [A2 — Learner Agency](A2-learner-agency.md) · [A3 — Authority](A3-authority.md) · [A4 — The Authority Seam](A4-authority-seam.md)*
