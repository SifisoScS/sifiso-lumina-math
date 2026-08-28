# D20 — Privacy, Representation & Data-Subject Rights Authority

> **Status: D20 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only decision. It preserves D1–D19 exactly as locked. It creates no implementation authority and does not approve code, contracts, data stores, interfaces, authentication, identity proofing, legal compliance mechanisms, AI runtime, or Slice 6.

## 1. D20 Purpose

D20 establishes the authority semantics required to apply D19 safely where Math Lumina holds or handles information associated with a learner or another data subject. It distinguishes the person whose information is concerned, the learner, a person or entity claiming to act for that person, a governance actor, an institution, and a recipient. It also defines the narrow governance lifecycle for privacy- and data-rights requests.

D20 exists to ensure that **technical possession, technical access, credentials, institutional involvement, or a plausible relationship never become data authority**. It governs whether a future action concerning access, use, disclosure, restriction, retention, correction, or availability may be considered; it does not itself cause such an action, identify a person, or determine legal rights.

## 2. D20 Scope

The decision applies to authority claims and governance actions concerning information associated with a data subject, including learner records, evidence, assessment observations, interpretations, learner choices, commitments, decisions, events, provenance, and information about their use. It governs prospective access, use, disclosure, restriction, retention, correction handling, deletion/erasure handling, transparency, representation, review, escalation, and recording.

It does not decide mathematical truth, curriculum structure, content admissibility, policy activation, assessment truth, learner state, pedagogy, a learning offer, learner choice, publication, migration, historical equivalence, identity proofing, authentication, jurisdiction, or any technical mechanism. Constitutional constraints and each locked decision remain independently binding.

| Within D20 | Outside D20 |
|---|---|
| Authority semantics for a data-rights request, representation claim, privacy review, disclosure, restriction, and prospective availability action | Authentication, account recovery, credential issuance, identity proofing, biometric checks, or session/device detection |
| Scope, purpose, effectiveness, review, revocation, expiry, provenance, and conflict treatment of data authority | Legal-jurisdiction rules, legal advice, statutory retention periods, consent collection, or regulatory compliance implementation |
| Protection against access/use/disclosure authority being inferred from custody or technical capability | Database design, storage/deletion mechanisms, APIs, UI, transport, queues, CMS, or infrastructure |
| Learner/data-subject transparency obligations at the governance-semantic level | AI provider/model/runtime configuration, assessment service implementation, or a learner-client specification |

## 3. Authority Model

The following roles are distinct. A single natural person or organisation may be associated with more than one role only through explicit, purpose- and scope-bound records. A role name, relationship label, account, credential, session, employer, school, storage custodian, or prior activity does not establish any role or authority by itself.

| Role | D20 meaning | What the role does **not** establish by itself |
|---|---|---|
| **Learner** | The person in relation to whom learning activity, offers, choices, evidence, or learner state may be considered. | Data-subject status, identity proof, consent, privacy authority, representative authority, or governance authority. |
| **Data subject** | The person to whom information or an information-associated record relates for the claimed purpose. | Learner status, proof of identity, access entitlement, consent, or authority to change historical facts. |
| **Authorised representative** | A person or entity with a separately recognised, effective, scoped, purpose-bound, reviewable authority to act for a named data subject in a stated data-rights matter. | General authority, ownership of information, authority to delegate, learner choice, learner-state authority, or authority outside the recognised scope. |
| **Guardian/parent where applicable** | A relationship category that may be submitted as evidence in a representation claim. | Automatic representation, consent, access, disclosure, learner-choice, or governance authority. |
| **Institutional actor** | A recognised actor acting within a stated institutional authority and purpose. | Ownership of learner information, data-subject authority, broad access, or an implied representative role. |
| **Recipient** | A specifically identified target of a proposed information disclosure. | A right to receive information, onward-use authority, or authority to determine disclosure. |
| **Governance actor** | A separately recognised actor permitted by D15 and D16 to perform a specified governance action. | Data-subject association, representation, consent, access/use/disclosure authority, or power to override constitutional constraints. |

An information-associated record may be connected to a data subject only through the D19 association and identity rules. A D20 role claim must remain distinguishable from that association: an association says whom information concerns for a specified purpose; it does not determine who may access, receive, direct, correct, delete, or use that information.

## 4. Representation Authority

