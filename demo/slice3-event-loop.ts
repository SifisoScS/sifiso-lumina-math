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
  learnerRecord,
  learnerReflection,
  observedPracticeOutcome,
  practiceAttempt,
  replayLearnerHistory,
  requestLearningGuidanceCommand,
  submitConfidenceReportCommand,
  submitPracticeAttemptCommand,
  submitReflectionCommand,
  trustedActorContext,
} from "../src/index.js";

const learnerId = "learner.demo.slice3";
const actor = trustedActorContext({
  actorId: "actor.demo.slice3",
  learnerScope: [learnerId],
  permissions: ["read-learner-record", "request-learning-decision", "submit-learner-evidence", "make-learner-choice"],
});
const deliveryCapabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);
const time = (second: number) => isoTimestamp(`2026-08-27T12:00:${String(second).padStart(2, "0")}.000Z`);
const initialState = currentLearnerState({ learnerId, engagementFocus: "unobserved" });
let record = learnerRecord({
  learnerId: initialState.learnerId,
  evidence: [],
  events: [],
  interpretations: [],
  state: initialState,
  commitments: [],
});
const priorOutcomes: Parameters<typeof executeDeterministicLearningInteraction>[0]["priorOutcomes"] extends readonly (infer T)[] | undefined ? T[] : never[] = [];

function run(label: string, command: Parameters<typeof executeDeterministicLearningInteraction>[0]["command"], at: ReturnType<typeof isoTimestamp>) {
  const execution = executeDeterministicLearningInteraction({
    command,
    actor,
    deliveryCapabilities,
    learnerRecord: record,
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    priorOutcomes,
    evaluatedAt: at,
  });
  const evolution = evolveLearnerRecord(record, command, execution);
  if (execution.idempotency.disposition === "new") {
    priorOutcomes.push(execution.idempotency.outcome);
  }
  record = evolution.learnerRecord;
  return {
    label,
    command: command.kind,
    decision: {
      type: execution.decision.type,
      status: execution.decision.status,
      opportunities: execution.decision.opportunities.map((opportunity) => opportunity.kind),
      uncertainty: execution.decision.provenance.uncertainty.level,
    },
    evidenceEvaluation: execution.diagnostics.evidenceEvaluation === undefined ? undefined : {
      observedPracticeOutcomes: execution.diagnostics.evidenceEvaluation.observed.practiceOutcomes,
      confidencePracticeConflict: execution.diagnostics.evidenceEvaluation.inferred.confidencePracticeConflict,
      supportsRevisit: execution.diagnostics.evidenceEvaluation.inferred.supportsRevisit,
      supportsLayerMovement: execution.diagnostics.evidenceEvaluation.inferred.supportsMoveTowardAnotherLayer,
    },
    evolution: {
      disposition: evolution.disposition,
      evidenceAdded: evolution.addedEvidenceIds,
      interpretationsAdded: evolution.addedInterpretationIds,
      eventsAdded: evolution.addedEventIds,
      commitmentsAdded: evolution.addedCommitmentIds,
      state: record.state,
    },
  };
}

const steps = [];
steps.push(run("Interaction 1 — explore Function intuition", exploreConceptCommand({
  id: "command.demo.slice3.explore",
  commandReference: "occurrence.demo.slice3.explore",
  learnerId,
  issuedAt: time(1),
  conceptId: "concept.function",
  pedagogicalLayer: "intuition",
}), time(1)));

const reflection = learnerReflection({
  id: "evidence.demo.slice3.reflection",
  learnerId,
  conceptId: "concept.function",
  originalText: "I want another way to picture the input-output relationship.",
  submittedAt: time(2),
});
steps.push(run("Interaction 2 — submit reflection", submitReflectionCommand({
  id: "command.demo.slice3.reflection",
  commandReference: "occurrence.demo.slice3.reflection",
  learnerId,
  issuedAt: time(2),
  reflection,
}), time(2)));

const confidence = confidenceReport({
  id: "evidence.demo.slice3.confidence",
  learnerId,
  conceptId: "concept.function",
  reportedValue: "high",
  scaleLabel: "qualitative",
  reportedAt: time(3),
});
steps.push(run("Interaction 3 — submit high qualitative confidence", submitConfidenceReportCommand({
  id: "command.demo.slice3.confidence",
  commandReference: "occurrence.demo.slice3.confidence",
  learnerId,
  issuedAt: time(3),
  confidenceReport: confidence,
}), time(3)));

const practice = practiceAttempt({
  id: "evidence.demo.slice3.practice",
  learnerId,
  conceptId: "concept.function",
  learningExperienceId: "experience.function.practice-input-output",
  learnerResponse: "The raw learner response is preserved and not used as an assessment result.",
  submittedAt: time(4),
  observedOutcome: observedPracticeOutcome({
    kind: "evidence-of-uncertainty",
    observedAt: time(4),
    assessmentBoundaryRef: "assessment-boundary.demo",
    outcomeEvidenceRef: "assessment-evidence.demo.slice3.practice",
  }),
});
steps.push(run("Interaction 4 — submit practice with external uncertainty observation", submitPracticeAttemptCommand({
  id: "command.demo.slice3.practice",
  commandReference: "occurrence.demo.slice3.practice",
  learnerId,
  issuedAt: time(4),
  practiceAttempt: practice,
}), time(4)));

steps.push(run("Interaction 5 — request guidance from accumulated context", requestLearningGuidanceCommand({
  id: "command.demo.slice3.guidance",
  commandReference: "occurrence.demo.slice3.guidance",
  learnerId,
  issuedAt: time(5),
  conceptId: "concept.function",
}), time(5)));

const replay = replayLearnerHistory({
  initialState,
  events: record.events,
  commitments: record.commitments,
});

console.log(JSON.stringify({
  engine: { deterministic: true, reasoningInvolved: false, persistenceImplemented: false },
  lifecycle: "Interaction → Evidence → Decision → Approved State Effect → Historical Event → Updated Learner Context → Subsequent Decision",
  steps,
  finalLearnerRecord: {
    evidenceKinds: record.evidence.map((evidence) => evidence.kind),
    interpretationKinds: record.interpretations.map((interpretation) => interpretation.kind),
    commitmentCount: record.commitments.length,
    eventKinds: record.events.map((event) => event.kind),
    state: record.state,
  },
  replay: {
    appliedCommitmentIds: replay.appliedCommitmentIds,
    reconstructedState: replay.reconstructedState,
    equivalentToEvolvedState: JSON.stringify(replay.reconstructedState) === JSON.stringify(record.state),
  },
}, null, 2));
