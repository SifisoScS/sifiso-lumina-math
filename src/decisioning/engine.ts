import {
  InteractionCommand,
  LearningDecision,
  LearningInteractionResponse,
  learningInteractionResponse,
} from "../contracts/core-contracts.js";
import { HistoricalEvent, LearnerRecord } from "../domain/learner-record.js";
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
import { generateCandidateLearningOpportunities } from "./opportunities.js";
import { evaluateDecisionPolicy, DecisionPolicyResult } from "./policy-evaluation.js";
import { StateTransitionResult, validateAndPlanStateTransition } from "./state-transitions.js";

export interface EngineExecutionInput extends ContextAssemblyInput {
  /** A supplied time reference keeps the deterministic engine independent of a clock implementation. */
  readonly evaluatedAt: IsoTimestamp;
  /**
   * Previously recorded outcomes are supplied by a future persistence boundary.
   * Slice 2 performs no persistence; it only applies the approved Command
   * Reference idempotency rule when this context is provided.
   */
  readonly priorOutcomes?: readonly InteractionOutcomeRecord[];
}

export interface EngineDiagnostics {
  readonly contextAssembly: ContextAssemblyResult;
  readonly consideredEvidenceIds: readonly string[];
  readonly consideredKnowledgeIds: readonly string[];
  readonly policyEvaluations: DecisionPolicyResult["evaluations"];
  readonly reasoningInvolved: false;
  readonly plannedEventKinds: readonly string[];
}

export interface InteractionOutcomeRecord {
  readonly commandReference: InteractionCommand["commandReference"];
  readonly learnerId: InteractionCommand["learnerId"];
  readonly decision: LearningDecision;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
  readonly diagnostics: EngineDiagnostics;
}

export interface EngineExecutionResult {
  readonly decision: LearningDecision;
  readonly response: LearningInteractionResponse;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
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
    diagnostics: outcome.diagnostics,
    idempotency: Object.freeze({ disposition: "replayed" as const, outcome }),
  });
}

function newResult(input: {
  readonly command: InteractionCommand;
  readonly decision: LearningDecision;
  readonly transition: StateTransitionResult;
  readonly events: readonly HistoricalEvent[];
  readonly diagnostics: EngineDiagnostics;
}): EngineExecutionResult {
  const outcome: InteractionOutcomeRecord = Object.freeze({
    commandReference: input.command.commandReference,
    learnerId: input.command.learnerId,
    decision: input.decision,
    transition: input.transition,
    events: input.events,
    diagnostics: input.diagnostics,
  });
  return Object.freeze({
    decision: input.decision,
    response: learningInteractionResponse(input.decision),
    transition: input.transition,
    events: input.events,
    diagnostics: input.diagnostics,
    idempotency: Object.freeze({ disposition: "new" as const, outcome }),
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
 * Executes Slice 2's deterministic lifecycle coordinator. The stages remain
 * delegated to dedicated modules: context assembly, opportunity generation,
 * policy evaluation, decision construction, and transition planning. This
 * function returns a state-change plan only; it does not persist or mutate any
 * external record, call an AI provider, expose an API, or render a UI.
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
      diagnostics,
    });
  }

  const candidates = generateCandidateLearningOpportunities(assembly.context);
  const policy = evaluateDecisionPolicy(assembly.context, candidates);
  const decision = constructMaterialDecision(assembly.context, policy);
  const transition = validateAndPlanStateTransition({
    command: assembly.context.command,
    decision,
    currentState: assembly.context.learnerRecord.state,
    activeOffers: assembly.context.activeOffers,
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
  });
  return newResult({ command: input.command, decision, transition, events, diagnostics });
}
