import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getAdminSession } from "@/lib/admin"
import WorkForm from "@/components/admin/WorkForm"

export default function EditWork({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={null}>
      <EditWorkContent params={params} />
    </Suspense>
  )
}

async function EditWorkContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await getAdminSession()
  const { data } = await supabase.from("portfolio_works").select("*").eq("id", id).maybeSingle()
  if (!data) notFound()
  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-2 text-sm text-[var(--muted-fg)] hover:text-[var(--accent)] mb-6">← 一覧に戻る</Link>
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
        <p className="font-display text-2xl font-light tracking-wide">編集：{data.title}</p>
        <a href={`${data.secret ? "/private" : "/works"}/${data.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--muted-fg)] hover:text-[var(--accent)]">サイトで見る ↗</a>
      </div>
      <WorkForm values={data} />
    </div>
  )
}
