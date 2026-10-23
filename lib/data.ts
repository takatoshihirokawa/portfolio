import { cacheLife, cacheTag } from "next/cache"
import { createPublicClient } from "@/lib/supabase/public"
import { works as staticWorks, type Work } from "@/lib/works"

export type WorkRow = Work & { id: string; published: boolean; pinned: boolean; sort_order: number }

const COLUMNS =
  "id, slug, title, year, category, tags, client, affiliation, role, url, summary, background, approach, thumbnail, screenshot, published, pinned, sort_order"

// Lab = things built and run on my own, shown apart from client work.
export const isLab = (w: Work) => w.category === "Lab"

function fallback(): WorkRow[] {
  const list = staticWorks.map((w, i) => ({ ...w, id: w.slug, published: true, pinned: false, sort_order: i }))
  return list.filter((w) => w.slug !== "lab-plant-blog").sort((a, b) => b.year - a.year)
}

export async function getWorks(): Promise<WorkRow[]> {
  return fetchWorks(4)
}

// Bump the version to drop entries cached by an older query shape.
async function fetchWorks(_version: number): Promise<WorkRow[]> {
  "use cache"
  cacheTag("works")
  cacheLife("minutes")
  try {
    const { data, error } = await createPublicClient()
      .from("portfolio_works")
      .select(COLUMNS)
      .eq("published", true)
      .eq("secret", false)
      .order("pinned", { ascending: false })
      .order("year", { ascending: false })
      .order("created_at", { ascending: false })
      .order("sort_order", { ascending: true })
    if (error || !data || data.length === 0) return fallback()
    return data as WorkRow[]
  } catch {
    return fallback()
  }
}

export async function getClientWorks(): Promise<WorkRow[]> {
  return (await getWorks()).filter((w) => !isLab(w))
}

export async function getLabWorks(): Promise<WorkRow[]> {
  return (await getWorks()).filter(isLab)
}

export async function getFeaturedWorks(): Promise<WorkRow[]> {
  return (await getClientWorks()).slice(0, 10)
}

export type FoundWork = { work: WorkRow; prev: WorkRow; next: WorkRow; index: number }

// Prev/next stay inside the same group (client works, or Lab).
function locate(all: WorkRow[], slug: string): FoundWork | null {
  const hit = all.find((w) => w.slug === slug)
  if (!hit) return null
  const group = all.filter((w) => isLab(w) === isLab(hit))
  const index = group.indexOf(hit)
  return {
    work: hit,
    prev: group[(index - 1 + group.length) % group.length],
    next: group[(index + 1) % group.length],
    index,
  }
}

export async function getWork(slug: string): Promise<FoundWork | null> {
  return locate(await getWorks(), slug)
}

// Passphrase-gated works. Never cached: the database checks the passphrase on every read.
export async function getSecretWorks(passphrase: string | undefined): Promise<WorkRow[] | null> {
  if (!passphrase) return null
  const { data, error } = await createPublicClient().rpc("portfolio_secret_works", { p: passphrase })
  if (error) return null
  const rows = (data ?? []) as WorkRow[]
  // An empty result also covers a wrong passphrase; tell them apart with the check function.
  if (rows.length === 0 && !(await checkPassphrase(passphrase))) return null
  return rows
}

export async function getSecretWork(passphrase: string | undefined, slug: string): Promise<FoundWork | null> {
  const rows = await getSecretWorks(passphrase)
  if (!rows) return null
  const index = rows.findIndex((w) => w.slug === slug)
  if (index === -1) return null
  return {
    work: rows[index],
    prev: rows[(index - 1 + rows.length) % rows.length],
    next: rows[(index + 1) % rows.length],
    index,
  }
}

export async function checkPassphrase(passphrase: string): Promise<boolean> {
  const { data } = await createPublicClient().rpc("portfolio_secret_ok", { p: passphrase })
  return data === true
}
