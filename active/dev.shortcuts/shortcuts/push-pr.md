---
name: push-pr
description: push a pr
---

Instructions:
1. if there are unstaged changes -> invoke:commit-code
2. push the pr
3. invoke:check-ci -> if failure, invoke:fix-pr
4. notify if everything passes