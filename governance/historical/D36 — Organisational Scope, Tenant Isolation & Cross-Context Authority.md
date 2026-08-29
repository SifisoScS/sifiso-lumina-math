# D36 — Organisational Scope, Tenant Isolation & Cross-Context Authority

> **D36 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D35 are preserved exactly as approved and locked. D36 authorises no code, contract, repository, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, assessment, AI, UI/API, delivery runtime, D37, or Slice 6 work.

## 1. Post-D35 Dependency Analysis

D35 establishes the boundary for identity claims, authentication, actor/session binding, service identity, access decisions, credentials, representation, and revocation. It explicitly distinguishes technical access from authority. It does not, however, define the **organisational, tenant, workspace, institutional, project, or other context boundary within which an identity, authority, data right, policy, content, learner record, or command is valid**.

D19/D20 govern data-subject association, privacy, access, use, disclosure, and representation. D15 governs recognised actors and delegation. D35 governs authentication and technical access. D34 governs lifecycle and data protection. The remaining gap is whether a technically authenticated and recognised actor is acting in the correct governed context, and whether a record or authority may cross that context boundary.

The single highest-priority unresolved governance boundary is therefore **Organisational Scope, Tenant Isolation & Cross-Context Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D15 — Delegation & Actor Recognition** | Identity, role, trust, and delegation do not independently grant authority. | Which organisational/context scope an actor is recognised within and whether authority may cross it. |
| **D19/D20 — Data and Representation Rights** | Data-subject association, privacy, representation, and disclosure are explicit. | Whether a right applies to one tenant/context or can lawfully/authoritatively cross contexts. |
| **D34 — Data Lifecycle & Protection** | Purpose, retention, deletion, restriction, disclosure, and derived records are bounded. | How lifecycle and protection behave across organisational/context boundaries. |
| **D35 — Identity, Authentication & Access** | Authentication/access are distinct from authority. | The contextual binding required before access can be considered valid for a particular scope. |
| **D30–D32 — Execution and Operational Effectiveness** | Commands, effects, releases, deployments, and execution remain scoped and prospective. | How an operational effect is prevented from crossing a context boundary without authority. |
| **D31/D33 — Conformance and Incident Response** | Conformance and incidents are scoped and fail closed. | How cross-context leakage, conflicting authority, or tenant contamination is detected and governed. |

This is the next priority because access control without contextual isolation can still expose or apply the right operation in the wrong organisational scope. A valid login, recognised actor, effective policy, authorised content item, or technically correct command cannot safely be used until the system knows **which governed context it belongs to and whether that context is allowed to interact with the target**. Without D36, future persistence, API, assessment, AI, delivery, governance review, or operational execution could allow cross-learner, cross-institution, cross-workspace, cross-policy, or cross-tenant leakage or authority expansion.

D36 does not assume that Math Lumina must be multi-tenant. It governs the boundary condition: if more than one organisational, institutional, workspace, project, provider, or governance context exists, each context and every cross-context operation must be explicit. If the approved scope has only one context, that must be an explicit bounded decision rather than an accidental assumption.

## 2. Purpose

D36 defines the authority semantics for organisational/context identity, tenant/workspace scope, data and policy isolation, cross-context access, cross-context delegation, context membership, context transfer, context merger/split, and context conflict.

> **Authentication identifies a claimant; context binding identifies where the claim applies. Neither creates authority to cross a boundary. Technical reachability is not cross-context permission.**

D36 ensures that identity, access, data, policy, content, learner records, evidence, state, commands, events, incidents, and releases remain bounded to their authorised context and that cross-context operations are explicit, purpose-bound, reviewable, and fail closed when unresolved.

## 3. Scope

D36 governs the conceptual boundaries among data subjects, learners, governance actors, institutions, tenants, workspaces, projects, providers, environments, policies, and records. It covers context identity, membership/association, authority scope, isolation, cross-context access/use/disclosure, delegation, transfers, merges/splits, conflict, provenance, historical protection, and fail-closed handling.

