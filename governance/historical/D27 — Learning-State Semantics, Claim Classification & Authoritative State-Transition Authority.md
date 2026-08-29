# D27 — Learning-State Semantics, Claim Classification & Authoritative State-Transition Authority

> **D27 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D26 are preserved exactly as approved and locked. D27 authorises no code, contract, repository, schema, migration, persistence, assessment, AI, UI/API, D28, or Slice 6 work.

## 1. Post-D26 Dependency Analysis

D26 now governs learner-specific semantic assessment interpretation and misconception hypotheses. D21 governs qualified evidence and purpose-specific evidence sufficiency. D22 governs authoritative learner conclusions and state commitments. Together they deliberately stop short of defining the meaning and authority of the state itself.

The highest-priority unresolved boundary is therefore the authority governing **learning-state semantics and authoritative state transition**: what an authoritative learner-state claim means, which state dimensions may exist, how a conclusion may relate to a state claim, which authority may approve it, and when a separately approved state commitment may become effective without turning computation, assessment, interpretation, experience lifecycle, or learner choice into state authority.

| Existing locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D2 — Learning-State Authority** | Evidence, interpretation, and authoritative state are distinct; no automatic mastery/readiness/misconception/state truth. | The semantics and authority model for any future authoritative state claim. |
| **D8 — Assessment & Evidence** | Assessment does not automatically establish learning conclusions. | How a qualified assessment interpretation may be considered without becoming state. |
| **D21 — Source/Evidence Authority** | Source recognition, qualification, and sufficiency remain purpose-specific. | How sufficient evidence relates to an authorised state claim. |
| **D22 — Conclusion/Commitment Authority** | Conclusions, authoritative conclusions, commitments, and effectiveness are distinct. | What “state” means and which state transitions are substantively permitted. |
| **D23 — Experience Continuity** | Lifecycle and current executability do not establish learning. | The state meaning of any prospective effect remains unresolved. |
| **D26 — Semantic Interpretation** | Interpretations and misconception hypotheses remain derived, uncertain, reviewable, and non-state. | The boundary from an authorised conclusion to a state representation/transition. |

This is the next priority because the existing Phase 2 engine already contains learner-state records, deltas, commitments, events, and replay concepts, while the locked governance architecture intentionally prevents those structures from becoming authority merely through implementation. Without D27, any future implementation risks treating a state field, transition function, event, commitment, completed experience, evidence set, interpretation, or deterministic policy result as authoritative learner state without an approved state ontology and transition authority.

Other unresolved matters—such as detailed assessment scoring, legal/privacy operations, client/session mechanics, policy runtime, and migration implementation—remain important but are downstream or separately bounded. D27 is the prerequisite for any safe implementation that may represent or change authoritative learner state.

## 2. Purpose

D27 defines the authority boundary for the semantics, classification, review, approval, effectiveness, and prospective transition of authoritative learner-state claims. It preserves the distinction between:

> **qualified evidence → evidence sufficiency → interpretation → learner conclusion → authoritative conclusion → state commitment → prospective state effectiveness**

D27 does not make any of those upstream layers authoritative by default. It determines what additional governance conditions are required before a state claim or state transition may be treated as authoritative.

## 3. Scope

D27 governs the semantic status of learner-state claims, state dimensions, state transitions, authority, evidence/conclusion grounding, policy conditions, lifecycle, conflict, historical protection, and the relationship between current state representation and prospective state effect.

| Within D27 | Outside D27 |
|---|---|
| Meaning and authority distinctions for authoritative learner-state claims and transitions | Mathematical truth, curriculum/content authority, assessment scoring/rubrics, clinical/psychological diagnosis, or legal conclusions |
| Conditions for a state commitment to become prospectively effective | Automatic mastery, readiness, progression, certification, grading, ranking, or misconception authority unless separately governed |
| State claim scope, purpose, temporal validity, uncertainty, review, revocation, staleness, and supersession | Database schemas, storage technology, persistence, event buses, UI/API, session mechanics, authentication, or client implementation |
| State transition conflict and fail-closed treatment | AI runtime, policy runtime, migration, identity proofing, privacy implementation, or learner-choice delegation |

D27 does not itself define the substantive educational meaning of a particular state label. It does not make “mastery,” “readiness,” “progression,” “misconception,” “competence,” “engagement,” or any other label authoritative simply by naming it.

