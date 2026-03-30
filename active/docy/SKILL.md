---
name: docy
description: Manage reusable reference docs for agent work through a small doc registry and CLI. Use at startup for coding-related tasks to load the baseline rule set from `references/core/`, then use again as needed to add language-specific, vendor-specific, or special-topic guidance or to install durable rules into `AGENTS.md`.
dependencies: []
---

# Docy

## Overview

Keep policy and reference docs small, named, and injectable. For coding-related
tasks, start by loading the baseline rules from `references/core/`, then return to
this skill only when the task needs additional targeted guidance. Use the bundled
`docy` CLI to print a doc into the active context with `inject` or to install a
durable managed rule block into `AGENTS.md` with `install`.

## Doc Layout

All managed docs live under `references/` and follow this layout:

```sh
references/
# language specific
- lang/
# always be injected
- core/
# frameworks/dependencies
- vendor/
# special topics
- ref/
    - no-back-compat.md: Hard-cut product policy; no backwards compatibility
```

## Loading Rules

For coding-related tasks, use this loading order:

1. At startup, inject every doc under `references/core/`. Treat these as the
   default rule set, not an optional filter.
2. After the core docs are loaded, add non-core docs selectively based on the task.
3. Inject `references/lang/<language>.md` only when the task depends on
   language-specific rules or idioms.
4. Inject `references/vendor/<dependency-or-framework>.md` only when the task
   depends on framework, library, or platform behavior.
5. Inject `references/ref/<topic>.md` only for focused policies, constraints, or
   one-off topics that should shape the solution.

## CLI

Run the bundled CLI directly or put `scripts/` on `PATH`.

```bash
docy inject ref/no-back-compat
docy inject vendor/lerna

docy install ref/no-back-compat
docy install vendor/lerna
```

Command behavior:

- `inject`: Print the referenced doc to stdout for immediate context injection.
- `install`: Add or update a managed block in the nearest `AGENTS.md` so the rule
  remains durable for later sessions.

## Available Docs

- `references/core/main.md`: Core documentation hygiene. Use to keep adjacent
  specs, flows, and other durable docs synchronized when an architectural change
  invalidates older guidance.
- `references/vendor/lerna.md`: Modern Lerna operating guidance for agents. Use before changing, validating, or releasing code in a Lerna-managed monorepo.
- `references/ref/no-back-compat.md`: Hard-cut product policy. Use before changing
  codepaths that would otherwise introduce migrations, fallback behavior, adapters,
  or other backwards-compatibility glue.
