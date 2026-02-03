Shortcut: Check CI Status

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure the GitHub CLI `gh` is available and if not use
   @docs/general/agetn-setup/github-cli-setup.md to get it working.

2. Ask the user for the PR link or PR number (and repo) if not already provided.

3. Watch CI with `gh pr checks <pr> --watch --fail-fast` (add `--repo owner/repo` if needed).
   If only a branch or commit is provided, use `gh run list` to find the latest run and
   `gh run watch <run-id>` to wait for completion.

4. If all checks pass, report success clearly.
   If any check fails, list the failing checks and ask the user how to proceed.
