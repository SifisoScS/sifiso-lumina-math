# Recognition Register

Who holds authority under [A3](A3-authority.md), for what, and since when.

**Append-only.** Revocation is a new entry referencing the one it revokes, never a deletion. The record of who held what, when, is how anyone later reconstructs whether a past decision was legitimate at the time it was made.

Each entry states: **who** (a real, identifiable person) · **role** · **scope and limits** · **from when, until when if bounded** · **who recognised them**.

---

## Entries

### R1 — Sifiso Cyprian Shezi

- **Role:** Founder
- **Scope:** The Math Lumina learning system in this repository. May amend articles A1–A8 under [A8](A8-amendment.md), and may recognise others under [A3](A3-authority.md).
- **Limits:** Bound by the articles as adopted. Amendment only through A8's mechanism. No authority over persons; these articles bind a system.
- **From:** 2026-08-29
- **Until:** unbounded
- **Recognised by:** founding act — see [ADOPTION.md](ADOPTION.md)
- **Notes:** Sole role-holder; also acts as Maintainer. Self-review applies per A3 and is declared in each change. Standing is asserted by the founding act, not derived — stated plainly in ADOPTION.md rather than disguised.

*This entry records the founding act. It confers nothing on its own; ADOPTION.md is the act, this register is the record of it.*

---

## Entry format

```
### R1 — <name>
- **Role:** Founder | Maintainer
- **Scope:** <what this person may decide>
- **Limits:** <what they may not>
- **From:** YYYY-MM-DD
- **Until:** <date, or "unbounded">
- **Recognised by:** <name, or "founding act — see ADOPTION.md">
- **Notes:** <e.g. sole role-holder; self-review applies per A3>
```

---

## Standing notes

**Sole role-holder.** While one person holds every role, that fact is recorded in each change they authorise, per A3. Self-review is not prohibited here — for a solo project it is unavoidable — but it is declared rather than disguised.

**Succession.** If no successor is named here and the Founder becomes unavailable, the order lapses rather than freezing. See [A8](A8-amendment.md).

**AI holds no entry in this register and cannot.** No model, agent, or tool is recognisable under A3. See [A5](A5-ai-boundary.md).
