"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const LINES = [
  { text: "TAKATOSHI", outline: true },
  { text: "HIROKAWA", outline: false },
]

// The dark side's name: huge, thin letters that lean slightly away from the pointer.
export default function DarkName() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"))
    const touch = window.matchMedia("(pointer: coarse)").matches
    let px = -9999, py = -9999, raf = 0
    const cur = letters.map(() => ({ x: 0, y: 0 }))

    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY }
    if (!touch) window.addEventListener("pointermove", onMove)

    const tick = () => {
      letters.forEach((l, i) => {
        let tx = 0, ty = 0
        if (!touch) {
          const b = l.getBoundingClientRect()
          const dx = b.left + b.width / 2 - px
          const dy = b.top + b.height / 2 - py
          const d = Math.hypot(dx, dy)
          const reach = 200
          if (d < reach) {
            const f = (1 - d / reach) ** 2
            tx = (dx / (d || 1)) * f * 16
            ty = (dy / (d || 1)) * f * 16
          }
        }
        const c = cur[i]
        c.x += (tx - c.x) * 0.08
        c.y += (ty - c.y) * 0.08
        l.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove) }
  }, [])

  let n = 0
  return (
    <div ref={root} className="relative z-10 flex flex-col items-center leading-[0.82] select-none" aria-label="Takatoshi Hirokawa">
      {LINES.map((line) => (
        <p key={line.text} aria-hidden className="overflow-hidden font-display font-light uppercase text-[clamp(2.2rem,12vw,12rem)] tracking-[-0.02em] whitespace-nowrap py-[0.04em]">
          {line.text.split("").map((ch) => {
            const i = n++
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.15 + i * 0.035, duration: 1.1, ease: [0.83, 0, 0.17, 1] }}
              >
                <span
                  data-l
                  className="inline-block will-change-transform"
                  style={
                    line.outline
                      ? { color: "transparent", WebkitTextStroke: "1px color-mix(in srgb, var(--fg) 70%, transparent)" }
                      : { color: "var(--accent)" }
                  }
                >
                  {ch}
                </span>
              </motion.span>
            )
          })}
        </p>
      ))}
    </div>
  )
}
