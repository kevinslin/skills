# State Doc Workflow

## Use When

- Mapping all reachable terminal outputs of a class/function/component
- Explaining which inputs and derived state are required for each output
- Debugging why a particular output is appearing (or not appearing)
- Capturing state-derivation helpers one level down from the target symbol

## Template

- `@references/state-doc/template.md`

## Output Location

- `$ROOT_DIR/state/{state-name}.md`

## State Naming Contract

- Use concise kebab-case for `{state-name}`.
- Prefer names that include the target symbol and scope, for example:
  - `foo-plugin-message-terminal-output-state`

## Authoring Requirements

- Exhaustively cover reachable terminal outputs only.
- List outputs in code evaluation order.
- Use full branch predicates exactly as evaluated (including negations and precedence).
- Include one-level-down helper derivations for state values that gate output selection.
- For each code/sudocode block, include a filename reference comment in the block.
- Use the `$sudocode` skill for explanations and sudocode blocks.
- If Statsig gating affects output selection:
  - Use the `$statsig` skill to evaluate values for:
    - `statsig:kevin` (user-supplied payload when available)
    - `statsig:consumer` (`plan_type` not `team`/`business`/`enterprise`)
    - `statsig:enterprise` (`plan_type` in `team`/`business`/`enterprise`)
  - Show matched rule names when available.
  - If evaluation is incomplete, mark it clearly as best-effort and state what is unknown.

## Instructions

1. Define target symbol and scope:
   - target file
   - target class/function/component
   - terminal output scope (render/return outputs only unless user says otherwise)
2. Copy `@references/state-doc/template.md` to `$ROOT_DIR/state/{state-name}.md`.
3. Read target code and capture all terminal outputs (`return null`, returned branch component, etc.) in code order.
4. Read one level down into helper functions used to derive output-gating values.
5. Populate `## inputs`:
   - direct function/component inputs (props/args)
   - runtime inputs used in predicates (hooks/store/metadata/context)
   - Statsig inputs read in target or one-level-down helpers
6. Populate `## intermediary state`:
   - derived values used for output decisions
   - exact derivation chains from source values to derived values
   - helper setter logic (when a derived value is true/false/undefined/etc.)
7. Populate `## outputs`:
   - numbered output sections
   - each section includes full predicate and the terminal output
   - include required upstream inputs/derived values for the output
8. Exclude unreachable-only combinations from output inventory; optionally note them separately if useful.
9. Keep source-cited sudocode concise and behavior-preserving.

