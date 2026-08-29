import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

import { LearnerChoiceKind } from "../src/domain/learner-record.js";
import { functionsSeedKnowledge } from "../src/seed/functions-seed.js";
import { conceptSummary, describeOffers, materialFor } from "./describe.js";
import { DEFAULT_RECORD_PATH, forgetRecord, loadRecord, recordExists, saveRecord } from "./store.js";
import {
  applyChoice,
  applyReflection,
  choicesMade,
  reflectionsWritten,
  Session,
  startSession,
} from "./session.js";

/**
 * A terminal a person can learn in. Phase 6.
 *
 * There is no model here. The engine is deterministic and this drives it
 * directly, so a learner can be in front of the system with no provider, no
 * key, and no network. Whether the AI path is wired is a separate question.
 *
 * This file is I/O only — reading, printing, and asking. Everything that
 * decides anything lives in session.ts, where it can be tested.
 */

const catalogue = {
  concepts: functionsSeedKnowledge.concepts,
  assets: functionsSeedKnowledge.assets,
  experiences: functionsSeedKnowledge.experiences,
};

const HELP = `
  Type a number to take that option.
  d 2    decline option 2 — nothing will happen to where you are
  f 2    put option 2 off for now
  p      pause
  w      write down what you are thinking
  s      show where you are
  forget delete everything kept about you, permanently
  ?      this help
  q      quit
`;

function showState(session: Session): void {
  const state = session.record.state;
  const concept = catalogue.concepts.find((c) => c.id === state.activeConceptId);
  stdout.write("\n  Where you are\n");
  stdout.write(`    Focus:    ${state.engagementFocus}\n`);
  stdout.write(`    Concept:  ${concept?.title ?? "none yet"}\n`);
  if (state.activePedagogicalLayer !== undefined) {
    stdout.write(`    Depth:    ${state.activePedagogicalLayer}\n`);
  }
  stdout.write(`    Written down: ${reflectionsWritten(session)}\n`);
  stdout.write(`    Choices made: ${choicesMade(session)}\n\n`);
}

/**
 * Prints what the learner asked to see, indented as a block so material is
 * visibly distinct from the terminal talking about itself.
 */
function showMaterial(lines: readonly string[]): void {
  if (lines.length === 0) return;
  stdout.write("\n");
  for (const line of lines) stdout.write(`    ${line}\n`);
  stdout.write("\n");
}

/** The write flow, shared by the `w` command and by accepting a reflect offer. */
async function writeSomething(
  rl: ReturnType<typeof createInterface>,
  session: Session,
  conceptId: string,
): Promise<Session> {
  const text = (await rl.question("  What are you thinking? ")).trim();
  if (text.length === 0) {
    stdout.write("  Nothing written down.\n");
    return session;
  }
  const next = applyReflection(session, text, conceptId).session;
  stdout.write("  Written down - your words, kept exactly as you typed them.\n");
  stdout.write("  The system may form its own reading of them. That reading is\n");
  stdout.write("  kept separate, and is never shown as something you said.\n");
  return next;
}

function showOffers(session: Session): void {
  // An empty list used to be the whole message, which read as a dead end. It is
  // not one: pausing, writing, and choosing a different concept never depended
  // on the engine having something to offer, and a learner should not have to
  // guess that. A7 -- a hold has to name its exit.
  if (session.offers.length === 0) {
    stdout.write("\n  Nothing on offer here just now.\n");
    stdout.write("  Not everything is written yet, and this concept has no material\n");
    stdout.write("  that fits where you are.\n\n");
    stdout.write("  You can still: w to write down what you are thinking, s to see\n");
    stdout.write("  where you are, p to pause, q to stop.\n\n");
    return;
  }
  stdout.write("\n  What you could do next\n");
  for (const line of describeOffers(session.offers, catalogue)) stdout.write(`  ${line}\n`);
  stdout.write("\n");
}

