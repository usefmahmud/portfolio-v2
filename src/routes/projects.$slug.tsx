import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GitHubIcon,
} from '../components/Icons'
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
      ],
    }
  },
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project } = Route.useLoaderData()
  const { previous, next } = getAdjacentProjects(project.slug)

  return (
    <main id="main-content" className="page-shell pt-12 sm:pt-16">
      <Link
        to="/projects"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeftIcon className="size-4" />
        All work
      </Link>

      <article className="mt-8 max-w-3xl">
        <header className="border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-wide text-ink-faint uppercase">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              {STATUS_LABEL[project.status]}
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <span className="font-mono text-[0.68rem] tracking-wide text-ink-faint">
              {project.year}
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <span className="font-mono text-[0.68rem] tracking-wide text-ink-faint">
              {project.role}
            </span>
          </div>

          <h1 className="mt-4 mb-0 text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-[2.75rem] sm:leading-[1.1]">
            {project.name}
          </h1>
          <p className="mt-4 mb-0 max-w-[58ch] text-lg leading-relaxed text-ink-muted">
            {project.tagline}
          </p>
        </header>

        <div className="grid gap-10 pt-8 sm:grid-cols-[1.6fr_1fr] sm:gap-12">
          <div>
            <h2 className="kicker m-0">Overview</h2>
            <p className="mt-3 mb-0 text-base leading-relaxed text-ink">
              {project.summary}
            </p>

            <h2 className="kicker mt-10 mb-0">What is in it</h2>
            <ul className="mt-4 mb-0 flex list-none flex-col gap-3 p-0">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <aside className="sm:border-l sm:border-line sm:pl-8">
            <h2 className="kicker m-0">Stack</h2>
            <ul className="mt-3 mb-0 flex list-none flex-wrap gap-1.5 p-0">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-surface-raised px-2.5 py-1 font-mono text-[0.68rem] text-ink-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <h2 className="kicker mt-8 mb-0">Links</h2>
            <ul className="mt-3 mb-0 flex list-none flex-col gap-1 p-0">
              <li>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                >
                  <GitHubIcon className="size-4" />
                  Source
                  <ArrowUpRightIcon className="size-3.5 opacity-60" />
                </a>
              </li>
              {project.homepage ? (
                <li>
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
                  >
                    <ArrowUpRightIcon className="size-4" />
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
        className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link
            to="/projects/$slug"
            params={{ slug: previous.slug }}
            className="group rounded-xl border border-line p-5 no-underline transition-colors duration-200 hover:border-line-strong"
          >
            <span className="kicker">Previous</span>
            <span className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
              <ArrowLeftIcon className="size-4 text-ink-faint" />
              {previous.name}
            </span>
          </Link>
        ) : (
          <span aria-hidden="true" />
        )}

        {next ? (
          <Link
            to="/projects/$slug"
            params={{ slug: next.slug }}
            className="group rounded-xl border border-line p-5 no-underline transition-colors duration-200 hover:border-line-strong sm:text-right"
          >
            <span className="kicker">Next</span>
            <span className="mt-2 flex items-center gap-2 text-sm font-medium text-ink sm:justify-end">
              {next.name}
              <ArrowRightIcon className="size-4 text-ink-faint" />
            </span>
          </Link>
        ) : null}
      </nav>
    </main>
  )
}
