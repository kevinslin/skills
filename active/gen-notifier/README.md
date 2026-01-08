# Task Completion Notifier Skill

A generic agent skill that sends desktop notifications when tasks are complete using terminal-notifier.

## Overview

This skill enables an agent to notify you via desktop notifications when tasks are done, need input, or encounter errors. By default, all jobs assigned to the agent will trigger a notification when complete.

## Installation

This skill requires `terminal-notifier` to be installed on macOS:

```bash
brew install terminal-notifier
```

Verify installation:
```bash
which terminal-notifier
```

## Usage

The skill is automatically invoked when:

1. You explicitly ask to be notified ("notify me when done")
2. The agent completes a long-running task
3. The agent needs your input to proceed
4. The agent encounters errors that block progress

### Automatic Behavior

By default, assume all jobs will generate a notification. The agent will send notifications at the end of tasks without you having to ask.

### Notification Format

```bash
terminal-notifier -title "{JOB_DESCRIPTION}" -message "{STATUS}"
```

**Status values:**
- `completed` - Task finished successfully
- `needs_input` - Task requires user input
- `errors` - Task encountered errors

## Examples

### Request with Explicit Notification

```
User: "Implement the user dashboard and notify me when you're done"
```

The agent will complete the work and send:
```bash
terminal-notifier -title "User Dashboard Implementation" -message "completed"
```

### Long-Running Task (Automatic Notification)

```
User: "Run the full test suite and fix any failures"
```

The agent will execute tests, attempt fixes, and send:
```bash
terminal-notifier -title "Test Suite and Fixes" -message "completed"
```

### Needs Input

```
User: "Set up authentication"
```

If the agent needs to choose between OAuth or JWT, it sends:
```bash
terminal-notifier -title "Authentication Setup" -message "needs_input"
```

### Encountered Errors

```
User: "Deploy to production"
```

If deployment fails:
```bash
terminal-notifier -title "Production Deployment" -message "errors"
```

## Features

- **Automatic notifications** - Default behavior for all tasks
- **Clear status indicators** - completed, needs_input, or errors
- **Concise titles** - Understand what finished at a glance
- **End-of-turn notifications** - Sent when the agent is done or blocked
- **No spam** - One notification per task, not per step

## Configuration

No configuration needed. The skill is ready to use once terminal-notifier is installed.

## Disabling Notifications

If you don't want notifications for a specific task, tell the agent:

```
User: "Run tests but don't notify me"
```

## Troubleshooting

### Notification not appearing

1. Check terminal-notifier is installed: `which terminal-notifier`
2. Test manually: `terminal-notifier -title "Test" -message "Hello"`
3. Check macOS notification settings for Terminal

### Permission issues

Ensure Terminal has notification permissions:
1. System Preferences → Notifications
2. Find Terminal (or your terminal app)
3. Enable "Allow Notifications"

## Version

Current version: 1.0.0