| Within D36 | Outside D36 |
|---|---|
| Context/tenant identity, membership, isolation, scope, cross-context authority, and context lifecycle | Multi-tenant database design, network isolation, infrastructure, APIs, authentication products, deployment technology, or UI |
| Relationship between context boundaries and D1–D35 authority | Legal institutional status, jurisdiction, contracts, data-protection law, or compliance certification |
| Cross-context data/policy/content/command/event/authority handling | Educational content, assessment, AI, state, adaptation, delivery, or policy semantics |
| Context transfer/merge/split semantics at governance level | Migration implementation, schema, persistence, backup, or runtime orchestration |

D36 creates no tenant, institution, workspace, membership, provider, or cross-context authority by assertion.

## 4. Authority Model

A **governed context** is a named, versioned, purpose-bound scope within which specified identities, records, policies, content, authorities, commands, events, and operations may be valid. “Context” may refer to an institution, tenant, workspace, project, deployment environment, provider boundary, governance domain, or another explicitly authorised scope; D36 does not select which model applies.

A **context association** is an explicit relation between an actor/data subject/record/policy/resource and a governed context. It is not proof of membership, authority, consent, ownership, or legal status.

A **context membership/recognition** is an explicit, current, scope-bound determination that an actor or service is recognised within a context for named purposes. It is separate from identity and authentication.

A **cross-context operation** is an access, use, disclosure, command, transfer, policy relationship, content relationship, execution, review, or other action involving more than one governed context. It requires explicit authority for the exact operation and cannot be inferred from membership in either context.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Context identity** | A bounded named scope with purpose/lifecycle. | Legal status, authority, or isolation technology. |
| **Association** | Record/actor/resource is related to a context. | Membership, ownership, consent, or cross-context rights. |
| **Membership** | Actor/service is recognised within a context for defined scope. | Universal authority or learner/data-subject rights. |
| **Isolation** | Operations/data are constrained to the authorised context. | Absolute security certification or legal compliance. |
| **Cross-context operation** | Action touches multiple governed contexts. | Permission merely from local access. |
| **Context transfer** | A governed prospective relationship changes context. | Historical rewrite or automatic migration. |
| **Context merge/split** | Context boundaries are changed prospectively by explicit governance. | Equivalence, inherited authority, or historical combination. |
| **Context conflict** | Competing/ambiguous context claims or boundaries exist. | Precedence or permission to choose convenience. |

## 5. Context Binding and Isolation

Every consequential operation must be bound to a target context, source context where relevant, actor/service context, purpose, scope, period, authority, policy/version, data rights, and provenance. A missing or ambiguous context binding is a consequential unresolved condition.

A technical access decision is valid only if the authenticated actor/session/service is recognised for the target context and operation. Access in one context does not imply access in another. A context administrator, provider, reviewer, educator, representative, or service identity does not automatically gain cross-context authority.

Isolation must cover not only primary learner records but also evidence, interpretations, conclusions, state, choices, offers, experience instances, commands, events, incidents, logs, exports, caches, backups, derived data, AI inputs/outputs, policies, content, versions, and provenance. Technical separation is not the same as governance separation; conversely, a shared technical store does not make contexts equivalent or mutually accessible.

## 6. Cross-Context Operations

Cross-context access/use/disclosure/execution may be permitted only through an explicit, purpose-, scope-, subject-, recipient-, policy-, version-, and time-bound authority. The operation must identify each source/target context, the data/resource/action boundary, the authority basis, the responsible actor, and the historical/provenance implications.

Cross-context operation categories include: data disclosure/export; governance review; delegated representation; provider/service processing; assessment observation; policy/content relationship; learner/context transfer; institutional reporting; incident response; and migration/merge/split. Category labels do not create authority.

| Cross-context action | Required separate consideration |
|---|---|
| **Read/use** | Purpose and target-context authority; local membership is insufficient. |
| **Disclosure/export** | Recipient authority, minimisation, provenance, restrictions, and D19/D20/D34 conditions. |
| **Command/execution** | D30 exact effect binding and authority in every affected context. |
| **Policy/content relationship** | D11/D13/D25 applicability/equivalence/compatibility; no inferred precedence. |
| **Assessment/provider processing** | D8/D21/D26 plus context-specific data authority; source trust is not enough. |
| **Representation/delegation** | D15/D24 explicit representative scope in both relevant contexts. |
| **Transfer/merge/split** | Prospective governance, historical protection, explicit migration/equivalence review. |
| **Incident response** | D33 response authority and D19/D20/D34 disclosure limits; urgency does not create universal access. |

