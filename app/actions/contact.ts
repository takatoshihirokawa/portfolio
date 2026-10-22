"use server"

import { createPublicClient } from "@/lib/supabase/public"

export type ContactState = { ok: boolean; error?: string }

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()
  if (String(formData.get("company") ?? "")) return { ok: true } // honeypot
  if (!name || !email || !message) return { ok: false, error: "すべての項目を入力してください。" }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "メールアドレスの形式を確認してください。" }

  const { error } = await createPublicClient()
    .from("portfolio_contact_submissions")
    .insert({ name, email, message })
  if (error) return { ok: false, error: "送信に失敗しました。時間をおいて再度お試しください。" }
  return { ok: true }
}
