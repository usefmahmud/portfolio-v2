import { site } from '../content'
import Reveal from './motion/Reveal'
import SplitReveal from './motion/SplitReveal'

/**
 * Playbook: how the work gets made, in four rules.
 *
 * Deliberately a numbered list, not a bento grid — the reference research is
 * explicit that a developer portfolio in a bento layout reads as a template.
 * The number sits on the rule line, the serif title carries the hierarchy.
 */
export default function Playbook() {
  return (
    <section
      aria-labelledby="playbook-heading"
      className="shell mt-24 sm:mt-32"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-4">
          <h2 id="playbook-heading" className="t-title text-ink">
            <SplitReveal>How I work, in four rules</SplitReveal>
          </h2>
          <p className="t-body mt-6 max-w-[32ch] text-[0.95rem]">
            Each rule is behind a project on this page, so you can check the
            claim.
          </p>
        </div>

        <ol className="m-0 grid list-none gap-x-10 border-b border-line p-0 sm:grid-cols-2 lg:col-span-8">
          {site.playbook.map((step, position) => (
            <li key={step.title} className="border-t border-line py-6">
              <Reveal delay={position * 0.06}>
                <span className="t-num">
                  {String(position + 1).padStart(2, '0')}
                </span>
                <h3 className="t-heading mt-2 text-ink">{step.title}</h3>
                <p className="t-body mt-2 mb-0 max-w-[42ch] text-[0.94rem]">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
