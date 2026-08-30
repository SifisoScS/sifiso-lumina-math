import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  confidenceReport,
  currentLearnerState,
  deliveryCapabilityProfile,
  evolveLearnerRecord,
  executeDeterministicLearningInteraction,
  exploreConceptCommand,
  luminaCurriculum,
  isoTimestamp,
  learnerChoice,
  learnerRecord,
  learnerReflection,
  observedPracticeOutcome,
  practiceAttempt,
  practiceOutcomeStatus,
  ReplayValidationError,
  replayLearnerHistory,
  requestLearningGuidanceCommand,
  submitConfidenceReportCommand,
  submitLearnerChoiceCommand,
  submitPracticeAttemptCommand,
  submitReflectionCommand,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.slice3";
const actor = trustedActorContext({
  actorId: "actor.slice3",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
});
const capabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);
const time = (second: number) => isoTimestamp(`2026-08-27T11:00:${String(second).padStart(2, "0")}.000Z`);

function initialRecord() {
  const state = currentLearnerState({ learnerId, engagementFocus: "unobserved" });
  return learnerRecord({
    learnerId: state.learnerId,
    evidence: [],
    events: [],
    interpretations: [],
    state,
    commitments: [],
  });
}

type Sequence = {
  record: ReturnType<typeof learnerRecord>;
  outcomes: ReturnType<typeof executeDeterministicLearningInteraction>["idempotency"]["outcome"][];
};

function run(sequence: Sequence, command: Parameters<typeof executeDeterministicLearningInteraction>[0]["command"], at: ReturnType<typeof isoTimestamp>, options?: {
  readonly activeOffers?: Parameters<typeof executeDeterministicLearningInteraction>[0]["activeOffers"];
  readonly actor?: ReturnType<typeof trustedActorContext>;
}) {
  const execution = executeDeterministicLearningInteraction({
    command,
    actor: options?.actor ?? actor,
    deliveryCapabilities: capabilities,
    learnerRecord: sequence.record,
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    ...(options?.activeOffers === undefined ? {} : { activeOffers: options.activeOffers }),
    priorOutcomes: sequence.outcomes,
    evaluatedAt: at,
  });
  const evolution = evolveLearnerRecord(sequence.record, command, execution);
  if (execution.idempotency.disposition === "new") {
    sequence.outcomes.push(execution.idempotency.outcome);
  }
  sequence.record = evolution.learnerRecord;
  return { execution, evolution };
}

test("PracticeAttempt keeps learner response immutable and distinguishes not-assessed from observed outcomes", () => {
  const unassessed = practiceAttempt({
    id: "evidence.slice3.practice.unassessed",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "I think the output is 7.",
    submittedAt: time(1),
  });
  const understanding = practiceAttempt({
    id: "evidence.slice3.practice.understanding",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "For input 2, the rule gives 4.",
    submittedAt: time(2),
    observedOutcome: observedPracticeOutcome({
      kind: "evidence-of-understanding",
      observedAt: time(3),
      assessmentBoundaryRef: "assessment-boundary.sample",
      outcomeEvidenceRef: "assessment-evidence.slice3.understanding",
    }),
  });
  const uncertainty = practiceAttempt({
    id: "evidence.slice3.practice.uncertainty",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "I am not certain how to apply the rule.",
    submittedAt: time(4),
    observedOutcome: observedPracticeOutcome({
      kind: "evidence-of-uncertainty",
      observedAt: time(5),
      assessmentBoundaryRef: "assessment-boundary.sample",
      outcomeEvidenceRef: "assessment-evidence.slice3.uncertainty",
    }),
  });

  assert.equal(practiceOutcomeStatus(unassessed), "not-assessed");
  assert.equal(practiceOutcomeStatus(understanding), "evidence-of-understanding");
  assert.equal(practiceOutcomeStatus(uncertainty), "evidence-of-uncertainty");
  assert.equal(unassessed.observedOutcome, undefined);
  assert.equal(understanding.observedOutcome?.assessmentBoundaryRef, "assessment-boundary.sample");
  assert.equal(uncertainty.observedOutcome?.outcomeEvidenceRef, "assessment-evidence.slice3.uncertainty");
  assert.equal(Object.isFrozen(unassessed), true);
  assert.equal(Object.isFrozen(understanding.observedOutcome), true);
});

