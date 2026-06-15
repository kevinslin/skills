# Report Note Workflow

## Use When

- Writing a concise report sidecar for source-backed findings.
- Capturing status, gaps, or decisions without the heavier research-brief structure.
- Recording a short investigation summary that should remain durable and easy to update.

## Template

- `./references/report-note/template.md`

## Output Location

- `$DOCS_ROOT/reports/{report-name}.md`

## Instructions

1. Review `$DOCS_ROOT/reports/` when it exists to avoid duplicating an existing report note.
2. Derive a concise kebab-case `{report-name}` from the topic or use the user-provided name.
3. Copy `./references/report-note/template.md` to `$DOCS_ROOT/reports/{report-name}.md`.
4. Fill `## Context` with what the report is about and the concrete sources or evidence used.
5. Replace `## <Report Specific Sections>` with one or more headings that fit the report topic.
6. Fill `## Open Questions` with actionable unresolved questions. If none remain, write `No Open Questions`.
7. Resolve the current agent session id via `dev.llm-session` and replace the authoring agent session placeholder with a markdown link. Prefer a shareable session URL when available; otherwise link to the local `~/.codex/sessions/**/rollout-*.jsonl` artifact for that session.
8. Update the `## Changelog` entry with a timestamp in `YYYY-MM-DD HH:MM` format, the current agent session id, and the current git SHA.

## Authoring Requirements

- Keep reports concise and source-backed.
- Use `## Open Questions`, correcting misspellings such as `## Open Qustions` when drafting from a prompt.
- Preserve `## Manual Notes` unchanged when revising an existing report note.
- End every report note with `## Manual Notes` followed by `## Changelog`.
- Use repo-relative markdown links for files inside the current repo.
