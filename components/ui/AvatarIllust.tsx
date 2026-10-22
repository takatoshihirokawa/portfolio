"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const FACE = { cx: 272, cy: 138, vw: 432.39, vh: 586.69 }
const EYES = [
  { cx: 244, cy: 145 },
  { cx: 306, cy: 146 },
]
const TURNS_TO_DIZZY = 1.5

export default function AvatarIllust({ className, onDizzy }: { className?: string; onDizzy?: () => void }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dizzy, setDizzy] = useState(false)
  const dizzyRef = useRef(false)
  const orbit = useRef({ last: 0, total: 0, lastT: 0 })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const eyeX = useSpring(rawX, { stiffness: 100, damping: 18 })
  const eyeY = useSpring(rawY, { stiffness: 100, damping: 18 })

  useEffect(() => {
    const MAX_OFFSET = 3.5

    const handlePoint = (px: number, py: number) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const faceCx = rect.left + rect.width * (FACE.cx / FACE.vw)
      const faceCy = rect.top + rect.height * (FACE.cy / FACE.vh)
      const dx = px - faceCx
      const dy = py - faceCy
      const angle = Math.atan2(dy, dx)

      if (!dizzyRef.current) {
        rawX.set(Math.cos(angle) * MAX_OFFSET)
        rawY.set(Math.sin(angle) * MAX_OFFSET)
      }

      const dist = Math.hypot(dx, dy)
      const now = performance.now()
      const o = orbit.current
      const inRing = dist > rect.width * 0.12 && dist < rect.width * 0.7
      if (!inRing || now - o.lastT > 500) {
        o.last = angle
        o.total = 0
        o.lastT = now
        return
      }
      let d = angle - o.last
      if (d > Math.PI) d -= Math.PI * 2
      if (d < -Math.PI) d += Math.PI * 2
      o.total += d
      o.last = angle
      o.lastT = now

      if (Math.abs(o.total) > Math.PI * 2 * TURNS_TO_DIZZY && !dizzyRef.current) {
        dizzyRef.current = true
        o.total = 0
        setDizzy(true)
        window.setTimeout(() => onDizzy?.(), 900)
        window.setTimeout(() => {
          setDizzy(false)
          dizzyRef.current = false
        }, 2000)
      }
    }

    const onMouse = (e: MouseEvent) => handlePoint(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) handlePoint(t.clientX, t.clientY)
    }
    window.addEventListener("mousemove", onMouse)
    const svg = svgRef.current
    svg?.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMouse)
      svg?.removeEventListener("touchmove", onTouch)
    }
  }, [rawX, rawY, onDizzy])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 432.39 586.69"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      style={{ touchAction: "none" }}
    >
      <motion.g
        animate={dizzy ? { x: [0, -7, 7, -5, 5, -3, 3, 0] } : { x: 0 }}
        transition={dizzy ? { duration: 0.9, repeat: 1, ease: "easeInOut" } : { duration: 0.3 }}
      >
      {/* Body */}
      <path d="M13.99,585.77c34.3,0,61.03,1.09,95.49.85,28.94-.2,55.05.39,84.12-.21,33.84-.7,59.49,1.06,93.08-.38,32.88-1.41,53.28,1.6,86.09-.24,7.42-.42,21.96-.88,35.38-1.09,2.74-.04,14.28-.25,17.91-.37,5.49-.18,6.57-4.52,6.29-8.78-.78-11.8-2.81-42.11-3.84-55-.41-5.06-1.44-12.83-3.22-25.74-2.33-16.92-4.92-92.66-11.58-105.37-4.58-8.75-10.83-17.23-17.5-24.51-3.29-3.59-8.98-10.96-15.77-15.81-2.26-1.61-12.33-4.79-15.67-5.99-23.9-8.58-48.3-16.62-72.37-24.67-5.65-1.89-20.36-4.73-23.88-8.28-1.3-1.31-1.99-1.9-2.82-2.71-.75-.74-1.56-1.84-2.21-3.16-.39-.8-1.8-7.11-1.99-8.37-1.39-9.43-2.54-22.58-2.79-32.1-.04-1.43-.21-7.86.65-8.4,3.68-.03,7.43-.22,11.12-.1,6.93.23,20.12,3,25.83-.83s15.18-22.6,18.12-29.31c7.42-16.88,14.05-36.7,17.73-54.78,1.61-7.92,4.62-22.7,3.41-30.33-.73-4.64-7.06-5.2-7.43.04-.93,13.15-2.93,25.51-6.44,38.36-6.39,23.38-15.66,47.4-30.27,66.77-10.42,1.57-21.96-1.27-32.27-.11-7.33.82-11.02,3.81-10.77,11.57.41,12.72,1.63,28.82,3.27,41.43.52,3.98,2.4,14.96,5.79,17.11,2.95,1.87,10.76,5.46,14.25,7.01,2.56,1.13,5.65,1.12,7.76,3.15.19.78-.69,1.17-1.13,1.59-8.37,7.81-27.72,15.55-38.79,19-27.04,8.41-62.76,9.49-90.39,3.42-10.87-2.39-21.53-5.71-30.82-11.9-.06-.72-.49-1.89,0-2.4,1.49-1.56,7.87-4.5,10.3-6.27,7.25-5.28,14.23-10.92,21.64-15.97,1.62-1.65,1.33-4.17-.58-5.43-4.42-2.89-11.03,4.48-14.51,6.68-6.81,4.31-15.35,7.56-21.22,13.02-4.52-11.4-13.47-6.93-11.97,3.86.19,1.36,1.22,2.83-.78,4.2-9.25,5.18-18.12,11.13-27.45,16.18-8.42,4.56-17.25,8.29-25.61,13.09-5.71,3.28-23.82,13.32-27.61,17.09-1.3,1.29-1.64,1.7-2.45,2.73-.55.7-1.62,1.67-2.48,2.85-5.63,7.77-8.33,39.55-9.27,50-3.11,34.48-5.97,77.66-5.97,103.61C.36,540.8,0,561.38,0,569.24c0,17.97,1.41,16.53,13.99,16.53Z" />

      {/* Head / hair */}
      <path d="M355.22,85.85s-2.37,12.73-3.42,16.49c-1.93,6.89-5.72,18.47-11.02,23.85-6.35,6.44-8.1-4.9-9.82-9.26-5.6-14.15-11.2-29.72-18.7-42.9-3.35-5.88-9.64-14.32-15.6-17.65-1-.56-5.61-1-7.09-1.09-13.67-.83-27.87,1.41-41.35,3.4-.47.1-.62.43-.84.8-1.57,2.56-7.5,16.8-8.94,20.34-6.26,15.41-11.03,24.94-17.03,44.36-2.69,8.69-5.05,19.38-5.59,29.63-.07,1.3.23,6.98.19,8.09-.05,1.24-1.98,2.98-3.24,2.87-6.46-.56-16.91-20.06-18.91-26.04-.52-.79-1.46-.13-1.71.61-1.66,4.88-2.82,18.01-5.87,20.42-5.75,4.54-6.99-2.72-12.48-7.71-1.47-1.33-3.46-2.96-5.6-4.64-3.3-2.58-6.42-4.55-10.71-5.29-11.62-1.99-22.9,11.2-21.26,22.35.83,5.67,7.3,14.14,11.59,17.85,3.61,3.12,14.11,7.38,16.33,10.38,1.66,2.24,3.31,12.91,3.55,16.08,1.81,24.7,2.2,55.46,0,80.12-.56,6.25-1.18,15.57-7.91,18.05-.86.06-3.35-2.97-3.67-3.74-1.06-2.54.51-10.54.67-13.77.93-17.82,1.43-35.57,1.62-53.44.16-14.8,3.16-32.72-8.99-43.3-13.85-12.06-25.13-16.8-21.46-38.39.65-3.82,5.49-12.07,5.39-13.64-.06-.98-1.52-3.43-2.07-4.51-5.56-10.91-12.47-31.68-13.19-44.06-1.74-29.95,23.46-51.76,47.06-65.23,9.8-5.6,20.59-11.17,32.25-10.26,1.95.15,3.91,1.39,5.87,1,1.17-.24,9.1-6.07,11.29-7.28,8.51-4.7,19.14-8.51,28.79-9.92,13.83-2.01,39.29,3.72,52.73,8.55,24.15,8.69,50.26,31.84,63.4,53.81,3.85,6.45,8.38,16.95,8.84,24.45.1,1.63-.08,3.56-1.09,4.9s-3.05,5.24-7.09,1.66c-1-.88-4.24-4.56-4.91-7.93Z" />

      {/* Nose */}
      <path d="M284.98,178.99c-1.41-.9-7.57-28.86-8.11-32.51-.93-6.25-1.89-13.28,1.58-18.85,1.14-1.83,6.92-8.49,8.9-8.5,7.6-.02-3.49,12.28-4.21,14.28-.85,2.38-.15,5.63.27,8.15,1.72,10.37,5.65,21.01,7.45,31.25.8,4.57-1.09,7.21-5.89,6.16Z" />

      {/* Mouth */}
      <path d="M261.61,200.46c2.67-2.84,8.66.86,11.85,1.77,3.43.98,13.01,1.11,11.21,6.84-2.16,6.86-19.13,1.12-22.66-3.01-1.18-1.38-1.66-4.25-.39-5.59Z" />

      {/* Eyes — mouse tracking */}

      {/* Eyes — mouse tracking */}
      <motion.g style={{ x: eyeX, y: eyeY }} animate={{ opacity: dizzy ? 0 : 1 }} transition={{ duration: 0.15 }}>
        {/* Left eye */}
        <path d="M243.34,138.31c2.72-.14,6.98,1.69,7.65,4.62,2.21,9.57-12.38,12.58-13.95,1.38-.53-3.79,2.89-5.82,6.3-5.99Z" />
        {/* Right eye */}
        <path d="M302.2,139.91c5.75-1.6,12.37,6.19,7.48,11.33-8.77,9.23-16.41-8.84-7.48-11.33Z" />
      </motion.g>

      {/* Dizzy spirals */}
      {dizzy &&
        EYES.map((eye, i) => (
          <g key={i} transform={`translate(${eye.cx} ${eye.cy})`}>
            <motion.g
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: 1440, scale: 1 }}
              transition={{ rotate: { duration: 1.8, ease: "easeOut" }, scale: { duration: 0.2 } }}
            >
              <path
                d="M0 0 C 2 -1, 3 2, 1 3 C -2 4, -4 0, -2 -3 C 1 -6, 6 -3, 5 2 C 4 7, -3 8, -6 4 C -9 0, -6 -8, 0 -9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </motion.g>
          </g>
        ))}
      </motion.g>
    </svg>
  )
}
