# D42 — Mathematical Source, Canonical Reference & Domain-Expert Review Authority

> **D42 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D41 are preserved exactly as approved and locked. D42 authorises no code, contract, repository, schema, migration, persistence, governance tooling, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D43, or Slice 6 work.

## 1. Post-D41 Dependency Analysis

D41 establishes the boundary for formal mathematical domains, axiom/rule systems, assumptions, definitions, notation, applicability, translation, and context equivalence. It deliberately does not select or govern the sources, references, standards, editions, domain experts, review bodies, or canonical-reference relationships from which a formal context or mathematical claim may be supported.

D40 governs claims, proofs, derivations, validation results, uncertainty, and mathematical authority. D41 governs the formal context in which those claims are interpreted. D5/D6 govern content and knowledge relationships but do not establish mathematical truth. D37 governs external provider exchange, while D14 prevents AI from becoming authority. The remaining gap is **which sources or reviewers may be recognised for a mathematical purpose, how a reference becomes canonical for a bounded context, how source conflicts are handled, and how a source’s authority is prevented from becoming universal or self-authenticating**.

The single highest-priority unresolved governance boundary is therefore **Mathematical Source Recognition, Canonical Reference & Domain-Expert Review Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D40 — Mathematical Truth & Claim Authority** | Claims, proofs, validation, uncertainty, and authority are distinct. | Which source/review basis may support an authority determination. |
| **D41 — Formal Domain, Context & Axiom Authority** | Context, axioms, definitions, notation, and applicability must be explicit. | How references/experts are recognised for a context without silently choosing truth. |
| **D5/D6 — Content and Knowledge Relationships** | Content and graph structure do not create mathematical truth. | Source/reference relationships and expert review status. |
| **D13/D25 — Version and Equivalence** | Version/equivalence relationships are purpose- and scope-specific. | Source editions, references, and expert determinations across contexts/versions. |
| **D14/D37 — AI and External Providers** | AI/provider output cannot become authority through trust, plausibility, or exchange. | Recognition and treatment of external references and reviewers. |
| **D38 — Constitutional Integrity** | Decisions cannot be silently amended or reinterpreted. | Governance record of source/reference authority and review status. |
| **D39 — Implementation Authorisation** | Implementation requires exact scope and conformance. | A governed source/review basis for future knowledge/content implementation. |

This is the next priority because D40/D41 cannot be applied consistently if a source hierarchy, canonical reference, domain expert, review result, or citation is allowed to become mathematical authority merely through reputation, institutional use, publication, or inclusion in the catalog. Without D42, future expansion beyond the current seed may silently choose a source or reviewer as the engine’s mathematical truth authority.

D42 does not select any source, institution, expert, standard, textbook, reference edition, review body, or authority hierarchy. It governs how such recognition, if ever proposed, must remain explicit, bounded, reviewable, versioned, provenance-rich, and non-universal.

## 2. Purpose

D42 defines the authority semantics for source recognition, reference status, canonical-reference designation, domain-expert review, review evidence, source conflict, edition/version treatment, citation, provenance, and bounded use.

> **A citation is not proof. A published source is not automatically canonical. An expert review is not universal truth. A canonical reference is canonical only for its explicitly governed purpose and scope.**

D42 ensures that sources and reviewers support mathematical authority decisions without silently becoming mathematical truth, content authority, curriculum authority, assessment authority, AI authority, or learner-state authority.

## 3. Scope

D42 governs source/reference/reviewer recognition and use in relation to formal mathematical contexts and claims. It covers source identity, edition/version, provenance, authority basis, expert review, canonical-reference scope, conflicts, withdrawal, correction, equivalence, and historical protection.

| Within D42 | Outside D42 |
|---|---|
| Source/reference identity, recognition, scope, reviewer authority, canonical designation, review evidence, and lifecycle | Selecting actual sources/experts, theorem proving, validators, databases, APIs, or implementation |
| Separation of source authority from mathematical truth, context, content, curriculum, policy, assessment, AI, and state | Legal/accreditation authority, procurement, institutional contracts, or academic appointment |
| Source conflicts, edition/version, citation, provenance, withdrawal, and bounded applicability | Content authoring, curriculum, assessment scoring, pedagogy, delivery, UI/API, or persistence |
| Expert review authority and review-result status at governance level | A universal source hierarchy or canonical mathematics standard |

D42 does not declare any particular source, expert, review body, edition, publication, citation, or reference canonical.

## 4. Source and Reviewer Authority Model

A **mathematical source** is a document, work, dataset, formalisation, proof record, reference, standard, institution, expert submission, or other artefact that makes or supports mathematical claims. A source may be recognised for a named purpose without being authoritative for all claims or contexts.

