# Math Lumina Learning Engine — Phase 1.5 Engine Contract & Behaviour Specification

**Status:** Presented for explicit approval. This specification is **technology-independent** and contains no source code, implementation design, database schema, API, UI, AI provider, prompt, or infrastructure choice.

## Scope and status conventions

This document converts the approved Phase 1 canonical domain model into behavioural contracts. It defines what a conforming engine must mean and do when it receives a valid interaction, including how it must distinguish learner evidence, decisions, offers, choices, commitments, events, and derived state.

| Label | Meaning |
|---|---|
| **SOURCE REQUIREMENT** | Established by the supplied Math Lumina materials and prior approved architecture. |
| **CANONICAL BEHAVIOUR** | A technology-neutral behavioural contract required to operate the approved domain model. |
| **OPEN DECISION** | A rule not established by the source material. It is intentionally left unresolved rather than assumed. |

> **SOURCE REQUIREMENT:** The engine is headless and interface-agnostic. It recommends rather than dominates; learner autonomy, psychological safety, reflection ownership, and understanding over performance are enforceable constraints. AI is a replaceable, proposal-only reasoning port.

---

# 1. Canonical Engine Execution Lifecycle

## 1.1 Execution contract

A **learning interaction** begins when the engine receives a semantic `Interaction Command`, not a client gesture such as a click, tab change, page navigation, or spoken phrase. The command is evaluated against trusted actor context, relevant knowledge, learner record, pedagogical guidance, delivery capabilities, and policy. The engine returns a policy-constrained `Learning Decision`; it commits learner state only through the separate commitment path defined below.

```text
Learner Intent
   ↓
Interaction Command + Trusted Actor Context + Learning Context
+ Delivery Capability Profile + Command Reference
   ↓
1. Command, actor, consent, and scope pre-validation
   ↓
2. Resolve relevant Knowledge, Learner Record, Pedagogical Guidance, and Policy scope
   ↓
3. Evaluate source evidence and current state; derive only qualified interpretations
   ↓
4. Identify pedagogically suitable candidate learning opportunities
   ↓
5. Optionally request bounded AI reasoning proposals
   ↓
6. Validate proposals and apply policy to all candidate outcomes
   ↓
7. Form an explainable Learning Decision
   ↓
8. Return recommendations and/or offers through a Learning Interaction Response
   ↓
9. Receive a confirmed Learner Choice where a commitment requires it
   ↓
10. Revalidate applicable policy and transition rules
   ↓
11. Create State Commitment, Historical Event(s), and revised Current Learner State
```

**CANONICAL BEHAVIOUR:** Steps 1–8 are evaluation and decisioning. They can return a useful response without a state commitment. Steps 9–11 occur only when a commitment is authorized by an explicit learner command or accepted learner-owned evidence and remains permitted after validation.

## 1.2 Required interaction inputs

| Input | Meaning | Contract rule |
|---|---|---|
| **Interaction Command** | The canonical semantic expression of learner intent. It can express exploration, evidence submission, response to an offer, a request for adaptation, or pause/resume intent. | It must never contain page, route, component, tab, button, or device semantics. |
| **Trusted Actor Context** | A verified reference to the actor, scope, authorization, and consent-relevant context supplied from outside the core. | The engine consumes it but does not choose or implement identity technology. |
| **Learning Context** | The learner’s declared goal and optional current energy/context state where supplied. | It informs opportunity suitability; it is not a diagnostic or deficit label. |
| **Delivery Capability Profile** | Modality-neutral capabilities and constraints relevant to suitable delivery of a learning experience. | It may express capabilities such as spoken output or displayed notation, but cannot name a browser, React, route, or UI control. |
| **Command Reference** | A caller-supplied semantic occurrence reference that distinguishes a retry from a new intentional learner interaction. | It supports idempotency without deciding a transport mechanism. |
| **Knowledge Context** | The stable knowledge locators and versions needed for the requested/evaluated concept(s). | It must be resolvable and version-aware for a material decision. |
| **Learner Record Context** | Relevant historical events, source evidence, interpretations, and current state projection. | The engine must distinguish their categories; it cannot collapse them into a completion flag. |

## 1.3 Execution-stage decision points

| Stage | Required decision | Permitted result |
|---|---|---|
| Command acceptance | Is the command well-formed, in scope, authorized, and permitted by policy? | Accept for evaluation; reject safely; or request missing context without committing state. |
| Context resolution | Is required knowledge/learner/policy context available and coherent enough to evaluate? | Continue; produce an incomplete-context decision; or safely decline the dependent operation. |
| Evidence assessment | What is **OBSERVED** and what, if anything, is **INFERRED** with sufficient provenance? | Preserve observed facts; create qualified interpretations only when permitted. |
| Pedagogical evaluation | Which opportunities are appropriate to the concept, representations, pedagogical layer, and learner context? | Produce candidate opportunities; no learner path is imposed. |
| Optional reasoning | Would a bounded reasoning proposal add value, and is its use allowed? | Request proposal or continue deterministically without AI. |
| Policy evaluation | Are candidate opportunities, generated proposals, outputs, choices, and commitments permissible? | Permit, constrain, prohibit, require confirmation, or require a safe incomplete result. |
| Decision formation | What can the engine responsibly recommend/offer now? | Create a Learning Decision with provenance and uncertainty. |
| Commitment authorization | Has the learner supplied the required evidence or confirmed choice, and is the transition valid/policy-permitted? | Commit; refuse; or retain an uncommitted offer/decision. |

---

# 2. Learning Decision Semantics

## 2.1 Definition

A **Learning Decision** is the engine’s **authoritative, policy-constrained and provenance-bearing conclusion** for a particular evaluated interaction context. It authoritatively states what the engine is prepared to recommend, offer, constrain, or decline at that moment. It does **not** authoritatively determine the learner’s choice, and it does **not** itself mutate material learner state.

| Question | Canonical answer |
|---|---|
| What does a Learning Decision represent? | The evaluated outcome of applying approved knowledge, learner record, pedagogical guidance, policy, and any accepted reasoning proposals to a semantic interaction. |
| Is it advisory or authoritative? | It is authoritative as the engine’s evaluated result. Its **recommendations and offers are advisory/non-binding** to the learner unless a future approved policy explicitly defines a different access rule. |
| When can it be committed? | A decision is not committed as learner state. It may authorize a separate `State Commitment` only when an accepted learner command/evidence or required confirmed Learner Choice, valid transition, and policy evaluation exist. |
| How does it relate to learner choice? | It may return options and offers. A Learner Choice is a separate learner-owned fact received later; an offer or recommendation cannot be reclassified as a choice. |
| What may it contain? | Current focus/context, status, semantic opportunities, recommendations, offers, constraints, candidate commitments, uncertainty, and Decision Provenance. |
| What may it not contain? | UI actions, components, routes, tabs, layout, CSS, client-specific navigation, arbitrary provider output, a hidden progression command, or unqualified conclusions about the learner. |

## 2.2 Canonical Learning Decision contents

