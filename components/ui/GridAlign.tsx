"use client"

import { useEffect, useRef } from "react"

const CELL = 24

export default function GridAlign() {
  const probe = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const apply = () => {
      const el = probe.current
      if (!el) return
      const left = el.getBoundingClientRect().left
      document.documentElement.style.setProperty("--grid-x", `${(((left % CELL) + CELL) % CELL).toFixed(2)}px`)
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [])
  // Same container and gutters as every section, so its content edge is the grid origin.
  return (
    <div aria-hidden className="pointer-events-none fixed top-0 left-0 right-0 h-0 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto h-0"><div ref={probe} className="h-0 w-0" /></div>
    </div>
  )
}
