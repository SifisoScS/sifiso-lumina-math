# Math Lumina Learning Engine — Phase 1 Canonical Domain and Contract Specification

**Status:** Presented for explicit approval. This is a **domain and contract specification only**. It selects no database, API technology, AI provider, authentication implementation, UI, or production persistence mechanism, and it contains no implementation code.

## Scope and status conventions

This specification implements the approved Phase 0.5 architectural direction: Math Lumina is a headless learning-decision engine with five core domains. It preserves all unresolved matters as unresolved unless the minimum *shape* of a contract is necessary to state the domain model.

| Label | Meaning |
|---|---|
| **SOURCE REQUIREMENT** | Directly established by the supplied Math Lumina prototype documentation and approved architecture directions. |
| **CANONICAL CONTRACT** | A conceptual structure needed to define the approved domain boundary. It does not choose a technical implementation. |
| **OPEN DECISION** | A material semantic, policy, or operational rule not established by the source material. It is deliberately not invented here. |

> **SOURCE REQUIREMENT:** The engine is headless and interface-agnostic. Mathematical Knowledge, Learner Record, Pedagogical Model, Learning Decisioning, and Policy/Governance are the approved core domains. AI reasoning, persistence, API transport, identity implementation, and clients remain outside the engine core.

---

# 1. Canonical Domain Model

## 1.1 The five core domains

| Core domain | Canonical responsibility | Owns | Does not own |
|---|---|---|---|
| **Mathematical Knowledge** | Represents versioned, structured mathematics and its available learning material. | Mathematical identities and relationships; knowledge assets; learning experiences; curriculum scope. | Individual learner history, screen content, database representations, or AI prompts. |
| **Learner Record** | Preserves learner-linked facts, historical events, learner-owned evidence, qualified interpretations, and current state projections. | Evidence separation, event history, learner context, current-state projection, provenance references. | Identity-provider implementation, pedagogical rules, AI provider logic, or UI session state. |
| **Pedagogical Model** | Defines how knowledge may be taught through Intuition, Mechanics, and Exam Patterns, including suitable learning opportunities. | Layer definitions, pedagogical intent, experience suitability, instructional guidance. | Whether a specific learner should be offered an opportunity now; this is Learning Decisioning. |
| **Learning Decisioning** | Evaluates knowledge, learner record, pedagogy, context, and applicable policy to produce explainable learning decisions and offers. | Evidence interpretation, opportunity selection, adaptation, recommendations, decisions, decision provenance. | UI events, provider-specific AI behaviour, persistence technology, or silent state mutation. |
| **Policy and Governance** | Enforces autonomy, psychological safety, non-evaluative behaviour, reflection ownership, evidence preservation, permissions/consent boundaries, and AI-proposal acceptance rules. | Constraints, policy evaluation, policy version references, permissible/impermissible outcomes. | UI wording alone, model prompts as the sole control, or storage implementation. |

**CANONICAL CONTRACT:** The domains cooperate through concepts and contracts rather than each knowing the internal storage or implementation of another. Policy/Governance is cross-cutting: it constrains inputs, evaluation, decision content, and state commitments. It is shown late in the flow only because it validates the composite decision; it does not apply only at the end.

## 1.2 Domain ownership and lifecycle

| Domain | Primary lifecycle | Inputs | Outputs |
|---|---|---|---|
| Mathematical Knowledge | Knowledge assets are identified, versioned, published, used, superseded, and retired according to a future governance process. | Knowledge publication context; stable locators; curriculum scope. | Resolved concepts, relationships, representations, and eligible learning experiences. |
| Learner Record | Evidence is received, immutable historical facts are recorded, interpretations are derived and qualified, and current state is projected/revised. | Trusted learner command; actor/context reference; accepted decision/commitment. | Relevant record view, evidence references, event history, derived interpretations, current state. |
| Pedagogical Model | Pedagogical policies/layer definitions are defined and versioned; they classify or constrain learning experiences. | Knowledge structures, pedagogical layer/intention, approved rule version. | Pedagogically suitable opportunity candidates and layer guidance. |
| Learning Decisioning | An interaction is evaluated, an explainable decision is created, offers/recommendations are made, and a later confirmed choice may initiate a commitment. | Command, context, knowledge, learner record, pedagogy, policy results, optionally accepted reasoning proposals. | Learning decision, recommendations, offers, rationale/provenance, candidate commitment. |
| Policy and Governance | Applicable policies are selected and evaluated against commands, evidence handling, proposals, decisions, offers, choices, and commitments. | Policy scope/version, actor context, candidate domain object/action. | Permit, prohibit, constrain, require-confirmation, or review-required result with rationale. |

**OPEN DECISION:** The authority, editorial workflow, approval workflow, and retirement policy for knowledge and pedagogical/policy versions are not established. The table defines the domain lifecycle stages only; it does not assign actors or technical workflows.

---

# 2. Entity and Value-Object Classification

An **entity** has a stable identity and lifecycle independent of any one representation. A **value object** is defined by its content in the relevant domain context and is not independently owned. A **relationship** has meaning between entities and is modelled explicitly where it requires direction, type, provenance, or lifecycle. A **knowledge asset** is versioned material attached to mathematical meaning. This is a conceptual classification—not a database schema.

## 2.1 Mathematical Knowledge classification

| Item | Classification | Rationale | Owner |
|---|---|---|---|
| **Mathematics Domain** | Entity | A stable curriculum/mathematical scope that can contain topics and be independently versioned or referenced. | Mathematical Knowledge |
| **Topic** | Entity | A stable grouping such as Functions, Algebra Fundamentals, or Trigonometry. | Mathematical Knowledge |
| **Concept** | Entity | The stable, addressable unit of mathematical meaning around which learning is organized. | Mathematical Knowledge |
| **Concept Relationship** | Relationship entity | A relationship has its own identity, type, direction, rationale, and version scope. It cannot safely be reduced to an unqualified list. | Mathematical Knowledge |
| **Prerequisite** | Relationship kind | It is a typed Concept Relationship rather than a distinct top-level entity in the minimum model. | Mathematical Knowledge |
| **Concept Bridge** | Relationship kind | It is a typed Concept Relationship that expresses a pedagogically meaningful connection. | Mathematical Knowledge |
| **Representation** | Knowledge asset | A versioned way of encountering a concept—intuitive, formal, visual, verbal, symbolic, physical, or another approved type. | Mathematical Knowledge |
| **Example** | Knowledge asset kind | A learning asset that illustrates a concept/representation under known conditions. | Mathematical Knowledge |
| **Non-example** | Knowledge asset kind | A learning asset that clarifies the boundaries of a concept. | Mathematical Knowledge |
| **Procedure** | Knowledge asset kind | A formal process/method linked to a concept and applicable conditions. | Mathematical Knowledge |
| **Misconception** | Knowledge asset kind | A documented potential interpretation pattern, never an intrinsic learner label. | Mathematical Knowledge |
| **Application** | Knowledge asset kind | A contextual use or connection of a concept. | Mathematical Knowledge |
| **Exam Pattern** | Knowledge asset kind | A pattern of assessment recognition, strategy, and potential trap associated with concepts. | Mathematical Knowledge |
| **Learning Experience** | Entity | An addressable, offerable composition of knowledge assets with declared pedagogical intent and version. | Mathematical Knowledge, classified by Pedagogical Model |
| **Knowledge Version** | Value object | Identifies the authoritative version context of a resolved knowledge item. | Mathematical Knowledge |
| **Knowledge Locator** | Value object | A stable reference to a domain, topic, concept, asset, relationship, or learning experience. | Mathematical Knowledge |

