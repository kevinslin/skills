# [Target] State Doc

## meta

- target_file: `path/to/file`
- target_symbol: `[ClassName | functionName | ComponentName]`
- updated: YYYY-MM-DD
- scope: `[terminal render/return outputs only | other if explicitly requested]`
- reachability: `reachable outputs only`
- output_ordering: `code evaluation order`
- output_id_policy: `stable O# ids; renumber only on semantic output changes`
- statsig_mode: `[best-effort | complete]`

## inputs

### direct inputs

- [props/args]

### runtime inputs used in predicates

- [hooks, store selectors, metadata fields, context, feature flags]

### statsig inputs

- gate/config: `[name]`
  - where read: `path/to/file`
  - `statsig:kevin` -> [value, rule_name/rule_id]
  - `statsig:consumer` -> [value, rule_name/rule_id]
  - `statsig:enterprise` -> [value, rule_name/rule_id]
  - notes: [best-effort limitations if any]

### statsig snapshot

- evaluated_at_utc: `YYYY-MM-DDTHH:MM:SSZ`
- environment_tier: `[development|staging|production|unknown]`
- payload_labels_used:
  - `statsig:kevin`
  - `statsig:consumer`
  - `statsig:enterprise`
- rule_mapping_notes:
  - [include matched `rule_id` and `rule_name`; if unavailable, say so explicitly]

## intermediary state

### derivation ledger: [derived_value_name]

- value: `[derived value]`
- source values: [list]
- source_of_truth: `path/to/file[:line]`
- setter_helper: `[helperFunctionName(...)]`
- undefined_or_null_causes:
  - [cause 1]
  - [cause 2]
- first_consumer: `path/to/file[:line]`
- purpose: [how this value impacts output selection]
- derivation:
```ts
// source: path/to/file
[sudocode expression/branch for derived value]
```
- set conditions:
1. [condition branch]
2. [condition branch]

### [one-level-down helper derivation]

- helper: `[helperFunctionName(...)]`
- role in output selection: [short description]
- logic:
```ts
// source: path/to/helper-file
[sudocode for value-setting branches]
```

## outputs

### O1. [output label]

Reachability proof:
- mode: `[observed | static-proof-only]`
- evidence: `[log/test/code reasoning]`

Precedence / Shadowing:
- [shadowed by `O#` when ...]

Minimal trigger fixture:
```ts
// source: path/to/file
[minimal input/state payload that satisfies this output]
```

Condition:
```ts
// source: path/to/file
[full branch predicate exactly as evaluated]
```

Requires:
- [direct input requirement]
- [derived state requirement]

Terminal output:
```tsx
// source: path/to/file
[returned node/snippet]
```

### O2. [output label]

Reachability proof:
- mode: `[observed | static-proof-only]`
- evidence: `[log/test/code reasoning]`

Precedence / Shadowing:
- [shadowed by `O#` when ...]

Minimal trigger fixture:
```ts
// source: path/to/file
[minimal input/state payload that satisfies this output]
```

Condition:
```ts
// source: path/to/file
[full branch predicate exactly as evaluated]
```

Requires:
- [direct input requirement]
- [derived state requirement]

Terminal output:
```ts
// source: path/to/file
[return value/snippet]
```

[repeat for all reachable terminal outputs]

## known unknowns

- `[confidence: high|medium|low]` [unknown behavior or unresolved branch]
- `[confidence: high|medium|low]` [unknown behavior or unresolved branch]

## Manual Notes

[keep this for the user to add notes. do not change between edits]

## Changelog

- [date]: [description of update] ([agent session id])
