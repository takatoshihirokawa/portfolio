import { cacheLife, cacheTag } from "next/cache"
import { createPublicClient } from "@/lib/supabase/public"
import { works as staticWorks, type Work } from "@/lib/works"

export type WorkRow = Work & { id: string; published: boolean; pinned: boolean; sort_order: number }

const COLUMNS =
  "id, slug, title, year, category, tags, client, affiliation, role, url, summary, background, approach, thumbnail, screenshot, published, pinned, sort_order"

function fallback(): WorkRow[] {
  const list = staticWorks.map((w, i) => ({ ...w, id: w.slug, published: true, pinned: false, sort_order: i }))
  const front = ["clippick", "lab-threads-autopost"]
  return [...front.map((s) => list.find((w) => w.slug === s)!).filter(Boolean), ...list.filter((w) => !front.includes(w.slug))]
}

export async function getWorks(): Promise<WorkRow[]> {
  "use cache"
  cacheTag("works")
  cacheLife("hours")
  try {
    const { data, error } = await createPublicClient()
      .from("portfolio_works")
      .select(COLUMNS)
      .eq("published", true)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return fallback()
    return data as WorkRow[]
  } catch {
    return fallback()
  }
}

export async function getFeaturedWorks(): Promise<WorkRow[]> {
  return (await getWorks()).slice(0, 7)
}

export async function getWork(slug: string): Promise<{ work: WorkRow; prev: WorkRow; next: WorkRow; index: number } | null> {
  const all = await getWorks()
  const index = all.findIndex((w) => w.slug === slug)
  if (index === -1) return null
  return {
    work: all[index],
    prev: all[(index - 1 + all.length) % all.length],
    next: all[(index + 1) % all.length],
    index,
  }
}
