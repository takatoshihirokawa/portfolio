// Publishable keys are safe to ship to the browser; row-level security guards the data.
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://mccgdiqudmlaxqoiekel.supabase.co"
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_Dm8_Fnakeq4Bp14UxsFfnA_NdOaVTOb"
