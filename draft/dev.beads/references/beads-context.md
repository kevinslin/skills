# Beads Context and Rationale

Beads (Steve Yegge's `bd` tool) is a lightweight, token-friendly issue tracker.
It replaces markdown checklists and helps agents keep task context without rewriting
large plans in prompts.

Key ideas from this repo:

- Beads are the best tool so far for agent task management and progress tracking.
- They reduce pressure on long plan docs and let long-lived docs stand on their own.
- They complement spec-driven workflows by storing task state and dependencies.
- The goal is durable memory across sessions: clear bead titles and dependencies
  preserve context for the next agent or timebox.
