import type { MetadataRoute } from "next"
import { getWorks } from "@/lib/data"

const BASE = "https://takatoshihirokawa.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks()
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/works`, changeFrequency: "weekly", priority: 0.8 },
    ...works.map((w) => ({ url: `${BASE}/works/${w.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: `${BASE}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
  ]
}