**SOURCE REQUIREMENT:** Mathematics must be structured rather than modelled as pages of text. The source material explicitly includes domains, topics, concepts, prerequisites, representations, examples, non-examples, procedures, patterns, misconceptions, applications, exam patterns, and bridges.

**OPEN DECISION:** The complete taxonomy of relationship types, representation types, learning-experience types, curriculum levels, and content locales is not yet established. The canonical model permits those taxonomies but does not populate or rank them.

## 2.2 Learner Record classification

| Item | Classification | Purpose | Owner |
|---|---|---|---|
| **Learner Identity Reference** | Value object | A non-provider-specific reference to the learner/actor to which the record applies. It is not an identity implementation. | Learner Record |
| **Learning Context** | Value object / time-bound report | Captures active learning intention and energy/context where supplied. | Learner Record |
| **Learning Event** | Entity / immutable historical fact | Records that a meaningful domain event occurred at a time and in a context. | Learner Record |
| **Learner Reflection** | Learner-owned evidence entity | Preserves the learner’s original words. It is immutable after accepted submission. | Learner Record |
| **Practice Attempt** | Learner-owned evidence entity | Preserves an interaction with a practice experience and any learner-provided answer/self-assessment. | Learner Record |
| **Confidence Report** | Learner-owned evidence entity | Preserves the learner’s self-reported confidence, including its declared scale/context. | Learner Record |
| **Learner Choice** | Learner-owned evidence entity | Records a learner’s confirmed selection, decline, pause, or other semantic choice. | Learner Record |
| **Interpretation** | Derived interpretation entity | A qualified inference from specific evidence; it includes uncertainty and provenance. | Learner Record, produced by Learning Decisioning |
| **Current Learner State** | Derived state projection | The current, revisable operational view of relevant learner context, focus, evidence-linked signals, and available state facts. | Learner Record |
| **Evidence Reference** | Value object | References learner-owned evidence or trusted historical facts without copying or overwriting it. | Learner Record |
| **Provenance Reference** | Value object | References knowledge, policy, pedagogical, event, evidence, decision, or accepted-proposal material used to create another object. | Shared canonical value object |
| **Uncertainty Statement** | Value object | Qualifies a derived interpretation, recommendation, or decision; it is not a pseudo-precise score. | Shared canonical value object |
| **State Commitment** | Entity / recorded domain outcome | Represents a policy-valid change to an authorized current-state projection, caused by a legitimate command/choice/decision. | Learner Record, initiated by Learning Decisioning |

## 2.3 Pedagogy, decisioning, and policy classification

| Item | Classification | Purpose | Owner |
|---|---|---|---|
| **Pedagogical Layer** | Value object / controlled conceptual category | Defines Intuition, Mechanics, or Exam Patterns as instructional intent, not a UI tab. | Pedagogical Model |
| **Pedagogical Guidance** | Value object | Describes suitable teaching purpose, experience attributes, and transition guidance for a layer. | Pedagogical Model |
| **Pedagogical Rule Reference** | Value object | Identifies the pedagogical rule/version relevant to an opportunity or decision. | Pedagogical Model |
| **Learning Opportunity** | Value object | A semantic possibility such as continue, revisit, practise, reflect, explore a representation, move toward a layer, explore a bridge, pause, or choose. | Learning Decisioning |
| **Learning Recommendation** | Value object | An explainable, non-binding candidate opportunity the engine considers suitable. | Learning Decisioning |
| **Learning Offer** | Entity / interaction-scoped commitment candidate | An opportunity made available to the learner under stated constraints, status, and choice requirements. | Learning Decisioning |
| **Learning Decision** | Entity / material decision record | The explainable result of a canonical evaluation. It selects or authorizes offers, never contains UI instructions. | Learning Decisioning |
| **Decision Provenance** | Value object | The accountable basis for a material Learning Decision. | Learning Decisioning |
| **Policy Definition** | Entity | A versioned policy with scope and authority reference. | Policy/Governance |
| **Policy Rule** | Value object within a Policy Definition | A specific enforceable constraint or requirement. | Policy/Governance |
| **Policy Evaluation** | Value object / record | The result of applying applicable policy to an input or candidate outcome. | Policy/Governance |
| **Trusted Actor Context** | Edge-contract value object | Supplies a verified actor reference, authorization/consent context, and scope to the engine without exposing an identity implementation. | Boundary contract; consumed by Policy/Governance |
| **Delivery Capability Profile** | Edge-contract value object | Describes modality-neutral capabilities/limits relevant to compatible delivery, without naming a client technology. | Boundary contract; consumed by Learning Decisioning/Pedagogy |

---

# 3. Relationship Map

## 3.1 Canonical relationship map

```text
Mathematics Domain
   └── contains/references → Topic
          └── contains/references → Concept
                 ├── participates in → Concept Relationship
                 │       ├── prerequisite-of → Concept
                 │       └── bridge-to → Concept
                 ├── is represented by → Knowledge Asset
                 │       └── classified as → Representation | Example | Non-example |
                 │                              Procedure | Misconception | Application | Exam Pattern
                 └── is learned through → Learning Experience
                                           └── is classified by → Pedagogical Layer / Guidance

Learner Identity Reference
   └── has → Learner Record
          ├── contains → Historical Learning Event
          ├── preserves → Learner-owned Evidence
          │       ├── Reflection
          │       ├── Practice Attempt
          │       ├── Confidence Report
          │       └── Learner Choice
          ├── supports → Derived Interpretation
          └── projects → Current Learner State

Knowledge + Learner Record + Pedagogical Model + Policy/Governance
   └── inform → Learning Decision
                    ├── contains → Learning Recommendation(s)
                    ├── authorizes → Learning Offer(s)
                    ├── carries → Decision Provenance
                    └── may propose → State Commitment

Confirmed Learner Choice + permitted State Commitment
   └── produces → Historical Learning Event and revised Current Learner State
```

