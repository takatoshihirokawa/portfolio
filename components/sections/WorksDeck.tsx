"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import type { Work } from "@/lib/works"

const VISIBLE = 4

function TopCard({ work, onSwipe, onOpen }: { work: Work; onSwipe: () => void; onOpen: () => void }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-240, 240], [-10, 10])
  const edgeL = useTransform(x, [-160, 0], [1, 0])
  const edgeR = useTransform(x, [0, 160], [0, 1])
  return (
    <motion.div
      className="absolute inset-0 touch-pan-y"
      style={{ x, rotate }}
      drag="x"
      dragElastic={0.9}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) onSwipe()
      }}
      onTap={(_, info) => { if (Math.abs(x.get()) < 6) onOpen() }}
      initial={{ scale: 0.96, y: 12, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ x: x.get() < 0 ? -520 : 520, rotate: x.get() < 0 ? -18 : 18, opacity: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <Card work={work} />
      <motion.span style={{ opacity: edgeL }} className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />
      <motion.span style={{ opacity: edgeR }} className="absolute inset-y-0 right-0 w-1 bg-[var(--accent)]" />
    </motion.div>
  )
}

function Card({ work }: { work: Work }) {
  return (
    <div className="h-full w-full bg-[var(--bg)] border border-[var(--border)] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
      <div className="relative aspect-video bg-[var(--muted)]">
        <Image src={work.thumbnail} alt={work.title} fill sizes="100vw" className="object-cover object-top" draggable={false} />
        <span className="absolute top-3 left-3 text-[9px] tracking-[0.3em] uppercase text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1">{work.category}</span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-medium leading-snug">{work.title}</h3>
          <span className="text-xs text-[var(--muted-fg)] shrink-0 tabular-nums">{work.year}</span>
        </div>
        <p className="text-xs text-[var(--muted-fg)]">{work.client}</p>
        <p className="text-sm text-[var(--muted-fg)] leading-6 line-clamp-2 mt-1">{work.summary}</p>
      </div>
    </div>
  )
}

export default function WorksDeck({ works }: { works: Work[] }) {
  const router = useRouter()
  const [order, setOrder] = useState(() => works.map((_, i) => i))
  const [seen, setSeen] = useState(0)
  const stack = order.slice(0, VISIBLE)

  const swipe = () => {
    setOrder((o) => [...o.slice(1), o[0]])
    setSeen((n) => n + 1)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full" style={{ aspectRatio: "4 / 4.6" }}>
        {stack
          .map((idx, depth) => ({ idx, depth }))
          .reverse()
          .map(({ idx, depth }) => {
            const work = works[idx]
            if (depth === 0) {
              return (
                <AnimatePresence key={`top-${idx}`} initial={false}>
                  <TopCard work={work} onSwipe={swipe} onOpen={() => router.push(`/works/${work.slug}`)} />
                </AnimatePresence>
              )
            }
            return (
              <motion.div
                key={idx}
                className="absolute inset-0 pointer-events-none"
                animate={{ y: depth * 14, scale: 1 - depth * 0.045, rotate: (depth % 2 ? 1 : -1) * depth * 1.2, opacity: 1 - depth * 0.18 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
              >
                <Card work={work} />
              </motion.div>
            )
          })}
      </div>
      <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] uppercase text-[var(--muted-fg)]">
        <span className="tabular-nums">{(seen % works.length) + 1} / {works.length}</span>
        <span className="text-[var(--accent)]">← swipe →</span>
      </div>
    </div>
  )
}
