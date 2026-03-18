---
name: push-pr
description: push a pr
---

Instructions:
1. if there are unstaged changes -> invoke:commit-code
2. push code
3. verify the PR base branch from repo metadata (do not assume `main`/`master`), then create a PR using a body file (do NOT inline markdown in shell arguments). Keep the one-line summary in `--title` only; start the body at a section header instead of repeating a title-like line. Example:
```bash
cat > /tmp/pr_body.md << 'EOF'
## Context
[what this change does]

## Testing
[description of tests]
EOF

BASE_BRANCH="$(gh repo view --json defaultBranchRef --jq '.defaultBranchRef.name' 2>/dev/null || true)"
if [ -z "$BASE_BRANCH" ]; then
  BASE_BRANCH="$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@')"
fi
if [ -z "$BASE_BRANCH" ]; then
  echo "Unable to determine default base branch" >&2
  exit 1
fi

PR_URL="$(gh pr create \
  --base "$BASE_BRANCH" \
  --title "[feat|enhance|chore|fix|docs]: [description of change]" \
  --body-file /tmp/pr_body.md)"
CURRENT_DIR="$(basename "$PWD")"
PR_URL_FILE="${LOOPS_PR_ARTIFACT_FILE:-/tmp/${CURRENT_DIR}-devloop-pr}"
printf '%s\n' "$PR_URL" > "$PR_URL_FILE"
echo "Wrote PR URL to $PR_URL_FILE"
```
4. invoke:check-ci -> if failure, invoke:fix-pr
5. notify if everything passes
