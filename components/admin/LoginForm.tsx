"use client"

import { useEffect, useState } from "react"
import { createBrowserSupabase } from "@/lib/supabase/browser"

const field = "w-full bg-transparent border border-[var(--border)] px-4 py-4 text-base focus:border-[var(--accent)] focus:outline-none"
const button = "text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start disabled:opacity-50"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("login_error")) {
      setError("リンクからログインできませんでした。もう一度リンクを送り、メールに書かれたコードを入力してください。")
    }
  }, [])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { error } = await createBrowserSupabase().auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    })
    setBusy(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  // Typing the code logs in right here, so it works on a phone's home-screen icon too.
  const verify = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { error } = await createBrowserSupabase().auth.verifyOtp({ email, token: code.replace(/\D/g, ""), type: "email" })
    if (error) { setBusy(false); setError("コードが違うか、期限が切れています。もう一度送ってください。"); return }
    window.location.href = "/admin"
  }

  return (
    <div className="max-w-sm w-full">
      <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">Admin</p>
      <p className="font-display text-3xl font-light tracking-wide mb-8">ログイン</p>
      {sent ? (
        <form onSubmit={verify} className="flex flex-col gap-4">
          <p className="text-base leading-8 text-[var(--muted-fg)]">
            {email} にメールを送りました。メールに書かれた数字のコードを入力してください。
          </p>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            placeholder="コード"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${field} tracking-[0.4em] text-center`}
          />
          <button type="submit" disabled={busy} className={button}>{busy ? "確認中…" : "ログイン"}</button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="button" onClick={() => { setSent(false); setCode("") }} className="self-start text-sm text-[var(--muted-fg)] underline">
            メールアドレスを入れ直す
          </button>
        </form>
      ) : (
        <form onSubmit={send} className="flex flex-col gap-4">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <button type="submit" disabled={busy} className={button}>{busy ? "送信中…" : "コードを送る"}</button>
          {error && <p className="text-sm text-red-500 leading-6">{error}</p>}
          <p className="text-sm text-[var(--muted-fg)] leading-6">パスワードはありません。登録済みのメールアドレスにだけ届きます。</p>
        </form>
      )}
    </div>
  )
}
