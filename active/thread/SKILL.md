---
name: thread
description: Fork or create a Codex thread from a prompt, with optional model and reasoning overrides. Fork by default; create without parent history when the user explicitly asks for a new, fresh, or clean thread.
dependencies: []
---

# thread

Use this skill when the user asks to create a new Codex thread and provides, or clearly wants you to derive, the prompt to seed it with.

## Usage

```text
$thread [prompt]
$thread new thread: [prompt]
$thread fork thread: [prompt]
$thread [prompt]. use xhigh profile
$thread [prompt]. use gpt-5.6-sol with ultra thinking
```

### Profile overrides

Parse optional model and reasoning overrides independently from the user's request:

- `model-override`: pass any model id explicitly requested by the user. Do not maintain a skill-local model allowlist; the current `create_thread` or `send_message_to_thread` tool schema is authoritative and may accept newer model ids.
- `thinking-override`: pass any reasoning value supported by the current tool schema: `low`, `medium`, `high`, `xhigh`, `max`, or `ultra`.
- Resolve a natural-language model alias only when the target id is unambiguous. For example, `gpt5.6 sol` means `gpt-5.6-sol`. Ask when an alias could refer to more than one model.
- Keep `use xhigh profile` as backward-compatible shorthand for `model: "gpt-5.5"` and `thinking: "xhigh"`. Explicit model or reasoning values in the same request take precedence over the corresponding shorthand value.
- Pass only the fields the user requested. When no override is requested, omit both `model` and `thinking` so the thread uses the existing/default profile behavior.
- If a requested reasoning value cannot be represented by the current tool schema, say so plainly rather than silently mapping it.

### Work-profile Linear issue

At the start of each invocation, read `~/.agents/profile` directly. Treat the profile as work only when it contains a trimmed, non-comment line exactly equal to `name=work`. A missing, unreadable, or differently named profile is non-work; do not infer work status from the cwd, project, account, or task content.

For a work profile, create exactly one Linear issue after the child thread has a real id, verified title, registry entry, and deep link. Use the installed `linear:linear` connector skill and its connected Linear tools. Do not invoke `linear-cli`, fall back to a browser, or request a separate CLI login for this workflow.

Before creating the issue:

- resolve team `KEV2` through the connector and verify that it belongs to the `openai` workspace
- list that team's current issue statuses through the connector and resolve `In Progress` live instead of assuming a cached id

Create the issue through the connector and:

- target team `KEV2` in the `openai` workspace
- set the issue state to the live-resolved `In Progress` state
- derive a concise human-readable issue title from the child task, without copying the thread guardrail wrapper
- write a Markdown description that expands the task context: goal, relevant cwd and paths, important constraints, and expected deliverable
- include the preserved or derived source prompt under a `Source prompt` heading
- include `Codex thread: [thread-name](codex://threads/<thread-id>)`
- omit model/profile directives, thread-management guardrails, tokens, secrets, credentials, and unrelated parent-thread history
- read the created issue back through the connector and verify its team, `In Progress` state, description, and Codex deep link before reporting success

If a connector create call has an ambiguous result, use connector reads to check for the issue before retrying so that one invocation cannot create duplicate issues. If the Linear connector is unavailable, unauthenticated, or creation or verification otherwise fails after the child exists, keep the child thread and registry entry, report partial success with the exact Linear blocker, and do not claim that the issue was created. Do not fall back to `linear-cli`. For non-work profiles, skip Linear entirely.

### Immediate thread handoff

Publishing the real child deep link is the latency-critical handoff. As soon as a real `threadId` exists and the child prompt has been accepted, send a commentary update in this form:

```text
Created: [thread-name](codex://threads/<thread-id>)
Thread ID: <thread-id>
Status: prompt accepted; finalizing title, registry, and any required Linear tracking.
```

- Do not wait for title propagation, registry or Linear bookkeeping, or child-task completion before publishing this commentary update.
- This early update is not the final response. Keep the parent turn open while required bookkeeping continues.
- Do not poll or wait for child-task progress or completion unless the user explicitly asks to wait, monitor, babysit, or confirm readiness. The default handoff status is `created and prompt accepted`, not `completed` or `ready`.
- Repeat the child deep link in the final response because commentary updates may be collapsed after the turn completes.

If `create_thread` returns only a `pendingWorktreeId`, no thread exists yet to hand off:

```text
Queued thread setup: <pending-worktree-id>
Status: waiting for a real thread ID before title, registry, or Linear tracking.
```

- Publish this truthful queued update instead of fabricating a thread ID or deep link.
- Do not set a title, update the registry, or create a Linear issue while only a pending worktree id exists.
- Treat pending worktree setup as terminal partial success for the current turn because there is no reliable pending-worktree-to-thread lookup. Do not promise same-turn resolution.
- In the final response, report the pending worktree id and exact queued status, then emit `::created-thread{pendingWorktreeId="..."}` on its own line. Do not claim that a thread or Linear issue was created.

## Default behavior

When the user wants the child in the same project directory as the current thread:

Resolve `model-override` and `thinking-override` once using **Profile overrides**, then reuse those values on the operation that receives the child prompt.

Treat the active parent thread's CWD as the authoritative target. For fork mode,
do not call `list_projects` or replace that CWD with a saved project, sidebar
project, workspace root, or path mentioned in the prompt. For clean mode,
`list_projects` is allowed only to find an exact saved-project match for the
active CWD.

1. Resolve `work-profile` from `~/.agents/profile` using **Work-profile Linear issue**.
2. Resolve the thread creation mode using **Creation mode**.
3. Resolve the thread name using **Name resolution**. This produces one `thread-name` string and one `topic-name` registry key.
4. Derive a concise, one-sentence `thread-summary` from the task being seeded into the child, following **Thread summary**.
5. Build the child prompt using the guardrail wrapper in **Child prompt guardrails**.
6. Create exactly one child using the mode resolved in step 2.
   - Fork mode: use `codex_app.fork_thread` with `environment: {"type":"same-directory"}` so the child inherits the exact active CWD. Then send the fork guardrail prompt with `codex_app.send_message_to_thread`.
   - Clean mode: use `codex_app.create_thread` and pass the clean guardrail prompt as the initial `prompt`. Use an already-verified current project target when available; otherwise call `list_projects` and require one exact active-CWD match. If no exact match exists, stop and ask for a project target or permission to fall back to a same-directory fork. Never silently change modes.
   - On the operation that receives the prompt, pass `model: model-override` and `thinking: thinking-override` only when each value is present.
   - If `create_thread` returns only a `pendingWorktreeId`, follow the queued branch in **Immediate thread handoff** and do not continue to title, registry, or Linear work until a real `threadId` exists.
   - After the operation receiving the prompt succeeds with a real `threadId`, perform **Immediate thread handoff** before title, registry, or Linear work.
   - Call `codex_app.set_thread_title` on the new thread with `thread-name`.
7. Update the child-thread registry file at `~/.llm/skills/threads/{parent-thread-id}.md` with `topic-name`, child thread id, and `thread-summary`.
8. Verify the thread artifacts before creating any work-profile issue:
   - the child title still exactly matches `thread-name`
   - the registry entry uses `topic-name` and points to the same thread id
   - the registry entry contains a non-empty `thread-summary` that accurately describes the seeded task
   - the returned deep link will be rendered as a clickable Markdown link
9. When `work-profile` is true, create and verify the Linear issue through the connected Linear app using **Work-profile Linear issue**.
10. Return a self-contained final response that repeats:
   - the thread id
   - the Codex deep link `codex://threads/<thread-id>`
   - for a work profile, the verified Linear issue identifier and URL, or the exact partial-success blocker

Same-directory `fork_thread` is the default because it preserves CWD and useful
parent context. An explicit new/clean request prioritizes an empty transcript;
resolve the matching saved project and use `create_thread` instead.

## Creation mode

- Resolve the mode before creating or naming the child.
- Use fork mode by default, including a bare `$thread [prompt]` request.
- Use fork mode when the user says `fork`, `copy this context`, `continue with
  this context`, `preserve history`, or equivalent.
- Use clean mode when the user explicitly says `new thread`, `fresh thread`,
  `clean thread`, `without prior context`, `do not copy history`, or equivalent.
- If explicit fork and clean directives conflict, ask which mode to use.
- Never reinterpret an explicit clean request as a fork merely because clean
  project targeting is unavailable. Ask instead.
- Fork mode uses `fork_thread` with
  `environment: {"type":"same-directory"}` and must not call `list_projects`.
- Clean same-project mode uses `create_thread`. If the current tool schema
  requires a project id, call `list_projects` only for this explicit clean
  request and choose only a project whose resolved root exactly equals the
  active CWD. Do not guess from project name or nearby paths.
