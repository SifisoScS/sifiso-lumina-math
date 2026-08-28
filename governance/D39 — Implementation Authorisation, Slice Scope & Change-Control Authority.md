# D39 — Implementation Authorisation, Slice Scope & Change-Control Authority

> **D39 — PROPOSED / HUMAN REVIEW ONLY**
>
> This is a governance-specification-only document. D1–D38 are preserved exactly as approved and locked. D39 authorises no code, contract, repository, schema, migration, persistence, governance tooling, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D40, or Slice 6 work.

## 1. Post-D38 Dependency Analysis

D38 protects the constitutional decision register and defines how clarification, correction, amendment, supersession, retirement, versioning, and historical applicability must be governed. It prevents implementation, policy, providers, AI, deployment, incidents, metadata, or storage from silently changing D1–D37.

The governance chain now contains substantive authority boundaries, operational execution and release boundaries, incident/data/access/context/provider boundaries, and conformance/constitutional-integrity boundaries. One final gate remains unresolved before a specific implementation phase can be considered: **who may authorise an exact implementation slice, what scope that authorisation covers, how scope changes are controlled, and how implementation permission remains distinct from conformance, release, deployment, and operational effectiveness**.

The single highest-priority unresolved governance boundary is therefore **Implementation Authorisation, Slice Scope & Change-Control Authority**.

| Locked decision | What it resolves | Remaining dependency |
|---|---|---|
| **D16 — Governance Action** | Proposal, review, approval, recording, effectiveness, execution, escalation, and correction are distinct. | The implementation-specific authority and lifecycle for granting permission to change the engine. |
| **D31 — Conformance & Verification** | Requirements, traceability, verification evidence, conformance, non-conformance, and release-readiness evidence are distinct. | Conformance does not itself authorise implementation; exact slice authorisation remains undefined. |
| **D32 — Release/Deployment/Change Effectiveness** | Release, deployment, enablement, effectiveness, rollback, and retirement are distinct. | What must happen before implementation is allowed to exist, independent of later release. |
| **D38 — Constitutional Integrity** | Locked decisions cannot be silently amended or reinterpreted. | How an implementation scope is authorised without becoming an implicit constitutional change. |
| **D1–D30 collectively** | Domain, data, learner, state, execution, delivery, provider, context, and safety constraints are explicit. | How a bounded implementation may exercise them without broadening scope or creating new authority. |

This is the next priority because the existing project is at a governance-to-implementation boundary. Without D39, a human instruction, code change, contract edit, test modification, dependency update, repository action, or operational request could be treated as permission to begin Slice 6 or could expand from a narrow approved scope into persistence, UI, AI, assessment, provider integration, state mutation, or infrastructure without a new decision.

D39 is not Slice 6 approval. It is the authority boundary that makes a future implementation authorisation explicit, narrow, reviewable, traceable, non-transitive, non-retroactive, and stoppable. It does not select the Slice 6 scope, grant an actor authority, or authorise any code.

## 2. Purpose

D39 defines the governance semantics for implementation proposals, slice boundaries, implementation authorisation, scope control, dependencies, change requests, stop conditions, approval gates, handoff to D31/D32, non-conformance, and historical protection.

> **A request to proceed is not a complete implementation authorisation. A defined slice is not permission to expand. A completed change is not release. A conformance result is not implementation authority.**

D39 ensures that future implementation can occur only after an explicit human/governed authorisation for an exact scope and that no implementation action creates authority beyond that scope.

## 3. Scope

D39 governs the authority and lifecycle of an implementation proposal and any approved slice that claims to affect the D1–D38 constitution or the engine’s contracts/behaviour. It covers scope definition, decision traceability, authorised actor/action, prerequisites, exclusions, change control, stop conditions, approval/rejection/deferment, implementation completion, conformance handoff, release handoff, correction, and historical records.