| Component | Meaning |
|---|---|
| **Decision Reference** | Stable identifier/reference for the material evaluation outcome. |
| **Evaluation Context** | References to the interaction, learner record scope, knowledge, pedagogical, policy, actor, and delivery-capability context used. |
| **Decision Status** | States whether the engine can safely offer opportunities, needs additional context, is constrained, or has declined an operation. Exact taxonomy remains open. |
| **Current Learning Focus** | The relevant concept(s), pedagogical intent/layer, and learning-context references. |
| **Candidate Learning Opportunities** | Semantic possibilities the engine identified before or after policy selection. |
| **Recommendations** | Non-binding, explainable options considered relevant for this learner/context. |
| **Offers** | Specific permitted opportunities made available under stated eligibility/choice constraints. |
| **Constraints** | Policy, pedagogical, availability, or delivery-capability limits that materially shape the decision. |
| **Candidate State Commitments** | Possible state changes that are not enacted until a valid authorization path completes. |
| **Decision Provenance** | Evidence, knowledge, pedagogical, policy, accepted-proposal, context, version, and uncertainty references. |

**CANONICAL BEHAVIOUR:** A decision remains valid only for the context and referenced versions in which it was formed. Reuse after a material context, policy, knowledge, or learner-record change requires re-evaluation before a new commitment.

**OPEN DECISION:** The decision-status vocabulary, decision expiry/validity window, ranking format, maximum offer count, and formal rule for “material context change” are not set by the source materials.

---

# 3. Learning Opportunity Semantics

The following concepts are intentionally non-interchangeable.

| Concept | Meaning | Created by | Can it mutate learner state? | Can it be treated as learner consent? |
|---|---|---|---|---|
| **Learning Opportunity** | A semantic possibility for learning, such as continue, revisit, explore a representation, practise, reflect, move toward a pedagogical layer, explore a bridge, pause, or choose. | Learning Decisioning during evaluation. | No. | No. |
| **Learning Recommendation** | A non-binding, reasoned indication that an opportunity may be useful in the evaluated context. | Learning Decisioning. | No. | No. |
| **Learning Offer** | A decision-scoped, policy-permitted opportunity made available to the learner, usually tied to a specific learning experience or allowed action. | Learning Decisioning after policy evaluation. | No. | No. |
| **Learner Choice** | A confirmed semantic selection, decline, deferment, alternative request, or pause supplied by the learner. | Learner, through an accepted Interaction Command. | It may authorize a later commitment but does not bypass policy. | Yes, only for the choice explicitly expressed. |
| **Engine Decision** | The engine’s explainable conclusion about suitable/permitted outcomes now. | Learning Decisioning. | No, not by itself. | No. |
| **State Transition** | A valid conceptual change in the Current Learner State projection. | Authorized State Commitment. | Yes, only through the commitment path. | No; it requires a valid authorization path. |
| **State Commitment** | The accepted, policy-valid record of a material state change and its provenance. | Learner Record after Decisioning and Policy/Governance approval. | Yes. | It is the result of consent/command plus validation, not consent itself. |

## 3.1 Semantic opportunity vocabulary

| Opportunity | Engine meaning | Required learner action before material commitment |
|---|---|---|
| **Continue** | Continue with a compatible experience in the current focus. | Select a specific offered experience if the command did not already explicitly request it. |
| **Revisit** | Re-engage a prior concept, representation, experience, or pedagogical intent. | Confirm the selected revisit opportunity. |
| **Explore another representation** | Encounter an alternative approved representation for a concept. | Confirm/select the offered representation. |
| **Practise** | Engage with an approved practice experience. | Explicit learner request/selection and later explicit submission if learner-owned practice evidence is recorded. |
| **Reflect** | Engage with a reflection opportunity. | Explicit learner submission to create reflection evidence. |
| **Move toward a pedagogical layer** | Select an experience associated with Intuition, Mechanics, or Exam Patterns. | Explicit learner selection; an offer does not equal movement. |
| **Revisit a prerequisite** | Voluntarily explore a published prerequisite relationship and associated experience. | Explicit learner selection, unless a future approved policy defines a permissible constraint. |
| **Explore a concept bridge** | Voluntarily follow a published concept bridge. | Explicit learner selection. |
| **Pause** | Defer or stop active learning without adverse inference. | Explicit learner pause command if pause state is to be recorded. |
| **Allow learner choice** | Return a bounded set of suitable opportunities without asserting one required route. | No commitment occurs until a later choice. |

**SOURCE REQUIREMENT:** The engine must express all of these kinds of opportunity as semantic learning possibilities rather than hard-coded UI actions.

---

# 4. State Transition Model

## 4.1 Canonical model: compositional, not linear

The supplied example of `Unknown → Encountered → Exploring → Practising → Reflecting → Consolidating → Ready` must **not** be adopted as a universal learner lifecycle. It is too linear and would conflate historical activity, learner evidence, inferred interpretation, and readiness. The approved Learner Record requires a compositional model instead.

**CANONICAL BEHAVIOUR:** For each learner–concept context, the current state is a projection over independent dimensions. Historical events and source evidence may occur in different orders, recur, or be absent without invalidating the record.

| State dimension | Permitted conceptual values | Basis |
|---|---|---|
| **Engagement focus** | `Unobserved`, `Encountered`, `Active Focus`, `Paused`. | Historical engagement events and explicit learner commands/choices. |
| **Pedagogical engagement** | No selected layer; `Intuition` context; `Mechanics` context; `Exam Patterns` context; more than one relevant historical context. | Learning-experience/layer events and current focus; not a compulsory sequence. |
| **Practice evidence** | No recorded attempt; one or more recorded attempts. | Observed Practice Attempts only. |
| **Reflection evidence** | No recorded reflection; one or more recorded reflections. | Observed Learner Reflections only. |
| **Confidence evidence** | No report; one or more learner-reported confidence values in context. | Observed Confidence Reports only. |
| **Interpretation status** | No interpretation; one or more qualified interpretations with uncertainty. | Derived and provenance-linked only. |
| **Opportunity status** | No active offer; offer(s) available; offer selected/declined/deferred. | Decisions, offers, and observed Learner Choices. |
| **Readiness/mastery** | **Not defined.** | **OPEN DECISION:** The source does not establish an operational readiness or mastery state. |

## 4.2 Valid transitions

| From condition | Trigger | Valid transition / state effect | Required authorization |
|---|---|---|---|
| `Unobserved` focus | Accepted command explicitly selects, requests, or begins learning around a concept. | Create engagement evidence; current focus may become `Active Focus` if the command expressly establishes it. | Learner command + policy validation. |
| `Unobserved` focus | A concept/experience is delivered or encountered through a valid interaction. | Record `Encountered` historical engagement. It is not evidence of understanding. | Valid interaction and event policy; exact delivery acknowledgement is open. |
| `Encountered` or `Paused` | Learner explicitly resumes/selects an experience or focus. | Current focus becomes `Active Focus` for the relevant concept/intent. | Learner command/choice + policy validation. |
| `Active Focus` | Learner explicitly pauses. | Current focus becomes `Paused`; no negative inference is created. | Learner command + policy validation. |
| Any engagement state | Learner submits reflection/practice/confidence/context. | Add immutable learner-owned evidence. The focus state need not change. | Explicit submission command + validation + policy. |
| Any engagement state | Valid deterministic analysis or accepted reasoning proposal supports a qualified conclusion. | Add/revise a Derived Interpretation with provenance and uncertainty; no unqualified readiness/mastery transition. | Validation + policy; no learner confirmation required to create a non-critical qualified interpretation. |
| Offer available | Learner accepts/declines/defers/chooses alternative. | Record Learner Choice; selected option may authorize an engagement-focus or experience-selection commitment. | Explicit learner choice + revalidation. |
| Any state | A published concept relation supports a voluntary prerequisite/bridge option. | Produce a recommendation/offer only; it does not force a focus change. | Evaluation and policy only for offer; learner choice for commitment. |

