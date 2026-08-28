# Math Lumina Learning Engine — Phase 0 Architecture Audit

**Status:** Presented for approval; **no implementation is proposed by this document**.

## Scope and evidence

This audit is based solely on the three supplied documents. It does not introduce a product feature, select a framework, prescribe a database, or write code. The existing React/Base44 prototype is treated as a functional reference, not as the target architecture.

| Label | Meaning | Source basis |
|---|---|---|
| **SOURCE REQUIREMENT** | Directly established by the supplied material. | Supplied documentation and architecture brief |
| **ARCHITECTURAL INFERENCE** | A design conclusion needed to satisfy one or more source requirements. | This audit's reasoning |
| **OPEN DECISION** | Material not specified sufficiently to decide now. | Requires explicit approval or further discovery |

| Source | Description |
|---|---|
| **S1** | Current Math Lumina prototype documentation: its philosophy, React/Base44 implementation, entities, features, AI use, and seed content. |
| **S2** | Engine-first architectural instruction: domain layers, contracts, autonomy, safety, evolution, and phased delivery protocol. |
| **S3** | Phase 0 execution directive: required audit headings, labelling convention, no-code constraint, and approval gate. |

> **SOURCE REQUIREMENT — S2:** Math Lumina is an engine first and an application second. A future interface must be replaceable without rebuilding learning intelligence.

## Executive architecture position

**ARCHITECTURAL INFERENCE:** Math Lumina should become a **headless learning-decision engine**. It receives interface-neutral learner inputs and trusted contextual facts, evaluates knowledge, learner state, pedagogy, and policy, and returns a structured `LearningResponse`. An API/interface layer translates between transport/client concerns and that response; web, mobile, voice, teacher, and agent experiences render or mediate it. No client may embed the authoritative learning, safety, or state-transition logic.

This position preserves the prototype's distinctive purpose—non-evaluative, learner-controlled mathematical learning—while preventing screens, UI navigation, provider-specific AI calls, and database records from becoming the de facto learning model.

---

# 1. Proposed Engine Architecture

## 1.1 Architectural shape

```text
Clients: Web | Mobile | Voice | Tutor/Teacher tools | External API clients
                              │
                              ▼
                 API / Interface Adapters
       authentication context · transport validation · view mapping
                              │
                              ▼
┌──────────────────────────────── Math Lumina Learning Engine ────────────────────────────────┐
│  Policy Guardrails  ──►  Learning Orchestrator  ──►  Learning Response Composer              │
│          │                         │                              ▲                          │
│          │                         ▼                              │                          │
│  Knowledge Service ◄── Pedagogical Engine ◄── Learner State Evaluator                         │
│          │                         │                              ▲                          │
│          │                         ▼                              │                          │
│  Content / Representation Catalog  Adaptation Engine  ──►  AI Reasoning Gateway              │
│                                                                            │                  │
│  Event & State Services ◄── validated decisions / accepted proposals ─────┘                  │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                  Persistence adapters and AI-provider adapters
```

**SOURCE REQUIREMENT — S2:** The engine needs explicit boundaries among mathematical knowledge, learner model, pedagogy, learning-state evaluation, adaptation, AI reasoning, and interface response. It must return a structured response rather than JSX or UI directions.

## 1.2 Subsystems and responsibilities

| Subsystem | Responsibility | It must not own |
|---|---|---|
| **Learning Orchestrator** | Coordinates a learning interaction: gathers the required domain inputs, invokes evaluation/adaptation services, applies policy, and asks the response composer for an outcome. | HTTP, React state, CSS, or provider-specific prompting. |
| **Mathematical Knowledge Service** | Resolves stable concepts, prerequisite relationships, bridges, representations, examples, non-examples, procedures, patterns, misconceptions, applications, and exam patterns. | Learner-specific conclusions or UI layouts. |
| **Pedagogical Engine** | Defines the instructional meaning of Intuition, Mechanics, and Exam Patterns; selects suitable learning opportunities consistent with learner state and autonomy. | Persistence format or visual sequencing. |
| **Learner State Evaluator** | Forms a current, evidence-linked view of the learner’s context, engagement, confidence, practice, reflections, readiness, and relevant prerequisites. | Rewriting raw learner evidence or generating conversational prose. |
| **Adaptation Engine** | Produces a ranked, explainable set of options such as continue, vary representation, revisit a prerequisite, practise, reflect, explore a bridge, pause, or choose freely. | Mandatory progression based merely on a “Next” click. |
| **AI Reasoning Gateway** | Requests bounded generative work—such as reflection signal extraction, explanation candidates, representation candidates, or misconception hypotheses—and returns validated proposals. | Authoritative learner-state mutation or policy decisions. |
| **Policy Guardrails** | Enforces safety, learner agency, language constraints, privacy boundaries, and validation gates across decisions and outputs. | UI copy alone; policy must be executable independently of prompt wording. |
| **Event & State Services** | Preserve append-only learning events where appropriate, maintain current state/projections, and support auditability and reconstruction. | Pedagogical selection or client rendering. |
| **Learning Response Composer** | Builds the interface-neutral `LearningResponse`, including offered content, actions, rationale metadata, and constraints. | Rendering components or navigation chrome. |

