Collection of LLM agent [skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview) that I use in my day to day.

## Conventions

Skills may use these path conventions:

- `CONFIG_DIR`: Path to skill configuration files. Each skill can define a default. Example: `fast-mode` defaults to `~/.llm/fast-mode/config.json` and reads `allow_list.json` from the same directory.
- `ROOT_DIR`: Base path for skill outputs when a skill writes files (for example research or design docs). Each skill can define a default when this value is not set.

Users can customize either value by declaring it in `AGENTS.md`.

Example:

```md
## Skill Conventions
- Set `CONFIG_DIR` to `~/.llm/fast-mode/config.json`
- Set `ROOT_DIR` to `./docs`
```

## Skills

- [ag-ledger](active/ag-ledger/SKILL.md): Record and query append-only agent activity ledger entries under META_LEDGER_ROOT (default `~/.llm/ag-ledger`). Use when agents should log session start/end, notable changes, or filter activity by session, workspace, or time.
- [create-task](active/create-task/SKILL.md): Create tasks across target platforms. Use when users ask to create issues/tickets/tasks. Currently supports GitHub Issues and always appends a required Context session footer to the task body.
- [dev.add-license](active/dev.add-license/SKILL.md): This skill should be used when the user wants to add a LICENSE file to their repository. Currently supports Apache License 2.0 with automatic copyright information detection from git configuration. Also updates package.json license field if the file exists.
- [dev.code](active/dev.code/SKILL.md): This skill should be used when performing any coding task including implementing features, fixing bugs, refactoring code, or making any modifications to source code. Provides best practices, security considerations, testing guidelines, and a structured workflow for development tasks.
- [dev.code-extension](active/dev.code-extension/SKILL.md): Install VS Code/Cursor extensions from a local .vsix via CLI (code, code-insiders, cursor, cursor-nightly). Use whenever asked to install an extension programmatically.
- [dev.codex](active/dev.codex/SKILL.md): Codex self-management workflows. Use when Codex needs to modify its own configuration, skills, prompts, or runtime settings, including managing MCP servers (add/remove/disable, config.toml).
- [dev.conventional-commits](active/dev.conventional-commits/SKILL.md): Explain and apply the Conventional Commits specification for commit messages, including required format, types/scopes, breaking change notation, and examples. Use when asked to draft, validate, or review commit messages or when a repo wants Conventional Commits adoption.
- [dev.document](active/dev.document/SKILL.md): document changes made
- [dev.flow-docs](active/dev.flow-docs/SKILL.md): Define and guide creation/revision of flow documentation (mini architecture docs describing the lifecycle of a behavior in the codebase). Use when asked what a flow doc is, or when creating, updating, or reviewing flow docs for a system behavior or request lifecycle.
- [dev.gh](active/dev.gh/SKILL.md): GitHub CLI operations
- [dev.lint](active/dev.lint/SKILL.md): lint project
- [dev.mermaid](active/dev.mermaid/SKILL.md): Generate Mermaid diagrams with proper syntax. Use when creating flowcharts, sequence diagrams, class diagrams, or any other Mermaid visualizations. Ensures correct label quoting to prevent parsing errors.
- [dev.recipe](active/dev.recipe/SKILL.md): Legacy compatibility wrapper for recipe requests. Recipes are now a document type in dev.research.
- [dev.shortcuts](active/dev.shortcuts/SKILL.md): Mandatory shortcut trigger and usage guidance. ALWAYS check if shortcut applies before responding to ANY coding or development request.
- [find-links](active/find-links/SKILL.md): This skill should be used when the user wants to fill in TODO links, placeholder links, or missing links in markdown files. Invoke when the user mentions "fill links", "TODO links", "find links", or asks to add appropriate links to concepts in a document.
- [gen-notifier](active/gen-notifier/SKILL.md): Generic desktop notification skill for agents. Send desktop notifications when tasks are complete (or when user input/errors block progress). By default, assume that all jobs will require a notification unless the user says otherwise.
- [hn-title](active/hn-title/SKILL.md): This skill should be used when the user wants to create, analyze, or improve blog titles for Hacker News submissions. Invoke when the user mentions "HN title", "Hacker News title", wants to optimize their post title, or wants to increase their chances of reaching the HN front page.
- [learn](active/learn/SKILL.md): learn from the current session
- [learning-capture](active/learning-capture/SKILL.md): Extract and consolidate key learnings, insights, and actionable takeaways from the current conversation session. Use when the user wants to capture, summarize, or document what was learned during the chat, create study materials from discussions, or save important discoveries and decisions for future reference. Triggers include requests like "capture learnings," "summarize what we discussed," "create notes from this conversation," "what did I learn today," or "document our key findings."
- [sc](active/sc/SKILL.md): Guide for creating or updating skills. This skill should be used when users want to create a new skill (or update an existing skill) that extends Claude's capabilities with specialized knowledge, workflows, or tool integrations. Also use when directly invoked via `$sc`.
- [imagekit-upload](active/tool-imagekit-upload/SKILL.md): Upload images to ImageKit from file paths or clipboard, returning the CDN URL for easy sharing and embedding
- [tech-doc-writer](active/write-tech-docs/SKILL.md): This skill should be used when writing or reviewing technical documentation such as READMEs, API documentation, quickstart guides, or any user-facing documentation. Apply editorial principles focused on leading with value, cutting redundancy, and creating scannable, actionable content. Use when the user requests help writing docs, improving existing documentation, or creating user guides.
- [dendron](draft/dendron/SKILL.md): do not use this skill
- [dev.speculate](draft/dev.speculate/SKILL.md): Always use this skill to provide context on the codebase. Automatically initializes and references the Speculate documentation framework (coding rules, shortcuts, templates, and project specs) to ensure agents understand project structure, development workflows, and coding standards. Use for every task to maintain context and code quality.
