import { createFileRoute } from '@tanstack/react-router'
import WorkIndex from '../components/WorkIndex'
import { projects, projectYearsLabel, site } from '../content'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: `Work — ${site.name}` },
      {
        name: 'description',
        content: `The full project index: developer tooling, a chat platform and experiments by ${site.name}.`,
      },
      { property: 'og:url', content: `${site.url}/projects` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/projects` }],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <main id="main-content">
      <header className="shell pt-16 sm:pt-24">
        <p className="t-meta m-0">Work / {projectYearsLabel()}</p>
        <h1 className="t-display mt-5 max-w-[13ch] text-ink">
          {projects.length} projects,{' '}
          <span className="text-accent italic">all shipped</span>
        </h1>
        <p className="t-lead mt-7 max-w-[50ch]">
          Developer tools, a chat platform and a few experiments where the
          interface needed something behind it. Each entry says what I actually
          built, not just the stack.
        </p>
      </header>

      <WorkIndex
        items={projects}
        total={projects.length}
        index="01"
        eyebrow="Archive"
        title="The full index"
        showAll={false}
      />

      <p className="shell t-meta mt-10">
        {site.github.publicRepos} public repos on GitHub — these are the ones
        with a story
      </p>
    </main>
  )
}
