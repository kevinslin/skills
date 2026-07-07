---
name: fin
description: Finalize completed PR or local checkout work.
dependencies:
- ag-learn
- dev.shortcuts
- specy
---

# fin

Use this skill at the end of a task before the final user-facing report.

## Context Selection

Run `fin [context] [target]`.

- `gh`: finalize from a GitHub PR context. Use this when the task should land by merging the current remote PR or when the matching PR already merged and only cleanup/final verification remains. The original `fin` workflow maps to this context.
- `local`: finalize from a local checkout. Use this when the task should land directly from local git state without depending on GitHub PR state.
- `[target]`: optional for `gh` only. Accept a PR number, PR URL, or branch name. Examples: `fin gh 85117`, `fin gh https://github.com/owner/repo/pull/85117`.
- If the current checkout is detached `HEAD`, treat that as a preflight issue, not a valid finalization state. Create a short-lived local branch from the current commit before auto-detecting context, checking mergeability, or attempting worktree cleanup.
- If the argument is `gh` or `local`, respect it throughout the flow. Do not silently switch later just because repo state would make the other path easier.
- If `gh` has an explicit `[target]`, lock that PR target before current-branch detection. Use the target PR as the source of truth for state, mergeability, comments, checks, spec matching, merge, and automation cleanup.
- If the user omits `[target]` but the immediately preceding active heartbeat or delayed-merge instruction names exactly one PR and the user asks to merge, finalize, ignore a waiting period, or ignore a proof gate, treat that PR as an explicit `gh` target after one live PR-state check. Report the target source as `heartbeat automation`.
- If the user omits `[target]` but the immediately preceding task in the same thread completed or repaired exactly one PR, such as after `trigger:fix-pr`, `trigger:fix-pr-conflict`, or a PR-specific babysit/CI run, treat that PR as an explicit `gh` target after one live PR-state check. Report the target source as `active task context`. If the current checkout points at another branch or PR, mention the mismatch and ignore the unrelated checkout for PR state, spec archival, merge, automation, and cleanup decisions unless it blocks local cleanup.
- If an explicit `gh` target does not match the current branch, do not silently fall back to the current branch's PR. Either run the remote-PR finalization path for that explicit target, or stop with a target mismatch before any spec archival, branch cleanup, or merge.
- If the argument is omitted, detect the context from the current branch before any archival or landing work:
  - Choose `gh` when the current branch has an open or already-merged PR that corresponds to the branch being finalized.
  - Choose `local` when the current branch has no matching PR and the work should land directly from local git state.
- Treat heartbeat-derived or active-task-derived PR targets as explicit `gh` targets, not as current-branch auto-detection.
- If the argument is present but not one of `gh` / `local`, stop and ask the user which context to use.
- Report whether the finalization context was explicitly provided or auto-detected.
- Before reporting any PR status or blocker, print one target identity line: `Target: PR #<number>, branch <headRefName>, source=<current checkout|explicit user PR|heartbeat automation|active task context>`. When multiple PRs have been mentioned in the session, prefix every PR-specific state claim with the PR number.

## Shared Workflow

