"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { checkPassphrase } from "@/lib/data"
import { SECRET_COOKIE } from "@/lib/secret"

export type UnlockState = { error?: string; at?: number }

export async function unlock(_prev: UnlockState, fd: FormData): Promise<UnlockState> {
  const p = String(fd.get("passphrase") ?? "").trim()
  if (!p || !(await checkPassphrase(p))) return { error: "ちがうみたい", at: Date.now() }
  ;(await cookies()).set(SECRET_COOKIE, p, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
  redirect("/private")
}

export async function lock() {
  ;(await cookies()).delete(SECRET_COOKIE)
  redirect("/")
}
