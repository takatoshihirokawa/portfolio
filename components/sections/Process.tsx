"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import Reveal from "@/components/ui/Reveal"
import BlockReveal from "@/components/ui/BlockReveal"
import Decode from "@/components/ui/Decode"

const steps = [
  { en: "Listen", title: "目的と現状を聞く", body: "今の仕事の流れ、困っている点、使える予算や時期を整理します。" },
  { en: "Plan", title: "必要な方法を選ぶ", body: "ホームページ・フォーム・既存ツール・Webアプリなど、必要な組み合わせを提案します。" },
  { en: "Make & Run", title: "形にして動かす", body: "制作・開発と進行を担当。公開後・導入後も使われ方を見て改善します。" },
]

export default function Process() {
  const { ease, speed, stagger } = useMotionTheme()
  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 85%", "start 35%"] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <section id="process" className="py-40 px-6 sm:px-12 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={18}>
          <Reveal>
            <div className="mb-20">
              <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2"><Decode text="[02] PROCESS" /></p>
              <BlockReveal as="p" className="font-display text-3xl sm:text-4xl font-light tracking-wide" delay={0.15}>相談から実行まで</BlockReveal>
            </div>
          </Reveal>
        </Parallax>

        <div ref={lineRef} className="relative hidden md:block h-px mb-10 bg-[var(--border)]">
          <motion.div className="absolute inset-y-0 left-0 w-full bg-[var(--accent)] origin-left" style={{ scaleX: lineScale }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 * speed, ease, delay: i * stagger * 1.5 }}
              className="relative flex flex-col gap-5 md:pr-12"
            >
              <span className="font-display text-5xl sm:text-6xl font-light text-[var(--accent)] leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)]">{s.en}</span>
              <p className="text-xl font-medium">{s.title}</p>
              <p className="text-base text-[var(--muted-fg)] leading-8">{s.body}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-20 text-base text-[var(--accent)] font-medium leading-8">
            大がかりなシステムではなく、日々の仕事に合わせた「使える仕組み」を、小さく始めて育てます。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
