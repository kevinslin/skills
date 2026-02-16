---
name: meta.learn
description: learn from the current session, run a time-bounded review across sessions, or reflect on a merged PR to identify simplicity and maintainability improvements. Use when asked to "learn", "review sessions", or "learn from PR"
version: 0.0.0
---

# Learn

Learn from the current session, or run a multi-session review over a time interval.

## Capabilities

- consolidate learnings from conversation and persist it in learnings log
- identify mistakes or uncertainty points in the current conversation
- identify areas of optimization that could improve the speed or quality of this task in the future
- identify desires you have to make things better next time

## Constants

- %%LEARN_ROOT: $HOME/.llm/skills/learn/
- %%LEARN_ARCHIVE: %%LEARN_ROOT/.archive

## Workflow
### Default (current session)
1. Review the full conversation and list any points where you made a mistake or were uncertain.
2. For each item, write a short analysis using the required template.
3. If there are no mistakes or uncertainties, state that explicitly.

### Review mode: `review [time interval] [path]`
Use this mode when the user asks to "review [time interval] [path]".
1. Use `dev.llm-session` to find all sessions in the requested time interval.
2. If `[path]` is provided, filter to sessions whose working directory is within that path (prefix match on absolute paths). If the interval or path is ambiguous, ask a clarifying question before proceeding.
3. For each matching session, repeat the Default workflow and produce a separate output file per session.
4. If no sessions match, state that explicitly.

### Code mode: `code`
Use this mode when the user asks to learn from the current coding session
1. Review the current coding session, and if a PR was submitted, any review comments that were addressed.
2. Read each changed file in the current codebase (post-merge state).
3. For each file, reflect with hindsight: knowing the full implementation now, what would you do differently to make the code simpler and more maintainable? Consider:
   - Duplicated patterns that could be consolidated
   - Abstractions that are too complex or too shallow
   - State management issues (stale state, missing resets, race conditions)
   - API surface problems (leaky internals, unnecessary casts, inconsistent naming)
   - Redundant logic (duplicate checks, dead code paths)
   - Missing edge cases discovered during or after implementation
4. For each finding, write an analysis using the Required Output Template.

### Archive Learning
A learning is archived when it has already been used. When the user archives a learning, move it to %%LEARN_ARCHIVE 

## Required Output Template

Use this exact structure for each item to create a numbered list:

```
## [number] Improvement Opportunity
- status: [triage|applied|ignored]

[describe the mistake or optimization opportunity]

### Why
[describe why]

### Learning
[what you learned]

### Recommendations
[what to remember to not make this mistake again]
```

Write learnings to %%LEARN_ROOT/{skillname}-{YYYY-MM-DD}-[agent-session-id]-[kebab-description-of-task].md. Use `dev.llm-session` skill to get session id(s). If `$HOME/.llm/skills/learn` does not exist, create it.
