# D55 — Learner Override, Revocation & Ratification of Delegated Choice Authority

> **D55 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D54 are preserved exactly as approved and locked. D55 authorises no code, contract, repository, schema, migration, persistence, database, governance tooling, workflow, event handler, command handler, policy runtime, verification system, communication channel, chat surface, parser, intent classifier, natural-language model, routing engine, reviewer-recognition system, approval workflow, escalation system, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D56, or Slice 6 work.

## 1. Post-D54 Dependency Analysis

D54 establishes the authority boundary for learner-initiated communication, request and expression: what a learner-originated communication is, what it may and may not become, and what authority receiving, admitting, answering or routing it does and does not confer. It routes communications that carry significance for another authority to that authority without classifying them.

The chain now carries a learner's objection to a delegated choice further than it once could, and then stops at a boundary no decision governs.

| Stage | Governed by | Status |
|---|---|---|
| The learner says they did not want the path | D54 | Governed; §6 bars the communication from becoming a choice |
| The learner contests the decision or state commitment | D50 §7 | Governed; a contest is recorded with basis and requested remedy |
| A response upholds, rejects, clarifies, corrects prospectively, restricts future use, supersedes, escalates, or defers | D50 §7 | Governed |
| The delegated choice itself is overridden, revoked, or ratified | **Nothing** | **Unresolved** — D50 §7 states a contest “cannot automatically accept, decline, pause, or change an offer under D1” |

D24 identifies this gap in its own text, twice. §7 states that “whether a learner may revoke or override a representative choice” is “explicitly deferred to later governance where the current constitution does not safely determine the answer.” §16 states: “Whether a learner may override, revoke, or ratify a representative choice and the consequences | This requires a separate authority decision where D1–D24 do not determine the answer.” D27 and D28 subsequently defer the same matter back to D24 on the basis that “D24 remains controlling” — producing a circular deferral that three locked decisions participate in and none resolves.

The single highest-priority unresolved governance boundary is therefore **Learner Override, Revocation & Ratification of Delegated Choice Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D24 — Representation & Delegated Choice** | Recognition, scope, lifecycle, suspension, expiry, supersession and revocation of the representation; the conditions under which a representative action may authorise a commitment; historical protection of representative actions. | Whether a learner may override, revoke, or ratify a choice already made under that representation — expressly deferred. |
| **D1 — Learner Choice** | Only an explicit `select-offer` may authorise commitment to an offered learning path. | Whether any learner-side act may alter a commitment that a representative validly authorised. |
| **D50 — Transparency & Contestability** | Whether and how a learner may contest a decision or state commitment, and what a response to a contest may do. | The effect on the delegated choice: D50 expressly cannot “change an offer under D1”, and defers remedies. |
| **D54 — Learner-Initiated Communication** | The learner may communicate; the communication is not a choice, consent, evidence, or state. | The constitutional effect, if any, of an authorised learner act on the delegated choice. |
| **D27/D28 — State & Adaptation** | State semantics, transitions, and adaptation authority. | Both defer override and ratification rules back to D24, which does not determine them. |
| **D30 — Execution & Historical Effect** | Corrections, revocation, supersession and compensating actions are additive and prospective. | What may prospectively reach a standing delegated commitment, and under whose authority. |

This is the next priority because a delegated choice, once validly made, continues to operate by default. Every wrong answer is already barred — a communication cannot become a choice, a preference cannot become authority, a contest cannot be an automatic reversal, state drift cannot re-authorise, event ordering cannot confer authority, and correction cannot erase history — but no right answer exists. The learner is heard, recorded, and answered, and the choice stands, because continuation is what happens when nothing governs cessation.

D55 does not define representatives, reviewers, institutions, competencies, duties, jurisdictions, age or capacity rules, thresholds, remedies, procedures, or any mechanism. It defines the authority boundary for the effect of a learner-side act on a delegated choice.

## 2. Purpose

D55 defines the authority semantics for learner-side override, revocation and ratification of a choice previously made on the learner's behalf under D24, and for the constitutional consequences that may and may not follow.

