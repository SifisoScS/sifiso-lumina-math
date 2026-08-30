import assert from "node:assert/strict";
import test from "node:test";

import { luminaCurriculum } from "../src/index.js";
import { pedagogicalLayerFor } from "../src/domain/learner-record.js";
import {
  applyChoice,
  applyConfidence,
  applyPractice,
  applyReflection,
  chooseDepth,
  Session,
  startSession,
} from "../cli/session.js";
import { materialFor } from "../cli/describe.js";

/**
 * A walker that does not know what anything means.
 *
 * Phase 8's gate is a person who is not the founder using the system, and it is
 * open because the defects worth finding are the ones a knowing user cannot
 * reach. The founder sets a depth before following a bridge, because they know
 * what the chips do; a stranger takes the interesting-looking option and then
 * reaches for a control. That ordering is the whole of defect 18, and no test
 * in this suite could see it, because every test here walks a path someone
 * chose on purpose.
 *
 * This is not a person and does not close that gate. It is the part of a
 * stranger that can be mechanised: arbitrary orderings, held to invariants that
 * must be true whatever a learner does. Where a scripted test asserts that one
 * chosen path is right, this asserts that no path is wrong.
 *
 * Seeded, so a failure is a fixed number rather than a story about randomness.
 * A walk that fails should be lifted out into a named test with its seed, and
 * the class behind it closed -- the walker finds; it does not define behaviour.
 */

const catalogue = {
  topics: luminaCurriculum.topics,
  concepts: luminaCurriculum.concepts,
  assets: luminaCurriculum.assets,
  experiences: luminaCurriculum.experiences,
};

/** Small deterministic PRNG. Reproducibility matters more than distribution. */
function rng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const permitted = new Set<string>();
for (const asset of catalogue.assets) {
  permitted.add(asset.title);
  permitted.add(asset.content);
}
for (const concept of catalogue.concepts) {
  permitted.add(concept.title);
  permitted.add(concept.conceptualDescription);
}

interface Snapshot {
  readonly conceptId: string | undefined;
  readonly evidence: number;
  readonly interpretations: number;
  readonly commitments: number;
  readonly events: number;
}

function snapshot(session: Session): Snapshot {
  return {
    conceptId: session.record.state.activeConceptId,
    evidence: session.record.evidence.length,
    interpretations: session.record.interpretations.length,
    commitments: session.record.commitments.length,
    events: session.record.events.length,
  };
}

/**
 * One walk, held to the invariants after every single step.
 *
 * `visited` is the set of concepts the learner has actually been in. It exists
 * for the depth invariant: a depth is a choice about how to approach an idea,
 * and recording one for an idea the learner has never opened turns their choice
 * into a claim about them. That was a real defect once and is a property of the
 * whole journey rather than of any one call, so only something like this can
 * check it.
 */
