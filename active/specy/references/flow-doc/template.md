---
created: {{date}}
updated: {{date}}
last_updated_session: {{agent}}/{{session-id}}
---

# [Feature] Flow

## Overview

[1-3 sentences describing what this flow covers, what question(s) it answers, and why this flow exists]

## Entry Points

[how this flow starts. could be a user typing something into a form or something else. include at least and at most 3 code pointers as well]

- path/to/file.ts: [route/handler/hook/builder/component entrypoint]

## Sequence Diagram

[Draft with `$dev.diagram mermaid general-flow`. Show the happy path plus important behavior-changing branches. Include meaningful fallback, retry, permission-denied, validation-failure, timeout, disabled-gate, and terminal-error outcomes when they materially change the flow. Omit trivial guards and implementation-only conditionals.]

## Execution Trace

[Focus this section on the happy-path execution from trigger to terminal effect. Mention branches only when needed to explain the next happy-path handoff; put important branch details in the general-flow diagram and Notes.]

### 1. [Phase Name]

[1-2 sentence describing what this phase does]

#### 1.1 [Step in phase]

[short description of what is happening in this step]

- path/to/file.ts:{{functionName}}

```
[$sudocode describing]
```

#### ...

[add more steps as necessary]

### 2. [add additional phases as necessary]

## Notes

[used to describe any quirks in behavior, important branch details, edge cases, and additional detail that does not belong in the happy-path execution trace]

## Observability

Metrics:
- [metric name / timing / counter and what it measures]

Logs:
- [log line/logger path and when it emits]

## Related docs

- [Related flow docs]
- [Architecture docs]
- [Specs / design docs / PR docs]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
