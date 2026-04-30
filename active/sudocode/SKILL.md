---
name: sudocode
description: Write sudocode from real code for docs and specs.
---

# SudoCode

## When to Use This Skill

Invoke this skill whenever sudocode needs to be written.

Use this skill when:

- The user asks for `sudocode`.
- A flow doc or spec needs executable logic expressed in compact form.
- You need to transform source code into grepable, linear documentation logic.

## Required Reference

Always load and follow:

- `references/sudo_code.md`

This file is the canonical style guide for operators, inlining syntax, simplification rules, and review checks.

## Workflow

1. Read the source code you are summarizing.
2. Keep exact identifiers from code (function names, vars, fields).
3. Draft sudocode with a linear main flow and explicit behavior-changing branches.
4. Inline short referenced logic (about 5 lines or fewer) at the callsite using:

```ts
target_call(args) {
  // inlined body
}
```

5. Preserve behavior-critical side effects (state writes, logs, error branches).
6. Run the checklist in `references/sudo_code.md` before finalizing.

## Non-Negotiables

- Do not rename symbols to stylistic aliases.
- Do not add type hints to sudocode.
- Keep callsite + inline body when inlining (do not remove the original call).
- Remove plumbing detail only if behavior is unchanged.
