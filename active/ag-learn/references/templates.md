# Templates

Use this reference when writing a durable learn note.

## Filename

Save notes under `LEARN_ROOT` with the literal `ag-learn` token:

```text
ag-learn-{YYYY-MM-DD}-{session-id-or-review-id}-{kebab-description}.md
```

For formal two-pass session scans, save raw findings first:

```text
ag-learn-{YYYY-MM-DD}-{session-id-or-review-id}-{kebab-description}-findings.md
```

## Saved Note Header

Start each saved note with:

```markdown
## Evidence Inspected

- [durable source inspected: transcript path, parent session id, PR/review artifact, log, diff, generated file, or command output]

## Coverage

- active session: [covered|not covered|n/a] - [brief detail]
- parent/forked session: [covered|not covered|n/a] - [brief detail]
- durable artifacts: [covered|not covered|n/a] - [brief detail]
- candidate friction ranking: [brief list of considered candidates and why the selected findings won]

## Known Gaps

- [source not inspected, unavailable evidence, blocked read, stale data, or `none`]
```

## Finding Template

Use this structure for each durable finding:

```markdown
## [number] Improvement Opportunity

[describe the mistake or optimization opportunity]

### Why
[describe why]

### Learning
[what you learned]

### Recommendations
[what to remember to not make this mistake again]

### Expected vs Actual
- expected: [what the controlling instruction, skill, shortcut, doc, or user request required]
- actual: [what happened, citing the durable evidence type]
- gap: [the missed read, wrong assumption, workflow mismatch, or execution failure]

### Routing
- target: [skill|AGENTS.md|repo docs|workflow|none]
- skill action: [create|optimize|none]
- skill name: [existing-skill-name|proposed-skill-name|n/a]
- apply target: [exact file path, shortcut file, AGENTS.md path, repo doc path, workflow name, or n/a]
- proposed change: [one-sentence change to make in the apply target, or n/a]
- scope: [local|repo|cross-session]
- promote: [yes|no]
```

For `promote: yes`, `apply target` must be exact and `proposed change` must be implementation-ready. If either field is missing, use `promote: no`.

## User Summary

When summarizing saved learnings for the user, use a compact numbered list. Include a terse routing line after each item:

```markdown
Routing: target=[...], skill action=[...], skill=[...], apply target=[...], scope=[...], promote=[...]
```

When describing where a learning was saved, use:

```text
Saved the learning note to <absolute-filepath> - <status/details>
```
