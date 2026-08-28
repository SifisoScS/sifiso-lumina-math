# D54 — Learner-Initiated Communication, Request & Expression Authority

> **D54 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D53 are preserved exactly as approved and locked. D54 authorises no code, contract, repository, schema, migration, persistence, governance tooling, communication channel, chat surface, client, transport, parser, intent classifier, natural-language model, embedding, routing engine, safeguarding detector, vulnerability classifier, referral workflow, reviewer-recognition system, approval workflow, escalation system, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D55, or Slice 6 work.

## 1. Post-D53 Dependency Analysis

D53 establishes the authority boundary for learner safeguarding, vulnerability, coercion, unsafe participation, protective action, referral, escalation, confidentiality, non-retaliation, and recovery. It requires safeguarding concerns to remain distinct from ordinary learner context, diagnosis, incident classification, learner state, and learner choice, and it fails closed where authority or safe action cannot be established.

The chain now governs the engine-initiated cycle completely: the engine evaluates context, forms a decision, constructs opportunities, presents offers, delivers a response, and the learner responds within a form the engine has already shaped. Every learner act the chain recognises is a reply to something the engine did first — a selection between offers under D1, an assessment response under D8/D21/D26, an acknowledgement under D29/D30, a declared preference or accommodation request under D44, a contest or appeal under D50, and the raising of a safeguarding concern under D53.

The chain does not govern **communication that originates with the learner and does not fit one of those forms**: a question, a statement of difficulty, a request for a different explanation, a request to revisit or change direction, an unprompted disclosure, or any other thing a learner may say. No locked decision defines what such a communication is, what authority receiving it confers, what it may be permitted to become, or what happens when it is not answered.

The single highest-priority unresolved governance boundary is therefore **Learner-Initiated Communication, Request & Expression Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D1/D24 — Learner Choice & Delegated Choice** | Only an explicit `select-offer` may authorise commitment to an offered path; delegated choice is bounded. | What a learner-originated request is, when it is not a selection between engine-constructed offers. |
| **D8/D21/D26 — Assessment, Evidence & Interpretation** | Assessment observations are attributable, source-recognised, scope-limited claims responding to an issued prompt. | What an unprompted learner expression is, when it has neither declared source scope nor evidential sufficiency. |
| **D22/D27 — Conclusion & Learner State** | Authoritative learner state requires explicit authority and cannot arise from activity. | Preventing a learner's own words about themselves from becoming an authoritative state claim. |
| **D28/D29/D30 — Adaptation, Delivery & Execution** | Semantic response, delivery, interaction execution, and effect remain separate. | D29 governs whether an already permitted response may be delivered; it does not govern the learner originating a communication. |
| **D44 — Learner Context & Accommodation** | Declared preferences, accommodation requests, and inferred context remain distinct. | Preventing a momentary request from becoming a durable declared preference or support condition. |
| **D46/D47 — Provenance & Epistemic Status** | Origin, lineage, completeness, unknown, and uncertainty are explicit for admitted information. | The authority governing admission itself, and the provenance class an admitted communication carries. |
| **D50 — Transparency & Contestability** | Explanation, disclosure, contest, and appeal are bounded. | Preventing every communication from becoming a contest, and preventing a contest from being reduced to a communication. |
| **D53 — Safeguarding** | A safeguarding concern may be observed, **reported**, or derived, and no learner may be penalised for raising one. | The act of reporting itself: D53 depends on a learner-originated channel that D53 does not govern and no prior decision governs. |

This is the next priority because a learning engine's most ordinary learner act — asking a question — is the one act the constitution does not bound. Without D54, a learner's words could be read as a selection between offers, treated as qualified evidence of understanding, converted into an authoritative learner-state claim, absorbed as a durable preference, taken as consent, used to trigger adaptation or delivery, or entered into the authoritative record with no provenance class or epistemic status. Equally, a communication carrying safeguarding, contest, or accommodation significance could be routed into those paths and silently acquire their authority merely by arriving there, or could be met with no response at all and that non-response read as a finding.

D54 does not define channels, interfaces, intent taxonomies, routing criteria, thresholds, actors, or any interpretive technology. It defines the authority boundary for recognising, receiving, admitting, responding to, routing, and historically recording communication that originates with the learner.

## 2. Purpose

