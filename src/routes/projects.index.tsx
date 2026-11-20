import { createFileRoute } from '@tanstack/react-router'
import ProjectCard from '../components/ProjectCard'
import { projects, projectYearsLabel, site } from '../content'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: `Work — ${site.name}` },
      {
        name: 'description',
        content: `Selected projects by ${site.name}: developer tooling, chat platforms and AI agent systems.`,
      },
    ],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main id="main-content" className="page-shell pt-16 sm:pt-20">
      <p className="kicker m-0">Work</p>
      <h1 className="mt-4 mb-0 max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
        {projects.length} projects, {projectYearsLabel()}
      </h1>
      <p className="mt-5 mb-0 max-w-[60ch] text-base leading-relaxed text-ink-muted">
        Developer tools, a chat platform and a few experiments where the
        interface needed something behind it. Each entry lists what I actually
        built, not just the stack.
      </p>

      <ul className="mt-12 grid list-none gap-5 p-0 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="flex">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </main>
  )
}
