import Anthropic from "@anthropic-ai/sdk";

import { Concept } from "../domain/mathematical-knowledge.js";
import { decisionProvenance, provenanceReference } from "../domain/provenance.js";
import {
  ReasoningPort,
  ReasoningProposal,
  ReasoningTask,
  reasoningProposal,
} from "../contracts/reasoning-port.js";
import { uncertainty, UncertaintyLevel } from "../domain/primitives.js";
import { conceptContentForTask, explanationPrompt } from "./reasoning-prompt.js";

/**
 * A real model behind `ReasoningPort` (foundation A5, Phase 5).
 *
 * What the model is permitted to influence is deliberately tiny. It supplies a
 * summary, an uncertainty statement, and a list of concept identifiers it drew
 * on. Everything else in the resulting proposal — its id, its task reference,
 * its kind, its evidence scope, its provenance — is constructed here from the
 * task and the local catalogue, so the model cannot forge any of it.
 *
 * `evidenceIds` is always empty. Explanation generation needs no learner-owned
 * material, so none is sent and none is claimed.
 *
 * A proposal returned from here is still only a proposal. It has crossed no
 * seam: `evaluateGovernance` decides whether it may be admitted, and the same
 * hostile suite that runs against the stub runs against this.
 */

const DEFAULT_MODEL = "claude-opus-5";

/** Shape the model must return. Structured outputs make it non-negotiable. */
const PROPOSAL_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string" },
    uncertaintyLevel: { type: "string", enum: ["low", "medium", "high", "unknown"] },
    uncertaintyRationale: { type: "string" },
    citedConceptIds: { type: "array", items: { type: "string" } },
  },
  required: ["summary", "uncertaintyLevel", "uncertaintyRationale", "citedConceptIds"],
  additionalProperties: false,
} as const;

interface ModelProposal {
  readonly summary: string;
  readonly uncertaintyLevel: UncertaintyLevel;
  readonly uncertaintyRationale: string;
  readonly citedConceptIds: readonly string[];
}

/**
 * True only when the operator has explicitly turned reasoning on and a
 * credential is present. Absence is not an error — it is the default, and the
 * engine runs deterministically without a provider.
 */
export function reasoningProviderEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return env["LUMINA_REASONING_ENABLED"] === "1" && (env["ANTHROPIC_API_KEY"] ?? "").length > 0;
}

export interface AnthropicReasoningPortOptions {
  /** Concepts the adapter may draw on. Nothing outside a task's conceptIds is used. */
  readonly catalogue: readonly Concept[];
  /** Character bound the policy envelope will enforce; told to the model to reduce refusals. */
  readonly maxSummaryCharacters: number;
  readonly model?: string;
  /**
   * Workspace the request acts in. Required for identity-linked API keys, which
   * the API rejects with a 400 unless the header is present; ignored by keys
   * that do not need it. Defaults to ANTHROPIC_WORKSPACE_ID.
   */
  readonly workspaceId?: string;
  readonly client?: Anthropic;
}

function parseModelProposal(raw: string): ModelProposal | undefined {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return undefined;
    const candidate = parsed as Record<string, unknown>;
    const level = candidate["uncertaintyLevel"];
    if (
      typeof candidate["summary"] !== "string" ||
      typeof candidate["uncertaintyRationale"] !== "string" ||
      !Array.isArray(candidate["citedConceptIds"]) ||
      (level !== "low" && level !== "medium" && level !== "high" && level !== "unknown")
    ) {
      return undefined;
    }
    return {
      summary: candidate["summary"],
      uncertaintyLevel: level,
      uncertaintyRationale: candidate["uncertaintyRationale"],
      citedConceptIds: candidate["citedConceptIds"].filter(
        (id): id is string => typeof id === "string",
      ),
    };
  } catch {
    return undefined;
  }
}

export function anthropicReasoningPort(options: AnthropicReasoningPortOptions): ReasoningPort {
  // The SDK resolves the credential from the environment; the key is never
  // read, logged, or held by this module. The workspace header is added only
  // when one is configured - the SDK sends it for profile-based credentials but
  // not for a bare API key, and identity-linked keys are refused without it.
  const workspaceId = options.workspaceId ?? process.env["ANTHROPIC_WORKSPACE_ID"];
  const client =
    options.client ??
    new Anthropic(
      workspaceId === undefined || workspaceId.length === 0
        ? {}
        : { defaultHeaders: { "anthropic-workspace-id": workspaceId } },
    );
  const model = options.model ?? DEFAULT_MODEL;

  return {
    async propose(task: ReasoningTask): Promise<ReasoningProposal | undefined> {
      if (task.kind !== "explanation-generation") {
        // Only one task kind is admitted so far. Refusing here is redundant with
        // the policy envelope and deliberately so: the provider is never asked
        // for material the envelope would reject.
        return undefined;
      }

      const concepts = conceptContentForTask(task, options.catalogue);
      if (concepts.length === 0) return undefined;

      const prompt = explanationPrompt({
        task,
        concepts,
        maxSummaryCharacters: options.maxSummaryCharacters,
      });

      const response = await client.messages.create({
        model,
        max_tokens: 16000,
        system: prompt.system,
        messages: [{ role: "user", content: prompt.user }],
        output_config: {
          format: { type: "json_schema", schema: PROPOSAL_SCHEMA },
          effort: "low",
        },
      });

      // A7: a declined request is a fail-closed outcome, not an exception. Check
      // before reading content — on a refusal there may be none.
      if (response.stop_reason === "refusal") return undefined;

      const text = response.content.find(
        (block): block is Anthropic.TextBlock => block.type === "text",
      );
      if (text === undefined) return undefined;

      const proposed = parseModelProposal(text.text);
      if (proposed === undefined) return undefined;

      // The model names concepts; it does not get to widen its own basis. Only
      // identifiers that were actually supplied to it survive.
      const supplied = new Set<string>(concepts.map((concept) => concept.conceptId));
      const citedIds = [...new Set(proposed.citedConceptIds.filter((id) => supplied.has(id)))];
      const basisIds = citedIds.length > 0 ? citedIds : concepts.map((concept) => concept.conceptId);

      return reasoningProposal({
        id: `proposal.${task.id}`,
        taskId: task.id,
        kind: "explanation-generation",
        summary: proposed.summary,
        // No learner-owned material was sent, so none is claimed.
        evidenceIds: [],
        uncertainty: uncertainty(proposed.uncertaintyLevel, proposed.uncertaintyRationale),
        provenance: decisionProvenance({
          id: `provenance.${task.id}`,
          references: basisIds.map((id) => provenanceReference("knowledge", id)),
          uncertainty: uncertainty(proposed.uncertaintyLevel, proposed.uncertaintyRationale),
          rationale: `Explanation generated by ${model} from the concepts named by ${task.id}.`,
        }),
      });
    },
  };
}