## 4. Authority Model

A **learner-state claim** is a bounded assertion about a learner’s state for a named dimension, purpose, context, scope, and period. It may be observed, derived, proposed, reviewed, or authoritative, but those statuses must remain explicit.

An **authoritative learner-state claim** is a state claim approved by a separately recognised authority for an explicitly authorised state dimension and purpose, supported by the required qualified evidence/conclusion/policy conditions, and not blocked by unresolved conflict. D27 creates no default state authority, state dimension, actor, evidence threshold, or automatic transition.

A **state commitment** is the D22-governed prospective commitment to create, change, or end a defined authoritative state representation. It is distinct from the claim it references, the approval that authorises it, the recording of that approval, the moment it becomes effective, and the execution/representation of the prospective effect.

| Concept | Meaning | Non-collapse |
|---|---|---|
| **State observation** | A record that a source observed or reported a state-related fact. | Not state truth or authority. |
| **State interpretation** | A derived interpretation concerning possible state meaning. | Not an authoritative state claim. |
| **Learner-state claim** | A bounded assertion about a state dimension for a purpose/context/time. | Not automatically authoritative or effective. |
| **Authoritative state claim** | A separately approved claim within explicit authority and effective scope. | Not automatically a state mutation, learner consent, or choice. |
| **State commitment** | A D22-governed prospective commitment to create/change/end an authoritative state representation. | Not current state effectiveness or execution. |
| **Effective state** | The currently authoritative prospective state after an effective commitment is separately executed/represented. | Not historical truth rewritten by a current claim. |

Authority to make a state claim is not authority to execute a state transition. Authority to execute a state transition is not authority to define the state ontology or claim class. D15–D16 govern recognition and action; D22 governs conclusion/commitment lifecycle; D27 governs the state-specific subject matter.

## 5. Learning-State Semantics and Claim Classification

D27 requires that each state claim identify a state dimension, meaning, permissible values or statuses where governed, purpose, scope, context, temporal validity, uncertainty, evidence/conclusion basis, policy, authority, and permitted consequences. A state value must not be treated as a general description of the learner beyond its declared boundaries.

State representations may be:

| Classification | Meaning |
|---|---|
| **Historical state record** | A protected record of what was authoritative/effective under a historical context. |
| **Current-state representation** | A prospective representation of the state currently effective under explicit commitments and execution. |
| **Proposed state claim** | A non-authoritative state assertion under consideration. |
| **Derived state interpretation** | An explicitly derived, uncertain state-related interpretation. |
| **Authoritative state claim** | A separately approved bounded claim for an authorised state dimension/purpose. |
| **State commitment** | A separately authorised prospective change or assertion linked to an authorised basis. |
| **Unavailable/unresolved state** | A safe representation that required authority, context, evidence, or history cannot establish a consequential state. |

A state dimension may not be treated as authoritative unless its meaning, authority, scope, purpose, evidence conditions, lifecycle, review, conflict handling, and permitted consequences are explicitly governed. D27 does not authorise a universal scalar, score, rank, profile, capability vector, or binary flag as learner truth.

## 6. Evidence, Interpretation, Conclusion, and State Boundary

D21 and D26 are prerequisites but not state authority. A state claim may refer only to qualified, purpose-sufficient evidence; relevant semantic interpretations must remain explicitly derived and uncertain; and a conclusion must be separately classified under D22. No state claim may silently replace its evidence, interpretation, conclusion, policy, authority, or provenance.

The following conditions are required before a state commitment may be considered for approval:

1. The evidence is qualified and sufficient for the exact purpose under D21.
2. Any semantic interpretation is within D26 scope, with uncertainty and alternatives preserved.
3. Any learner conclusion is within D22 scope and is not merely inferred from evidence or interpretation.
4. The state dimension and proposed consequence are explicitly authorised; a label alone is insufficient.
5. Applicable policy is effective under D11 and any relationship is valid under D25.
6. The approving authority and action are recognised and effective under D15–D16.
7. D19–D20 permit required data handling, representation, and disclosure.
8. No consequential conflict or missing historical context remains under D18/D12.
9. The proposed state effect is prospective, bounded, attributable, reviewable, and non-consensual/non-choice-making.