## 4.3 Invalid transitions

| Invalid transition | Why invalid |
|---|---|
| Recommendation/offer → Learner Choice | The engine or client cannot treat a suggestion as learner consent. |
| Concept viewed/encountered → Understood/Ready/Mastered | Exposure is not proof of conceptual understanding, and no such operational state has been approved. |
| AI proposal → Confidence Report | An AI cannot rewrite or generate a learner’s self-reported confidence. |
| AI proposal → material learner state commitment | AI is proposal-only; validation, policy, and any required choice must intervene. |
| Reflection → overwritten reflection | The learner’s original words are immutable source evidence. |
| Missing/invalid knowledge context → concept-specific commitment | A commitment cannot rely on knowledge that cannot be resolved/versioned. |
| Invalid or unauthorized command → learner event or material state update | No material learner-record update is permitted. Logging of invalid attempts is a separate governance decision. |
| Client gesture → layer progression | Client UI semantics have no authority in the engine. |

## 4.4 Transition requirements

| Transition type | Learner choice required? | Evidence required? | Policy validation required? |
|---|---|---|---|
| Return a recommendation or offer | No. | Relevant available context is required; learner evidence is optional. | Yes. |
| Record learner-submitted reflection/practice/confidence/context | The explicit submission is the learner action; no separate confirmation is required. | The submitted source material itself. | Yes. |
| Create a qualified derived interpretation | No, unless future policy says otherwise. | Identified supporting evidence and/or accepted reasoning proposal. | Yes. |
| Select an offered experience or change active focus/path | Yes, unless the incoming command itself unambiguously expresses that selection. | A valid command/choice. | Yes. |
| Mark exposure/encounter history | **OPEN DECISION** on whether an edge delivery acknowledgement is required. | Valid interaction/delivery basis. | Yes. |
| Change readiness/mastery/completion status | Not defined. | Not defined. | **OPEN DECISION.** |

---

# 5. Canonical Decisioning Pipeline

The refined pipeline is ordered to protect evidence, autonomy, and policy while preserving an AI-independent deterministic path.

```text
1. Receive and de-duplicate Interaction Command
2. Validate Trusted Actor Context, command scope, and required consent
3. Resolve policy scope, Knowledge Context, Learner Record, Pedagogical Guidance, and delivery capabilities
4. Classify inputs as OBSERVED facts/evidence versus existing INFERRED interpretations
5. Evaluate deterministic eligibility, integrity, and pedagogical suitability
6. Construct candidate Learning Opportunities
7. Determine whether optional bounded reasoning is permitted and useful
8. Validate any returned Reasoning Proposal; reject it safely if unsuitable
9. Apply Policy/Governance to candidates, proposals, and possible commitments
10. Construct Learning Decision with Recommendations, Offers, Constraints, Provenance, and Uncertainty
11. Return Learning Interaction Response
12. If a choice/commitment command arrives, re-resolve material context and revalidate policy/transition rules
13. Commit valid state change, write associated Historical Event(s), and refresh Current Learner State projection
```

## 5.1 Pipeline properties

| Property | Required behaviour |
|---|---|
| **Deterministic baseline** | Steps 1–6 and 9–13 must remain possible without an AI provider. AI may enrich candidates but cannot be a prerequisite for safe baseline decisioning. |
| **No premature mutation** | Steps 1–11 do not alter material learner state merely by deciding or offering. Accepted learner evidence is recorded through its own authorized submission path. |
| **Policy as a continuous constraint** | Policy is evaluated before protected-data disclosure/reasoning, after proposal creation, before learner-visible response, before mutation, and before event persistence. |
| **Revalidation before commitment** | A prior decision cannot be relied on blindly when a learner later selects an offer. Material context/policy/availability must be checked again. |
| **Interface independence** | The pipeline receives semantic commands and generic capabilities. It never evaluates browser events, component state, UI routes, or page completion. |
| **Explainability** | A material decision records structured provenance and uncertainty; it does not expose private chain-of-thought. |

---

# 6. Deterministic Decision Rules

## 6.1 Rules that must be deterministic

| Rule family | Deterministic requirement |
|---|---|
| **Command and schema validity** | The engine must deterministically decide whether a command/evidence/choice has the required shape, references, scope, and command reference. |
| **Actor/permission/consent boundary** | The engine must deterministically apply supplied trusted actor scope and applicable policy to learner-record access, evidence use, and permitted actions. |
| **Knowledge integrity** | Stable locators, version references, relationship references, and learning-experience eligibility must resolve consistently or fail safely. |
| **Learner evidence protection** | Reflection immutability, evidence/interpretation separation, confidence-report integrity, and provenance linking are non-probabilistic constraints. |
| **Transition validity** | The engine must deterministically distinguish recommendation, offer, learner choice, commitment, and historical event; it must reject invalid transition paths. |
| **Autonomy and safety constraints** | The engine must enforce confirmation requirements, prohibited coercive/evaluative outcomes, and no silent critical mutation. |
| **Policy application** | Given a policy version and the same canonical inputs, a policy result must be repeatable. |
| **State/event integrity** | An accepted commitment must result in coherent historical evidence/event records and a valid current-state projection; retries must not duplicate material effects. |
| **Reasoning-proposal validation** | Schema, task-boundary, provenance, and policy checks for AI proposals must be deterministic. |

## 6.2 Rules deliberately not defined

| Rule candidate | Status |
|---|---|
| Which prerequisites are advisory versus access-blocking. | **OPEN DECISION** |
| Exact learner-state readiness/mastery definitions and evidence thresholds. | **OPEN DECISION** |
| Confidence values/scales, aggregation, and influence on recommendations. | **OPEN DECISION** |
| Recommendation ranking, weights, tie-breaking, and number of offers. | **OPEN DECISION** |
| When to prefer Intuition, Mechanics, or Exam Patterns for a particular learner. | **OPEN DECISION** beyond the approved pedagogical meanings and learner-autonomy constraints. |
| Formal rules for interpreting practice attempts or reflections as learning evidence. | **OPEN DECISION** |
| Content-quality, curriculum-authority, and mathematical-validation workflow. | **OPEN DECISION** |

**CANONICAL BEHAVIOUR:** Where a substantive selection rule is open, the engine may return a safe constrained decision—such as allowing learner choice among policy-permitted, pedagogically compatible opportunities—but must not simulate a hidden ranking or mastery rule.

---

# 7. AI Decision Boundaries

## 7.1 Permitted AI participation

AI reasoning participates only through the canonical `Reasoning Task → Reasoning Proposal → Validation → Policy Evaluation → Learning Decision` path. It is optional, bounded, and provider-agnostic.

