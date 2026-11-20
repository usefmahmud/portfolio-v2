# Design system — W2

The visual language for the site. Everything here is implemented in
`src/styles.css` (tokens) plus components that read tokens only — no raw hex in
markup, so a future palette swap touches one block.

The brief: a portfolio that reads as **crafted**, not generated. The reference
set and the reasoning behind each choice live in `DESIGN-REFS.md`; this file is
the system that came out of it.

## 1. Direction

One sentence: **a printed page that happens to scroll** — warm paper, one
vermilion accent used like a proof-mark, display serif for scale, grotesk for
reading, mono for anything that is data.

Anti-direction (explicitly rejected): dark "developer" gradient, glassmorphism,
bento grid, floating cards with soft shadows, avatar hero, skill percentage
bars, emoji icons.

## 2. Colour

| Token              | Light     | Dark      | Role                        |
| ------------------ | --------- | --------- | --------------------------- |
| `--canvas`         | `#f1efeb` | `#14120f` | page paper / warm charcoal  |
| `--surface`        | `#f7f5f1` | `#1b1916` | inset panels (spec cards)   |
| `--surface-raised` | `#e9e5dc` | `#232019` | hover fills                 |
| `--line`           | `#d9d3c7` | `#2f2b24` | decorative hairlines        |
| `--line-strong`    | `#c3bcac` | `#443f35` | section rules               |
| `--line-control`   | `#8e8877` | `#6e685b` | control borders (needs 3:1) |
| `--ink`            | `#252526` | `#ede8dc` | body and display text       |
| `--ink-muted`      | `#5a564d` | `#a9a296` | secondary copy              |
| `--ink-faint`      | `#6b665b` | `#948d80` | metadata only               |
| `--accent`         | `#a63a1e` | `#e58a63` | the single accent           |
| `--on-accent`      | `#f7f5f1` | `#14120f` | text on solid accent        |

Measured contrast (WCAG 2.1, sRGB, computed from the hex values above):

| Pair                    | Light | Dark  |
| ----------------------- | ----- | ----- |
| ink / canvas            | 13.34 | 15.29 |
| ink-muted / canvas      | 6.36  | 7.39  |
| ink-faint / canvas      | 4.97  | 5.68  |
| accent / canvas         | 5.63  | 7.25  |
| on-accent / accent      | 5.63  | 9.52  |
| control border / canvas | 3.08  | 3.38  |

All text pairs pass AA (4.5:1); control borders pass 1.4.11 (3:1). The dark
theme is designed separately on a warm charcoal — not an inverted light theme —
because inverting `#252526` on `#f1efeb` produces a cold, blue-shifted result.

Why one accent: the reference research is blunt about this — a portfolio with
three accent colours reads like a template. Vermilion is used only for
punctuation: the role line in the hero, the active nav underline, the status
dot, the row hairline on hover, link underlines.

## 3. Type

| Role    | Family                        | Loading                                |
| ------- | ----------------------------- | -------------------------------------- |
| Display | Instrument Serif 400 + italic | self-hosted, latin subset, 21KB + 22KB |
| Text    | Geist 300–700 (variable)      | self-hosted, latin subset, 29KB        |
| Data    | Geist Mono 400–500 (variable) | self-hosted, latin subset, 23KB        |

Self-hosted rather than a Google Fonts stylesheet: no third-party DNS/TLS hop
on the critical path, no second stylesheet, and the subset is chosen here. The
two faces used above the fold are `<link rel="preload">`ed; all four declare
`font-display: swap` and a latin `unicode-range`.

Scale (all `clamp()`, so there is no breakpoint jump in type size):

| Class        | Size                            | Use                    |
| ------------ | ------------------------------- | ---------------------- |
| `.t-display` | `clamp(3.1rem, 10.6vw, 7.4rem)` | hero, page titles, 404 |
| `.t-title`   | `clamp(2.1rem, 5.6vw, 4.2rem)`  | section headings       |
| `.t-heading` | `clamp(1.6rem, 3vw, 2.3rem)`    | list headings, dialog  |
| `.t-lead`    | `clamp(1.06rem, 1.5vw, 1.3rem)` | standfirst             |
| `.t-body`    | `1rem / 1.68`                   | prose                  |
| `.t-meta`    | `0.6875rem`, `0.16em` tracking  | labels, nav, metadata  |
| `.t-num`     | `0.75rem`, tabular figures      | index numbers          |

Display type is set at `line-height: 0.88` and `letter-spacing: -0.028em`; body
copy is never tracked in. The hero is deliberately **unmasked** — Instrument
Serif's descenders sit outside an 0.88 line box and `overflow: hidden` would cut
the tail off every "y".

## 4. Motion

One vocabulary, one engine:

