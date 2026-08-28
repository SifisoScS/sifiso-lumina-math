# D44 — Learner Context, Accessibility, Accommodation & Preference Authority

> **D44 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D43 are preserved exactly as approved and locked. D44 authorises no code, contract, repository, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D45, or Slice 6 work.

## 1. Post-D43 Dependency Analysis

D43 establishes the boundary for pedagogical intent, objectives, expected outcomes, completion criteria, learner-facing claims, achieved-outcome claims, evidence, interpretations, conclusions, and learner-state commitments. It prevents intent, delivery, completion, acknowledgement, or wording from becoming proof of achievement or learner state.

The chain still lacks a distinct authority boundary for **learner context used to shape learning**: accessibility needs, accommodation requests, language and communication preferences, declared constraints, learner preferences, current circumstances, capability observations, support requirements, and other contextual inputs. D19/D20 govern data-subject rights and privacy; D23/D29 govern continuity and delivery; D28 governs adaptation; D35/D36 govern identity and context. None decides when contextual information may be treated as an input to adaptation or delivery, who may provide or verify it, how sensitive or uncertain information is handled, or how context is prevented from becoming learner state, diagnosis, consent, or an inferred limitation.

The single highest-priority unresolved governance boundary is therefore **Learner Context, Accessibility, Accommodation & Preference Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D1 — Learner Choice** | Explicit choice is required; behaviour and silence are not consent. | How preferences/constraints inform options without becoming inferred choice. |
| **D2/D27 — State Authority** | Evidence, interpretation, conclusions, and state remain separate. | How context is distinguished from capability, state, diagnosis, or deficiency. |
| **D19/D20/D34 — Data and Rights** | Data association, privacy, representation, disclosure, retention, and deletion are explicit. | Authority to collect/use sensitive contextual information for learning purposes. |
| **D23/D29 — Continuity and Delivery** | Context change can affect executability; delivery does not create learning. | Accessibility/accommodation effects on delivery and continuity. |
| **D28 — Adaptation & Learning Response** | Adaptations/responses are not learner choice, learning, or state. | Permitted context inputs and boundaries for adaptation. |
| **D35/D36 — Identity and Context** | Technical identity/access and organisational context are bounded. | Learner-specific contextual association and its scope. |
| **D43 — Intent & Outcome Claims** | Intent/expectation/outcome claims do not prove achievement. | Context-sensitive claims without inferring a learner deficit or outcome. |

This is the next priority because an engine that adapts or delivers learning must know what contextual information it may rely on, yet accessibility needs, preferences, language, support requests, device-independent capabilities, temporary constraints, and inferred traits have very different authority and sensitivity. Without D44, adaptation could infer a learner’s ability from a preference, treat a declared accommodation as permanent state, expose sensitive information, deny an option, infer consent, or make a learner-facing claim about limitation without authority.

D44 does not define disability, diagnosis, accommodation law, learner taxonomy, accessibility standard, preferred modality, or adaptation algorithm. It defines the authority boundary for using learner context safely and respectfully.

## 2. Purpose

D44 defines the authority semantics for learner context, declared preference, accessibility need, accommodation request, support condition, language/communication preference, temporary circumstance, observed capability relevant to delivery, inferred attribute, contextual uncertainty, and permitted use.

> **A preference is not consent. An accommodation request is not a diagnosis. A delivery capability is not a learner limitation. Context is not learner state.**

D44 ensures that contextual information is explicit, purpose-bound, minimally used, reviewable, revocable, and never silently converted into learner choice, evidence, diagnosis, state, or authority.

## 3. Scope

D44 governs learner-specific contextual inputs used to inform content selection, adaptation, response, delivery, continuity, accessibility, support, or learner-facing communication.

| Within D44 | Outside D44 |
|---|---|
| Context categories, source/authority, purpose, scope, sensitivity, uncertainty, lifecycle, and permitted use | Accessibility technology implementation, UI/API, device detection, delivery runtime, authentication, or persistence |
| Declared preferences, accommodation requests, support needs, temporary constraints, and inferred context distinctions | Medical diagnosis, disability determination, legal accommodation, safeguarding, or clinical authority |
| Relationship between context, adaptation, delivery, learner choice, evidence, and state | Pedagogical methods, assessment, AI, content, curriculum, mathematics, or policy authority |
| Context correction, review, restriction, expiry, and historical protection | Specific standards, classifiers, user-interface patterns, or client implementation |

