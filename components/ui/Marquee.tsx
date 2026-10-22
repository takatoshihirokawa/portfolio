"use client"

import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { useTheme } from "@/lib/theme"

const ITEMS = [
  "ホームページ",
  "販促・広告",
  "写真・映像",
  "採用ページ",
  "受付の仕組み化",
  "業務改善",
  "AI活用",
  "Webアプリ",
  "公式LINE",
  "何から頼めばよいか決まっていなくても",
]

export default function Marquee() {
  const theme = useTheme()
  const baseVelocity = theme === "light" ? -28 : -36
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-1500, 0, 1500], [-4, 1, 6], { clamp: true })
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    const speed = baseVelocity * Math.abs(f) * dir.current
    let next = x.get() + (speed * delta) / 1000
    const third = (trackRef.current?.scrollWidth ?? 0) / 3
    if (third > 0) {
      if (next <= -third) next += third
      if (next > 0) next -= third
    }
    x.set(next)
  })

  const repeated = [...ITEMS, ...ITEMS, ...ITEMS]
  return (
    <div className="relative border-y border-[var(--border)] overflow-hidden py-6 select-none">
      <motion.div ref={trackRef} style={{ x }} className="flex gap-8 sm:gap-14 w-max will-change-transform">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-8 sm:gap-14 text-xs sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-[var(--muted-fg)] whitespace-nowrap">
            {item}
            <span className="text-[var(--accent)] text-base leading-none">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
