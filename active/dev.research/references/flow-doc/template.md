# [Component/Feature] Flow

Last updated: YYYY-MM-DD

## Purpose / Question Answered

[1-3 sentences describing what this flow covers, what question(s) it answers, and why this flow exists]

## Entry points

- `path/to/file.ts`: [route/handler/hook/builder/component entrypoint]
- `path/to/other_file.ts`: [supporting entrypoint used in the same flow]

## Call path

[Organize by phases. Each phase should include trigger, entrypoints, ordered call path, state transitions, branch points, and external boundaries.]

### Phase 1: [Short phase name]

Trigger / entry condition:
- [What starts this phase?]

Entrypoints:
- `path/to/file.ts:[functionName]`

Ordered call path:
- [Step 1]
- [Step 2]
- [Step 3]

State transitions / outputs:
- Input: [state/args entering the phase]
- Output: [state/value/artifact produced by the phase]

Branch points:
- [Gate/check/fallback and its effect]

External boundaries:
- [HTTP/RPC/service call or `None identified`]

#### Pseudocode (Phase 1: [Short phase name])

```ts
// Source: path/to/file.ts
[use $sudocode skill for this phase only; include source file annotations and key branches]
```

### Phase 2: [Short phase name]

Trigger / entry condition:
- [What starts this phase?]

Entrypoints:
- `path/to/file.ts:[functionName]`

Ordered call path:
- [Step 1]
- [Step 2]

State transitions / outputs:
- Input: [state/args entering the phase]
- Output: [state/value/artifact produced by the phase]

Branch points:
- [Gate/check/fallback and its effect]

External boundaries:
- [HTTP/RPC/service call or `None identified`]

#### Sudocode (Phase 2: [Short phase name])

```ts
// Source: path/to/file.ts
[sudocode for this phase only]
```

### Phase N: [Short phase name]

[Repeat as needed]

## State, config, and gates

### Core state values (source of truth and usage)

- `[state_name]`
  - Source: [where the value is written/derived]
  - Consumed by: [first/important consumers]
  - Risk area: [ordering, representation, or branching caveat] (omit if none)

### Statsig (or `None identified`)

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., migrate_gmail] | [gate/config/experiment/layer] | `path/to/file.ts` | [behavior change] |

### Environment Variables (or `None identified`)

| Name | Where Read | Default | Effect on Flow |
|---|---|---|---|
| [e.g., FEATURE_X_ENABLED] | `path/to/file.ts` | [default or unknown] | [behavior change] |

### Other User-Settable Inputs (or `None identified`)

| Name | Type | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., request param/header/tool toggle] | [field/header/query/tool setting] | `path/to/file.ts` | [behavior change] |

### Important gates / branch controls

- `[gate/check name]`: [what it gates and where]
- `[route/type check]`: [how it changes the flow]

## Sequence diagram

```
[prefer ascii diagram]
```

## Observability

Metrics:
- [metric name / timing / counter and what it measures]

Logs:
- [log line/logger path and when it emits]

Useful debug checkpoints:
- [checkpoint / probe point]

## Related docs

- [Related flow docs]
- [Architecture docs]
- [Specs / design docs / PR docs]

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([codex session id])
