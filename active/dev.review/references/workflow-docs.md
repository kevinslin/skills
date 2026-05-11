# Documentation Review Workflow

Use this workflow to review developer documentation, user guides, API references, CLI references, quickstarts, troubleshooting pages, READMEs, and documentation information architecture changes.

## Core Rubric

Review against four main criteria:

- Accurate: grounded in current implementation, generated reference, source code, command behavior, API contract, or shipped product behavior.
- Helpful: helps the intended reader understand or accomplish the topic. For task docs, this includes concrete steps, realistic examples, expected results, scenario guidance, and recovery paths.
- Concise: includes as much detail as necessary, but no more. Remove repetition, generic background, unrelated edge cases, and reference material that interrupts the task.
- Complete within scope: covers the major sections implied by the stated topic and makes boundaries clear. Do not reward sprawling docs; reward scoped completeness.

Use two secondary criteria:

- Maintainable: has a clear source of truth, little duplication, and a realistic update path when behavior changes.
- Findable: easy to skim, well titled, addressable by stable headings, and written with terms users search for.

Prioritize user-impacting findings over copyediting. Do not line-edit wording unless the wording makes the document inaccurate, confusing, inaccessible, unfindable, or unnecessarily long.

## Steps

1. Identify the reader, doc type, and scope.
   - Name whether the artifact is an overview, topic page, quickstart, guide, API reference, CLI reference, troubleshooting page, README, or mixed document.
   - Check that the content shape matches that doc type.
   - Flag unclear audience, hidden scope, or pages that mix concept, guide, reference, and troubleshooting content in a way that hurts comprehension.
   - For review workflows, standards, or contribution docs, check whether future contributors can apply the instructions reliably without extra context.
2. Check accuracy first.
   - Verify claims against implementation, generated docs, command output, schemas, public contracts, tests, or current product behavior when available.
   - Treat stale commands, incorrect defaults, wrong paths, outdated UI labels, bad links, missing prerequisites, and unsafe examples as findings.
   - If accuracy cannot be verified from the available material, state the missing evidence and grade the claim as unverified rather than assuming it is correct.
3. Check helpfulness.
   - Confirm the opening explains what the reader can accomplish and who the page is for.
   - For task docs, require concrete steps, runnable commands or code, expected output, verification, and what to do when common scenarios fail.
   - For topic pages, require a clear entity or surface overview, ownership boundaries, key subtopics, troubleshooting, and links to deeper references.
   - For conceptual docs, require a clear mental model, boundaries, and links to task or reference pages.
   - For reference docs, require complete field, option, parameter, enum, default, error, and behavior coverage for the stated surface.
4. Check concision.
   - Flag repetition, marketing language, vague setup prose, duplicated examples, and implementation detail that belongs in a reference or architecture doc.
   - Prefer one recommended path before alternatives.
   - Suggest moving rare cases, exhaustive tables, or narrow debugging branches to linked reference or troubleshooting pages when they interrupt the main flow.
5. Check completeness within scope.
   - Look for missing requirements, assumptions, setup, happy path, validation, failure modes, limits, versioning, security, permissions, compatibility, and production readiness when relevant.
   - Require explicit scope boundaries when the page intentionally omits adjacent topics.
6. Check maintainability.
   - Identify duplicated source-of-truth content across pages, generated docs, schemas, command help, or API references.
   - Prefer canonical links over copied contracts.
   - For behavior/API/CLI changes, expect docs to change in the same PR and to be reviewed with code.
7. Check findability and accessibility.
   - Review title, headings, frontmatter, "Read when" hints, link text, stable anchors, and likely search terms.
   - Flag vague headings such as "Overview", "How it works", or "Important notes" when action- or surface-specific headings would help.
   - Flag visual-only instructions, unclear screenshot references, undefined jargon, and non-descriptive links.
8. Apply WTD and OpenClaw-docs best practices when relevant.
   - Use Write the Docs principles: docs should be skimmable, exemplary, consistent, current, discoverable, addressable, cumulative, and complete within scope.
   - For OpenClaw docs, apply the local `openclaw-docs` guidance when available: topic pages, guide structure, docs lifecycle, examples, discoverability, verification, and completeness checks.

## Severity Guidance

- `blocker`: inaccurate or unsafe instructions that can break user environments, expose secrets, corrupt data, misconfigure security, or send users down a dead path; missing docs for a behavior/API change that users need to use safely.
- `major`: missing prerequisites, validation, failure handling, scope boundaries, important variants, source-of-truth links, or production concerns; unverified claims presented as facts; docs structure that prevents the target reader from completing the task.
- `minor`: clarity, concision, maintainability, findability, or organization issues that slow readers but do not make the doc wrong or unusable.
- `nit`: local wording, formatting, or style issues with no meaningful comprehension risk.

Accuracy is a hard gate. A doc that is concise, complete-looking, and polished still fails if it is wrong.

## Output

- Lead with findings ordered by severity.
- For each finding, name the failed rubric criterion, cite the exact section or line when possible, explain the user impact, and give the smallest concrete fix.
- Include a short "Rubric Summary" only after findings, covering accuracy, helpfulness, concision, completeness within scope, maintainability, and findability.
- Include a short "Verification" note naming what behavior or source evidence was checked and what remains unverified.
- If there are no findings, say so clearly and still note any residual verification gaps.
