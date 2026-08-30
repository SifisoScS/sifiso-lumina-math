# Found by use

**Every defect that mattered in this project was found by someone using the
thing. None of them was found by reading it.**

That sentence is the most useful thing Math Lumina has produced so far, and it
is worth something to people who will never open the product. This file is the
evidence for it, written so it can be checked rather than believed.

---

## What the claim actually says

It does not say review is worthless. Review caught plenty here: type holes,
missing scope checks, an unbranded identifier, a confidence value laundered
through provenance. Those were real and they were caught by reading.

It says something narrower and more uncomfortable:

> The defects that **harmed the learner** — the ones that broke the thing the
> system exists to protect — were invisible to review, and every one of them
> was sitting inside a codebase that was passing its entire test suite at the
> time.

The suite was not thin. When the worst defect in this list was live, **126
tests were green.** Today there are 227, and the honest position is that a
228th class of defect is probably live right now and will be found the same
way.

---

## The ledger

Each entry: what a learner experienced, why the tests were happy, and what was
done about it. Every one is in the git history under the commit named beside
it.

### 1. The system answered "stop" by starting

*`The first real session found an agency violation`*

A person using the terminal chose **"Stop for now."** The engine committed them
into active engagement with a concept.

Two of the ten opportunity kinds — `pause` and `allow-learner-choice` — do not
name anywhere to go. Accepting an offer reached the movement delta for all ten.
So accepting "stop" moved the learner toward the thing they were stopping.

This is the harm this entire project is organised against: **an explicit
request answered with its opposite.** A2 exists for it. 126 tests did not
notice, because every test asserted what happens when a learner accepts an
offer that *names a destination*, and nobody had written down that two of them
do not.

Fixed as a class, not an instance: `opportunityAcceptanceEffect` is now
exhaustive over the union with a `never` assertion, so a new opportunity kind
does not compile until someone decides whether accepting it moves anybody.

### 2. A learner picked a concept and was shown nothing

*`A depth belongs to the idea it was chosen for`*, *`Show the learner the material`*

A person opened a session, chose **Domain and Range**, and was told there was
nothing on offer. The terminal opened every session at the intuition layer — a
depth nobody had asked for — and that concept had no material at intuition.

A depth was chosen on the learner's behalf, and the only effect was to hide
everything there was to show them.

### 3. Three sessions in, no learning material had ever been displayed

*`Show the learner the material`*

The engine resolved knowledge assets correctly. Offers named them correctly.
Provenance carried them correctly. Every test about material passed.

Nothing rendered them. A learner could be offered "a way of picturing this" and
select it, and read the name of the thing and never the thing.

### 4. The only practice question in the corpus was unreachable

*`A question a learner cannot answer is not material`*

`experience.function.practice-input-output` declared intent `practice` at the
`intuition` layer. Practice is suitable at `mechanics` and `exam-patterns` and
never at `intuition`, so it was filtered out of every decision that could have
offered it.

**For the entire life of the project, no learner had ever been offered a single
question to try, in any concept.** The catalogue validated. The experience
existed. It was simply unreachable, and nothing said so, because a corpus can
be wrong in ways no type can catch.

### 5. Three more questions nobody could answer

*`A question a learner cannot answer is not material`*

Fixing #4 exposed the next layer. Three practice experiences declared
`expectedEvidenceTypes: ["practice-attempt"]` — a promise that a learner can do
that thing — while no surface could take an answer. A learner was shown a
question and given nowhere to put a response.

*Offerable* and *answerable* were different properties and nothing connected
what the corpus declares to what a surface implements.

### 6. A pause recorded as accepting a learning path

*`Second session: a false count, an ignored pause, and O9`*

The record said the learner had accepted a path. They had asked to stop.

### 7. The record counted choices as reflections

*`Second session: a false count, an ignored pause, and O9`*

"Written down: 3" when the learner had written nothing down. Three button
presses had been counted as three pieces of the learner's own writing — the
exact distinction A2 keeps evidence and interpretation apart to protect,
collapsed at the only place a person could see it.

### 8. The system claimed movement that never happened

*`Close O8: a commitment never claims a change that was not made`*

A commitment declared a state delta that, applied, changed nothing — because the
learner was already there. The record therefore said something had happened
when it had not, and became the reason O8 was closed rather than a bug fixed
quietly.

### 9. Two identical offers, in the same list

*`Phase 6: a terminal a learner can use, and a duplicate-offer fix`*

Two `continue` opportunities differed only by which experience they led to, and
the surface described both with the same sentence. A learner saw the same
option twice and could not tell them apart.

### 10. Offers named the concept the learner had just left

*`Offers describe where the learner is now`*

### 11. "Your work is saved" — after the learner had deleted it

*`Do not tell a learner their record is saved when it is gone`*

A learner typed `forget`, and the closing line still told them their record was
kept. The single worst thing a privacy affordance can do is lie about itself in
the direction of comfort.

