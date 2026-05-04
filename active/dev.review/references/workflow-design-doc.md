# Design Doc Review Workflow

Use this workflow to review designs for unnecessary complexity, unclear abstractions, and implementation risk.

## Steps

1. Identify the central proposal and intended behavior.
   - Call out vague goals, missing context, and areas where major system logic is unclear or unspecified.
2. Check for unnecessary complexity.
   - Look for over-engineering, avoidable concepts, broad abstractions, and extra moving parts.
   - Propose radical simplifications when they would make the design clearer or safer.
3. Check assumptions.
   - Identify assumptions that may not hold in production, during migration, or under partial failure.
4. Verify execution contracts for every new script, trigger, or component.
   - Who invokes it.
   - In which state or phase it is invoked.
   - From which path or runtime environment it is invoked.
   - Which artifact or API contract it reads or writes.
   - How failures and missing outputs are surfaced.
5. Turn gaps into findings.
   - If an execution contract is implicit, hand-wavy, or deferred, call it out as an ambiguity or regression risk.

## Severity Guidance

Treat undefined execution contracts as high-severity findings.
