### Overview

```ts
// ## Phase 1: [short phase name]

// 1.1 [entry/setup handoff]
// Source: path/to/file.ts#Lx-Ly
entrypoint(args)
state_a := ...
state_b := ...

// 1.2 [next major handoff]
// Source: path/to/file.ts#Lx-Ly
next_call(state_a, state_b) {
  helper_state := ...
  return downstream_call(...)
}

// ## Phase 2: [short phase name]

// 2.1 [core processing handoff]
// Source: path/to/core_file.ts#Lx-Ly
core_result := core_call(...) {
  intermediate := ...
  downstream := ...
  return final_core_result
}

// ## Phase N: [persist / serve / finalize]

// N.1 [terminal handoff]
// Source: path/to/final_file.ts#Lx-Ly
finalize_call(core_result)
return terminal_effect
```
