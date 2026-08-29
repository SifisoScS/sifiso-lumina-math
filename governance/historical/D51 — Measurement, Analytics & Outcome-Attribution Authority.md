# D51 — Measurement, Analytics & Outcome-Attribution Authority

> **D51 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D50 are preserved exactly as approved and locked. D51 authorises no code, contract, repository, schema, migration, persistence, governance tooling, reviewer-recognition system, approval workflow, escalation system, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D52, or Slice 6 work.

## 1. Post-D50 Dependency Analysis

D50 establishes the authority boundary for transparency, explanation, disclosure, acknowledgement, contest, correction, appeal/escalation, review, response, remedy, decision, execution, and historical truth. It requires explanations and disclosures to be purpose-bound, privacy-preserving, provenance-linked, and faithful to the underlying record.

The governance chain still lacks a distinct boundary for **measurement, analytics, indicators, aggregation, comparative reporting, causal attribution, and claims about learner or system outcomes**. D43 separates intended outcomes from achieved outcomes; D47 governs uncertainty; D48 governs consequence and review thresholds; D50 governs communication and contestability. None defines when a measured signal may be treated as an observation, an indicator, an outcome claim, an attribution, or a basis for a consequential action.

The single highest-priority unresolved governance boundary is therefore **Measurement, Analytics & Outcome-Attribution Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D2/D8/D21/D26/D27/D43 — Evidence, Assessment, Interpretation, State & Outcomes** | Observations, evidence, interpretations, conclusions, state, intent, and outcomes are distinct. | How aggregate measures and analytics relate to those categories without collapsing them. |
| **D31/D46/D47 — Verification, Provenance & Epistemic Status** | Traceability, lineage, uncertainty, confidence, completeness, and sufficiency are explicit. | Authority and limitations of metrics, derived indicators, aggregation, and attribution. |
| **D48 — Consequence/Risk/Review Thresholds** | Consequence and review requirements are separate from confidence and permission. | Whether a metric or attribution may trigger a consequential operation. |
| **D50 — Transparency/Explanation/Contestability** | Communication, disclosure, explanation, and contest are bounded. | What metrics may be disclosed and how their meaning/limitations are communicated. |
| **D19/D20/D34/D36/D45 — Data, Lifecycle, Context & Linkage** | Data rights, retention, contexts, and record relationships are explicit. | Safe aggregation, cohort boundaries, de-identification, and attribution across records. |
| **D28/D29 — Adaptation and Delivery** | Responses/delivery do not create learning or state. | Metrics must not use participation/interaction as automatic learning or outcome proof. |

This is the next priority because analytics can silently become a second assessment or policy layer. A completion rate, interaction count, response latency, usage frequency, cohort comparison, model score, or outcome correlation may be useful for monitoring while remaining insufficient to claim learning, mastery, readiness, misconception, progression, or causation. Without D51, aggregate measures could also expose sensitive learners, mix incompatible contexts, or drive adaptation, state, policy, release, or incident actions without explicit authority.

D51 does not select metrics, statistical methods, causal models, cohort definitions, dashboards, success criteria, or evaluation standards. It defines the authority boundary for measuring and attributing outcomes without turning metrics into unapproved truth.

## 2. Purpose

D51 defines the authority semantics for measures, observations, indicators, aggregates, denominators, cohorts, baselines, comparisons, trends, forecasts, correlations, causal attributions, system outcomes, learner outcomes, evaluation claims, and analytic limitations.

> **A metric is not an observation of every underlying fact. Correlation is not causation. Engagement is not learning. Aggregate performance is not individual learner truth.**

D51 ensures that analytics remain purpose-bound, provenance-rich, uncertainty-aware, privacy-preserving, contestable, and unable to create assessment, learner state, authority, or mathematical truth merely through aggregation or visualisation.

## 3. Scope

D51 governs measurements and analytic claims associated with learner activity, experience lifecycle, delivery, evidence, assessment, state, outcomes, content, curriculum, policy, providers, incidents, data operations, releases, and system performance.

