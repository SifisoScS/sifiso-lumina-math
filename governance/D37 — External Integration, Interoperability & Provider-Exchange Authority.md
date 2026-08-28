# D37 — External Integration, Interoperability & Provider-Exchange Authority

> **D37 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D36 are preserved exactly as approved and locked. D37 authorises no code, contract, repository, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, assessment, AI, UI/API, delivery runtime, D38, or Slice 6 work.

## 1. Post-D36 Dependency Analysis

D36 establishes organisational/context, tenant, workspace, institutional, provider, and cross-context boundaries. It distinguishes context association and membership from authority, and prevents local access, shared storage, common identifiers, or technical reachability from creating cross-context permission.

The governance chain still lacks a general authority boundary for **external integrations and provider exchanges**: when an outside service, institution, provider, client, assessment source, storage system, AI service, delivery service, or other external system may exchange data or invoke an operation; how that provider is recognised; which direction and purpose the exchange has; how its output is qualified; how provider change/substitution is governed; and how external failure or unavailability is handled.

D14 governs AI as proposal-only, D21 governs assessment-source/evidence sufficiency, D29 governs delivery/interaction, D30 governs operational commands/events/execution, D35 governs technical identity/access, and D36 governs context isolation. None of those decisions creates a general provider-exchange authority. The single highest-priority unresolved governance boundary is therefore **External Integration, Interoperability & Provider-Exchange Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D14 — AI Proposal & Assistance** | AI cannot become authority through provider trust or operational acceptance. | General provider/integration exchange semantics beyond AI. |
| **D19/D20/D34 — Data and Data Protection** | Data use, disclosure, representation, retention, deletion, and lifecycle are explicit. | How an external recipient/provider may receive, use, return, retain, or delete exchanged data. |
| **D21/D26 — Assessment and Interpretation** | Source qualification and semantic interpretation remain bounded. | How external source/provider outputs enter the engine without becoming evidence or truth automatically. |
| **D29 — Delivery & Interaction** | Delivery is semantic, client-neutral, and distinct from learning. | How an external delivery/provider integration is recognised and changed without altering learning authority. |
| **D30 — Command/Event/Execution** | Commands, effects, events, retries, replay, and execution remain distinct. | How an external system may issue/receive a bounded command or effect. |
| **D35 — Identity, Authentication & Access** | Technical identity/authentication/access are not authority. | How provider recognition, capability, trust, and exchange authority relate to access. |
| **D36 — Context/Tenant Isolation** | Cross-context operations require explicit authority and fail closed. | How provider boundaries and external context exchange are governed. |

This is the next priority because future persistence, assessment, AI, delivery, client, institutional, or operational functionality will likely cross a system/provider boundary. Without D37, an authenticated provider, API response, webhook, imported record, connector, model output, external event, or successful exchange could be treated as authoritative content, evidence, policy, learner state, consent, execution, or data disclosure.

D37 is not a connector implementation, API specification, provider-selection decision, interoperability standard, procurement decision, or trust certification. It defines the authority boundary that any future external exchange must satisfy.

## 2. Purpose

D37 defines the authority semantics for external provider recognition, integration purpose, exchange scope, inbound/outbound data, capability and trust claims, contract/semantic compatibility, provider substitution, failure/unavailability, output qualification, cross-context exchange, and historical protection.

> **A provider is not an authority. A successful exchange is not truth. An authenticated response is not qualified evidence. Interoperability is not equivalence.**

D37 ensures that external systems remain replaceable, bounded, observable, provenance-linked, and non-authoritative unless a separate locked decision explicitly grants the relevant authority.

## 3. Scope

D37 governs the conceptual boundary for exchanges between Math Lumina and external systems, institutions, services, providers, clients, data custodians, assessment sources, AI systems, delivery systems, storage systems, and governance domains.

