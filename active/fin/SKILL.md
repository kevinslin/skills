---
name: fin
description: Finalize a completed task from either a GitHub PR or a local checkout. Run `fin [context]` with optional `gh` or `local`; if omitted, detect whether the current branch has an active PR and choose `gh` when it does, otherwise choose `local`. Then archive any matching `specy` spec, land the change in the selected context, reconcile `main`, and run `ag-learn` to propose retrospective improvements.
dependencies:
- ag-learn
- dev.shortcuts
- specy
---

# fin

Use this skill at the end of a task before the final user-facing report.

## Context Selection

Run `fin [context]`.

- `gh`: finalize from a GitHub PR context. Use this when the task should land by merging the current remote PR. The original `fin` workflow maps to this context.
- `local`: finalize from a local checkout. Use this when the task should land directly from local git state without depending on GitHub PR state.
- If the current checkout is detached `HEAD`, treat that as a preflight issue, not a valid finalization state. Create a short-lived local branch from the current commit before auto-detecting context, checking mergeability, or attempting worktree cleanup.
- If the argument is `gh` or `local`, respect it throughout the flow. Do not silently switch later just because repo state would make the other path easier.
- If the argument is omitted, detect the context from the current branch before any archival or landing work:
  - Choose `gh` when the current branch has an active PR that corresponds to the branch being finalized.
  - Choose `local` when the current branch has no active PR and the work should land directly from local git state.
- If the argument is present but not one of `gh` / `local`, stop and ask the user which context to use.
- Report whether the finalization context was explicitly provided or auto-detected.

## Shared Workflow

1. Confirm finalization preconditions
- Use this flow only when the requested scope is complete.
- If work is partial or blocked, do not archive specs and do not present the task as finished.
- Before archiving any spec or attempting to land the change, determine the current branch, whether it is attached to a linked worktree, and where the non-worktree `main` checkout lives.
- If the checkout is detached `HEAD`, create a temporary local branch from the current commit first. Prefer the repo's normal task-branch prefix when one exists, otherwise use a short `codex/` branch name derived from the task.
- After converting detached `HEAD` into a named branch, lock that branch identity for the rest of the run. Do not continue finalization from anonymous detached state.
- When the user omitted the context, lock the detected context once and use it for the rest of the run. Do not re-detect after archiving or mid-landing.
- Do not silently switch contexts after selection. If the user requested `gh`, do not fall back to local-only landing. If the user requested `local`, do not silently land via PR merge just because a PR exists.
- For `gh`, confirm the current PR is mergeable against `main` or its base branch.
- For `local`, confirm the current branch is mergeable into local `main`.
- If the `gh` flow is blocked only by base-branch conflicts, run `trigger:fix-pr-conflict` and let it try to restore a clean merge state.
- If the `gh` flow is blocked by broader PR issues, or conflict repair needs a fuller pass, run `trigger:fix-pr`.
- If the `local` flow is blocked only by trunk drift, run `trigger:sync-branch` or otherwise rebase the current branch onto the merge target before retrying the check.
- Continue only after mergeability is confirmed. If repair cannot restore a mergeable state, stop and report the blockage instead of archiving the spec or landing the change.

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

## `gh` Context Workflow

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

## `local` Context Workflow

4. Land the change from the local checkout
- Do not require a GitHub PR for this flow.
- Before merging, make sure the current branch is committed and clean. If it is not, use `trigger:commit-code` first.
- Perform the landing merge from the non-worktree `main` checkout when possible, not from an attached feature worktree.
- Fetch and reconcile `main` before merging when the repo has a remote, but do not discard the completed work while doing so.
- Merge the completed branch into local `main`. Use a non-fast-forward merge unless the user explicitly requested a different merge style.
- If the completed work is already on `main`, do not fabricate a merge commit; instead verify that `main` already contains the intended change set and continue.
- If a remote is configured and pushing `main` is appropriate for the repo, push the updated `main` after the local merge. If the flow is intentionally local-only, state that explicitly in the report.

5. Remove the merged worktree and branch
- If the merged branch lives in a linked git worktree, remove that worktree after the local merge succeeds.
- Run the removal from another checkout such as the main checkout, not from inside the linked worktree itself.
- Fully remove the worktree, then run `git worktree prune`.
- If the merged local branch still exists after the worktree is removed and is no longer checked out anywhere, delete the merged branch too.
- If a corresponding remote branch still exists and repo policy allows cleanup, delete it explicitly after the local merge is safely on `main`.
- If there is no linked worktree for the task branch, state that explicitly and continue.

6. Verify the local `main` checkout
- After the local merge succeeds and any linked-worktree cleanup is finished, confirm the local main checkout points at the landed result before reporting completion.
- Check out `main` if needed.
- Confirm the local `main` HEAD includes the merge commit or direct commit that landed the completed work.
- If the flow included pushing `main`, confirm the pushed remote ref contains the landed commit too.
- If the local `main` verification fails, stop and report the exact git error or verification gap instead of claiming the task is fully finalized.

