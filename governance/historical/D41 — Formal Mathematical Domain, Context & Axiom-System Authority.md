# D41 — Formal Mathematical Domain, Context & Axiom-System Authority

> **D41 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D40 are preserved exactly as approved and locked. D41 authorises no code, contract, repository, schema, migration, persistence, governance tooling, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D42, or Slice 6 work.

## 1. Post-D40 Dependency Analysis

D40 establishes the authority boundary for mathematical claims, definitions, premises, derivations, proofs, validation results, uncertainty, contradiction, versions, and mathematical admissibility. It deliberately does not select or authorise the formal domains, axiomatic systems, foundational assumptions, canonical definitions, notation systems, or source hierarchies within which a mathematical claim is interpreted.

Without that boundary, even a valid proof or validator result may be applied to the wrong formal context. Two claims may share a label while differing in axioms, definitions, domains, conditions, notation, or intended model. A content author, curriculum, policy, AI system, provider, graph relationship, or implementation may otherwise silently choose the formal context and thereby become mathematical authority by implication.

The single highest-priority unresolved governance boundary is therefore **Formal Mathematical Domain, Context & Axiom-System Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D3 — Curriculum Identity & Authority** | Curriculum is educational structure, not mathematical truth. | Formal domain/context in which mathematical truth is evaluated. |
| **D5/D6 — Content and Knowledge Relationships** | Content and graph relationships do not establish truth. | Canonical definitions, domains, assumptions, and typed relationships for claims. |
| **D13/D25 — Version and Equivalence** | Equivalence and migration are purpose/scope-specific. | Equivalence across formal systems, notation, definitions, and axiom contexts. |
| **D40 — Mathematical Truth & Claim Authority** | Claims, proofs, validation, uncertainty, and authority are distinct. | Which formal context gives a claim its interpretation and applicability. |
| **D14/D37 — AI and External Providers** | Provider/AI outputs do not become mathematical authority. | How external claims are mapped to a governed formal context without silent authority. |
| **D39 — Implementation Authorisation** | Implementation must be exact and scoped. | The formal context any future knowledge/content implementation is allowed to use. |

This is the next priority because D40 cannot safely govern mathematical claim validity without an explicit answer to **“valid under which definitions, assumptions, axioms, domain, and interpretation?”** It is also a direct prerequisite for expanding beyond the current seed knowledge, validating content, comparing versions, importing external mathematics, or allowing assessment/decisioning to rely on mathematical claims.

D41 does not choose axioms, declare a domain canonical, select a source hierarchy, or assert that any particular formal system is mathematically correct. It defines the governance boundary for making such choices explicit and preventing context ambiguity from becoming hidden truth authority.

## 2. Purpose

D41 defines the authority semantics for formal mathematical domains, axiom systems, foundational assumptions, definitions, notation, models, interpretation contexts, applicability conditions, cross-context translation, and context-specific claim status.

> **A proof is only a proof relative to stated premises, rules, definitions, and formal context. A shared label is not a shared meaning. A translation is not equivalence.**

D41 ensures that mathematical claims are interpreted and validated only within an explicit, appropriately governed formal context and that unresolved context does not silently become mathematical, content, curriculum, assessment, or learner authority.

## 3. Scope

D41 governs the identification and authority boundaries of formal mathematical contexts and their relationships. It covers domains, axiom/rule systems, definitions, notation, assumptions, models, applicability, translation, interpretation, context equivalence, versioning, conflicts, and historical protection.

| Within D41 | Outside D41 |
|---|---|
| Formal context identity, assumptions, definitions, notation, axioms/rules, applicability, translation, and context relationships | Selection of any actual axiom system, mathematical school, canonical source, solver, theorem prover, database, or implementation |
| Separation of context authority from claim truth, content, curriculum, policy, assessment, AI, and learner state | Mathematics education design, content authoring, curriculum, assessment scoring, pedagogy, delivery, or UI/API |
| Cross-context interpretation and equivalence at governance level | Formalisation tooling, persistence, migration code, provider integration, or deployment |
| Prospective context changes and historical claim applicability | Legal/accreditation authority or institutional selection of mathematical standards |

D41 does not declare a specific formal domain, axiom system, definition, notation, model, source, or context canonical.

## 4. Formal Context Model

A **formal mathematical context** is a named, versioned, scoped collection of assumptions, definitions, axioms/rules, notation, semantics, domain restrictions, and interpretation conditions within which mathematical claims may be interpreted or evaluated.

A **domain** is a governed scope of mathematical objects, structures, operations, or subject matter. A domain label alone is insufficient where definitions, assumptions, or formal rules materially differ.

An **axiom/rule system** is a stated set of foundational assumptions or permitted inference rules for a formal context. D41 does not decide whether the system is sound, complete, canonical, or appropriate; those are separately governed claims.