D54 defines the authority semantics for learner-initiated communication, request, expression, reception, admission, response, deferral, decline, non-response, routing, and the historical treatment of what a learner has said.

> **A request is not a choice. An expression is not evidence. Receiving is not admitting. Answering is not authorising. Routing is not classifying. Silence from the engine is not a finding about the learner.**

D54 ensures that a learner may communicate without that communication becoming, by itself, a decision, a permission, a conclusion, a state, or a fact about the learner; and that the engine may receive, answer, defer, decline, or route a communication without acquiring authority it does not separately hold.

## 3. Scope

D54 governs the constitutional status of communication originating with the learner, and its relationship to choice, consent, evidence, interpretation, state, context, adaptation, delivery, execution, safeguarding, contestability, provenance, epistemic status, and historical truth. It covers recognition, reception, admission, provenance and epistemic treatment, response, deferral, decline, non-response, routing to existing authorities, conflict, fail-closed behaviour, and forward correction.

| Within D54 | Outside D54 |
|---|---|
| What a learner-initiated communication is, and what it may and may not become | Channels, interfaces, chat surfaces, clients, transports, devices, or rendering |
| Authority to receive, admit, respond to, defer, decline, or route a communication | Natural-language processing, parsing, embeddings, intent classifiers, models, or any interpretive technology |
| Non-collapse between communication and choice, consent, evidence, interpretation, state, context, and determination | Mathematical truth, pedagogical authority, curriculum, content, assessment, policy, learner state, safeguarding, fairness, or privacy authority |
| Provenance, epistemic, historical, and fail-closed treatment of communication | Request or intent taxonomies, routing criteria, thresholds, named actors, service levels, or operational procedures |

D54 creates no interpretive authority, no communication actor, no request category, no response obligation of any specific form, and no legal, clinical, or jurisdictional standard. It does not determine what any particular learner meant.

## 4. Communication Model

A **learner-initiated communication** is an expression originating with the learner that is not, by its form, a selection between engine-constructed offers, an assessment response to an issued prompt, or an acknowledgement of an engine action. It is a bounded, attributable representation of something the learner expressed. It is not a claim about the learner, a claim by the engine, or a fact about the world.

**Reception** is the fact that a communication reached the engine's boundary. Reception establishes only that something was expressed and, where determinable, by whom and when.

**Admission** is the separately authorised act of entering a received communication into the authoritative record, with declared provenance, scope, purpose, and epistemic status. Reception does not imply admission, and admission does not imply that the content is true, sufficient, authorised, or consequential.

A **response** is an engine action taken in relation to a received communication. It may be an answer, a deferral, a decline, an acknowledgement, or a routing action. A response is itself a governed act under the authority applicable to its content.

**Routing** is directing a communication to an authority that may be applicable — safeguarding under D53, contest under D50, accommodation under D44, assessment under D21 — so that the receiving authority may consider it under its own rules.

**Non-response** is the absence of an engine response, whether by inability, unavailability, absence of authority, or fail-closed operation.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Communication** | Something the learner expressed. | Choice, consent, evidence, interpretation, state, or fact. |
| **Reception** | The expression reached the engine boundary. | Admission, understanding, agreement, or obligation. |
| **Admission** | Authorised entry into the authoritative record. | Truth, sufficiency, authority, or consequence. |
| **Request** | The learner asked for something. | Permission, entitlement, offer, authorisation, or commitment. |
| **Expression** | The learner conveyed a condition, difficulty, or view. | Qualified evidence, diagnosis, deficiency, or learner state. |
| **Response** | An engine action in relation to the communication. | Authorisation of the content, or authority over its subject. |
| **Deferral** | Consideration is postponed under stated conditions. | Refusal, dismissal, resolution, or a finding. |
| **Decline** | The engine states it will not act on the communication. | A judgement about the learner or the merit of what was said. |
| **Routing** | The matter was directed to a possibly applicable authority. | Classification, admissibility, or acceptance by that authority. |
| **Non-response** | No engine response occurred. | Refusal, dismissal, denial, safety, resolution, or any finding. |

### 4.1 Boundary with engine-initiated interaction

D29 governs whether an already permitted engine response may be delivered and interacted with, and the semantics of interaction execution. D54 governs communication that originates with the learner and is not shaped by a prior engine construction.

