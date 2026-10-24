"use client"

import { useEffect, useState } from "react"
import { createBrowserSupabase } from "@/lib/supabase/browser"

const field = "w-full bg-transparent border border-[var(--border)] px-4 py-4 text-base focus:border-[var(--accent)] focus:outline-none"
const button = "text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-8 py-4 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all duration-300 self-start disabled:opacity-50"

export default function LoginForm() {
  const [mode, setMode] = useState<"password" | "link">("password")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("login_error")) {
      setError("リンクからログインできませんでした。リンクは、送ったときと同じブラウザで開く必要があります。パスワードでのログインもお試しください。")
    }
  }, [])

  // Password login happens right here, so it works in any browser and from a phone home-screen icon.
  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { error } = await createBrowserSupabase().auth.signInWithPassword({ email, password })
    if (error) { setBusy(false); setError("メールアドレスかパスワードが違います。"); return }
    window.location.href = "/admin"
  }

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(null)
    const { error } = await createBrowserSupabase().auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    })
    setBusy(false)
    if (error) setError(/rate limit/i.test(error.message) ? "メールを送れる回数の上限に達しました。1 時間ほどおいてから送るか、パスワードでログインしてください。" : error.message)
    else setSent(true)
  }

  const emailInput = (
    <input type="email" required autoComplete="email" placeholder="メールアドレス" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
  )

  return (
    <div className="max-w-sm w-full">
      <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2">Admin</p>
      <p className="font-display text-3xl font-light tracking-wide mb-8">ログイン</p>
      {mode === "password" ? (
        <form onSubmit={signIn} className="flex flex-col gap-4">
          {emailInput}
          <input type="password" required autoComplete="current-password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} className={field} />
          <button type="submit" disabled={busy} className={button}>{busy ? "確認中…" : "ログイン"}</button>
          {error && <p className="text-sm text-red-500 leading-6">{error}</p>}
          <button type="button" onClick={() => { setMode("link"); setError(null) }} className="self-start text-sm text-[var(--muted-fg)] underline">
            パスワードがない・忘れたときは、メールでリンクを送る
          </button>
        </form>
      ) : sent ? (
        <p className="text-base leading-8 text-[var(--muted-fg)]">
          {email} にログイン用のリンクを送りました。このページを開いているのと同じブラウザで、リンクを開いてください。
        </p>
      ) : (
        <form onSubmit={sendLink} className="flex flex-col gap-4">
          {emailInput}
          <button type="submit" disabled={busy} className={button}>{busy ? "送信中…" : "リンクを送る"}</button>
          {error && <p className="text-sm text-red-500 leading-6">{error}</p>}
          <p className="text-sm text-[var(--muted-fg)] leading-6">リンクは、このページを開いているのと同じブラウザで開いてください（パソコン向け）。</p>
          <button type="button" onClick={() => { setMode("password"); setError(null) }} className="self-start text-sm text-[var(--muted-fg)] underline">
            パスワードでログインする
          </button>
        </form>
      )}
    </div>
  )
}
