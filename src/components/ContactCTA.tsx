import { site } from '../content'
import { ArrowUpRightIcon } from './Icons'
import SplitReveal from './motion/SplitReveal'

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-heading" className="shell mt-24 sm:mt-32">
      <div className="border-t border-line pt-8">
        <h2
          id="contact-heading"
          className="t-display max-w-[14ch] text-ink"
        >
          <SplitReveal mode="chars">Got something to build?</SplitReveal>
        </h2>

        <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-baseline gap-3 text-ink no-underline"
          >
            <span className="link-line text-[clamp(1.15rem,2.8vw,1.75rem)] tracking-[-0.01em]">
              {site.email}
            </span>
            <ArrowUpRightIcon className="arrow-nudge size-5 shrink-0 text-accent" />
          </a>
          <div className="t-meta flex flex-col gap-1 sm:items-end sm:text-right">
            <span>Replies within a day</span>
            <span>CV and references on request</span>
          </div>
        </div>
      </div>
    </section>
  )
}
