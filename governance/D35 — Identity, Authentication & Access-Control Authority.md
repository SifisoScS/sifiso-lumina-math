# D35 — Identity, Authentication & Access-Control Authority

> **D35 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D34 are preserved exactly as approved and locked. D35 authorises no code, contract, repository, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, assessment, AI, UI/API, delivery runtime, D36, or Slice 6 work.

## 1. Post-D34 Dependency Analysis

D34 establishes the data lifecycle, retention, deletion, restriction, correction, export, disclosure, recovery, and data-protection operations boundary. It deliberately does not decide how a technical or organisational system establishes identity, authenticates a claimant, grants or denies access, recognises a service, or binds an authenticated session to a governed actor, data subject, representative, learner, reviewer, or execution authority.

D15 distinguishes identity, title, trust, storage, and recognition from authority. D19/D20 distinguish data-subject association and information access from technical access. D24 distinguishes representative identity/action from learner choice. D30 distinguishes commands and events from authority. D34 distinguishes data custody from data-subject authority. The remaining gap is therefore the authority boundary for **identity claims, authentication assurance, actor binding, session/credential scope, access decisions, and revocation**.

The single highest-priority unresolved governance boundary is **Identity, Authentication & Access-Control Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D15 — Delegation & Governance-Actor Recognition** | Identity, title, trust, storage, and AI do not independently grant authority; delegation is explicit. | How a claimed identity is established, authenticated, bound to an actor, and kept distinct from authority. |
| **D19 — Data-Subject Identity & Information Access** | Data-subject association and access/use/disclosure authority are distinct. | How technical access is controlled without being mistaken for data-subject or educational authority. |
| **D20 — Privacy & Data-Subject Rights** | Privacy, representation, minimisation, disclosure, and rights are explicit. | How an authenticated claimant may request or receive access without automatically proving rights or representation. |
| **D24 — Learner Representation & Delegated Choice** | Representative action and learner choice are separately scoped and recorded. | How access/session identity is bound to the representative without granting learner-choice authority by authentication. |
| **D30 — Command/Event/Execution** | Commands, effects, events, and execution remain distinct. | How an authenticated submitter may issue a command without authentication becoming execution authority. |
| **D34 — Data Lifecycle & Protection** | Data custody, retention, restriction, deletion, export, and disclosure are governed. | How identity/access controls enforce those boundaries without creating them. |

This is the next priority because any persistence, client, API, external assessment, AI input, governance review, data-subject request, command, delivery action, or operational execution requires a trustworthy relationship between a claimant and a bounded actor/session. Without D35, credentials, account identifiers, tokens, service identities, role names, authenticated sessions, or access-control grants could be treated as proof of identity, representation, learner consent, governance authority, data rights, or execution permission.

D35 is not an authentication implementation, identity provider selection, security standard, legal identity determination, or access-control system. It is the governance boundary that specifies what identity/authentication/access decisions mean and, critically, what they do not mean.

## 2. Purpose

D35 defines the authority semantics for identity claims, identity assurance, authentication, actor/session binding, service identity, access decisions, credential/session lifecycle, revocation, impersonation/delegation boundaries, and audit/provenance of access actions.

> **Authentication is not authority. Access is not consent. A role label is not recognition. A credential is not learner identity. A token is not a governance decision.**

D35 ensures that technical access can enforce already authorised boundaries without creating data-subject, learner, representative, governance, educational, policy, execution, or state authority.

## 3. Scope

D35 governs the conceptual boundary between a claimed identity, an authenticated claimant, an actor, a session, a service, an access decision, and an authorised action. It covers assurance, binding, scope, purpose, expiry, revocation, impersonation, delegated access, service-to-service access, access review, and historical recording.

| Within D35 | Outside D35 |
|---|---|
| Identity claim, authentication assurance, actor/session binding, access decision, credential lifecycle, revocation, and provenance | Authentication protocols, identity providers, password/biometric technology, cryptography, databases, infrastructure, API, UI, or deployment implementation |
| Distinction between technical access and data/learner/governance authority | Legal identity, age/capacity/guardianship determination, privacy law, institutional employment status, or security certification |
| Scope/purpose/time-bound access and fail-closed handling | Educational authority, assessment, AI, policy, content, curriculum, state, learner choice, or execution authority |
| Service identity and delegated/impersonated access boundaries | Specific role-permission matrices, credentials, login flows, or access-control product selection |

