"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Parallax from "@/components/ui/Parallax"

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

const fields = [
  "Web・デジタル企画",
  "Webサイト / LP制作",
  "Webアプリ / サービス開発",
  "SNS / 広告施策",
  "採用コンテンツ",
  "AI活用 / DX支援",
  "プロジェクトマネジメント",
]

const stats = [
  { target: 15, suffix: "+", label: "Years\nExperience" },
  { target: 50, suffix: "+", label: "Projects\nDelivered" },
  { target: fields.length, suffix: "", label: "Fields\nCovered" },
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
      <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--muted-fg)] text-center leading-relaxed whitespace-pre-line">
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
    <section id="about" className="py-40 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">

        <Parallax amount={18}>
          <FadeUp>
            <div className="mb-20">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[01] About</p>
              <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">Who I Am</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Profile */}
          <div className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Name</span>
                <p className="font-display text-2xl font-light tracking-wide">廣川 貴理</p>
                <p className="text-xs text-[var(--muted-fg)] tracking-[0.2em] mt-1">Takatoshi Hirokawa</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Profile</span>
                <p className="text-sm leading-8 opacity-80">
                  山梨県・河口湖を拠点に、企業やサービスのWeb・デジタル課題を支援。
                  サイト、アプリ、SNS、広告、採用コンテンツ、業務効率化、AI活用など、
                  企画から制作・開発まで一貫して対応。
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Background</span>
                <p className="text-sm leading-8 opacity-80">
                  広告代理店・事業会社でWeb・デジタル領域の企画制作を経験した後、
                  河口湖移住を機に独立。
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Fields + Tools */}
          <div className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-4 block">Field</span>
                <div className="flex flex-wrap gap-2">
                  {fields.map((field, i) => (
                    <motion.span
                      key={field}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.04 * i, duration: 0.4 }}
                      className="text-xs px-3 py-1.5 border border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 cursor-default"
                    >
                      {field}
                    </motion.span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-4 block">Tools</span>
                <div className="flex flex-col gap-4">
                  {Object.entries(tools).map(([category, items]) => (
                    <div key={category} className="flex items-start gap-0">
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--muted-fg)] w-28 shrink-0 pt-0.5">
                        {category}
                      </span>
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {items.map((item) => (
                          <span key={item} className="text-xs opacity-70">{item}</span>
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
