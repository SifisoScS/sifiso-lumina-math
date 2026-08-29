# D26 — Assessment Semantic Interpretation & Misconception Authority

> **D26 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D25 are preserved exactly as approved and locked. D26 authorises no code, contract, repository, schema, assessment, scoring, diagnosis, AI, persistence, UI/API, learner-state, D27, or Slice 6 work.

## 1. Purpose

D26 defines the authority boundary governing **learner-specific semantic interpretation of qualified assessment evidence**. It establishes when an interpretation may be proposed, reviewed, recorded, corrected, superseded, revoked, marked stale, or treated as usable for a stated purpose.

D26 closes the distinction between:

> **qualified evidence → interpretation → learner-specific semantic assessment claim → authoritative conclusion/state commitment**

without collapsing any layer. It preserves the constitutional principles that evidence is not interpretation; interpretation is not learner state; a misconception hypothesis is not established mathematical or learner truth merely because it is plausible; and assessment interpretation cannot manufacture learner consent, learner choice, mastery, readiness, progression, or state authority.

## 2. Scope

D26 governs interpretation claims derived from qualified, purpose-sufficient evidence under D21, including semantic assessment interpretations, learner-specific interpretations, misconception hypotheses, uncertainty, competing interpretations, review, approval, lifecycle, conflict, provenance, and permitted bounded use.

| Within D26 | Outside D26 |
|---|---|
| Whether an interpretation is bounded, evidence-grounded, purpose-specific, provenance-linked, and eligible for governed review/use | Assessment scoring, rubrics, grading, formal diagnosis, mastery, readiness, progression, certification, or mathematical truth |
| Whether a misconception claim may exist as a non-truth-claim hypothesis or reviewed interpretation | Automatic learner-state determination, D22 authority, learner choice/consent, curriculum/content/policy authority, or experience continuity |
| Proposal, review, approval/rejection, effectiveness, use, correction, supersession, revocation, staleness, and historical protection | AI runtime/provider implementation, persistence, storage, authentication, access control, UI/API, legal/clinical/psychological diagnosis |
| Human semantic authority and fail-closed treatment | Any authority inferred from a data structure, label, technical access, institution, credential, behaviour, or AI confidence |

D26 does not redefine D17. It specifies the assessment-semantic subset of derived interpretation while preserving D17’s general interpretation governance.

## 3. Semantic Assessment Interpretation Authority Model

A **semantic assessment interpretation** is a provenance-linked, purpose-specific derived claim about the possible meaning, pattern, relationship, strategy, conceptual association, or limitation reflected by one or more qualified assessment observations. It must identify its evidence basis, scope, uncertainty, limitations, intended use, applicable policy, and authority status.

A **learner-specific interpretation** is a semantic assessment interpretation that expressly concerns a named learner within a bounded context. It must not be presented as a universal property of the learner, a stable internal mental state, or a fact beyond the observations and authorised claim scope.

An **interpretation authority** is an explicitly recognised authority permitted to propose, review, approve, reject, revoke, supersede, or mark stale a named interpretation category for a stated purpose and scope. D26 creates no default authority. D15 governs recognition/delegation; D16 governs action lifecycle; D19–D20 govern data handling; D21 governs evidence qualification; D22 governs authoritative learner conclusions and state commitments.

| Layer | Permitted meaning | Prohibited collapse |
|---|---|---|
| **Observation** | A source-asserted record of what was observed/received/recorded. | Not an interpretation or internal-state fact. |
| **Qualified evidence** | An observation admissible for a stated purpose under D21. | Not semantic meaning, misconception, or learner state. |
| **Evidence sufficiency** | Qualified evidence meets purpose-specific conditions for bounded consideration. | Not interpretation authority or truth. |
| **General derived interpretation** | A provenance-linked, reviewable claim derived from qualified evidence. | Not automatically learner-specific or authoritative. |
| **Semantic assessment interpretation** | A bounded assessment-related derived claim about possible meaning/pattern. | Not scoring, diagnosis, mathematical truth, or state. |
| **Learner-specific interpretation** | A bounded interpretation concerning a named learner/context. | Not an internal mental-state fact or universal learner attribute. |
| **Misconception hypothesis** | A tentative, explicitly uncertain interpretation that a pattern may reflect a conceptual misunderstanding. | Not established misconception, diagnosis, learner state, or truth. |
| **Reviewed interpretation** | An interpretation that completed required review. | Review is not approval, truth, state, or automatic conclusion. |
| **Authoritative conclusion/state commitment** | A separate D22-governed outcome, if independently authorised. | Never created automatically by D26. |

