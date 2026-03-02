Shortcut: New PR 

Instructions:

Create a to-do list with the following items then perform all of them:

1. **Review and commit:** Follow @shortcut:precommit-process.md and sure everything is committed. And that you’ve already followed the pre-commit rules before (or at least after) the last commit.  If not, follow the full pre-commit review process and commit.

2. **Run tests:** Follow @docs/development.md and ensure all tests pass. If not, fix them and commit changes. Summarize what went wrong and how you fixed it. 

3. **Create or update PR:** Use the GitHub CLI (`gh`) to file or update an existing
   GitHub PR for the current branch.

   In the GitHub PR description be sure:

   - Give a full overview of changes, referencing the appropriate specs.
     Be complete but concise.
     The reviewer can click through to files and specs or architecture docs as needed
     for details.

   - Include the validation steps documented here are part of the GitHub PR. Be sure the
     PR description includes a section with Manual Validation and this would hold the
     content you wrote in the .valid.md file.

   - If you can’t run the GitHub CLI (`gh`) see
     @docs/general/agent-setup/github-cli-setup.md

4. **Validate CI:** Invoke @shortcut:check-ci.md so the PR uses the canonical awaiter-based
   CI watch flow, sparse status updates, and Buildkite job-first triage rules.
   If checks fail, reproduce and fix them locally when possible, then rerun CI until the
   PR passes.
   You *MUST* make the build pass.
   If you cannot or don’t know how, tell the user and ask for help.

5. **Print PR URL**: Return the url of the PR you just created