| Within D39 | Outside D39 |
|---|---|
| Implementation proposal, exact slice scope, authorisation, scope change, stop/rejection, and approval lifecycle | Code, contracts, repository, schemas, migrations, persistence, tooling, or implementation technology |
| Relationship between implementation permission, conformance, release, and operational effectiveness | Product roadmap, funding, procurement, staffing, legal approval, or project-management tooling |
| Non-transitive permission and explicit dependencies/exclusions | Assessment, AI, policy, content, learner state, delivery, provider, data, identity, or infrastructure authority |
| Historical protection for implementation decisions and change actions | A specific Slice 6 objective or any D40 topic |

D39 does not itself authorise implementation, change D1–D38, approve Slice 6, or define a preferred development process.

## 4. Authority Model

An **implementation proposal** is a bounded request to create or modify code, contracts, tests, configuration, schemas, dependencies, documentation, or operational artefacts for a named purpose and scope. It is not permission to act.

An **implementation slice** is a deliberately limited unit of work with explicit objective, in-scope and out-of-scope behaviour, affected decisions/contracts, prerequisites, tests, completion evidence, and stop conditions. A slice is a scope description, not authority until approved.

An **implementation authorisation** is an explicit governance action granting permission to perform the exact named slice under stated conditions, by recognised actor(s), for a defined period and repository/context. It is not release, deployment, operational effectiveness, conformance acceptance, or authority to begin a later slice.

A **scope change** is any addition, removal, reinterpretation, dependency change, authority change, contract change, behavioural change, or risk change that affects the approved slice. A scope change requires re-review and, where consequential, a new authorisation.

| Concept | Meaning | It does **not** establish |
|---|---|---|
| **Proposal** | Request for a future implementation slice. | Permission to edit or execute. |
| **Scope** | Exact objective, boundaries, dependencies, exclusions, and outcomes. | Authority or implementation. |
| **Authorisation** | Explicit permission for named implementation work. | Release, deployment, conformance, or future-slice authority. |
| **Implementation** | Work performed within an authorised scope. | Correctness, authority beyond scope, or release. |
| **Scope change** | Proposed alteration to an authorised slice. | Permission to continue under the old approval. |
| **Completion** | Work claims to satisfy the approved slice. | Conformance, release, or operational effectiveness. |
| **Conformance** | D31-governed evidence that requirements were met for scope. | Implementation authorisation or release. |
| **Release effectiveness** | D32-governed prospective operational permission. | Permission to implement or historical validity. |
| **Stop/revocation** | Future work/effect is paused, ended, or withdrawn by authority. | Erasure of implementation history. |

D15–D16 govern actor recognition and action. D39 creates no implementation authority by naming a role, tool, repository, branch, or instruction.

## 5. Slice-Definition Requirements

Every proposed slice must specify:

1. one bounded objective and the exact problem it addresses;
2. the affected code/contract/domain surface at a descriptive level, without changing it in the specification phase;
3. applicable D1–D38 constraints and a traceability map;
4. explicit non-goals and exclusions;
5. whether work is read-only, analysis-only, planning-only, non-mutating, or effect-applying;
6. all required authority, evidence, data, context, policy, version, delivery, and execution prerequisites;
7. expected deterministic behaviour and fail-closed outcomes;
8. test and verification requirements under D31;
9. scope-change and stop conditions;
10. completion evidence and handoff requirements; and
11. the exact approval authority, effective period, repository/context, and permitted actors/actions.

A proposal that does not identify a necessary boundary must not proceed by assumption. The unresolved part is excluded from the slice until separately governed.

## 6. Implementation Authorisation Lifecycle

The lifecycle is:

> **proposal → scope review → dependency/authority review → risk and conformance-plan review → human approval/rejection/deferment → recording → authorisation effectiveness → implementation → change review → completion evidence → D31 conformance review → D32 release decision where applicable → historical retention**