The two remain distinct, and neither converts into the other. A learner-initiated communication is not a D29 interaction event merely because it arrived through a delivery interaction, and a D29 interaction event is not a learner-initiated communication merely because the learner acted. Where a single act could satisfy both — an acknowledgement accompanied by an unprompted question — each aspect must be treated under its own decision, and neither may borrow the other's authority. Where the applicable treatment is ambiguous, the matter fails closed under §15.

D54 does not amend, reinterpret, extend, or narrow D29, D1, or any other locked decision, and states no priority between them.

## 5. Communication, Action, and Non-Collapse Separation

A communication may prompt attention, consideration, review, or a response. It must not be silently upgraded into an act with authority. Conversely, the absence of a governing authority does not justify ignoring a communication that a recognised authority would be required to consider; the appropriate treatment depends on consequence, authority, purpose, and safe options under D48/D49 and, where safeguarding is engaged, D53.

The seven distinctions below are constitutive of D54 and may not be collapsed in either direction.

| Distinction | Permitted meaning | Prohibited inference |
|---|---|---|
| **Request ≠ choice** | The learner asked for something. | A `select-offer`, a commitment, an authorised path change, or any D1 choice. |
| **Expression ≠ evidence** | The learner conveyed a condition or view. | A qualified assessment observation, evidential sufficiency, or a D21 source-recognised claim. |
| **Utterance ≠ declared preference** | The learner said something at a moment. | A durable declared preference, accommodation, or support condition under D44. |
| **Reception ≠ admission** | The expression reached the boundary. | Entry into the authoritative record, or any provenance or epistemic status. |
| **Response ≠ authorisation** | The engine acted in relation to the communication. | Authorisation of the content, authority over its subject, or truth of what was said. |
| **Routing ≠ classification** | The matter was directed to a possibly applicable authority. | Classification as a safeguarding concern, contest, accommodation request, or assessment observation. |
| **Non-response ≠ refusal** | No response occurred. | Refusal, dismissal, denial, resolution, safety, or a finding about the learner. |

These stages are distinct semantic categories, not a mandatory sequence. A communication may be received and never admitted, admitted and never answered, answered and never routed, or routed and never classified. No stage implies any other.

## 6. Communication and Learner Choice, Delegation, and Consent

D1, D19, and D24 remain controlling. A learner-initiated communication must never be converted into an assumed choice, selection, acceptance, decline, pause, resumption, agreement, permission, or consent.

Only an explicit `select-offer` may authorise commitment to an offered learning path under D1. A request that resembles, anticipates, or would be satisfied by an available offer is still not a selection of that offer. Where a communication indicates that the learner may wish to choose, the constitutionally available action is to make an appropriate offer under the authority that governs offers — not to treat the communication as the choice.

A communication from a representative is bounded by D24 and does not become the learner's choice, consent, or expression. A communication from the learner does not become a representative's act. Where it is unclear who expressed a communication, or in what capacity, the matter fails closed under §15.

## 7. Communication and Evidence, Interpretation, and Learner State

D2, D8, D21, D22, D26, and D27 remain controlling. A learner-initiated communication is not a qualified assessment observation, is not evidence of learning or of its absence, is not an interpretation, and is not an authoritative learner-state claim.

A learner statement about their own understanding, difficulty, confidence, progress, or capability is an expression about themselves. It is not a mastery, readiness, progression, misconception, competence, certification, or deficiency claim, and it may not be used to establish, confirm, revise, or withdraw learner state without the state authority D22/D27 require. Neither the presence nor the absence of such a statement establishes anything about what the learner knows.

A communication may be considered as context or as a signal where a separately authorised purpose permits, and it may prompt review. It does not become evidence by being admitted, by being repeated, by being confident, or by being consistent with other information.

## 8. Communication and Context, Preference, and Accommodation

D44 and D52 remain controlling. A momentary request, complaint, question, or statement of difficulty is not a declared preference, an accommodation request, a support need, or a durable learner-context condition.

A learner may express something that, under D44's own authority, could become a declared preference or accommodation request. That transition requires D44's authority and cannot occur merely because the expression was received, admitted, repeated, or routed. Nothing in D54 permits inferring a preference, need, capability, or protected characteristic from what a learner said or did not say.

Communication must not be used to remove access, reduce opportunity, label a learner, or produce differential treatment. Fairness and equity remain governed by D52; D54 creates no fairness authority and no fairness determination.

