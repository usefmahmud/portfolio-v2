import type { ComponentType, SVGProps } from 'react'
import { site } from '../content'
import { ArrowUpRightIcon, GitHubIcon, MailIcon } from './Icons'

/**
 * Optional per-link icons: a link without an entry renders text only, so new
 * social links in content never need a code change.
 */
const ICONS: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>> | undefined
> = {
  GitHub: GitHubIcon,
  Email: MailIcon,
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="m-0 text-[0.95rem] text-ink">{site.name}</p>
          <p className="t-body mt-1 mb-0 text-sm">
            {site.role} · {site.location}
          </p>
          <p className="t-meta mt-5 mb-0">
            Type <kbd className="font-mono text-ink">ship</kbd> to see the lab
          </p>
        </div>

        <nav aria-label="Elsewhere">
          <p className="t-meta m-0">Elsewhere</p>
          <ul className="mt-3 mb-0 flex list-none flex-col p-0">
            {site.links.map((link) => {
              const Icon = ICONS[link.label]
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
                    className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                  >
                    {Icon ? <Icon className="size-4" /> : null}
                    <span>{link.label}</span>
                    <ArrowUpRightIcon className="arrow-nudge size-3.5 opacity-40" />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div>
          <p className="t-meta m-0">Colophon</p>
          <p className="t-body mt-3 mb-0 text-sm">
            Typeface pairing: Instrument Serif for display, Geist for text.
            Built with TanStack Start, GSAP and Lenis — no images, ~70KB of
            type.
          </p>
        </div>
      </div>

      <div className="overflow-hidden">
        <p
          aria-hidden="true"
          className="shell m-0 translate-y-[0.1em] font-serif text-[clamp(2.4rem,12.5vw,10.5rem)] leading-[0.8] tracking-[-0.045em] text-ink/10 select-none"
        >
          yousef abdulaziz
        </p>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-meta m-0">
          © {year} {site.name}
        </p>
        <p className="t-meta m-0">Cairo, Egypt — GMT+2</p>
      </div>
    </footer>
  )
}
