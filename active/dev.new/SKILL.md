---
name: dev.new
description: Refresh a repo by syncing local master from origin.
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
