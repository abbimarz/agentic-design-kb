# Remotion — Animation Technique Library

A small set of reusable techniques, each observed doing real work across
multiple compositions. All work on top of the structure documented in
[remotion.md](remotion.md).

## Phased timeline with named frame-range constants

For multi-second, multi-part motion, define named `_START`/`_DURATION` frame
constants per phase at the top of the file (e.g. "Phase 1: 0–22 logo drops
in... Phase 2: 22–38 chromatic pulse..."), and compute each phase's progress
via:

```ts
interpolate(frame, [start, start + duration], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.out(Easing.cubic),
});
```

Let phases overlap intentionally (a later phase can start before an earlier
one fully resolves) so it reads as continuous motion instead of hard cuts.
This documentation style also makes multi-second animations legible and easy
to re-tune later — the phase list at the top of the file *is* the animation
spec.

## Seamless loop via a single sine/cosine cycle

For content meant to loop (ambient backgrounds, product loops): drive all
motion off a single full sine/cosine cycle computed from
`t = frame / durationInFrames`:

```ts
const scale = 1 + 0.05 * Math.sin(2 * Math.PI * t);
const panX = 20 * Math.cos(2 * Math.PI * t);
```

Because it's exactly one full cycle, frame 0 and the frame just past the end
match exactly — produces a loop with no visible seam, no manual
frame-matching needed. For multiple elements looping together (e.g. several
background blobs), give each a different phase offset so they don't move in
lockstep.

For a Ken Burns-style pan/zoom on a static image specifically: pre-scale the
image slightly (e.g. `BASE_SCALE = 1.08`) before applying the loop, so
panning never reveals a frame edge.

## Reusable grain/texture overlay

A generic film-grain overlay, droppable into any composition:

```tsx
<svg>
  <filter id="grain">
    <feTurbulence seed={useCurrentFrame()} .../>  {/* re-seeds every frame */}
    <feColorMatrix type="saturate" values="0" />   {/* desaturate */}
  </filter>
  <rect filter="url(#grain)" style={{ mixBlendMode: "overlay" }} />
</svg>
```

Seeding the turbulence with `useCurrentFrame()` makes the noise change every
frame instead of being static. Expose opacity as a prop
(`<Grain opacity={0.15} />`) so it can be tuned per composition.

## Logo/wordmark reveal patterns

- **Staggered per-letter reveal**: fade + blur-to-focus (opacity 0→1, blur
  px→0, slight scale-down) per character, offset in time.
- **Clock wipe**: SVG `<mask>` built from a `describeWedge()` helper — a
  pie-slice path sweeping from angle 0 to `t * 360` degrees — for a radial
  reveal.
- **Filament/line wipe**: left-to-right reveal via a `<clipPath>` whose width
  grows with `interpolate(frame, ...)`.
- **Pen-draw trace**: `stroke-dasharray`/`stroke-dashoffset` animated to
  "draw" a stroke path over time.
- **Motion trail**: render several faded echoes of a moving element at
  `frame - lag` for a few different `lag` values, to fake motion blur
  without a real blur pass.

## Verbatim path extraction from reference SVGs

See [remotion.md](remotion.md#reference-svg-workflow-pathsts) — geometry
extraction is a technique in its own right worth calling out here: never
approximate or redraw a designer's reference SVG by hand. Copy the `d` path
data exactly into `paths.ts`, apply color/transform separately in the
component. Keeps animated output pixel-faithful to the source design.
