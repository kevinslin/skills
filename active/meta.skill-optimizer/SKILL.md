---
name: meta.skill-optimizer
description: Optimize existing skills and their associated files (SKILL.md, scripts, references, assets) for clarity, concision, and ease of use. Use when asked to optimize, streamline, simplify, or clean up a skill; consolidate duplicated or conflicting instructions; or add small, clarifying examples to an existing skill.
---

# Meta Skill Optimizer

## Goals

- Make instructions easy to follow and unambiguous
- Consolidate or remove duplicated information
- Add small, targeted examples only when they reduce ambiguity

## Inputs to Confirm

- Scope limits (e.g., "only edit SKILL.md" or "do not change behavior")
- Whether to validate/package after edits

## Workflow

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

## Quality Checklist

- Description clearly states when to use the skill
- No duplicated or conflicting instructions
- SKILL.md is scannable and avoids deep nesting
- Examples are brief, realistic, and action-oriented
- References are linked and minimal; no orphan files
- Skill intent is preserved (ask before broadening scope)