| Within D51 | Outside D51 |
|---|---|
| Metric identity, definitions, populations, denominators, aggregation, comparison, attribution, uncertainty, validity, and use | Analytics tools, databases, dashboards, schemas, persistence, APIs, or implementation |
| Distinction between activity, engagement, exposure, evidence, learning, outcome, and causal effect | Selecting statistical models, success thresholds, assessment rubrics, or business KPIs |
| Privacy, context, lineage, subgroup, and historical boundaries of measurement | Mathematical truth, curriculum, policy, AI, learner state, delivery, or human-review authority |
| Prospective metric changes, correction, contest, and historical protection | Legal reporting, accreditation, clinical evaluation, or regulatory certification |

D51 creates no metric, outcome, causal claim, assessment standard, learner state, or implementation permission.

## 4. Measurement Model

A **measure** is a defined method for representing a property, event, count, rate, duration, distribution, status, or other quantity for a named purpose and population.

An **observation** is a bounded recorded fact about an event or value under D2/D8/D21/D46. A measure may summarise observations but does not replace them.

An **indicator** is a derived signal intended to indicate a condition, trend, threshold, or attention need. It is not automatically the condition it indicates.

An **aggregate** combines or summarises multiple records, subjects, events, or observations. Aggregation can conceal variation, uncertainty, conflict, missingness, and subgroup effects.

An **outcome claim** is a claim about a result attributable to a learner, experience, policy, content, provider, system, or intervention. Outcome claims require explicit purpose-specific authority and must distinguish association from causation.

A **causal attribution** is a bounded claim that an identified factor contributed to an outcome under stated assumptions, design, comparison, and uncertainty. It is not established by correlation, temporal order, or model output alone.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Measure** | Defined representation of a property/event/value. | Correctness or authority beyond definition. |
| **Observation** | Bounded recorded fact. | Learning, state, or cause. |
| **Indicator** | Derived signal for attention or possible condition. | The condition itself or permission. |
| **Aggregate** | Summary over records/subjects/events. | Individual learner truth. |
| **Cohort** | Defined population for a purpose. | Equivalent learners or universal comparison. |
| **Baseline** | Reference value/period for comparison. | Normative standard or causal counterfactual. |
| **Trend** | Pattern over time under stated method. | Cause or future certainty. |
| **Correlation** | Statistical association under method/scope. | Causation or authority. |
| **Forecast** | Model-based projection. | Future fact or permission. |
| **Outcome claim** | Claim about result for a subject/system/intervention. | Automatic achievement or causation. |
| **Causal attribution** | Bounded supported claim of contribution. | Universal effect or learner state. |

## 5. Activity, Exposure, Engagement, Evidence, and Learning Separation

Measurements must distinguish technical activity, exposure, participation, engagement, completion, response, qualified evidence, interpreted evidence, achieved outcome, and learner state. No metric may use a convenient label to collapse these layers.

| Signal | Permitted meaning | Prohibited inference |
|---|---|---|
| **Presented/displayed** | Response was made available/delivered. | Learner saw, understood, or learned it. |
| **Opened/started** | An interaction/instance began. | Engagement, consent, or achievement. |
| **Time spent** | Recorded duration under stated measurement. | Attention, effort, understanding, or difficulty. |
| **Completed lifecycle** | Completion condition was met. | Learning or outcome achievement. |
| **Responded** | Interaction/response was recorded. | Correctness, understanding, or state. |
| **Repeated/returned** | Activity pattern occurred. | Motivation, mastery, or misconception. |
| **Qualified evidence** | Evidence met D21 conditions. | Authoritative conclusion without D22/D27. |
| **Aggregate improvement** | Group measure changed. | Individual learner improvement or causation. |

## 6. Definitions, Denominators, and Population Scope

