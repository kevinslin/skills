Shortcut: Check CI Status

Instructions:

Create a to-do list with the following items then perform all of them:

1. Ensure the GitHub CLI `gh` is available and if not use
   @docs/general/agetn-setup/github-cli-setup.md to get it working.

2. Ask the user for the PR link or PR number (and repo) if not already provided.

3. Watch CI under an `awaiter` agent with `gh pr checks <pr> --watch --fail-fast`
   (add `--repo owner/repo` if needed).
   If only a branch or commit is provided, use `gh run list` to find the latest run and
   `gh run watch <run-id>` to wait for completion.
   Keep user updates sparse while watching: report only state changes, new failures, and
   the terminal result.

4. If `buildkite/monorepo` fails, or remains pending long enough that the coarse PR view
   is no longer adding signal, inspect Buildkite job-level evidence before deciding what
   the state means.
   Prefer the Buildkite API and raw job log URLs to identify the failing jobs and classify
   whether the issue is related to the change, ambient CI noise, or a flaky job.
   Do not label a failure unrelated, flaky, or still pending from the GitHub rollup alone.

5. If all checks pass, report success clearly.
   If any check fails, list the failing checks, include any Buildkite classification you
   gathered, and ask the user how to proceed.
