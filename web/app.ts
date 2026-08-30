import { luminaCurriculum } from "../src/seed/curriculum.js";
import { PedagogicalLayer } from "../src/domain/mathematical-knowledge.js";
import { LearnerChoiceKind, activePedagogicalLayer } from "../src/domain/learner-record.js";
import {
  conceptsByTopic,
  conceptSummary,
  describeForSharing,
  describeHistory,
  describeOpportunity,
  materialFor,
  questionFor,
} from "../cli/describe.js";
import {
  applyChoice,
  applyConfidence,
  applyPractice,
  applyReflection,
  chooseDepth,
  choicesMade,
  practiceAttemptsMade,
  reflectionsWritten,
  Session,
  startSession,
} from "../cli/session.js";
import { forgetRecord, loadRecord, recordExists, saveRecord } from "./store.js";

/**
 * A learner-facing surface for the same engine the terminal drives.
 *
 * There is no server and no provider. The engine runs here, in the page: the
 * bundle imports the decisioning modules directly rather than `src/index.ts`,
 * so the Anthropic adapter is not merely unused, it is not present. Nothing a
 * learner does here can reach a network.
 *
 * Everything shown as learning material is read from the catalogue by
 * `materialFor`. Nothing on this page is generated, paraphrased, or summarised.
 */

const catalogue = {
  topics: luminaCurriculum.topics,
  concepts: luminaCurriculum.concepts,
  assets: luminaCurriculum.assets,
  experiences: luminaCurriculum.experiences,
};

const LAYERS: readonly { readonly id: PedagogicalLayer; readonly label: string; readonly hint: string }[] = [
  { id: "intuition", label: "Intuition", hint: "What is this, in plain terms?" },
  { id: "mechanics", label: "Mechanics", hint: "How is it written and worked?" },
  { id: "exam-patterns", label: "Exam patterns", hint: "How is it usually asked?" },
];

const CONFIDENCE: readonly string[] = ["Not yet", "Getting there", "Fairly sure", "Confident"];

interface View {
  session: Session | undefined;
  conceptId: string | undefined;
  material: readonly string[];
  note: string;
  reading: string | undefined;
  /** The question the learner has open, if they took one. */
  practising: string | undefined;
  /** What that question actually asks. Nothing prompts without one. */
  question: string | undefined;
  /** Whether the learner is reading their own record back. */
  reviewing: boolean;
}

const view: View = {
  session: undefined,
  conceptId: undefined,
  material: [],
  note: "",
  reading: undefined,
  practising: undefined,
  question: undefined,
  reviewing: false,
};

// ---------------------------------------------------------------------------
// Rendering. Text is set through textContent, never innerHTML, so a learner's
// own words cannot become markup on the page they are shown back on.
// ---------------------------------------------------------------------------

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className !== undefined) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function mount(id: string): HTMLElement {
  const node = document.getElementById(id);
  if (node === null) throw new Error(`missing mount point: ${id}`);
  return node;
}

function clear(node: HTMLElement): HTMLElement {
  while (node.firstChild !== null) node.removeChild(node.firstChild);
  return node;
}

// ---------------------------------------------------------------------------

function conceptTitle(id: string | undefined): string {
  return catalogue.concepts.find((concept) => concept.id === id)?.title ?? "—";
}

function renderConcepts(): void {
  const list = clear(mount("concepts"));
  for (const group of conceptsByTopic(catalogue)) {
    const heading = el("div", "topic-heading");
    heading.appendChild(el("h2", undefined, group.topic.title));
    heading.appendChild(el("p", undefined, group.topic.description));
    list.appendChild(heading);

    const cards = el("div", "concepts-grid");
    for (const concept of group.concepts) {
      const card = el("button", "concept-card");
      card.appendChild(el("strong", undefined, concept.title));
      card.appendChild(el("p", undefined, concept.conceptualDescription));
      card.addEventListener("click", () => open(concept.id));
      cards.appendChild(card);
    }
    list.appendChild(cards);
  }
}