**ARCHITECTURAL INFERENCE:** The orchestrator should coordinate rather than embed the rules of every other subsystem. This keeps deterministic educational rules independently testable and lets AI remain a replaceable capability.

## 1.3 Core interaction

A client submits a learner action, for example “I have submitted this reflection” or “I want another representation.” The API adapter validates transport and authenticates the caller. The engine then resolves the relevant learner evidence and concept graph, evaluates pedagogical and adaptation possibilities, applies policy, optionally obtains *bounded* AI proposals, and returns a `LearningResponse`. State changes happen only through validated engine decisions and are recorded as events plus current-state updates.

**SOURCE REQUIREMENT — S2:** The engine recommends rather than dominates; learner autonomy is a fundamental constraint.

---

# 2. Engine / API / UI Boundary

| Boundary | Engine owns | API / interface layer owns | Client/UI owns |
|---|---|---|---|
| **Learning decision** | Knowledge relations, learner-state evaluation, pedagogical intent, available learning opportunities, deterministic eligibility, safety policy, explanatory metadata. | Request-to-command translation; response serialization; version compatibility. | Presenting the options, collecting a learner selection, local interaction affordances. |
| **State and evidence** | Domain validation, event semantics, current-state derivation, write permissions as domain rules, immutable original reflections. | Authentication/identity hand-off, request validation, idempotency/transport concerns. | Draft text, local temporary state, display preferences; never authoritative progression. |
| **AI** | Task contracts, provider-independent schemas, validation, policy review, safe proposal-to-decision pathway. | Secret handling and provider routing where not kept in an infrastructure adapter. | Rendering approved generated material; optional input capture. |
| **Content** | Stable identifiers, knowledge graph semantics, pedagogical asset eligibility, content version references. | Import/export endpoints and administrative transport. | Formatting assets and layouts; no hard-coded curriculum logic. |
| **Presentation** | No JSX, styling, routes, tabs, progress-bar aesthetics, or screen flow. | No client design decisions. | React/mobile/voice interaction, accessibility presentation, localization display choices, navigation, animations, and visual feedback. |

**SOURCE REQUIREMENT — S2:** The engine must not know whether it is serving React, mobile, voice, chat, an API, or another agent.

**ARCHITECTURAL INFERENCE:** API adapters should expose engine commands and queries—not screen-specific endpoints such as “load home page.” For example, the conceptual API operation is “submit learner action and retrieve learning response,” not “advance to tab two.” This does not select REST, GraphQL, RPC, or an event stream.

**OPEN DECISION:** The transport protocol, authentication authority, tenancy model, rate limits, and public API exposure are not defined in the supplied material.

---

# 3. Core Domain Objects

The following are conceptual domain objects, not a prescribed class or database schema.

| Object | Purpose | Key relationships |
|---|---|---|
| **Curriculum Domain** | A named mathematical scope or curriculum context. | Contains topics and provides version context. |
| **Topic** | A coherent grouping of concepts, such as Functions or Trigonometry. | Contains or references concepts; belongs to a curriculum domain. |
| **Concept** | The stable unit of mathematical meaning. | Has prerequisite and bridge relations; points to representations, learning experiences, misconceptions, patterns, and versions. |
| **Concept Relationship** | A typed relation such as prerequisite, bridge, dependency, or related representation. | Connects concept-to-concept with direction, rationale, and version scope. |
| **Representation** | A way to encounter a concept: intuitive framing, formal notation, visual/physical model, procedure, or alternative explanation. | Is associated with one or more concepts and pedagogical layers. |
| **Learning Experience** | An addressable educational opportunity: explanation, example, non-example, practice, reflection prompt, summary, or exam-pattern activity. | Targets a concept/representation/layer; may carry energy and policy metadata. |
| **Misconception Pattern** | A documented potential interpretation difficulty associated with concepts or representations. | Informs cautious hypotheses and alternative opportunities; is never itself a learner label. |
| **Exam Pattern** | A reusable assessment-style pattern, recognition cue, strategy, and potential trap. | Belongs to concepts and supports the Exam Patterns layer. |
| **Learner Profile** | Stable learner-owned or consented preferences and settings relevant to learning. | Provides context but does not replace evidence-based state. |
| **Learning State** | Current engine view of a learner in relation to concepts and their learning context. | Is derived from events and validated reports; includes evidence references and confidence. |
| **Learning Context** | Current learning intention, energy/context where appropriate, and session-relevant conditions. | Constrains which opportunities may be offered; is time-bound. |
| **Practice Attempt** | A learner’s interaction with a practice opportunity and optional self-assessment/reflection. | Becomes historical evidence; may produce derived signals. |
| **Reflection** | The learner’s original expression in their own words. | Immutable source evidence; may have derived interpretations but is never overwritten. |
| **Derived Insight / Signal** | Structured, qualified observation derived from evidence, including an AI proposal after validation. | References source reflection/attempts and confidence; informs rather than dictates a decision. |
| **Learning Recommendation** | An explainable offered next opportunity or choice set. | References evidence, policy outcome, and pedagogical intent; included in a response. |
| **Learning Event** | Immutable account of something that happened, such as a layer entered or reflection submitted. | Is used to construct or audit current state. |
| **Learning Response** | The interface-neutral output returned to any client. | Composes current learning state, content, permitted actions, suggestions, metadata, and safety constraints. |
| **Policy Decision** | Result of evaluating an action, generated output, or proposed state change against engine invariants. | Gates inclusion, modification, rejection, or escalation of a proposal. |

