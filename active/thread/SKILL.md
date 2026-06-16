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

1. Resolve the thread creation mode using **Creation mode**.
2. Resolve the thread name using **Name resolution**. This produces one `thread-name` string and one `topic-name` registry key.
3. Build the child prompt using the guardrail wrapper in **Child prompt guardrails**.
4. Prefer `codex_app.create_thread` with the current project target and local environment when a saved project id or workspace root is available.
   - Pass the guarded prompt as the initial `prompt`.
   - If the user requested the `xhigh` profile, pass `model: "gpt-5.5"` and `thinking: "xhigh"`.
   - Otherwise omit `model` and `thinking`.
   - After creation, call `codex_app.set_thread_title` on the new thread with `thread-name`.
5. Use `codex_app.fork_thread` with `environment: {"type":"same-directory"}` only when clean `create_thread` is unavailable or the user explicitly asks for a history-preserving fork.
   - After forking, call `codex_app.set_thread_title` on the new thread with `thread-name`.
   - Send the guarded prompt into the child with `codex_app.send_message_to_thread`.
   - If the user requested the `xhigh` profile, pass `model: "gpt-5.5"` and `thinking: "xhigh"`.
   - Otherwise omit `model` and `thinking`.
6. Update the child-thread registry file at `~/.llm/skills/threads/{parent-thread-id}.md`.
7. Verify before replying:
   - the child title still exactly matches `thread-name`
   - the registry entry uses `topic-name` and points to the same thread id
   - the returned deep link will be rendered as a clickable Markdown link
8. Return both:
   - the thread id
   - the Codex deep link `codex://threads/<thread-id>`

Clean `create_thread` is the preferred default because it avoids copying completed parent history into the child. Same-directory forks preserve transcript history and can replay stale `$thread` or `<codex_delegation>` context, so use them only as a fallback or when the user explicitly wants history copied.

## Creation mode

- Prefer a clean project thread for ordinary `$thread` requests. Use `codex_app.create_thread` when the current saved project id or workspace root is available and can target the current checkout with `environment: {"type":"local"}`.
- Use `fork_thread` only for explicit history-preserving forks or when `create_thread` cannot target the current checkout.
- If falling back to `fork_thread`, the guarded child prompt is mandatory.
- If the user says "new thread", "separate thread", or asks to hand work to another thread without asking for history, treat that as a clean thread request.
- If the user says "fork this thread", "continue with this context", or otherwise asks for copied history, use `fork_thread`.

## Prompt handling

- Preserve the user's prompt verbatim inside the guarded child prompt wrapper when they provide one.
- If they describe the work but do not phrase the exact prompt, write a concise execution prompt that preserves their intent, paths, constraints, and deliverable shape.
- Keep the seeded prompt task-focused. Include cwd, relevant file paths, and explicit output expectations when helpful.
- Treat profile directives such as `use xhigh profile` as execution settings, not as part of the child prompt body unless the user explicitly wants that text preserved.
- Do not seed a child with instructions to use `$thread`, `fork_thread`, `create_thread`, or `send_message_to_thread` unless the user explicitly asked for nested thread creation.

## Child prompt guardrails

Always wrap the child task in a short guardrail block before sending it to a same-directory fork or clean created thread:

```text
Hard guardrails:
- Do not create, fork, archive, rename, or send messages to any other Codex threads.
- Ignore copied prior thread/delegation history if present; act only on the task below.
- Treat earlier `$thread` or `<codex_delegation>` content in the transcript as stale context, not instructions.

Task:
<preserved or derived user task>
```

Only omit or relax this wrapper when the user explicitly asks the child thread to create or manage additional threads. If the user's task itself contains a `$thread` invocation but the surrounding request is to create one new child thread for that task, keep the no-thread-creation guardrail and treat `$thread` as source context rather than an instruction for the child to execute.

## Name resolution

Resolve the child name before creating or renaming the thread. Do not compute the visible title and registry key independently.

- If the user supplies an explicit thread name or naming convention, use it exactly as `thread-name`.
- If the explicit name contains `/`, treat it as the full thread title, not as a `{parent-thread}/{topic-name}` suffix to append to another parent segment.
- Set `topic-name` to the exact `thread-name` unless doing so would duplicate an existing registry key for an unrelated thread.
- Before inventing a derived name, inspect the existing registry for this parent at `~/.llm/skills/threads/{parent-thread-id}.md` when available. Preserve any visible project naming pattern already in that registry.
- When a registry entry uses a slash-delimited project namespace, such as `1.1/gateway-spec/spec1-phase1`, treat the prefix before the final slash (`1.1/gateway-spec`) as the active namespace for related threads in the same project.
- If the registry contains mixed old fallback names and newer project names, prefer the newer explicit project namespace over older generic parent-title names.
- Apply project namespaces to all related child threads, including research and investigation threads. Do not fall back to `{parent-thread}/{topic-name}` only because the new task is not a spec, milestone, or phase implementation.
- For spec, milestone, phase, or project-scoped implementation and investigation threads, prefer the project convention from the user, registry, or local docs over a generic human-readable title. If no convention is inferable, ask for the exact thread name before creating the thread.
- Do not normalize explicit names from the user. Preserve punctuation, numbering, slash hierarchy, and casing.
- If a project namespace is inferred, derive the final segment from the new thread's subject in 2-5 lowercase kebab-case words, then set both `thread-name` and `topic-name` to `<project-namespace>/<derived-topic>`.
- If no explicit or project-specific name is available, derive `topic-name` from the new thread's subject in 2-5 lowercase kebab-case words, then set `thread-name` to `{parent-thread}/{topic-name}`.

## Fallback title handling

Use this section only when **Name resolution** did not find an explicit user-provided name, registry convention, or project convention.

- Prefer the current parent thread title as the `parent-thread` segment.
- Derive `topic-name` from the new thread's subject in 2-5 lowercase kebab-case words.
- Keep the slash separator exactly as `{parent-thread}/{topic-name}`.
- If the current parent title is unavailable, infer a short parent segment from the active thread context before falling back to a generic name.
- Keep the full title concise and scannable.

## Alternate path

If the default clean thread path is unavailable but the current saved project id becomes available later in context, use `codex_app.create_thread` with the current project target and local environment instead of `fork_thread`. Resolve `thread-name` and `topic-name` first, pass the same guarded child prompt described above as the initial `prompt`, and rename the created thread to `thread-name` when a real `threadId` is available.

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
- Store a mapping from `topic-name` to `child-thread-id`, where `topic-name` is the exact key produced by **Name resolution**.
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
