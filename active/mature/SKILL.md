---
name: mature
description: Add or update CLI maturity ratings in repo docs.
dependencies: []
---

# mature

Add a tool maturity index to `README.md`, label each CLI entry with a maturity emoji, and make the repo rules in `AGENTS.md` require maturity labels for future tools.

## Workflow

1. Read `README.md` and `AGENTS.md`.
2. Add or update a `## Tool maturity` section in `README.md` before the CLI index using exactly:
   - `🌱 seed`: just testing, might not work
   - `🪴 sprout`: has seen some use, might still have hardcoded assumptions and not generalized
   - `🌳 oak`: battle tested. good for general usage
3. Update each CLI bullet in `README.md` to include exactly one maturity emoji before the linked tool name.
4. Preserve the existing README bullet format apart from the added maturity marker.
5. Update `AGENTS.md` so future CLI additions must:
   - keep the `## Tool maturity` section present and current
   - include a maturity emoji/classification in each CLI index bullet
   - use exactly the same `🌱 / 🪴 / 🌳` definitions as the README legend
6. If the user provides tool classifications, apply them directly.
7. If the user asks to add a new tool and does not provide a maturity level, ask for one or clearly note the assumption you made.

## Output contract

- `README.md` must contain a `## Tool maturity` section before `## CLI index`.
- Every CLI bullet in `README.md` must start with exactly one of:
  - `🌱`
  - `🪴`
  - `🌳`
- `AGENTS.md` must instruct future agents to maintain the maturity legend and include one maturity marker per CLI entry.
- Do not invent additional maturity levels unless the user explicitly asks.
