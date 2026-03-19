## Trigger
[one sentence describing when this judgebook should be selected]

## Evidence
- [durable artifact to inspect before scoring]
- [durable artifact to inspect before scoring]
- If the required evidence is missing, contradictory, or too weak to support confident scoring, classify as `ESCALATE` instead of guessing.

## Criteria
- impact: [what this means for this topic]
  - 1: [low-impact anchor]
  - 3: [medium-impact anchor]
  - 5: [high-impact anchor]
  - 2 and 4: interpolate between the anchor scores above.
- risk: [what this means for this topic]
  - 1: [low-risk anchor]
  - 3: [medium-risk anchor]
  - 5: [high-risk anchor]
  - 2 and 4: interpolate between the anchor scores above.
- size: [what this means for this topic]
  - 1: [small-size anchor]
  - 3: [medium-size anchor]
  - 5: [large-size anchor]
  - 2 and 4: interpolate between the anchor scores above.

## Threshold
- APPROVE:
  - [rule]
- REJECT:
  - [rule]
- ESCALATE:
  - [rule]
  - when escalating, render the judgement under `## Human Decisions Needed` with a recommended decision and a one-line threshold-based reason
  - require the human to reply with `Judgement N: APPROVE` or `Judgement N: REJECT`
  - if no human reply has been received yet, leave the judgement in `Judgements pending human input`

## Alignment
[additional directives, to be filled out over time to align judgements to human preferences]
