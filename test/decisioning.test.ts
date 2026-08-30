import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalPedagogicalGuidance,
  currentLearnerState,
  declaredEvidenceConflict,
  deliveryCapabilityProfile,
  executeDeterministicLearningInteraction,
  luminaCurriculum,
  candidateLearningOpportunity,
  learningDecision,
  learningOffer,
  policyEvaluation,
  learnerChoice,
  learnerRecord,
  learnerReflection,
  learningContextReport,
  reasoningProposal,
  reasoningTask,
  requestLearningGuidanceCommand,
  submitLearnerChoiceCommand,
  submitLearningContextCommand,
  submitReflectionCommand,
  trustedActorContext,
  validateAndPlanStateTransition,
  validateReasoningProposal,
} from "../src/index.js";
import { testProvenance, timestamp } from "./fixtures.js";
import { exploreConceptCommand } from "../src/contracts/core-contracts.js";

const learnerId = "learner.ada";
const actor = trustedActorContext({
  actorId: "actor.ada",
  learnerScope: [learnerId],
  permissions: [
    "request-learning-decision",
    "submit-learner-evidence",
    "make-learner-choice",
  ],
  consentReferences: ["consent.learning.001"],
});
const capabilities = deliveryCapabilityProfile(["displayed-text", "displayed-notation", "typed-input"]);

function recordWithState(state = currentLearnerState({
  learnerId,
  engagementFocus: "unobserved",
})): ReturnType<typeof learnerRecord> {
  return learnerRecord({
    learnerId: state.learnerId,
    evidence: [],
    events: [],
    interpretations: [],
    state,
    commitments: [],
  });
}

function execute(command: Parameters<typeof executeDeterministicLearningInteraction>[0]["command"], options?: {
  readonly learnerRecord?: ReturnType<typeof learnerRecord>;
  readonly actor?: ReturnType<typeof trustedActorContext>;
  readonly activeOffers?: readonly ReturnType<typeof import("../src/index.js").learningOffer>[];
  readonly declaredEvidenceConflicts?: readonly ReturnType<typeof declaredEvidenceConflict>[];
  readonly priorOutcomes?: readonly ReturnType<typeof executeDeterministicLearningInteraction>["idempotency"]["outcome"][];
}) {
  return executeDeterministicLearningInteraction({
    command,
    actor: options?.actor ?? actor,
    deliveryCapabilities: capabilities,
    learnerRecord: options?.learnerRecord ?? recordWithState(),
    knowledgeCatalog: luminaCurriculum,
    pedagogicalGuidance: canonicalPedagogicalGuidance,
    ...(options?.activeOffers === undefined ? {} : { activeOffers: options.activeOffers }),
    ...(options?.declaredEvidenceConflicts === undefined ? {} : { declaredEvidenceConflicts: options.declaredEvidenceConflicts }),
    ...(options?.priorOutcomes === undefined ? {} : { priorOutcomes: options.priorOutcomes }),
    evaluatedAt: timestamp,
  });
}