async function main(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });

  stdout.write("\n  Math Lumina\n  ───────────\n");
  stdout.write("  What you write here is kept on this computer, in\n");
  stdout.write(`  ${DEFAULT_RECORD_PATH}, so you can pick up where you left off.\n`);
  stdout.write("  Nothing is sent anywhere. No account, no server, no one else\n");
  stdout.write("  can read it. Type forget at any time and the file is deleted.\n\n");
  stdout.write("  You decide what happens. If you decline something it does not\n");
  stdout.write("  happen — you will not be quietly moved along.\n\n");

  // Read before anything is asked, so a learner who cannot be resumed is told
  // before they start rather than after they have done work.
  const stored = loadRecord();
  if (stored.kind === "unreadable") {
    stdout.write(`  There is a record at ${DEFAULT_RECORD_PATH} that cannot be read:\n`);
    stdout.write(`    ${stored.reason}\n\n`);
    stdout.write("  It has not been changed or deleted. Starting over would write\n");
    stdout.write("  over it, so nothing will happen until you decide. Move or delete\n");
    stdout.write("  the file yourself if you want to begin again.\n\n");
    rl.close();
    return;
  }
  if (stored.kind === "loaded") {
    stdout.write("  Picking up where you left off.\n\n");
  }

  const consent = (await rl.question("  Happy to carry on? (yes/no) ")).trim().toLowerCase();
  if (consent !== "yes" && consent !== "y") {
    stdout.write("\n  No problem. Nothing new was written down.\n\n");
    rl.close();
    return;
  }

  stdout.write("\n  Where would you like to start?\n");
  catalogue.concepts.forEach((concept, index) => {
    stdout.write(`    ${index + 1}. ${concept.title}\n`);
  });

  const pick = await rl.question("\n  Number: ");
  const chosen = catalogue.concepts[Number(pick.trim()) - 1];
  if (chosen === undefined) {
    stdout.write("\n  Did not recognise that. Stopping here.\n\n");
    rl.close();
    return;
  }

  let session = startSession(chosen.id, stored.kind === "loaded" ? stored.record : undefined);
  saveRecord(session.record);

  stdout.write(`\n  ${conceptSummary(chosen).split("\n").join("\n  ")}\n`);
  showOffers(session);
  stdout.write("  Type ? to see what you can type.\n");

  for (;;) {
    const answer = (await rl.question("\n  > ")).trim().toLowerCase();
    if (answer === "q") break;
    if (answer === "forget") {
      const existed = forgetRecord();
      stdout.write(existed
        ? "  Deleted. Nothing about you is kept on this computer any more.\n"
        : "  There was nothing kept to delete.\n");
      stdout.write("  This session is still open; anything further will start a new file.\n");
      continue;
    }
    if (answer === "?") { stdout.write(HELP); continue; }
    if (answer === "s") { showState(session); continue; }

    if (answer === "w") {
      session = await writeSomething(rl, session, chosen.id);
      saveRecord(session.record);
      showOffers(session);
      continue;
    }

    const held = /^([dfp])\s*(\d*)$/.exec(answer);
    const taken = /^(\d+)$/.exec(answer);
    if (held === null && taken === null) {
      stdout.write("  Did not understand that. Type ? for the options.\n");
      continue;
    }

    let choiceKind: LearnerChoiceKind = "select-offer";
    let index = 0;
    if (taken !== null) {
      index = Number(taken[1]) - 1;
    } else if (held !== null) {
      const letter = held[1];
      choiceKind = letter === "d" ? "decline-offer" : letter === "f" ? "defer-offer" : "pause";
      index = Number(held[2] ?? "") - 1;
    }

    // Captured before the choice is applied, because applying it replaces the
    // offer list. This is the thing the learner asked for.
    const offerTaken = choiceKind === "pause" ? undefined : session.offers[index];
    const depthBefore = session.record.state.activePedagogicalLayer;
    const result = applyChoice(session, choiceKind, index);
    session = result.session;
    if (result.outcome.kind !== "no-such-offer") saveRecord(session.record);

    switch (result.outcome.kind) {
      case "no-such-offer":
        stdout.write("  There is no option with that number.\n");
        continue;
      case "paused":
        stdout.write("  Paused. Come back whenever.\n");
        break;
      case "left-to-you":
        stdout.write("  Left to you. Nothing was chosen on your behalf.\n");
        break;
      case "already-there":
        // Not a refusal. The learner asked to be shown something and is about
        // to be; where they are simply did not need to change.
        stdout.write("  You were already here - nothing about where you are changed.\n");
        break;
      case "held":
        stdout.write(
          result.outcome.choice === "decline-offer"
            ? `  Declined.${result.outcome.stateUnchanged ? " You are exactly where you were." : ""}\n`
            : `  Put off for now.${result.outcome.stateUnchanged ? " Nothing moved." : ""}\n`,
        );
        break;
      case "moved": {
        const concept = catalogue.concepts.find(
          (c) => c.id === session.record.state.activeConceptId,
        );
        stdout.write(`  Right — ${concept?.title ?? "carrying on"}.\n`);
        break;
      }
      default:
        break;
    }

    // A learner who has just asked to stop should not be handed the menu again
    // in the same breath. Nothing further is suggested until they ask for it.
    if (result.outcome.kind === "paused") {
      stdout.write("  Nothing more will be suggested until you ask.\n");
      stdout.write("  s to see where you are, w to write, a number to pick this up\n");
      stdout.write("  again, q to close.\n");
      continue;
    }

    // Changing depth changes what is on offer, sometimes dramatically. Watching
    // most of the list disappear with no explanation reads as the system
    // withdrawing things rather than the learner having gone deeper.
    const depthAfter = session.record.state.activePedagogicalLayer;
    if (depthAfter !== undefined && depthAfter !== depthBefore) {
      stdout.write(`  You are now at ${depthAfter} depth, so what is on offer has changed.\n`);
    }

    if (offerTaken !== undefined &&
        (result.outcome.kind === "moved" || result.outcome.kind === "already-there")) {
      showMaterial(materialFor(offerTaken.opportunity, catalogue));

      // Accepting 'write down what you are thinking' is a request to write.
      // Listing it again and waiting would be an odd answer to that.
      if (offerTaken.opportunity.kind === "reflect") {
        session = await writeSomething(rl, session, chosen.id);
        saveRecord(session.record);
      }
    }

    showOffers(session);
  }

  // A learner who typed `forget` and then quit was told their record was saved
  // and would be waiting. It was not, and it will not be. Of everything this
  // terminal says, a false assurance about deletion is the worst one to get
  // wrong, so it is checked at the moment of saying it rather than assumed.
  stdout.write(recordExists()
    ? `\n  Saved to ${DEFAULT_RECORD_PATH}. It will be here next time.\n\n`
    : `\n  Nothing is kept. There is no record of this on your computer.\n\n`);
  rl.close();
}

main().catch((error: unknown) => {
  stdout.write(`\n  Something went wrong: ${error instanceof Error ? error.message : String(error)}\n\n`);
  process.exitCode = 1;
});