## 9. Reception, Admission, and the Authoritative Record

Reception and admission are separate acts requiring separate treatment. Receiving a communication creates no obligation to admit it, and admitting it creates no obligation to act on it.

Admission must be explicitly authorised for a stated purpose and scope, must identify what was expressed rather than what it was taken to mean, and must preserve the distinction between the learner's words and any interpretation of them. An interpretation, summary, translation, transcription, or classification of a communication is a derived representation under D46 and never replaces or becomes the original.

Admission is bounded by D19, D20, D34, D35, D36, and D45. It confers no data right, no disclosure permission, no retention decision, and no identity resolution. Where the learner's identity, the capacity in which they communicated, the purpose of admission, or the applicable data authority is unresolved, the communication must not be admitted for a consequential purpose and the matter fails closed under §15.

## 10. Provenance, Epistemic Status, and Uncertainty

D46 and D47 remain controlling. An admitted communication must carry its provenance — what was expressed, by whom where determinable, when, in what context, through what path, and with what transformation — and its epistemic status.

A communication is, epistemically, a report of an expression. That it was expressed may be well established while what it means remains unknown, ambiguous, uncertain, or contested under D47. These are separate statuses and must not be merged: certainty that something was said is never certainty about what it meant.

Ambiguity in meaning must be preserved rather than resolved by convenience, default, frequency, recency, model output, or operational need. Unknown meaning must not be treated as false, absent, declined, negative, or as learner deficiency. Uncertainty about a communication confers no authority to act on it and no authority to disregard it.

## 11. Response, Deferral, Decline, and Non-Response

A response is a governed act. Answering a learner does not authorise the content of the answer, does not make it authoritative, and does not confer authority over its subject: a response touching mathematics remains bounded by D40–D42, a response touching pedagogy or outcomes by D43, content and curriculum by their own authorities, and learner state by D22/D27.

Deferral and decline are legitimate outcomes and must be distinguishable from each other and from non-response. A deferral states that consideration is postponed; a decline states that the engine will not act. Neither is a judgement about the learner, the merit of the communication, or the truth of what was said.

**Non-response must never be treated as refusal, dismissal, denial, resolution, agreement, safety, or a finding about the learner.** Where the engine cannot respond — because authority is unavailable, meaning is unresolved, or the matter fails closed — that condition must be preserved as an unresolved matter rather than converted into an outcome. Elapsed time, learner silence, continued activity, session end, or account inactivity establish nothing about a communication and must not be used to infer that it was resolved, withdrawn, satisfied, or abandoned.

## 12. Routing to Recognised Authorities

A communication may carry significance for an authority other than D54. Routing directs it there; it does not decide anything for that authority.

| Routed to | What routing may do | What routing must not do |
|---|---|---|
| **D53 — Safeguarding** | Bring a possible protection-relevant matter to a safeguarding path. | Make it a safeguarding concern, determination, protective action, or incident. |
| **D50 — Contestability** | Bring a possible challenge to the contest path. | Make it a contest, appeal, correction, or finding of error. |
| **D44 — Learner Context** | Bring a possible context matter for consideration. | Make it a declared preference, accommodation, or support condition. |
| **D21/D26 — Assessment & Interpretation** | Bring a possible assessment-relevant matter for consideration. | Make it a qualified observation, evidence, or interpretation. |
| **D33 — Incident** | Bring a possible operational matter for consideration. | Make it an operational observation or incident classification. |

The receiving authority determines admissibility, classification, and consequence under its own rules and its own recognition requirements. A communication that has been routed is not thereby classified, accepted, or acted upon, and routing to more than one authority creates no precedence between them. Where the applicable authority is unclear, the communication must be preserved and the matter escalated or failed closed; it must not be assigned to whichever authority is available or convenient.

## 13. AI, Provider, and Inference Boundary

D14 and D37 remain controlling. An AI or provider system may, within an authorised task, transcribe, summarise, translate, or propose a routing or interpretation of a learner communication. It acquires no authority over the learner's meaning.

An AI or provider output about what a learner meant is a proposal under D14, not an interpretation under D26, not evidence under D21, not a learner-state claim under D22/D27, and not a safeguarding determination under D53. Model confidence, output fluency, consistency with prior communications, provider trust, or repetition establish nothing. A misreading may harm the learner and a missed meaning may leave a matter unaddressed; both the uncertainty and the safe escalation path must remain explicit.

