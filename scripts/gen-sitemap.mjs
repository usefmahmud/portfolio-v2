/**
 * Writes public/sitemap.xml and public/robots.txt from the content files.
 *
 * Runs on `prebuild`, so the sitemap can never drift from the project list —
 * adding a project to projects.json is enough. The origin comes from
 * SITE_URL when set (deploy previews, staging), otherwise from site.json.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const read = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))

const site = read('../src/content/site.json')
const { projects } = read('../src/content/projects.json')

const origin = (process.env.SITE_URL ?? site.url).replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

const pages = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'yearly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
  ...projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
  })),
]

const urlset = pages
  .map(
    (page) =>
      `  <url>\n    <loc>${origin}${page.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`,
  )
  .join('\n')

writeFileSync(
  new URL('../public/sitemap.xml', import.meta.url),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`,
)

writeFileSync(
  new URL('../public/robots.txt', import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
)

console.info(`[sitemap] ${origin} — ${pages.length} URLs`)
