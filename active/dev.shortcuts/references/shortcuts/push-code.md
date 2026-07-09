---
name: push-code
description: push code with repo-specific push guardrails
---

Instructions:
1. If there are unstaged changes, invoke `trigger:commit-code`.
2. Determine the current repository root with `git rev-parse --show-toplevel`.
3. If the repository root is `/Users/kevinlin/code/openai`, invoke `$oai-push` and follow its identity preflight, SSH remote, OpenAI PATH, and real Git transport rules. Do not run a bare `git push` for the OpenAI monorepo path.
4. For other repositories, push the current branch with the repository's normal Git transport.
