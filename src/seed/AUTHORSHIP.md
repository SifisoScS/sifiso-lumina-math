# The corpus — who wrote it, and who is answerable for it

Everything a learner reads in Math Lumina comes from the files in this
directory. No model is in that path: `materialFor` looks a line up in the
catalogue and shows it, and `nothing shown to a learner is invented` in
`test/cli-session.test.ts` fails if a single word reaches a learner that no
asset contains.

That guarantee is about **delivery**. It says nothing about **authorship**, and
this file is about authorship.

## What is true

The mathematical content in `functions-seed.ts` and `sequences-seed.ts` was
**drafted by an AI** working from the founder's direction, and is **committed by
a person** who has read it. That is the same shape as `foundation/ADOPTION.md`:
the articles were AI-drafted and human-adopted, and A5 says plainly that
drafting a thing confers no authority over it.

Applied here, the rule is:

> No model output enters the corpus without a person reading it and committing
> it. Drafting is assistance. Committing is the act that puts words in front of
> a learner, and only a person does that.

A model cannot make this commitment on its own behalf, and a commit message
saying the content was reviewed is not evidence that it was.

## What a person is committing to

Reading corpus content is not proofreading. The things worth catching are the
things a test cannot see:

- **Is it true?** A test can check that an asset is reachable and shown. Nothing
  in this repository checks that `Tn = a + (n - 1)d` is correct, that a second
  difference is `2a`, or that the worked example arrives at the number it
  claims. A confident, well-formed, wrong sentence passes every guard in the
  suite.
- **Is it for this learner?** The register is meant for a South African school
  learner. The first live model run produced undergraduate prose until the
  prompt was told who was reading, which is exactly the drift to watch for.
- **Does it repeat something?** A model can independently reproduce a metaphor
  a learner has already read. It happened: the vending machine came back in a
  live run from a model that had never been shown that asset.
- **Does it teach something false to look tidy?** The most likely harm in
  drafted content is a simplification that is easier to follow and not right —
  a sequence drawn as a continuous line, a bridge that hides a distinction.

## Signature

This record is unsigned until the person committing the content signs it. An
unsigned record is the honest state: it says the content is in the tree and
nobody has yet put their name to having read it.

Content covered: `functions-seed.ts`, `sequences-seed.ts`, and the cross-topic
relationships in `curriculum.ts`.

Read and committed by:

Sifiso Cyprian Shezi
Date: 30 August 2026

## Corrections made after signing

The signature above covers a read completed on 30 August 2026. Seven changes were
made to the corpus *after* it, so the record says which -- a signature that quietly
covers content nobody read would be the same defect as an unsigned one, pointed the
other way.

**Five were errors**, found by checking the arithmetic of every asset containing
numbers. The founder's review did not raise them and described the quadratic assets
as solid, which is worth recording: two readers, and the errors survived one of them.

1. `asset.quadratic-sequence.finding-rule-example` -- the worked example for 3, 8,
   15, 24 concluded `Tn = n^2 + 3n - 1`. That rule gives 3, 9, 17, 27; only the
   first term was right. The line claiming "checking T4 returns 24" was also
   wrong -- it returns 27. Corrected to `Tn = n^2 + 2n`.
2. `asset.number-pattern.savings-application` -- called 150, 230, 310, 390 "the
   amounts saved week by week". That is the running total; the weekly amounts are
   150, 80, 80, 80. Both lists are now named and kept apart.
3. `asset.quadratic-sequence.seating-application` -- described each row as gaining
   two more seats *than the row before gained*, which makes the row sizes
   quadratic and the running total cubic, not the quadratic the asset claimed.
   Corrected to each row having two more seats than the one in front.
4. `asset.linear-function.constant-difference-representation` -- "a table of a
   linear rule always has one repeated step, and that step is m" holds only when
   the inputs go up by 1. Now says so, and says what the step is otherwise.
5. `asset.quadratic-function.negative-a-misconception` -- "most of it is above the
   axis" is true near the origin and false everywhere else. Replaced with the
   turning point, which is the fact the sentence needed.

**Two were refinements** from the founder's review:

6. `asset.quadratic-sequence.building-rule-procedure` now writes both equations
   out rather than describing them.
7. `asset.sequence-as-function.joined-line-misconception` is now shown at the
   exam-patterns layer as well as in reflection, because joining the dots and
   reading between them is an exam habit and that is where it bites.

Nothing else in the corpus changed. Items 1-3 are worth a second look by the
signatory, since they are the ones where the content a learner would have
followed was false.