Sufficiency, interpretation, conclusion, or policy evaluation may justify consideration but does not compel a state claim or transition. A state authority may reject or defer a transition even where upstream conditions are satisfied.

## 7. State-Commitment Authority and Transition Rules

A state commitment must identify: learner scope; state dimension; previous-state reference where applicable; proposed new state/effect; purpose; evidence/conclusion basis; policy/version; approving authority/action; effective period; review/staleness conditions; conflict status; provenance; and permitted execution operation.

A commitment may become effective only after approval, recording, and effectiveness conditions are separately satisfied. Execution must be separately authorised and must apply only the prospective effect within scope. A commitment must not be inferred from a decision, event, database write, replay output, lifecycle event, assessment result, or deterministic computation.

State transitions must be explicit about whether they create, replace, suspend, restrict, end, or leave unchanged a state representation. They must not imply that a change in an operational field is an authoritative learning change. A “no state change” or “state unresolved” outcome is valid and must not be reinterpreted as learner failure or deficiency.

| Transition stage | Permitted meaning | Prohibited inference |
|---|---|---|
| **Proposed** | A possible state transition is submitted. | No current state effect. |
| **Reviewed** | Review considered the proposal. | No approval, truth, or effectiveness. |
| **Approved** | A recognised authority approved the precise commitment. | No execution or learner consent. |
| **Recorded** | The commitment/action is preserved historically. | Recording is not effective state. |
| **Effective** | The commitment’s prospective terms are currently valid. | No retrospective rewrite. |
| **Executed/represented** | The authorised prospective effect was applied. | No expansion beyond the commitment. |
| **Corrected/revoked/stale/superseded** | A later governed fact constrains future reliance/effect. | No rewriting of historical state. |

## 8. Authority Lifecycle

The state-authority lifecycle follows D15, D16, and D22:

> **proposal → review → approval/rejection → recording → effectiveness → execution → correction/revocation → staleness → prospective supersession → historical retention**

Each stage must remain distinct. Approval does not make the state effective; effectiveness does not prove execution; execution does not create authority outside the commitment; correction does not rewrite the original state history; revocation does not prove that the prior state was never effective.

Authority status may be reviewed, suspended, revoked, marked stale, or superseded prospectively. A state claim may become unsuitable for current use because its evidence, policy, context, authority, or purpose has changed, without erasing its historical status. Any review of the current state must produce additive, attributable records.

## 9. Relationship to Mastery, Readiness, Progression, Certification, Grading, and Misconception

D27 does not silently authorise any substantive educational claim class. In particular, it does not establish authority for mastery, readiness, progression, certification, grading, ranking, competence, or misconception. Those terms may appear as proposed or deferred domain labels, but they do not become authoritative state merely because a field, policy, assessment, interpretation, or state commitment uses them.

Any future authority for one of those claim classes requires a separate governance determination specifying its meaning, authorised authority, evidence and interpretation requirements, permissible scope, uncertainty, review, conflict, lifecycle, learner-facing implications, and relationship to D22. Until then, a state claim using such a label must fail closed for consequential use.

## 10. Learner Choice and Consent Boundary

D1 remains controlling. A state claim, state transition, commitment, effective state, policy result, evidence set, assessment, interpretation, conclusion, experience lifecycle event, behaviour, silence, correctness, or system computation cannot create learner consent or learner choice.

A state transition cannot select an offered path/focus, accept an experience, or alter learner commitment where D1 requires explicit `select-offer`. Conversely, an explicit `select-offer` does not establish a state claim, evidence sufficiency, conclusion, or state effect. Representative actions remain subject to D24 and cannot be expanded through state authority.

## 11. Conflict, Uncertainty, and Fail-Closed Rules

Conflicting state claims, evidence, interpretations, conclusions, commitments, authorities, policies, versions, or historical contexts remain separate and provenance-linked. D27 creates no priority based on recency, majority, confidence, source status, institutional role, technical representation, storage order, completion, learner behaviour, AI recommendation, or operational convenience.