| Within D37 | Outside D37 |
|---|---|
| Provider/integration recognition, exchange purpose/scope, data direction, output status, provider change, interoperability, failure, and external authority boundaries | API/connector code, transport, schemas, databases, infrastructure, authentication protocols, or deployment implementation |
| External inputs/outputs and their relationship to D1–D36 authority | Legal contracts, procurement, vendor due diligence, security certification, or regulatory approval |
| Provider substitution and semantic/contract compatibility at governance level | Assessment scoring, AI runtime, content/curriculum, policy, state, delivery, or learner-choice authority |
| Provenance, cross-context, data-protection, and fail-closed treatment of exchanges | Technical service levels, availability targets, provider architecture, or integration tooling |

D37 creates no provider recognition, connector permission, data-processing right, assessment authority, AI authority, delivery authority, or cross-context authority by assertion.

## 4. Authority Model

An **external provider** is an outside person, institution, service, system, client, platform, model, storage location, or governance domain participating in an exchange. Provider identity and capability are distinct from authority.

An **integration relationship** is an explicit, versioned, purpose- and scope-bound relation permitting named exchanges or operations between Math Lumina and an external provider. It must identify direction, data/action categories, contexts, recipients, policy/version, period, provenance, limitations, and responsible authority.

An **external exchange** is a bounded inbound or outbound transfer of data, signal, command, response, content, policy reference, assessment observation, delivery act, or operational fact. Exchange does not make the input/output authoritative.

A **provider claim** is an assertion made by or about a provider concerning identity, capability, reliability, equivalence, quality, assessment, safety, or truth. It must remain a claim until independently qualified and authorised for a particular purpose.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Provider identity** | A bounded identity claim for an external participant. | Authority, trust, truth, or data rights. |
| **Integration relationship** | Explicit permitted exchange for a named purpose/scope/time. | Universal provider trust or authority outside scope. |
| **Capability claim** | Assertion of what a provider can provide. | Semantic compatibility, correctness, or permission. |
| **External input** | Data/signal/record received from a provider. | Evidence, interpretation, conclusion, state, or consent. |
| **External output** | Data/signal/response sent to a provider. | Provider permission to reuse/disclose/retain or create authority. |
| **Interoperability** | Ability to exchange or process representations. | Equivalence of meaning, policy, version, evidence, or authority. |
| **Provider trust** | A bounded, purpose-specific confidence/relationship attribute. | Governance authority, mathematical truth, or learner consent. |
| **Provider substitution** | Prospective replacement under explicit compatibility/authority review. | Automatic equivalence or historical rewrite. |
| **Exchange outcome** | Success, failure, partial, unknown, or rejected exchange fact. | Truth, learning, state, or authority. |

## 5. Integration Recognition and Exchange Preconditions

An external integration may be considered only when its provider identity, context, purpose, scope, direction, data/action categories, policy/version, authority, period, provenance, limitations, output treatment, failure behaviour, and termination/revocation conditions are explicit.

At minimum, an exchange requires:

1. recognised provider/integration identity and current scope under D15/D35/D36;
2. explicit purpose, data/action category, direction, recipient, context, and effective period;
3. D19/D20/D34 data-subject, privacy, disclosure, retention, restriction, and lifecycle authority where data is involved;
4. applicable D5–D13/D25 content, policy, curriculum, version, equivalence, and activation rules;
5. D8/D21/D26/D27/D22 treatment if the exchange concerns assessment, evidence, interpretation, conclusion, or state;
6. D14 treatment if AI or model assistance is involved;
7. D29 treatment if delivery/interaction is involved;
8. D30 command/effect/event treatment if the exchange can cause an operational effect;
9. D31/D32/D33 conformance, release, incident, and operational conditions where applicable; and
10. no unresolved consequential conflict, authority, provenance, context, or provider-status condition.

Technical reachability, provider documentation, contractual language, authentication, successful test exchange, prior use, or institutional reputation does not satisfy these requirements by itself.

## 6. Inbound Data and External Output Qualification

An external input must be classified as an unqualified external observation, structurally validated representation, qualified evidence candidate, interpretation/proposal, conclusion/commitment reference, policy/content reference, command, event, delivery fact, or another explicitly governed category. A provider’s label does not determine the category.

