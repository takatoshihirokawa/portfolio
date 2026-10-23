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
  if (theme === "dark") {
    // The hidden side: two warning-tape bands crossing each other.
    return (
      <div className="relative h-56 sm:h-72 overflow-hidden select-none">
        <Tape className="absolute left-[-10%] right-[-10%] top-1/2 -translate-y-1/2 rotate-[-6deg] bg-[var(--accent)] text-[var(--bg)]" velocity={-70} />
        <Tape className="absolute left-[-10%] right-[-10%] top-1/2 -translate-y-1/2 rotate-[5deg] border-y border-[var(--accent)] bg-[var(--bg)] text-[var(--accent)]" velocity={55} />
      </div>
    )
  }
  return <Tape className="relative border-y border-[var(--border)] py-6" velocity={-28} light />
}

function Tape({ className, velocity: baseVelocity, light = false }: { className: string; velocity: number; light?: boolean }) {
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
    <div className={`overflow-hidden ${className}`}>
      <motion.div ref={trackRef} style={{ x }} className={`flex w-max will-change-transform ${light ? "gap-8 sm:gap-14" : "gap-6 py-3"}`}>
        {repeated.map((item, i) =>
          light ? (
            <span key={i} className="flex items-center gap-8 sm:gap-14 text-xs sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-[var(--muted-fg)] whitespace-nowrap">
              {item}
              <span className="text-[var(--accent)] text-base leading-none">·</span>
            </span>
          ) : (
            <span key={i} className="flex items-center gap-6 text-2xl sm:text-4xl font-bold tracking-tight whitespace-nowrap">
              {item}
              <span className="text-xl leading-none">✕</span>
            </span>
          )
        )}
      </motion.div>
    </div>
  )
}
