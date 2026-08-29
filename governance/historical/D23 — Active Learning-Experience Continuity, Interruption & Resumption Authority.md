# D23 — Active Learning-Experience Continuity, Interruption & Resumption Authority

> **Status: D23 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only decision. It preserves D1–D22 exactly as approved and locked. It creates no code, contract, repository, implementation, persistence, UI/API, assessment, AI, migration, Slice 6, or D24 authority.

## 1. Purpose

D23 establishes the authority boundary for an already-offered or already-started learning experience when the current context may differ from the context in which it was originally offered or started. It protects historical facts while preventing an existing experience from becoming a standing permission to continue, substitute, migrate, or execute under changed authority.

> **An already-offered or already-started learning experience remains historically valid, but cannot be automatically mutated, substituted, migrated, continued, or executed under a changed authority context. Future decisions must use the new authorised context and fail closed or produce constrained/no-offer outcomes where required.**

D23 separates **historical validity**, **current executability**, **experience-instance identity**, **lifecycle state**, **learner choice**, and **current decisioning context**. It ensures that continuity is never inferred from prior existence, partial participation, delivery availability, elapsed time, retained state, technical session continuity, or a previous learner action.

## 2. Scope

D23 governs the historical identity and lifecycle treatment of learning-experience instances, including offered, started, interrupted, abandoned, resumed, and terminated conditions; partial participation; lifecycle-event recording; current executability; interruption; resumption eligibility; changed authority/context; and prospective applicability.

It applies when a current context differs, may differ, or cannot be established to remain compatible with the historical context. Relevant changes include content retirement or withdrawal, curriculum change, policy change, delivery-capability change, evidence-context change, authority-status change, data/right restriction, source/evidence lifecycle change, and version change.

| D23 governs | D23 does **not** govern |
|---|---|
| Whether an existing experience instance can be considered for current prospective execution under current authorised context | Mathematical truth, curriculum truth, content quality, assessment scoring, rubric design, mastery, readiness, progression, certification, grading, or misconception authority |
| The distinct lifecycle facts of offer, start, interruption, abandonment, resumption, termination, and partial participation | Device/session detection, authentication, transport continuity, UI flow, timeout mechanics, data storage, API, queue, or client implementation |
| The requirement to re-evaluate current executability when authority/context may have changed | Automatic learner choice, consent, state mutation, evidence qualification, conclusion authority, or version equivalence/migration |
| The prospective effects of content, curriculum, policy, delivery, evidence, authority, and version changes on continuation/resumption | AI runtime, privacy implementation, identity proofing, legal compliance, or technical migration |

## 3. Authority Model

D23 creates no default lifecycle actor, resumption authority, continuation authority, or exception. Any governance actor, delegated authority, review, approval, record, effectiveness, execution, correction, or escalation must satisfy D15 and D16. Any information access/use/disclosure associated with the instance must satisfy D19 and D20. Any evidence use must satisfy D21. Any conclusion/state commitment must satisfy D22.

D23 requires the following authority distinctions.

| Distinct concern | D23 meaning | It does **not** establish |
|---|---|---|
| **Experience definition** | A D7/D5-governed description of an experience and its declared educational/delivery semantics. | That a specific learner has received, accepted, started, may currently execute, or may resume it. |
| **Offer** | A historically recorded opportunity presented under its then-applicable context. | Learner acceptance, start, participation, completion, current availability, or future executability. |
| **Experience instance** | The uniquely referenceable historical occurrence/scope associated with an offer or start context. | A mutable proxy for a current experience definition, a blanket continuation permission, learner state, or consent. |
| **Lifecycle fact** | An attributable record concerning the offer/start/interruption/abandonment/resumption/termination status of the instance. | Learning, competence, preference, assessment truth, conclusion, or state. |
| **Current executability determination** | A present-tense assessment that an existing instance may be executed only under current, explicit, effective, compatible conditions. | A new learner choice, content/curriculum activation, authority grant, evidence conclusion, or execution itself. |
| **Continuation or resumption execution** | A separately accountable prospective act operating only after applicable current conditions and learner-choice requirements are met. | Retrospective validation, silent substitution/migration, consent, or state change. |