Technical capability to detect, classify, embed, cluster, or score a communication confers no authority to act on the result.

## 14. Lifecycle and Historical Protection

The lifecycle is:

> **expression → reception → admission where authorised → provenance and epistemic assignment → response, deferral, decline, or non-response → routing where applicable → consideration by the receiving authority → prospective effect where separately authorised → correction → historical recording**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Expression** | The learner conveyed something. | Not choice, consent, evidence, or state. |
| **Reception** | It reached the engine boundary. | Not admission, understanding, or obligation. |
| **Admission** | Authorised entry into the record for a stated purpose. | Not truth, sufficiency, authority, or consequence. |
| **Provenance / epistemic assignment** | Origin and status are made explicit under D46/D47. | Not interpretation, and not resolution of meaning. |
| **Response / deferral / decline** | A governed engine act in relation to the communication. | Not authorisation, and not a finding about the learner. |
| **Non-response** | No engine act occurred. | Not refusal, dismissal, resolution, or safety. |
| **Routing** | Directed to a possibly applicable authority. | Not classification or acceptance by that authority. |
| **Consideration** | The receiving authority applies its own rules. | Not automatic admissibility or consequence. |
| **Prospective effect** | Separately authorised change going forward. | Not retroactive effect and not learner choice. |
| **Correction** | Future record, use, or routing is corrected or restricted. | No historical erasure or retroactive reinterpretation. |

What a learner said, and when, is historical fact once admitted. A later interpretation, classification, correction, withdrawal, or determination operates prospectively and must never rewrite, delete, conceal, or retroactively relabel the original expression, its provenance, its epistemic status, the response given, or the absence of a response. A learner may contest an interpretation of their communication under D50; contest corrects forward and does not erase.

## 15. Conflict and Fail-Closed Rules

Communication conflicts may concern identity, capacity, meaning, purpose, authority, applicable decision, routing, confidentiality, data rights, provenance, uncertainty, provider or AI output, historical record, or the relationship between a communication and a prior choice, evidence, state, or determination. Conflict creates no meaning, no authority, and no permission.

No precedence may be inferred from communication volume, repetition, recency, insistence, emotional content, fluency, channel, authentication, session position, model confidence, provider trust, or operational convenience.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Who communicated, or in what capacity, is unclear | Preserve the expression; do not attribute, admit consequentially, or treat as choice or consent. |
| Meaning is ambiguous, unknown, or contested | Preserve the ambiguity under D47; do not resolve by default and do not act consequentially on a selected reading. |
| Purpose or authority for admission is unresolved | Do not admit for a consequential purpose; apply D19/D20/D34/D35. |
| Applicable authority or routing is ambiguous | Preserve the communication; escalate or fail closed. Do not assign to whichever authority is available. |
| Whether the act is D54 communication or D29 interaction is ambiguous | Treat each aspect under its own decision; neither may borrow the other's authority. |
| A recognised receiving or responding authority is unavailable | Fail closed for the affected consequential action; preserve the matter as unresolved. |
| A response would change learner choice, state, evidence, or history | Apply D1/D22/D27/D30/D46; no silent mutation. |
| Safeguarding significance is possible but unestablished | Route under D53 without classifying; D53's own authority and fail-closed rules apply. |

Fail-closed behaviour must not invent meaning, intent, choice, consent, evidence, learner state, preference, authority, resolution, refusal, or historical absence. A communication that cannot be safely acted upon must remain a preserved, unresolved communication — not a discarded one, and not a decided one.

## 16. Relationship to D1–D53

D54 is subordinate to every locked decision and creates no exception. It consumes existing authorities and creates none. A learner-initiated communication may be the first event in a sequence that later engages other decisions, but it confers nothing on any of them.