**SOURCE REQUIREMENT — S1/S2:** Concepts need intuitive, formal, and exam-oriented material; practice, reflections, confidence, concept bridges, misconceptions, and learner context are all relevant. Reflections retain original wording; derived interpretation remains separate.

**ARCHITECTURAL INFERENCE:** A `ConceptRelationship` is first-class rather than embedded as a plain list, because the source requires prerequisites and bridges to inform decisions and asks the knowledge structure to scale. The exact relationship taxonomy remains an **OPEN DECISION**.

---

# 4. Core Contracts / Interfaces

The contracts below define responsibilities and invariants only. They are deliberately implementation- and language-neutral.

| Contract | Conceptual input | Conceptual output | Invariants and failure behaviour |
|---|---|---|---|
| **KnowledgeResolver** | Stable concept identifier, content/curriculum version, learner-relevant scope. | Concept graph fragment; eligible representations, experiences, relationships, misconceptions, and patterns. | Returns versioned, addressable knowledge only. Missing/invalid references prevent an authoritative learning decision and return a safe unavailable state. |
| **LearnerStateReader** | Learner identity/scope, concept context, relevant time window. | Current state plus evidence references and confidence/uncertainty of derived conclusions. | Never treats a screen visit as understanding. It does not alter raw evidence. |
| **PedagogicalPlanner** | Knowledge fragment, learner state, requested/available pedagogical layer, policy constraints. | Candidate instructional intents and suitable learning opportunities. | Does not force advancement merely because a client requests it; preserves learner choice where the source requires autonomy. |
| **AdaptationEvaluator** | Learner state, current context, pedagogical candidates, recent events, policy constraints. | Ranked recommendation candidates with explanations and evidence. | Produces options, not covert commands. Must remain explainable and deterministic when identical inputs and policy yield the same rules-based result. |
| **AIReasoningService** | Explicit task type, validated source evidence, knowledge context, output schema, policy context. | A structured *proposal* with source references, confidence/uncertainty, and validation status. | A malformed, unsafe, unavailable, or low-confidence proposal is rejected or omitted; it cannot directly mutate learner state. |
| **PolicyEvaluator** | Candidate action/content/state mutation plus context and applicable policy version. | Permit, modify, reject, or require learner confirmation, with rationale. | Enforces safety and autonomy rules independent of natural-language prompting. |
| **LearningStateCommitter** | Validated engine decision, approved mutation, event payload, expected state/version. | Committed event reference and updated state/projection reference. | Commits only after validation/policy checks; preserves original reflections; rejects ambiguous or unauthorized writes. |
| **LearningResponseComposer** | Current state, selected content/opportunities, policies, rationales, permitted actions. | `LearningResponse`. | Contains no UI component instructions; communicates constraints and optionality explicitly. |

A conceptual `LearningResponse` should contain the fields mandated by the source material: `learning_state`, `current_concept`, `pedagogical_intent`, `content`, `available_actions`, `suggested_next_steps`, `reasoning_metadata`, and `safety_constraints`.

**OPEN DECISION:** Formal schemas, error codes, versioning strategy, authorization claims, concurrency controls, and consistency model cannot be selected from the supplied material alone.

---

# 5. Deterministic vs AI Responsibilities

## 5.1 Deterministic responsibilities

| Responsibility | Classification | Rationale |
|---|---|---|
| Identity scope, permissions, and user-data access. | **SOURCE REQUIREMENT / deterministic** | Privacy and user-scoped records cannot depend on generated output. |
| Content identifiers, versions, concept relations, prerequisite rules, and curriculum constraints. | **SOURCE REQUIREMENT / deterministic** | These are structured knowledge and integrity concerns. |
| Event creation, persistence, deduplication/idempotency, and state-transition validation. | **SOURCE REQUIREMENT / deterministic** | The source calls for data integrity and safe state transitions. |
| Reflection immutability and evidence provenance. | **SOURCE REQUIREMENT / deterministic** | Original learner expression must never be overwritten. |
| Safety-policy enforcement, prohibited labelling checks, autonomy constraints, and schema validation. | **SOURCE REQUIREMENT / deterministic** | The source requires system-level, enforceable policies. |
| Eligibility/rule evaluation for recommendations and required learner confirmation. | **ARCHITECTURAL INFERENCE / deterministic** | Ensures AI suggestions remain governed and explainable. |
| Recording that an opportunity was offered, accepted, declined, or completed. | **ARCHITECTURAL INFERENCE / deterministic** | Enables auditability without treating interaction as proof of understanding. |

## 5.2 AI / generative responsibilities

