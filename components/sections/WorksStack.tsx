"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import type { Work } from "@/lib/works"

const TOP = 88
const STEP = 14

function StackCard({ work, index, total }: { work: Work; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${TOP + index * STEP}px`, `end ${TOP + index * STEP}px`] })
  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94])
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -3])
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -18])
  const dim = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 0.3])

  return (
    <div ref={ref} className="sticky" style={{ top: TOP + index * STEP, zIndex: index + 1 }}>
      <motion.div
        style={{ scale, rotateX, y, transformPerspective: 1100, transformOrigin: "top center" }}
        className="relative mb-[40vh] last:mb-0"
      >
        <Link href={`/works/${work.slug}`} className="block bg-[var(--bg)] border border-[var(--border)] overflow-hidden shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)]">
          <div className="relative aspect-video bg-[var(--muted)]">
            <Image src={work.thumbnail} alt={work.title} fill sizes="100vw" className="object-cover object-top" />
            <span className="absolute top-3 left-3 text-[9px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1">{work.category}</span>
            <span className="absolute top-3 right-3 font-display text-[10px] tracking-[0.3em] text-white/70">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <div className="p-5 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-medium leading-snug">{work.title}</h3>
              <span className="text-xs text-[var(--muted-fg)] shrink-0 tabular-nums">{work.year}</span>
            </div>
            <p className="text-xs text-[var(--muted-fg)]">{work.client}</p>
            <p className="text-sm text-[var(--muted-fg)] leading-6 line-clamp-2">{work.summary}</p>
          </div>
        </Link>
        <motion.div className="absolute inset-0 bg-[var(--bg)] pointer-events-none" style={{ opacity: dim }} />
      </motion.div>
    </div>
  )
}

export default function WorksStack({ works }: { works: Work[] }) {
  return (
    <div className="relative">
      {works.map((w, i) => (
        <StackCard key={w.slug} work={w} index={i} total={works.length} />
      ))}
    </div>
  )
}