1. Confirm finalization preconditions
- Use this flow only when the requested scope is complete.
- If work is partial or blocked, do not archive specs and do not present the task as finished.
- Before archiving any spec or attempting to land the change, determine the current branch, whether it is attached to a linked worktree, and where the non-worktree `main` checkout lives.
- Check `~/.fin.yaml` for repo-specific finalization instructions before landing or cleanup. If the file exists, parse entries shaped as `workspace: [{path: ..., instructions: ...}]`.
- If `~/.fin.yaml` exists but cannot be parsed, do not treat the parse failure as "no hooks". Report the parser error separately and inspect the raw file. Continue only when the raw content is clearly non-executable, unambiguous context; if it might contain commands, hooks, destructive instructions, or ambiguous cleanup requirements, stop before spec archival, landing cleanup, or linked-worktree removal and report the malformed config as the blocker.
- Match `workspace[].path` against the normalized non-worktree checkout root for the branch's repository, not against a transient linked worktree path. Resolve symlinks and trailing slashes before comparing.
- If a matching `~/.fin.yaml` workspace entry exists, record its `instructions` and apply them after the PR merge / already-merged confirmation or local landing succeeds, but before removing any linked worktree. This preserves ignored or untracked files that may need to be copied out of the soon-to-be-removed worktree.
- Also treat matching `~/.fin.yaml` instructions as routing context for active spec discovery. If the instructions mention a `$specy`, `$mem`, or `.mem` artifact root, derive candidate docs roots from that instruction before falling back to the default docs root.
- If `~/.fin.yaml` is missing or no workspace entry matches the non-worktree checkout root, state that no repo-specific final hooks applied and continue.
- If the checkout is detached `HEAD`, create a temporary local branch from the current commit first. Prefer the repo's normal task-branch prefix when one exists, otherwise use a short `codex/` branch name derived from the task.
- After converting detached `HEAD` into a named branch, lock that branch identity for the rest of the run. Do not continue finalization from anonymous detached state.
- When the user omitted the context, lock the detected context once and use it for the rest of the run. Do not re-detect after archiving or mid-landing.
- When the user provided, or the heartbeat handoff or active task context implied, an explicit PR target, lock that PR number, head branch, and target source once. Do not replace it with the current checkout's PR because the current checkout is different or easier to operate from.
- Do not silently switch contexts after selection. If the user requested `gh`, do not fall back to local-only landing. If the user requested `local`, do not silently land via PR merge just because a PR exists.
- For `gh` without an explicit target, identify the current PR and check its state before testing mergeability or attempting any merge command.
- For `gh` with an explicit target, identify that target PR directly with GitHub before consulting current-branch PR state. If the current checkout points at another PR, report the mismatch in the target identity line and ignore the other PR unless it blocks local cleanup.
- For `gh`, identify any active PR babysit/watch automation for the target PR or branch when automation state is visible. Record its id so it can be updated or deleted after the PR lands.
- If the task includes a requested external notification after green CI, such as Slack or another chat notice, track that notification as a separate finalization gate from PR mergeability and CI. Check notification prerequisites when feasible, such as required local credential files or configured CLIs, and record any missing prerequisite as a notification blocker, not as a CI failure.
- If the target PR is already merged, treat the PR landing precondition as satisfied and skip mergeability repair. Continue with any matching spec archival, worktree cleanup, local `main` refresh, and retrospective.
- For `gh`, when the target PR is still open, confirm it is mergeable against `main` or its base branch.
  - If GraphQL or `gh pr view` reports `UNKNOWN`/indeterminate mergeability while checks and reviews otherwise look green, poll the REST pull-request endpoint once or twice for `mergeable` and `mergeable_state` before invoking conflict repair. Treat REST `mergeable: true` with `mergeable_state: clean` as the mergeability confirmation; treat repeated `null`/unknown as indeterminate and wait or report it.
- For `local`, confirm the current branch is mergeable into local `main`.
- If the `gh` flow is blocked only by base-branch conflicts, run `trigger:fix-pr-conflict` against the locked target PR and let it try to restore a clean merge state.
- If the `gh` flow is blocked by broader PR issues, or conflict repair needs a fuller pass, run `trigger:fix-pr` against the locked target PR.
- If the `local` flow is blocked only by trunk drift, run `trigger:sync-branch` or otherwise rebase the current branch onto the merge target before retrying the check.
- Continue only after mergeability is confirmed or the matching PR is already merged. If repair cannot restore a mergeable state, stop and report the blockage instead of archiving the spec or landing the change.

2. Resolve the active spec
- Build an ordered list of candidate docs roots:
  - First, use `DOCS_ROOT` when it is configured.
  - Next, if the matching `~/.fin.yaml` instructions mention an absolute `.mem` artifact root for `$specy`, `$mem`, or notes, add `<that-root>/main` when the instruction points at `.mem`, or the path itself when it already points at `.mem/main`.
  - Finally, default to `./docs`.