function renderDepth(): void {
  const bar = clear(mount("depth"));
  const state = view.session?.record.state;
  const current = state === undefined ? undefined : activePedagogicalLayer(state);
  for (const layer of LAYERS) {
    const button = el("button", `depth-chip${current === layer.id ? " is-current" : ""}`);
    button.appendChild(el("span", "depth-label", layer.label));
    button.appendChild(el("span", "depth-hint", layer.hint));
    button.setAttribute("aria-pressed", String(current === layer.id));
    button.addEventListener("click", () => {
      if (view.session === undefined || view.conceptId === undefined) return;
      view.session = chooseDepth(view.session, view.conceptId, layer.id);
      view.material = [];
      view.note = `Approaching ${conceptTitle(view.conceptId)} at ${layer.label.toLowerCase()}.`;
      persist();
      render();
    });
    bar.appendChild(button);
  }
}

function renderOffers(): void {
  const list = clear(mount("offers"));
  const session = view.session;
  if (session === undefined) return;

  if (session.offers.length === 0) {
    const empty = el("p", "muted");
    empty.textContent =
      "Nothing on offer here just now. Not everything is written yet. " +
      "You can still write something down, change depth, or pick another idea.";
    list.appendChild(empty);
    return;
  }

  session.offers.forEach((offer, index) => {
    const row = el("li", "offer");
    row.appendChild(el("p", "offer-text", describeOpportunity(offer.opportunity, catalogue)));

    const actions = el("div", "offer-actions");
    const take = el("button", "act act-take", "Take this");
    take.addEventListener("click", () => choose("select-offer", index));
    actions.appendChild(take);

    // Declining and deferring are real answers, so they are as reachable as
    // acceptance. Hiding them behind a menu would make saying no the harder act.
    const decline = el("button", "act", "No thanks");
    decline.addEventListener("click", () => choose("decline-offer", index));
    actions.appendChild(decline);

    const defer = el("button", "act", "Not now");
    defer.addEventListener("click", () => choose("defer-offer", index));
    actions.appendChild(defer);

    row.appendChild(actions);
    list.appendChild(row);
  });
}

function renderMaterial(): void {
  const panel = clear(mount("material"));
  if (view.material.length === 0) {
    panel.appendChild(el("p", "muted", "Take something above and it will be shown here."));
    return;
  }
  for (let i = 0; i < view.material.length; i += 2) {
    const block = el("article", "material-block");
    block.appendChild(el("h3", undefined, view.material[i] ?? ""));
    block.appendChild(el("p", undefined, view.material[i + 1] ?? ""));
    panel.appendChild(block);
  }
}

function renderState(): void {
  const panel = clear(mount("state"));
  const session = view.session;
  if (session === undefined) return;
  const state = session.record.state;

  const rows: readonly [string, string][] = [
    ["Focus", state.engagementFocus],
    ["Idea", conceptTitle(state.activeConceptId)],
    ["Depth", activePedagogicalLayer(state) ?? "not set"],
    ["Written down", String(reflectionsWritten(session))],
    ["Answered", String(practiceAttemptsMade(session))],
    ["Choices made", String(choicesMade(session))],
  ];
  for (const [label, value] of rows) {
    const row = el("div", "state-row");
    row.appendChild(el("span", "state-label", label));
    row.appendChild(el("span", "state-value", value));
    panel.appendChild(row);
  }
}

function renderReading(): void {
  const panel = clear(mount("reading"));
  if (view.reading === undefined) return;
  panel.appendChild(el("span", "reading-tag", "The system's reading — not your words"));
  panel.appendChild(el("p", undefined, view.reading));
}

function renderNote(): void {
  mount("note").textContent = view.note;
}

