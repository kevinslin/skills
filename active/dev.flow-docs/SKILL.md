---
name: dev.flow-docs
description: Define and guide creation/revision of flow documentation (mini architecture docs describing the lifecycle of a behavior in the codebase). Use when asked what a flow doc is, or when creating, updating, or reviewing flow docs for a system behavior or request lifecycle.
---

# Flow Docs

## Overview

A flow doc is a mini architecture doc that describes the lifecycle of a behavior in the codebase. For example, bootstrapping a system could be a flow. The lifecycle of a particular API request could be another. Flow docs are meant to help LLMs and humans quickly recapture context on a particular part of the code.

When describe flows, prefer to use typescript like pseudocode to describe logic. Always include citation to files where logic occurs

## How to Use This Skill

- For creating a new flow document, follow the `dev.shortcuts` workflow in
  `@shortcut:new-flow-doc.md`.
- For revising an existing flow document, follow the `dev.shortcuts` workflow in
  `@shortcut:revise-flow-doc.md`.

## Scope Reminders

- Focus on lifecycle and execution sequence, not just static component structure.
- Link related architecture docs, specs, or research notes when available.
- Keep the flow doc narrow: one behavior or lifecycle per document.
