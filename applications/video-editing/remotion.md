# Remotion

Programmatic, React-based video creation. Good fit for template-driven short
video content (social clips, brand animations, product loops) where you want
many variants of a small set of templates rather than hand-editing each one.

## Install

```bash
npx create-video@latest
```

## Project structure

- **`src/Root.tsx`** — single registration point. Every video is declared as
  its own `<Composition id=... component=... durationInFrames= fps= width=
  height= />` inside one `RemotionRoot` component. The `id` is what you pass
  to the render command. Register each new video idea as its own named
  Composition rather than parameterizing one giant component — each can then
  be scrubbed/rendered independently.
- **`src/index.ts`** — entry file, just calls `registerRoot(RemotionRoot)`.
- **One folder per composition** (e.g. `src/StudioIntro/`,
  `src/ProductLoop/`), each containing:
  - The composition component itself.
  - `paths.ts` — extracted SVG path/geometry constants, kept separate from
    animation logic (see "Reference-SVG workflow" below).
  - Small subcomponents where useful (e.g. a reusable grain overlay used by
    one composition, kept in its own file so it can be dropped into others).
- **Parametrized compositions**: define a `zod` schema (`z.object({...})`,
  using `zColor()` from `@remotion/zod-types` for color props), pass it as
  `schema=` on `<Composition>` along with `defaultProps`, type the component
  as `React.FC<z.infer<typeof schema>>`. This is the path from "one
  template" to "many variants" via CLI `--props` overrides, instead of
  duplicating the component per variant.

## Config

`remotion.config.ts` — common choices:
```ts
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);        // re-renders overwrite instead of erroring
Config.overrideWebpackConfig(enableTailwind); // if styling with Tailwind utility classes
```

## Render/export workflow

```bash
npx remotion studio                          # live preview (dev script)
npx remotion render <entry> <id> out/<name>.mp4   # full render
npx remotion still <entry> <id> out/frame.png --frame=N  # single-frame still
```

- Output convention: `out/<composition-name>.mp4`. Gitignore `out/` —
  it's a render/scratch directory, not source. Keep `public/` (source
  assets referenced via `staticFile()`) committed.
- **Pick canvas dimensions per target platform**: `1920x1080` landscape,
  `1080x1920` vertical (TikTok/Reels/Stories), `1080x1440` portrait — set
  per-Composition in `Root.tsx`, not globally.

## Brief-to-video workflow

The actual end-to-end process observed going from a design brief to a
finished render:

1. **Upload reference material** — e.g. a sequence of storyboard-style SVG
   keyframes (`frame-0.svg` … `frame-4.svg`) representing key animation
   states. Treat these as `tmp/` until confirmed reusable, then promote to
   `references/` (see
   [small-business-scaffold.md](../business-ops/small-business-scaffold.md)).
2. **Infer the choreography** — read the raw path/coordinate data across
   frames and infer what's actually changing between them (position,
   color offsets, rest-state geometry) rather than asking the user to
   spell out every timing detail.
3. **Plan before implementing** — for anything non-trivial, use Plan mode:
   write out the phase-by-phase animation approach, confirm ambiguous
   decisions interactively, and list exactly which files will be
   created/modified before touching code. See
   [../../foundations/permission-modes.md](../../foundations/permission-modes.md).
4. **Implement in order**: extract geometry into `paths.ts` → write the
   component (animation logic) → register the `<Composition>` in
   `Root.tsx` → typecheck (`npx tsc --noEmit`).
5. **Visual QA on stills before a full render** — render individual PNG
   stills at each animation phase boundary (`remotion still ... --frame=N`),
   then actually look at those stills to confirm framing/timing/color,
   *before* rendering the full video. This generalizes beyond Remotion —
   see the pattern note in
   [../../use-case-ideas.md](../../use-case-ideas.md#cheap-artifact-before-full-run).
6. **Iterate on feedback by editing constants** (durations, offsets) in the
   existing component and re-rendering — not rebuilding from scratch.
7. **Deliver by copying**, not moving, the final `.mp4` from the Remotion
   project's `out/` into the destination project's `assets/video/` — keeps
   the Remotion project's own render history intact.

## Reference-SVG workflow (`paths.ts`)

When a designer hands off reference SVGs (brand marks, storyboard frames):
copy the `d` path data **verbatim** into `paths.ts` constants — no
approximating or redrawing geometry — stored without a fill, decoupled from
rendering. Colors and transforms are then applied in the component. This
"extract exact geometry, animate separately" split lets you turn static
brand SVGs into motion graphics without redrawing them by hand.

See [remotion-animation-techniques.md](remotion-animation-techniques.md) for
the specific animation techniques (phased timelines, seamless loops, mask
wipes) used on top of this structure.

This whole pattern is operationalized as a personal Claude Skill
(`~/.claude/skills/remotion-video/`, not part of this repo — see
[foundations/claude-skills/](../../foundations/claude-skills/skill-architecture.md))
so "use the remotion skill" resolves directly instead of relying on Claude
searching the filesystem for a sibling project.