A **context binding** attaches a claim, proof, definition, content asset, policy, assessment, or operation to a formal context for a stated purpose and period. Binding is not proof that the claim is true.

A **context translation** maps a representation from one formal context to another under an explicit mapping, scope, assumptions, and loss/uncertainty statement. Translation is not equivalence unless D13/D25 and the relevant authority determine that it is.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Formal context** | Versioned assumptions/rules/definitions/notation/semantics for interpretation. | Truth, canonical status, or learner relevance. |
| **Domain** | Bounded mathematical subject/object scope. | Universal applicability or authority. |
| **Axiom/rule system** | Stated foundations/inference rules. | Soundness, completeness, or external correctness. |
| **Definition** | Context-bound meaning of a term/object/operation. | Meaning outside context. |
| **Notation** | Representation conventions within a context. | Equivalence of underlying claims. |
| **Context binding** | Claim/operation is evaluated under a named context. | Truth or authority by metadata. |
| **Translation** | Governed mapping between contexts. | Equivalence, preservation, or authority without review. |
| **Applicability** | Context is permitted for a named claim/use. | Universal validity or content activation. |
| **Context equivalence** | Explicitly established relation for a stated purpose/scope. | Universal mathematical equivalence. |

## 5. Context Authority and Status

Every formal context used for consequential mathematical processing must identify its domain, assumptions, definitions, rules/axioms, notation, semantics, version, scope, provenance, applicability, limitations, and authority status. A name, textbook, provider, curriculum, implementation, or common usage cannot supply missing context silently.

A context may be proposed, structurally represented, under review, recognised for a purpose, active for a scope, contested, restricted, superseded, withdrawn, stale, or unresolved. D41 creates no universal status vocabulary and no default authority.

| Status | Meaning | Permitted consequence |
|---|---|---|
| **Proposed** | Context suggested for review. | No consequential claim validation/use. |
| **Represented** | Context metadata is structurally present. | Structural handling only. |
| **Under review** | Assumptions/rules/definitions are being examined. | No dependent authoritative use. |
| **Recognised for purpose** | Explicit authority permits use for named scope/purpose. | Context-bounded interpretation only. |
| **Active for scope** | Context may be used prospectively in stated scope/time. | No universal or retroactive applicability. |
| **Contested** | Material conflict or uncertainty exists. | Preserve conflict; fail closed for dependent use. |
| **Superseded/withdrawn/stale** | Future reliance is ended or constrained. | No new use outside surviving scope; preserve history. |
| **Unresolved** | Context authority/applicability cannot be established. | No consequential use. |

A context status does not upgrade the truth status of claims within it. Context recognition is not mathematical truth authority unless a separate D40-compatible determination exists for the exact claim/use.

## 6. Definitions, Assumptions, and Notation

Definitions, assumptions, notation, and rules must be explicit where they affect claim meaning or validity. A claim must not be validated under silently substituted definitions, unstated domain restrictions, hidden assumptions, or notation conventions that materially change interpretation.

A definition may be locally valid within a context without being globally canonical. A notation translation may preserve meaning, alter meaning, or be unresolved. A learner-facing simplification may be pedagogically authorised under D28/D29 while remaining distinct from the formal mathematical definition.

A context may include declared dependencies on other contexts, but graph topology, common vocabulary, source citation, or reuse does not establish compatibility or equivalence. Dependencies must be explicit and versioned.

## 7. Context Applicability and Claim Evaluation

A claim may be evaluated only when its formal context and applicability conditions are known. D40 validation and D41 context binding are separate: D41 establishes the interpretive frame; D40 governs the claim/proof/validation authority within that frame.

A claim may be mathematically admissible in one context and unresolved, false, inapplicable, or differently interpreted in another. A proof valid under one axiom/rule system cannot be represented as valid under another without explicit context mapping and review.

| Situation | Required treatment |
|---|---|
| Claim and context explicitly bound | Evaluate only within stated scope and assumptions. |
| Context is named but definitions/assumptions are incomplete | Treat as unresolved for consequential use. |
| Same notation/label appears in multiple contexts | Do not merge; preserve context identity. |
| Claim is translated to another context | Require explicit mapping and preservation/loss analysis. |
| Context is recognised for one purpose only | Do not extend to other claims/purposes. |
| Formal context changes prospectively | Re-evaluate dependent claims/use; preserve history. |

## 8. Cross-Context Translation and Equivalence

Translation, interpretation, embedding, normalisation, notation conversion, and representation conversion are distinct from equivalence. A translation must state source context, target context, mapping, preserved properties, changed assumptions, loss/uncertainty, scope, version, and authority.

