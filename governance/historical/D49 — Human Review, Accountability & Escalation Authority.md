# D49 — Human Review, Accountability & Escalation Authority

> **D49 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D48 are preserved exactly as approved and locked. D49 authorises no code, contract, repository, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D50, or Slice 6 work.

## 1. Post-D48 Dependency Analysis

D48 establishes the authority boundary for consequence, materiality, severity, likelihood, sensitivity, reach, reversibility, review thresholds, automation permission, acceptance, execution, and actual effect. It requires material, high-consequence, sensitive, disputed, or unclassified operations to receive the applicable review, escalation, or fail-closed treatment.

D16 already distinguishes proposal, review, approval, effectiveness, execution, escalation, and correction. D15 establishes that authority must be recognised and bounded. However, the chain does not yet define **who may perform a consequential review, what reviewer competence and independence mean for a specific purpose, how reviewer conflicts and accountability are handled, how escalation receives authority, how disagreement is recorded, or how a human review is prevented from becoming an unbounded override**.

The single highest-priority unresolved governance boundary is therefore **Human Review, Accountability & Escalation Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D15 — Delegation & Governance Actor Recognition** | Authority, delegation, recognition, action, and revocation are distinct. | Recognition and scope of a reviewer/approver for a particular consequential subject. |
| **D16 — Governance Action, Review & Escalation** | Proposal, review, approval, recording, effectiveness, execution, escalation, and correction are separate. | Reviewer qualifications, independence, accountability, disagreement, and escalation authority. |
| **D18 — Cross-Domain Conflict & Exception Resolution** | Conflict creates no authority and unresolved consequential conflict fails closed. | Human disagreement and escalation must be governed without inferred precedence or constitutional override. |
| **D31/D32 — Conformance and Release** | Verification/release are distinct from implementation and effectiveness. | Human sign-off authority and accountable release/review ownership. |
| **D33 — Incident, Safety & Harm Response** | Triage, containment, escalation, correction, and closure are bounded. | Qualified human safety/incident review and accountability. |
| **D48 — Consequence/Risk/Review Thresholds** | Consequence class determines a required governance path, not permission. | The authorised human actor who may satisfy that path. |

This is the next priority because a review threshold without a governed reviewer can become ceremonial. Any authenticated person, role label, operator, client, AI-assisted reviewer, provider, or technically available approver could otherwise be treated as competent to authorise a state change, data disclosure, policy activation, release, incident response, learner-facing claim, or mathematical/content action. Conversely, a valid reviewer could be treated as having unlimited authority outside the exact scope for which they were recognised.

D49 does not select reviewers, professions, qualifications, legal standards, staffing models, approval workflows, or escalation technology. It defines the authority boundary for recognising and holding accountable the human actor who reviews or escalates a consequential matter.

## 2. Purpose

D49 defines the authority semantics for human reviewer recognition, competence, scope, independence, conflict of interest, accountability, review basis, dissent, escalation, approval authority, recusal, substitution, revocation, and post-review correction.

> **Human involvement is not human authority. A review is not approval. Approval is not an unrestricted override. A recognised reviewer is authoritative only within the exact subject, purpose, scope, time, and action for which recognition exists.**

D49 ensures that human review is substantive, attributable, bounded, explainable, prospective, and subordinate to D1–D48.

## 3. Scope

D49 governs human review and escalation authority for learner, data, mathematical, content, curriculum, policy, assessment, evidence, state, delivery, execution, release, incident, provider, provenance, risk, and governance actions.

| Within D49 | Outside D49 |
|---|---|
| Reviewer/approver recognition, scope, competence, independence, conflicts, accountability, dissent, escalation, and revocation | Selecting actual people, professions, credentials, institutions, legal standards, HR systems, or workflows |
| Distinction between human presence, review, approval, escalation, and execution | Review tooling, persistence, authentication, UI/API, queues, databases, or implementation |
| Purpose-bound review decisions and historical protection | Mathematical truth, assessment, curriculum, content, policy, AI, learner state, or delivery authority |
| Fail-closed treatment of unqualified, conflicted, unavailable, or disputed review | Clinical, legal, safeguarding, accreditation, or regulatory certification |

D49 creates no reviewer, approver, professional, institutional, legal, or emergency authority.

## 4. Human Review Authority Model

A **reviewer** is a human actor explicitly recognised to examine a named subject, purpose, scope, and consequence class. Reviewer recognition must be distinct from authentication, employment, title, access, expertise claim, prior participation, or system role.

An **approver** is a human actor explicitly authorised to accept a named proposal/action for a named scope. A reviewer may or may not be an approver; review completion does not imply approval.

