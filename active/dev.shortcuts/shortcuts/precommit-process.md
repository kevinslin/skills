---
name: precommit-process
description: Follow before committing code
----

Instructions:

This process must be followed before committing code!

Create a to-do list with the following items then perform all of them:

1. **Confirm spec is in sync:** If work is done using a spec, review and make any updates to the spec to be sure it is current with respect to the current code.

Add any status updates to the spec to include accomplished tasks and remaining tasks, if any.

2. **Code style enforcement:**

Before code is committed all changes must be reviewed and ensure they comply with coding rules of codebase. 

3. **Code review:**

   Read all changes and ensure they follow best practices for modern TypeScript.
   Code should be clean, with brief and maintainable comments.

   You must review all outstanding changes that are not committed in the current repo.

4. **Unit testing and integration testing:**

BE SURE YOU RUN ALL TESTS (npm run precommit) as this includes codegen, formatting, linting, unit tests and integration tests.

Read @docs/development.md for additional background on test workflows.

After any significant changes, ALWAYS run the precommit check:

```
npm run precommit  # Runs: codegen, format, lint, test:unit, test:integration
```

This will generate code, auto-format, lint, and run unit and integration tests.

Then YOU MUST FIX all issues found.

5. **Review spec once more:**

   Make any updates to the spec based on the fixes or issues discovered during review
   and testing.

6. **Summarize and prepare a commit message:** Do NOT commit, but summarize everything
   that was done. Write a clear commit message based on this summary that you would use
   for a commit and ask the user if they want to commit this code.
