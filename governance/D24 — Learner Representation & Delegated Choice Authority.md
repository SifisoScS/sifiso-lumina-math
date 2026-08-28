# D24 — Learner Representation & Delegated Choice Authority

> **D24 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D23 are preserved exactly as approved and locked. D24 authorises no code, contract modification, repository change, schema, persistence, authentication, access control, UI/API, assessment, AI, delivery, migration, D25 work, or Slice 6 work.

## 1. Purpose

D24 defines the authority boundary for the exceptional case in which a person or institution may be permitted to act **on behalf of a learner** within a defined learner-choice context. It distinguishes the learner, data subject, authorised representative, governance actor, institutional actor, recipient, learner choice, representative action, consent, and authority to act.

D24 preserves D1’s constitutional rule:

> **Only an explicitly authorised choice may authorise a learner commitment.**

D24 determines how a representative action may, if separately and explicitly authorised, satisfy an applicable learner-choice requirement on behalf of a learner. It does not equate that action with the learner’s personally performed choice, preference, intent, consent, identity, or state. D24 creates no blanket delegated-choice authority.

## 2. Scope

D24 governs the recognition, scope, lifecycle, provenance, conflict handling, revocation, expiry, and prospective effect of learner-choice representation. It may apply only where an applicable authority explicitly permits a representative to perform a named choice action for a named learner and context.

| Within D24 | Explicitly outside D24 |
|---|---|
| Whether a representation claim may be recognised for a bounded learner-choice action | Legal determination of guardianship, parental status, capacity, age thresholds, or jurisdictional rights |
| Who may recognise representation under existing D15–D16 authority and how scope/effectiveness are recorded | Identity-proofing technology, authentication, account ownership, access-control technology, or credentials |
| Separation of learner choice, representative choice, representative action, consent, and state commitment | Mathematical truth, curriculum/content authority, assessment/scoring, mastery, readiness, progression, certification, grading, or misconception |
| Prospective lifecycle, competing claims, action provenance, historical protection, and fail-closed rules | Institutional policy implementation, privacy implementation, data storage, UI/API, delivery runtime, AI runtime, or migration |

D24 must not redefine learner identity, data-subject identity, learner state, assessment authority, curriculum authority, policy authority, content authority, AI authority, or the D1 meaning of explicit choice.

## 3. Representation Authority Model

**Representation** is an explicit, recognised, scoped authority claim that a named representative may perform a named class of action on behalf of a named learner for a stated purpose and context during an effective period. Representation is not identity substitution. It records an authority relationship; it does not assert that the representative is the learner or that the learner personally performed the action.

A representation claim must identify, at minimum, the learner, representative, authority basis, recognising governance actor/action, purpose, permitted decision/action type, experience or curriculum context where relevant, scope, effective period, limitations, review status, revocation/expiry conditions, and provenance. A relationship, title, age, institution, credential, account, technical access, previous action, AI recommendation, or storage record cannot establish representation by itself.

Representation authority and governance-actor authority remain distinct. A person may be a recognised governance actor without being a learner representative, and may be a recognised representative without having governance authority outside the delegated choice scope. Institutional actors, recipients, and data representatives do not gain learner-choice authority from their other roles.

| Role | D24 meaning | No automatic implication |
|---|---|---|
| **Learner** | The person whose learning-choice context is concerned. | That another actor may act on the learner’s behalf. |
| **Data subject** | The person to whom associated information relates under D19–D20. | Learner-choice representation or state authority. |
| **Authorised representative** | A person/institution with an effective, explicit, bounded authority to perform named action(s) for a learner. | Learner identity, preference, consent, state, or general decision authority. |
| **Governance actor** | An actor recognised under D15–D16 to perform a defined governance action. | Learner representation or the right to select an offer. |
| **Institutional actor** | An actor associated with an institution within a stated institutional scope. | Ownership, representation, or learner-choice authority. |
| **Recipient** | A target of a permitted disclosure or communication. | Representation, choice, or decision authority. |
| **Learner choice** | An explicit choice by the learner or, only where D24 permits, an explicitly authorised representative action on behalf of the learner. | Consent to unrelated data use, state, assessment, or policy. |
| **Representative action** | An action attributed to the representative under a recognised delegation, with the learner as represented party. | A personally performed learner action or learner preference. |

## 4. Authority Basis and Recognition Model

A representative may be recognised only through a separately authorised governance process under D15–D16, subject to D19–D20 data-subject/representation distinctions and any applicable effective policy under D11. D24 does not decide the legal or institutional basis for recognition. It requires that whichever applicable authority is relied upon be explicit, attributable, provenance-linked, purpose-bound, scope-bound, time-bound, reviewable, and effective before reliance.