### 4.1 Establishment and scope

A representation claim is **proposed until recognised through the applicable D15 delegation/recognition and D16 governance-action processes**, subject to D19 identity and information-access constraints. Recognition must be explicit, attributable, versioned where applicable, provenance-linked, reviewable, and limited to a named data subject, representative, purpose, information scope, permitted action category, and effective period. It must state whether it permits submitting a request, receiving communications, receiving defined information, asking for restriction/deletion/correction review, or another precisely bounded act.

Representation may neither expand the authority of its source nor create authority that the source lacks. It is non-transferable unless a separately recognised, applicable authority expressly permits a further delegation. A representative cannot infer a wider scope from a relationship title, institutional status, technical access, previous disclosure, silence, learner conduct, or perceived learner interest.

### 4.2 Limits

Representation authority under D20 does not become learner consent, data-subject consent, policy authority, content authority, assessment authority, state authority, mathematical authority, or conflict-resolution authority. It does not authorise a representative to select an offered path/focus, accept an experience, or make another learner choice merely because the representative can make a data-rights request. D1 remains controlling. Any future question of whether, when, and under what independent authority another actor may act in a learner-choice context is explicitly deferred.

### 4.3 Lifecycle

A recognised representation claim has an explicit effective start, scope, purpose, review status, and expiry condition or review condition. It may be prospectively revoked, narrowed, suspended, found stale, superseded, or expired through an authorised, recorded governance action. These events do not erase the prior claim or rewrite past access, use, disclosure, evidence, decisions, or historical state. They govern whether future reliance is permitted.

| Representation condition | Required constrained treatment |
|---|---|
| Identity association, source, scope, purpose, effective period, or review status is missing or unresolved | Do not recognise or rely on the claim for consequential action. |
| Claim conflicts with an effective restriction, revocation, constitutional rule, or another consequential claim | Preserve the conflict and follow D18; do not infer precedence. |
| Claim has expired, is revoked, or is stale for the requested action | Do not use it prospectively; retain the governed historical record. |
| Claim is valid but does not cover the requested purpose, information category, recipient, or action | Treat the request as out of scope and do not broaden it. |

## 5. Data-Subject Rights

A data-subject rights request is a provenance-bearing request for a governance determination. Receiving, logging, or acknowledging a request does not establish identity, eligibility, representation, consent, truth, a right outcome, or a required technical result. A rights request must remain distinct from the later review, determination, recording, effectiveness, execution, correction, escalation, and any technical operation described by D16.

| Request category | Permitted governance subject | Boundaries and non-effects |
|---|---|---|
| **Access** | Whether defined information may be disclosed to a specified effective requester/recipient for an authorised purpose and scope. | Does not provide broad system access, reveal unrelated information, establish ownership, or create access for future purposes. |
| **Correction** | Whether a claimed inaccuracy should be recorded, investigated, linked to an authorised correction/supersession, or reflected prospectively in a governed representation. | Does not rewrite immutable observations, decisions, provenance, events, choices, commitments, or historical state. A dispute or correction claim remains distinct from truth. |
| **Restriction** | Whether future access, use, disclosure, availability, retention handling, or processing may be prospectively constrained within an authorised scope. | Does not erase history, establish a new learner state, settle a conflict, or silently invalidate prior history. |
| **Deletion/erasure** | Whether future availability, retention handling, deletion processing, or a legal/operational review should be authorised for a defined scope. | Does not imply that a technical deletion has occurred, determine a retention rule, or rewrite protected history. If preservation and erasure conflict, D18 applies. |
| **Disclosure** | Whether defined information may be released to a defined recipient under an effective purpose, scope, and authority basis. | Does not create recipient authority, onward disclosure/use authority, consent, or an inference that future disclosures are permitted. |
| **Information about data use** | Whether defined, provenance-supported information about governed access, use, disclosure, restrictions, retention status, and applicable conditions may be communicated. | Does not create consent, alter the record, reveal protected information outside scope, or constitute an assurance beyond the available governed record. |

D20 does not state that any request category is universally available, mandatory, or legally required. Eligibility, applicable policy, recognition of the requester, information scope, conflicts, and required governance facts must be established for the individual request. Where they are not established, the consequential request fails closed.

## 6. Purpose Limitation and Minimisation Rules

