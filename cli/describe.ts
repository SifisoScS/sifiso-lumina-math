import {
  CandidateLearningOpportunity,
  LearningOffer,
} from "../src/contracts/core-contracts.js";
import {
  Concept,
  KnowledgeAsset,
  LearningExperience,
  Topic,
} from "../src/domain/mathematical-knowledge.js";
import {
  activePedagogicalLayer,
  CurrentLearnerState,
  LearnerChoice,
  LearnerEvidence,
  LearnerRecord,
} from "../src/domain/learner-record.js";
import { ExplanationOutcome } from "../src/decisioning/explanation-request.js";

/**
 * Presentation. Deliberately outside the engine.
 *
 * The engine is headless by design: an opportunity carries identifiers and a
 * kind, never words. Turning that into something a person can read is a choice
 * about audience and tone, and it belongs to whatever is doing the showing —
 * here, a terminal. A different surface would render the same opportunity
 * differently without the engine knowing or caring.
 *
 * Nothing here decides anything. It reads identifiers and returns sentences.
 */

export interface Catalogue {
  readonly topics: readonly Topic[];
  readonly concepts: readonly Concept[];
  readonly assets: readonly KnowledgeAsset[];
  readonly experiences: readonly LearningExperience[];
}

export interface ConceptGroup {
  readonly topic: Topic;
  readonly concepts: readonly Concept[];
}

/**
 * The concepts a learner can pick from, under the topic each one belongs to.
 *
 * Both surfaces listed concepts flat, which read fine at five and stopped
 * reading fine at twelve: a learner met "Rules That Turn" directly above
 * "Patterns Whose Growth Itself Grows" with nothing saying these are two
 * different subjects. Growing the corpus is what broke it, so the fix belongs
 * to the same phase.
 *
 * It refuses a concept whose topic the catalogue does not hold, rather than
 * grouping what it can and moving on. Skipping would be the quiet version of
 * the worst defect available here -- a concept written, published, and
 * unreachable, with every count still looking right. A7: stop, and say so.
 *
 * Catalogue order is preserved inside each group and topics come out in the
 * order the catalogue lists them, so what a learner sees is decided by the
 * corpus rather than by this function.
 */
export function conceptsByTopic(catalogue: Catalogue): readonly ConceptGroup[] {
  const known = new Set(catalogue.topics.map((item) => item.id));
  const orphans = catalogue.concepts.filter((item) => !known.has(item.topicId));
  if (orphans.length > 0) {
    throw new Error(
      "These concepts belong to a topic this catalogue does not hold, so listing them " +
        `by topic would leave them unreachable: ${orphans.map((item) => item.id).join(", ")}`,
    );
  }

  return Object.freeze(
    catalogue.topics
      .map((topic) => ({
        topic,
        concepts: catalogue.concepts.filter((item) => item.topicId === topic.id),
      }))
      .filter((group) => group.concepts.length > 0),
  );
}

function conceptTitle(catalogue: Catalogue, id: string | undefined): string {
  if (id === undefined) return "this idea";
  return catalogue.concepts.find((concept) => concept.id === id)?.title ?? id;
}

function assetKind(catalogue: Catalogue, id: string): string | undefined {
  return catalogue.assets.find((asset) => asset.id === id)?.kind;
}

/**
 * What a learner is actually being asked, for a surface that is about to take
 * an answer.
 *
 * Twenty-four experiences declared they expected a `practice-attempt`, both
 * surfaces collected one, every guard passed, and no asset in the corpus posed
 * a question. A learner who chose "Try a question" was shown a worked example
 * and then an answer prompt, and typed a number in reply to nothing. Found by
 * walking a real session in the terminal, which is the only place it was
 * visible: at no layer below the surface is there anything to notice.
 *
 * Returns `undefined` when the experience asks nothing, so a surface can
 * decline to prompt rather than prompt into silence.
 */
export function questionFor(
  opportunity: CandidateLearningOpportunity,
  catalogue: Catalogue,
): string | undefined {
  const experience = opportunity.learningExperienceId === undefined
    ? undefined
    : catalogue.experiences.find((candidate) => candidate.id === opportunity.learningExperienceId);

  for (const assetId of experience?.knowledgeAssetIds ?? []) {
    const asset = catalogue.assets.find((candidate) => candidate.id === assetId);
    if (asset?.kind === "question" && asset.status === "published") return asset.content;
  }
  return undefined;
}

