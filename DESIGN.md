# yaven design system

What the live site (`src/app/page.tsx` → `CrowdPage`) and the investor deck actually use today. Values come from the code, with file references so you can check them. Paths are under `src/app/studio/` unless written in full.

Two rules from `AGENTS.md` apply everywhere:
- **yaven** is always lowercase in anything a person sees.
- No decorative tags, badges, eyebrows or kickers on heroes and sections. Functional product UI labels are fine.

---

## 1. Colour

### Brand accents

| Name | Hex | Token | Use |
|---|---|---|---|
| yaven purple | `#EBC1FF` | `--yaven-purple` | The hero colour. Primary CTAs, selected states, the ⌥ key, deck cards, footer reveal |
| Blue | `#267FE5` | `--primary` / `--primary-blue` | Hover fill on buttons, focus outlines, status dots, link hovers |
| Red | `#DF4F3E` | `--red` | Small signals, the third footer hover colour, shader palettes |

`--secondary` and `--accent` belong to shadcn (neutral greys). For brand colour, always use `--yaven-purple`, `--primary` and `--red`.

### Neutrals

| Role | Value | Where |
|---|---|---|
| Page background | `#FFFFFF` | Every home page section |
| Deck background | `#FBFBF9` | Investor deck slides |
| Ink | `#141412` | `--ink`, `--foreground`. Headings in the home page modules use `#191919`, which is visually the same. There is no navy |
| Body grey | `#60616A` | Section body text |
| Muted grey | `#505767` | Card copy, deck subtitles and footers |
| Hero body | `#4D4D4D` | `crowd-hero.module.css:7` |
| Mist (card fill in the deck) | `#F4F3F8` | Deck cards, tag pills |
| Hairline | `#DEDEDE` | FAQ dividers, footer pills |
| Dark surface | `#191919` (deck), `#080808` (footer mesh) | Dark cards, footer |
| Text on dark | `#FFFFFF`, secondary `#D9D9E0` | Deck dark cards |

There is no dark mode. Shadcn's `.dark` class exists but nothing applies it.

---

## 2. Type

| Role | Family | Loaded via | Weights |
|---|---|---|---|
| Headings, numbers, wordmark | **Bricolage Grotesque** | `next/font/google`, `--font-bricolage` | 500 (headings), 600 (wordmark on cards) |
| Body and UI | **Satoshi** | `next/font/local` from `public/fonts/satoshi/`, `--font-satoshi` | 400 body, 500 UI and labels |

Headings are always Bricolage 500 with tight negative tracking. Use `text-wrap: balance` on hero headings and `pretty` on section headings.

### Site scale

| Element | Size | Line height | Tracking |
|---|---|---|---|
| Hero h1 | `clamp(56px, min(7.2vw, 10svh), 100px)` (mobile `clamp(44px, 12vw, 60px)`) | 1.08 | -0.045em |
| Hero body | `clamp(18px, 1.5vw, 21px)` | 1.45 | 0 |
| Section h2 | `clamp(40px, 4.5vw, 64px)` | 1.06 | -0.05em |
| Section body | `clamp(17px, 1.4vw, 20px)` | 1.6 | 0 |
| Card h3 | `clamp(22px, 1.85vw, 29px)` | 1.08 | -0.045em |
| Card body | `clamp(14px, 1.02vw, 16px)` | 1.5 | 0 |
| Nav / header | 15px (mobile 13px) | | |
| Header wordmark | 28px, weight 500 | 1 | -0.075em |
| Footer wordmark | `clamp(130px, 31vw, 600px)` | 1 | -0.09em |

### Deck scale (slides are 1920×1080)

| Element | Size |
|---|---|
| Slide title | 72 to 80px, tracking about -0.035em, line height 1.05 |
| Subtitle | 30px Satoshi, `#505767` |
| Big stat | 130 to 150px Bricolage, tracking about -0.05em |
| Card heading | 34 to 40px Bricolage |
| Card body | 25 to 30px Satoshi |
| Section tag pill and footer | 22px |

---

## 3. Buttons

Every button is a **pill** (`border-radius: 999px`). The one exception is the small work-row button, which uses 14px.

### The fill animation (FillButton)

Source: `src/components/ui/fill-button.module.css`. This is the signature interaction.

- A `::before` blob (`inset: -70% -10%; border-radius: 50%`) sits below the button at `translateY(105%)`.
- On hover or keyboard focus it rises to `translateY(0)` over **450ms `cubic-bezier(.23,1,.32,1)`**, and the text colour flips.
- The fill colour is `var(--button-fill, #267FE5)` and the text colour is `var(--button-fill-text, #fff)`.
- The arrow icon nudges `translate(3px, -3px)` over 250ms.
- Pressed: `scale(.98)`.
- Focus: `outline: 2px solid #267FE5; outline-offset: 4px`.
- Hover only applies under `(hover: hover) and (pointer: fine)`.

So the default is a purple pill that fills blue from below, with the text turning white.