### 12. Depth followed a learner into concepts they had never opened

*`A depth belongs to the idea it was chosen for`*

Depth was one field on the learner's state, not one per concept. Choosing
"exam patterns" for one idea silently set the depth for every other idea in the
system — including ones they had never seen. The learner's own choice was
turned into a claim about them.

### 13. Nine assets written, shown to nobody

*`Grow the corpus, and find that practice never worked`*

Nine knowledge assets existed in the corpus and were referenced by no
experience. Written, validated, versioned, and unreachable.

### 14. A learner could not read their own words

*`Phase 9: a learner reads their own words back`*

`originalText` — the learner's writing, exactly as typed — was stored from the
very first session and displayed by nothing, in either surface. A learner saw
"Written down: 1" and could not read the one.

A record its subject cannot read is a record *about* them, not *theirs*.

**Honest caveat: this one was found by survey, not by use.** It belongs in the
list because it is the same defect class — modelled, validated, stored, never
surfaced — but nobody hit it in a session.

### 15. Two sessions in the same millisecond cost a learner their history

*`Phase 9: a learner reads their own words back — and CI finds a real bug`*

The session token was the clock in base 36, and a session's step counter
restarts at zero, so two sessions started in the same millisecond minted the
same opening identifier. Appending to the record compared identifiers and kept
whichever arrived first — which cannot tell *the same thing again* from *a
different thing whose identifier collides*.

In memory it looked right. After a save and a load, a depth the learner had
chosen was simply gone.

**Found by CI, on its first run, on a Linux runner.** Windows was slow enough
to hide it and had hidden it for the entire project. Different hardware is a
kind of use.

### 16. A wall of twelve concepts with nothing saying they were two subjects

*`Phase 10`*

Growing the corpus from five concepts to twelve broke a picker that had been
fine at five. A learner met "Rules That Turn" directly above "Patterns Whose
Growth Itself Grows" with no indication that these belong to different topics.

Listed here because it is the honest shape of the pattern: **the change that
adds value is usually the change that breaks something,** and no test in the
suite was about how a list reads to a person.

### 17. A test that proved nothing

*`Phase 10`*

A guard was written asserting that every concept offers something at every
depth. Breaking the corpus deliberately did not fail it — every concept has a
reflection experience declared at all three layers, so the answer was always
yes.

Included because it is the same failure one level up: **a test that passes for
the wrong reason is worse than no test,** and the only way that was discovered
was by breaking the code and watching what the suite did about it.

A second guard written the same afternoon failed in the opposite direction — it
was *too* strict, and its first run rejected content that was perfectly fine.
That one is the cheap failure. A guard that is wrong tells you immediately; a
guard that is vacuous never tells you anything.

### 18. Asking for a depth moved the learner to a different concept

*`A depth chip is about the idea you are looking at`*

Taking a bridge offer moves the learner to the concept it bridges to. Both
surfaces went on holding the concept the session had opened on, and passed it
back to the engine on the learner's next action.

Three of the four entry points quietly ignored that stale argument and used the
learner's current concept. The fourth, `chooseDepth`, honoured it — so clicking
a depth chip sent the concept they had left, and the engine obligingly **moved
them back to it.**

Four clicks from a cold start: open a concept, take the bridge, click a chip.
The learner asked how to approach an idea and was moved to a different idea.
That is entry 1's harm class again, arriving through the surface rather than
the engine, in a system whose whole first article is about not doing this.

The defect was not the stale argument. It was that **four functions taking the
same parameter disagreed about what it meant**, so a caller that was correct for
three was silently wrong for the fourth. All four now behave identically.

**Honest caveat: found by reading, not by use** — while the founder was going
through the system and reporting no issues. Which is the entry's real lesson:
the founder is the one person who cannot run this test, because they know which
chip to click and why.

---

## What review did catch

Stated so the ledger is not read as a claim that reading is useless:

- an identifier that could be forged by an `as` cast — closed with a module-private
  `WeakSet` behind an unexported brand symbol;
- a confidence value laundered from evidence into provenance and back out as a
  conclusion;
- reasoning scope derived from a command rather than from assembled context;
- a busy port answered with a stack trace;
- an authority claim in prose that governance would have accepted as governance.

All real, all found by reading, none of them something a learner would have
felt. That is the pattern: **review protects the system, use protects the
person.**

---

## The method, in three rules

Nothing here is novel. It is only unusual to actually do it.

**1. Use the thing, as the person it is for, before believing any of it.**
Not a demo script. Not a test fixture. A session, with a real intention, on the
surface a real learner would touch.

**2. Every guarantee is proven by breaking it.** A test is not accepted until
the code it defends has been deliberately broken and *that specific test* has
been watched failing. Entry #17 is what happens when this rule is followed and
entry #4 is what happens when it is not.

