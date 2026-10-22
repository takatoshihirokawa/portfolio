import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { SUPABASE_KEY, SUPABASE_URL } from "./env"

export async function createServerSupabase() {
  const cookieStore = await cookies()
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Called from a Server Component; the proxy/route handler refreshes sessions instead.
        }
      },
    },
  })
}
