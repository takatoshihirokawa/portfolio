import { Suspense } from "react"
import Link from "next/link"
import { getAdminSession } from "@/lib/admin"
import LoginForm from "@/components/admin/LoginForm"
import { signOut } from "./actions"

export const metadata = { title: "Admin | Takatoshi Hirokawa", robots: { index: false, follow: false } }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  )
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAdminSession()

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-40 px-6 sm:px-12 flex items-start justify-center">
        <LoginForm />
      </div>
    )
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 px-6 sm:px-12 max-w-6xl mx-auto">
        <p className="text-base leading-8">{user.email} には管理権限がありません。</p>
        <form action={signOut}><button className="mt-6 text-xs tracking-[0.2em] uppercase underline">ログアウト</button></form>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-5 mb-10">
          <nav className="flex items-center gap-6 text-[11px] sm:text-[10px] tracking-[0.3em] uppercase">
            <Link href="/admin" className="text-[var(--fg)] hover:text-[var(--accent)]">Works</Link>
            <Link href="/admin?tab=inbox" className="text-[var(--muted-fg)] hover:text-[var(--accent)]">Inbox</Link>
            <Link href="/admin/works/new" className="text-[var(--accent)]">+ New</Link>
            <Link href="/" className="text-[var(--muted-fg)] hover:text-[var(--accent)]">Site ↗</Link>
          </nav>
          <form action={signOut}>
            <button className="text-[11px] sm:text-[10px] tracking-[0.3em] uppercase text-[var(--muted-fg)] hover:text-[var(--fg)]">
              {user.email} · Logout
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  )
}
