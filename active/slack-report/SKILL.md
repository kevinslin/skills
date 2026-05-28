---
name: slack-report
description: Generate incremental Slack digests for channels, topics, and categories.
dependencies: []
---

# Slack Report

## Overview

Create a Slack report for a named stream such as `super-agent` by scanning the requested Slack channels, collecting only messages newer than the last successful check, merging the findings into that day’s report file, writing a short top-level summary, and writing the new watermark only after the report is complete. When the user asks for a Google Doc version, also write the report into a persistent Google Doc and reuse that same doc on later runs.

The report input is:

- `title`: report title, used for the watermark file name
- `channels`: Slack channels to scan
- `topic`: the subject to prioritize while reading
- `categories` (optional): ordered buckets such as `announcements`, `updates`, `feedback`
- `output` (optional): `markdown` by default; when the user asks for a Google Doc or `gdoc`, write both the markdown report and the Google Doc

## Report File

- Resolve `$DOCS_ROOT` from the environment when set.
- Default `$DOCS_ROOT` to `~/code/openai/0/notes` when the environment variable is unset.
- Default report root: `$DOCS_ROOT/report`
- Per-report folder: `$DOCS_ROOT/report/[report-title]/`
- Daily file: `$DOCS_ROOT/report/[report-title]/[yyyy-mm-dd].md`
- Use the normalized report-title slug for the folder name so paths stay stable across runs.
- When the same report is run multiple times on the same local calendar day, update the existing daily file instead of creating a second file.
- Keep a `## Update Log` section at the end of the report and append one line for each successful write or merge.

Use the helper script for deterministic report-path handling:

```bash
python3 ./scripts/report_state.py report-path --title "<report-title>"
```

`report-path` prints JSON with the resolved docs root, report directory, report file path, and local report date.

## State File

- Watermark directory: `~/.llm/skills/slack-report/`
- Watermark file: `~/.llm/skills/slack-report/[report-title]_last_updated`
- Google Doc URL state file: `~/.llm/skills/slack-report/[report-title]_gdoc_url`
- If the watermark file exists, scan only messages created after that timestamp.
- If the watermark file does not exist, look back 24 hours from now.
- If the Google Doc URL state file exists, reuse that exact URL instead of creating a new doc.
- If the Google Doc URL state file does not exist and the user asked for a Google Doc, create one named `KL {Report Title}` and persist its URL only after the first successful write.
- Store the watermark only after a successful report run.

Use the helper script for deterministic timestamp handling:

```bash
python3 ./scripts/report_state.py window --title "<report-title>"
python3 ./scripts/report_state.py report-path --title "<report-title>"
python3 ./scripts/report_state.py gdoc-url --title "<report-title>"
python3 ./scripts/report_state.py write --title "<report-title>" --timestamp "<end-iso>"
python3 ./scripts/report_state.py write-gdoc-url --title "<report-title>" --url "<google-doc-url>"
```

`window` prints JSON with the state file path, the effective start/end ISO timestamps, and Slack-compatible `oldest_ts` / `latest_ts` values. `gdoc-url` prints JSON with the persisted Google Doc URL, if any.

## Workflow

1. Resolve the scan window with `./scripts/report_state.py window --title "<report-title>"`.
2. Resolve the target report file with `./scripts/report_state.py report-path --title "<report-title>"`.
3. If the user asked for a Google Doc, resolve the existing doc URL with `./scripts/report_state.py gdoc-url --title "<report-title>"`.
4. If the user asked for a Google Doc and no URL is stored yet, create a new Google Doc named `KL {Report Title}`, then persist its URL with `./scripts/report_state.py write-gdoc-url --title "<report-title>" --url "<google-doc-url>"` after the first successful write.
5. If the daily report file already exists, read it first and merge into it instead of starting over.
6. Search or read only the requested channels.
- Prefer `slack_read_channel` when the channel list is known and bounded.
- Prefer `slack_search_public` when keyword filtering will substantially reduce noise.
- Use `slack_search_public_and_private` only when the user explicitly wants private coverage or has already consented.
7. Keep only messages created within the computed window.
8. Expand threads only for messages that look directly relevant to the topic or a requested category.
9. Summarize the strongest items into the requested categories.
- If categories are provided, use them in the user-supplied order.
- If categories are omitted, infer a small set of useful headings from the messages.
10. Omit empty categories unless the user explicitly wants them shown.
11. When merging into an existing same-day report:
- de-duplicate entries by Slack permalink
- keep the existing section order when possible
- append genuinely new items into the correct category
- rewrite the `## Summary` section so it reflects the merged report, not just the newest delta
- preserve prior write history in the `## Update Log` section
12. Write a `## Summary` section near the top of the daily markdown report before the category sections.
- Always generate the summary via a dedicated `froge` subagent when `froge` is available in the current Codex session.
- Pass the merged report content to `froge` and request a short 2-4 sentence summary that is opinionated, technically informed, entertaining, and still genuinely useful.
- If `froge` is unavailable or fails, write a direct high-signal summary yourself in a normal voice and note that fallback in your run notes.
- When the summary references specific updates that already appear as headings lower in the file, prefer local Markdown anchor links to those headings.
13. If the user asked for a Google Doc, keep a cumulative doc with the newest report day prepended near the top using this exact outer structure:

```md
# [Report title]
- [last updated time]

## [today report]

## [yesterday report]
```

14. In the Google Doc, treat each dated section such as `## 2026-03-11 Report` as a daily block that contains that day's summary, categories, and items. Insert the newest day's block immediately after the title and last-updated line so the doc reads newest-to-oldest.
15. When updating an existing Google Doc:
- replace the single `- [last updated time]` line with the current run time
- replace that day’s existing `## [date] Report` block if it already exists, otherwise insert a new block at the top
- preserve older dated sections below it
16. Append a new `## Update Log` line at the end of the markdown daily file, for example `- 2026-02-27 11:10 PST: merged 4 new items from 2026-02-27 09:00 PST to 2026-02-27 11:10 PST`.
17. After the markdown report and optional Google Doc are successfully written, advance the watermark with `./scripts/report_state.py write`.

## Categorization Rules

- `announcements`: launches, milestones, invitations, trackers, POR changes, enablement notices
- `general feedback`: bugs, UX complaints, reliability issues, approval friction, connector mismatches
- `gmail feedback`: Gmail-specific auth, scope, send-email, write-action, or connector behavior
- `tips`: how-to advice, settings, workarounds, model overrides, recommended prompts
- `usecases`: real workflows, demos, success stories, examples of value

If a message fits multiple categories, place it in the most decision-useful one and mention the overlap in the description when needed.

## Output Template

Use this Markdown shape for each dated report section:

```md
## Summary

[2-4 sentence summary of the current report]

## [yyyy-mm-dd Report]

## [category]
### [title]
- source: [Slack permalink](https://openai.slack.com/archives/...)
- time: [posted timestamp]

[description]
```

When the user asks for a Google Doc, the cumulative doc should start with:

```md
# [Report title]
- [last updated time]
```

End each markdown daily file with:

```md
## Update Log
- 2026-02-27 10:54 PST: created report from 2026-02-26 10:54 PST to 2026-02-27 10:54 PST
```

Descriptions should be short and concrete:

- what happened
- why it matters for the topic
- key reply or resolution when a thread adds important context

The summary should be short and decision-useful:

- lead with the main takeaway from the full merged report
- use `froge` subagent output when available; otherwise use concise direct fallback text
- if it cites specific items below, link to them with local Markdown anchors when practical

## Notes

- Treat the report as incremental. Do not repeat items older than the stored watermark.
- If this is the first run, state that the scan window used the last 24 hours.
- Store the report in the daily file under `$DOCS_ROOT/report/[report-title]/`.
- Reuse the same file for same-day reruns and merge in new items instead of replacing the file.
- Recompute the summary after each same-day merge so it describes the whole file as it stands now.
- When a Google Doc is requested, always write the markdown daily file first, then sync the cumulative Google Doc from that merged result.
- Use the Google Docs tools to create or update the doc; do not create duplicate docs for the same report title once a URL has been persisted.
- When the requested channels are noisy, bias toward fewer high-signal entries instead of exhaustively listing every message.
- Preserve Slack permalinks for every item.
- Write `source` values as explicit Markdown links, not bare URLs. This preserves clickability in downstream conversions such as Markdown -> HTML -> Google Docs, where plain URLs may not be auto-linked.
- When descriptions mention additional URLs that should stay clickable, prefer explicit Markdown links there too.
