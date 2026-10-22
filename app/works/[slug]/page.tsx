import { Suspense } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { works as staticWorks } from "@/lib/works"
import { getWork } from "@/lib/data"
import Reveal from "@/components/ui/Reveal"
import Parallax from "@/components/ui/Parallax"
import BlockReveal from "@/components/ui/BlockReveal"

export function generateStaticParams() {
  return staticWorks.map((work) => ({ slug: work.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await getWork(slug)
  if (!found) return {}
  const work = found.work
  return {
    title: `${work.title} | Takatoshi Hirokawa`,
    description: work.summary,
    openGraph: { images: [work.thumbnail] },
  }
}

const label = "text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)] mb-3 block"

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WorkContent params={params} />
    </Suspense>
  )
}

async function WorkContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await getWork(slug)
  if (!found) notFound()
  const { work, prev, next, index } = found
  const num = String(index + 1).padStart(2, "0")

  return (
    <article className="pt-32 pb-40 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link
            href="/#works"
            className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
          >
            <span>←</span> Works
          </Link>
        </Reveal>

        {/* Header */}
        <header className="mt-14 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-8">
            <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-4">
              [{num}] {work.category} · {work.year}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-light leading-[1.15] tracking-wide">
              {work.title}
            </h1>
            <div className="flex flex-wrap gap-1.5 mt-6">
              {work.tags.map((tag) => (
                <span key={tag} className="text-[11px] sm:text-[9px] tracking-widest uppercase text-[var(--muted-fg)] border border-[var(--border)] px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:pt-10">
            <p className="text-base leading-8 opacity-80">{work.summary}</p>
          </Reveal>
        </header>

        {/* Hero image */}
        <Reveal delay={0.15}>
          <div className="relative aspect-video overflow-hidden border border-[var(--border)] bg-[var(--muted)]">
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Meta */}
        <Reveal>
          <dl className="mt-10 grid grid-cols-2 md:grid-cols-4 border border-[var(--border)] divide-y md:divide-y-0 divide-[var(--border)]">
            {[
              ["Client", work.client],
              ["Role", work.role],
              ["Year", String(work.year)],
              ["Type", work.category],
            ].map(([k, v], i) => (
              <div key={k} className={`px-6 py-5 ${i % 2 === 0 ? "border-r border-[var(--border)]" : "md:border-r md:border-[var(--border)]"} ${i === 3 ? "md:border-r-0" : ""}`}>
                <dt className={label}>{k}</dt>
                <dd className="text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Story */}
        <div className="mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Parallax amount={14}>
              <Reveal>
                <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">Story</p>
                <BlockReveal as="p" className="font-display text-3xl font-light tracking-wide" delay={0.15}>課題と進め方</BlockReveal>
              </Reveal>
            </Parallax>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-14">
            <Reveal>
              <span className={label}>Background</span>
              <p className="text-base leading-9 opacity-80">{work.background}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <span className={label}>Approach</span>
              <p className="text-base leading-9 opacity-80">{work.approach}</p>
            </Reveal>
            {work.url && (
              <Reveal delay={0.1}>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-[var(--accent)] border-b border-[var(--accent)] pb-1 hover:gap-5 transition-all duration-300"
                >
                  Visit Site
                  <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                </a>
              </Reveal>
            )}
          </div>
        </div>

        {/* Full screenshot */}
        {work.screenshot && (
          <Reveal className="mt-28">
            <span className={label}>Screens</span>
            <div className="border border-[var(--border)] bg-[var(--muted)]">
              <Image
                src={work.screenshot}
                alt={`${work.title} の画面`}
                width={1600}
                height={4000}
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        )}

        {/* Prev / Next */}
        <nav className="mt-32 grid grid-cols-2 border-t border-[var(--border)]">
          {[
            { w: prev, dir: "Prev", align: "items-start text-left", arrow: "←" },
            { w: next, dir: "Next", align: "items-end text-right border-l border-[var(--border)]", arrow: "→" },
          ].map(({ w, dir, align, arrow }) => (
            <Link
              key={dir}
              href={`/works/${w.slug}`}
              className={`group flex flex-col ${align} gap-3 py-10 px-2 sm:px-6 hover:bg-[var(--muted)] transition-colors`}
            >
              <span className="text-[11px] sm:text-[9px] tracking-[0.4em] uppercase text-[var(--muted-fg)]">
                {dir === "Prev" ? `${arrow} ${dir}` : `${dir} ${arrow}`}
              </span>
              <span className="text-sm sm:text-base font-medium group-hover:text-[var(--accent)] transition-colors leading-snug">
                {w.title}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}