Context equivalence is purpose-specific under D13/D25. Even if two contexts are equivalent for a defined proposition or calculation, they are not thereby universally equivalent for all claims, content, assessment, policy, learner state, or delivery.

No context relation may be inferred from shared definitions, source, symbols, provider, curriculum, graph relationship, successful conversion, or matching outputs. Consequential ambiguity fails closed.

## 9. External, AI, Content, and Curriculum Boundary

D14/D37 remain controlling. An external source, provider, AI model, content author, or curriculum may propose a context, axiom system, definition, translation, or equivalence claim. None becomes authoritative through plausibility, citation, popularity, authentication, publication, or operational use.

D3/D5 remain controlling. Curriculum/content authority may choose where a mathematically governed context is used for learning, but cannot silently establish that context as mathematically canonical. Mathematical context authority cannot publish, activate, or pedagogically select content.

## 10. Assessment, State, Adaptation, and Delivery Boundary

D8/D21/D26/D27/D22/D28/D29 remain controlling. A learner’s response, assessment, interpretation, state, adaptation, delivery, or experience does not establish a formal context or its truth. A recognised context may ground a mathematical explanation or evidence evaluation, but does not automatically create learner evidence, misconception, conclusion, state, adaptation, choice, or learning.

If a learner-facing explanation uses a simplified or alternate formal context, the representation must preserve its scope and relationship to the formal context. It must not be silently presented as universally equivalent.

## 11. Version, Migration, Correction, and Historical Protection

Formal context identity includes its version, assumptions, definitions, rules, notation, dependencies, and applicability. A new context version is not equivalent merely because its label or API is unchanged. D13/D25 govern equivalence/migration; D38 governs constitutional changes; D39 governs implementation scope.

Corrections, context changes, withdrawals, refutations, translations, and supersessions are prospective and additive. They must not rewrite the historical context under which a claim was evaluated, content published, assessment made, decision delivered, learner interacted, or state recorded.

## 12. Conflict and Fail-Closed Rules

Context conflicts may concern domains, axioms, definitions, notation, premises, semantics, versions, translations, source authority, content, curriculum, policy, assessment, AI, providers, or implementation. Conflict creates no context authority, equivalence, truth, or permission to choose a convenient system.

No precedence may be inferred from recency, popularity, educational level, provider, publication, graph centrality, source count, AI confidence, matching outputs, storage, or implementation use.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Domain/context/assumptions are missing or ambiguous | No consequential claim validation/use. |
| Definitions, notation, or rules conflict | Preserve conflict; no silent substitution. |
| Translation/equivalence is unresolved | No interchange, migration, activation, or dependent use. |
| Context is recognised outside its stated purpose/scope | Do not extend applicability. |
| External/AI/content/curriculum source proposes context without authority | Treat as proposal/unresolved. |
| Context change affects historical claims/use | Apply prospective re-evaluation; preserve historical facts. |
| Dependent content/assessment/state/response uses unresolved context | Block affected consequence; do not invent context. |

Fail-closed behaviour must not invent axioms, definitions, canonical domains, equivalence, mathematical truth, content authority, assessment truth, learner state, or pedagogical authority.

## 13. Relationship to D1–D40

D41 is subordinate to every locked decision and creates no exception.

| Decision | D41 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Formal context selection/use cannot infer learner consent, choice, or commitment. |
| **D2 — Learning-State Authority** | Learner state/evidence cannot establish formal context or mathematical truth. |
| **D3–D4 — Curriculum and Academic Progression** | Curriculum/level/progression cannot silently choose axioms or canonical definitions. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Content/relations/experience do not establish context truth or applicability. |
| **D8 — Assessment & Evidence** | Assessment does not determine formal context or mathematical truth. |
| **D9–D11 — Decisioning, Publication, and Policy Lifecycle** | Policy/content activation cannot establish or change mathematical context. |
| **D12–D13 — History, Version, Migration** | Context version/migration/equivalence are explicit, additive, and prospective. |
| **D14 — AI Proposal** | AI may propose contexts/translations but cannot authorise them. |
| **D15–D16 — Delegation and Governance Action** | Context authority requires recognised actor/action and review; technical validation is not approval. |
| **D17–D18 — Interpretation and Conflict** | Interpretation cannot resolve context authority; conflict creates no precedence. |
| **D19–D20 — Data and Rights** | Data access/representation does not establish mathematical context authority. |
| **D21–D22 — Evidence and Conclusions** | Evidence/conclusions/commitments do not establish formal context or axiom authority. |
| **D23–D24 — Experience and Delegated Choice** | Experience/representation cannot create context selection or learner choice. |
| **D25 — Policy Relationships** | Policy compatibility/equivalence is not formal-context equivalence. |
| **D26–D28 — Interpretation, State, Adaptation** | Interpretation/state/adaptation/response cannot choose or alter mathematical context authority. |
| **D29–D30 — Delivery and Operational Execution** | Delivery/execution cannot establish context, axioms, definitions, or equivalence. |
| **D31–D32 — Conformance and Release** | Verification/release cannot make an unresolved context authoritative. |
| **D33–D34 — Incident and Data Protection** | Incident/data actions do not resolve mathematical context or rewrite its history. |
| **D35 — Identity/Authentication/Access** | Authentication/access does not grant formal-context authority. |
| **D36 — Context/Tenant Isolation** | Organisational context is distinct from formal mathematical context. |
| **D37 — External Integration** | Provider/source exchange cannot establish formal context or equivalence. |
| **D38 — Constitutional Integrity** | Governance versioning cannot silently alter formal-context meaning. |
| **D39 — Implementation Authorisation** | Implementation permission cannot choose or change formal context outside scope. |
| **D40 — Mathematical Truth/Claim Authority** | Claim validation requires explicit formal context; context authority does not prove claims. |