## Retrospective And Reporting

7. Run the retrospective
- Run `$ag-learn` after the task lands in the requested context and after any matching spec has been archived.
- For `gh`, run it after the PR merge and local `main` refresh complete.
- For `local`, run it after the local merge and local `main` verification complete.
- Review the saved learning note and extract 2-3 high-signal learnings.
- Present these as proposed learnings for follow-up, not mandatory extra scope.
- If `ag-learn` finds no meaningful improvement opportunities, say that explicitly.

8. Report the finished state
- State which context ran: `gh` or `local`.
- State whether that context was explicitly requested or auto-detected from current-branch PR state.
- State whether the mergeability check passed directly or required `fix-pr-conflict` / `fix-pr` / `sync-branch` / manual repair.
- State whether a spec was archived and include the source and destination paths when applicable.
- For `gh`, state whether `merge-pr` ran successfully, including whether the remote merge succeeded directly or required separate post-merge worktree cleanup because local branch deletion failed.
- For `local`, state whether the branch landed via local merge, was already on `main`, or was blocked before landing.
- State whether a linked worktree was removed, pruned, and had its merged branch deleted when applicable.
- State whether the local `main` checkout was updated or verified successfully and identify the resulting `main` tip when relevant.
- If `local` pushed `main`, state whether the push succeeded. If it intentionally remained local-only, say that explicitly.
- Summarize the proposed learnings as a numbered list so each item can be referenced later.
- Mention where `ag-learn` saved the learning note.
- Keep the final report internally consistent with the chosen context: completed task, completed spec archival, requested landing path, reconciled or verified `main`, completed retrospective.

## Guardrails

- Do not move a spec into `.archive` unless the task is actually complete.
- Do not archive unrelated active specs.
- Do not try to finalize directly from detached `HEAD`; create a named branch first.
- Do not archive a spec or land the change before the current branch or PR is confirmed mergeable for the chosen context.
- Do not silently switch from `gh` to `local` or from `local` to `gh`.
- Do not ask the user to choose `gh` vs `local` when the argument is omitted and branch PR state clearly determines the context.
- Do not choose `gh` from a no-argument invocation unless the PR belongs to the current branch being finalized.
- If `gh` repair via `fix-pr-conflict` or `fix-pr` cannot restore a mergeable state, stop and report the blockage instead of continuing the finalization flow.
- If `local` repair via branch sync or rebase cannot restore a mergeable state, stop and report the blockage instead of continuing the finalization flow.
- Do not run `merge-pr` in `gh` mode before the matching spec is marked complete and archived.
- Do not require a PR in `local` mode.
- Do not treat `gh pr merge --delete-branch` local branch-deletion failures caused only by linked worktree attachment as a failed merge when the remote PR already landed.
- Do not leave a merged linked worktree behind when the branch is meant to be fully finalized.
- Do not try to remove the current live worktree from inside itself; switch to another checkout first.
- Do not report final success while local `main` still points behind the landed result unless the user explicitly says not to refresh or verify it.
- Do not invent a parallel spec layout; use the `specy` convention already present in the workspace.
- Do not suppress `ag-learn` output just because the task was straightforward; run it and report either the proposals or the explicit no-learning result.

## Done Checklist

- `fin` was run with either an explicit `gh` / `local` argument or no argument and a context auto-detected from current-branch PR state.
- If the run started from detached `HEAD`, it was converted into a named branch before context detection and landing.
- The chosen or detected context was locked once and respected throughout the flow.
- Current branch or PR was checked for mergeability against `main` or its base branch before spec archival, and any detected conflicts were handled with `trigger:fix-pr-conflict`, `trigger:fix-pr`, `trigger:sync-branch`, or an equivalent local repair flow.
- Matching active spec, if any, is marked complete and moved to `$DOCS_ROOT/specs/.archive/`.
- Unrelated active specs remain untouched.
- In `gh` mode, `trigger:merge-pr` has been run after archival, or the missing-PR condition was reported explicitly.
- In `local` mode, the completed branch has been merged into local `main` or verified as already landed there.
- Any linked worktree used for the merged branch was removed afterward, `git worktree prune` was run, and the merged local branch was deleted when it was no longer checked out anywhere.
- The local `main` checkout was refreshed or verified to include the landed work before the task was reported complete.
- `$ag-learn` has been run.
- The final report states whether the context was explicit or auto-detected.
- The final report includes the archived spec path change when applicable.
- The final report states the landing result for the chosen context.
- The final report states the local `main` refresh or verification result.
- The final report includes proposed learnings and the saved learning-note path.
