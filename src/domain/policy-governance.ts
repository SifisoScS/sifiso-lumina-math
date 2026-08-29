import { LearnerReflection, StateCommitment } from "./learner-record.js";
import { PolicyEvaluation, PolicyOutcome } from "../contracts/core-contracts.js";
import { DomainValidationError, policyVersionRef, PolicyVersionRef, requiredText, StableId, stableId } from "./primitives.js";

export type PolicyScope =
  | "learner-autonomy"
  | "psychological-safety"
  | "non-evaluative-behaviour"
  | "reflection-ownership"
  | "state-mutation"
  | "ai-proposal-acceptance"
  | "evidence-preservation"
  | "permissions-consent"
  | "provenance";

export interface PolicyDefinition {
  readonly id: StableId;
  readonly scope: PolicyScope;
  readonly version: PolicyVersionRef;
  readonly statement: string;
}

export function policyDefinition(input: {
  readonly id: string;
  readonly scope: PolicyScope;
  readonly version: string;
  readonly statement: string;
}): PolicyDefinition {
  return Object.freeze({
    id: stableId(input.id, "Policy definition identifier"),
    scope: input.scope,
    version: policyVersionRef(input.version),
    statement: requiredText(input.statement, "Policy statement"),
  });
}

const prohibitedPhrases = [
  "correct",
  "incorrect",
  "wrong",
  "good job",
  "you should know this",
  "this is easy",
  "this is hard",
] as const;

export interface NonEvaluativeTextCheck {
  readonly outcome: PolicyOutcome;
  readonly prohibitedPhrasesFound: readonly string[];
}

/** Cyrillic and Greek letters that render identically to Latin ones. */
const HOMOGLYPHS: ReadonlyMap<string, string> = new Map([
  ["а", "a"], ["е", "e"], ["ё", "e"], ["о", "o"], ["р", "p"],
  ["с", "c"], ["у", "y"], ["х", "x"], ["һ", "h"], ["і", "i"],
  ["ј", "j"], ["ӏ", "l"], ["ѕ", "s"], ["ο", "o"], ["α", "a"],
  ["ε", "e"], ["ρ", "p"], ["υ", "u"], ["ν", "v"], ["κ", "k"],
]);

/**
 * Reduces text to a form in which the prohibited phrases cannot be hidden by
 * presentation. Hostile testing found the naive check trivially evadable: a
 * Cyrillic o, a zero-width space, or hyphens between letters all defeated it,
 * so the guard was decorative against anything that was actually trying.
 *
 * Decomposes to NFKD and drops combining marks, removes zero-width and
 * bidirectional controls, folds known homoglyphs to Latin, then discards every
 * non-alphanumeric character so separators carry no meaning.
 *
 * This is stricter than before and will refuse some innocent text — "correct"
 * inside "correction" already matched, and collapsing separators widens that.
 * Over-refusal is the fail-closed direction under A7 and is the right way to be
 * wrong here. It is a guard against evasion, not a general safety classifier.
 */
function foldForPhraseMatching(text: string): string {
  const COMBINING_MARKS = /[̀-ͯ]/gu;
  const INVISIBLE = /[​-‏‪-‮⁠-⁤﻿]/gu;

  const decomposed = text
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .replace(INVISIBLE, "")
    .toLowerCase();

  const folded: string[] = [];
  for (const character of decomposed) {
    folded.push(HOMOGLYPHS.get(character) ?? character);
  }
  return folded.join("").replace(/[^a-z0-9]+/gu, "");
}

/**
 * A deterministic guard, not a substitute for broader safety policy. It
 * enforces the explicitly prohibited phrases, matched against folded text so
 * that presentation cannot be used to smuggle them past.
 */
export function evaluateNonEvaluativeText(text: string): NonEvaluativeTextCheck {
  const folded = foldForPhraseMatching(requiredText(text, "Text for non-evaluative policy check"));
  const found = prohibitedPhrases.filter((phrase) => folded.includes(foldForPhraseMatching(phrase)));
  return Object.freeze({
    outcome: found.length === 0 ? "permitted" : "prohibited",
    prohibitedPhrasesFound: Object.freeze([...found]),
  });
}

/**
 * Original reflection text is learner-owned immutable evidence. A derived
 * insight may reference it but may never be represented as replacement text.
 */
export function assertReflectionPreserved(
  original: LearnerReflection,
  candidateOriginalText: string,
): void {
  if (original.originalText !== candidateOriginalText) {
    throw new DomainValidationError("Learner-owned reflection text cannot be silently overwritten.");
  }
}

/**
 * The StateCommitment authorization type intentionally permits only an
 * accepted explicit learner command, accepted learner evidence, or a learner
 * choice. This guard makes the boundary explicit at the domain-kernel level.
 */
export function assertCommitmentHasLearnerAuthorization(commitment: StateCommitment): void {
  if (commitment.authorization.kind !== "accepted-interaction-command" &&
      commitment.authorization.kind !== "accepted-evidence" &&
      commitment.authorization.kind !== "learner-choice") {
    throw new DomainValidationError("State commitment lacks permitted learner-originated authorization.");
  }
}

export interface PolicyExtensionPoint {
  readonly scope: string;
  readonly reason: string;
}

/**
 * Open policy matters are represented explicitly rather than being silently
 * converted into hard-coded implementation rules.
 */
export function policyExtensionPoint(scope: string, reason: string): PolicyExtensionPoint {
  return Object.freeze({
    scope: requiredText(scope, "Policy extension scope"),
    reason: requiredText(reason, "Policy extension reason"),
  });
}

export const openPolicyExtensionPoints: readonly PolicyExtensionPoint[] = Object.freeze([
  policyExtensionPoint(
    "prerequisite-access",
    "Whether any prerequisite may restrict access remains an open decision.",
  ),
  policyExtensionPoint(
    "readiness-and-mastery",
    "No readiness, mastery, or completion threshold has been approved.",
  ),
  policyExtensionPoint(
    "privacy-retention-deletion",
    "Operational consent, retention, deletion, safeguarding, and jurisdiction rules remain open.",
  ),
  policyExtensionPoint(
    "event-correction-and-audit",
    "Correction, retention, and audit treatment for rejected events or commands remain open.",
  ),
]);

/**
 * Convenience constructor for deterministic policy decisions in kernel tests.
 * It contains no provider, transport, storage, or presentation assumptions.
 */
export function kernelPolicyEvaluation(input: {
  readonly policy: PolicyDefinition;
  readonly outcome: PolicyOutcome;
  readonly rationale: string;
}): PolicyEvaluation {
  return Object.freeze({
    policyId: input.policy.id,
    policyVersion: input.policy.version,
    outcome: input.outcome,
    rationale: requiredText(input.rationale, "Policy evaluation rationale"),
  });
}