D44 creates no learner attribute, accommodation, preference, diagnosis, capability, or limitation.

## 4. Context Authority Model

**Learner context** is bounded information relevant to the learner’s current learning, access, communication, support, or delivery circumstances. Context may be learner-declared, representative-declared, externally observed, governance-provided, system-observed, or inferred; its source and status must remain explicit.

A **preference** is a stated or otherwise explicitly expressed desired option. It informs available choices but does not authorise selection, consent, or commitment.

An **accommodation request** is a request or recognised requirement for an adjustment to access, communication, timing, representation, or delivery. It does not by itself establish diagnosis, permanence, eligibility, or learner-state meaning.

A **capability/constraint observation** is a bounded observation about current interaction or delivery conditions. It is not a general statement about learner ability, mathematical capability, cognition, or future performance.

An **inferred context** is a system/AI/provider-derived hypothesis about a learner’s context. It is proposal-only unless separately reviewed and authorised for a limited purpose; inference cannot silently become an attribute or state.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Declared preference** | Learner/representative stated desired option. | Consent, choice, capability, or permanent need. |
| **Accommodation request** | Request/condition for a bounded adjustment. | Diagnosis, legal eligibility, state, or obligation. |
| **Support condition** | Context relevant to providing support. | Deficiency, misconception, or incapability. |
| **Temporary circumstance** | Time-bound context affecting current participation/access. | Permanent learner trait or state. |
| **Delivery capability** | Available way to realise a response. | Learner preference or limitation. |
| **Observed interaction condition** | Fact about a current interaction/delivery situation. | General learner capability or learning outcome. |
| **Inferred context** | Hypothesis derived from data/system/AI. | Fact, consent, diagnosis, or authority. |
| **Context status** | Proposed, declared, reviewed, active, restricted, stale, disputed, or other explicit status. | Authority from metadata. |

## 5. Source, Authority, and Context Status

Every contextual item must identify its source, subject, category, purpose, scope, time, provenance, uncertainty, sensitivity, authority basis, permitted use, and review/expiry conditions. A context item may be learner-declared without being independently verified; that does not make it false, but it limits how it may be used.

A representative, educator, institution, provider, client, assessment system, AI system, or engine may submit context only within its explicit authority. No source may silently convert an observation or inference into a durable learner attribute.

| Source/status | Permitted treatment |
|---|---|
| **Learner-declared** | May inform options/support within stated scope; not automatic choice or state. |
| **Representative-declared** | Requires D24 authority; scope and representation remain explicit. |
| **Governance/authorised support record** | May inform named support purpose; not diagnosis or universal state. |
| **Externally observed** | Requires D21 qualification where evidence is claimed; not automatic context truth. |
| **System-observed** | May describe current technical/interactions conditions; not learner limitation. |
| **AI/provider-inferred** | Proposal-only under D14/D37; no automatic use for consequential adaptation. |
| **Reviewed/recognised** | May be used for exact purpose/scope/period. | 
| **Stale/disputed/restricted** | Do not use beyond surviving permission; preserve history and uncertainty. |

## 6. Preference and Accommodation Boundary

Preferences may inform candidate options and presentation choices, but only an explicit learner action governed by D1 authorises a learner path, focus, offer commitment, or consent. A preference may be changed, declined, ignored, or unavailable without treating the learner as inconsistent, non-compliant, or lacking capability.

Accommodation requests and support conditions may inform access and delivery adjustments where authorised. They must not be treated as evidence that the learner cannot perform, has a misconception, lacks readiness, or has a permanent limitation. A requested adjustment is not an admission, diagnosis, or assessment result.

Where a support adjustment changes an interaction’s form, the resulting delivery/participation facts must remain distinct from evidence about mathematical understanding. Alternate modality or increased support does not reduce the authority of the learner’s explicit choice or automatically change outcome interpretation.

