---
name: meta.learn
description: learn from the current session or run a time-bounded review across sessions
version: 0.0.0
---

# Learn

Learn from the current session, or run a multi-session review over a time interval.

## Capabilities

- consolidate learnings from conversation and persist it in learnings log
- identify mistakes or uncertainty points in the current conversation
- identify areas of optimization that could improve the speed or quality of this task in the future

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
