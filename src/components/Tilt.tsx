import { useCallback, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { prefersReducedMotion } from '../lib/motion/timing'

export type TiltProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the edges. Keep it under ~8; past that it reads as a toy. */
  max?: number
}

/**
 * Pointer tilt for buttons and panels.
 *
 * No animation library: the pointer sets a target rotation, one rAF loop lerps
 * towards it and stops when it arrives, so the element costs nothing while the
 * pointer is still. Reduced motion and touch get a static element.
 */
export default function Tilt({ children, className, max = 6 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const frame = useRef<number | null>(null)

  const step = useCallback(() => {
    const element = ref.current
    if (!element) {
      return
    }

    current.current.x += (target.current.x - current.current.x) * 0.14
    current.current.y += (target.current.y - current.current.y) * 0.14

    element.style.transform = `perspective(900px) rotateX(${current.current.x.toFixed(2)}deg) rotateY(${current.current.y.toFixed(2)}deg)`

    const settled =
      Math.abs(target.current.x - current.current.x) < 0.02 &&
      Math.abs(target.current.y - current.current.y) < 0.02

    frame.current = settled ? null : requestAnimationFrame(step)
  }, [])

  const kick = useCallback(() => {
    if (frame.current === null) {
      frame.current = requestAnimationFrame(step)
    }
  }, [step])

  useEffect(() => {
    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current)
      }
    }
  }, [])

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    target.current.y = px * max * 2
    target.current.x = -py * max * 2
    kick()
  }

  function reset() {
    target.current.x = 0
    target.current.y = 0
    kick()
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      {children}
    </div>
  )
}
