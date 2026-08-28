# D48 — Consequence Classification, Risk & Human-Review Threshold Authority

> **D48 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D47 are preserved exactly as approved and locked. D48 authorises no code, contract, repository, schema, migration, persistence, governance tooling, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D49, or Slice 6 work.

## 1. Post-D47 Dependency Analysis

D47 establishes the authority boundary for unknown, ambiguity, uncertainty, confidence, probability, reliability, completeness, sufficiency, support, validation, and epistemic status. It requires these properties to remain purpose-bound and prevents confidence, probability, completeness, or numerical precision from becoming truth or authority.

The governance chain still lacks a general authority boundary for **classifying the consequences of an action or output, determining its risk/sensitivity, deciding when human review is required, and distinguishing material from safe non-material effects**. The current architecture uses material and safe-non-material decision concepts, and D47 refers to consequential use, but no locked decision defines the authority semantics for consequence classification or the thresholds that determine whether an action may proceed, must be reviewed, or must fail closed.

D9 governs deterministic decisioning; D16 governs review/escalation; D31 governs conformance/verification; D32 governs release/effectiveness; D33 governs incidents; D47 governs uncertainty. None specifies how the potential effect on learner choice, learner state, data rights, mathematical truth, safety, history, or external parties is classified and how that classification controls permitted automation.

The single highest-priority unresolved governance boundary is therefore **Consequence Classification, Risk & Human-Review Threshold Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D9 — Decisioning & Policy** | Deterministic policy execution, material/safe outcomes, explanation, and fail-closed behaviour. | Formal classification of consequence/materiality and permissible automation. |
| **D16 — Governance Action, Review & Escalation** | Proposal, review, approval, effectiveness, execution, escalation, and correction are distinct. | Conditions that require review/escalation rather than automatic execution. |
| **D31/D32 — Conformance and Release** | Verification and release are separate from implementation and operational effectiveness. | Risk/consequence criteria for release, change, and runtime action. |
| **D33 — Monitoring, Incident, Safety & Harm Response** | Operational observations, incidents, triage, containment, and escalation are bounded. | Risk classification and review thresholds for potential harm. |
| **D47 — Uncertainty & Epistemic Status** | Confidence/unknown/ambiguity and epistemic limitations are explicit. | How uncertainty combines with effect severity and reversibility without becoming authority. |
| **D1–D8/D19–D30** | Learner choice, evidence, state, data, continuity, delivery, and execution are separated. | Consequence classes governing automation across these boundaries. |

This is the next priority because the engine cannot safely distinguish a conceptless safe response from a material learner-state action, a reversible presentation change from an irreversible disclosure, or a low-risk delivery event from a consequential assessment/state/authority operation. Without D48, implementation may permit automation based on confidence or technical simplicity rather than on the nature, reversibility, scope, and potential impact of the effect.

D48 does not select risk levels, legal thresholds, safety categories, human reviewers, statistical cutoffs, or implementation mechanisms. It defines the governance boundary for classifying effects and requiring appropriately authorised review.

## 2. Purpose

D48 defines the authority semantics for consequence, materiality, risk, sensitivity, reversibility, reach, affected subjects, review requirement, escalation, automation permission, and fail-closed treatment.

> **A low-confidence action is not the only risky action. A high-confidence action can still be consequential. Technical reversibility is not necessarily practical reversibility. Human review is a governance requirement, not a confidence upgrade.**

D48 ensures that automation permission is derived from explicit consequence/risk governance rather than from confidence, provider trust, implementation convenience, or the mere ability to reverse a write.

## 3. Scope

D48 governs classification and review requirements for engine decisions, commands, state effects, data operations, disclosures, content/policy changes, mathematical/assessment claims, adaptations, delivery actions, external exchanges, incidents, releases, migrations, and governance actions.

| Within D48 | Outside D48 |
|---|---|
| Consequence classes, materiality, risk dimensions, reversibility, reach, sensitivity, review, escalation, and automation limits | Risk-scoring algorithms, databases, schemas, queues, UI, APIs, or implementation |
| Relationship among epistemic uncertainty and potential effect | Legal risk, clinical risk, safeguarding standards, regulatory thresholds, or insurance |
| Review/approval triggers and fail-closed rules | Selecting reviewer identities, human staffing, policies, assessments, or content |
| Prospective classification changes and historical protection | Operational monitoring implementation, release tooling, or runtime controls |

D48 creates no risk rating, safety certification, legal determination, learner-state authority, or implementation permission.

## 4. Consequence Model

A **consequence** is a potential or actual effect of an action, decision, output, transformation, disclosure, or omission on a governed subject, record, authority, history, learner, provider, or external party.