> **Revoking the representation is not revoking the choice. Override is not deletion. Revocation is not historical invalidation. Ratification is not retroactive authorship. Disagreeing now does not mean it was unauthorised then. Continuation is not authorisation.**

D55 ensures that a delegated choice cannot be silently unmade, silently confirmed, or silently perpetuated — and that where the constitution does not establish that a learner act carries the authority to alter it, that authority is not acquired by default, by inference, or by the passage of events.

## 3. Scope

D55 governs the constitutional effect of a learner-side act upon a delegated choice validly made under D24, and the relationship of that effect to learner choice, consent, state, evidence, adaptation, delivery, execution, provenance and historical truth. It covers override, revocation, ratification, their limits, the treatment of commitments already made, conflict, fail-closed behaviour, and prospective correction.

| Within D55 | Outside D55 |
|---|---|
| Whether, and with what authority, a learner-side act may override, revoke, or ratify a delegated choice | Whether and how a learner may contest, challenge, request explanation, or request a remedy — D50 remains controlling |
| The constitutional consequences of such an act for the delegated choice's forward operation | Recognition, scope, lifecycle, suspension, expiry, supersession or revocation of the representation itself — D24 remains controlling |
| Non-collapse between override, revocation, ratification, contest, communication, preference and choice | Any representative, reviewer, institution, competency, duty, jurisdiction, age or capacity rule, threshold, remedy or procedure |
| Historical protection, provenance, epistemic treatment and fail-closed rules for such acts | Interfaces, channels, workflows, data structures, protocols, schemas, persistence, AI, assessment, or any implementation |

D55 creates no learner-choice authority, no representation authority, no contest authority, no state authority, no remedy, no actor, and no legal or institutional standard. It does not decide whether any particular class of choice must be exclusively learner-controlled; D24 expressly declines that question and D55 does not answer it either.

## 4. Delegated-Choice Model

A **delegated choice** is a choice authorised under D24 by a recognised representative acting within scope on a learner's behalf. Its record states, per D24, *representative action on behalf of learner* and never that the learner personally selected. It carries forward operation: it governs what the learner is subsequently offered, resumed, or committed to, until something with authority changes that.

The **standing effect** of a delegated choice is its continuing forward operation. It is distinct from the historical fact that the choice was made, which is permanent, and from any state, evidence or commitment produced under it, each of which retains its own authority.

A **learner-side act** is an act by the learner directed at a delegated choice. D55 recognises three, and no others:

**Override** — a learner-side act that, where separately authorised, prospectively displaces the forward operation of a delegated choice in favour of a different outcome. It is not deletion, correction of the record, or a finding that the delegated choice was unauthorised.

**Revocation** — a learner-side act that, where separately authorised, prospectively withdraws the forward operation of a delegated choice without substituting another. It is not historical invalidation and does not undo what was done under the choice while it operated.

**Ratification** — a learner-side act by which the learner establishes their own forward authorisation for the path a delegated choice set. It is not retroactive authorship: it never converts the representative's historical act into a learner act, and never permits the record to be relabelled as *learner personally selected*.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Delegated choice** | A choice authorised by a representative within recognised scope. | That the learner preferred, understood, consented to, or performed it. |
| **Standing effect** | The choice's continuing forward operation. | Its correctness, the learner's agreement, or its permanence. |
| **Override** | Prospective displacement in favour of a different outcome. | Deletion, erasure, or a finding of prior invalidity. |
| **Revocation** | Prospective withdrawal of forward operation. | Historical invalidation, or undoing effects already produced. |
| **Ratification** | The learner's own forward authorisation of the same path. | Retroactive authorship, or relabelling the historical record. |
| **Learner-side act** | An act by the learner directed at a delegated choice. | Authority to alter it, absent separate establishment of that authority. |

### 4.1 Boundary with D24's representation lifecycle

D24 governs the representation — its recognition, scope, suspension, expiry, supersession and revocation — and governs the representative's own permission, where recognised, to withdraw or change a representative action. D55 governs none of that and reinterprets none of it.