| Capability | Conceptual output | Constraint |
|---|---|---|
| Reflection analysis | Candidate structured understanding signals, curiosity threads, and tone observations linked to source text. | Must preserve the raw reflection and expose uncertainty. |
| Explanation and metaphor generation | Candidate explanation/analogy tailored to a selected representation and layer. | Must be policy-reviewed; it is not a curriculum relationship. |
| Alternative representation generation | Candidate ways to illustrate a concept. | Must be anchored to approved concept context and validated before use. |
| Misconception hypothesis | A non-diagnostic candidate hypothesis and gentle reframing opportunity. | Never stored or presented as an authoritative deficit label. |
| Question/practice generation | Candidate questions, hints, or reflection prompts under a defined educational objective. | Requires content/pedagogy validation before offering. |
| Adaptive pathway suggestions | Candidate next learning opportunities and prose rationale. | Cannot bypass deterministic eligibility or learner choice. |
| Dialogue assistance | Candidate conversational response in the Quiet Mentor tone. | Must conform to policy; it cannot silently commit decisions. |

## 5.3 Explicitly dangerous AI authority

AI must **not** directly alter confidence, mastery/understanding state, prerequisite completion, permissions, event history, content graph links, safety policy, or progression eligibility. It must also not overwrite reflections, impose a path, decide that an answer is “wrong,” or claim a learner has understood a concept without a deterministic and evidence-governed engine decision.

> **SOURCE REQUIREMENT — S2:** AI proposes; validation and policy checks follow; the engine decides; the state layer commits.

---

# 6. Learner-State Model

The engine’s learner model is a **current, qualified view of the learner’s learning situation**, not a record of pages viewed and not a simple `completed` flag. It should be concept-scoped while also able to draw on relevant prerequisite and cross-concept evidence.

| State dimension | Meaning | Evidence relationship |
|---|---|---|
| **Current focus** | Current concept, selected pedagogical layer, and learning intention. | Set through learner action/context; may be changed by learner choice. |
| **Prerequisite context** | Known or unresolved prerequisite relationships relevant to the focal concept. | Derived from prior evidence and knowledge graph rules; express uncertainty. |
| **Engagement history** | Recent concepts/layers/experiences encountered, revisits, offers accepted or declined. | Derived from historical events; attendance is not understanding. |
| **Practice history** | Attempts, hints requested, self-assessments, and linked reflections where supplied. | Raw interaction evidence; interpretation is separate. |
| **Reflections** | Learner-owned raw words. | Immutable source data. |
| **Understanding signals** | Evidence-linked, confidence-qualified interpretations of emerging understanding or uncertainty. | Derived from reflections/practice; may be AI-assisted but must be validated. |
| **Confidence** | Learner self-reported confidence before/after learning or adjusted later. | Preserve as the learner’s report; do not replace with a model score. |
| **Readiness and preference** | Learner preference for representations, potential readiness signals, and choices. | Inferred values require provenance and must remain revisable. |
| **Learning context** | Energy/context state and current goal where appropriate. | Time-bound, optional, and never a basis for judgement. |

**SOURCE REQUIREMENT — S1/S2:** Confidence is learner-reported; check-ins, low-energy options, reflections, practice, current layer, curiosity, and readiness signals all matter. The learner model must evolve over time.

## 6.1 Current state versus historical truth

| Layer | What it represents | Example |
|---|---|---|
| **Historical event** | A durable statement that an interaction occurred. | “A reflection was submitted at time T with immutable text R.” |
| **Source evidence** | The submitted text, response, self-report, or recorded choice linked to the event. | “The learner reported confidence 2/5.” |
| **Derived interpretation** | A qualified, revisable conclusion drawn from evidence. | “A validated signal suggests uncertainty around domain constraints.” |
| **Current learning state** | The engine’s present operational view, derived from events/evidence/interpretations. | “Offer an intuitive representation and a voluntary prerequisite revisit.” |

**ARCHITECTURAL INFERENCE:** Current state should record provenance (which events/evidence informed it) and an uncertainty/confidence value for derived signals. This supports explainability without exposing internal reasoning verbatim to learners.

---

# 7. Mathematical Knowledge Model

The knowledge model should represent mathematics as an addressable, versioned graph of concepts and educational assets rather than screens or long text fields. The existing Topics and Concepts are valuable seed content, but they are insufficient as the final model because the engine must reason about dependencies, representations, misconceptions, and bridges.

| Knowledge element | Engine meaning | Required relationships |
|---|---|---|
| **Domain / curriculum / topic** | Organisational and curricular context. | Contains/references concepts and versions. |
| **Concept / sub-concept** | Stable mathematical meaning with a unique identity. | Relates to prerequisites, broader/narrower concepts, and bridges. |
| **Prerequisite** | Directed dependency or helpful prior knowledge. | Carries rationale and may be mandatory, recommended, or contextual—taxonomy is open. |
| **Representation** | A particular conceptual, physical, symbolic, graphical, verbal, or procedural treatment. | Maps to concept and pedagogical-layer suitability. |
| **Example / non-example** | Curated learning assets that clarify boundaries. | Targets concept and representation; potentially linked to misconceptions. |
| **Procedure** | Formal method or process. | Links to Mechanics layer and relevant conditions. |
| **Pattern / exam pattern** | Recognition cues, common formats, strategies, and potential traps. | Links to concepts and the Exam Patterns layer. |
| **Misconception pattern** | Potentially recurring conceptual confusion expressed without judgement. | Links to concepts, representations, and gentle alternative experiences. |
| **Concept bridge** | A deliberate connection to a future or related idea. | Links concepts and indicates pedagogical relevance. |
| **Learning experience** | An offerable unit composed from the items above. | Is selected by pedagogy/adaptation; has stable identity and version. |

