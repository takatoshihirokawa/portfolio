import { NextResponse } from "next/server"
import type { EmailOtpType } from "@supabase/supabase-js"
import { createServerSupabase } from "@/lib/supabase/server"

// Email link that works in any browser (unlike /auth/callback, which needs the browser that asked for it).
export async function GET(request: Request) {
  const url = new URL(request.url)
  const tokenHash = url.searchParams.get("token_hash")
  const type = (url.searchParams.get("type") ?? "email") as EmailOtpType
  const next = url.searchParams.get("next") ?? "/admin"
  if (tokenHash) {
    const supabase = await createServerSupabase()
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash })
    if (!error) return NextResponse.redirect(new URL(next, url.origin))
  }
  return NextResponse.redirect(new URL("/admin?login_error=1", url.origin))
}
