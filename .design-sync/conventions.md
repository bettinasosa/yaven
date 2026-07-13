## Yaven effects — conventions

This is a small set of visual effects lifted from Yaven's marketing site, not
a full component library. No provider or root wrapper is required — every
component works standalone. Import `styles.css` (already wired for you) for
the glass/gradient/reveal visuals to render correctly; without it these
components render as unstyled text and gradients.

### Styling idiom: plain `style` props + a few fixed effect classes

There is no utility-class system here. Compose these components the way the
source site does:

- Pass layout, color, and typography via the standard `style` prop (or
  `className` to hook into your own layout). `GlassCard`, `GlassPanel`, and
  the text-reveal components all forward `style`/`className` to their root.
- The "liquid glass" look itself comes from fixed internal classes
  (`glass-card`, `glass-wrap`, `glass-btn`) baked into `GlassCard` and
  `GlassPanel` — don't try to recreate the glass sheen/border with your own
  CSS; use the component as-is and only style the content you put inside it.
- Text color for content placed on the cream background should use the
  `--ink` token, not black — it's a dark blue (`#07348b`), not pure black.

### Typography: three families, fixed roles

- **Body/UI**: `var(--font-dm-sans)` → Satoshi (shipped as woff2). Already
  applied to `body`; weights 300/400/500/700.
- **Headings/display**: `var(--font-heading)` → Bricolage Grotesque (loaded
  from Google Fonts; weights 400–700). Use for section headings, deck
  titles, poster display type.
- **Mono accents**: `var(--font-mono)` → Space Mono (Google Fonts, 400/700).
  Used for labels, eyebrows, numbers.

Fluid type-scale tokens (use these instead of hardcoded sizes):
`--fs-display` (36–72px, section/deck headings), `--fs-title` (24–38px,
sub-headings), `--fs-body-lg` (16–22px), `--fs-body` (15–19px),
`--fs-body-sm` (13–15px).

### Brand mark

`YavenLogo` renders the 3D prism mark (cream/rainbow/navy, transparent
background — self-contained, no asset URL needed). Prop `height` (number px
or CSS length) scales it; width follows automatically. It sits well on both
the cream and primary-blue backgrounds.

### Design tokens (real custom properties, defined in `styles.css`)

| Token | Value | Use |
|---|---|---|
| `--ink` | `#07348b` | Body text color on light/cream backgrounds |
| `--primary` | `#267fe5` | Brand blue — buttons, accents, `GlassPanel` backdrops |
| `--cream` | `#f5f1e4` | Light background `GlassCard` is designed to sit on |
| `--secondary` | `#df4f3e` | Secondary accent (warm red) |
| `--accent` | `#ebc1ff` | Tertiary accent (lavender) |
| `--font-dm-sans` | `"Satoshi", sans-serif` | The brand sans font; already applied to `body` |

### Where the truth lives

- `styles.css` → `@import`s `fonts/fonts.css` (Satoshi `@font-face`s) and
  `_ds_bundle.css` (the tokens + `.glass-*` rules above) — read this before
  styling anything by hand.
- Each component's own `.prompt.md` under `components/<group>/<Name>/` has
  its exact prop API and real usage examples ported from the source site.

### Idiomatic build snippet

```tsx
<div style={{ background: "var(--cream)", padding: 40 }}>
  <GlassCard borderRadius="20px" style={{ width: 260 }}>
    <div style={{ padding: "20px 24px", color: "var(--ink)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.35, textTransform: "uppercase" }}>
        Proposal sent
      </div>
      <div style={{ fontSize: 15, fontWeight: 500, opacity: 0.8 }}>
        Acme Co. — website redesign, $8,400
      </div>
    </div>
  </GlassCard>
</div>
```
