# Pattern: Small-Business Project Scaffold

A folder structure + CLAUDE.md convention for running a small business (or
any ongoing venture) through Claude, seen independently in two separate
projects — strong signal this is a real reusable pattern, not a one-off.

## Folder structure

```
project/
├── CLAUDE.md
├── docs/           # structured planning docs, numbered by category
│   ├── 00-foundations/
│   ├── 01-brand/
│   ├── 02-audience/
│   ├── 03-marketing/
│   ├── 04-legal/
│   └── 05-bizops/
├── references/     # permanent source material — uploaded once, reused
│                    # across many conversations, never deleted
├── assets/         # final deliverables, organized BY TYPE (video/, images/),
│                    # not by campaign or date
└── tmp/            # genuinely disposable, single-use uploads — cleared
                     # after use, never meant to be reused
```

The key distinction is **`references/` vs. `tmp/`**: anything meant to be
reused across sessions (a brand book, a moodboard, style references) goes in
`references/` and stays there permanently. Anything single-use (a one-off
upload just for the current task) goes in `tmp/` and gets cleared. Without
this split, reusable source material tends to silently disappear the next
time `tmp/` gets cleaned up.

`assets/` is organized by output type (`assets/video/`, `assets/images/`)
rather than by campaign/project — makes deliverables discoverable later
without needing to remember which campaign produced them.

**Don't over-engineer this at project start.** One observed instance began
with just a flat `tmp/`-only structure and only migrated to the full
four-tier layout once reuse patterns actually emerged — let Claude propose
the restructure once you notice yourself re-uploading the same reference
material, rather than designing the taxonomy up front.

## CLAUDE.md pattern: route to docs, don't duplicate them

Rather than embedding business facts directly in CLAUDE.md, keep it short
and structural — it points at `docs/` rather than repeating what's in them
(same "hub, not repository" principle as
[../../foundations/claude-md-authoring/length-and-splitting.md](../../foundations/claude-md-authoring/length-and-splitting.md)).
The reusable instruction shape:

1. **Identify the deliverable type** the user is asking for (copy/content,
   visual, strategy, legal, ops/finance).
2. **Read the specific `docs/` files relevant to that type** before
   producing anything — e.g. copy/content → brand-voice + messaging +
   personas; visual → brand-identity + brand-voice; legal → the legal docs,
   and always flag "needs a real lawyer to review."
3. **Ask before assuming** if a relevant doc section is still a placeholder
   (e.g. marked "TBD" / "to be filled in") — don't invent unconfirmed facts
   to fill the gap.
4. **Cite which doc(s) were used** as the basis for the response at the end
   — creates an audit trail and makes it obvious when an answer wasn't
   actually grounded in anything.

This "route to the right doc, don't guess on gaps, cite your sources"
combination generalizes well beyond business scaffolding — it's a solid
default for any CLAUDE.md sitting on top of a folder of reference docs.
