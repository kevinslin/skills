---
name: dev.shortcuts
description: Explicit shortcut trigger and usage guidance. Use when users invoke via `trigger` keyword
dependencies: []
---

## Context
Shortcuts are a small self-contained workflow that can be triggered via `trigger:<shortcut-name>`, for example `trigger:merge-pr`.

## Shortcut Location
Shortcuts can be in the following locations:

1. Under the skill-bundled `./references/shortcuts/` directory next to this `SKILL.md` (runtime mirror is typically `~/.codex/skills/dev.shortcuts/references/shortcuts/`).
2. Inlined in agent instructions under `## Shortcuts`. Shortcut is header text. Can be followed by a space with argument hints enclosed in `[arg_name]`
Examples
```
## Shortcuts

### Foo [arg1] [arg2]
Invokes a foo with [arg1] and [arg2]
```

## Available Bundled Shortcuts
This section is an inline index of the shortcut files bundled in `./references/shortcuts/`.
The file under `./references/shortcuts/[shortcut].md` remains the executable source of truth.

| Shortcut | Summary |
| --- | --- |
| `auto-merge` | Run `push-pr`, then `merge-pr-basic`. |
| `check-ci` | Watch PR checks and classify Buildkite failures before reporting status. |
| `checkout-worktree` | Use `arbor checkout` from the main checkout with an explicit worktree path, then verify cleanup. |
| `commit-code` | Run the canonical precommit flow, commit cleanly, and update the PR if one exists. |
| `fix-pr-conflict` | Rebase the current PR branch onto its base branch, resolve conflicts, and force-push. |
| `fix-pr` | Check out a PR, address review feedback, resolve review threads, and rerun CI. |
| `inline-shortcut` | Inline one or more shortcut definitions into another skill. |
| `merge-pr-basic` | Merge the current remote PR after confirming the branch is committed and checks passed. |
| `merge-pr` | Merge the remote PR when one exists, otherwise merge the local branch into `main`, then reconcile `main` and clean up the merged branch. |
| `plan-and-review` | Draft a feature spec with `specy`, review it with `dev.review`, then fold accepted feedback back into the spec. |
| `prepare` | Stash local changes, switch to local `master` or `main`, and pull latest from `origin`. |
| `precommit-process` | Run the canonical pre-commit review and validation workflow before committing. |
| `promote-shortcut-to-skill` | Convert a shortcut into a standalone skill and replace old shortcut references. |
| `push-code` | Commit if needed, then push the current branch. |
| `push-pr` | Commit if needed, push the branch, create a PR, then watch and fix CI as needed. |
| `rebase-and-fix` | Rebase the current branch onto a provided branch, fix PR conflicts, push, and check CI. |
| `sync-branch-push` | Rebase the current branch onto the remote default branch from `git remote show`, then force-push upstream with lease. |
| `sync-branch` | Rebase the current branch onto the remote default branch from `git remote show` and resolve conflicts if needed. |

## Maintenance
Keep the inline shortcut index above synchronized with the bundled shortcut files.

Whenever a file in `./references/shortcuts/` is added, removed, renamed, or materially changed, update the `Available Bundled Shortcuts` section in this `SKILL.md` in the same change.

This sync rule applies to:

- Shortcut names and trigger text
- One-line shortcut summaries
- Chaining guidance or examples in this `SKILL.md` that mention affected shortcuts

## Shortcut Trigger and Usage
Only `trigger:<shortcut-name>` invokes a shortcut. When present, resolve it in this order:

1. Exact file match in this skill's `./references/shortcuts/[shortcut].md`
2. Exact inlined match under `## Shortcuts` in active instructions

If the user asks to promote a shortcut to a skill, use `trigger:promote-shortcut-to-skill`.

If a shortcut doesn’t resolve, quickly scan the most relevant skill for similarly-named shortcuts before doing broader repo-wide searches.

## Shortcut Chaining
This involves using multiple shortcuts in sequence. Shortcut chaining is denoted by [shortcut1] -> [shortcut2]

Example:
`trigger:precommit-process -> trigger:create-pr`

## Trigger Gate

1. If the user request includes `trigger:`, scan this skill's `./references/shortcuts` directory first (canonical source).
2. If a shortcut matches, announce `Using [shortcut name]`.
3. Follow the shortcut exactly.
4. If no `trigger:` token is present, do not check or invoke shortcuts.