**Materiality** describes whether an effect can change a governed fact, right, choice, state, authority, educational claim, data exposure, historical record, policy applicability, or external obligation in a way that requires explicit governance.

A **risk dimension** is a bounded property relevant to potential harm or governance significance, such as severity, likelihood, uncertainty, reversibility, scope, sensitivity, duration, affected population, dependency, or detectability.

A **review threshold** is an explicit governance condition under which a proposal/action cannot be automatically accepted, activated, executed, or treated as effective without the required review/approval.

A **safe non-material outcome** is a constrained outcome that does not create or alter learner choice, consent, evidence, interpretation, conclusion, state, authority, mathematical truth, data rights, historical fact, or consequential external effect. It must remain conceptless, actionless, offerless, and non-mutating where required by the existing contracts.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Consequence** | Potential/actual effect of an operation or omission. | That the effect is authorised. |
| **Materiality** | Significance to governed facts/rights/choice/state/authority/history. | Risk level or permission alone. |
| **Severity** | Magnitude of potential effect if it occurs. | Likelihood or truth. |
| **Likelihood** | Bounded possibility under stated method/context. | Actual occurrence or authority. |
| **Reversibility** | Ability to stop or counteract future effects. | Erasure of historical effect or absence of harm. |
| **Reach** | Number/scope of subjects, records, contexts, or systems affected. | Legitimacy of the action. |
| **Sensitivity** | Degree of privacy, safety, rights, or governance sensitivity. | Legal classification by metadata alone. |
| **Review threshold** | Condition requiring review/escalation/fail-closed treatment. | Review approval or confidence upgrade. |
| **Automation class** | Explicitly permitted level of automatic action. | Authority beyond scope. |

## 5. Consequence Classification

Every consequential operation must identify its intended effect, affected subject/record/context, purpose, scope, materiality, risk dimensions, reversibility, sensitivity, uncertainty, authority, review requirement, and historical impact. Classification must be performed before the operation is treated as authorised or safe.

Consequence classification is purpose-bound and may differ for the same operation under different contexts. A display-only representation may be non-material for one purpose but material if it changes a learner-facing claim, hides uncertainty, exposes sensitive context, or drives a downstream state action.

| Provisional class | Meaning | Default governance treatment |
|---|---|---|
| **Non-material** | No governed fact, right, choice, state, authority, history, or consequential exposure changes. | May proceed only within explicit safe boundaries. |
| **Material** | A governed fact, right, choice, state, authority, claim, record, or exposure may change. | Requires applicable authority and policy; no automatic assumption of permission. |
| **High-consequence** | Potentially severe, broad, sensitive, durable, difficult-to-reverse, or authority-changing effect. | Requires explicit review/approval and may require escalation. |
| **Unclassified** | Consequence, materiality, or risk cannot be established. | Fail closed for consequential use. |
| **Contested** | Material disagreement exists about classification or effect. | Preserve disagreement; no inferred lower-risk class. |

These labels are governance concepts only. D48 does not assign any particular operation to a class without future purpose-specific authority.

## 6. Risk Dimensions

Risk must not be reduced to one confidence score. At minimum, a future classification must consider the nature of the effect, potential severity, uncertainty, reversibility, duration, reach, sensitivity, affected subjects, dependency on unresolved authority, and ability to detect/correct the effect where relevant.

A low-likelihood severe effect may require review. A highly likely minor effect may remain non-material only if no governed boundary is affected. A technically reversible effect may still be material if it causes disclosure, learner distress, lost opportunity, historical confusion, or downstream propagation before reversal.

Risk dimensions are descriptive inputs to governance and do not independently authorise action.

## 7. Human Review and Escalation

Human review is distinct from human presence, operational acknowledgement, approval of a related action, source reputation, authentication, or confidence. A reviewer must be recognised for the exact subject and scope under D15/D16; a review must state its basis, limitations, decision, effective period, and provenance.

Review may be required because an effect is material, high-consequence, sensitive, irreversible, broad, uncertain, disputed, cross-context, externally consequential, state-changing, data-right affecting, or constitutionally significant. D48 does not define universal thresholds; it requires them to be explicit before automation is permitted.

No emergency or operational pressure may suspend D1–D47. D33 may govern containment where applicable, but containment is not a blanket permission to create authority, disclose data, rewrite history, or make learner-state changes.

## 8. Automation Boundary

Automation permission must be derived from an explicit consequence class and effective policy, not merely from deterministic computation, confidence, successful testing, reversibility, or operational familiarity.

