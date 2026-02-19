# [Target] State Doc

## meta

- target_file: `path/to/file`
- target_symbol: `[ClassName | functionName | ComponentName]`
- updated: YYYY-MM-DD
- scope: `[terminal render/return outputs only | other if explicitly requested]`
- reachability: `reachable outputs only`
- output_ordering: `code evaluation order`
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

## intermediary state

### [derived_value_name]

- source values: [list]
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

### 1. [output label]

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

### 2. [output label]

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

## Manual Notes

[keep this for the user to add notes. do not change between edits]

## Changelog

- [date]: [description of update] ([agent session id])