External output must be treated according to its declared purpose and authority. A provider response may be structurally valid without being semantically correct, educationally authoritative, evidence-sufficient, policy-equivalent, or safe for learner use. External output may be proposed, rejected, reviewed, accepted for a bounded use, or preserved as an uncertain observation.

| External exchange result | Permitted status |
|---|---|
| **Structurally valid** | Representation meets defined structural requirements; no truth/authority inference. |
| **Semantically unresolved** | Meaning or compatibility is uncertain; no consequential use. |
| **Purpose-qualified** | Permitted for the exact stated purpose/scope after required review. |
| **Evidence-qualified** | Qualified under D21 for an exact evidence purpose; not state or conclusion. |
| **Authority-bearing reference** | References an independently authorised claim/commitment/policy; provider did not create it. |
| **Rejected/deferred** | Not permitted for consequential use. |
| **Partial/unknown** | Exchange/result is incomplete or cannot be established; preserve uncertainty. |

An external provider cannot self-certify the educational, mathematical, policy, assessment, privacy, or governance meaning of its output merely by including metadata or confidence.

## 7. Interoperability, Compatibility, and Equivalence

Interoperability means that systems can exchange or process representations. It does not establish semantic equivalence. Compatibility is purpose-, scope-, context-, version-, and time-specific under D13/D25. An exchange format, matching identifier, common ontology, shared API, or successful conversion does not prove that two meanings, policies, contents, assessments, states, or experiences are equivalent.

Provider claims of equivalence or compatibility require the applicable D13/D25 authority and D31 verification evidence. If equivalence is consequential and unresolved, the systems must not substitute, migrate, activate, reconcile, or use the representations as interchangeable.

## 8. Provider Change and Substitution

A provider/version/endpoint/model/client/storage/assessment source/delivery service change is a governed change, even if an interface appears unchanged. The change must be classified for impact on identity, context, data rights, policy, content, evidence, interpretation, state, adaptation, delivery, commands, events, incidents, and history.

Substitution requires explicit prospective review of purpose, scope, capability, semantic compatibility, provenance, failure behaviour, data lifecycle, security/access, context isolation, and D31/D32 conformance/release where applicable. A new provider cannot inherit prior provider authority, trust, evidence qualification, semantic equivalence, data rights, or historical status automatically.

Provider substitution, outage fallback, model fallback, or client fallback must not silently alter learner choice, response meaning, content, policy, assessment, state, data use, or experience continuity. Where replacement is unresolved, the safe result is constrained/no-offer/no-execution/fail closed.

## 9. AI, Assessment, Delivery, and Operational Exchanges

D14 remains controlling for AI: provider authentication, model quality, confidence, or deployment does not make AI authoritative. AI output is proposal-only unless a separate authorised human/governed path accepts a bounded use.

D8/D21/D26/D27/D22 remain controlling for assessment and learner state. An external evaluator/source/provider may supply an observation or proposal, but the provider does not thereby create qualified evidence, interpretation, misconception, conclusion, commitment, or state.

D29 remains controlling for delivery. An external delivery provider may realise a semantic response only within current authority/capability; delivery does not create learner choice, consent, learning, evidence, or state.

D30 remains controlling for operational exchange. An external command/event/result cannot create or broaden execution authority. External webhook, callback, import, acknowledgement, or successful response is not an effect unless the exact current authority/commitment and execution conditions are satisfied.

## 10. Cross-Context and Data-Protection Boundary

D19/D20/D34/D36 remain controlling. An external provider may receive or return data only within explicit purpose, subject, recipient, context, scope, period, minimisation, retention, disclosure, and representation authority. A provider’s technical custody or contract does not create unrestricted data rights.

An exchange crossing organisational/tenant/workspace/provider contexts requires source and target context identification and explicit cross-context authority under D36. Shared provider, shared storage, global administrator access, common identifier, or central exchange does not make contexts equivalent.