function walk(seed: number, steps: number): void {
  const random = rng(seed);
  const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)] as T;

  const first = pick(catalogue.concepts);
  let session = startSession(first.id);
  const visited = new Set<string>([first.id]);
  const where = (s: Session) => s.record.state.activeConceptId;

  for (let step = 0; step < steps; step += 1) {
    // Coming back another day. The record is carried forward exactly as the
    // store would return it, and the learner picks again from the picker.
    //
    // Phase 10's promise was that a learner can return across several sessions
    // without running out, and defect 15 -- two sessions in the same
    // millisecond costing a learner their history -- lived precisely here. A
    // walker that never leaves and comes back cannot see either.
    if (step > 0 && random() < 0.08) {
      const kept = session.record;
      const next = pick(catalogue.concepts);
      session = startSession(next.id, kept);
      visited.add(next.id);
      assert.ok(
        session.record.evidence.length >= kept.evidence.length,
        `seed ${String(seed)}, step ${String(step)}: returning lost evidence`,
      );
      assert.ok(
        session.record.commitments.length >= kept.commitments.length,
        `seed ${String(seed)}, step ${String(step)}: returning lost a commitment`,
      );
      for (const choice of kept.state.pedagogicalLayerByConcept) {
        assert.equal(
          pedagogicalLayerFor(session.record.state, choice.conceptId),
          choice.layer,
          `seed ${String(seed)}, step ${String(step)}: a depth the learner chose did not survive returning`,
        );
      }
      continue;
    }

    const before = snapshot(session);
    const trail = `seed ${String(seed)}, step ${String(step)}, in ${String(before.conceptId)}`;

    // Everything a surface can do, weighted so choices dominate — that is what
    // a learner mostly does, and the ordering between them is the point.
    const roll = random();
    let describe = "";
    // Only taking up an offer can move a learner. Everything else -- writing,
    // saying how sure you feel, asking for a depth -- is something you do where
    // you already are. Tracking it is what lets the move be checked below.
    let selectedAnOffer = false;

    if (roll < 0.55 && session.offers.length > 0) {
      const index = Math.floor(random() * session.offers.length);
      const kind = pick(["select-offer", "decline-offer", "defer-offer"] as const);
      const offer = session.offers[index];
      describe = `${kind} #${String(index)} (${String(offer?.opportunity.kind)})`;

      // Material must be showable before it is chosen, not only at session start.
      if (offer !== undefined) {
        for (const line of materialFor(offer.opportunity, catalogue)) {
          assert.ok(permitted.has(line), `${trail}: would show text no asset contains: ${line}`);
        }
      }

      selectedAnOffer = kind === "select-offer";
      const result = applyChoice(session, kind, index);
      session = result.session;

      if (kind !== "select-offer") {
        assert.equal(
          snapshot(session).commitments,
          before.commitments,
          `${trail}: ${kind} produced a commitment`,
        );
        assert.equal(where(session), before.conceptId, `${trail}: ${kind} moved the learner`);
      }
    } else if (roll < 0.65) {
      describe = "write a reflection";
      session = applyReflection(session, `walk ${String(seed)} step ${String(step)}`, "concept.function").session;
    } else if (roll < 0.72) {
      describe = "report confidence";
      session = applyConfidence(session, "Not sure", "concept.function").session;
    } else if (roll < 0.85) {
      const layer = pick(["intuition", "mechanics", "exam-patterns"] as const);
      describe = `choose depth ${layer}`;
      // Deliberately passing a concept the learner may have left, which is what
      // both surfaces did, and what defect 18 was.
      session = chooseDepth(session, "concept.function", layer);
    } else {
      const index = session.offers.findIndex((offer) => offer.opportunity.kind === "practise");
      const experienceId = session.offers[index]?.opportunity.learningExperienceId;
      if (index < 0 || experienceId === undefined) continue;
      describe = "answer a question";
      selectedAnOffer = true;
      session = applyChoice(session, "select-offer", index).session;
      session = applyPractice(session, "an answer", experienceId, "concept.function").session;
    }

    const after = snapshot(session);
    const context = `${trail}, did ${describe}`;

    // Nothing except taking up an offer moves a learner.
    //
    // This is the invariant the walker was missing, and its absence is why the
    // first version of this file passed with defect 18 deliberately restored --
    // a walker that finds nothing is worth exactly as much as a test that
    // passes for the wrong reason. The harm in 18 was not the misfiled depth,
    // it was that asking for a depth moved someone, and nothing here asked.
    if (!selectedAnOffer) {
      assert.equal(
        after.conceptId,
        before.conceptId,
        `${context}: the learner was moved by something that was not their taking up an offer`,
      );
    }

    // Nothing a learner has done is ever lost.
    assert.ok(after.evidence >= before.evidence, `${context}: evidence was dropped`);
    assert.ok(after.commitments >= before.commitments, `${context}: a commitment was dropped`);
    assert.ok(after.events >= before.events, `${context}: an event was dropped`);

    // Everything the learner supplied is filed where they actually were.
    for (const item of session.record.evidence.slice(before.evidence)) {
      // `learning-context-report` is about the session, not a concept, and
      // `learner-choice` records an act rather than a subject. Neither
      // carries a concept to be filed under.
      if (item.kind === "learner-choice" || item.kind === "learning-context-report") continue;
      assert.equal(
        item.conceptId,
        before.conceptId,
        `${context}: ${item.kind} was filed under a concept the learner was not in`,
      );
    }

    // Recorded only when the learner chose to go somewhere. Adding whatever
    // concept the engine happens to have landed on would launder exactly the
    // unrequested move this is here to catch: the first version did that, and
    // the depth invariant below could never fire.
    if (selectedAnOffer && after.conceptId !== undefined) visited.add(after.conceptId);

    // A depth is only ever recorded for an idea the learner has opened.
    for (const choice of session.record.state.pedagogicalLayerByConcept) {
      assert.ok(
        visited.has(choice.conceptId),
        `${context}: a depth is recorded for ${choice.conceptId}, which the learner has never been in`,
      );
    }

    // The offers on the table describe where the learner is now.
    for (const offer of session.offers) {
      const named = offer.opportunity.conceptId;
      if (named === undefined || after.conceptId === undefined) continue;
      assert.equal(
        named,
        after.conceptId,
        `${context}: an offer describes ${named}, which is not where the learner is`,
      );
    }

    // A depth the learner holds is one the concept can actually be met at.
    const layer = after.conceptId === undefined
      ? undefined
      : pedagogicalLayerFor(session.record.state, after.conceptId);
    if (layer !== undefined && after.conceptId !== undefined) {
      const reachable = catalogue.experiences.some((experience) =>
        experience.targetConceptIds.some((id) => id === after.conceptId) &&
        experience.pedagogicalLayers.includes(layer),
      );
      assert.ok(reachable, `${context}: the learner is at a depth with nothing behind it`);
    }
  }
}

test("no ordering of ordinary learner actions breaks an invariant", () => {
  // Modest in `pnpm check`, because the suite has to stay quick enough that
  // people run it. LUMINA_WALKS raises it for a soak; a failure names its seed,
  // and that seed reproduces exactly here.
  const walks = Number(process.env["LUMINA_WALKS"] ?? "40");
  const steps = Number(process.env["LUMINA_WALK_STEPS"] ?? "18");
  for (let seed = 1; seed <= walks; seed += 1) {
    walk(seed, steps);
  }
});