## 4. Permitted Interpretation Categories and Scope

D26 permits only bounded interpretation categories whose meaning and use are explicit. Examples include: possible strategy/pattern interpretation; possible concept-association interpretation; possible representation/notation interpretation; possible error-pattern interpretation; possible evidence limitation; possible alternative explanation; and a misconception hypothesis. These labels describe categories of claims for review; they do not grant authority or establish any learner fact.

An interpretation must state the learner/context scope, mathematical/content reference where applicable, evidence references, purpose, applicable policy, uncertainty, alternative explanations, temporal range, author/reviewer, status, and permitted use. It must not assert more certainty, permanence, generality, causation, or internal mental state than the evidence and authority support.

A single observed error may support an interpretation proposal about the error itself or a possible pattern for review; it does not establish a misconception. Behaviour alone cannot establish an internal learner state. Repeated observations may provide a basis for a later review but do not automatically establish a semantic claim.

## 5. Misconception Authority Model

A **misconception hypothesis** may exist only as an explicitly tentative, uncertain, reviewable interpretation. It must be framed as a possible explanation, identify supporting and contradicting evidence, state alternative explanations, and name a bounded purpose. It must not be represented as established misconception, diagnosis, internal mental state, mathematical error disposition, or universal learner characteristic.

D26 does not itself authorise any actor to establish a misconception as an authoritative learner fact. A source, educator, institution, assessment system, AI provider, validator, deterministic engine, or reviewer may propose or review a hypothesis only where separately recognised authority covers that action. Approval of a hypothesis as a **reviewed interpretation** does not make it a truth claim, state, conclusion, diagnosis, mastery/readiness/progression assertion, or learner preference.

Any future authority to make an authoritative misconception claim would require a separate governance decision defining the claim class, evidence conditions, semantic authority, review standard, effective use, conflict rules, lifecycle, and relationship to D22. D26 deliberately does not create that authority.

| Misconception status | Meaning |
|---|---|
| **Proposed hypothesis** | A tentative interpretation submitted for review. No established learner claim or state effect. |
| **Reviewed hypothesis** | Required review occurred and the hypothesis remains explicitly uncertain and bounded. Review is not truth. |
| **Approved for bounded use** | A recognised authority approved use as a hypothesis/interpretation for the named purpose only. No diagnosis or state effect. |
| **Effective** | The bounded interpretation may be considered within its current scope and period. |
| **Stale/revoked/superseded** | Future reliance is constrained or withdrawn prospectively. Historical hypothesis/review facts remain. |
| **Rejected/unresolved** | The claim is not approved for the proposed use; unresolved alternatives remain distinct. |

## 6. Evidence-to-Interpretation Boundary

D26 begins only after observations have been appropriately qualified and evidence has met the relevant D21 purpose-specific sufficiency conditions. Source recognition does not establish interpretation authority. Data permission does not establish semantic admissibility. Evidence sufficiency does not establish a misconception or any other interpretation.

An interpretation proposal must preserve the original observation, qualified-evidence record, sufficiency determination, provenance, uncertainty, scope, and purpose. It must reference the exact evidence set and must not silently add, repair, discard, merge, or reinterpret evidence. Evidence sufficient for one interpretation or purpose is not automatically sufficient for another.

| Evidence condition | D26 consequence |
|---|---|
| Qualified and sufficient for the stated interpretation purpose | May support a bounded interpretation proposal/review, subject to authority and provenance. |
| Qualified but insufficient for the interpretation purpose | May remain evidence; no consequential interpretation may be established. |
| Sufficient for a different purpose | Cannot be silently reused for this interpretation. |
| Conflicting, incomplete, ambiguous, stale, revoked, or restricted | Preserve uncertainty/conflict; do not force a semantic conclusion. |
| Privacy/data permission present but educational qualification absent | No interpretation use. |

## 7. Uncertainty and Competing Interpretation Model

Uncertainty is a first-class part of an interpretation. The record must distinguish what is observed, what is inferred, what is unknown, which alternatives remain plausible, what evidence would change the interpretation, and what use is prohibited. A confidence value is descriptive at most; it is not authority, truth, or a substitute for review.

Competing interpretations must be preserved as separate claims with separate evidence, provenance, reviewers, status, and limitations. The engine must not select one merely because it needs a deterministic output. A deterministic safe result may be “interpretation unresolved,” “no supported interpretation,” or another non-consequential constrained outcome permitted by policy.

