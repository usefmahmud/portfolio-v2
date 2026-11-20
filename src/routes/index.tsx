import { createFileRoute, Link } from '@tanstack/react-router'
import Hero from '../components/Hero'
import { ArrowRightIcon } from '../components/Icons'
import ProjectCard from '../components/ProjectCard'
import { featuredProjects, projects, site } from '../content'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const remaining = projects.length - featuredProjects.length

  return (
    <main id="main-content">
      <Hero />

      <section aria-labelledby="selected-work" className="page-shell mt-16">
        <div className="flex items-end justify-between gap-6 border-b border-line pb-4">
          <div>
            <p className="kicker m-0">Selected work</p>
            <h2
              id="selected-work"
              className="mt-3 mb-0 text-2xl font-semibold tracking-[-0.015em] text-ink"
            >
              Things I have shipped
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-ink-muted no-underline transition-colors duration-200 hover:text-ink"
          >
            All {projects.length}
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <ul className="mt-8 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectCard project={project} emphasis />
            </li>
          ))}
        </ul>

        {remaining > 0 ? (
          <p className="mt-6 mb-0 text-sm text-ink-faint">
            Plus {remaining} more project{remaining === 1 ? '' : 's'} in the
            full archive.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="focus" className="page-shell mt-20">
        <div className="rounded-2xl border border-line bg-surface-raised p-8 sm:p-10">
          <p className="kicker m-0">Currently</p>
          <h2
            id="focus"
            className="mt-3 mb-0 max-w-2xl text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl"
          >
            {site.availability}
          </h2>
          <ul className="mt-6 mb-0 grid list-none gap-3 p-0 sm:grid-cols-3">
            {site.focus.map((entry) => (
              <li
                key={entry}
                className="border-t border-line pt-3 text-sm leading-relaxed text-ink-muted"
              >
                {entry}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
