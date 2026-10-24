"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const GLYPHS = "01アイウエオカキクケコサシスセソ#%/<>[]=+*ABCDEFGHJKLMNPQRSTVXYZ"

// Text that "decrypts": random glyphs settle into the real characters, left to right.
export default function Scramble({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px 0px" })
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now() + delay * 1000
    const dur = 650 + text.length * 45
    const tick = (now: number) => {
      const t = Math.max(0, now - start) / dur
      const solved = Math.floor(t * text.length)
      setOut(
        text
          .split("")
          .map((ch, i) => (ch === " " || i < solved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join("")
      )
      if (t < 1) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, text, delay])

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  )
}