An **escalation authority** is a recognised actor or body permitted to receive, adjudicate, redirect, or determine the next governed path for a named conflict, risk, or unresolved matter. Escalation does not itself create permission to act.

**Accountability** identifies the actor responsible for the review/approval action and its stated basis, limitations, dissent, and effective period. Accountability does not make that actor liable for facts outside their authority or convert a review into truth.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Human presence** | A person is involved or observes an operation. | Review, competence, or authority. |
| **Reviewer recognition** | Explicit authorisation to review a named subject/purpose/scope. | Universal expertise or approval. |
| **Review** | Substantive examination against stated basis. | Approval, execution, or truth. |
| **Approver recognition** | Explicit authority to accept a named action/scope. | Permission outside scope or constitutional override. |
| **Escalation** | Movement to a recognised authority/path for unresolved matter. | Resolution or action permission. |
| **Accountability** | Attribution of review/approval reasoning and limits. | Retrospective rewriting or universal responsibility. |
| **Recusal** | Reviewer cannot or will not act due to conflict/unavailability. | Rejection of the underlying claim. |
| **Dissent** | Recorded disagreement with review/approval. | Automatic precedence or veto outside scope. |
| **Revocation** | Future recognition is ended or narrowed. | Historical erasure of prior review. |

## 5. Recognition, Competence, and Scope

Reviewer recognition must identify the actor, subject matter, purpose, scope, action types, consequence classes, context, effective period, authority basis, limitations, conflict requirements, and revocation conditions. D49 does not define the evidence required to recognise competence; that remains future purpose-specific governance.

Competence is not a global property. A reviewer recognised for data-rights review is not thereby recognised for mathematical claim review, learner-state commitment, safeguarding action, policy activation, release, or assessment interpretation. A reviewer may require multiple distinct recognitions for different actions.

Recognition may be proposed, under review, active, restricted, suspended, revoked, expired, contested, or unresolved. Unresolved recognition cannot satisfy a consequential review requirement.

## 6. Review Requirements

A substantive review must identify the proposal/action, affected subjects/records/contexts, purpose, consequence/risk classification, evidence and provenance, applicable decisions/policies, uncertainty, conflicts, alternatives considered, limitations, decision/recommendation, reviewer identity and recognition, time, effective period, dissent/recusal, and required follow-up.

The reviewer must not silently repair missing authority, evidence, context, provenance, consent, learner choice, mathematical basis, policy applicability, or identity. Where a required dependency is unresolved, the reviewer must record the unresolved condition and use the fail-closed or escalation path.

| Review result | Permitted meaning |
|---|---|
| **Reviewed — no approval** | Matter was examined; no action permission follows. |
| **Recommended** | Reviewer proposes a path; an approver is still required where applicable. |
| **Approved within scope** | Recognised approver accepts exact action/purpose/scope/effective period. |
| **Rejected** | Proposal is not accepted for stated scope/time. |
| **Deferred** | More evidence/authority/review is required. |
| **Escalated** | Matter is sent to recognised escalation authority; no automatic resolution. |
| **Contested/dissenting** | Disagreement is preserved; D18 applies. |
| **Recused** | Reviewer did not act due to conflict/unavailability. |

## 7. Independence and Conflicts

A reviewer’s independence, conflict, dual role, personal interest, dependency, prior action, or delegated relationship may affect whether they may review or approve a matter. D49 does not define universal independence criteria; it requires them to be explicit for each authority purpose.

A reviewer cannot erase a conflict by declaring confidence, urgency, expertise, authentication, or institutional status. Where conflict is material and no authorised resolution exists, the reviewer must recuse or escalate. A substitute reviewer must have independent recognition; substitution does not transfer unlimited authority.

## 8. Approval and Override Boundary

An approval is valid only when the approver is recognised for the exact action, purpose, subject/context, consequence class, policy, version, and period. Approval cannot override D1–D48, an explicit constitutional constraint, unresolved identity/data rights, unresolved mathematical context, learner choice, historical truth, or a fail-closed rule.

There is no general emergency override. D33 may govern bounded containment or escalation, but containment is not blanket authority to change learner state, disclose data, rewrite history, activate policy/content, or bypass learner choice.

A reviewer may recommend an exception only through an explicit governed action under D16/D18/D38/D39; a recommendation does not suspend constitutional constraints.

## 9. Escalation and Disagreement

Escalation is required where authority, evidence, context, risk, conflict, reviewer competence, independence, data rights, learner choice, mathematical claim, policy applicability, or historical impact remains unresolved. Escalation must identify the unresolved matter, prior review, competing positions, affected scope, urgency, potential consequences, and requested decision.