## 3.2 Important relationship rules

| Relationship | Canonical rule |
|---|---|
| Concept ↔ Concept Relationship | A relationship is directional or non-directional only as declared by its type; directionality is not implied by storage order. |
| Prerequisite / Bridge | Both are Concept Relationship kinds. A prerequisite expresses relevant prior knowledge; a bridge expresses a pedagogically meaningful connection. Neither is automatically a hard access gate. |
| Concept ↔ Knowledge Asset | An asset may relate to more than one concept and more than one pedagogical layer. It is not owned by a React component or a single page. |
| Learning Experience ↔ Knowledge Assets | A learning experience composes/references approved knowledge assets for a defined instructional intent. It must identify its knowledge-version context. |
| Learner-owned Evidence ↔ Interpretation | An interpretation references its source evidence and must never replace, rewrite, or become indistinguishable from it. |
| Learning Decision ↔ Recommendation / Offer | A recommendation is non-binding. An offer is an available, constrained opportunity. Neither is a learner choice or a state commitment. |
| Learner Choice ↔ State Commitment | A confirmed learner choice may satisfy a confirmation requirement for a state commitment, but policy validation remains necessary. |
| State Commitment ↔ Historical Event | A permitted commitment must be auditable through an associated historical event or another explicit historical record. The exact persistence shape remains open. |

**SOURCE REQUIREMENT:** Source facts, historical events, learner-owned evidence, derived interpretations, current learner state, recommendations, offers, learner choices, decisions, and state commitments are distinct concepts. This specification preserves that distinction rather than simplifying it for a future implementation.

---

# 4. Canonical Interaction Model

## 4.1 Interaction lifecycle

```text
Learner Intent
   ↓
Interaction Command + Trusted Actor Context + Learning Context + Delivery Capability Profile
   ↓
Command / scope / policy pre-validation
   ↓
Resolve Mathematical Knowledge + relevant Learner Record + Pedagogical Guidance
   ↓
Engine Evaluation
   ↓
Learning Decision with Decision Provenance
   ↓
Learning Recommendation(s) and/or Learning Offer(s)
   ↓
Learner Choice where confirmation is required
   ↓
Policy Validation of the proposed commitment
   ↓
State Commitment
   ↓
Historical Learning Event + revised Current Learner State projection
   ↓
Learning Interaction Response at the edge
```

## 4.2 Canonical interaction inputs

| Input | Meaning | Boundary rule |
|---|---|---|
| **Learner Intent** | The learner’s intended learning purpose, such as seeking an explanation, submitting a reflection, reporting confidence, asking for another representation, accepting/declining an offer, or pausing. | It is conceptual and can originate from web, voice, mobile, teacher-supported, API, or other clients. |
| **Interaction Command** | The canonical semantic expression of the learner intent. | It must not encode a click, page, route, tab, widget, or client-specific event. |
| **Trusted Actor Context** | Verified actor reference, scope, authorization/consent-related context, and request provenance supplied by an external identity boundary. | The core consumes the context but does not implement sign-in, token verification, or an identity provider. |
| **Learning Context** | The currently supplied learning intention and optional energy/context state. | It is learner/context data, not a judgement about ability. |
| **Delivery Capability Profile** | Generic declared capabilities or limitations relevant to a compatible experience, such as whether output can be spoken, displayed, or collected as typed/spoken input. | It cannot contain React components, browsers, device brands, screen names, or UI layout assumptions. |

## 4.3 Command families

| Command family | Illustrative semantic intents | Immediate canonical output |
|---|---|---|
| **Explore knowledge** | Request a concept; request an available representation; request a pedagogical layer; request an exam-pattern opportunity. | A decision that may return compatible information/offers subject to policy. |
| **Submit learner-owned evidence** | Submit a reflection; submit a practice attempt; report confidence; report learning context. | Validated evidence reception, an event/evidence record, and an updated evaluation opportunity. |
| **Respond to an offer** | Select, decline, defer, or pause an existing offer; select an alternative permitted opportunity. | A choice record and, where valid, a candidate state commitment. |
| **Seek adaptation** | Ask what to do next; ask for a different representation; ask to revisit or explore a bridge. | An explainable decision with recommendations/offers; never an unannounced progression. |

**OPEN DECISION:** The complete public command vocabulary, argument shapes, command idempotency, and error semantics are implementation-adjacent contract details that require later domain-contract refinement. The command *families* above are sufficient for Phase 1 canonical meaning.

## 4.4 Automatic transitions versus learner confirmation

| Transition | Status | Rule |
|---|---|---|
| Validate a received command, actor scope, and required context. | **Automatic** | Validation is an engine/application responsibility and does not itself change learning state. |
| Resolve relevant knowledge, learner record, pedagogical guidance, and applicable policy. | **Automatic** | This creates evaluation inputs only. |
| Create a Learning Decision, recommendation, or offer. | **Automatic** | A decision/offer is not a learner action and must not itself constitute progression. |
| Record a learner-submitted reflection, practice attempt, confidence report, or supplied context as source evidence. | **Automatic after explicit submission** | The explicit evidence-submission command is the learner’s affirmative action. The original source material remains immutable after acceptance. |
| Derive an interpretation from accepted evidence. | **Automatic only after validation and policy evaluation** | It is a qualified, evidence-linked interpretation; it may not silently rewrite confidence, completion, permissions, or other material learner state. Retention rules remain open. |
| Select/revisit an experience, prerequisite, concept bridge, or move toward another pedagogical layer because it was recommended. | **Requires learner confirmation** | A recommendation or offer cannot be treated as a choice. A confirmed semantic command is required. |
| Commit a learner-path/progression change based on a learner choice. | **Requires learner confirmation and policy validation** | Confirmation establishes learner agency; policy validation remains a separate gate. |
| Record the historical outcome of an authorized commitment. | **Automatic after valid commitment** | The system records what occurred, not what it predicts or recommends. |
| Change confidence, understanding, or learner-owned reflection content from an AI proposal or engine inference. | **Prohibited as an automatic transition** | AI/derived interpretation must not silently control critical learner state. |

