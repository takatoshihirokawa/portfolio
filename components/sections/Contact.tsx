"use client"

// e.preventDefault() in handleSubmit — backend integration is Phase 3 (Supabase)

import { useState } from "react"
import { motion } from "framer-motion"

const inquiryTypes = [
  { value: "", label: "選択してください" },
  { value: "new", label: "新規制作" },
  { value: "renewal", label: "リニューアル・改善" },
  { value: "maintenance", label: "運用・保守" },
  { value: "other", label: "その他" },
]

const snsLinks = [
  { label: "LINE", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
]

type FormState = {
  lastName: string
  firstName: string
  lastKana: string
  firstKana: string
  email: string
  inquiryType: string
  message: string
  agreed: boolean
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    lastName: "",
    firstName: "",
    lastKana: "",
    firstKana: "",
    email: "",
    inquiryType: "",
    message: "",
    agreed: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // No backend in Phase 1
    setSubmitted(true)
  }

  const inputClass =
    "w-full bg-transparent border border-[var(--border)] px-4 py-3 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--accent)] focus:outline-none transition-colors"

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          [04] Contact
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
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
                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="姓"
                    required
                    className={inputClass}
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="名"
                    required
                    className={inputClass}
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>

                {/* Kana */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="セイ"
                    className={inputClass}
                    value={form.lastKana}
                    onChange={(e) => setForm({ ...form, lastKana: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="メイ"
                    className={inputClass}
                    value={form.firstKana}
                    onChange={(e) => setForm({ ...form, firstKana: e.target.value })}
                  />
                </div>

                <input
                  type="email"
                  placeholder="メールアドレス"
                  required
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <select
                  required
                  className={`${inputClass} appearance-none`}
                  value={form.inquiryType}
                  onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                >
                  {inquiryTypes.map((t) => (
                    <option key={t.value} value={t.value} disabled={t.value === ""}>
                      {t.label}
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="お問い合わせ内容"
                  required
                  rows={5}
                  className={inputClass}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />

                <label className="flex items-start gap-3 text-xs text-[var(--muted-fg)] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-[var(--accent)]"
                    checked={form.agreed}
                    onChange={(e) => setForm({ ...form, agreed: e.target.checked })}
                  />
                  <span>
                    <a href="/privacy-policy" className="underline hover:text-[var(--accent)] transition-colors">
                      プライバシーポリシー
                    </a>
                    に同意する
                  </span>
                </label>

                <button
                  type="submit"
                  className="mt-2 text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-6 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start"
                >
                  送信する
                </button>
              </form>
            )}
          </motion.div>

          {/* SNS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--muted-fg)] mb-4">
                SNS DM
              </p>
              <p className="text-sm text-[var(--muted-fg)] leading-7 mb-6">
                以下SNSのDMよりお気軽にご連絡ください。
                <br />
                3日以内にご返信いたします。
              </p>
              <div className="flex flex-col gap-3">
                {snsLinks.map((sns) => (
                  <a
                    key={sns.label}
                    href={sns.href}
                    className="flex items-center justify-between border border-[var(--border)] px-4 py-3 text-sm text-[var(--muted-fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors group"
                  >
                    {sns.label}
                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
