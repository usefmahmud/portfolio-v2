/**
 * One motion vocabulary for the whole site.
 *
 * Every animation — CSS or GSAP — reads from this ladder. A portfolio reads as
 * "templated" when each section invents its own easing and duration; keeping a
 * single curve + three durations is most of what makes motion feel authored.
 */

export const DURATION = {
  /** Hover states, colour changes. */
  fast: 0.28,
  /** Entrances, reveals. */
  base: 0.65,
  /** Scroll-scrubbed storytelling, large type. */
  slow: 1.1,
} as const

export const STAGGER = {
  /** Per-character reveal inside a headline. */
  char: 0.014,
  /** Per-line reveal inside a paragraph. */
  line: 0.075,
} as const

/** GSAP easing names — mirrors `--ease-expo` in styles.css. */
export const EASE = {
  out: 'expo.out',
  inOut: 'power3.inOut',
} as const

export function prefersReducedMotion(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Animation may run: client-side and the visitor has not asked for less motion. */
export function motionAllowed(): boolean {
  return typeof window !== 'undefined' && !prefersReducedMotion()
}

/** Pointer-driven decoration (cursor follower, tilt) needs a real pointer. */
export function hasFinePointer(): boolean {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return false
  }
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