A **reference** is a source relation attached to a claim, context, definition, proof, content asset, validation result, or review. A reference establishes provenance/traceability; it does not by itself establish truth.

A **canonical reference designation** is an explicit, scope-bound determination that a source/reference is preferred or governing for a named formal context, claim family, version, or purpose. It is not universal mathematical truth or authority outside its designation.

A **domain-expert review** is a bounded review action by an explicitly recognised reviewer or review body concerning a named claim/context/source/purpose. The review result is evidence and a governance action; it is not automatically a universal truth determination.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Source identity** | Identifiable origin/artefact/version. | Truth, authority, or correctness. |
| **Reference** | Traceability relation to a source. | Proof or canonical status. |
| **Source recognition** | Explicit permission to consider a source for named scope/purpose. | Universal trust or truth. |
| **Canonical reference** | Preferred/governing reference for bounded context/purpose. | Universal equivalence or correctness. |
| **Expert identity** | Recognised reviewer identity/basis. | Unrestricted authority. |
| **Expert review** | Bounded review and stated result. | Truth outside scope or automatic learner meaning. |
| **Source hierarchy** | Purpose-specific ordering/selection rule. | Inferred precedence in all domains. |
| **Citation** | Link to a source/claim basis. | Independent validation. |
| **Withdrawal/expiry** | Future reliance is constrained/ended. | Historical erasure or prior-use invalidation. |

## 5. Source Recognition and Scope

A source may be recognised only for an explicit domain/formal context, claim category, purpose, scope, version/edition, period, and authority basis. Recognition must identify limitations, conflicts, review status, provenance, and whether the source is primary, supporting, illustrative, pedagogical, computational, or otherwise classified.

A recognised source may support a claim review or context designation without becoming the sole or universal source of mathematical truth. The source’s own assertion that it is authoritative is evidence to consider, not self-validating authority.

An expert or review body may be recognised for a bounded review purpose only if the recognition basis, scope, independence/limitations, conflict disclosures where required, and review lifecycle are explicit. D42 does not prescribe credentials or hierarchy.

## 6. Canonical Reference Designation

Canonical status is always scoped. It must identify the formal context, claim family, version/edition, purpose, jurisdiction/institutional setting if relevant, effective period, authority basis, limitations, and relationship to other sources.

Canonical designation may support consistency of representation or review. It must not be treated as proof that every claim in the source is true, that every notation is equivalent, or that all contexts must use the source. A canonical reference can be contested, superseded, restricted, withdrawn, or stale without rewriting historical use.

| Designation | Permitted meaning |
|---|---|
| **Preferred reference** | Recommended source for a bounded purpose; alternatives may remain valid. |
| **Governing reference** | Explicitly required source for a named context/process. |
| **Illustrative reference** | Supports explanation/examples; does not establish truth alone. |
| **Historical reference** | Preserves prior context/use; not necessarily current. |
| **Contested reference** | Material conflict/uncertainty exists; no automatic reliance. |
| **Withdrawn/superseded reference** | Future reliance ends or moves to an explicit successor. |

## 7. Expert Review and Review Evidence

A review must identify the subject, source/claim/context, formal assumptions, question/purpose, method, reviewer/body, authority basis, date/version, result, limitations, conflicts, and provenance. Review status must distinguish review completed from claim validated, source recognised, context canonical, content authorised, or policy activated.

A review may conclude that a source is suitable for a purpose, that a claim is supported under D40/D41 conditions, that a definition is consistent within a context, or that further review is required. It must not silently change the claim, definitions, axioms, evidence, or formal context.

Review quality, independence, expertise, and reliability are themselves bounded claims requiring explicit treatment. Reputation, institutional title, prior approval, or reviewer confidence cannot substitute for a stated review scope and basis.

## 8. Source Conflicts and Multiple References

Multiple sources may agree, differ, refine, contradict, or operate under different formal contexts. Agreement by repetition does not establish truth. Conflict must preserve each source, context, version, claim, review, and provenance rather than selecting the most convenient source.

A source hierarchy may be defined only for a named purpose/context and through explicit authority. It cannot be inferred from publication date, popularity, institutional status, citation count, provider trust, curriculum placement, or storage order.

If sources conflict materially and no applicable authority resolves the conflict, dependent mathematical/content/assessment/decision use fails closed under D18/D40/D41.

## 9. Version, Edition, Equivalence, and Change

Source identity includes edition/version, publication state, context, assumptions, definitions, notation, and review status where relevant. A revised edition, digital copy, translation, mirror, formalisation, or provider representation is not automatically equivalent to the prior source.

