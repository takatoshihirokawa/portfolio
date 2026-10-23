import { Suspense } from "react"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import { getSecretWork } from "@/lib/data"
import { SECRET_COOKIE } from "@/lib/secret"
import WorkDetail from "@/components/works/WorkDetail"

export default function PrivateWorkPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PrivateWork params={params} />
    </Suspense>
  )
}

async function PrivateWork({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const passphrase = (await cookies()).get(SECRET_COOKIE)?.value
  if (!passphrase) redirect("/private")
  const found = await getSecretWork(passphrase, slug)
  if (!found) notFound()
  return <WorkDetail found={found} basePath="/private" back={{ href: "/private", label: "Private" }} />
}
