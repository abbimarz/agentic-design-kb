# Permission Modes

When to use which Claude Code permission mode:

- **Plan mode** — use when you don't yet know exactly what you want. Claude
  drafts an approach before touching anything; good for ambiguous or
  higher-stakes tasks (e.g. "automate reminders for my team" before you've
  decided how).
- **Auto mode** — bypasses some permission prompts; only stops to ask when
  Claude itself judges it needs to.
- **Bypass all permissions** — no prompts at all. Reserve for low-risk,
  well-understood, repetitive tasks.

## Controlling what Claude actually sees

- Select text in any file (doesn't have to be the open one) — it shows as
  "X lines selected" and gets added to context.
- You can select a specific **skill** to be referenced for a task.
- You can disable a skill/file so it's explicitly *not* referenced, even if
  it would otherwise be picked up.

## How context gets loaded into a chat (rough order)

1. The relevant `.md` file(s) (e.g. CLAUDE.md) — see
   [claude-md-authoring/](claude-md-authoring/structure-and-sections.md).
2. Your chat instructions (the prompt itself).
3. Anything explicitly added via the secondary context toggle (file, text,
   or folder selection).

Rough workflow shape either way: **input → build → review**.
