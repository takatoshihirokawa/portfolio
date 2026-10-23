import { Suspense } from "react"
import Link from "next/link"
import { getAdminSession } from "@/lib/admin"
import { deleteWork, setSubmissionStatus } from "./actions"

type SP = Promise<{ tab?: string; saved?: string; deleted?: string }>

export default function AdminHome({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={null}>
      <AdminHomeContent searchParams={searchParams} />
    </Suspense>
  )
}

async function AdminHomeContent({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams
  const { supabase } = await getAdminSession()
  const tab = sp.tab === "inbox" ? "inbox" : "works"

  if (tab === "inbox") {
    const { data: rows } = await supabase
      .from("portfolio_contact_submissions")
      .select("id, name, email, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(200)
    return (
      <div>
        <p className="font-display text-2xl font-light tracking-wide mb-8">お問い合わせ（{rows?.length ?? 0}）</p>
        <div className="flex flex-col gap-4">
          {(rows ?? []).map((r) => (
            <div key={r.id} className={`border border-[var(--border)] p-5 ${r.status === "archived" ? "opacity-50" : ""}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="text-sm">
                  <span className="font-medium">{r.name}</span>
                  <a href={`mailto:${r.email}`} className="ml-3 text-[var(--accent)] underline">{r.email}</a>
                </div>
                <div className="flex items-center gap-3 text-[11px] tracking-widest uppercase text-[var(--muted-fg)]">
                  <span>{new Date(r.created_at).toLocaleString("ja-JP")}</span>
                  <span className={r.status === "new" ? "text-[var(--accent)]" : ""}>{r.status}</span>
                </div>
              </div>
              <p className="text-base leading-7 whitespace-pre-wrap">{r.message}</p>
              <form action={setSubmissionStatus} className="mt-4 flex gap-2">
                <input type="hidden" name="id" value={r.id} />
                {["new", "replied", "archived"].map((s) => (
                  <button key={s} name="status" value={s} className="text-[11px] tracking-widest uppercase border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    {s}
                  </button>
                ))}
              </form>
            </div>
          ))}
          {!rows?.length && <p className="text-[var(--muted-fg)]">まだありません。</p>}
        </div>
      </div>
    )
  }

  const { data: works } = await supabase
    .from("portfolio_works")
    .select("id, slug, title, year, category, published, pinned, thumbnail")
    .order("pinned", { ascending: false })
    .order("year", { ascending: false })
    .order("created_at", { ascending: false })
    .order("sort_order", { ascending: true })

  return (
    <div>
      {sp.saved && <p className="mb-6 text-sm text-[var(--accent)]">保存しました。</p>}
      {sp.deleted && <p className="mb-6 text-sm text-[var(--accent)]">削除しました。</p>}
      <div className="flex items-end justify-between mb-8">
        <p className="font-display text-2xl font-light tracking-wide">実績（{works?.length ?? 0}）</p>
        <Link href="/admin/works/new" className="text-xs tracking-[0.2em] uppercase border border-[var(--accent)] text-[var(--accent)] px-5 py-3 hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-colors">
          + 新規追加
        </Link>
      </div>
      <div className="border-t border-[var(--border)]">
        {(works ?? []).map((w) => (
          <div key={w.id} className="grid grid-cols-[64px_1fr_auto] sm:grid-cols-[96px_1fr_auto_auto] items-center gap-4 border-b border-[var(--border)] py-3">
            <div className="aspect-video bg-[var(--muted)] overflow-hidden">
              {w.thumbnail && <img src={w.thumbnail} alt="" className="w-full h-full object-cover" />}
            </div>
            <div className="min-w-0">
              <Link href={`/admin/works/${w.id}`} className="text-base font-medium hover:text-[var(--accent)] line-clamp-1">{w.title}</Link>
              <p className="text-[11px] tracking-widest uppercase text-[var(--muted-fg)] mt-1">
                {w.year} · {w.category}
                {w.pinned && <span className="ml-2 text-[var(--accent)]">Pinned</span>}
                {!w.published && <span className="ml-2 text-red-500">Draft</span>}
              </p>
            </div>
            <Link href={`/works/${w.slug}`} target="_blank" className="hidden sm:inline text-[11px] tracking-widest uppercase text-[var(--muted-fg)] hover:text-[var(--accent)]">View ↗</Link>
            <form action={deleteWork}>
              <input type="hidden" name="id" value={w.id} />
              <button className="text-[11px] tracking-widest uppercase text-[var(--muted-fg)] hover:text-red-500">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
