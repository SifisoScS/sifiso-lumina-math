# Math Lumina — Slice 6 Governance Preconditions Review

> **Purpose:** Review the complete locked governance chain D1–D30 in preparation for defining Slice 6 governance preconditions.
>
> **Status:** Review only. Slice 6 is not defined, approved, or authorised. No implementation, repository change, contract change, migration, persistence, UI/API, assessment, AI, delivery runtime, or infrastructure work is authorised by this document.

## 1. Executive conclusion

D1–D30 now form a coherent authority-first, evidence-centred, headless engine constitution. They cover learner choice; evidence and state; curriculum, content, knowledge and experience authority; assessment and interpretation; policy lifecycle and cross-policy relationships; identity, consent, privacy and representation; conclusions and state commitments; experience continuity; pedagogical adaptation and learning response; delivery and interaction; and operational command/event/effect execution.

The governance chain is sufficiently complete to define **Slice 6 preconditions**, but it is not a licence to begin implementation. The next gate must be a controlled implementation-readiness decision that names a narrow Slice 6 scope and demonstrates that the scope can be implemented without inventing any authority deferred by D1–D30.

> **A locked governance decision constrains implementation; it does not itself authorise implementation.**

The most important practical conclusion is that Slice 6 must not begin as a general integration, persistence, UI, AI, assessment, delivery, or state-expansion phase. Any first slice must be narrow, headless, deterministic, independently testable, provenance-rich, fail-closed, and explicitly mapped to the locked decisions it exercises.

## 2. Complete D1–D30 authority map

| Decision | Locked boundary | Slice 6 implication |
|---|---|---|
| **D1** | Learner choice and explicit commitment semantics | No inferred acceptance, decline, deferment, alternative request, pause, or focus movement. Existing implementation must be reconciled with the locked `select-offer` rule before any related work. |
| **D2** | Evidence-centred learning-state authority | Observations, interpretations, and authoritative state remain separate; computation does not create state truth. |
| **D3** | Curriculum identity and authority | Curriculum governs structure, not mathematical truth, consent, or learner state. |
| **D4** | Academic level and progression | Level is contextual; progression is governed and qualified, never automatic. |
| **D5** | Content authority and semantic delivery capabilities | Only authorised/admissible/active content is consumed; delivery is semantic and client-neutral. |
| **D6** | Typed, scoped, versioned knowledge relationships | Graph topology or metadata cannot create truth, authority, consent, or state. |
| **D7** | Experience definition, offer, instance, and lifecycle | Delivery/participation/completion do not establish learning or state. |
| **D8** | Assessment and qualified evidence | Assessment observations do not automatically establish mastery, readiness, misconception, progression, or state. |
| **D9** | Deterministic decisioning and policy execution | Decisions are explainable, non-consensual, non-mutating, grounded, and fail closed. |
| **D10** | Content publication and curriculum activation | Structural and semantic provenance remain distinct; activation is explicit and prospective. |
| **D11** | Policy activation and lifecycle | Policy identity, activation, applicability, authority, and precedence remain distinct. |
| **D12** | Durable history and storage | Storage preserves/retrieves; it never creates authority; replay fails closed when history is unavailable/ambiguous. |
| **D13** | Version equivalence, conflict, and migration | Version identity is not equivalence; migration is explicit and prospective; history is not rewritten. |
| **D14** | AI proposal and assistance | AI is proposal-only and cannot decide, assess, consent, publish, activate, migrate, or rewrite history. |
| **D15** | Delegation and governance-actor recognition | Identity, title, trust, storage, and AI do not grant authority; delegation cannot expand authority. |
| **D16** | Governance action and escalation | Proposal, review, approval, recording, effectiveness, execution, escalation, and correction are distinct. |
| **D17** | Interpretation and learner-record review | Interpretations are provenance-linked, reviewable, prospective, and non-state by default. |
| **D18** | Cross-domain conflict and exception resolution | Conflict creates no authority; unresolved consequential conflict fails closed. |
| **D19** | Data-subject identity, consent, and information-access authority | Association, access, use, disclosure, and consent are explicit and purpose-bound. |
| **D20** | Privacy, representation, and data-subject rights | Data rights, representation, minimisation, disclosure, and historical protection remain independent of educational authority. |
| **D21** | Assessment-source recognition and evidence sufficiency | Source recognition, observation, qualification, and purpose-specific sufficiency remain distinct. |
| **D22** | Authoritative learner conclusions and state commitments | Evidence/sufficiency/conclusion/commitment/effectiveness/execution do not collapse. |
| **D23** | Experience continuity, interruption, and resumption | Historical validity is not current executability; changed context blocks automatic continuation/substitution/migration. |
| **D24** | Learner representation and delegated choice | Data representation does not automatically grant learner-choice authority; representative action is not personal learner action. |
| **D25** | Policy semantic equivalence and cross-policy compatibility | Identity, equivalence, compatibility, composition, precedence, activation, conflict, and migration remain distinct. |
| **D26** | Semantic assessment interpretation and misconception authority | Error/interpretation/hypothesis does not become misconception, diagnosis, or state. |
| **D27** | Learning-state semantics and authoritative state transition | State claims, commitments, effectiveness, and execution remain distinct; no substantive mastery/readiness authority is implied. |
| **D28** | Pedagogical adaptation and learning-response authority | Adaptation/response/offer/delivery/choice/state remain distinct; no automatic pedagogical redirection. |
| **D29** | Learning-response delivery and interaction execution | Semantic response, delivery, interaction, participation, acknowledgement, and learning remain distinct and client-neutral. |
| **D30** | Operational command, event, and state-commit execution authority | Commands/events/storage/retries/replay do not create authority; effects require current effective authority and exact binding. |

