/**
 * GSAP is loaded on demand, never at module scope.
 *
 * TanStack Start renders these routes on the server: registering plugins (or
 * touching `window`) while the module is evaluated would either crash the SSR
 * pass or pull ~50KB of animation code into the entry chunk. Importing inside
 * an effect keeps GSAP in its own lazily fetched chunk and out of the server
 * bundle path.
 */
export type GsapModule = typeof import('gsap')
export type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')
export type SplitTextModule = typeof import('gsap/SplitText')

export type MotionBundle = {
  gsap: GsapModule['gsap']
  ScrollTrigger: ScrollTriggerModule['ScrollTrigger']
  SplitText: SplitTextModule['SplitText']
}

let bundle: Promise<MotionBundle> | null = null

export function loadMotion(): Promise<MotionBundle> {
  bundle ??= (async () => {
    const [gsapModule, scrollTriggerModule, splitTextModule] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
    ])

    const { gsap } = gsapModule
    const { ScrollTrigger } = scrollTriggerModule
    const { SplitText } = splitTextModule

    gsap.registerPlugin(ScrollTrigger, SplitText)

    return { gsap, ScrollTrigger, SplitText }
  })()

  return bundle
}
