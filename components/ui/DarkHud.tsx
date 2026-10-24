"use client"

import { useEffect, useRef } from "react"

const SECTIONS: [string, string][] = [
  ["top-home", "00 / INDEX"],
  ["problems", "01 / PROBLEMS"],
  ["process", "02 / PROCESS"],
  ["about", "03 / ABOUT"],
  ["works", "04 / WORKS"],
  ["lab", "05 / LAB"],
  ["contact", "06 / CONTACT"],
]

const jst = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })

// Dark side only: a corner readout (section, scroll, pointer, local time) and crosshair hairlines on the pointer.
// Values are written straight to the DOM every frame, so nothing re-renders.
export default function DarkHud() {
  const sec = useRef<HTMLSpanElement>(null)
  const pct = useRef<HTMLSpanElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const mbar = useRef<HTMLSpanElement>(null)
  const xy = useRef<HTMLSpanElement>(null)
  const clock = useRef<HTMLSpanElement>(null)
  const h = useRef<HTMLDivElement>(null)
  const v = useRef<HTMLDivElement>(null)
  const tag = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let px = -100, py = -100, cx = -100, cy = -100, raf = 0, last = ""
    const fine = window.matchMedia("(pointer: fine)").matches
    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY }
    if (fine) window.addEventListener("pointermove", onMove)

    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, "0")
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
      if (mbar.current) mbar.current.style.transform = `scaleX(${p})`

      const mid = window.innerHeight * 0.4
      let label = SECTIONS[0][1]
      for (const [id, name] of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= mid) label = name
      }
      if (label !== last && sec.current) { sec.current.textContent = label; last = label }

      if (clock.current) clock.current.textContent = jst.format(new Date())

      if (fine && px >= 0) {
        cx += (px - cx) * 0.35
        cy += (py - cy) * 0.35
        if (h.current) h.current.style.transform = `translateY(${cy}px)`
        if (v.current) v.current.style.transform = `translateX(${cx}px)`
        if (tag.current) tag.current.style.transform = `translate(${cx + 14}px, ${cy + 12}px)`
        const text = `X ${String(Math.round(px)).padStart(4, "0")}  Y ${String(Math.round(py + window.scrollY)).padStart(5, "0")}`
        if (xy.current) xy.current.textContent = text
        if (tag.current) tag.current.textContent = `${Math.round(px)}, ${Math.round(py + window.scrollY)}`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove) }
  }, [])

  return (
    <div aria-hidden className="dark-hud pointer-events-none fixed inset-0 z-[61] font-display text-[10px] tracking-[0.2em] text-[var(--accent)]">
      {/* Crosshair (mouse only) */}
      <div ref={h} className="hud-line absolute left-0 right-0 top-0 h-px max-[1023px]:hidden" />
      <div ref={v} className="hud-line absolute top-0 bottom-0 left-0 w-px max-[1023px]:hidden" />
      <span ref={tag} className="absolute left-0 top-0 opacity-60 tabular-nums max-[1023px]:hidden" />

      {/* Phones: just a progress line under the header, so nothing covers the content */}
      <span ref={mbar} className="sm:hidden absolute left-0 right-0 top-[calc(env(safe-area-inset-top)+64px)] h-px bg-[var(--accent)] origin-left" style={{ transform: "scaleX(0)" }} />

      {/* Corner readout (PC and tablets) */}
      <div className="max-sm:hidden absolute right-6 bottom-28 flex flex-col items-end gap-1.5 tabular-nums">
        <span ref={sec} className="text-[var(--fg)] opacity-80" />
        <span className="flex items-center gap-2">
          <span className="relative block w-20 h-px bg-[color-mix(in_srgb,var(--accent)_25%,transparent)] overflow-hidden">
            <span ref={bar} className="absolute inset-0 bg-[var(--accent)] origin-left" style={{ transform: "scaleX(0)" }} />
          </span>
          <span ref={pct} />%
        </span>
        <span ref={xy} className="opacity-60 max-[1023px]:hidden" />
        <span className="opacity-60">35.51N 138.75E · JST <span ref={clock} /></span>
      </div>
    </div>
  )
}