Information may be accessed, used, disclosed, or made available only for an **explicitly authorised purpose**, to an **identified effective actor or recipient**, under an **authorised and necessary information scope**, and within an **effective period**. Necessity means that the permitted scope must not exceed what is required for the stated, authorised purpose. Convenience, technical availability, broad organisational access, model/provider capability, anticipated utility, or a future possible use is not necessity.

A new purpose, recipient, use category, information category, or broader scope requires an independent applicable authority determination. An authorised access request does not authorise use, disclosure, retention, secondary use, model training, content development, assessment action, policy action, or onward transfer. Each remains separately governed under D19 and the relevant locked decision.

## 7. Disclosure Rules

Disclosure is a distinct prospective governance action. It may occur only when the requester or representative is effectively recognised for the specific purpose and scope; the recipient is identified; the information is minimised; the applicable information-access/use/disclosure authority is effective; and no unresolved consequential conflict exists. The accountable governance action must record the claimed basis, scope, purpose, recipient, effective determination, relevant version/references, and observable provenance, without exposing protected details beyond the lawful/governed need of that record.

Disclosure does not establish consent, learner choice, representation beyond its stated scope, recipient ownership, recipient reuse, or a historical conclusion about the learner. An AI provider, assessment source, storage provider, institutional actor, credential holder, or technically authenticated client is a recipient or operational actor only when separately and explicitly recognised for a defined purpose; it never becomes authoritative through trust, possession, capability, or output plausibility.

## 8. Privacy-Specific Authority, Rights Conflict, and Escalation

D15 governs actor recognition and delegation. D16 governs proposals, review, approval/rejection, recording, effectiveness, execution, escalation, and correction. D20 adds no unnamed privacy office, default representative, universal reviewer, or implicit institutional authority. A privacy- or rights-related action must identify the applicable recognised actors and their bounds before it is consequential.

| Action | Required authority condition |
|---|---|
| Receive or record a request | An explicitly recognised receiving/recording authority with a defined handling purpose. Receipt is not approval. |
| Review a request or representation claim | An explicitly recognised reviewer acting in applicable scope and subject to D15–D16. |
| Approve, reject, defer, restrict, revoke, or escalate | An explicitly recognised decision authority, applicable effective policy, required evidence/provenance, and D18-compatible conflict treatment. |
| Carry out an approved prospective effect | A separately authorised execution act under an effective recorded decision; execution does not itself expand the decision. |
| Record the governance result | An authorised recorder under D12/D16, with immutable/protected provenance and an explicit distinction between request, decision, effect, and execution. |

A conflict involving learner rights, a data-subject claim, representation, institutional authority, policy, assessment, AI/provider input, interpretation review, historical preservation, or data availability creates no authority and no inferred priority. There is no precedence based on recency, version, technical access, storage custody, credentials, relationship title, institutional possession, metadata, AI confidence, provider trust, learner behaviour, silence, or convenience.

Constitutional constraints remain supreme. Otherwise, D18 controls the conflict process. When the conflict is consequential and cannot be resolved by an explicit applicable authority and policy, the system must preserve the claims and history, record the unresolved conflict where authorised, withhold the consequential access/use/disclosure/change, and escalate through the applicable D16 process. Exception handling cannot suspend constitutional or locked-decision constraints.

## 9. Learner-Facing Transparency

Where an authorised purpose requires communicating governance conditions to a learner or data subject, the communication should be truthful, scoped, provenance-supported, and limited to the information the recipient may receive. It may state the applicable purpose, relevant information category, asserted role, effective conditions, known restrictions, available request route, review status, or outcome limitations only when those statements are themselves grounded.

Transparency is a disclosure of information, not a source of authority. It does **not** create consent, representation, learner choice, learner state, identity proof, access/use/disclosure authority, mathematical truth, assessment truth, policy acceptance, or a change to historical truth. A notice, prompt, acknowledgement, continued use, lack of response, or observed behaviour must never be treated as consent or rights waiver unless a separate, applicable future governance decision expressly provides an authority model and D19 conditions are met.

## 10. Historical Protection

D20 is prospective. A valid rights or representation governance action may change future access, use, disclosure, restriction, retention handling, availability, or permitted handling scope. It must never silently rewrite or erase historical evidence, assessment observations, interpretations, learner choices, commitments, decisions, events, provenance, historical state, version references, or prior governance records.

