"use client"

// Mouse-tracking gradient uses transform only — never top/left — to avoid layout shift

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

const STAGGER_DELAY = 0.15
const REVEAL_DELAY = 0.3

function MouseGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 80, damping: 20 })
  const y = useSpring(rawY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const el = ref.current?.parentElement
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      rawX.set(e.clientX - rect.left - rect.width / 2)
      rawY.set(e.clientY - rect.top - rect.height / 2)
    }

    el.addEventListener("mousemove", handleMove)
    return () => el.removeEventListener("mousemove", handleMove)
  }, [rawX, rawY])

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0 pointer-events-none"
      // transform only — no top/left
      style={{ x, y }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(232,255,71,0.07), transparent 70%)",
        }}
      />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="top-home"
      className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden px-4 sm:px-6 pt-16"
    >
      <MouseGradient />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="flex flex-col gap-6">
          {[
            <p key="role" className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]">
              Planning / Direction / Development
            </p>,
            <h1 key="name" className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none">
              <span className="block">Takatoshi</span>
              <span className="block text-[var(--accent)]">Hirokawa</span>
            </h1>,
            <p key="tagline" className="text-base sm:text-lg text-[var(--muted-fg)] max-w-lg leading-relaxed">
              「何を作るか」からではなく、<br />
              「何を解決したいか」から考えます。
            </p>,
            <div key="cta" className="flex items-center gap-4 pt-4">
              <a
                href="/#works"
                className="text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-6 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300"
              >
                Works
              </a>
              <a
                href="/#contact"
                className="text-xs tracking-[0.2em] uppercase text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors"
              >
                Contact →
              </a>
            </div>,
          ].map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: REVEAL_DELAY + i * STAGGER_DELAY }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--muted-fg)]">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[var(--muted-fg)] to-transparent"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