## 7. Context and Adaptation

D28 remains controlling. Adaptation may use permitted context to generate or filter candidate responses, but context cannot authorise the adaptation itself, create a learner choice, or establish that a particular adaptation is suitable without the applicable policy and authority.

Adaptation should use the minimum context necessary for the declared purpose. It must preserve uncertainty and should not rely on inferred sensitive attributes for consequential changes unless separately authorised. A missing context item is not permission to infer one.

| Adaptation use | Safe boundary |
|---|---|
| **Presentation preference** | May inform alternatives; does not select one. |
| **Accessibility request** | May support a bounded adjustment; does not establish diagnosis/state. |
| **Temporary constraint** | May affect current executability; must expire/review. |
| **Language/communication preference** | May inform response form; does not infer comprehension or ability. |
| **Observed interaction condition** | May constrain current delivery; does not generalise to learner capability. |
| **Inferred trait** | Proposal-only; no consequential use without separate authority. |

## 8. Context and Delivery/Continuity

D23/D29 remain controlling. A context change may make an experience or response currently executable, non-executable, or in need of review, but it cannot silently resume, substitute, terminate, or transform the experience. Delivery capability is a property of the current delivery context, not a learner attribute.

If an accommodation or context change affects an active experience, the system must distinguish the historical instance, current executability, changed delivery conditions, learner choice, and any new offer. No automatic continuation or learner-state effect follows.

## 9. Data, Privacy, Representation, and AI

D19/D20/D24/D34/D35/D36 remain controlling. Contextual information must be purpose-bound, minimised, access-restricted, disclosed only under authority, and subject to review, correction, restriction, expiry, and lifecycle protection.

A learner may declare context without granting unrestricted use. A representative may provide context only within D24 scope. An authenticated actor does not gain context authority merely by access. AI/provider inference remains proposal-only and cannot create diagnosis, preference, accommodation, consent, choice, evidence, or state.

Sensitive context must not be copied into learner-facing explanations, logs, exports, AI prompts, provider exchanges, or assessment records beyond authorised purpose and minimum necessary scope.

## 10. Relationship to Evidence, Outcomes, and State

D2/D8/D21/D22/D26/D27/D43 remain controlling. Context is not evidence of learning, assessment, misconception, achievement, readiness, progression, mastery, or state. A support need or preference cannot be used as a proxy for mathematical capability.

An observed interaction under an accommodation may be valid evidence of the observed interaction only where D21 conditions are met; the accommodation context must not be used to overinterpret or underinterpret the evidence. Any achieved-outcome claim must remain grounded in qualified evidence and authorised interpretation, not in context metadata.

## 11. Context Lifecycle and Change

The lifecycle is:

> **declaration/proposal → authority/source review → purpose/scope determination → recording → prospective use → review → correction/restriction/expiry/revocation → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Declaration/proposal** | Context is stated or suggested. | No fact, diagnosis, choice, or state. |
| **Review** | Source, scope, purpose, uncertainty, sensitivity, and authority are examined. | Review is not validation of all meaning. |
| **Recording** | Context and provenance are preserved. | Storage does not create authority. |
| **Prospective use** | Permitted context informs named adaptation/delivery/support. | No learner state or consent. |
| **Correction/restriction** | Future use/status is changed. | No historical rewrite. |
| **Expiry/revocation** | Future reliance ends or narrows. | No retroactive invalidation. |

Context must be re-reviewed when its purpose, source, scope, sensitivity, representation, formal delivery conditions, or learner circumstances change materially.

## 12. Conflict and Fail-Closed Rules

Context conflicts may concern learner declaration, representation, privacy, source, sensitivity, purpose, accessibility, accommodation, preference, identity, context, delivery, evidence, assessment, AI, adaptation, outcomes, or state. Conflict creates no permission to infer a convenient learner attribute or choose an unrequested path.

