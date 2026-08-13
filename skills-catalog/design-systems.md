# Skills Catalog — Design Systems

Skills for building or governing a design system rather than a single
surface.

### [Brand Guidelines (Anthropic template)](https://mcpservers.org/agent-skills/anthropic/brand-guidelines)
Anthropic's own brand guidelines used as a starting template — ask Claude to
swap the contents for your own project's brand and reuse the structure.

### [UI/UX Pro Max](https://ui-ux-pro-max-skill.nextlevelbuilder.io/)
A design-intelligence database: catalog of UI styles, color palettes, font
pairings, chart types, and tech stacks (Vue, React, etc.). Useful as a
reference for good practices while building your own brand's design system,
not just for generating one from scratch. Install: `npx skills add
https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`. Note: reference the
specific UI style explicitly when using it on a project — otherwise Claude
will pull instructions from every `.md` file it can find, not just this one.

### [Shadcn](https://ui.shadcn.com/docs/skills)
Comes preloaded with shadcn's own design system rules — useful when a
project is already using shadcn as its component base.

## Related concept: AI-native design systems

Not a single skill, but a pattern worth knowing about — see
[../applications/design/ai-native-design-system-example.md](../applications/design/ai-native-design-system-example.md)
for a worked example (governance principles, token files, per-component
`.md` + `.html` pairs, a validator script).
