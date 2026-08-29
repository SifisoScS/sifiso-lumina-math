# D45 — Data-Subject Record Linkage, Identity Resolution & Record-Merge Authority

> **D45 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D44 are preserved exactly as approved and locked. D45 authorises no code, contract, repository, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D46, or Slice 6 work.

## 1. Post-D44 Dependency Analysis

D44 establishes the authority boundary for learner context, accessibility, accommodation, support conditions, preferences, temporary circumstances, observed interaction conditions, delivery capabilities, and inferred context. It requires that contextual information be purpose-bound, minimally used, reviewable, and never silently converted into learner choice, evidence, diagnosis, outcome, or state.

The governance chain still lacks a distinct boundary for **determining whether two records, accounts, sessions, observations, contexts, or learner histories refer to the same data subject or learner, and whether they may be linked, unified, split, or merged**. D19/D20 govern data-subject association and rights; D35 governs identity claims, authentication, and access; D36 governs organisational/context scope; D34 governs data lifecycle. None authorises record linkage or merging, and none permits matching identifiers, credentials, context membership, behaviour, or provider assertions to become proof of common identity.

The single highest-priority unresolved governance boundary is therefore **Data-Subject Record Linkage, Identity Resolution & Record-Merge Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D19/D20 — Data-Subject Identity, Privacy & Rights** | Association, privacy, representation, access, use, disclosure, and rights are explicit. | Whether separate records may be associated with the same subject and under what authority. |
| **D34 — Data Lifecycle & Protection** | Retention, restriction, deletion, correction, export, recovery, and derived records are bounded. | How linkage/merge/split affects lifecycle without rewriting history or bypassing rights. |
| **D35 — Identity, Authentication & Access** | Identity claims, authentication, actor binding, sessions, and access are distinct. | Authentication proves a bounded claimant procedure, not that two records are the same subject. |
| **D36 — Context/Tenant Isolation** | Context association and cross-context operations are explicit. | Whether records can cross contexts or be unified without inferred membership/equivalence. |
| **D44 — Learner Context & Preferences** | Context/preference/accommodation are distinct from identity and state. | Context similarity must not become identity or record-linkage proof. |
| **D12/D30/D38/D39 — History, Execution, Constitution, Implementation** | Historical facts, execution, locked decisions, and scope are protected. | How record-linkage decisions are authorised, executed, corrected, and preserved. |

This is the next priority because durable learner records, external exchanges, multiple sessions, representatives, institutions, and providers can produce duplicate, partial, conflicting, or falsely associated records. Without D45, an account match, shared identifier, authentication event, email/phone, provider assertion, biometric result, context membership, behaviour pattern, or AI inference could silently merge distinct learners, expose records, combine evidence, create state, or erase the distinction between historical subjects.

D45 does not select an identity provider, matching algorithm, biometric method, legal identity rule, data model, or merge implementation. It defines the authority boundary required before records may be associated, linked, unified, split, de-linked, or merged.

## 2. Purpose

D45 defines the authority semantics for record association, identity resolution, duplicate hypotheses, subject linkage, account linking, context linkage, record separation, merge proposals, merge approval, unmerge/correction, and historical protection.

> **Matching is not identity. Authentication is not record equivalence. Linkage is not consent. A merge is not permission to combine learner history.**

D45 ensures that any relationship among records is explicit, purpose-bound, provenance-linked, reviewable, reversible where possible, and never treated as proof of data-subject identity, learner identity, consent, authority, evidence, state, or mathematical truth without the appropriate separate determination.

## 3. Scope

D45 governs the conceptual relationship among records, accounts, sessions, actors, data subjects, learners, representatives, contexts, providers, observations, evidence, interpretations, decisions, commitments, events, and derived data.

| Within D45 | Outside D45 |
|---|---|
| Linkage hypotheses, identity-resolution status, merge/split authority, subject association, scope, provenance, review, and lifecycle | Identity providers, authentication, biometric technology, databases, schemas, migrations, APIs, storage, or implementation |
| Distinction between matching, association, identity, learner identity, representation, and merge | Legal identity, age/capacity, guardianship, institutional membership, privacy law, or accreditation |
| Prospective link/unlink/merge/split effects and historical protection | Assessment, mathematical, content, curriculum, policy, AI, state, adaptation, or delivery authority |
| Cross-context and data-protection implications of record relationships | Specific matching features, thresholds, classifiers, or client workflows |

D45 creates no identity resolution, subject identity, learner identity, representative status, or merge authority by assertion.

## 4. Record-Relationship Model

A **record** is a bounded historical, operational, contextual, evidentiary, interpretive, state, identity, access, or derived representation. A record’s contents do not prove that its subject association is correct.