## 3. Cross-chain invariants that every Slice 6 proposal must preserve

The following invariants are the implementation-facing expression of D1–D30. A Slice 6 proposal is not ready if it cannot demonstrate each applicable invariant.

| Invariant | Required behaviour |
|---|---|
| **Authority precedes effect** | Every consequential effect has an explicit, current, scoped, provenance-linked authority and effective commitment before execution. |
| **Stages do not collapse** | Proposal, review, approval, recording, effectiveness, execution, event, effect, and replay remain distinguishable. |
| **Observation is not interpretation** | Raw or submitted observations remain separate from derived semantic claims. |
| **Evidence is not state** | Qualification/sufficiency cannot create state, mastery, readiness, progression, misconception, or conclusion automatically. |
| **Choice is explicit** | No behaviour, delivery, computation, acknowledgement, silence, or state creates learner choice; D1 and D24 govern representative choice. |
| **Delivery is not learning** | Delivery, interaction, participation, acknowledgement, and completion do not establish learning, competence, or state. |
| **Current context governs** | Historic offers/instances/commitments do not bypass current authority, policy, content, capability, data, version, or conflict conditions. |
| **History is additive** | Corrections, revocations, migrations, supersessions, and status changes do not silently rewrite historical facts. |
| **Policy relationships are bounded** | Equivalence/compatibility/composition/precedence are purpose-, scope-, context-, and time-specific and do not activate policies. |
| **Technical systems are non-authoritative** | Storage, queues, event order, credentials, providers, clients, AI, and technical success do not create authority. |
| **AI is proposal-only** | AI can never be the final authority for assessment, interpretation, policy, choice, state, execution, or history. |
| **Conflicts fail closed** | Unresolved consequential authority/context/conflict does not produce an inferred winner or effect. |
| **Interfaces are replaceable** | The learning logic remains independent of browser, device, client, modality, provider, API, and UI. |

## 4. Mandatory preconditions before any Slice 6 definition becomes implementation-ready

These are **gates to implementation readiness**, not implementation instructions.

### 4.1 Governance baseline gate

D1–D30 must be treated as one immutable baseline. A proposed Slice 6 scope must include a decision-to-requirement matrix naming every D1–D30 decision it touches and demonstrating that no rule is weakened, reinterpreted, or silently superseded. Any ambiguity must be escalated for human review rather than resolved in code.

The governance baseline must also be made available as a canonical review artefact before implementation begins. This does not authorise changing the repository; it means that a future implementation proposal must identify the authoritative versions of the decisions and ensure that conversational approval status cannot be lost or misread.

### 4.2 Narrow-scope gate

Slice 6 must have one bounded objective, one bounded authority surface, explicit exclusions, and a stated non-goal list. It must not combine persistence, external assessment, AI, UI/client work, delivery runtime, policy administration, identity/access control, migration, and state expansion under one approval.

The scope must state whether it is read-only, planning-only, non-mutating, or effect-applying. Any effect-applying scope must separately identify the D22/D27 commitment and D30 execution conditions it will exercise.

### 4.3 Existing-behaviour reconciliation gate

Before any implementation, the baseline must be inspected and verified. In particular, the known D1 mismatch in `state-transitions.ts` must be addressed only through a separately approved implementation slice: non-pause `decline`, `defer`, and `request-alternative` must not move toward the original offer, while only the applicable explicit learner choice may authorise commitment.

The required pre-implementation check is:

```text
git status
pnpm check
```

The existing 54-test baseline must remain green before changes and must not be weakened. A future slice must add focused regression tests for every changed invariant and preserve deterministic replay and existing approved behaviour unless the change is explicitly within scope.

