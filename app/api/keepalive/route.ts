import { createPublicClient } from "@/lib/supabase/public"

// Free Supabase projects pause after a week without traffic; a daily cron keeps this one awake.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("unauthorized", { status: 401 })
  }
  const { count, error } = await createPublicClient()
    .from("portfolio_works")
    .select("id", { count: "exact", head: true })
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 })
  return Response.json({ ok: true, works: count, at: new Date().toISOString() })
}