Escalation authority may decide the next governed path only within its recognition. It cannot resolve matters by recency, title, rank, majority, confidence, urgency, storage, or client instruction. If no recognised escalation authority exists, the matter remains unresolved and consequential action fails closed.

## 10. AI, Provider, and Technical Assistance Boundary

D14/D37 remain controlling. AI or provider systems may assist with retrieval, summarisation, comparison, or proposal preparation, but cannot act as the recognised human reviewer or approver. A human who accepts AI output remains responsible for the bounded review but cannot treat AI confidence, citation, or recommendation as the review itself.

Technical access, workflow completion, electronic signature, click-through, role label, queue assignment, or audit entry does not establish substantive review or authority. A system may record a human action only when the recognised actor actually performs it within scope.

## 11. Relationship to Learner, Data, Mathematics, Policy, and Operations

D1–D48 remain controlling. Human review cannot turn preference into choice, context into diagnosis, evidence into state, a source into mathematical truth, a policy relationship into equivalence, a delivery event into learning, a technical event into authority, or a risk label into permission.

A reviewer may review a learner-facing claim, assessment interpretation, state commitment, data disclosure, record merge, mathematical claim, policy activation, release, or incident action only if recognised for that exact matter. Review authority in one domain does not transfer to another.

## 12. Lifecycle and Accountability

The lifecycle is:

> **review proposal → reviewer-recognition check → conflict/recusal check → evidence/context/risk review → recommendation/approval/rejection/defer/escalation → effectiveness → execution → outcome verification → correction/review → recognition revocation or expiry → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | Matter is submitted for human attention. | No authority or permission. |
| **Recognition check** | Reviewer/approver scope is verified. | Authentication is not recognition. |
| **Review** | Substantive examination is performed. | Review is not approval. |
| **Decision** | Recommendation/approval/rejection/defer/escalation is recorded. | Decision is not execution/effect. |
| **Effectiveness** | Decision becomes applicable for stated scope/time. | Not historical rewrite. |
| **Execution** | Operation occurs under D30. | Technical success is not authority. |
| **Correction** | Future action/status is corrected or narrowed. | Prior review/action remains historical fact. |

## 13. Conflict and Fail-Closed Rules

Review conflicts may concern actor identity, recognition, competence, independence, recusal, evidence, provenance, uncertainty, consequence, data rights, learner choice, mathematical context, policy, provider, implementation, incident, or history. Conflict creates no reviewer precedence or approval.

No precedence may be inferred from seniority, title, institutional status, authentication strength, number of reviewers, majority, recency, AI confidence, provider trust, urgency, operational ownership, or cost.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Reviewer/approver identity or recognition is unclear | No consequential review satisfaction or approval. |
| Reviewer scope/competence does not cover subject/action | Review cannot authorise the action; escalate or fail closed. |
| Material conflict or lack of independence | Recuse or escalate; no self-approval. |
| Review is incomplete, ceremonial, or lacks basis | Treat as unreviewed for consequential purposes. |
| Review and approval disagree | Preserve both; apply D16/D18; no inferred winner. |
| Required escalation authority is unavailable/unclear | Consequential action remains blocked. |
| Human approves an action conflicting with D1–D48 | Approval is ineffective to the extent of conflict; do not execute. |
| Technical workflow records approval without substantive action | Do not treat record as review/approval authority. |

Fail-closed behaviour must not invent reviewer authority, competence, approval, exception, consent, learner choice, mathematical truth, evidence, state, or historical absence.

## 14. Historical Protection

D49 must never rewrite, delete, conceal, or retroactively relabel reviewer recognition, review, dissent, recusal, escalation, approval, rejection, deferral, execution, effect, incident, data action, learner choice, evidence, state, mathematical claim, policy, release, or provenance.

A later recognition revocation, reviewer correction, conflict discovery, or escalation outcome affects future authority and reliance only through explicit governance. It cannot make a historical review, approval, action, or accountability record not have occurred.

## 15. Relationship to D1–D48

D49 is subordinate to every locked decision and creates no exception.