function assetTitle(catalogue: Catalogue, id: string | undefined): string | undefined {
  if (id === undefined) return undefined;
  return catalogue.assets.find((asset) => asset.id === id)?.title;
}

/**
 * Two opportunities can share a concept and a layer and differ only by which
 * learning experience they lead to. Naming the experience is what makes them
 * distinguishable to a person; without it a learner sees the same sentence
 * twice and cannot choose between them.
 */
function experienceTitle(catalogue: Catalogue, id: string | undefined): string | undefined {
  if (id === undefined) return undefined;
  return catalogue.experiences.find((experience) => experience.id === id)?.title;
}

/** A short sentence a learner can act on, in the second person. */
export function describeOpportunity(
  opportunity: CandidateLearningOpportunity,
  catalogue: Catalogue,
): string {
  const here = conceptTitle(catalogue, opportunity.conceptId);
  const there = conceptTitle(catalogue, opportunity.relatedConceptId);
  const asset = assetTitle(catalogue, opportunity.knowledgeAssetId);
  const experience = experienceTitle(catalogue, opportunity.learningExperienceId);
  const layer = opportunity.pedagogicalLayer;

  switch (opportunity.kind) {
    case "continue":
      return experience === undefined
        ? `Carry on with ${here}${layer === undefined ? "" : ` (${layer})`}`
        : `Carry on with ${here} — ${experience}`;
    case "explore-representation":
      return asset === undefined
        ? `See ${here} shown a different way`
        : `See ${here} shown a different way — ${asset}`;
    case "revisit":
      return `Look at ${here} again`;
    case "revisit-prerequisite":
      return `Go back to ${there} first`;
    case "explore-concept-bridge":
      return `See how ${here} connects to ${there}`;
    case "move-toward-layer":
      return `Go deeper into ${here}${layer === undefined ? "" : ` — ${layer}`}`;
    case "practise":
      return experience === undefined
        ? `Try a question on ${here}`
        : `Try a question — ${experience}`;
    case "reflect":
      return experience === undefined
        ? `Write down what you are thinking about ${here}`
        : `Write down what you are thinking — ${experience}`;
    case "pause":
      return "Stop for now";
    case "allow-learner-choice":
      return "Decide for yourself what to do next";
    default: {
      const unrendered: never = opportunity.kind;
      return String(unrendered);
    }
  }
}

/** Numbered list of what is on offer, or a plain note when there is nothing. */
export function describeOffers(
  offers: readonly LearningOffer[],
  catalogue: Catalogue,
): readonly string[] {
  return offers.map(
    (offer, index) => `  ${index + 1}. ${describeOpportunity(offer.opportunity, catalogue)}`,
  );
}

/**
 * The material an accepted opportunity leads to.
 *
 * Showing a learner something is not a state change, and the terminal used to
 * behave as though it were: a learner who chose "see this shown a different
 * way" was told "you are already there - nothing moved" and shown nothing at
 * all. The engine had done its job; nothing was rendering the asset it named.
 *
 * Nothing here is generated. Every line is read from the catalogue, and an
 * opportunity naming nothing to show returns nothing rather than an improvised
 * sentence. A learner is never shown text the corpus does not contain.
 */
export function materialFor(
  opportunity: CandidateLearningOpportunity,
  catalogue: Catalogue,
): readonly string[] {
  const lines: string[] = [];
  const shown = new Set<string>();

  const show = (id: string | undefined): void => {
    if (id === undefined || shown.has(id)) return;
    const asset = catalogue.assets.find((candidate) => candidate.id === id);
    // A retired asset is deliberately out of circulation. The catalogue is read
    // raw here, so the check belongs here too.
    if (asset === undefined || asset.status !== "published") return;
    shown.add(id);
    lines.push(asset.title, asset.content);
  };

  show(opportunity.knowledgeAssetId);

  // "See this shown a different way" is a request for one representation, not
  // for everything the experience holding it contains. Answering it with five
  // assets buries the thing that was asked for.
  if (opportunity.kind !== "explore-representation") {
    const experience = opportunity.learningExperienceId === undefined
      ? undefined
      : catalogue.experiences.find((candidate) => candidate.id === opportunity.learningExperienceId);
    // Questions last. A question read before the material that supports it is
    // a question asked too early, and the thing a learner needs immediately
    // above the answer box is the thing they are being asked.
    const ordered = [...(experience?.knowledgeAssetIds ?? [])].sort((left, right) =>
      Number(assetKind(catalogue, left) === "question") - Number(assetKind(catalogue, right) === "question"),
    );
    for (const assetId of ordered) show(assetId);
  }

  // A prerequisite or bridge leads somewhere else. Say where, in its own words.
  const related = opportunity.relatedConceptId === undefined
    ? undefined
    : catalogue.concepts.find((candidate) => candidate.id === opportunity.relatedConceptId);
  if (related !== undefined) lines.push(related.title, related.conceptualDescription);

  return Object.freeze(lines);
}

