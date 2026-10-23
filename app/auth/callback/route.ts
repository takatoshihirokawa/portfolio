import { NextResponse } from "next/server"
import { createServerSupabase } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const next = url.searchParams.get("next") ?? "/admin"
  if (code) {
    const supabase = await createServerSupabase()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    // Fails when the link opens in a different browser than the one that asked for it.
    if (error) return NextResponse.redirect(new URL("/admin?login_error=1", url.origin))
  }
  return NextResponse.redirect(new URL(next, url.origin))
}
