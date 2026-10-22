"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Work, WorkCategory } from "@/lib/works"
import { useMotionTheme } from "@/lib/theme"

const FILTERS: { key: WorkCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "App / Service", label: "Webアプリ" },
  { key: "Web", label: "Webサイト" },
  { key: "Advertising", label: "広告・映像" },
  { key: "Lab", label: "Lab（自主制作）" },
]

export default function WorksGrid({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState<WorkCategory | "All">("All")
  const { ease, speed } = useMotionTheme()
  const list = filter === "All" ? works : works.filter((w) => w.category === filter)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-14">
        {FILTERS.map((f) => {
          const count = f.key === "All" ? works.length : works.filter((w) => w.category === f.key).length
          const active = filter === f.key
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`text-[11px] sm:text-[10px] tracking-[0.3em] uppercase px-4 py-2 border transition-all duration-300 ${
                active
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted-fg)] hover:text-[var(--fg)]"
              }`}
            >
              <span>{f.label}</span>
              <span className="opacity-50 ml-1 tabular-nums">{count}</span>
            </button>
          )
        })}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
        <AnimatePresence mode="popLayout">
          {list.map((work, i) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 * speed, ease, delay: Math.min(i, 8) * 0.04 }}
            >
              <Link href={`/works/${work.slug}`} className="group block h-full bg-[var(--bg)] transition-colors duration-500 overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-[var(--muted)]">
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 text-[10px] sm:text-[8px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1">
                    {work.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-2 bg-[var(--bg)]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-medium leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">{work.title}</h3>
                    <span className="text-xs text-[var(--muted-fg)] shrink-0 tabular-nums">{work.year}</span>
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] tracking-wide">{work.client}</p>
                </div>
                <div className="h-px w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-500 ease-out" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
