---
name: learn
description: learn from the current session
version: 0.0.0
---

# Learn

Learn from current session

## Capabilities

- consolidate learnings from conversation and persist it in learnings log
- identify mistakes or uncertainty points in the current conversation
- identify areas of optimization that could improve the speed or quality of this task in the future

## Workflow
1. Review the full conversation and list any points where you made a mistake or were uncertain.
2. For each item, write a short analysis using the required template.
3. If there are no mistakes or uncertainties, state that explicitly.

## Required Output Template

Use this exact structure for each item to create a numbered list:

```
## [number] Improvement Opportunity
[describe the mistake or optimization opportunity]

### Why
[describe why]

### Learning
[what you learned]

### Recommendations
[what to remember to not make this mistake again]
```

Write learnings to $HOME/.llm/skills/learn/learnings-[agent-session-id].md. Use `dev.llm-session` skill to get session id. If `$HOME/.llm/skills/learn` does not exist, create it.