D23 distinguishes an **instance’s historical validity** from **current executability**. Historical validity means that the record remains a protected historical fact connected to the then-recorded definition, offer, choice, context, lifecycle events, authority references, and provenance. It does not declare the historic content semantically true, retrospectively guarantee that every historical requirement was met, or make that instance executable now.

Current executability is a prospective, purpose-bound, context-sensitive condition. It must be established from current applicable authority and compatible references. It cannot be inferred from the fact that an instance exists, was once active, appears in storage, is visible in a client, was partially completed, or has an active technical session.

## 4. Experience-Instance Model

An experience instance is an immutable historical identity, distinct from an experience definition, learning offer, content version, curriculum position, policy version, delivery arrangement, learner state, and lifecycle event. It must retain references to its known historical context and must not be silently redirected to a later content or experience version.

At a minimum, the conceptual record of an instance must preserve, where applicable: its own identity; related historical offer/definition references; learner/data-subject association within D19–D20 bounds; historical content/curriculum/policy/version references; declared delivery capability context; explicit learner-choice reference where D1 requires it; recorded lifecycle facts; evidence references; authority/action references; effective-time information; and observable provenance. D23 authorises no present data model or contract change; these are governance distinctions a future implementation must preserve.

A new experience definition, content version, curriculum arrangement, policy, delivery capability context, or experience instance is not equivalent to an existing instance merely because names, concepts, assets, identifiers, or presentation appear similar. D13 controls any claim of equivalence, compatibility, or migration. Until an explicit applicable determination exists, D23 requires that the original instance remain historical and that future execution use the current authorised context without assuming interchangeability.

## 5. Lifecycle State Semantics

Lifecycle states describe governed facts about the instance, not learner ability, intent, consent, preference, or state. A lifecycle state must be attributable, time-aware, scope-bound, provenance-linked, and preserved separately from the current executability determination.

| Lifecycle condition | D23 meaning | Required non-collapse |
|---|---|---|
| **Offered** | A historical offer fact identifies an opportunity related to an instance/definition under a then-recorded context. | Offered ≠ selected, started, participated, completed, executable, or consented. |
| **Started** | An explicit, attributable lifecycle fact states that authorised execution/participation of the instance began under its then-applicable context and any required D1 choice. | Started ≠ learning, competence, completion, continuing authority, or current executability. |
| **Interrupted** | A recorded discontinuity prevented or stopped then-current participation/execution without determining fault, preference, learning, or future eligibility. | Interruption ≠ failure, abandonment, decline, deferment, choice, conclusion, or state. |
| **Abandoned** | An explicitly governed lifecycle closure/status, if a separately applicable policy defines it, recording that the instance is not then being continued. | Abandonment ≠ learner preference, consent withdrawal, refusal, failure, incompetence, or a conclusion about learning. |
| **Resumed** | A new, attributable lifecycle fact that prospective execution restarted after current executability and all applicable current authority/choice conditions were satisfied. | Resumed ≠ automatic continuation, equivalence, migration, consent, or validation of the historical/current context. |
| **Terminated** | An explicitly recorded closure that prevents further execution of the instance under its stated basis/scope. | Termination ≠ deletion of historical facts, invalidation of past participation, learner failure, or a conclusion about capability. |
| **Partial participation** | A bounded observation that some interaction/delivery occurred without asserting complete execution, learning, competence, acceptance, or state. | Partial participation ≠ completion, sufficient evidence, mastery, readiness, progression, or preference. |

No lifecycle classification may be inferred from silence, time passage, technical disconnection, client disappearance, data absence, delivery unavailability, learner behaviour, assessment outcome, performance, content withdrawal, or system computation unless a separate applicable governance decision and effective policy expressly authorise that precise non-consequential classification. D23 does not create such a policy.