Exports, backups, caches, derived records, logs, embeddings, transcripts, model inputs/outputs, and provider copies remain within the data-lifecycle boundary. Provider-side retention/deletion/reuse cannot be assumed from successful transmission.

## 11. Lifecycle, Failure, and Unavailability

The integration lifecycle is:

> **proposal → provider/integration review → authority approval → recording → release/effectiveness → exchange-ready → exchange attempt → qualification/handling → monitoring → restriction/revocation/expiry → substitution/retirement → incident/correction → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | An external relationship/exchange is suggested. | No provider authority or data permission. |
| **Review** | Identity, context, purpose, scope, capability, risk, and output treatment are examined. | Review is not approval. |
| **Approval** | Recognised authority approves exact relationship/exchange. | Not deployment or execution. |
| **Effectiveness** | Relationship may operate prospectively in named scope. | Not provider truth or result qualification. |
| **Exchange attempt** | Data/action exchange is attempted. | Not success, evidence, or effect. |
| **Qualification/handling** | Input/output receives bounded status for purpose. | Not universal truth or authority. |
| **Restriction/revocation/expiry** | Future exchange is constrained or ended. | No historical erasure. |
| **Substitution/retirement** | Provider/relationship changes prospectively. | No inherited authority or equivalence. |

Provider unavailability, timeout, malformed response, partial result, duplicated message, unknown outcome, version mismatch, or endpoint change must not be converted into learner failure, refusal, evidence, conclusion, state, choice, or authority. D30 governs retry/duplicate/partial/unknown outcomes; D33 governs incident response; D32 governs release/change effectiveness.

## 12. Conflict and Fail-Closed Rules

Integration conflicts may concern provider identity, context, purpose, data rights, policy, content, versions, capability, evidence, interpretation, state, delivery, commands, events, incidents, release, conformance, or historical records. Conflict creates no provider, exchange, or operational authority.

No precedence may be inferred from provider reputation, contract status, price, availability, uptime, response speed, newer version, common format, central storage, authentication, AI confidence, institutional status, prior success, or convenience. D18 remains supreme.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Provider/integration identity or authority is unclear | No consequential exchange/action. |
| Purpose, context, data scope, recipient, period, or data-right basis is missing | Do not access/use/disclose/exchange beyond known permission. |
| External output meaning, equivalence, qualification, or provenance is unresolved | Preserve as unresolved; no consequential educational/policy/state use. |
| Provider/version/model/client substitution is unreviewed | Do not substitute or silently continue; use constrained/no-offer/no-execution. |
| External command/event/effect outcome is partial or unknown | Do not assume effect; preserve uncertainty and reconcile under D30. |
| Provider outage requires fallback but fallback authority/compatibility is unclear | Do not silently fallback; fail closed or use a separately authorised safe constraint. |
| Cross-context or representation authority is unresolved | No cross-context access, disclosure, choice, or execution. |
| Provider incident/non-conformance affects current use | Restrict future exchange where authorised; apply D31–D33; preserve history. |

Fail-closed behaviour must be non-disclosive beyond authority, non-consensual, non-choice-making, non-learning-assertive, non-mutating where authority is unresolved, prospective, and historically additive.

## 13. Historical Protection

D37 must never rewrite, delete, conceal, or retroactively relabel provider identity, integration approval, exchange request, input/output, qualification status, disclosure, command, event, execution, delivery, evidence, interpretation, conclusion, state, choice, context, incident, release, or provenance.

A later provider change, qualification decision, revocation, incident, substitution, outage, or correction affects future reliance and effectiveness only through explicit governed action. It cannot make an earlier exchange have involved a different provider, meaning, context, authority, or result.

## 14. Interaction with D1–D36

D37 is subordinate to every locked decision and creates no exception.