| Kind               | Implementation                                      |
| ------------------ | --------------------------------------------------- |
| Entrance (hero)    | CSS keyframes, per-character delay via `--i`        |
| Scroll reveals     | GSAP + ScrollTrigger + SplitText (lazy chunk)       |
| Smooth scroll      | Lenis, driven by the GSAP ticker                    |
| Pointer decoration | `CursorDot` (GSAP `quickTo`), `Tilt` (one rAF loop) |
| UI state changes   | CSS transitions, 180–320ms                          |

Tokens: `--ease-expo: cubic-bezier(.16,1,.3,1)`, `--ease-quart`, and durations
0.28 / 0.65 / 1.1s mirrored in `src/lib/motion/timing.ts` so CSS and GSAP cannot
drift apart.

Rules that were followed, not just stated:

- **No animation library in the entry chunk.** GSAP, ScrollTrigger, SplitText
  and Lenis are dynamic imports; they never appear in SSR or the initial JS.
- **Entrance never ships hidden content.** The hero animates from CSS (the H1 is
  the LCP element, so it must paint on the first frame); everything below the
  fold reveals via `gsap.from`, which only sets its start state once it has
  loaded, and it is offscreen when it does. No-JS and reduced-motion visitors
  see a complete page.
- **`prefers-reduced-motion: reduce`**: no Lenis, no split, no cursor follower,
  no tilt, hero animations cancelled. Verified in-browser (`.split-char` count
  0, `window.__lenis` undefined, every block at `opacity: 1`).
- **Only `transform` and `opacity` animate.** No width/height/top/left tweens.
- **One signature moment**: the hero's per-character rise into the name, ending
  on the accent-italic role line. Everything else is quiet so that one moment
  reads as intentional.

## 5. Layout

- `.shell` — `max-width: 90rem`, fluid inline padding
  `clamp(1.25rem, 4.5vw, 4rem)`. Same rhythm on every route.
- 12-column grids on `lg`; work list is a grid row (number / title / tagline /
  year+stack / arrow), not a card grid — cards are the template tell.
- Hairlines (1px `--line`) separate blocks; there are no box shadows anywhere.
- Section numbering `(01) … (04)` gives the page a running order and makes the
  scroll feel authored.

## 6. Accessibility

- Skip link, `main#main-content`, one `h1` per page, no heading-level jumps
  (verified per route: `/` = `1,2,2,3,3,3,3,2,2,2`, others `1,2,2…`).
- Visible focus ring: 2px accent, 3px offset, on every interactive element.
- Targets: all links/buttons ≥ 24×24 (site-wide probe returns none smaller);
  primary controls are 40–44px.
- The custom cursor never hides the native one and is `aria-hidden`,
  `pointer-events: none`.
- The easter-egg panel is a native `<dialog>` (focus trap, Escape, inert
  background), never fires while typing in a field, and its content is real.
- Theme: three-state toggle (light / dark / system) persisted in
  `localStorage`, applied by a pre-paint script so there is no flash.
- Copy is plain language, no "click here" links, no colour-only meaning (status
  is a dot **and** a word).

## 7. Performance budget

| Item                   | Budget  | Measured                         |
| ---------------------- | ------- | -------------------------------- |
| Initial JS (gzip)      | < 180KB | 108KB                            |
| CSS (gzip)             | < 20KB  | 6.7KB                            |
| Fonts (all four files) | < 120KB | 96KB                             |
| Images                 | 0       | 0 (one 72KB `og.png` for social) |
| LCP (local, desktop)   | < 2.0s  | 0.34s                            |
| CLS                    | = 0     | 0                                |

The site ships no photographs, illustrations or video: the type is the layout.
The only raster asset in `public/` is `og.png`, which is never requested by a
page load.

## 8. Self-critique pass (what changed because of it)

Findings from rendering the built site — not from reading the code:

1. **Hero**: descenders were being clipped by a line mask → mask removed.
2. **Work rows**: `2026 / TypeScript + Node.js` wrapped mid-stack in an 8.5rem
   column → column widened to 11rem, year and stack split onto two lines.
3. **Project page**: the spec card and the stack list sat 6px apart because the
   header grid used a 40px gutter and the body grid a 48px one → both 48px, and
   the vertical rule that disconnected at the fold was removed.
4. **Contact CTA**: `Replies within a day · CV and references on request`
   wrapped with a leading middle dot → two lines, right-aligned.
5. **Canonical URL**: the root route's canonical overrode every child route's →
   canonical is now declared per route (and the 404 has none).
6. **Target sizes**: the wordmark, "Selected work" cue and "All projects" link
   were 18–23px tall → minimum 24px.
7. **Motion weight**: the entry chunk was 161KB gzip with Motion in it →
   Motion removed, one engine (GSAP + CSS), entry now ~112KB.
8. **Hero right rail**: "currently / time / counts" read as metadata filler and
   the first screen showed no work → the rail now leads with the most recent
   featured project (name in display serif, year, one line, link to the case
   page), the repo count links to GitHub, and the wordmark lost its duplicated
   "Cairo, Egypt".