| Condition | Safe constrained outcome |
|---|---|
| State dimension/claim meaning is undefined or not authorised | No authoritative state claim or commitment. |
| Evidence, interpretation, or conclusion is insufficient, stale, revoked, conflicting, or out of purpose | No consequential state effect; preserve the upstream records. |
| Authority, policy, provenance, scope, period, or data-right condition is missing | No approval/effectiveness/execution. |
| Competing state claims or commitments conflict | Preserve conflict; apply D18; no inferred winner or state mutation. |
| Historical state/context is unavailable or ambiguous | Do not reconstruct; replay or consequential transition fails closed under D12. |
| Proposed state effect would create learner choice/consent or exceed D22 | Reject/defer the effect; no state or choice change. |
| State authority is expired, revoked, suspended, stale, or superseded | No new reliance outside surviving scope; preserve history. |

Fail-closed behaviour must not invent a state value, mastery, readiness, progression, misconception, failure, disengagement, preference, consent, or learner choice. A constrained/no-state-change result is non-mutating and must not be converted into an adverse learner conclusion.

## 12. Historical Protection

D27 must never rewrite, delete, conceal, or retroactively relabel original evidence, observations, interpretations, conclusions, learner choices, prior decisions, commitments, events, provenance, historical state, or historical execution facts. Corrections, revocations, staleness, and supersessions are additive and prospective.

A current state may differ from a historical state without invalidating the historical record. A later state commitment cannot change what was historically effective, and a later conclusion cannot make a prior state transition appear to have had a different basis. D12 controls durable history/replay; D13 controls version/migration; D16 controls correction/action records; D17/D26 control interpretation review; D18 controls conflict.

## 13. Interaction with D1–D26

D27 is subordinate to every locked decision and creates no exception.

| Decision | D27 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | State cannot create, infer, or replace explicit learner choice or `select-offer`. |
| **D2 — Learning-State Authority** | D27 supplies the missing state-specific authority semantics while preserving evidence/interpretation/state separation and prohibiting automatic state truth. |
| **D3–D4 — Curriculum and Academic Progression** | Curriculum/level/progression context does not create state authority or learner capability truth. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Content, relationships, delivery, participation, completion, or lifecycle do not create state; state does not activate content or experience. |
| **D8 — Assessment & Evidence** | Assessment observations do not automatically establish state; D27 requires the separate conclusion/commitment path. |
| **D9 — Decisioning & Policy** | Deterministic decisioning may evaluate authorised state commitments but cannot create state authority or mutate state directly. |
| **D10–D11 — Publication/Activation and Policy Lifecycle** | Activation/applicability remain distinct; policy cannot manufacture state authority. |
| **D12 — Durable History & Storage** | Storage/replay preserves state history but creates no authority; ambiguity fails closed. |
| **D13 — Version/Migration** | Version identity/equivalence/migration cannot rewrite or silently transform state. |
| **D14 — AI Proposal** | AI may propose only; it cannot establish, approve, execute, or revoke authoritative state. |
| **D15–D16 — Delegation and Governance Action** | State authority/action/review/approval/effectiveness/execution must be separately recognised and recorded. |
| **D17 — Interpretation Review** | Interpretation remains distinct from authoritative state and cannot automatically become state. |
| **D18 — Conflict Resolution** | State conflict creates no authority or precedence; consequential unresolved conflict fails closed. |
| **D19–D20 — Data/Representation Rights** | Data permission/representation does not create state authority; state authority does not grant unrestricted data access. |
| **D21 — Source/Evidence Sufficiency** | Qualified/sufficient evidence is necessary where applicable but never sufficient by itself to create state. |
| **D22 — Conclusion/Commitment Authority** | D22 governs authoritative conclusions and state commitments; D27 supplies state-specific semantics without collapsing stages. |
| **D23 — Experience Continuity** | Experience continuity/interruption/resumption cannot create state; state cannot silently alter continuity. |
| **D24 — Delegated Choice** | Representative choice/action remains separate from state authority and cannot be inferred from a state transition. |
| **D25 — Policy Equivalence/Compatibility** | Policy relationships do not create state authority or activation. |
| **D26 — Semantic Interpretation/Misconception** | Interpretation and misconception hypotheses remain derived/non-authoritative unless a separate future decision says otherwise; D26 cannot create state. |

## 14. Prohibited Behaviours

14.1. Treating a state field, score, flag, vector, event, replay result, database record, commitment, decision, policy output, assessment, interpretation, completion event, or deterministic computation as authoritative learner state merely because it exists or is calculated.