### Sizes

| Button | Height | Padding | Font | Colours |
|---|---|---|---|---|
| Primary (`.primary`) | min 86px, min-width 350px | 24px 32px | 24px, -0.035em | Purple fill, `#191919` text, blue hover fill |
| Hero "Get started" | 68px (62px at ≤480px) | 20px 30px | 20px | Primary |
| Header "Talk to us" | 44px | 10px 18px | 15px | Transparent; hover fills purple, text stays `#191919` |
| Contact "Work with yaven" | 200px (132px at ≤800px), max-width 440px | 32px | `clamp(30px, 2.8vw, 40px)` | Purple |
| Footer pills | 44px | 13px 18px | 13px | `1px solid #DEDEDE` border; hover cycles blue, purple, red |
| Small action | 42 to 44px | 11px 17px | 12 to 14px | Purple; hover blue with white text, 180ms |
| Icon / send | 44px circle | | | Purple; hover `scale(1.04)`, pressed `scale(.96)`, 160ms |
| Mobile nav arrows | 48px circle | | | White, `1px solid #E4E0E9` |

The header CTA sits on a frosted chip: `rgb(255 255 255 / .92)` with `backdrop-filter: blur(12px)`.

### Tabs

- Track: `background: #DCE3ED40; border: 1px solid #FFFFFFC9`.
- Selected tab: purple, with `box-shadow: inset 0 1px 1px #fff, 0 3px 8px -5px #283B6133`.
- Transition: 160ms ease.

### The ⌥ keycap

Source: `agency-keyboard.module.css`.

- Key: radius 10px, base `#B7B8BD`, shadow `0 2px 1px #64666A70, 0 4px 5px #44464E25`.
- Face: purple, radius 9px.
- Press: `translateY(2px)` over 140ms `cubic-bezier(.23,1,.32,1)`.

---

## 4. Cards, glass and washes

### Radii

| Element | Radius |
|---|---|
| Showcase deck cards | 48 to 56px (32px on mobile) |
| Deck slide cards | 36px |
| Glass windows and dialogs | 26 to 30px |
| Inner panels and message bubbles | 22 to 23px. Bubbles have one 6px "tail" corner, e.g. `22px 22px 6px 22px` |
| Document tiles | 18px |
| Footer details panel | `0 0 32px 32px` |

### The wash (deck cards on the site)

Source: `crowd-deck.tsx`, `omega/shader-showcase.tsx`.

1. **Base:** a purple card with shadow `0 24px 50px -36px #19191965`.
2. **Shader:** `@paper-design/shaders-react` `MeshGradient` with `distortion .9, swirl .7, speed .98`. Speed drops to 0 when the card is off-screen or reduced motion is on. Palettes:
   - `#EBC1FF, #267FE5, #EBC1FF, #FFFFFF`
   - `#DF4F3E, #EBC1FF, #267FE5, #FFFFFF`
   - `#267FE5, #FFFFFF, #EBC1FF, #FFFFFF`
3. **Sheen:** `::before` with `linear-gradient(135deg, #ffffff1a, transparent 60%)`.
4. **Grain:** `::after` with an SVG `feTurbulence` (fractalNoise, baseFrequency .85, 3 octaves) at **opacity .025**.

Stacked cards sit behind the front card, each offset `y: depth × 22px` and scaled `1 − depth × .045`.

### Frosted glass panels

| Panel | Background | Blur | Shadow |
|---|---|---|---|
| Card panel (`crowd-cases.module.css:12`) | `linear-gradient(145deg, #ffffffd9, #ffffffab)` | `blur(22px) saturate(1.15)` | `inset 0 1px 1px #fffffff0, inset 0 -1px 1px #ffffff66, 0 16px 44px -28px #182e5550` |
| Message bubble | `linear-gradient(135deg, #ffffffe0, #ffffffa8)` | | `inset 0 1px 1px #fff, 0 12px 30px -26px #122c6660` |
| Memory window | `linear-gradient(145deg, #f7f8fbe8, #eeeef6a8)` | `blur(28px)` | `inset 0 2px 2px #fff, 0 0 0 1px #e8e8ef, 0 18px 50px -32px #34446538` |
| Ask dialog (`GlassCard`) | `linear-gradient(155deg, #ffffffed, #f2f5fbe8 52%, #eaeef9e3)` | `blur(44px) saturate(1.55)` | Inset white highlights, plus `0 20px 65px -25px #283b6152` |

The memory window also has a 1px white border.

The pattern behind all of them: a white gradient at 65 to 95% alpha, a 1px inset white highlight on top, and a long soft shadow tinted navy (not grey) with a negative spread.

`GlassCard` (`src/components/effects/glass-card.tsx`) adds three more layers:
- a 1.5px conic-gradient border
- a sweeping diagonal shine
- a pointer-following radial highlight (`radial-gradient(400px circle at x y, rgba(255,255,255,.5) …)`)

