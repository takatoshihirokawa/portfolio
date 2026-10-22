"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"
import { glitchToggleTheme } from "@/lib/theme"

function MouseGradient() {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 60, damping: 20 })

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
    <motion.div ref={ref} className="absolute inset-0 pointer-events-none" style={{ x, y }}>
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(700px circle at 50% 50%, rgba(232,255,71,0.05), transparent 65%)" }}
      />
    </motion.div>
  )
}

const spring = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section
      id="top-home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 pt-32 pb-40"
    >
      <MouseGradient />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 640, height: 640, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,255,71,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">

        {/* Role */}
        <motion.p
          className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--accent)] mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Planning · Direction · Development
        </motion.p>

        {/* TAKATOSHI */}
        <div className="overflow-hidden leading-none">
          <motion.p
            className="font-display text-[clamp(1.5rem,4.5vw,3.5rem)] font-light tracking-[0.3em] uppercase text-center text-[var(--fg)] opacity-80"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 0.95, ease: spring }}
          >
            TAKATOSHI
          </motion.p>
        </div>

        {/* Avatar — gradient mask blends into bg */}
        <motion.div
          className="relative z-10 my-2 sm:my-4"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 96%)",
            maskImage: "linear-gradient(to bottom, black 50%, transparent 96%)",
          }}
          initial={{ opacity: 0, scale: 0.86, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1, ease: spring }}
        >
          <AvatarIllust className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 text-[var(--fg)]" onDizzy={glitchToggleTheme} />
        </motion.div>

        {/* HIROKAWA */}
        <div className="overflow-hidden leading-none">
          <motion.p
            className="font-display text-[clamp(1.5rem,4.5vw,3.5rem)] font-light tracking-[0.3em] uppercase text-center text-[var(--accent)]"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 0.95, ease: spring }}
          >
            HIROKAWA
          </motion.p>
        </div>

        {/* Location badge */}
        <motion.div
          className="mt-12 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-[9px] tracking-[0.35em] uppercase text-[var(--muted-fg)]">
            Kawaguchiko, Yamanashi — Available for projects
          </span>
        </motion.div>

        <motion.p
          className="mt-4 text-[8px] tracking-[0.3em] uppercase text-[var(--muted-fg)] opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          ↻ Circle around the face
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--muted-fg)] to-transparent mt-8"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        />

        {/* Tagline + CTA */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-9"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <p className="text-sm text-[var(--muted-fg)] text-center leading-loose tracking-wide">
            「何を作るか」からではなく、<br />
            「何を解決したいか」から考えます。
          </p>

          <div className="flex items-center gap-5">
            <a
              href="/#works"
              className="group relative text-[10px] tracking-[0.35em] uppercase px-8 py-3.5 border border-[var(--accent)] text-[var(--accent)] overflow-hidden transition-colors duration-300 hover:text-[var(--bg)]"
            >
              <span className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">Works</span>
            </a>
            <a
              href="/#contact"
              className="group text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors flex items-center gap-2"
            >
              Contact
              <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-[8px] tracking-[0.5em] uppercase text-[var(--muted-fg)]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--muted-fg)] to-transparent"
          animate={{ scaleY: [1, 0.2, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
