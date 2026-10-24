import Link from "next/link"
import { getWorks } from "@/lib/data"
import { Suspense } from "react"
import WorksGrid, { WorksTabs } from "@/components/works/WorksGrid"
import Reveal from "@/components/ui/Reveal"
import BlockReveal from "@/components/ui/BlockReveal"
import Decode from "@/components/ui/Decode"

export const metadata = {
  title: "Works | Takatoshi Hirokawa",
  description: "Webアプリ、Webサイト、広告・映像の制作実績と、自分で作って動かしている自主開発（Lab）。",
}

export default async function WorksIndex() {
  const works = await getWorks()
  return (
    <div className="pt-32 pb-40 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors">
            <span>←</span> Home
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-14 mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2"><Decode text="ALL WORKS" /></p>
              <BlockReveal as="p" className="font-display text-4xl sm:text-5xl font-light tracking-wide" delay={0.15}>制作実績</BlockReveal>
            </div>
            <p className="text-base text-[var(--muted-fg)] leading-8 sm:max-w-sm sm:text-right">
              Webアプリ・Webサイト・広告映像まで。広告会社時代のプロデュース案件と、独立後の企画〜開発案件です。自分で作って動かしているものは「Lab」にまとめています。
            </p>
          </div>
        </Reveal>
        <Suspense fallback={<WorksGrid works={works.filter((w) => w.category !== "Lab")} />}>
          <WorksTabs works={works} />
        </Suspense>
      </div>
    </div>
  )
}