14.2. Treating qualified evidence, evidence sufficiency, interpretation, misconception hypothesis, learner conclusion, or authoritative conclusion as an automatic state claim or state transition.

14.3. Treating an authoritative state claim as mathematical truth, assessment truth, mastery, readiness, progression, certification, grading, misconception, learner consent, learner choice, or authority outside its exact scope.

14.4. Treating approval, recording, storage, transmission, replay, or technical write as state effectiveness or execution.

14.5. Inferring state or state transition from participation, completion, interruption, abandonment, resumption, delivery availability, learner behaviour, silence, speed, correctness, or technical/session continuity.

14.6. Allowing policy, curriculum, content, assessment, AI, institutional role, representative action, provider trust, or technical privilege to manufacture state authority.

14.7. Silently assigning, changing, substituting, migrating, clearing, or broadening state across purposes, contexts, policies, versions, experiences, or learners.

14.8. Using a state transition to create learner consent, choice, offer acceptance, path/focus commitment, or to bypass D1, D22, D23, or D24.

14.9. Resolving competing states, claims, commitments, evidence, interpretations, policies, or authorities through recency, majority, confidence, storage order, institutional possession, AI recommendation, or convenience.

14.10. Rewriting historical state, evidence, interpretations, conclusions, commitments, choices, decisions, events, provenance, or execution facts through correction, revocation, staleness, supersession, migration, or implementation.

14.11. Introducing mastery, readiness, progression, certification, grading, ranking, competence, or misconception authority merely by defining a label or data structure.

14.12. Implementing state semantics, state mutation, persistence, assessment, AI, UI/API, migration, or any other functionality from D27.

## 15. Explicit Deferrals

D27 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Substantive authority for mastery, readiness, progression, certification, grading, ranking, competence, and misconception | D27 defines the state-authority boundary but does not create any domain-specific truth claim. |
| State ontology, canonical dimensions, values, scales, thresholds, and mathematical/educational semantics | These require separate domain governance and cannot be invented by a generic authority decision. |
| Assessment scoring, rubrics, calibration, diagnostic methodology, and clinical/psychological interpretation | D8/D21/D26 constrain these; D27 is not an assessment or diagnostic implementation. |
| Specific state authorities, reviewers, approvers, policies, evidence thresholds, and permitted consequences | D15–D16/D11 require explicit recognition; D27 names no real actor or policy. |
| State migration, version equivalence, reconciliation, and technical persistence | D13/D12 remain controlling; no migration or storage implementation is authorised. |
| Active-session/client/runtime state mechanics and delivery interruption effects | D23 governs continuity semantics but not implementation or session mechanics. |
| Learner-choice representation and override/ratification rules | D24 remains controlling and D27 creates no delegated-choice exception. |
| Legal, jurisdictional, privacy, retention, identity, authentication, and access-control rules | These remain outside D27 and subject to D19–D20 and future governance. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D27 at this stage.**

If D27 is approved and a later controlled implementation is explicitly authorised, future contracts must preserve distinct representations for state observations, qualified evidence, interpretations, conclusions, authoritative state claims, state commitments, current-state representation, effectiveness, execution, historical state, authority/policy references, scope, purpose, time, uncertainty, conflict, correction, revocation, staleness, and supersession.

A future contract must not use a state field as proof of authority, a state delta as proof of execution, an event as proof of learning, or a label as an ontology. It must preserve historical state and prospective current state separately, and must fail closed when the required state dimension, authority, evidence, policy, provenance, context, or conflict treatment is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin until D27 is reviewed, approved, and locked.**
>
> D27 authorises no code, contract change, repository change, schema, migration, persistence, state mutation, assessment, scoring, diagnosis, AI, UI/API, delivery runtime, authentication, access control, commit, D28, or Slice 6 work. Any future implementation requires explicit human approval of D27 and a later controlled implementation authorisation reconciling D1–D27.

## 18. Approval Recommendation

D27 is presented for human architectural review as the next boundary required to protect the evidence-centred architecture from accidental learner-state authority. It separates state semantics, state claims, authority, commitments, effectiveness, and execution while deliberately deferring substantive mastery/readiness/progression/misconception/certification/grading rules that cannot be safely invented here.

> **D27 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, state mutation, assessment, scoring, diagnosis, AI, persistence, UI/API, D28, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