### 4.4 Authority/effect gate

Every proposed command, transition, event, storage write, delivery action, or state effect must be classified as one of: proposal, review, approval, recording, effectiveness, execution attempt, effect, failure, unknown, reconciliation, or replay. The proposal must show the authority reference and the exact scope for any consequential effect.

No future implementation may rely on a field name, event type, database row, queue message, API endpoint, or function call as a substitute for an authority decision.

### 4.5 Evidence/state gate

If Slice 6 handles learner evidence, interpretation, conclusion, or state, it must show the D21/D26/D27/D22 chain explicitly. It must not add scoring, diagnosis, misconception authority, mastery/readiness/progression authority, or automatic state mutation by implication.

A future state-affecting slice must first prove that the specific state dimension, claim class, authority, evidence threshold, policy, lifecycle, conflict treatment, and execution path have all been governed. D27’s generic state boundary is not itself a licence to invent a state ontology.

### 4.6 Choice/autonomy gate

Any scope involving offers, path/focus, experience selection, continuation, resumption, adaptation, delivery, or representatives must include explicit tests for D1 and D24. It must prove that delivery, acknowledgement, completion, behaviour, silence, or computation cannot become choice or consent.

For the known Phase 2 mismatch, the scope must explicitly state how decline/defer/request-alternative/pause are handled and must not repair this by broadening an unapproved command semantics.

### 4.7 Current-context gate

Any scope involving an existing experience, policy, content, curriculum, delivery capability, evidence, authority, or version must demonstrate D23/D25/D29 current-context checks. Historical existence, prior approval, version similarity, technical availability, or current storage cannot establish current executability.

A future slice must state what happens when context is missing or changes. The default must be no execution, constrained/no-offer, non-mutating, or fail closed as appropriate—not automatic substitution, migration, downgrade, upgrade, or continuation.

### 4.8 Provenance and historical gate

Every new consequential record must have attributable provenance, purpose, scope, authority/action reference, effective time, version/context reference, and lifecycle status appropriate to the scope. Historical observations, decisions, commitments, events, provenance, choices, experience facts, policy applicability, and state must not be silently rewritten.

A future implementation proposal must specify correction, revocation, staleness, expiry, supersession, duplicate, partial, unknown, and reconciliation handling before it is approved.

### 4.9 Fail-closed gate

Each failure class must have an explicit constrained outcome. At minimum, the scope must cover missing/ambiguous authority, policy, provenance, evidence, data rights, learner choice, version compatibility, delivery capability, historical context, and execution outcome.

“Best effort,” “newest wins,” “stored value wins,” “provider trust,” “last event wins,” “technical success,” “majority behaviour,” and “AI confidence” are not fail-closed rules. A future implementation must prove that unresolved consequential conditions produce no unauthorised effect.

### 4.10 Determinism and replaceability gate

The proposed slice must remain deterministic and headless for all engine logic. External provider, model, client, storage, browser, device, transport, and infrastructure choices must not alter domain authority or decision semantics.

If external variability is unavoidable, it must enter through an explicitly bounded port with declared provenance, version, uncertainty, failure, and replacement behaviour. No provider-specific output may become authority merely through integration.

### 4.11 Verification and approval gate

Before implementation approval, the slice proposal must include:

| Required item | Minimum evidence |
|---|---|
| Scope statement | One bounded objective and explicit exclusions. |
| Authority map | Decision-to-contract/action mapping for all applicable D1–D30 rules. |
| Threat/boundary analysis | UI-driven, AI-driven, database-driven, provider-driven, and automation-driven failure modes. |
| Contract impact analysis | Additive/non-breaking plan, or explicit approval for any change. |
| Test plan | Positive, negative, conflict, uncertainty, replay, history, choice, and fail-closed cases. |
| Baseline verification | `git status` and `pnpm check` before changes. |
| Completion evidence | Full verification, focused regression tests, report, commit/push only after approval. |
| Approval gate | Explicit human authorisation for the exact slice, with no implied next slice. |

## 5. Scope-conditional preconditions

Some governance conditions are mandatory only if the proposed slice enters the relevant domain.

