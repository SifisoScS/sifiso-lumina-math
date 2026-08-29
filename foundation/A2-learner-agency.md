# A2 — Learner Agency

*Article 2 of the Math Lumina foundation. Version 1.0.*

## The rule

**A learner's choice is the only thing that can authorise a change made on their behalf. Choice is never inferred.**

## What is never a choice

None of the following is a learner choice, individually or in combination:

- Silence, or the absence of objection
- Elapsed time, or a session timing out
- Continued participation, or continued session activity
- Receiving, opening, or viewing something
- Acknowledging that the system did something
- Expressing a preference, an interest, or curiosity
- Behaviour from which a preference could be inferred
- A computation, a delivery, a technical execution, or a successful request
- An AI output stating or implying that the learner agrees
- A representative's assertion that the learner agrees, absent authorised delegation

If the system cannot point to an explicit act by the learner, there was no choice.

## Declining is a real answer

A learner may accept an offer, decline it, defer it, or ask for something else. **Only acceptance may move them toward what was offered.**

Declining, deferring, and requesting an alternative are not weaker forms of acceptance and must not be treated as "acceptance with a different label." They produce no commitment and no movement toward the declined thing. The learner's state stays where it was.

This is not hypothetical. The engine previously recorded declines as commitments identical to acceptance — same state change, same authorisation, differing only in an event label — for the entire lifetime of the previous governance corpus, untested. That defect is the reason this article exists in the form it does.

## Pausing

A learner may stop. Pausing is a choice, it is honoured immediately, and it does not require a reason.

## Revocation

A choice may be withdrawn. Withdrawal is prospective: it stops what has not yet happened. It does not erase the record that the earlier choice was made, because the record is how the learner can see what the system did.

## Consent to be observed

Observation of a learner requires their explicit consent, separately from any choice about learning content. Consent is revocable, and revoking it stops further observation.

## What this does not establish

- What the system should *offer*. Agency governs how a choice is honoured, not what the choices are.
- Any pedagogical sequence, prerequisite rule, or pacing model.
- Any rule about delegated choice by a parent, guardian, or teacher. Delegation is a real need and is deliberately left open until it is designed properly — see A8's treatment of open questions.
- Any claim that honouring choice is sufficient for good learning. It is necessary, not sufficient.

## Enforced by

| Rule | Where |
|---|---|
| Only learner-originated authorisation can back a commitment | `StateCommitmentAuthorization` in `src/domain/learner-record.ts` — three variants, none of them AI or system-originated |
| The same, checked at runtime | `assertCommitmentHasLearnerAuthorization` in `src/domain/policy-governance.ts` |
| Only acceptance may advance a learner toward an offer | `offerAdvancement` in `src/domain/learner-record.ts` |
| That classification is applied before offer resolution, so it cannot be bypassed | `validateAndPlanStateTransition` in `src/decisioning/state-transitions.ts` |
| A new choice kind cannot be added without classifying it | `never` exhaustiveness assertion in `offerAdvancement` — verified: adding an unclassified kind produces a compile error |
| The above, proven behaviourally | `test/learner-agency.test.ts` — one test per choice kind, plus `test/decisioning.test.ts`; both suites verified to fail when the classification is broken |

If a change to this article is not accompanied by a change to the code and tests above, one of the two is wrong.

---

*Related: [A1 — Purpose](A1-purpose.md) · [A4 — The Authority Seam](A4-authority-seam.md) · [A7 — Fail-Closed](A7-fail-closed.md)*
