# Design references — W2 input

This file is the working list for the visual pass. The W1 scaffold deliberately
ships neutral tokens (`src/styles.css`) so this phase can change palette, type
and motion without touching component structure.

## Brief

- Audience: hiring managers and engineers evaluating frontend craft.
- Job of the page: get someone from "who is this" to a project they respect in
  under 30 seconds.
- Tone: technical, restrained, confident. No gradients-on-gradients, no
  decorative blobs, no emoji iconography.
- Constraint: everything must hold up in light and dark, at 375px, and with
  `prefers-reduced-motion` on.

## Reference systems to study

See the `popular-web-designs` skill (`templates/`) for token-level breakdowns.

| Reference       | What to take                                                |
| --------------- | ----------------------------------------------------------- |
| `vercel.md`     | Black/white precision, Geist type system, hairline borders  |
| `linear.app.md` | Dense type hierarchy, restrained accent, quiet hover states |
| `stripe.md`     | Editorial weight contrast (light body / heavy headings)     |
| `raycast.md`    | Monospace accents carried into a modern sans layout         |
| `resend.md`     | Minimal dark theme, single accent used sparingly            |
| `x.ai.md`       | Stark monospace minimalism as a viable extreme              |

## Decisions taken in W2

The system that came out of these is documented in `docs/DESIGN.md`.

1. **Type pairing** — serif display, not a second grotesk. W2 shipped
   **Instrument Serif** (400 + italic) for display, **Geist** for text and
   **Geist Mono** for data; W3 replaced all three with **Bodoni Moda** (display)
   and **Familjen Grotesk** (text, labels, figures), because the first two had
   become the reflex of AI-built portfolios and the third was mono-as-costume.
   Still a serif-display pairing: a grotesk-only hero reads as "SaaS landing
   page"; the serif is what makes the page read as editorial.
2. **Accent** — indigo replaced by **vermilion** (`#a83313`, dark: `#ef8b5f`).
   It is the only saturated colour on the site and appears as punctuation only.
   Contrast re-checked: 5.13:1 on paper, 7.54:1 on graphite.
3. **Project density** — no cards, no thumbnails. The work is a **typographic
   index**: number / name in display serif / tagline / year + stack / arrow.
   Card grids are the "dev portfolio template" tell the reference research
   warns about, and a thumbnail would be an invented asset.
4. **Case page** — no screenshots exist, so the anchor is **type plus a spec
   card** (shipped / status / layer) and a numbered "what is in it" list. When
   real screenshots exist, they slot in above the overview without changing the
   grid.
5. **Motion budget** — one signature moment (per-character hero rise into the
   accent-italic role line). Card→page transitions are not animated: TanStack
   Router view transitions were considered and rejected as a second motion
   system for a marginal gain.

## Out of scope for W1 (do not regress)

- Semantic tokens only — no raw hex in components.
- Contrast: AA for text, 3:1 for control borders, both themes.
- Entrance animation must not hide content before hydration.
