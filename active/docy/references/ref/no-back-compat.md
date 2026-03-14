## Hard-Cut Product Policy

- This application currently has no external installed user base; optimize for one canonical current-state implementation, not compatibility with historical local states.
- Do not preserve or introduce compatibility bridges, migration shims, fallback paths, compact adapters, or dual behavior for old local states unless the user explicitly asks for that support.

- Prefer:
    - one canonical current-state codepath
    - fail-fast diagnostics
    - explicit recovery steps
  over:
    - automatic migration
    - compatibility glue
    - silent fallbacks
    - "temporary" second paths

- If temporary migration or compatibility code is introduced for debugging or a narrowly scoped transition, it must be called out in the same diff with:
    - why it exists
    - why the canonical path is insufficient
    - exact deletion criteria
    - the ADR/task that tracks its removal
- Default stance across the app: delete old-state compatibility code rather than carrying it forward.
