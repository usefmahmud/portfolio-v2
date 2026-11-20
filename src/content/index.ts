import projectsJson from './projects.json'
import siteJson from './site.json'

export type ProjectStatus = 'active' | 'maintained' | 'archived'

export type SiteLink = {
  label: string
  href: string
  handle: string
}

export type Site = {
  name: string
  shortName: string
  monogram: string
  role: string
  location: string
  timezone: string
  experienceYears: number
  availability: string
  headline: string
  intro: string
  github: {
    handle: string
    url: string
    publicRepos: number
  }
  email: string
  links: SiteLink[]
  focus: string[]
}

export type Project = {
  slug: string
  name: string
  tagline: string
  summary: string
  year: number
  role: string
  status: ProjectStatus
  stack: string[]
  highlights: string[]
  repo: string
  homepage: string | null
  featured: boolean
}

/* -------------------------------------------------------------------------- */
/* Runtime validation                                                          */
/*                                                                            */
/* JSON modules are `unknown` at the boundary, so every field is checked once  */
/* here. A typo in content/data fails the build instead of reaching the page.  */
/* -------------------------------------------------------------------------- */

const PROJECT_STATUSES: readonly ProjectStatus[] = [
  'active',
  'maintained',
  'archived',
]

function fail(path: string, expected: string): never {
  throw new Error(`[content] ${path} must be ${expected}`)
}

function asRecord(value: unknown, path: string): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    fail(path, 'an object')
  }
  return value as Record<string, unknown>
}

function asString(source: Record<string, unknown>, key: string, path: string) {
  const value = source[key]
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`${path}.${key}`, 'a non-empty string')
  }
  return value
}

function asNumber(source: Record<string, unknown>, key: string, path: string) {
  const value = source[key]
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    fail(`${path}.${key}`, 'a finite number')
  }
  return value
}

function asBoolean(source: Record<string, unknown>, key: string, path: string) {
  const value = source[key]
  if (typeof value !== 'boolean') {
    fail(`${path}.${key}`, 'a boolean')
  }
  return value
}

function asNullableString(
  source: Record<string, unknown>,
  key: string,
  path: string,
) {
  const value = source[key]
  if (value === null) {
    return null
  }
  if (typeof value !== 'string' || value.trim() === '') {
    fail(`${path}.${key}`, 'a non-empty string or null')
  }
  return value
}

function asStringArray(
  source: Record<string, unknown>,
  key: string,
  path: string,
) {
  const value = source[key]
  if (!Array.isArray(value) || value.length === 0) {
    fail(`${path}.${key}`, 'a non-empty array')
  }
  return value.map((entry, index) => {
    if (typeof entry !== 'string' || entry.trim() === '') {
      fail(`${path}.${key}[${index}]`, 'a non-empty string')
    }
    return entry
  })
}

function asStatus(source: Record<string, unknown>, key: string, path: string) {
  const value = source[key]
  if (typeof value !== 'string') {
    fail(`${path}.${key}`, 'a status string')
  }
  const status = PROJECT_STATUSES.find((candidate) => candidate === value)
  if (!status) {
    fail(
      `${path}.${key}`,
      `one of ${PROJECT_STATUSES.map((s) => `"${s}"`).join(', ')}`,
    )
  }
  return status
}

function parseSite(raw: unknown): Site {
  const root = asRecord(raw, 'site')
  const github = asRecord(root.github, 'site.github')

  const links = asRecordArray(root.links, 'site.links').map((entry, index) => {
    const path = `site.links[${index}]`
    return {
      label: asString(entry, 'label', path),
      href: asString(entry, 'href', path),
      handle: asString(entry, 'handle', path),
    }
  })

  return {
    name: asString(root, 'name', 'site'),
    shortName: asString(root, 'shortName', 'site'),
    monogram: asString(root, 'monogram', 'site'),
    role: asString(root, 'role', 'site'),
    location: asString(root, 'location', 'site'),
    timezone: asString(root, 'timezone', 'site'),
    experienceYears: asNumber(root, 'experienceYears', 'site'),
    availability: asString(root, 'availability', 'site'),
    headline: asString(root, 'headline', 'site'),
    intro: asString(root, 'intro', 'site'),
    github: {
      handle: asString(github, 'handle', 'site.github'),
      url: asString(github, 'url', 'site.github'),
      publicRepos: asNumber(github, 'publicRepos', 'site.github'),
    },
    email: asString(root, 'email', 'site'),
    links,
    focus: asStringArray(root, 'focus', 'site'),
  }
}

function asRecordArray(value: unknown, path: string) {
  if (!Array.isArray(value) || value.length === 0) {
    fail(path, 'a non-empty array')
  }
  return value.map((entry, index) => asRecord(entry, `${path}[${index}]`))
}

function parseProject(raw: unknown, path: string): Project {
  const entry = asRecord(raw, path)
  return {
    slug: asString(entry, 'slug', path),
    name: asString(entry, 'name', path),
    tagline: asString(entry, 'tagline', path),
    summary: asString(entry, 'summary', path),
    year: asNumber(entry, 'year', path),
    role: asString(entry, 'role', path),
    status: asStatus(entry, 'status', path),
    stack: asStringArray(entry, 'stack', path),
    highlights: asStringArray(entry, 'highlights', path),
    repo: asString(entry, 'repo', path),
    homepage: asNullableString(entry, 'homepage', path),
    featured: asBoolean(entry, 'featured', path),
  }
}

function parseProjects(raw: unknown): Project[] {
  const root = asRecord(raw, 'projects file')
  const projects = asRecordArray(root.projects, 'projects').map(
    (entry, index) => parseProject(entry, `projects[${index}]`),
  )

  const seen = new Set<string>()
  for (const project of projects) {
    if (seen.has(project.slug)) {
      fail(`projects.${project.slug}`, 'a unique slug')
    }
    seen.add(project.slug)
  }

  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1
    }
    return b.year - a.year || a.name.localeCompare(b.name)
  })
}

export const site: Site = parseSite(siteJson)

export const projects: readonly Project[] = parseProjects(projectsJson)

export const featuredProjects: readonly Project[] = projects.filter(
  (project) => project.featured,
)

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  previous: Project | undefined
  next: Project | undefined
} {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) {
    return { previous: undefined, next: undefined }
  }
  return { previous: projects[index - 1], next: projects[index + 1] }
}

export function projectYearsLabel(): string {
  const years = projects.map((project) => project.year)
  const oldest = Math.min(...years)
  const newest = Math.max(...years)
  return oldest === newest ? String(newest) : `${oldest}—${newest}`
}
