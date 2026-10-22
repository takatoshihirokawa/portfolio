import Link from "next/link"
import { getWorks } from "@/lib/data"
import WorksGrid from "@/components/works/WorksGrid"
import Reveal from "@/components/ui/Reveal"
import BlockReveal from "@/components/ui/BlockReveal"

export const metadata = {
  title: "Works | Takatoshi Hirokawa",
  description: "Webアプリ、Webサイト、広告・映像の制作実績と、自分で試した自動化の仕組み。",
}

export default async function WorksIndex() {
  const works = await getWorks()
  return (
    <div className="pt-32 pb-40 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] sm:text-[10px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors">
            <span>←</span> Home
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-14 mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] sm:text-[10px] tracking-[0.4em] uppercase text-[var(--accent)] mb-2">All Works</p>
              <BlockReveal as="p" className="font-display text-4xl sm:text-5xl font-light tracking-wide" delay={0.15}>制作実績</BlockReveal>
            </div>
            <p className="text-base text-[var(--muted-fg)] leading-8 sm:max-w-sm sm:text-right">
              Webアプリ・Webサイト・広告映像まで。広告会社時代のプロデュース案件と、独立後の企画〜開発案件に加え、自分で試した自動化の仕組み（Lab）も載せています。
            </p>
          </div>
        </Reveal>
        <WorksGrid works={works} />
      </div>
    </div>
  )
}
