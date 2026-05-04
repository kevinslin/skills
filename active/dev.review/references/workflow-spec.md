# Spec Review Workflow

Use this workflow to review a spec for implementation readiness.

## Steps

1. Check goals and non-goals.
   - Call out vague outcomes, hidden scope, or missing success criteria.
2. Check user and system behavior.
   - Identify ambiguous flows, state transitions, permissions, edge cases, and error handling.
3. Check data and API contracts.
   - Review request and response shapes, persistence, ownership, migrations, compatibility, and observability.
4. Check rollout and validation.
   - Review feature flags, backfills, test strategy, monitoring, and rollback paths.
5. Look for simplification.
   - Propose narrower milestones, smaller contracts, or deletion of unnecessary concepts.

## Severity Guidance

Treat missing execution contracts, validation plans, or rollback paths as major findings unless the scope is explicitly exploratory.

Clearly label severity for each issue: blocker, major, minor, or nit.
