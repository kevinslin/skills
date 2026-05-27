---
name: spec-template
description: Turn an existing concrete spec into a reusable generic spec template. Use when asked to create a generic spec, template spec, reusable implementation template, or generalized version of a spec from a specific implementation such as one plugin, channel, integration, feature, or PR.
dependencies:
- mem
- specy
---

# spec-template

Use this skill to convert a specific implementation spec into a reusable template
that can guide future implementations of the same pattern.

Good fits:

- A concrete plugin spec should become a generic plugin implementation spec.
- A channel-specific approval spec should become a generic channel approval template.
- A PR or milestone spec should become a reusable recipe for similar future work.

## Workflow

1. Resolve the source and destination.
   - Identify the existing concrete spec, PR, report, or implementation notes to generalize.
   - If the destination is durable knowledge, invoke `../mem/SKILL.md` before choosing the output path.
   - If the user names a concrete path, use it.
   - If no output path is clear, ask one concise question.

2. Read the concrete source and its anchors.
   - Read the spec first.
   - Read only the source code, docs, tests, PR text, screenshots, or proof artifacts needed to understand which parts are invariant.
   - Capture the source spec path and example implementation name; the final template should point back to them as a worked example when appropriate.

3. Separate invariant pattern from instance details.
   - Invariant: contracts, required integration points, state transitions, verification shape, rollout gates, safety checks, and failure modes.
   - Instance detail: product names, specific channel/plugin/provider names, IDs, file paths, config keys, phone numbers, screenshots, PR numbers, and one-off migration notes.
   - Keep concrete details only when they are useful as examples. Mark them explicitly as examples, not required template content.

4. Draft the generic template.
   - Replace concrete nouns with clear slots such as `<channel>`, `<plugin>`, `<capability>`, `<provider>`, `<config key>`, `<approval action>`, or `<proof artifact>`.
   - Preserve implementation order where it matters.
   - Include a short "How to adapt this template" section when the source spec has many replaceable details.
   - Include verification requirements that prove the generic behavior, not just the original implementation.

5. Add example linkage.
   - Include a "Worked Example" or "Reference Implementation" section if the user asks for the source spec/PR to be cited.
   - Link to the original spec, report, PR, or proof artifact with relative links when possible.
   - Make clear which example facts must not be copied blindly into new implementations.

6. Review for template quality.
   - The template should be reusable without knowing the original conversation.
   - The template should still be concrete enough to implement from.
   - Remove stale source-specific TODOs, personal notes, secrets, phone numbers, and live credentials.
   - Preserve any `## Manual Notes` section in an existing destination document exactly.

## Output Shape

Prefer this structure unless the destination has an existing spec format:

```markdown
# <Generic Capability> Spec Template

## Purpose
What this template helps implement.

## When To Use
Signals that this template applies.

## Inputs
- `<source spec>`:
- `<target implementation>`:
- `<owner surface>`:

## Required Contracts
The invariant API, config, runtime, state, and ownership contracts.

## Implementation Template
Step-by-step generic implementation plan with replaceable slots.

## Verification Template
Required automated, manual, integration, and proof checks.

## Rollout And Safety
Config gates, compatibility, privacy/security, failure modes, and rollback.

## Worked Example
Concrete source spec or PR used to derive this template.

## Manual Notes

[keep this for the user to add notes. do not change between edits]

## Changelog
- [YYYY-MM-DD HH:MM]: Created template from `<source>`. ([agent session id] - (current git sha))
```

## Prompt Pattern

When asked to create a generic template from a specific spec, use this internal
prompt shape:

```markdown
Read the concrete spec and any minimal supporting source/proof needed. Create a
generic spec template for implementing the same kind of capability in another
surface. Extract invariant contracts and required verification from the source,
replace implementation-specific details with named slots, keep the original as a
worked example, and call out details that should not be copied blindly.
```

## Quality Bar

- Generic, but not vague: every required implementation decision should have a slot, rule, or checklist item.
- Example-backed: readers can trace the template back to the concrete source when needed.
- Safe to reuse: no credentials, live phone numbers, one-off IDs, or source-only config copied into the reusable template.
- Implementation-ready: an engineer should be able to start from the template without rediscovering the original spec's main contracts.