No precedence may be inferred from institutional role, provider status, account access, AI confidence, prior adaptation, frequent use, silence, delivery failure, learner performance, or technical capability.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Context source, subject, purpose, scope, or authority is unclear | Do not use for consequential adaptation/delivery/support. |
| Preference and explicit learner choice differ | Preserve both; D1 explicit choice controls path/commitment. |
| Accommodation request conflicts with representative/institutional claim | Preserve claims; apply D19/D20/D24 and fail closed for consequential use. |
| Inferred context lacks review/authority | Treat as proposal; no consequential use. |
| Context appears sensitive or overbroad for the purpose | Minimise/restrict; do not disclose or reuse. |
| Context change affects active experience | Re-evaluate executability under D23; no automatic continuation. |
| Context is used as evidence/outcome/state proxy | Reject the inference; apply D2/D8/D21/D22/D27/D43. |
| Context is stale, disputed, revoked, or expired | Do not use for new consequential action; preserve history. |

Fail-closed behaviour must not create a learner limitation, diagnosis, state, outcome, consent, choice, evidence, or adaptation authority.

## 13. Historical Protection

D44 must never rewrite, delete, conceal, or retroactively relabel learner declarations, preferences, accommodation requests, support conditions, observations, inferences, adaptations, deliveries, choices, evidence, interpretations, outcomes, state, or provenance.

A later correction, expiry, restriction, revocation, changed circumstance, or new accommodation affects future use only through explicit authority. It cannot make a historical delivery condition, support request, learner choice, observation, or outcome not have occurred.

## 14. Relationship to D1–D43

D44 is subordinate to every locked decision and creates no exception.

| Decision | D44 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Preferences, accommodations, context, or adaptation cannot infer `select-offer`, consent, or commitment. |
| **D2 — Learning-State Authority** | Context does not create learner state or authoritative capability. |
| **D3–D4 — Curriculum and Academic Progression** | Context may inform access/support but cannot create curriculum or progression authority. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Context does not alter content truth or experience lifecycle without authority. |
| **D8 — Assessment & Evidence** | Context is not assessment evidence or scoring authority. |
| **D9–D11 — Decisioning, Publication, and Policy Lifecycle** | Context cannot activate policy/content/curriculum or bypass deterministic policy. |
| **D12–D13 — History, Version, Migration** | Context changes are additive/prospective; no history rewrite or inferred equivalence. |
| **D14 — AI Proposal** | AI-inferred context is proposal-only and cannot become learner attribute/authority. |
| **D15–D18 — Delegation, Governance, Interpretation, Conflict** | Context source/review/action requires explicit recognition; conflict creates no inference. |
| **D19–D20 — Data and Rights** | Context use requires purpose, minimisation, privacy, disclosure, and representation authority. |
| **D21–D22 — Evidence and Conclusions** | Context is not qualified evidence, achievement, conclusion, or state. |
| **D23–D24 — Continuity and Delegated Choice** | Context changes do not automatically resume experiences or create delegated choice. |
| **D25 — Policy Relationships** | Context compatibility does not create policy equivalence or applicability. |
| **D26–D28 — Interpretation, State, Adaptation** | Context cannot become interpretation, misconception, state, or adaptation authority. |
| **D29–D30 — Delivery and Execution** | Delivery/technical execution cannot create learner context truth or choice. |
| **D31–D32 — Conformance and Release** | Conformance/release cannot create context authority or learner claims. |
| **D33–D34 — Incident and Data Protection** | Incident/data actions do not create context meaning or permit overbroad disclosure. |
| **D35 — Identity/Authentication/Access** | Authentication/access does not establish learner context, preference, or accommodation authority. |
| **D36 — Context/Tenant Isolation** | Organisational context is distinct from learner context. |
| **D37 — External Integration** | Provider/client exchange does not create learner context or accommodation authority. |
| **D38 — Constitutional Integrity** | Context implementation cannot reinterpret the constitution. |
| **D39 — Implementation Authorisation** | Implementation permission cannot invent context categories or use. |
| **D40–D42 — Mathematical Claim/Context/Source Authority** | Context does not create mathematical truth, formal context, or source authority. |
| **D43 — Pedagogical Intent & Outcome Claims** | Context cannot turn intent, delivery, completion, or wording into achievement or state. |