| Decision | D37 dependency and constraint |
|---|---|
| **D1 — Learner Choice** | External exchange/provider/response cannot infer `select-offer`, consent, preference, or commitment. |
| **D2 — Learning-State Authority** | Provider output/exchange does not create learner-state authority. |
| **D3–D4 — Curriculum and Academic Progression** | Integration does not activate curriculum or progression authority. |
| **D5–D7 — Content, Knowledge, and Experience Lifecycle** | Provider/content/experience exchange requires current authority; interoperability is not learning or lifecycle transfer. |
| **D8 — Assessment & Evidence** | External source/provider output is not evidence without D21 qualification. |
| **D9 — Decisioning & Policy** | Provider response cannot expand deterministic decisioning or policy authority. |
| **D10–D11 — Publication/Activation and Policy Lifecycle** | Exchange does not publish/activate content/curriculum/policy. |
| **D12 — Durable History & Storage** | External storage/custody preserves no authority; exchange history remains protected. |
| **D13 — Version/Migration** | Provider/version substitution does not infer equivalence or migration. |
| **D14 — AI Proposal** | AI/provider trust/output remains proposal-only; provider cannot become authority. |
| **D15–D16 — Delegation and Governance Action** | Provider/integration recognition and actions require explicit scope, review, approval, effectiveness, execution, and recording. |
| **D17 — Interpretation Review** | External output is not interpretation authority or permission to rewrite learner records. |
| **D18 — Conflict Resolution** | Provider/integration conflict creates no precedence or exception. |
| **D19–D20 — Data and Representation Rights** | External exchange requires explicit purpose, recipient, representation, privacy, and disclosure authority. |
| **D21 — Source/Evidence Sufficiency** | Provider/source status does not qualify evidence automatically. |
| **D22 — Conclusion/State Commitment** | External exchange cannot create conclusions, commitments, effectiveness, or state. |
| **D23 — Experience Continuity** | Provider outage/change cannot silently continue, resume, substitute, or migrate an experience. |
| **D24 — Delegated Choice** | Provider/representative exchange does not create delegated learner choice. |
| **D25 — Policy Relationships** | Interoperability/provider compatibility does not infer policy equivalence, precedence, activation, or migration. |
| **D26 — Semantic Interpretation** | External output cannot create interpretation, misconception, or diagnosis authority. |
| **D27 — State Semantics** | Provider data/state write does not create authoritative state. |
| **D28 — Adaptation & Learning Response** | Provider capability/output does not create adaptation or pedagogical response authority. |
| **D29 — Delivery & Interaction** | External delivery provider does not create learning, choice, evidence, or state. |
| **D30 — Command/Event/Execution** | External command/event/callback requires exact current execution authority; technical success is not effect. |
| **D31 — Conformance/Verification** | Provider/integration conformance is scope-bound; verification does not grant provider authority. |
| **D32 — Release/Deployment/Change Effectiveness** | Provider deployment/availability does not establish release or operational effectiveness. |
| **D33 — Monitoring/Incident/Safety Response** | Provider incident/urgency does not grant unrestricted exchange, disclosure, or response authority. |
| **D34 — Data Lifecycle/Protection** | Provider custody does not determine retention/deletion/disclosure; lifecycle applies to provider copies and derived records. |
| **D35 — Identity/Authentication/Access Control** | Provider authentication/access is distinct from provider recognition, trust, authority, or data rights. |
| **D36 — Organisational/Tenant/Cross-Context Authority** | External exchange across contexts requires explicit source/target context and cross-context authority. |

## 15. Prohibited Behaviours

15.1. Treating provider identity, authentication, reputation, contract, documentation, capability claim, uptime, successful exchange, response speed, or operational trust as authority.

15.2. Treating an external input/output, webhook, callback, import, acknowledgement, transcript, model response, or provider label as mathematical truth, qualified evidence, interpretation, conclusion, state, consent, choice, or execution.

15.3. Treating interoperability, common formats, matching identifiers, shared ontologies, or successful conversion as semantic, policy, content, assessment, state, or experience equivalence.

15.4. Allowing a provider to self-authorise, self-qualify, self-certify equivalence, or expand its data/use/disclosure/execution scope through technical exchange.