**3. Fix the class, not the instance.** Every entry above was closed with a
structure that makes the whole class a compile error where possible — usually an
exhaustive `switch` with a `never` assertion, which turns "somebody should
remember this" into "this does not build."

The recurring defect underneath almost every entry is one shape:

> **A real distinction exists in the domain and is written nowhere the compiler
> can see.**

Practice-at-intuition is unreachable, and the type says nothing. Two opportunity
kinds name no destination, and the type says nothing. Depth belongs to a
concept, and the type said it belonged to a learner. Every fix is the same move:
put the distinction somewhere that fails the build.

### 19. “Try a question” never asked one

*`A question a learner is asked has to exist`*

Twenty-four experiences declared `expectedEvidenceTypes: ["practice-attempt"]`.
Both surfaces collected an answer. Every guard in the suite passed. **No asset
in the corpus posed a question** — not one ended in a question mark, because
there was no asset kind that could hold one.

A learner choosing “Try a question” was shown a worked example — which gave the
method away — and then an answer prompt. They typed `7`. Nothing had been asked.

This is the deepest instance of the recurring shape in this file. `practice`
said what the *surface* should collect and never what the *learner* should be
asked, and `KnowledgeAssetKind` had no member for asking, so the corpus could
not be wrong about it in any way a type or a test could detect. It had been that
way since the first practice experience existed.

Closed by adding the missing kind, writing all 24 questions, showing them last —
a question read before its supporting material is asked too early — and two
guards. Of which the second proved nothing on its first run, *again*: the corpus
lists its questions last already, so ordering passed whether or not anything
sorted. It is now built from a synthetic experience with the question declared
first.

**Found by walking a real session in the terminal** — the surface no test can
drive — after 226 tests, a fuzz walker, and two readers had all reported clean.

---

## Standing in for the stranger

The gate this project cannot close by writing code is a person who is not the
founder using the system. The reason it matters is entry 18: the founder sets a
depth before following a bridge, because they know what the chips do. A stranger
takes the interesting-looking option and *then* reaches for a control, and that
ordering is the whole defect.

That much can be mechanised. `test/learner-walk.test.ts` drives the session layer
with seeded pseudo-random orderings — taking, declining, deferring, writing,
answering, asking for a depth, and leaving and coming back another day — and
holds every step to invariants that must be true whatever a learner does:

- only taking up an offer ever moves a learner;
- everything the learner supplies is filed where they actually were;
- a depth is only recorded for an idea they have opened;
- the offers on the table describe where they are now;
- nothing they have done is ever lost, including across a return visit;
- every word they could be shown comes from the catalogue.

Where a scripted test asserts that one chosen path is right, this asserts that
**no path is wrong.** 160,000 steps, no violations.

It was worthless on its first run. Defect 18 was deliberately restored and the
walker passed, because the invariant that mattered — *asking for a depth must
not move you* — was the one I had not written, and because the walk recorded
whatever concept the engine had landed on, which laundered the very move it was
meant to catch. It now fails on seed 1 step 11 with 18 restored, and fails the
return-visit checks with defect 15 restored. Entry 17, one more time.

**It is not a person.** It does only what it was told a learner might do. It has
never typed nonsense into a prompt, deleted its record halfway through, mistaken
one control for another, or given up. It cannot tell you that a sentence reads
badly, that an option is frightening, or that a page is unusable on a phone.
Every entry in the ledger above came from a person meeting the system with an
intention, and no amount of this replaces one.

---

## What this does not prove

- **No stranger has used it.** Every session in this ledger was the founder's
  own, or CI's, or a walker's. The next entry in this list will come from the first person who
  is not either, and that gate is deliberately still open.
- **Nothing here checks that the mathematics is correct.** 227 tests prove that
  content is reachable, shown, and unmodified. Not one of them knows whether the
  content is true. See [`src/seed/AUTHORSHIP.md`](src/seed/AUTHORSHIP.md).
- **The count is not the argument.** 227 green tests is exactly the state the
  project was in when it was answering "stop" by starting.

---

## Checking this yourself

```bash
pnpm install
pnpm check          # strict typecheck, then the full suite
pnpm learn          # the terminal surface — use it as a learner
pnpm ui             # the same engine in a browser, at 127.0.0.1

# a longer soak of the walker; a failure names the seed that reproduces it
LUMINA_WALKS=4000 LUMINA_WALK_STEPS=40 npx tsx --test test/learner-walk.test.ts
```

The claims above are checkable three ways:

- **`git log`** — every commit is named for what it found, in order.
- **Test comments** — each guard records the defect it exists to prevent, in
  the file where it lives.
- **The enforcement map** — [`foundation/README.md`](foundation/README.md)
  lists every constitutional rule beside the test or build gate that fails when
  it is broken, and marks the ones nothing enforces as `by review` rather than
  quietly counting them.

That last distinction is the whole discipline in one line: **a row claiming
enforcement it does not have is worse than an admitted gap.**
