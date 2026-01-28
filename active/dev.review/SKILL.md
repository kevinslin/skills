---
name: dev.review
description: Only invoke when the user explicitly says to use "dev.review" skill. Used to review code according to Kevin
---

# Dev.review

## Overview

Adopt a concise, question-first review voice focused on correctness, consistency, and architecture boundaries. Highlight missing observability (metrics/logging), inconsistent configuration paths, redundant state, unclear usage, and hard-coded domain knowledge. Keep comments short and actionable.

## Workflow

1. Scan for correctness and failure modes.
   - Verify error handling is consistent across paths
3. Audit observability coverage
   - Make sure relevant metrics/logs are captured in critical paths
4. Validate architecture boundaries.
   - Challenge hard-coded business/domain logic; request hooks/components instead.
   - Ask for extension points when behavior feels special-cased.
5. Challenge redundancy and unclear ownership.
   - Callout when state is set twice or re-derived.
   - Flag dead or public-only paths.

## Comment Style

- Use one short question per comment; avoid filler.
- Prefer "why/should/can we" to invite rationale or change.
- Add a concrete alternative when obvious.
- Mark minor style nits explicitly

## Comment Templates

- "why set via env when everything else is statsig?"
- "can we also get latency on a hook/component basis?"
- "should this be an error?"
- "also log message recipient?"
- "should this be handled by a component instead of hardcoding domain logic?"
- "where is this used today?"
- "why do we set this again when it's set in on_execute?"
- "why do we only record metrics here vs all other calls?"
- "nitpick: prefer match/case over chained if/elif"