Recognition must specify whether it permits: submitting a choice; confirming a current choice; receiving a choice-related communication; requesting a new offer; withdrawing or changing a representative action; or another precisely described act. A representation that permits data access, disclosure, correction, restriction, deletion, or information requests under D19–D20 does not permit learner-choice action unless a separate learner-choice authority says so. A governance role, institutional title, technical privilege, or data-rights role does not expand the recognition.

Representation cannot delegate more authority than its source possesses, cannot create authority prohibited by D1–D23, and cannot be silently re-delegated. A recognised representative cannot authorise another person or institution unless the effective authority explicitly permits that further delegation and the second representation is separately recognised.

## 5. Representation Scope Model

Representation must be limited to the narrowest stated scope necessary for the authorised action. It may be limited independently by learner, purpose, decision type, experience, curriculum context, institution, jurisdictional/institutional context, time, action type, communication channel, or recipient. Representation in one context grants no authority in another.

| Scope dimension | Required interpretation |
|---|---|
| **Learner** | The named learner only; no inferred authority for siblings, cohorts, or other data subjects. |
| **Purpose** | The named learner-choice purpose only; no automatic data, assessment, state, or governance reuse. |
| **Decision type** | The named choice/action class only; no blanket right to make all choices. |
| **Experience** | The named experience/offer/instance only where specified; no automatic authority over other experiences. |
| **Curriculum context** | The named curriculum/academic context only; no automatic transfer across curricula. |
| **Institutional context** | The named institution/programme/relationship only where applicable; institutional affiliation alone is insufficient. |
| **Time** | The stated effective period and permitted event window only. |
| **Action type** | Only the specific action permitted, such as selecting a named offer; no implied authority to alter state, policy, evidence, content, or history. |

A scope mismatch is an authorisation failure, not an invitation to broaden the claim. Any expansion requires a new explicit recognition and does not retroactively validate earlier actions.

## 6. Learner-Choice Delegation Rules

D1 remains controlling. A representative action may count as an explicitly authorised choice on behalf of a learner only when all of the following are established: the representation is recognised and effective; the representative is identified as the acting party; the learner is identified as the represented party; the exact offer/path/focus or other choice is within scope; the purpose and context are within scope; the applicable policy permits representative action; the authority/action record is current and provenance-supported; no conflict is unresolved; and D15–D16 governance action requirements are satisfied.

The resulting record must say **representative action on behalf of learner**, not “learner personally selected.” The representative’s action may authorise a learner commitment only where D1’s explicit-choice requirement is satisfied through this separately approved D24 delegation. The action remains attributable to the representative and does not prove that the learner preferred, understood, consented to, or personally performed the choice.

A representative action does not create a blanket right to choose any other offer, alter focus, accept a new experience, resume an old experience, migrate content, change curriculum, override policy, alter state, or provide consent for unrelated data use. A representative may not manufacture a choice by silence, default selection, non-response, behavioural inference, or technical continuation.

Where D1 requires an explicit `select-offer`, D24 permits a representative `select-offer` only when the representative-choice authority explicitly covers that precise offer/path/focus action. If no such authority is established, the engine must not treat any representative activity as selection. D24 does not decide whether a particular class of learners or actions must be exclusively learner-controlled; those matters are addressed as deferrals below unless separately established by a later constitutional decision.

## 7. Non-Delegable Authority Rules

D24 establishes the following non-delegable constraints because they follow from the locked constitution: no representative may waive, override, or bypass D1–D23; no representative may expand their own authority; no representative action may be recorded as the learner’s personally performed action; and no representation may create authority over mathematics, content, curriculum, assessment, AI, learner state, historical truth, conflict resolution, or policy activation.

D24 does **not** invent a broader list of actions that are legally or constitutionally non-delegable by category. Whether a particular learner-choice category requires personal learner action, whether a representative may act in a particular age/capacity/institutional context, and whether a learner may revoke or override a representative choice are explicitly deferred to later governance where the current constitution does not safely determine the answer.

## 8. Representative Lifecycle

Representation has a visible, prospective lifecycle. Recognition, effectiveness, action, and historical recording are distinct.

