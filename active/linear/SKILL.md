---
name: linear
description: Manage Linear issues and projects through `linear-cli`.
dependencies: []
---

# Linear

Use `linear-cli` for all Linear reads and writes unless the user explicitly asks for a different interface.

If `linear-cli` is not installed, read [references/setup.md](references/setup.md) and complete the one-time setup before continuing.

## Core Workflow

1. Confirm the CLI is available with `command -v linear-cli`.
2. Confirm auth state with `linear-cli auth status --output json`.
3. Resolve the target workspace before any write:
   - `linear-cli api query --output json '{ organization { id name urlKey } }'`
4. Clarify scope before mutating anything:
   - project, team, issue identifier, labels, cycle, or status as needed
5. Read first:
   - use `list`/`get` commands to build context before `create`/`update`/`delete`/`archive`
6. For destructive or bulk actions, build the command with an explicit environment instead of relying on layered shell inheritance:

```bash
env -i \
  HOME="$HOME" \
  PATH="$PATH" \
  USER="$USER" \
  SHELL="$SHELL" \
  TERM="${TERM:-xterm-256color}" \
  linear-cli ...
```

7. Print the resolved organization from that explicit environment before destructive changes.
8. If the resolved workspace does not match the intended non-production target, stop unless the user explicitly approves production.
9. After any mutation, run a read-back verification and report the resulting IDs, names, states, and URLs.

## Common Commands

```bash
# Auth and connectivity
linear-cli auth status --output json
linear-cli doctor --check-api

# Workspace discovery
linear-cli teams list --output json
linear-cli projects list --output json --all
linear-cli issues list --output json --all

# Focused reads
linear-cli projects get <PROJECT_ID> --output json
linear-cli issues get <ISSUE_ID> --output json
linear-cli comments list <ISSUE_ID> --output json
linear-cli attachments list <ISSUE_ID> --output json

# Writes
linear-cli projects create "<NAME>" --team <TEAM> --output json
linear-cli issues create "<TITLE>" --team <TEAM> --output json
linear-cli issues update <ISSUE_ID> ... --output json
linear-cli projects archive <PROJECT_ID> --yes --output json
```

## Guidance

- Prefer `--output json` for anything that needs inspection, filtering, or structured reporting.
- Use `--all` on list commands when completeness matters; otherwise keep reads narrow.
- When a command returns sparse mutation output, verify with a follow-up `get` or GraphQL query instead of assuming success from the write response shape.
- When an action depends on workspace-specific names like team keys or status names, list them first instead of assuming they match another workspace.
- When the user asks for “existing issues” or similar ambiguous scope, default to the current project if one is obvious from context; otherwise clarify.
