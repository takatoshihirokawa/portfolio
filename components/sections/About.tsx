"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"
import BlockReveal from "@/components/ui/BlockReveal"

function useCountUp(target: number, duration = 1.6) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / (duration * 1000), 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setValue(Math.floor(eased * target))
            if (t < 1) requestAnimationFrame(tick)
            else setValue(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { value, ref }
}

const pillars = [
  {
    title: "DX・業務改善",
    items: ["業務整理・改善の優先順位づけ", "申込・注文・問い合わせの受付整備", "情報の一元管理・作業の自動化", "AI活用の相談・導入、Webアプリ開発"],
  },
  {
    title: "Web・コンテンツ制作",
    items: ["ホームページ・サービスサイト・採用ページ", "LP・公式LINEの構築", "写真・映像の制作プロデュース", "チラシ・パンフレット・販促物"],
  },
]

const fields = pillars.flatMap((p) => p.items)

const stats = [
  { target: 20, suffix: "+", label: "Years\nExperience" },
  { target: 60, suffix: "+", label: "Projects\nDelivered" },
  { target: fields.length, suffix: "", label: "Service\nAreas" },
]

const tools = {
  Design: ["Adobe XD", "Illustrator", "Photoshop"],
  Development: ["Bubble", "Studio", "Next.js"],
  AI: ["Claude Code", "Dify"],
}

function StatBox({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { value, ref } = useCountUp(target)
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-2">
      <span ref={ref} className="font-display text-3xl sm:text-4xl font-light text-[var(--accent)] tracking-wide tabular-nums">
        {value}{suffix}
      </span>
      <span className="text-[11px] sm:text-[9px] tracking-[0.2em] uppercase text-[var(--muted-fg)] text-center leading-relaxed whitespace-pre-line">
        {label}
      </span>
    </div>
  )
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ease, speed, dist } = useMotionTheme()
  return (
    <motion.div
      initial={{ opacity: 0, y: dist }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75 * speed, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-40 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">

        <Parallax amount={18}>
          <FadeUp>
            <div className="mb-20">
              <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[03] About</p>
              <BlockReveal as="p" className="font-display text-3xl sm:text-4xl font-light tracking-wide" delay={0.15}>Who I Am</BlockReveal>
            </div>
          </FadeUp>
        </Parallax>

        {/* Stats — count-up on scroll */}
        <FadeUp delay={0.1}>
          <Parallax amount={-10}>
          <div className="grid grid-cols-3 border border-[var(--border)] mb-24">
            {stats.map((s, i) => (
              <div key={s.label} className={i < stats.length - 1 ? "border-r border-[var(--border)]" : ""}>
                <StatBox {...s} />
              </div>
            ))}
          </div>
          </Parallax>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Profile */}
          <div className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <div>
                <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Name</span>
                <p className="font-display text-3xl font-light tracking-wide">廣川 貴理</p>
                <p className="text-xs text-[var(--muted-fg)] tracking-[0.2em] mt-1">Takatoshi Hirokawa</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Profile</span>
                <p className="text-base leading-8 opacity-80">
                  山梨・河口湖を拠点に、地域の会社やお店の「デジタルまわりの相談相手」として活動。
                  ホームページやWebアプリの制作、受付・管理の仕組みづくり、AI活用まで、
                  困りごとの整理から制作・導入・運用まで一人で通して担当します。
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Background</span>
                <p className="text-base leading-8 opacity-80">
                  広告会社でテレビCMやWebの制作プロデュースを経験した後、事業会社を経て河口湖移住を機に独立。
                  いまは「作る」だけでなく、Bubble・Studio・AIを使って自分で「動くもの」まで作ります。
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Fields + Tools */}
          <div className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <div>
                <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-4 block">Service</span>
                <div className="flex flex-col gap-6">
                  {pillars.map((p, pi) => (
                    <div key={p.title}>
                      <p className="text-lg font-medium text-[var(--accent)] mb-3">{p.title}</p>
                      <ul className="flex flex-col gap-1.5">
                        {p.items.map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 * (i + pi * 4), duration: 0.4 }}
                            className="text-[15px] leading-7 opacity-80 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[13px] before:w-1.5 before:h-px before:bg-[var(--muted-fg)]"
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-4 block">Tools</span>
                <div className="flex flex-col gap-4">
                  {Object.entries(tools).map(([category, items]) => (
                    <div key={category} className="flex items-start gap-0">
                      <span className="text-[11px] sm:text-[9px] tracking-[0.2em] uppercase text-[var(--muted-fg)] w-28 shrink-0 pt-0.5">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {items.map((item) => (
                          <span key={item} className="text-sm opacity-80">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.3}>
              <a
                href="/#contact"
                className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[var(--accent)] border-b border-[var(--accent)] pb-1 hover:gap-5 transition-all duration-300 self-start"
              >
                仕事を依頼する
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
