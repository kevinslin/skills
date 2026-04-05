---
name: fin
description: Finalize a completed task by first ensuring the current branch or PR is mergeable with `main`, then archiving any active `specy` spec, merging the PR, updating the local `main` checkout, and running `ag-learn` to propose retrospective improvements. Use at the end of implementation work when the requested scope is done and the spec state plus learnings should be brought to a clean finished state.
dependencies:
- ag-learn
- dev.shortcuts
- specy
---

# fin

Use this skill at the end of a task before the final user-facing report.

## Workflow

1. Confirm finalization preconditions
- Use this flow only when the requested scope is complete.
- If work is partial or blocked, do not archive specs and do not present the task as finished.
- Before archiving any spec or attempting the merge, confirm the current branch or PR is mergeable against `main` or the PR base branch.
- If the branch is blocked only by base-branch conflicts, run `trigger:fix-pr-conflict` and let it try to restore a clean merge state.
- If mergeability is blocked by broader PR issues, or conflict repair needs a fuller pass, run `trigger:fix-pr`.
- Continue the finalization flow only after mergeability is confirmed. If the repair shortcut cannot restore a mergeable state, stop and report the blockage instead of archiving the spec or attempting the merge.

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

4. Merge the PR
- Run `trigger:merge-pr` immediately after the matching spec has been marked complete and archived.
- Treat the merge as part of finalization, not a follow-up option.
- If the merge command reports that the local branch cannot be deleted because it is still attached to a linked worktree, check whether the remote PR actually merged before treating the step as failed.
- When the PR merged remotely but local branch deletion failed only because of the linked worktree attachment, treat that as a successful merge followed by incomplete cleanup and continue with worktree removal from another checkout.
- If there is no matching PR to merge, state that explicitly instead of claiming the task fully landed.

5. Remove the merged worktree
- If the merged branch lives in a linked git worktree, remove that worktree after the PR merge succeeds.
- Run the removal from another checkout such as the main checkout, not from inside the linked worktree itself.
- If `gh pr merge --delete-branch` already deleted the remote branch but failed local deletion because the branch was still attached to the worktree, finish the cleanup explicitly instead of retrying the merge.
- Fully remove the worktree, then run `git worktree prune`.
- If the merged local branch still exists after the worktree is removed and is no longer checked out anywhere, delete the merged branch too.
- If there is no linked worktree for the task branch, state that explicitly and continue.

6. Update the local `main` checkout
- After the PR merge succeeds and any linked-worktree cleanup is finished, update the local main checkout before reporting completion.
- Run this refresh from the main checkout, not from a detached or soon-to-be-removed worktree.
- Check out `main` if needed.
- Pull or otherwise fast-forward `main` to `origin/main`.
- Confirm the local `main` HEAD includes the merge commit for the landed PR before continuing.
- If the local `main` refresh fails, stop and report the exact git error instead of claiming the task is fully finalized.

7. Run the retrospective
- Run `$ag-learn` after the task lands and after any matching spec has been archived and merged.
- Review the saved learning note and extract 2-3 high-signal learnings.
- Present these as proposed learnings for follow-up, not mandatory extra scope.
- If `ag-learn` finds no meaningful improvement opportunities, say that explicitly.

8. Report the finished state
- State whether the mergeability check passed directly or required `fix-pr-conflict` / `fix-pr`.
- State whether a spec was archived and include the source and destination paths when applicable.
- State whether `merge-pr` ran successfully, including whether the remote merge succeeded directly or required separate post-merge worktree cleanup because local branch deletion failed.
- State whether a linked worktree was removed, pruned, and had its merged branch deleted when applicable.
- State whether the local `main` checkout was updated successfully and identify the resulting `main` tip when relevant.
- Summarize the proposed learnings as a numbered list so each item can be referenced later.
- Mention where `ag-learn` saved the learning note.
- Keep the final report internally consistent: completed task, completed spec archival, merged PR, refreshed local `main`, completed retrospective.

## Guardrails

- Do not move a spec into `.archive` unless the task is actually complete.
- Do not archive unrelated active specs.
- Do not archive a spec or run `merge-pr` before the current branch or PR is confirmed mergeable against `main` or its base branch.
- If `fix-pr-conflict` or `fix-pr` cannot restore a mergeable state, stop and report the blockage instead of continuing the finalization flow.
- Do not run `merge-pr` before the matching spec is marked complete and archived.
- Do not treat `gh pr merge --delete-branch` local branch-deletion failures caused only by linked worktree attachment as a failed merge when the remote PR already landed.
- Do not leave a merged linked worktree behind when the branch is meant to be fully finalized.
- Do not try to remove the current live worktree from inside itself; switch to another checkout first.
- Do not report final success while local `main` still points behind the merged PR unless the user explicitly says not to refresh it.
- Do not invent a parallel spec layout; use the `specy` convention already present in the workspace.
- Do not suppress `ag-learn` output just because the task was straightforward; run it and report either the proposals or the explicit no-learning result.

## Done Checklist

- Current branch or PR was checked for mergeability against `main` or its base branch before spec archival, and any detected conflicts were handled with `trigger:fix-pr-conflict` or `trigger:fix-pr`.
- Matching active spec, if any, is marked complete and moved to `$DOCS_ROOT/specs/.archive/`.
- Unrelated active specs remain untouched.
- `trigger:merge-pr` has been run after archival, or the missing-PR condition was reported explicitly.
- Any linked worktree used for the merged branch was removed afterward, `git worktree prune` was run, and the merged local branch was deleted when it was no longer checked out anywhere.
- The local `main` checkout was refreshed to include the merged PR before the task was reported complete.
- `$ag-learn` has been run.
- The final report includes the archived spec path change when applicable.
- The final report states the merge result.
- The final report states the local `main` refresh result.
- The final report includes proposed learnings and the saved learning-note path.