/**
 * One line of history, in the words of whoever produced it.
 *
 * Exhaustive over `LearnerEvidenceKind`, which is the point. A learner's record
 * is theirs, and a kind of evidence that can be written but not read back makes
 * it a record *about* them instead. A new evidence kind therefore cannot be
 * added without someone deciding how its subject reads it, because until they
 * do this will not compile.
 *
 * A learner's own text is returned exactly as they typed it. Nothing here
 * summarises, shortens, or tidies it -- `assertReflectionPreserved` guards the
 * same thing at the domain boundary, and this is where it would be broken in
 * practice, by being helpful.
 */
export function describeEvidence(evidence: LearnerEvidence, catalogue: Catalogue): readonly string[] {
  switch (evidence.kind) {
    case "reflection":
      return Object.freeze([
        `You wrote, about ${conceptTitle(catalogue, evidence.conceptId)}:`,
        evidence.originalText,
      ]);

    case "practice-attempt":
      return Object.freeze([
        `You answered, on ${conceptTitle(catalogue, evidence.conceptId)}:`,
        evidence.learnerResponse,
        "Nothing marked it.",
      ]);

    case "confidence-report":
      return Object.freeze([
        `You said how sure you felt about ${conceptTitle(catalogue, evidence.conceptId)}:`,
        `${evidence.reportedValue} (${evidence.scaleLabel})`,
        "Nothing was concluded from it.",
      ]);

    case "learner-choice":
      return Object.freeze([describeChoice(evidence.choiceKind)]);

    case "learning-context-report":
      return Object.freeze([
        "You said what you were here for:",
        evidence.learningIntention,
        ...(evidence.selfReportedEnergyContext === undefined
          ? []
          : [`and how you had the energy for it: ${evidence.selfReportedEnergyContext}`]),
      ]);

    default: {
      const unreadable: never = evidence;
      throw new Error(
        `A learner cannot read back evidence of this kind: ${JSON.stringify(unreadable)}`,
      );
    }
  }
}

function describeChoice(kind: LearnerChoice["choiceKind"]): string {
  switch (kind) {
    case "select-offer": return "You took something up.";
    case "decline-offer": return "You said no to something.";
    case "defer-offer": return "You put something off.";
    case "request-alternative": return "You asked to see something another way.";
    case "pause": return "You stopped for a while.";
    default: {
      const unnamed: never = kind;
      throw new Error(`A learner choice has no plain description: ${String(unnamed)}`);
    }
  }
}

/**
 * Everything the system holds about a learner, in the order it happened.
 *
 * `originalText` was written to the record from the first session and displayed
 * by nothing. A learner saw "Written down: 3" and could not read the three.
 * That is the same shape as every other defect found here -- modelled,
 * validated, stored, never surfaced -- and the one that matters most, because
 * a record its subject cannot read is not really theirs.
 *
 * The engine's readings are shown too, and shown apart, under a heading that
 * says whose they are. A2 keeps evidence and interpretation separate in the
 * domain; showing them in one undifferentiated list is how that separation
 * would be lost at the only point where a person can see it.
 */
export function describeHistory(record: LearnerRecord, catalogue: Catalogue): readonly string[] {
  if (record.evidence.length === 0 && record.interpretations.length === 0) {
    return Object.freeze([
      "Nothing is kept about you yet.",
      "What you write, answer, and choose will appear here, in your words.",
    ]);
  }

  const lines: string[] = ["What is kept about you", ""];
  for (const evidence of record.evidence) {
    lines.push(...describeEvidence(evidence, catalogue), "");
  }

  if (record.interpretations.length > 0) {
    lines.push("The system's readings of that — not your words, and revisable", "");
    for (const interpretation of record.interpretations) {
      lines.push(
        `About ${conceptTitle(catalogue, interpretation.conceptId)}: ${interpretation.summary}`,
        "",
      );
    }
  }

  lines.push(`That is all of it: ${String(record.evidence.length)} things you did, ` +
    `${String(record.interpretations.length)} readings of them. Nothing else is held.`);
  return Object.freeze(lines);
}