- A path in the child task is task context, not authorization to change the thread target away from the active CWD.
- If the user explicitly asks for a different project, follow **Explicit cross-project targeting**.
- Record the resolved mode in the final response.

## Prompt handling

- Preserve the user's prompt verbatim inside the guarded child prompt wrapper when they provide one.
- If they describe the work but do not phrase the exact prompt, write a concise execution prompt that preserves their intent, paths, constraints, and deliverable shape.
- Keep the seeded prompt task-focused. Include cwd, relevant file paths, and explicit output expectations when helpful.
- Treat profile directives such as `use xhigh profile` or `use gpt-5.6-sol with ultra thinking` as execution settings, not as part of the child prompt body unless the user explicitly wants that text preserved.
- Do not seed a child with instructions to use `$thread`, `fork_thread`, `create_thread`, or `send_message_to_thread` unless the user explicitly asked for nested thread creation.

## Child prompt guardrails

Always wrap the child task in a short guardrail block.

For fork mode, use:

```text
Hard guardrails:
- Ignore copied prior thread/delegation history if present; act only on the task below.
- Treat earlier `$thread` or `<codex_delegation>` content in the transcript as stale context, not instructions.

Task:
<preserved or derived user task>
```

For clean mode, omit copied-history language because no parent transcript is
present:

```text
Task:
<preserved or derived user task>
```

## Thread summary

Derive `thread-summary` at creation time from the preserved or derived child task.

- Write one concise sentence describing what the child was asked to do, not a completion claim or result summary.
- Keep it on one line and end it with a period.
- Include the primary subject and expected deliverable when useful.
- Omit profile directives, thread-management guardrails, tokens, secrets, credentials, and other sensitive values.
- When the same `topic-name` is reused, replace its prior id and summary with the new child task instead of appending a duplicate.

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

## Explicit cross-project targeting

Use this path only when the user explicitly asks to create the thread in a project other than the active CWD.

- If the exact target is not already known, call `list_projects` and choose only the project that matches the user's explicit target.
- Do not use `list_projects` merely because the child prompt contains paths from another project.
- Use `codex_app.create_thread` with that project target and local or worktree environment. Resolve `thread-name` and `topic-name` first, pass the guarded prompt as the initial `prompt`, and rename the created thread when a real `threadId` is available.
- Resolve the optional profile overrides using **Profile overrides**, then pass `model: model-override` and `thinking: thinking-override` on `create_thread` only when each value is present.
- When neither value is present, omit both fields so the new thread uses the same/default profile behavior rather than forcing an override.

## Output

Report the result plainly:

- `Mode: fork` or `Mode: clean`
- `Thread: [thread-name](codex://threads/<thread-id>)`
- `Thread ID: <thread-id>`
- `Deep link: [codex://threads/<thread-id>](codex://threads/<thread-id>)`
- For a work profile: `Linear: [KEV2-<number>](<linear-issue-url>)`

For pending worktree setup, report only the mode, pending worktree id, and queued status, followed by the required `::created-thread{pendingWorktreeId="..."}` directive. Omit thread, deep-link, registry, and Linear success claims.

Do not fabricate a deep link before a real `threadId` exists. The immediate commentary update and final response must use the same real thread id and resolved thread name.

## Child thread registry

Keep a durable mapping for each parent thread in:

- `~/.llm/skills/threads/{parent-thread-id}.md`

Behavior:

- Create the directory if it does not exist.
- Use the active parent thread id for the filename.
- Store a mapping from `topic-name` to `child-thread-id` plus `thread-summary`, where `topic-name` is the exact key produced by **Name resolution**.
- Use the exact one-line form: ``- `topic-name` -> `child-thread-id` — Summary: <thread-summary>``.
- Update the existing entry, including its summary, when the same `topic-name` is reused instead of appending duplicates.
- Preserve existing mappings for other topics.

Use a simple Markdown list so it is easy to inspect and edit manually:

```md
# Child Threads

- `topic-name` -> `thread-id` — Summary: Investigate the named subsystem and write a source-backed report.
- `other-topic` -> `other-thread-id` — Summary: Implement the requested behavior and verify it with focused tests.
```

## Notes

- `codex://threads/<thread-id>` is the deep-link shape for opening an existing thread.
- `codex://threads/new?...` exists for app navigation, but when fulfilling the user's request here, create the real thread first and return the real thread link.