| Decision family | D49 dependency and constraint |
|---|---|
| **D1–D8** | Human review cannot create learner choice, mathematical/content authority, assessment, or state. |
| **D9–D13** | Review/approval cannot bypass policy, history, version, equivalence, or migration constraints. |
| **D14–D18** | AI/provider/actor/review/conflict authority remains explicit, scoped, and non-overriding. |
| **D19–D20** | Human involvement cannot override privacy, representation, consent, or data-subject rights. |
| **D21–D22** | Review cannot turn evidence into conclusions/state without the required authority. |
| **D23–D25** | Continuity, delegated choice, and policy relationships remain separate from human approval. |
| **D26–D30** | Interpretation, state, adaptation, delivery, command, event, and execution remain distinct. |
| **D31–D32** | Human sign-off does not replace conformance, release, deployment, or operational effectiveness. |
| **D33–D34** | Safety/incident/data actions require bounded recognition and cannot rewrite history. |
| **D35–D37** | Authentication, context, provider, and external integration do not establish reviewer authority. |
| **D38–D39** | Constitutional integrity and exact implementation scope bind every reviewer/approver. |
| **D40–D42** | Mathematical/source/context authority cannot be created by human confidence or title. |
| **D43–D45** | Outcome, learner-context, and record-linkage matters require domain-specific recognition. |
| **D46–D47** | Provenance and epistemic status support review but do not create reviewer authority. |
| **D48** | Consequence/review classification determines the path; human review does not lower risk or create permission automatically. |

## 16. Prohibited Behaviours

16.1. Treating human presence, authentication, role labels, seniority, title, institutional status, workflow completion, electronic signature, or audit entry as substantive review or authority.

16.2. Treating review as approval, approval as effectiveness, effectiveness as execution, execution as effect, or effect as historical truth.

16.3. Allowing a reviewer recognised for one purpose, domain, consequence class, subject, context, or period to act outside that scope.

16.4. Allowing a reviewer to approve their own conflict, expand their own authority, bypass D1–D48, or convert urgency into an exception.

16.5. Treating AI/provider recommendations, confidence, citations, summaries, or technical assistance as human review or approval.

16.6. Resolving reviewer disagreement through seniority, majority, recency, confidence, provider trust, urgency, operational ownership, or convenience.

16.7. Treating a reviewer’s expertise or approval as mathematical truth, content/curriculum authority, assessment, learner consent, evidence, state, diagnosis, outcome, or policy equivalence.

16.8. Treating review of a related matter as review of the exact subject, action, purpose, consequence class, version, context, or period.

16.9. Recording approval when the reviewer was unavailable, recused, unrecognised, uninformed, or did not substantively perform the review.

16.10. Rewriting historical reviews, dissent, recusal, escalation, approvals, actions, effects, incidents, state, choices, or provenance after revocation or correction.

16.11. Implementing human-review, reviewer-recognition, escalation, approval, persistence, workflow, AI, assessment, UI/API, or any other functionality from D49.

## 17. Explicit Deferrals

D49 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific reviewers, professions, credentials, institutions, bodies, staffing, or appointment methods | D49 defines recognition semantics without selecting authorities. |
| Competence, independence, conflict, recusal, and accountability criteria for each domain | These require purpose- and domain-specific governance. |
| Exact review forms, evidence requirements, thresholds, escalation paths, quorum/majority rules, and appeal processes | These require future authority-specific decisions. |
| Legal, clinical, safeguarding, regulatory, accreditation, examination, or professional standards | D49 creates no external authority. |
| Review tooling, authentication, workflow, persistence, signatures, notifications, queues, UI/API, or implementation | D49 is implementation-independent. |
| Mathematical, assessment, content, curriculum, policy, AI, learner-state, data, provider, delivery, and incident authority | D1–D48 remain controlling; review creates none. |
| Slice 6 scope and implementation authorisation | D49 is a governance boundary, not implementation approval. |

## 18. Required Contract Changes, if Any

**No contract changes are required or authorised by D49 at this stage.**

If D49 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for reviewer identity, recognition, competence scope, purpose, subject, context, consequence class, independence, conflict, recusal, review basis, evidence, uncertainty, recommendation, approval, dissent, escalation, accountability, effective period, revocation, execution, outcome, and historical applicability.

Future contracts must not encode authentication as recognition, workflow completion as review, review as approval, approval as override, human confidence as truth, or role title as competence. They must preserve review/approval/effect/execution distinctions, record dissent and unresolved conditions, and fail closed when reviewer authority, scope, competence, independence, evidence, risk, policy, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, workflow, or repository changes.

## 19. Implementation Freeze

> **No implementation may begin on the basis of D49.**
>
> D49 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, reviewer-recognition system, approval workflow, escalation system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D50, or Slice 6 work. Any future implementation requires explicit human approval of D49 and a separate controlled implementation authorisation for an exact scope.

## 20. Approval Recommendation

D49 is presented for human architectural review as the human-review and accountability boundary required after the complete D1–D48 chain. It protects the distinction between human presence, recognition, competence, review, recommendation, approval, escalation, effectiveness, execution, effect, accountability, dissent, and historical truth.

> **D49 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, reviewer-recognition system, approval workflow, escalation system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D50, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