## 7. Context Lifecycle and Change

A context may be proposed, recognised, active, restricted, suspended, transferred, merged, split, retired, or otherwise governed, but D36 does not establish a default lifecycle or authority for any status. Context lifecycle changes are distinct from learner/record/policy/content/experience lifecycle.

A context change must not silently move learner records, evidence, interpretations, conclusions, state, choices, policies, content, commands, events, or provenance into a new scope. Any transfer, merge, split, or re-association requires explicit authority, purpose, scope, version/equivalence treatment under D13/D25, data-right treatment under D19/D20/D34, and prospective execution under D30/D32.

Historical context association remains historical. A later context change cannot make a prior action have occurred in a different context or grant a new context authority over a prior record without an explicit governed relationship.

## 8. Context, Learner Choice, and Representation

D1 remains controlling. Context membership, institutional status, account access, enrolment/association, representative status, organisational instruction, or context transfer cannot become learner consent or `select-offer`.

D24 remains controlling. A representative may act for a learner only under explicit, current, purpose- and scope-bound learner-choice representation. Representation in one context does not automatically extend to another context, and data-subject representation does not automatically grant learner-choice representation.

A context administrator or institution cannot silently choose a path, focus, offer, experience, or continuation for a learner unless a separate D1/D24-authorised choice basis exists. Cross-context data access is not cross-context learner-choice authority.

## 9. Context and Data Protection

D19/D20/D34 remain controlling. Context association and membership do not create data-subject identity, access, use, disclosure, retention, deletion, correction, or representation authority. Data lifecycle actions must remain purpose/minimisation-bound across every context and technical copy.

A cross-context recipient may use only the disclosed data for the authorised purpose. Derived records, analytics, model inputs, reports, exports, backups, caches, and incident records must preserve source context, target context, purpose, authority, restrictions, and provenance. The target context cannot silently become the owner or unrestricted custodian of the data.

If a data-right request conflicts across contexts, the claims remain explicit and unresolved until a recognised authority determines the permitted prospective action. Technical centralisation does not resolve the conflict.

## 10. Context and Educational/Operational Authority

Curriculum, content, knowledge relationships, policies, assessment sources, interpretations, conclusions, states, adaptations, responses, delivery, commands, events, and releases are context-bound where their authority says they are. A relationship across contexts is not valid merely because identifiers or labels match.

A policy effective in one context does not automatically apply in another. A content item active in one context does not automatically become active in another. A state commitment, assessment source, adaptation, offer, experience, delivery action, or command cannot cross context boundaries without the relevant authority and current compatibility/equivalence conditions.

A context may constrain available options, but it cannot create mathematical truth, learner state, consent, or universal authority. Context metadata, tenant IDs, workspace labels, provider names, and environment variables are not authority by themselves.

## 11. Conflict and Fail-Closed Rules

Context conflicts may concern identity, membership, representation, data rights, learner choice, policies, versions, content, evidence, state, experiences, delivery, commands, events, incidents, releases, or historical records. A context conflict creates no cross-context access or authority.

No precedence may be inferred from central storage, shared provider, global administrator role, account identity, recency, matching labels, technical reachability, institutional seniority, data volume, AI confidence, deployment environment, or convenience. D18 remains supreme.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Target/source context is missing or ambiguous | No consequential access/use/disclosure/execution. |
| Actor is authenticated but not recognised for target context/action | Deny/restrict the operation; authentication does not suffice. |
| Membership/representation/authority claims conflict | Preserve claims; no cross-context action. |
| Policy/content/version relationship across contexts is unresolved | Do not apply, substitute, activate, or migrate across contexts. |
| Cross-context data-right, disclosure, retention, or deletion status is unresolved | Do not process beyond known permitted scope. |
| Context transfer/merge/split is proposed without explicit authority/equivalence | No transfer or historical combination. |
| Context incident requires response but recipient/authority is unclear | Apply only the narrowest authorised restriction; otherwise stop and escalate. |
| Historical context/provenance is unavailable or contradictory | Do not reconstruct; fail closed under D12/D18/D30. |

