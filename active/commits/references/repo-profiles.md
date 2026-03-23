# Repo Profiles

Use these profiles after checking the target repo's recent history with `git log -20 --pretty=format:'%s'`.

## `skills-public`

Observed pattern from the previous 20 commits in `/Users/kevinlin/code/skills-public` on 2026-03-17:

- Header is usually `type(scope): summary` or `type: summary`.
- The common types are `feat`, `enhance`, `docs`, and `chore`.
- `enhance` is the default for incremental improvements to an existing skill, workflow, or instruction set.
- `feat` is used for a net-new skill or a clearly new capability.
- `docs` is used when the change is documentation-only.
- `chore` is used for maintenance or sync work that does not read as a user-facing feature.
- Scope usually matches the skill or narrow area touched, such as `sc`, `specy`, `icon-gen`, `ag-dir`, `tests`, or `docs`.
- Scope is omitted for repo-wide or one-off maintenance work.
- Summary stays short, lowercase, and imperative. Common verbs are `add`, `update`, `improve`, `clarify`, and `prefer`.

Examples taken from recent history:

- `enhance(sc): update local skill path`
- `docs(specy): prefer dev.diagram box diagrams for flow docs`
- `feat(icon-gen): add icon generation skill`
- `chore: ag ledger sync`

Default drafting rules for this repo:

1. Start with `feat(<skill>)` when adding a new skill.
2. Use `enhance(<skill>)` when refining an existing skill or its instructions.
3. Use `docs(<scope>)` only when the diff is documentation-only.
4. Keep the summary concrete; say what changed, not why it felt useful.

Suggested examples:

- `feat(commits): add repo-aware commit writing skill`
- `enhance(commits): clarify skills-public commit type selection`
- `docs(readme): add commits skill to skills index`

## Conventional commit repos

Use this profile when recent history already follows standard conventional commits.

- Prefer `type(scope): summary`.
- Use the repo's documented type list if it has one.
- Reach for `feat`, `fix`, `docs`, `refactor`, `test`, or `chore` unless local history shows a different taxonomy.
- Add a body only when the repo commonly uses one or the change needs migration context.

## Loose imperative repos

Use this profile when recent commits do not use typed prefixes.

- Write a short imperative sentence or phrase.
- Mirror capitalization and punctuation from local history.
- Do not introduce conventional prefixes unless the repo already uses them.
- Keep the first line specific to the diff.