**OPEN DECISION:** Whether specific forms of access may ever be restricted by a prerequisite, and whether any pedagogical transition can occur without a separate confirmation, have not been set by the source material. Until explicitly approved, prerequisite information is advisory and recommendations remain non-binding.

---

# 5. Mathematical Knowledge Model

## 5.1 Minimum canonical structures

| Structure | Canonical purpose | Minimum semantic fields | Relationships |
|---|---|---|---|
| **Mathematics Domain** | Establishes a mathematical/curricular scope. | Stable identity; title/description; version reference; status. | Groups Topics; may identify curriculum/level scope. |
| **Topic** | Groups related concepts. | Stable identity; label; order/display metadata if needed outside core meaning; version reference. | Belongs to/references a Mathematics Domain; relates to Concepts. |
| **Concept** | Represents a stable mathematical meaning. | Stable identity; name; conceptual description; version reference; status. | Participates in Relationships; references Knowledge Assets and Learning Experiences. |
| **Concept Relationship** | Represents semantic relation between concepts. | Stable identity; relation kind; source/target locators; rationale; version; status. | May be a prerequisite, bridge, or another approved relationship kind. |
| **Representation** | Gives a specific form in which a concept may be understood. | Asset identity; representation kind; content/reference; supported concept(s); applicable layer(s); version. | May support examples, procedures, and learning experiences. |
| **Example / Non-example** | Clarifies a concept’s inclusion, boundary, and contrast. | Asset identity; kind; concept/representation references; explanatory purpose; version. | May be included in a learning experience. |
| **Procedure** | Describes a formal method and its applicability. | Asset identity; steps/structure; preconditions; concept references; version. | Usually relevant to Mechanics; may also support Exam Patterns. |
| **Misconception** | Describes a potential non-judgmental pattern of interpretation. | Asset identity; concept/representation references; neutral description; alternative opportunity reference; version. | May inform candidate explanation/reframing selection. |
| **Application** | Connects a concept to a contextual use. | Asset identity; context; concept references; version. | May be offerable through a learning experience. |
| **Exam Pattern** | Describes a recurring exam-oriented pattern. | Asset identity; recognition cues; strategy/conditions; potential trap description; concept references; version. | Supports Exam Patterns experiences. |
| **Concept Bridge** | Expresses a forward/lateral conceptual connection. | Concept Relationship data plus pedagogical rationale. | Connects Concepts; may be offered as a learning opportunity. |
| **Learning Experience** | The engine-addressable unit offered to a learner. | Stable identity; intent; target concept(s); asset references; eligible pedagogical layers; version; capability/constraint metadata. | Composes Knowledge Assets; is classified by Pedagogical Model; is selected by Learning Decisioning. |

**CANONICAL CONTRACT:** A prerequisite and a concept bridge are *relationship kinds*, not mandatory top-level entities. Examples, non-examples, procedures, misconceptions, applications, and exam patterns are *knowledge asset kinds*, not mandatory top-level entities. Learning Experience remains a separate entity because it is what the engine actually offers, tracks, and references over time.

## 5.2 Knowledge invariants

| Invariant | Meaning |
|---|---|
| **Stable addressability** | Every Concept, Concept Relationship, Knowledge Asset, and Learning Experience must be referenceable independent of a page, component, or current UI route. |
| **Version context** | Every resolved knowledge element used in a material decision must be associated with a knowledge-version reference. |
| **No presentation ownership** | Educational content does not live conceptually inside React components, tabs, pages, or layout definitions. |
| **Relationship integrity** | A Concept Relationship must reference valid concepts and declare its kind; untyped, unexplained “related concepts” are insufficient for decisioning. |
| **Misconception neutrality** | A Misconception asset describes a possible knowledge/representation pattern; it must not become a permanent or judgemental label applied to a learner. |
| **Experience composition** | A Learning Experience must reference a target concept/knowledge context and pedagogical intent. It cannot be an unscoped arbitrary piece of content. |

**OPEN DECISION:** Publication validity rules for mathematical accuracy, localization, content review, retirement, curriculum mapping, and allowed relationship graph patterns are not supplied and therefore not set here.

---

# 6. Learner Record Model

## 6.1 Canonical separation of learner-linked information

| Category | What it is | Examples | Mutability / ownership |
|---|---|---|---|
| **Source facts** | Trusted domain facts supplied/resolved for an interaction. | Learner identity reference; command receipt time; published knowledge/version reference; trusted actor scope. | Governed by their source; not learner interpretation. |
| **Historical events** | Immutable account that a domain-relevant occurrence happened. | `ConceptViewed`, `LayerEntered`, `PracticeAttempted`, `ReflectionSubmitted`, `ConfidenceReported`, `InsightGenerated`, `LearningPathSuggested`, `LearningPathAccepted`, `LearningPathDeclined`, `ConceptRevisited`. | Immutable historical record; correction/erasure semantics are open. |
| **Learner-owned evidence** | Original material directly supplied or explicitly chosen by the learner. | Reflection text; practice attempt/answer; confidence report; learning-context report; learner choice. | The original material must remain distinct and immutable after accepted submission. |
| **Derived interpretation** | A qualified system conclusion based on identified evidence. | Possible uncertainty around a representation; curiosity thread; emerging understanding signal; candidate misconception hypothesis. | Revisable and uncertainty-qualified; never masquerades as original learner material. |
| **Current learner state** | The present operational projection used in learning evaluation. | Current concept/layer focus; relevant prerequisite context; active learning context; evidence-linked signals; current available/selected opportunities. | Derived/reconstructable; not a replacement for event history. |
| **Recommendation** | A non-binding candidate next opportunity with reason. | Offer another representation; revisit prerequisite; practise; pause. | Does not mutate learner state or establish a learner choice. |
| **Offer** | An opportunity the engine has made available with explicit constraints. | A particular Mechanics experience, optional bridge, low-energy summary, or reflection prompt. | Interaction-scoped; not evidence of use or acceptance. |
| **Learner choice** | A confirmed semantic response by the learner. | Accept, decline, defer, pause, request alternative, choose a layer/experience. | Learner-owned evidence and historical fact once accepted. |
| **Decision** | The engine’s explainable conclusion from an evaluation. | A set of permitted/appropriate opportunities and offers for the present context. | A system output with provenance; not a learner action. |
| **State commitment** | An authorized change to a current-state projection following valid inputs/choice/policy. | Record current focus following a confirmed experience selection; reflect newly accepted source evidence. | Must be policy-valid, provenance-linked, and historically auditable. |

## 6.2 Learner Record components

