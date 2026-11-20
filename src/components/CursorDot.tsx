import { useEffect } from 'react'
import { loadMotion } from '../lib/motion/gsap'
import { hasFinePointer, motionAllowed } from '../lib/motion/timing'

/**
 * A small ring that trails the pointer and grows over interactive elements.
 *
 * Constraints that keep it from being an accessibility problem:
 *  - the native cursor is never hidden (this is additive, not a replacement);
 *  - not rendered at all on touch devices or under reduced motion;
 *  - it is `pointer-events: none` and `aria-hidden`, so it can never intercept
 *    a click or appear in the accessibility tree.
 */
export default function CursorDot() {
  useEffect(() => {
    if (!motionAllowed() || !hasFinePointer()) {
      return
    }

    let cancelled = false
    let teardown: (() => void) | undefined

    void loadMotion()
      .then(({ gsap }) => {
        if (cancelled) {
          return
        }

        const dot = document.createElement('div')
        dot.setAttribute('aria-hidden', 'true')
        dot.className =
          'cursor-dot pointer-events-none fixed top-0 left-0 z-[70] hidden size-2.5 rounded-full border border-accent/70 mix-blend-normal'
        document.body.appendChild(dot)

        gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0 })

        const moveX = gsap.quickTo(dot, 'x', { duration: 0.5, ease: 'power3.out' })
        const moveY = gsap.quickTo(dot, 'y', { duration: 0.5, ease: 'power3.out' })

        const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary'

        const onMove = (event: PointerEvent) => {
          gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: 'auto' })
          moveX(event.clientX)
          moveY(event.clientY)
        }

        const onOver = (event: PointerEvent) => {
          const target = event.target
          const interactive =
            target instanceof Element ? target.closest(INTERACTIVE) : null
          gsap.to(dot, {
            scale: interactive ? 2.4 : 1,
            opacity: interactive ? 0.55 : 1,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }

        const onLeave = () => gsap.to(dot, { opacity: 0, duration: 0.2 })

        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerover', onOver, { passive: true })
        document.addEventListener('pointerleave', onLeave)

        teardown = () => {
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('pointerover', onOver)
          document.removeEventListener('pointerleave', onLeave)
          dot.remove()
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
      teardown?.()
    }
  }, [])

  return null
}