test("normal deterministic progression returns a material decision, options, a command-authorized state plan, and historical events", () => {
  const result = execute(exploreConceptCommand({
    id: "command.slice2.normal.001",
    commandReference: "occurrence.slice2.normal.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }));

  assert.equal(result.decision.type, "material");
  assert.equal(result.decision.status, "offer-available");
  assert.deepEqual(result.decision.conceptIds, ["concept.function"]);
  assert.ok(result.decision.opportunities.some((item) => item.kind === "continue"));
  assert.ok(result.decision.opportunities.some((item) => item.kind === "explore-representation"));
  assert.ok(result.decision.opportunities.some((item) => item.kind === "pause"));
  assert.equal(result.transition.kind, "committed");
  assert.equal(result.transition.nextState.engagementFocus, "active-focus");
  assert.deepEqual(result.events.map((event) => event.kind), ["concept-viewed", "layer-entered", "state-committed"]);
  assert.equal(result.diagnostics.reasoningInvolved, false);
});

test("a learner can choose an alternative offered representation without the original offer silently selecting it", () => {
  const first = execute(exploreConceptCommand({
    id: "command.slice2.alternative.initial",
    commandReference: "occurrence.slice2.alternative.initial",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }));
  const alternativeOffer = first.decision.offers.find((offer) => offer.opportunity.kind === "explore-representation");
  assert.ok(alternativeOffer);

  const choice = learnerChoice({
    id: "choice.slice2.alternative.001",
    learnerId,
    choiceKind: "select-offer",
    offerId: alternativeOffer?.id,
    chosenAt: timestamp,
  });
  const selected = execute(submitLearnerChoiceCommand({
    id: "command.slice2.alternative.choice",
    commandReference: "occurrence.slice2.alternative.choice",
    learnerId,
    issuedAt: timestamp,
    learnerChoice: choice,
  }), {
    learnerRecord: recordWithState(first.transition.nextState),
    activeOffers: first.decision.offers,
  });

  assert.equal(first.transition.kind, "committed");

  // The claim here is that an alternative is never selected silently -- it took
  // an explicit choice, and that choice is in the history. Under O8 the choice
  // writes no commitment, because the alternative representation is for the
  // concept and layer the learner already had open; nothing about where they
  // are changed, and the record no longer says otherwise.
  assert.ok(selected.events.some((event) => event.kind === "learning-path-accepted"));
  assert.equal(selected.transition.kind, "not-committed");
  assert.equal(selected.transition.nextState.activeConceptId, "concept.function");
});

function respondToActiveOffer(choiceKind: "decline-offer" | "defer-offer" | "request-alternative", idPart: string) {
  const first = execute(exploreConceptCommand({
    id: `command.slice2.${idPart}.initial`,
    commandReference: `occurrence.slice2.${idPart}.initial`,
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
    pedagogicalLayer: "intuition",
  }));
  const offer = first.decision.offers.find((candidate) => candidate.opportunity.kind === "explore-representation");
  assert.ok(offer, "the setup requires a currently active offer so the guard is not reached by offer invalidity");

  const responded = execute(submitLearnerChoiceCommand({
    id: `command.slice2.${idPart}.choice`,
    commandReference: `occurrence.slice2.${idPart}.choice`,
    learnerId,
    issuedAt: timestamp,
    learnerChoice: learnerChoice({
      id: `choice.slice2.${idPart}.001`,
      learnerId,
      choiceKind,
      offerId: offer?.id,
      chosenAt: timestamp,
    }),
  }), {
    learnerRecord: recordWithState(first.transition.nextState),
    activeOffers: first.decision.offers,
  });

  return { priorState: first.transition.nextState, responded };
}

test("declining an offer creates no commitment and does not move the learner toward it", () => {
  const { priorState, responded } = respondToActiveOffer("decline-offer", "decline");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), false);
  assert.equal(responded.events.some((event) => event.kind === "state-committed"), false);
});

test("deferring an offer creates no commitment and does not move the learner toward it", () => {
  const { priorState, responded } = respondToActiveOffer("defer-offer", "defer");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), false);
  assert.equal(responded.events.some((event) => event.kind === "state-committed"), false);
});

test("requesting an alternative creates no commitment and does not move the learner toward the original offer", () => {
  const { priorState, responded } = respondToActiveOffer("request-alternative", "request-alternative");

  assert.equal(responded.transition.kind, "not-committed");
  assert.deepEqual(responded.transition.nextState, priorState);
  assert.equal(responded.events.some((event) => event.kind === "learning-path-accepted"), false);
  assert.equal(responded.events.some((event) => event.kind === "state-committed"), false);
});

test("a prerequisite relationship produces a voluntary revisit opportunity and no automatic state change", () => {
  const result = execute(requestLearningGuidanceCommand({
    id: "command.slice2.prerequisite.001",
    commandReference: "occurrence.slice2.prerequisite.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.domain-range",
  }));

  const prerequisite = result.decision.opportunities.find((item) => item.kind === "revisit-prerequisite");
  assert.equal(result.decision.type, "material");
  assert.equal(prerequisite?.relatedConceptId, "concept.function");
  assert.equal(result.transition.kind, "not-committed");
  assert.equal(result.events.length, 0);
});

test("reflection submission is observed evidence, can trigger deterministic adaptation, and does not invoke AI", () => {
  const reflection = learnerReflection({
    id: "evidence.slice2.reflection.001",
    learnerId,
    conceptId: "concept.inverse-function",
    originalText: "I would like another way to think about reversing inputs and outputs.",
    submittedAt: timestamp,
  });
  const result = execute(submitReflectionCommand({
    id: "command.slice2.reflection.001",
    commandReference: "occurrence.slice2.reflection.001",
    learnerId,
    issuedAt: timestamp,
    reflection,
  }));

  assert.equal(result.decision.type, "material");
  assert.ok(result.decision.opportunities.some((item) => item.kind === "reflect"));
  assert.equal(result.transition.kind, "committed");
  assert.ok(result.events.some((event) => event.kind === "reflection-submitted"));
  assert.equal(result.diagnostics.reasoningInvolved, false);
});