test("Scenario A and B: accumulated reflection changes a later guidance decision without automatic choice", () => {
  const sequence: Sequence = { record: initialRecord(), outcomes: [] };
  const beforeReflection = run(sequence, requestLearningGuidanceCommand({
    id: "command.slice3.guidance.before-reflection",
    commandReference: "occurrence.slice3.guidance.before-reflection",
    learnerId,
    issuedAt: time(10),
    conceptId: "concept.function",
  }), time(10));
  assert.equal(beforeReflection.execution.decision.opportunities.some((opportunity) => opportunity.kind === "explore-representation"), false);
  assert.equal(beforeReflection.evolution.disposition, "unchanged");

  const reflection = learnerReflection({
    id: "evidence.slice3.reflection.001",
    learnerId,
    conceptId: "concept.function",
    originalText: "I would like another way to picture how inputs and outputs connect.",
    submittedAt: time(11),
  });
  const reflectionResult = run(sequence, submitReflectionCommand({
    id: "command.slice3.reflection.001",
    commandReference: "occurrence.slice3.reflection.001",
    learnerId,
    issuedAt: time(11),
    reflection,
  }), time(11));
  assert.equal(reflectionResult.evolution.disposition, "evolved");
  assert.deepEqual(reflectionResult.evolution.addedEvidenceIds, [reflection.id]);
  assert.equal(sequence.record.interpretations.some((interpretation) => interpretation.kind === "curiosity-thread"), true);

  const afterReflection = run(sequence, requestLearningGuidanceCommand({
    id: "command.slice3.guidance.after-reflection",
    commandReference: "occurrence.slice3.guidance.after-reflection",
    learnerId,
    issuedAt: time(12),
    conceptId: "concept.function",
  }), time(12));
  assert.equal(afterReflection.execution.decision.opportunities.some((opportunity) => opportunity.kind === "explore-representation"), true);
  assert.equal(afterReflection.execution.transition.kind, "not-committed");
  assert.equal(afterReflection.evolution.disposition, "unchanged");
});

test("Scenario C: high confidence and external uncertainty observation coexist, preserve uncertainty, and support revisit", () => {
  const sequence: Sequence = { record: initialRecord(), outcomes: [] };
  run(sequence, exploreConceptCommand({
    id: "command.slice3.explore.001",
    commandReference: "occurrence.slice3.explore.001",
    learnerId,
    issuedAt: time(20),
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }), time(20));

  const confidence = confidenceReport({
    id: "evidence.slice3.confidence.high",
    learnerId,
    conceptId: "concept.function",
    reportedValue: "high",
    scaleLabel: "qualitative",
    reportedAt: time(21),
  });
  run(sequence, submitConfidenceReportCommand({
    id: "command.slice3.confidence.high",
    commandReference: "occurrence.slice3.confidence.high",
    learnerId,
    issuedAt: time(21),
    confidenceReport: confidence,
  }), time(21));

  const uncertainPractice = practiceAttempt({
    id: "evidence.slice3.practice.conflicting",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "This raw response is retained but cannot itself establish an outcome.",
    submittedAt: time(22),
    observedOutcome: observedPracticeOutcome({
      kind: "evidence-of-uncertainty",
      observedAt: time(23),
      assessmentBoundaryRef: "assessment-boundary.slice3",
      outcomeEvidenceRef: "assessment-evidence.slice3.conflicting",
    }),
  });
  const result = run(sequence, submitPracticeAttemptCommand({
    id: "command.slice3.practice.conflicting",
    commandReference: "occurrence.slice3.practice.conflicting",
    learnerId,
    issuedAt: time(23),
    practiceAttempt: uncertainPractice,
  }), time(23));

  assert.equal(result.execution.diagnostics.evidenceEvaluation?.inferred.confidencePracticeConflict, true);
  assert.equal(result.execution.decision.provenance.uncertainty.level, "high");
  assert.equal(result.execution.decision.opportunities.some((opportunity) => opportunity.kind === "revisit"), true);
  assert.equal(result.execution.decision.provenance.references.some((reference) => reference.kind === "assessment-boundary"), true);
  assert.equal(result.execution.decision.provenance.references.some((reference) => reference.kind === "assessment-evidence"), true);
  assert.equal(sequence.record.evidence.some((evidence) => evidence.id === confidence.id), true);
  assert.equal(sequence.record.evidence.some((evidence) => evidence.id === uncertainPractice.id), true);
  assert.equal(sequence.record.interpretations.some((interpretation) => interpretation.summary.includes("readiness")), true);
});

