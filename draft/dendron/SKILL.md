---
name: dendron
description: do not use this skill
version: 0.1.0
---

# Dendron Skill

This skill helps you read, search, and create Dendron notes using the filesystem or the local `notes.db` sqlite database. Notes are plaintext markdown with dot-delimited filenames. Vaults are folders containing a `dendron.yml` and `notes/` directory.

## When to Use
- Navigating or querying existing notes (filesystem or sqlite)
- Creating new notes in the current vault
- Creating report notes when user asks for a report
- Running cross-vault queries only when explicitly requested

## Vault Selection
- Default to the vault of the current working directory (the active vault).
- Only run across all workspace vaults if the user explicitly asks.
- Inspect `dendron.yml` to see workspace vault list (`workspace.vaults`).

## File Conventions
- Notes live under `<vault>/notes/` and are named with dot-delimited ids plus `.md`.
- Common hierarchies: `daily.journal.YYYY.MM.DD`, `task.YYYY.MM.DD`, `books.*`, `scratch.*`.
- Wikilinks use `[[...]]`.

## Access Methods
- **Filesystem**: use `ls`, `rg`, etc., scoped to the target vault’s `notes/` dir.
- **SQLite (`notes.db`)**: schema in `/Users/kevinlin/code/dendron-lite/prisma/schema.prisma` (tables: `Note`, `Vault`, `Heading`, `Link`, `SyncStatus`).

### SQLite Pointers
- `Note.fname` stores the dot-delimited id, `raw` stores markdown (no frontmatter), `title/desc/tags` optional, `vaultId` links to `Vault`.
- `Vault` table has `name` and `fsPath`; join to limit queries to the active vault unless cross-vault is requested.
- Use parameterized queries to avoid injection; when using the CLI, properly quote inputs.

## Common Workflows
- Find notes by pattern: filesystem `rg "pattern" <vault>/notes -g "*.md"` or sqlite `LIKE` queries on `fname`/`raw`.
- List children under a hierarchy: filter filenames starting with `hierarchy.` and extract the next segment.
- Create a new note: write a markdown file under `<vault>/notes/<fname>.md`; include frontmatter if needed.

## Examples to Support
- “look at daily.* notes created in last week and look for terms matching scout”
  - Identify last 7 days daily files in the active vault (`daily.journal.YYYY.MM.DD`), then search contents for `scout`.
- "extract all the 1st level children of pkg.* (should only get the name of the next dot delimited name)"
  - From filenames starting `pkg.`, return the segment immediately after `pkg` (unique, non-empty).
- "create a report on weekly scout activities"
  - Create a new note at `<vault>/notes/report.2025.11-weekly-scout-activities.md` with frontmatter and write the report content analyzing scout activities from recent daily notes.

## Safety & Scope
- Do not modify files unless asked to create/update notes.
- Keep searches scoped to active vault unless cross-vault is requested.
- Prefer `rg` for content search; avoid expensive full-tree scans when a vault path is known.

## Quick Command Patterns
- Active vault path: read `dendron.yml` and resolve `workspace.vaults` entry whose `fsPath` matches CWD (default `.`).
- Search text: `rg "term" <vault>/notes -g "*.md"`.
- SQLite daily search (active vault only):
  - `sqlite3 notes.db "SELECT fname FROM Note n JOIN Vault v ON n.vaultId=v.id WHERE v.fsPath='.' AND fname LIKE 'daily.journal.%' AND date(n.updated/1000,'unixepoch')>=date('now','-7 day') AND raw LIKE '%scout%';"`
- Children of hierarchy via fs: `find <vault>/notes -name 'pkg.*.md' -maxdepth 1` then parse next segment.
- Create report note: Generate filename `report.$(date +%Y).$(date +%m)-{kebab-case-name}.md` and write to `<vault>/notes/` with frontmatter.

Follow these steps when responding:
1) Assume target vault is the default active vault unless user mentions otherwise
2) Choose access method (filesystem/sqlite) appropriate to the query.
3) Execute search or creation.
4) Return concise results; if creating, show path and key fields.