| Lifecycle state | Meaning | Effect |
|---|---|---|
| **Proposed** | A representation claim has been submitted for review. | No representative authority or learner-choice effect. |
| **Recognised** | An authorised actor has approved the claim within defined bounds. | Recognition is recorded; it is not necessarily currently effective. |
| **Effective** | The recognised authority is active for its scope, purpose, action, and period. | A covered representative action may be considered, subject to current conditions. |
| **Active representation** | The effective authority is currently relied upon for a covered action context. | It remains bounded and does not expand through use. |
| **Suspended** | Prospective reliance is paused pending a defined review or condition. | No new consequential representative choice may rely on it. |
| **Expired** | The stated period has ended. | No new reliance; historic actions remain. |
| **Revoked** | Future authority has been withdrawn by an authorised action. | No future reliance; past actions are not silently invalidated. |
| **Superseded** | A later, explicit authority replaces the prior authority prospectively. | Only the new scope applies going forward. |
| **Historically recorded** | The claim and all actions/status changes are preserved as accountable facts. | Recording creates no current authority. |

Authority status changes are prospective. Revocation, expiry, suspension, or supersession must not rewrite historical representative actions, learner choices, commitments, decisions, evidence, events, provenance, or historical learner state. Whether a previously made commitment may be prospectively reviewed or changed requires D16 action and applicable policy; it cannot be assumed from revocation alone.

## 9. Multiple and Conflicting Representative Rules

Multiple representatives may exist only as separate explicit claims with distinct scopes and provenance. Overlapping scope does not create joint authority, precedence, or a tie-breaker. Where two effective claims appear compatible, each action must still identify the acting representative and precise authority basis. Where scopes overlap but conflict, the conflict is a D18 matter.

No precedence may be invented from recency, technical access, institutional position, storage location, previous behaviour, AI recommendation, metadata, title, popularity, confidence, or convenience. A representative who acts first does not thereby become superior. A representative with broader apparent scope does not automatically prevail if the scope or authority is unresolved.

If representatives disagree, authority records are inconsistent, representation status is uncertain, or a learner/representative/institutional claim conflicts with another effective claim, no consequential learner-choice commitment may be created from the conflict. Existing historical actions remain historical. The conflict must be preserved, reviewed, and escalated through D16/D18 where an authorised route exists. The result fails closed unless an explicit authority resolves the exact conflict.

## 10. Representative-Action Provenance Model

A representative action must separately record, where applicable:

1. representative identity/reference;
2. learner identity/reference;
3. data-subject association and data-handling authority under D19–D20, where information is handled;
4. representation authority basis and recognising actor/action;
5. authority scope, purpose, decision/action type, and effective period;
6. the exact action performed and its asserted time;
7. the offer/experience/curriculum context;
8. current policy and version references;
9. learner-choice semantics and whether D1 requires `select-offer`;
10. resulting proposed/approved/recorded commitment, if any;
11. any resulting state effect, which remains subject to D22 and must not be inferred;
12. conflicts, uncertainty, review, revocation/expiry/suspension status; and
13. observable provenance and historical references.

The record must explicitly state that the action was performed by the representative **on behalf of** the learner. It must never be serialised, displayed, or interpreted as though the learner personally performed it. A representative action is not evidence of learner preference, understanding, consent, competence, or state.

## 11. Revocation, Expiry, and Supersession

Revocation, expiry, suspension, and supersession prevent or constrain future reliance according to their explicit scope and effective time. They do not retroactively invalidate the fact that representation was previously recognised or that an action was previously performed under the then-recorded authority. A later action may review a prior commitment prospectively only through D16, D22, D23, and D18 as applicable; D24 provides no automatic rollback.

A revoked, expired, suspended, or superseded representation must not be used for a new choice, resumption, offer acceptance, experience migration, content substitution, state commitment, disclosure, or related action outside any surviving explicit scope. A prior action does not renew authority, and a historical representative action does not prove current authority.

## 12. Historical Protection

D24 must never rewrite, delete, conceal, merge, or retrospectively relabel: historical learner choices; historical representative actions; historical commitments; historical decisions; historical evidence; historical events; historical provenance; historical authority/recognition records; or historical learner state.

Corrections, reviews, revocations, expiries, suspensions, and supersessions are additive, attributable, provenance-linked, time-aware, and prospective. They may govern future reliance and availability, but they do not transform representative action into personal learner action or erase the distinction between the two. D12 controls durable history, D13 controls version/migration history, D16 controls correction/action records, D17 controls interpretation review, and D18 controls consequential conflict.

## 13. Fail-Closed Specification

The system must fail closed for consequential learner-choice representation when representation is missing, expired, revoked, suspended, ambiguous, conflicting, outside scope, outside purpose, outside time, insufficiently evidenced, otherwise unauthorised, or not current under applicable authority/policy.

The safe constrained outcome is: do not infer learner choice; do not create a learner commitment; do not create an offer acceptance; do not resume or continue an experience; do not substitute or migrate content; do not change learner state; do not disclose unrelated information; and do not rewrite history. A constrained/no-offer or non-executable outcome may be produced only if independently permitted by current policy and D1/D9/D23; the absence of representative authority must not itself become a learner decline, deferment, preference, failure, or non-consent claim.

