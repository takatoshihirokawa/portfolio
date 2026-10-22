"use client"

import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"

export default function Topics() {
  const { ease, speed, dist } = useMotionTheme()
  return (
    <section id="topics" className="py-40 px-6 sm:px-10 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={18}>
          <motion.div
            initial={{ opacity: 0, y: dist }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75 * speed, ease }}
            className="mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[03] Topics</p>
            <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">Notes &amp; Updates</p>
          </motion.div>
        </Parallax>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 * speed, delay: 0.15 }}
          className="border border-dashed border-[var(--border)] px-8 py-14 flex flex-col items-center gap-3 text-center"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <p className="text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)]">Coming soon</p>
          <p className="text-sm text-[var(--muted-fg)] leading-7">
            制作の裏側やAI活用の知見など、近日公開予定です。
          </p>
        </motion.div>
      </div>
    </section>
  )
}
