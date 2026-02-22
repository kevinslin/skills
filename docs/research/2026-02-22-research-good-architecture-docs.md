# Research Brief: What Makes a Good Architecture Document

**Last Updated**: 2026-02-22

**Status**: Complete

**Related**:

- https://github.com/noahbald/awesome-architecture-md

* * *

## Executive Summary

This brief analyzes what makes architecture documentation effective, using the curated examples in `awesome-architecture-md` as the primary corpus. The goal is to extract practical patterns that improve onboarding speed, design clarity, and long-term document usefulness.

The strongest examples consistently do three things well: they orient readers quickly with boundaries and code map context, they make key architectural decisions and constraints explicit, and they provide enough depth to support real implementation work without becoming unmaintainable. Weak examples usually fail on one of these dimensions.

Recommendation: use a layered architecture documentation model. Keep a concise top-level architecture doc for orientation and invariants, then link to focused deep dives for flows, subsystems, and design decisions. This structure balances discoverability and maintainability better than either a single monolith or a fragmented wiki.

**Research Questions**:

1. What recurring elements appear in high-quality architecture documents across mature projects?
2. Which documentation structures best balance onboarding speed, technical depth, and maintenance cost?
3. What minimum standard can teams adopt to make architecture docs consistently useful over time?

* * *

## Research Methodology

### Approach

Review of the `awesome-architecture-md` corpus, then close reading of representative examples across systems and tooling projects (Linux, Flutter, VS Code, Tauri, esbuild, rust-analyzer). Supplemental guidance from architecture-doc writing resources (Matklad and John Jago).

### Sources

- Curated list: `awesome-architecture-md`
- Architecture docs from open-source repositories
- Architecture-writing guidance articles

### Context Triage Gate

Critical values and ordering checks used before drafting findings:

| Value | Source of Truth | Representation | Initialization Point | Snapshot Point | First Consumer | Initialized Before Consumption? |
| --- | --- | --- | --- | --- | --- | --- |
| Reader audience | Doc introduction/scope section | Roles (new contributor, maintainer) | Opening context section | First overview pass | Onboarding reader | Yes |
| System boundaries | Architecture overview | Components and interfaces | Early architecture section | Before subsystem details | Reader mental model | Yes |
| Core invariants | Principles/constraints sections | Rules, guarantees, non-goals | Before implementation details | During deep-dive reading | Implementers | Yes |
| Decision rationale | Tradeoff/ADR content | Decision + alternatives | With architecture narrative | At decision references | Reviewers and maintainers | Yes |
| Code navigation anchors | File paths/modules | Concrete symbols/paths | Early or per-subsystem | At each section entry | Contributors editing code | Yes |
| Operational concerns | Failure/reliability/rollout notes | Risks and mitigations | After core design | During implementation planning | Operators and feature owners | Usually; often missing in lightweight docs |

* * *

## Research Findings

### Orientation and Navigation

#### Fast system orientation from top-level mental model

**Status**: Complete

**Details**:

- Strong docs establish boundaries and major components immediately (for example Linux crypto architecture and Flutter engine architecture docs).
- The best docs connect conceptual layers to concrete code locations.
- Reader time-to-context drops when entry points and execution direction are explicit.

**Assessment**: A clear opening model is the highest-leverage section; without it, even detailed docs are hard to use.

* * *

#### Concrete code map and ownership cues

**Status**: Complete

**Details**:

- VS Code’s source organization guidance maps subsystem ownership and locations clearly.
- Tauri’s architecture overview names core crates and role boundaries.
- esbuild and rust-analyzer docs tie concepts to implementation units and constraints.

**Assessment**: Architecture docs are materially stronger when they are executable as navigation guides, not only conceptual narratives.

* * *

### Decisions, Constraints, and Invariants

#### Explicit design principles and tradeoffs

**Status**: Complete

**Details**:

- esbuild architecture highlights speed-first design choices and resulting tradeoffs.
- Rust-analyzer architecture docs frame constraints and intended separation of concerns.
- Mature docs explain not only “what exists” but “why it exists this way.”

**Assessment**: Explicit rationale is a strong predictor of long-term doc usefulness and review quality.

* * *

#### System invariants and boundary contracts

**Status**: Complete

**Details**:

- Flutter architecture material documents thread/isolate concepts and message flow boundaries.
- Good docs call out assumptions that must remain true under refactors.
- Boundary contracts reduce accidental coupling when multiple teams contribute.

**Assessment**: Invariants are commonly under-documented but are central to architecture correctness.

* * *

### Maintainability and Learning Design

#### Layering depth without overwhelming readers

**Status**: Complete

**Details**:

- Matklad recommends concise architecture docs focused on high-value understanding, not exhaustive duplication.
- John Jago’s guidance emphasizes practical structure, audience framing, and explicit decision context.
- The strongest pattern is “overview first, deep links second.”

**Assessment**: Layered depth is the most robust strategy for balancing readability and completeness.

* * *

#### Keeping docs useful over time

**Status**: Complete

**Details**:

