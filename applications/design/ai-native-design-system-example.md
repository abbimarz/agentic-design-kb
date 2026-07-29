# Example: AI-Native Design System

Notes from a real CLAUDE.md-driven design system (a digital-tools sub-brand
project), showing what "the design system lives in markdown, code is
generated from it" looks like in practice.

## Core idea

- Markdown/YAML is the "language" the design system is written in — not the
  component code itself.
- The design system folder holds an `.md` file per component *and* an HTML
  file demonstrating that component. The `.md` documents intended behavior;
  the HTML is the working reference.
- The team's job shifts toward **governance**: making sure everyone actually
  uses the system consistently, not just that it exists.
- A `principles.md` captures the spirit/intent of the system — the "why"
  behind the rules, so exceptions can be judged against something.
- CLAUDE.md itself should stay brief and act as a **router**: it tells
  Claude where to go look for the specific context it needs (component
  conventions, tokens, etc.) rather than containing everything itself. See
  [../../foundations/claude-md-authoring/length-and-splitting.md](../../foundations/claude-md-authoring/length-and-splitting.md).
- It's more token-efficient to spend tokens up front getting close to the
  intended style than to vibe-code first and spend time reshaping the UI
  after the fact.

## Example CLAUDE.md read order (a real project's "read these first, in order")

1. `brand/parent-brand.md` — mission, values, voice, tone, visual identity
2. `brand/sub-brand-brief.md` — how this project diverges from the parent brand
3. `governance/principles.md` — the principles that override everything else
4. `governance/decisions.md` — pattern-level decision rules, with counter-examples
5. `tokens/tokens.md` — every design token, with values and rationale
6. `tokens/tokens.css` — the actual CSS custom properties used in code
7. `components/_index.md` — full component inventory, grouped by function
8. `accessibility/a11y-floor.md` — contrast, focus, target size, keyboard, screen reader baseline

Also available on demand (not read up front): per-component `.md` spec +
matching `.html` demo, page-level patterns (`patterns/*.md` — empty state,
error, loading, confirmation, forms, modals), `motion/motion.md`,
`iconography/icons.md`, `governance/contribution.md`,
`governance/exceptions.md` (documented, authoritative escape hatches), and
`validate/rules.md` + `validate/validate.sh` — a script to audit any file or
folder against the system's rules.

## Governing rules (example)

1. **Use existing components.** Check the component index and relevant spec
   before building anything new — don't reinvent what already exists.
2. **Use tokens, not hardcoded values.** Every color, spacing, radius,
   shadow, font, and duration has a token (`var(--token-name)`). Never write
   a raw hex, pixel, or font stack directly.
3. **Parent brand is the default.** Follow it unless the sub-brand brief
   explicitly overrides (tighter type, denser layout, more motion, etc.).
4. **Markdown is the source of truth.** `tokens.md` and each component `.md`
   define the system; CSS and HTML are generated from them. If they
   conflict, the `.md` wins.
5. **Respect the accessibility floor.** Every interactive element needs a
   visible focus state, a 44px touch target, and `prefers-reduced-motion`
   support — no exceptions.
6. **Don't invent tokens.** If a value isn't in `tokens.md`, propose adding
   it rather than inlining a magic number.

## Applying this to an existing (non-AI-native) project

- **Retrofitting a vibe-coded prototype:** share the file/project and ask
  Claude to bring it in line with a specific design system. Works, but
  results are noticeably weaker than starting AI-native.
- **Starting AI-native from scratch (recommended):** reference another
  skill/`.md` that encapsulates the broader spirit of the project — e.g. a
  `goals.md` or business-strategy doc — so component decisions can be judged
  against real intent, not just aesthetics. Any new rule that comes up
  during implementation (e.g. "use a stepper vs. a progress bar," "when to
  use icon buttons") gets added to a running `decisions.md` rather than
  re-litigated next time.