Fail-closed behaviour must be non-disclosive beyond known authority, non-mutating to educational/history records, non-consensual, non-choice-making, prospective, and provenance-rich.

## 12. Historical Protection

D36 must never rewrite, delete, conceal, merge, or retroactively relabel context associations, membership, identity, access, disclosures, records, policies, content, evidence, interpretations, conclusions, states, choices, commands, events, incidents, releases, executions, or provenance.

A transfer, merger, split, restriction, retirement, or re-association may affect future access and applicability through explicit authority only. It cannot make prior actions occur in a new context, make unauthorised cross-context access authorised after the fact, or erase the fact that a disclosure/operation crossed a boundary.

## 13. Interaction with D1–D35

D36 is subordinate to every locked decision and creates no exception.

| Decision | D36 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Context membership, organisational instruction, access, or transfer cannot infer `select-offer` or consent. |
| **D2 — Learning-State Authority** | Context does not create learner-state authority. |
| **D3–D4 — Curriculum and Academic Progression** | Context may scope curriculum/level but cannot create mathematical truth or automatic progression. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Context boundaries constrain content/experience authority; shared labels do not establish equivalence or lifecycle transfer. |
| **D8 — Assessment & Evidence** | Context/provider/source identity does not automatically qualify evidence. |
| **D9 — Decisioning & Policy** | Decisioning may use only context-valid inputs/policy; context metadata does not create policy authority. |
| **D10–D11 — Publication/Activation and Policy Lifecycle** | Activation/applicability remains context-bound and explicit. |
| **D12 — Durable History & Storage** | Storage/centralisation does not erase context boundaries or create cross-context authority. |
| **D13 — Version/Migration** | Context transfer/merge/split cannot infer equivalence or silently migrate history. |
| **D14 — AI Proposal** | AI/provider access across contexts requires explicit purpose/scope authority; AI cannot resolve context authority. |
| **D15–D16 — Delegation and Governance Action** | Actor recognition/action is context- and scope-bound; context membership is not authority. |
| **D17 — Interpretation Review** | Review access across contexts cannot rewrite learner records or create interpretation authority. |
| **D18 — Conflict Resolution** | Cross-context conflict creates no precedence; unresolved consequential conflict fails closed. |
| **D19–D20 — Data and Representation Rights** | Context membership is not data-subject authority; cross-context disclosure requires explicit rights/purpose. |
| **D21 — Source/Evidence Sufficiency** | Source context and membership do not automatically qualify evidence. |
| **D22 — Conclusion/State Commitment** | State conclusions/commitments cannot cross context without explicit authority and prospective execution. |
| **D23 — Experience Continuity** | Context change can affect current executability; no automatic continuation/transfer/resumption. |
| **D24 — Delegated Choice** | Representative authority is context- and scope-bound; data representation does not become learner choice. |
| **D25 — Policy Relationships** | Cross-context policy equivalence/compatibility/precedence is not inferred from shared identity or labels. |
| **D26 — Semantic Interpretation** | Context records do not create interpretation/misconception authority. |
| **D27 — State Semantics** | Context transfer or shared storage does not create authoritative state or state migration. |
| **D28 — Adaptation & Learning Response** | Context does not create adaptation/response authority or silent learner redirection. |
| **D29 — Delivery & Interaction** | Delivery/client/provider access does not create cross-context choice, learning, evidence, or state. |
| **D30 — Command/Event/Execution** | Commands/effects/events require exact source/target context authority; technical reachability is insufficient. |
| **D31 — Conformance/Verification** | Conformance must verify context isolation/cross-context rules for exact scope; conformance does not grant cross-context authority. |
| **D32 — Release/Deployment/Change Effectiveness** | Release/deployment cannot silently change context scope, isolation, or cross-context applicability. |
| **D33 — Monitoring/Incident/Safety Response** | Incident urgency does not create unrestricted cross-context access, disclosure, or response authority. |
| **D34 — Data Lifecycle/Protection** | Context does not expand retention, disclosure, deletion, export, or recovery authority. |
| **D35 — Identity/Authentication/Access Control** | Authentication/access must bind to the correct context; technical access is not cross-context authority. |

