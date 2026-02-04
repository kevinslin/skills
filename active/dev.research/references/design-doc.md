# Service Design

**Created Date:**

---

## 0. Context
[One-Paragraph Summary (Required)]
> What is this service, who is it for, and why does it exist *now*?

---

## 1. Problem & Scope

### Problem

[What's broken or missing today]

### In Scope

[Bullet list of responsibilities]

### Out of Scope

[Explicit non-goals (to prevent scope creep)]

---

## 2. Constants and Types

### Constants
[paths and important variables to be reference dlater]

### Types
[typescript types of important elements]


## 3. Architecture (Required)

**High-Level Diagram**

> Boxes + arrows is enough (Mermaid encouraged)

### Key Components

* Service
* Storage
* External dependencies

### Key Flows

### Boundaries
* What this service owns vs delegates

---

## 4. API / Interface 

* Interface type: REST / gRPC / Events / Queue
* Versioning approach

**Endpoints / Contracts**

```text
GET  /v1/...
POST /v1/...
```

**Notable Decisions**

* Idempotency?
* Retries?
* Error semantics?

---

## 5. Data & State

* What data is stored?
* Source of truth?
* Retention / deletion expectations?

---

## 6. Security & Safety (Brief)

* AuthN / AuthZ model
* Any PII or sensitive data?

---

## 8. Observability 

### Metrics

### Logging

---

## 9. Risks & Open Questions

* Known risks
* Unknowns
* Things we're intentionally punting

---

## 10. MVP

[What does mvp look like]

## 11. Testing

[Comprehensive testing plan. Both automatic and Manual]

## 12. FAQ

[Any additional questions to change]

## Additional Sections (Optional - only include this if user has asked for it )

### Scale & Reliability (Answer honestly) 

* Expected QPS (now / 6 months)
* Latency target (p95)
* Availability target (best effort / 99.9 / etc.)

**Failure Behavior**

* What happens if dependencies fail?
* What breaks first?

---

## Appendix (Optional)

* Diagrams
* Schemas
* Links to related docs
* Prior Art

## Manual Notes 

[keep this for the user to add notes. do not change between edits]

## Changelog
- [date]: [description of update] ([agent session id])
