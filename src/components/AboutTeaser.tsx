import { Link } from '@tanstack/react-router'
import { site } from '../content'
import { ArrowRightIcon } from './Icons'
import SplitReveal from './motion/SplitReveal'

/**
 * About teaser: the one block on the page that builds line by line as you
 * scroll (the scroll-storytelling move from the reference sites), sized at
 * heading scale so the type itself is the layout.
 *
 * The lede *is* the section heading. A tiny "About" label sat in the margin
 * here in W2; the words carried no meaning the copy does not already carry, so
 * the heading does the work and the block keeps the offset rhythm instead.
 */
export default function AboutTeaser() {
  const first = site.about.paragraphs[0]

  return (
    <section aria-labelledby="about-heading" className="shell mt-24 sm:mt-32">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-9 lg:col-start-4">
          <h2 id="about-heading" className="t-heading max-w-[26ch] text-ink">
            <SplitReveal mode="lines">{site.about.lede}</SplitReveal>
          </h2>

          {first ? (
            <p className="t-body mt-6 mb-0 max-w-[58ch] text-[0.98rem]">
              {first}
            </p>
          ) : null}

          <Link
            to="/about"
            className="link-line mt-6 inline-flex min-h-11 items-center gap-2 text-sm text-ink no-underline"
          >
            More about me
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
