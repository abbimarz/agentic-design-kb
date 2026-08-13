# Instructions for working in this repo

This repo has two objectives. Both apply whenever you're working inside
`knowledge-base/`.

## Objective 1 — capture and file

This is a hub for everything the user learns about agentic design.

- Raw notes/screenshots (course notes, exports, etc.) land in `_inbox/`
  first — no organizing required at capture time.
- From there they get translated into the existing structure
  (`foundations/`, `skills-catalog/`, `applications/`, `glossary.md`,
  `use-case-ideas.md`) per the table in `README.md`. Each piece of
  information goes where it matters — don't dump unrelated notes into one
  file.
- The `.claude/skills/inbox-triage/SKILL.md` skill automates this: strips
  employer/project-specific details and secrets, files each item per
  `README.md`'s table, and empties `_inbox/` when done. Trigger it with
  "triage the inbox" or similar.
- Hyperlinking between files is expected and encouraged — a skill entry
  can point to a worked example in `applications/`, a term in
  `glossary.md`, or a foundations doc, and vice versa. Cross-reference
  rather than duplicate content.

## Objective 2 — consulting

Anyone with access to this repo should be able to ask Claude questions
about its contents and get an answer sourced from it.

- Answer from what's actually in the repo — search it, don't rely on
  general knowledge, before answering a question about "what skills do I
  have for X" or "how do I set up Y."
- Every answer sourced from the KB should link to the specific file (and
  section, if it's a long file) it came from, so the user can verify or
  expand from there.
- It's fine to go beyond what's in the KB if the answer calls for it —
  but say so explicitly ("this isn't in the knowledge base yet") and ask
  if the user wants it added. Don't silently blend KB content with
  outside knowledge as if both came from the repo.