| Unresolved condition | Required outcome |
|---|---|
| Representative or learner association is unproven | No consequential representative action. |
| Authority basis, scope, purpose, action type, effective period, or recognising action is missing | No reliance or scope expansion. |
| Representation is expired, revoked, suspended, or superseded | No new reliance outside any explicitly surviving scope. |
| Multiple claims conflict or records are inconsistent | Preserve the conflict; no inferred precedence; escalate under D16/D18. |
| Data-access authority exists but learner-choice authority does not | Data permission cannot support learner-choice action. |
| Learner-choice authority exists but data-access/disclosure authority does not | Choice authority cannot support unrestricted data use/disclosure. |
| Current experience authority/context is changed or unresolved | D23 controls; no automatic continuation/resumption/substitution/migration. |
| Resulting state commitment is proposed or approved but not separately effective/executed | No current state effect; D22 controls. |

## 14. Relationship to D1–D23

D24 is subordinate to every locked decision and introduces no exception.

| Decision | D24 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | D24 supplies only a possible, separately authorised representative path to an explicit choice. Where required, only a scoped representative `select-offer` may authorise a commitment on behalf of the learner. |
| **D2 — Learning-State Authority** | Representative action never creates learner state, mastery, readiness, misconception, or authoritative learning truth. |
| **D3 — Curriculum Authority** | Curriculum context does not create representation or delegated-choice authority. |
| **D4 — Academic Level & Progression** | Academic level/progression does not establish representation or representative choice. |
| **D5 — Content Authority** | Content/delivery authority is distinct from representation; a representative cannot publish, activate, substitute, or alter content. |
| **D6 — Knowledge Relationships** | Relationships and graph topology do not create representation or choice authority. |
| **D7 — Experience Lifecycle** | Offer, start, interruption, participation, completion, abandonment, and resumption facts do not infer representation, preference, consent, or choice. |
| **D8 — Assessment & Evidence** | Assessment/evidence cannot establish representation or learner preference; representative action is not assessment evidence. |
| **D9 — Decisioning & Policy** | Deterministic policy execution cannot infer representation or create authority; applicable policy must explicitly permit the bounded action. |
| **D10 — Content Publication & Curriculum Activation** | Publication/activation does not create representative authority or learner choice. |
| **D11 — Policy Lifecycle** | Only applicable, effective, authority-scoped policy may govern the action; policy cannot manufacture representation, consent, or identity. |
| **D12 — Durable History & Storage** | Storage preserves representation and actions but never creates authority; history is protected and additive. |
| **D13 — Version/Migration** | Version similarity or migration cannot expand, renew, or transfer representation. |
| **D14 — AI Proposal & Assistance** | AI may propose but cannot recognise representation, infer delegated choice, or perform/authorise a learner choice. |
| **D15 — Authority Delegation & Governance Actor Recognition** | D15 governs recognised actors/delegations. D24 requires a separate, precise learner-representation scope; governance role does not equal representation. |
| **D16 — Governance Action, Review & Escalation** | Recognition, review, approval, recording, effectiveness, execution, correction, and escalation remain distinct. |
| **D17 — Interpretation Review** | Representative action is not interpretation and cannot become an authoritative conclusion. |
| **D18 — Conflict Resolution** | Conflicting representation claims create no authority or precedence; unresolved consequential conflict fails closed. |
| **D19 — Data-Subject Identity, Consent & Information-Access Authority** | Data-subject representation/access/use/disclosure authority remains separate from learner-choice representation. Neither automatically grants the other. |
| **D20 — Privacy, Representation & Data-Subject Rights Authority** | Privacy representation and learner-choice representation are distinct; rights authority cannot silently become choice authority. |
| **D21 — Assessment Source & Evidence Sufficiency** | Source/evidence qualification cannot establish representation, choice, consent, or delegated authority. |
| **D22 — Learner Conclusion & State Commitment** | Representative action is neither learner conclusion nor state; any state commitment remains subject to D22. |
| **D23 — Experience Continuity, Interruption & Resumption** | A representative cannot silently resume, migrate, substitute, override interruption/conflict, or bypass current authority. D23 remains authoritative for continuity. |

## 15. Prohibited Behaviours

15.1. Inferring representation automatically from age, family/parental relationship, institutional affiliation, account ownership, technical access, credentials, prior behaviour, learner silence, or AI recommendation.

15.2. Treating representation as learner identity, learner preference, learner intent, learner consent, learner state, or personally performed learner action.

