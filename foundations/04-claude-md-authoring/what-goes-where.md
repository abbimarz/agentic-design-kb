# CLAUDE.md — What Goes Where

| ✅ Put in CLAUDE.md | ❌ Keep out of CLAUDE.md |
|---|---|
| Brand colors & tokens | Full design specs |
| Typography rules | Detailed component docs |
| Naming conventions | Things a linter can already check |
| Tone of voice (3–5 rules) | Step-by-step tutorials |
| Key do's and don'ts | API keys or passwords |
| File/folder structure | Info Claude can infer from reading your actual files |
| Component library references | Redundant descriptions of code that already exists |
| Spacing system (e.g. 8px grid) | "Nice to have" preferences you haven't actually validated yet |
| Your role / project context | |

The underlying test: **would a linter, or just reading the code, already
tell Claude this?** If yes, it doesn't need to be spelled out in CLAUDE.md —
every line in there competes for attention against everything else in the
file (see [length-and-splitting.md](length-and-splitting.md)).

Secrets are a hard no regardless of length — never put API keys, tokens, or
passwords in CLAUDE.md or any file that could get committed. See
[../connecting-tools.md](../connecting-tools.md) for where those actually
belong.
