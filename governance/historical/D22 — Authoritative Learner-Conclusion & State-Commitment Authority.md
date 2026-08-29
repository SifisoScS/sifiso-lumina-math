# D22 — Authoritative Learner-Conclusion & State-Commitment Authority

> **Status: D22 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only decision. It preserves D1–D21 exactly as approved and locked. It authorises no code, contract, repository, implementation, migration, persistence, assessment, AI, UI/API, or Slice 6 work.

## 1. Purpose

D22 resolves the authority boundary between qualified evidence, purpose-specific evidence sufficiency, learner conclusions, authoritative conclusions, state commitments, and prospective state effectiveness. It requires each stage to remain a distinct, attributable, reviewable, scope-bound, provenance-linked fact or action.

> **Qualified evidence ≠ evidence sufficiency ≠ learner conclusion ≠ authoritative conclusion ≠ state commitment ≠ prospective state effectiveness. Deterministic computation ≠ authority.**

D22 creates no default authority to make a particular learner conclusion or state commitment. Rather, it specifies the narrow conditions that must be met before an otherwise separately recognised and constitutionally permitted conclusion authority may approve a conclusion, and before a separately authorised state-commitment authority may make a prospective commitment effective. It does not itself recognise an actor, nominate a conclusion class, define a mastery/readiness/progression/misconception rule, or select an evidence threshold.

## 2. Scope

D22 governs the authority semantics for prospective learner conclusions and prospective authoritative state commitments, including their provenance, scope, evidence and policy grounding, approval/effectiveness lifecycle, review, correction, revocation, staleness, supersession, conflict treatment, learner-choice boundary, and historical protection.

| D22 governs | D22 does **not** govern |
|---|---|
| The distinction and required sequence between evidence, sufficiency, conclusion, authoritative conclusion, commitment, and effect | Mathematical truth, content/curriculum authority, pedagogy, scoring, rubrics, assessment implementation, diagnosis, or AI runtime |
| The minimum authority, provenance, evidence, policy, and conflict conditions for a prospective conclusion/commitment | The recognition of a particular human, institution, assessment source, claim class, legal right, curriculum framework, or policy rule |
| Recording, approval, effectiveness, execution, correction, revocation, staleness, and prospective supersession as separate governance facts | Authentication, identity proofing, privacy implementation, storage, API, UI, transport, database schemas, or retention-period mechanisms |
| The protection that a state commitment never becomes learner consent or learner choice | An exception to D1’s explicit `select-offer` rule or any replacement for learner autonomy |

## 3. Authority Model

A learner conclusion is a bounded claim about a learner for a stated purpose, in a named claim class, limited to its evidence, policy, authority, context, and effective period. A conclusion is not authoritative merely because it is plausible, calculated, reviewed, submitted by a recognised source, derived from sufficient evidence, or useful to the engine.

An **authoritative learner conclusion** is a learner conclusion that has been explicitly approved, for a named and constitutionally permitted claim class, by an actor holding separately recognised authority within effective scope; grounded in applicable effective policy and purpose-specific qualified/sufficient evidence; recorded with the required provenance; and not blocked by unresolved consequential conflict. Authority is limited to the precise claim, purpose, scope, effective period, and stated consequences. It creates no authority beyond those bounds.

A **state commitment** is a separate, prospective, authority-bound commitment that identifies a defined change, assertion, or governed representation in authoritative learner state. It must name the affected state scope, the linked authoritative conclusion(s) or separately permitted basis, the authorising actor/action, effective time, policy/reference context, provenance, and permitted prospective effect. A state commitment is not a learner conclusion, proof of its conclusion, a state mutation, learner consent, or learner choice.

**Prospective state effectiveness** occurs only when an effective state commitment has separately completed the authorised execution required for the named state scope. Authorisation, recording, effectiveness, and execution are distinct. Neither a record in storage, a decision-engine output, an event, an existing field, nor a successful technical write may be treated as effectiveness or execution.

