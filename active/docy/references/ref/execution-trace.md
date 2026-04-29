# Writing Execution Trace Docs

Use this guidance when documenting initialization, startup, request handling,
worker jobs, command execution, or any other flow where ordered control flow
matters.

Model the document on the Rails initialization guide:
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
   - Example: This traces `bin/rails server` through Rails app initialization and Rack handoff. It does not trace Puma internals.
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
### N. path/to/file.rb or FunctionName

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

- After `config/boot.rb` finishes, control returns to `bin/rails`.
- `super` transfers execution into `Rackup::Server#initialize`.
- This call memoizes the wrapped app, so the later `server.run` call reuses it.
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
- Return points after `super`, callbacks, memoized calls, deferred execution, and `require` or import chains.
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
For this trace, `ARGV` is `["server"]`, so alias expansion is a no-op and
dispatch calls `Rails::Command.invoke("server", ARGV)`.

Other branches:
- `s` resolves to `server`.
- Unknown commands fall back to Rake.
- Empty namespace prints help.

Only the first branch continues in this document.
```

Separate callback registration from callback execution:

```markdown
This creates `after_stop_callback`, but the callback is not executed here. It is
passed into `server.start` and runs only when the server stops.
```

For lifecycle hooks, group by runtime order rather than owner:

```markdown
Bootstrap initializers run first, application/railtie initializers run next, and
finisher initializers run last. Middleware construction belongs in the finisher
phase because that is when the app becomes runnable.
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
- Losing the thread after `super`, callbacks, memoization, imports, or `require`.
- Treating all branches equally instead of following the active branch.
- Pasting large source blocks without explaining the state transition.
- Hiding boundaries between app code, framework code, and runtime code.
- Ending with "and then it runs" instead of naming the final handoff.
- Claiming exhaustiveness when the document intentionally stops at a depth limit.
