---
name: docstyle
description: Write or review Stripe-style developer documentation.
dependencies: []
---

# Docstyle

## Overview

Use this skill when writing, editing, or reviewing developer documentation for APIs, SDKs, CLI tools, integrations, quickstarts, platform guides, or technical product docs.

Write documentation that is concise, helpful, and comprehensive: fast for first success, precise for production, and easy to scan when debugging.

## Core Model

Use a Stripe-like documentation model:

- Lead with what the developer is trying to do.
- Give one recommended path before alternatives.
- Make examples runnable and realistic.
- Keep guides task-oriented and references exhaustive.
- Explain production risks exactly where developers can make mistakes.
- Link concepts, guides, API references, SDKs, testing, and troubleshooting so readers can move between them without rereading.

## Structure

Choose the page type before writing:

- Overview: route readers to the right product, integration path, or guide.
- Quickstart: get a new user to a working result with the fewest safe steps.
- Guide: explain one workflow from prerequisites to production readiness.
- API reference: define every object, endpoint, parameter, enum, response, error, and version rule.
- SDK or CLI reference: document install, auth, commands or methods, options, examples, and failure modes.
- Testing guide: show sandbox setup, fixtures, test data, simulated failures, and live-mode differences.
- Troubleshooting guide: map symptoms to checks, causes, and fixes.

Use this default guide structure:

1. Title: name the outcome, not the implementation detail.
2. Opening: state what the reader can accomplish in one or two sentences.
3. Before you begin: list accounts, keys, permissions, versions, tools, and assumptions.
4. Choose a path: compare options only when the reader must decide.
5. Steps: use verb-led headings with code, expected output, and checks.
6. Test: show the smallest reliable proof that the integration works.
7. Production readiness: cover security, idempotency, retries, limits, observability, migrations, and cleanup.
8. Troubleshooting: include common errors near the workflow that causes them.
9. See also: link to concepts, API references, SDK docs, and adjacent guides.

Keep navigation user-intent based. Do not force readers to understand internal product taxonomy before they can pick a task.

## Writing Style

Write in a direct, practical voice:

- Use present tense and active voice.
- Address the reader as "you" when giving instructions.
- Prefer short paragraphs and scannable lists.
- Use concrete nouns: "API key", "webhook endpoint", "request body", "payment status".
- Put caveats exactly where they affect the step.
- Avoid marketing language, hype, generic benefits, and vague claims.
- Avoid long conceptual lead-ins before the first actionable step.
- Do not over-explain common developer concepts unless the product has a nonstandard contract.

Use headings that describe actions or reference surfaces:

- Good: "Create a session", "Verify webhook signatures", "Handle failed payments"
- Avoid: "How it works", "Under the hood", "Important notes" unless the section truly needs that shape

Use precise modal language:

- Use "must" for required behavior.
- Use "can" for optional capability.
- Use "recommended" for the default path.
- Use "avoid" for known footguns.
- Explain "why" only when it changes a developer decision.

## Detail Level

Vary detail by page type:

- Overview pages: be brief; help readers choose.
- Quickstarts: be procedural; include only what is needed for first success.
- Guides: be complete for one workflow; include decisions, side effects, and failure handling.
- References: be exhaustive; document every field, default, enum, nullable value, constraint, response, and error.
- Troubleshooting: be explicit; assume the reader is blocked and needs observable checks.

Go deep where mistakes are expensive:

- Authentication and secret handling
- Money movement, billing, permissions, and irreversible actions
- Webhooks, retries, duplicate events, and ordering
- Idempotency and concurrency
- Sandbox versus production differences
- Versioning, migrations, and backwards compatibility
- Limits, rate limits, quotas, and timeouts
- Error codes and recovery paths
- Data retention, privacy, and compliance-sensitive behavior

Do not bury this detail in a distant reference if developers need it to complete the task safely.

## Examples

Make examples production-shaped, even when using test data:

- Prefer complete copy-pasteable commands or snippets.
- Use realistic variable names and values.
- Mark placeholders clearly with angle-bracket names such as `<API_KEY>` or `<CUSTOMER_ID>`.
- Show expected success output after commands.
- Show full request and response examples for API references when response shape matters.
- Keep one conceptual unit per code block.
- Use language-specific code fences.
- Avoid toy examples that hide required setup, auth, error handling, or cleanup.

When multiple languages are useful, keep the same scenario across languages so readers can compare equivalents.

## API Reference Pattern

For endpoints, methods, objects, or commands, include:

1. Short purpose statement.
2. Auth or permission requirements.
3. Request shape, including path, query, headers, and body fields.
4. Parameter table with type, requiredness, default, constraints, enum values, and side effects.
5. Return shape with object lifecycle states.
6. Error cases with codes, causes, and recovery guidance.
7. Runnable example request.
8. Representative successful response.
9. Related guides and adjacent reference pages.

For nested objects, document child fields near their parent. Do not make readers jump across pages to understand the shape of a single request.

## Completeness Checks

Before finalizing a page, verify:

- The first screen tells readers what they can accomplish.
- The recommended path is obvious.
- Prerequisites are explicit and testable.
- Examples can run with documented inputs.
- Test-mode and production-mode behavior are separated.
- Security-sensitive values are never exposed in examples.
- Every warning is attached to the step where it matters.
- Edge cases are documented where they affect implementation.
- API fields include types, defaults, constraints, and errors.
- Troubleshooting starts from observable symptoms.
- Related links help the reader continue without duplicating the page.

## Review Pass

Edit in this order:

1. Remove repetition and generic explanation.
2. Move conceptual background below the first useful action unless it is required to choose correctly.
3. Replace passive or abstract wording with concrete instructions.
4. Tighten headings until the outline reads like a task map.
5. Add missing operational details for production safety.
6. Check examples for copy-paste accuracy.
7. Add links between guide, reference, SDK, testing, and troubleshooting surfaces.