15.3. Treating a governance role, institutional title, technical privilege, data-access authority, recipient status, storage custody, or institutional possession as learner-choice representation.

15.4. Granting blanket representation without defined learner, purpose, decision type, experience/curriculum context, institution where relevant, time, and action scope.

15.5. Silently delegating authority, expanding delegated authority, renewing authority, substituting a representative, or transferring authority across contexts.

15.6. Treating a representative action in one context as authority to make all learner choices or to act in another context.

15.7. Treating a data-subject/data-access representative as automatically authorised to select an offer, authorise a commitment, make a learner decision, alter state, or resume an experience.

15.8. Treating learner-choice representation as unrestricted authority to access, use, disclose, correct, restrict, delete, or otherwise handle learner data.

15.9. Using a representative action to bypass D1–D23, current policy, current authority, data/right conditions, evidence requirements, conflict rules, or historical protection.

15.10. Treating representative action as learner consent, learner choice outside scope, evidence of preference, or evidence of understanding/competence.

15.11. Treating representative action, interruption, abandonment, completion, technical continuation, or prior action as a state commitment, authoritative conclusion, mastery, readiness, progression, misconception, certification, grading, or assessment result.

15.12. Retrospectively invalidating, rewriting, deleting, concealing, or relabelling historical representative actions, learner choices, commitments, decisions, evidence, events, provenance, or learner state because authority later expired, was revoked, was suspended, or was superseded.

15.13. Resolving competing representatives through recency, technical access, institutional position, storage location, previous behaviour, AI output, metadata, title, confidence, or convenience.

15.14. Implementing authentication, identity proofing, access control, persistence, UI/API, assessment, AI, delivery, migration, or any other functionality from D24.

## 16. Explicit Deferrals

D24 does not decide the following matters:

| Deferred matter | Reason for deferral |
|---|---|
| Legal guardianship, parental authority, capacity, age thresholds, jurisdiction, and statutory representation | D24 must not create legal authority by architectural assertion. |
| Identity proofing, authentication, account ownership, and access-control technology | These are technical/security mechanisms, not representation semantics. |
| Institutional policy implementation or default institutional representation | Institutional status alone cannot create authority; a later governed policy may specify applicable processes. |
| Categories of choice that must always remain exclusively learner-controlled | D24 establishes constitutional constraints but does not invent unsupported category-specific rules. |
| Whether a learner may override, revoke, or ratify a representative choice and the consequences | This requires a separate authority decision where D1–D24 do not determine the answer. |
| Whether every represented choice requires a fresh offer or a fresh learner-facing confirmation | D1 governs explicit choice; exact interaction semantics remain open. |
| Assessment, scoring, mastery, readiness, progression, certification, grading, and misconception | These remain governed by D8, D21, and D22 boundaries; D24 creates no authority. |
| Learner identity, data-subject identity, privacy implementation, disclosure technology, retention, storage, UI/API, AI runtime, delivery runtime, and migration | These are outside D24’s governance scope or remain separately deferred. |
| Specific representatives, institutions, policies, recognition services, or authority registries | D24 defines required semantics but recognises no real actor by assertion. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D24 at this stage.**

If D24 is later approved and a separate controlled implementation phase is authorised, future contracts must preserve distinct records for learner identity/reference, representative identity/reference, data-subject association, authority basis, recognising actor/action, authority scope, purpose, decision/action type, experience/curriculum context, effective period, lifecycle status, representative action, D1 choice semantics, resulting commitment, resulting state effect, provenance, conflict, revocation, expiry, suspension, supersession, and historical references.

Future contracts must explicitly indicate that a representative performed the action on behalf of the learner and must not encode it as a personally performed learner action. This is a future impact analysis only and does not authorise contract, code, repository, schema, or test changes.

## 18. Implementation Freeze

> **No implementation may begin from D24.**
>
> D24 authorises no code, contract change, repository change, schema, migration, persistence, authentication, identity proofing, access control, UI/API, assessment, AI, delivery, storage, commit, D25 work, or Slice 6 work. Any future implementation requires explicit human approval of D24 and a later controlled implementation authorisation that reconciles D1–D24.

## 19. Approval Recommendation

D24 is presented for human architectural review as a narrow delegated-choice boundary. It preserves D1’s requirement for an explicitly authorised choice while allowing a representative action to satisfy that requirement only where a separately recognised, effective, purpose- and scope-bound authority expressly permits it. It does not create legal representation, general learner agency, blanket choice authority, data authority, state authority, or implementation permission.

> **D24 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, authentication, access-control, UI/API, assessment, AI, delivery, D25, or Slice 6 work has occurred.