| Stage | Meaning | Non-collapse |
|---|---|---|
| **Proposal** | A possible slice is described. | No permission to implement. |
| **Scope review** | Objective, boundaries, exclusions, and dependencies are examined. | Review is not approval. |
| **Authority review** | Actor, decision, data/context, policy, and effect authority are checked. | Authority review is not implementation. |
| **Approval/rejection/deferment** | Recognised authority acts on exact scope and conditions. | Approval is not execution, conformance, or release. |
| **Recording** | Authorisation and provenance are preserved. | Recording does not create authority by storage. |
| **Effective authorisation** | The exact slice may begin prospectively. | No permission for scope expansion or later slice. |
| **Implementation** | Work occurs within scope. | No correctness or release authority. |
| **Change review** | Deviations/additions are examined. | Review is not permission to continue changed work. |
| **Completion evidence** | Work claims to satisfy the slice. | Not conformance or release. |
| **Conformance/release handoff** | D31/D32 separately assess and operationalise where applicable. | No retroactive implementation permission. |

## 7. Scope Control and Non-Transitivity

Implementation authorisation is non-transitive. Permission for one file, contract, behaviour, test, domain, context, provider, client, state dimension, or operational effect does not authorise adjacent work, dependencies, refactors, technology upgrades, integrations, or “necessary” supporting changes unless they are explicitly within scope or separately approved.

A dependency discovered during work must not silently expand the slice. The implementation must stop or remain within the authorised boundary while the dependency is reviewed. A new requirement, affected D1–D38 boundary, contract impact, security/data issue, or external system dependency is a scope-change trigger.

| Scope event | Required action |
|---|---|
| Purely administrative/no normative impact | Record and continue only if the authorisation permits it. |
| New file/contract/test/dependency outside listed scope | Stop and request scope review. |
| New authority, data, state, choice, policy, provider, or cross-context effect | Stop; separate governance review required. |
| Change to a locked decision’s meaning or applicability | Stop; D38 constitutional review required. |
| Discovered conformance, safety, privacy, identity, or history risk | Stop affected work; apply D31/D33/D34/D35 as relevant. |
| Change to implementation objective or acceptance criteria | Re-scope; old authorisation does not suffice. |

## 8. Existing Baseline and Approved-Behaviour Protection

Before any future implementation authorisation is exercised, the proposal must identify the baseline and known deviations relevant to the scope. In particular, the known D1 mismatch in `state-transitions.ts` must be treated as an explicit implementation issue, not silently ignored or fixed outside a controlled slice: decline, defer, and request-alternative must not move toward the original offer; only applicable explicit learner choice may authorise the relevant commitment.

A future slice must preserve existing approved behaviour unless the exact change is authorised. The baseline verification required by the current project context is:

```text
git status
pnpm check
```

The known 54-test baseline must remain green before changes unless an approved slice explicitly changes and replaces a covered behaviour with stronger tests and a recorded rationale. D39 does not authorise running, changing, or committing these artefacts; it defines the future gate.

## 9. Stop, Pause, Rejection, and Revocation

An implementation authorisation may be paused, rejected, revoked, expired, or superseded prospectively by a recognised authority. Stop conditions may include scope drift, unresolved authority/conflict, failing regression, history/provenance risk, data-right concern, learner-choice violation, non-determinism, external dependency, unapproved provider/AI/client use, or failure to satisfy a required prerequisite.

Stopping work does not erase work already performed. The implementation state, changes, tests, findings, and provenance must be preserved according to D12/D30/D34 and the applicable repository/operational rules when those are separately governed.

Revocation of implementation permission does not retroactively authorise or invalidate earlier actions. Any resulting code/contract/operational state must not be released or used consequentially unless a separate current determination addresses it under D31/D32/D33.

## 10. Conformance, Release, and Execution Handoff

Completion of an authorised slice requires a handoff to D31 conformance review. Conformance evidence must be scope-specific and include positive/negative, conflict, history, provenance, learner-choice, determinism, and fail-closed verification as applicable.

D31 acceptance is not implementation authorisation, release, deployment, or operational effectiveness. D32 must separately govern release/deployment/effectiveness. D30 must separately govern command/effect/event execution. A technical commit, push, merge, build, deployment, or enabled flag cannot substitute for any of those actions.