**Revoking the representation does not, by itself, determine the fate of a delegated choice already made under that representation.** D24 states that revocation means “no future reliance; past actions are not silently invalidated,” and that a revoked representation must not be used for a *new* choice, resumption, offer acceptance, migration, substitution or state commitment. That stops the representative acting again; it does not reach a choice already made, and D55 must not treat it as if it did.

A representative's withdrawal or change of their own action under D24 is a representative-side act. It is not a learner override, revocation or ratification, and confers none. D55 does not amend, reinterpret, extend or narrow D24, and states no priority between them.

### 4.2 Boundary with D50's contestability

D50 governs whether and how a learner may contest, what a contest is, what it must record, and what a response to a contest may do — uphold, reject, clarify, correct prospectively, restrict future use, supersede, escalate or defer. D50 remains controlling over all of it, and **D55 is not a contest system.**

D55 begins only where D50 stops. D50 states that a contest “cannot automatically accept, decline, pause, or change an offer under D1” and defers remedies. The unresolved question — what constitutional effect, if any, an authorised learner act may have on the delegated choice — is D55's only subject.

Contesting is not overriding. Requesting a remedy is not obtaining one. A contest that has been recorded, upheld, escalated or responded to still effects nothing on the delegated choice unless a learner-side act with established authority does so under D55. Equally, D55 creates no route around D50: a learner-side act is not a substitute for contest and does not displace D50's requirements where they apply.

## 5. Required Non-Collapse Separations

The separations below are constitutive of D55. Each is already carried by a locked decision; D55 consumes them and adds none beyond what the corpus requires to prevent authority collapse.

| Distinction | Permitted meaning | Prohibited inference |
|---|---|---|
| **Representation ≠ delegated choice** | A standing authority to act, and a specific act performed under it. | That ending one ends the other. |
| **Revocation of representation ≠ revocation of delegated choice** | D24 withdraws future reliance on the representative. | That the choice already made is thereby withdrawn, void, or unauthorised. |
| **Override ≠ revocation** | Displacement in favour of a different outcome, and withdrawal without substitution. | That either implies the other, or that one may be recorded as the other. |
| **Ratification ≠ original authorisation** | The learner's own forward authorisation. | Retroactive authorship, or that the representative's act becomes the learner's. |
| **Communication ≠ choice** | The learner expressed something about the delegated choice. | Override, revocation, ratification, consent, or any D1 choice. |
| **Contest ≠ automatic reversal** | A recorded challenge under D50. | That the delegated choice is displaced, withdrawn, or shown to be wrong. |
| **Preference ≠ authority** | The learner would prefer a different path. | Authority to alter a validly authorised commitment. |
| **State ≠ choice** | What is authoritatively held about the learner. | That state change alters, or is altered by, the delegated choice. |
| **Correction ≠ historical erasure** | Future record, use or operation is corrected. | Removal, concealment or relabelling of what occurred. |
| **Effect ≠ authorisation** | Something changed going forward. | That the change was authorised, or that its occurrence authorises it. |
| **Execution ≠ authority** | An operation was carried out. | That the operation was permitted, or that success confers permission. |
| **Historical truth ≠ desired present state** | What happened, and what the learner now wants. | That present disagreement makes the past action unauthorised. |

These are semantic boundaries, not lifecycle stages, and they do not constitute a mandatory operational sequence. Each states only what one thing may not become; none requires that anything happen, in any order, or at all.

## 6. Authority to Act on a Delegated Choice

D55 establishes no authority. It establishes that authority is required, and that it must be separately established.

D55's subject is the constitutional effect of a learner-side act upon a delegated choice. It is not the creation of authority for the learner to act, and not a regime for recognising anyone.

Two cases must be kept apart, and D24 already separates them. D24's concept table states that a **governance actor** is “an actor recognised under D15–D16 to perform a defined governance action”, and that such recognition is expressly *not* “learner representation or the right to select an offer.”

