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
