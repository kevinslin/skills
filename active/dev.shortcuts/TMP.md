
## Shortcut Trigger Table

You can search for all filenames in this table, then read the contents and follow the
instructions.

| If user request involves... | Use shortcut |
| --- | --- |
| Implementing a feature from a spec | trigger:implement-spec |
| Implementing an execution plan | trigger:implement-execution-plan |
| Creating a new feature plan | trigger:new-plan-spec |
| Promoting a shortcut to a skill | trigger:promote-shortcut-to-skill |
| Creating an implementation spec | trigger:new-implementation-spec |
| Creating a validation/test spec | trigger:new-validation-spec |
| Committing or pushing code | trigger:precommit-process -> trigger:commit-code |
| Creating a PR | trigger:precommit-process -> trigger:create-pr |
| Checking CI status | trigger:check-ci |
| Fixing a PR from review comments | trigger:fix-pr |
| Creating architecture documentation | trigger:new-architecture-doc |
| Updating/revising architecture docs | trigger:revise-architecture-doc |
| Creating flow documentation| dev.flow-docs + trigger:new-flow-doc |
| Exploratory coding / prototype / spike | trigger:coding-spike |
| Refining or clarifying an existing spec | trigger:refine-spec |
| Updating a spec with new information | trigger:update-spec |
| Code cleanup or refactoring | trigger:cleanup-all |
| Removing trivial tests | trigger:cleanup-remove-trivial-tests |
| Updating docstrings | trigger:cleanup-update-docstrings |
| Merging from upstream | trigger:merge-upstream |
| Reviewing code, specs, docs | trigger:review-all-code-specs-docs-convex |

## Shortcut Chaining

Some workflows require multiple shortcuts in sequence:
Always complete the full chain when applicable.

- **Commit flow:** trigger:precommit-process -> trigger:commit-code
- **PR flow:** trigger:precommit-process -> trigger:create-pr
- **Full feature:** trigger:new-plan-spec -> trigger:implement-spec -> commit
  flow