## 6. Interruption Rules

An interruption must be recorded as a distinct historical lifecycle fact only when there is attributable, provenance-supported basis for recording the discontinuity. The interruption record must distinguish, where known, the occurrence/context from any later reason, authority response, remediation, resumption request, or termination. It must not silently attribute cause to the learner, content, provider, device, policy, authority, or evidence.

An interruption does not invalidate the historical offer, learner selection, start, delivery, partial participation, evidence, decision, or state record. It does not create an entitlement to resume, a duty to resume, a replacement experience, a new offer, a learner conclusion, an assessment result, or a learner-state effect. It neither creates nor withdraws learner consent or choice.

Where current execution becomes unavailable because current authority/context cannot be established, the safe result is a **non-executable constrained outcome**. That outcome must not be misrecorded as interruption, abandonment, termination, or learner failure unless an independently authorised lifecycle action establishes such a fact. D23 distinguishes inability to prove current executability from proof that a historic interruption occurred.

## 7. Resumption Rules

Resumption is a new prospective action, not restoration of historic permission. An already-started instance may be considered for resumption only after a current executability determination establishes all required current conditions. Resumption must not occur automatically due to a returned session, reconnection, cached state, prior start, elapsed interruption, an original offer, historic learner selection, technical availability, or an unchanged instance identifier.

The conditions for considering resumption are as follows:

1. The relevant historical instance, lifecycle facts, and required provenance must be available and unambiguous under D12.
2. The original instance must remain distinctly identified; no content/experience/version substitution or migration may be presumed under D13.
3. Current content, curriculum, policy, authority, delivery, data/right, evidence, and version conditions must be applicable, effective, and compatible for the proposed prospective execution.
4. Any current learner-choice requirement remains governed exclusively by D1. Where current decisioning produces an offer or resumption would commit/recommit learner path or focus, only an explicit current `select-offer` may authorise that commitment. A historical selection cannot be stretched into a new choice by inference.
5. Required governance actor/action authority, review, approval, recording, effectiveness, and execution must remain distinct under D15–D16.
6. No unresolved consequential conflict, ambiguity, revocation, suspension, expiry, restriction, withdrawal, missing provenance, privacy/right limitation, or incompatible current context may remain.

D23 does not decide whether every resumption always requires a new offer, which learner interaction starts a non-path-changing resumption, what duration is acceptable, or which actor may request/approve it. Those matters remain deferred. It does require that, wherever D1 applies, resumption cannot bypass D1; and wherever current authority/context cannot be demonstrated, resumption cannot execute.

If resumption is not currently eligible, no automatic substitution, downgrade, upgrade, migration, restart, re-offer, state change, or learner conclusion may occur. A future current decisioning process may only produce a safe constrained/no-offer result, or a separately authorised current offer, consistent with all locked decisions.

## 8. Changed-Context and Current-Executability Rules

### 8.1 Changed-context rule

A changed or potentially changed context does not invalidate historical facts. It does, however, prevent automatic continuation/resumption/execution until the proposed future operation is assessed against the **new current authorised context**. The system must not borrow applicability from the historic context or treat retained state as evidence of current authority.