- Only use candidate roots that exist or whose parent exists and is clearly the intended workspace artifact root. Report the selected spec root when a matching spec is found.
- Follow `specy`'s layout rule for each candidate root: active specs live directly under `$DOCS_ROOT/specs/`.
- Only treat files directly under a candidate `$DOCS_ROOT/specs/` as active specs. Ignore files already under `$DOCS_ROOT/specs/.archive/`.
- Also support folder specs when the workspace uses a folder schema such as `specs`: an active spec folder lives directly under a candidate `$DOCS_ROOT/specs/<spec-slug>/`, with optional sidecars such as `milestones/`, `flows/`, `reports/`, `cook/`, `checklist.md`, or `data/`. Treat the folder as the active spec unit.
- If the completed work is a milestone or sidecar inside an active folder spec,
  do not archive the parent folder unless the parent spec itself is complete. If
  sibling milestones remain, record that the milestone landed and leave the
  parent folder spec active.
- If multiple active specs exist across candidate roots, archive only the one that directly matches the completed task and leave unrelated active specs untouched.
- If no active spec exists for this task, state that explicitly and continue.

3. Mark the spec complete and archive it
- Update the active spec so its status clearly reflects completion before moving it. For folder specs, update the folder's `spec.md`.
- For a completed milestone or sidecar inside an otherwise active folder spec,
  mark or report only that milestone as complete when the file has a clear
  status field or checklist. Do not move the parent folder into `.archive/`
  until the whole folder spec is complete.
- Preserve the existing filename for single-file specs and the existing folder name for folder specs.
- Move the completed spec to `$DOCS_ROOT/specs/.archive/`, creating the directory if needed. For folder specs, move the whole folder so sidecars such as `checklist.md` and `data/` stay with the completed spec.
- Follow `specy`'s convention exactly: when a single-file spec is complete, move it to `$DOCS_ROOT/specs/.archive/` and keep the same filename.
- Do not delete completed specs.

## `gh` Context Workflow

### Stacked PR landing contract

- Treat a PR as stacked when its configured `baseRefName` is not the repository
  default branch. Lock both refs before merge or cleanup.
- Child landing proof is GitHub state `MERGED` plus the locked remote base ref
  containing the recorded merge commit. If a clean local worktree for that base
  exists, fast-forward it and verify the same containment there. This is enough
  to report the child PR as landed even while the parent PR remains open.
- Default-branch containment is stack-level cleanup. Refresh it independently
  when safe, but do not reclassify the child landing as failed merely because
  the parent has not landed.
- Defer local child-branch deletion until the repository default branch contains
  the child merge commit. Also defer it when the relevant checkout is dirty or
  containment cannot be proven. Preserve user changes; report `landed with
  partial local cleanup` and the exact deferred steps.
- If the task has an exactly linked Linear issue, complete it after child
  landing proof only when its scope is explicitly the child PR. Leave a
  parent-, stack-, or default-branch-scoped issue open. If scope is ambiguous,
  leave it unchanged and report the reason.

4. Merge the PR
- Before running a merge command, check the target PR state with GitHub. If the PR is already `MERGED`, do not run `trigger:merge-pr`; record the merge commit or merged-at details when available and proceed as an already-landed PR.
- If the PR is not already merged and the target PR belongs to the current branch, run `trigger:merge-pr` immediately after the matching spec has been marked complete and archived.
- If the PR is not already merged and the explicit target PR does not belong to the current branch, use a target-aware remote merge for that PR, such as `gh pr merge <target>`, after the matching spec has been marked complete and archived. Do not use current-branch merge shortcuts for a different PR.
- Treat the merge as part of finalization, not a follow-up option.
- If the merge command reports that the local branch cannot be deleted because it is still attached to a linked worktree, check whether the remote PR actually merged before treating the step as failed.
- When the PR merged remotely but local branch deletion failed only because of the linked worktree attachment, treat that as a successful merge followed by incomplete cleanup and continue with worktree removal from another checkout.
- If there is no matching PR to merge, state that explicitly instead of claiming the task fully landed.
- For an explicit target PR that is not checked out locally, skip local branch/worktree cleanup unless the target branch is present in a local worktree or the user explicitly requested cleanup. It is acceptable to merge the remote PR, refresh local `main`, delete matching automation, and report that no local target checkout cleanup was applicable.

