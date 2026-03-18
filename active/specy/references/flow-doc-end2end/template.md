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

## Config

[List user-settable configuration that impacts this flow. Include Statsig and env vars. If none, write `None identified`.]

### Statsig

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., migrate_gmail] | [gate/config/experiment/layer] | `path/to/file.ts` | [behavior change] |

### Environment Variables

| Name | Where Read | Default | Effect on Flow |
|---|---|---|---|
| [e.g., FEATURE_X_ENABLED] | `path/to/file.ts` | [default or unknown] | [behavior change] |

### Other User-Settable Inputs

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., request param/header/tool toggle] | [field/header/query/tool setting] | `path/to/file.ts` | [behavior change] |

## Full Logic Inventory

### E2E-001 - [Stage name]

- **Logic Summary:** [What logic happens]
- **Condition/Branch:** [If/else/retry predicate]
- **Inputs:** [Input data]
- **Outputs/State Mutation:** [Mutations/results]
- **Side Effects (calls/metrics/logs):** [Calls, metrics, logs]
- **Source:** `path/to/file.ts` ([line range])

[Add sections until every meaningful logic step from entrypoint to terminal states is represented.]

## Detailed Flow sudocode

### Entry and Initialization

- `path/to/file` ([approximate line range])
```ts
[sudocode for entry and setup]
```

### Main Execution Path

- `path/to/file` ([approximate line range])
```ts
[sudocode for core happy path]
```

### Branches, Retries, and Recovery Paths

- `path/to/file` ([approximate line range])
```ts
[sudocode for branches/retries/fallbacks]
```

### Failure and Terminal Paths

- `path/to/file` ([approximate line range])
```ts
[sudocode for terminal success/failure exits]
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

- [date]: [description of update] ([agent session id])
