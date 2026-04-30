---
name: create-task
description: Create tracked tasks or issues with session context.
---

# Create Task

Create tasks on target platforms with a consistent workflow and metadata.
Current target support is GitHub Issues.

## Required Footer

Always append this block at the end of the task body:

```markdown
### Context
- session: [llm-session]
```

Rules:
- Keep this section as the final block in the task body.
- Keep the heading and bullet key exactly as shown.
- Replace `[llm-session]` with the real session ID when known.
- If the session ID is not available, keep `[llm-session]` placeholder.

## Workflow

1. Identify the target platform.
2. Gather task details: title, body content, tags, due date, assignees, and custom fields.
3. Build final body by appending the required `Context` footer.
4. Execute task creation using the target reference instructions.
5. Confirm result with task URL/ID and the applied metadata.

## Supported Targets

- `github`: `references/github.md`

## Add A New Target

For each new target, add `references/<target>.md` and include all required sections:

1. `## Authentication`
2. `## Add task`
3. `## Add tags`
4. `## Add due dates`
5. `## Custom fields`

After adding a target reference:
- Add the target entry under `Supported Targets`.
- Keep commands executable and deterministic.
- Include at least one concrete creation example that appends the required `Context` footer.
