import Link from "next/link"
import WorkForm from "@/components/admin/WorkForm"

export default function NewWork() {
  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[var(--accent)] mb-6">← 一覧に戻る</Link>
      <p className="font-display text-2xl font-light tracking-wide mb-8">新規追加</p>
      <WorkForm />
    </div>
  )
}
