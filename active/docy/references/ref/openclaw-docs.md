# OpenClaw Developer Documentation Overlay

Load `ref/developer-docs` before this reference. It owns the general writing,
page-pattern, example, safety, review, and verification guidance:

```bash
docy inject ref/developer-docs
docy inject ref/openclaw-docs
```

This reference adds only OpenClaw-specific conventions. Established adjacent-page
precedent can override these defaults when a local section needs a narrower
pattern.

## Contents

- [OpenClaw page taxonomy](#openclaw-page-taxonomy)
- [Standard heading vocabulary](#standard-heading-vocabulary)
- [Topic page pattern](#topic-page-pattern)
- [Guide conventions](#guide-conventions)
- [Docs index and navigation](#docs-index-and-navigation)
- [OpenClaw editing constraints](#openclaw-editing-constraints)
- [OpenClaw verification](#openclaw-verification)
- [Overlay checklist](#overlay-checklist)

## OpenClaw page taxonomy

Use the general page types from `ref/developer-docs`. OpenClaw also uses a
**topic page** for an end-to-end overview of a major domain entity or product
surface. A topic page combines setup, key subtopics, troubleshooting, and links
to deeper references without becoming an exhaustive reference itself.

Move field tables, API contracts, narrow internals, legacy details, and rare
debugging workflows to linked reference or troubleshooting pages when they
interrupt the topic overview.

## Standard heading vocabulary

Prefer these headings across OpenClaw docs unless a narrower page pattern or
adjacent-page precedent calls for something more specific:

- **Overview:** Context and ownership boundaries. Omit the explicit heading when
  the opening paragraph already provides the overview.
- **Requirements:** Accounts, versions, permissions, plugins, operating systems,
  credentials, and other setup requirements.
- **Quickstart:** The recommended first-success path on a topic page.
- **Configuration:** Common configuration choices and where to set them.
- **Troubleshooting:** Recovery from observable failures.
- **Related:** Guides, references, commands, concepts, and adjacent topics.

Use sentence case except where an OpenClaw product name, command, or identifier
requires different capitalization.

## Topic page pattern

1. **Title:** Name the major entity or surface.
2. **Overview:** Explain what it is, what it owns, and what it does not own. Use
   this opening as the page description; do not add a separate description
   section.
3. **Requirements:** Include only when setup has concrete prerequisites.
4. **Quickstart:** Show the recommended setup and smallest reliable verification.
5. **Configuration:** Include the minimum task-critical configuration and common
   choices. State whether each setting belongs in the CLI, config file,
   environment, plugin manifest, dashboard, or API.
6. **Named subtopics:** Organize major concepts, workflows, and decisions by
   reader intent. Use the domain name rather than a generic `Subtopics` heading.
7. **Troubleshooting:** Diagnose common observable failures.
8. **Related:** Link the next useful OpenClaw surfaces.

## Guide conventions

OpenClaw guides use the general guide pattern with these naming conventions:

- Use an opening overview, with or without an explicit `Overview` heading.
- Use `Steps` for the workflow procedure; do not use `Quickstart` as a guide
  section heading.
- Use `Tests` for the smallest reliable proof that the integration works.
- Include `Production readiness` only when deployment, security, idempotency,
  retries, limits, observability, migrations, or cleanup affect safe operation.
- End with `Troubleshooting` and `Related` when those sections are useful.

## Docs index and navigation

- Include the metadata or frontmatter required by the OpenClaw docs index.
- Add `Read when` hints for docs-list routing when a page participates in the
  index.
- State whether the intended reader is a user, operator, plugin author,
  contributor, or maintainer when that choice affects scope.

## OpenClaw editing constraints

- Define OpenClaw-specific jargon and abbreviations before first use.
- Use exact product and surface terms such as `agent profile`, `Gateway webhook`,
  `plugin manifest`, and `session state` when those are the verified names.
- Keep product-limit, detect-only, and diagnostic caveats out of happy-path
  instructions unless they affect setup success.

## OpenClaw verification

In addition to the general verification, run the OpenClaw docs-index and
generated-doc checks that cover the changed page. Confirm affected OpenClaw
surfaces such as Gateway behavior, agent profiles, config keys, plugin fields,
and session state against current product behavior or source.

## Overlay checklist

- `ref/developer-docs` was loaded first.
- The page uses the correct OpenClaw page type and heading vocabulary.
- Topic pages remain overviews rather than exhaustive references.
- Guides use `Steps`, not `Quickstart`, for their procedure.
- Required index metadata and `Read when` hints are present.
- OpenClaw names, config locations, and product constraints are exact.
- Relevant OpenClaw docs and product checks passed or are explicitly unverified.