**A learner acting on their own behalf.** D55 imposes no recognition requirement on a learner acting personally, and adds no precondition to a learner's own act. Whether a learner personally holds authority in respect of a delegated choice is determined by the locked chain, which D55 neither supplies, extends, conditions, nor withholds. Where the locked chain establishes that a learner-side act carries such authority, D55 governs the effect that follows and confines it as set out in §7, §8 and §9. Where the locked chain does not establish it, no effect follows — but that is an absence in the existing chain, not a requirement imposed by D55, and it must never be described as the learner failing to be recognised.

**A representative or other governance actor.** Where an act in respect of a delegated choice is performed by a representative or another recognised governance actor rather than by the learner personally, its authority remains separately established under the existing constitution — recognition under D15–D16, scope and conditions under D24, effective policy under D11 — exactly as those decisions already require. D55 changes none of that, and **transfers none of those conditions to the learner by analogy.**

**D55 names no authority and recognises no actor in either case.**

Where no authority for the act is established, the learner-side act is preserved as an expressed position and effects nothing on the delegated choice. This is not a dismissal of the learner, a finding about the learner, a statement about the learner's standing, or a determination that the delegated choice was correct. It is the absence of an establishable authority, and it fails closed under §15.

Authority over a delegated choice is not created by the learner's wording, apparent intent, preference, confidence, persistence, repetition, participation, silence, session activity, event ordering, operational convenience, technical capability, successful execution, representative status, AI or provider assistance, or completion of any workflow. None of these establishes authority, and their accumulation does not either.

## 7. Override

An override, where separately authorised, prospectively displaces the forward operation of a delegated choice in favour of a different outcome. Its effect is confined to forward operation.

An override does not delete the delegated choice, remove it from the record, relabel it, or establish that it was unauthorised, mistaken, harmful, or made in bad faith. It does not invalidate anything done while the choice operated, and it does not reach state, evidence, conclusions or history, each of which retains its own authority under D22, D27, D8, D21, D12 and D46.

An override does not itself constitute a new choice. Where the different outcome requires a commitment, that commitment requires its own authorisation under D1 — an explicit `select-offer` by the learner, or a further delegated choice validly authorised under D24. An override that would otherwise substitute an outcome without such authorisation effects nothing and fails closed.

## 8. Revocation

A revocation, where separately authorised, prospectively withdraws the forward operation of a delegated choice without substituting another. Its effect is confined to forward operation.

A revocation is not historical invalidation. It must never rewrite, delete, conceal or retroactively relabel the delegated choice, its provenance, its authorising representation, or anything done under it. D24's historical protections and D30's additive-and-prospective rule remain controlling and are not modified by D55.

Revocation of a delegated choice is a distinct act from revocation of the representation. Neither implies, triggers, or substitutes for the other, and neither may be recorded as the other. A revoked delegated choice does not revoke the representation; a revoked representation does not revoke the delegated choice.

Revocation leaves the learner without a commitment for the path in question. It does not create an obligation to offer an alternative, a determination that an alternative is required, or an inference that the learner declined, failed, disengaged or withdrew. What follows requires its own authority.

## 9. Ratification

Ratification is treated with deliberate restraint, because the acts most likely to be mistaken for it carry no authority at all.

**D55 creates no ratification mechanism.** A learner's own forward authorisation of a path is a learner choice, and D1 already governs it: an explicit `select-offer` by the learner authorises commitment, and nothing in D55 extends, narrows or substitutes for that rule. Where a learner personally makes the choice, D1 applies and D55 adds nothing. Where D1's requirements are not met, no ratification occurs and the matter fails closed.

What D55 does establish is what ratification may never be. Ratification never converts a representative's historical act into a learner act, never permits a record to be relabelled from *representative action on behalf of learner* to *learner personally selected*, and never retroactively supplies authorisation that was absent when the act occurred.

None of the following constitutes ratification, individually or in combination: silence; continued participation; continued session activity; receipt of a communication; acknowledgement of an engine action; expressed preference; withdrawal or non-pursuit of a contest; elapsed time; absence of objection; a representative's assertion that the learner agrees; an inference drawn from behaviour; or an AI or provider output to that effect.

## 10. Effect on Existing Commitments, State, and Evidence

A delegated choice may have produced commitments, state, evidence, interpretations, experiences and historical events. Each was produced under its own authority and retains it.

