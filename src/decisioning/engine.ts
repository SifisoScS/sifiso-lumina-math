import {
  InteractionCommand,
  LearningDecision,
  LearningInteractionResponse,
  learningInteractionResponse,
  policyEvaluation,
} from "../contracts/core-contracts.js";
import { DerivedInterpretation, HistoricalEvent } from "../domain/learner-record.js";
import { IsoTimestamp, readonlyList } from "../domain/primitives.js";
import {
  assembleLearningContext,
  ContextAssemblyInput,
  ContextAssemblyResult,
} from "./context.js";
import {
  constructMaterialDecision,
  constructSafeNonMaterialDecision,
} from "./decision-construction.js";
import { EvidenceEvaluation, evaluateAccumulatedEvidence } from "./evidence-evaluation.js";
import {
  evaluateContextDeliveryCompatibility,
  generateCandidateLearningOpportunities,
} from "./opportunities.js";
import { evaluateDecisionPolicy, DecisionPolicyResult } from "./policy-evaluation.js";
import { StateTransitionResult, validateAndPlanStateTransition } from "./state-transitions.js";
import { DeliveryFilteringResult } from "./delivery-compatibility.js";

export interface EngineExecutionInput extends ContextAssemblyInput {
  /** A supplied time reference keeps the deterministic engine independent of a clock implementation. */
  readonly evaluatedAt: IsoTimestamp;
  /** Previously recorded outcomes are supplied by a future persistence boundary; no persistence is implemented here. */
  readonly priorOutcomes?: readonly InteractionOutcomeRecord[];
}

export interface EngineDiagnostics {
  readonly contextAssembly: ContextAssemblyResult;
  readonly consideredEvidenceIds: readonly string[];
  readonly consideredKnowledgeIds: readonly string[];
  readonly policyEvaluations: DecisionPolicyResult["evaluations"];
  readonly reasoningInvolved: false;
  readonly plannedEventKinds: readonly string[];
  readonly deliveryCompatibility?: DeliveryFilteringResult;
  /** A qualified deterministic reading of observations, distinct from learner-owned evidence. */
  readonly evidenceEvaluation?: EvidenceEvaluation;
}

export interface InteractionOutcomeRecord {
  readonly commandReference: InteractionCommand["commandReference"];
  readonly learnerId: InteractionCommand["learnerId"];
  readonly decision: LearningDecision;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
  readonly derivedInterpretations: readonly DerivedInterpretation[];
  readonly diagnostics: EngineDiagnostics;
}

export interface EngineExecutionResult {
  readonly decision: LearningDecision;
  readonly response: LearningInteractionResponse;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
  readonly derivedInterpretations: readonly DerivedInterpretation[];
  readonly diagnostics: EngineDiagnostics;
  readonly idempotency: {
    readonly disposition: "new" | "replayed";
    readonly outcome: InteractionOutcomeRecord;
  };
}

function replayedResult(outcome: InteractionOutcomeRecord): EngineExecutionResult {
  return Object.freeze({
    decision: outcome.decision,
    response: learningInteractionResponse(outcome.decision),
    transition: outcome.transition,
    events: outcome.events,
    derivedInterpretations: outcome.derivedInterpretations,
    diagnostics: outcome.diagnostics,
    idempotency: Object.freeze({ disposition: "replayed" as const, outcome }),
  });
}

function newResult(input: {
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
  readonly derivedInterpretations: readonly DerivedInterpretation[];
  readonly diagnostics: EngineDiagnostics;
}): EngineExecutionResult {
  const outcome: InteractionOutcomeRecord = Object.freeze({
    commandReference: input.command.commandReference,
    learnerId: input.command.learnerId,
    decision: input.decision,
    transition: input.transition,
    events: input.events,
    derivedInterpretations: input.derivedInterpretations,
    diagnostics: input.diagnostics,
  });
  return Object.freeze({
    decision: input.decision,
    response: learningInteractionResponse(input.decision),
    transition: input.transition,
    events: input.events,
    derivedInterpretations: input.derivedInterpretations,
    diagnostics: input.diagnostics,
    idempotency: Object.freeze({ disposition: "new" as const, outcome }),
  });
}