| Component | Canonical content | Notes |
|---|---|---|
| **Learner Identity Reference** | A non-implementation-specific learner reference and relevant record scope. | The identity implementation remains outside the engine. |
| **Learning Context** | Current learning intention, optional emotional/energy/context state, its time/context reference, and source/provenance. | **SOURCE REQUIREMENT:** Feelings and low-energy circumstances can affect learning; this must not become a deficit label. |
| **Historical Event Collection** | Append-only event references associated with the learner record. | Full event sourcing is not required by this specification. |
| **Learner-owned Evidence Collection** | Immutable reflections, practice attempts, confidence reports, context reports, and choices. | A reflection’s source text remains the learner’s voice. |
| **Derived Interpretation Collection** | Evidence-linked, policy-valid interpretations with uncertainty and method/proposal provenance. | An interpretation is not a fact about the learner. |
| **Current Learner State Projection** | Current focus, relevant concept relations, reported-confidence references, active context, and qualified signals relevant to evaluation. | It is reconstructable from evidence/events plus approved derivation rules in principle. |
| **State Commitment Collection** | Records of material projection changes with authorizing decision/choice/policy references. | Prevents silent or unaccountable updates. |

## 6.3 Learner Record invariants

| Invariant | Meaning |
|---|---|
| **Reflection preservation** | The original reflection cannot be overwritten by an insight, summary, or AI-generated interpretation. |
| **Evidence/interpretation separation** | A derived interpretation must identify source evidence and its uncertainty. It cannot be stored as though the learner stated it. |
| **Self-reported confidence integrity** | A learner’s confidence report must remain distinguishable from any system interpretation. No model-derived number may replace it. |
| **Event/state separation** | A current state projection must not erase or replace the events/evidence from which it was formed. |
| **Choice integrity** | A recommendation or offer is not a learner choice. Choice requires a confirmed semantic command from the learner. |
| **Commitment integrity** | Material state changes require a valid authorizing path: accepted command/evidence or confirmed choice, applicable policy evaluation, and decision/provenance reference. |
| **No screen-visit mastery inference** | Viewing a page, entering a layer, or opening an experience is historical engagement evidence only; it is not proof of understanding. |

**OPEN DECISION:** The standard scale/semantics of confidence, retention and deletion behaviour, record reconstruction method, event correction rules, and the boundary between “material” and “non-material” state change remain unresolved.

---

# 7. Pedagogical Model

## 7.1 Canonical layer definitions

| Pedagogical layer | Engine-level purpose | Suitable learning-experience characteristics | Not equivalent to |
|---|---|---|---|
| **Intuition** | Help build a mental model before formal notation dominates. | Everyday metaphors, micro-stories, physical/visual/verbal connections, core insights, accessible alternative representations. | A first UI tab or compulsory first screen. |
| **Mechanics** | Help learners understand formal processes, notation, and why steps work. | Gradual notation, explicit reasoning, worked examples, procedures, and guided practice. | Automatic progression after an interface action. |
| **Exam Patterns** | Provide strategic, pattern-focused preparation where useful or chosen. | Common question formats, recognition strategies, typical traps, and contextual exam practice. | A score-driven or competitive learner classification. |

**SOURCE REQUIREMENT:** The three layers are pedagogical states/layers rather than mere UI tabs. The engine recommends rather than dominates, and learners control their learning journey.

## 7.2 Pedagogical guidance contract

| Contract input | Contract output | Invariants |
|---|---|---|
| Resolved concept/relationships, learning experience candidates, requested pedagogical intent, knowledge version, and applicable policy constraints. | Pedagogically suitable opportunities and their intent; guidance on whether an experience supports Intuition, Mechanics, Exam Patterns, reinforcement, exploration, practice, reflection, low-energy access, or a bridge. | It does not select a compulsory UI sequence, determine learner authorization, or silently transition the learner. |

## 7.3 Pedagogical invariants

| Invariant | Meaning |
|---|---|
| **Layer-as-intent** | A pedagogical layer expresses an educational purpose, not visual placement or route order. |
| **Multiple entry points** | The model supports different suitable representations and does not assume a single representation works for every learner. |
| **Learner autonomy** | Pedagogical guidance can make opportunities available and explain relevance but cannot itself compel acceptance. |
| **Respect for difficulty** | The model may expose lower-energy or alternative opportunities where available without judging the learner. |
| **Understanding orientation** | The model prioritizes conceptual understanding over speed, comparison, grades, or performance metrics. |

**OPEN DECISION:** Formal readiness criteria, transition/sequence rules, prerequisite access restrictions, pedagogical strategy variants, and evidence thresholds are not specified. No readiness score or mastery state is defined by this document.

---

# 8. Learning Decision Model

## 8.1 Canonical Learning Decision

A **Learning Decision** is the engine’s accountable, interface-neutral answer to a validated interaction in a particular context. It is not a UI action list and not an autonomous state mutation.

| Element | Canonical purpose |
|---|---|
| **Decision identity and context** | Identifies the material decision, timestamp/context reference, learner-record scope, and applicable knowledge/pedagogy/policy versions. |
| **Decision status** | Indicates whether the engine can offer opportunities, requires additional context, is constrained by policy, or cannot complete evaluation safely. Exact status vocabulary is open. |
| **Current learning focus** | Identifies the relevant concept(s), pedagogical intent/layer context, and learner-context reference. |
| **Learning opportunities** | Semantic possibilities such as continue, revisit, explore another representation, practise, reflect, move toward another pedagogical layer, revisit a prerequisite, explore a bridge, pause, or allow learner choice. |
| **Recommendations** | Non-binding opportunities the engine considers relevant, each with reason and evidence/knowledge references. |
| **Offers** | Specific permitted, available experiences/opportunities with constraints and whether a learner choice is required. |
| **Constraints and available actions** | Policy/pedagogy/delivery constraints stated semantically, without client instructions. |
| **Decision provenance** | Evidence, knowledge, pedagogy, policy, accepted reasoning proposals if any, uncertainty, and context references. |
| **Candidate state commitments** | Any proposed state update requiring a valid commitment path. The decision itself does not commit it. |

## 8.2 Canonical semantic learning opportunities

