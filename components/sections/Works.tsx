"use client"

// onHoverStart sets tilt — keyboard focus (:focus-visible) does NOT trigger tilt

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { works } from "@/lib/works"

function WorkCard({ work, index }: { work: (typeof works)[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <Link href={`/works/${work.slug}`} tabIndex={0}>
        <motion.article
          // Tilt only on hover (onHoverStart/End) — focus-visible does not trigger this
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          animate={{
            y: hovered ? -6 : 0,
            rotateX: hovered ? 2 : 0,
            rotateY: hovered ? -2 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="group block border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300 cursor-none"
        >
          {/* Thumbnail */}
          <div className="aspect-video bg-[var(--muted)] overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-[var(--muted)] to-[var(--bg)] group-hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-sm font-medium leading-snug group-hover:text-[var(--accent)] transition-colors">
                {work.title}
              </h3>
              <span className="text-xs text-[var(--muted-fg)] shrink-0 mt-0.5">
                {work.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-widest uppercase text-[var(--muted-fg)] border border-[var(--border)] px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  return (
    <section id="works" className="py-32 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          [02] Works
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
