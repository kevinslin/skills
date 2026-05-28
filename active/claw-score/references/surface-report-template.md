# Surface Report Template

Use this template for the aggregate surface report.

```markdown
---
title: <Surface> Feature Matrix
last_refreshed: YYYY-MM-DD
last_refreshed_by: codex
---

# <Surface> Feature Matrix

## Summary

## Matrix

| Feature family | Coverage | Quality | Significant features to evaluate | Search anchors |
| --- | --- | --- | --- | --- |

## Scoring rubric

- Coverage:
  maturity-label rating for integration, e2e, live, or server/runtime flow
  evidence across the component. Unit tests help confidence but never make a
  feature covered by themselves.
- Quality:
  maturity-label rating for implementation and operational robustness. Unit,
  integration, e2e, live, and real runtime-flow test coverage are Coverage
  inputs only; they do not raise or lower Quality.
- Shared score bands:
  `Complete = 95-100`, `Stable = 80-95`, `Beta = 70-80`,
  `Alpha = 50-70`, and `Experimental = 0-50`. At shared boundaries, choose the
  higher maturity label.
- Major quality/completeness gaps:
  evidence text only, tracked in the detailed feature inventory rather than as a
  separate scored dimension.

## Top-level scores

These rollups are simple arithmetic means over the component-note numeric
scores. Percentages are rounded to the nearest whole number.

- Coverage: `<MaturityLabel> (<N>%)`
- Quality: `<MaturityLabel> (<N>%)`

## Detailed feature inventory

### 1. <Component>

Significant features:

-

Primary docs:

-

Major quality/completeness gaps:

-

## Recommended scorecard interpretation

## Out of scope for this surface

## Audit provenance
```