function renderHistory(): void {
  const panel = clear(mount("history-lines"));
  const record = view.session?.record;
  const lines = record === undefined
    ? ["Nothing is kept about you yet.", "Pick an idea and anything you do will appear here."]
    : describeHistory(record, catalogue);

  for (const line of lines) {
    if (line === "") {
      panel.appendChild(el("div", undefined, " "));
      continue;
    }
    panel.appendChild(el("p", undefined, line));
  }
}

function render(): void {
  const started = view.session !== undefined;
  mount("picker").hidden = started || view.reviewing;
  mount("history-view").hidden = !view.reviewing;
  mount("session").hidden = !started || view.reviewing;
  if (view.reviewing) renderHistory();
  if (started && !view.reviewing) {
    mount("concept-title").textContent = conceptTitle(view.conceptId);
    mount("concept-body").textContent =
      catalogue.concepts.find((c) => c.id === view.conceptId)?.conceptualDescription ?? "";
    renderDepth();
    renderOffers();
    renderMaterial();
    renderState();
    renderReading();
    // The question, in the panel that takes the answer. Without it a learner
    // read a worked example and was handed an empty box.
    const asked = view.practising === undefined ? undefined : view.question;
    mount("practice-question").textContent = asked ?? "";
    mount("practice-panel").hidden = view.practising === undefined || asked === undefined;
  }
  renderNote();
  mount("forget").hidden = !recordExists();
}

// ---------------------------------------------------------------------------
// Acting
// ---------------------------------------------------------------------------

function persist(): void {
  if (view.session !== undefined) saveRecord(view.session.record);
}

function open(conceptId: string): void {
  const stored = loadRecord();
  if (stored.kind === "unreadable") {
    view.note = `There is a saved record that cannot be read: ${stored.reason} It has not been changed.`;
    render();
    return;
  }
  view.conceptId = conceptId;
  view.session = startSession(conceptId, stored.kind === "loaded" ? stored.record : undefined);
  view.material = [];
  view.reading = undefined;
  view.practising = undefined;
  view.question = undefined;
  view.note = stored.kind === "loaded" ? "Picking up where you left off." : "";
  persist();
  render();
}

function choose(choiceKind: LearnerChoiceKind, index: number): void {
  const session = view.session;
  if (session === undefined) return;
  const taken = session.offers[index];
  const result = applyChoice(session, choiceKind, index);
  view.session = result.session;
  // The engine decides where the learner is; this only reflects it. Taking a
  // bridge or a prerequisite offer moves them to another concept, and the page
  // used to go on showing the title, the description, the material and the
  // depth chips of the concept they had left.
  view.conceptId = result.session.record.state.activeConceptId ?? view.conceptId;

  switch (result.outcome.kind) {
    case "moved":
      view.note = `Right — ${conceptTitle(result.session.record.state.activeConceptId)}.`;
      break;
    case "already-there":
      view.note = "You were already here — nothing about where you are changed.";
      break;
    case "paused":
      view.note = "Paused. Nothing more is suggested until you ask.";
      break;
    case "left-to-you":
      view.note = "Left to you. Nothing was chosen on your behalf.";
      break;
    case "held":
      view.note = result.outcome.choice === "decline-offer"
        ? "Declined. You are exactly where you were."
        : "Put off for now. Nothing moved.";
      break;
    default:
      view.note = "";
      break;
  }

  const showsMaterial = result.outcome.kind === "moved" || result.outcome.kind === "already-there";
  view.material = showsMaterial && taken !== undefined ? materialFor(taken.opportunity, catalogue) : [];

  // A question with nowhere to put an answer is material a learner cannot
  // actually engage with. The box appears only for a question they took.
  view.practising = showsMaterial && taken?.opportunity.kind === "practise"
    ? taken.opportunity.learningExperienceId
    : undefined;
  view.question = view.practising === undefined || taken === undefined
    ? undefined
    : questionFor(taken.opportunity, catalogue);
  persist();
  render();
}

