---
name: push-pr
description: push a pr
---

Instructions:
1. if there are unstaged changes -> invoke:commit-code
2. push code
3. verify the PR base branch from repo metadata (do not assume `main`/`master`), then create a PR using a body file (do NOT inline markdown in shell arguments). Example:
```bash
cat > /tmp/pr_body.md << 'EOF'
[feat|enhance|chore|fix|docs]: [description of change]

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

gh pr create \
  --base "$BASE_BRANCH" \
  --title "[feat|enhance|chore|fix|docs]: [description of change]" \
  --body-file /tmp/pr_body.md
```
4. invoke:check-ci -> if failure, invoke:fix-pr
5. notify if everything passes
