# Content guide

All copy and project data lives in `src/content/`. Nothing else needs editing to
add a project.

## Files

| File            | What it holds                                                |
| --------------- | ------------------------------------------------------------ |
| `site.json`     | Name, role, location, headline, intro, links, focus areas    |
| `projects.json` | The project list rendered on `/` and `/projects`             |
| `index.ts`      | Types + runtime validation + selectors. Do not add copy here |

## Adding a project

Append an object to `projects` in `projects.json`:

```json
{
  "slug": "my-project",
  "name": "my-project",
  "tagline": "One line, sentence case, ends with a full stop.",
  "summary": "Two or three sentences on the problem and what you built.",
  "year": 2026,
  "role": "What you actually did",
  "status": "active",
  "stack": ["TypeScript", "Node.js"],
  "highlights": ["Concrete thing it does", "Another one"],
  "repo": "https://github.com/usefmahmud/my-project",
  "homepage": null,
  "featured": false
}
```

Field rules (enforced by `src/content/index.ts` — the build throws otherwise):

| Field                                | Rule                                                             |
| ------------------------------------ | ---------------------------------------------------------------- |
| `slug`                               | Non-empty, unique across the file. Becomes `/projects/<slug>`    |
| `name`, `tagline`, `summary`, `role` | Non-empty strings                                                |
| `year`                               | Finite number (creation year)                                    |
| `status`                             | `active` \| `maintained` \| `archived`                           |
| `stack`, `highlights`                | Non-empty string arrays                                          |
| `repo`                               | Non-empty string (absolute URL)                                  |
| `homepage`                           | Absolute URL or `null` — `null` hides the "Live site" link       |
| `featured`                           | Boolean. Featured projects appear on the home page, newest first |

Sorting is automatic: featured first, then newest year, then name. Do not try to
order the JSON by hand.

## Style rules for copy

- Sentence case for taglines and headings. No title-case shouting.
- `tagline` is a caption, not a pitch: one line, no comma splices.
- `highlights` describe what the thing does, in plain language. Three is the
  sweet spot; more than four starts to read as a feature dump.
- Never claim scale, users or outcomes that cannot be shown in the repo.

## Site facts

`site.json` values are rendered directly — `publicRepos` and `experienceYears`
are snapshots, not live lookups. Update them by hand when they drift.

`email` is used by the contact page's `mailto:` link. It is public by design
(it already appears in commit metadata); swap it for an alias if that changes.

W2 added three more blocks to the same file, so design copy is still data:

| Key        | Shape                                   | Where it renders                                  |
| ---------- | --------------------------------------- | ------------------------------------------------- |
| `url`      | absolute origin                         | canonical tags, OG URLs, sitemap, JSON-LD         |
| `about`    | `{ lede, paragraphs[] }`                | home about teaser (line-by-line reveal), `/about` |
| `playbook` | `[{ title, body }]`, 4 items reads best | the numbered "How I work" section                 |

`url` is a placeholder until the domain is live — see `docs/SEO.md`.
`playbook[].title` is short (2–4 words) because it is set in the display serif;
`body` is one or two sentences and should name a project that proves the claim.