/**
 * The learner's record, framed so they can hand it to someone.
 *
 * O4 closed shut: Lumina serves learners, and teachers, parents, and
 * institutions see only what a learner chooses to show them. That sentence is
 * only true if a learner has a way to show it, so this is the affordance the
 * amendment rests on rather than a convenience added beside it.
 *
 * It is built from `describeHistory` and not beside it. Two renderings of one
 * record would drift, and the direction they would drift in is obvious: the
 * copy meant for a teacher would get tidied, and a learner would hand over
 * something they had not read. Sharing what is on the screen, exactly, is the
 * only version of this that stays honest.
 *
 * The framing does the rest of the work. Anyone reading this is being told, in
 * the document itself, that nothing here was marked and that the readings are
 * the system's and revisable -- because the likely misuse is not a leak, it is
 * a teacher treating an unassessed answer as a wrong one.
 *
 * It goes nowhere. This returns text; the learner decides where it lands.
 */
export function describeForSharing(record: LearnerRecord, catalogue: Catalogue): readonly string[] {
  return Object.freeze([
    "A learner's own record from Math Lumina",
    "",
    "Shared by the learner, from their own device. The system did not send it.",
    "",
    "Nothing in this document is a mark, a grade, a level, or a judgement of",
    "ability. Math Lumina does not assess and was not asked to. Answers below",
    "were written by the learner and nothing checked them.",
    "",
    "---",
    "",
    ...describeHistory(record, catalogue),
    "",
    "---",
    "",
    "That is everything the system holds. There is no other copy and no account.",
  ]);
}

export function conceptSummary(concept: Concept): string {
  return `${concept.title}\n\n${concept.conceptualDescription}`;
}

/**
 * Showing a learner something a model wrote.
 *
 * A5 requires that machine-originated text be shown *as* machine-originated,
 * and beside the learner's own record rather than in place of it. The record
 * lines are part of what this returns for exactly that reason: the guarantee
 * that survives an unscreened authority claim is not that the words were
 * caught, but that the person reading them can see nothing changed.
 *
 * O7's screen refuses text that says it has authority. It catches stated
 * claims and not implied ones, so this is the half of the answer that does not
 * depend on recognising the wording.
 */
export function describeExplanation(
  outcome: ExplanationOutcome,
  state: CurrentLearnerState,
  catalogue: Catalogue,
): readonly string[] {
  switch (outcome.kind) {
    case "unavailable":
      return Object.freeze([
        "No model is connected, so there is nothing to ask.",
        "Everything you have been shown so far was written by a person and read from the catalogue.",
      ]);

    case "no-proposal":
      return Object.freeze([
        "Asked, and nothing usable came back. Nothing has changed.",
      ]);

    case "refused":
      // The summary is deliberately absent. A refusal that still shows the text
      // with a caveat attached is not a refusal.
      return Object.freeze([
        "A model offered something and it was refused before you saw it.",
        ...outcome.reasons.map((reason) => `  ${reason}`),
        "Nothing has changed, and nothing was kept.",
      ]);

    case "explained":
      return Object.freeze([
        "Written by a model, not by Lumina.",
        "It decides nothing. Nothing about where you are has changed, and none of it was kept.",
        "",
        outcome.summary,
        "",
        `How sure it says it is: ${outcome.uncertaintyLevel} — ${outcome.uncertaintyRationale}`,
        `Admitted under policy ${outcome.policyId}, version ${outcome.policyVersion}.`,
        "",
        "Where you are, unchanged by the above:",
        `  Focus:  ${state.engagementFocus}`,
        `  Idea:   ${conceptTitle(catalogue, state.activeConceptId)}`,
        `  Depth:  ${activePedagogicalLayer(state) ?? "not set"}`,
        `  Kept:   ${state.evidenceIds.length} things you did, ${state.interpretationIds.length} readings of them`,
      ]);

    default: {
      const unhandled: never = outcome;
      throw new Error(`Explanation outcome is not classified for display: ${JSON.stringify(unhandled)}`);
    }
  }
}
