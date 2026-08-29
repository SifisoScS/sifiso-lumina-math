# A7 — Fail-Closed and Safety

*Article 7 of the Math Lumina foundation. Version 1.1.*

## The rule

**When authority, evidence, or meaning is missing or contradictory, the system does less rather than more.**

It does not guess, does not fall back to a default that happens to be convenient, and does not proceed because proceeding is what was expected.

## What fails closed

Consequential actions: anything that changes what the system holds about a learner, or that reaches the learner as a claim about them.

Specifically, no consequential action proceeds when:

- The authorising policy is missing, expired, or ambiguous
- Required evidence is unavailable, or falls outside permitted scope
- Two sources conflict and the conflict is unresolved
- A version reference cannot be resolved
- Identity, consent, or permission cannot be established

## What does not fail closed

The learner keeps learning. Failing closed on a *claim about a learner* is not failing closed on the *learner's session*.

If the system cannot justify recording something, it does not record it — and the person carries on reading, thinking, choosing, and asking. Blocking the human because the system cannot justify a state write is a bug, not caution.

Investigation, analysis, reading, and drafting never fail closed. They are not consequential actions.

## Every fail-closed condition must name its exit

**This is the article's most important provision, and it exists because the previous order did not have it.**

A fail-closed state must record what would resolve it: which authority, which evidence, which decision. A condition that cannot say what would unblock it is not a safety mechanism — it is a trap, and it will eventually stop the system permanently while looking principled.

The previous constitutional corpus froze exactly this way. It failed closed correctly, and then had no rule for its own amendment and no way to recognise anyone, so nothing could ever unblock it. It stayed frozen not because that was safe but because no exit had been written down.

**Fail-closed is a hold, not a terminus.** If a hold cannot name its exit, that is a defect in the hold.

## Safety toward the learner

The system does not evaluate a person. It does not tell them they are right, wrong, good, bad, fast, slow, or that something is easy.

It reports what was observed and what it does not know. Difficulty is a property of a problem in a context, never a verdict on a learner. Uncertainty is stated plainly rather than smoothed away, because a system that hides its uncertainty is asking to be trusted more than it deserves.

Silence and absence of evidence are not negative findings.

## Failure is visible

When something fails closed, that fact is recorded and surfaced — to the maintainer always, and to the learner when it affects them. A system that quietly does nothing is indistinguishable from a broken one, and both are worse than a system that says what it declined to do.

## What this does not establish

- Any error-handling, retry, timeout, logging, or alerting implementation.
- Any incident, escalation, or on-call process.
- Any safeguarding, wellbeing, or crisis-response obligation. Those are real, they are **open** under A8, and nothing here substitutes for them.
- Any threshold for what counts as sufficient evidence. That is policy work.
- That failing closed is always right. It has costs, and a hold that never lifts is its own failure — see above.

## Enforced by

| Rule | Where |
|---|---|
| A non-material outcome cannot create a state commitment | `validateAndPlanStateTransition`, `src/decisioning/state-transitions.ts` |
| Only a policy-permitted decision with available offers supports a transition | same |
| Declared evidence conflicts prevent consequential use | `declaredEvidenceConflict`, `src/decisioning/evidence-evaluation.ts` |
| An incompatible delivery context returns a non-committing decline rather than a downgrade | `evaluateContextDeliveryCompatibility`, `src/decisioning/delivery-compatibility.ts` |
| Prohibited evaluative language is rejected before reaching a learner | `evaluateNonEvaluativeText`, `src/domain/policy-governance.ts` |
| Judgement cannot be smuggled past that guard by presentation | same — text is folded before matching: NFKD, combining marks and invisible characters dropped, homoglyphs folded, separators discarded |
| Learner-facing text beyond the policy's bound is refused, not truncated | `maxSummaryCharacters`, `src/governance/proposal-policy.ts` |
| Unassessed practice cannot independently produce an understanding claim | `test/decisioning.test.ts` |
| Open matters are represented explicitly, not hard-coded | `openPolicyExtensionPoints`, `src/domain/policy-governance.ts` |

The folding guard is deliberately stricter than a literal match and will refuse some innocent text. Over-refusal is the fail-closed direction and is the right way to be wrong here; it is a guard against evasion, not a safety classifier.

*Amendment record. v1.1 (2026-08-29): recording update under A8. Normative text unchanged; the enforcement table records that the phrase guard now resists presentation-based evasion, after hostile testing found a Cyrillic homoglyph, a zero-width space, and hyphens between letters each defeated it.*

---

*Related: [A2 — Learner Agency](A2-learner-agency.md) · [A6 — Accountability](A6-accountability.md) · [A8 — Amendment](A8-amendment.md)*