test("unassessed raw practice responses cannot independently create an understanding or uncertainty outcome", () => {
  const first = practiceAttempt({
    id: "evidence.slice3.raw.001",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "A response with any content.",
    submittedAt: time(30),
  });
  const second = practiceAttempt({
    id: "evidence.slice3.raw.002",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "A completely different response with no supplied assessment.",
    submittedAt: time(31),
  });
  assert.equal(practiceOutcomeStatus(first), "not-assessed");
  assert.equal(practiceOutcomeStatus(second), "not-assessed");

  const sequence: Sequence = { record: initialRecord(), outcomes: [] };
  run(sequence, submitPracticeAttemptCommand({
    id: "command.slice3.raw.001",
    commandReference: "occurrence.slice3.raw.001",
    learnerId,
    issuedAt: time(30),
    practiceAttempt: first,
  }), time(30));
  const result = run(sequence, submitPracticeAttemptCommand({
    id: "command.slice3.raw.002",
    commandReference: "occurrence.slice3.raw.002",
    learnerId,
    issuedAt: time(31),
    practiceAttempt: second,
  }), time(31));
  assert.equal(result.execution.diagnostics.evidenceEvaluation?.observed.hasUnassessedPractice, true);
  assert.equal(result.execution.diagnostics.evidenceEvaluation?.inferred.supportsMoveTowardAnotherLayer, false);
  assert.equal(result.execution.diagnostics.evidenceEvaluation?.inferred.supportsRevisit, false);
});

test("Scenario D: a learner offer waits for explicit choice before an additional state commitment", () => {
  const sequence: Sequence = { record: initialRecord(), outcomes: [] };
  const exploration = run(sequence, exploreConceptCommand({
    id: "command.slice3.autonomy.explore",
    commandReference: "occurrence.slice3.autonomy.explore",
    learnerId,
    issuedAt: time(40),
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }), time(40));
  const commitmentCountAfterDirectCommand = sequence.record.commitments.length;
  const offered = exploration.execution.decision.offers.find((offer) => offer.opportunity.kind === "continue");
  assert.notEqual(offered, undefined);
  if (offered === undefined) {
    throw new Error("The deterministic exploration decision must contain a continue offer.");
  }
  assert.equal(commitmentCountAfterDirectCommand, 1);

  const choice = learnerChoice({
    id: "choice.slice3.autonomy.001",
    learnerId,
    choiceKind: "select-offer",
    offerId: offered.id,
    chosenAt: time(41),
  });
  const selected = run(sequence, submitLearnerChoiceCommand({
    id: "command.slice3.autonomy.select",
    commandReference: "occurrence.slice3.autonomy.select",
    learnerId,
    issuedAt: time(41),
    learnerChoice: choice,
  }), time(41), { activeOffers: exploration.execution.decision.offers });

  // What this scenario protects is that an offer alone does nothing and only an
  // explicit choice has any effect. It used to observe that by counting
  // commitments. Under O8 the choice writes no commitment -- the offer was for
  // the concept already open -- so the effect is observed where it actually is:
  // the learner's choice is in their evidence and the acceptance is in the
  // history, neither of which existed before the choice was made.
  assert.equal(sequence.record.commitments.length, commitmentCountAfterDirectCommand);
  assert.equal(sequence.record.evidence.some((evidence) => evidence.id === choice.id), true);
  assert.equal(selected.execution.events.some((event) => event.kind === "learning-path-accepted"), true);
  assert.equal(
    selected.execution.events.every((event) => event.kind !== "state-committed"),
    true,
    "nothing changed, so nothing should have been committed",
  );
});

