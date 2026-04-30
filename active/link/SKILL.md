---
name: link
description: Link the current Codex session to a durable Markdown task note.
dependencies: []
---

# link

Use this skill to turn a markdown file into the current task's durable source of truth.

## Workflow

1. Resolve the note path from the user's argument. Require a concrete `.md` path; expand `~`; preserve existing frontmatter and user-authored content.
2. Resolve the current Codex session id.
3. Add `session: <session-id>` to the note's YAML frontmatter. If the note has no frontmatter, create one.
4. Ensure the note has these sections, in this order when creating a new body:

```markdown
## Summary

## Tasks

## Notes

## Log
```

5. Write the task template into the note: concise summary, actionable checkbox tasks, notable findings under `## Notes`, and timestamped notable events under `## Log`.
6. During the rest of the turn, update the linked note whenever you take a major action, verify a major finding, make a recommendation, hit a blocker, or materially change diagnosis.
7. Before final response, skim the note and make sure the final answer matches the note's latest Summary / Tasks / Notes / Log.

## Session Id

Resolve the session id in this order:

1. `$CODEX_THREAD_ID`, if set.
2. The first `payload.id` from the current `~/.codex/sessions/**/rollout-*.jsonl` file, when the current session file is known.
3. The newest matching `session_id` from `~/.codex/history.jsonl`, only when the current user request text is searchable there.

Use the frontmatter key exactly:

```yaml
session: 019d6f5f-eb08-7052-b950-5038716be8da
```

If the note already has a different `session:`, do not overwrite it silently; add a Log entry and ask the user whether to replace it unless they explicitly requested replacement.

## Note Template

Use this structure for new notes or sparse notes:

```markdown
---
id: <preserve existing id or omit>
title: <preserve existing title or concise title>
desc:
tags:
status: ""
due: ""
updated: <epoch-ms when available>
created: <preserve existing created or epoch-ms>
session: <current-session-id>
---

## Summary

One or two concise paragraphs describing the task, current diagnosis / state, and verified scope.

## Tasks

- [ ] Concrete next task with enough context that another agent can resume it.
- [x] Completed task with the verified outcome, not just the activity.

## Notes

### Notable Findings

- Finding, evidence, and implication.

### Recommendations

- Task-shaped recommendation with owner / next verifier when known.

### Caveats

- Important uncertainty, residual risk, wrong turns, or evidence gap.

## Log

- YYYY-MM-DD HH:MM TZ: Created linked task note and associated session `<session-id>`.
- YYYY-MM-DD HH:MM TZ: Major action/finding/blocker.
```

## Update Rules

- Keep `## Summary` current; revise it when diagnosis changes.
- Keep `## Tasks` task-shaped; use checkboxes; check off only verified completion.
- Keep `## Notes` evidence-focused; include IDs, URLs, file paths, request IDs, timestamps, and code symbols when they matter.
- Keep `## Log` append-only; use short timestamped bullets.
- Update an `updated:` frontmatter field when it already exists. Prefer epoch milliseconds.
- Do not paste huge logs, raw transcripts, or long command outputs. Summarize the evidence and point to local artifact paths when useful.
- Do not replace a user's existing note wholesale. Patch the smallest section that keeps the task state accurate.