| AI-assisted operation | Engine provides to AI | AI may propose | AI cannot decide or perform | Validation and policy requirement | Possible committed effect |
|---|---|---|---|---|---|
| **Reflection analysis** | Policy-permitted original reflection reference/content, concept/layer context, task purpose, output schema, permitted evidence scope. | Qualified understanding signals, curiosity threads, tone observations, candidate opportunities, uncertainty. | Rewrite reflection; assert learner truth; set confidence/readiness; advance a path. | Validate schema, source links, bounded scope, uncertainty, non-evaluative language, and policy. | Accepted interpretation may be recorded as derived; no critical state mutation. |
| **Explanation/metaphor generation** | Approved concept, representation/pedagogical intent, delivery constraints, output limits, policy. | Candidate explanation or metaphor. | Change knowledge relationships, state, policy, or learner choice. | Validate grounding to approved knowledge and output/policy suitability. | Candidate content may become an offer only after acceptance/policy. |
| **Alternative representation generation** | Approved concept context, allowed representation purpose, task bounds, policy. | Candidate representation/explanation option. | Publish knowledge as authoritative or force a transition. | Validate against knowledge/pedagogy/policy; any editorial publication process remains open. | May inform a bounded offered experience if accepted. |
| **Misconception hypothesis** | Policy-permitted practice/reflection evidence and approved concept context. | Cautious hypothesis with evidence references and gentle alternative opportunity. | Diagnose, label, or persist a learner deficit as fact. | Validate uncertainty, neutral language, grounding, and policy. | May support a qualified interpretation and optional offer. |
| **Question/practice generation** | Approved learning objective, concept, pedagogical intent, task constraints. | Candidate question, hint, or reflection material. | Decide grading, mastery, learner permission, or progression. | Validate content scope, policy, and future content-governance requirements. | May become an offered experience if accepted. |
| **Adaptive-path suggestion** | Validated learner record view, knowledge, pedagogical candidates, policy constraints. | Candidate options/rationale. | Determine final eligibility, commit path, or override autonomy. | Deterministic eligibility + policy + decisioning must govern final offer. | May enrich recommendations only. |
| **Dialogue assistance** | Approved conversation context and policy bounds. | Candidate respectful response. | Commit state or turn conversational wording into authoritative logic. | Validate output policy and relevance. | Learner-visible output only, if permitted. |

## 7.2 AI availability and safe fallback

**CANONICAL BEHAVIOUR:** The engine must remain capable of returning a safe Learning Decision when no AI reasoning provider is available, fails, times out, or returns invalid output. In that case it uses approved knowledge, learner record, pedagogical guidance, and deterministic policy rules only. It may omit AI-derived interpretations or generated enrichments rather than inventing substitutes.

## 7.3 Retained AI provenance

For a proposal that materially influences a decision, the engine retains only the canonical provenance required for accountability: Reasoning Task reference, permitted input/evidence references, proposal reference, validation result, policy result, declared uncertainty, and its bounded role in the final decision.

**OPEN DECISION:** Whether raw provider output is retained, for how long, and under what privacy/consent conditions is not defined. This specification does not require raw-output storage.

---

# 8. Mathematical Knowledge Behaviour in Decisioning

Mathematical Knowledge does not merely supply content. It constrains and explains the engine’s possible decisions.

| Knowledge element | Role in decisioning | Prohibited use |
|---|---|---|
| **Concept** | Establishes the stable target of an interaction, evidence, experience, recommendation, or state projection. | It must not be inferred from a screen route alone. |
| **Prerequisite relationship** | Makes a prior concept relevant to an opportunity such as a voluntary revisit, alternate representation, or explanation of dependency. | It must not block access or force a transition unless a future policy explicitly approves that rule. |
| **Other concept relationships** | Enable broader/narrower, related, or otherwise typed connections to inform exploration and reasoning provenance. | They must not become untyped “related content” navigation shortcuts. |
| **Representation** | Enables selection of a suitable intuitive, formal, visual, verbal, symbolic, or other approved way to encounter a concept. | It must not be assumed suitable merely because a UI can display it. |
| **Example / Non-example** | Supplies contrast and clarification aligned to a concept and representation. | It must not itself prove learner understanding. |
| **Procedure** | Supports formal Mechanics opportunities with preconditions and explanatory context. | It must not become an unexplained list of steps or a forced progression rule. |
| **Misconception asset** | Supports a gentle alternative representation or candidate hypothesis without judgement. | It must not label the learner or be treated as a definitive diagnosis. |
| **Application** | Supports contextual meaning and alternative access to a concept. | It must not be assumed necessary for every learner interaction. |
| **Exam Pattern** | Supports Exam Patterns opportunities, recognition strategies, and typical traps when chosen or appropriate. | It must not reduce learner value to performance or dominate conceptual learning. |
| **Concept Bridge** | Enables voluntary exploration of a meaningful future/lateral connection. | It must not silently redirect the learner’s path. |
| **Learning Experience** | Is the concrete, versioned, compatible item the engine can place in an offer. | It must not be a UI page or an arbitrary unscoped content fragment. |

**CANONICAL BEHAVIOUR:** A material Learning Decision must reference the knowledge elements and versions that made its offered/recommended opportunity eligible. If the required knowledge cannot be resolved, the engine cannot create a dependent commitment.

---

# 9. Learner Evidence Semantics

## 9.1 Observed versus inferred information

| Information type | Classification | May directly affect Current Learner State? | Constraints |
|---|---|---|---|
| Accepted learner reflection in original words. | **OBSERVED learner-owned evidence** | Yes, as presence/context of a reflection; it must not be rewritten into interpretation. | Immutable after acceptance; access/use remains policy-governed. |
| Accepted practice attempt and learner-provided answer/self-assessment. | **OBSERVED learner-owned evidence** | Yes, as recorded practice evidence and context. | It is not automatically a performance grade, readiness state, or deficit label. |
| Learner-reported confidence. | **OBSERVED learner-owned evidence** | Yes, as a distinct self-reported confidence reference/value in state. | No derived score may replace it; interpretation of its decisioning use remains open. |
| Learner selection, decline, deferment, alternative request, or pause. | **OBSERVED learner-owned evidence and historical fact** | Yes, when it authorizes a permitted commitment. | Must originate in a valid confirmed semantic command. |
| Interaction history, such as a delivered/entered experience. | **OBSERVED historical fact** when validly recorded. | Yes, as engagement history only. | Never sufficient proof of understanding; delivery-acknowledgement rule remains open. |
| Published knowledge/version/policy references. | **OBSERVED source fact** | Yes, as evaluation context. | Must be stable and provenance-linked. |
| Understanding signal, curiosity thread, tone observation, or possible misconception. | **INFERRED derived interpretation** | Yes, only as qualified/revisable state content; never as indisputable learner fact. | Requires evidence/provenance, uncertainty, validation, and policy. |
| AI-generated explanation or recommendation candidate. | **INFERRED proposal** | No, not directly. | Must be accepted/validated and included in a new Learning Decision before any bounded use. |
| Readiness/mastery/competence claim. | **Not defined.** | No. | **OPEN DECISION:** No operational state or threshold is currently approved. |

## 9.2 Evidence behaviour rules