An override or revocation reaches the forward operation of the delegated choice and nothing else. It does not alter, withdraw, invalidate or re-open a state commitment under D22 or D27, evidence under D8 or D21, an interpretation under D26, an outcome claim under D43, an adaptation under D28, a delivery effect under D29, or an executed event under D30. Any change to those requires the authority that governs them.

Conversely, nothing in those domains alters a delegated choice. A state transition, an assessment result, an adaptation, a delivery outcome, an analytic finding under D51, or a fairness or safeguarding matter under D52 or D53 does not override, revoke or ratify a delegated choice, and must not be treated as doing so.

Where a consequential operation would rely on a delegated choice whose forward operation is disputed and whose disposition is unresolved, that operation must not proceed on the basis of the disputed choice without current re-evaluation of authority and context, consistent with D30. Continuation is not authorisation, and the absence of a determination is not a determination.

## 11. Historical Truth and Prospective Effect

That a delegated choice was made, by whom, under what representation, within what scope, and when, is historical fact. It remains so regardless of any later override, revocation, ratification, contest, correction or determination.

All effects under D55 are prospective and additive. An override, revocation or ratification is recorded as a distinct, attributable, provenance-linked act with its own time, scope, basis and authority. It never modifies the record of the delegated choice, the representation that authorised it, or anything done under it. A later disagreement, however well founded, never makes a past authorised action unauthorised; where a past action was in fact unauthorised, that is a separate determination under the authority that governs it, and not a consequence of the learner's present position.

Where a delegated choice is overridden or revoked, the historical record must remain capable of showing what operated, when, and until when. Erasure, concealment, retroactive relabelling, and silent substitution are prohibited.

## 12. Provenance, Epistemic Status, and Uncertainty

D46 and D47 remain controlling. A learner-side act, where admitted, carries provenance — who acted, when, in what capacity, under what claimed authority, through what path — and an epistemic status.

That an act occurred may be well established while whether it carried authority remains unknown, ambiguous, uncertain or contested. These are separate statuses and must not be merged: certainty that a learner acted is never certainty that the act had constitutional effect. Ambiguity about authority must be preserved rather than resolved by default, recency, insistence, model output or operational need, and unknown authority must not be treated as authority absent, as authority present, or as learner deficiency.

## 13. AI, Provider, and Inference Boundary

D14 and D37 remain controlling. An AI or provider system may, within an authorised task, transcribe, summarise, translate, or propose a reading of a learner-side act. It acquires no authority over whether that act overrides, revokes or ratifies anything.

An AI or provider output asserting that a learner intended to override, has revoked, or has ratified is a proposal under D14. It is not a determination, not evidence under D21, not a learner-state claim under D22 or D27, and not authority under D55. Model confidence, fluency, consistency with prior behaviour, provider trust and repetition establish nothing. Technical capability to detect, classify or score an apparent intention confers no authority to act on it.

## 14. Lifecycle

The lifecycle is:

> **learner-side act → recording with provenance → establishment of authority, where it exists → override, revocation, or ratification where authorised → prospective effect on forward operation only → correction → historical recording**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Learner-side act** | The learner acts in relation to a delegated choice. | Not authority, and not effect. |
| **Recording** | The act and its provenance are preserved. | Storage is not authority, acceptance, or effect. |
| **Authority establishment** | Whether the act carries authority is determined under the existing constitution. | Not a finding about the learner, and not automatic. |
| **Override / revocation / ratification** | The authorised act takes its defined form. | Not deletion, not invalidation, not retroactive authorship. |
| **Prospective effect** | Forward operation of the delegated choice changes. | Not a change to state, evidence, history, or anything done under the choice. |
| **Correction** | Future record, use or operation is corrected or restricted. | No historical erasure or retroactive relabelling. |
| **Historical recording** | The act and its effect are retained as history. | Not proof that the delegated choice was wrong or unauthorised. |

These stages are distinct semantic categories, not a mandatory sequence. An act may be recorded and never carry authority, carry authority and never be exercised, or be exercised without reaching anything beyond forward operation. No stage implies any other.

