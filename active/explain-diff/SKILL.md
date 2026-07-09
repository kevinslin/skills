---
name: explain-diff
description: Create a self-contained interactive HTML explanation of a code diff, branch, commit, or pull request.
dependencies: []
---

# Explain Diff

Turn a code change into a guided explanation that helps a reader build a mental
model, understand the implementation, and test their comprehension.

Default to a single local HTML artifact. Do not modify the reviewed repository.

## Resolve the change

1. Identify the repository and exact change boundary.
   - For a pull request, record the repository, PR number, base SHA, and head SHA.
   - For a branch or commit range, resolve both endpoints and their merge base.
   - With no explicit target, inspect `git status --short`, `git diff HEAD`, and
     relevant untracked files as the current working-tree change.
2. Read the complete changed-file list and diff summary before selecting details.
3. Explore enough surrounding code and documentation to explain the system that
   existed before the change. Follow call sites, data shapes, workflow edges,
   configuration, and tests that define the behavior.
4. Separate facts observed in code from inferred intent. Label uncertainty.

## Build the explanation

Create these sections in order:

1. **Overview**: Name the change boundary, summarize the result in two or three
   sentences, and provide a table of contents.
2. **Background**:
   - Start with a skippable beginner-oriented model of the relevant system.
   - Narrow to the exact components, contracts, and failure modes the change
     touches.
3. **Intuition**: Explain the central idea before implementation details. Use a
   small concrete example with toy values and one or two reusable visual models.
4. **Code walkthrough**: Group changes by behavior or execution order rather
   than filename order. For each group, explain what changed, why it matters,
   and how tests or evidence support it. Link relationships between files.
5. **Operational impact**: Call out compatibility, rollout, failure, security,
   and observability implications when relevant. Omit this section when the
   change has none.
6. **Quiz**: Include exactly five medium-difficulty multiple-choice questions.
   Each question must have one correct answer, plausible distractors, and
   feedback explaining every choice. Reveal feedback only after interaction.

Write with lucid, precise prose. Prefer concrete examples and smooth transitions
over exhaustiveness. Explain terminology when first introduced.

## Render the artifact

Write one self-contained HTML file with inline CSS and JavaScript.

- Default path: `/tmp/YYYY-MM-DD-explanation-<short-slug>.html`.
- Use the user-provided output directory when specified.
- Keep the artifact outside the reviewed repository unless the user explicitly
  requests a repo-owned file.
- Build one responsive scrolling page with clear section headers and anchored
  table-of-contents links. Do not use tabs for top-level navigation.
- Use a small, consistent family of HTML/CSS diagrams. Good choices include a
  component/data-flow diagram, a simplified UI, or a before/after state model.
  Include example data in diagrams. Do not use ASCII diagrams.
- Render code in `<pre><code>` blocks and escape HTML metacharacters.
- Make quiz controls keyboard-accessible and provide visible correct/incorrect
  feedback plus the explanation after a choice.
- Avoid external scripts, stylesheets, fonts, images, and network requests.

## Validate before handoff

1. Confirm the file starts with the current date and exists outside the reviewed
   repository unless explicitly requested otherwise.
2. Confirm every code block preserves whitespace through `white-space: pre` or
   `white-space: pre-wrap`.
3. Confirm the HTML has no external asset or network dependency.
4. Confirm all five quiz questions respond to clicks and keyboard activation,
   reveal feedback, and identify the correct answer.
5. Confirm every material claim maps to inspected code, tests, documentation, or
   clearly labeled inference.
6. Open or render the artifact when browser tooling is available and fix visual
   overflow, unreadable diagrams, broken anchors, and script errors.

Return a clickable absolute path to the HTML artifact and a one-sentence summary
of the reviewed change.

Adapted from Geoffrey Litt's
[explain-diff gist](https://gist.github.com/geoffreylitt/a29df1b5f9865506e8952488eac3d524).
