# Core Documentation Hygiene

When a design or implementation change invalidates a nearby flow doc, spec, or
other durable reference, update that adjacent document in the same pass or mark
it stale/superseded immediately.

Do not leave contradictory docs side by side. A stale adjacent doc is active
misinformation for the next agent or reader.

Preferred responses when a related doc is no longer accurate:
- Update it in the same change.
- If a full update is not practical yet, add a short stale-warning or
  superseded note that points to the newer source of truth.
- If the old doc is purely historical, move or rename it so current guidance and
  legacy guidance are clearly separated.

## One-Off Functions

Minimize one-off helper functions. Before adding one, check whether the logic can
stay local, be expressed clearly inline, or reuse an existing shared helper.

If a helper is used by multiple modules, extract it into a general utility
library that other files can import instead of duplicating similar
implementations.

Add common helpers to a utility folder and split helpers into focused modules
grouped by common functionality.

Do not let a generic utility area become a dumping ground for unrelated code.
Only move helpers there when they are genuinely shared or clearly belong to a
reusable utility grouping.