test("Scenario E: ordered commitment replay reconstructs the same learner state deterministically and rejects missing history", () => {
  const initial = initialRecord();
  const sequence: Sequence = { record: initial, outcomes: [] };
  run(sequence, exploreConceptCommand({
    id: "command.slice3.replay.explore",
    commandReference: "occurrence.slice3.replay.explore",
    learnerId,
    issuedAt: time(50),
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }), time(50));
  const understandingPractice = practiceAttempt({
    id: "evidence.slice3.replay.practice",
    learnerId,
    conceptId: "concept.function",
    learningExperienceId: "experience.function.practice-input-output",
    learnerResponse: "A learner response with externally supplied evidence.",
    submittedAt: time(51),
    observedOutcome: observedPracticeOutcome({
      kind: "evidence-of-understanding",
      observedAt: time(52),
      assessmentBoundaryRef: "assessment-boundary.slice3",
      outcomeEvidenceRef: "assessment-evidence.slice3.replay",
    }),
  });
  const practiceResult = run(sequence, submitPracticeAttemptCommand({
    id: "command.slice3.replay.practice",
    commandReference: "occurrence.slice3.replay.practice",
    learnerId,
    issuedAt: time(52),
    practiceAttempt: understandingPractice,
  }), time(52));
  assert.equal(practiceResult.execution.decision.opportunities.some((opportunity) =>
    opportunity.kind === "move-toward-layer" && opportunity.pedagogicalLayer === "mechanics"), true);

  const replayInput = {
    initialState: initial.state,
    events: sequence.record.events,
    commitments: sequence.record.commitments,
  };
  const firstReplay = replayLearnerHistory(replayInput);
  const secondReplay = replayLearnerHistory(replayInput);
  assert.deepEqual(firstReplay.reconstructedState, sequence.record.state);
  assert.deepEqual(secondReplay, firstReplay);
  assert.equal(sequence.record.events.filter((event) => event.kind === "state-committed").length, sequence.record.commitments.length);
  for (const event of sequence.record.events) {
    assert.equal(event.interactionCommandId === undefined, false);
    assert.equal(event.learningDecisionId === undefined, false);
    assert.equal(event.provenanceId === undefined, false);
    assert.equal(event.contextVersion === undefined, false);
  }
  assert.throws(
    () => replayLearnerHistory({ ...replayInput, commitments: [] }),
    ReplayValidationError,
  );
});

test("repeated interactions remain idempotent and policy rejection cannot alter an evolving record", () => {
  const sequence: Sequence = { record: initialRecord(), outcomes: [] };
  const command = exploreConceptCommand({
    id: "command.slice3.idempotent",
    commandReference: "occurrence.slice3.idempotent",
    learnerId,
    issuedAt: time(55),
    conceptId: "concept.function",
  });
  const first = run(sequence, command, time(55));
  const stateAfterFirst = sequence.record;
  const second = run(sequence, command, time(56));
  assert.equal(second.execution.idempotency.disposition, "replayed");
  assert.equal(second.evolution.disposition, "unchanged");
  assert.equal(sequence.record, stateAfterFirst);
  assert.equal(first.execution.diagnostics.reasoningInvolved, false);

  const prohibitedActor = trustedActorContext({
    actorId: "actor.slice3.permission-denied",
    learnerScope: [learnerId],
    permissions: ["read-learner-record"],
  });
  const rejected = executeDeterministicLearningInteraction({
    command: requestLearningGuidanceCommand({
      id: "command.slice3.rejected",
      commandReference: "occurrence.slice3.rejected",
      learnerId,
      issuedAt: time(57),
      conceptId: "concept.function",
    }),
    actor: prohibitedActor,
    deliveryCapabilities: capabilities,
    learnerRecord: sequence.record,
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    evaluatedAt: time(57),
  });
  const rejectedEvolution = evolveLearnerRecord(sequence.record, requestLearningGuidanceCommand({
    id: "command.slice3.rejected",
    commandReference: "occurrence.slice3.rejected",
    learnerId,
    issuedAt: time(57),
    conceptId: "concept.function",
  }), rejected);
  assert.equal(rejected.decision.type, "material");
  assert.equal(rejected.decision.status, "declined");
  assert.equal(rejected.transition.kind, "not-committed");
  assert.equal(rejectedEvolution.disposition, "unchanged");
});