Every measure must identify its unit, definition, numerator, denominator, inclusion/exclusion rules, population, time window, context, version, missingness treatment, data source, transformation, uncertainty, and permitted use where relevant. A metric without a defined denominator or population cannot support a consequential comparison.

Cohorts must preserve D36 boundaries and avoid treating organisational, academic, demographic, context, preference, accommodation, or state categories as interchangeable. Record linkage under D45 must be explicit before records are included together; matching or shared storage is not cohort equivalence.

A measure may be valid for a named cohort and period while being invalid for another. Changes to definitions, populations, data sources, or denominators require prospective versioning and must not silently rewrite historical values.

## 7. Outcome Attribution

An outcome claim must distinguish outcome definition, subject, intervention/factor, comparator or baseline, measurement method, time window, formal/content context, confounders/limitations, uncertainty, provenance, and authority. A temporal sequence or correlation is not causal attribution.

Learner outcome claims require D8/D21/D26/D27/D22/D43 authority. System or program outcome claims require their own purpose-specific governance and must not be transferred to an individual learner. A measured improvement after an experience may support a bounded association without proving the experience caused it.

AI/provider analytics, predictive scores, and model explanations remain proposal/support under D14/D37 and cannot create outcome or causal authority.

## 8. Privacy, Aggregation, and Disclosure

D19/D20/D34/D35/D36/D45/D50 remain controlling. Aggregation, pseudonymisation, suppression, de-identification, cohorting, or dashboard presentation does not automatically remove data-subject rights or disclosure obligations. Small groups, rare combinations, linkage, repeated releases, and contextual detail may create re-identification or sensitive inference risk.

A metric may be permitted for internal monitoring but not for learner-facing disclosure, external exchange, assessment, state, policy, or public reporting. Disclosure must identify audience, purpose, scope, sensitivity, uncertainty, limitations, and authority.

## 9. Uncertainty, Missingness, and Bias

D47 remains controlling. Missing data, selection effects, survivorship, denominator changes, measurement error, cohort drift, confounding, aggregation bias, and model uncertainty must remain explicit where material. Unknown or missing observations must not be silently treated as zero, failure, non-participation, or negative outcome.

A metric may be precise yet invalid for its intended construct. A representative aggregate may conceal subgroup differences. A high-confidence model can still be biased or outside scope. D51 adds no method for detecting or resolving such issues; it requires their explicit treatment.

## 10. Use in Decisioning, Adaptation, State, Policy, and Incidents

D9/D11/D18/D25/D28/D30/D33/D48 remain controlling. Metrics may inform a proposal or review where policy permits, but they cannot automatically create learner choice, evidence, interpretation, conclusion, state, adaptation, policy activation, release, safety finding, or incident cause.

A metric-driven action must identify its purpose, consequence class, epistemic status, provenance, applicable policy, review requirement, and affected scope. If the metric is only an indicator or association, it must not be presented as the underlying condition or outcome.

## 11. Transparency and Contestability

D50 remains controlling. Analytic outputs must disclose definitions, population, period, material limitations, uncertainty, missingness, and whether the output is a measure, indicator, association, forecast, or causal claim where relevant. A learner or authorised actor may contest a metric inclusion, interpretation, outcome claim, cohort association, or data source without that contest automatically changing the metric or underlying history.

Correction may affect future reports and derived representations prospectively. Historical reports remain attributable to the definitions, data, versions, and methods used when produced.

## 12. Lifecycle and Historical Protection

The lifecycle is:

> **metric proposal → definition/scope authority → source and lineage review → collection/measurement → quality and epistemic review → aggregation/analysis → bounded use/disclosure → contest/correction → prospective version change → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | Candidate measure/analysis is suggested. | No validity or authority. |
| **Definition** | Unit, population, method, purpose, and scope are stated. | Not correctness or causation. |
| **Measurement** | Values/observations are collected/derived. | Not learning or outcome. |
| **Quality review** | Completeness, provenance, uncertainty, and limitations are examined. | Not authority or causation. |
| **Analysis** | Aggregate/compare/forecast/attribute within scope. | Not universal truth. |
| **Use/disclosure** | Permitted audience/use receives output. | Not consent, state, or approval. |
| **Correction/version** | Future use/definition/output is corrected or superseded. | No historical rewrite. |

