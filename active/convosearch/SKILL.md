---
name: convosearch
description: Search prior Codex conversations and return up to 3 relevant thread matches with deep links. Use when explicitly invoked as `$convosearch [query] | [filters]`.
dependencies: []
---

# convosearch

Use this skill only when the user explicitly invokes `$convosearch`.

## Usage

```text
$convosearch [query] | [filters]
```

- `query` is required.
- `filters` is optional.
- Split on the first literal `|`. Trim surrounding whitespace on both sides.
- Treat everything before `|` as the search query.
- Treat everything after `|` as additional ranking constraints such as recency, repo, project, or topic hints.

Example:

```text
$convosearch personal site bootstrap | last 2 weeks
```

## Goal

Return a short list of the most relevant prior Codex conversations, usually 1-3 results and never more than 3 unless the user explicitly asks for more.

Prefer precision over recall. If only 1-2 threads look relevant, return only those.

## Search workflow

1. Parse the query and optional filters.
2. Search recent Codex threads first with `codex_app.list_threads`.
3. Use 2-4 targeted `list_threads` searches with query rewrites rather than one broad search.
4. If the thread feed is ambiguous or sparse, check lightweight memory pointers in `~/.codex/memories/MEMORY.md` for saved thread ids or rollout summaries related to the query.
5. Verify the top candidates with `codex_app.read_thread` before returning them.
6. Rank by direct topical match first, then by filter match such as time window or cwd, then by recency.

## Query rewriting

Generate compact variants from the user query:

- exact key phrase
- likely repo or service name
- likely artifact or path term
- one shorter fallback query

For example, for `personal site bootstrap`, reasonable rewrites might include:

- `personal site bootstrap`
- `personal site`
- `bootstrap`
- the likely workspace or project name if the user provided one

Do not spam broad generic searches when the query already contains strong nouns.

## Filters

Use filters only to narrow or rerank; do not let them override strong textual matches.

Common filters:

- recency: `today`, `yesterday`, `last week`, `last 2 weeks`, `last month`
- workspace hints: repo name, project path, service name
- status hints: `active`, `idle`, `completed`

Interpret natural-language time filters against the current date. If the filter is ambiguous, say how you interpreted it.

## Verification

Before returning a result, confirm it by reading the thread summary:

- check the title
- check the preview
- inspect 1-3 recent turns when needed
- make sure the thread is actually about the requested topic, not just sharing one keyword

If no strong matches exist, say so plainly and optionally return the closest one labeled as weak.

## Output format

Use this exact shape:

```md
### [title of convo]
- [codex://threads/<thread-id>](codex://threads/<thread-id>)

[short description]
```

Output rules:

- keep descriptions to 1-3 sentences
- include only relevant results
- try to keep the total under 3 results
- prefer clickable deep links
- mention date or cwd only when it helps disambiguate

## Description guidance

The short description should explain why the thread matched, for example:

- the user prompt or preview closely matches the query
- the thread worked in the expected repo or cwd
- the thread falls within the requested time window
- the thread answered the exact setup or implementation question

## Avoid

- dumping raw search logs
- returning low-confidence matches just to fill 3 slots
- answering the topic from scratch instead of finding the prior conversation
- inventing a deep link or thread id