function applyDeliveryConstraint(
  policy: DecisionPolicyResult,
  delivery: DeliveryFilteringResult,
): DecisionPolicyResult {
  if (!delivery.noCompatibleExperience) {
    return policy;
  }
  return Object.freeze({
    permitted: false,
    evaluations: readonlyList([
      ...policy.evaluations,
      policyEvaluation({
        policyId: "policy.delivery-capability",
        policyVersion: "policy.v1",
        outcome: "constrained",
        rationale: "No pedagogically relevant LearningExperience can be delivered with the declared capability context.",
      }),
    ]),
    candidates: readonlyList(policy.candidates.map((candidate) => Object.freeze({
      ...candidate,
      permitted: false,
    }))),
  });
}

function priorOutcomeFor(
  command: InteractionCommand,
  outcomes: readonly InteractionOutcomeRecord[],
): InteractionOutcomeRecord | undefined {
  return outcomes.find((outcome) =>
    outcome.commandReference === command.commandReference && outcome.learnerId === command.learnerId,
  );
}

/**
 * Executes the deterministic, headless learning lifecycle. It assembles
 * context, evaluates accumulated evidence, generates candidates, applies
 * policy, constructs a decision, and plans—not persists—state/event effects.
 * It calls no AI, provider, API, database, or UI layer.
 */
export function executeDeterministicLearningInteraction(
  input: EngineExecutionInput,
): EngineExecutionResult {
  const prior = priorOutcomeFor(input.command, input.priorOutcomes ?? []);
  if (prior !== undefined) {
    return replayedResult(prior);
  }

  const assembly = assembleLearningContext(input);
  if (assembly.kind === "incomplete") {
    const decision = constructSafeNonMaterialDecision({
      decisionId: `decision.${input.command.id}`,
      commandId: input.command.id,
      learnerId: input.command.learnerId,
      actor: input.actor,
      deliveryCapabilities: input.deliveryCapabilities.capabilities,
      issues: assembly.issues,
    });
    const transition: StateTransitionResult = Object.freeze({
      kind: "not-committed",
      reason: "Context is incomplete or prohibited; a safe non-material outcome cannot mutate learner state.",
      nextState: input.learnerRecord.state,
    });
    const diagnostics: EngineDiagnostics = Object.freeze({
      contextAssembly: assembly,
      consideredEvidenceIds: readonlyList([]),
      consideredKnowledgeIds: readonlyList([]),
      policyEvaluations: decision.policyEvaluations,
      reasoningInvolved: false,
      plannedEventKinds: readonlyList([]),
    });
    return newResult({
      command: input.command,
      decision,
      transition,
      events: readonlyList([]),
      derivedInterpretations: readonlyList([]),
      diagnostics,
    });
  }

  const evidenceEvaluation = evaluateAccumulatedEvidence(assembly.context);
  const deliveryCompatibility = evaluateContextDeliveryCompatibility(assembly.context);
  const candidates = generateCandidateLearningOpportunities(assembly.context, evidenceEvaluation, deliveryCompatibility);
  const policy = applyDeliveryConstraint(
    evaluateDecisionPolicy(assembly.context, candidates),
    deliveryCompatibility,
  );
  const decision = constructMaterialDecision(assembly.context, policy, evidenceEvaluation, deliveryCompatibility);
  const transition = validateAndPlanStateTransition({
    command: assembly.context.command,
    decision,
    currentState: assembly.context.learnerRecord.state,
    activeOffers: assembly.context.activeOffers,
    derivedInterpretationIds: evidenceEvaluation.newInterpretations.map((interpretation) => interpretation.id),
    committedAt: input.evaluatedAt,
  });
  const events = transition.kind === "committed" ? transition.events : readonlyList([]);
  const diagnostics: EngineDiagnostics = Object.freeze({
    contextAssembly: assembly,
    consideredEvidenceIds: readonlyList(assembly.context.observedEvidence.map((item) => item.id)),
    consideredKnowledgeIds: readonlyList([
      assembly.context.knowledge.concept.id,
      ...assembly.context.knowledge.prerequisiteRelationships.map((item) => item.id),
      ...assembly.context.knowledge.outgoingConceptBridges.map((item) => item.id),
      ...assembly.context.knowledge.experiences.map((item) => item.id),
    ]),
    policyEvaluations: policy.evaluations,
    reasoningInvolved: false,
    plannedEventKinds: readonlyList(events.map((event) => event.kind)),
    deliveryCompatibility,
    evidenceEvaluation,
  });
  return newResult({
    command: input.command,
    decision,
    transition,
    events,
    derivedInterpretations: evidenceEvaluation.newInterpretations,
    diagnostics,
  });
}
