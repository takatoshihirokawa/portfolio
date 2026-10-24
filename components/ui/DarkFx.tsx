"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { glitchToggleTheme, useTheme } from "@/lib/theme"
import DarkHud from "@/components/ui/DarkHud"

// Everything that only exists on the dark side: scanlines, a spotlight, scroll skew, a HUD, a power-on flash and a way back.
export default function DarkFx() {
  const theme = useTheme()
  const dark = theme === "dark"
  const [welcome, setWelcome] = useState(false)
  // On phones the button would cover the hero buttons, so it waits until the hero is scrolled past.
  const [pastHero, setPastHero] = useState(false)
  const first = useRef(true)
  const spot = useRef<HTMLDivElement>(null)
  // Values are written onto the few elements that use them, never onto <html>:
  // a custom property on the root makes the browser re-check the whole page on every mouse move.
  const sections = useRef<HTMLElement[]>([])
  const leaning = () => {
    if (!sections.current[0]?.isConnected) sections.current = Array.from(document.querySelectorAll<HTMLElement>("main section:not(#top-home)"))
    return sections.current
  }

  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 40, stiffness: 300 })
  const skew = useTransform(velocity, [-3000, 0, 3000], [3.5, 0, -3.5], { clamp: true })
  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.8))
  useMotionValueEvent(skew, "change", (v) => {
    if (!dark) return
    const t = `skewY(${v.toFixed(3)}deg)`
    for (const el of leaning()) el.style.transform = t
  })

  useEffect(() => {
    if (first.current) { first.current = false; if (!dark) return }
    if (!dark) { for (const el of leaning()) el.style.transform = ""; return }
    setWelcome(true)
    const t = window.setTimeout(() => setWelcome(false), 650)
    const onMove = (e: PointerEvent) => {
      if (spot.current) spot.current.style.transform = `translate3d(${e.clientX - 420}px, ${e.clientY - 420}px, 0)`
    }
    window.addEventListener("pointermove", onMove)
    return () => { window.clearTimeout(t); window.removeEventListener("pointermove", onMove) }
  }, [dark])

  return (
    <>
      {dark && <div aria-hidden className="dark-fx pointer-events-none fixed inset-0 z-[60]" />}
      {dark && <div ref={spot} aria-hidden className="dark-spot z-[59]" />}
      {dark && <DarkHud />}
      <AnimatePresence>
        {welcome && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[var(--bg)]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {/* Old-TV power-on: a thin line of light shoots across, then opens into the page. */}
            <motion.div
              className="absolute left-0 right-0 top-1/2 h-[2px] -mt-px bg-[var(--accent)] shadow-[0_0_24px_4px_var(--accent)]"
              initial={{ scaleX: 0, scaleY: 1, opacity: 1 }}
              animate={{ scaleX: [0, 1, 1], scaleY: [1, 1, 420], opacity: [1, 1, 0] }}
              transition={{ duration: 0.75, times: [0, 0.4, 1], ease: [0.83, 0, 0.17, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {dark && (
          <motion.button
            onClick={glitchToggleTheme}
            className={`fixed left-4 bottom-4 z-[65] ${pastHero ? "" : "max-sm:hidden"} font-display text-[11px] tracking-[0.3em] uppercase border border-[var(--accent)] text-[var(--accent)] bg-[var(--bg)]/70 backdrop-blur px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
            exit={{ opacity: 0, y: 20 }}
          >
            ↺ <span className="hidden sm:inline">Back to </span>light
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
