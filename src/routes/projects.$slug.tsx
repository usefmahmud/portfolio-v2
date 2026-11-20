import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from '../components/Icons'
import Tilt from '../components/Tilt'
import { getAdjacentProjects, getProject, site } from '../content'

const STATUS_LABEL = {
  active: 'Active',
  maintained: 'Maintained',
  archived: 'Archived',
} as const

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) {
      throw notFound()
    }
    return { project }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { project } = loaderData
    return {
      meta: [
        { title: `${project.name} — ${site.name}` },
        { name: 'description', content: project.tagline },
        { property: 'og:title', content: `${project.name} — ${site.name}` },
        { property: 'og:description', content: project.tagline },
        { property: 'og:url', content: `${site.url}/projects/${project.slug}` },
        { property: 'og:type', content: 'article' },
      ],
      links: [
        { rel: 'canonical', href: `${site.url}/projects/${project.slug}` },
      ],
    }
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project } = Route.useLoaderData()
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <main id="main-content" className="shell pt-10 sm:pt-14">
      <Link
        to="/projects"
        className="group inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
        Work index
      </Link>

      <article>
        <header className="mt-6 grid gap-10 border-b border-line pb-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="t-meta inline-flex items-center gap-2 text-ink">
                <span aria-hidden="true" className="status-dot" />
                {STATUS_LABEL[project.status]}
              </span>
              <span className="t-meta">{project.year}</span>
              <span className="t-meta">{project.role}</span>
            </div>

            <h1 className="t-display mt-6 max-w-[15ch] text-ink">
              {project.name}
            </h1>

            <p className="t-lead mt-6 mb-0 max-w-[48ch]">{project.tagline}</p>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Tilt max={5}>
              <dl className="m-0 border border-line bg-surface">
                <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3">
                  <dt className="t-meta">Shipped</dt>
                  <dd className="m-0 font-mono text-sm text-ink">
                    {project.year}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3">
                  <dt className="t-meta">Status</dt>
                  <dd className="m-0 font-mono text-sm text-ink">
                    {STATUS_LABEL[project.status].toLowerCase()}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <dt className="t-meta">Layer</dt>
                  <dd className="m-0 text-right font-mono text-sm text-ink">
                    {project.stack[0] ?? '—'}
                  </dd>
                </div>
              </dl>
            </Tilt>
          </div>
        </header>

        <div className="grid gap-12 pt-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <h2 className="t-meta m-0">Overview</h2>
            <p className="t-lead mt-4 mb-0 text-ink">{project.summary}</p>

            <h2 className="t-meta mt-12 mb-0">What is in it</h2>
            <ol className="mt-4 mb-0 grid list-none gap-0 p-0">
              {project.highlights.map((highlight, position) => (
                <li
                  key={highlight}
                  className="flex gap-4 border-t border-line py-4 last:border-b"
                >
                  <span className="t-num w-6 shrink-0 pt-1">
                    {String(position + 1).padStart(2, '0')}
                  </span>
                  <span className="t-body m-0 max-w-[48ch] text-[0.97rem]">
                    {highlight}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="t-meta m-0">Stack</h2>
            <ul className="mt-2 mb-0 list-none p-0">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="border-t border-line py-2 font-mono text-sm text-ink last:border-b"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <h2 className="t-meta mt-10 mb-0">Links</h2>
            <ul className="mt-3 mb-0 flex list-none flex-col p-0">
              <li>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-line inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
                >
                  <GitHubIcon className="size-4 text-ink-faint" />
                  Source
                  <ArrowUpRightIcon className="arrow-nudge size-3.5" />
                </a>
              </li>
              {project.homepage ? (
                <li>
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-line inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
                  >
                    <ArrowUpRightIcon className="size-4 text-ink-faint" />
                    Live site
                  </a>
                </li>
              ) : null}
            </ul>
          </aside>
        </div>
      </article>

      <nav
        aria-label="Project navigation"
        className="mt-20 grid gap-6 border-t border-line pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            to="/projects/$slug"
            params={{ slug: previous.slug }}
            className="group no-underline"
          >
            <span className="t-meta">Previous</span>
            <span className="mt-2 flex items-baseline gap-3">
              <ArrowLeftIcon className="size-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="t-heading text-ink transition-colors duration-200 group-hover:text-accent">
                {previous.name}
              </span>
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        {next ? (
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group no-underline sm:text-right"
          >
            <span className="t-meta">Next</span>
            <span className="mt-2 flex items-baseline gap-3 sm:justify-end">
              <span className="t-heading text-ink transition-colors duration-200 group-hover:text-accent">
                {next.name}
              </span>
              <ArrowRightIcon className="size-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  )
}
