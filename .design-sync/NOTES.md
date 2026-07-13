# design-sync NOTES

## Scope

This repo (`yaven`) is a Next.js marketing site, not a component library — most of
`src/components/` is one-off, copy-specific page sections (hero, FAQ, footer,
proposals-crm, etc.), not general-purpose reusable primitives. The user
explicitly scoped this sync to the 8 reusable visual effects only:
GlassCard, GlassPanel, LiquidGradientBg, NumberTicker, ScrollCutReveal,
Typewriter, AnimatedHeadline, IconTooltip. Do not widen the sync to the page
sections without asking again — they're not building blocks a design agent
should compose with.

## No dist / no Storybook — synth-entry via `cfg.entry`

The repo has no build step producing a library `dist/` and no Storybook.
`.design-sync/config.json` points `entry` at a hand-written
`.design-sync/synth-entry.tsx` that named-re-exports exactly the 8 scoped
components from their real source paths (also pinned via
`componentSrcMap`). This keeps the bundle's synth-entry scan from pulling in
the rest of `src/` (app router pages, server components, etc., which would
not bundle as a browser IIFE anyway).

## CSS: hand-curated `cssEntry`, not the Next.js build output

`src/app/globals.css` starts with `@import "tailwindcss"` — a build-time
Tailwind v4 import the static `styles.css` closure can't resolve. Rather
than depending on a `next build` output (which changes hash paths every
build and pulls in the whole site's utility classes),
`.design-sync/effects.css` is a hand-curated file containing the *verbatim*
CSS rules the 8 scoped components actually use (`.glass-card`, `.glass-wrap`,
`.glass-btn` family, the two `@keyframes`, and the relevant `:root` tokens)
copied from `globals.css`, plus local `@font-face` rules for Satoshi (the
only brand font these components touch — Bricolage/Google Fonts isn't used
by any of them). Font files are staged at `.design-sync/fonts/` (copied from
`public/fonts/satoshi/`).

**Re-sync risk**: if `globals.css`'s `.glass-*` rules change, `effects.css`
will silently drift out of sync since nothing re-derives it automatically.
Diff `effects.css` against the relevant rules in `globals.css` on re-sync.

## Known render warns

- **ScrollCutReveal, AnimatedHeadline — isolated grading-capture races the
  GSAP reveal tween and screenshots blank.** Both components reveal via a
  GSAP tween (~1s, ScrollTrigger- or custom-event-driven) that needs at
  least one browser tick to progress. The full render-check
  (`package-validate.mjs`, `components/*/<Name>/<Name>.html` — the artifact
  that actually ships) renders correctly with real visible text, confirmed
  both in `.render-check.json`/screenshots and a manual Playwright check
  with an explicit wait. The **isolated per-story grading capture**
  (`package-capture.mjs`, `?story=Default`) takes its screenshot before the
  effect/tween has had a tick to run, and shows blank regardless of preview
  code (tried: forcing `gsap.globalTimeline` tween progress to 1, and
  speeding up `gsap.globalTimeline.timeScale(1000)` before mount — neither
  helped, because the bottleneck is zero elapsed browser ticks, not tween
  duration). Both components are graded `good` in
  `.design-sync/.cache/review/*.grade.json` based on the authoritative
  render-check screenshot, with a note explaining why. **On re-sync**: if
  these show blank again in the review sheet, this is expected — don't
  chase it, and re-verify against the render-check screenshot before
  re-grading.
- **IconTooltip — tooltip bubble not capturable statically.** It only
  renders on hover/focus (internal component state); the preview shows the
  icon it wraps, which is the correct floor for a hover-only affordance.

## Brand additions for decks/posters (user-requested)

The user designs decks and posters with this DS, so it carries more than the
8 site components:

- **`YavenLogo`** (`components/brand/`) — a DS-only component at
  `.design-sync/brand/yaven-logo.tsx` (not in `src/`; the site renders the
  raw `<Image src="/yaven-logo.webp">` instead). It inlines
  `public/yaven-logo.webp` as a base64 data URI. **If the logo asset
  changes, regenerate the data URI** from that file. It lives under
  `brand/` because the component's parent dir names its group; the
  `docsMap` stub at `.design-sync/brand/yaven-logo.md` also pins
  `category: brand`.
- **Bricolage Grotesque + Space Mono** load via a Google Fonts `@import` at
  the top of `effects.css` (same source/weights as `layout.tsx`'s
  `next/font` setup). Validate flags this as `[FONT_REMOTE]` —
  informational, expected, in the known-warns list below.
- **Fluid type-scale tokens** (`--fs-*`) copied verbatim from `globals.css`
  into `effects.css` — same drift risk as the rest of that file.

## Re-sync risks

- `effects.css` is hand-maintained, not generated — see CSS section above.
- The synth-entry (`.design-sync/synth-entry.tsx`) and `componentSrcMap`
  must be updated together if any of the 8 components move or get renamed.
- If the user later wants to widen scope to more components (or the page
  sections), revisit the CSS curation approach — a hand-curated file won't
  scale past a handful of components; consider running `next build` and
  pointing `cssEntry` at the compiled output instead (accepting the whole
  site's CSS ships, and font paths need rewriting from `.next/static/media/`
  hashes into `fonts/`).
