"use client"

import { useEffect, useState } from "react"

export type Theme = "dark" | "light"

export function glitchToggleTheme() {
  const html = document.documentElement
  if (html.classList.contains("glitching")) return
  html.classList.add("glitching")
  window.setTimeout(() => {
    html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light"
  }, 280)
  window.setTimeout(() => html.classList.remove("glitching"), 700)
}

export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light")
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

// Dark: snappy, expressive. Light: calmer, longer, shorter travel.
const PRESETS = {
  dark:  { ease: [0.16, 1, 0.3, 1] as const,    speed: 1,    dist: 40, stagger: 0.08 },
  light: { ease: [0.25, 0.9, 0.2, 1] as const,  speed: 1.15, dist: 32, stagger: 0.1 },
}

export function useMotionTheme() {
  const theme = useTheme()
  return { theme, ...PRESETS[theme] }
}
