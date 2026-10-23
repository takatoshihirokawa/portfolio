import { Suspense } from "react"
import Link from "next/link"
import { getAdminSession } from "@/lib/admin"
import LoginForm from "@/components/admin/LoginForm"
import { signOut } from "./actions"

export const metadata = { title: "Admin | Takatoshi Hirokawa", robots: { index: false, follow: false }, appleWebApp: { title: "TH Admin" } }

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
      <div className="admin-root min-h-screen cursor-auto pt-32 pb-40 px-6 sm:px-12 flex items-start justify-center">
        <LoginForm />
      </div>
    )
  }
  if (!isAdmin) {
    return (
      <div className="admin-root min-h-screen cursor-auto pt-32 px-6 sm:px-12 max-w-6xl mx-auto">
        <p className="text-base leading-8">{user.email} には管理権限がありません。</p>
        <form action={signOut}><button className="mt-6 text-xs tracking-[0.2em] uppercase underline">ログアウト</button></form>
      </div>
    )
  }

  return (
    <div className="admin-root min-h-screen cursor-auto pb-32">
      <header className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 h-14 flex items-center justify-between gap-4">
          <nav className="flex items-center gap-5 sm:gap-7 text-sm overflow-x-auto whitespace-nowrap">
            <Link href="/admin" className="font-medium hover:text-[var(--accent)]">実績</Link>
            <Link href="/admin?tab=inbox" className="text-[var(--muted-fg)] hover:text-[var(--accent)]">問い合わせ</Link>
            <Link href="/admin?tab=settings" className="text-[var(--muted-fg)] hover:text-[var(--accent)]">合言葉</Link>
            <Link href="/admin/works/new" className="text-[var(--accent)]">＋ 新規</Link>
          </nav>
          <div className="flex items-center gap-5 text-sm shrink-0">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:inline text-[var(--muted-fg)] hover:text-[var(--accent)]">サイトを見る ↗</a>
            <form action={signOut}>
              <button className="text-[var(--muted-fg)] hover:text-[var(--fg)]" title={user.email}>ログアウト</button>
            </form>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 sm:px-12 pt-10">{children}</div>
    </div>
  )
}