| Changed context | Required prospective treatment |
|---|---|
| **Content retirement or withdrawal** | Preserve historic content/instance facts. Do not deliver, continue, or substitute retired/withdrawn content unless a separate current authority explicitly permits the prospective operation. D10 governs activation/withdrawal. |
| **Curriculum change** | Preserve historic curriculum context. Do not infer current applicability, progression, equivalence, or a replacement path from the earlier curriculum. D3/D4/D10/D13 remain controlling. |
| **Policy change** | Preserve the then-applicable policy reference. Evaluate any new prospective act only under an applicable effective current policy; approval history is not current policy applicability. D11/D18 control. |
| **Delivery-capability change** | Re-evaluate declared semantic capability compatibility without device/client inference. Do not silently downgrade/upgrade/replace an experience or treat availability as authorisation. D5/D7 control. |
| **Evidence-context change** | Preserve observations and prior qualification/conclusion facts. Do not infer new learning, state, continuation, or resumption eligibility from new, missing, restricted, stale, revoked, or conflicting evidence. D21–D22 control. |
| **Authority-status change** | Where source, content, policy, actor, delegation, representation, or commitment authority is restricted, suspended, revoked, expired, stale, or superseded, do not rely on it prospectively outside its effective scope. D15–D16/D20–D22 control. |
| **Version change** | Maintain historical version references. Do not treat versions as compatible/equivalent or migrate an instance without explicit purpose/scope-specific authority under D13. |
| **Data/right condition change** | Respect current access/use/disclosure/restriction/availability conditions. A historic association or access does not authorise new execution/data use. D19–D20 control. |

### 8.2 Current executability determination

Current executability is a distinct, prospective, non-consensual, non-learning, non-state-making determination. It may establish only that the proposed execution is permitted to proceed within its stated scope; it does not itself perform the execution, make an offer, choose for the learner, create evidence, authorise a conclusion, or mutate state.

A current experience instance is executable only where all applicable conditions below are explicitly established. Missing or ambiguous required context fails closed.

| Required condition | Constraint |
|---|---|
| **Historical identity/context** | The instance and required historic references/provenance can be retrieved and are unambiguous. |
| **Current content/curriculum status** | The prospective execution is consistent with current authorised content/curriculum activation/withdrawal conditions. Historic validity is insufficient. |
| **Current policy applicability** | An applicable effective, authority-scoped policy permits the proposed operation. Policy activation alone is insufficient. |
| **Current authority/action status** | Required actors, delegations, approvals, effectiveness, and execution authority are explicit, effective, in scope, and non-conflicting. |
| **Current delivery compatibility** | Declared semantic delivery capabilities satisfy the experience’s currently applicable requirements without client/device inference or silent substitution. |
| **Current data/right handling** | Any required learner/data-subject association, access/use/disclosure, representation, restriction, and availability conditions are satisfied under D19–D20. |
| **Current evidence/conclusion/state conditions** | Where relevant to the proposed operation, evidence and conclusions/commitments are used only within D21–D22 bounds and do not create execution authority. |
| **Conflict/version compatibility** | No consequential conflict is unresolved, and no version equivalence/migration has been inferred. |
| **Learner choice** | Any required learner commitment is explicitly authorised only as D1 permits. |

The deterministic engine may evaluate whether declared current conditions are present according to an already authorised effective policy. It may not infer a missing condition, deem a changed context compatible based on similarity, create a new offer, choose for the learner, resolve semantic conflict, or turn successful computation into authority.

## 9. Learner Choice Protections

D1 is fully controlling. The lifecycle of an experience instance, any prior learner selection, start, participation, interruption, abandonment, completion, delivery availability, evidence, conclusion, state commitment, technical session, or system computation must not become learner choice, consent, preference, decline, deferment, or a request for an alternative.

Only explicit `select-offer` authorises an offered path/focus commitment where D1 requires learner choice. A resumption is not consent. If resumption requires a new or renewed path/focus commitment, it must arise through a current offer and explicit `select-offer`; it may not be inferred from history. Conversely, `select-offer` does not establish current executability, content/policy authority, evidence sufficiency, state, or completion.

An interruption must not be treated as a decline, an abandonment must not be treated as a preference, and termination must not be treated as a learner refusal or failure. D23 grants no actor authority to make learner choice on the learner’s behalf.

## 10. Historical Protection and Lifecycle-Event Recording