## 15. Conflict and Fail-Closed Rules

Conflicts may concern who acted, in what capacity, whether authority is established, which delegated choice is at issue, whether the act is an override, a revocation or neither, the relationship to an open contest under D50, the scope of the representation under D24, provenance, uncertainty, AI or provider output, or the historical record. Conflict creates no authority and no effect.

No precedence may be inferred from wording, apparent intent, preference, confidence, persistence, repeated requests, participation, silence, event ordering, operational convenience, technical capability, successful execution, representative status, AI assistance, or workflow completion.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Who acted, or in what capacity, is unclear | Preserve the act; do not attribute it, and do not treat it as carrying authority. |
| Whether the act carries authority cannot be established | No override, revocation or ratification occurs; preserve as an expressed position. |
| Which delegated choice, or which part of its scope, is at issue | Do not select a reading; escalate or fail closed for the affected operation. |
| The act's form is ambiguous between override and revocation | Do not record it as either; preserve the ambiguity under D47. |
| A contest under D50 is open and unresolved | D50 remains controlling; D55 effects nothing pending its own authority. |
| The representation's scope or status is unclear | Apply D24; do not infer that representation status determines the choice's fate. |
| An override would substitute an outcome lacking its own authorisation | No substitution; the outcome requires D1 or a valid D24 delegation. |
| A consequential operation would rely on a disputed delegated choice | Do not proceed on that basis without current re-evaluation under D30. |
| An AI or provider asserts an intention to override, revoke or ratify | Treat as a proposal under D14; no automatic effect. |

Fail-closed behaviour must not invent authority, intent, choice, consent, ratification, revocation, learner state, preference, refusal, agreement, or historical absence. It must not resolve the matter by allowing the delegated choice to continue as though undisputed, nor by treating it as ended. An unresolved matter remains an unresolved matter.

## 16. Relationship to D1–D54

D55 is subordinate to every locked decision and creates no exception. It consumes existing authorities and creates none.

| Decision family | D55 dependency and constraint |
|---|---|
| **D1–D8** | D55 creates no learner-choice, curriculum, content, relationship, experience, assessment or evidence authority. Only D1 authorises commitment; an override never substitutes for `select-offer`. |
| **D9–D13** | Decisioning, policy, durable history, versioning and migration rules remain controlling for anything D55 touches. |
| **D14–D18** | AI, delegation, governance action, interpretation and conflict authority cannot be created by a learner-side act or by responding to one. |
| **D19–D20** | Recording and acting on a learner-side act do not override consent, privacy, representation or data-subject rights. |
| **D21–D22** | A learner-side act is not evidence, a conclusion, or a state commitment, and does not alter one. |
| **D23** | Continuity, interruption and resumption remain distinct; revocation does not resume, interrupt or migrate anything. |
| **D24** | Origin of the boundary. Representation lifecycle, recognition, scope and historical protections are unchanged. Revoking the representation does not revoke the choice. |
| **D25–D30** | Policy compatibility, interpretation, state, adaptation, delivery, commands, events and effects each require their own authority; D55 reaches forward operation only. |
| **D31–D32** | Conformance and release cannot establish that a learner-side act carried authority. |
| **D33–D34** | Incident response and data lifecycle govern their own matters; neither is engaged by D55. |
| **D35–D37** | Identity, tenancy, provider and exchange boundaries apply; no technical actor becomes an authority over a delegated choice. |
| **D38** | Constitutional integrity, versioning and register discipline bind D55. D55 amends nothing and repairs nothing. |
| **D39** | Implementation authorisation is separate and is not granted here. |
| **D40–D45** | Mathematical, formal, source, outcome, context and linkage authorities cannot be established or altered by a learner-side act. |
| **D44** | A preference is not authority; an override is not a preference; neither becomes the other. |
| **D46–D47** | Provenance and epistemic status are required; certainty that an act occurred is not certainty that it carried authority. |
| **D48–D49** | Consequence and risk determine the review path; recognised human review remains required where engaged. Urgency creates no authority. |
| **D50** | Contest, challenge, explanation, requested remedy, review, escalation and response remain wholly D50's. D55 is not a contest system and begins only at the effect boundary D50 expressly does not cross. |
| **D51–D52** | Metrics and fairness findings are not learner-side acts and do not override, revoke or ratify anything. |
| **D53** | Safeguarding remains controlling; a protective action is not an override, and an override is not a protective action. A safeguarding concern about a representative does not itself revoke a delegated choice. |
| **D54** | Provides the channel; §6 bars a communication from becoming a choice. A communication is not a learner-side act under D55 unless it independently carries the authority §6 of this decision requires. |

