"use client"

import { useEffect } from "react"

const CELL = 24
const CONTAINER = 1152
const GUTTER_SM = 48
const GUTTER_XS = 24

export default function GridAlign() {
  useEffect(() => {
    const apply = () => {
      const w = document.documentElement.clientWidth
      const gutter = w >= 640 ? GUTTER_SM : GUTTER_XS
      const content = Math.min(CONTAINER, w - gutter * 2)
      const left = (w - content) / 2
      document.documentElement.style.setProperty("--grid-x", `${Math.round(left) % CELL}px`)
    }
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [])
  return null
}