A correction, restriction, deletion/erasure outcome, revocation, expiry, denial, or supersession must be recorded as a distinct, attributable, time-aware, provenance-linked fact under D12, D13, D16, and D17 as applicable. Replaying protected history must not manufacture an authority effect that was unavailable at the historical time, and an unavailable/ambiguous required history must fail closed under D12.

## 11. Fail-Closed Rules

A consequential access, use, disclosure, restriction, availability, correction effect, deletion/erasure effect, or representation reliance must not proceed when any required condition is unresolved, absent, ambiguous, expired, revoked, stale, contradictory, out of scope, or not provenance-supported. The constrained outcome is non-disclosure, non-use, non-expansion of access, no new authority claim, no learner-state change, no learner-choice commitment, no historical rewrite, and escalation/recording only where independently authorised.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Data-subject association or claimed requester/representative relationship | Do not disclose, use, or recognise authority. |
| Purpose, recipient, category, scope, necessity, or effective period | Do not broaden or perform the requested action. |
| Rights eligibility, policy applicability, governance actor authority, or representation validity | Do not approve the consequential outcome; preserve and escalate through governed channels. |
| Historical preservation versus restriction/deletion/erasure | Do not resolve by technical convenience; preserve the conflict and apply D18/D12. |
| AI/provider request or institutional request | Do not treat it as authority or as a reason to disclose/use data. |

## 12. Interaction with Locked D1–D19

D20 depends on, and remains subordinate to, the following decisions. It adds no exception to any of them.

| Locked decision | D20 interaction |
|---|---|
| **D1 — Learner Choice** | Privacy/representation authority does not become learner path/focus choice, offered-path consent, or commitment authority. Only D1-authorised learner choice semantics apply. |
| **D2 — Learning-State Authority** | Rights, access, disclosure, restriction, and representation never create, establish, or mutate learner state, mastery, readiness, misconception, or evidence truth. |
| **D3 — Curriculum Identity & Authority** | Curriculum authority remains educational-structure authority, not data authority, consent, representation, or learner-state authority. |
| **D5 — Content Authority** | Content authority does not authorise handling learner data; data authority does not publish, validate, or activate content. |
| **D8 — Assessment & Evidence** | Assessment observations remain qualified, provenance-bound information. Assessment source status or a request for assessment data does not settle data authority, representation, or rights eligibility. |
| **D9 — Decisioning & Policy** | Deterministic decisioning executes only effective authorised policy over qualified inputs. It does not decide rights, infer privacy authority, or mutate records through a rights request. |
| **D10 — Content Publication & Curriculum Activation** | Publication/activation neither grants access nor establishes a data purpose, representative, or recipient entitlement. |
| **D11 — Policy Activation & Lifecycle** | Privacy/right handling requires an applicable, effective, authority-scoped policy; activation and applicability remain distinct, and ambiguity fails closed. |
| **D12 — Durable History & Storage** | Storage preserves/retrieves; it never creates privacy authority. Rights outcomes are additive/prospective and protected historical facts remain non-rewritten. |
| **D13 — Version Equivalence/Conflict/Migration** | A version, migration, equivalence claim, or storage conversion does not resolve representation, rights, privacy, or historical availability authority. |
| **D14 — AI Proposal & Assistance** | AI may propose only. An AI task or provider request supplies no data authority and no rights decision; D20 constrains any future permitted input scope. |
| **D15 — Authority Delegation & Governance Actor Recognition** | Recognition/delegation is necessary but not sufficient: the resulting authority must still be purpose-, scope-, time-, and action-bounded under D19/D20. |
| **D16 — Governance Action, Review & Escalation** | Requests, reviews, decisions, records, effectiveness, execution, escalation, and correction remain distinct. D20 defines the privacy/right subject matter, not a shortcut around D16. |
| **D17 — Interpretation & Learner-Record Review** | A privacy correction/restriction request does not rewrite evidence or interpretations; interpretation review remains separately governed and prospective. |
| **D18 — Cross-Domain Conflict & Exception Resolution** | D20 conflicts create no authority or inferred precedence. D18 controls constitutional supremacy, explicit resolution, and fail-closed handling. |
| **D19 — Data-Subject Identity, Consent & Information-Access Authority** | D19 provides the underlying association, access/use/disclosure, consent/reference, and identity distinctions. D20 applies those foundations to roles, representation, rights, minimisation, transparency, and rights conflict. |

