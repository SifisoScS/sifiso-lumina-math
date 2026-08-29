export class DomainValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "DomainValidationError";
  }
}

type Brand<Value, Name extends string> = Value & { readonly __brand: Name };

export type StableId = Brand<string, "StableId">;
export type VersionRef = Brand<string, "VersionRef">;
export type IsoTimestamp = Brand<string, "IsoTimestamp">;
export type CommandReference = Brand<string, "CommandReference">;
export type LearnerReference = Brand<string, "LearnerReference">;
export type PolicyVersionRef = Brand<string, "PolicyVersionRef">;
export type PedagogicalRuleRef = Brand<string, "PedagogicalRuleRef">;

const STABLE_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;

function assertNonBlank(value: string, label: string): string {
  const normalized = value.trim();
  if (normalized.length === 0) {
    throw new DomainValidationError(`${label} must not be blank.`);
  }
  return normalized;
}

function validatedIdentifier(value: string, label: string): string {
  const normalized = assertNonBlank(value, label);
  if (!STABLE_ID_PATTERN.test(normalized)) {
    throw new DomainValidationError(
      `${label} must use lower-case stable identifier syntax (letters, digits, '.', '_' or '-').`,
    );
  }
  return normalized;
}

export function stableId(value: string, label = "Stable identifier"): StableId {
  return validatedIdentifier(value, label) as StableId;
}

export function versionRef(value: string): VersionRef {
  return validatedIdentifier(value, "Version reference") as VersionRef;
}

export function policyVersionRef(value: string): PolicyVersionRef {
  return validatedIdentifier(value, "Policy version reference") as PolicyVersionRef;
}

export function pedagogicalRuleRef(value: string): PedagogicalRuleRef {
  return validatedIdentifier(value, "Pedagogical rule reference") as PedagogicalRuleRef;
}

export function commandReference(value: string): CommandReference {
  return validatedIdentifier(value, "Command reference") as CommandReference;
}

export function learnerReference(value: string): LearnerReference {
  return validatedIdentifier(value, "Learner reference") as LearnerReference;
}

export function requiredText(value: string, label: string): string {
  return assertNonBlank(value, label);
}

export function isoTimestamp(value: string): IsoTimestamp {
  assertNonBlank(value, "Timestamp");
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    throw new DomainValidationError("Timestamp must be an ISO-8601 compatible date-time.");
  }
  return value as IsoTimestamp;
}

export type UncertaintyLevel = "low" | "medium" | "high" | "unknown";

export interface UncertaintyStatement {
  readonly level: UncertaintyLevel;
  readonly rationale: string;
}

const UNCERTAINTY_ORDER: Readonly<Record<UncertaintyLevel, number>> = Object.freeze({
  low: 0,
  medium: 1,
  high: 2,
  unknown: 3,
});

/**
 * How uncertain a statement is, on a total order from `low` (least uncertain)
 * to `unknown` (most). Comparable so that a claim can be checked against the
 * basis it rests on: under A6, uncertainty survives and is never converted into
 * confidence along the way.
 */
export function uncertaintyRank(statement: UncertaintyStatement): number {
  return UNCERTAINTY_ORDER[statement.level];
}

/** True when `claim` asserts more confidence than `basis` supports. */
export function claimsMoreConfidenceThan(
  claim: UncertaintyStatement,
  basis: UncertaintyStatement,
): boolean {
  return uncertaintyRank(claim) < uncertaintyRank(basis);
}

export function uncertainty(level: UncertaintyLevel, rationale: string): UncertaintyStatement {
  return Object.freeze({ level, rationale: requiredText(rationale, "Uncertainty rationale") });
}

export interface VersionedReference {
  readonly id: StableId;
  readonly version: VersionRef;
}

export function versionedReference(id: string, version: string): VersionedReference {
  return Object.freeze({ id: stableId(id), version: versionRef(version) });
}

export function readonlyList<T>(items: readonly T[]): readonly T[] {
  return Object.freeze([...items]);
}

export function uniqueStableIds<T extends string>(ids: readonly T[], label: string): readonly T[] {
  const unique = new Set(ids);
  if (unique.size !== ids.length) {
    throw new DomainValidationError(`${label} must not contain duplicate stable identifiers.`);
  }
  return readonlyList(ids);
}