| Decision family | D54 dependency and constraint |
|---|---|
| **D1–D8** | Communication cannot create learner choice, curriculum, content, knowledge-relationship, experience, assessment, or evidence authority. |
| **D9–D13** | Decisioning, policy, history, versioning, equivalence, and migration rules remain controlling for anything a communication touches. |
| **D14–D18** | AI, delegation, governance action, interpretation, and conflict authority cannot be created by a communication or by responding to one. |
| **D19–D20** | Reception and admission do not override consent, privacy, representation, or data-subject rights. |
| **D21–D22** | A communication is not a qualified assessment observation, a conclusion, or a state commitment. |
| **D23–D25** | Continuity, delegated choice, and policy relationships remain distinct; a communication does not resume, interrupt, or change a path. |
| **D26–D30** | Interpretation, state, adaptation, delivery, commands, events, and effects each require their own authority. |
| **D31–D32** | Conformance and release cannot establish that a communication was correctly understood or handled. |
| **D33–D34** | Operational observation, incident classification, and data lifecycle govern their own matters; routing creates neither. |
| **D35–D37** | Identity, context, provider, and exchange boundaries apply; no technical actor becomes a communication authority. |
| **D38–D39** | Constitutional integrity and implementation scope bind all handling of communication. |
| **D40–D42** | Responding to a mathematical question creates no mathematical authority, source status, or validity claim. |
| **D43–D45** | Outcome claims, learner context, linkage, and merge cannot be established by what a learner said. |
| **D46–D47** | Provenance and epistemic status are required for admitted communication; expression is separated from meaning. |
| **D48** | Consequence and risk determine the review path; volume, insistence, or urgency create no authority. |
| **D49** | Recognised human review, competence, independence, and escalation remain required where engaged. |
| **D50** | A communication is not automatically a contest, and a contest is not merely a communication. |
| **D51** | Communication counts, patterns, and sentiment are measurements only; activity is not understanding, satisfaction, need, or state. |
| **D52** | Communication must not produce unequal treatment, exclusion, or stereotyping; D54 creates no fairness determination. |
| **D53** | A learner report may reach a safeguarding path without the communication itself becoming a concern, determination, protective action, or incident. D53's authority and fail-closed rules remain controlling. |

### 16.1 Standing limitations carried forward

**L1 — D1–D19 source-verification limitation.** D1–D19 are locked and authoritative, but no standalone specification text for them is available in this repository or in the recovery source. D54 does not repair this gap, does not infer, reconstruct, summarise, or substitute the missing decisions, and does not reinterpret them. This limitation is material to D54, which depends substantially on D1's `select-offer` semantics; those semantics are relied upon here exactly as they are cited across D20–D53 and are not restated, extended, or interpreted. The limitation is recorded as a standing governance-record and register-integrity limitation within the already-approved D38 boundary. It is a limitation on the record, not permission to reinterpret those decisions. D54 does not modify D38.

**L2 — recognised authority not yet instantiated.** D54 names no communication, receiving, responding, routing, or reviewing actor, and recognition of actors is governed by the already-approved D15/D16/D49 framework, which D54 does not modify. D54 is therefore necessary but not sufficient for operation: until the required authority and recognition exist under that framework, any consequential admission, response, routing, or escalation path remains **fail closed** under §15. Fail-closed behaviour is the intended and correct outcome of that condition, and must not be treated as a defect to be bypassed, nor resolved by nominating any actor, threshold, taxonomy, or recognition mechanism within D54.

## 17. Prohibited Behaviours

17.1. Treating a learner-initiated communication as a `select-offer`, selection, acceptance, decline, commitment, authorised path change, consent, or consent withdrawal.

17.2. Treating a learner expression about their own understanding, difficulty, confidence, capability, or circumstances as qualified evidence, interpretation, mastery, readiness, progression, misconception, competence, deficiency, incapacity, or authoritative learner state.

17.3. Treating a momentary request, question, or complaint as a durable declared preference, accommodation, support need, protected characteristic, or learner-context condition.

17.4. Treating reception as admission, admission as truth, admission as sufficiency, or admission as authority to act.

17.5. Treating a response as authorisation of its content, as authority over the subject it addresses, or as a determination about the learner.

17.6. Treating routing as classification, admissibility, acceptance, or a decision by the receiving authority; or assigning a communication to whichever authority is available, convenient, or already engaged.

17.7. Treating non-response, deferral, decline, elapsed time, learner silence, continued activity, session end, or account inactivity as refusal, dismissal, denial, resolution, withdrawal, satisfaction, agreement, safety, or any finding about the learner.

17.8. Resolving ambiguous meaning by default, frequency, recency, insistence, emotional content, fluency, channel, authentication, model confidence, provider trust, or operational convenience.

