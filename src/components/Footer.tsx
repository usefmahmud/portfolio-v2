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
    <footer className="mt-24 border-t border-line bg-surface/40">
      <div className="page-shell flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="m-0 text-sm font-semibold text-ink">{site.name}</p>
          <p className="mt-1 mb-0 text-sm text-ink-muted">
            {site.role} · {site.location}
          </p>
        </div>

        <nav aria-label="Elsewhere">
          <ul className="m-0 flex list-none flex-col gap-1 p-0 sm:items-end">
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
                    <ArrowUpRightIcon className="size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-60" />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <div className="page-shell border-t border-line py-6">
        <p className="m-0 font-mono text-xs tracking-wide text-ink-faint">
          © {year} {site.name} · Built with TanStack Start
        </p>
      </div>
    </footer>
  )
}
