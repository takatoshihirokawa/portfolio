"use client"

import { useActionState } from "react"
import { motion } from "framer-motion"
import { submitContact, type ContactState } from "@/app/actions/contact"
import Parallax from "@/components/ui/Parallax"
import BlockReveal from "@/components/ui/BlockReveal"
import Decode from "@/components/ui/Decode"
import Magnetic from "@/components/ui/Magnetic"

export default function Contact() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(submitContact, { ok: false })
  const submitted = state.ok

  const inputClass =
    "w-full bg-transparent border border-[var(--border)] px-4 py-4 text-base text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--accent)] focus:outline-none transition-colors"

  return (
    <section id="contact" className="py-40 px-6 sm:px-12 border-t border-[var(--border)]">
      {/* PC: heading and promise on the left, form on the right. Phones stack them. */}
      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-12 lg:gap-16">
        <Parallax amount={18} className="lg:col-span-5">
        <motion.div
          className="mb-20 lg:mb-0 lg:sticky lg:top-32"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px 0px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2"><Decode text="[06] CONTACT" /></p>
          <BlockReveal as="p" className="font-display text-3xl sm:text-4xl font-light tracking-wide" delay={0.15}>相談する</BlockReveal>
          <p className="mt-6 text-base text-[var(--muted-fg)] leading-8 max-w-xl lg:max-w-none">
            何から頼めばよいか、決まっていなくても大丈夫です。
            単発の制作から、企画・導入、継続的な改善まで。目的と予算に合わせて、一緒に進め方を考えます。
            3営業日以内にご返信します。
          </p>
        </motion.div>
        </Parallax>

        <div className="max-w-2xl lg:col-span-7 lg:max-w-none">
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
              <form action={formAction} className="flex flex-col gap-4">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="お名前"
                  autoComplete="name"
                  required
                  name="name"
                  className={inputClass}
                />

                <input
                  type="email"
                  placeholder="メールアドレス"
                  autoComplete="email"
                  inputMode="email"
                  required
                  name="email"
                  className={inputClass}
                />

                <textarea
                  placeholder="ご相談内容（まだ漠然としていても大丈夫です）"
                  required
                  rows={6}
                  name="message"
                  className={inputClass}
                />

                <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <Magnetic>
                  <button
                    type="submit"
                    disabled={pending}
                    className="text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start disabled:opacity-50"
                  >
                    {pending ? "送信中…" : "送信する"}
                  </button>
                  </Magnetic>
                  <p className="text-sm text-[var(--muted-fg)] leading-6">
                    送信により
                    <a href="/privacy-policy" className="underline hover:text-[var(--accent)] transition-colors">プライバシーポリシー</a>
                    に同意したものとみなします。
                  </p>
                </div>
                {state.error && <p className="text-sm text-red-500">{state.error}</p>}
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
