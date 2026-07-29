# Git & GitHub Basics

Generic git/GitHub workflow notes. See [glossary.md](../glossary.md) for term
definitions (repo, branch, PR, monorepo, etc.).

## Why GitHub

1. Version control
2. Collaboration
3. Free/open code to build on
4. Industry standard — most real dev workflows assume it

## First-time setup: SSH authentication

SSH is the most reliable method — set it up once, no passwords/tokens needed
for day-to-day git.

```bash
# 1. Generate a key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept the default location; passphrase optional

# 2. Start the agent and add the key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# 3. Copy the public key
pbcopy < ~/.ssh/id_ed25519.pub        # macOS
# xclip -sel clip < ~/.ssh/id_ed25519.pub   # Linux
# clip < ~/.ssh/id_ed25519.pub              # Windows (Git Bash)

# 4. Add it to GitHub: Settings → SSH and GPG keys → New SSH key → paste → Save

# 5. Test the connection
ssh -T git@github.com
# Expect: "Hi <username>! You've successfully authenticated..."
```

**Troubleshooting "permission denied" / "repository not found" later:** the
SSH agent may have forgotten the key after a restart — re-run steps 2 above
(`eval "$(ssh-agent -s)"` then `ssh-add ~/.ssh/id_ed25519`) from inside the
project folder and retry.

## Cloning a repo

- Public repos: no SSH key or token needed — copy the HTTPS URL and
  `git clone <url>`.
- Private repos: use the SSH URL (`git@github.com:owner/repo.git`) once SSH
  is set up above.

## First-time repo setup (pushing a new local project)

```bash
cd /path/to/your/project
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main   # -u sets the default; after this, plain `git push` works
```

## Everyday workflow

```bash
git status                        # what changed
git add .                         # stage everything (or: git add filename.txt)
git commit -m "describe what you changed"
git push
```

## Branches

```bash
git checkout -b branch-name       # create + switch
git push -u origin branch-name    # publish it
git checkout main                 # switch back
git branch                        # local branches (* = current)
git branch -a                     # include remote branches

git checkout main
git merge branch-name             # merge a local branch into main
# if the branch only exists on GitHub: git merge origin/branch-name

git branch -d branch-name                  # delete local
git push origin --delete branch-name       # delete remote
```

**Sequential PRs** (when PR2 depends on PR1 touching the same file): branch
PR2 off PR1's branch instead of `main`, set PR2's base branch to PR1's branch
on GitHub, note "Depends on #PR-number" in the description, and merge PR1
first. If both changes are small and related, just combine them into one PR
instead — usually easier than managing the dependency.

## Handy commands

```bash
git status          # safe to run anytime
git log --oneline   # compact recent history
git pull            # download latest from GitHub
git diff            # exact line changes
git stash           # shelve uncommitted changes temporarily
git stash pop       # restore them
git remote -v       # confirm remote URL (fetch + push)
```

## Working across multiple GitHub accounts (e.g. work + personal)

```bash
# Switch which identity commits are attributed to (per-repo, run inside the repo)
git config user.email "YOUR_WORK_EMAIL"      # or
git config user.email "YOUR_PERSONAL_EMAIL"

# Point the current repo at a different remote
git remote set-url origin https://github.com/ORG/REPO       # work
git remote set-url origin https://github.com/USERNAME/REPO  # personal

git remote -v   # always check which repo/branch you're pointed at before pushing
```

Typical order before pushing: check identity → check remote → check branch →
add/commit → push.

## Personal access tokens (when SSH isn't an option)

Some workflows — e.g. installing packages from a private GitHub npm registry
— need a classic PAT instead of SSH:

1. GitHub → Settings → Developer settings → Personal access tokens →
   Tokens (classic) → Generate new token (classic).
2. Name it for what it's for, scope it narrowly (e.g. just `read:packages`
   if that's all it's for).
3. If the org uses SSO, click **Configure SSO** next to the new token and
   authorize it for the relevant org — without this step you'll get 403s
   even with a valid token.
4. Copy it immediately (shown once) and store it as an environment variable,
   never hardcoded in a file that gets committed:
   ```bash
   echo 'export SOME_TOKEN_NAME=YOUR_TOKEN' >> ~/.zshrc
   source ~/.zshrc
   ```
5. **Never paste a real token into a Claude chat or a plaintext notes file.**
   If Claude needs one, ask it which file/env var it belongs in and add it
   there directly.