| Stage | Meaning | It does **not** establish |
|---|---|---|
| **Qualified evidence** | An observation is admissible for a stated purpose under D21. | Evidence sufficiency, truth, a learner conclusion, learner state, or choice. |
| **Evidence sufficiency** | Defined qualified evidence meets a purpose-specific policy condition for bounded downstream consideration. | A conclusion, authority, state commitment, or state effect. |
| **Learner conclusion** | A bounded claim concerning a learner, with stated purpose, scope, uncertainty, and provenance. | Authority, truth, state, consent, choice, or execution. |
| **Authoritative conclusion** | A conclusion approved through explicitly recognised authority, applicable effective policy, and all required D1–D21 conditions. | State mutation, learner consent/choice, or authority outside its precise scope. |
| **State commitment** | A distinct, approved prospective state representation/change linked to an authorised basis. | Current-state effectiveness, technical execution, consent, or learner selection. |
| **Prospective state effectiveness** | The stated prospective effect after separately authorised execution. | A rewrite of historical state/evidence, a new learner choice, or broader authority. |

## 4. Learner-Conclusion Definition and Claim Boundaries

Every learner conclusion must be explicit and minimally identify its claim class, learner/data-subject scope, purpose, mathematical/educational context where applicable, evidence references, evidence sufficiency reference, applicable policy/version, authority basis, uncertainty and limitations, temporal context, and provenance. The claim cannot imply more certainty, breadth, duration, learner capability, or consequence than its explicitly authorised scope permits.

D22 does not recognise a general conclusion class and does not permit a generic “learner status” to be inferred from evidence. A conclusion may become authoritative only if a later or independently applicable governance decision expressly recognises the exact claim class and conclusion authority; that recognition is effective and within scope under D15–D16; an applicable effective policy under D11 permits the conclusion; and the conditions in this decision are met. If no such authority exists, the conclusion remains non-authoritative, even if it is evidence-grounded and useful for review.

The conclusion must distinguish an observed fact from a derived interpretation. An interpretation under D17 may be submitted or considered in a conclusion process only as a reviewable, provenance-linked derived claim. Reviewed interpretation is not authoritative conclusion merely because it was reviewed, accepted operationally, or used as an input.

## 5. State-Commitment Definition and Authority

A state commitment can be proposed, reviewed, approved or rejected, recorded, made effective, executed, corrected, revoked, marked stale, or prospectively superseded. A commitment must carry an explicit lifecycle record rather than allowing an implementation to collapse these stages into a single update.

Only an actor with a separately recognised, applicable, effective, and non-conflicting **state-commitment authority** may approve a state commitment. The authority must be narrower than or equal to the relevant constitutional/policy scope and must specify the claim/state category, learner scope, purpose, prospective effect, effective period, and limits. D15 controls recognition/delegation; D16 controls governance action, review, approval/rejection, recording, effectiveness, execution, escalation, and correction. D22 does not create an actor, delegation, or authority by naming the role.

Recording preserves that a commitment was proposed, approved, rejected, or otherwise governed. It does not make the commitment effective. An effective commitment permits only the separately authorised prospective state effect within its declared bounds. Execution is the distinct accountable act that applies or represents that effect in authoritative state. An unauthorised or failed execution does not create state merely because an approval was recorded. A technical success does not establish governance execution.

| Commitment status | Required meaning and limitation |
|---|---|
| **Proposed** | A possible commitment exists for review. It has no state effect. |
| **Reviewed** | Review occurred; it does not imply approval, authority, or effectiveness. |
| **Approved** | An authorised actor approved the exact commitment within scope. Approval remains distinct from effect and execution. |
| **Rejected** | The proposed commitment is not authorised to become effective. The proposal/history remain protected. |
| **Recorded** | The governance fact is preserved. Storage/recording does not create effectiveness. |
| **Effective** | The approved commitment may produce only its stated prospective effect when all applicable conditions remain met. |
| **Executed** | A separately authorised accountable act applied/represented the effective prospective state effect. |
| **Corrected** | A later, attributable correction records a prospective governed change; it does not rewrite the earlier commitment/history. |
| **Revoked** | Future reliance/effect is withdrawn within stated scope. Historic facts remain. |
| **Stale** | The commitment requires review before future reliance because stated context, evidence, authority, policy, or period is no longer current for that purpose. |
| **Prospectively superseded** | A later explicitly authorised commitment replaces future effect only within its stated scope; it does not erase the prior commitment. |

