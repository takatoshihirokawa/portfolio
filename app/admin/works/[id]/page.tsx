import { Suspense } from "react"
import { notFound } from "next/navigation"
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
      <p className="font-display text-2xl font-light tracking-wide mb-8">編集：{data.title}</p>
      <WorkForm values={data} />
    </div>
  )
}
