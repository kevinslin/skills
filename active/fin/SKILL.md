---
name: fin
description: Finalize a completed task by archiving any active `specy` spec and running `ag-learn` to propose retrospective improvements. Use at the end of implementation work when the requested scope is done and the spec state plus learnings should be brought to a clean finished state.
dependencies:
- ag-learn
- specy
---

# fin

Use this skill at the end of a task before the final user-facing report.

## Workflow

1. Confirm terminal status
- Use this flow only when the requested scope is complete.
- If work is partial or blocked, do not archive specs and do not present the task as finished.

2. Resolve the active spec
- Respect `DOCS_ROOT` when it is configured; otherwise default to `./docs`.
- Follow `specy`'s layout rule: active specs live directly under `$DOCS_ROOT/specs/`.
- Only treat files directly under `$DOCS_ROOT/specs/` as active specs. Ignore files already under `$DOCS_ROOT/specs/.archive/`.
- If multiple active specs exist, archive only the one that directly matches the completed task and leave unrelated active specs untouched.
- If no active spec exists for this task, state that explicitly and continue.

3. Mark the spec complete and archive it
- Update the active spec so its status clearly reflects completion before moving it.
- Preserve the existing filename.
- Move the completed spec to `$DOCS_ROOT/specs/.archive/`, creating the directory if needed.
- Follow `specy`'s convention exactly: when a spec is complete, move it to `$DOCS_ROOT/specs/.archive/` and keep the same filename.
- Do not delete completed specs.

4. Run the retrospective
- Run `$ag-learn` after the task lands and after any matching spec has been archived.
- Review the saved learning note and extract 2-3 high-signal learnings.
- Present these as proposed learnings for follow-up, not mandatory extra scope.
- If `ag-learn` finds no meaningful improvement opportunities, say that explicitly.

5. Report the finished state
- State whether a spec was archived and include the source and destination paths when applicable.
- Summarize the proposed learnings as a numbered list so each item can be referenced later.
- Mention where `ag-learn` saved the learning note.
- Keep the final report internally consistent: completed task, completed spec archival, completed retrospective.

## Guardrails

- Do not move a spec into `.archive` unless the task is actually complete.
- Do not archive unrelated active specs.
- Do not invent a parallel spec layout; use the `specy` convention already present in the workspace.
- Do not suppress `ag-learn` output just because the task was straightforward; run it and report either the proposals or the explicit no-learning result.

## Done Checklist

- Matching active spec, if any, is marked complete and moved to `$DOCS_ROOT/specs/.archive/`.
- Unrelated active specs remain untouched.
- `$ag-learn` has been run.
- The final report includes the archived spec path change when applicable.
- The final report includes proposed learnings and the saved learning-note path.
