# [Component/Feature] Flow

Last updated: YYYY-MM-DD

## Purpose

[1-3 sentences describing what this flow covers, what question(s) it answers, and why this flow exists]

## Entry points

- `path/to/file.ts`: [route/handler/hook/builder/component entrypoint]
- `path/to/other_file.ts`: [supporting entrypoint used in the same flow]

## Call path

[Start with `### Overview` using `@references/flow-overview/template.md`. Keep the overview linear and move branch detail into the phase sections below.]

### Overview

[Required. Insert a single linear `ts` block using `@references/flow-overview/template.md`.]

### Phase 1: [Short phase name]

Trigger / entry condition:
- [What starts this phase?]

Entrypoints:
- `path/to/file.ts:[functionName]`

Ordered call path:
1. [Short, concrete action]
   ```ts
   // Source: path/to/file.ts#L28
   [use $sudocode skill for this step only; keep the description terse and move logic/branch callouts into comments]
   ```
2. [Next short action]
   ```ts
   // Source: path/to/file.ts#L42-L58
   [sudocode for this step only]
   ```
3. [Next short action]
   ```ts
   // Source: path/to/file.ts#L64
   [sudocode for this step only]
   ```

State transitions / outputs:
- Input: [state/args entering the phase]
- Output: [state/value/artifact produced by the phase]

Branch points:
- [Gate/check/fallback and its effect]

External boundaries:
- [HTTP/RPC/service call or `None identified`]

### Phase 2: [Short phase name]

Trigger / entry condition:
- [What starts this phase?]

Entrypoints:
- `path/to/file.ts:[functionName]`

Ordered call path:
1. [Short, concrete action]
   ```ts
   // Source: path/to/file.ts#L28
   [sudocode for this step only]
   ```
2. [Next short action]
   ```ts
   // Source: path/to/file.ts#L42-L58
   [sudocode for this step only]
   ```

State transitions / outputs:
- Input: [state/args entering the phase]
- Output: [state/value/artifact produced by the phase]

Branch points:
- [Gate/check/fallback and its effect]

External boundaries:
- [HTTP/RPC/service call or `None identified`]

### Phase N: [Short phase name]

Trigger / entry condition:
- [What starts this phase?]

Entrypoints:
- `path/to/file.ts:[functionName]`

Ordered call path:
1. [Short, concrete action]
   ```ts
   // Source: path/to/file.ts#L28
   [sudocode for this step only]
   ```

State transitions / outputs:
- Input: [state/args entering the phase]
- Output: [state/value/artifact produced by the phase]

Branch points:
- [Gate/check/fallback and its effect]

External boundaries:
- [HTTP/RPC/service call or `None identified`]

## State

### Core state / ordering risks

- `[state_name]`: [where the value is written/derived], first consumed by [consumer], [ordering/representation caveat if any]

### Runtime controls (or `None identified`)

| Name | Kind | Where Read | Effect on Flow |
|---|---|---|---|
| [e.g., migrate_gmail] | [statsig/env/cli/config/request] | `path/to/file.ts` | [behavior change] |

### Notable gates

- `[gate/check name]`: [what it gates and where]
- `[route/type check]`: [how it changes the flow]

## Sequence diagram

Draft with `$dev.diagram`. Prefer an ASCII box diagram unless preserving an existing format or the user explicitly asks for Mermaid.

```
+----------------------+
| [entry / trigger]    |
+----------------------+
          |
          v
+----------------------+
| [phase / decision]   |
+----------------------+
   | yes         | no
   v             v
+-----------+ +-----------+
| [path A]  | | [path B]  |
+-----------+ +-----------+
```

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
