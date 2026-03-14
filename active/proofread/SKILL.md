---
name: proofread
description: Proofread posts before publication. Use when asked to review a draft blog post, article, social post, announcement, essay, or other publish-ready writing for spelling, grammar, repeated phrasing, logic or factual mistakes, weak arguments, or empty and placeholder links.
dependencies: []
---

# Proofread

## Overview

Review a draft that is about to be published and surface issues before it goes live. Focus on correctness, clarity, and publication readiness rather than voice changes unless the user asks for rewrites.

## Review checklist

Check the draft for:

1. Spelling mistakes and typos.
2. Grammar mistakes.
3. Repeated terms or repetitive phrasing such as "It was interesting that X, and it was interesting that Y."
4. Logical errors or factual mistakes.
5. Weak arguments that could be strengthened.
6. Empty or placeholder links.

## Working style

1. Read the full draft once before marking issues.
2. Quote the exact problematic text or point to the specific claim.
3. Explain why it is a problem in one sentence.
4. Prefer the smallest correction that fixes the issue.
5. Mark unverified factual claims as `verify` when the draft makes a claim that may be wrong but cannot be confirmed from the provided context.
6. Distinguish hard errors from optional improvements.

## Output format

Use these sections when reporting findings:

- `Errors`: spelling, grammar, broken links, and clear logical or factual problems.
- `Improvements`: repetitive phrasing or weak arguments that could be stronger.
- `Clean`: state this explicitly when no issues are found.