| Evidence type | Engine behaviour |
|---|---|
| **Reflection** | Preserve original words as learner-owned evidence. It may trigger a new evaluation. AI/deterministic processes may propose interpretation, but the reflection is never replaced. |
| **Practice attempt** | Preserve the attempt and its context. It can inform non-judgmental adaptation but cannot by itself trigger an unapproved grading/mastery conclusion. |
| **Confidence report** | Preserve it as the learner’s report, including its context. It may be made available to evaluation; the adaptation rule is an open decision. |
| **Learner choice** | Preserve the explicit selection or decline as a historical fact and use it to authorize only the specific resulting commitment, subject to revalidation. |
| **Interaction history** | Use it as context for engagement/revisiting and provenance. Do not convert repeated visits into assumed understanding. |
| **Derived interpretation** | Keep source references, method/proposal references, policy/validation references, and uncertainty. It is revisable if evidence or rules change. |

---

# 10. Policy Enforcement Model

Policy/Governance is not a final text filter. It applies at all five examined enforcement points, because each protects a distinct boundary.

| Enforcement point | Why it is required | Required policy question | Result if not permitted |
|---|---|---|---|
| **Before AI reasoning** | An AI task may disclose learner-owned evidence or use data outside permitted scope. | Is this reasoning task, its input evidence, actor scope, consent context, and purpose permitted? | Do not invoke the reasoning port; continue deterministically if possible. |
| **After AI reasoning** | A returned proposal may be malformed, ungrounded, evaluative, unsafe, or outside task scope. | Is the proposal schema-valid, provenance-linked, non-evaluative, appropriate, and permissible for its intended bounded use? | Reject/limit the proposal; do not treat it as a decision or state change. |
| **Before learner-visible output** | Even a deterministic decision or accepted proposal must not expose protected data, coerce, or violate safety/autonomy constraints. | Is the planned response/offer content suitable for the actor, context, delivery capability, and policy? | Remove/replace/constrain output; return a safe alternative or explanation at permitted level. |
| **Before state mutation** | A decision, offer, client command, or AI proposal must not silently change material learner state. | Is there a valid command/choice/evidence path, a valid transition, appropriate consent, and policy permission? | No State Commitment. |
| **Before historical event creation** | Historical records preserve learner data and affect accountability/reconstruction. | Is recording this event/evidence permitted, correctly classified, minimally necessary, and provenance-valid? | Do not create the event/evidence record; return a safe result subject to audit policy. |

**CANONICAL BEHAVIOUR:** Reusing a policy outcome is allowed only when the policy version, actor/consent context, action, and relevant data scope remain materially unchanged. A policy result that permits learner-visible content does not automatically permit a state commitment.

**OPEN DECISION:** Detailed privacy/retention/deletion law, safeguarding policy, policy-owner roles, exception procedures, and exact learner-facing explanations for constrained outcomes are not defined.

---

# 11. Provenance Behaviour

## 11.1 Minimum provenance for a material Learning Decision

| Provenance element | Required content |
|---|---|
| **Decision context** | Decision reference; interaction/command reference; timestamp/context reference; learner-record scope. |
| **Learner evidence** | References to relevant reflections, practice attempts, confidence reports, choices, learning-context reports, and historical events used. |
| **Knowledge basis** | References to concepts, relationships, knowledge assets, learning experiences, and their knowledge versions. |
| **Pedagogical basis** | Pedagogical layer, guidance, and rule/version reference used to establish opportunity suitability. |
| **Policy basis** | Applicable policy version(s), policy evaluation references, constraints, and confirmation requirements that shaped the result. |
| **Reasoning basis** | References to accepted Reasoning Proposals, their validation result, and their bounded contribution, if any. |
| **Delivery basis** | Any generic delivery-capability constraint that affected what could be offered. |
| **Uncertainty** | Explicit qualitative/structured uncertainty about incomplete, conflicting, or inferred evidence. |

## 11.2 Provenance rules

| Rule | Canonical behaviour |
|---|---|
| Provenance is structured. | The engine records references and rule/constraint categories, not only a prose justification. |
| Provenance is privacy-governed. | A client may receive an appropriate explanation, while access to detailed references is controlled by policy/authorization. |
| Provenance distinguishes source from inference. | Learner-owned evidence, historical events, deterministic knowledge facts, and accepted AI proposals remain separately identified. |
| Provenance does not expose private chain-of-thought. | It identifies inputs, rules, versions, validations, and high-level reasons—not unobservable internal model reasoning. |
| Provenance travels with material decisions and commitments. | A state commitment must identify the decision/choice/evidence/policy path that authorized it. |

---

# 12. Failure Behaviour

The engine must fail **safely, predictably, and without inventing learner state**. A failure response is still an interface-neutral Learning Decision outcome; it is not a UI error screen.

| Condition | Required engine behaviour | State/event effect |
|---|---|---|
| Required knowledge is missing, invalid, retired, or cannot be resolved. | Do not form a concept-dependent recommendation, offer, or commitment. Return an unavailable/incomplete-context decision that names only a policy-permitted reason category and any safe non-dependent option. | No dependent commitment. Whether to retain a technical audit record is **OPEN DECISION**. |
| Learner state is incomplete. | Do not fabricate confidence, understanding, history, preference, or readiness. Evaluate using available evidence and return a constrained decision, optional learner choice, or a request for permitted context. | No inferred critical state created merely to fill the gap. |
| AI reasoning is unavailable. | Continue with deterministic knowledge, pedagogy, learner record, and policy. Omit AI-only enrichments/interpretations. | No AI proposal/interpretation committed. |
| AI output fails validation. | Reject the proposal; do not expose it as an insight or use it to influence a state commitment. Continue deterministically where possible. | The original learner evidence remains; no proposal-derived interpretation. Proposal-rejection audit retention is **OPEN DECISION**. |
| Policy rejects a candidate opportunity/output/proposal. | Remove, constrain, or replace it with a permitted alternative where one exists. Return an appropriately bounded decision. | No rejected candidate commitment/event. |
| Learner choice is required but absent. | Return/retain the uncommitted offer and make no selection, path, focus, or progression commitment. | No Learner Choice event and no resulting commitment. A `LearningPathSuggested` event may exist only if approved event-recording policy permits it. |
| Conflicting evidence exists. | Preserve the conflicting evidence, attach uncertainty to any interpretation, and do not resolve it through arbitrary ranking. Offer only safe opportunities/choices consistent with policy. | No critical state transition based solely on unresolved conflict. |
| Proposed state transition is invalid. | Reject the commitment and return a constrained decision; require a new valid command/choice/evidence path if appropriate. | No state mutation. Retention of rejected-transition audit events is **OPEN DECISION**. |
| Actor authorization/consent is insufficient. | Do not disclose/use protected learner material beyond permitted scope and do not accept the prohibited operation. | No learner-record mutation; security/audit handling is **OPEN DECISION**. |

---

# 13. Idempotency and Repeatability Rules

## 13.1 Definitions

| Term | Canonical meaning |
|---|---|
| **Deterministic** | Given the same canonical inputs, resolved versions, learner-record view, policy context, and accepted proposal set, the rules produce the same semantic result. |
| **Repeatable** | An evaluation may be performed again and yields an equivalent semantic outcome under equivalent conditions, even if a new response/decision reference is issued by a future implementation. |
| **Idempotent** | Reprocessing the same declared interaction occurrence has no additional material effect after the first accepted effect. |
| **Explicitly non-deterministic** | A process may produce different candidate output between equivalent calls, but its output is not authoritative until validation/policy and cannot violate deterministic constraints. |

