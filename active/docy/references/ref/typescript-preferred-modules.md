## TypeScript Preferred Modules

- When implementing functionality in a TypeScript project, first check whether
  the task is better handled by a well-supported vendor dependency instead of
  custom application code.
- Strongly prefer using the project's existing dependency stack when it already
  solves the problem. If the project does not already include a suitable package,
  prefer adding the standard package below over re-implementing the behavior,
  unless the user or repo constraints say otherwise.

- Prefer `zod` for:
  - runtime type validation
  - input parsing and schema validation
  - validating external data before business logic
- Prefer `commander` for:
  - command-line interfaces
  - argument and option parsing
  - subcommand-based CLI flows

- Avoid hand-rolled replacements for validation, coercion, or CLI parsing when
  these packages fit the requirement.
- If you do not use the preferred module, state the reason explicitly in the
  change or handoff note.
