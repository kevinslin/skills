# Flow Overview Workflow

## Use When

- Writing the required `### Overview` section at the beginning of `## Call path` in a flow doc
- Revising an existing overview so the main lifecycle can be read top-to-bottom before the detailed phase sections
- Summarizing the major handoffs across multiple phases, files, or runtime boundaries in one linear pass

## Template

- `@references/flow-overview/template.md`

## Output Location

- Insert directly under `## Call path` in an existing flow doc, before the phase-by-phase sections.

## Scope

`flow-overview` is a reusable subsection/snippet, not a standalone document type. Every flow doc should start `## Call path` with this overview so the main path is readable in one linear scan before the document dives into per-phase branches, guards, and contract details.

## Authoring Requirements

- Use a `### Overview` heading followed by one fenced `ts` block.
- Treat the overview as a linear skeleton of the full flow.
- Divide the block with phase header comments such as `// ## Phase 1: ...`.
- Within each phase, add numbered substep comments such as `// 1.1 ...`.
- Use exact identifiers from source code: function names, vars, and fields.
- Show only the main path and major handoffs.
- Keep branch logic, rejection paths, retries, and alternate flows out of the overview unless omitting them would make the next handoff impossible to understand.
- Inline only short helper bodies at the callsite:
  ```ts
  target_call(args) {
    // short inlined body
  }
  ```
- Keep the overview grepable: every source annotation should use a tight repo-relative file path with line numbers.
- End on the terminal effect for the flow, for example serving refs, finalizing a write, returning a response, or publishing a snapshot.
- The detailed phase sections below the overview should explain the branch behavior and contracts omitted from the overview.

## Instructions

1. Read the flow doc and identify the existing phase boundaries under `## Call path`.
2. Choose the single main path that best explains the lifecycle end to end.
3. Copy `@references/flow-overview/template.md` into a `### Overview` section directly under `## Call path`.
4. Replace the placeholder phase names with the real flow phases from the document.
5. For each numbered substep, keep only the state transitions needed to understand the next major handoff.
6. Preserve exact identifiers from code and inline only short helper bodies when they improve readability.
7. Remove detailed branch logic from the overview. Push that detail into the matching phase sections below.
8. Check the overview linearly from top to bottom:
   - every line should lead naturally to the next line
   - the reader should not need to stop to reason about alternate paths
9. Check the detailed phases after the overview:
   - each phase should now focus on logic that is not already obvious from the overview
   - branch points, guards, and error contracts should remain explicit there

## Review Checklist

- Can the overview be read top-to-bottom without resolving alternate paths?
- Does each phase in the overview clearly hand off to the next phase?
- Are the identifiers grepable back to source?
- Did I keep callsite + inline body when inlining short helpers?
- Did I leave branch detail to the detailed phase sections?