## 13.2 Required operation properties

| Operation | Deterministic | Repeatable | Idempotent | Notes |
|---|---|---|---|---|
| Command shape/scope validation | Yes | Yes | Yes | Same command/context yields the same validity result while policy/context versions are unchanged. |
| Knowledge resolution | Yes | Yes | Yes | Depends on stable locator and version context. |
| Policy evaluation | Yes | Yes | Yes | Depends on explicit policy/actor/consent/action inputs. |
| Pedagogical suitability and deterministic candidate construction | Yes | Yes | Yes | Ranking/selection rules remain open where source is silent. |
| Learning Decision formation without AI | Yes | Yes | Yes | Equivalent semantic decision under identical material context. |
| AI proposal generation | No | No guarantee | No guarantee | AI is explicitly non-deterministic; it remains proposal-only. |
| Proposal validation/policy acceptance | Yes | Yes | Yes | For the same proposal, task, evidence, and policy context. |
| Evidence submission and resulting commitment | Yes for validation | Yes for retry outcome | **Yes, required** | The same `Command Reference` must not create duplicate reflection/practice/confidence/choice records, events, or commitments. |
| Offer selection / learner-choice commitment | Yes for validation | Yes for retry outcome | **Yes, required** | Same choice occurrence must not duplicate state/path effects. |
| Intentional repeated interaction | Context-dependent | Yes | No across new occurrence references | A learner may intentionally repeat an experience/attempt; a new Command Reference distinguishes this from transport retry. |
| Historical event creation | Yes after valid commitment | Yes for retry outcome | Yes per Command Reference | Distinct intentional occurrences may create distinct valid events. |

## 13.3 Repeated-submission rule

**CANONICAL BEHAVIOUR:** Every interaction capable of adding learner-owned evidence, a learner choice, a state commitment, or a historical event must carry a Command Reference. If the engine receives the same reference within the same actor/record scope, it must return the prior accepted/rejected semantic outcome and must not duplicate evidence, events, offers accepted, or state changes. A learner who intentionally repeats an attempt must use a new interaction occurrence reference.

**OPEN DECISION:** The lifetime/scope of command references, conflict behaviour when the same reference has altered payload, and retention of rejected/deduplication records are not specified.

---

# 14. Definitive Engine Invariants

These invariants are technology-independent and become required future automated contract tests.

1. **Headless core:** The engine does not require or emit React, browser, page, route, component, tab, card, button, or layout semantics.
2. **Core/edge direction:** Clients, transport, persistence, identity implementations, delivery systems, and AI providers depend on core contracts; core domains do not depend on their technologies.
3. **Stable knowledge:** Material decisions use addressable, version-aware knowledge context rather than UI content locations.
4. **Relationship integrity:** Prerequisites and bridges are explicit typed concept relationships, not navigation shortcuts.
5. **Evidence preservation:** Learner reflections, practice attempts, confidence reports, contexts, and choices retain their original learner-owned form after acceptance.
6. **Evidence separation:** Source facts, historical events, learner-owned evidence, derived interpretations, current state, recommendations, offers, choices, decisions, and commitments remain distinguishable.
7. **No view-equals-understanding:** Encountering content, entering a layer, or visiting an experience cannot prove conceptual understanding/readiness/mastery.
8. **Confidence integrity:** A learner’s reported confidence cannot be overwritten or represented as an AI/model-derived score.
9. **Interpretation qualification:** Every interpretation is evidence-linked, provenance-linked, uncertainty-qualified, and revisable.
10. **Layer semantics:** Intuition, Mechanics, and Exam Patterns are pedagogical intents, not mandatory client sequence or UI locations.
11. **Autonomy:** A recommendation or offer can never be treated as a learner choice, consent, or progression commitment.
12. **Commitment authorization:** A material state commitment requires a valid command/evidence or required learner choice, valid transition, policy evaluation, and provenance.
13. **No silent critical mutation:** AI output, client interaction, recommendation, or unvalidated inference cannot silently change critical learner state, permissions, confidence, reflection content, or progression.
14. **AI proposal-only authority:** AI may only return bounded Reasoning Proposals; validation and policy precede any use in decisioning.
15. **AI-independent baseline:** An unavailable or rejected AI provider cannot prevent safe deterministic learning decisioning.
16. **Policy enforcement:** Policy applies before protected reasoning, after reasoning, before learner-visible output, before state mutation, and before historical event/evidence creation.
17. **Non-evaluative safety:** The engine must not create judgmental learner labels or performance-driven coercive outcomes and must enforce the specified prohibited language/behaviour constraints.
18. **Decision explainability:** Every material Learning Decision and State Commitment has structured provenance sufficient to identify evidence, knowledge, pedagogy, policy, accepted proposals, context, and uncertainty without revealing private chain-of-thought.
19. **Failure safety:** Missing/incomplete/conflicting/invalid inputs produce no fabricated facts, ungrounded inference, or dependent state commitment.
20. **Idempotent mutation:** Retrying the same semantic interaction occurrence cannot duplicate learner evidence, historical events, or commitments.
21. **Learner-choice fidelity:** A learner’s accepted choice records only what the learner selected, declined, deferred, or paused; it must not be expanded into an unexpressed preference.
22. **Version-aware revalidation:** A decision formed under one material knowledge, policy, learner-record, or capability context cannot authorize a commitment after a material change without re-evaluation.

---

# 15. Behavioural Examples

The examples are engine interactions only. They do not describe screens, UI controls, providers, databases, or APIs.

## Scenario 1 — Low-energy intuitive entry to a Functions concept

| Stage | Behaviour |
|---|---|
| **Input** | Learner command: begin a learning focus on the approved concept *What is a Function* with Intuition intent. |
| **Context** | The learner supplies a low-energy context. The capability profile supports the requested compatible representation types. |
| **Evidence** | No prior concept-specific evidence is required. The low-energy context is observed learner-provided context, not an inference. |
| **Evaluation** | The engine resolves the Function concept, Intuition-compatible learning experiences, available low-energy material, pedagogical guidance, and policy. It does not assume a prerequisite block. |
| **Candidate opportunities** | Explore an intuitive metaphor/representation; use a low-energy summary; pause; allow learner choice. |
| **Policy** | Confirms respectful/non-evaluative content, learner agency, and that no automatic progression is implied. |
| **Learning Decision** | Authoritatively offers compatible Intuition experiences and the low-energy alternative, with an explanation that these are available options. No Mechanics or Exam Patterns transition is imposed. |
| **State effect** | The explicit focus command may establish `Active Focus` for the concept and Intuition intent. It does not establish understanding/readiness. |
| **Historical event** | A concept/focus encounter is recorded only under the approved event-recording policy; the source-supported `ConceptViewed`/`LayerEntered` semantics may apply when the relevant condition is validly observed. |

## Scenario 2 — Learner chooses an alternative representation

