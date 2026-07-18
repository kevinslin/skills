# ag-dir schema

Regenerate this view from this schema directory:

```bash
python3 ../../../scripts/mem.py schema show ag-dir
python3 ../../../scripts/mem.py schema describe ag-dir
python3 ../../../scripts/mem.py schema validate ag-dir
```

The schema contains project-level `design.md`, `memory.md`, and `progress.md`; active and archived numbered specs under `docs/`; and per-spec `handoff.md`, `progress.md`, and `learnings.md` files under `.agents/runs/spec-{num}/`.
