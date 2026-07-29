# Example: Automating a Team Status Report

A small business-ops automation example: a shared spreadsheet where each
team member logs their project and status weekly, with an automated nudge to
fill it in.

## The shape of it

- The deliverable: a reporting spreadsheet (columns like name, project,
  weekly status) that people update themselves.
- The automation: a recurring reminder (e.g. every Friday at 4pm) prompting
  people to fill in the form, rather than someone chasing it manually.

## How to approach building this

- **Use Plan mode for the first pass** — see
  [../../foundations/03-permission-modes.md](../../foundations/03-permission-modes.md).
  You don't yet know the exact shape of the automation (which reminder
  channel, exact cadence, what "done" looks like), so let Claude draft an
  approach before it touches anything.
- If reminders should go out over Slack, a Slack MCP can let Claude trigger
  them directly — see
  [../../foundations/05-connecting-tools.md](../../foundations/05-connecting-tools.md).
- **Never drop API keys or tokens into the chat** while setting this up —
  ask Claude which file/env var they belong in instead.