## 6. Evidence-to-Conclusion Boundary

A proposed or authoritative conclusion requires purpose-specific evidence qualification and evidence sufficiency under D21. Every evidence reference must retain its provenance, source-recognition status, qualification/sufficiency purpose, uncertainty, temporal context, and any applicable restriction, suspension, revocation, expiry, or conflict. D22 does not permit an authority to fill missing evidence, infer an unrecorded observation, broaden a purpose, or convert a conclusion into evidence.

The required evidence conditions are:

1. The evidence must be qualified for the precise claimed purpose under D21, not merely privacy-permitted, structurally valid, technically accessible, or submitted by a recognised source.
2. Evidence sufficiency must be established for the stated downstream consideration under applicable effective policy. Sufficiency does not automatically create a conclusion.
3. Required provenance, policy/version references, authority references, scope, uncertainty, and temporal context must be present and unambiguous.
4. Evidence must remain within effective source, privacy, information-use, and policy bounds under D11, D19, D20, and D21.
5. No consequential conflict, staleness, suspension, revocation, expiry, ambiguity, or missing critical context may remain unresolved.
6. The conclusion must state no certainty beyond what the authorised claim, evidence, and policy can support.

A conclusion process may decide not to form a conclusion despite sufficient qualified evidence. A lack of conclusion must not be represented as learner deficiency, non-compliance, disengagement, lack of consent, or an adverse state.

## 7. Conclusion-to-State Boundary

An authoritative conclusion does not mutate learner state. A state commitment must be separately proposed and authorised even when it references an authoritative conclusion. The commitment must name the exact prospective state assertion/change, why that state scope is authorised, its effective time, its dependency on the conclusion/evidence/policy, its review/staleness conditions, and its permitted consequences.

No conclusion may produce a state commitment unless the claim class and state category are both independently permitted by applicable effective policy and authority. Where the conclusion is limited to a narrow purpose, the resulting state commitment cannot exceed that purpose. Where a conclusion has no authorised state effect, no state commitment may be proposed as if the effect were implicit.

The engine’s deterministic computation may evaluate declared invariant conditions or apply an already authorised, effective commitment in a defined bounded operation. It must not determine that an authority exists, manufacture evidence, select a claim class, resolve semantic uncertainty, infer learner consent/choice, create a commitment, or convert a policy/evidence computation into authority.

## 8. Approval, Effectiveness, and Execution Lifecycle

The lifecycle follows D15 and D16 and adds no shortcut. Proposal, review, approval, rejection, recording, effectiveness, execution, correction, revocation, staleness, and prospective supersession are each separately identifiable governance conditions/actions.

| Lifecycle action | Required authority boundary | Prohibited shortcut |
|---|---|---|
| **Proposal** | Any permitted actor may submit a claim/commitment for consideration only within relevant data/privacy and process constraints. | Treating submission as conclusion authority, approval, or state effect. |
| **Review** | A separately recognised reviewer assesses the stated material under effective scope/policy. | Treating review as truth, approval, or automatic effect. |
| **Approval or rejection** | A separately recognised applicable conclusion or commitment authority acts under effective policy and all required evidence/provenance conditions. | Inferring authority from institutional status, credentials, expertise label, AI output, or a technical role. |
| **Recording** | An authorised recorder preserves the governance fact under D12/D16. | Equating a database/event write with approval or effect. |
| **Effectiveness** | The approved item is effective only on its explicit terms while its conditions remain effective. | Inferring immediate/indefinite effect from approval. |
| **Execution** | A separately authorised action applies the permitted prospective effect. | Treating a calculation, response, event, or storage update as authorised execution. |
| **Correction/revocation/staleness/supersession** | An authorised prospective governance action names scope, reason, provenance, and effect. | Rewriting earlier history, silently deleting a conclusion, or retroactively changing historical state. |

A conclusion/commitment must fail closed rather than proceed when required authority, policy, evidence, provenance, data handling, learner choice, contextual version, review status, or conflict treatment is absent, unclear, ineffective, expired, revoked, stale, or out of scope.

