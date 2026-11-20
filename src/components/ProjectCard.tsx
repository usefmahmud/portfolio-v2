import { Link } from '@tanstack/react-router'
import { motion, useReducedMotion } from 'motion/react'
import type { Project } from '../content'
import { ArrowUpRightIcon, GitHubIcon } from './Icons'

const STATUS_LABEL: Record<Project['status'], string> = {
  active: 'Active',
  maintained: 'Maintained',
  archived: 'Archived',
}

type ProjectCardProps = {
  project: Project
  /** Featured cards get the larger layout on the home page. */
  emphasis?: boolean
}

export default function ProjectCard({
  project,
  emphasis = false,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="group relative flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3
            className={`m-0 font-semibold tracking-[-0.01em] text-ink ${
              emphasis ? 'text-xl' : 'text-lg'
            }`}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="no-underline after:absolute after:inset-0 after:content-['']"
            >
              {project.name}
            </Link>
          </h3>
          <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] tracking-wide text-ink-faint uppercase">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent"
            />
            {STATUS_LABEL[project.status]}
          </span>
        </div>

        <p className="mt-3 mb-0 max-w-[46ch] text-sm leading-relaxed text-ink-muted">
          {project.tagline}
        </p>

        <ul className="mt-5 mb-0 flex list-none flex-wrap gap-1.5 p-0">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line bg-surface-raised px-2.5 py-1 font-mono text-[0.68rem] text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-ink-faint">
          {project.year} · {project.role}
        </span>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${project.name} source on GitHub`}
          className="relative z-10 inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 hover:text-ink"
        >
          <GitHubIcon className="size-4" />
        </a>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-6 right-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        <ArrowUpRightIcon className="size-4 text-ink-faint" />
      </span>
    </motion.article>
  )
}
