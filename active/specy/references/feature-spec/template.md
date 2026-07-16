# Feature Spec: [Task Title]

**Date:** {YYYY-MM-DD}
**Status:** Planning | In Progress | Completed | Blocked

---

## TL;DR

- [Target outcome in one sentence]
- [Scope boundary or non-goal that prevents overreach]
- [Key implementation path or owner boundary]
- [Most important dependency, validation proof, or risk]

---

## Goal and Scope

### Goal
[Describe the objective and why it matters]

### In Scope
- [What this spec will change]

### Out of Scope
- [What this spec intentionally does not change]

---

## Context

### Background
[Why this task is needed - user impact, technical debt, or business requirement]

### Current State
[How the system behaves today, including the key code paths or architectural reality]

### Context
- [relative/path/to/context-item.md](docs/or/src/path): [what this context is for and when it is useful]

### Constraints
- [Technical constraints]
- [Rollout / product constraints]
- [Compatibility / operational constraints]

### Non-obvious Dependencies or Access (Optional)
- [Dependency, service, dataset, feature flag, or permission that can block implementation/validation]

---

## Approach and Touchpoints

### Proposed Approach
[High-level implementation approach and seam choice]

### Integration Points / Touchpoints
- [File / service / endpoint and why it matters]

### Resolved Ambiguities / Decisions
- [Decision]: [Resolution and rationale]

### Important Implementation Notes (Optional)
- [Critical facts, invariants, or temporary compromises]

### Existing Contract Snapshot (Required when changing data/API/CLI/config/migration output)

| Surface | Current owner / source of truth | Current fields, states, or shape | Current consumers |
| --- | --- | --- | --- |
| [surface] | [module/schema/command] | [current contract] | [who reads it] |

### Target Decision Table (Required when behavior depends on multiple states or source facts)

| Input facts / state | Target output | Notes |
| --- | --- | --- |
| [condition] | [observable result or stored shape] | [why this is the smallest sufficient behavior] |

### Minimal Model Check (Required when adding new fields, types, statuses, reasons, or config)
- New fields/types/states:
- Existing fields/types reused:
- Derived values intentionally not stored:
- Consumers for each new field/type/state:
- Simpler alternative considered:

---

## Acceptance Criteria

- [ ] [Observable feature outcome or invariant that must be true when the work is complete]
- [ ] [User-visible behavior, system behavior, or compatibility guarantee the change must satisfy]
- [ ] [Critical error-handling, data, or rollout invariant that must hold]

---

## Phases and Dependencies

### Phase 1: [Name]
- [ ] Step 1
- [ ] Step 2

[Add more phases as needed]

### Phase Dependencies
- [List prerequisites and ordering constraints]

---

## Validation Plan

Automated validation:
- [explicit test cases]

Manual validation:
- [explicit checks]

### Separate Validation Spec (Optional)
- [Path to validation spec, if this feature needs a dedicated validation document]

---

## Open Items and Risks

### Open Items
- [ ] [Open technical decision, clarification, or research task]

### Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
| --- | --- | --- | --- |
| [risk] | High/Med/Low | High/Med/Low | [mitigation] |

### Simplifications and Assumptions (Optional)
- [Intentional simplification, deferred work, or assumption made to keep scope tight]

---

## Outputs

- PR created from this spec: [PR URL, title, or status]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [YYYY-MM-DD HH:MM]: [description of update] ([agent session id])