Every glass panel needs a fallback under `prefers-reduced-transparency`: a solid `#F5F5FA` or `#fffffff0` with no blur.

### Film grain

`globals.css:877-888` sets a fixed `body::after` overlay:
- SVG noise, `baseFrequency .78`, 4 octaves, tiled at 200px
- **opacity .07**
- animated at 0.35s `steps(1)`

---

## 5. Illustration and stickers

### Open Peeps crowd

The file is `public/artwork/open-peeps-crowd.png`, a sprite sheet of 15 × 7 figures.

- **Hero:** a canvas crowd walks in from both sides.
  - Figures are 128px wide (96px on mobile), scaled `random(.76, 1.18)`.
  - They bob 2 to 4px as they walk.
- **Statement section:** sprites wander along a lane for 25 to 36s.
  - Each step rotates ±0.7deg and lifts 4px.
  - They only animate while in view.
- Credit "Illustrations by Open Peeps" in the footer.

### Hand-drawn arrow

- An SVG stroke, `#191919`, 2.5px, round caps.
- It draws in over 650ms `cubic-bezier(.23,1,.32,1)`.

### Stickers (deck only, not on the site yet)

The deck uses illustrated stickers: an arrow, a rocket and a "Good people" speech bubble.

- Place them top right, at 120 to 150px wide.
- Tilt them 6 to 14deg (or −6deg).
- Shadow: `drop-shadow(0 10px 18px rgba(25, 25, 25, .16))`.
- Use at most one per slide.

### Custom cursor

An arrow with fill `#141412` and a 1.6px white stroke.

---

## 6. Motion

**Stack:**
- `gsap` with ScrollTrigger
- `lenis` smooth scroll (`lerp .16`, driven by the GSAP ticker)
- `@paper-design/shaders-react`
- No framer-motion

**House curve:** `cubic-bezier(.23,1,.32,1)` (ease-out-quint) for anything that moves. Plain `ease` for 140 to 220ms micro-states.

| Interaction | Spec |
|---|---|
| Button fill | 450ms house curve |
| Colour or background swaps | 160 to 220ms ease |
| Press | `scale(.97 to .98)` |
| Lift on hover (tiles) | `translateY(-3px)`, 180ms |
| Text link underline | `background-size 0% → 100% 1px`, 220ms, underline colour `#BEBBC4` |
| FAQ "+" | rotates 45deg, 180ms |
| Hero entrance | heading `y 24 → 0`, opacity, .8s `power3.out`; copy follows at .35s |
| Hero scroll-out | scale .965, `y -36`, clips to `inset(0 round 128px)` |
| Sticky case deck | 460svh track, scrubbed; card swap .92s `power1.inOut` |
| Content arriving | `translateY(9 to 12px) → 0`, 200 to 260ms house curve |
| Floating glass | `translateY(-5px)`, 6s ease-in-out loop |

**Reduced motion** is required on everything:
- GSAP lives inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.
- Lenis is skipped.
- Shaders stop.
- The crowd renders static.
- `.page *` drops transitions.

---

## 7. Layout

- **Content width:** 1240px, via `padding-inline: max(24px, calc((100% - 1240px) / 2))`. The wide showcase area is 1660px.
- **Mobile gutter:** 24px. The header uses `clamp(24px, 4vw, 64px)`.
- **Sections:** mostly `min-height: 100svh`, with vertical padding of `clamp(64px, 10svh, 112px)`.
- **Two-column sections:** `gap: clamp(40px, 7vw, 104px)`, collapsing to one column at ≤800px.
- **Text measure:** body about 42ch, hero h1 about 18ch.
- **Deck:** 128px side margins, section tag pill at top left (`left: 128px; top: 40px`), page number at bottom right.

---

## 8. Logo

- **Mark:** `public/yaven-agency-mark.png`, cropped in CSS by `_shared/yaven-mark.tsx`. It is 32px wide by default and 18px in the header.
- **Wordmark:** live text, "yaven" in Bricolage, always lowercase.
  - Header: 28px, weight 500, -0.075em, 8px gap after the mark.
  - On cards: weight 600, -0.07em.

## 9. Icons

Use **lucide-react** at default stroke, sizes 14 to 40. The site uses ArrowUpRight, ArrowLeft, ArrowRight, Check, ChevronRight, FileText, Layers, Mail, Presentation, BriefcaseBusiness, X, LockKeyhole and Pencil.

Some glyphs are plain Unicode: ↗, ↑, ×, + and ⌥.

---

## 10. Legacy, kept on purpose

- **Old-site styles:** `.glass-btn`, `.btn-press`, `--cream #F5F1E4` and the `--fs-*` type tokens. The home page doesn't use them, but the blueprint flow and the older `components/sections/*` still do. Don't use them in new work. Delete them once those pages go.
- **Breakpoints:** CSS can't use custom properties inside media queries, so there are no breakpoint tokens. For new work, stick to **480, 800 and 960px**. Existing modules also use 360, 600, 700, 900, 1000, 1050 and 1190px.
