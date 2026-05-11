---
name: ag-learn
description: Improve skills from observed agent friction in sessions, PRs, or audits.
dependencies:
- ag-ledger
- dev.llm-session
- dev.shortcuts
- sc
version: 0.0.0
---

# ag-learn

Use this skill to turn agent mistakes, repeated friction, or useful workflow discoveries into better skills.

## Constants

- `LEARN_ROOT`: `$HOME/.llm/skills/learn`
- `LEARN_ARCHIVE`: `$HOME/.llm/skills/learn/.archive`
- `SKILL_TOKEN`: `ag-learn`

## Core Workflow

1. Identify the learning source: current session, named session, merged PR, pasted evidence, or review window.
2. Inspect enough durable evidence to understand the friction.
   - Good evidence: transcript excerpts, rollout JSONL, PR comments, diffs, logs, generated artifacts, command output, saved learn notes.
   - If transcript forensics are needed, read `./references/session-forensics.md`.
3. Decide whether the issue should change a skill.
   - Optimize an existing skill when the workflow already has a clear home.
   - Propose a new skill when repeated work has no clean home.
   - Use `none` when the lesson is too situational or not skill-shaped.
4. Read the target skill or shortcut source before judging the gap.
   - For skill changes, follow `../sc/SKILL.md` and edit only the canonical source tree.
   - For `trigger:<shortcut>` cases, resolve the shortcut through `../dev.shortcuts/SKILL.md` before classifying the mistake.
5. Produce 1-3 high-signal improvements. Do not pad with weak lessons.
6. Save a learn note only when the user asks for persistence, the finding should be reused, or the run is review/code/formal mode.

## Modes

- Default/current session: use the Core Workflow.
- `review [time interval] [path]`: read `./references/review-mode.md`.
- `code`: read `./references/code-mode.md`.
- Formal saved note or durable routing: read `./references/templates.md`.
- Session lookup, parent/fork tracing, or ledger logging: read `./references/session-forensics.md` and `./references/ledger.md`; use `../ag-ledger/SKILL.md` and `../dev.llm-session/SKILL.md` as needed.

## Output

For each improvement, keep the user-facing summary compact:

```markdown
1. [short title]
Evidence: [durable evidence checked]
Skill gap: [what the skill should have made easier or prevented]
Target: [existing skill, proposed skill, or none]
Proposed change: [implementation-ready change, or n/a]
Promote: [yes|no]
```

When saving a note, write it under `LEARN_ROOT` with a filename containing the literal `ag-learn` token. Verify the saved path exists before reporting it.

## Archive Learning

When the user archives a learning, move it to `LEARN_ARCHIVE`.
