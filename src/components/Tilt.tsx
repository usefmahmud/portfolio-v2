import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { ReactNode } from 'react'

export type TiltProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the edges. Keep it under ~8; past that it reads as a toy. */
  max?: number
}

/**
 * Pointer tilt for buttons and panels.
 *
 * Rotation is driven by Motion values and springs (never by React state), so
 * the card keeps 60fps while the pointer moves and snaps back with a little
 * weight on leave. Touch and reduced-motion both get a static element.
 */
export default function Tilt({ children, className, max = 6 }: TiltProps) {
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18, mass: 0.35 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18, mass: 0.35 })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== 'mouse') {
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={
        reduceMotion
          ? undefined
          : { rotateX: springX, rotateY: springY, transformPerspective: 900 }
      }
    >
      {children}
    </motion.div>
  )
}