| Action property | Required boundary |
|---|---|
| **Non-material and fully within safe contract limits** | May be automatable if policy and conformance permit. |
| **Material but reversible** | Requires explicit authority; review requirements remain purpose-specific. |
| **State-, choice-, consent-, rights-, authority-, or history-affecting** | Cannot be assumed automatable; applicable D1/D19/D20/D22/D27/D30 authority is required. |
| **High-consequence, sensitive, broad, or difficult to reverse** | Requires explicit review/approval and escalation as governed. |
| **Unclassified, contested, or materially uncertain** | Fail closed for consequential effect. |

Technical automation cannot make a decision non-material. Human review cannot make an unauthorised action authorised unless the reviewer has the relevant authority and the action satisfies all other locked decisions.

## 9. Boundary Relationships

D48 is cross-cutting and must not collapse consequence classification into any other authority.

| Boundary | D48 constraint |
|---|---|
| **Learner choice/consent** | Consequence or risk classification cannot create or infer explicit choice. |
| **Evidence/assessment/state** | Materiality cannot turn observation, confidence, or sufficiency into learner truth. |
| **Data/privacy/representation** | Low operational risk cannot override data-subject rights or disclosure authority. |
| **Mathematical truth/context/source** | Low confidence or low impact cannot make an unresolved claim true. |
| **Policy/decisioning** | Policy must explicitly govern classification/use; no implicit precedence. |
| **Delivery/adaptation** | Delivery convenience cannot make a material learner-facing claim safe. |
| **Execution/history** | Reversibility cannot permit historical rewrite or unrecorded effect. |
| **AI/provider** | Confidence/trust cannot lower consequence class or bypass review. |
| **Incident/safety** | Triage/containment authority remains bounded by D33 and all constitutional constraints. |

## 10. Lifecycle and Change

The lifecycle is:

> **operation proposal → effect identification → consequence/risk classification → authority and review determination → policy-permitted acceptance → execution → effect verification → monitoring → correction/rollback/reconciliation → historical record**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | Possible operation/effect is described. | No permission. |
| **Classification** | Consequence/materiality/risk dimensions are stated. | Not approval or truth. |
| **Review determination** | Required reviewer/escalation/fail-closed path is identified. | Not completion of review. |
| **Acceptance** | Policy-permitted approval is recorded. | Not execution/effectiveness. |
| **Execution/effect** | Operation and actual effect are recorded separately. | Success is not authority. |
| **Correction/rollback** | Future effect is constrained or counteracted. | No historical erasure. |

Classification changes are prospective unless a separate authority governs re-evaluation. Historical actions retain the classification and review context applicable when they occurred.

## 11. Conflict and Fail-Closed Rules

Consequence conflicts may concern materiality, severity, likelihood, reversibility, reach, sensitivity, affected subjects, uncertainty, authority, policy, data rights, learner choice, state, mathematical claims, external effects, history, incidents, or implementation scope. Conflict creates no permission to choose the lower-risk interpretation.

No precedence may be inferred from confidence, deterministic computation, technical reversibility, successful tests, provider status, source reputation, operational pressure, cost, deadline, frequency, or prior implementation.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Consequence/effect is not identified | No consequential operation. |
| Materiality/risk class is missing or contested | Treat as consequential/unclassified; require review or fail closed. |
| Required review authority is unclear | No acceptance, activation, execution, or effectiveness. |
| Effect is state-, choice-, rights-, authority-, or history-affecting | Apply the governing decision; no lower-risk shortcut. |
| High impact combines with uncertainty or provenance gap | Fail closed or escalate under explicit authority. |
| Technical rollback exists but practical harm/history impact is unresolved | Do not classify as safe solely due to rollback. |
| Partial/unknown execution or effect | Do not assert safe completion; reconcile under D30. |
| Incident/emergency pressure conflicts with constitution | Preserve constraints; apply only authorised containment. |

Fail-closed behaviour must not invent a lower consequence class, review completion, authority, consent, learner choice, truth, state, or historical absence.

## 12. Historical Protection

D48 must never rewrite, delete, conceal, or retroactively relabel an operation’s proposed effect, classification, risk, review requirement, approval, execution, effect, incident, correction, rollback, learner choice, data action, evidence, state, policy, provider exchange, or provenance.

A later reclassification, review, incident finding, model change, or risk discovery affects future governance and prospective correction only through explicit authority. It cannot make a historical action, risk assessment, effect, or decision not have occurred.

## 13. Relationship to D1–D47

D48 is subordinate to every locked decision and creates no exception.

