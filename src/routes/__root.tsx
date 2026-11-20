import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { site } from '../content'
import { THEME_INIT_SCRIPT } from '../lib/theme'
import appCss from '../styles.css?url'

const DESCRIPTION = `${site.name} — ${site.role} in ${site.location}. ${site.headline}`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${site.name} — ${site.role}` },
      { name: 'description', content: DESCRIPTION },
      { name: 'author', content: site.name },
      { name: 'color-scheme', content: 'light dark' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${site.name} — ${site.role}` },
      { property: 'og:description', content: DESCRIPTION },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
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
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main id="main-content" className="page-shell py-24">
      <p className="kicker m-0">404</p>
      <h1 className="mt-4 mb-0 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        This page does not exist.
      </h1>
      <p className="mt-4 mb-0 max-w-prose text-ink-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-accent px-6 text-sm font-semibold text-on-accent no-underline transition-colors duration-200 hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </main>
  )
}