Incomplete or ambiguous evidence must not be treated as negative evidence unless an applicable authority explicitly establishes that narrow meaning. Unsupported hypotheses may be recorded as proposals when authorised, but cannot be used consequentially. Absence of an interpretation does not imply absence of learning, a misconception, failure, non-cooperation, or learner preference.

## 8. Human Review and Authority Model

The actions below remain distinct under D15–D16.

| Action | Required condition |
|---|---|
| **Propose** | A permitted actor or separately bounded AI assistance may submit a clearly labelled interpretation proposal with evidence/provenance. Proposal creates no authority. |
| **Review** | A recognised reviewer assesses evidence, scope, uncertainty, alternatives, purpose, and policy. Review does not establish truth. |
| **Approve for bounded use** | A recognised authority approves the exact interpretation category/purpose/scope under applicable effective policy. This is not learner-state authority. |
| **Reject** | A recognised authority declines the proposed interpretation/use. Rejection preserves the proposal/history. |
| **Revoke** | A recognised authority withdraws future reliance within explicit scope. It does not rewrite history. |
| **Supersede** | A later recognised action replaces future use within explicit scope. Earlier interpretation remains historical. |
| **Mark stale** | A recognised action records that current context/evidence/authority no longer supports present reliance without review. |
| **Record** | An authorised recorder preserves each claim/action/status with provenance. Recording is not approval/effectiveness. |
| **Use** | A separate permitted process considers the bounded interpretation without treating it as state or truth. |

Institutional position, credentials, technical access, storage access, prior behaviour, historical participation, provider status, or AI confidence cannot independently create semantic assessment authority. The same person may perform multiple roles only when each role and action is separately recognised and remains within scope.

## 9. Interpretation Lifecycle

The lifecycle is:

> **proposal → review → approval/rejection → effectiveness → use → correction → supersession/revocation → staleness → historical retention**

A reviewed interpretation is not automatically effective. An approved interpretation is effective only within its explicit purpose, scope, period, authority, evidence, policy, and conflict conditions. Use is a separate bounded reliance event; it cannot expand the interpretation or turn it into learner state.

Corrections, revocations, supersessions, and stale markings are prospective and additive. They may prevent future reliance or require a future review of a prospective use, but they do not rewrite the original observation, evidence, provenance, learner choice, decision, commitment, event, interpretation record, or historical state.

## 10. AI Boundary

D14 remains fully controlling. AI may provide a bounded proposal, extraction, organisation, comparison suggestion, or review prompt only where an independently authorised D14 task and data scope permit it. AI output remains a proposal and cannot establish a misconception, learner-specific semantic truth, assessment authority, learner state, mathematical truth, or authoritative conclusion.

AI cannot approve its own interpretation, and AI confidence cannot substitute for human semantic authority. A provider’s reputation, model capability, structural validation, operational acceptance, or plausible wording does not alter this boundary. AI output must remain visibly distinct from original observation, qualified evidence, human review, approved bounded interpretation, and D22 authority.

If a future AI task would expose learner evidence or interpretation data beyond D14/D19/D20 scope, or would require AI to make a semantic authority determination, that task requires separate governance and is deferred.

## 11. Relationship to D8, D17, D21, and D22

D26 is subordinate to all prior decisions and does not silently redefine them.

| Decision | D26 dependency and constraint |
|---|---|
| **D8 — Assessment & Evidence** | Assessment observations/evidence remain distinct from automatic learner-state determination. D26 creates no scoring, rubric, grading, or diagnostic engine. |
| **D17 — Interpretation & Learner-Record Review** | D17 remains the general interpretation governance. D26 is its assessment-semantic subset and adds no contradiction; interpretation remains derived, provenance-linked, reviewable, and non-authoritative by default. |
| **D21 — Source Recognition & Evidence Sufficiency** | D26 begins after source recognition, observation qualification, and purpose-specific evidence sufficiency. Those conditions do not create interpretation authority. |
| **D22 — Learner Conclusion & State Commitment** | Semantic interpretation and misconception hypotheses do not automatically create learner conclusions, authoritative state, mastery, readiness, progression, certification, or commitments. Any such outcome requires D22. |
| **D1 — Learner Choice** | Interpretation cannot create consent, choice, offer selection, or path/focus commitment. |
| **D2 — Learning-State Authority** | Interpretation is not learner state; observed evidence, derived interpretation, and authoritative state remain separate. |
| **D3–D6 — Curriculum, Level, Content, Relationships** | Educational structure, level, content, and knowledge relationships do not create semantic interpretation authority or mathematical truth. |
| **D7/D23 — Experience Lifecycle and Continuity** | Interpretation cannot automatically redirect, substitute, interrupt, resume, migrate, or alter an active experience. |
| **D9–D11 — Decisioning and Policy** | Decisioning may use an interpretation only when applicable effective policy permits it; policy cannot manufacture semantic authority. |
| **D12–D13 — History and Version/Migration** | History is preserved; version or migration claims do not rewrite interpretations or create meaning. |
| **D14 — AI Proposal & Assistance** | AI is proposal-only and cannot become semantic or misconception authority. |
| **D15–D16 — Delegation and Governance Action** | Authority and action are explicit, scoped, reviewable, effective, and recorded; no actor is authorised by D26 alone. |
| **D18 — Conflict Resolution** | Conflicting interpretations/authorities create no precedence; unresolved consequential conflict fails closed. |
| **D19–D20 — Data and Rights Authority** | Data permission/representation is separate from semantic assessment authority and educational admissibility. |
| **D24 — Learner Representation & Delegated Choice** | Representative action does not create interpretation authority or learner-state authority. |
| **D25 — Policy Equivalence & Compatibility** | Policy relationships do not create interpretation authority; D26 uses only applicable effective policy under D25/D11 constraints. |