## 14. Prohibited Behaviours

14.1. Treating a tenant/workspace/institution/project/provider/environment identifier, account, role, membership, credential, token, or storage location as automatic authority.

14.2. Treating authentication or local context access as permission to access, use, disclose, execute, review, or alter another context.

14.3. Inferring context equivalence, merger, transfer, membership, representation, policy applicability, content activation, learner choice, state, evidence, or authority from matching labels, identifiers, schemas, providers, or technical centralisation.

14.4. Silently moving, copying, merging, splitting, migrating, exporting, synchronising, or deriving learner records, evidence, interpretations, conclusions, state, choices, policies, content, commands, events, incidents, or provenance across contexts.

14.5. Treating institutional/tenant administration, provider trust, global access, service identity, or incident status as unrestricted cross-context authority.

14.6. Treating cross-context data access or representation as learner-choice authority, or treating context transfer as consent, `select-offer`, or learner commitment.

14.7. Allowing a context, provider, client, AI system, storage system, release system, or technical access-control mechanism to authorise itself across a boundary.

14.8. Resolving context, membership, representation, policy, data-right, version, evidence, state, or historical conflicts through recency, central storage, matching metadata, institutional status, technical reachability, AI confidence, or convenience.

14.9. Treating cross-context technical failure, missing access, context mismatch, or denied operation as learner failure, refusal, abandonment, or state.

14.10. Rewriting historical context association, access, disclosure, command, event, effect, choice, evidence, conclusion, state, incident, release, or provenance after a transfer, merge, split, correction, or deletion.

14.11. Implementing tenant/context isolation, cross-context access, transfer, merge, split, federation, persistence, API, identity, or any other functionality from D36.

## 15. Explicit Deferrals

D36 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Whether Math Lumina will be single-context, multi-tenant, institutional, workspace-based, or another model | D36 governs boundaries without assuming a product topology. |
| Legal institutional status, contracts, jurisdiction, data residency, and regulatory requirements | D36 creates no legal authority or compliance determination. |
| Exact context types, identifiers, membership rules, role matrices, provider federation, and trust levels | These require future purpose- and scope-specific governance. |
| Database/network/storage isolation, encryption, backup, APIs, identity federation, and infrastructure | D36 is implementation-independent. |
| Data-retention/deletion schedules, breach response, safeguarding, and privacy operations | D19/D20/D33/D34 remain controlling; operational rules require separate governance. |
| Policy/content/evidence/state/assessment semantics across contexts | D1–D35 remain controlling; context does not create educational authority. |
| Context transfer, merge, split, migration, equivalence, and reconciliation mechanics | D13/D25/D30 constrain them; no implementation or migration is authorised. |
| Slice 6 scope and implementation authorisation | D36 is a governance boundary, not implementation approval. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D36 at this stage.**

If D36 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for context identity, association, membership, actor/service binding, source/target context, purpose, scope, policy/version, data rights, cross-context authority, transfer/merge/split status, access decision, disclosure, command, event, effect, incident, conflict, provenance, historical context, expiry, revocation, and outcome.

Future contracts must not encode context ID as authority, membership as representation, local access as cross-context permission, shared storage as equivalence, transfer as consent, or context migration as historical rewrite. They must fail closed when source/target context, authority, purpose, data rights, policy/version, provenance, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, identity, access-control, API, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin on the basis of D36.**
>
> D36 authorises no code, contract change, repository change, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, context/tenant system, assessment, AI, UI/API, delivery runtime, D37, or Slice 6 work. Any future implementation requires explicit human approval of D36 and a separate controlled implementation authorisation for an exact scope.

## 18. Approval Recommendation

D36 is presented for human architectural review as the organisational/context boundary required after identity, authentication, access, and data-protection governance. It preserves D1–D35, distinguishes local access from cross-context authority, prevents accidental tenant/context leakage and authority expansion, and requires explicit, prospective, provenance-rich, fail-closed treatment of context relationships and changes.

> **D36 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, context/tenant system, assessment, AI, UI/API, delivery runtime, D37, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
