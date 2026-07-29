# Glossary

Flat, alphabetical. Add a term any time you have to look one up twice.

- **API** — a way to give an app (or Claude) targeted, scoped access to run
  specific actions on a tool, without full access to it. See
  [foundations/05-connecting-tools.md](foundations/05-connecting-tools.md).
- **CLAUDE.md** — the file Claude Code reads automatically for project
  context before every prompt. See
  [foundations/04-claude-md-authoring/](foundations/04-claude-md-authoring/structure-and-sections.md).
- **CLI** — Command Line Interface. A tool controlled via typed commands
  instead of a GUI; often faster and more token-efficient than an MCP for
  the same task.
- **Fork** — a duplicate of someone else's repository, under your own
  account, that you can modify independently.
- **IDE** — Integrated Development Environment (e.g. VS Code, Cursor).
- **MCP (Model Context Protocol)** — the protocol most AI-tool integrations
  use today; an MCP server exposes a tool's capabilities so Claude can call
  them. See [foundations/05-connecting-tools.md](foundations/05-connecting-tools.md).
- **Merge** — combining a branch's changes into another branch (usually
  `main`).
- **Monorepo** — one repository containing multiple parts of an app (e.g.
  frontend + backend together).
- **Polyrepo** — the app is split across multiple separate repositories
  (e.g. frontend, backend, a custom pipeline each in their own repo). Lets
  each part ship independently without merging the whole app at once.
- **PR (Pull Request)** — a proposal to merge one branch into another;
  reviewed before merging. GitHub shows exactly what changed (green =
  added, red = removed).
- **Repository ("repo")** — where a project's code is stored and
  version-controlled.
- **Skill (Claude Skill)** — a packaged, reusable capability Claude can load
  when relevant. See [foundations/06-claude-skills/](foundations/06-claude-skills/skill-architecture.md).
- **SSH key** — a credential pair that authenticates your machine to GitHub
  without a password/token for every push/pull. See
  [foundations/02-git-github-basics.md](foundations/02-git-github-basics.md).
- **Star (GitHub)** — bookmarking a public repository.
- **Token (Personal Access Token / PAT)** — a credential string used instead
  of a password for git/API auth. Treat like a password: scope it narrowly,
  never commit it, never paste it into a chat.