5. Remove the merged worktree
- Before removing any linked worktree, run any matching repo-specific final hooks from `~/.fin.yaml`. Treat these hooks as part of finalization; if they fail, stop before deleting the worktree and report the exact blockage.
- If the merged branch lives in a linked git worktree, remove that worktree after the PR merge succeeds or after confirming the PR was already merged.
- Cleanup classification:
  - Delete only the local branch that matches the PR head branch, after merge proof and after confirming no worktree still checks it out.
  - Remove linked worktrees that check out the PR head branch.
  - Remove detached temporary PR review worktrees only when they can be tied to the same PR, such as a path containing the PR number or a recorded head SHA from the PR review task. Reset and clean them before removal.
  - Leave unrelated named branches and worktrees untouched, even when their names, commits, or paths look adjacent to the finalized task.
- Run the removal from another checkout such as the main checkout, not from inside the linked worktree itself.
- After final hooks have run and immediately before removing a linked worktree, discard all remaining changes inside that soon-to-be-deleted worktree with `git -C <worktree> reset --hard` and `git -C <worktree> clean -fdx`. This is intentionally destructive because the worktree is being deleted; do not run it against the non-worktree `main` checkout or any worktree that is not being removed.
- If `gh pr merge --delete-branch` already deleted the remote branch but failed local deletion because the branch was still attached to the worktree, finish the cleanup explicitly instead of retrying the merge.
- Fully remove the worktree, then run `git worktree prune`.
- If the merged local branch still exists after the worktree is removed and is no longer checked out anywhere, delete it only after the repository default branch contains the merge commit.
- If local branch deletion reports that the branch is not merged into current `HEAD`, do not use ancestry alone as the safety check. For squash or rebase merges, verify the GitHub PR is `MERGED`, record the PR head SHA and merge commit, refresh the repository default branch, confirm it contains the merge commit, and only then delete the local branch when no worktree checks it out.
- If the PR used a squash or rebase merge and local `main` cannot be refreshed because the non-worktree checkout has unrelated dirty changes, treat the remote PR landing and linked-worktree removal as complete but defer local branch deletion. Report the dirty-main refresh blocker exactly, keep the local branch until local `main` can safely contain the merge commit, and do not force-delete it from GitHub state alone.
- If there is no linked worktree for the task branch, state that explicitly and continue.

