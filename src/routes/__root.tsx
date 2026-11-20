import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import CursorDot from '../components/CursorDot'
import EasterEgg from '../components/EasterEgg'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { site } from '../content'
import { useSmoothScroll } from '../lib/motion/useSmoothScroll'
import { THEME_INIT_SCRIPT } from '../lib/theme'
import appCss from '../styles.css?url'

const DESCRIPTION = `${site.name} — ${site.role} in ${site.location}. ${site.headline}`

/**
 * Person schema. One entity, the same facts as the page, so search results and
 * rich previews do not have to guess what the site is about.
 */
const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  description: site.intro,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Cairo',
    addressCountry: 'EG',
  },
  sameAs: [site.github.url],
  knowsAbout: site.focus,
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} — ${site.role}` },
      { name: 'description', content: DESCRIPTION },
      { name: 'author', content: site.name },
      { name: 'color-scheme', content: 'light dark' },
      {
        name: 'theme-color',
        content: '#f1efeb',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#14120f',
        media: '(prefers-color-scheme: dark)',
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:title', content: `${site.name} — ${site.role}` },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: `${site.url}/` },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:image', content: `${site.url}/og.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${site.name} — ${site.role}` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${site.name} — ${site.role}` },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: `${site.url}/og.png` },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'manifest', href: '/manifest.webmanifest' },
      {
        rel: 'preload',
        href: '/fonts/instrument-serif-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/fonts/geist-normal.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(PERSON_SCHEMA),
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  useSmoothScroll()

  /* New route: snap the smooth scroller to the top and re-measure triggers
     once the new page has painted. ScrollTrigger caches positions, so without
     the refresh every trigger on the destination page fires at the old offset. */
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true })

    let cancelled = false
    void import('gsap/ScrollTrigger')
      .then(({ ScrollTrigger }) => {
        if (cancelled) {
          return
        }
        requestAnimationFrame(() => ScrollTrigger.refresh())
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [pathname])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        {children}
        <Footer />
        <EasterEgg />
        <CursorDot />
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main
      id="main-content"
      className="shell flex min-h-[70svh] flex-col justify-center py-24"
    >
      <p className="t-meta m-0">Error 404</p>
      <h1 className="t-display mt-5 max-w-[12ch] text-ink">
        404
        <span className="block text-accent italic">nothing here</span>
      </h1>
      <p className="t-body mt-6 mb-0 max-w-[42ch]">
        The link is out of date, or the page moved. The work is still where it
        was.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link to="/" className="btn btn-solid">
          Back to the index
        </Link>
        <Link to="/projects" className="btn btn-ghost">
          See the work
        </Link>
      </div>
    </main>
  )
}
