# Component Note Template

Use this template for every per-component maturity note.

```markdown
---
title: <Surface> - <Component> Maturity Note
last_refreshed: YYYY-MM-DD
last_refreshed_by: codex
---

# <Surface> - <Component> Maturity Note

## Summary

## Component Scope

## Archive Freshness

- gitcrawl:
- discrawl:

## Coverage Score

- Score: `<MaturityLabel> (<N>%)`
- Positive signals:
- Negative signals:
- Integration gaps:

Coverage labels:

- `Complete`: 95-100
- `Stable`: 80-95
- `Beta`: 70-80
- `Alpha`: 50-70
- `Experimental`: 0-50

At shared boundaries, choose the higher maturity label.

Coverage measures integration, e2e, live, or real runtime-flow evidence across
the component. Unit tests help confidence but never make a feature covered by
themselves.

## Quality Score

- Score: `<MaturityLabel> (<N>%)`
- Gitcrawl reports:
- Discrawl reports:
- Good qualities:
- Bad qualities:
- Excluded from quality:

Quality labels:

- `Complete`: 95-100
- `Stable`: 80-95
- `Beta`: 70-80
- `Alpha`: 50-70
- `Experimental`: 0-50

At shared boundaries, choose the higher maturity label.

Quality must not use unit, integration, e2e, live, or real runtime test coverage
as a scoring input.

## Known Gaps

## Evidence

### Docs

-

### Source

-

### Integration tests

-

### Unit tests

-

### Gitcrawl queries

Query:

Results:

-

### Discrawl queries

Query:

Results:

-
```
