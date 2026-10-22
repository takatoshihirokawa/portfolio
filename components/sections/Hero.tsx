"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"

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
        style={{
          background:
            "radial-gradient(700px circle at 50% 50%, rgba(232,255,71,0.055), transparent 65%)",
        }}
      />
    </motion.div>
  )
}

const easeOut = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  return (
    <section
      id="top-home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <MouseGradient />

      {/* Accent ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">

        {/* Role label */}
        <motion.p
          className="text-[10px] tracking-[0.5em] uppercase text-[var(--accent)] mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        >
          Planning · Direction · Development
        </motion.p>

        {/* TAKATOSHI — slides up from clip */}
        <div className="overflow-hidden leading-none">
          <motion.p
            className="font-display text-[clamp(2.2rem,9vw,7.5rem)] font-light tracking-[0.18em] uppercase leading-none text-[var(--fg)] text-center"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: easeOut }}
          >
            TAKATOSHI
          </motion.p>
        </div>

        {/* Avatar — key visual */}
        <motion.div
          className="relative z-10 -my-3 sm:-my-5 md:-my-6"
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.1, ease: easeOut }}
        >
          <AvatarIllust className="w-44 sm:w-56 md:w-64 lg:w-72 xl:w-80 text-white drop-shadow-[0_0_40px_rgba(232,255,71,0.08)]" />
        </motion.div>

        {/* HIROKAWA — accent color */}
        <div className="overflow-hidden leading-none">
          <motion.p
            className="font-display text-[clamp(2.2rem,9vw,7.5rem)] font-light tracking-[0.18em] uppercase leading-none text-[var(--accent)] text-center"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 0.9, ease: easeOut }}
          >
            HIROKAWA
          </motion.p>
        </div>

        {/* Divider line */}
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[var(--muted-fg)] to-transparent mt-10"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />

        {/* Tagline + CTA */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-sm text-[var(--muted-fg)] text-center leading-relaxed tracking-wide">
            「何を作るか」からではなく、<br />
            「何を解決したいか」から考えます。
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/#works"
              className="group relative text-[11px] tracking-[0.3em] uppercase px-8 py-3.5 border border-[var(--accent)] text-[var(--accent)] overflow-hidden transition-colors duration-300 hover:text-[var(--bg)]"
            >
              <span className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">Works</span>
            </a>
            <a
              href="/#contact"
              className="text-[11px] tracking-[0.3em] uppercase text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors flex items-center gap-2"
            >
              Contact
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--muted-fg)] to-transparent"
          animate={{ scaleY: [1, 0.2, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
