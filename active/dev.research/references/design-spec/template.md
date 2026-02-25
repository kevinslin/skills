# Feature Design: {feature-name}

**Date:** {YYYY-MM-DD}  
**Status:** Draft  
**Owner:** {team-or-component}

## Goal

[Describe the end-state in 1-2 sentences.]

## Scope

In scope:
- [Explicitly listed responsibilities]

Out of scope:
- [Explicitly listed non-goals]

## Current State

- [How the feature behaves today]
- [Key entrypoints and constraints]

## Requirements -> Design Mapping

| Requirement | Design Decision |
| --- | --- |
| [req] | [decision] |

## Proposed Design

### 1) {design area}

[Primary changes and reasoning]

### 2) {design area}

[Primary changes and reasoning]

## Feature Gates and Toggles

| Toggle / Gate | Scope | Behavior When Off | Behavior When On |
| --- | --- | --- | --- |
| [name] | [surface] | [effect] | [effect] |

## Parity and Migration Audit (If Applicable)

- [Special behavior that must be preserved]
- [Any currently hardcoded assumptions and where they must move]
- [Known behavior that can be intentionally dropped]

## Detailed File Plan

- `{path}`: [what changes and why]
- `{path}`: [what changes and why]

## Planning & Milestones

Every milestone must ship a significant and verifiable piece of functionality.

### Milestone 1: {name}

**Shipped functionality:** [one sentence]

Tasks:
- [concrete task]
- [concrete task]
- ...

Verification:
- [explicit verification]
- [explicit verification]
- ...

[Add additional milestones as needed]

### Milestone dependencies

- [M2 depends on M1]
- [parallelizable work]

## Rollout Plan

Phase 0:
- [dark launch / gate wiring]

Phase 1:
- [internal rollout]

Phase 2:
- [ramp / percentage rollout]

Rollback:
- [single-step rollback switch and expected behavior]

## Testing Plan

Unit tests:
- [cases]

Integration tests:
- [cases]

Manual checks:
- [cases]

## Observability

- [metrics]
- [logs/traces]
- [alert thresholds]

## Risks and Mitigations

1. [risk]
- Mitigation: [mitigation]

2. [risk]
- Mitigation: [mitigation]

## Open Questions

1. [question]
2. [question]

## Appendix (Optional)

- [links, diagrams, prior art]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