**SOURCE REQUIREMENT — S2:** Mathematics must not be modelled as pages of text. The engine must ultimately understand domains, topics, concepts, prerequisites, representations, examples, non-examples, procedures, patterns, misconceptions, applications, exam patterns, and concept bridges.

**OPEN DECISION:** The source does not define the canonical curriculum, mathematical standard, content-authoring workflow, review authority, representation taxonomy, multilingual model, or version-retirement policy. These must be decided before authoritative content migration.

---

# 8. Pedagogical Model

The current Intuition → Mechanics → Exam Patterns sequence is an **engine-level pedagogy**, not three visual tabs. It determines the purpose and suitability of learning experiences, while maintaining the learner’s right to select or decline options.

| Pedagogical layer | Engine intent | Candidate assets and outcomes | Autonomy rule |
|---|---|---|---|
| **Intuition** | Establish an accessible mental model before formal notation. | Everyday metaphors, micro-stories, physical/visual connections, core insight, alternative representations. | Offer entry points and alternatives; do not compel symbolic progression. |
| **Mechanics** | Support clear, stepwise formal understanding and explain why a process works. | Gradual symbols, worked examples, procedures, formal notation, guided practice. | Make the layer available based on readiness/opportunity, but permit the learner to pause, revisit intuition, or choose otherwise. |
| **Exam Patterns** | Offer practical, pattern-focused preparation when useful or chosen. | Common formats, recognition strategies, typical traps, and exam-oriented practice. | Never equate exam performance with worth or conceptual completion; keep the layer optional unless a future approved curriculum policy says otherwise. |

**SOURCE REQUIREMENT — S1/S2:** The three layers are pedagogical states; low-energy summaries, core insights, and concept bridges provide additional opportunities. The system favours understanding over performance and must treat difficulty respectfully.

**ARCHITECTURAL INFERENCE:** “Layer” should be an attribute of an experience’s instructional intent, not a rigid location. An asset may support one or more layers, and the engine can offer it in the relevant context without assuming a linear UI journey.

**OPEN DECISION:** Whether any prerequisite relationship prevents access to a layer, or only informs recommendations, is not specified. The default recommendation for Phase 0 is to preserve access and clearly explain a voluntary prerequisite option, subject to later approved policy.

---

# 9. Adaptation Model

Adaptation must select **learning opportunities**, not calculate an opaque progress percentage. It should consider the learner’s active concept, selected goal, current pedagogical layer, relevant prerequisite graph, recent events, practice history, learner-reported confidence, reflection-derived signals, preferences, energy/context, and available content.

**ARCHITECTURAL INFERENCE:** A safe adaptation cycle is:

1. Resolve authoritative knowledge and relevant learner evidence.
2. Form a current learner-state view with provenance and uncertainty.
3. Identify pedagogically suitable candidate opportunities.
4. Apply deterministic eligibility and safety/autonomy policies.
5. Optionally enrich candidates with validated AI-generated explanations or representations.
6. Rank or group **options**, attach evidence-linked reasons, and return them without silently moving the learner.
7. Record only the learner’s actual subsequent choice or submitted evidence as history.

| Example condition | Possible offered response | Why this remains aligned |
|---|---|---|
| Learner reports low energy/context. | Low-energy summary, a shorter intuitive representation, pause, or free selection. | Respects difficulty and context; does not penalise the learner. |
| A reflection indicates uncertainty around a prerequisite representation. | Explain the relationship and offer a voluntary prerequisite revisit or another representation. | Uses evidence and graph context; preserves agency. |
| Learner has explored intuition and requests formal work. | Offer a Mechanics experience and optional practice. | Responds to learner choice rather than forcing a transition. |
| Learner seeks exam preparation. | Offer eligible Exam Pattern experiences and recognise the learner’s selected goal. | Supports practical preparation without turning all learning into performance. |
| Evidence is sparse or ambiguous. | Offer learner choice, reflection, or a small selection of representations; avoid strong inferences. | Avoids false precision and overreach. |

**SOURCE REQUIREMENT — S2:** The possible next decisions include continuing, another representation, a prerequisite revisit, practice, reflection, mechanics, exam patterns, a concept bridge, pause, and learner choice.

**OPEN DECISION:** Ranking weights, thresholds, mastery terminology, timing/cadence, and the definition of “readiness” have not been specified and should not be invented in Phase 0.

---

# 10. AI Reasoning Architecture

AI is a bounded reasoning capability behind clear contracts. It receives only task-relevant, validated context and returns structured candidate proposals—not privileged state commands.

