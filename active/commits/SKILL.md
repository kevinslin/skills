---
name: commits
description: Write repository-appropriate git commit messages by first checking local
  history, then matching that repo's conventions. Use when asked to draft a commit
  message, explain how a repo formats commits, or adapt commit style across different
  repositories.
dependencies:
- dev.conventional-commits
---

# Commits

Use this skill to draft commit messages that match the target repository instead of forcing one universal style everywhere.

## Workflow

1. Inspect the repo before drafting.
   - Run `git log -20 --pretty=format:'%s'`.
   - Look for the dominant header shape, common types, scope habits, and summary tone.
2. Pick the right profile.
   - If the repo has a strong local pattern, mirror it.
   - If the repo is inconsistent, fall back to the base guidance in [`dev.conventional-commits`](../dev.conventional-commits/SKILL.md).
3. Draft from the actual diff.
   - Keep the subject short, imperative, and specific.
   - Use a scope only when it adds clarity.
   - Do not claim work that is not in the change.
4. Sanity-check the result.
   - Make sure the type matches the change.
   - Keep repo-specific vocabulary intact.
   - Add a body only when the repo expects one or the change needs rationale.

## Repo Guidance

Read [`references/repo-profiles.md`](references/repo-profiles.md) when you need concrete repo-specific guidance.

That file currently includes:

- `skills-public`, based on the previous 20 commits in the repo
- generic conventional-commit repos
- loose imperative repos

## Quick Rules

- New capability: use the repo's feature-introducing type, often `feat`
- Incremental improvement: use the repo's improvement type, for example `enhance` in `skills-public`
- Documentation-only change: use `docs` when the repo uses typed headers
- Maintenance or sync work: use `chore` when the change does not read as a feature or fix

## Output

When the user asks how a repo formats commits, return:

1. The observed pattern from recent history
2. The recommended header template
3. One or two example commit messages for the current change

When the user asks for a commit message directly, return one preferred subject line and, if needed, one alternative when the type or scope is genuinely ambiguous.
