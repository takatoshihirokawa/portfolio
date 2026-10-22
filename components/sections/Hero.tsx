"use client"

// Mouse-tracking gradient uses transform only — never top/left — to avoid layout shift

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"

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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-16"
    >
      <MouseGradient />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center text-center gap-6">

        {/* Role label */}
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: REVEAL_DELAY }}
        >
          Planning / Direction / Development
        </motion.p>

        {/* Avatar — キービジュアル */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: REVEAL_DELAY + STAGGER_DELAY }}
        >
          <AvatarIllust className="w-52 sm:w-64 md:w-72 lg:w-80 text-white" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: REVEAL_DELAY + STAGGER_DELAY * 2 }}
        >
          <span className="block">Takatoshi</span>
          <span className="block text-[var(--accent)]">Hirokawa</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: REVEAL_DELAY + STAGGER_DELAY * 3 }}
        >
          「何を作るか」からではなく、<br />
          「何を解決したいか」から考えます。
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-4 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: REVEAL_DELAY + STAGGER_DELAY * 4 }}
        >
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
        </motion.div>

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
