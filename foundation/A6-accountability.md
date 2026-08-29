# A6 — Accountability and Provenance

*Article 6 of the Math Lumina foundation. Version 1.2.*

## The rule

**Every consequential action can be traced to a named cause a person could inspect.** If the system cannot say why something happened, it should not have happened.

## What a consequential action must carry

- **What changed** — the specific state dimensions, not a summary
- **What authorised it** — a learner choice, an accepted command, accepted evidence, or a policy with its version
- **On what basis** — the evidence actually relied on, by identifier
- **Under which rules** — the context and policy versions in force at the time
- **When** — an explicit timestamp, not an inferred ordering
- **Whether a machine was involved** — and if so, which proposal, carrying its uncertainty

## Provenance is observable, not narrative

Provenance references things that exist and can be checked: identifiers, versions, timestamps. It is not an explanation of reasoning, and a plausible account of *why* something was done is not a substitute for a record of *what* it was based on.

A confident rationale with no citable basis is worth less than a terse record with real references.

## Uncertainty survives

Where something is uncertain, the uncertainty travels with it. It is not rounded away at a boundary, not dropped when a value is passed on, and not converted into confidence by being repeated.

An unknown is recorded as unknown. It is never silently treated as zero, as failure, as absence, or as a negative result.

## History is additive

The record is append-only. Corrections are new entries that reference what they correct; they do not overwrite.

This is not bureaucratic instinct — it is the only way a learner can later see what the system did, and the only way anyone can tell whether a past decision was legitimate at the time it was made. A record that can be quietly rewritten cannot support either.

Replay of the same history produces the same state. If it does not, the record is wrong and the discrepancy is a defect, not a rounding difference.

## What a learner may see

A learner may ask what the system holds about them, what it did, and why. The answer is drawn from the record, in terms they can follow.

This is a design commitment, not yet an implemented feature. It is written here so that it constrains the design rather than being retrofitted onto it.

## Self-review is declared

Where the same person proposes and approves, or where AI drafts material approved by whoever commissioned it, the change says so. See A3. An undeclared conflict is the problem; a declared one is a known limitation a reader can weigh.

## What this does not establish

- Any storage technology, format, schema, database, or retention period.
- Any privacy, data-protection, retention, deletion, or safeguarding rule. These are real obligations and they are **open** — see A8. Nothing here substitutes for them.
- Any audit, certification, or reporting standard.
- Any specific interface by which a learner exercises the right described above.
- That a complete record makes an action right. Traceability is necessary, not sufficient.

## Enforced by

| Rule | Where |
|---|---|
| Decisions require observable references, not hidden reasoning | `DecisionProvenance`, `src/domain/provenance.ts` |
| A commitment names exactly the dimensions it changes, and they must match its delta | `stateCommitment`, `src/domain/learner-record.ts` |
| Events form an ordered, causally linked trail tied to a commitment | `historicalEvent`, same file |
| Replay reconstructs the same state and rejects missing history | `replayLearnerHistory`, `src/decisioning/replay.ts` |
| Uncertainty is a validated value object, defaulting to unknown | `UncertaintyStatement`, `src/domain/primitives.ts` |
| A claim may not be more confident than the basis it rests on | `claimsMoreConfidenceThan`, same file; enforced in `evaluateGovernance` |
| Material about a learner cannot be cited outside the scope declared for them | `provenanceScope`, `src/governance/proposal-policy.ts` |
| A task's scope is derived from one learner's own record, so it cannot name another's | `reasoningScopeForContext`, `src/decisioning/reasoning-scope.ts` |
| Learner-owned reflection text cannot be silently overwritten | `assertReflectionPreserved`, `src/domain/policy-governance.ts` |

*Amendment record. v1.1 (2026-08-29): recording update under A8. Normative text unchanged. Hostile testing found two ways the rules above were stated but not enforced: a proposal could claim low uncertainty on a basis stated as uncalibrated, laundering confidence out of nothing; and material about one learner could be cited as the basis for material shown to another. Both are now checked. v1.2 (2026-08-29): recording update; scope is now derived from the assembled context rather than declared by hand, so the cross-learner case is closed a second time and earlier.*

---

*Related: [A3 — Authority](A3-authority.md) · [A4 — The Authority Seam](A4-authority-seam.md) · [A7 — Fail-Closed](A7-fail-closed.md)*
