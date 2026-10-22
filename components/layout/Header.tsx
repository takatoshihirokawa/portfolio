"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"
import { useMotionTheme } from "@/lib/theme"

const navLinks = [
  { label: "Service", jp: "できること", href: "/#problems" },
  { label: "Works", jp: "制作実績", href: "/works" },
  { label: "About", jp: "プロフィール", href: "/#about" },
  { label: "Contact", jp: "相談する", href: "/#contact" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { ease, speed } = useMotionTheme()

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !menuOpen ? "bg-[var(--bg)]/80 backdrop-blur-md border-b border-[var(--border)]" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative z-10">
        <Link href="/" aria-label="Home" onClick={() => setMenuOpen(false)} className="text-[var(--fg)] hover:text-[var(--accent)] transition-colors">
          <AvatarIllust compact className="w-10 h-10" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-widest uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          className="lg:hidden relative w-11 h-11 -mr-2 flex items-center justify-center"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
        >
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-[5px]"}`} />
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`absolute w-6 h-px bg-[var(--fg)] transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-[5px]"}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            className="lg:hidden fixed inset-0 bg-[var(--bg)] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(600px circle at 80% 20%, color-mix(in srgb, var(--accent) 8%, transparent), transparent 60%)" }}
            />

            <nav className="flex-1 flex flex-col justify-center px-8 pt-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.2, delay: 0 } }}
                  transition={{ duration: 0.6 * speed, ease, delay: 0.1 + i * 0.07 }}
                  className="border-b border-[var(--border)]"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline justify-between py-6 active:text-[var(--accent)]"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-display text-[11px] tracking-[0.3em] text-[var(--accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-4xl font-light tracking-[0.12em] uppercase">
                        {link.label}
                      </span>
                    </span>
                    <span className="text-xs text-[var(--muted-fg)] tracking-wide">{link.jp}</span>
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="px-8 pb-10 flex flex-col gap-5"
            >
              <a
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="block text-center text-xs tracking-[0.3em] uppercase bg-[var(--accent)] text-[var(--bg)] py-4 active:opacity-80"
              >
                相談してみる
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
