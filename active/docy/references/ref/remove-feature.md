## Feature Removal Hygiene

When removing a feature, remove the codepath and every active reference that
still presents that feature as current behavior.

Required cleanup:
- Delete or update README sections, flow docs, FAQs, examples, runbooks, and
  other durable docs that describe the removed feature.
- Delete or update tests, fixtures, mocks, evals, snapshots, and demo flows
  that assert the old feature still exists.
- Remove dead config, flags, routes, prompts, metrics labels, and integration
  wiring that only existed for the removed feature.
- Search broadly by feature name, user-visible labels, config keys, API fields,
  test names, and doc headings before treating the removal as complete.

Spec handling:
- Do not edit specs that mention the old feature or the earlier planned change.
  Treat those specs as historical planning artifacts.
- Add a changelog line that states the feature was removed and end that line
  with `(NOT_IN_SPEC)` to make the spec drift explicit.

Completion bar:
- The repository should not contain active docs or tests that still imply the
  feature is supported.
- Remaining mentions of the feature should be clearly historical, archived, or
  spec-only references rather than contradictory current guidance.