| AI capability | Inputs | Structured output | Required validation before use |
|---|---|---|---|
| **Reflection analyser** | Immutable learner reflection; relevant concept/layer context; task policy. | Signals, curiosity threads, cautious suggested opportunities, tone observation, evidence spans/references, uncertainty. | Schema, source linking, safety language, no raw reflection mutation, policy and confidence checks. |
| **Explanation generator** | Approved concept, representation intent, selected layer, learner context, policy. | Candidate explanation/analogy with declared scope and limitations. | Knowledge anchoring, prohibited-language scan, pedagogical suitability, safety/policy approval. |
| **Representation generator** | Concept, allowed representation types, relevant misconception context, pedagogical objective. | Candidate alternative representation. | Mathematical/content review rules, policy, accessibility and content-version linkage—exact review approach is open. |
| **Misconception hypothesis service** | Practice evidence and/or reflection with approved knowledge context. | Cautious candidate hypothesis, evidence reference, gentle reframing option. | Never output as a learner diagnosis; validate uncertainty, language, and alternative explanation. |
| **Practice/question generator** | Learning objective, concept, layer, approved content constraints. | Candidate prompt, hints, expected reasoning focus, and safety metadata. | Curriculum alignment, quality checks, policy; evaluation method is open. |
| **Pathway suggestion service** | Validated learner state, opportunities, current intention, policy. | Candidate option set and optional prose rationale. | Deterministic eligibility, autonomy policy, explainability metadata; no direct state mutation. |

**SOURCE REQUIREMENT — S1/S2:** AI supports reflection analysis, adaptive path generation, misconception support, explanation/representation/question generation, and dialogue assistance; structured and validated outputs are preferred.

## 10.1 Proposal-to-state safety path

```text
Validated source evidence / approved knowledge context
                    │
                    ▼
             AI candidate proposal
                    │
                    ▼
         Schema and provenance validation
                    │
                    ▼
          Deterministic policy evaluation
                    │
                    ▼
        Engine decision and learner-choice gate
                    │
                    ▼
   State/event commit only when an approved mutation exists
```

**SOURCE REQUIREMENT — S2:** Generated content may not silently mutate important learner state. This flow makes validation and policy enforcement a system concern, not a prompt instruction.

**OPEN DECISION:** AI provider(s), model(s), data retention, prompt/data minimisation rules, human review workflows, quality thresholds, and escalation paths remain undefined.

---

# 11. Safety / Policy Architecture

The Math Lumina philosophy should become versioned, testable policy rules applied at three levels: decision construction, generated/output content, and state mutation. Prompt wording may assist an AI model, but it is not sufficient enforcement.

| Policy domain | System-level constraint | Enforcement location |
|---|---|---|
| **Non-evaluative language** | Do not label a learner or their answer as “correct,” “incorrect,” “wrong,” “failed,” “good job,” “you should know this,” or “easy/hard,” as specified. | Response/output policy validation; AI prompt constraints as secondary defence; test suite. |
| **Student autonomy** | Present appropriate options, pauses, and declines; do not advance a learner solely because the UI clicked “Next.” | Adaptation, decision, and state-commit policies. |
| **Understanding over performance** | Do not make speed, comparison, grade-like scores, or completion alone the primary learning determinant. | Learner-state semantics, recommendation rules, analytics boundaries. |
| **Respect for difficulty** | Treat difficulty and context as expected parts of learning; offer low-energy/alternative paths rather than deficits. | Pedagogical and adaptation policies; content eligibility. |
| **Reflection ownership** | Preserve original learner text, separate source from interpretation, and restrict access to appropriate scope. | State/event contracts, persistence access policy, AI input/output validation. |
| **Transparency/explainability** | Retain structured reason/evidence/confidence metadata for decisions. | Adaptation and response contracts; audit/event services. |
| **Privacy** | Learner reflections, progress, and insights remain private to the individual user, consistent with the prototype’s stated intent. | Authorization, data-scope, persistence, and API policies. |

**SOURCE REQUIREMENT — S1/S2:** Safety First, Understanding Over Performance, Respect for Difficulty, Student Autonomy, and the Quiet Mentor voice are core invariants. The supplied material explicitly states that these must not remain mere UI copy or prompts.

**ARCHITECTURAL INFERENCE:** Policies should be independently testable against structured responses and decisions. A language scanner alone is insufficient: it cannot detect coercive flow, hidden state changes, or performance-driven selection rules.

**OPEN DECISION:** The authoritative policy owner, exception process, policy-version migration, accessibility/language policy, safeguarding escalation, age-related constraints, and jurisdictional privacy requirements are not supplied.

---

# 12. Event / History Model

The engine should distinguish what happened from what it presently infers. A lightweight domain-event history preserves evidence and supports later reconstruction without mandating full event sourcing at this stage.

| Event family | Examples supported by source material | Why it matters |
|---|---|---|
| **Navigation/engagement** | `ConceptViewed`, `LayerEntered`, `ConceptRevisited`. | Shows encountered opportunities; must not be equated with understanding. |
| **Practice** | `PracticeAttempted`, hint/self-assessment submitted where provided. | Preserves practice evidence and context. |
| **Reflection and confidence** | `ReflectionSubmitted`, `ConfidenceReported`. | Protects learner voice and self-reported confidence as durable evidence. |
| **AI and adaptation** | `InsightGenerated`, `LearningPathSuggested`. | Provides provenance for derived content and recommendations. |
| **Learner choice** | `LearningPathAccepted`, `LearningPathDeclined`, pause/alternative selected. | Makes autonomy observable and prevents recommendation from being mistaken for action. |
| **Governance/state** | Validated state change or policy decision recorded where appropriate. | Supports auditability, repair, and explainability. |