15.5. Silently substituting, falling back to, upgrading, downgrading, migrating, continuing, or resuming an external provider, version, model, client, policy, content, assessment source, delivery service, or storage location.

15.6. Using an external exchange to bypass D1–D36, data rights, context isolation, learner choice, policy/version rules, evidence qualification, state authority, delivery boundaries, execution authority, or historical protection.

15.7. Treating provider failure, outage, timeout, malformed data, partial result, unknown outcome, version mismatch, or unavailable service as learner failure, refusal, abandonment, lack of competence, evidence, conclusion, or state.

15.8. Disclosing learner/context data to an external provider beyond explicit purpose, recipient, minimisation, representation, retention, and data-right authority.

15.9. Resolving provider, context, output, qualification, version, policy, authority, or historical conflicts through reputation, recency, availability, central storage, AI confidence, institutional status, or convenience.

15.10. Rewriting historical exchanges, provider identity, disclosures, commands, events, effects, qualifications, choices, evidence, conclusions, state, incidents, releases, or provenance after provider change or correction.

15.11. Implementing an integration, connector, provider exchange, federation, provider substitution, external assessment, AI, delivery, persistence, API, or any other functionality from D37.

## 16. Explicit Deferrals

D37 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| Specific providers, vendors, institutions, connectors, APIs, protocols, contracts, service levels, and procurement decisions | D37 creates no provider recognition or implementation permission. |
| Technical transport, schema, authentication, encryption, persistence, queue, webhook, API, federation, and infrastructure design | D37 defines authority semantics, not technology. |
| Provider assurance, security certification, legal due diligence, data-processing agreements, liability, and regulatory requirements | These require separate legal/security/operational governance. |
| Exact interoperability/equivalence methods, conformance thresholds, compatibility matrices, and substitution criteria | D13/D25/D31 constrain them; purpose-specific governance remains required. |
| External assessment scoring, AI model/runtime, delivery service, content/policy exchange, learner-state, adaptation, and experience semantics | D1–D36 remain controlling; provider exchange does not create educational authority. |
| Cross-context federation, organisational membership, data residency, retention/deletion, incident notification, and emergency exchange procedures | D19/D20/D33/D34/D36 remain controlling; operational details require separate governance. |
| Slice 6 scope and implementation authorisation | D37 is a governance boundary, not implementation approval. |

## 17. Required Contract Changes, if Any

**No contract changes are required or authorised by D37 at this stage.**

If D37 is approved and a later controlled implementation is explicitly authorised, future contracts may need distinct representations for provider identity, integration relationship, source/target context, purpose, direction, data/action category, authority, capability claim, exchange request, input, output, qualification status, provenance, compatibility/equivalence review, provider/version change, substitution, failure, partial/unknown outcome, incident, revocation, expiry, disclosure, retention, and historical record.

Future contracts must not encode provider identity as authority, authentication as recognition, exchange success as truth, interoperability as equivalence, output metadata as qualification, provider custody as data rights, fallback as permission, or substitution as migration. They must preserve source/derived and historical/prospective distinctions and fail closed when provider, context, purpose, authority, provenance, qualification, version, or conflict is unresolved. This is impact analysis only and does not authorise contract, code, schema, test, persistence, API, connector, or repository changes.

## 18. Implementation Freeze

> **No implementation may begin on the basis of D37.**
>
> D37 authorises no code, contract change, repository change, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, connector, provider integration, assessment, AI, UI/API, delivery runtime, D38, or Slice 6 work. Any future implementation requires explicit human approval of D37 and a separate controlled implementation authorisation for an exact scope.

## 19. Approval Recommendation

D37 is presented for human architectural review as the external integration and provider-exchange boundary required after organisational context and access governance. It preserves D1–D36, distinguishes provider identity, authentication, recognition, exchange, interoperability, qualification, authority, execution, and history, and requires explicit, purpose-bound, context-bound, provenance-rich, prospective, and fail-closed handling.

> **D37 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, connector, provider integration, assessment, AI, UI/API, delivery runtime, D38, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