### 16.1 Standing limitations carried forward

**L1 — D1–D19 source-verification limitation.** D1–D19 are locked and authoritative, but no standalone specification text for them is available in this repository or in the recovery source. D55 does not repair this gap, does not infer, reconstruct, summarise or substitute the missing decisions, and does not reinterpret them or manufacture authority from their titles. The limitation is material to D55, which depends directly on **D1**'s `select-offer` semantics — what a commitment is, and therefore what could constitutionally alter one — and on **D19** for consent. Those semantics are relied upon here exactly as they are cited across D20–D54 and are not restated, extended or interpreted. The limitation is recorded as a standing governance-record and register-integrity limitation within the already-approved D38 boundary. It is a limitation on the record, not permission to reinterpret those decisions. **D38 remains the authority for the register-integrity matter, and D55 does not modify D38.**

**L2 — recognised authority not yet instantiated.** D55 names no representative, reviewer, officer, clinician, legal actor, institutional authority, competency, duty, jurisdiction, statutory threshold, age or capacity rule, or operational procedure. Recognition of governance actors is governed by the already-approved D15/D16/D49 framework, which D55 does not modify. That framework applies to representatives, reviewers and other governance actors; it is not, and must not be read as, a precondition on a learner acting on their own behalf, which D55 does not impose.

D55 is therefore constitutionally defined but **operationally inert wherever a recognised actor is in fact required**: until the required authority and recognition exist for those acts that need them, and where the locked chain does not otherwise establish that a learner-side act carries authority, every override, revocation and consequential path remains **fail closed** under §15. Fail-closed behaviour is the intended and correct outcome of that condition and must not be treated as a defect to be bypassed, nor resolved by nominating any actor, threshold, remedy or mechanism within D55.

## 17. Prohibited Behaviours

17.1. Treating revocation, suspension, expiry or supersession of a representation as revoking, overriding or invalidating a delegated choice already made under it.

17.2. Treating a learner communication, complaint, contest, requested remedy, expressed preference, silence, participation, receipt, acknowledgement, or elapsed time as an override, revocation or ratification.

17.3. Treating a contest under D50 as an automatic reversal, or treating D55 as a route around D50's contest requirements.

17.4. Treating an override as deletion, erasure, relabelling, or a finding that the delegated choice was unauthorised, mistaken or harmful.

17.5. Treating a revocation as historical invalidation, or as undoing state, evidence, interpretations, outcomes, deliveries or events produced while the choice operated.

17.6. Treating ratification as retroactive authorship, or relabelling a record from *representative action on behalf of learner* to *learner personally selected*.

17.7. Treating a representative's assertion, a behavioural inference, an AI or provider output, or a workflow completion as establishing that a learner overrode, revoked or ratified anything.

17.8. Substituting an outcome by override without that outcome's own authorisation under D1 or a valid D24 delegation.

17.9. Inferring authority over a delegated choice from wording, intent, preference, confidence, persistence, repetition, participation, silence, event ordering, operational convenience, technical capability, successful execution, or representative status.

17.10. Allowing a delegated choice to continue supporting a consequential operation while its disposition is disputed and unresolved, without current re-evaluation of authority and context.

17.11. Resolving an unresolved learner-side act by treating the delegated choice as either confirmed or ended.

17.12. Using D55 to bypass D1 learner choice, D19/D20 data rights, D22/D27 state authority, D24 representation limits, D30 execution controls, D50 contest authority, or D53 safeguarding authority.

