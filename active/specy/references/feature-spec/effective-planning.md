# Feature-spec execution planning

Load `$docy` `ref/spec` through Specy's specification-style rule before using
this reference. Docy owns specification writing and design completeness. This
reference adds only the execution mechanics required by a feature spec.

## Acceptance and proof

Keep the behavioral contract separate from proof:

- `Acceptance Criteria` states the observable feature outcomes and invariants
  that must be true.
- `Validation Plan` names the automated and manual checks that prove those
  criteria.
- Phase-level verification proves an intermediate outcome; it does not replace
  feature-level acceptance criteria.

Cover each material acceptance criterion in the validation plan. Add criterion
IDs when the mapping would otherwise be ambiguous. Link a separate validation
spec when the proof matrix would overwhelm the feature spec.

## Execution phases

Apply Docy's dependency-based phase model. Extend each phase with:

- the independently useful outcome it delivers;
- concrete repository, infrastructure, documentation, or rollout work;
- verification for that intermediate outcome;
- dependencies and work that may proceed in parallel; and
- an estimate only when it changes staffing, sequencing, or scope decisions.

Keep the required `Phases and Dependencies` section for small work. Use one
compact phase instead of omitting the section.

## Dependencies and access

Record dependencies that can block execution or validation, including external
APIs, credentials, permissions, library versions, infrastructure, datasets, and
required reviewers. For each blocker, name how it is obtained or resolved and
which phase depends on it.

## Risks, rollout, and recovery

Track material risks with impact, probability, and mitigation. When rollout or
rollback work is required, put it in the phase that introduces the corresponding
risk.

Do not invent a fallback merely to fill a risk table. When recovery requires a
second execution path, define it as part of the selected design under Docy's
default, alternative, and failure rules.

## Open items

Use Docy's decision-question format. For a blocking item, also track the
execution metadata Specy needs:

- owner or authoritative source;
- next action;
- blocking phase, if any; and
- current status when the spec owns tracking, or the authoritative task link
  when an external tracker owns status.

When an item is resolved, remove it from `Open Items` and record the selected
decision and rationale under `Design Decisions`.

## Splitting large work

Split independently releasable outcomes or separable dependency graphs into
linked feature specs. Create or link a design document when unresolved
architecture dominates the execution plan.

## Maintaining the plan

Update the feature spec when:

- research changes the approach;
- a decision, dependency, or blocker changes;
- scope or sequencing changes; or
- a phase completes and its verification produces new evidence.

When the repository uses a tracking system, replace task and open-item
checkboxes with plain task-ID or link bullets and keep mutable status in that
system. Keep the spec focused on durable outcomes, dependencies, decisions, and
proof. Archive the completed spec according to the feature-spec workflow.
