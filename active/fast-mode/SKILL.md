---
name: fast-mode
description: Run in fast-mode with only explicitly allowed skills.
---

# Fast Mode

Enable fast-mode execution for the current task.

## Resolve Config

1. Read `CONFIG_DIR` from environment.
2. If not set, default to `~/.llm/fast-mode/config.json`.
3. Resolve allow-list path:
- If `CONFIG_DIR` ends with `.json`, use `dirname(CONFIG_DIR)/allow_list.json`.
- Otherwise use `CONFIG_DIR/allow_list.json`.

## Load Allow List

Use JSON object format:

```json
{
  "allow_list": ["skill-a", "skill-b"]
}
```

If the file is missing, unreadable, or invalid JSON, treat `allow_list` as empty.

## Fast-Mode Policy

1. Do not read any skills by default.
2. Go straight to task execution.
3. Only read/use a skill when its exact name is in `allow_list`.
4. Skip all non-whitelisted skills, even if they would normally trigger.
5. Keep responses concise and execution-first.

## Enforcement Notes

- Apply this policy only for the current invocation unless the user requests ongoing fast-mode.
- If no skills are whitelisted, continue with zero skill loading.
- Prefer direct tool usage and concrete execution over process narration.

## Example

Given:
- `CONFIG_DIR=~/.llm/fast-mode/config.json`
- `~/.llm/fast-mode/allow_list.json` contains `{"allow_list":["dev.code"]}`

Behavior:
- Load only `dev.code` when needed.
- Skip every other skill.
- Proceed directly with task work.