**SOURCE REQUIREMENT — S2:** The engine should eventually model events including ConceptViewed, LayerEntered, PracticeAttempted, ReflectionSubmitted, ConfidenceReported, InsightGenerated, LearningPathSuggested, LearningPathAccepted, LearningPathDeclined, and ConceptRevisited. Full event sourcing is not required now.

**ARCHITECTURAL INFERENCE:** Events should carry stable actor, time, context/version references, and source-data references where applicable. This is a minimal provenance requirement, not a demand for a particular datastore.

**OPEN DECISION:** Event retention periods, amendment/correction semantics, deletion/erasure handling, ordering guarantees, replay strategy, and analytic use of events require explicit policy and privacy decisions.

---

# 13. Prototype Assessment

The existing application demonstrates meaningful product intent and user-facing behaviour. The following classification distinguishes what should survive conceptually from what should move or disappear from the **engine**.

| Classification | Prototype elements | Audit recommendation |
|---|---|---|
| **Retain** | The philosophy of psychological safety, learner autonomy, understanding over performance, respect for difficulty, and Quiet Mentor voice. | Preserve as formal engine invariants and policies. |
| **Retain** | The three-layer teaching model, low-energy mode intent, core insight, concept bridges, self-reported confidence, emotional check-in intent, open-ended practice, learner reflections, and learning journal history. | Preserve as domain/pedagogical capabilities; make them interface-agnostic. |
| **Retain** | Seed material for Functions, Algebra Fundamentals, and Trigonometry; topics and concepts as initial content. | Migrate only after a versioned knowledge-model/content audit. Do not treat current string fields as the finished knowledge graph. |
| **Retain** | User-scoped privacy intent, progress deduplication concern, loading/error-resilience intent, and reflective AI use cases. | Express privacy/deduplication in persistence contracts; express AI use through bounded services; keep UI resilience in clients. |
| **Refactor** | `Topic`, `Concept`, `LearnerProgress`, `ReflectionInsight`, and `CheckIn` entities. | Recast them as richer engine domain objects, immutable evidence, derived insights, events, and current-state projections. |
| **Refactor** | `ReflectionAnalyzer`, adaptive insights, and misconception support. | Move from client-bound/provider-bound calls to AI reasoning contracts with schema, provenance, policy, and validation gates. |
| **Refactor** | The Learn flow and client-side sequencing across layers. | Make the client submit a learner action; let the engine return permitted choices and recommendations. |
| **Refactor** | Admin seeding/content management. | Treat as future content-authoring/import adapters around versioned content data; the source does not yet define the workflow. |
| **Replace** | UI-shaped page concepts as the system’s navigation/control model—Home, Topic, Learn, My Map, Journal, and the bottom tabs. | Replace their architectural authority with generic engine commands, queries, and `LearningResponse`; the UI may still retain analogous screens as one client. |
| **Replace** | The implicit mapping of database records to the complete learner model. | Replace with evidence/event history plus a current learner-state model that is explainable and revisable. |
| **Do not carry into the engine** | React components, JSX, Tailwind/shadcn/Radix styling, Lucide icons, Framer Motion, routes, cards, tabs, bottom navigation, skeleton visuals, toasts, and screen layouts. | These belong exclusively to clients/presentation. |
| **Do not carry into the engine** | Direct Base44 `InvokeLLM` usage and prompt-first business logic. | Replace with provider-agnostic AI adapters behind engine-owned contracts. |

**SOURCE REQUIREMENT — S2:** The prototype is a reference, not a constraint. When it mixes UI, business logic, AI logic, or persistence, those boundaries must be separated progressively.

**OPEN DECISION:** Whether Base44 remains any part of the eventual infrastructure is not determined by the supplied documents. Its current presence does not constitute approval as the engine’s future persistence, identity, or AI platform.

---

# 14. Conceptual Repository / Module Structure

The structure below expresses architectural boundaries, not implementation files, packages, languages, or a demand for microservices.

```text
math-lumina/
├── engine/
│   ├── domain/                 # concepts, learner evidence/state, pedagogy, policies, events
│   ├── knowledge/              # knowledge graph contracts and content semantics
│   ├── learner-state/          # state evaluation and projection rules
│   ├── pedagogy/               # layer semantics and learning-opportunity selection
│   ├── adaptation/             # evidence-led recommendation construction
│   ├── policy/                 # autonomy, language, safety, and privacy invariants
│   ├── ai-reasoning/           # AI task contracts and proposal validation
│   ├── orchestration/          # learning interaction coordination
│   └── contracts/              # learning response and subsystem interfaces
├── application/                # engine use cases / commands / queries
├── ports/                      # persistence, identity, clock, AI provider, content access interfaces
├── adapters/
│   ├── persistence/            # selected storage implementation(s)
│   ├── ai-providers/           # selected AI-provider implementation(s)
│   └── content/                # import, validation, and content-authoring adapters
├── api/                        # transport adapters, auth-context mapping, API versioning
├── clients/
│   ├── web/                    # current/future React presentation client
│   ├── mobile/                 # future client
│   └── other/                  # voice, tutor/teacher, agent clients as approved
├── test-harness/               # engine/policy/contract/scenario tests
└── docs/                       # ADRs, contracts, policy catalogue, content-model guidance
```

