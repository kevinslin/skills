---
name: dev.gh
description: GitHub CLI operations
version: 1.0.0
---

You are helping the user with GitHub CLI operations. Use the `gh` command-line tool to perform various GitHub tasks.

## Common Operations

### List outstanding feature issues
```bash
gh issue list --label "feature" --state "open"
```

### List all open issues
```bash
gh issue list --state "open"
```

### List recent pull requests
```bash
gh pr list --state "open"
```

### View issue details
```bash
gh issue view <issue-number>
```

### View PR details
```bash
gh pr view <pr-number>
```

### Create a new issue
```bash
gh issue create --title "Issue title" --body "Issue description"
```

### Check PR status and checks
```bash
gh pr checks
```

### View repository information
```bash
gh repo view
```

## Custom Instructions

- When listing issues or PRs, provide a summary of the results
- For feature issues specifically, use the `--label "feature"` flag
- If no label exists, suggest creating one or searching by keywords in the title/body
- Always show the issue/PR number along with the title for easy reference
- When viewing details, highlight key information like status, assignees, and labels