| Opportunity | Meaning | Confirmation requirement |
|---|---|---|
| **Continue** | Remain in the present learning focus through a compatible experience. | Required when selecting a specific offer; evaluation/availability is automatic. |
| **Revisit** | Return to a previously encountered concept, representation, experience, or layer with a defined reason. | Required for learner-path selection. |
| **Explore representation** | Encounter an alternative way to understand a concept. | Required when choosing a specific offered representation. |
| **Practise** | Engage with an offerable practice experience. | Required to initiate/submit learner practice. |
| **Reflect** | Engage with an offerable reflection opportunity. | Required to submit a reflection; offering it is automatic. |
| **Move toward layer** | Select an opportunity aligned to Intuition, Mechanics, or Exam Patterns. | Required; an offer does not equal a move. |
| **Revisit prerequisite** | Voluntarily explore a prerequisite-related concept or experience. | Required unless a future approved policy defines a safe access constraint. |
| **Explore bridge** | Voluntarily follow a concept bridge. | Required. |
| **Pause** | Stop or defer active learning without penalty or adverse inference. | Required as an explicit learner choice if it becomes historical state. |
| **Allow learner choice** | Return a set of suitable options without asserting one dominant path. | No selection is assumed; a later learner choice is required for commitment. |

## 8.3 Decisioning contract

| Input | Output | Invariants |
|---|---|---|
| Interaction Command; Trusted Actor Context; Learning Context; Delivery Capability Profile; relevant Mathematical Knowledge; Learner Record; Pedagogical Guidance; Policy Evaluations; accepted Reasoning Proposals where valid. | Learning Decision containing semantic opportunities, recommendations/offers, constraints, candidate commitments, and decision provenance. | Deterministic rules are not hidden in AI prompts; the decision does not mention screens/routes; recommendations do not become choice; AI cannot directly control critical state. |

**SOURCE REQUIREMENT:** The engine must express possibilities including continue, alternate representation, prerequisite revisit, practice, reflection, mechanics, exam pattern, bridge, pause, and learner choice. It should recommend, not dominate.

**OPEN DECISION:** Recommendation ranking, tie-breaking, quantity of offers, definition of a safe incomplete-context response, and the semantic status vocabulary are not set by the source material.

---

# 9. Policy and Governance Model

## 9.1 Policy boundaries

| Policy boundary | Canonical constraint | Must be evaluated against |
|---|---|---|
| **Learner autonomy** | Recommendations/offers do not become learner choices or progression without the appropriate confirmed command and policy-valid commitment. | Commands, decisions, offers, choices, commitments. |
| **Psychological safety** | The engine must not produce or endorse judgmental learner labelling or coercive progression. | Decisions, generated content/proposals, output text, state changes. |
| **Non-evaluative behaviour** | Avoid prohibited evaluative language and performance-driven framing identified in the source material; rely on respectful descriptions and invitations. | Learning responses/content and AI proposals; policy is not limited to text scanning. |
| **Reflection ownership** | Original learner reflections are preserved as immutable learner-owned evidence. | Evidence reception, interpretation, export/access, state commitment. |
| **State mutation** | Material state change requires a legitimate authorizing path, evidence/choice provenance, and policy validation. | Candidate commitments and persistence requests. |
| **AI proposal acceptance** | AI-generated content or interpretation is only a proposal until schema/provenance/policy validation accepts it for a bounded use. | Reasoning Tasks, Proposals, Interpretations, Decisions. |
| **Evidence preservation** | Source evidence remains distinct from facts, interpretations, state projections, and recommendations. | Learner Record changes. |
| **Permissions and consent** | The engine must consider trusted actor authorization and consent context when accepting commands or exposing/using learner material. | Commands, evidence access, reasoning-task input, decisions. |
| **Provenance** | Material decisions and commitments retain accountable references without disclosing private internal chain-of-thought. | Decisions, interpretations, commitments, response contracts. |

## 9.2 Policy evaluation contract

| Input | Output | Invariants |
|---|---|---|
| Policy scope/version; Trusted Actor Context; candidate command, evidence operation, reasoning proposal, interpretation, decision, offer, learner choice, or state commitment. | Permit, prohibit, constrain, require learner confirmation, or require review; plus a machine-readable and human-understandable rationale reference. | A prompt cannot substitute for policy. A permitted generated proposal is not automatically a permitted state change. Policy results must be provenance-referenceable. |

## 9.3 Policy invariants

| Invariant | Meaning |
|---|---|
| **No judgmental labels** | The engine must avoid the prohibited wording/framings and must not encode a learner as a deficit category. |
| **No silent critical mutation** | AI output, a recommendation, or a client event cannot silently change confidence, understanding, progression, permissions, or reflection source material. |
| **Offer, do not demand** | Where multiple educationally appropriate paths exist, the engine returns appropriate choices rather than a hidden mandatory route, subject to future approved access rules. |
| **Evidence ownership** | Learner-originated expression remains recognizable as such at every stage. |
| **Policy before commitment** | A state commitment cannot be regarded as valid solely because a client asked for it or an AI proposed it. |
| **Explainable constraint** | When policy constrains an outcome, the resulting decision/response identifies the applicable constraint at an appropriate level without exposing private reasoning. |

**OPEN DECISION:** Policy authority, policy version change process, exception/escalation handling, privacy/retention/deletion rules, safeguarding requirements, localization of prohibited language, and exact permission/consent semantics have not been established.

---

# 10. AI Reasoning Contracts

AI is not a core domain. The core defines only a provider-agnostic reasoning port and the canonical objects required to use a proposal safely.

## 10.1 Core-side contracts

| Contract | Input | Output | Core invariant |
|---|---|---|---|
| **Reasoning Task** | Task identity/type; permitted source evidence and knowledge references; context purpose; expected structured result; policy constraints; required provenance; output bounds. | A request to an external reasoning port. | It does not select a provider, model, prompt syntax, tool, or model-specific confidence system. |
| **Reasoning Proposal** | Returned by a reasoning port in response to a task. | Structured candidate content/interpretation; task reference; source references; stated uncertainty; provider-agnostic method reference; validation readiness. | It is not a decision, learner choice, fact, or state commitment. |
| **Proposal Validation** | Proposal; task contract; schema/semantic validation; relevant knowledge/evidence references. | Accept for bounded consideration, reject, or request safe fallback/review; validation reasons. | A malformed, ungrounded, or unsupported proposal cannot enter decisioning as accepted input. |
| **Policy Evaluation** | Validated proposal; applicable policy/actor/consent context. | Permit/limit/prohibit result for the proposal’s intended use. | A schema-valid proposal can still be prohibited by policy. |
| **Decision Integration** | Accepted proposal plus deterministic decision inputs. | A Learning Decision that may reference the proposal in provenance. | The proposal may enrich a decision; it may not determine unauthorized state change. |

## 10.2 Supported reasoning-task families

