---
name: close
description: Close the tracked task, then archive its Codex thread.
---

# Close

Use for `trigger:close` or `trigger:close <thread-id>`.

1. Resolve the target to the explicit thread ID when provided; otherwise use
   the authoritative current Codex thread ID.
2. Invoke `$agtask close <thread-id>` and follow its complete close workflow,
   including any `OnPreClose` and `OnPostClose` instructions.
3. Continue only when the tracked-task close succeeds or reports the target as
   untracked, which is a successful no-op. If preparation, `OnPreClose`, or the
   committing close fails or blocks, do not archive the thread.
4. Call the Codex app `set_thread_archived` action with the exact target thread
   ID and `archived: true`.
5. Report:
   - whether the tracked task was closed, already done, or untracked;
   - whether the Codex thread was archived;
   - any partial failure exactly.

Closing and archiving are idempotent. Never reopen, unarchive, delete, or unpin
the target as part of this shortcut.
