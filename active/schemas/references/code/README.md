# code Schema

Source: `schema.yaml`

Regenerate this view from the schemas skill root:

```bash
UV_CACHE_DIR=/private/tmp/uv-cache ./scripts/schema.py show code
```

```text
code [version=1.0 output=directory extension=md]
|-- variables
|   |-- module: *, default=module
|   |-- date: *, default=YYYY-MM-DD
|   |-- system: *, default=system
|   |-- research_topic: *, default=topic
|   |-- service_design_topic: *, default=topic
|   |-- spec_num: *, default=01
|   |-- spec_topic: *, default=topic
|   |-- design_topic: *, default=topic-design
|   |-- investigation_topic: *, default=topic-investigation
|   |-- validation_topic: *, default=topic-validation
|   |-- archived_spec_num: *, default=00
|   |-- archived_spec_topic: *, default=archived-topic
|   |-- flow_topic: *, default=topic
|   |-- flow_ref: *, default=reference
|   |-- state_name: *, default=target-state
|   |-- recipe_name: *, default=change-recipe
|   |-- faq_topic: *, default=topic
|   |-- library: *, default=library
|   |-- vendor_reference: *, default=api
|   `-- vendor_topic: *, default=topic
`-- tree
    `-- packages [path-only] - Package-level code documentation root.
        `-- {{module}} [path-only children_from=1] - Root module, service, package, or docs area containing code documentation.
            |-- navfile [template=navfile insertion-policy] - Navigation map for the module, including purpose, aliases, key file paths, entrypoints, rg anchors, and related module navfiles.
            |-- dev [template=dev] - development setup, tests, and debugging
            |   |-- qa [template=default] - how to test changes
            |   `-- obs [template=obs] - observability
            |-- ref [template=default insertion-policy] - Catchall reference notes for module information that does not fit another code documentation area.
            |-- ARCHITECTURE [template=architecture insertion-policy] - Project-wide architecture doc for the whole system, matching the specy architecture workflow default.
            |-- architecture [path-only] - Dated architecture docs for subsystem or service-level architecture.
            |   `-- {{date}}-architecture-{{system}} [template=architecture insertion-policy] - System or subsystem architecture doc.
            |-- research [path-only] - Research briefs comparing technologies, approaches, or implementation options.
            |   `-- {{date}}-research-{{research_topic}} [template=research-brief] - Dated research brief for a specific topic.
            |-- design [path-only] - Service design docs for staff-level service or system proposals.
            |   `-- {{date}}-design-{{service_design_topic}} [template=service-design-doc insertion-policy] - Service design doc.
            |-- specs [path-only] - Active feature specs, feature designs, investigation specs, and validation specs.
            |   |-- {{spec_num}}-{{spec_topic}} [template=feature-spec insertion-policy] - Active feature spec with a monotonic two-digit prefix.
            |   |-- {{date}}-{{design_topic}} [template=design-spec insertion-policy] - Optional dated feature design spec.
            |   |-- {{date}}-{{investigation_topic}} [template=investigation-spec insertion-policy] - Optional dated investigation spec.
            |   |-- {{date}}-{{validation_topic}} [template=validation-spec insertion-policy] - Optional dated validation spec.
            |   `-- .archive [path-only] - Completed specs moved here without renaming.
            |       `-- {{archived_spec_num}}-{{archived_spec_topic}} [template=archived-spec] - Archived completed spec.
            |-- flows [path-only] - Execution-flow documentation for lifecycle, topic, and reference flows.
            |   |-- core.init [template=flow-doc] - Core initialization flow.
            |   |-- core.exit [template=flow-doc] - Core cleanup or shutdown flow.
            |   |-- topic.{{flow_topic}} [template=flow-doc] - Optional topic flow for major functionality in a domain.
            |   `-- ref.{{flow_ref}} [template=flow-doc] - Optional reference flow for supporting behavior outside core/topic.
            |-- state [path-only] - Terminal-output and state-derivation docs.
            |   `-- {{state_name}} [template=state-doc] - State doc for a target symbol or output surface.
            |-- recipes [path-only] - Reproducible change recipes derived from a conversation or PR.
            |   `-- {{recipe_name}} [template=recipe] - Step-by-step change recipe.
            |-- faq [path-only] - Standalone FAQ docs; FAQ specs update target research docs in place and do not create files here.
            |   `-- {{date}}-{{faq_topic}} [template=faq-doc] - Standalone FAQ doc.
            |-- vendor [path-only] - Project-focused third-party library documentation.
            |   `-- {{library}} [path-only dynamic] - Vendor documentation root for one library.
            |       |-- README [template=vendor-doc] - Vendor overview doc.
            |       |-- reference [path-only] - Optional API reference docs for vendor APIs used by the project.
            |       |   `-- {{vendor_reference}} [template=vendor-reference dynamic] - Vendor API reference doc.
            |       `-- topics [path-only] - Optional vendor topic deep-dives.
            |           `-- {{vendor_topic}} [template=vendor-topic dynamic] - Vendor topic doc.
            |-- readme [template=default] - general overview of code
            |-- concepts [template=default] - index of various concepts
            |-- flow [path-only] - execution-flow documentation
            |   `-- {{flow}} [template=flow-doc dynamic] - flow doc for a specific execution path
            |-- arch [path-only] - architecture documentation for a named system, subsystem, workflow, or service boundary
            |   `-- {{arch}} [template=architecture dynamic] - architecture doc for a specific system, subsystem, workflow, or service boundary
            |-- pr [path-only] - PR code-change flow docs. Use `pr/{{num}}-{{slug}}.md`, where `num` is the pull request number and `slug` is the lowercase hyphenated PR title; the document should describe the execution or behavior flow changed by the PR, not the pull request lifecycle.
            |   `-- {{num}}-{{slug}} [template=flow-doc dynamic] - flow doc for the code changes in a specific pull request
            `-- api [path-only] - api reference
                `-- {{api_name}} [template=api dynamic] - api reference
```
