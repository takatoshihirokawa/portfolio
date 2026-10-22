import { cacheLife, cacheTag } from "next/cache"
import { createPublicClient } from "@/lib/supabase/public"
import { works as staticWorks, type Work } from "@/lib/works"

export type WorkRow = Work & { id: string; published: boolean; featured: boolean; sort_order: number }

const COLUMNS =
  "id, slug, title, year, category, tags, client, affiliation, role, url, summary, background, approach, thumbnail, screenshot, published, featured, sort_order"

function fallback(): WorkRow[] {
  return staticWorks.map((w, i) => ({ ...w, id: w.slug, published: true, featured: i < 6, sort_order: i }))
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
      .order("sort_order", { ascending: true })
      .order("year", { ascending: false })
    if (error || !data || data.length === 0) return fallback()
    return data as WorkRow[]
  } catch {
    return fallback()
  }
}

export async function getFeaturedWorks(): Promise<WorkRow[]> {
  const all = await getWorks()
  const featured = all.filter((w) => w.featured)
  return (featured.length ? featured : all).slice(0, 6)
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