## 13. Prohibited Behaviours

The following are prohibited without exception under this proposal:

13.1. Treating technical access, credentials, an account, a session, device context, storage custody, institutional possession, relationship title, prior disclosure, AI/provider trust, AI confidence, metadata, silence, or learner behaviour as data authority, representation, rights eligibility, consent, or privacy status.
13.2. Inferring representation, guardian/parent authority, a data subject’s request rights, a recipient’s entitlement, or privacy status without explicit applicable recognition and provenance.
13.3. Treating institutional possession as ownership of a learner’s or data subject’s information.
13.4. Allowing a representation or rights action to establish learner consent, learner choice, learner state, mastery, readiness, misconception, assessment truth, curriculum authority, content authority, policy authority, publication, activation, mathematical truth, or migration authority.
13.5. Using a privacy/right request to silently rewrite historical evidence, observations, interpretations, choices, commitments, decisions, events, provenance, historical state, or version history.
13.6. Using a privacy exception, operational urgency, technical limitation, or governance convenience to override constitutional constraints or locked D1–D19 decisions.

## 14. Required Future Governance

D20 deliberately defers several matters that need later, separately approved decisions before their implementation can be safe. The next decision must be selected through a fresh dependency review and must not be presumed by this specification.

| Deferred matter | Why a separate decision is required |
|---|---|
| Legal/jurisdictional applicability, lawful bases, age thresholds, mandatory retention, breach duties, and statutory rights | These are legal/institutional questions; D20 supplies no jurisdictional rule or legal compliance conclusion. |
| Identity proofing and authentication assurance | D20 requires recognised association/authority but does not specify how anyone proves or authenticates identity. |
| Operational service of rights requests, notices, deadlines, and technical execution assurance | D20 distinguishes governance action from execution; it does not define operational workflows, systems, service levels, or interfaces. |
| Detailed retention classification and preservation/erasure reconciliation | D20 protects history and requires conflict handling but does not determine retention durations or legal preservation grounds. |
| Representation for learner-choice or educational decisions | D20 prohibits inference that data representation is learner-choice authority; a distinct authority decision would be needed. |
| Assessment source recognition/evidence sufficiency and active-session interruption | These remain separate learning/assessment governance boundaries, not privacy substitutions. |
| Formal contract, storage, client, API, AI-input, or audit implementation | Any implementation requires a separately approved scope that reconciles all locked decisions and adds tests without weakening established safeguards. |

## 15. Future Contract Impact Analysis and Implementation Freeze

D20 authorises **no present contract change**. If and only if D20 is later approved and a separate implementation phase is approved, future contracts would need to represent claims and actions without collapsing them: data-subject association; actor/representative recognition; authority source; action category; purpose; information category/scope; recipient; effective period; status; revocation/expiry/review; provenance; conflict/escalation status; request, determination, and execution as distinct facts; and prospective effects.

Any later implementation must be deterministic where deterministic evaluation is appropriate, headless, interface-agnostic, independently testable, provenance-rich, additive with respect to history, and fail closed for consequential unresolved conditions. It must preserve the D1 learner-choice boundary, D2 evidence/state separation, D8 evidence qualification, D9 non-mutating decisioning, D12 durable-history protection, D14 proposal-only AI boundary, and D18 conflict rules. No implementation work is authorised by this specification.

> **Implementation Freeze:** No code, contracts, tests, repository files, configuration, dependencies, persistence, API, UI, authentication, identity proofing, consent collection, retention-period mechanism, AI runtime, assessment implementation, commit, or Slice 6 work may begin from D20 unless D20 is explicitly approved and a later controlled implementation authorisation is issued.

## 16. Approval Recommendation

D20 is ready for human architectural review as a narrow authority boundary. Approval would lock the governance semantics above only. It would not authorise implementation, establish compliance with any law, determine rights in a particular jurisdiction, or resolve the explicitly deferred matters.

> **D20 is proposed only. Human architectural approval is required before D20 becomes locked or any privacy-, representation-, data-rights-, or data-handling-related implementation begins.**

---

**D20 — PROPOSED / HUMAN REVIEW ONLY**

No repository files were modified, no code was written, no commit was created, and no implementation work was started.
