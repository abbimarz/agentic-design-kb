# CLAUDE.md — Length & Splitting

## Recommended length

| Length | Verdict |
|---|---|
| 40–80 lines | Ideal. Sharp, tested, failure-driven rules. |
| 80–150 lines | OK if well-structured — use headers, keep each rule to 1–2 lines. |
| 150+ lines | Split or cut. Compliance drops — Claude starts ignoring rules. Instruction-following decays roughly linearly with rule count on mid-tier models. |

**Think brand one-pager, not brand book.** The one-pager gets followed. The
book gets ignored.

## When it gets long — split it

Turn CLAUDE.md into a hub that links out to detail files instead of
containing everything:

```
CLAUDE.md (the hub)
├── "See brand-guidelines.md for full color specs"
├── "See component-rules.md for usage patterns"
└── "See tone-of-voice.md for writing rules"
```

Claude reads CLAUDE.md every time. It reads the linked files **only when
relevant** to the current task — so splitting doesn't just help human
readability, it keeps the baseline context window smaller too.

This is the same pattern behind larger AI-native design systems — see
[../../applications/design/ai-native-design-system-example.md](../../applications/design/ai-native-design-system-example.md)
for a real example with an 8-file read order.
