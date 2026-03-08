---
name: plan-and-review
description: Create a feature spec from user input with specy, run a comprehensive design review with dev.review, then apply accepted recommendations back into the original spec.
---

Shortcut: Plan and Review

Instructions:

Create a to-do list with the following items then perform all of them:

1. Confirm the feature request and constraints from user input. If scope is unclear, ask focused clarification questions before writing the spec.

2. Use skill `specy` to create a feature spec from the user input.
   - Choose the correct spec type and target path.
   - Include at minimum: problem statement, goals/non-goals, requirements, proposed design, risks, and validation plan.

3. Use skill `dev.review` to run a comprehensive design review on that spec.
   - Focus on correctness, feasibility, security/privacy, operability, testability, and missing edge cases.
   - Produce prioritized recommendations with clear rationale.

4. Apply accepted recommendations directly to the original spec.
   - Update sections in place rather than creating a competing duplicate spec.
   - Add concise decision notes where recommendations are intentionally not adopted.

5. Summarize the final spec updates and list any open questions or follow-up items.
