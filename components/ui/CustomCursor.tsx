"use client"

// REVIEW: spring values — stiffness 300/damping 28 for dot, 150/20 for ring
// If cursor feels laggy: increase stiffness. If overshooting: increase damping.

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Dot: snappy
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28 })
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28 })

  // Ring: slower trail
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true)
      return
    }

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    window.addEventListener("mousemove", handleMove)
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[var(--accent)]" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="w-10 h-10 rounded-full border border-[var(--accent)] opacity-40 transition-[width,height] duration-500 [[data-theme=light]_&]:w-14 [[data-theme=light]_&]:h-14 [[data-theme=light]_&]:opacity-30" />
      </motion.div>
    </>
  )
}
