---
name: meta.skill-optimizer
description: Optimize existing skills and their associated files (SKILL.md, scripts, references, assets) for clarity, concision, and ease of use. Use when asked to optimize, streamline, simplify, or clean up a skill; consolidate duplicated or conflicting instructions; add small, clarifying examples; or run an evidence-based skill review using past runs/sessions and learnings.
---

# Meta Skill Optimizer

## Goals

- Make instructions easy to follow and unambiguous
- Consolidate or remove duplicated information
- Add small, targeted examples only when they reduce ambiguity
- Turn repeated friction from real usage into concrete skill improvements

## Inputs to Confirm

- Scope limits (e.g., "only edit SKILL.md" or "do not change behavior")
- Whether to validate/package after edits
- Mode:
  - `simple` optimization (default)
  - `trace` optimization (review past runs/sessions before editing)
- For `trace` optimization: review window/source (current convo, recent sessions, specific runs, learnings files) and whether to only recommend changes vs apply them

## Workflow

Choose the smallest workflow that matches the request.

### Workflow A: `simple` optimization (default)

1. Locate the skill directory and inventory its files (SKILL.md, scripts/, references/, assets/).
2. Read SKILL.md fully; skim related files only as needed to resolve conflicts, duplication, or missing guidance.
3. Identify issues: unclear triggers, redundant sections, inconsistent terminology, or misplaced detail.
4. Decide what belongs in SKILL.md vs references/ (keep SKILL.md lean; push details to references).
5. Edit SKILL.md:
   - Strengthen the frontmatter description with clear triggers and scope.
   - Use imperative, concise steps and consistent terminology.
   - Remove duplication; reorder for logical flow.
   - Add a short Examples section only if it reduces confusion.
6. Clean up files:
   - Remove unused example files and orphaned references.
   - Ensure every reference file is linked from SKILL.md.
7. Validate/package only if requested.

### Workflow B: `trace` optimization (general workflow for any skill)

Use this mode when the user wants improvements grounded in actual usage (for example: “based on recent runs,” “learn from the last month,” or “optimize this skill from prior sessions”).

1. Define the review scope:
   - Which skill(s)
   - Time window or run set
   - Output mode: recommendations only vs apply edits
2. Gather evidence sources (pick the minimum set that answers the question):
   - Current conversation transcript
   - Past Codex session prompts/transcripts (for example `~/.codex/history.jsonl`, `~/.codex/sessions/**`)
   - Learning files (for example `~/.llm/skills/learn/*.md`)
   - Skill-local notes/TODOs and prior review notes
3. Validate evidence coverage before analyzing:
   - Confirm the time window/run set is actually represented in the source
   - Note gaps (missing transcripts, sparse logs, partial learnings) before drawing conclusions
4. Classify usage patterns and friction:
   - What the skill is most often used for
   - What parts are helping (fast path, examples, scripts, references)
   - What parts are causing friction (ambiguity, duplication, missing steps, overlong SKILL.md, missing validation, discoverability gaps)
   - Prioritize explicit user corrections and repeated failures over one-off preferences
5. Convert findings into concrete skill changes:
   - Tighten triggers/scope in frontmatter description
   - Split default vs advanced workflows when the skill serves both quick and deep tasks
   - Move detailed content from SKILL.md into references/ when it reduces context cost
   - Add checklists/guardrails for recurring failure modes
   - Add small examples only where they eliminate ambiguity
6. Preserve intent while editing:
   - Keep the skill’s purpose and expected behavior stable unless the user asks to broaden scope
   - Prefer additive changes over broad rewrites when refining an already-working skill
7. Validate and summarize:
   - Run the relevant validator(s) if requested or if editing SKILL frontmatter/structure
   - In the final response, map each major change to the evidence that motivated it
   - Call out coverage limits and any assumptions

## Evidence Review Heuristics

- Start with source-coverage checks before deep analysis (avoid building conclusions on incomplete data).
- Prefer repeated friction and explicit user feedback over inferred style preferences.
- Separate “what is working” from “what is not” before proposing changes.
- When rewriting a skill section, use a coverage checklist (existing sections + required outputs) to avoid dropping useful behavior.
- Verify generated artifacts or reports for formatting/readability, not just file existence.

## Quality Checklist

- Description clearly states when to use the skill
- No duplicated or conflicting instructions
- SKILL.md is scannable and avoids deep nesting
- Examples are brief, realistic, and action-oriented
- References are linked and minimal; no orphan files
- Skill intent is preserved (ask before broadening scope)
- If using `trace` optimization: evidence coverage and gaps are stated before conclusions
- If using `trace` optimization: recommendations map back to observed usage or explicit feedback
