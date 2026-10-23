import { Suspense } from "react"
import { notFound } from "next/navigation"
import { works as staticWorks } from "@/lib/works"
import { getWork, isLab } from "@/lib/data"
import WorkDetail from "@/components/works/WorkDetail"

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
  const back = isLab(found.work) ? { href: "/works?tab=lab", label: "Lab" } : { href: "/#works", label: "Works" }
  return <WorkDetail found={found} basePath="/works" back={back} />
}
