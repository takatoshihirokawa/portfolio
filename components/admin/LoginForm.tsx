"use client"

import { useState } from "react"
import { createBrowserSupabase } from "@/lib/supabase/browser"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const supabase = createBrowserSupabase()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    })
    setBusy(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="max-w-sm w-full">
      <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">Admin</p>
      <p className="font-display text-3xl font-light tracking-wide mb-8">ログイン</p>
      {sent ? (
        <p className="text-base leading-8 text-[var(--muted-fg)]">
          {email} にログイン用のリンクを送りました。メールのリンクを開くと管理画面に入れます。
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border border-[var(--border)] px-4 py-4 text-base focus:border-[var(--accent)] focus:outline-none"
          />
          <button
            type="submit"
            disabled={busy}
            className="text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start disabled:opacity-50"
          >
            {busy ? "送信中…" : "ログインリンクを送る"}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <p className="text-sm text-[var(--muted-fg)] leading-6">パスワードはありません。登録済みのメールアドレスにだけリンクが届きます。</p>
        </form>
      )}
    </div>
  )
}
