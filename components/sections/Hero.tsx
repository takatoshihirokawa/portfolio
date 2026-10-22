"use client"

import { useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"
import { glitchToggleTheme, useMotionTheme } from "@/lib/theme"
import { useIntro } from "@/components/ui/Intro"

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
        style={{ background: "radial-gradient(700px circle at 50% 50%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 65%)" }}
      />
    </motion.div>
  )
}

export default function Hero() {
  const { ready, replay } = useIntro()
  if (!ready) return <section className="min-h-screen" />
  return <HeroInner key={replay} />
}

function HeroInner() {
  const { ease: spring, speed } = useMotionTheme()
  const { scrollY } = useScroll()
  const avatarY = useTransform(scrollY, [0, 800], [0, 160])
  const avatarOpacity = useTransform(scrollY, [0, 450], [1, 0])
  const nameY = useTransform(scrollY, [0, 800], [0, -70])
  const roleY = useTransform(scrollY, [0, 800], [0, -120])

  return (
    <section
      id="top-home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-12 pt-32 pb-40"
    >
      <MouseGradient />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 640, height: 640, borderRadius: "50%",
          background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 6%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">

        {/* Role */}
        <motion.p
          style={{ y: roleY }}
          className="text-[11px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[var(--accent)] mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          Plan · Make · Run
        </motion.p>

        {/* Name — two tight lines, in front of the avatar */}
        <motion.div style={{ y: nameY }} className="relative z-10 flex flex-col items-center leading-[0.95]">
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(1.75rem,5vw,3.75rem)] font-light tracking-[0.3em] uppercase text-center text-[var(--fg)] opacity-80"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.25, duration: 0.95 * speed, ease: spring }}
            >
              TAKATOSHI
            </motion.p>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="font-display text-[clamp(1.75rem,5vw,3.75rem)] font-light tracking-[0.3em] uppercase text-center text-[var(--accent)]"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.95 * speed, ease: spring }}
            >
              HIROKAWA
            </motion.p>
          </div>
        </motion.div>

        {/* Avatar — tucks under the name, parallax on scroll */}
        <motion.div style={{ y: avatarY, opacity: avatarOpacity }} className="relative z-20 -mt-7 sm:-mt-10 lg:-mt-14">
        <motion.div
          className="w-32 sm:w-40 md:w-44 lg:w-52 xl:w-56 overflow-hidden"
          style={{ aspectRatio: "432.39 / 434" }}
          initial={{ opacity: 0, scale: 0.86, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1 * speed, ease: spring }}
        >
          <AvatarIllust className="w-full text-[var(--fg)]" onDizzy={glitchToggleTheme} />
        </motion.div>
        </motion.div>

        {/* Location badge */}
        <motion.div
          className="relative z-20 mt-6 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-[11px] sm:text-[9px] tracking-[0.35em] uppercase text-[var(--muted-fg)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Available for projects
          </span>
          <span className="hidden sm:inline text-[var(--border)]">|</span>
          <span>Kawaguchiko, Yamanashi</span>
        </motion.div>

        <motion.p
          className="relative z-20 mt-3 text-[11px] sm:text-[10px] tracking-[0.3em] uppercase text-[var(--accent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          ↻ Circle around the face
        </motion.p>

        {/* Tagline + CTA */}
        <motion.div
          className="relative z-20 mt-10 flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-xl sm:text-2xl text-[var(--fg)] text-center leading-relaxed tracking-wide font-medium">
              何から頼めばよいか、<br className="sm:hidden" />決まっていなくても。
            </p>
            <p className="text-base sm:text-lg text-[var(--muted-fg)] text-center leading-loose tracking-wide">
              ホームページ・Webアプリの制作から、<br className="sm:hidden" />
              受付や管理の仕組みづくり、AI活用まで。<br />
              困りごとの整理から、作って動かすところまで一緒に。
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="/#works"
              className="group relative text-[11px] sm:text-[10px] tracking-[0.35em] uppercase px-8 py-3.5 border border-[var(--accent)] text-[var(--accent)] overflow-hidden transition-colors duration-300 hover:text-[var(--bg)]"
            >
              <span className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative">Works</span>
            </a>
            <a
              href="/#contact"
              className="group text-[11px] sm:text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--fg)] transition-colors flex items-center gap-2"
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
        <span className="text-[10px] sm:text-[8px] tracking-[0.5em] uppercase text-[var(--muted-fg)]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[var(--muted-fg)] to-transparent"
          animate={{ scaleY: [1, 0.2, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
