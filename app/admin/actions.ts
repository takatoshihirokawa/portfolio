"use server"

import { redirect } from "next/navigation"
import { revalidateTag } from "next/cache"
import { getAdminSession } from "@/lib/admin"

async function requireAdmin() {
  const session = await getAdminSession()
  if (!session.isAdmin) throw new Error("権限がありません")
  return session.supabase
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim()

export type SaveState = { error?: string }

export async function saveWork(_prev: SaveState, fd: FormData): Promise<SaveState> {
  const supabase = await requireAdmin()
  const id = str(fd, "id")
  const slug = str(fd, "slug").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "")
  if (!slug || !str(fd, "title")) return { error: "スラッグとタイトルは必須です" }
  const row = {
    slug,
    title: str(fd, "title"),
    year: Number(str(fd, "year")) || new Date().getFullYear(),
    category: str(fd, "category") || "Web",
    tags: str(fd, "tags").split(/[,、]/).map((t) => t.trim()).filter(Boolean),
    client: str(fd, "client"),
    affiliation: str(fd, "affiliation") === "Agency" ? "Agency" : "Freelance",
    role: str(fd, "role"),
    url: str(fd, "url") || null,
    summary: str(fd, "summary"),
    background: str(fd, "background"),
    approach: str(fd, "approach"),
    thumbnail: str(fd, "thumbnail") || null,
    screenshot: str(fd, "screenshot") || null,
    published: fd.get("published") === "on",
    pinned: fd.get("pinned") === "on",
  }
  const q = id
    ? supabase.from("portfolio_works").update(row).eq("id", id)
    : supabase.from("portfolio_works").insert(row)
  const { error } = await q
  if (error) return { error: error.message.includes("duplicate") ? "このスラッグは既に使われています" : error.message }
  revalidateTag("works", "max")
  redirect("/admin?saved=1")
}

export async function deleteWork(fd: FormData) {
  const supabase = await requireAdmin()
  const id = str(fd, "id")
  if (!id) return
  await supabase.from("portfolio_works").delete().eq("id", id)
  revalidateTag("works", "max")
  redirect("/admin?deleted=1")
}

export async function setSubmissionStatus(fd: FormData) {
  const supabase = await requireAdmin()
  const id = str(fd, "id")
  const status = str(fd, "status")
  if (!id || !["new", "replied", "archived"].includes(status)) return
  await supabase.from("portfolio_contact_submissions").update({ status }).eq("id", id)
  redirect("/admin?tab=inbox")
}

export async function signOut() {
  const { supabase } = await getAdminSession()
  await supabase.auth.signOut()
  redirect("/admin")
}
