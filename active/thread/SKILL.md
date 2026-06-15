---
name: thread
description: Create a new Codex thread from a prompt in the current project checkout. Use when the user asks for a new or separate thread with a prompt.
dependencies: []
---

# thread

Use this skill when the user asks to create a new Codex thread and provides, or clearly wants you to derive, the prompt to seed it with.

## Usage

```text
$thread [prompt]. use xhigh profile
```

- Parse an optional profile request from the user's prompt.
- Supported profiles:
  - `xhigh`: send the child-thread prompt with `model: gpt-5.5` and `thinking: xhigh`
- When no profile is requested, use the same profile as the existing thread by omitting `model` and `thinking` overrides.
- If the user names an unsupported profile, say so plainly rather than silently mapping it.

## Default behavior

When the user wants the new thread in the same project directory as the current thread:

1. Use `codex_app.fork_thread` with `environment: {"type":"same-directory"}`.
2. Compute the child title as `{parent-thread}/{topic-name}`.
3. Call `codex_app.set_thread_title` on the new thread with that computed title.
4. Send the requested prompt into the child with `codex_app.send_message_to_thread`.
   - If the user requested the `xhigh` profile, pass `model: "gpt-5.5"` and `thinking: "xhigh"`.
   - Otherwise omit `model` and `thinking` so the child uses the same profile/settings as the existing thread.
5. Update the child-thread registry file at `~/.llm/skills/threads/{parent-thread-id}.md`.
6. Verify before replying:
   - the child title still exactly matches `{parent-thread}/{topic-name}`
   - the registry entry uses that same `topic-name`
   - the returned deep link will be rendered as a clickable Markdown link
7. Return both:
   - the thread id
   - the Codex deep link `codex://threads/<thread-id>`

This same-directory fork is the preferred default because it reliably keeps the new thread in the current checkout without needing to rediscover a saved `projectId`.

## Prompt handling

- Use the user's prompt verbatim when they provide one.
- If they describe the work but do not phrase the exact prompt, write a concise execution prompt that preserves their intent, paths, constraints, and deliverable shape.
- Keep the seeded prompt task-focused. Include cwd, relevant file paths, and explicit output expectations when helpful.
- Treat profile directives such as `use xhigh profile` as execution settings, not as part of the child prompt body unless the user explicitly wants that text preserved.

## Title handling

- Prefer the current parent thread title as the `parent-thread` segment.
- Derive `topic-name` from the new thread's subject in 2-5 words.
- Keep the slash separator exactly as `{parent-thread}/{topic-name}`.
- If the user supplies an explicit topic name, use it for the right-hand segment.
- If the current parent title is unavailable, infer a short parent segment from the active thread context before falling back to a generic name.
- Keep the full title concise and scannable.

## Alternate path

If the user explicitly wants a clean new user-owned thread rather than a sibling fork, and the current saved project id is already available in context, use `codex_app.create_thread` with the current project target and local environment instead of `fork_thread`. After creation, still rename the thread to `{parent-thread}/{topic-name}` when a real `threadId` is available.

- If the user requested the `xhigh` profile, pass `model: "gpt-5.5"` and `thinking: "xhigh"` on `create_thread`.
- Otherwise omit `model` and `thinking` so the new thread uses the same/default profile behavior rather than forcing an override.

## Output

Report the result plainly:

- `Thread ID: <thread-id>`
- `Deep link: [codex://threads/<thread-id>](codex://threads/<thread-id>)`

Do not fabricate a deep link before a real `threadId` exists.

## Child thread registry

Keep a durable mapping for each parent thread in:

- `~/.llm/skills/threads/{parent-thread-id}.md`

Behavior:

- Create the directory if it does not exist.
- Use the active parent thread id for the filename.
- Store a mapping from `topic-name` to `child-thread-id`.
- Update the existing entry when the same `topic-name` is reused instead of appending duplicates.
- Preserve existing mappings for other topics.

Use a simple Markdown list so it is easy to inspect and edit manually:

```md
# Child Threads

- `topic-name` -> `thread-id`
- `other-topic` -> `other-thread-id`
```

## Notes

- `codex://threads/<thread-id>` is the deep-link shape for opening an existing thread.
- `codex://threads/new?...` exists for app navigation, but when fulfilling the user's request here, create the real thread first and return the real thread link.
