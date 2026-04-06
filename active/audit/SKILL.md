---
name: audit
description: "Audit a codebase for heuristic quality problems and route to focused audit subcommands documented under `./references/*.md`. Use when a user asks for a repo audit, code smell scan, or concrete findings plus improvement advice for a named heuristic. Current supported subcommand: `slop` for likely LLM-generated code slop."
dependencies: []
---

# Audit

Keep this file lean. Use it only to route the agent to the right subcommand reference.

## Subcommands

When the user clearly asks for one of these flows, lead with that subcommand and read the matching reference before acting. If the user names an unsupported audit, say so instead of inventing a workflow.

- `slop`: Audit a codebase for likely LLM-generated code slop such as cargo-cult abstractions, dead helpers, generic wrappers, and code that looks plausible in isolation but does not fit the repo. See `./references/slop.md`.

## Maintenance Rules

- Put the full workflow, heuristics, guardrails, and output requirements for each subcommand in `./references/{command}.md`.
- Add one reference file per subcommand and keep filenames identical to the subcommand name.
- Do not duplicate detailed command behavior in this file. Keep only routing guidance here.
- Prefer adding a new subcommand for a new audit heuristic instead of stretching `slop` to cover unrelated smells.
