import { notFound } from "next/navigation"
import Link from "next/link"
import { works } from "@/lib/works"

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = works.find((w) => w.slug === slug)
  if (!work) return {}
  return { title: `${work.title} | Takatoshi Hirokawa` }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const work = works.find((w) => w.slug === slug)

  if (!work) notFound()

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors mb-12"
        >
          ← Works
        </Link>

        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <span className="text-xs tracking-widest uppercase text-[var(--accent)]">
              {work.year}
            </span>
            <h1 className="text-3xl sm:text-4xl font-light leading-snug">
              {work.title}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 border border-[var(--border)] text-[var(--muted-fg)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="aspect-video bg-[var(--muted)]" />

          {/* Description */}
          <p className="text-sm leading-7 text-[var(--muted-fg)]">
            {work.description}
          </p>

          <p className="text-xs text-[var(--muted-fg)] border border-[var(--border)] px-4 py-3">
            詳細コンテンツはPhase 2で追加予定
          </p>
        </div>
      </div>
    </div>
  )
}
