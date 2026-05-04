# Architecture Review Workflow

Use this workflow to review architecture for correctness, operability, and long-term maintainability.

## Steps

1. Map boundaries and ownership.
   - Identify unclear service boundaries, duplicated ownership, leaky abstractions, and mismatched responsibilities.
2. Trace data and control flow.
   - Follow critical paths, dependencies, retries, consistency assumptions, and failure propagation.
3. Check scalability and reliability.
   - Look for bottlenecks, fanout, caching, backpressure, partial failure, and recovery behavior.
4. Review security and compliance.
   - Call out trust-boundary, authorization, data-retention, and sensitive-data risks.
5. Review migration and operations.
   - Check rollout phases, observability, runbooks, rollback, and compatibility with existing systems.
6. Look for simplification.
   - Prefer fewer systems, explicit contracts, and narrower synchronization points.

## Severity Guidance

Treat undefined ownership, hidden data coupling, and unobservable failure modes as high-severity findings.

Clearly label severity for each issue: blocker, major, minor, or nit.
