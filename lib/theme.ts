"use client"

import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

export function glitchToggleTheme() {
  const html = document.documentElement
  if (html.classList.contains("glitching")) return
  html.classList.add("glitching")
  window.setTimeout(() => {
    const next = html.dataset.theme === "light" ? "dark" : "light"
    html.dataset.theme = next
    // Phones tint their status bar from theme-color.
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#080808" : "#efefef")
    window.dispatchEvent(new CustomEvent("theme:flip", { detail: next }))
  }, 280)
  window.setTimeout(() => html.classList.remove("glitching"), 700)
}

export function useTheme(): Theme {
  // Pages always load light; read the live value so parts remounted after the flip start dark.
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  )
  useEffect(() => {
    const html = document.documentElement
    const read = () => setTheme(html.dataset.theme === "light" ? "light" : "dark")
    read()
    const obs = new MutationObserver(read)
    obs.observe(html, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])
  return theme
}

// Dark (the hidden side): fast, long travel. Light (the official site): calm.
const PRESETS = {
  dark:  { ease: [0.83, 0, 0.17, 1] as const,   speed: 0.85, dist: 90, stagger: 0.12 },
  light: { ease: [0.25, 0.9, 0.2, 1] as const,  speed: 1.15, dist: 32, stagger: 0.1 },
}

export function useMotionTheme() {
  const theme = useTheme()
  return { theme, ...PRESETS[theme] }
}
