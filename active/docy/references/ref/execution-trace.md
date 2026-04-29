# Writing Execution Trace Docs

Use this guidance when documenting initialization, startup, request handling,
worker jobs, command execution, or any other flow where ordered control flow
matters.

Use the Rails initialization guide as a model for structure, not as a
language-specific template:
https://guides.rubyonrails.org/initialization.html

## Goal

Write a runtime walk, not a subsystem overview. The document should answer:

- What exact command, request, event, or job starts the flow?
- Which files, functions, and classes execute, in order?
- What state changes at each step?
- Where does control branch, return, defer, or cross subsystem boundaries?
- Where does this document intentionally stop?

## Recommended Outline

1. Title
   - Name the runtime event, not the broad subsystem.
   - Prefer `Gateway Image Attachment Execution Trace` over `Image Attachments Overview`.
2. Scope
   - State the entrypoint, environment, assumptions, and stop point.
   - Example: This traces `my-service start --env=dev` from CLI parsing through service initialization and runtime handoff. It does not trace the network server internals.
3. Trace Map
   - Include a compact ordered path before the detailed walk.
   - Example: `command -> wrapper -> boot config -> dispatch -> app load -> initializers -> runtime handoff`.
4. Execution Walk
   - Use numbered sections.
   - Make headings match source locations, functions, classes, or runtime frames.
5. Branches and Callbacks
   - Explain the active branch inline.
   - Mention important alternatives briefly, then return to the traced path.
6. Boundary Notes
   - Mark transitions between app code, framework code, libraries, runtime, network, storage, or external services.
7. Stop Point
   - End when control transfers to a different owner.
   - Name that next owner and why deeper internals are out of scope.

## Section Template

````markdown
### N. path/to/file.ext or FunctionName

Runtime position:
This runs after `<previous>` and before `<next>`.

Relevant source:

```language
short focused excerpt
```

Effect:
- Sets `<state>`
- Calls `<next function>`
- Establishes `<invariant>`

Control flow:
The next frame is `<path/function>`. If `<condition>`, control goes to `<alternate>`.

Why it matters:
One sentence explaining what the reader should carry forward.
````

## Transition Language

Use control-flow language instead of vague topic transitions.

Good:

- After `config/load` finishes, control returns to the command wrapper.
- The base-class call transfers execution into the shared runtime initializer.
- This call memoizes the constructed app, so the later `run` call reuses it.
- At this point, the flow crosses from application code into framework code.
- The callback is registered here, but it does not run until shutdown.

Avoid:

- Now let's talk about configuration.
- Next, the framework handles commands.
- This file is important.
- There are many options.

## What To Include

Include details that change runtime understanding:

- Real entry command, request, queue event, cron, webhook, or UI action.
- Exact file paths and function/class names.
- The live argument, option, env var, or object passed forward.
- State mutations: env vars, globals, instance variables, config objects, request context, DB writes.
- Dispatch decisions: aliases, command lookup, handler selection, feature gates.
- Handoffs between app code, framework code, libraries, runtime, and external services.
- Return points after base-class calls, callbacks, memoized calls, deferred execution, and module-loading chains.
- Scope boundaries and explicit "we stop here" notes.

## What To Exclude

Exclude anything that breaks the trace shape:

- Catalogs of every class in the subsystem.
- Full source dumps.
- Unused branches for other commands or modes.
- Historical background unless it explains the current call path.
- Configuration options not read by the traced invocation.
- Deep internals after the declared handoff point.
- For-completeness sections that do not affect execution.

## Branches and Callbacks

Handle branches at the decision point:

```markdown
For this trace, the parsed command is `start`, so dispatch calls
`CommandRegistry.invoke("start", args)`.

Other branches:
- `serve` aliases to `start`.
- Unknown commands print usage and exit.
- `--help` prints command help without initializing the service.

Only the first branch continues in this document.
```

Separate callback registration from callback execution:

```markdown
This registers `afterStop`, but the callback is not executed here. It is passed
into `runtime.start` and runs only when the process stops.
```

For lifecycle hooks, group by runtime order rather than owner:

```markdown
Bootstrap hooks run first, application hooks run next, and finisher hooks run
last. Middleware or handler construction belongs in the finisher phase because
that is when the app becomes runnable.
```

## Choosing Code Excerpts

Use excerpts as evidence, not decoration.

Good excerpts are:

- 3-20 lines.
- Centered on the call, branch, or mutation being explained.
- From the exact source file named in the heading.
- Followed by a plain statement of runtime effect.
- Trimmed only when omitted lines do not affect the trace.

Use an excerpt when it shows:

- Entrypoint setup.
- Dispatch or branch selection.
- State mutation.
- Cross-layer handoff.
- Deferred callback registration.
- Final execution call.

Do not include code just because it is nearby.

## Common Mistakes

- Starting from a subsystem instead of a real command or event.
- Organizing by component ownership instead of runtime order.
- Skipping wrapper files that set important state.
- Explaining what code is for, but not what it does next.
- Losing the thread after base-class calls, callbacks, memoization, imports, or module loading.
- Treating all branches equally instead of following the active branch.
- Pasting large source blocks without explaining the state transition.
- Hiding boundaries between app code, framework code, and runtime code.
- Ending with "and then it runs" instead of naming the final handoff.
- Claiming exhaustiveness when the document intentionally stops at a depth limit.
