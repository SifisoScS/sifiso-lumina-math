# The learner-facing surface

What Math Lumina should take from **Lumina AI** (`The-Golden-Ten-Guide/lumina-ai`), and what must not cross.

Lumina AI is a working, hosted product by the same founder: a Node/Express agent runtime with a React front end, 20 skills declared as markdown files, schema validation with a repair pass, tool use, and session memory. It has been in front of people. Math Lumina's terminal has been in front of one person, four times.

That asymmetry is the whole reason for this document. Lumina AI has already learned things about how a learner wants to be met. Some of those lessons are free to take. Some of them answer questions this project has deliberately left open, and taking those would settle a governance question by copying a component.

This is a design note, not an article. It binds nothing. Where it touches an open question it says so, and the register stays the authority.

---

## What the two projects already share

Not by coordination — by convergence.

**The pedagogical layers are the same three.** `LayerTabs.jsx` offers `intuition`, `mechanics`, `exam`. Math Lumina's `PedagogicalLayer` is `"intuition" | "mechanics" | "exam-patterns"`. The same model of how an idea is approached arrived independently in both codebases.

**Follow-ups are offers.** `FollowUps.jsx` shows chips — *"Quiz me on this"*, *"Show me an example"*, *"What connects to this?"* — from a hardcoded map per skill. Math Lumina generates the same shape from the knowledge graph, as `CandidateLearningOpportunity`. Lumina AI has the better interface for it; Math Lumina has the better foundation under it.

**Skills as readable files.** Twenty markdown files loaded at runtime, each declaring purpose, format, and schema. That is the same instinct as `foundation/` — rules a person can read, rather than behaviour buried in code.

---

## Take

### 1. Depth is a control, not a consequence

In Lumina AI a learner picks a layer. In Math Lumina depth is a side effect of which offer they happened to take: choosing "Exam pattern: identify a function relation" silently moved a learner to `exam-patterns` and cut ten offers to four. The terminal now says so, which is an apology rather than a fix.

`activePedagogicalLayer` is already learner state, and `move-toward-layer` is already an opportunity kind. Make depth something a learner sets directly, the way `LayerTabs` does.

### 2. Collect the confidence report the domain already models

`LearnerEvidenceKind` has five members. The terminal produces two — `reflection` and `learner-choice`. `confidence-report` is modelled, validated, replayable, and **collected by nothing**. Lumina AI has `ConfidenceRating.jsx`; Math Lumina has the type and no way to fill it.

This is the same class as the practice experience that was never reachable: a thing that exists, validates, and is never used. Worth closing, and cheap — the domain work is done.

### 3. Next actions as chips, phrased as invitations

`FollowUps` phrases options as things a learner might want, not as system states. Math Lumina's `describeOpportunity` already does this in the terminal. When there is a real interface, keep it.

### 4. Warmth is not a governance risk by itself

Lumina AI's copy is kind, and kindness costs nothing constitutionally. *"Uncertainty isn't weakness — it's honesty"* is a good sentence. What matters is not whether the system is warm; it is whether the warmth is used to steer, and whether anything is inferred from how the learner replies. Warm phrasing of a fixed set of options is safe. See below for where that stops.

---

## Do not take

### The mood signal, as currently used — **O3**

`HealWithSifiso.jsx` asks a learner to declare a mood from five, including **"Feeling anxious"** and **"A little frustrated"**. `agent.js` then injects it into the prompt:

```
## Learner's Emotional State
Mood: {state}
Adjust your tone and pacing to meet this learner where they are.
```

That is emotional state steering a model's output. [O3](../foundation/OPEN.md) is open, and its stated reason is that safeguarding *"requires expertise this project does not have, and getting it wrong is worse than not having the feature"*. Current behaviour is recorded as *"no detection, no escalation."*

The conflict is not that Lumina AI is wrong. It is that **O3 is already answered in production, in the opposite direction, by the same founder** — and Math Lumina's register does not know it. Importing the component would close O3 by copying a file.

A narrower version may be admissible later: a learner-declared, learner-visible state that changes what is *offered* rather than what a model *says*, recorded as evidence they can see and delete. That is a decision for the register, not for a UI port.

### Fact extraction into memory — **O2**

`memory.js` regex-extracts a learner's **name**, **education level** (`grade \d+`, `matric`, `university`), and **goals** from free text, stores them in a process-global `sessions` object, and replays them into later prompts. There is no retention rule, no deletion path, and the store is lost on restart.

Math Lumina narrowed O2 three commits ago to: local file, learner's own machine, nothing transmitted, deletion means deleting the file. Fact extraction is the opposite posture, and it is inference about a person from text they wrote for another purpose — which is exactly what A2 keeps evidence and interpretation apart to prevent.

If Math Lumina ever wants this, it already has the honest mechanism: `DerivedInterpretation`, which is kept separate from the learner's words, carries an uncertainty statement, and can be shown to the person it describes.

### The visual identity — not a risk, but a decision

Lumina AI is dark slate and violet (`#0f172a`, `#a78bfa`). The Math Lumina landing page is parchment and ink (`#f6f1e8`, `#172a3a`). Two visual identities under one name. Neither is wrong; sharing a name while looking like different products is a choice worth making deliberately rather than discovering later.

---

## The thing to settle first

If these projects ever converge — and the shared name, the shared layers, and the shared founder all point that way — the merge does not begin with code. It begins with two entries in [OPEN.md](../foundation/OPEN.md).

**O2 and O3 are not hypothetical here. They are answered, in production, in the opposite direction from this register.** A merge that does not resolve that first will not notice it happening: the components arrive, the behaviour comes with them, and a question that was deliberately left open gets closed by an import.

That is the founding harm class of this project, arriving through the one door the architecture does not watch — not a proposal, not a model, but a file copied from a system that had already decided.
