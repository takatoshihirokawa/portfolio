"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { works } from "@/lib/works"

const cardGradients = [
  "from-[#1a1a2e] to-[#0a0a18]",
  "from-[#1c1208] to-[#0a0802]",
  "from-[#081a18] to-[#020c0a]",
  "from-[#18081c] to-[#0a020e]",
  "from-[#1c0a10] to-[#0e0408]",
  "from-[#081418] to-[#020a0e]",
]

const cardAccents = [
  "rgba(100,120,255,0.15)",
  "rgba(255,180,80,0.12)",
  "rgba(80,220,180,0.12)",
  "rgba(180,80,255,0.12)",
  "rgba(255,80,120,0.12)",
  "rgba(80,200,240,0.12)",
]

function WorkCard({ work, index }: { work: (typeof works)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), { stiffness: 200, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const num = String(index + 1).padStart(2, "0")
  const gradient = cardGradients[index % cardGradients.length]
  const accent = cardAccents[index % cardAccents.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
    >
      <Link href={`/works/${work.slug}`}>
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          className="group relative border border-[var(--border)] hover:border-[rgba(232,255,71,0.3)] transition-all duration-500 cursor-none overflow-hidden"
        >
          {/* Thumbnail */}
          <div className={`aspect-video bg-gradient-to-br ${gradient} relative overflow-hidden`}>
            {/* Inner glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(60% 60% at 50% 50%, ${accent}, transparent)` }}
            />
            {/* Number large */}
            <div className="absolute bottom-4 right-5">
              <span className="font-display text-[5rem] leading-none font-light text-white/5 group-hover:text-white/10 transition-colors duration-500 select-none">
                {num}
              </span>
            </div>
            {/* View label */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/70 border border-white/20 px-4 py-2">
                View Project
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-3 bg-[var(--bg)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[10px] text-[var(--accent)] tracking-widest">{num}</span>
                <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--accent)] transition-colors duration-300">
                  {work.title}
                </h3>
              </div>
              <span className="text-xs text-[var(--muted-fg)] shrink-0 mt-0.5 tabular-nums">
                {work.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-widest uppercase text-[var(--muted-fg)] border border-[var(--border)] px-2 py-1 group-hover:border-[rgba(232,255,71,0.2)] transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="h-px w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-500 ease-out" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  return (
    <section id="works" className="py-32 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[02] Works</p>
            <p className="font-display text-3xl sm:text-4xl font-light tracking-wide text-[var(--fg)]">
              Selected Works
            </p>
          </motion.div>

          <motion.p
            className="text-xs text-[var(--muted-fg)] hidden sm:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {works.length} projects
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {works.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
