---
name: ag-judge
description: Judge agent work as approve, reject, or escalate.
dependencies: [sc]
---

# Ag Judge

Judge AI agent work before execution. Score each judgement on `impact`, `risk`, and `size`, and choose a decision classification from the active judge book.

## Judge Books

Judge books live at `references/jb.[topic].md`.

Use [jb.template.md](/Users/kevinlin/code/skills-private/ag-judge/references/jb.template.md) as the starting point for every new judgebook.

Available judge books:

- `references/jb.agent-optimize.md`: Use when judging meta agent optimization work over its past sessions.
- `references/jb.coding.md`: Use when judging code-related pull-request work.
- `references/jb.template.md`: Boilerplate template for creating a new judgebook.

## Concepts

| Concept | Meaning | Maps to Review Workflow | Maps to Create Judgebook Workflow |
| --- | --- | --- | --- |
| `judgement` | Smallest independent decision object to score and classify. | Steps 1, 4-9 and `## Judgement N` output blocks. | Step 4 (human escalation/reply contract) and step 5 (classification rules must reference judgement outcomes). |
| `judge book` | Topic-specific policy file (`references/jb.[topic].md`) that defines scoring and decision rules. | Step 2 selects the active judge book. | Steps 1-2 create/select topic and file structure. |
| `evidence` | Durable artifacts required before scoring. | Step 3 gathers and checks sufficiency. | Steps 2 and 5 require an explicit `## Evidence` section. |
| `scores` (`impact`, `risk`, `size`) | Integer profile (`1-5`) used to evaluate each judgement. | Step 4 scoring and step 6 reasoning. | Step 3 defines anchors/interpolation in `## Criteria`. |
| `decision classification` (`APPROVE`, `REJECT`, `ESCALATE`) | Threshold-rendered outcome for a judgement. | Step 5 renders the classification and step 6 explains the fired rule. | Step 4 defines threshold policy and escalation behavior. |
| `human decision` | Human reply for escalated judgements via `Judgement N: APPROVE` or `Judgement N: REJECT`. | Step 7 collects replies and resolves classifications. | Step 4 must preserve this reply contract. |
| `summary buckets` | Final outcome rollup categories across all judgements. | Step 9 and the `## Summary` output block. | Step 4 and step 5 must keep decision outcomes compatible with these buckets. |

## Review Workflow

1. Split the input into independent judgements.
   - Judge each judgement separately.
   - Keep judgements small enough that one decision can be applied or rejected without bundling unrelated changes.
2. Select the judge book whose `Trigger` best matches the judgement.
   - If no judge book clearly matches, stop and ask for a human decision or a new judge book.
3. Gather evidence before scoring.
   - Read the artifacts required by the active judge book's `Evidence` section.
   - Prefer durable artifacts such as diffs, affected files, prior failures, validation output, and the recommendation text itself.
   - If the required evidence is missing, contradictory, or too weak to justify a score, do not guess. Escalate to the human or ask for the missing artifacts.
4. Score the judgement on `impact`, `risk`, and `size`.
   - Use integers only: `1`, `2`, `3`, `4`, or `5`.
   - Follow the active judge book's `Criteria`.
   - Treat `1-2` as low, `3` as medium, and `4-5` as high unless the judge book says otherwise.
5. Render the decision classification from the judge book's `Threshold`.
   - Render exactly one outcome per judgement: `APPROVE`, `REJECT`, or `ESCALATE`.
   - If threshold rules do not resolve cleanly, classify as `ESCALATE`.
6. Explain the decision.
   - For every automatically rendered judgement, state the score reasoning and the exact threshold rule that fired.
   - For `ESCALATE`, state which threshold triggered escalation, give a concise recommendation, and mark the judgement as `pending human input`.
7. Pause for human input when needed.
   - If one or more judgements are `ESCALATE` and the human has not replied yet, stop after rendering a `## Human Decisions Needed` section.
   - For each pending judgement, include the judgement number, short title, recommended decision, and one-line reason.
   - Ask the human to reply using exact lines of the form `Judgement N: APPROVE` or `Judgement N: REJECT`.
   - If the human replies for only some judgements, resolve only those judgements and leave the rest pending.
8. Stop at classification output.
   - NEVER execute `Apply` or `Validate` actions inside `ag-judge`.
   - Do not emit execution instructions.
   - Preserve original scores and score reasoning unless the human explicitly asks for re-judgement.
9. End with a summary covering all judgements.
   - `Judgements with outcome APPROVE`
   - `Judgements with outcome REJECT`
   - `Judgements with outcome ESCALATE`
   - `Judgements pending human input`
   - Include `none` for empty buckets.

## Create Judgebook Workflow

Use this workflow when asked to add a new judgebook.

1. Identify the topic and intended trigger.
   - Choose a short topic slug and name the file `references/jb.[topic].md`.
   - Write a one-sentence `Trigger` that clearly says when this book should be selected.
2. Start from the template.
   - Copy the structure from `references/jb.template.md`.
   - Keep all required sections: `Trigger`, `Evidence`, `Criteria`, `Threshold`, `Alignment`.
3. Fill in the scoring model.
   - Define concrete anchors for `impact`, `risk`, and `size`.
   - Prefer explicit 1/3/5 anchors and say how to interpolate `2` and `4`.
4. Define the decision policy.
   - State threshold rules for `APPROVE`, `REJECT`, and `ESCALATE`.
   - Make the escalation path compatible with the main skill:
     - render pending items under `## Human Decisions Needed`
     - require replies in the form `Judgement N: APPROVE` or `Judgement N: REJECT`
     - leave unresolved items in `Judgements pending human input`
5. Keep judgebooks classification-only.
   - Do not include `Apply`, `Validate`, or `Delegation` sections in judgebooks.
   - Judgebooks should only define how to score and classify judgements.
6. Register the new judgebook in this skill.
   - Add one bullet under `Available judge books` describing when it should be used.
7. Validate the result.
   - Re-read the new judgebook and confirm it is consistent with the `Review Workflow`.
   - Run `python3 /Users/kevinlin/.codex/skills/sc/scripts/quick_validate.py /Users/kevinlin/code/skills-private/ag-judge`.

## Output Format

Render one section per judgement:

```markdown
## Judgement N: <short title>
- Judge book: <path>
- Evidence: <artifacts reviewed or missing evidence that forced escalation>
- Scores: impact <1-5>/5, risk <1-5>/5, size <1-5>/5
- Decision outcome: APPROVE | REJECT | ESCALATE
- Reasoning: <why the scores and threshold produced this classification>
```

For escalated judgements waiting on a reply, also render:

```markdown
## Human Decisions Needed
- Judgement N: recommend APPROVE | REJECT
  - Reason: <one-line threshold-based reason>
  - Reply with: `Judgement N: APPROVE` or `Judgement N: REJECT`
```

Then render:

```markdown
## Summary
- Judgements with outcome APPROVE: ...
- Judgements with outcome REJECT: ...
- Judgements with outcome ESCALATE: ...
- Judgements pending human input: ...
```