6. Update local landing refs
- After the PR merge succeeds, or after confirming the PR was already merged, refresh the locked configured base before reporting completion once any linked-worktree cleanup is finished. When the configured base is the default branch, this is the normal local-main refresh.
- Run this refresh from a clean configured-base worktree when one exists, never from a detached or soon-to-be-removed worktree.
- Otherwise, prefer a non-switching base-ref refresh: run `git fetch <remote> <base>:<base>` only when `<base>` is not checked out in any worktree, then confirm containment with `git merge-base --is-ancestor <mergeCommit> <base>`.
- If the non-switching base-ref refresh is rejected because `<base>` is checked out elsewhere or the ref cannot fast-forward, fall back to checkout-and-pull in a clean base worktree. Otherwise, stop with a configured-base refresh blocker.
- Do not use the non-switching base-ref refresh for `local` landing flows that need to merge the completed local branch into `main`.
- Confirm the refreshed configured base includes the merge commit for the landed PR before continuing.
- For a stacked PR, separately fast-forward the repository default branch when safe and test whether it contains the child merge commit. An open parent normally means it does not; record that as deferred stack-level cleanup rather than a child landing failure.
- If branch cleanup was deferred because the PR used a squash/rebase merge or `git branch -d` rejected ancestry, finish that branch deletion only after the repository default branch contains the PR merge commit and the branch is no longer checked out anywhere.
- Delete or cancel any active PR babysit/watch automation that was tracking the now-merged PR. If the automation cannot be deleted, report the exact blocker instead of leaving silent stale state behind.
- If configured-base or default-branch refresh is blocked by unrelated dirty changes, report a partial terminal state instead of overwriting or stashing user work: PR landed when configured-base containment is already proven, any linked-worktree cleanup completed, automation cleanup completed if it was safe to do, the blocked ref not refreshed, and local branch deletion deferred.
- If configured-base refresh fails for any other reason, stop and report the exact git error instead of claiming the child landed. For a stacked PR, a default-branch refresh or containment gap alone remains partial local cleanup.

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
- Before removing any linked worktree, run any matching repo-specific final hooks from `~/.fin.yaml`. Treat these hooks as part of finalization; if they fail, stop before deleting the worktree and report the exact blockage.
- If the merged branch lives in a linked git worktree, remove that worktree after the local merge succeeds.
- Cleanup classification:
  - Delete only the completed local branch being landed, after merge proof and after confirming no worktree still checks it out.
  - Remove linked worktrees that check out that completed branch.
  - Leave unrelated named branches and worktrees untouched, even when their names, commits, or paths look adjacent to the finalized task.
- Run the removal from another checkout such as the main checkout, not from inside the linked worktree itself.
- After final hooks have run and immediately before removing a linked worktree, discard all remaining changes inside that soon-to-be-deleted worktree with `git -C <worktree> reset --hard` and `git -C <worktree> clean -fdx`. This is intentionally destructive because the worktree is being deleted; do not run it against the non-worktree `main` checkout or any worktree that is not being removed.
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
- Run `$ag-learn` after the task lands in the requested context, after any matching spec has been archived, and after any matching repo-specific final hooks from `~/.fin.yaml` have completed.
- For `gh`, run it after the PR merge or already-merged confirmation, repo-specific final hooks, and local `main` refresh or base-ref containment proof complete.
- For `local`, run it after the local merge, repo-specific final hooks, and local `main` verification complete.
- Review the saved learning note and extract 2-3 high-signal learnings.
- Present these as proposed learnings for follow-up, not mandatory extra scope.
- If `ag-learn` finds no meaningful improvement opportunities, say that explicitly.

8. Report the finished state
- State which context ran: `gh` or `local`.
- State whether that context was explicitly requested, implied by heartbeat or active task context, or auto-detected from current-branch PR state.
- For `gh`, state the target identity line with PR number, branch, and source before reporting mergeability, checks, blockers, merge, or cleanup. If another PR was also present in the current checkout, explicitly state that it was not the finalization target.
- State whether the mergeability check passed directly, was skipped because the PR was already merged, or required `fix-pr-conflict` / `fix-pr` / `sync-branch` / manual repair.
- State whether a spec was archived and include the source and destination paths when applicable.
- For `gh`, state whether the PR was already merged and `merge-pr` was skipped, or whether `merge-pr` ran successfully, including whether the remote merge succeeded directly or required separate post-merge worktree cleanup because local branch deletion failed.
- For `local`, state whether the branch landed via local merge, was already on `main`, or was blocked before landing.
- State whether a linked worktree was removed, pruned, and had its merged branch deleted when applicable.
- For `gh`, state whether any PR babysit/watch automation was found and whether it was deleted, already absent, or blocked.
- If branch deletion required squash/rebase merge proof, state the PR head SHA, merge commit, and local `main` containment check used as the cleanup proof.
- State whether the local `main` checkout or base ref was updated or verified successfully, identify the resulting `main` tip when relevant, and say whether the normal checkout path or non-switching base-ref path was used.
- State any requested external notification result separately from CI and merge state. If notification delivery is blocked by missing credentials, unavailable CLIs, or channel configuration, say that directly without describing the PR as not green.
- If the remote PR landed but local `main` refresh was blocked by unrelated dirty changes, call that out as `partial local cleanup`: include the merge commit, the dirty-main error, which cleanup steps did complete, and which local branch or verification step was intentionally deferred.
- For a stacked PR, report the locked configured base, its containment proof,
  whether the default branch contains the merge commit, the linked Linear issue
  decision when applicable, and `landed with partial local cleanup` whenever
  default-branch refresh or child-branch deletion remains deferred.
