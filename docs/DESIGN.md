# Design system — W3

The visual language for the site. Everything here is implemented in
`src/styles.css` (tokens) plus components that read tokens only — no raw hex in
markup, so a future palette swap touches one block.

The brief: a portfolio that reads as **crafted**, not generated. The reference
set and the reasoning behind each choice live in `DESIGN-REFS.md`; this file is
the system that came out of it.

## 1. Direction

One sentence: **a drafting sheet that happens to scroll** — cool blueprint paper,
graphite ink, a single markup vermilion used like a proof-mark, a didone for
scale, a grotesk for reading and for every label.

Anti-direction (explicitly rejected): dark "developer" gradient, glassmorphism,
bento grid, floating cards with soft shadows, avatar hero, skill percentage
bars, emoji icons, eyebrow labels above headings, pulsing status dots.

W3 was a pass against the Impeccable standard (v4.10.0). It replaced the two
reflex choices of W2 — a cream ground and the display serif every AI-built
portfolio loads — and removed the decorative devices the standard bans outright
(see §9). Nothing structural changed: same routes, same content, same motion
engine.

## 2. Colour

The ground is a **cool, faintly cyan-grey drafting paper** (`#dbe3e4`), not the
warm cream that reads as the "tasteful" default. Text is graphite, not pure
black — pure black on paper looks like a terminal capture. The one saturated
colour is a **markup vermilion** held over from W2: warm accent on a cool ground
is the tension that makes the page feel authored. It is punctuation only — the
role line in the hero, the active nav rule, the status mark, the row hairline on
hover, link underlines — never a large fill.

| Token              | Light     | Dark      | Role                        |
| ------------------ | --------- | --------- | --------------------------- |
| `--canvas`         | `#dbe3e4` | `#0e1315` | page paper / cool graphite  |
| `--surface`        | `#e8eef0` | `#151b1d` | inset panels (spec cards)   |
| `--surface-raised` | `#cdd7d9` | `#1d2426` | hover fills                 |
| `--line`           | `#bfc9cb` | `#283033` | decorative hairlines        |
| `--line-strong`    | `#a2adb0` | `#3c4548` | section rules               |
| `--line-control`   | `#626e71` | `#68747a` | control borders (needs 3:1) |
| `--ink`            | `#11181a` | `#e2e8e9` | body and display text       |
| `--ink-muted`      | `#3f4a4d` | `#98a3a6` | secondary copy              |
| `--ink-faint`      | `#4e595c` | `#859195` | metadata only               |
| `--accent`         | `#a83313` | `#ef8b5f` | the single accent           |
| `--accent-hover`   | `#8a2609` | `#f7a67f` | accent on hover             |
| `--accent-soft`    | `#e9d9d3` | `#2a211c` | accent tint                 |
| `--on-accent`      | `#eef2f3` | `#0e1315` | text on solid accent        |

Measured contrast (WCAG 2.1, sRGB, computed from the hex values above):

| Pair                    | Light | Dark  |
| ----------------------- | ----- | ----- |
| ink / canvas            | 13.78 | 15.10 |
| ink-muted / canvas      | 7.01  | 7.24  |
| ink-faint / canvas      | 5.54  | 5.77  |
| accent / canvas         | 5.12  | 7.60  |
| on-accent / accent      | 5.92  | 7.60  |
| control border / canvas | 4.04  | 3.89  |

Every text pair clears AA (4.5:1) and control borders clear 1.4.11 (3:1) in both
themes — re-measured in the browser after the palette change, on all five
routes, in light and dark. The dark theme is composed on its own cool graphite,
not inverted from light.

## 3. Type

| Role    | Family                          | Loading                                |
| ------- | ------------------------------- | -------------------------------------- |
| Display | Bodoni Moda 400 + true italic   | self-hosted, latin subset, 26KB + 30KB |
| Text    | Familjen Grotesk 400–700 + italic | self-hosted, latin subset, 19KB + 20KB |

Two families, both self-hosted latin subsets, `<link rel="preload">`ed for the
faces used above the fold: **93KB of type** total, no third-party DNS/TLS hop,
no second stylesheet, `font-display: swap` and a latin `unicode-range` on every
file.

Why these two: the W2 display serif has become the reflex of every AI-built
portfolio, and the text face's family was on the same list. Bodoni Moda is a
modern didone — engraved hairline detail that only pays off at display size and
a genuine italic — and Familjen Grotesk is a Norwegian grotesk with enough
character to hold body copy and 11px labels without becoming a costume. No
monospace family ships at all: labels and figures are set in the grotesk with
tabular numerals, because mono for labels was the "technical" reflex the
standard calls out. Only the `<kbd>` keycap borrows the system monospace.

Scale:

| Class           | Size                            | Use                    |
| --------------- | ------------------------------- | ---------------------- |
| `.t-display`    | `clamp(3.1rem, 10.6vw, 7.4rem)` | page titles, 404       |
| `.t-display-hero` | `12.3cqi` (clamped fallback)  | hero only              |
| `.t-title`      | `clamp(2.1rem, 5.6vw, 4.2rem)`  | section headings       |
| `.t-heading`    | `clamp(1.6rem, 3vw, 2.3rem)`    | list headings, dialog  |
| `.t-lead`       | `clamp(1.06rem, 1.5vw, 1.3rem)` | standfirst             |
| `.t-body`       | `1rem / 1.68`                   | prose                  |
| `.t-meta`       | `0.7rem`, `500`, `0.13em`       | labels, nav, metadata  |
| `.t-num`        | `0.75rem`, tabular figures      | index numbers, time    |

