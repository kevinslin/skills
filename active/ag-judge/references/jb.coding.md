## Trigger
Use on code-related tasks where proposed changes are delivered through a pull request and need a merge/apply judgement.

## Evidence
- Read the pull request description, changed files/diff, and linked issue/spec if present.
- Read pull request comments/reviews and identify unresolved concerns or blockers.
- Summarize the changes by behavior area before scoring (what changed, why, and expected blast radius).
- If required artifacts (PR diff, comments, CI/merge status) are missing, contradictory, or too weak to score confidently, classify as `ESCALATE` instead of guessing.

## Criteria
- impact: significance of the change to current functionality.
  - 1: incremental update to existing functionality.
  - 3: meaningful enhancement to an existing flow or a small new capability with clear user value.
  - 5: major feature/enhancement that adds important new functionality or radically improves existing functionality.
  - 2 and 4: interpolate between the anchor scores above.
- risk: potential for the change to break or degrade existing functionality.
  - 1: scoped change with a small blast radius.
  - 3: introduces new dependencies or non-trivial cross-cutting logic changes.
  - 5: changes core behavior; any database schema change or core security primitive change is always 5.
  - 2 and 4: interpolate between the anchor scores above.
- size: magnitude of the change in the codebase.
  - 1: touches a few files with minimal line changes.
  - 3: touches multiple files with moderate code changes in one subsystem.
  - 5: touches a large surface area with substantial code changes across multiple subsystems.
  - 2 and 4: interpolate between the anchor scores above.

## Threshold
- APPROVE:
  - size < 3
  - risk <= 3
- REJECT:
  - none
- ESCALATE:
  - risk > 3
  - size > 3
  - any judgement that does not clearly meet the `APPROVE` rule
  - when escalating, render the judgement under `## Human Decisions Needed` with a recommended decision and a one-line threshold-based reason
  - require the human to reply with `Judgement N: APPROVE` or `Judgement N: REJECT`
  - if no human reply has been received yet, leave the judgement in `Judgements pending human input`

## Alignment
[additional directives, to be filled out over time to align judgements to human preferences]