A **linkage hypothesis** is a proposal that two or more records may refer to the same subject, actor, learner, context, or entity. A hypothesis is not identity resolution.

An **identity-resolution determination** is an explicit, purpose- and scope-bound determination that records may be treated as associated with the same subject/entity for a named operation. It must identify authority, evidence/basis, uncertainty, limitations, effective period, and permitted consequences.

A **merge** is a prospective change to operational representation or association that combines or coordinates records under explicit authority. It must not silently combine historical facts or erase source-record identity.

A **split/unlink** is a prospective correction or separation of an association. It does not prove that all prior actions were invalid and cannot erase the historical fact that records were previously linked.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Record similarity** | Shared/related attributes or patterns. | Same subject or learner. |
| **Linkage hypothesis** | Proposed possible relationship. | Identity, consent, or merge permission. |
| **Association** | Governed relation between record and subject/entity. | Legal identity or educational authority. |
| **Identity resolution** | Explicit determination for named purpose/scope. | Universal identity or unrestricted access. |
| **Account/session link** | Technical relationship among access representations. | Same learner, consent, choice, or state. |
| **Merge** | Prospective operational unification/coordination. | Historical combination or truth. |
| **Split/unlink** | Prospective separation/correction. | Historical erasure or proof of prior invalidity. |
| **Subject identity** | Data-subject association under D19/D20. | Learner state, representation, or consent. |
| **Learner identity** | Contextual association to learner role/record. | Mathematical capability or authority. |

## 5. Linkage Basis and Evidence

A proposed linkage must identify the records, subjects/entities, source/context, purpose, scope, basis, evidence, uncertainty, conflicts, data rights, representation, formal authority, effective period, and possible consequences. No universal matching basis or threshold is established by D45.

Similarity, matching identifiers, shared contact details, account credentials, provider assertions, context membership, common behaviour, timing, device/session information, language, preferences, accommodations, performance, or AI inference may be inputs to a hypothesis but cannot independently establish identity or merge authority.

| Basis | Permitted meaning | Prohibited inference |
|---|---|---|
| **Shared identifier** | Candidate matching signal. | Same person/learner without governed determination. |
| **Authentication continuity** | Claimant satisfied a bounded procedure. | Two records are the same subject. |
| **Provider assertion** | External linkage claim. | Authority merely through exchange/trust. |
| **Context membership** | Association to a context. | Same subject or cross-context permission. |
| **Behavioural similarity** | Candidate analytical signal. | Identity, diagnosis, capability, or state. |
| **Learner declaration** | Subject’s explicit linkage request/statement. | Automatic legal identity or unrestricted merge. |
| **Representative declaration** | Request under D24 scope. | Authority outside representation scope. |
| **AI/system inference** | Proposal-only hypothesis. | Identity, consent, authority, or fact. |

If the linkage basis is disputed, incomplete, sensitive, or consequentially insufficient, the records must remain distinct for consequential use until recognised authority determines otherwise.

## 6. Linkage, Identity, Representation, and Consent

D19/D20/D24/D35 remain controlling. Identity resolution does not create data-subject rights, legal identity, representative authority, learner-choice authority, consent, or governance authority. A person may request linkage without authorising unrestricted access or merge of all associated records.

A representative may request or participate in record association only within explicit D24 scope. Representation of one record/context does not automatically extend to another. An authenticated claimant may be permitted to submit a linkage request without being authorised to approve or execute it.

A merge or link must not be recorded as the learner’s explicit choice unless D1’s exact learner-choice conditions are independently satisfied. Record association cannot retroactively make a representative action personal learner action.

## 7. Merge, Split, and Operational Effects

A merge proposal must specify the exact records/representations affected, the current and target association, fields/relationships that would be coordinated, source-history preservation, data-right implications, context boundaries, evidence/state risks, reversibility, effective time, and authority.

A merge is not a license to combine historical evidence, interpretations, conclusions, state, choices, experience facts, commands, events, incidents, or provenance into a single undifferentiated history. Historical records must remain attributable to their original record/subject association and linkage decision.

A split/unlink or correction may constrain future operational views/use. It must preserve the fact that records were previously linked, the basis and authority of the prior linkage, the correction request, and the uncertain/affected consequences. No automatic learner-state reversal follows.

## 8. Cross-Context and Provider Boundary

D36/D37 remain controlling. A linkage across organisational, tenant, workspace, institutional, provider, or formal contexts requires explicit source/target context identification and cross-context authority. Shared provider, global account, matching labels, or common storage does not establish cross-context identity or equivalence.

