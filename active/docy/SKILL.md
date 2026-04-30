---
name: docy
description: Load reusable reference docs for coding-related agent work.
dependencies: []
---

# Docy

## Overview

Keep policy and reference docs small, named, and injectable. For coding-related
tasks, start by loading the baseline rules from `./references/core/`, then return to
this skill only when the task needs additional targeted guidance. Use the bundled
`docy` CLI to print a doc into the active context with `inject` or to install a
durable managed rule block into `AGENTS.md` with `install`.

## Doc Layout

All managed docs live under `./references/` and follow this layout:

```sh
./references/
# language specific
- lang/
# always be injected
- core/
# frameworks/dependencies
- vendor/
# special topics
- ref/
    - commit-messages.md: Repo-aware commit message drafting; inspect local
      history and mirror conventions before writing a subject line
    - execution-trace.md: How to write runtime-ordered execution trace docs
    - no-back-compat.md: Hard-cut product policy; no backwards compatibility
    - remove-feature.md: Feature removal hygiene; remove stale docs/tests and
      record spec drift in changelog
```

## Loading Rules

For coding-related tasks, use this loading order:

1. At startup, inject every doc under `./references/core/`. Treat these as the
   default rule set, not an optional filter.
2. After the core docs are loaded, add non-core docs selectively based on the task.
3. Inject `./references/lang/<language>.md` only when the task depends on
   language-specific rules or idioms.
4. Inject `./references/vendor/<dependency-or-framework>.md` only when the task
   depends on framework, library, or platform behavior.
5. Inject `./references/ref/<topic>.md` only for focused policies, constraints, or
   one-off topics that should shape the solution. For example, inject
   `./references/ref/remove-feature.md` before removing an existing feature.

## CLI

Run the bundled CLI directly or put `scripts/` on `PATH`.

```bash
docy inject ref/commit-messages
docy inject ref/no-back-compat
docy inject ref/remove-feature
docy inject ref/openclaw-agent-plugins
docy inject ref/execution-trace
docy inject vendor/lerna

docy install ref/commit-messages
docy install ref/no-back-compat
docy install ref/remove-feature
docy install ref/openclaw-agent-plugins
docy install ref/execution-trace
docy install vendor/lerna
```

Command behavior:

- `inject`: Print the referenced doc to stdout for immediate context injection.
- `install`: Add or update a managed block in the nearest `AGENTS.md` so the rule
  remains durable for later sessions.

## Available Docs

- `./references/core/main.md`: Core documentation hygiene. Use to keep adjacent
  specs, flows, and other durable docs synchronized when an architectural change
  invalidates older guidance.
- `./references/vendor/lerna.md`: Modern Lerna operating guidance for agents. Use before changing, validating, or releasing code in a Lerna-managed monorepo.
- `./references/ref/commit-messages.md`: Repo-aware commit message drafting. Use
  before writing a commit message so the subject mirrors recent local history
  instead of forcing one universal style.
- `./references/ref/python-preferred-modules.md`: Python dependency preferences. Use before building runtime validation or CLI behavior from scratch in Python projects.
- `./references/ref/typescript-preferred-modules.md`: TypeScript dependency preferences. Use before building runtime validation or CLI behavior from scratch in TypeScript projects.
- `./references/ref/openclaw-agent-plugins.md`: OpenClaw plugin authoring guidance. Use before creating or expanding an OpenClaw plugin so capability ownership, entrypoint shape, SDK imports, and route/setup boundaries stay aligned with the architecture docs.
- `./references/ref/execution-trace.md`: Execution trace writing guidance. Use before documenting initialization, startup, request, job, command, or other runtime flows where ordered control flow matters.
- `./references/ref/no-back-compat.md`: Hard-cut product policy. Use before changing
  codepaths that would otherwise introduce migrations, fallback behavior, adapters,
  or other backwards-compatibility glue.
- `./references/ref/remove-feature.md`: Feature removal hygiene. Use before deleting
  or sunsetting an existing feature so docs, tests, and changelog entries stay
  consistent while historical specs remain unchanged.
