export const SECRET_COOKIE = "pf_secret"

// Forgiving match: full-width → half-width, case and spaces ignored.
export const normalizePassphrase = (p: string) => p.normalize("NFKC").toLowerCase().replace(/\s+/g, "")