## 9. Conflict and Fail-Closed Rules

Conflicting evidence, interpretations, policies, authorities, conclusion proposals, authoritative conclusions, state commitments, privacy conditions, curriculum contexts, or version claims must remain distinct and provenance-linked. Conflict does not create a default current state, a majority rule, a “more recent” rule, or a technical resolution.

No precedence may be inferred from recency, quantity of evidence, claimed source quality, institutional status, credentials, technical access, storage custody, policy version number, AI confidence, metadata, provider trust, learner behaviour, silence, delivery completion, operational urgency, or convenience. Constitutional constraints are supreme; D18 governs all remaining consequential conflicts and exceptions.

| Unresolved or adverse condition | Safe constrained outcome |
|---|---|
| Qualified evidence or purpose-specific sufficiency is missing, insufficient, stale, revoked, uncertain, or conflicting | Do not authorise a consequential conclusion or commitment. Preserve the evidence and provenance. |
| Interpretation is disputed, stale, unreviewed where review is required, or not authorised for the claim purpose | Do not treat it as authoritative conclusion or state basis. |
| Required conclusion/commitment authority, policy applicability, effective period, scope, or provenance is unclear | Do not approve, make effective, or execute the item. |
| Authoritative conclusions or state commitments conflict | Do not choose a winner or state effect; preserve the conflict and apply D18/D16 escalation only where authorised. |
| Required historical context is unavailable or ambiguous | Do not reconstruct authority or execute a consequential prospective effect; fail closed under D12. |
| An existing commitment is expired, revoked, stale, restricted, or superseded outside its new effective scope | Do not rely on it for future state effect; retain its history. |

The constrained outcome must be non-mutating, non-consensual, non-choice-making, and actionless with respect to the disputed conclusion/commitment. Any safe response may report that the required authority/context is unresolved only when the disclosure itself is separately permitted.

## 10. Learner Choice Protections

D1 remains controlling. Only an explicit `select-offer` may authorise learner commitment to an offered path or focus where D1 requires learner choice. Evidence, sufficiency, a conclusion, authoritative conclusion, state commitment, correctness, performance, completion, delivery, assessment, speed, behaviour, silence, technical use, AI output, or system computation must never be treated as learner consent, learner choice, acceptance, deferment, decline, or request for an alternative.

A state commitment must not alter learner path/focus or create an experience acceptance merely because an authority considers that change educationally appropriate. If a prospective state representation concerns a learner-selected focus/path, it requires the independently valid D1 learner-choice event and may not substitute for it. Conversely, an explicit learner choice does not authorise a conclusion, state commitment, or assertion of learning.

## 11. Relationships to Mastery, Readiness, Progression, Certification, Grading, and Misconception

D22 introduces **no authority** for mastery, readiness, progression, certification, grading, ranking, diagnosis, or misconception conclusions. These labels are neither generic state categories nor generic conclusion classes under D22. A conclusion using any such label remains non-authoritative unless a later separately approved governance decision expressly defines the claim class, required authority, applicable policy, evidence conditions, purpose, lifecycle, review, conflict treatment, and state relationship in a manner consistent with D1–D22.

D4 remains controlling for academic level and progression: context is not mathematical truth or learner capability, and progression is governed and qualified, not automatic. D8 remains controlling for assessment/evidence: observations do not automatically establish these conclusions. D2 remains controlling for state: no computation or record becomes authoritative state merely because it bears one of these labels.

## 12. Historical Protection

D22 never permits rewriting, replacing, erasing, or concealing as if absent: original evidence; assessment observations; interpretations; learner choices; prior decisions; commitments; events; provenance; historical learner state; historical authority/action records; or relevant version references.

Corrections, revocations, restrictions, staleness, rejections, and supersessions must be recorded as distinct, attributable, time-aware, provenance-linked, prospective facts. A later state commitment may change future effective state only within its explicit bounds; it cannot rewrite what was historically observed, concluded, committed, effective, executed, or available at an earlier time.

