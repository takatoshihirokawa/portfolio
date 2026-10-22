import { createServerSupabase } from "@/lib/supabase/server"

export async function getAdminSession() {
  const supabase = await createServerSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return { supabase, user: null, isAdmin: false }
  const { data } = await supabase.rpc("portfolio_is_admin")
  return { supabase, user, isAdmin: data === true }
}