A provider may supply a linkage claim or source identifier only within D37 authority. Provider identity/authentication is not subject identity. Any provider-side merge or identifier mapping must be treated as an external claim until independently recognised for the exact purpose.

## 9. Evidence, State, Context, and Outcome Boundary

D2/D8/D21/D26/D27/D22/D43/D44 remain controlling. Linkage is not evidence of learning, mathematical performance, misconception, outcome, mastery, readiness, progression, or state. A merge cannot combine evidence or state unless the relevant authority separately determines what each record means and permits the exact prospective effect.

Learner context, preference, accommodation, delivery condition, or behavioural pattern cannot be used as a proxy for identity or capability. A record-linkage decision cannot create or alter pedagogical intent, learner-facing outcome claims, adaptation, delivery, or learner choice.

## 10. Linkage Lifecycle

The lifecycle is:

> **linkage proposal → identity/authority review → purpose/scope and rights review → evidence/conflict review → approve/reject/defer → record determination → prospective link/merge effect → monitor/review → correction/unlink/split → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | Possible relationship is suggested. | No identity or access. |
| **Review** | Basis, authority, purpose, scope, rights, context, and consequences examined. | Review is not resolution. |
| **Determination** | Exact association/link/merge is approved or rejected. | Not universal identity. |
| **Recording** | Basis/status/effective period are preserved. | Storage does not create authority. |
| **Prospective effect** | Future operational relation changes. | No historical rewrite. |
| **Monitoring/review** | New conflict/error/evidence is considered. | Review is not automatic reversal. |
| **Correction/unlink/split** | Future relationship is narrowed/separated. | No erasure of prior linkage facts. |

## 11. Conflict and Fail-Closed Rules

Linkage conflicts may concern subject identity, learner identity, actor, representation, consent, context, provider, records, evidence, state, privacy, history, or authority. Conflict creates no permission to link, merge, disclose, or combine.

No precedence may be inferred from recency, account age, authentication strength, data volume, provider trust, common identifiers, institutional status, AI confidence, behavioural similarity, storage order, or operational convenience.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Records/subjects/entities are ambiguous or conflicting | Keep records distinct for consequential use; no merge. |
| Linkage basis is weak, inferred, disputed, or outside scope | Treat as hypothesis; no identity/merge effect. |
| Representation/consent/data-right authority is unresolved | No consequential link, disclosure, or merge. |
| Cross-context authority is missing | No cross-context association or transfer. |
| Merge impact on evidence/state/history is unknown | Do not merge; preserve records and escalate. |
| Prior linkage may be incorrect | Preserve history; constrain future use and review correction. |
| Provider/AI/system output conflicts with governed identity record | Preserve claims; no inferred winner. |
| Execution is partial or unknown | Do not assert completed merge/split; preserve uncertainty and reconcile under D30. |

Fail-closed behaviour must preserve record separation, minimise disclosure, avoid learner-state effects, prevent identity inference, preserve provenance/history, and not convert uncertainty into a learner fault.

## 12. Historical Protection

D45 must never rewrite, delete, conceal, or retroactively relabel records, identities, associations, linkage hypotheses, reviews, merges, splits, unlinks, access actions, disclosures, evidence, interpretations, outcomes, state, choices, commands, events, incidents, provider mappings, or provenance.

A later identity correction, unlink, split, revocation, or merge review affects future association/use only through explicit authority. It cannot make prior record contents, access, evidence, state, learner action, or linkage history not have occurred.

## 13. Relationship to D1–D44

D45 is subordinate to every locked decision and creates no exception.

| Decision | D45 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Linkage, merge, authentication, or account activity cannot infer explicit choice or consent. |
| **D2 — Learning-State Authority** | Record association does not create learner state or authoritative capability. |
| **D3–D8** | Context/content/curriculum/experience/assessment boundaries remain separate from identity resolution. |
| **D9–D13** | Linkage cannot activate policy, rewrite history, infer equivalence, or migrate records silently. |
| **D14–D18** | AI/provider/reviewer/governance action must remain explicit; conflict creates no identity authority. |
| **D19–D20** | Data-subject association and rights do not automatically establish record equivalence or merge permission. |
| **D21–D22** | Linkage is not evidence, conclusion, commitment, or state. |
| **D23–D24** | Continuity/representation does not establish same subject or learner-choice authority. |
| **D25** | Policy compatibility is not record or identity equivalence. |
| **D26–D29** | Interpretation, state, adaptation, delivery, and interaction cannot resolve identity or merge records. |
| **D30** | Link/merge commands and events require exact authority; technical execution is not identity resolution. |
| **D31–D32** | Conformance/release cannot create subject identity or merge authority. |
| **D33–D34** | Incidents/data lifecycle actions do not resolve identity or erase linkage history. |
| **D35** | Authentication/access proves a bounded claimant procedure, not that records are the same subject. |
| **D36** | Context membership/isolation does not create cross-context identity or record equivalence. |
| **D37** | Provider exchange/mapping is a claim, not subject identity or merge authority. |
| **D38** | Constitutional integrity prevents silent identity/record governance changes. |
| **D39** | Implementation authorisation cannot invent matching, linkage, or merge authority. |
| **D40–D42** | Mathematical/source/context authority does not resolve learner/data-subject identity. |
| **D43** | Outcome/learner-facing claims cannot be transferred or combined by record linkage. |
| **D44** | Preference/accommodation/context cannot become identity or merge proof. |

