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

Install these roughly in order — some later ones assume earlier ones are
already present. Each is tagged **Essential** (required to actually get
Claude Code installed and running) or **Optional** (nicer-to-have, or only
needed for specific projects).

### 1. Docker Desktop — Optional (project-dependent)
**What it's for:** runs "containers" — isolated, pre-packaged environments
so a project's dependencies behave the same on your machine as everyone
else's, without installing everything directly on your Mac. Not needed to
run Claude Code itself — only install this if a specific project's setup
instructions mention Docker.

**Install:**
1. Download Docker Desktop for Mac from docker.com (pick the Apple Silicon
   build if you're on an M-series Mac).
2. Drag it into Applications and open it once to finish setup.
3. If you'll be running containers regularly, bump the default resources:
   Settings (cog icon, top right) → Resources → raise **Memory Limit** to
   16GB and **Swap** to 2GB (use less if your Mac has less total RAM).

### 2. iTerm — Optional (convenience)
**What it's for:** a more capable terminal app than the built-in macOS
Terminal (better search, split panes, color themes). Purely a nicer place
to type the same commands — the built-in Terminal app works fine for
everything in this guide.

**Install:** download from iterm2.com and drag it into Applications.

### 3. oh-my-zsh — Optional (convenience)
**What it's for:** adds shortcuts, themes, and autocompletion on top of
your shell. Works on the built-in Terminal just as well as iTerm — it
doesn't depend on which terminal app you use, only which shell (`zsh`,
the macOS default).

**Install:** open Terminal (or iTerm) and paste:
```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 4. Xcode Command Line Tools — Essential
**What it's for:** a base set of developer tools Apple ships — compilers,
Git, and other command-line utilities that many other installers (including
Homebrew) expect to already be present. Skipping this will cause Homebrew
and other tools to fail or prompt you to install it anyway.

**Install:**
1. Run:
   ```
   xcode-select --install
   ```
2. A popup appears — click **Install**, accept the license. Takes a few
   minutes.

### 5. Homebrew — Essential
**What it's for:** macOS's package manager — lets you install, update, and
remove command-line software with one command instead of hunting down
installers for each tool individually. You can't easily get `nvm` (and
therefore Node, and therefore the Claude Code CLI) installed without it.

**Install:**
1. Run:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Follow the on-screen prompts (it may ask for your Mac password — typing
   is normal, it won't show characters as you type).
3. Verify it worked:
   ```
   brew --version
   ```

### 6. nvm (Node Version Manager) — Essential
**What it's for:** different projects often need different versions of
Node.js. nvm lets you install several versions side by side and switch
between them per project, instead of being stuck on one global version.

**Install:**
1. Run:
   ```
   brew install nvm
   ```
2. `brew` prints a "Caveats" section with a couple of lines to add to your
   shell config — open `~/.zshrc` in your editor and add what it shows
   (typically something like):
   ```
   export NVM_DIR="$HOME/.nvm"
   [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
   ```
3. Restart your terminal (or run `source ~/.zshrc`), then verify:
   ```
   nvm --version
   ```

### 7. Node.js — Essential
**What it's for:** the JavaScript runtime most web tooling — including the
Claude Code CLI — is built on. Installing it also gives you `npm`, the
default package manager for JavaScript packages.

**Install (after nvm is set up):**
1. Run:
   ```
   nvm install 20
   ```
   (swap `20` for whatever LTS version a specific project asks for, if
   different)
2. Verify:
   ```
   node --version
   npm --version
   ```

### 8. Yarn — Optional (project-dependent)
**What it's for:** an alternative to `npm` for installing JavaScript
packages. Some projects standardize on Yarn instead of npm — check a
project's README or `package.json` before assuming which one it wants. Not
needed for Claude Code itself.

**Install:**
```
npm install -g yarn
```
The `-g` flag installs it globally, so it's available in any project
folder, not just one.

### 9. A code editor — Essential
**What it's for:** where you'll read and write code, and where the Claude
Code extension runs (see [Claude Code](#claude-code) below).

**Install:** download VS Code (code.visualstudio.com) or Cursor
(cursor.com) and drag it into Applications. Either works fine — VS Code is
the more common default if you don't already have a preference.

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

See [02-git-github-basics.md](02-git-github-basics.md) for turning that
folder into a real repo.

## Putting a project online

For a quick, free way to get a static site live (e.g. the portfolio above):
[Netlify](https://www.netlify.com/) — has a free plan, deploy by uploading
the project folder, and lets you attach a custom domain.