## 13. Conflict and Fail-Closed Rules

Analytic conflicts may concern definitions, denominators, populations, linkage, source, lineage, missingness, uncertainty, mathematical context, evidence, assessment, outcome, causation, privacy, policy, provider, AI, state, incident, or history. Conflict creates no preferred metric, cohort, outcome, or causal explanation.

No precedence may be inferred from dashboard visibility, numerical precision, sample size alone, model complexity, recency, popularity, provider trust, AI confidence, operational convenience, or prior publication.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Metric definition, population, denominator, period, or source is unclear | No consequential comparison or claim. |
| Missingness or cohort bias is material and untreated | Disclose limitation; block affected consequential use. |
| Aggregate is used as individual learner truth | Reject the inference; preserve aggregate scope. |
| Association is presented as causation | Reclassify as association/unknown; no causal claim. |
| Metric depends on unresolved identity/linkage/context | Do not combine or attribute across records/contexts. |
| Output is used for state, assessment, policy, release, or safety action without authority | Fail closed or escalate under D48/D49. |
| Historical definition/data/method is unavailable or altered | Do not reconstruct silently; preserve uncertainty. |
| Contest or correction affects metric meaning | Record challenge; prospective review only. |

Fail-closed behaviour must not invent definitions, denominators, learner outcomes, causes, cohort equivalence, state, authority, consent, or historical fact.

## 14. Relationship to D1–D50

D51 is subordinate to every locked decision and creates no exception.

| Decision family | D51 dependency and constraint |
|---|---|
| **D1–D8** | Metrics cannot create learner choice, mathematical/content authority, assessment, evidence, or state. |
| **D9–D13** | Analytic inputs to policy/decision/history/version/migration require explicit definition, lineage, and scope. |
| **D14–D18** | AI/provider/reviewer/governance/conflict authority cannot be created by analytics or model scores. |
| **D19–D20** | Measurement/disclosure remains subject to data rights, privacy, representation, and consent/reference. |
| **D21–D22** | Aggregate or analytic outputs do not become qualified evidence, conclusions, or state commitments automatically. |
| **D23–D25** | Continuity, delegated choice, and policy relationships cannot be inferred from activity or cohort measures. |
| **D26–D30** | Interpretation, state, adaptation, delivery, commands, events, and effects remain distinct from metrics. |
| **D31–D32** | Conformance/release cannot establish metric validity, causation, or learner outcome. |
| **D33–D34** | Incident/data lifecycle actions preserve analytic uncertainty, privacy, and historical definitions. |
| **D35–D37** | Identity, context, provider, and exchange boundaries apply to cohorts and analytic data. |
| **D38–D39** | Constitutional integrity and implementation scope bind metric definitions and uses. |
| **D40–D42** | Mathematical/source/context claims remain distinct from analytic output and attribution. |
| **D43–D45** | Intent/outcome, learner context, and record linkage cannot be inferred from metrics or aggregates. |
| **D46–D47** | Lineage and epistemic status are required; provenance/confidence do not create analytic authority. |
| **D48** | Consequence/risk/review classification applies to metric-driven actions; metrics do not lower risk. |
| **D49** | Recognised human review is required where applicable; analytic dashboards or sign-off are not approval. |
| **D50** | Definitions, limitations, audiences, disclosure, contest, and correction must be transparent and bounded. |

## 15. Prohibited Behaviours

15.1. Treating activity, exposure, participation, time, completion, acknowledgement, response count, return frequency, or delivery success as automatic learning, achievement, mastery, readiness, progression, misconception, or state.