17.9. Allowing an AI system, provider, client, operator, workflow, or technical component to self-determine the meaning of a learner communication, or to acquire interpretive, evidential, safeguarding, or state authority from it.

17.10. Using a communication to bypass D1 learner choice, D19/D20 data rights, D22/D27 state authority, D30 execution controls, D44 context authority, D50 contest authority, or D53 safeguarding authority.

17.11. Penalising, restricting, labelling, disbelieving, disadvantaging, or reducing the opportunity of a learner because of what they communicated, how often, how fluently, or whether they communicated at all.

17.12. Rewriting, deleting, concealing, or retroactively relabelling an admitted communication, its provenance, its epistemic status, a response given, or the absence of a response, after a later interpretation, classification, correction, or determination.

17.13. Implementing communication channels, interfaces, parsing, intent classification, routing engines, response generation, persistence, AI, assessment, UI/API, delivery controls, or any other functionality from D54.

## 18. Explicit Deferrals

D54 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Channels, interfaces, chat surfaces, clients, transports, devices, accessibility technology, and rendering | D29 governs delivery and interaction semantics; technology remains outside all governance decisions. |
| Natural-language processing, parsing, embeddings, intent classification, response generation, and any interpretive model | D54 defines authority semantics, not interpretive method or technology. |
| Request, intent, or communication taxonomies, categories, thresholds, priorities, and routing criteria | These are purpose- and domain-specific and require separate governance. |
| Who may receive, admit, answer, defer, decline, route, or review a communication | D15/D16/D49 require explicit recognition; D54 names none. |
| Response obligations, service levels, timeliness, availability, and coverage expectations | These require explicit institutional or operational governance. |
| Exact admission criteria, retention, disclosure, confidentiality, and data-handling operations | D19/D20/D34/D35/D36/D45/D50 apply; specific operations remain deferred. |
| Legal, clinical, regulatory, or jurisdictional standards concerning learner communication | These require explicit external authority. |
| Assessment, mathematics, content, curriculum, policy, AI, learner state, adaptation, delivery, provider, safeguarding, fairness, and implementation authority | D1–D53 remain controlling; communication creates none. |
| Slice 6 scope and implementation authorisation | D54 is a governance boundary, not implementation approval. |

## 19. Required Contract Changes, if Any

**No contract changes are required or authorised by D54 at this stage.**

If D54 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for expression, communication, originator, capacity, reception, admission, purpose, scope, provenance, epistemic status, ambiguity, response, deferral, decline, non-response, routing, receiving authority, consideration, conflict, correction, effective period, and historical applicability.

Future contracts must not encode a communication as a choice, an expression as evidence, reception as admission, admission as truth, a response as authorisation, routing as classification, or non-response as refusal. They must preserve the source/derived, expressed/interpreted, received/admitted, proposed/authoritative, current/historical, and unresolved/decided distinctions, and fail closed when originator, capacity, meaning, purpose, authority, or routing is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, communication, routing, AI, or repository changes.

## 20. Implementation Freeze

> **No implementation may begin on the basis of D54.**
>
> D54 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, communication channel, chat surface, client, transport, parser, intent classifier, natural-language model, embedding, routing engine, response generator, safeguarding detector, vulnerability classifier, referral workflow, protection-action system, reviewer-recognition system, approval workflow, escalation system, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D55, or Slice 6 work. Any future implementation requires explicit human approval of D54 and a separate controlled implementation authorisation for an exact scope.

## 21. Approval Recommendation

D54 is presented for human architectural review as the learner-initiated communication, request, and expression boundary required after the complete D1–D53 chain. It protects the distinction between expression, reception, admission, meaning, choice, consent, evidence, interpretation, state, context, response, routing, classification, non-response, and historical truth.

> **D54 — PROPOSED / HUMAN REVIEW ONLY**

No repository change beyond the creation of this proposed specification is authorised. No code, contract, schema, migration, persistence, governance tooling, communication channel, parser, intent classifier, routing engine, response generator, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D55, or Slice 6 work has occurred. D1–D53 are preserved exactly as approved and locked, the D1–D19 register-integrity limitation is carried forward unrepaired, and no actor, threshold, taxonomy, duty, jurisdiction, legal rule, clinical rule, or operational procedure has been introduced. After preparation, stop and await human architectural review and approval.
