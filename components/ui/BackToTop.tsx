"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion"

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

export function scrollToTop(duration = 1000) {
  const start = window.scrollY
  if (start === 0) return
  const t0 = performance.now()
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = "auto"
  const tick = (now: number) => {
    const t = Math.min((now - t0) / duration, 1)
    window.scrollTo(0, start * (1 - easeOutExpo(t)))
    if (t < 1) requestAnimationFrame(tick)
    else html.style.scrollBehavior = prev
  }
  requestAnimationFrame(tick)
}

const R = 22
const C = 2 * Math.PI * R

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [launching, setLaunching] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const dashOffset = useTransform(progress, [0, 1], [C, 0])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleClick = () => {
    if (launching) return
    setLaunching(true)
    scrollToTop(1100)
    window.setTimeout(() => setLaunching(false), 1100)
  }

  return (
    <AnimatePresence>
      {(visible || launching) && (
        <motion.button
          key="btt"
          onClick={handleClick}
          aria-label="ページの先頭へ戻る"
          className="group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 w-14 h-14 rounded-full bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--border)] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0, scale: 0.4, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 24, transition: { duration: 0.25 } }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={R} fill="none" stroke="var(--border)" strokeWidth="1" />
            <motion.circle
              cx="28" cy="28" r={R}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={C}
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>

          {/* Arrow: launches up, re-enters from below */}
          <span className="relative w-5 h-5 overflow-hidden">
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-[var(--fg)] group-hover:text-[var(--accent)] transition-colors"
              animate={launching ? { y: [0, -24, 24, 0], opacity: [1, 0, 0, 1] } : { y: 0, opacity: 1 }}
              transition={launching ? { duration: 0.6, times: [0, 0.4, 0.41, 1], ease: [0.16, 1, 0.3, 1] } : { duration: 0.2 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 12V2M3 6l4-4 4 4" />
              </svg>
            </motion.span>
          </span>

          {/* Accent flash on click */}
          <AnimatePresence>
            {launching && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[var(--accent)]"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 1.6, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
