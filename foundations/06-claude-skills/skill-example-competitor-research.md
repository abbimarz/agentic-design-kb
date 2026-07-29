# Worked Example: Competitor Pipeline Research Skill

A discovery-phase skill example — searches a set of companies in a given
competitive space, analyzes their pipeline/funnel, takes screenshots of each,
and builds a report.

```
.claude/skills/competitor-pipeline-research/
├── SKILL.md
├── scripts/
│   └── walk_pipeline.py     # playwright-cli driver, one competitor per invocation
└── references/
    └── pipeline-stages.md   # definition of the 5 stages + what to capture at each
```

- `scripts/walk_pipeline.py` is the **execution** layer — deterministic,
  driven by Playwright CLI, run once per competitor so failures are isolated.
- `references/pipeline-stages.md` is the **knowledge** layer — defines what
  counts as each of the 5 pipeline stages so the AI's judgment calls (what to
  screenshot, what to flag) stay consistent between runs instead of being
  re-decided from scratch every time.

See [skill-architecture.md](skill-architecture.md) for the general folder
anatomy this follows, and [creating-skills.md](creating-skills.md) for the
AI-vs-script split this example is built on.

## Other skill ideas worth building on the same pattern

Discovery/research-shaped skills that follow the same "script drives, AI
judges" split:

- Review-miner
- Tone-scrape
- Heuristic-audit
- Colorthief (see [skills-catalog/research-and-analysis.md](../../skills-catalog/research-and-analysis.md))
- Business model mapper
- Strategy analyser
- Jobs-to-be-done mapper
- Survey-to-persona