| Stage | Behaviour |
|---|---|
| **Input** | Learner command: request another representation for an actively explored approved concept, for example *Domain and Range*. |
| **Context** | Learner Record contains a self-reported confidence record in the relevant context and prior engagement history. Delivery Capability Profile permits the alternative approved representation. |
| **Evidence** | Confidence report and interaction history are **OBSERVED**; neither is a mastery score. |
| **Evaluation** | The engine resolves all approved representations and pedagogically suitable experiences for the same concept; it assesses compatibility and policy constraints. |
| **Candidate opportunities** | Continue current representation; explore the alternative representation; reflect; pause; allow learner choice. |
| **Policy** | Ensures the alternative is offered without judgement and does not disclose other learner data. |
| **Learning Decision** | Returns a non-binding recommendation and a concrete offer for the alternative approved representation, each with provenance. |
| **State effect** | None until the learner confirms the offered representation. On valid confirmation, active focus/selected experience may be committed. |
| **Historical event** | The initial decision/offer may create a policy-permitted `LearningPathSuggested` record. The later explicit acceptance creates `LearningPathAccepted` and appropriate engagement/layer event(s). |

## Scenario 3 — Voluntary prerequisite revisit after practice and reflection

| Stage | Behaviour |
|---|---|
| **Input** | Learner submits a Practice Attempt and a Reflection for a target concept whose approved knowledge context declares a prerequisite relationship. The reflection expresses uncertainty around a representation. |
| **Context** | Trusted actor scope is valid. The relevant target concept, prerequisite relationship, practice experience, and pedagogical guidance resolve. |
| **Evidence** | Practice attempt and original reflection are **OBSERVED learner-owned evidence**. Any uncertainty signal is not yet a fact. |
| **Evaluation** | The engine records the evidence, evaluates the published prerequisite relationship, and may create a qualified deterministic or validated AI-assisted interpretation with uncertainty. |
| **Candidate opportunities** | Continue with alternative representation; voluntarily revisit the prerequisite; reflect further; pause; allow learner choice. |
| **Policy** | Blocks judgmental wording and prohibits interpreting the practice attempt as a failure or forcing prerequisite access. |
| **Learning Decision** | Recommends a prerequisite revisit as an optional opportunity and explains its relationship at the permitted level. It does not assert that the learner lacks prerequisite knowledge. |
| **State effect** | The accepted evidence becomes part of the Learner Record. No prerequisite-path/focus transition occurs until the learner explicitly selects it. |
| **Historical event** | `PracticeAttempted` and `ReflectionSubmitted` are recorded after valid acceptance. A path suggestion may be recorded if the event policy permits; selection later produces `LearningPathAccepted`. |

## Scenario 4 — Reflection-driven adaptation with an accepted reasoning proposal

| Stage | Behaviour |
|---|---|
| **Input** | Learner submits an original reflection for *Inverse Functions* and asks what learning opportunity may be helpful next. |
| **Context** | Relevant knowledge assets and pedagogical guidance resolve; actor/consent policy permits a Reflection Analysis task. |
| **Evidence** | The reflection is **OBSERVED learner-owned evidence**. |
| **Evaluation** | Deterministic evaluation identifies concept/layer context. The engine requests a bounded reflection-analysis proposal. The returned proposal links a curiosity thread to the source reflection, includes uncertainty, passes schema/provenance/policy checks, and is accepted only as a qualified interpretation. |
| **Candidate opportunities** | An alternative Intuition representation; a Mechanics experience; a reflection continuation; optional practice; allow learner choice. |
| **Policy** | Applies data-use consent before reasoning, validates non-evaluative proposal language after reasoning, and prohibits automatic progression. |
| **Learning Decision** | Returns optional, evidence-linked offers/recommendations and notes uncertainty through its provenance. The accepted proposal enriches the decision but does not become the decision. |
| **State effect** | Reflection evidence is recorded. A qualified interpretation may be added to the Learner Record. No layer/path commitment occurs without a later learner choice. |
| **Historical event** | `ReflectionSubmitted` is recorded. `InsightGenerated` is recorded only if its defined event criteria and policy are satisfied. |

## Scenario 5 — AI proposal rejection preserves learner safety

| Stage | Behaviour |
|---|---|
| **Input** | Learner submits a reflection associated with an approved concept, for example *Absolute Value*. |
| **Context** | A Reflection Analysis task is allowed to run. |
| **Evidence** | The original reflection is accepted as immutable learner-owned evidence. |
| **Evaluation** | The reasoning port returns a proposal that is ungrounded, lacks required evidence links, or uses prohibited evaluative/deficit language. Deterministic validation and policy reject it. |
| **Candidate opportunities** | Deterministic candidate opportunities remain: approved representation, reflection, optional practice, pause, and learner choice where appropriate. |
| **Policy** | Rejects the proposal before it can become visible, an interpretation, or a commitment input. |
| **Learning Decision** | Contains no proposal-derived insight. It returns only safe deterministic offers/recommendations, if enough context exists. |
| **State effect** | The original reflection remains recorded; no proposal-derived interpretation, confidence change, or progression state is added. |
| **Historical event** | `ReflectionSubmitted` is recorded. Retention of an internal proposal-rejection event is **OPEN DECISION**; no `InsightGenerated` event is created. |

## Scenario 6 — AI unavailable, deterministic learning continues

| Stage | Behaviour |
|---|---|
| **Input** | Learner asks for an available practice opportunity associated with an approved Functions concept. |
| **Context** | Knowledge, learner record, pedagogical guidance, policy, and delivery capabilities resolve. The reasoning provider is unavailable. |
| **Evidence** | Existing engagement/practice evidence may be considered, but no new AI interpretation is available. |
| **Evaluation** | The engine skips optional reasoning and deterministically identifies existing approved, compatible practice experiences. |
| **Candidate opportunities** | Practise an available experience; revisit an approved representation; reflect; pause; allow learner choice. |
| **Policy** | Validates content and autonomy exactly as it would if AI were available. |
| **Learning Decision** | Returns an AI-independent decision and permitted practice offer(s), with provenance that does not claim an AI basis. |
| **State effect** | None until the learner selects/submits a practice interaction. |
| **Historical event** | Any offer/suggestion event follows normal policy; no AI insight event is created. |

## Scenario 7 — Repeated practice-submission retry

| Stage | Behaviour |
|---|---|
| **Input** | A learner submits a Practice Attempt using Command Reference `R`. The same semantic command with reference `R` arrives again as a retry. |
| **Context** | Same trusted actor/record scope and materially equivalent command context. |
| **Evidence** | The first accepted submission is **OBSERVED learner-owned evidence**. The second is a retry, not a second intention. |
| **Evaluation** | The engine resolves the Command Reference to the existing outcome before creating new evidence, decision, commitment, or event. |
| **Candidate opportunities** | The engine may return the original/equivalent decision outcome but must not produce a second attempt record for the retry. |
| **Policy** | Applies the same scope and evidence-protection rules; no duplicate disclosure or mutation. |
| **Learning Decision** | Returns the prior accepted/rejected semantic result or a repeatable equivalent under unchanged context. |
| **State effect** | Exactly one practice attempt and no duplicate material state change. |
| **Historical event** | Exactly one `PracticeAttempted` event for Command Reference `R`. A new intentional attempt requires a new reference. |

---

# 16. Contract Test Specification

These are future contract-level tests, not implementation tests. Every test must execute without UI, transport, database, or named AI provider assumptions.