D35 does not approve any identity provider, credential type, role, actor, representative, authentication level, access rule, or real-world identity claim.

## 4. Authority Model

An **identity claim** is an assertion that a claimant, person, organisation, service, or system corresponds to a named identity. It is a claim requiring a defined assurance basis; a string, account, credential, or provider record is not self-proving.

An **authentication result** is a bounded determination that a claimant satisfied a defined authentication procedure at a stated time and assurance level. It is not proof of legal identity, authority, consent, representation, learner choice, or educational role beyond its stated scope.

An **actor binding** relates an authenticated claimant/session/service to a recognised actor record for a stated purpose and period. D15 governs recognition; D35 does not itself recognise the actor.

An **access decision** is an explicit determination that an authenticated actor/session may perform a named data/system operation for a stated purpose, scope, recipient, and period. Access does not grant the underlying authority; it must enforce already authorised boundaries.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Identity claim** | Assertion of correspondence to a named identity. | Truth, authority, consent, representation, or learner identity. |
| **Authentication** | Result of a bounded claimant-verification procedure. | Legal identity, governance recognition, data rights, or choice. |
| **Actor binding** | Association of authenticated claimant/session with an actor record. | Authority beyond recognised scope. |
| **Session/credential** | Technical mechanism representing a bounded authenticated context. | Indefinite identity, consent, role, or authority. |
| **Access decision** | Permission to perform a named technical operation. | Data-subject rights, educational authority, or execution authority. |
| **Service identity** | Identified system/provider acting within technical scope. | Human approval, AI authority, or learner choice. |
| **Impersonation/delegation** | Explicitly represented action on behalf of another where authorised. | Unrestricted representation or personal learner action. |
| **Revocation/expiry** | Prospective ending or narrowing of prior technical access. | Historical erasure or proof that prior access was invalid. |

## 5. Identity Assurance and Scope

An authentication assurance level is meaningful only for the stated purpose, threat/context assumptions, claimant type, time, and operation. D35 creates no universal assurance hierarchy. A strong authentication procedure for one purpose does not automatically establish legal identity, data-subject identity, governance-actor recognition, representative status, learner-choice authority, or execution authority for another purpose.

Every consequential access decision must identify the identity/actor basis, authentication result, assurance limitations, purpose, scope, data/system target, period, recipient, authority reference, and revocation/expiry condition. Where an identity or binding is unknown, ambiguous, stale, conflicting, or out of scope, access must fail closed.

| Identity context | Must remain separate from |
|---|---|
| Learner account/session identity | Data-subject rights, learner choice, state, consent, and educational authority |
| Data-subject identity | Legal identity, representative authority, governance role, and learner path choice |
| Governance actor identity | Approval/effectiveness/execution authority for every action |
| Representative identity | Proof of current representation or learner-choice authority |
| Service/provider identity | AI truth, policy/content authority, human approval, or learner consent |
| Reviewer identity | Acceptance of evidence, conformance, release, or governance action outside scope |

## 6. Authentication and Access Boundary

Authentication may establish that a claimant satisfied a defined technical procedure. It may support an access decision only when the decision’s authority, purpose, scope, data rights, role/recognition, and current context are independently established.

Access control may enforce a permitted boundary; it cannot create the boundary. A successful login, possession of a token, membership in a group, account ownership, or service credential does not authorise data disclosure, learner-choice action, state transition, assessment, AI processing, policy activation, command execution, or governance approval.

An access decision must be specific enough to distinguish read, use, disclose, create, propose, review, approve, activate, execute, correct, restrict, delete, export, restore, and administer actions. Broad “admin,” “trusted,” “internal,” “owner,” or “system” status must not be treated as universal authority.

## 7. Representation, Impersonation, and Delegation

D15, D19, D20, and D24 remain controlling. A claimant acting on behalf of another must be represented as a distinct actor with an explicit, current, purpose- and scope-bound representation basis. Authentication of the representative does not authenticate the represented person and does not prove that the representative may perform a particular data, learner-choice, governance, or educational action.