D12 controls durable historical protection and replay. D13 controls version identity/equivalence/migration. D17 controls interpretation review. D16 controls governance correction and execution. D22 is subordinate to each and adds no retrospective exception.

## 13. Interaction with D1–D21

D22 relies on every locked decision and does not supersede any of them.

| Locked decision | D22 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | Conclusions and commitments never replace explicit learner selection. A state effect cannot move learner focus/path without D1-authorised `select-offer`. |
| **D2 — Learning-State Authority** | Evidence, interpretation, authoritative conclusion, commitment, and state remain distinct. No automatic state truth arises. |
| **D3 — Curriculum Identity & Authority** | Curriculum governs educational structure, not learner-conclusion/state authority or mathematical truth. |
| **D4 — Academic Level & Progression** | D22 creates no progression/capability authority and preserves contextual, non-automatic progression. |
| **D5 — Content Authority** | Content authority does not authorise learner conclusions/commitments; conclusions do not authorise content. |
| **D6 — Knowledge Relationships** | Typed relationships/graph topology do not establish evidence, conclusion, or state authority. |
| **D7 — Experience Lifecycle** | Delivery, participation, and completion do not establish learning, conclusion, or state by themselves. |
| **D8 — Assessment & Evidence** | Assessment yields qualified observations/evidence only; D22 prevents them becoming automatic conclusions/state. |
| **D9 — Decisioning & Policy** | Deterministic decisioning evaluates authorised policy over qualified input but remains non-consensual and non-mutating. |
| **D10 — Content Publication & Curriculum Activation** | Activation/publication is distinct from conclusion/commitment authority and does not create it. |
| **D11 — Policy Activation & Lifecycle** | Only applicable, effective, authority-scoped policy may govern a conclusion/commitment; ambiguity fails closed. |
| **D12 — Durable History & Storage** | Records preserve/retrieve but create no authority; unavailable/ambiguous required history fails closed. |
| **D13 — Version Equivalence/Conflict/Migration** | Version identity/migration does not establish conclusion or state authority and cannot rewrite history. |
| **D14 — AI Proposal & Assistance** | AI remains proposal-only; it cannot conclude, authorise, commit, execute, or create state. |
| **D15 — Authority Delegation & Governance Actor Recognition** | Actor/authority recognition must be explicit and cannot expand authority. D22 names no default authority. |
| **D16 — Governance Action, Review & Escalation** | Proposal, review, approval/rejection, recording, effectiveness, execution, escalation, and correction remain distinct. |
| **D17 — Interpretation & Learner-Record Review** | Interpretation is distinct from an authoritative conclusion and cannot automatically become one. |
| **D18 — Cross-Domain Conflict & Exception Resolution** | Consequential conflict creates no authority/preference and must fail closed unless explicitly resolved under constitutional constraints. |
| **D19 — Data-Subject Identity, Consent & Information-Access Authority** | Identity/access/use/disclosure authority is distinct from conclusion/state authority and is a relevant independent condition. |
| **D20 — Privacy, Representation & Data-Subject Rights Authority** | Privacy/representation/rights constraints govern permitted information handling; they do not create educational or state authority. |
| **D21 — Assessment Source Recognition & Evidence Sufficiency Authority** | D21 qualification/sufficiency is an upstream prerequisite for consideration, not a conclusion, authority, commitment, or state effect. |

## 14. Prohibited Behaviours

14.1. Treating qualified evidence, evidence sufficiency, a source’s recognition, structural validity, an assessment observation, an interpretation, a policy output, delivery/participation/completion, a decision, a record, or an event as an authoritative learner conclusion or state commitment.

14.2. Treating deterministic computation, an AI proposal, AI confidence, provider trust, validator output, institutional possession, role/title, credential, technical access, storage custody, metadata, recency, volume of evidence, learner behaviour, speed, silence, or convenience as conclusion/state authority.

14.3. Treating an authoritative conclusion as a state mutation, learner consent, learner choice, offer acceptance, path/focus commitment, mathematical truth, assessment truth, or authority outside its stated claim/purpose/scope/effective period.

14.4. Treating a state commitment as currently effective merely because it is proposed, reviewed, approved, recorded, stored, transmitted, or technically written; execution and effectiveness remain distinct.

