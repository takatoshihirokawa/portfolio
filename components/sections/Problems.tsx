"use client"

import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import Reveal from "@/components/ui/Reveal"

const problems = [
  { title: "受付や転記に手間がかかる", body: "電話や紙の受付、同じ内容の転記を整理し、フォームや公式LINE、既存ツールで手間を減らす。" },
  { title: "社内の情報が散らばっている", body: "チャットに散った申請・顧客・案件などを、確認・管理しやすいひとつの仕組みに。" },
  { title: "ホームページが古いまま", body: "掲載情報を整理し、写真・文章・問い合わせ先など、必要な箇所から直す。" },
  { title: "AIを仕事に使いたいが何から", body: "資料づくり、メール対応、情報整理など、使いどころの整理から導入・定着まで。" },
  { title: "会社やお店の魅力を伝えたい", body: "Web・写真・映像・紙を使い、商品や働く人の魅力が伝わる形にまとめる。" },
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
                <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[01] Problems</p>
                <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">こんな困りごとから</p>
              </div>
              <p className="text-base text-[var(--muted-fg)] leading-8 sm:max-w-sm sm:text-right">
                何を作るか・何を導入するかが決まる前から、一緒に考えます。制作も、業務の仕組みづくりも。
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
              <span className="font-display text-[11px] sm:text-[10px] tracking-[0.4em] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-xl font-medium leading-snug">{p.title}</p>
              <p className="text-base text-[var(--muted-fg)] leading-8">{p.body}</p>
              <span className="mt-auto h-px w-0 group-hover:w-10 bg-[var(--accent)] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
