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
  await notifySlack(name, email, message)
  return { ok: true }
}

async function notifySlack(name: string, email: string, message: string) {
  const url = process.env.SLACK_CONTACT_WEBHOOK_URL
  if (!url) return
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://takatoshihirokawa.com"
  const esc = (t: string) => t.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!)
  const quoted = esc(message.length > 2500 ? `${message.slice(0, 2500)}…` : message)
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `ポートフォリオに問い合わせ: ${name}`,
        blocks: [
          { type: "header", text: { type: "plain_text", text: "ポートフォリオに問い合わせが届きました" } },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*お名前*\n${esc(name)}` },
              { type: "mrkdwn", text: `*メール*\n<mailto:${email}|${email}>` },
            ],
          },
          { type: "section", text: { type: "mrkdwn", text: `*ご相談内容*\n${quoted}` } },
          { type: "context", elements: [{ type: "mrkdwn", text: `<${site}/admin?tab=inbox|管理画面の受信箱で見る>` }] },
        ],
      }),
      signal: AbortSignal.timeout(5000),
    })
  } catch {
    // Saved in the database already; Slack is best-effort.
  }
}