17.13. Implementing override, revocation or ratification mechanisms, workflows, interfaces, persistence, AI, assessment, analytics, or any other functionality from D55.

## 18. Explicit Deferrals

D55 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Whether, and in what circumstances, a learner personally holds authority in respect of a delegated choice | Determined by the locked chain; D55 governs the effect only and imposes no recognition requirement on a learner acting on their own behalf. |
| Who, other than the learner, may exercise, review, approve or refuse an act in respect of a delegated choice, and with what competence | D15/D16/D49 require explicit recognition of governance actors; D55 names none. |
| Legal capacity, age thresholds, guardianship, statutory representation and jurisdiction | D24 already refuses these; D55 must not create legal authority by architectural assertion. |
| Whether any class of choice must be exclusively learner-controlled, or may never be overridden | D24 expressly declines this and D55 does not answer it. |
| Remedies, restitution, appeals, escalation procedures, and service expectations | D48/D49/D50 require explicit recognition; these remain deferred. |
| Exact criteria, thresholds, forms, evidence or timing for establishing that an act carries authority | These are purpose- and domain-specific and require separate governance. |
| Whether an override obliges the offering of an alternative path | Requires its own authority; D55 creates no obligation. |
| Interfaces, channels, workflows, data structures, protocols, persistence and tooling | D55 defines authority semantics, not mechanism. |
| Assessment, mathematics, content, curriculum, policy, AI, learner state, adaptation, delivery, provider, safeguarding, fairness and implementation authority | D1–D54 remain controlling; D55 creates none. |
| Slice 6 scope and implementation authorisation | D55 is a governance boundary, not implementation approval. |

## 19. Required Contract Changes, if Any

**No contract changes are required or authorised by D55 at this stage.**

If D55 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for delegated choice, standing effect, learner-side act, act form, claimed authority, established authority, override, revocation, ratification, scope, provenance, epistemic status, dispute status, prospective effect, correction, effective period and historical applicability.

Future contracts must not encode representation revocation as choice revocation, a communication or contest as an override, an override as deletion, a revocation as historical invalidation, ratification as retroactive authorship, continuation as authorisation, or an unresolved dispute as a resolved one. They must preserve the representation/choice, historical/forward, expressed/authorised, proposed/authoritative and unresolved/decided distinctions, and fail closed when actor, capacity, authority, act form, scope or subject is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, workflow, AI or repository changes.

## 20. Implementation Freeze

> **No implementation may begin on the basis of D55.**
>
> Drafting and proposal status authorise no implementation whatsoever. D55 authorises no code, contract change, repository change beyond the creation of this proposed specification, schema, migration, persistence, database, governance tooling, workflow, override or revocation mechanism, ratification mechanism, event handler, command handler, policy runtime, verification system, communication channel, chat surface, parser, intent classifier, natural-language model, routing engine, reviewer-recognition system, approval workflow, escalation system, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D56, or Slice 6 work. Any future implementation requires explicit human approval of D55 and a separate controlled implementation authorisation for an exact scope.

## 21. Approval Recommendation

D55 is presented for human architectural review as the learner override, revocation and ratification boundary that D24 expressly identifies as requiring a separate authority decision, and that D27 and D28 defer back to D24 without resolving. It protects the distinction between representation and delegated choice, between ending a relationship and ending a choice made under it, between contesting and overriding, between withdrawal and invalidation, between the learner's own authorisation and retroactive authorship, and between what happened and what is now wanted.

> **D55 — PROPOSED / HUMAN REVIEW ONLY**

No repository change beyond the creation of this proposed specification is authorised. No code, contract, schema, migration, persistence, workflow, mechanism, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, measurement or analytics system, assessment, AI, UI/API, delivery runtime, D56, or Slice 6 work has occurred. D1–D54 are preserved exactly as approved and locked, D50 and D24 are neither reopened nor amended, the D1–D19 register-integrity limitation is carried forward unrepaired, and no actor, competency, duty, threshold, jurisdiction, legal rule, remedy or operational procedure has been introduced. After preparation, stop and await human architectural review and approval.