Impersonation, support access, break-glass access, service accounts, delegated access, and administrative access must be explicit and attributable. The system must preserve who authenticated, who acted, on whose behalf, under what authority, for what purpose, and with what limitations. A represented action must not be recorded as personal learner action.

D35 does not define legal guardianship, capacity, age, institutional mandate, or emergency representation. If those are consequential and unresolved, access/action fails closed or is escalated under recognised authority.

## 8. Service and Provider Identity

A service, provider, client, model, event system, storage system, or operational component may have a technical identity for bounded interaction. Technical identity does not grant mathematical, content, curriculum, policy, assessment, AI, learner-choice, state, data-subject, governance, or execution authority.

Provider authentication and service trust may support transport or access enforcement but cannot replace D14 human semantic review, D15 actor recognition, D16 governance action, D30 execution authority, or D34 data lifecycle authority. A service must not use its own successful authentication or deployment status to authorise itself.

## 9. Access Lifecycle

The lifecycle is:

> **identity claim → assurance review → authentication → actor/session binding → access decision → bounded use/action → observation/recording → review → expiry/revocation/restriction → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Identity claim** | A correspondence assertion exists. | Not identity truth or authority. |
| **Assurance review** | The claim/procedure is assessed for purpose/scope. | Not actor recognition or access. |
| **Authentication** | A claimant satisfied a defined procedure. | Not consent, role, representation, or execution. |
| **Binding** | Session/claimant is associated with a recognised actor context. | Not authority beyond context. |
| **Access decision** | A named operation is permitted/denied for scope/time. | Not underlying data or governance authority. |
| **Use/action** | The permitted technical operation is attempted/applied. | Not learner choice, learning, state, or truth. |
| **Recording** | Identity/access/action facts are preserved. | Not approval or historical infallibility. |
| **Expiry/revocation/restriction** | Future access is ended/narrowed. | Not historical erasure or retroactive invalidation. |

Authentication status must not silently outlive its assurance period, purpose, session, actor binding, or revocation condition.

## 10. Privacy, Data Lifecycle, and Disclosure

D19, D20, and D34 remain controlling. Authentication/access may enforce a data-right decision but cannot create data-subject authority, consent, retention authority, disclosure permission, deletion authority, or representation.

Access must be minimised to the authorised purpose and scope. Technical logs, access records, credentials, tokens, session metadata, and security telemetry are themselves data representations subject to D34 lifecycle governance. A security or administrative purpose does not automatically authorise educational use or AI input.

An authenticated recipient may receive only the authorised disclosure. Receipt does not grant permission to further disclose, derive, retain, combine, or use the data outside scope.

## 11. Learner Choice, Evidence, State, and Execution

D1 remains controlling: authentication, access, session continuation, UI controls, provider identity, technical acknowledgement, or account activity cannot become explicit learner choice or `select-offer`.

D8/D21/D26/D27 and D22 remain controlling: authentication and access do not make an observation qualified evidence, an interpretation, a conclusion, a misconception, a state claim, or a state commitment. D30 remains controlling: an authenticated command is not an authorised execution.

A reviewer’s authentication does not approve a proposal. A learner’s authentication does not prove consent to every use. A representative’s authentication does not create learner-choice authority. An administrator’s access does not create governance authority.

## 12. Conflict and Fail-Closed Rules

Identity/access conflicts may concern identity claims, authentication results, actor recognition, representation, data rights, purpose, recipient, permissions, policies, versions, commands, events, incidents, or historical records. Conflict creates no access, authority, consent, choice, or action permission.

No precedence may be inferred from account age, credential strength, provider trust, institutional role, group membership, administrator status, token recency, session continuity, storage location, prior access, AI confidence, operational urgency, or convenience. D18 remains supreme.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Identity claim or actor binding is ambiguous/conflicting | No consequential access or action. |
| Authentication succeeded but purpose/scope/authority is missing | No use/disclosure/action beyond safe technical handling. |
| Representation/impersonation status is unclear | Do not act for the represented person. |
| Credential/session is expired, revoked, stale, shared, or compromised | Deny/restrict future access; preserve the access fact; do not rewrite history. |
| Service/provider identity is unknown or out of scope | No consequential integration or execution. |
| Access decision conflicts with data rights or lifecycle status | Apply D19/D20/D34; fail closed and escalate. |
| Authenticated command lacks effective commitment/execution authority | Do not execute; preserve command/outcome. |
| Historical access/action records are unavailable or contradictory | Do not reconstruct authority; fail closed under D12/D18/D30. |

