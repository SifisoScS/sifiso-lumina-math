# A4 — The Authority Seam

*Article 4 of the Math Lumina foundation. Version 1.2.*

## The principle

**Capability is not authority.** That something can be done is not a reason it may be done, and no amount of being right about it changes that.

## The ladder

Every consequential path through the system passes through six stages. There is a line between the third and the fourth.

```
  1. Evidence          what was observed
  2. Interpretation    what it might mean
  3. Proposal          what could be done
════════════════════════════════════════════  ← the seam
  4. Policy evaluation whether it is permitted
  5. Authorised action permission, minted
  6. State transition  the system changes
```

Above the seam: **material**. Anything may contribute — a person, a computation, a model. Being above the line carries no weight; a proposal is a suggestion regardless of who made it or how good it is.

Below the seam: **consequence**. Only an authority recognised under A3, acting through a policy authorised in advance, reaches here.

**Nothing crosses the seam by being convincing.** Not a confident model, not a correct interpretation, not an obviously good idea, not an urgent one.

## Why the line sits there

Because the failure mode is **plausible illegitimacy**: something that looks authorised while it is not.

A wrong output is easy to catch. An output that is *right*, well-reasoned, well-evidenced and unauthorised is not — it passes every check a reader would think to apply, and it is exactly what a capable system produces most of the time. The seam exists because correctness is not a permission, and the more capable the thing above the line becomes, the more important that distinction gets.

## Non-collapse

These are distinct and must never silently become one another:

```
evidence → interpretation → proposal → policy evaluation
  → authorised action → state change → learner choice → historical record
```

Each arrow is a real step with its own justification. Collapsing any two of them is how a system starts deciding things it was never permitted to decide. The most dangerous collapses:

- **interpretation → conclusion** — "the evidence suggests" becoming "the learner is"
- **proposal → decision** — "this could be offered" becoming "this was chosen"
- **delivery → consent** — "they were shown it" becoming "they agreed"
- **computation → authority** — "the system calculated it" becoming "the system may act on it"

## Authorisation is a thing, not a state of mind

Permission is represented explicitly and can be pointed at: which policy, which version, which evidence, who authorised the policy and when. "It seemed fine" is not an authorisation. Neither is "the checks passed."

If a change to learner state cannot name its authorisation, it does not happen.

## What this does not establish

- Which policies exist, or what they permit. That is policy work under A5 and A6, not a matter for this article.
- Any specific pedagogical or assessment decision.
- That everything above the seam is safe. Material can be wrong, biased, or harmful; the seam governs authority, not quality. Quality is A7's problem and the learner's.
- Any prohibition on capable systems. Capability is welcome. Sovereignty is not.

## Enforced by

| Rule | Where |
|---|---|
| No AI-originated variant of commitment authorisation exists | `StateCommitmentAuthorization`, `src/domain/learner-record.ts` |
| Authorisation checked at the domain kernel | `assertCommitmentHasLearnerAuthorization`, `src/domain/policy-governance.ts` |
| A proposal carries no decision and no state | `ReasoningProposal`, `src/contracts/reasoning-port.ts` |
| Permission is a token mintable only inside the governance module | `AuthorizedAction` and `evaluateGovernance`, `src/governance/authorization.ts` |
| Constructing that token outside governance is a compile error | brand symbol is unexported — verified: removing it fails typecheck with TS2578 |
| A fabricated token fails at runtime even if cast into the type | `isMintedAuthorization`, module-private WeakSet |
| Admitting machine material is not a state change | `AuthorizedAction` carries no delta, commitment, or authorization field |
| A proposal may not claim a downstream stage as its own basis | `admissibleProvenanceKinds`, `src/governance/proposal-policy.ts` |
| A hostile proposer cannot cross the seam | `test/hostile-boundary.test.ts` — 16 tests against an adversarial provider |

The seam is a compile error, not a paragraph, and every row above is built.

Hostile testing earned its place immediately: it found that provenance was a second, unchecked channel into the same decision. A proposal could cite the very policy about to evaluate it — reading as prior approval it did not have — or keep `evidenceIds` clean while smuggling out-of-scope learner evidence through `provenance.references`. Both are now refused. Neither was visible from reading the article.

*Amendment record. v1.1 (2026-08-29): recording update under A8; enforcement table reports the seam as built, following Phase 3. v1.2 (2026-08-29): recording update; hostile-boundary suite built and two provenance-channel gaps closed, following Phase 4. Normative text unchanged throughout.*

---

*Related: [A2 — Learner Agency](A2-learner-agency.md) · [A5 — AI Boundary](A5-ai-boundary.md) · [A6 — Accountability](A6-accountability.md)*
