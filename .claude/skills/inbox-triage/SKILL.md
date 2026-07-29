---
name: inbox-triage
description: Triage raw notes/screenshots sitting in _inbox/ into this knowledge base's structure (foundations/, skills-catalog/, applications/, glossary.md, use-case-ideas.md), stripping company- or employer-specific details and secrets before filing. Trigger on "triage the inbox", "organize _inbox", "file these notes", "clean up the KB inbox", or when the user drops new course notes/screenshots into _inbox/ and asks what to do with them.
---

# Inbox Triage

Turns raw dumps in `_inbox/` into properly filed, generalized knowledge base
entries. Read `README.md` at the repo root first — it defines the categories
below and the reasoning behind them; this skill exists to apply that
process, not duplicate it.

## Process

For each item in `_inbox/` (text note or screenshot):

1. **Read it fully.** For images, actually look at them — don't skip based
   on filename.

2. **Strip anything non-reusable before it goes anywhere else:**
   - Company/employer names, internal repo URLs, internal tool names.
   - Real secrets — API keys, tokens, passwords. If one is present, do not
     copy it anywhere, including into a "generalized" version. Flag it to
     the user explicitly, the same way a leaked token was flagged when this
     KB was first built — recommend they revoke it.
   - Real personal identifiers (work email, personal email, legal name)
     unless the note is inherently about that person's own workflow choice
     — replace with a placeholder (`YOUR_EMAIL`, `YOUR_USERNAME`) if the
     pattern itself is worth keeping.
   - Keep the *underlying reusable pattern* even when the specific instance
     is stripped (e.g. "how to set up a PAT for a private npm registry" is
     reusable; the specific token and org name are not).

3. **Decide destination** using this table (matches the root `README.md`):

   | This item is... | Goes in |
   |---|---|
   | A domain-agnostic mechanic of working with Claude (CLAUDE.md authoring, Skills, MCP/CLI/API setup, git, environment setup) | `foundations/` — add to an existing file if it fits, otherwise a new file in the closest existing subfolder |
   | A skill (existing or one worth building), organized by discipline | `skills-catalog/<discipline>.md` — read `skills-catalog/README.md` for which category, or whether a new category file is warranted |
   | Applying agentic workflows to a specific domain (design, video-editing, business-ops, or a new one — marketing, 3D modeling, 3D printing, etc.) | `applications/<domain>/` — read `applications/README.md` for the template; create a new domain folder only when there's real content for it, don't pre-create empty ones |
   | A term worth defining | `glossary.md` — flat, alphabetical |
   | A cross-domain workflow idea not yet tied to one domain or built out | `use-case-ideas.md` |

4. **Prefer editing an existing file over creating a new one** if the
   content genuinely belongs there. Create a new file only when nothing
   existing fits — this mirrors the CLAUDE.md length guidance already in
   `foundations/04-claude-md-authoring/length-and-splitting.md`: small,
   well-scoped files stay useful longer than one file trying to cover
   everything.

5. **Screenshots specifically:**
   - If it's mostly text/tables/lists, transcribe it into markdown and
     don't keep the image.
   - If it's a genuine diagram, file tree, or something markdown can't
     represent well, copy it into an `images/` subfolder next to the `.md`
     file that references it, and link it with a short caption.
   - Drop screenshots with no unique informational content (generic UI
     chrome, near-empty examples) — note in your summary to the user what
     was dropped and why, don't silently discard.

6. **Delete the item from `_inbox/`** once it's filed. `_inbox/` should be
   empty when triage is done — it's a queue, not an archive.

7. **Summarize what you did** at the end: what got filed where, what got
   dropped and why, and flag anything ambiguous you filed with a best guess
   rather than asking mid-triage (batch questions at the end instead of
   interrupting per item, unless something needs a decision before you can
   safely proceed — e.g. a secret, or a genuinely new domain/category).

## Verification

After triage, `_inbox/` should be empty and:

```bash
grep -riE "ghp_|api[_-]?key|secret|password" _inbox/ **/*.md 2>/dev/null
```

should turn up nothing beyond this skill's own instructional text about
secrets.