| If Slice 6 includes… | Additional gate before approval |
|---|---|
| Durable persistence or external storage | D12/D30 operational model, history/replay, correction, duplicate, concurrency, retention/legal deferrals, and explicit storage non-authority must be resolved for the narrow scope. |
| External assessment/import | D19/D20 data authority, D21 source recognition/qualification/sufficiency, D26 interpretation, and D27/D22 state boundaries must be mapped; no scoring/diagnosis may be implied. |
| AI assistance | D14 task/input/provenance/review/acceptance boundary, provider replacement, unavailability, and non-authority tests must be explicit. |
| UI/client/voice/display delivery | D29 semantic capability and delivery boundary, client neutrality, D1 choice treatment, and no device detection in learning logic must be explicit. |
| Active experience continuity | D23 current executability, interruption/resumption, content/policy/version/authority changes, and no silent substitution/migration must be tested. |
| Learner state or state commitments | D22/D27 state dimension/claim/authority/effectiveness/execution conditions must be separately approved; no label-based state authority. |
| Policy administration or policy relationships | D11/D13/D18/D25 equivalence, compatibility, composition, precedence, lifecycle, and fail-closed conditions must be explicitly scoped. |
| Learner representation or delegated choice | D19/D20/D24 role, scope, authority basis, lifecycle, competing claims, and representative-action provenance must be explicit. |
| Assessment interpretation/misconception | D8/D21/D26 evidence, uncertainty, human review, hypothesis, conflict, and non-diagnostic boundaries must be explicit. |
| Delivery/provider/external execution | D29/D30 authority, current executability, command binding, retries, duplicates, partial/unknown outcomes, and reconciliation must be explicit. |

## 6. Explicitly unresolved matters that block particular implementations

D1–D30 do not silently resolve the following substantive or technical matters. They must not be invented in Slice 6.

1. **Substantive educational claim authority.** Mastery, readiness, progression, certification, grading, ranking, competence, and authoritative misconception claims remain unresolved beyond the generic boundaries in D22, D26, and D27.
2. **Assessment semantics.** Scoring, rubrics, calibration, diagnostic validity, and evaluator implementation remain outside the locked chain.
3. **State ontology.** Canonical state dimensions, values, scales, thresholds, and semantic definitions remain unresolved.
4. **Pedagogical algorithms.** Adaptation algorithms, pacing/difficulty models, intervention thresholds, and route-selection criteria remain unresolved.
5. **Learner-choice representation details.** Legal guardianship, capacity, age/jurisdiction rules, personal confirmation, override, ratification, and exact represented-choice categories remain unresolved.
6. **Active-session mechanics.** Timeouts, inactivity, network recovery, offline behaviour, abandonment detection, and client interaction semantics remain unresolved.
7. **Operational privacy/legal rules.** Jurisdiction, lawful basis, statutory rights, retention periods, deletion mechanics, breach processes, and compliance implementation remain unresolved.
8. **Identity/authentication/access control.** Identity proofing, credentials, service identity, authentication assurance, and technical access control remain unresolved.
9. **Policy runtime and migration.** Policy orchestration, automated semantic comparison, migration mechanics, storage, and equivalence tooling remain unresolved.
10. **Execution technology.** Databases, event stores, queues, transactions, concurrency, idempotency mechanisms, APIs, UI, clients, providers, and infrastructure remain unresolved.

These unresolved matters do not prevent every possible future implementation, but they block any Slice 6 scope that depends on them. A proposal must identify whether it is avoiding, deferring, or explicitly requesting one of these boundaries.

## 7. Required Slice 6 approval packet

Before a Slice 6 implementation can be authorised, the following documents/decisions must be presented for human approval as one controlled packet:

| Packet component | Required content |
|---|---|
| **Slice definition** | Exact objective, in-scope behaviour, out-of-scope behaviour, non-goals, and affected files/contracts. |
| **Governance traceability** | Mapping to D1–D30 and proof that no authority is invented. |
| **Boundary-risk review** | UI, AI, database, provider, automation, identity, privacy, state, evidence, delivery, and migration risks. |
| **Contract impact** | New/changed representations, history/provenance effects, compatibility, and migration statement. |
| **Test specification** | Baseline preservation, focused new tests, negative/fail-closed cases, replay/history, conflict, choice, and determinism. |
| **Execution/release plan** | Verification commands, review points, commit/push conditions, rollback/correction treatment, and approval gate. |
| **Human authorisation** | Explicit approval for the exact Slice 6 scope; no implied permission for later slices. |

## 8. Final readiness determination

**Governance readiness:** D1–D30 provide a strong locked authority framework for defining a narrow implementation slice.

**Implementation readiness:** Not yet established. It requires a human-approved Slice 6 scope, decision traceability, baseline verification, known D1 reconciliation, contract impact analysis, tests, and explicit handling of every relevant deferred boundary.

**Automatic next step:** None. No Slice 6 implementation, D31 governance decision, contract change, or repository change is authorised by this review.

> **The next valid action is a human-reviewed Slice 6 governance-preconditions approval and a separate controlled implementation authorisation.**

No code, contracts, repository files, schemas, migrations, persistence, assessment, AI, UI/API, delivery runtime, or Slice 6 work was performed in preparing this review.
