"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Work } from "@/lib/works"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import BlockReveal from "@/components/ui/BlockReveal"
import Decode from "@/components/ui/Decode"

export default function Lab({ works }: { works: Work[] }) {
  const { speed, dist, stagger } = useMotionTheme()
  if (!works.length) return null

  return (
    <section id="lab" className="py-32 px-6 sm:px-12 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={14} className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2"><Decode text="[05] LAB" /></p>
            <BlockReveal as="p" className="font-display text-3xl sm:text-4xl font-light tracking-wide" delay={0.15}>Lab</BlockReveal>
          </motion.div>
          <p className="text-base text-[var(--muted-fg)] leading-8 sm:text-right">
            <span className="inline-block">自分で作り、運用している</span><span className="inline-block">サービスと仕組み。</span><br />
            <span className="inline-block">ここで試したことを、</span><span className="inline-block">仕事に活かしています。</span>
          </p>
        </Parallax>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
          {works.slice(0, 3).map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: dist }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 1 * speed, ease: [0.2, 0.8, 0.2, 1], delay: i * stagger }}
            >
              <Link href={`/works/${w.slug}`} data-cursor="view" className="group flex sm:flex-col gap-4 sm:gap-0 h-full bg-[var(--bg)] p-4 sm:p-0">
                <div className="relative w-28 sm:w-full shrink-0 aspect-video overflow-hidden bg-[var(--muted)]">
                  {w.thumbnail && (
                    <Image
                      src={w.thumbnail}
                      alt={w.title}
                      fill
                      sizes="(max-width: 640px) 112px, 380px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="min-w-0 sm:p-6 flex flex-col gap-1.5">
                  <h3 className="text-sm sm:text-base font-medium leading-snug [overflow-wrap:anywhere] group-hover:text-[var(--accent)] transition-colors duration-300">{w.title}</h3>
                  <span className="text-xs text-[var(--muted-fg)] tabular-nums">{w.year}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/works?tab=lab"
            className="group inline-flex items-center gap-3 whitespace-nowrap text-[11px] sm:text-[10px] tracking-[0.3em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
          >
            All lab projects
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