D13/D25 govern equivalence and compatibility; D38 governs constitutional change. Source updates, corrections, withdrawals, or expert-review changes are prospective. They do not rewrite historical citations, validations, content, assessments, learner choices, state, decisions, or provenance.

## 10. External and AI Source Boundary

D14/D37 remain controlling. AI, external providers, connectors, clients, institutions, or services may propose sources, citations, reviews, or canonical relationships. They cannot establish mathematical authority through output, authentication, provider status, citation, or operational use.

A citation generated by AI or supplied by a provider must be verified for identity, scope, version, and applicability before consequential use. A citation that cannot be verified remains an unresolved proposal, not authority.

## 11. Content, Curriculum, Assessment, and Learner Boundary

D3/D5/D8/D21/D26/D27/D28/D29 remain controlling. Source recognition or expert review does not publish/activate content, set curriculum, score assessment, diagnose misconception, establish learner state, select a learning path, create learner consent, or authorise delivery.

A learner-facing citation or explanation may be pedagogically selected under D28/D29, but that selection does not make the source canonical or the learner’s exposure evidence of understanding. A source used for assessment grounding remains distinct from assessment authority and evidence sufficiency.

## 12. Conflict and Fail-Closed Rules

Source conflicts may concern identity, edition, context, claim, proof, reviewer, authority, canonical status, equivalence, content, curriculum, policy, assessment, AI, provider, data, or history. Conflict creates no source precedence or mathematical truth.

No precedence may be inferred from publication, reputation, citation count, institutional status, expert title, recency, provider trust, AI confidence, graph centrality, curriculum use, learner success, storage, or technical accessibility.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Source/reviewer identity, version, context, scope, or provenance is unclear | No consequential reliance. |
| Canonical designation lacks explicit purpose/scope/authority | Treat as non-canonical proposal; no automatic preference. |
| Expert review lacks authority basis, method, subject, or limitations | Treat as incomplete review; no authority upgrade. |
| Sources/experts conflict materially | Preserve conflict; no inferred winner; apply D18. |
| Citation/version/translation/equivalence is unresolved | No substitution, validation, migration, or dependent use. |
| Source is withdrawn, stale, contested, or superseded | No new use outside surviving scope; preserve history. |
| Content/assessment/state/response depends on unresolved source authority | Block affected consequence; do not invent a source hierarchy. |

Fail-closed behaviour must not invent canonical status, mathematical truth, review authority, content authority, assessment validity, learner state, or source precedence.

## 13. Historical Protection

D42 must never rewrite, delete, conceal, or retroactively relabel sources, references, citations, editions, expert reviews, canonical designations, claims, proofs, contexts, validations, content, curriculum, assessment, evidence, interpretations, conclusions, state, choices, deliveries, commands, events, provider exchanges, or provenance.

A later source correction, expert-review result, canonical designation, withdrawal, or supersession affects future reliance only through explicit governance. It cannot make a historical source, citation, review, content use, learner interaction, or decision not have occurred.

## 14. Relationship to D1–D41

D42 is subordinate to every locked decision and creates no exception.

| Decision | D42 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Source/reference selection cannot infer learner consent, choice, or commitment. |
| **D2 — Learning-State Authority** | Learner evidence/state cannot establish source or canonical authority. |
| **D3–D4 — Curriculum and Academic Progression** | Curriculum/level/progression cannot make a source mathematically canonical. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Content/publication/relationships/experience do not create source or truth authority. |
| **D8 — Assessment & Evidence** | Source/reviewer status does not automatically qualify assessment evidence. |
| **D9–D11 — Decisioning, Publication, and Policy Lifecycle** | Policy/content activation cannot establish source/canonical authority. |
| **D12–D13 — History, Version, Migration** | Source/edition/version changes are explicit, additive, and prospective. |
| **D14 — AI Proposal** | AI-generated citation/review/source proposal remains non-authoritative. |
| **D15–D16 — Delegation and Governance Action** | Source/expert recognition and review require explicit actor/action authority. |
| **D17–D18 — Interpretation and Conflict** | Interpretation/review cannot silently resolve source conflict or create precedence. |
| **D19–D20 — Data and Rights** | Data access/representation does not create source or review authority. |
| **D21–D22 — Evidence and Conclusions** | Evidence/conclusions do not establish canonical source or mathematical truth. |
| **D23–D24 — Experience and Delegated Choice** | Experience/representation cannot create source authority or learner choice. |
| **D25 — Policy Relationships** | Policy/reference compatibility is not source or mathematical equivalence. |
| **D26–D28 — Interpretation, State, Adaptation** | Interpretation/state/adaptation/response cannot canonicalise a source. |
| **D29–D30 — Delivery and Operational Execution** | Delivery/execution cannot establish source/reviewer authority. |
| **D31–D32 — Conformance and Release** | Conformance/release cannot make a source canonical or mathematically true. |
| **D33–D34 — Incident and Data Protection** | Incident/data actions do not decide source truth or rewrite source history. |
| **D35 — Identity/Authentication/Access** | Authentication/access does not establish source or expert authority. |
| **D36 — Context/Tenant Isolation** | Organisational context does not establish mathematical source equivalence. |
| **D37 — External Integration** | Provider/source exchange does not create source, reviewer, or canonical authority. |
| **D38 — Constitutional Integrity** | Governance versioning cannot silently change source authority or historical applicability. |
| **D39 — Implementation Authorisation** | Implementation permission cannot select/authorise a source beyond scope. |
| **D40 — Mathematical Truth/Claim Authority** | Source/review supports authority determinations but does not itself establish truth. |
| **D41 — Formal Context/Axiom Authority** | Source recognition does not silently choose axioms, definitions, or formal context. |