| Reasoning task family | Permitted conceptual outcome |
|---|---|
| Reflection analysis | Candidate structured understanding signals, curiosity threads, tone observation, or optional next-step candidates, linked to source reflection. |
| Explanation generation | Candidate explanation or metaphor appropriate to an approved concept, representation, and pedagogical purpose. |
| Representation generation | Candidate alternative representation for a known concept and pedagogical context. |
| Misconception hypothesis | Cautious candidate hypothesis and non-judgmental alternative/reframing opportunity; never a learner diagnosis. |
| Practice/question generation | Candidate question/hint/reflection material constrained by an approved concept and learning objective. |
| Adaptive-path suggestion | Candidate non-binding opportunities and rationale subject to deterministic eligibility and policy. |
| Dialogue assistance | Candidate respectful, reflective conversational content within a defined interaction context. |

**SOURCE REQUIREMENT:** AI may assist with reflection analysis, explanations, representations, misconception hypotheses, questions, adaptive suggestions, and dialogue; its outputs should be structured and validated.

## 10.3 AI invariants

| Invariant | Meaning |
|---|---|
| **Provider independence** | The domain refers only to Reasoning Task and Reasoning Proposal contracts. Provider/model choice is hidden behind a port. |
| **Proposal-only authority** | A proposal cannot directly update learner state, relationships, policy, permissions, confidence reports, or original reflections. |
| **Grounded context** | A proposal must reference the evidence/knowledge context explicitly allowed by its task. |
| **Validation before use** | Structure, provenance, semantic suitability, and policy must be evaluated before a proposal can influence a Learning Decision. |
| **Safe fallback** | Absence, failure, or rejection of AI reasoning must not make baseline deterministic learning decisioning unavailable. |

**OPEN DECISION:** The provider/model choice, raw-output retention, prompt/data-minimisation policy, model evaluation criteria, human-review mechanism, confidence thresholds, cost/latency constraints, and escalation process remain unresolved.

---

# 11. Decision Provenance Model

A material Learning Decision must be accountable without exposing private chain-of-thought or treating generated prose as an explanation of the system’s reasoning.

## 11.1 Canonical Decision Provenance

| Provenance element | Required purpose |
|---|---|
| **Decision reference** | Identifies the Learning Decision and its evaluation timestamp/context. |
| **Learner evidence references** | Identifies the relevant reflections, practice attempts, confidence reports, choices, context reports, and/or historical events used. |
| **Knowledge references** | Identifies concepts, relationships, assets, learning experiences, and their knowledge versions relevant to the decision. |
| **Pedagogical rule reference** | Identifies the pedagogical layer/guidance/rule version used to determine suitability. |
| **Policy reference and evaluation** | Identifies the applicable policy version(s) and the effect of policy on the result. |
| **Accepted reasoning proposal references** | Identifies any validated, policy-permitted Reasoning Proposals used, without making them authoritative facts. |
| **Uncertainty statement** | Describes uncertainty or incomplete evidence in a qualitative/structured way that does not claim unwarranted precision. |
| **Delivery capability reference** | Identifies any generic capability constraint that affected compatibility of an offered experience. |
| **Actor/context reference** | Identifies the trusted context under which the decision was made, subject to privacy/authorization controls. |

## 11.2 Provenance invariants

| Invariant | Meaning |
|---|---|
| **Evidence traceability** | A material recommendation or offer must be traceable to the evidence/knowledge/pedagogy/policy basis that permitted it. |
| **Version traceability** | Material decisions identify the knowledge, pedagogical, and policy version context used. |
| **No private chain-of-thought requirement** | Provenance records observable inputs, validated rules/constraints, references, and decision rationale categories—not private hidden model reasoning. |
| **AI non-authoritativeness** | An accepted proposal is recorded as assistance, not as a learner fact or independently sufficient justification for a critical commitment. |
| **Privacy-respecting explanation** | A response may expose an appropriate learner-facing reason, but access to detailed provenance is governed by policy/authorization. |

**SOURCE REQUIREMENT:** The engine must be able to explain recommendations with reasons, evidence, and confidence/uncertainty. This does not require exposing internal reasoning to the learner.

---

# 12. Domain Invariants Summary

| Domain | Non-negotiable invariant |
|---|---|
| Mathematical Knowledge | Mathematical meaning, relationships, and experiences are stable, version-aware, and independent of UI pages. |
| Mathematical Knowledge | Prerequisites and bridges are explicit typed relationships, not accidental navigation links. |
| Learner Record | Historical events and learner-owned evidence remain distinct from derived interpretations and current state. |
| Learner Record | Original reflections are preserved and cannot be overwritten by summaries or AI outputs. |
| Learner Record | Screen interaction is not evidence of understanding; self-reported confidence is not replaced by an inferred score. |
| Pedagogical Model | Intuition, Mechanics, and Exam Patterns are instructional intents, not routes/tabs or compulsory screen order. |
| Pedagogical Model | Difficulty and energy/context are treated respectfully; alternative and lower-energy opportunities may be offered without judgement. |
| Learning Decisioning | Decisions are semantic, explainable, and client-agnostic; they contain no components, routes, layout, or click semantics. |
| Learning Decisioning | Recommendation, offer, learner choice, decision, and state commitment are never conflated. |
| Policy/Governance | Autonomy, psychological safety, evidence ownership, and non-evaluative behaviour are enforceable constraints, not just prompts or UI copy. |
| Policy/Governance | No material state commitment is valid without the authorized command/choice path, policy evaluation, and provenance. |
| AI edge contract | AI is provider-agnostic and proposal-only; it cannot silently control critical state. |
| All boundaries | Persistence, API transport, identity implementation, AI providers, and clients depend on core contracts; the core does not depend on their technologies. |

---

# 13. Canonical Domain Diagram

The following map preserves the required conceptual flow while showing the supporting edge contracts and Policy/Governance’s cross-cutting role.

```text
                         ┌───────────────────────────────────────┐
                         │          EDGE CONTRACTS               │
                         │  Interaction Command                 │
                         │  Trusted Actor Context               │
                         │  Delivery Capability Profile         │
                         └───────────────────┬───────────────────┘
                                             │
                                             ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                        MATH LUMINA LEARNING ENGINE CORE                              │
│                                                                                      │
│  Mathematical Knowledge ────────┐                                                    │
│  • domains, topics, concepts    │                                                    │
│  • relationships/prerequisites  │                                                    ▼
│  • assets and experiences       │      Learner Record ──► Pedagogical Model ──► Learning Decisioning
│                                 │      • events/evidence       • layers              • opportunities
│                                 │      • interpretations       • guidance            • recommendations
│                                 │      • current state         • suitability         • offers
│                                 │                                                         │
│                                 └─────────────────────────────────────────────────────────┤
│                                                                                             ▼
│  Policy and Governance ───────────────────────────────────────────────► Learning Decision │
│  • autonomy • safety • non-evaluation • ownership • consent • provenance                 │
└──────────────────────────────────────────────────────────────────────────────────────┘
                                             │
                                             ▼
                         ┌───────────────────────────────────────┐
                         │           EDGE CONTRACTS               │
                         │  Reasoning Port (optional proposals)  │
                         │  Persistence Port                     │
                         │  Learning Interaction Response        │
                         └───────────────────────────────────────┘
                                             │
                                             ▼
                           Any client: web | mobile | voice | API | tutor/agent
```