The offer, instance identity, start, participation, interruption, abandonment, resumption, termination, evidence, decisions, authority/action records, commitments, events, provenance, version references, and historical learner state are protected historical facts. A later content/policy/curriculum/version/authority/data/right change governs future applicability only; it must never silently rewrite, delete, conceal, re-label, invalidate as if absent, or substitute those history records.

Each lifecycle event must be separately recorded as a distinct fact where a record is authorised. The record must distinguish the lifecycle claim, source/actor, authority/action basis, known time/context, relevant instance, reason/uncertainty where known, current status, prospective effect if any, and provenance. Recording an event does not establish learner learning, choice, state, current executability, completion, or authority.

Corrections, restrictions, revocations, expiries, stale markings, reviews, terminations, and supersessions must be additive, attributable, prospective, and scope-bound. They may affect future reliance/executability only as explicitly authorised. D12 protects durable history; D13 protects version/migration governance; D16 protects governance-action distinction; D17 protects interpretation review; D18 protects conflict resolution.

## 11. Conflict and Fail-Closed Rules

Conflict, uncertainty, or missing context concerning an instance’s content, curriculum, policy, delivery, evidence, authority, rights, version, lifecycle, or learner-choice context creates no permission to continue. No precedence may be inferred from recency, prior completion, historical selection, content availability, delivery availability, institutional status, technical access, storage custody, credentials, session continuity, metadata, AI confidence, provider trust, apparent compatibility, learner behaviour, silence, automation, or convenience.

Constitutional constraints are supreme. D18 governs all other consequential cross-domain conflict. When a consequential conflict or required condition is unresolved, the system must preserve historical facts and produce the constrained outcome: do not execute, continue, resume, mutate, substitute, migrate, upgrade/downgrade, create an offer, create a conclusion/state commitment, infer choice/consent, or rewrite history. It may record/escalate the unresolved condition only under separately applicable authority.

| Unresolved condition | Required constrained outcome |
|---|---|
| Current content/curriculum/policy authority or applicability is missing, withdrawn, ambiguous, or conflicting | No prospective execution, continuation, or resumption. Do not substitute content/experience. |
| Required delivery capability is incompatible, missing, or ambiguous | No execution under the old instance. Do not silently downgrade, upgrade, or alter its pedagogy. |
| Evidence/source/conclusion/commitment context is stale, revoked, restricted, insufficient, or conflicting where relevant | Do not infer learning/state/executability; preserve and escalate only if separately authorised. |
| Required data/right/representation condition is unavailable, restricted, expired, or unresolved | Do not access, use, disclose, or execute on the assumption that historic handling authority continues. |
| Version compatibility/equivalence/migration is not explicitly established | Do not migrate or treat a current definition as the historical instance. |
| Learner-choice condition is required but no current explicit authorised choice exists | Do not commit/recommit path/focus or treat resumption as consent. |
| Historic identity/provenance/context is unavailable or ambiguous | Do not reconstruct the instance or continue it consequentially. |

## 12. Prohibited Behaviours

12.1. Silently substituting content, an experience definition, curriculum context, policy, delivery form, version, or instance for an existing historical instance.

12.2. Silently migrating, downgrading, upgrading, restarting, re-offering, or continuing an instance because the replacement appears similar, current, technically available, or pedagogically preferable.

12.3. Automatically continuing or resuming an experience under changed, missing, incompatible, revoked, expired, restricted, stale, unresolved, or conflicting current authority/context.

12.4. Retrospectively invalidating, rewriting, deleting, concealing, relabelling, or treating as absent a historical offer, instance, lifecycle event, evidence record, decision, commitment, event, provenance, version reference, or historical state.

12.5. Treating lifecycle events, partial participation, delivery, interruption, abandonment, termination, completion, time elapsed, session continuity, technical availability, learner behaviour, silence, or system computation as learning, competence, mastery, readiness, progression, misconception, failure, preference, consent, or learner choice.

12.6. Treating an existing experience, historical offer, prior selection, start record, stored state, credential, device/session, institutional relationship, provider trust, or technical access as current execution authority.

