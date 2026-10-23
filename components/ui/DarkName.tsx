"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const LINES = [
  { text: "TAKATOSHI", outline: true },
  { text: "HIROKAWA", outline: false },
]

// The dark side's name: huge letters that scatter away from the pointer (and drift on touch screens).
export default function DarkName() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"))
    const touch = window.matchMedia("(pointer: coarse)").matches
    let px = -9999, py = -9999, raf = 0
    const cur = letters.map(() => ({ x: 0, y: 0, r: 0 }))

    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY }
    if (!touch) window.addEventListener("pointermove", onMove)

    const tick = (t: number) => {
      letters.forEach((l, i) => {
        let tx = 0, ty = 0, tr = 0
        if (touch) {
          ty = Math.sin(t / 700 + i * 0.7) * 6
          tr = Math.sin(t / 900 + i) * 3
        } else {
          const b = l.getBoundingClientRect()
          const dx = b.left + b.width / 2 - px
          const dy = b.top + b.height / 2 - py
          const d = Math.hypot(dx, dy)
          const reach = 220
          if (d < reach) {
            const f = (1 - d / reach) ** 2
            tx = (dx / (d || 1)) * f * 70
            ty = (dy / (d || 1)) * f * 70
            tr = (dx > 0 ? 1 : -1) * f * 25
          }
        }
        const c = cur[i]
        c.x += (tx - c.x) * 0.15
        c.y += (ty - c.y) * 0.15
        c.r += (tr - c.r) * 0.15
        l.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px) rotate(${c.r.toFixed(1)}deg)`
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
        <p key={line.text} aria-hidden className="font-display font-bold uppercase text-[clamp(2.2rem,12vw,12.5rem)] tracking-[-0.03em] whitespace-nowrap">
          {line.text.split("").map((ch) => {
            const i = n++
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: "-120%", rotate: (i % 2 ? 1 : -1) * 40, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.045, type: "spring", stiffness: 260, damping: 14 }}
              >
                <span
                  data-l
                  className="inline-block will-change-transform"
                  style={
                    line.outline
                      ? { color: "transparent", WebkitTextStroke: "1.5px var(--fg)" }
                      : { color: "var(--accent)", textShadow: "0 0 32px color-mix(in srgb, var(--accent) 45%, transparent)" }
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