| Test case | Preconditions | Stimulus | Expected contractual outcome |
|---|---|---|---|
| **CT-01 Normal learning progression** | Approved concept and compatible Intuition/Mechanics experiences; valid actor; learner explicitly selects an allowed experience. | Submit a semantic focus/experience-selection command and later valid learner choice where required. | Engine returns a provenance-bearing decision; selection creates only the permitted focus/engagement commitment and event. No understanding/mastery claim is created. |
| **CT-02 Learner chooses an alternative path** | A decision has a current experience offer and an alternative approved representation offer. | Learner explicitly chooses the alternative offer. | Choice is recorded distinctly; resulting commitment changes only the authorized focus/experience state; original recommendation is not misrecorded as choice. |
| **CT-03 Prerequisite revisit** | Published prerequisite relationship exists for the target concept. | Submit practice/reflection evidence and ask for a next opportunity. | Engine may offer/recommend a voluntary prerequisite revisit but cannot force it. No prerequisite state change occurs absent learner choice. |
| **CT-04 Reflection-driven adaptation** | Valid original reflection and a permitted source-evidence context. | Submit reflection, optionally invoke an accepted proposal, then request guidance. | Reflection remains intact; any interpretation cites evidence and uncertainty; decision returns non-binding suitable opportunities, not a learner label or automatic transition. |
| **CT-05 AI proposal rejection** | Reasoning port returns malformed, ungrounded, unsafe, or policy-prohibited proposal. | Evaluate the proposal. | Proposal is rejected; it affects neither learner state nor learner-visible insight; deterministic decisioning remains possible. |
| **CT-06 Missing evidence/context** | Required learner/knowledge context is absent or incomplete. | Request a dependent learning action. | Engine returns an incomplete/safe decision; does not fabricate learner facts, readiness, or a dependent commitment. |
| **CT-07 Policy rejection** | Candidate action conflicts with actor scope, consent, reflection ownership, or a safety/autonomy policy. | Attempt the candidate action/response/commitment. | Candidate is prohibited/constrained; protected evidence is not disclosed; no prohibited state/event effect occurs. |
| **CT-08 Repeated interaction** | A mutable interaction with Command Reference `R` has already been accepted. | Replay same actor/scope/payload/reference. | Prior/equivalent semantic result returns; exactly one evidence record, commitment, and event exist for `R`. |
| **CT-09 Unavailable AI** | Relevant AI reasoning task is permitted but provider is unavailable. | Request an interaction that could use AI enrichment. | Engine completes deterministic baseline evaluation, omits AI-only outputs, and does not fail or manufacture an AI result. |
| **CT-10 Invalid transition** | A recommendation/offer exists but no learner choice has been submitted. | Attempt to commit path/focus as if offer were consent. | Engine rejects the transition; no choice, commitment, or event is created. |
| **CT-11 Conflicting evidence** | Learner Record contains relevant conflicting confidence/reflection/practice evidence. | Request next opportunity. | Both sources remain preserved; decision provenance identifies uncertainty; no mastery/readiness or other critical commitment is inferred solely from conflict. |
| **CT-12 Voice-capable client neutrality** | A Delivery Capability Profile indicates spoken delivery and lacks a visual capability. | Request a concept opportunity whose candidate experiences differ in capability compatibility. | Engine returns only compatible offers/constraints or declares insufficient compatible knowledge; it does not emit screen/UI instructions or change learning logic. |

---

# 17. Remaining Open Decisions

The following are not resolved by this behavioural specification and must not be silently implemented later.

| Open decision | Why it remains open | Effect on future work |
|---|---|---|
| Curriculum identity, level, content authority, and content publication lifecycle. | The source requires scalable/versioned content but does not define who governs it. | Constrains detailed knowledge-model and content-import work. |
| Complete relationship taxonomy and prerequisite semantics. | It is unknown which relation types exist, how strength is expressed, or whether any can restrict access. | Constrains knowledge behaviour and any prerequisite enforcement. |
| Readiness, understanding, mastery, or completion definition. | The source intentionally prioritizes understanding without defining a scoring/status model. | Blocks any mastery/ready/completion transition rules. |
| Confidence-report scale and decisioning influence. | Self-report is required, but aggregation/interpretation/use is not defined. | Constrains confidence-driven adaptation. |
| Pedagogical selection/ranking rules. | The layer meanings are approved, but selection thresholds/weights are not. | Constrains deterministic recommendation ranking. |
| Automatic versus confirmation-required transition details beyond this minimum specification. | Autonomy requires explicit confirmation for material choice, but all possible transitions are not defined. | Constrains final commitment policy. |
| Definition of material versus non-material state commitment. | Needed to determine which updates require strict commitment/event paths. | Constrains persistence and audit detail. |
| Event recording details, delivery acknowledgement, correction, retention, and deletion. | Historical events are required conceptually; operational lifecycle is undefined. | Constrains event/history implementation. |
| Policy authority, lifecycle, exception process, and safeguarding requirements. | Policy domains are known; their governance is not. | Blocks production governance configuration. |
| Privacy, consent, retention, deletion, age, jurisdiction, and data-use rules. | User-scoped privacy is stated but operational/legal requirements are not. | Blocks production persistence, AI data handling, and access controls. |
| AI quality assurance, provider choice, raw-output retention, review, and acceptance thresholds. | Provider independence is approved; operating rules are not. | Blocks provider integration, not the core contracts. |
| Identity, authorization, tenancy, and actor-context model. | Trusted Actor Context is canonical but its source/semantics remain open. | Blocks authorization implementation. |
| Delivery-capability vocabulary and accessibility requirements. | Modality neutrality is approved; standard capability categories are not. | Constrains multi-client compatibility selection. |
| Command-reference scope/lifetime and altered-payload conflict handling. | Idempotency is required but key lifecycle policy is unspecified. | Constrains concrete command-processing implementation. |
| Decision validity/expiry semantics and safe incomplete-response taxonomy. | Needed for concurrency/revalidation and user-facing response detail. | Constrains application-boundary contract finalization. |

---

# 18. Phase 1.5 Completion and Approval Gate

**Phase 1.5 has established:**

1. A canonical command-to-decision-to-commitment execution lifecycle.
2. Precise Learning Decision, opportunity, recommendation, offer, choice, transition, and commitment semantics.
3. A compositional learner-state model that rejects a simplistic linear progression machine.
4. The required deterministic decisioning rules and the areas where the source leaves rules open.
5. Clear AI participation boundaries, validation gates, policy constraints, provenance, and AI-unavailable fallback behaviour.
6. The role of every knowledge element in decisioning.
7. An observed-versus-inferred evidence model that preserves learner-owned material.
8. Mandatory policy enforcement points.
9. Failure, idempotency, repeatability, and non-determinism behaviour.
10. A definitive set of engine invariants, seven behavioural scenarios, and twelve contract-level test cases.

**No source code, production implementation files, database schema, API, UI, AI provider, prompt, infrastructure, or client artefact has been created.**

> **Approval requested:** Approve this Phase 1.5 engine contract and behaviour specification before any subsequent phase begins. The unresolved matters in Section 17 remain explicitly open and must not be treated as decided during implementation.

---

## Source basis

This specification is based exclusively on the user-supplied Math Lumina prototype documentation and the approved Phase 0, Phase 0.5, Phase 1, and Phase 1.5 directives. It introduces no external framework, provider, database, curriculum, legal, or product decision as an approved requirement.
