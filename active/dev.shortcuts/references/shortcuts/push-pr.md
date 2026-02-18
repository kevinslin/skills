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

## Agent Session
Session ID: [session id of the agent that implemented the code changes]
```
4. Ensure the `## Agent Session` section is always included and populated.
5. invoke:check-ci -> if failure, invoke:fix-pr
6. notify if everything passes