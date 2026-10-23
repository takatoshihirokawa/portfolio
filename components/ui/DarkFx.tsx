"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { glitchToggleTheme, useTheme } from "@/lib/theme"

// Everything that only exists on the dark side: scanlines, a spotlight, scroll skew, a welcome flash and a way back.
export default function DarkFx() {
  const theme = useTheme()
  const dark = theme === "dark"
  const [welcome, setWelcome] = useState(false)
  const first = useRef(true)

  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 300 })
  const skew = useTransform(velocity, [-3000, 0, 3000], [3.5, 0, -3.5], { clamp: true })
  useMotionValueEvent(skew, "change", (v) => {
    if (dark) document.documentElement.style.setProperty("--skew", v.toFixed(3))
  })

  useEffect(() => {
    if (first.current) { first.current = false; if (!dark) return }
    if (!dark) { document.documentElement.style.removeProperty("--skew"); return }
    setWelcome(true)
    const t = window.setTimeout(() => setWelcome(false), 1600)
    const onMove = (e: PointerEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`)
      document.documentElement.style.setProperty("--my", `${e.clientY}px`)
    }
    window.addEventListener("pointermove", onMove)
    return () => { window.clearTimeout(t); window.removeEventListener("pointermove", onMove) }
  }, [dark])

  return (
    <>
      {dark && <div aria-hidden className="dark-fx pointer-events-none fixed inset-0 z-[60]" />}
      <AnimatePresence>
        {welcome && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[var(--bg)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.p
              className="font-display font-bold uppercase leading-[0.85] text-center text-[var(--accent)] text-[18vw] sm:text-[13vw] tracking-[-0.04em]"
              initial={{ clipPath: "inset(50% 0 50% 0)", scale: 1.3 }}
              animate={{ clipPath: "inset(0% 0 0% 0)", scale: 1 }}
              transition={{ duration: 0.55, ease: [0.83, 0, 0.17, 1] }}
            >
              Dark<br />Side
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dark && (
          <motion.button
            onClick={glitchToggleTheme}
            className="fixed left-4 bottom-4 z-[65] font-display text-[11px] tracking-[0.3em] uppercase border border-[var(--accent)] text-[var(--accent)] bg-[var(--bg)]/70 backdrop-blur px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.6 } }}
            exit={{ opacity: 0, y: 20 }}
          >
            ↺ <span className="hidden sm:inline">Back to </span>light
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