Display leading stays sub-1 (0.94–1) and close tracking, because a didone wants
tight setting; body copy is never tracked in. The hero is deliberately
**unmasked** — Bodoni Moda's descenders sit outside the line box and
`overflow: hidden` would cut the tail off every "y".

**Hero sizing is container-based, not viewport-based.** The longest hero line is
"frontend engineer"; the column is 8 of 12 on desktop but full width on a phone,
so a single `vw` clamp either wraps the role line on desktop or overflows the
column on a phone. `.t-display-hero` measures its own column with `cqi`
(`12.3cqi`, the measure of that line, tracked) and falls back to a `vw` clamp
where container queries are unavailable. Verified fitting at 320 / 360 / 390 /
768 / 1024 / 1280 / 1440 / 1920.

Italic display is used once, on the hero's "engineer" — the signature moment.
Elsewhere display headings are set roman: an oversized italic serif headline is
itself an AI-landing-page tell, and the standard flags it.

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
- **Nothing pulses.** The availability indicator is a static mark; motion is
  reserved for entrances and pointer feedback, never to fake liveness.
- **One signature moment**: the hero's per-character rise into the name, ending
  on the accent-italic role line. Everything else is quiet so that one moment
  reads as intentional.

## 5. Layout

- `.shell` — `max-width: 90rem`, fluid inline padding
  `clamp(1.25rem, 4.5vw, 4rem)`. Same rhythm on every route.
- 12-column grids on `lg`; work list is a grid row (number / title / tagline /
  year+stack / arrow), not a card grid — cards are the template tell.
- Hairlines (1px `--line`) separate blocks; there are no box shadows anywhere.
- **No eyebrow labels and no section numbers.** Each heading carries its own
  label ("Three selected things worth opening", "How I work, in four rules",
  "The full archive"); where a kicker held a real fact (the project-year range
  on the archive page) it moved into the sentence below the heading.

## 6. Accessibility

- Skip link, `main#main-content`, one `h1` per page, no heading-level jumps.
- Visible focus ring: 2px accent, 3px offset, on every interactive element.
- Targets: all links/buttons ≥ 24×24; primary controls are 40–44px.
- The custom cursor never hides the native one and is `aria-hidden`,
  `pointer-events: none`.
- The easter-egg panel is a native `<dialog>` (focus trap, Escape, inert
  background), never fires while typing in a field, and its content is real.
- Theme: three-state toggle (light / dark / system) persisted in
  `localStorage`, applied by a pre-paint script so there is no flash.
- Copy is plain language, no "click here" links, no colour-only meaning: the
  availability mark is a static glyph **and** a sentence, and project status is
  a mark plus a word.
- Contrast audited in the browser per route, per theme, against the element's
  real background: no text below 4.5:1, no large text below 3:1.

## 7. Performance budget

| Item                   | Budget  | Measured                         |
| ---------------------- | ------- | -------------------------------- |
| Initial JS (gzip)      | < 180KB | 108KB                            |
| CSS (gzip)             | < 20KB  | 6.7KB                            |
| Fonts (all files)      | < 120KB | 93KB                             |
| Images                 | 0       | 0 (one 72KB `og.png` for social) |
| LCP (local, desktop)   | < 2.0s  | 0.34s                            |
| CLS                    | = 0     | 0                                |

The site ships no photographs, illustrations or video: the type is the layout.
The only raster asset in `public/` is `og.png`, which is never requested by a
page load.

## 8. Self-critique pass

Findings from rendering the built site — not from reading the code.

W2:

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
6. **Target sizes**: the wordmark, the "selected work" cue and "All projects"
   link were 18–23px tall → minimum 24px.
7. **Motion weight**: the entry chunk was 161KB gzip with Motion in it →
   Motion removed, one engine (GSAP + CSS).
8. **Hero right rail**: read as metadata filler and the first screen showed no
   work → the rail now leads with the most recent featured project.

W3 (against the Impeccable standard, verified with the detector on the built
site, zero findings on all six routes):

9. **Palette**: cream `#f1efeb` → cool blueprint paper `#dbe3e4`, dark theme
   recomposed on cool graphite. Contrast re-measured in the browser.
10. **Type**: the over-used display serif and the over-used text family replaced
    with Bodoni Moda + Familjen Grotesk; the mono family removed and its roles
    (labels, figures, keycaps aside) moved to the grotesk.
11. **Hero wrapping**: the new didone is wider than the old serif and wrapped
    "frontend engineer" onto two lines at 1440 → the hero block sizes itself from
    its column (`cqi`), so the role line holds one line from 320 to 1920.
12. **Eyebrows removed**: `(01) Selected work`, `(02) Playbook`, `(03) About`,
    `(04) Contact`, plus the `Work / 2021—2026`, `About`, `Contact` and
    `Error 404` labels on the inner routes — every heading now carries its own
    words.
13. **Pulsing dot removed**: the availability mark is static and the state is in
    the sentence next to it.
14. **Footer ghost wordmark**: the name printed at 10% ink measured 1.2:1 —
    invisible as text, decorative as a shape. Replaced by a legible closing
    signature with a "back to top" link.