| Decision family | D48 dependency and constraint |
|---|---|
| **D1–D8** | Consequence class cannot create learner choice, mathematical/content authority, assessment, or state. |
| **D9–D13** | Material/safe decisioning, policy, history, version, and migration require explicit consequence treatment. |
| **D14–D18** | AI/provider/actor/review/conflict authority cannot be bypassed by risk labels. |
| **D19–D20** | Low risk cannot override data-subject rights, privacy, representation, consent, or disclosure boundaries. |
| **D21–D22** | Evidence/conclusion/state effects remain subject to their own authority regardless of confidence/risk score. |
| **D23–D25** | Continuity, delegated choice, and policy compatibility cannot be downgraded by convenience. |
| **D26–D30** | Interpretation, state, adaptation, delivery, commands, events, and effects require explicit consequence treatment. |
| **D31–D32** | Verification/release cannot establish an action as safe or authorised solely by conformance. |
| **D33–D34** | Incident/data protection actions require bounded risk and rights treatment; emergency pressure is not a constitutional exception. |
| **D35–D37** | Identity, context, and provider operations cannot lower cross-boundary consequence or review requirements. |
| **D38–D39** | Constitutional integrity and implementation scope control classification and change; neither is inferred from risk scores. |
| **D40–D42** | Mathematical/source/context operations remain distinct from consequence authority. |
| **D43–D45** | Outcome claims, learner context, linkage, and merge effects require their own authority regardless of classification. |
| **D46** | Provenance records classification basis and transformations; completeness does not make a risk judgment correct. |
| **D47** | Uncertainty informs risk but does not become authority; high confidence does not make a consequential effect safe. |

## 14. Prohibited Behaviours

14.1. Treating a confidence score, deterministic computation, successful test, technical reversibility, provider trust, or operational familiarity as proof that an action is non-material or safe.

14.2. Treating unknown, ambiguous, disputed, or incomplete consequence information as low risk, harmless, declined, or safe by default.

14.3. Using a low-risk label to bypass learner choice, consent, data rights, representation, evidence, assessment, state, mathematical authority, policy, review, history, or incident constraints.

14.4. Treating human presence, acknowledgement, authentication, or review of a related matter as the required authority or approval for a consequential action.

14.5. Silently lowering a consequence class because an action is reversible, internal, automated, common, urgent, inexpensive, or technically contained.

14.6. Treating a material or high-consequence operation as safe non-material because it changes only metadata, wording, flags, links, status, or derived records when those changes affect governed use.

14.7. Combining incomparable risk/confidence values or choosing the most favourable classification without explicit purpose-specific authority.

14.8. Allowing AI, provider, client, policy engine, validator, event system, command handler, deployment, or implementation to self-classify its own operation as safe or review-exempt.

14.9. Treating risk classification as permission, review as truth, approval as execution, execution as effect, rollback as historical erasure, or monitoring as authority.

14.10. Rewriting historical classifications, review requirements, effects, incidents, state, choices, data actions, decisions, or provenance after reclassification or harm discovery.

14.11. Implementing consequence classification, risk scoring, review thresholds, persistence, AI, assessment, UI/API, delivery, or any other functionality from D48.

## 15. Explicit Deferrals

D48 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific consequence taxonomy, risk levels, scoring, thresholds, formulas, likelihood models, and review triggers | These require purpose- and domain-specific governance. |
| Who may classify, review, approve, escalate, or override a classification | D15/D16 require explicit recognition; D48 names none. |
| Legal, clinical, safeguarding, security, financial, accreditation, regulatory, or insurance risk standards | D48 creates no external authority. |
| Exact definitions of material/safe-non-material for each engine capability | These require future contract/policy/slice decisions. |
| Emergency, incident, release, rollback, migration, data-right, assessment, AI, provider, and learner-state procedures | D1–D47 remain controlling; D48 adds no operational procedure. |
| Risk tooling, thresholds, human staffing, interfaces, storage, telemetry, and implementation | D48 is implementation-independent. |
| Slice 6 scope and implementation authorisation | D48 is a governance boundary, not implementation approval. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D48 at this stage.**

If D48 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for effect, affected subject/record/context, materiality, consequence class, risk dimensions, uncertainty, sensitivity, reversibility, reach, review requirement, reviewer authority, escalation, automation permission, acceptance, execution, actual effect, correction, rollback, and historical applicability.

Future contracts must not encode confidence as safety, reversibility as non-materiality, review presence as approval, approval as execution, or risk classification as authority. They must preserve unknown/contested/unclassified status, purpose/scope, provenance, historical context, and fail-closed outcomes. This is impact analysis only and does not authorise contract, code, schema, test, persistence, telemetry, policy, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin on the basis of D48.**
>
> D48 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D49, or Slice 6 work. Any future implementation requires explicit human approval of D48 and a separate controlled implementation authorisation for an exact scope.

## 18. Approval Recommendation

D48 is presented for human architectural review as the consequence and review-threshold boundary required after the complete D1–D47 chain. It protects the distinction between uncertainty and risk, risk and authority, materiality and permission, review and approval, approval and execution, and reversibility and historical protection.

> **D48 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D49, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
