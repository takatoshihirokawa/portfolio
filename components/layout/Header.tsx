"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"
import { useMotionTheme } from "@/lib/theme"
import FlipText from "@/components/ui/FlipText"
import Magnetic from "@/components/ui/Magnetic"

const navLinks = [
  { jp: "できること", en: "Service", href: "/#problems" },
  { jp: "プロフィール", en: "About", href: "/#about" },
  { jp: "実績", en: "Works", href: "/works" },
  { jp: "相談する", en: "Contact", href: "/#contact" },
]

const OPEN_EASE = [0.76, 0, 0.24, 1] as const

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const { ease } = useMotionTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 ${
        scrolled && !menuOpen ? "sm:bg-[var(--bg)] sm:border-b sm:border-[var(--border)]" : ""
      }`}
    >
      {/* Solid strip under the phone's status bar, so scrolled content never shows through it.
          The scrolled header is solid too: iPhone Safari tints the status bar from it only when it is opaque. */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[env(safe-area-inset-top)] bg-[var(--bg)]" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative z-10">
        <Link
          href="/"
          aria-label="Home"
          onClick={close}
          className="group flex items-center gap-3"
        >
          <span className="w-10 h-10 rounded-full bg-[#efefef] text-[#0c0c0c] border border-[var(--border)] overflow-hidden flex items-end justify-center transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-105">
            <AvatarIllust compact className="w-[112%] translate-y-[10%]" />
          </span>
          <span className="hidden sm:block font-display text-[11px] tracking-[0.3em] uppercase text-[var(--muted-fg)] group-hover:text-[var(--fg)] transition-colors">
            Takatoshi Hirokawa
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.en}
              href={link.href}
              className="text-xs tracking-widest uppercase text-[var(--muted-fg)] relative"
            >
              <FlipText text={link.en} />
            </a>
          ))}
        </nav>

        <Magnetic strength={0.3} className="lg:hidden">
        <button
          className="relative w-11 h-11 -mr-2 flex items-center justify-center"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
            setMenuOpen((v) => !v)
          }}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${menuOpen ? "rotate-45" : "-translate-y-[5px]"}`} />
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-500 ease-[cubic-bezier(.76,0,.24,1)] ${menuOpen ? "-rotate-45" : "translate-y-[5px]"}`} />
        </button>
        </Magnetic>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            className="lg:hidden fixed inset-0 bg-[var(--bg)] flex flex-col overflow-hidden"
            initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
            animate={{ clipPath: `circle(150vmax at ${origin.x}px ${origin.y}px)` }}
            exit={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`, transition: { duration: 0.55, ease: OPEN_EASE } }}
            transition={{ duration: 0.85, ease: OPEN_EASE }}
          >
            {/* Ripple rings from the tap point */}
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute rounded-full border border-[var(--accent)] pointer-events-none"
                style={{ left: origin.x, top: origin.y, x: "-50%", y: "-50%" }}
                initial={{ width: 0, height: 0, opacity: 0.8 }}
                animate={{ width: 1400 + i * 300, height: 1400 + i * 300, opacity: 0 }}
                transition={{ duration: 1.3 + i * 0.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 + i * 0.12 }}
              />
            ))}
            <motion.span
              className="absolute rounded-full bg-[var(--accent)] pointer-events-none"
              style={{ left: origin.x, top: origin.y, width: 12, height: 12, x: "-50%", y: "-50%" }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Accent band sweeps across */}
            <motion.div
              className="absolute -inset-y-24 w-[60%] bg-[var(--accent)] pointer-events-none"
              style={{ skewX: -14 }}
              initial={{ x: "-120%", opacity: 0.9 }}
              animate={{ x: "260%", opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(700px circle at 85% 15%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%)" }}
            />

            <nav className="relative flex-1 flex flex-col justify-center px-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.en}
                  className="border-b border-[var(--border)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.08 }}
                  style={{ transformOrigin: "left", borderBottomWidth: 1 }}
                >
                  <a href={link.href} onClick={close} className="group flex items-end justify-between gap-4 py-6 active:text-[var(--accent)]">
                    <span className="flex items-end gap-4">
                      <motion.span
                        className="font-display text-[11px] tracking-[0.3em] text-[var(--accent)] pb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.span>
                      <span className="overflow-hidden">
                        <motion.span
                          className="block whitespace-nowrap text-[clamp(1.3rem,7vw,2rem)] font-medium tracking-wide leading-none"
                          initial={{ y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.7, ease, delay: 0.35 + i * 0.08 }}
                        >
                          {link.jp}
                        </motion.span>
                      </span>
                    </span>
                    <motion.span
                      className="shrink-0 font-display text-[11px] tracking-[0.3em] uppercase text-[var(--muted-fg)] pb-2"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}
                    >
                      {link.en}
                    </motion.span>
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="relative px-8 pb-10 flex flex-col gap-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.75, duration: 0.6, ease }}
            >
              <a
                href="/#contact"
                onClick={close}
                className="group relative block text-center text-xs tracking-[0.3em] overflow-hidden border border-[var(--accent)] text-[var(--accent)] py-4"
              >
                <motion.span
                  className="absolute inset-0 bg-[var(--accent)]"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ delay: 1.0, duration: 0.6, ease: OPEN_EASE }}
                />
                <motion.span
                  className="relative"
                  initial={{ color: "var(--accent)" }}
                  animate={{ color: "var(--bg)" }}
                  transition={{ delay: 1.25, duration: 0.3 }}
                >
                  まずは相談してみる
                </motion.span>
              </a>
              <div className="flex items-center justify-between text-[11px] tracking-[0.25em] uppercase text-[var(--muted-fg)]">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  Available
                </span>
                <span>Kawaguchiko, Yamanashi</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
