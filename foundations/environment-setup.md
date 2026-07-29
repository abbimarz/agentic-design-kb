# Environment Setup

Base checklist for getting a machine ready to work with Claude Code, agnostic
of any specific project or employer.

## Where to put projects

- Common convention: `~/projects/` or `~/code/` (also seen: `~/dev`, `~/src`,
  `~/workspace`).
- Group by context under the main folder, e.g. `~/projects/work/` and
  `~/projects/personal/`.
- Keep the folder name matching the repo name so it's easy to find.
- Avoid paths with spaces — some tools handle them poorly.
- Avoid: inside Desktop/Downloads/Documents (gets cluttered), deeply nested
  paths (tedious in the terminal), or system directories like `/usr`, `/opt`.
- Simple starting point: `~/projects/work/` for work repos, clone everything
  there, reorganize later if needed.

## Core tools

In rough install order:

1. **Docker Desktop** (Apple Silicon build if on an M-series Mac). Bump
   default resource allocation if you'll run containers: Settings → Resources
   → Memory Limit (e.g. 16GB), Swap (e.g. 2GB).
2. **iTerm** (or just use Terminal) + **oh-my-zsh** for a nicer shell.
3. **Xcode Command Line Tools** — `xcode-select --install`. Installs
   compilers, Git, and other tools many CLI installers depend on.
4. **Homebrew** — `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`.
   macOS package manager for everything below.
5. **nvm** — `brew install nvm`. Lets you install/switch Node versions per
   project.
6. **Node.js** — `nvm install 20` (or whatever LTS the project needs). Comes
   bundled with `npm`.
7. **Yarn** (if a project uses it instead of npm) — `npm install -g yarn`.
8. A code editor — VS Code or Cursor are the common defaults.

## Claude Code

- **Claude desktop app** — for general chat.
- **Claude Code** — install as a VS Code extension (Extensions → search
  "Claude Code" by Anthropic → Install), or as a standalone CLI:
  ```
  npm install -g @anthropic-ai/claude-code
  ```
  Requires Node.js first. The VS Code extension alone does **not** add the
  `claude` command to your terminal — install the CLI separately if you need
  it in scripts or outside the editor.
- Check which account/subscription is connected:
  ```
  claude auth status
  claude auth login   # if you need to switch
  ```

## Starting a project from scratch

1. Create a dedicated folder for the project.
2. Drop in whatever source material Claude should know about (e.g. a CV for
   a portfolio site, brand assets, existing screenshots).
3. Ask Claude to browse the folder, find relevant files, and build from
   there — it can read local files and preview results in a browser as it
   goes.

See [git-github-basics.md](git-github-basics.md) for turning that folder into
a real repo.
