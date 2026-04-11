### Overview

### Phase 1: [short phase name]

```ts
// 1.1 [entry/setup handoff]
// Source: path/to/file.ts#Lx-Ly
entrypoint(relevant_arg, next_handoff_arg) {
  state_a := ...
  state_b := ...
  next_call(state_a, state_b)
}

// 1.2 [next major handoff]
// Source: path/to/file.ts#Lx-Ly
next_call(state_a, state_b) {
  helper_state := ...
  return downstream_call(...)
}
```

### Phase 2: [short phase name]

```ts
// 2.1 [core processing handoff]
// Source: path/to/core_file.ts#Lx-Ly
core_call(input_state, runtime_context) {
  intermediate := ...
  downstream := ...
  return final_core_result
}
```

### Phase N: [persist / serve / finalize]

```ts
// N.1 [terminal handoff]
// Source: path/to/final_file.ts#Lx-Ly
finalize_call(core_result, output_target) {
  return terminal_effect
}
```
