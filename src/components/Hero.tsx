import { Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { featuredProjects, site } from '../content'
import Clock from './Clock'
import { ArrowDownIcon, ArrowRightIcon, ArrowUpRightIcon } from './Icons'
import Tilt from './Tilt'

/**
 * Splits a word into per-character spans at render time.
 *
 * The copy is static, so the split is deterministic: server and client emit
 * identical markup (no hydration mismatch) and the entrance can be a pure CSS
 * animation, which means the H1 — the LCP element — animates from the first
 * frame without waiting for JS.
 */
function Chars({
  text,
  offset = 0,
  italicFrom,
}: {
  text: string
  offset?: number
  /** Index from which this run switches to italic (defaults to none). */
  italicFrom?: number
}) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={
            italicFrom !== undefined && index >= italicFrom
              ? 'hero-char italic'
              : 'hero-char'
          }
          style={{ '--i': index + offset } as CSSProperties}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const repos = site.github.publicRepos
  /* Featured projects are already sorted newest-first by the content layer. */
  const latest = featuredProjects[0]

  return (
    <section className="shell flex flex-col justify-between pt-[6.5rem] pb-8 sm:pt-[8rem] lg:min-h-[88svh]">
      <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="hero-type lg:col-span-8">
          <div
            className="hero-fade flex items-center gap-3"
            style={{ '--d': '60ms' } as CSSProperties}
          >
            <span className="t-meta">Portfolio / 2026</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span className="t-meta">{site.location}</span>
          </div>

          <h1
            aria-label={`${site.name} — ${site.role.toLowerCase()}`}
            className="t-display-hero mt-7 text-ink"
          >
            <span className="hero-line" aria-hidden="true">
              <Chars text="yousef" />
            </span>
            <span className="hero-line" aria-hidden="true">
              <Chars text="abdulaziz" offset={7} />
            </span>
            <span className="hero-line text-accent" aria-hidden="true">
              <Chars text="frontend engineer" offset={17} italicFrom={9} />
            </span>
          </h1>

          <p
            className="hero-fade t-lead mt-9 max-w-[44ch]"
            style={{ '--d': '780ms' } as CSSProperties}
          >
            {site.headline}
          </p>

          <div
            className="hero-fade mt-9 flex flex-wrap items-center gap-3"
            style={{ '--d': '900ms' } as CSSProperties}
          >
            <Tilt className="inline-flex" max={5}>
              <Link to="/projects" className="btn btn-solid">
                See the work
                <ArrowRightIcon className="size-4" />
              </Link>
            </Tilt>
            <Link to="/about" className="btn btn-ghost">
              Read the playbook
            </Link>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-8">
          <p className="t-meta m-0">Availability</p>
          <p className="mt-3 mb-0 flex items-start gap-2.5 text-[0.95rem] leading-snug text-ink">
            <span
              aria-hidden="true"
              className="status-mark mt-[0.45rem] shrink-0"
            />
            {site.availability}
          </p>

          <div className="mt-8 border-t border-line pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <p className="t-meta m-0">Last shipped</p>
              <span className="t-num">{latest?.year}</span>
            </div>

            {latest ? (
              <Link
                to="/projects/$slug"
                params={{ slug: latest.slug }}
                className="group mt-2 block no-underline"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-[1.45rem] leading-none tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-accent">
                    {latest.name}
                  </span>
                  <ArrowUpRightIcon className="arrow-nudge size-4 shrink-0 text-accent" />
                </span>
                <span className="mt-2 block text-[0.82rem] leading-snug text-ink-faint">
                  {latest.tagline}
                </span>
              </Link>
            ) : null}
          </div>

          <dl className="mt-6 mb-0 grid gap-3 border-t border-line pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="t-meta">Cairo</dt>
              <dd className="m-0 text-sm tabular-nums text-ink">
                <Clock />
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="t-meta">Repos</dt>
              <dd className="m-0 text-sm tabular-nums">
                <a
                  href={site.github.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line text-ink no-underline"
                >
                  {repos}
                </a>
              </dd>
            </div>
          </dl>

          <a
            href={`mailto:${site.email}`}
            className="link-line mt-8 inline-block text-[0.95rem] text-ink no-underline"
          >
            {site.email}
          </a>
        </aside>
      </div>

      <div className="mt-16 flex items-end justify-between gap-6 border-t border-line pt-5 lg:mt-10">
        <p className="t-meta m-0">
          {site.experienceYears} years shipping UI
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          {site.role}
        </p>
        <a
          href="#work"
          className="t-meta group inline-flex min-h-6 items-center gap-2 text-ink-faint no-underline transition-colors duration-200 hover:text-ink"
        >
          Selected work
          <ArrowDownIcon className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  )
}