## 14. Prohibited Behaviours

14.1. Treating matching identifiers, account credentials, contact details, authentication continuity, provider assertions, context membership, behavioural similarity, device/session data, preferences, accommodations, performance, or AI inference as automatic proof that records belong to the same subject or learner.

14.2. Treating identity resolution as consent, representation, learner choice, data-right authority, governance authority, evidence, learner state, or mathematical truth.

14.3. Silently linking, merging, synchronising, transferring, de-duplicating, unifying, or splitting records across subjects, contexts, providers, or tenants.

14.4. Combining historical evidence, interpretations, conclusions, state, choices, experience facts, commands, events, incidents, or provenance into an undifferentiated record through merge.

14.5. Treating a representative, institution, provider, administrator, client, AI system, or authenticated claimant as authorised to resolve or merge records without explicit scope and authority.

14.6. Using a record-linkage decision to infer learner consent, accept an offer, choose a path, create a commitment, establish learning, or alter state.

14.7. Resolving identity or merge conflicts through recency, account age, credential strength, data volume, provider trust, institutional status, AI confidence, storage order, or convenience.

14.8. Rewriting or deleting historical linkage, identity, access, disclosure, evidence, state, choice, command, event, incident, or provenance records after a correction, split, unlink, or merge.

14.9. Treating partial, unknown, failed, or provider-side merge execution as completed identity resolution or learner-record unification.

14.10. Implementing record linkage, identity resolution, merge/split, persistence, access control, provider mapping, AI, UI/API, or any other functionality from D45.

## 15. Explicit Deferrals

D45 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Legal identity, age/capacity, guardianship, institutional identity, identity proofing, biometric identity, and jurisdictional rules | D45 creates no legal or identity-provider authority. |
| Specific linkage features, algorithms, thresholds, classifiers, human review standards, and confidence models | These require purpose- and risk-specific future governance. |
| Exact record categories, merge mechanics, field precedence, data model, schema, persistence, backup, and recovery | D45 is implementation-independent. |
| Representatives, institutions, providers, reviewers, custodians, and approvers | D15/D16/D19/D20/D24/D35 require explicit recognition; D45 names none. |
| Data-retention/deletion treatment for source and merged representations | D34 remains controlling; specific categories require future governance. |
| Assessment, AI, mathematical, content, curriculum, policy, state, adaptation, delivery, and learner-choice semantics | D1–D44 remain controlling; linkage creates none. |
| Slice 6 scope and implementation authorisation | D45 is a governance boundary, not implementation approval. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D45 at this stage.**

If D45 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for record identity, subject/entity association, linkage hypothesis, identity-resolution determination, evidence/basis, uncertainty, purpose, scope, context, representation, consent/reference, merge proposal, approval, effective period, source-history preservation, split/unlink/correction, revocation, conflict, execution outcome, provenance, and historical applicability.

Future contracts must not encode matching as identity, authentication as record equivalence, linkage as consent, merge as historical combination, provider mapping as truth, or technical execution as completed resolution. They must preserve source records, association history, uncertainty, partial/unknown outcomes, and fail closed when identity, purpose, scope, authority, context, data rights, provenance, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, identity, access-control, provider, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin on the basis of D45.**
>
> D45 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage system, merge/split system, assessment, AI, UI/API, delivery runtime, D46, or Slice 6 work. Any future implementation requires explicit human approval of D45 and a separate controlled implementation authorisation for an exact scope.

## 18. Approval Recommendation

D45 is presented for human architectural review as the record-linkage and identity-resolution boundary required after the complete D1–D44 chain. It protects the distinction between record similarity, linkage hypothesis, subject association, identity resolution, authentication, representation, consent, context, merge, historical truth, evidence, learner state, and implementation.

> **D45 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage system, merge/split system, assessment, AI, UI/API, delivery runtime, D46, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