Fail-closed behaviour must deny or constrain consequential access/action, preserve provenance and history, avoid creating learner choice/state/evidence, and never convert authentication failure into learner failure or identity blame.

## 13. Historical Protection

D35 must never rewrite, delete, conceal, or retroactively relabel identity claims, authentication results, actor bindings, sessions, access decisions, disclosures, commands, events, executions, choices, evidence, conclusions, state, incidents, or provenance.

A later revocation, expiry, compromise finding, correction, or access restriction affects future reliance only through explicit authority. It does not prove that every historical action was invalid, nor does later authentication retrospectively authorise an earlier action. Corrections and access reviews are additive and prospective.

## 14. Interaction with D1–D34

D35 is subordinate to every locked decision and creates no exception.

| Decision | D35 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Authentication/access/session activity cannot infer `select-offer`, consent, preference, or commitment. |
| **D2 — Learning-State Authority** | Identity/access does not create learner-state authority. |
| **D3–D4 — Curriculum and Academic Progression** | A role/account cannot activate curriculum or progression authority. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Access does not create content/knowledge/experience authority or learning. |
| **D8 — Assessment & Evidence** | Authentication/access does not qualify assessment evidence. |
| **D9 — Decisioning & Policy** | Access control enforces permitted operations; it does not create policy/decision authority. |
| **D10–D11 — Publication/Activation and Policy Lifecycle** | Role/access/deployment cannot activate content/curriculum/policy. |
| **D12 — Durable History & Storage** | Access records/storage preserve history but create no authority; ambiguous history fails closed. |
| **D13 — Version/Migration** | Authentication/access does not infer version equivalence or migration. |
| **D14 — AI Proposal** | Provider/service authentication cannot make AI authoritative. |
| **D15–D16 — Delegation and Governance Action** | Authentication is distinct from actor recognition, delegation, approval, effectiveness, execution, and correction. |
| **D17 — Interpretation Review** | Reviewer authentication does not make an interpretation authoritative. |
| **D18 — Conflict Resolution** | Identity/access conflict creates no precedence or exception. |
| **D19–D20 — Data and Representation Rights** | Technical access is not data-subject authority, privacy permission, or representation. |
| **D21 — Source/Evidence Sufficiency** | Authenticated source does not automatically create qualified evidence. |
| **D22 — Conclusion/State Commitment** | Authentication/access does not create conclusions, commitments, effectiveness, or execution. |
| **D23 — Experience Continuity** | Session continuity/authentication does not authorise experience resumption or substitution. |
| **D24 — Delegated Choice** | Representative authentication does not itself establish delegated learner-choice authority. |
| **D25 — Policy Relationships** | Access does not infer policy equivalence, compatibility, precedence, activation, or migration. |
| **D26 — Semantic Interpretation** | Authenticated users/services cannot create interpretations or misconception authority. |
| **D27 — State Semantics** | Technical access/state writes do not create authoritative state. |
| **D28 — Adaptation & Learning Response** | Access identity does not create pedagogical adaptation or response authority. |
| **D29 — Delivery & Interaction** | Delivery/client authentication is not learner choice, learning, evidence, or state. |
| **D30 — Command/Event/Execution** | Authenticated command submission is not execution authority; events remain facts. |
| **D31 — Conformance/Verification** | Authentication/access controls are subject to conformance review; conformance does not grant identity authority. |
| **D32 — Release/Deployment/Change Effectiveness** | Deployment/provider/account status cannot create identity or access authority. |
| **D33 — Monitoring/Incident/Safety Response** | Incident urgency does not create unrestricted access, impersonation, disclosure, or action authority. |
| **D34 — Data Lifecycle/Protection** | Access enforcement is distinct from data-subject rights, retention, deletion, disclosure, and lifecycle authority. |

