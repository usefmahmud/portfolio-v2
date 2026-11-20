import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon, MailIcon } from '../components/Icons'
import Reveal from '../components/motion/Reveal'
import SplitReveal from '../components/motion/SplitReveal'
import { projects, site } from '../content'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About — ${site.name}` },
      { name: 'description', content: site.about.lede },
      { property: 'og:url', content: `${site.url}/about` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/about` }],
  }),
  component: AboutPage,
})

const FACT_ROWS = [
  { label: 'Role', value: site.role },
  { label: 'Based in', value: site.location },
  { label: 'Experience', value: `${site.experienceYears} years` },
  { label: 'Projects', value: `${projects.length} published` },
  { label: 'Repos', value: `${site.github.publicRepos} public` },
  { label: 'Status', value: site.availability },
] as const

const LINK_ICONS = {
  GitHub: GitHubIcon,
  Email: MailIcon,
} as const

function AboutPage() {
  return (
    <main id="main-content">
      <header className="shell pt-16 sm:pt-24">
        <p className="t-meta m-0">About</p>
        <h1 className="t-display mt-5 max-w-[14ch] text-ink">
          <SplitReveal mode="chars">
            {site.shortName.toLowerCase()}, working at the seam
          </SplitReveal>
        </h1>
        <p className="t-lead mt-7 max-w-[52ch]">{site.about.lede}</p>
      </header>

      <div className="shell mt-14 grid gap-12 border-t border-line pt-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-7">
          <p className="t-heading max-w-[38ch] text-ink">
            <SplitReveal mode="lines">{site.intro}</SplitReveal>
          </p>

          {site.about.paragraphs.map((paragraph) => (
            <Reveal key={paragraph.slice(0, 24)} className="mt-6">
              <p className="t-body m-0 max-w-[60ch] text-[0.99rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <h2 className="t-meta mt-14 mb-0">What I work on</h2>
          <ul className="mt-3 mb-0 list-none p-0">
            {site.focus.map((entry) => (
              <li
                key={entry}
                className="border-t border-line py-3 text-[0.97rem] text-ink last:border-b"
              >
                {entry}
              </li>
            ))}
          </ul>

          <h2 className="t-meta mt-14 mb-0">The playbook</h2>
          <p className="t-body mt-3 max-w-[52ch] text-[0.97rem]">
            Four rules I keep coming back to — the same four on the home page,
            with the projects that prove them.
          </p>
          <Link
            to="/"
            hash="work"
            className="link-line mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
          >
            See them in the work
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="t-meta m-0">Facts</h2>
          <dl className="mt-3 mb-0">
            {FACT_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 border-t border-line py-3 last:border-b"
              >
                <dt className="t-meta">{row.label}</dt>
                <dd className="m-0 text-right text-[0.92rem] text-ink">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="t-meta mt-10 mb-0">Elsewhere</h2>
          <ul className="mt-3 mb-0 flex list-none flex-col p-0">
            {site.links.map((link) => {
              const Icon =
                LINK_ICONS[link.label as keyof typeof LINK_ICONS] ?? null
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noreferrer noopener'
                        : undefined
                    }
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
                  >
                    {Icon ? <Icon className="size-4 text-ink-faint" /> : null}
                    <span className="link-line">{link.label}</span>
                    <ArrowUpRightIcon className="arrow-nudge size-3.5 text-ink-faint" />
                  </a>
                </li>
              )
            })}
          </ul>

          <Link to="/contact" className="btn btn-solid mt-8">
            Get in touch
            <ArrowUpRightIcon className="size-4" />
          </Link>
        </aside>
      </div>
    </main>
  )
}
