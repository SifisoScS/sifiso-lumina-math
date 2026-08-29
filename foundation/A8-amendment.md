# A8 — Amendment, Preservation, and Succession

*Article 8 of the Math Lumina foundation. Version 1.0.*

> The previous constitutional order had no article like this one. That is why it froze. Everything below exists to prevent the same failure.

## How these articles change

An amendment is a commit that:

1. Changes an article's text and **increments its version**
2. States what changed and why, in the commit message
3. Is authorised by the Founder under A3
4. Declares self-review where the author and the authoriser are the same person, or where AI drafted the text

Amendments are **additive and prospective**. They change what happens next. They do not retroactively invalidate decisions that were legitimate under the version in force when they were made.

If an amendment changes what an article's *Enforced by* table claims, the code and tests change in the same commit — or the article states plainly that enforcement is not yet built. An article that claims enforcement it does not have is worse than one that admits the gap.

## Three things an amendment may never do

**1. Remove the ability to amend.** No amendment may delete this article, remove the amendment rule, or leave the order without at least one living person able to exercise it. An order that cannot change itself is a trap; the previous one demonstrated this at length.

**2. Create a fail-closed condition with no named exit.** See A7. Every hold must say what would lift it.

**3. Make an article depend on text that is not in this directory.** See below.

## Self-containment

**No article may derive its meaning from text outside `foundation/`.**

References to the historical corpus, to external documents, to prior conversations, or to anything else are context only. If an article's meaning cannot be recovered by reading `foundation/` alone, it is defective and must be rewritten.

This is the direct lesson of D1–D19: nineteen decisions existed only in a working conversation, were never committed, and are now unrecoverable — taking the foundation of thirty-six dependent specifications with them.

## Preservation duty

- Every article is committed to the repository and pushed to a remote.
- Version history is preserved in git; significant states are tagged.
- At least one copy exists outside the repository.
- Superseded material is archived and marked, never deleted.

Nothing load-bearing may exist only in a conversation, only in a chat log, only in someone's memory, or only on one machine.

## Size discipline

**Two pages per article. Eight articles.**

If an article needs more room, it is doing too much and should be narrowed, not extended. If a ninth article seems necessary, first check whether an existing one should be sharpened instead.

Growth in this directory is a warning sign, not progress. The previous order reached thirty-six specifications and became unusable — not because any single one was wrong, but because the whole exceeded what anyone could hold, check, or enforce.

## Open questions

Matters deliberately not decided are recorded in `foundation/OPEN.md` rather than silently hard-coded into implementation. An open question is an honest state; an implicit answer buried in code is not.

Currently open, and known to be real obligations rather than oversights:

- Delegated choice by a parent, guardian, or teacher
- Privacy, retention, deletion, and jurisdiction
- Safeguarding and wellbeing escalation
- Assessment, mastery, readiness, and progression thresholds
- Whether any prerequisite may restrict access

Closing one of these is an amendment.

## Succession

If the Founder becomes unavailable, authority passes to whoever is named as successor in `foundation/RECOGNITION.md`.

**If no successor is named, the order lapses.** It does not freeze, and it does not persist as an unamendable relic. The articles become historical material; the code remains under its licence; anyone continuing the work founds their own order in their own name, exactly as `ADOPTION.md` did.

An order that outlives everyone able to change it is the failure this article exists to prevent. Ending cleanly is better than freezing indefinitely.

## What this does not establish

- Any threshold, quorum, voting rule, or waiting period. Not needed at one person; adding them now would be ceremony.
- Any legal succession, estate, or corporate mechanism. These articles are not a legal instrument.
- Any obligation to continue the project, or to amend anything.
- Any claim that the amendment rule is itself legitimate beyond A3's asserted footing.

## Enforced by

Not enforceable in code. This article is enforced by being followed — and by the fact that its absence, last time, stopped everything.

The nearest thing to a mechanical check: if `foundation/` grows past eight articles or any article past two pages, something has gone wrong and should be examined before it is accepted.

---

*Related: [A3 — Authority](A3-authority.md) · [A7 — Fail-Closed](A7-fail-closed.md) · [Historical corpus](../governance/historical/README.md)*