**CANONICAL CONTRACT:** Policy/Governance is shown feeding into the final Learning Decision, but it constrains the entire interaction—from command acceptance and evidence handling through AI proposal review and state commitment. The diagram does not imply a single late-stage policy check.

---

# 14. Proposed Phase 1 Module Boundaries

These are conceptual module boundaries, not directories, code packages, services, or implementation files.

| Module boundary | Contains | Depends conceptually on | Must not depend on |
|---|---|---|---|
| **mathematical-knowledge** | Mathematics Domain, Topic, Concept, Concept Relationship, Knowledge Assets, Learning Experience, stable locators/versions. | Its own knowledge contracts. | Learner database records, UI, AI provider, API transport. |
| **learner-record** | Events, learner-owned evidence, interpretations, current state projections, commitments, provenance/evidence references. | Shared canonical value objects; policy constraints for valid operations. | Client session/UI state, provider-specific model data, storage mechanism. |
| **pedagogical-model** | Pedagogical layers, guidance, experience suitability, pedagogical references. | Mathematical Knowledge; shared value objects. | React navigation, persistence technology, learner-specific selection policy. |
| **learning-decisioning** | Interaction evaluation, semantic opportunities, recommendations, offers, Learning Decision, decision provenance, candidate commitments. | Knowledge, Learner Record, Pedagogical Model, Policy/Governance contracts, optional validated reasoning proposals. | AI provider implementation, API transport, screen logic, database queries. |
| **policy-governance** | Policy definitions, policy evaluation, autonomy/safety/ownership/consent/provenance constraints. | Trusted Actor Context contract; candidate domain objects. | Prompts as the only enforcement, UI copy, identity provider technology. |
| **interaction-application boundary** | Canonical command handling, evaluation coordination, response transformation. | All core domain contracts and edge ports. | Client-specific screens and storage/provider implementation details. |
| **edge-ports** | Reasoning Port, Persistence Port, identity-context source, delivery-capability source, response transport mapping. | Core-defined interfaces. | Direct modification of core domain truth without contracts/policy. |

---

# 15. Open Decisions That Block or Constrain Implementation

The following decisions remain deliberately open. They must not be silently chosen during later implementation.

| Open decision | Implementation effect | Status |
|---|---|---|
| Curriculum/domain identity, academic level, and content authority. | Constrains knowledge identity, versioning, and publication. | **OPEN DECISION — blocks authoritative content modelling/migration.** |
| Relationship taxonomy and prerequisite semantics, including whether any prerequisite can restrict access. | Constrains Concept Relationship rules and decisioning. | **OPEN DECISION — constrains Phase 2 knowledge model.** |
| Learning-experience taxonomy and content lifecycle governance. | Constrains content composition, review, and experience availability. | **OPEN DECISION — constrains authoring/import.** |
| Formal definition of readiness, emerging understanding, and any mastery-adjacent terms. | Constrains learner state and adaptation. | **OPEN DECISION — blocks evidence thresholds/scoring logic.** |
| Confidence scale/meaning and permitted use of confidence reports. | Constrains learner record and recommendations. | **OPEN DECISION — blocks confidence-driven adaptation rules.** |
| Autonomy rule details: which transitions require confirmation and whether any access may be automatic/restricted. | Constrains command, choice, and commitment policy. | **OPEN DECISION — blocks final state-transition rules.** |
| Definition of material versus non-material state commitment. | Constrains commit/audit boundaries. | **OPEN DECISION — blocks complete mutation policy.** |
| Policy authority, policy lifecycle, exceptions, and escalation. | Constrains governance implementation and tests. | **OPEN DECISION — blocks production policy administration.** |
| Privacy, consent, retention, deletion/correction, safeguarding, jurisdiction, and age requirements. | Constrains learner evidence, events, AI input, and persistence. | **OPEN DECISION — blocks production persistence/AI use.** |
| AI quality assurance, provider selection, raw-output policy, human review, and thresholds. | Constrains Reasoning Port adapters and generated-content release. | **OPEN DECISION — blocks AI integration, not core contract definition.** |
| Identity/authorization/tenancy model. | Constrains Trusted Actor Context and data access. | **OPEN DECISION — blocks authentication/authorization implementation.** |
| Delivery capability vocabulary and accessibility expectations. | Constrains compatibility selection for voice and other future clients. | **OPEN DECISION — constrains multi-client adaptation details.** |
| Persistence, database, API transport, repository topology, and runtime. | Determines edge adapters only. | **OPEN DECISION — explicitly outside Phase 1.** |

---

# 16. Phase 1 Completion and Approval Gate

**Phase 1 has established:**

1. The canonical five-domain model and their responsibilities.
2. Entity, value-object, relationship, knowledge-asset, and edge-contract classifications.
3. A strict separation among source facts, historical events, learner-owned evidence, interpretations, current learner state, recommendations, offers, choices, decisions, and commitments.
4. A canonical learner-intent-to-commitment interaction lifecycle, including automatic versus confirmation-required transitions.
5. The minimum mathematical knowledge structures and their classification.
6. An interface-neutral Learning Decision and opportunity model.
7. Enforceable policy/governance boundaries and AI proposal-only contracts.
8. A provenance model that supports accountability without exposing private chain-of-thought.
9. A canonical domain map and conceptual module boundaries.
10. The unresolved decisions that must remain explicit.

**No code, implementation files, database schema, API technology, AI provider, identity implementation, persistence implementation, UI, client, or application modifications have been created.**

> **Approval requested:** Approve this Phase 1 canonical domain and contract specification before proceeding to Phase 2, which would define the mathematical knowledge model in greater detail. No further phase should begin without explicit approval.

---

## Source basis

This specification is based exclusively on the user-supplied Math Lumina prototype documentation, engine-first architecture instruction, Phase 0 execution directive, Phase 0.5 approval, and Phase 1 directive. No external framework, provider, persistence, curriculum, legal, or product requirement has been introduced as an approved decision.
