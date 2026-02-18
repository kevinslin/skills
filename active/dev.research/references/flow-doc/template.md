# [Component/Feature] Flow

Last updated: YYYY-MM-DD

## Overview

[1-2 sentences describing what this flow document covers and why it exists]

**Related Documents:**
- [Links to related architecture docs, flow docs, feature specs, and research briefs docs]

## Terminology

[Define key terms or link to docs that define them]

## Config

[List user-settable configuration that impacts this flow. Include Statsig and env vars. If none, write `None identified`.]

### Statsig 

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., migrate_gmail] | [gate/config/experiment/layer] | `path/to/file.ts` | [behavior change] |

### Environment Variables (omit if none identified)

| Name | Where Read | Default | Effect on Flow |
|---|---|---|---|
| [e.g., FEATURE_X_ENABLED] | `path/to/file.ts` | [default or unknown] | [behavior change] |

### Other User-Settable Inputs (omit if none identified)

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., request param/header/tool toggle] | [field/header/query/tool setting] | `path/to/file.ts` | [behavior change] |

## Flow

### [DESCRIPTION OF INITIAL STATE]

- `path/to/file` ([approximate line range])
```
[sudocode going over flow logic. see $sudocode skill for details]
```

### [NEXT STATE TRANSITION]
- `path/to/file` ([approximate line range])
```
[sudocode going over flow logic. see $sudocode skill for details]
```

### ... [add more state transitions as needed]

## Architecture Diagram

```
[ASCII diagram showing component relationships and data flow]
```

## Metrics
[list of key metrics and what they mean]

## Logs
[list of key log lines and where they are emitted]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## FAQ
[keep this in case user asks followup questions - should be added here]

## Changelog
- [date]: [description of update] ([codex session id])