An implementation change that affects learner state, evidence, assessment, AI, privacy, identity, context, provider, delivery, policy, content, or learner choice must not be handed off as a generic technical change; its relevant D1–D38 dependencies must be reviewed.

## 11. Conflict and Fail-Closed Rules

Implementation-authority conflicts may involve scope, actors, decisions, contracts, tests, code, repositories, policies, data, identity, context, providers, versions, incidents, conformance, releases, or operational instructions. Conflict creates no permission to proceed.

No precedence may be inferred from user urgency, repository ownership, branch status, prior work, code proximity, dependency necessity, technical convenience, test coverage, provider trust, AI recommendation, reviewer seniority, deployment pressure, or an instruction that does not explicitly identify the exact scope and authority.

| Unresolved condition | Safe constrained outcome |
|---|---|
| Slice objective/scope/exclusions are ambiguous | Do not authorise implementation. |
| Actor/approval/effective period/repository/context is unclear | Do not begin or continue consequential work. |
| New dependency or scope drift is discovered | Stop affected work; request re-review. |
| Locked decision appears to conflict with proposed implementation | Preserve D1–D38; do not reinterpret in code. |
| Required data/evidence/policy/version/context authority is missing | Exclude the effect or fail closed; do not invent authority. |
| Baseline/regression/history/provenance verification is unavailable | No conformance/release handoff for affected scope. |
| Proposed work could create learner choice, state, evidence, policy, provider, or data authority | Stop; relevant domain governance is required. |
| Implementation/review/release/operational status is conflicting | Preserve conflict; apply D18/D31/D32/D38. |

Fail-closed behaviour must not create implementation permission, release, learner choice, evidence, state, authority, or historical rewrite.

## 12. Historical Protection

D39 must never rewrite, delete, conceal, or retroactively relabel implementation proposals, approvals, scope, changes, stop actions, findings, tests, conformance, release decisions, deployments, commands, events, effects, learner choices, evidence, interpretations, conclusions, state, incidents, data actions, provider exchanges, or provenance.

A later scope change, correction, revocation, non-conformance, release decision, or constitutional amendment affects future work/effectiveness only through explicit authority. It cannot make an unauthorised implementation appear authorised after the fact or make an approved scope have included unapproved work.

## 13. Relationship to D1–D38

D39 is subordinate to every locked decision and creates no exception.

| Decision family | D39 dependency and constraint |
|---|---|
| **D1–D8** | Implementation scope cannot weaken learner choice, evidence/state distinctions, or curriculum/content/assessment boundaries. |
| **D9–D13** | Implementation cannot activate/infer policy, alter history, infer equivalence, or migrate without separate authority. |
| **D14–D18** | AI, actor, governance-action, interpretation, and conflict boundaries remain explicit; approval cannot be inferred. |
| **D19–D25** | Data, privacy, representation, evidence, conclusion, and policy-relationship conditions remain scope-specific. |
| **D26–D30** | Interpretation, state, adaptation, delivery, and operational execution remain separate; implementation cannot collapse them. |
| **D31** | Conformance is required where applicable but does not authorise implementation or release. |
| **D32** | Release/deployment/effectiveness are separate from implementation authorisation. |
| **D33** | Incident/safety response cannot create permission for an unapproved fix or bypass history. |
| **D34** | Data lifecycle actions require separate authority; implementation access/custody does not create it. |
| **D35** | Authentication/access/repository ownership do not create implementation authority. |
| **D36** | Implementation scope must identify context; local approval does not authorise cross-context work. |
| **D37** | External/provider integration cannot enter a slice without explicit exchange authority. |
| **D38** | Implementation cannot amend, clarify, supersede, or reinterpret the constitutional register. |

## 14. Prohibited Behaviours

14.1. Treating a request to proceed, repository access, branch access, code ownership, credentials, prior work, technical necessity, or a green build as implementation authorisation.

14.2. Treating a broad phase label, “continue,” “fix,” “complete,” or “make it work” instruction as permission for unspecified code, contract, schema, persistence, integration, UI/API, AI, assessment, delivery, or infrastructure work.

