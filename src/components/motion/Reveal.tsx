import { useEffect, useRef } from 'react'
import { loadMotion } from '../../lib/motion/gsap'
import { motionAllowed } from '../../lib/motion/timing'

export type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Distance in px the block travels up on entrance. */
  y?: number
  delay?: number
  /** Stagger direct matches of `selector` inside the wrapper instead of the wrapper itself. */
  selector?: string
  stagger?: number
  start?: string
}

/**
 * Block-level entrance: opacity + a short lift, triggered once when the block
 * enters the viewport. Same curve and duration ladder as the split type
 * (expo.out, 0.8s) so sections do not each invent their own motion.
 */
export default function Reveal({
  children,
  className,
  y = 22,
  delay = 0,
  selector,
  stagger = 0.06,
  start = 'top 88%',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !motionAllowed()) {
      return
    }

    let cancelled = false
    let context: { revert: () => void } | null = null

    void loadMotion()
      .then(({ gsap }) => {
        if (cancelled) {
          return
        }

        context = gsap.context(() => {
          const targets = selector
            ? Array.from(element.querySelectorAll<HTMLElement>(selector))
            : [element]

          if (targets.length === 0) {
            return
          }

          gsap.from(targets, {
            y,
            opacity: 0,
            duration: 0.8,
            ease: 'expo.out',
            delay,
            stagger: selector ? stagger : 0,
            scrollTrigger: { trigger: element, start, once: true },
          })
        }, element)
      })
      .catch(() => {})

    return () => {
      cancelled = true
      context?.revert()
    }
  }, [y, delay, selector, stagger, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
