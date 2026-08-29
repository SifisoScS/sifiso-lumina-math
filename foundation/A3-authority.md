# A3 — Authority

*Article 3 of the Math Lumina foundation. Version 1.0.*

## What authority is

**Authority is permission to make a decision that binds the system.** It is held by named people, for stated scopes, and it is recorded.

Nothing holds authority by default. Not the repository owner, not a maintainer by job title, not a model, not a process, not this document.

## Roles

Two, deliberately. More can be added under A8 when there is a real need; inventing roles before there are people to fill them is how the previous order became unusable.

**Founder.** May amend these articles under A8, and may recognise others. Named in `ADOPTION.md`.

**Maintainer.** May authorise changes to code, tests, and policy *within* what these articles permit. May not amend the articles. Initially the founder.

## How someone is recognised

By an entry in `foundation/RECOGNITION.md`, appended by someone who already holds authority to do so, stating:

- who (a real, identifiable person)
- which role
- what scope, and any limits
- from when, and until when if bounded
- who recognised them

Append-only. Revocation is a new entry, not a deletion — the record of who held what, when, is how anyone later reconstructs why a decision was legitimate.

## Where the first authority comes from

It is asserted, not derived.

No document can establish its own founding authority; any criterion of legitimacy would itself need legitimating, and that regress does not terminate inside any text. Every founding act ends it the same way — by someone standing up and doing it in their own name.

`foundation/ADOPTION.md` is that act. It cites nothing prior: not the D1–D55 corpus, not ownership of the repository, not any analysis, not any AI. It says plainly that standing is claimed rather than proved.

**Legitimacy accrues afterwards** — from the order being honoured when it is inconvenient, from decisions being recorded honestly, from the system doing what it says. It is earned in operation, not established in a preamble.

## What is never authority

- Ownership of the repository, or write access to it
- Authorship of a document, including this one
- Having built something, or having been here longest
- A title, a role name, a position in a workflow, or presence in a review
- Storage location, filename, directory, or commit history
- Technical capability, confidence, correctness, or thoroughness
- Any AI output, from any model, however good
- Practical necessity, urgency, or the fact that something needs doing

## When one person holds every role

This will be true for some time, and pretending otherwise would be worse than saying it.

Where the same person proposes and approves a change, that fact **must be recorded in the change itself**. Self-review is not prohibited — for a solo project it is unavoidable — but it must be visible, so that anyone reading later can weigh it. Undeclared self-approval is the failure; declared self-approval is a known limitation.

The same applies to AI-drafted material approved by the person who commissioned it. Say so.

## What this does not establish

- Any threshold, quorum, voting rule, or approval count. Not needed at one person; adding them now would be theatre.
- Any institutional, legal, corporate, or regulatory standing. These articles are not a legal instrument.
- Any external accreditation, professional, or safeguarding authority.
- Any claim that the founder's standing is legitimate in a sense beyond what is written above. It is asserted. That is stated openly rather than disguised.
- Any authority over people. These articles bind a system, not persons.

## Enforced by

Authority is recorded in `foundation/RECOGNITION.md` and exercised through commits. The technical enforcement lives in A4 and A5: no code path can produce an authorised action without going through the governance module, regardless of who or what is calling it.

---

*Related: [A4 — The Authority Seam](A4-authority-seam.md) · [A6 — Accountability](A6-accountability.md) · [A8 — Amendment](A8-amendment.md)*