- Documentation drift appears when docs are detached from code ownership or review workflows.
- Projects with clear module maps and bounded scope are easier to keep current.
- Architecture docs age better when they avoid implementation noise and preserve durable decisions/invariants.

**Assessment**: Maintenance cost is primarily a scope and ownership problem, not a tooling problem.

* * *

## Comparative Analysis

| Criteria | Single Concise ARCHITECTURE.md | Layered Overview + Deep Dives | Wiki-Style Distributed Docs |
| --- | --- | --- | --- |
| Discoverability | High | High | Medium |
| Depth potential | Low-Medium | High | High |
| Onboarding speed | High | High | Medium |
| Drift risk | Medium | Medium | High |
| Maintenance overhead | Low | Medium | Medium-High |
| Fit for large systems | Low | High | Medium |

**Strengths/Weaknesses Summary**:

- **Single Concise ARCHITECTURE.md**: Fast to read and maintain, but often too shallow for complex systems.
- **Layered Overview + Deep Dives**: Best balance of usability and completeness when links are curated and ownership is clear.
- **Wiki-Style Distributed Docs**: Can scale breadth, but discoverability and consistency degrade without strict governance.

* * *

## Best Practices

1. **Lead with system boundaries**: Define scope, interfaces, and non-goals in the first screenful.
2. **Map concepts to code**: Include concrete module/file anchors so readers can immediately navigate.
3. **Document invariants explicitly**: State what must remain true across refactors.
4. **Explain major decisions**: Capture rationale and rejected alternatives for consequential choices.
5. **Use layered depth**: Keep the top-level doc concise; link to focused subsystem deep dives.
6. **Optimize for onboarding**: Design for a new contributor’s first 15 minutes.
7. **Separate durable architecture from volatile implementation details**: Preserve signal and reduce churn.
8. **Include failure and reliability considerations**: Surface risks, failure modes, and operational constraints.
9. **Assign ownership**: Tie architecture sections to teams or maintainers to reduce staleness.
10. **Review architecture docs with code changes**: Treat docs as part of the definition of done.

* * *

## Open Research Questions

1. **How should AI-assisted code navigation reshape architecture-doc formats?**: Tooling may change the ideal balance between narrative and code-index style docs.
2. **What is the smallest effective invariant set for early-stage teams?**: Over-documentation can slow teams; under-documentation causes drift.
3. **Which freshness signals best predict doc trustworthiness?**: Potential signals include last-verified timestamp, linked tests, and change-review ownership.

* * *

## Recommendations

### Summary

Adopt a layered architecture documentation standard with a concise canonical architecture doc plus focused deep dives. This pattern consistently matches the strongest examples in the corpus.

### Recommended Approach

Use a two-tier structure:

- Tier 1 (`ARCHITECTURE.md`): audience, boundaries, core components, invariants, key decisions, and module map.
- Tier 2 (linked deep dives): execution flows, subsystem internals, ADR-style decisions, and operational considerations.

Operationalize with ownership and review expectations:

- assign maintainers per section,
- require architecture-doc check during substantial design changes,
- keep top-level doc under a strict length budget to preserve readability.

**Rationale**:

- Matches observed strengths across mature project docs.
- Balances fast orientation with necessary depth.
- Reduces drift by constraining top-level scope and linking specialized material.

### Alternative Approaches

Single-file architecture docs are suitable for small codebases with low subsystem complexity. Distributed wiki-only models can work for large organizations only when governance, templates, and review discipline are already strong.

* * *

## References

- https://github.com/noahbald/awesome-architecture-md
- https://github.com/torvalds/linux/blob/master/Documentation/crypto/architecture.rst
- https://github.com/flutter/flutter/blob/master/docs/about/The-Engine-architecture.md
- https://github.com/microsoft/vscode/wiki/Source-Code-Organization
- https://github.com/tauri-apps/tauri/blob/dev/ARCHITECTURE.md
- https://github.com/evanw/esbuild/blob/main/docs/architecture.md
- https://rust-analyzer.github.io/book/contributing/architecture.html
- https://matklad.github.io/2021/02/06/ARCHITECTURE.md.html
- https://johnjago.com/great-architecture-documents/

* * *

## Appendices

### Appendix A: Evidence-to-Practice Mapping

| Observed Pattern | Evidence Sources | Practical Rule |
| --- | --- | --- |
| Early component map | Linux, Flutter, VS Code | Always define boundaries and major components first |
| Concept-to-code mapping | VS Code, Tauri, esbuild | Include module/file anchors for each major section |
| Decision rationale | esbuild, rust-analyzer, John Jago | Record why, not only what |
| Concise top-level orientation | Matklad | Keep top-level architecture doc short and link outward |
| Layered doc model | Multiple corpus examples | Use overview plus deep dives rather than one monolith |

### Appendix B: Minimum Architecture Doc Checklist

1. Scope and non-goals
2. Component and interface map
3. Core invariants/constraints
4. Key decisions with rationale
5. Code navigation anchors
6. Reliability/risk notes
7. Links to deep dives and ownership metadata

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- 2026-02-22: Created initial research brief from awesome-architecture-md examples (019c869d-8094-75a1-af3b-9ca4600a97fc)
