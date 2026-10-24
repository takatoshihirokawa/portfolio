import { Suspense } from "react"
import { cookies } from "next/headers"
import Link from "next/link"
import { getSecretWorks } from "@/lib/data"
import { SECRET_COOKIE } from "@/lib/secret"
import { lock } from "@/app/actions/secret"
import WorksGrid from "@/components/works/WorksGrid"
import UnlockForm from "@/components/ui/UnlockForm"
import Reveal from "@/components/ui/Reveal"
import BlockReveal from "@/components/ui/BlockReveal"
import Decode from "@/components/ui/Decode"

export default function PrivateIndex() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PrivateContent />
    </Suspense>
  )
}

async function PrivateContent() {
  const works = await getSecretWorks((await cookies()).get(SECRET_COOKIE)?.value)

  if (!works) {
    return (
      <div className="min-h-screen pt-40 pb-40 px-6 sm:px-12 flex flex-col items-center gap-8">
        <p className="text-base text-[var(--muted-fg)]">合言葉を入れると見られます。</p>
        <UnlockForm />
      </div>
    )
  }

  return (
    <div className="pt-32 pb-40 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors">
              <span>←</span> Home
            </Link>
            <form action={lock}>
              <button className="text-[11px] tracking-[0.35em] uppercase text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors">Lock</button>
            </form>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-14 mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-2"><Decode text="PRIVATE WORKS" /></p>
              <BlockReveal as="p" className="font-display text-4xl sm:text-5xl font-light tracking-wide" delay={0.15}>非公開の実績</BlockReveal>
            </div>
            <p className="text-base text-[var(--muted-fg)] leading-8 sm:max-w-sm sm:text-right">
              公開を控えている実績です。この画面や内容は、外に出さないようお願いします。
            </p>
          </div>
        </Reveal>
        {works.length ? (
          <WorksGrid works={works} basePath="/private" />
        ) : (
          <p className="text-[var(--muted-fg)]">まだありません。</p>
        )}
      </div>
    </div>
  )
}
