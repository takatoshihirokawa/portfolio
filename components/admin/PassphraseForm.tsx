"use client"

import { useActionState } from "react"
import { setPassphrase, type PassphraseState } from "@/app/admin/actions"

export default function PassphraseForm({ hasPassphrase }: { hasPassphrase: boolean }) {
  const [state, action, pending] = useActionState<PassphraseState, FormData>(setPassphrase, {})
  return (
    <form action={action} className="mb-12 border border-[var(--border)] p-5 flex flex-col gap-3">
      <p className="text-sm">
        非公開の実績の合言葉
        <span className="ml-2 text-[var(--muted-fg)]">{state.ok ? "（変更しました）" : hasPassphrase ? "（設定ずみ）" : "（まだ設定していません）"}</span>
      </p>
      <p className="text-xs text-[var(--muted-fg)] leading-6">
        トップの真ん中の顔を 5 回続けてタップすると、顔の下に入力欄が出ます。大文字・小文字、全角・半角、空白の違いは区別しません。変えると、前の合言葉で見ていた人は見られなくなります。
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input name="passphrase" type="text" autoComplete="off" minLength={6} required placeholder="新しい合言葉（6文字以上）" className="flex-1 bg-transparent border border-[var(--border)] px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none" />
        <button disabled={pending} className="shrink-0 text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-5 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] disabled:opacity-50">
          {pending ? "保存中…" : hasPassphrase ? "変更する" : "設定する"}
        </button>
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
    </form>
  )
}
