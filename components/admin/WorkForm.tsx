"use client"

import { useActionState, useState } from "react"
import { saveWork, type SaveState } from "@/app/admin/actions"
import { createBrowserSupabase } from "@/lib/supabase/browser"

type Values = {
  id?: string; slug?: string; title?: string; year?: number; category?: string; tags?: string[]; client?: string
  affiliation?: string; role?: string; url?: string | null; summary?: string; background?: string; approach?: string
  thumbnail?: string | null; screenshot?: string | null; published?: boolean; pinned?: boolean; secret?: boolean
}

const input = "w-full bg-transparent border border-[var(--border)] px-4 py-3 text-base focus:border-[var(--accent)] focus:outline-none"
const label = "text-[11px] tracking-[0.3em] uppercase text-[var(--muted-fg)] mb-2 block"

function ImageField({ name, defaultValue, hint }: { name: string; defaultValue?: string | null; hint: string }) {
  const [value, setValue] = useState(defaultValue ?? "")
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const upload = async (file: File) => {
    setBusy(true); setErr(null)
    const supabase = createBrowserSupabase()
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
    // Random names: the bucket cannot be listed, so a URL is only known to pages that show it.
    const path = `${crypto.randomUUID()}.${ext}`
    const { error } = await supabase.storage.from("portfolio").upload(path, file, { cacheControl: "31536000", upsert: false })
    setBusy(false)
    if (error) { setErr(error.message); return }
    setValue(supabase.storage.from("portfolio").getPublicUrl(path).data.publicUrl)
  }

  return (
    <div>
      <span className={label}>{name} <span className="normal-case tracking-normal opacity-60">— {hint}</span></span>
      <div className="flex flex-col sm:flex-row gap-3">
        <input name={name} value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://… または /images/…" className={input} />
        <label className="shrink-0 text-xs tracking-[0.2em] uppercase border border-[var(--border)] px-4 py-3 cursor-pointer hover:border-[var(--accent)] text-center">
          {busy ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
      {value && <img src={value} alt="" className="mt-3 max-h-40 border border-[var(--border)]" />}
      {err && <p className="text-sm text-red-500 mt-2">{err}</p>}
    </div>
  )
}

export default function WorkForm({ values = {} }: { values?: Values }) {
  const [state, action, pending] = useActionState<SaveState, FormData>(saveWork, {})
  const v = values
  return (
    <form action={action} className="flex flex-col gap-8 max-w-3xl">
      {v.id && <input type="hidden" name="id" value={v.id} />}

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px] gap-4">
        <div><span className={label}>Title</span><input name="title" required defaultValue={v.title} className={input} /></div>
        <div><span className={label}>Year</span><input name="year" type="number" defaultValue={v.year ?? new Date().getFullYear()} className={input} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><span className={label}>Slug（URL）</span><input name="slug" required defaultValue={v.slug} placeholder="my-project" className={input} /></div>
        <div>
          <span className={label}>Category</span>
          <select name="category" defaultValue={v.category ?? "Web"} className={input}>
            {["App / Service", "Web", "Advertising", "AI Support", "Lab", "Other"].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><span className={label}>Client</span><input name="client" defaultValue={v.client} className={input} /></div>
        <div>
          <span className={label}>Affiliation</span>
          <select name="affiliation" defaultValue={v.affiliation ?? "Freelance"} className={input}>
            <option value="Freelance">Freelance</option><option value="Agency">Agency</option>
          </select>
        </div>
        <div><span className={label}>Role</span><input name="role" defaultValue={v.role} placeholder="企画・設計・開発" className={input} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><span className={label}>Tags（カンマ区切り）</span><input name="tags" defaultValue={v.tags?.join(", ")} placeholder="Direction, Development" className={input} /></div>
        <div><span className={label}>URL</span><input name="url" defaultValue={v.url ?? ""} placeholder="https://" className={input} /></div>
      </div>

      <div><span className={label}>Summary（一覧・冒頭）</span><textarea name="summary" rows={3} defaultValue={v.summary} className={input} /></div>
      <div><span className={label}>Background（背景）</span><textarea name="background" rows={5} defaultValue={v.background} className={input} /></div>
      <div><span className={label}>Approach（進め方）</span><textarea name="approach" rows={6} defaultValue={v.approach} className={input} /></div>

      <ImageField name="thumbnail" defaultValue={v.thumbnail} hint="16:9 推奨" />
      <ImageField name="screenshot" defaultValue={v.screenshot} hint="縦長の全画面スクショ（任意）" />

      <div className="flex flex-wrap items-center gap-8">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={v.published ?? true} className="accent-[var(--accent)]" /> 公開する</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="pinned" defaultChecked={v.pinned ?? false} className="accent-[var(--accent)]" /> 上に固定</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="secret" defaultChecked={v.secret ?? false} className="accent-[var(--accent)]" /> 合言葉で見せる（一覧・検索に出さない）</label>
        <span className="text-xs text-[var(--muted-fg)]">並びは実施年の新しい順（同じ年の中では追加が新しい順）。固定したものが一番上に来ます。トップには上から PC で 7 件、スマホで 10 件表示。Category を「Lab」にすると、Lab（自主開発）に入ります。「合言葉で見せる」にしたものは、合言葉を入れた人だけが /private で見られます。</span>
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending} className="self-start text-xs tracking-[0.2em] uppercase bg-[var(--accent)] text-[var(--bg)] px-10 py-4 hover:opacity-90 disabled:opacity-50">
        {pending ? "保存中…" : "保存する"}
      </button>
    </form>
  )
}
