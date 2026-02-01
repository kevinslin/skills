---
name: dev.can-make-public
description: Scan a repository and its git history for secrets, credentials, private keys, internal URLs, PII, and other sensitive artifacts before making it public. Use when a user asks if a repo is safe to open-source, requests a pre-publication audit, or wants to sanitize a repo for public release.
---

# Dev.Can-Make-Public

## Workflow

1. Confirm scope
   - Identify the repo root and whether it is a git repository.
   - If git history exists, plan to scan both working tree and history.

2. Scan working-tree filenames (high-signal)
   - Look for common secret/credential files and key material by filename.
   - Example:

```bash
rg --files -g '.env*' -g '*.pem' -g '*.key' -g '*.p12' -g '*.pfx' -g '*.jks' -g '*.keystore' -g '*id_rsa*' -g '*id_ed25519*' -g '*.npmrc' -g '*.pypirc' -g '*credentials*' -g '*secret*' -g '.aws/credentials'
```

3. Scan working-tree contents (high-signal patterns)
   - Search for common token formats, private keys, and credential assignments.
   - Redact secret values in any output.
   - Example:

```bash
rg -n -S "BEGIN (RSA|EC|OPENSSH|DSA)? ?PRIVATE KEY|PRIVATE KEY-----"
rg -n -S "AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|AIza[0-9A-Za-z\-_]{35}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|gho_[A-Za-z0-9]{20,}|ghs_[A-Za-z0-9]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}|sk_live_[0-9a-zA-Z]{10,}|rk_live_[0-9a-zA-Z]{10,}|SG\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}|npm_[A-Za-z0-9]{10,}"
rg -n -S "(?i)(api[_-]?key|token|secret|password|passwd|pwd|access[_-]?key|client_secret)\s*[:=]\s*['\"]?[^'\"\s]{6,}"
```

4. Scan git history (if repo is git)
   - Check for sensitive filenames in history.
   - Check for sensitive content across all commits.
   - Example:

```bash
git rev-parse --is-inside-work-tree
git log --all --name-only --pretty=format: | rg -i "\.env|\.pem|\.key|id_rsa|id_ed25519|credentials|secret|\.p12|\.pfx|\.npmrc|\.pypirc"

git rev-list --all | xargs -n 50 git grep -nE "AKIA[0-9A-Z]{16}|ASIA[0-9A-Z]{16}|AIza[0-9A-Za-z\-_]{35}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[0-9A-Za-z-]{10,}|sk_live_[0-9a-zA-Z]{10,}|SG\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}|BEGIN (RSA|EC|OPENSSH|DSA)? ?PRIVATE KEY|PRIVATE KEY-----|(?i)(api[_-]?key|token|secret|password|access[_-]?key|client_secret)\s*[:=]" || true
```

5. Assess and report
   - List findings with file path + line number or commit hash.
   - Classify severity (critical: secrets/private keys; medium: internal URLs or IDs; low: metadata).
   - Recommend remediation: remove/replace with placeholders, move to env, add to .gitignore, rotate credentials, and rewrite history only with explicit user approval.

## Optional tooling

- If gitleaks or trufflehog is installed, run it and summarize results.
- Prefer reporting evidence and recommended fixes over raw secret values.
