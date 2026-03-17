---
name: docy
description: Manage reusable reference docs for agent work through a small doc registry and CLI. Use when an agent should inject focused guidance into the current context or install durable rules into AGENTS.md, especially for language rules, core policies, framework/vendor behavior, or special-topic references such as backwards-compatibility policy.
dependencies: []
---

# Docy

## Overview

Keep policy and reference docs small, named, and injectable. Use the bundled `docy`
CLI to print a doc into the active context with `inject` or to install a durable
managed rule block into `AGENTS.md` with `install`.

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

Apply the lightest doc set that covers the task:

1. Always inject every relevant doc under `references/core/` before using any more
   specialized material.
2. Inject `references/lang/<language>.md` when the task depends on language-specific
   rules or idioms.
3. Inject `references/vendor/<dependency-or-framework>.md` when the task depends on
   framework, library, or platform behavior.
4. Inject `references/ref/<topic>.md` for focused policies, constraints, or one-off
   topics that should shape the solution.

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

- `references/vendor/lerna.md`: Modern Lerna operating guidance for agents. Use before changing, validating, or releasing code in a Lerna-managed monorepo.
- `references/ref/no-back-compat.md`: Hard-cut product policy. Use before changing
  codepaths that would otherwise introduce migrations, fallback behavior, adapters,
  or other backwards-compatibility glue.
