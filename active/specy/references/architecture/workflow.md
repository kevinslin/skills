# Architecture Doc Workflow

## Use When

- Creating a new `ARCHITECTURE.md` for a project or subsystem
- Replacing a weak architecture doc with a contributor-oriented one
- Documenting system boundaries, code organization, flows, and invariants
- Producing an architecture artifact that helps future changes land safely

## Template

- `./references/architecture/template.md`

## Default Output Location

- Project-wide doc: `$DOCS_ROOT/ARCHITECTURE.md`
- Subsystem doc: `<subsystem-path>/ARCHITECTURE.md` when the user asks for a scoped document

## Instructions

1. Determine the target scope before writing:
   - project-wide if the request is about the whole system
   - subsystem-scoped if the request is about one service, package, runtime, or workflow
2. Check for an existing `ARCHITECTURE.md` at the target path.
   - If one exists, revise in place and preserve any useful source-backed content and the required ending sections.
   - If one does not exist, copy `./references/architecture/template.md` to the target path.
3. Gather source-backed context from the repository before drafting:
   - runtime entry points
   - key modules and directories
   - tests or fixtures that show real usage
   - existing design docs, ADRs, or runbooks
4. Fill the document from top to bottom with repository-specific content.
   - Replace placeholders with concrete paths, components, and invariants.
   - Remove sections that are not relevant instead of leaving empty headings.
   - Keep the strongest emphasis on `Entry Points`, `Code Map`, `Layering Rules`, and `Architectural Invariants`.
5. Add at least one diagram that reflects the real system shape.
   - Use Mermaid or ASCII.
   - Prefer one high-level component diagram and one request, job, or data-flow diagram when both are material.
6. Tie architecture claims to concrete implementation locations.
   - Name files, directories, modules, interfaces, or commands.
   - Avoid generic statements that are not grounded in the codebase.
7. Capture rules that future contributors could break.
   - Explicitly document ownership boundaries, allowed dependency direction, and failure or persistence guarantees.
8. Finish with the required ending sections from the skill and replace the changelog placeholder with the real session id before handoff.

## Fill-Out Guidance

Write the sections with this standard:

- `System Overview`: explain what the system is in one sentence, then name the major parts
- `Goals` and `Non-Goals`: document what the architecture optimizes for and intentionally avoids
- `Entry Points`: give a newcomer 3 to 5 concrete starting files or modules
- `Major Components`: describe each important component in terms of role, path, dependencies, and consumers
- `Code Map`: show where code belongs, not just where it currently happens to live
- `Layering Rules`: state allowed dependency direction and forbidden shortcuts
- `Data / Request / Job Flow`: narrate the main runtime path in numbered steps
- `State Model`: include only if state transitions materially affect design or correctness
- `Key Abstractions`: define the core types or interfaces contributors must understand
- `Architectural Invariants`: state the non-negotiable rules precisely
- `Boundaries and Ownership`: identify API boundaries, internal-only modules, and integration edges
- `Concurrency / Performance Model`: include only when it affects how code must be written
- `Configuration Model`: include only settings that materially change architecture or behavior
- `Failure Model`: describe retries, cleanup, idempotency, and persistence guarantees
- `Testing Strategy`: connect important invariants and flows to real test coverage
- `Change Guide`: tell future contributors where to look before changing important behavior
- `Open Questions / Known Tensions`: document unresolved design pressure honestly

## Quality Bar

The doc is good enough to ship when:

- a new contributor can identify where to start reading code
- the main flows and boundaries are understandable without reverse-engineering the whole repo
- the invariants are explicit enough to guide safe changes
- diagrams match the actual implementation shape
- filler text and empty template sections have been removed

## Stop And Clarify When

- ownership boundaries are genuinely ambiguous
- multiple incompatible architectures are in use and the authoritative one is unclear
- important behavior is split across generated code or external systems you cannot inspect
- the user needs a decision document instead of an architecture document
