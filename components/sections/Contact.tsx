"use client"

// e.preventDefault() in handleSubmit — backend integration is Phase 3 (Supabase)

import { useState } from "react"
import { motion } from "framer-motion"
import Parallax from "@/components/ui/Parallax"

type FormState = {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // No backend in Phase 1
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--accent)] focus:outline-none transition-colors"

  return (
    <section id="contact" className="py-40 px-6 sm:px-10 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <Parallax amount={18}>
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">[05] Contact</p>
          <p className="font-display text-3xl sm:text-4xl font-light tracking-wide">Let&apos;s Talk</p>
          <p className="mt-6 text-base text-[var(--muted-fg)] leading-8 max-w-xl">
            何から頼めばよいか、決まっていなくても大丈夫です。
            単発の制作から、企画・導入、継続的な改善まで。目的と予算に合わせて、一緒に進め方を考えます。
            3営業日以内にご返信します。
          </p>
        </motion.div>
        </Parallax>

        <div className="max-w-2xl">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            {submitted ? (
              <div className="flex flex-col gap-4 py-16">
                <p className="text-[var(--accent)] text-lg">送信しました。</p>
                <p className="text-sm text-[var(--muted-fg)]">
                  3営業日以内にご返信いたします。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="お名前"
                  autoComplete="name"
                  required
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  type="email"
                  placeholder="メールアドレス"
                  autoComplete="email"
                  inputMode="email"
                  required
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <textarea
                  placeholder="ご相談内容（まだ漠然としていても大丈夫です）"
                  required
                  rows={6}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button
                    type="submit"
                    className="text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start"
                  >
                    送信する
                  </button>
                  <p className="text-[11px] text-[var(--muted-fg)] leading-5">
                    送信により
                    <a href="/privacy-policy" className="underline hover:text-[var(--accent)] transition-colors">プライバシーポリシー</a>
                    に同意したものとみなします。
                  </p>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
