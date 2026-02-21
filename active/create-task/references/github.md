# GitHub Issues

Use GitHub CLI (`gh`) to create and update issues.

## Authentication

- Check current auth state:
  - `gh auth status`
- Sign in:
  - `gh auth login`
- Ensure required scopes (`repo` is default; add `project` for Projects fields):
  - `gh auth refresh --scopes project`
- Optionally set a default repository for current directory:
  - `gh repo set-default OWNER/REPO`

## Add task

1. Build the issue body and append required context footer:

```bash
cat > /tmp/create-task-body.md <<'MD'
<task details>

### Context
- session: [llm-session]
MD
```

2. Create issue:

```bash
gh issue create \
  --repo OWNER/REPO \
  --title "Issue title" \
  --body-file /tmp/create-task-body.md
```

3. Optional create-time metadata:

```bash
gh issue create \
  --repo OWNER/REPO \
  --title "Issue title" \
  --body-file /tmp/create-task-body.md \
  --assignee USERNAME \
  --label "type:task,priority:p2" \
  --milestone "Sprint 12"
```

## Add tags

- List available labels:
  - `gh label list --repo OWNER/REPO`
- Add labels:
  - `gh issue edit ISSUE_NUMBER --repo OWNER/REPO --add-label "type:task,priority:p1"`
- Remove labels:
  - `gh issue edit ISSUE_NUMBER --repo OWNER/REPO --remove-label "priority:p1"`

## Add due dates

GitHub Issues do not have a native due-date field. Use one of these patterns.

1. Milestone due date (repo-native):
   - Create milestone with due date:
     - `gh api repos/OWNER/REPO/milestones --method POST -f title='Sprint 12' -f due_on='2026-03-15T00:00:00Z'`
   - Attach milestone to issue:
     - `gh issue edit ISSUE_NUMBER --repo OWNER/REPO --milestone "Sprint 12"`

2. GitHub Projects (v2) date field:
   - Add issue to project:
     - `gh project item-add PROJECT_NUMBER --owner OWNER --url https://github.com/OWNER/REPO/issues/ISSUE_NUMBER`
   - Set date field using `gh project item-edit` (see `Custom fields`).

## Custom fields

Use GitHub Projects (v2) custom fields for values like `Status`, `Priority`, `Estimate`, and `Due date`.

1. Get project and field metadata:

```bash
gh project view PROJECT_NUMBER --owner OWNER --format json
gh project field-list PROJECT_NUMBER --owner OWNER --format json
```

2. Add issue to project and capture the item id:

```bash
gh project item-add PROJECT_NUMBER --owner OWNER \
  --url https://github.com/OWNER/REPO/issues/ISSUE_NUMBER \
  --format json
```

3. Edit field values:

```bash
# Date field (example: Due date)
gh project item-edit --id ITEM_ID --project-id PROJECT_ID --field-id FIELD_ID --date 2026-03-15

# Single-select field (example: Status/Priority)
gh project item-edit --id ITEM_ID --project-id PROJECT_ID --field-id FIELD_ID --single-select-option-id OPTION_ID

# Text field
gh project item-edit --id ITEM_ID --project-id PROJECT_ID --field-id FIELD_ID --text "Needs design review"

# Number field
gh project item-edit --id ITEM_ID --project-id PROJECT_ID --field-id FIELD_ID --number 3
```
