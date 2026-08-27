import {
  ObservedPracticeOutcome,
  PracticeAttempt,
} from "../domain/learner-record.js";

/**
 * A replaceable boundary through which an external authority may supply an
 * observed practice outcome. The learning engine neither implements nor
 * assumes a mathematics evaluator, rubric, score, provider, or AI mechanism.
 */
export interface AssessmentBoundary {
  observePracticeOutcome(attempt: PracticeAttempt): Promise<ObservedPracticeOutcome | undefined>;
}
