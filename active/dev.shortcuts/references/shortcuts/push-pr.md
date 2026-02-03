---
name: push-pr
description: push a pr
---

Instructions:
1. if there are unstaged changes -> invoke:commit-code
2. push code
3. create a pr using the following template
```
[feat|enhance|chore|fix|docs]: [description of change]

## Context
[what this change does]

## Testing 
[description of tests]
```
4. invoke:check-ci -> if failure, invoke:fix-pr
5. notify if everything passes