## 12. Conflict and Escalation Rules

Conflicts may concern evidence, interpretations, reviewers, authorities, policies, versions, purposes, or learner-record context. Conflict identification is not resolution. No precedence may be inferred from recency, majority behaviour, AI confidence, technical convenience, storage order, institutional possession, source popularity, confidence score, or prior use.

Where interpretations compete, the system must preserve each interpretation and its evidence/provenance. Where evidence supports competing interpretations, it must not force one. Where reviewers disagree, the disagreement remains a governed conflict. Where newer evidence challenges an existing interpretation, the existing interpretation remains historical while a new review may be proposed prospectively. Where authority or provenance is disputed or incomplete, no consequential interpretation use may proceed.

A recognised authority may propose a resolution only within D15–D16 scope and applicable policy. Resolution cannot manufacture semantic authority, mathematical truth, learner-state authority, or a policy/choice exception. Consequential unresolved conflict is governed by D18 and fails closed.

## 13. Historical Protection

D26 must never rewrite, delete, conceal, merge, or silently reinterpret the original observation, evidence, provenance, learner choice, decision, commitment, event, historical interpretation, or historical learner state. A later correction, revocation, supersession, stale marking, alternative interpretation, or authority change is a new attributable, provenance-linked, prospective fact.

A historical interpretation may remain a record even after it is rejected, revoked, superseded, or stale. Its future use may be prohibited or constrained within explicit scope. A later interpretation cannot retroactively become the original observation or change what was historically submitted, reviewed, used, concluded, committed, or effective.

## 14. Fail-Closed Specification

D26 must fail closed when required evidence is absent or insufficient; provenance is incomplete; interpretation authority is unresolved; scope/purpose is exceeded; required review has not occurred; the authority is expired, revoked, suspended, or stale; competing interpretations cannot be resolved; the claim would assert unsupported certainty; or the proposed use would require unauthorised learner-state/conclusion authority.

| Condition | Safe constrained outcome |
|---|---|
| Required qualified/sufficient evidence is absent or invalid for the purpose | No consequential interpretation. Preserve the available record. |
| Provenance, subject/context, scope, policy, purpose, or authority is incomplete | Do not repair by inference; no approval/effectiveness/use. |
| Observations/evidence support competing interpretations | Preserve alternatives; no forced single interpretation. |
| Interpretation authority or reviewer authority is disputed | No consequential semantic use; record/escalate only when authorised. |
| Interpretation exceeds purpose/scope or evidence certainty | Narrow/use none; do not broaden the claim. |
| Authority/review/policy is expired, revoked, suspended, or stale | No new reliance until separately reviewed/effective. |
| Proposed use would create learner conclusion/state/choice/consent | Stop; D22/D1 or other applicable authority is required. |
| Conflict remains consequential and unresolved | Apply D18; no interpretation-driven action or state effect. |

Fail-closed behaviour must not invent a misconception, learner state, diagnostic conclusion, mastery, readiness, progression, failure, preference, consent, or learner choice.

## 15. Prohibited Behaviours

15.1. Diagnosing a misconception from a single error, a pattern of behaviour, a score, a completion event, or any other observation without separately governed authority and required evidence.

15.2. Treating an error as proof of misconception or inferring an internal learner state from behaviour alone.