14.5. Allowing a state commitment to move learner focus/path, accept an experience, or substitute for learner choice where D1 requires explicit `select-offer`.

14.6. Inferring an authority, policy applicability, claim class, evidence threshold, semantic conclusion, certainty level, consent, or state effect where it was not explicit, effective, applicable, provenance-supported, and within scope.

14.7. Using conflict, exception, urgency, ambiguity, missing history, or technical limitation to bypass D18, constitutional constraints, or the fail-closed requirement.

14.8. Silently rewriting original evidence, observations, interpretations, learner choices, decisions, commitments, events, provenance, historic state, or historical authority/action records through correction, revocation, staleness, supersession, migration, or implementation.

14.9. Introducing mastery, readiness, progression, certification, grading, ranking, diagnosis, or misconception authority merely by giving a conclusion/commitment one of those labels.

14.10. Implementing any conclusion, state-commitment, assessment, AI, persistence, UI/API, migration, or Slice 6 behaviour from D22.

## 15. Explicit Deferrals

D22 deliberately leaves the following matters unresolved. They require a later dependency review, separate human governance approval, and any later implementation authorisation.

| Deferred matter | Why D22 does not decide it |
|---|---|
| Authoritative mastery, readiness, progression, misconception, certification, grading, ranking, or diagnosis claim classes | D22 defines the generic authority pathway but intentionally does not recognise any substantive claim class. |
| Assessment semantics, scoring, rubrics, calibration, measurement validity, and diagnostic methodology | D21 governs source/evidence qualification; D22 governs conclusion/commitment authority; neither is an assessment/scoring implementation. |
| The specific authorities/actors who may make future conclusion or state-commitment decisions | D15 governs recognition/delegation. D22 grants no actor authority by default. |
| The exact policy criteria/evidence thresholds for particular conclusion categories | D11 requires applicable effective policy; D22 does not invent substantive policy. |
| Active-session interruption, abandonment, resumption, partial delivery, and time-based engagement effects | D7/D22 do not determine active-session authority or client lifecycle semantics. |
| Representation in learner-choice contexts | D20 prohibits inferring data representation as learner-choice authority; D22 creates no exception. |
| Legal, jurisdictional, privacy, retention, and rights implementation | D19–D20 remain governance constraints, not implementation/legal-compliance determinations. |
| Formal contract/data model, database, storage, client, API, or event-bus mechanics | D22 defines authority semantics only. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D22 at this stage.**

If D22 is later approved and a separate narrowly controlled implementation phase is expressly authorised, the future design must preserve distinct representations for: learner conclusion; conclusion claim class/purpose/scope; authority source and action; qualified-evidence/sufficiency references; policy/version references; uncertainty/conflict; proposal/review/approval/rejection/recording/effectiveness/execution lifecycle; state commitment; prospective effect; correction/revocation/staleness/supersession; and provenance. It must also demonstrate, through tests, that no stage silently converts into another and that unresolved consequential conditions are actionless and fail closed.

This is an impact analysis only. It neither selects a contract shape nor authorises modifications to existing contracts, tests, source code, or repository files.

## 17. Implementation Freeze

> **No implementation may begin until D22 is reviewed, approved, and locked.**
>
> D22 authorises no code, contract modification, repository-file modification, migration, persistence, assessment, scoring, rubric, AI, UI/API, client, authentication, identity proofing, storage, transport, commit, Slice 6, or D23 activity. Any future implementation requires an explicit controlled authorisation that reconciles all then-locked governance decisions.

## 18. Approval Recommendation

D22 is ready for human architectural review as the narrow boundary that prevents qualified evidence and deterministic computation from being mistaken for learner-state authority. Approval would lock only the authority/lifecycle semantics in this specification. It would not recognise a particular actor, claim class, policy, threshold, assessment, learner-state assertion, technology, or implementation.

> **D22 is proposed only. Human architectural approval is required before D22 becomes locked or any learner-conclusion, state-commitment, or related implementation begins.**

---

**D22 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, repository file, commit, implementation, or Slice 6 work has occurred.
