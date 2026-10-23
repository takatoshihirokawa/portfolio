"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/[]·"

export default function Decode({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px 0px" })
  // Non-breaking spaces keep the placeholder's size, so the in-view check can fire before any glyph shows.
  const [out, setOut] = useState(text.replace(/\S/g, "\u00a0"))

  useEffect(() => {
    if (!inView) return
    let frame = 0
    let raf = 0
    const total = text.length * 3 + 10
    const start = performance.now() + delay * 1000
    const tick = (now: number) => {
      if (now < start) { raf = requestAnimationFrame(tick); return }
      frame++
      const resolved = Math.floor((frame / total) * text.length * 1.2)
      setOut(
        text
          .split("")
          .map((ch, i) => (ch === " " ? " " : i < resolved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      )
      if (resolved < text.length) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, delay])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  )
}