15.3. Treating source recognition, data permission, structural validation, evidence sufficiency, reviewer status, institutional position, credentials, technical access, storage access, prior participation, or AI confidence as semantic assessment authority.

15.4. Automatically assigning diagnostic, misconception, mastery, readiness, progression, certification, grading, or learner-state labels.

15.5. Treating an interpretation, reviewed interpretation, misconception hypothesis, confidence score, or semantic assessment claim as mathematical truth, established learner fact, learner conclusion, state commitment, learner consent, or learner choice.

15.6. Allowing AI-generated diagnosis, classification, interpretation, confidence, or recommendation to become authoritative without the distinct human/governed stages required by D14, D17, D21, and D22.

15.7. Using deterministic calculations, validators, policy results, graph relationships, metadata, provider trust, or technical representation as semantic authority.

15.8. Silently substituting an interpretation, silently reinterpreting historical evidence, silently merging competing interpretations, or silently expanding an interpretation’s purpose, scope, certainty, period, or consequence.

15.9. Using interpretation to bypass learner choice/consent, alter learner state, create a commitment, redirect/resume/migrate an active experience, or bypass D1–D25.

15.10. Rewriting historical observations, evidence, provenance, interpretations, choices, decisions, commitments, events, or historical state after correction, revocation, supersession, or newer evidence.

15.11. Resolving conflict through recency, majority behaviour, AI confidence, technical convenience, storage order, institutional possession, or operational urgency.

15.12. Implementing assessment scoring, rubrics, diagnosis, AI runtime, persistence, UI/API, learner-state mutation, or any other functionality from D26.

## 16. Explicit Deferrals

D26 deliberately defers the following matters:

| Deferred matter | Reason for deferral |
|---|---|
| Clinical/medical or psychological diagnosis | D26 is not a diagnostic or clinical authority. |
| Legal conclusions and legal/institutional status | D26 must not create legal authority by architectural assertion. |
| Formal educational certification, grading, mastery, readiness, progression, and ranking | D26 creates no substantive conclusion authority; these require separate decisions. |
| Assessment scoring, rubrics, calibration, measurement validity, and diagnostic methodology | D26 governs semantic interpretation boundaries, not assessment implementation. |
| General authoritative misconception authority | D26 permits only bounded hypotheses/reviewed interpretations and does not establish learner-truth authority. |
| Specific semantic interpretation authorities, reviewers, approvers, policies, thresholds, or institutions | D15–D16 govern recognition; D26 names no real authority by assertion. |
| AI provider/runtime, model, prompt, training, or automated interpretation implementation | D14 remains proposal-only and unresolved extensions require later governance. |
| Curriculum, content, policy, migration, experience, privacy, identity, access control, storage, UI/API, and delivery implementation | These remain governed by D1–D25 or are explicitly outside D26. |

A data structure, interpretation category, status label, confidence number, or implementation field must never create authority merely by existing.

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D26 at this stage.**

If D26 is approved and a later controlled implementation is authorised, future contracts must keep distinct representations for: original observation; qualified evidence; evidence sufficiency; general interpretation; semantic assessment interpretation; learner-specific interpretation; misconception hypothesis; reviewed/approved bounded use; authority and policy references; purpose/scope/time; uncertainty and alternatives; conflict; lifecycle; correction/revocation/supersession/staleness; provenance; and any separate D22 conclusion/state commitment.

Future contracts must not use an interpretation field as learner state, a misconception flag as established truth, a confidence field as authority, or a reviewed status as a state commitment. They must preserve additive/prospective history and fail closed when required evidence, authority, scope, provenance, policy, review, or conflict treatment is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, or repository changes.

## 18. Implementation Freeze

> **This is governance specification only. No implementation may begin until D26 is reviewed, approved, and locked.**
>
> D26 authorises no code, contract change, repository change, schema, assessment, scoring, rubric, diagnosis, AI, persistence, storage, UI/API, authentication, access control, learner-state mutation, migration, commit, D27, or Slice 6 work. Any future implementation requires explicit human approval of D26 and a later controlled implementation authorisation reconciling D1–D26.

## 19. Approval Recommendation

D26 is presented for human architectural review as the narrow semantic-assessment interpretation boundary. It permits bounded, uncertain, provenance-linked interpretation and misconception hypotheses without allowing plausible computation, behaviour, evidence, review, AI output, or institutional status to become learner truth or state authority. It preserves D8, D17, D21, D22, D23, and all other D1–D25 constraints.

> **D26 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, assessment, scoring, diagnosis, AI, persistence, UI/API, learner-state, D27, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
