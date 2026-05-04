---
name: ag-task
description: Read a Markdown task file, parse frontmatter, split work by level-2 headings outside code fences, and execute each section with subagents while keeping level-3 headings as ordered follow-on instructions for the same subagent.
dependencies: []
---

# ag-task

Use this skill when the user invokes `$ag-task` with a Markdown file or asks to run a Markdown task plan through subagents.

## Intake

1. Resolve the Markdown file path and read it before delegating.
2. Parse the file with the bundled helper from this skill directory:

```bash
./scripts/ag-task-parse "$TASK_FILE"
```

3. Treat YAML frontmatter as run metadata, not executable instructions. Apply clear fields such as `cwd`, `max_agents`, `agent`, `priority`, `depends_on`, `serial`, or `blocked_by` when present. User instructions in the chat override frontmatter.
4. Do not execute text before the first level-2 heading as a task. Use that preamble only as global context when it clearly applies to every task.

If the helper is unavailable, reproduce its parsing semantics: remove leading frontmatter first, then recognize ATX headings only when they are outside fenced code blocks and are not indented code.

## Task Model

- Each level-2 heading (`##`) starts one subagent lane.
- The level-2 title is the task name.
- The text after the level-2 heading up to the first level-3 heading is the initial task instruction.
- Each level-3 heading (`###`) inside that level-2 block is an ordered follow-on instruction for the same subagent.
- Keep follow-ons attached to their original level-2 lane. Do not redistribute them to other agents.
- Ignore headings inside fenced or indented code blocks, including nested examples that contain `##` or `###`.

If a level-2 section has no body before its first level-3 heading, use the title plus the first follow-on list as the initial context and still queue the follow-ons in order.

## Scheduling

1. Build a queue from all parsed level-2 tasks in file order. If the file has no level-2 tasks, stop and report that there is nothing to run.
2. Determine concurrency from frontmatter when it has a clear limit such as `max_agents`; otherwise use all available subagent capacity. If the tool surface does not expose a numeric capacity, start one subagent per ready level-2 task up to the practical session limit and backfill as agents finish.
3. Honor explicit dependency or serial hints in frontmatter or task text. Otherwise assume level-2 tasks are independent and schedule them concurrently.
4. Spawn one subagent per active level-2 lane. Include the source file path, source line numbers, relevant frontmatter, the initial task instruction, and the ordered follow-on titles.
5. Tell every subagent that it is not alone in the codebase, must not revert others' work, and must report changed files, tests run, blockers, and remaining follow-ons.
6. After the initial task completes, queue that lane's level-3 follow-ons to the same subagent in order. If the subagent tool supports ordered queued messages, enqueue them with "run after the previous item" wording; otherwise send the next follow-on only after the prior one completes.
7. Keep scheduling unstarted level-2 tasks onto free subagent capacity until every lane is complete or blocked.

Do not send follow-ons after a failed initial task unless the follow-on is clearly independent or the user explicitly approves continuing.

## Subagent Prompt Shape

Use a compact prompt like this for each level-2 lane:

```markdown
You are working on one lane from a Markdown task file.

Source: <path>:<start-line>
Task: <level-2 title>
Global metadata: <frontmatter summary>

Initial instruction:
<body before the first level-3 heading>

Queued follow-ons for this same lane:
1. <level-3 title> - lines <start-end>
2. <level-3 title> - lines <start-end>

You are not alone in the codebase. Do not revert edits made by others. Keep changes scoped to this lane, adapt to nearby changes, and report changed files, validation run, blockers, and whether the lane is ready for the next queued follow-on.
```

For each follow-on, send:

```markdown
Continue the same lane. Run this follow-on after the previous item:

Source: <path>:<start-line>
Follow-on: <level-3 title>
Instruction:
<level-3 body>
```

## Integration

1. Track every lane as `pending`, `running`, `blocked`, or `done`.
2. Review subagent results before trusting them, especially changed files and tests.
3. Resolve conflicts between lanes locally when needed.
4. Run the smallest validation that proves the completed lanes.
5. Close unused or completed subagents.
6. Final output should summarize completed lanes, blocked lanes, files changed, and validation.
