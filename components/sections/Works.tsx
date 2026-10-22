"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { works, featuredWorks } from "@/lib/works"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"

function useTilt() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [5, -5]), { stiffness: 180, damping: 28 })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-5, 5]), { stiffness: 180, damping: 28 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}

function FeaturedCard({ work, index }: { work: (typeof works)[0]; index: number }) {
  const tilt = useTilt()
  const { ease, speed, dist } = useMotionTheme()
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: dist + 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8 * speed, ease }}
      className="md:col-span-2"
    >
      <Link href={`/works/${work.slug}`}>
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
          className="group relative border border-[var(--border)] hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] transition-all duration-500 cursor-none overflow-hidden"
        >
          {/* Wide thumbnail */}
          <div className="aspect-video sm:aspect-[21/9] relative overflow-hidden bg-[var(--muted)]">
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="absolute top-6 left-7">
              <span className="font-display text-[11px] tracking-[0.4em] uppercase text-white/60">
                Featured
              </span>
            </div>
            <Parallax amount={-28} className="absolute bottom-5 right-6">
              <span className="font-display text-[7rem] leading-none font-light text-white/[0.12] group-hover:text-white/[0.2] transition-colors duration-500 select-none">
                {num}
              </span>
            </Parallax>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-white border border-white/40 bg-black/30 backdrop-blur-sm px-5 py-2.5">
                View Project →
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 bg-[var(--bg)]">
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="font-display text-[11px] sm:text-[10px] text-[var(--accent)] tracking-widest shrink-0">{num}</span>
              <h3 className="text-lg font-medium group-hover:text-[var(--accent)] transition-colors duration-300">
                {work.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 sm:shrink-0">
              <div className="flex flex-wrap gap-1.5 sm:justify-end">
                {work.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] sm:text-[9px] tracking-widest uppercase text-[var(--muted-fg)] border border-[var(--border)] px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-[var(--muted-fg)] tabular-nums">{work.year}</span>
            </div>
          </div>
          <div className="h-px w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-500 ease-out" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

function WorkCard({ work, index }: { work: (typeof works)[0]; index: number }) {
  const tilt = useTilt()
  const { ease, speed, dist, stagger } = useMotionTheme()
  const num = String(index + 1).padStart(2, "0")

  return (
    <motion.div
      initial={{ opacity: 0, y: dist + 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 * speed, ease, delay: (index % 2) * stagger }}
    >
      <Link href={`/works/${work.slug}`}>
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
          className="group relative border border-[var(--border)] hover:border-[color-mix(in_srgb,var(--accent)_35%,transparent)] transition-all duration-500 cursor-none overflow-hidden"
        >
          <div className="aspect-video relative overflow-hidden bg-[var(--muted)]">
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            <Parallax amount={-18} className="absolute bottom-4 right-5">
              <span className="font-display text-[5rem] leading-none font-light text-white/[0.12] group-hover:text-white/[0.2] transition-colors duration-500 select-none">
                {num}
              </span>
            </Parallax>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-white border border-white/40 bg-black/30 backdrop-blur-sm px-4 py-2">
                View Project
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-3 bg-[var(--bg)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display text-[11px] sm:text-[10px] text-[var(--accent)] tracking-widest">{num}</span>
                <h3 className="text-base font-medium group-hover:text-[var(--accent)] transition-colors duration-300">
                  {work.title}
                </h3>
              </div>
              <span className="text-xs text-[var(--muted-fg)] shrink-0 mt-0.5 tabular-nums">{work.year}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <span key={tag} className="text-[11px] sm:text-[9px] tracking-widest uppercase text-[var(--muted-fg)] border border-[var(--border)] px-2 py-1 group-hover:border-[color-mix(in_srgb,var(--accent)_25%,transparent)] transition-colors duration-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="h-px w-0 group-hover:w-full bg-[var(--accent)] transition-all duration-500 ease-out" />
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function Works() {
  const [featured, ...rest] = featuredWorks

  return (
    <section id="works" className="py-40 px-6 sm:px-10 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">

        <Parallax amount={18} className="flex items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[03] Works</p>
            <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">Selected Works</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              href="/works"
              className="group inline-flex items-center gap-3 text-[11px] sm:text-[10px] tracking-[0.3em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
            >
              All {works.length} works
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </Parallax>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <FeaturedCard work={featured} index={0} />
          {rest.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i + 1} />
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/works"
            className="group relative text-[11px] sm:text-[10px] tracking-[0.35em] uppercase px-10 py-4 border border-[var(--fg)] text-[var(--fg)] overflow-hidden transition-colors duration-300 hover:text-[var(--bg)]"
          >
            <span className="absolute inset-0 bg-[var(--fg)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative">すべての実績を見る（{works.length}）</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
