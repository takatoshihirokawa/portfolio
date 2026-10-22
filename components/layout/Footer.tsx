"use client"

import { scrollToTop } from "@/components/ui/BackToTop"

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-[var(--muted-fg)] tracking-widest">
        <span>© 2026 Takatoshi Hirokawa</span>
        <button
          onClick={() => scrollToTop(1100)}
          className="group inline-flex items-center gap-2 uppercase hover:text-[var(--accent)] transition-colors"
        >
          Back to Top
          <span className="inline-block group-hover:-translate-y-1 transition-transform duration-300">↑</span>
        </button>
      </div>
    </footer>
  )
}