**ARCHITECTURAL INFERENCE:** A modular monolith is the safest initial interpretation of this structure. It preserves bounded modules and testability without prematurely deploying separate services. The source requires explicit boundaries, not distributed infrastructure.

**OPEN DECISION:** Repository topology (monorepo vs multiple repositories), runtime/language, build system, database, message bus, deployment model, and client framework choice are explicitly outside what can be determined by Phase 0.

---

# 15. Architectural Risks and Open Questions

| Area | Risk or unresolved question | Classification | Approval needed before Phase 1? |
|---|---|---|---|
| **Curriculum authority** | No source defines the curriculum standard, content-review authority, or authoring/review lifecycle. | **OPEN DECISION** | Yes, before migrating/creating authoritative knowledge content. |
| **Knowledge semantics** | Relationship types, prerequisite strength, representation taxonomy, and formal concept identifiers are not defined. | **OPEN DECISION** | Yes, before finalising the Phase 1 domain contract. |
| **Learner-state semantics** | “Understanding,” readiness, and any mastery-related inference are intentionally not operationally defined. | **OPEN DECISION** | Yes; avoid hidden scoring models. |
| **AI assurance** | Mathematical accuracy validation, human-review role, confidence thresholds, AI provider/model selection, and data handling are unspecified. | **OPEN DECISION** | Yes, before enabling generative features. |
| **Privacy and safeguarding** | The prototype states user-scoped privacy, but consent, retention, deletion, age, and jurisdiction requirements are not supplied. | **OPEN DECISION** | Yes, before persistence/API implementation. |
| **Autonomy versus curriculum constraints** | The brief requires recommendation rather than domination, but does not say when access may be limited. | **OPEN DECISION** | Yes; this materially affects progression contracts. |
| **Assessment model** | Practice is open-ended and non-evaluative, yet the basis for deterministic evidence interpretation is not defined. | **OPEN DECISION** | Yes, before practice-driven state transitions. |
| **Content scale** | The design must support expansion, but expected volume, multiple curricula, languages, and editorial processes are not bounded. | **SOURCE REQUIREMENT + OPEN DECISION** | The model must remain extensible now; capacity choices may wait. |
| **Migration risk** | Directly porting Base44 entity fields and React flow would reproduce the UI-led prototype as the engine. | **ARCHITECTURAL INFERENCE** | Yes; approve the separation before implementation. |
| **Over-engineering risk** | Full event sourcing, distributed services, complex analytics, and broad social features are premature. | **SOURCE REQUIREMENT + ARCHITECTURAL INFERENCE** | Yes; begin with contracts and a lightweight historical model only. |

## Approval decisions requested

Before Phase 1 begins, approval is requested for the following architectural decisions:

1. **Approve the headless, interface-agnostic learning engine boundary** and `LearningResponse` as the sole authoritative client-facing learning-decision shape.
2. **Approve the named core domains and subsystem boundaries**: knowledge, learner state/evidence, pedagogy, adaptation, policy, AI reasoning, events/state, and response composition.
3. **Approve AI as a proposal-only capability**, with deterministic validation, policy enforcement, learner-choice gates, and state commit controls.
4. **Approve the current prototype as a source of intent and seed content, not as a technical template**, including removal of UI, direct LLM calls, and screen-driven progression from the engine.
5. **Provide direction on the open decisions** that materially affect Phase 1: curriculum authority, prerequisite semantics, learner-state terminology, access/progression limits, privacy/safeguarding policy, and future infrastructure constraints.

---

# Required final test

> **Could the Math Lumina Learning Engine make and return a learning decision without knowing that React, a web browser, or a particular UI exists?**

**Yes.** Under the proposed architecture, the engine consumes an interface-neutral learner action, learner context, approved mathematical knowledge, historical evidence, current learner state, pedagogical constraints, and policy. It can then return a structured `LearningResponse` containing the current concept and learning state, pedagogical intent, approved content or opportunities, available actions, suggested next steps, explainability metadata, and safety constraints. A React application is merely one client that renders this response and returns learner choices; a mobile, voice, teacher, API, or agent client could perform the same exchange.

This directly satisfies the **SOURCE REQUIREMENT** that the application be a client of the engine—not the engine itself.

## Phase gate

**Phase 0 is complete. No code, application change, UI construction, repository-module creation, or Phase 1 work has been performed.** This audit now awaits explicit approval before any further phase begins.

---

### Source record

This audit is grounded exclusively in the user-supplied materials **S1–S3** described at the beginning of this document; no external architecture, curriculum, legal, or AI-provider assumptions have been adopted as requirements.
