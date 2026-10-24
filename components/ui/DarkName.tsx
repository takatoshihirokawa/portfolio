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
    if (window.matchMedia("(pointer: coarse)").matches) return
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"))
    const cur = letters.map(() => ({ x: 0, y: 0 }))
    // Letter centres relative to the name block, measured once (and on resize) instead of every frame.
    let centres: { x: number; y: number }[] = []
    let px = -9999, py = -9999, raf = 0, visible = true, ready = false

    const measure = () => {
      const base = el.getBoundingClientRect()
      centres = letters.map((l, i) => {
        const b = l.getBoundingClientRect()
        return { x: b.left + b.width / 2 - cur[i].x - base.left, y: b.top + b.height / 2 - cur[i].y - base.top }
      })
    }
    // Wait for the entrance animation to finish before measuring.
    const t = window.setTimeout(() => { measure(); ready = true; start() }, 1700)

    const tick = () => {
      raf = 0
      if (!ready || !visible) return
      const base = el.getBoundingClientRect()
      let moving = false
      letters.forEach((l, i) => {
        let tx = 0, ty = 0
        const dx = base.left + centres[i].x - px
        const dy = base.top + centres[i].y - py
        const d = Math.hypot(dx, dy)
        const reach = 200
        if (d < reach) {
          const f = (1 - d / reach) ** 2
          tx = (dx / (d || 1)) * f * 16
          ty = (dy / (d || 1)) * f * 16
        }
        const c = cur[i]
        c.x += (tx - c.x) * 0.08
        c.y += (ty - c.y) * 0.08
        if (Math.abs(tx - c.x) > 0.05 || Math.abs(ty - c.y) > 0.05) moving = true
        l.style.transform = `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px)`
      })
      // Keep animating only while letters are still easing toward where they should be.
      if (moving) start()
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(tick) }

    const onMove = (e: PointerEvent) => { px = e.clientX; py = e.clientY; start() }
    const onResize = () => { if (ready) measure() }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start() })
    io.observe(el)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("resize", onResize)
    return () => {
      window.clearTimeout(t)
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("resize", onResize)
    }
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
