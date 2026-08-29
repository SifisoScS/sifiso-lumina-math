# The Math Lumina Foundation

Eight articles governing the Math Lumina learning engine.

**Intelligence may propose. Authority must be explicit.**

---

## Status

| | |
|---|---|
| **Articles** | A1–A8, version 1.0 |
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
| Permission is a token mintable only in governance | A4, A5 | `AuthorizedAction`, `src/governance/authorization.ts` | *Phase 3* |
| Constructing that token elsewhere is a compile error | A4 | negative typecheck | *Phase 3* |
| A hostile proposer cannot cross the seam | A4, A5 | `test/hostile-boundary.test.ts` | *Phase 4* |

Rows marked *Phase N* are claims the articles make that the code does not yet keep. They are listed as gaps rather than quietly omitted.

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
