import type { ComponentType, SVGProps } from 'react'
import { site } from '../content'
import { ArrowUpIcon, ArrowUpRightIcon, GitHubIcon, MailIcon } from './Icons'

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
          <p className="m-0 font-serif text-[1.4rem] leading-none text-ink">
            {site.role}
          </p>
          <p className="t-body mt-2 mb-0 text-sm">{site.location}</p>
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
            Set in Bodoni Moda (display) and Familjen Grotesk (text), both self-hosted.
            Built with TanStack Start, GSAP and Lenis — no images, 93KB of
            type.
          </p>
        </div>
      </div>

      {/*
        The closing signature is set at a size you can read. The previous
        version printed the name at 10% ink: a decorative ghost that failed
        contrast at any size, which is a caption pretending to be a design
        element. Same idea, real type.
      */}
      <div className="shell flex flex-col gap-4 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="m-0 font-serif text-[clamp(1.6rem,4vw,2.6rem)] leading-none tracking-[-0.022em] text-ink">
          {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <p className="t-meta m-0">
            © {year} — {site.location}, GMT+2
          </p>
          <a
            href="#main-content"
            className="t-meta group inline-flex min-h-11 items-center gap-2 text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            Back to top
            <ArrowUpIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
