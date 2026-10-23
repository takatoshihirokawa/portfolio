"use client"

import { useState } from "react"
import { createBrowserSupabase } from "@/lib/supabase/browser"

// Lets the admin log in with email + password, which works in any browser and from a phone home-screen icon.
export default function PasswordForm() {
  const [password, setPassword] = useState("")
  const [state, setState] = useState<{ ok?: boolean; error?: string }>({})
  const [busy, setBusy] = useState(false)

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setState({})
    const { error } = await createBrowserSupabase().auth.updateUser({ password })
    setBusy(false)
    if (error) setState({ error: error.message })
    else { setState({ ok: true }); setPassword("") }
  }

  return (
    <form onSubmit={save} className="mb-12 border border-[var(--border)] p-5 flex flex-col gap-3">
      <p className="text-sm">
        ログイン用のパスワード
        {state.ok && <span className="ml-2 text-[var(--muted-fg)]">（設定しました）</span>}
      </p>
      <p className="text-xs text-[var(--muted-fg)] leading-6">
        メールアドレスとこのパスワードで、スマホのホーム画面のアイコンからもログインできます。8 文字以上にしてください。
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="新しいパスワード（8文字以上）"
          className="flex-1 bg-transparent border border-[var(--border)] px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none"
        />
        <button disabled={busy} className="shrink-0 text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-5 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] disabled:opacity-50">
          {busy ? "保存中…" : "設定する"}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
    </form>
  )
}
