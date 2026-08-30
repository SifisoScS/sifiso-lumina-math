# A5 — AI Boundary

*Article 5 of the Math Lumina foundation. Version 1.5.*

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

Two limits worth stating plainly rather than papering over.

A model's *calibration* cannot be verified from outside it. What is guaranteed is that a confident claim and an uncertain one are treated identically, so confidence buys nothing.

And **learner-facing text is screened for claims about the system's own standing, but only for the ones that say so.** Text speaking of approval, review, authority, or policy is refused before governance sees it. A claim reworded to avoid that vocabulary is not caught, and a hostile test holds that limit open on purpose rather than letting the screen be mistaken for coverage it does not have. What holds regardless is structural: permission is attributed to the policy and never to anything a proposal says, and a proposal's words reach no field the engine acts on. See OPEN.md O7, closed.

## Showing machine text to a person

Because that screen is a floor rather than a guarantee, **a surface that shows machine-originated text to a learner must show it as machine-originated, and beside the learner's actual record rather than in place of it.**

A learner who can see what is recorded about them can check any claim made about it. That is what makes an unscreened claim survivable: not that the words were caught, but that the person reading them can see they changed nothing.

No surface shows model text today. This binds the first one that does.

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
| The engine cannot involve reasoning unless a proposal was actually used | `reasoningInvolved`, `src/decisioning/engine.ts` |
| AI cannot construct permission | `AuthorizedAction`, `src/governance/authorization.ts` |
| Only explanation, representation and dialogue kinds are admissible | `admissibleProposalKinds`, `src/governance/proposal-policy.ts` |
| A hostile model cannot cross the seam | `test/hostile-boundary.test.ts` — 19 tests, 15 attack kinds |

The full enforcement map is in [README](README.md); the rows above are the load-bearing ones.

`ReasoningPort` now has a real adapter, admitted for one task kind. **Nothing in the engine calls it**, so `reasoningInvolved` is still `false` and no proposal has reached a learner. `AssessmentBoundary` remains unwired, and O4 bars it regardless.

The adapter receives concept text and nothing else — no learner material reaches a provider, enforced by a content type with no field for any. It supplies only a summary and an uncertainty statement; identity, task, kind, evidence scope and provenance are built from the task.

*Amendment record. v1.1 (2026-08-29): governance stage reported as built. v1.2: hostile suite built, provenance gaps closed, two limits stated. v1.3: policy limits bound to the policy; task kinds classified exhaustively. v1.4 (2026-08-29): a real model admitted behind the port for explanation-generation, verified against live output; no learner data is sent and the engine still does not call it. All recording updates under A8; normative text unchanged throughout.*

---

*Related: [A4 — The Authority Seam](A4-authority-seam.md) · [A6 — Accountability](A6-accountability.md) · [A7 — Fail-Closed](A7-fail-closed.md)*
