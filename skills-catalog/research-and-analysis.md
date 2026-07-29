# Skills Catalog — Research & Analysis

Discovery-shaped skills: point them at a set of companies/sites/documents and
get back a structured report. These generally follow the "script drives, AI
judges" split described in
[../foundations/claude-skills/creating-skills.md](../foundations/claude-skills/creating-skills.md).

### Competitor Pipeline Research
Searches a set of companies in a competitive space, analyzes their funnel,
screenshots each, and produces a report. Full worked example:
[../foundations/claude-skills/skill-example-competitor-research.md](../foundations/claude-skills/skill-example-competitor-research.md).

### Colorthief
Given an industry or a specific list of companies, visits each site and
returns its color scheme (primary/secondary/tertiary/CTA) as hex codes, plus
a homepage screenshot for proportion/context. Output as a report `.md` file.
Good first skill to build from scratch — see the build recipe in
[../foundations/claude-skills/creating-skills.md](../foundations/claude-skills/creating-skills.md).
Use Playwright CLI rather than a generic browser MCP for this — faster and
more consistent for repeated page walks.

### Other research-shaped skills worth building (not yet built out)
- **Review-miner** — mine product reviews for recurring themes
- **Tone-scrape** — extract a brand's voice/tone patterns from its content
- **Heuristic-audit** — run a UX heuristic evaluation against a site/app
- **Business Model Mapper** — extract a company's business model structure
- **Strategy Analyser** — summarize/compare competitive strategy
- **Jobs-to-be-done Mapper** — extract JTBD framing from research material
- **Survey-to-persona** — turn raw survey responses into persona summaries