## 15. Prohibited Behaviours

15.1. Treating a citation, publication, textbook, standard, institution, expert title, provider, AI output, source identifier, graph relationship, or curriculum use as automatic mathematical truth or authority.

15.2. Treating source recognition, canonical designation, expert review, institutional adoption, or repeated citation as universal validity beyond explicit scope.

15.3. Treating a source hierarchy as globally applicable when its purpose, domain, context, version, or authority basis is not explicit.

15.4. Silently changing source editions, definitions, assumptions, formal contexts, translations, citations, review subjects, or claim scope to resolve a conflict.

15.5. Treating a review result as proof, mathematical validation, content publication, curriculum activation, assessment authority, learner conclusion, or state.

15.6. Allowing an AI system, external provider, content system, policy engine, assessment system, validator, or implementation to self-recognise as source/reviewer/canonical authority.

15.7. Resolving source or expert conflicts through recency, popularity, citation count, institutional status, provider trust, AI confidence, curriculum use, learner success, storage, or convenience.

15.8. Treating a revised, translated, mirrored, digitised, or provider-supplied source as equivalent without explicit version/context/equivalence review.

15.9. Rewriting historical citations, references, reviews, canonical designations, validations, content, assessments, learner choices, state, decisions, or provenance after source change or withdrawal.

15.10. Implementing source registries, expert-review systems, canonical-reference systems, persistence, validation, assessment, AI, UI/API, or any other functionality from D42.

## 16. Explicit Deferrals

D42 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific sources, textbooks, standards, institutions, experts, review bodies, canonical references, or source hierarchy | D42 defines recognition semantics without selecting authorities. |
| Credentials, appointment, independence, conflicts, peer review, and expert qualification criteria | These require future authority-specific governance. |
| Exact source ontology, review statuses, canonical thresholds, citation requirements, equivalence methods, and conflict procedures | These require purpose- and domain-specific decisions. |
| Formal validation, theorem proving, computer algebra, knowledge graph, repository, database, or source-management technology | D42 is implementation-independent. |
| Mathematical axioms/domains, content, curriculum, policy, assessment, AI, state, adaptation, delivery, and provider choices | D1–D41 remain controlling; source authority does not create these. |
| Legal, accreditation, examination, institutional, licensing, copyright, and jurisdictional requirements | D42 creates no legal or institutional authority. |
| Slice 6 scope and implementation authorisation | D42 is a governance boundary, not implementation approval. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D42 at this stage.**

If D42 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for source, reference, edition/version, formal context, domain, claim relation, recognition, canonical designation, expert/reviewer identity, review subject/method/result, authority basis, scope, purpose, applicability, conflicts, citation, equivalence, withdrawal, supersession, correction, provenance, and historical applicability.

Future contracts must not encode citation as proof, source reputation as authority, canonical status as universal truth, expert title as unrestricted review authority, or repeated use as equivalence. They must preserve source/claim/context/review distinctions and fail closed when identity, version, formal context, scope, authority, provenance, equivalence, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, knowledge, or repository changes.

## 18. Implementation Freeze

> **No implementation may begin on the basis of D42.**
>
> D42 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D43, or Slice 6 work. Any future implementation requires explicit human approval of D42 and a separate controlled implementation authorisation for an exact scope.

## 19. Approval Recommendation

D42 is presented for human architectural review as the source and reviewer authority boundary required after the complete D1–D41 chain. It preserves the distinction between mathematical sources, references, expert review, canonical designation, formal context, mathematical claims, validation, content, curriculum, assessment, learner state, provider trust, and implementation.

> **D42 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D43, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