- State whether `~/.fin.yaml` was checked, whether it parsed successfully, whether a workspace entry matched the non-worktree checkout root, and whether the matched repo-specific final hooks completed or were skipped.
- If `local` pushed `main`, state whether the push succeeded. If it intentionally remained local-only, say that explicitly.
- Summarize the proposed learnings as a numbered list so each item can be referenced later.
- Mention where `ag-learn` saved the learning note.
- Keep the final report internally consistent with the chosen context: completed task, completed spec archival, requested landing path, reconciled or verified `main`, completed retrospective.

## Guardrails

- Do not move a spec into `.archive` unless the task is actually complete.
- Do not archive unrelated active specs.
- Do not try to finalize directly from detached `HEAD`; create a named branch first.
- Do not archive a spec or land the change before the current branch or PR is confirmed mergeable for the chosen context, unless the matching PR is already merged.
- Do not silently switch from `gh` to `local` or from `local` to `gh`.
- Do not ask the user to choose `gh` vs `local` when the argument is omitted and branch PR state clearly determines the context.
- Do not choose `gh` from a no-argument invocation unless the PR belongs to the current branch being finalized, or a heartbeat-derived or active-task-derived PR target has been locked after live PR verification.
- Do not run `trigger:merge-pr` when GitHub reports the matching PR is already `MERGED`; use the existing merged state and continue finalization from there.
- If `gh` repair via `fix-pr-conflict` or `fix-pr` cannot restore a mergeable state, stop and report the blockage instead of continuing the finalization flow.
- If `local` repair via branch sync or rebase cannot restore a mergeable state, stop and report the blockage instead of continuing the finalization flow.
- Do not run `merge-pr` in `gh` mode before the matching spec is marked complete and archived.
- Do not require a PR in `local` mode.
- Do not treat `gh pr merge --delete-branch` local branch-deletion failures caused only by linked worktree attachment as a failed merge when the remote PR already landed.
- Do not leave a merged linked worktree behind when the branch is meant to be fully finalized.
- Do not remove unrelated named worktrees or branches during cleanup. A worktree is cleanup-eligible only when it checks out the landed branch, or, in `gh` mode, when it is a detached temporary PR review worktree tied to the finalized PR by PR number/path or recorded head SHA.
- Do not leave a PR babysit/watch automation active after its PR has merged. Delete or cancel it during finalization, and report any deletion blocker.
- Do not force-delete a squash/rebase-merged local branch based only on GitHub PR state or configured-base containment. Verify the repository default branch contains the PR merge commit first, and verify no worktree still checks out the branch.
- If local `main` cannot be refreshed because it has unrelated dirty changes, do not use that dirty checkout as a reason to delete a squash/rebase-merged local branch. Leave the branch, report the dirty-main blocker, and let cleanup resume after local `main` can be safely fast-forwarded.
- Do not remove a linked worktree before running any matching repo-specific final hooks from `~/.fin.yaml`.
- Do not preserve dirty tracked, untracked, or ignored files in a linked worktree that has already passed final hooks and is about to be deleted. Reset and clean that linked worktree first so `git worktree remove` cannot be blocked by disposable local changes.
- Do not run the linked-worktree reset/clean step against the non-worktree `main` checkout or any checkout that will remain after finalization.
- Do not match `~/.fin.yaml` workspace paths against temporary linked worktree roots; match the non-worktree checkout root for the branch's repository.
- Do not ignore a matching `~/.fin.yaml` workspace entry. If the additional instructions are ambiguous, destructive, or cannot be verified, stop and report the blocker before cleanup.
- Do not silently ignore malformed `~/.fin.yaml`; a parse failure is a finalization preflight issue unless raw content is clearly non-executable and unambiguous. Never delete a linked worktree while malformed fin config might contain unrun hooks or cleanup instructions.
- Do not try to remove the current live worktree from inside itself; switch to another checkout first.
- Do not report final success while local `main` or the safely refreshed local base ref still points behind the landed result unless the user explicitly says not to refresh or verify it.
- Do not reclassify a green PR or passing CI as blocked because a Slack/chat/desktop notification could not be sent. Report notification failures as auxiliary notification blockers with the missing prerequisite.
- Do not invent a parallel spec layout; use the `specy` convention already present in the workspace.
- Do not archive an active parent folder spec just because a milestone sidecar
  inside it landed; leave the parent active while sibling milestones remain.
