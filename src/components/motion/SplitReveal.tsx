import { useEffect, useRef } from 'react'
import { loadMotion } from '../../lib/motion/gsap'
import type { MotionBundle } from '../../lib/motion/gsap'
import { motionAllowed } from '../../lib/motion/timing'

type SplitInstance = InstanceType<MotionBundle['SplitText']>

export type SplitMode = 'chars' | 'lines' | 'words'

export type SplitRevealProps = {
  children: React.ReactNode
  className?: string
  /** `chars` for headlines, `lines` for paragraphs that build line by line. */
  mode?: SplitMode
  delay?: number
  stagger?: number
  start?: string
  /** Set false to play on mount instead of when scrolled into view. */
  onScroll?: boolean
}

/**
 * Splits text into characters or lines and reveals it from a masked offset.
 *
 * Progressive enhancement, in this order:
 *  1. Server + no-JS render: the plain text, fully visible.
 *  2. Reduced motion: stays that way — nothing is split, nothing hides.
 *  3. Otherwise GSAP SplitText splits after hydration and animates with a
 *     ScrollTrigger, and the split is reverted on unmount so the DOM is clean.
 *
 * `aria="auto"` keeps screen readers on the whole sentence instead of reading
 * a pile of one-letter spans.
 */
export default function SplitReveal({
  children,
  className = '',
  mode = 'chars',
  delay = 0,
  stagger,
  start = 'top 85%',
  onScroll = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !motionAllowed()) {
      return
    }

    let cancelled = false
    let split: SplitInstance | null = null
    let context: { revert: () => void } | null = null

    void loadMotion()
      .then(({ gsap, SplitText }) => {
        if (cancelled) {
          return
        }

        context = gsap.context(() => {
          split = new SplitText(element, {
            type: mode === 'chars' ? 'words,chars' : mode,
            mask: mode === 'lines' ? 'lines' : undefined,
            charsClass: 'split-char',
            linesClass: 'split-line',
            aria: 'auto',
          })

          const targets = mode === 'chars' ? split.chars : split.lines

          gsap.from(targets, {
            yPercent: mode === 'chars' ? 55 : 105,
            opacity: 0,
            rotate: mode === 'chars' ? 3 : 0,
            duration: mode === 'chars' ? 0.85 : 1,
            ease: 'expo.out',
            stagger: stagger ?? (mode === 'chars' ? 0.014 : 0.075),
            delay,
            scrollTrigger: onScroll
              ? { trigger: element, start, once: true }
              : undefined,
          })
        }, element)
      })
      .catch(() => {
        /* Split never ran — the text was visible all along. */
      })

    return () => {
      cancelled = true
      split?.revert()
      context?.revert()
    }
  }, [mode, delay, stagger, start, onScroll])

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  )
}