12.7. Treating resumption eligibility/current executability as an offer, learner selection, assessment conclusion, evidence qualification, authoritative learner conclusion, state commitment, or state effect.

12.8. Allowing a content/curriculum/policy/lifecycle exception to bypass D1 learner choice, D18 conflict rules, D19–D20 data/right constraints, D21 evidence requirements, D22 conclusion/state-commitment authority, or any constitutional decision.

12.9. Using an interruption, abandonment, termination, or completion event to manufacture an adverse learner conclusion or state effect.

12.10. Implementing persistence, UI/API, session management, delivery mechanics, migration, assessment, AI, or any other code/configuration/infrastructure change from D23.

## 13. Explicit Deferrals

D23 leaves the following matters unresolved. They require a later dependency review, separate human governance approval, and any later controlled implementation authorisation.

| Deferred matter | Why D23 does not decide it |
|---|---|
| Exact abandonment criteria, timeout rules, clock semantics, inactivity policy, and operational detection of interruption | D23 prohibits inference from time/silence/technical disappearance and does not specify technical or policy mechanics. |
| Exact learner interaction for non-path-changing resumption and whether every resumption requires a fresh offer | D23 preserves D1 where path/focus commitment is implicated but does not invent broader interaction semantics. |
| Authentication, session continuity, device/network detection, client navigation, offline handling, and transport recovery | D23 is interface- and infrastructure-neutral. |
| Content replacement design, migration procedures, compatibility criteria, and equivalence evidence | D13 controls migration/equivalence; D23 prohibits silent substitution but defines no replacement process. |
| Assessment, scoring, diagnostics, mastery/readiness/progression/misconception/certification/grading authority | D21–D22 maintain their boundaries; D23 creates no substantive learning conclusion. |
| Specific governance actors, delegations, policies, approval criteria, and escalation procedures | D11, D15, D16, and D18 govern these foundations; D23 grants none by default. |
| Privacy/legal/retention/rights operations | D19–D20 remain controlling and are not implementation/legal-compliance decisions. |
| Formal contracts, data model, storage, API, UI, delivery runtime, event bus, or test implementation | D23 expresses governance semantics only. |

## 14. Required Contract Changes, if Any

**No contract changes are required or authorised by D23 at this stage.**

If D23 is later approved and a separate, controlled implementation phase is expressly authorised, future contracts must retain the non-collapsed distinctions of: experience definition; historical offer; immutable instance identity; lifecycle fact; current executability determination; resumption request/eligibility; current authority/context references; compatibility claim; learner-choice reference; partial participation observation; constrained outcome; and prospective execution. They must preserve history, provenance, current-versus-historical context, and fail-closed behaviour without inferring equivalence, choice, consent, state, learning, or authority.

This is future impact analysis only. It does not select a contract form or authorise a code, test, repository, configuration, or infrastructure change.

## 15. Implementation Freeze

> **Implementation remains frozen. No implementation may begin unless D23 is reviewed, approved, and locked, and a later controlled implementation authorisation is explicitly issued.**
>
> D23 authorises no code, contract modification, repository-file modification, persistence, UI/API, client, delivery runtime, assessment, AI, migration, authentication, identity proofing, storage, transport, commit, Slice 6, or D24 activity.

## 16. Approval Recommendation

D23 is ready for human architectural review as the narrowly defined continuity boundary. It preserves historic experience facts while requiring prospective current-context assessment before any execution, continuation, or resumption. Approval would lock these governance semantics only; it would not authorise a particular lifecycle actor, abandonment rule, resumption interaction, content replacement, migration, client, session system, policy, technology, or implementation.

> **D23 is proposed only. Human architectural approval is required before D23 becomes locked or any active-experience continuity, interruption, resumption, lifecycle, delivery, or related implementation begins.**

---

**D23 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, repository file, commit, implementation, or Slice 6 work has occurred.