## 15. Prohibited Behaviours

15.1. Treating a preference, accommodation request, support need, language choice, temporary circumstance, delivery condition, or inferred attribute as learner consent, choice, diagnosis, capability, limitation, evidence, outcome, or state.

15.2. Treating delivery capability, device/client availability, interaction failure, or communication mode as a general learner limitation or mathematical inability.

15.3. Inferring sensitive learner context from silence, behaviour, response time, modality, performance, non-completion, or technical metadata without explicit authority and review.

15.4. Using context for a new purpose, disclosure, assessment, AI task, adaptation, state operation, or learner-facing claim without purpose-bound authority.

15.5. Allowing a representative, institution, provider, AI, client, system, or authenticated actor to create or broaden learner-context authority through access or metadata.

15.6. Treating preference as explicit learner choice or treating accommodation/support as permission to choose a path, focus, offer, or continuation.

15.7. Treating context as a proxy for mastery, readiness, progression, misconception, achievement, diagnosis, or competence.

15.8. Silently making an accommodation permanent, making a temporary context durable, or generalising a current interaction condition to the learner’s identity or capability.

15.9. Resolving context conflicts through recency, institutional status, AI confidence, provider trust, technical convenience, learner performance, or flattering/deficit-based inference.

15.10. Rewriting historical context, support, delivery, choices, evidence, outcomes, state, decisions, or provenance after correction, restriction, expiry, or revocation.

15.11. Implementing learner-context, accessibility, accommodation, preference, inference, persistence, AI, UI/API, delivery, assessment, or any other functionality from D44.

## 16. Explicit Deferrals

D44 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific accessibility standards, accommodations, disability/medical categories, diagnoses, eligibility, and legal obligations | D44 is not clinical, legal, or accessibility certification authority. |
| Specific learner-context taxonomy, preference vocabulary, sensitivity classification, retention period, or review threshold | These require purpose- and domain-specific governance. |
| Who may recognise, verify, approve, or revoke an accommodation or support condition | D15/D16/D20/D24 require explicit recognition; D44 names none. |
| Adaptation algorithms, classifiers, device detection, client implementation, UI/API, storage, and delivery technology | D44 is implementation-independent. |
| Assessment, mathematical capability, misconception, mastery, readiness, progression, state, AI, provider, content, policy, and curriculum semantics | D1–D43 remain controlling; context does not create them. |
| Language/translation standards, communication modalities, assistive technologies, and service-level requirements | These require separate delivery/accessibility governance. |
| Slice 6 scope and implementation authorisation | D44 is a governance boundary, not implementation approval. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D44 at this stage.**

If D44 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for context category, source, declaration, observation, inference, preference, accommodation request, support condition, temporary circumstance, sensitivity, purpose, scope, authority, uncertainty, review status, expiry, restriction, revocation, adaptation use, delivery effect, representation, provenance, conflict, and historical applicability.

Future contracts must not encode preference as choice, accommodation as diagnosis, delivery capability as learner limitation, context as state, inference as fact, or support as achieved outcome. They must preserve purpose/minimisation, source/derived, current/historical, and declared/inferred distinctions and fail closed when context, authority, sensitivity, purpose, scope, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, accessibility, AI, UI/API, or repository changes.

## 18. Implementation Freeze

> **No implementation may begin on the basis of D44.**
>
> D44 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, learner-context system, accessibility system, accommodation system, assessment, AI, UI/API, delivery runtime, D45, or Slice 6 work. Any future implementation requires explicit human approval of D44 and a separate controlled implementation authorisation for an exact scope.

## 19. Approval Recommendation

D44 is presented for human architectural review as the learner-context boundary required after the complete D1–D43 authority chain. It protects the distinction between declared preference, accessibility/accommodation request, support condition, temporary circumstance, observed interaction condition, inferred context, learner choice, evidence, outcome, and learner state.

> **D44 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, learner-context system, accessibility system, accommodation system, assessment, AI, UI/API, delivery runtime, D45, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
