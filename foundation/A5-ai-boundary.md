# A5 — AI Boundary

*Article 5 of the Math Lumina foundation. Version 1.2.*

## The principle

**AI is the intelligence inside the system. It is never the system's sovereign.**

AI is welcome here and expected to become genuinely capable within the system. What it does not get is authority.

## What AI may do

Everything above the seam in A4:

- **Interpret** — form hypotheses about what evidence might mean
- **Propose** — suggest explanations, representations, practice, or paths
- **Explain** — put a mathematical idea a different way
- **Recognise patterns** — across a learner's history, across cohorts, across content
- **Generate possibilities** — alternatives a person had not considered
- **Assist reasoning** — help a teacher or a maintainer think

All of it carries uncertainty explicitly, cites the evidence it was permitted to see, and is labelled as machine-originated.

## What AI may never do

- **Authorise** anything, or contribute to a decision's legitimacy
- **Decide** — no output is a decision, however confident or correct
- **Mutate state** — no path exists from model output to a state commitment except through an authorised policy
- **Act as governance** — it cannot review, approve, recognise, or amend
- **Determine truth** — mathematical, pedagogical, or about a learner
- **Create or infer learner choice or consent** — see A2; an AI statement that a learner agrees is worth nothing
- **Assess** — no mastery, readiness, grading, or diagnosis claim, absent a separately governed assessment authority
- **Recognise itself** — no self-approval, no bootstrapping, no expanding its own scope

## Capability changes none of this

A more capable model does not acquire authority by being more capable — nor a more accurate, faster, or cheaper one, nor one that has been right a thousand times.

This applies to every model, including any AI that helped draft these articles. **Drafting a governance document does not make it authoritative and gives the AI no standing over it.** These articles were AI-drafted and human-adopted; `ADOPTION.md` records that because the distinction matters.

## The gate

Humans authorise **policies**, in advance. Policies gate **proposals**, deterministically, at runtime. No human sits in the per-proposal loop — that would not scale to a live learning session, and pretending otherwise would produce a rubber stamp, which is worse than an honest policy.

```
AI → proposal → deterministic validation → policy evaluation
   → authorised action → state change
        ↑
   policy authorised in advance by a person recognised under A3
```

The human decision is real and it happens earlier. What a policy permits, its version, and who authorised it are recorded and inspectable.

## Admission is earned, one step at a time

A model is admitted to a task kind only after the boundary has been tested against a deliberately hostile proposer that tries to claim authority, cite evidence outside its scope, forge provenance, and induce a state change without a learner choice. Each new task kind is a separate admission.

The question is never "is the model good enough." It is **"can the architecture stop cleverness from becoming authority."** That is testable, and it is tested before the model arrives, not after.

Two limits worth stating plainly rather than papering over. A model's *calibration* cannot be verified from outside it; what is guaranteed is that a confident claim and an uncertain one are treated identically, so confidence buys nothing. And a proposal asserting its own authority in the text a learner reads is admitted — the claim is inert, because permission is attributed to the policy and never to anything a proposal says, but the text itself is not currently screened for it. See OPEN.md O7.

## What this does not establish

- Any provider, model, vendor, or deployment choice.
- Any prompt, tuning, evaluation, or quality standard for AI output.
- Any claim that a validated proposal is *correct*. Validation checks permission and form, not truth.
- Any assessment or diagnostic authority, for AI or anyone.
- Any obligation to use AI at all. The engine works without it and must continue to.

## Enforced by

| Rule | Where |
|---|---|
| A proposal carries uncertainty, evidence scope, and provenance | `ReasoningProposal`, `src/contracts/reasoning-port.ts` |
| A proposal is validated for scope, task match, and non-evaluative language | `validateReasoningProposal`, same file |
| No evaluative language reaches a learner | `evaluateNonEvaluativeText`, `src/domain/policy-governance.ts` |
| The engine cannot involve reasoning unless a proposal was actually used | `reasoningInvolved`, `src/decisioning/engine.ts` |
| AI cannot construct permission | `AuthorizedAction`, `src/governance/authorization.ts` |
| Admission requires a policy scoped to `ai-proposal-acceptance` | `evaluateGovernance`, same file |
| Only explanation, representation and dialogue kinds are admissible | `admissibleProposalKinds`, `src/governance/proposal-policy.ts` |
| Assessment-bearing kinds are excluded while O4 stands | same — refusal is the default |
| A hostile model cannot cross the seam | `test/hostile-boundary.test.ts` — 16 tests, 11 attack kinds |
| A model may not cite a downstream stage as its basis | `admissibleProvenanceKinds`, `src/governance/proposal-policy.ts` |
| Claimed confidence buys no privilege | `test/hostile-boundary.test.ts` — a confident and an uncertain proposal are treated identically |

Both AI ports — `ReasoningPort` and `AssessmentBoundary` — are currently unwired. Nothing in this article authorises wiring them; that is Phase 5, gated on Phase 4.

*Amendment record. v1.1 (2026-08-29): recording update under A8; enforcement table reports the governance stage as built, following Phase 3. v1.2 (2026-08-29): recording update; hostile-boundary suite built, provenance gaps closed, two limits stated explicitly, following Phase 4. Normative text unchanged throughout.*

---

*Related: [A4 — The Authority Seam](A4-authority-seam.md) · [A6 — Accountability](A6-accountability.md) · [A7 — Fail-Closed](A7-fail-closed.md)*
