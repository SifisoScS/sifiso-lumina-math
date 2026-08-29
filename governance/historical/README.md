# Historical Constitutional Corpus — D1–D55

**Status: preserved and superseded.**

This directory holds the constitutional corpus that governed Math Lumina until August 2026. It is kept as **source material and historical record**. It is not in force, and nothing in it authorises anything.

The corpus was superseded by the articles in `/foundation`, which derive no authority from it.

---

## What is here

36 readable specifications, `D20` through `D55`, byte-identical to the state tagged `constitutional-corpus-final` (commit `4596d3c`). The empty `proposed/` directory is preserved because its emptiness is itself a fact: no decision was ever formally proposed through it.

**D1–D19 are not here.** Their text does not survive — not in this repository, not in the Manus archive, not anywhere that has been searched. Only references to them survive, inside the specifications that depend on them.

---

## Why it was superseded

Three compounding failures, none of them a software defect:

**1. The foundation was lost.** D1–D19 existed only in a working conversation and were never committed. Every specification from D20 onward derives from text nobody can read. A chain cannot be repaired by adding links to the readable end of it.

**2. It never said how it could be changed.** D38 §15 and D49 §17 each name the missing amendment thresholds, approval model, reviewer set, quorum, institutional authority and appointment methods — and expressly decline to define any of them. With no rule for its own amendment and no way to recognise an actor, the corpus reached a state where nothing could lawfully be authorised. That is the direct cause of the freeze.

**3. Nothing enforced it.** Thirty-six prose documents, none of them executable. A defect that fabricated learner consent — three of five choice kinds produced a commitment identical to acceptance — survived in `state-transitions.ts` for the corpus's entire lifetime, untested and unnoticed, while the corpus that existed to prevent exactly that harm grew to 36 specifications. It was fixed in commit `461d7e4`, openly outside the constitutional process, because the process could not authorise anything.

---

## Known unresolved conditions

These are recorded so nobody spends time rediscovering them.

**The status conflict.** 33 specifications (D20–D52) carry `PROPOSED / HUMAN REVIEW ONLY` at line 3. The literal string `APPROVED` appears in none of them. D53's preamble states that "D1–D52 are preserved exactly as approved and locked." Both are primary text and they contradict each other. D38 §9 bars resolving the conflict by decision number, recency, document location, implementation status, usage frequency, approval convenience, provider trust, technical deployment, operational urgency, AI confidence, majority interpretation, or summary text — which exhausts every available route. The `PROPOSED` markings were *instructed* by the original commissioning briefs, so changing them would be substantive, not an administrative correction under D38 §6.

**R1 = B.** No valid D31 Requirement can be derived from D39 §8. The section identifies the prohibited behaviour but D1's replacement semantics are lost, so what the affected choice kinds *should* do instead is not recoverable from any surviving text.

**R2 = C.** No lawful path exists for a recognised actor to authorise a bounded implementation scope under D39. D15–D16 govern recognition; their text is lost, and no actor was ever recognised.

**Constituent standing is undetermined.** The corpus contains no vocabulary for its own founding — the words *constituent*, *founding*, *founder* and *bootstrap* appear nowhere across all 36 specifications in that sense. The question of who could constitute an authority structure is neither answered nor denied here. It is simply outside what this corpus can address.

---

## What must not be inferred from this directory

- That anything here is in force, approved, or authorised.
- That its location, filename, directory, or preservation confers status. D38 §14.4 bars exactly that inference, and it still reads correctly.
- That D53–D55 carrying `APPROVED / LOCKED` settles the status of D20–D52. It does not; that is the conflict above.
- That the new foundation in `/foundation` inherits, continues, amends, or repairs this corpus. It does not. It derives nothing from it.
- That the ideas here are wrong. Most of them are good, which is why they are preserved. The failure was structural, not intellectual.

---

## What was worth keeping

Carried forward into `/foundation` as ideas, not as authority:

- **Capability is not authority.** A system able to do something is not thereby permitted to do it.
- **Non-collapse.** Evidence, interpretation, proposal, decision, commitment, effect and learner choice are distinct and must not silently become one another.
- **Plausible illegitimacy** as the harm to guard against — something that looks authorised while it is not.
- **Fail-closed** under uncertainty, conflict, or missing authority.
- **Explicit open questions** rather than silently hard-coded rules (the `openPolicyExtensionPoints` pattern in `src/domain/policy-governance.ts` came from here).
- **"What this does not establish"** as a required section — the single most useful discipline in the corpus.

The lesson the new order encodes: a constitution must state how it is amended, must not depend on text that can be lost, and must be enforced by types and tests rather than only by prose.

---

*Preserved 2026-08-29. Tag: `constitutional-corpus-final` at `4596d3c`. Do not edit these files.*
