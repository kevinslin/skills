---
name: land
description: Land completed work and update AGD status docs.
dependencies:
- ag-dir
---

# land

Use this skill at the end of a task before the final user-facing report.

## Workflow

1. Determine terminal status
- Mark the task as `Done` only when the requested scope is complete.
- Mark the task as `Blocked` when work cannot be completed now (missing info, missing permissions, external dependency, failing prerequisite, or partial delivery).

2. Update GitHub issue status when the task originated from an issue
- Detect issue origin from conversation context (issue URL/id, branch/PR linkage, or explicit "started from issue" instruction).
- If terminal status is `Done`, update the issue with a concise completion note and verification evidence.
- If terminal status is `Blocked`, update the issue with the blocker, attempted mitigation, and the next unblocking action.
- If direct GitHub write access is unavailable, prepare exact issue-update text for manual posting and include it in the final report.

3. If current workspace is an AG directory (`ag-dir`), sync durable docs
- Update `progress.md` with terminal state, blockers, and next actions.
- Update `memory.md` with durable decisions, constraints, and resolved facts (remove stale hypotheses).
- Update related task tracking files so they match terminal status (for example `specs/*.md` status sections and `.agents/runs/spec-*-progress.md`).

4. Run a consistency pass
- Ensure the terminal status in GitHub issue updates, AGD docs, and final user report all match.
- Prefer concrete references (issue id/link, changed files, and specific blockers/next actions).

## Done Checklist

- GitHub issue status is updated (or exact manual update text is provided).
- `progress.md` is updated when AGD is present.
- `memory.md` is updated when AGD is present.
- Related AGD task docs are updated when applicable.