15.2. Treating an aggregate, cohort measure, dashboard, trend, forecast, correlation, model output, or visualisation as individual learner truth or causal proof.

15.3. Publishing or using a metric without explicit definition, population, denominator, period, source, lineage, missingness treatment, uncertainty, and permitted purpose where material.

15.4. Treating missing, unknown, excluded, or unobserved data as zero, failure, refusal, non-participation, negative evidence, or learner deficiency without authority.

15.5. Inferring cohort equivalence, identity, context, accommodation, capability, or state from shared storage, matching attributes, behavioural similarity, or aggregate patterns.

15.6. Using a metric to create learner choice, consent, evidence, interpretation, outcome, state, policy activation, release, safety finding, or incident cause without the applicable authority.

15.7. Presenting correlation, temporal order, model confidence, or provider/AI attribution as causation.

15.8. Resolving metric conflicts through numerical precision, sample size alone, dashboard prominence, recency, popularity, AI confidence, provider trust, or convenience.

15.9. Changing definitions, denominators, populations, sources, methods, or outcome labels to improve a result without prospective versioning and historical protection.

15.10. Disclosing sensitive individual or subgroup information through aggregation, repeated release, rare combinations, linkage, or contextual detail without authority.

15.11. Implementing measurement, analytics, attribution, dashboards, persistence, AI, assessment, UI/API, or any other functionality from D51.

## 16. Explicit Deferrals

D51 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific metrics, KPIs, outcomes, cohorts, baselines, thresholds, denominators, and success standards | These require purpose- and domain-specific governance. |
| Statistical, causal, experimental, forecasting, subgroup, fairness, and bias methods | D51 defines authority semantics, not analytic methodology. |
| Who may define, approve, publish, review, or contest a metric or attribution | D15/D16/D49 require explicit recognition; D51 names none. |
| Legal, privacy, regulatory, accreditation, examination, clinical, or institutional reporting requirements | D19/D20/D34/D50 apply; D51 creates no external authority. |
| Assessment, mathematical, content, curriculum, policy, AI, state, adaptation, delivery, incident, identity, provider, and implementation authority | D1–D50 remain controlling; metrics create none. |
| Analytics tools, dashboards, data models, storage, pipelines, client/API, or governance tooling | D51 is implementation-independent. |
| Slice 6 scope and implementation authorisation | D51 is a governance boundary, not implementation approval. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D51 at this stage.**

If D51 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for metric identity, definition, unit, numerator, denominator, population, cohort, period, source, observation, transformation, aggregation, missingness, uncertainty, limitation, indicator, association, forecast, causal attribution, outcome claim, audience, purpose, scope, version, authority, contest, correction, and historical applicability.

Future contracts must not encode activity as learning, aggregation as individual truth, correlation as causation, forecast as fact, missingness as failure, precision as validity, or dashboard publication as authority. They must preserve source/derived, aggregate/individual, association/causal, current/historical, and proposed/authoritative distinctions and fail closed when definitions, scope, lineage, uncertainty, rights, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, analytics, assessment, AI, or repository changes.

## 18. Implementation Freeze

> **No implementation may begin on the basis of D51.**
>
> D51 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, measurement system, analytics pipeline, dashboard, attribution model, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D52, or Slice 6 work. Any future implementation requires explicit human approval of D51 and a separate controlled implementation authorisation for an exact scope.

## 19. Approval Recommendation

D51 is presented for human architectural review as the measurement, analytics, and outcome-attribution boundary required after the complete D1–D50 chain. It protects the distinction between activity, exposure, engagement, observation, evidence, aggregate, indicator, outcome, association, causation, learner truth, and state.

> **D51 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, measurement system, analytics pipeline, dashboard, attribution model, source registry, expert-review system, canonical-reference system, mathematical validator, theorem prover, provenance/lineage system, uncertainty/confidence system, consequence/risk classifier, review-threshold system, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, record-linkage or merge/split system, assessment, AI, UI/API, delivery runtime, D52, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