## 15. Prohibited Behaviours

15.1. Treating a username, account, credential, token, session, login, biometric result, provider assertion, role label, group membership, or technical access grant as automatic proof of identity, authority, consent, representation, learner choice, or educational role.

15.2. Treating authentication as governance-actor recognition, delegation, approval, policy activation, content activation, assessment authority, state authority, or execution authority.

15.3. Allowing an authenticated claimant, service, provider, client, administrator, or AI system to authorise itself or broaden its access through implementation.

15.4. Treating data access as data-subject rights, disclosure permission, retention authority, deletion authority, learner-choice authority, or representative authority.

15.5. Treating a representative/session/service identity as the personal learner action or as unrestricted authority to act for another person.

15.6. Using broad role/status labels such as administrator, owner, internal, trusted, system, educator, reviewer, or provider to bypass purpose, scope, authority, policy, privacy, representation, or learner-choice requirements.

15.7. Allowing session continuity, token refresh, technical reconnection, prior login, or account possession to create automatic experience resumption, offer acceptance, consent, preference, state, evidence, or execution.

15.8. Resolving identity, authentication, access, representation, or authority conflicts through recency, credential strength, provider trust, institutional status, storage order, AI confidence, urgency, or convenience.

15.9. Deleting, hiding, merging, or rewriting historical identity/access/action records to conceal a failed, unauthorised, duplicated, disclosed, or uncertain operation.

15.10. Treating authentication failure, access denial, timeout, expiry, revocation, compromise, or session loss as learner failure, refusal, abandonment, lack of competence, or state.

15.11. Implementing identity, authentication, access control, impersonation, session, credential, persistence, API, UI, or any other functionality from D35.

## 16. Explicit Deferrals

D35 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Identity provider, protocol, credential, password, biometric, cryptographic, session, token, and access-control technology | D35 defines authority semantics, not implementation. |
| Legal identity, age, capacity, guardianship, employment status, institutional membership, and jurisdictional recognition | D35 creates no legal or institutional identity authority. |
| Exact assurance levels, role-permission matrices, authentication factors, expiry periods, and compromise thresholds | These require purpose- and risk-specific future governance. |
| Specific actors, representatives, reviewers, administrators, service providers, and emergency authorities | D15–D16/D24 require explicit recognition; D35 names none. |
| Privacy, retention, deletion, disclosure, data-right, incident, safeguarding, and security procedures | D19–D20/D33/D34 remain controlling or require separate operational governance. |
| Assessment, AI, state, conclusion, adaptation, delivery, policy, content, curriculum, migration, and execution semantics | D1–D34 remain controlling; authentication/access cannot create these authorities. |
| Slice 6 scope and implementation authorisation | D35 is a governance boundary, not implementation approval. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D35 at this stage.**

If D35 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for identity claim, assurance, authentication result, actor binding, session/credential, service identity, representation/impersonation basis, access decision, purpose, scope, recipient, period, use/action, revocation, expiry, denial, disclosure, command, event, outcome, provenance, conflict, and historical record.

Future contracts must not encode authentication as authority, account access as data-subject rights, role labels as actor recognition, representative sessions as learner action, or technical access as execution permission. They must preserve purpose/scope/time limitations, unknown/partial/expired/revoked outcomes, and historical access/action facts. This is impact analysis only and does not authorise contract, code, schema, test, persistence, API, UI, or repository changes.

## 18. Implementation Freeze

> **No implementation may begin on the basis of D35.**
>
> D35 authorises no code, contract change, repository change, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity provider, authentication system, access-control system, API, UI, delivery runtime, D36, or Slice 6 work. Any future implementation requires explicit human approval of D35 and a separate controlled implementation authorisation for an exact scope.

## 19. Approval Recommendation

D35 is presented for human architectural review as the identity and access authority boundary required after data-protection operations governance. It preserves D1–D34, distinguishes identity claims, authentication, actor recognition, access, data rights, representation, consent, learner choice, governance authority, and execution, and requires fail-closed handling of unresolved identity or access conditions.

> **D35 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity provider, authentication system, access-control system, API, UI, delivery runtime, D36, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
