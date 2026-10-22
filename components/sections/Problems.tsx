"use client"

import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import Reveal from "@/components/ui/Reveal"

const problems = [
  { title: "商品の広め方が分からない", body: "伝え方を整理し、広告や商品紹介ページを企画・制作。" },
  { title: "会社やお店の魅力を伝えたい", body: "Web・写真・映像・紙を使い、商品や働く人の魅力を伝える。" },
  { title: "受付や転記に手間がかかる", body: "仕事の流れを整理し、フォームやツールで負担を減らす。" },
  { title: "社内の情報が散らばっている", body: "申請・顧客・案件などを、確認・管理しやすい仕組みに。" },
  { title: "ホームページが古いまま", body: "掲載情報を整理し、写真・文章・問い合わせ先など必要な箇所から更新。" },
  { title: "求人を出しても良さが伝わらない", body: "働く人への取材や撮影を行い、採用ページ・会社案内にまとめる。" },
]

export default function Problems() {
  const { ease, speed, stagger } = useMotionTheme()
  return (
    <section id="problems" className="py-40 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={18}>
          <Reveal>
            <div className="mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[01] Problems</p>
                <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">こんな困りごとから</p>
              </div>
              <p className="text-sm text-[var(--muted-fg)] leading-7 sm:max-w-xs sm:text-right">
                何を作るか・何を導入するかが決まる前から、一緒に考えます。
              </p>
            </div>
          </Reveal>
        </Parallax>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--border)]">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 * speed, ease, delay: (i % 3) * stagger }}
              className="group border-r border-b border-[var(--border)] p-8 sm:p-10 flex flex-col gap-4 hover:bg-[var(--muted)] transition-colors duration-500"
            >
              <span className="font-display text-[10px] tracking-[0.4em] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-base font-medium leading-snug">{p.title}</p>
              <p className="text-xs text-[var(--muted-fg)] leading-6">{p.body}</p>
              <span className="mt-auto h-px w-0 group-hover:w-10 bg-[var(--accent)] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
