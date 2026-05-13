---
name: issue-sweep
description: Sweep recent OpenClaw GitHub issues, filter for real unstarted bugs, and write a report to $mem claw/main reports.
dependencies: [mem]
---

# issue-sweep

Use this skill when the user asks to sweep, triage, or report on recent OpenClaw
GitHub issues.

Default scope:
- repo: infer from the current OpenClaw checkout; otherwise use `openai/openclaw`
- lookback: last 48 hours unless the user specifies another period
- output: `$mem claw/main reports`

## Workflow

1. Resolve inputs.
- Interpret relative periods against the current date/time and state the concrete window.
- If the user gives a repository, use it. Otherwise, use the active OpenClaw checkout remote or `openai/openclaw`.
- Use open issues by default unless the user asks for closed or all issues.

2. Collect candidate issues.
- Prefer GitHub CLI or API data over browser scraping.
- Query recent issues by `created:` or `updated:` depending on the user phrasing. If the user only says "past time period", use `updated:` so recently active reports are not missed.
- Exclude pull requests from search results.
- Fetch issue number, title, URL, author, created/updated timestamps, labels, body, comments, linked PR/timeline data, and current state.

3. Filter for issues that seem real and locally workable.
- Keep issues that describe a reproducible bug, broken workflow, regression, docs mismatch, install/runtime failure, data loss risk, or concrete UX defect.
- Skip duplicates when a canonical issue is obvious, questions without a clear defect, feature requests without a bug, vague reports with no actionable symptom, and issues already resolved by an attached PR.
- Skip platform-specific reports that are not easy for Kevin to work on locally, especially Windows-only issues and Android-only issues. Treat an issue as platform-specific when the title, labels, body, repro steps, logs, screenshots, environment fields, or comments make the failing environment Windows or Android specific.
- Do not skip cross-platform issues just because they mention Windows or Android. Keep issues when the report also affects macOS/Linux, the affected platform is unclear, or the underlying defect is likely in shared OpenClaw code rather than platform-specific integration.
- When uncertain, include the issue only if the report has enough evidence for an engineer to investigate without guessing.

4. Detect attached or in-progress PRs.
- Treat a PR as attached when GitHub shows it as linked/closing the issue, when timeline cross-references show a PR tied to the issue, or when issue comments mention an active PR that clearly addresses it.
- Do not exclude an issue just because a PR exists somewhere nearby. Exclude only when the PR appears attached to or clearly fixes the issue.
- In the report's `Work Done` section, list each relevant PR with number, title, URL, state, and why it appears related.
- If no PR or active work is found, write `not started`.

5. Build context pointers.
- Link issue URLs.
- Link feature docs, relevant code paths, commands, or config names when the issue points at a specific subsystem.
- Prefer repo-local file paths for code pointers and public docs URLs for user-facing docs.
- If no specific context is identifiable, write a short note such as `No specific feature pointer identified from the issue text.`

6. Write the report through `$mem`.
- Invoke `$mem` and select base/path `claw/main reports`.
- Follow the configured memory base schema and existing report naming conventions.
- Prefer a filename that includes the sweep date and lookback, for example `issues-2026-05-04-48h.md`, unless the base schema dictates another name.
- Preserve existing report files; create a new report for each sweep unless the user asks to update an existing one.

## Report Template

Use this structure exactly:

```markdown
# Issues

## Overview
- [num] [title]: [one line summary]
- ...

## Details

### [num] [title]
URL: [issue URL]

## Issue
[Concise 1-2 sentence description of the issue.]

## Repro
[Reproduction steps, commands, logs, or "No repro provided."]

## Context
[Relevant docs, code pointers, feature names, or "No specific feature pointer identified from the issue text."]

## Work Done
[Relevant PRs in progress or "not started".]

## Suggested Fix
[Suggested fix based on the issue, or "No suggested fix identified from the issue text."]
```

For the overview, include only issues that pass the filter. If no issues pass, write:

```markdown
# Issues

## Overview
- No real unstarted issues found for the requested window.

## Details

No qualifying issues found.
```

## Reporting Rules

- Keep issue summaries concise and source-grounded.
- Label inferences clearly when the issue does not directly state the root cause.
- Do not invent repro steps, PR status, or suggested fixes.
- Include enough issue evidence for a follow-up engineer to jump directly into investigation.
- Final response should name the concrete time window, number of qualifying issues, and the report path written.
