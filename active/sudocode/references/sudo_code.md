# SudoCode

SudoCode is a compact sudocode style for describing real code paths. Keep it grepable, linear, and behavior-accurate.

## Basic Concepts

- `ATOM` = `Variable | Expression`

## Operators

- nullish coalescing: `<ATOM1> ?? <ATOM2>`
  - If `ATOM1` is present (not null/undefined), use it; otherwise use `ATOM2`.
- derive value: `<ATOM1> := <ATOM2>`
  - `ATOM1` is derived from logic determined by `ATOM2`.

## Core Rules

- Keep symbols grepable.
  - Use exact function names, variable names, and field names from source code.
  - Never rename identifiers to stylistic aliases.
- Keep sudocode lightweight.
  - Remove unnecessary `()` for no-arg calls when clarity remains.
  - Remove trailing `;`.
  - Do not add type hints.
- Keep execution linear.
  - Prioritize the main path and key branch points.
  - Preserve runtime ordering in the sudocode ordering.

## Simplification Rules

- Remove non-essential plumbing.
  - Collapse pass-through setup when it does not change behavior.
  - Keep behavior-changing setup explicit.
- Inline short referenced logic.
  - If a referenced function body is under ~5 lines and inlining improves readability, inline at callsite.
  - Keep the original call and attach the inlined body.
- Do not over-inline.
  - Keep medium/large helper logic separate.
  - Avoid inlining that makes the flow harder to scan.

## Inlining Code (Callsite Syntax)

Use inlining to keep sudocode readable in one linear pass.

When to inline:

- The referenced function body is short (about 5 lines or fewer).
- Inlining improves readability at the current branch or callsite.

When not to inline:

- The function body is medium/large.
- Inlining would hide important boundaries or make scanning harder.

Required syntax:

```ts
target_call(args) { // comment here with filename of inlined function if different from filename of callsite
  // inlined body from target function
}
```

Rules:

- Keep the original call (`target_call(args)`) and attach the inline body block.
- Preserve identifiers exactly as in source (`self`, `runner`, `effective_run_once`).
- Inline only behavior-relevant lines; skip plumbing that does not change behavior.
- Do not duplicate full function definitions in the same snippet when callsite inline already captures intent.

Callsite inline example:

```ts
runner.run_forever(limit=limit) {
  while True
    self.run_once(limit=limit)
    time.sleep(self.config.poll_interval_seconds)
}
```

## Preserve These Behaviors

- Behavior-changing branches and guards:
  - feature flags
  - first-run gates
  - force/dedupe rules
  - sync vs parallel paths
- State and side effects:
  - persisted state writes
  - lifecycle-defining log writes
  - run/materialization writes
- Error contracts:
  - raised errors and their branch conditions
  - fallback paths

## Review Checklist

- Can each sudocode line be mapped back with `rg`?
- Is the main flow readable top-to-bottom without jumping?
- Did I remove only plumbing and keep behavior?
- Are key branches and side effects still explicit?
- Did I avoid duplicating the same logic in multiple places?

## Examples

### 1. Loops outer-loop transformation

- input
```ts
function _run_outer_loop(
  config_path: Path,
  run_once: boolean,
  limit: number | null,
  force: boolean | null,
  task_url: string | null = null
): void {
  let config = load_config(config_path);
  let effective_loop_config = config.loop_config;

  let force_override = force;
  if (task_url !== null) {
    force_override = true;
  }
  if (force_override !== null) {
    effective_loop_config = replace(effective_loop_config, { force: force_override });
  }

  config = replace(config, { loop_config: effective_loop_config });
  const runner = new OuterLoopRunner({
    config,
    loops_root: _resolve_loops_root(config_path),
  });

  const effective_run_once = run_once || task_url !== null;
  if (effective_run_once) {
    runner.run_once({ limit, forced_task_url: task_url });
  } else {
    runner.run_forever({ limit });
  }
}
```

- output
```ts
function _run_outer_loop(config_path, run_once, limit, force, task_url=None)
  config := load_config(config_path)
  effective_loop_config := config.loop_config with CLI overrides from force and task_url
  config := replace(config, loop_config=effective_loop_config)

  runner := OuterLoopRunner(
    :=config,
    loops_root=_resolve_loops_root(config_path),
  )

  effective_run_once := run_once or task_url is not None
  if effective_run_once
    runner.run_once(limit=limit, forced_task_url=task_url)
  else
    runner.run_forever(limit=limit) {
      while True
        self.run_once(limit=limit)
        time.sleep(self.config.poll_interval_seconds)
    }
```

Why this adheres to best practices:

- Uses exact code identifiers for grepability (`_run_outer_loop`, `effective_run_once`, `run_forever`).
- Preserves behavior-critical branches (`effective_run_once` split and recurring poll loop).
- Keeps the callsite linear by retaining the call and inlining the short `run_forever` body.
- Removes non-essential setup detail while retaining behavior-changing config derivation.
