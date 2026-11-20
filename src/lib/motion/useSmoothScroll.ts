import { useEffect } from 'react'
import { motionAllowed } from './timing'

declare global {
  interface Window {
    /** Present only while Lenis is active; used by anchor links and the footer. */
    __lenis?: {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: { immediate?: boolean; offset?: number },
      ) => void
      destroy: () => void
    }
  }
}

/**
 * Smooth wheel scrolling, desktop only.
 *
 * Two deliberate constraints:
 *  - skipped entirely under `prefers-reduced-motion: reduce` (native scroll wins);
 *  - wheel only (`syncTouch` off) so touch devices keep their own momentum,
 *    which is faster and more predictable than any JS emulation.
 *
 * Lenis is driven from GSAP's ticker instead of its own raf so ScrollTrigger
 * and the scroll position can never disagree by a frame.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (!motionAllowed()) {
      return
    }

    let disposed = false
    let teardown: (() => void) | undefined

    void (async () => {
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import('lenis'),
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ])

        if (disposed) {
          return
        }

        gsap.registerPlugin(ScrollTrigger)

        const lenis = new Lenis({
          autoRaf: false,
          duration: 1.05,
          wheelMultiplier: 0.92,
          touchMultiplier: 1.5,
          syncTouch: false,
          /* Hash links (the hero's "selected work" cue) scroll smoothly too,
             instead of jumping past the smooth scroller. */
          anchors: { offset: -96 },
        })

        window.__lenis = lenis
        lenis.on('scroll', ScrollTrigger.update)

        const tick = (time: number) => lenis.raf(time * 1000)
        gsap.ticker.add(tick)
        gsap.ticker.lagSmoothing(0)

        teardown = () => {
          gsap.ticker.remove(tick)
          gsap.ticker.lagSmoothing(500, 33)
          lenis.destroy()
          delete window.__lenis
        }
      } catch {
        /* No smooth scroll is a valid experience; never block the page on it. */
      }
    })()

    return () => {
      disposed = true
      teardown?.()
    }
  }, [])
}
