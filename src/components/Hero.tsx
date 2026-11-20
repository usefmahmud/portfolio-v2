import { Link } from '@tanstack/react-router'
import { projects, site } from '../content'
import { ArrowRightIcon } from './Icons'

const stats = [
  { value: String(projects.length), label: 'selected projects' },
  { value: String(site.github.publicRepos), label: 'public repos' },
  { value: `${site.experienceYears} yrs`, label: 'shipping UI' },
] as const

/**
 * Entrance motion is CSS, not Motion: the animation must run even when the
 * client bundle is slow or blocked, and it keeps the SSR markup fully visible
 * (Motion's `initial` would ship `opacity:0` in the HTML).
 * Motion is reserved for interaction (hover lift, menu) where it belongs.
 */
export default function Hero() {
  return (
    <section className="page-shell pt-16 pb-4 sm:pt-24">
      <div className="max-w-3xl">
        <p className="kicker rise-in m-0">
          {site.role} — {site.location}
        </p>

        <h1 className="rise-in mt-5 mb-0 text-4xl leading-[1.06] font-semibold tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.4rem]">
          {site.headline}
        </h1>

        <p className="rise-in mt-6 mb-0 max-w-[62ch] text-base leading-relaxed text-ink-muted sm:text-lg">
          {site.intro}
        </p>

        <div className="rise-in mt-9 flex flex-wrap items-center gap-3">
          <Link
            to="/projects"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent no-underline transition-colors duration-200 hover:bg-accent-hover"
          >
            See selected work
            <ArrowRightIcon className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:bg-surface-raised"
          >
            Get in touch
          </Link>
        </div>

        <dl className="rise-in mt-14 m-0 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="m-0 font-mono text-lg font-medium text-ink">
                {stat.value}
              </dd>
              <span
                aria-hidden="true"
                className="font-mono text-xs tracking-wide text-ink-faint"
              >
                {stat.label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
