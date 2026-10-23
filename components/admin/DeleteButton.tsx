"use client"

import { useFormStatus } from "react-dom"

export default function DeleteButton({ title }: { title: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      onClick={(e) => { if (!confirm(`「${title}」を削除します。元に戻せません。よろしいですか？`)) e.preventDefault() }}
      className="text-sm text-[var(--muted-fg)] hover:text-red-500 disabled:opacity-50"
    >
      {pending ? "削除中…" : "削除"}
    </button>
  )
}
