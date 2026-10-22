"use client"

import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import Reveal from "@/components/ui/Reveal"

const steps = [
  { en: "Listen", title: "目的と現状を聞く", body: "今の仕事の流れ、困っている点、使える予算や時期を整理します。" },
  { en: "Plan", title: "必要な方法を選ぶ", body: "ホームページ・フォーム・既存ツール・Webアプリなど、必要な組み合わせを提案します。" },
  { en: "Make & Run", title: "形にして動かす", body: "制作・開発と進行を担当。公開後・導入後も使われ方を見て改善します。" },
]

export default function Process() {
  const { ease, speed, stagger } = useMotionTheme()
  return (
    <section id="process" className="py-40 px-6 sm:px-10 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={18}>
          <Reveal>
            <div className="mb-20">
              <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[02] Process</p>
              <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">相談から実行まで</p>
            </div>
          </Reveal>
        </Parallax>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.en}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7 * speed, ease, delay: i * stagger * 1.5 }}
              className="relative flex flex-col gap-5"
            >
              <span className="font-display text-5xl sm:text-6xl font-light text-[var(--accent)] leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)]">{s.en}</span>
              <p className="text-xl font-medium">{s.title}</p>
              <p className="text-base text-[var(--muted-fg)] leading-8">{s.body}</p>
              {i < steps.length - 1 && (
                <span className="hidden md:block absolute top-7 right-0 w-8 h-px bg-[var(--border)]" />
              )}
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
