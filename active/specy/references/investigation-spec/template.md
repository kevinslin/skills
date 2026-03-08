# Investigation Spec: [Bug or Behavior Title]

**Date:** {YYYY-MM-DD}
**Status:** Investigating | Root Cause Identified | Fix In Progress | Resolved | Blocked

---

## Problem Statement

[Describe what is failing and why this matters]

## Symptom and Expected Behavior

### Observed
[What actually happened]

### Expected
[What should have happened]

---

## Reproduction and Evidence

### Reproduction Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Evidence Collected
- [log snippet source, trace, or metric]
- [relevant code references]

---

## Hypothesis Matrix

| Hypothesis | Fastest Falsifier (<=15 min) | Result | Next Action |
| --- | --- | --- | --- |
| [hypothesis A] | [probe] | pending | [next step] |
| [hypothesis B] | [probe] | pending | [next step] |

---

## State Timeline (Critical Values)

| Value | Source of Truth | Representation | Initialization Point | Snapshot/Capture Point | First Consumer | Ordering Valid? |
| --- | --- | --- | --- | --- | --- | --- |
| [value_name] | [module/object] | [id/name/object] | [where set] | [where copied/frozen] | [where read] | yes/no/unknown |

---

## Context Propagation Contract

> Required: define this contract for each high-risk value related to the bug.

### Source of Truth
- [canonical owner for each value]

### Initialization Timing
- [when and under which conditions values are set]

### Transform Rules
- [any id/name/type conversions and normalization rules]

### Snapshot Boundaries
- [where values are copied, cached, or frozen]

### Expected Consumers
- [downstream components that rely on these values]

---

## Root Cause

[Confirmed root cause, or best-supported current hypothesis with confidence]

---

## Fix Strategy

### Proposed Change
[What to change and why]

### Risks and Mitigations
| Risk | Impact | Mitigation |
| --- | --- | --- |
| [risk] | High/Med/Low | [mitigation] |

---

## Validation Plan

### Automated Validation
- [tests to add/run]

### Manual Validation
- [manual checks]

### Observability/Regression Guards
- [logs/metrics/assertions to keep or add]

---

## Open Questions

- [ ] [question]

---

## Notes

[Additional context, assumptions, and handoff notes]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
