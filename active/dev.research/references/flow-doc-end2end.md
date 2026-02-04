# [Component/Feature] End2End Flow

Last updated: YYYY-MM-DD

## Overview

[1-3 sentences describing what lifecycle this document covers and why exhaustive detail is required]

**Related Documents:**
- [Links to related architecture docs, flow docs, feature specs, and research briefs docs]

## Lifecycle Boundaries

- **Entrypoint(s):** [Where lifecycle starts, including caller/source]
- **Terminal state(s):** [All successful and failure terminal outcomes]
- **Out of scope:** [What this doc intentionally excludes]

## Terminology

[Define key terms or link to docs that define them]

## Full Logic Inventory

| Step ID | Stage | Logic Summary | Condition/Branch | Inputs | Outputs/State Mutation | Side Effects (calls/metrics/logs) | Source |
| --- | --- | --- | --- | --- | --- | --- | --- |
| E2E-001 | [Stage name] | [What logic happens] | [If/else/retry predicate] | [Input data] | [Mutations/results] | [Calls, metrics, logs] | `path/to/file.ts` ([line range]) |

[Add rows until every meaningful logic step from entrypoint to terminal states is represented.]

## Detailed Flow Pseudocode

### Entry and Initialization

- `path/to/file` ([approximate line range])
```ts
[PSEUDOCODE for entry and setup]
```

### Main Execution Path

- `path/to/file` ([approximate line range])
```ts
[PSEUDOCODE for core happy path]
```

### Branches, Retries, and Recovery Paths

- `path/to/file` ([approximate line range])
```ts
[PSEUDOCODE for branches/retries/fallbacks]
```

### Failure and Terminal Paths

- `path/to/file` ([approximate line range])
```ts
[PSEUDOCODE for terminal success/failure exits]
```

## Step-to-Source Coverage Check

- [ ] Every inventory step maps to at least one source citation
- [ ] Every source citation maps to one or more inventory steps
- [ ] All branch/retry/error paths are represented
- [ ] Entrypoint and all terminal states are represented

## Architecture Diagram

```
[ASCII diagram showing lifecycle progression, key branches, and external interactions]
```

## Metrics

[List key metrics, where emitted, and what each metric indicates]

## Logs

[List key log lines/events, where emitted, and why they matter]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## FAQ

[keep this in case user asks followup questions - should be added here]

## Changelog

- [date]: [description of update] ([codex session id])
