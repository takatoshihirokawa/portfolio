"use client"

import { motion } from "framer-motion"

const stats = [
  { num: "15+", label: "Years\nExperience" },
  { num: "50+", label: "Projects\nDelivered" },
  { num: "2009", label: "電通\nCREATIVE X" },
]

const fields = [
  "Web・デジタル企画",
  "Webサイト / LP制作",
  "Webアプリ / サービス開発",
  "SNS / 広告施策",
  "採用コンテンツ",
  "AI活用 / DX支援",
  "プロジェクトマネジメント",
]

const tools = {
  Design: ["Adobe XD", "Illustrator", "Photoshop"],
  Development: ["Bubble", "Studio", "Dify", "Next.js"],
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        <FadeUp>
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[01] About</p>
            <p className="font-display text-3xl sm:text-4xl font-light tracking-wide text-[var(--fg)]">
              Who I Am
            </p>
          </div>
        </FadeUp>

        {/* Stats row */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-3 border border-[var(--border)] mb-20">
            {stats.map((stat, i) => (
              <div
                key={stat.num}
                className={`flex flex-col items-center justify-center py-10 gap-2 ${
                  i < stats.length - 1 ? "border-r border-[var(--border)]" : ""
                }`}
              >
                <span className="font-display text-3xl sm:text-4xl font-light text-[var(--accent)] tracking-wide">
                  {stat.num}
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--muted-fg)] text-center leading-relaxed whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Profile */}
          <div className="flex flex-col gap-10">
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3">Name</span>
                <p className="font-display text-2xl font-light tracking-wide">廣川 貴理</p>
                <p className="text-xs text-[var(--muted-fg)] tracking-[0.2em] mt-1">Takatoshi Hirokawa</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Profile</span>
                <p className="text-sm leading-8 text-[var(--fg)] opacity-80">
                  山梨県・河口湖を拠点に、企業やサービスのWeb・デジタル課題を支援。
                  サイト、アプリ、SNS、広告、採用コンテンツ、業務効率化、AI活用など、
                  企画から制作・開発まで一貫して対応。
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block">Background</span>
                <p className="text-sm leading-8 text-[var(--fg)] opacity-80">
                  2009年、電通クリエーティブXに入社しTVCM制作に従事。
                  その後、代理店・事業会社を経て、河口湖移住を機に独立。
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
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, duration: 0.4 }}
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
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span key={item} className="text-xs text-[var(--fg)] opacity-70">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* CTA inline */}
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
