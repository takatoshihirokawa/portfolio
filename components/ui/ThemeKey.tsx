"use client"

import { useTheme } from "@/lib/theme"

// Remounts its children when the theme flips, so entrance animations replay in the other mode's style.
export default function ThemeKey({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  return <div key={theme} className="contents">{children}</div>
}