test("an invalid mock reasoning proposal is rejected and cannot control deterministic engine state", () => {
  const task = reasoningTask({
    id: "reasoning-task.slice2.001",
    kind: "reflection-analysis",
    conceptIds: ["concept.function"],
    permittedEvidenceIds: ["evidence.slice2.reasoning.001"],
    requestedAt: timestamp,
    purpose: "Bounded test of proposal validation.",
  });
  const invalidProposal = reasoningProposal({
    id: "proposal.slice2.invalid.001",
    taskId: task.id,
    kind: "reflection-analysis",
    summary: "The learner is wrong and should know this already.",
    evidenceIds: ["evidence.slice2.reasoning.001"],
    provenance: testProvenance,
  });
  const validation = validateReasoningProposal(task, invalidProposal);
  assert.equal(validation.outcome, "rejected");

  const result = execute(exploreConceptCommand({
    id: "command.slice2.no-reasoning.001",
    commandReference: "occurrence.slice2.no-reasoning.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }));
  assert.equal(result.diagnostics.reasoningInvolved, false);
  assert.equal(result.decision.type, "material");
});

test("missing concept context produces a safe non-material outcome without fabricating a concept or state effect", () => {
  const contextReport = learningContextReport({
    id: "evidence.slice2.context.001",
    learnerId,
    learningIntention: "I would like a gentle place to begin.",
    selfReportedEnergyContext: "low energy",
    reportedAt: timestamp,
  });
  const result = execute(submitLearningContextCommand({
    id: "command.slice2.incomplete.001",
    commandReference: "occurrence.slice2.incomplete.001",
    learnerId,
    issuedAt: timestamp,
    learningContextReport: contextReport,
  }));

  assert.equal(result.decision.type, "safe-non-material");
  assert.equal(result.decision.status, "incomplete-context");
  assert.deepEqual(result.decision.conceptIds, []);
  assert.deepEqual(result.decision.opportunities, []);
  assert.deepEqual(result.decision.offers, []);
  assert.equal(result.transition.kind, "not-committed");
  assert.equal(result.events.length, 0);
});

test("policy rejection declines a material decision without offers, state commitment, or events", () => {
  const restrictedActor = trustedActorContext({
    actorId: "actor.restricted",
    learnerScope: [learnerId],
    permissions: ["submit-learner-evidence"],
  });
  const result = execute(exploreConceptCommand({
    id: "command.slice2.policy.001",
    commandReference: "occurrence.slice2.policy.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }), { actor: restrictedActor });

  assert.equal(result.decision.type, "material");
  assert.equal(result.decision.status, "declined");
  assert.deepEqual(result.decision.offers, []);
  assert.equal(result.transition.kind, "not-committed");
  assert.equal(result.events.length, 0);
});

test("replayed command references return the original outcome without a second material effect", () => {
  const command = exploreConceptCommand({
    id: "command.slice2.repeat.001",
    commandReference: "occurrence.slice2.repeat.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  });
  const first = execute(command);
  const replay = execute(command, { priorOutcomes: [first.idempotency.outcome] });

  assert.equal(first.idempotency.disposition, "new");
  assert.equal(replay.idempotency.disposition, "replayed");
  assert.equal(replay.decision.id, first.decision.id);
  assert.deepEqual(replay.events, first.events);
  assert.equal(replay.transition, first.transition);
});

test("deterministic decisioning remains available when no reasoning provider is supplied", () => {
  const result = execute(exploreConceptCommand({
    id: "command.slice2.unavailable-reasoning.001",
    commandReference: "occurrence.slice2.unavailable-reasoning.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }));

  assert.equal(result.decision.status, "offer-available");
  assert.equal(result.diagnostics.reasoningInvolved, false);
  assert.ok(result.decision.offers.length > 0);
});


test("declared conflicting evidence remains provenance-linked uncertainty and cannot create a readiness-like commitment", () => {
  const firstReflection = learnerReflection({
    id: "evidence.slice2.conflict.001",
    learnerId,
    conceptId: "concept.function",
    originalText: "I feel ready to explore another representation.",
    submittedAt: timestamp,
  });
  const secondReflection = learnerReflection({
    id: "evidence.slice2.conflict.002",
    learnerId,
    conceptId: "concept.function",
    originalText: "I am still unsure about how one input relates to one output.",
    submittedAt: timestamp,
  });
  const conflictRecord = learnerRecord({
    learnerId: firstReflection.learnerId,
    evidence: [firstReflection, secondReflection],
    events: [],
    interpretations: [],
    state: currentLearnerState({
      learnerId,
      engagementFocus: "encountered",
      evidenceIds: [firstReflection.id, secondReflection.id],
    }),
    commitments: [],
  });
  const result = execute(requestLearningGuidanceCommand({
    id: "command.slice2.conflict.001",
    commandReference: "occurrence.slice2.conflict.001",
    learnerId,
    issuedAt: timestamp,
    conceptId: "concept.function",
  }), {
    learnerRecord: conflictRecord,
    declaredEvidenceConflicts: [declaredEvidenceConflict({
      evidenceIds: [firstReflection.id, secondReflection.id],
      description: "The observed reflections point to different current learning needs.",
    })],
  });

  assert.equal(result.decision.type, "material");
  assert.equal(result.decision.provenance.uncertainty.level, "high");
  assert.equal(result.transition.kind, "not-committed");
  assert.ok(result.decision.opportunities.some((item) => item.kind === "allow-learner-choice"));
});


test("an invalid stale-offer transition is rejected without mutating learner state or generating events", () => {
  const staleOpportunity = candidateLearningOpportunity({
    id: "opportunity.slice2.stale",
    kind: "explore-representation",
    conceptId: "concept.function",
  });
  const currentlyActiveOffer = learningOffer({
    id: "offer.slice2.stale",
    opportunity: staleOpportunity,
    requiresLearnerChoice: true,
  });
  const differentOpportunity = candidateLearningOpportunity({
    id: "opportunity.slice2.current",
    kind: "reflect",
    conceptId: "concept.function",
  });
  const decision = learningDecision({
    id: "decision.slice2.current",
    learnerId,
    type: "material",
    status: "offer-available",
    conceptIds: ["concept.function"],
    opportunities: [differentOpportunity],
    offers: [learningOffer({ id: "offer.slice2.current", opportunity: differentOpportunity, requiresLearnerChoice: true })],
    policyEvaluations: [policyEvaluation({
      policyId: "policy.learner-autonomy",
      policyVersion: "policy.v1",
      outcome: "requires-confirmation",
      rationale: "A learner choice is required before commitment.",
    })],
    provenance: testProvenance,
  });
  const choice = learnerChoice({
    id: "choice.slice2.stale",
    learnerId,
    choiceKind: "select-offer",
    offerId: currentlyActiveOffer.id,
    chosenAt: timestamp,
  });
  const command = submitLearnerChoiceCommand({
    id: "command.slice2.stale",
    commandReference: "occurrence.slice2.stale",
    learnerId,
    issuedAt: timestamp,
    learnerChoice: choice,
  });
  const state = currentLearnerState({
    learnerId,
    engagementFocus: "active-focus",
    activeConceptId: "concept.function",
  });
  const result = validateAndPlanStateTransition({
    command,
    decision,
    currentState: state,
    activeOffers: [currentlyActiveOffer],
    committedAt: timestamp,
  });

  assert.equal(result.kind, "not-committed");
  assert.equal(result.nextState, state);
  assert.match(result.reason, /no longer compatible/);
});

test("no concept is offered the same opportunity twice", () => {
  // Found by walking a real session in the terminal: two offers for
  // concept.inverse-function were byte-for-byte identical, opportunity id
  // included. Two generation paths reached the same reflection experience --
  // one keyed on the experience's intent, one on the evidence it expects -- and
  // nothing collapsed them. A learner was shown the same option twice with no
  // way to tell which was which, which is not a choice at all.
  //
  // Asserted over every concept in the catalogue and both layers, so the next
  // path that converges is caught here rather than in front of a person.
  for (const concept of luminaCurriculum.concepts) {
    for (const layer of ["intuition", "mechanics", "exam-patterns"] as const) {
      const execution = execute(exploreConceptCommand({
        id: `command.distinct.${concept.id}.${layer}`,
        commandReference: `occurrence.distinct.${concept.id}.${layer}`,
        learnerId,
        issuedAt: timestamp,
        conceptId: concept.id,
        pedagogicalLayer: layer,
      }));

      const ids = execution.decision.offers.map((offer) => offer.opportunity.id);
      assert.equal(
        new Set(ids).size,
        ids.length,
        `${concept.id} at ${layer} was offered a duplicate opportunity: ${ids.join(", ")}`,
      );
    }
  }
});

test("opening a new idea is read at that idea's own depth, not the last one used", () => {
  // The engine's answer, before any surface gets a chance to refresh it. The
  // context for a command is resolved against the concept the command is about;
  // resolving it against whichever concept the learner happened to have open
  // filtered a brand-new idea to a depth chosen for a different one (A2).
  const result = execute(
    exploreConceptCommand({
      id: "command.depth.new-concept",
      commandReference: "occurrence.depth.new-concept",
      learnerId,
      issuedAt: timestamp,
      conceptId: "concept.domain-range",
    }),
    {
      learnerRecord: recordWithState(currentLearnerState({
        learnerId,
        engagementFocus: "active-focus",
        activeConceptId: "concept.function",
        pedagogicalLayerByConcept: [{ conceptId: "concept.function", layer: "exam-patterns" }],
      })),
    },
  );

  assert.equal(result.decision.status, "offer-available");
  assert.ok(
    result.decision.opportunities.some((item) => item.pedagogicalLayer === "intuition"),
    "the new idea was filtered to a depth chosen for a different one",
  );
});
