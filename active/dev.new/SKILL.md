---
name: dev.new
description: Sync a repo to the latest master branch by checking out master and pulling from origin. Use when the user asks to refresh local state before new work.
---

# dev.new

Run this workflow in the target repository.

## Workflow

1. Check out master:
```sh
git checkout master
```

2. Pull latest from origin:
```sh
git pull origin master
```

If checkout or pull fails, stop and surface the git error.
