import { createFileRoute } from '@tanstack/react-router'
import AboutTeaser from '../components/AboutTeaser'
import ContactCTA from '../components/ContactCTA'
import Hero from '../components/Hero'
import Playbook from '../components/Playbook'
import WorkIndex from '../components/WorkIndex'
import { featuredProjects, projects, site } from '../content'

const DESCRIPTION = `${site.role} in ${site.location}. ${site.headline}`

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.role}` },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: `${site.name} — ${site.role}` },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: `${site.url}/` },
    ],
    links: [{ rel: 'canonical', href: `${site.url}/` }],
  }),
  component: HomePage,
})

function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <WorkIndex
        items={featuredProjects}
        total={projects.length}
        index="01"
        title="Three things worth opening"
      />
      <Playbook />
      <AboutTeaser />
      <ContactCTA index="04" />
    </main>
  )
}