14.3. Expanding an approved slice through dependencies, refactors, tests, configuration, provider changes, data access, state changes, or “minor” improvements without explicit scope review.

14.4. Using implementation, contracts, tests, metadata, deployment, provider output, incident response, or operational practice to reinterpret or amend D1–D38.

14.5. Treating implementation completion, commit, push, merge, verification, conformance, deployment, or runtime success as release or operational effectiveness.

14.6. Allowing implementation to create learner consent/choice, evidence, interpretation, conclusion, state, policy/content authority, provider authority, data rights, or cross-context authority.

14.7. Continuing after an unresolved scope, authority, data, identity, context, policy, version, provenance, history, conflict, safety, or learner-choice condition is discovered.

14.8. Treating a later approval, scope change, conformance result, release, rollback, incident action, or constitutional amendment as retroactive permission for prior unapproved work.

14.9. Resolving scope or authority conflicts through urgency, recency, repository state, technical convenience, provider trust, AI recommendation, test coverage, or reviewer status.

14.10. Rewriting historical authorisations, proposals, scope, implementation changes, tests, findings, conformance, release, commands, events, effects, learner records, or provenance.

14.11. Implementing an authorisation system, scope-control system, change-control system, governance registry, persistence, or any other functionality from D39.

## 15. Explicit Deferrals

D39 deliberately leaves the following matters unresolved:

| Deferred matter | Reason for deferral |
|---|---|
| The specific Slice 6 objective, scope, files, contracts, and implementation method | D39 creates the authorisation boundary but does not approve Slice 6. |
| Specific human approvers, reviewers, implementers, repositories, branches, environments, and effective periods | D15–D16 require explicit recognition; D39 names none. |
| Whether implementation will involve persistence, APIs, UI, delivery, AI, assessment, providers, schemas, migration, or infrastructure | These remain prohibited unless separately and explicitly scoped/authorised. |
| Exact conformance metrics, test tools, CI/CD, release systems, and deployment technology | D31/D32 govern principles; technology remains deferred. |
| Legal, security, privacy, data, identity, tenant, provider, assessment, AI, and operational procedures | D1–D38 remain controlling; D39 creates no additional substantive authority. |
| Constitutional amendment thresholds or decision-register implementation | D38 remains controlling; D39 cannot define them. |
| Any D40 topic or later governance work | No later decision is implied. |

## 16. Required Contract Changes, if Any

**No contract changes are required or authorised by D39 at this stage.**

If D39 is approved and a later controlled implementation is explicitly authorised, future implementation-governance records may need distinct representations for proposal, slice scope, exclusions, applicable decisions, authority, approval, effective period, actor/action, dependency, change request, stop condition, implementation status, completion evidence, conformance handoff, release handoff, revocation, correction, supersession, conflict, and provenance.

Future records must not encode a phase label as permission, a scope as authority, a commit as approval, conformance as release, deployment as effectiveness, or repository access as actor recognition. This is impact analysis only and does not authorise contract, code, schema, test, governance tooling, or repository changes.

## 17. Implementation Freeze

> **No implementation may begin on the basis of D39.**
>
> D39 authorises no code, contract change, repository change, schema, migration, persistence, governance tooling, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D40, or Slice 6 work. Any future implementation requires explicit human approval of D39 and a separate controlled implementation authorisation for an exact scope.

## 18. Approval Recommendation

D39 is presented for human architectural review as the implementation-authorisation and scope-control boundary required after the complete D1–D38 governance chain. It prevents ambiguous instructions, technical access, dependencies, conformance, deployment, or operational pressure from becoming permission to implement or expand scope.

> **D39 — PROPOSED / HUMAN REVIEW ONLY**

No repository change is authorised. No code, contract, schema, migration, persistence, governance tooling, event system, command handler, policy runtime, verification system, release/deployment system, monitoring/incident system, identity/authentication/access-control system, organisational/tenant system, external integration/connector/provider-exchange system, assessment, AI, UI/API, delivery runtime, D40, or Slice 6 work has occurred. After preparation, stop and await human architectural review and approval.
