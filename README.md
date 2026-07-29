# Agentic Design Knowledge Base

Personal reference for working with Claude (and agentic tools generally)
across design and beyond. Built from course/video notes, generalized so it's
useful regardless of which company or project you're at.

## Map

- **[glossary.md](glossary.md)** — flat term list (git/GitHub, MCP, Skills).
  Add a term any time you look one up twice.
- **[foundations/](foundations/)** — domain-agnostic mechanics of working
  with Claude: environment setup, git/GitHub, permission modes, connecting
  tools (MCP/CLI/API), writing CLAUDE.md files, building Skills. Stable —
  rarely needs new top-level files.
- **[skills-catalog/](skills-catalog/)** — skills worth knowing about,
  organized by discipline (visual design, product design, design systems,
  research & analysis). Grows as you learn about or build new skills.
- **[applications/](applications/)** — one subfolder per domain you're
  applying agentic workflows to (design, video-editing, business-ops, and
  more as they come up — marketing, 3D modeling, 3D printing, etc.). **This
  is the axis meant to keep expanding** — see
  [applications/README.md](applications/README.md) for the template.
- **[use-case-ideas.md](use-case-ideas.md)** — cross-domain workflow ideas
  not yet tied to a specific domain or built out.
- **[_inbox/](_inbox/)** — landing zone for new raw notes/screenshots before
  they're triaged into the structure above.

## How this stays scalable

Three things grow independently, on purpose:

| Grows when... | Goes in |
|---|---|
| You learn a new mechanic of working with Claude itself | `foundations/` |
| You learn about or build a new skill | `skills-catalog/<discipline>.md` |
| You apply agentic workflows to a domain you haven't before | `applications/<new-domain>/` |

Don't force a new note into an existing category if it doesn't fit — add a
new file (or, for a genuinely new application domain, a new folder) instead
of stretching an existing one.

## Adding new notes (the triage workflow)

1. Drop raw notes/screenshots into `_inbox/` as you take them — no
   organizing required at capture time.
2. Periodically (or immediately, if it's quick) triage each item:
   - Strip anything employer/project-specific (real names, internal repo
     URLs, tokens, work emails) — keep only the generalizable pattern.
   - **Never let a real secret (API key, token, password) make it past
     `_inbox/`** — if a note has one, redact it before moving the note
     anywhere.
   - File it under `foundations/`, `skills-catalog/`, or `applications/`
     per the table above.
   - Delete the item from `_inbox/` once it's been triaged — `_inbox/`
     should stay empty most of the time, not become a second archive.
3. If a note doesn't fit any existing file, create a new one rather than
   appending unrelated content to an existing file — small, well-scoped
   files stay useful longer than one file that tries to cover everything
   (same reasoning as CLAUDE.md length — see
   [foundations/claude-md-authoring/length-and-splitting.md](foundations/claude-md-authoring/length-and-splitting.md)).
