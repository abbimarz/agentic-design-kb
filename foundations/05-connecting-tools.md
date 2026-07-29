# Connecting Tools to Claude

Three ways to give Claude access to an external tool, in order of how common
they are:

## 1. MCP (Model Context Protocol)

How most AI-tool integrations happen today. An MCP server exposes a tool's
capabilities in a way Claude can call.

- Check **mcpmarket.com** to see if a tool already has an MCP server.
- Not all MCPs are official — some are third-party. Read before installing.
- There's a dedicated category for design MCPs.
- Best fit for general, broad-purpose tasks.
- **Installing one is usually just:** ask Claude Code to install it (e.g.
  "install the chrome-devtools MCP"). Some MCPs have more involved setup —
  see the Figma example below.

### Example: setting up the Figma MCP server

1. Figma → click your avatar (top-left) → Settings → Security → Personal
   access tokens → **Generate new token**.
2. Name it (e.g. "Claude MCP") and scope it to just what's needed:
   - File content: Read
   - Dev resources: Read
3. Copy the token.
4. Add an `mcpServers` block to your MCP config (e.g. `settings.json`):
   ```json
   {
     "mcpServers": {
       "figma": {
         "command": "npx",
         "args": ["-y", "figma-developer-mcp", "--figma-api-key", "YOUR_TOKEN_HERE"]
       }
     }
   }
   ```
5. Restart the Claude Code extension so it picks up the new config, then
   reference a Figma URL to confirm it works.
6. If you use multiple Figma accounts, connect the one you actually design
   in as the default — switching accounts mid-session isn't smooth and
   tends to require re-authenticating each time.

Full official reference: Figma's own MCP setup guide (search "Claude Code and
Figma MCP server" on Figma's help site).

### Example: business-ops automation via a Google Drive/Sheets MCP

A concrete pattern for turning a recurring spreadsheet task into an
automated one: read a source file (e.g. an `.xlsx` export), transform or
filter its rows, then push the result to a live Google Sheet via the Drive
MCP — instead of manually copy-pasting an updated sheet each time.

- Ask Claude to install the Google Drive/Sheets MCP the same way as any
  other MCP (see "Installing MCPs" above).
- Point it at the source data and describe the transform in plain language
  (e.g. "filter to active rows only, then write this to Sheet X").
- The MCP call itself references the target file/sheet by its Drive file ID
  — treat that ID like any other config value: fine to keep in a project
  doc, but don't need to memorize it, Claude can look it up from the Drive
  URL.
- Same caution as Google Workspace CLI tooling above: this needs your real
  Google account connected, so be deliberate about which account you
  authorize.

## 2. CLI

Less common, but faster and more token-efficient than MCP when available,
since there's no protocol overhead.

- Directory of CLI-first tools: clianything.cc
- A few worth knowing: NotebookLM, Playwright CLI (browser automation),
  Audacity (audio engineering), Google Workspace CLI tooling (be careful —
  this usually needs your real email/account).

## 3. API

Give Claude Code targeted, scoped access to specific actions rather than a
whole tool surface. Most token-efficient option, best for narrow, specific
tasks rather than general use.

## General rule

**Never paste API keys or tokens directly into a Claude chat.** Ask Claude
which file or environment variable it should go into, and add it there
yourself (or let Claude edit that specific file) — never as chat text.
