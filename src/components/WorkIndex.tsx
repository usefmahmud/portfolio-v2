import { Link } from '@tanstack/react-router'
import type { Project } from '../content'
import { ArrowUpRightIcon } from './Icons'
import Reveal from './motion/Reveal'
import SplitReveal from './motion/SplitReveal'

type WorkIndexProps = {
  items: readonly Project[]
  total: number
  /** Section number in the page's running order. */
  index?: string
  eyebrow?: string
  title?: string
  /** Hide the "all projects" link when this list *is* the full archive. */
  showAll?: boolean
}

/**
 * The work list is a typographic index, not a card grid.
 *
 * Each row is a grid: number / title / tagline / year+stack / arrow. Hover
 * draws a hairline across the top of the row and colours the title with the
 * single accent — the whole row is still one link, still a 44px+ target, still
 * keyboard reachable, and nothing moves enough to shift layout.
 */
export default function WorkIndex({
  items,
  total,
  index = '01',
  eyebrow = 'Selected work',
  title = 'Four things worth opening',
  showAll = true,
}: WorkIndexProps) {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="shell mt-24 scroll-mt-28 sm:mt-32"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="t-meta m-0">
            ({index}) {eyebrow}
          </p>
          <h2 id="work-heading" className="t-title mt-3 max-w-[16ch] text-ink">
            <SplitReveal>{title}</SplitReveal>
          </h2>
        </div>
        {showAll ? (
          <Link
            to="/projects"
            className="link-line hidden min-h-6 shrink-0 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink sm:inline-flex"
          >
            All {total} projects
            <ArrowUpRightIcon className="arrow-nudge size-4" />
          </Link>
        ) : (
          <p className="t-meta m-0 hidden shrink-0 sm:block">{total} entries</p>
        )}
      </div>

      <Reveal className="mt-10" selector="[data-row]" stagger={0.07} y={18}>
        <ul className="m-0 list-none p-0">
          {items.map((project, position) => (
            <li key={project.slug} data-row>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="work-row group"
              >
                <span className="t-num pt-2">
                  {String(position + 1).padStart(2, '0')}
                </span>

                <span className="work-title col-start-2 text-ink md:col-start-auto">
                  {project.name}
                </span>

                <span className="t-body col-start-2 max-w-[44ch] text-[0.94rem] md:col-start-auto">
                  {project.tagline}
                </span>

                <span className="col-start-2 md:col-start-auto">
                  <span className="t-meta block">{project.year}</span>
                  <span className="t-meta mt-1 block normal-case tracking-[0.05em]">
                    {project.stack.slice(0, 2).join(' · ')}
                  </span>
                </span>

                <span className="hidden self-center justify-self-end md:block">
                  <ArrowUpRightIcon className="arrow-nudge size-5 text-ink-faint" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Link
        to="/projects"
        className="link-line mt-8 inline-flex min-h-11 items-center gap-2 text-sm text-ink-muted no-underline transition-colors duration-200 hover:text-ink sm:hidden"
        hidden={!showAll}
      >
        All {total} projects
        <ArrowUpRightIcon className="size-4" />
      </Link>
    </section>
  )
}