## 14. Prohibited Behaviours

14.1. Treating a domain label, textbook, curriculum, content asset, provider, AI output, graph relationship, common notation, or implementation as automatic authority for axioms, definitions, rules, or formal context.

14.2. Validating or presenting a claim without identifying the applicable definitions, assumptions, domain, axioms/rules, notation, and formal context where those affect meaning.

14.3. Silently substituting definitions, assumptions, axioms, rules, models, notation, or domain restrictions to make a proof, validator, content item, assessment, or implementation pass.

14.4. Treating shared labels, identifiers, notation, formats, sources, outputs, or successful translation as formal-context equivalence.

14.5. Treating context recognition, activation, publication, curriculum placement, assessment use, learner success, AI confidence, provider trust, or storage as mathematical truth or canonical context authority.

14.6. Applying a proof, definition, derivation, validation result, content item, policy, assessment, or state across formal contexts without explicit applicability and translation/equivalence review.

14.7. Allowing an AI system, provider, content/curriculum system, policy engine, assessment system, validator, deterministic engine, or implementation to authorise a formal context or axiom system for itself.

14.8. Resolving context conflicts through recency, popularity, majority, curriculum level, provider status, graph centrality, matching outputs, AI confidence, storage order, or convenience.

14.9. Rewriting historical context bindings, premises, definitions, validations, publications, assessments, choices, state, decisions, events, or provenance after a context change or correction.

14.10. Treating a context translation, simplification, notation conversion, or learner-facing representation as universal equivalence without explicit authority.

14.11. Implementing formal-context governance, theorem proving, validation, knowledge, persistence, content, assessment, AI, UI/API, or any other functionality from D41.

## 15. Explicit Deferrals

D41 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific axiomatic systems, foundations, mathematical domains, canonical definitions, notation standards, models, or source hierarchy | D41 defines the authority boundary without selecting mathematics. |
| Specific mathematical authorities, domain experts, validators, formal systems, theorem provers, or review bodies | D15/D16 require explicit recognition; D41 names none. |
| Exact context ontology, status vocabulary, applicability criteria, translation methods, equivalence thresholds, and conflict procedures | These require purpose- and domain-specific future governance. |
| Formalisation, theorem proving, computer algebra, symbolic/numerical computation, solver technology, storage, and tooling | D41 is implementation-independent. |
| Content, curriculum, policy, assessment, AI, provider, state, adaptation, delivery, and learner-choice decisions | D1–D40 remain controlling; formal context does not create these. |
| Legal, accreditation, examination, institutional, or jurisdictional standards | D41 creates no external or institutional authority. |
| Slice 6 scope and implementation authorisation | D41 is a governance boundary, not implementation approval. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D41 at this stage.**

If D41 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for formal context, domain, axiom/rule system, assumptions, definitions, notation, semantics, model, dependencies, applicability, claim binding, translation, equivalence review, version, status, authority, uncertainty, conflict, correction, withdrawal, supersession, and historical applicability.

Future contracts must not encode a domain label as axiomatic authority, a context ID as truth, a translation as equivalence, structural completeness as semantic completeness, or a recognised context as universal applicability. They must preserve context/claim/source distinctions and fail closed when context, assumptions, definitions, scope, version, authority, translation, equivalence, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, knowledge, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin on the basis of D41.**
>
> D41 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D42, or Slice 6 work. Any future implementation requires explicit human approval of D41 and a separate controlled implementation authorisation for an exact scope.

## 18. Approval Recommendation

D41 is presented for human architectural review as the formal-context boundary required after the complete D1–D40 authority chain. It protects the distinction between mathematical claims and the formal systems in which they are interpreted, while preventing context labels, sources, curriculum, providers, AI, validation, and implementation from silently becoming mathematical authority.

> **D41 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D42, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
