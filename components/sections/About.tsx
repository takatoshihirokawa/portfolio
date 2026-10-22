"use client"

// once: true on viewport trigger prevents re-firing on scroll back up

import { motion } from "framer-motion"

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
  Design: ["XD", "Illustrator", "Photoshop"],
  Development: ["Bubble", "Studio", "Dify", "Next.js"],
}

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // once: true — no re-animation on scroll back
      transition={{ duration: 0.7, ease: "easeOut", delay }}
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
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-16">
            [01] About
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Profile */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-1">
                <span className="text-xs tracking-widest uppercase text-[var(--muted-fg)]">Name</span>
                <p className="text-2xl font-light mt-2">廣川 貴理</p>
                <p className="text-sm text-[var(--muted-fg)] tracking-widest">Takatoshi Hirokawa</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-widest uppercase text-[var(--muted-fg)]">Profile</span>
                <p className="text-sm leading-7 text-[var(--fg)] mt-2">
                  山梨県・河口湖を拠点に、企業やサービスのWeb・デジタル課題を支援。
                  サイト、アプリ、SNS、広告、採用コンテンツ、業務効率化、AI活用など、
                  企画から制作・開発まで一貫して対応。
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-widest uppercase text-[var(--muted-fg)]">Background</span>
                <p className="text-sm leading-7 text-[var(--fg)] mt-2">
                  2009年、電通クリエーティブXに入社しTVCM制作に従事。
                  その後、代理店・事業会社を経て、河口湖移住を機に独立。
                </p>
              </div>
            </FadeUp>
          </div>

          {/* Fields + Tools */}
          <div className="flex flex-col gap-8">
            <FadeUp delay={0.1}>
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[var(--muted-fg)]">Field</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {fields.map((field) => (
                    <span
                      key={field}
                      className="text-xs px-3 py-1.5 border border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-3">
                <span className="text-xs tracking-widest uppercase text-[var(--muted-fg)]">Tool</span>
                <div className="flex flex-col gap-3 mt-2">
                  {Object.entries(tools).map(([category, items]) => (
                    <div key={category} className="flex items-start gap-4">
                      <span className="text-xs text-[var(--muted-fg)] w-24 shrink-0 pt-0.5">
                        {category}
                      </span>
                      <span className="text-sm text-[var(--fg)]">
                        {items.join(" / ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