function write(): void {
  const box = document.getElementById("reflection") as HTMLTextAreaElement | null;
  const session = view.session;
  if (box === null || session === undefined) return;
  const words = box.value.trim();
  if (words.length === 0) return;

  const before = session.record.interpretations.length;
  const next = applyReflection(session, words, view.conceptId ?? "").session;
  view.session = next;
  box.value = "";

  // The engine forms its own reading and keeps it apart from what the learner
  // said. Showing them separately, and labelled, is the whole point.
  view.reading = next.record.interpretations.length > before
    ? next.record.interpretations[next.record.interpretations.length - 1]?.summary
    : undefined;
  view.note = "Written down — your words, kept exactly as you typed them.";
  persist();
  render();
}

function answer(): void {
  const box = document.getElementById("practice") as HTMLTextAreaElement | null;
  const session = view.session;
  const experienceId = view.practising;
  if (box === null || session === undefined || experienceId === undefined) return;
  const response = box.value.trim();
  if (response.length === 0) return;

  view.session = applyPractice(session, response, experienceId, view.conceptId ?? "").session;
  box.value = "";
  view.practising = undefined;
  view.question = undefined;
  view.note = "Kept, word for word. Nothing here marked it and nothing concluded from it.";
  persist();
  render();
}

function renderConfidence(): void {
  const bar = clear(mount("confidence"));
  for (const value of CONFIDENCE) {
    const button = el("button", "act", value);
    button.addEventListener("click", () => {
      const session = view.session;
      if (session === undefined) return;
      view.session = applyConfidence(session, value, view.conceptId ?? "").session;
      view.note = `Noted: “${value}”. That is your account of yourself, and nothing concludes anything from it.`;
      persist();
      render();
    });
    bar.appendChild(button);
  }
}

function forget(): void {
  const existed = forgetRecord();
  view.reviewing = false;
  view.session = undefined;
  view.conceptId = undefined;
  view.material = [];
  view.reading = undefined;
  view.practising = undefined;
  view.question = undefined;
  view.note = existed
    ? "Deleted. Nothing about you is kept in this browser any more."
    : "There was nothing kept to delete.";
  render();
}

// ---------------------------------------------------------------------------

export function start(): void {
  renderConcepts();
  renderConfidence();
  mount("write").addEventListener("click", write);
  mount("answer").addEventListener("click", answer);
  mount("history").addEventListener("click", () => {
    view.reviewing = true;
    view.note = "";
    render();
  });
  mount("history-close").addEventListener("click", () => {
    view.reviewing = false;
    render();
  });
  mount("history-share").addEventListener("click", () => {
    // The clipboard and nowhere else. There is no upload here and no link to
    // generate: what the learner does with the text after this is theirs, and
    // the page has no way of finding out.
    const record = view.session?.record;
    if (record === undefined) {
      view.note = "There is nothing kept about you yet, so there is nothing to copy.";
      render();
      return;
    }
    const text = describeForSharing(record, catalogue).join("\n");
    void navigator.clipboard.writeText(text).then(
      () => {
        view.note = "Copied. Paste it wherever you like — it went to your clipboard and nowhere else.";
        render();
      },
      () => {
        view.note = "This browser would not let the page copy for you. Select the text above and copy it yourself.";
        render();
      },
    );
  });
  mount("leave").addEventListener("click", () => {
    view.session = undefined;
    view.conceptId = undefined;
    view.material = [];
    view.reading = undefined;
    view.practising = undefined;
    view.question = undefined;
  view.question = undefined;
    view.note = recordExists() ? "Kept in this browser. It will be here next time." : "Nothing is kept.";
    render();
  });
  mount("forget").addEventListener("click", forget);

  const stored = loadRecord();
  if (stored.kind === "unreadable") {
    view.note = `A saved record could not be read: ${stored.reason} It has not been changed or deleted.`;
  } else if (stored.kind === "loaded") {
    view.note = "You have been here before. Pick an idea to carry on.";
  }
  render();
}

start();
