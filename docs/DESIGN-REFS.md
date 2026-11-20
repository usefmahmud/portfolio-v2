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

## Decisions to make in W2

1. **Type pairing** — keep Geist/Geist Mono, or move to a serif display (e.g.
   Fraunces) for headings while mono stays for metadata.
2. **Accent** — currently indigo `#4338ca` / `#b4aaff`. Confirm or replace, then
   re-run the contrast check.
3. **Project card density** — chips + tagline only, or add a thumbnail/monogram
   per project.
4. **Case page** — needs a visual anchor (screenshot, terminal capture, or
   typographic diagram). No assets exist yet; decide whether to generate them.
5. **Motion budget** — one signature transition (project card → case page) is
   worth more than many small fades.

## Out of scope for W1 (do not regress)

- Semantic tokens only — no raw hex in components.
- Contrast: AA for text, 3:1 for control borders, both themes.
- Entrance animation must not hide content before hydration.
