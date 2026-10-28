"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { Work, WorkCategory } from "@/lib/works"
import { useMotionTheme } from "@/lib/theme"

type Tab = "works" | "lab"

const FILTERS: { key: WorkCategory | "All"; label: string }[] = [
  { key: "All", label: "All" },
  { key: "App / Service", label: "Webアプリ" },
  { key: "Web", label: "Webサイト" },
  { key: "Advertising", label: "広告・映像" },
  { key: "AI Support", label: "AI導入サポート" },
]

const chip = (active: boolean) =>
  `text-[11px] sm:text-[10px] tracking-[0.3em] uppercase px-4 py-2 border transition-all duration-300 ${
    active
      ? "border-[var(--accent)] text-[var(--accent)]"
      : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--muted-fg)] hover:text-[var(--fg)]"
  }`

export function WorksTabs({ works }: { works: Work[] }) {
  const sp = useSearchParams()
  const [tab, setTab] = useState<Tab>(sp.get("tab") === "lab" ? "lab" : "works")
  const [filter, setFilter] = useState<WorkCategory | "All">("All")
  const client = works.filter((w) => w.category !== "Lab")
  const lab = works.filter((w) => w.category === "Lab")
  const base = tab === "lab" ? lab : client
  const list = tab === "lab" || filter === "All" ? base : base.filter((w) => w.category === filter)

  const switchTab = (t: Tab) => {
    setTab(t)
    setFilter("All")
    window.history.replaceState(null, "", t === "lab" ? "/works?tab=lab" : "/works")
  }

  return (
    <div>
      <div className="flex items-end gap-8 border-b border-[var(--border)] mb-8">
        {([
          ["works", "Works", "実績", client.length],
          ["lab", "Lab", "自主開発", lab.length],
        ] as const).map(([key, en, jp, n]) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`relative pb-4 text-left transition-colors ${tab === key ? "text-[var(--fg)]" : "text-[var(--muted-fg)] hover:text-[var(--fg)]"}`}
          >
            <span className="block font-display text-2xl sm:text-3xl font-light tracking-wide">{en}</span>
            <span className="block mt-1 text-xs tracking-wider whitespace-nowrap">{jp}<span className="opacity-50 ml-1 tabular-nums">{n}</span></span>
            {tab === key && <motion.span layoutId="works-tab" className="absolute left-0 right-0 -bottom-px h-0.5 bg-[var(--accent)]" />}
          </button>
        ))}
      </div>

      {tab === "works" ? (
        <div className="flex flex-wrap items-center gap-2 mb-14">
          {FILTERS.map((f) => (
            <button key={f.key} onClick={() => setFilter(f.key)} className={chip(filter === f.key)}>
              <span>{f.label}</span>
              <span className="opacity-50 ml-1 tabular-nums">{f.key === "All" ? client.length : client.filter((w) => w.category === f.key).length}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-14 text-base leading-8 text-[var(--muted-fg)] max-w-2xl">
          <span className="inline-block">自分で作り、運用している</span><span className="inline-block">サービスと仕組み。</span><br />
          <span className="inline-block">ここで試したことを、</span><span className="inline-block">仕事に活かしています。</span>
        </p>
      )}

      <WorksGrid works={list} />
    </div>
  )
}

export default function WorksGrid({ works: list, basePath = "/works" }: { works: Work[]; basePath?: string }) {
  const { ease, speed } = useMotionTheme()

  return (
    <div>
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
              <Link href={`${basePath}/${work.slug}`} data-cursor="view" className="group block h-full bg-[var(--bg)] transition-colors duration-500 overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-[var(--muted)]">
                  {work.thumbnail && <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                  <span className="absolute top-3 left-3 text-[10px] sm:text-[8px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1">
                    {work.category === "Lab" ? "Lab" : work.category}
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