- Do not archive only `spec.md` when the active spec uses a folder schema. Move the entire spec folder so checklist, data, and other sidecars remain attached.
- Do not suppress `ag-learn` output just because the task was straightforward; run it and report either the proposals or the explicit no-learning result.

## Done Checklist

- `fin` was run with either an explicit `gh` / `local` argument, a heartbeat-derived or active-task-derived PR target, or no argument and a context auto-detected from current-branch PR state.
- In `gh` mode, any explicit PR number, PR URL, branch target, heartbeat-derived PR target, or active-task-derived PR target was locked before current-branch PR detection and reused for every PR-state, mergeability, merge, automation, and cleanup decision.
- Every PR status or blocker report included a target identity line with PR number, branch, and source; when multiple PRs were mentioned, every PR-specific claim was labeled with the PR number.
- If the run started from detached `HEAD`, it was converted into a named branch before context detection and landing.
- The chosen or detected context was locked once and respected throughout the flow.
- Current branch or PR was checked for mergeability against `main` or its base branch before spec archival, unless the matching PR was already merged; any detected conflicts were handled with `trigger:fix-pr-conflict`, `trigger:fix-pr`, `trigger:sync-branch`, or an equivalent local repair flow.
- Matching active spec, if any, is marked complete and moved to
  `$DOCS_ROOT/specs/.archive/`; folder specs were moved as whole folders only
  when the parent spec was complete, and milestone or sidecar completions inside
  still-active parent specs were recorded without archiving the parent.
- Unrelated active specs remain untouched.
- `~/.fin.yaml` was checked, parsed or explicitly handled as malformed, and any workspace entry matching the non-worktree checkout root was applied before linked-worktree removal.
- In `gh` mode, the matching PR was checked for an existing `MERGED` state before attempting merge; `trigger:merge-pr` has been run after archival only when the PR was not already merged, or the missing-PR condition was reported explicitly.
- In `local` mode, the completed branch has been merged into local `main` or verified as already landed there.
- If a linked worktree was about to be removed, remaining tracked, untracked, and ignored changes in that worktree were discarded with `git reset --hard` and `git clean -fdx` after final hooks ran and before `git worktree remove`.
- Any linked worktree used for the merged branch was removed afterward, `git worktree prune` was run, and the merged local branch was deleted when it was no longer checked out anywhere; unrelated named worktrees and branches were left untouched.
- Any PR babysit/watch automation found for the merged PR was deleted or reported as blocked.
- Requested external notifications, if any, were attempted or explicitly skipped with a separate notification blocker; notification failures were not described as CI failures.
- For squash/rebase-merged PRs, local branch deletion used verified PR merge state plus repository default-branch containment of the PR merge commit, not branch ancestry or configured-base containment alone.
- The local `main` checkout, or the local base ref when using the non-switching explicit-target path, was refreshed or verified to include the landed work before the task was reported complete.
- `$ag-learn` has been run.
- The final report states whether the context was explicit, implied by heartbeat or active task context, or auto-detected.
- The final report includes the archived spec path change when applicable.
- The final report states the landing result for the chosen context.
- The final report states the local `main` refresh or verification result.
- The final report includes proposed learnings and the saved learning-note path.
