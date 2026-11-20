import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRightIcon } from '../components/Icons'
import { projects, site } from '../content'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      { name: 'description', content: site.intro },
    ],
  }),
  component: AboutPage,
})

const FACT_ROWS = [
  { label: 'Role', value: site.role },
  { label: 'Based in', value: site.location },
  { label: 'Experience', value: `${site.experienceYears} years` },
  { label: 'Focus', value: 'Frontend, type-safe systems, dev tooling' },
  { label: 'Projects', value: `${projects.length} published` },
] as const

function AboutPage() {
  return (
    <main id="main-content" className="page-shell pt-16 sm:pt-20">
      <p className="kicker m-0">About</p>
      <h1 className="mt-4 mb-0 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        {site.name}
      </h1>

      <div className="mt-10 grid gap-12 sm:grid-cols-[1.5fr_1fr] sm:gap-16">
        <div className="max-w-[62ch]">
          <p className="m-0 text-lg leading-relaxed text-ink">{site.intro}</p>
          <p className="mt-5 mb-0 text-base leading-relaxed text-ink-muted">
            Most of my work starts at the interface and works backwards. That
            usually means a strict type boundary at the edge — validated once,
            then trusted — and components that own their state instead of
            borrowing it from three layers up.
          </p>
          <p className="mt-5 mb-0 text-base leading-relaxed text-ink-muted">
            Outside product work I build tools I want to use: a terminal HTTP
            client, a set of Zod refiners, a search layer over a classical
            Arabic corpus. The pattern is the same — remove the step that makes
            you leave the thing you are doing.
          </p>

          <h2 className="kicker mt-12 mb-0">What I work on</h2>
          <ul className="mt-4 mb-0 flex list-none flex-col gap-3 p-0">
            {site.focus.map((entry) => (
              <li
                key={entry}
                className="flex gap-3 text-sm leading-relaxed text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong"
                />
                {entry}
              </li>
            ))}
          </ul>
        </div>

        <aside>
          <dl className="m-0 divide-y divide-line border-y border-line">
            {FACT_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="font-mono text-[0.68rem] tracking-wide text-ink-faint uppercase">
                  {row.label}
                </dt>
                <dd className="m-0 text-right text-sm text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-8 mb-0 flex list-none flex-col gap-1 p-0">
            {site.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noreferrer noopener'
                      : undefined
                  }
                  className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                  <ArrowUpRightIcon className="size-3.5 opacity-60" />
                </a>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-on-accent no-underline transition-colors duration-200 hover:bg-accent-hover"
          >
            Contact
          </Link>
        </aside>
      </div>
    </main>
  )
}
