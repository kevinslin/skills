## Trigger
Use when judging meta agent optimization work over its past sessions.

## Evidence
- Read the recommendation text for the judgement being judged.
- Read the affected skill files or diffs the recommendation would change.
- Read any directly relevant review comments, failures, or prior outputs that motivated the recommendation.
- Before classifying as `APPROVE` or `REJECT`, inspect enough durable evidence to justify all three scores.
- If the evidence is missing, contradictory, or too weak to support confident scoring, classify as `ESCALATE` instead of guessing.

## Criteria
- impact: will this significantly improve performance, efficiency, or correctness of output?
  - 1: little to no improvement. Could apply, but probably not worth the tokens.
  - 3: moderate improvement. Good to adopt if the risk and size stay low.
  - 5: a step-level improvement in output. Should apply immediately if it is safe.
  - 2 and 4: interpolate between the anchor scores above.
- risk: could this significantly damage agent performance?
  - 1: no meaningful risk. Small change with tight blast radius.
  - 3: medium risk. A decent chunk of changes across potentially multiple files and requires new logic.
  - 5: high risk. Extensive change, touches `AGENTS.md`, or requires installing new packages.
  - 2 and 4: interpolate between the anchor scores above.
- size: how large is this change?
  - 1: a few lines or a tightly localized wording or logic change in one file.
  - 3: a moderate change across one skill or several files in one workflow.
  - 5: a major workflow rewrite, cross-skill change, or substantial new code/scripts.
  - 2 and 4: interpolate between the anchor scores above.

## Threshold
- APPROVE:
  - impact >= 4
  - risk <= 2
  - size <= 2
- REJECT:
  - risk >= 4
  - size <= 2
- ESCALATE:
  - risk >= 4
  - size >= 4
  - impact = 3 and risk = 3 and size > 1
  - any judgement that does not clearly meet an `APPROVE` or `REJECT` rule
  - when escalating, render the judgement under `## Human Decisions Needed` with a recommended decision and a one-line threshold-based reason
  - require the human to reply with `Judgement N: APPROVE` or `Judgement N: REJECT`
  - if no human reply has been received yet, leave the judgement in `Judgements pending human input`

## Alignment
[additional directives, to be filled out over time to align judgements to human preferences]
