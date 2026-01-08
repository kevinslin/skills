---
name: gen-notifier
description: Generic desktop notification skill for agents. Send desktop notifications when tasks are complete (or when user input/errors block progress). By default, assume that all jobs will require a notification unless the user says otherwise.
version: 1.0.0
---

# Task Completion Notifier

This skill sends desktop notifications using terminal-notifier to alert the user when tasks are complete.

## When to Use This Skill

Use this skill in the following scenarios:

1. **User explicitly requests notification** - When the user says "notify me when done", "let me know when this finishes", etc.
2. **Long-running tasks** - Jobs that take significant time (builds, deployments, large refactors, test suites)
3. **Background tasks** - When the user might context-switch while waiting
4. **Default behavior** - By default, assume all jobs assigned to you will require a notification unless the user specifies otherwise

## How to Notify

When a task reaches a terminal state (completed, needs input, or has errors), send a notification using:

```bash
terminal-notifier -title "{DESCRIPTION OF JOB}" -message "{STATUS_OF_JOB}" -sound default
```

The `-sound default` parameter makes a beeping sound to alert the user audibly.

### Status Values

Use one of these status values in the message:

- **completed** - Task finished successfully
- **needs_input** - Task requires user input to proceed
- **errors** - Task encountered errors and cannot proceed

### Title Format

The title should be a concise description of the job (3-8 words):

**Good examples:**
- "Build and Test Suite"
- "API Integration Implementation"
- "Database Migration"
- "Code Refactoring Complete"

**Bad examples:**
- "Task" (too vague)
- "The implementation of the new authentication system with JWT tokens and refresh token rotation" (too long)

## Notification Examples

### Successful Completion
```bash
terminal-notifier -title "API Integration Implementation" -message "completed" -sound default
```

### Needs User Input
```bash
terminal-notifier -title "Database Migration Setup" -message "needs_input" -sound default
```

### Encountered Errors
```bash
terminal-notifier -title "Build and Test Suite" -message "errors" -sound default
```

## When to Send Notifications

Send notifications at these key moments:

1. **Task completion** - When all work is done successfully
2. **Blocked on input** - When you need user decision or clarification to proceed
3. **Critical errors** - When errors prevent task completion
4. **End of session** - When you've completed your turn and are waiting for user

## When NOT to Send Notifications

Don't send notifications for:

- Quick tasks (< 30 seconds)
- Intermediate steps of a larger task
- Minor clarifying questions
- Every tool execution
- Tasks where user is actively watching

## Best Practices

1. **One notification per task** - Don't spam multiple notifications
2. **Wait until terminal state** - Only notify when task is done or blocked
3. **Be specific in title** - User should understand what completed
4. **Use appropriate status** - Accurately reflect the outcome
5. **Notify at the end** - Send notification as the last action in your turn

## Example Workflows

### Successful Completion

User: "Implement the new authentication feature and notify me when done"

Assistant steps:
1. Implements authentication feature
2. Adds tests
3. Runs tests (all pass)
4. Sends notification: terminal-notifier -title "Authentication Feature" -message "completed" -sound default

### Needs User Input

User: "Set up the database migration"

Assistant steps:
1. Creates migration files
2. Discovers multiple valid approaches for schema design
3. Needs user decision on approach
4. Sends notification: terminal-notifier -title "Database Migration Setup" -message "needs_input" -sound default

### Encountered Errors

User: "Run the full test suite and notify me"

Assistant steps:
1. Runs test suite
2. Encounters 5 failing tests
3. Attempts to fix but requires refactoring beyond scope
4. Sends notification: terminal-notifier -title "Test Suite Execution" -message "errors" -sound default

## Implementation Notes

### Timing

Always send the notification as the **last action** in your response:

```
Assistant: I've completed implementing the authentication feature...

[Details of what was done]

All tests are passing. Notifying you now.

[Runs terminal-notifier command]
```

### Error Handling

If terminal-notifier is not installed, gracefully inform the user:

```
I attempted to send a notification but terminal-notifier is not installed. 
You can install it with: brew install terminal-notifier
```

### Multiple Tasks

For multiple sub-tasks within a larger job, only send ONE notification for the entire job:

❌ **Bad - multiple notifications:**
```
- Notification: "User model created"
- Notification: "API endpoint created"  
- Notification: "Tests written"
- Notification: "Authentication complete"
```

✅ **Good - single notification:**
```
- Notification: "Authentication Feature" -message "completed" -sound default
```

## Requirements

This skill requires terminal-notifier to be installed:

```bash
brew install terminal-notifier
```

Check if installed:
```bash
which terminal-notifier
```
