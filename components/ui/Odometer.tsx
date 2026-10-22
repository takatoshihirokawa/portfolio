"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

function Digit({ value, delay }: { value: number; delay: number }) {
  return (
    <span className="inline-block overflow-hidden h-[1em] leading-none align-top">
      <motion.span
        className="block"
        initial={{ y: 0 }}
        animate={{ y: `-${value}em` }}
        transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1.1, delay }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="block h-[1em] leading-none">{i}</span>
        ))}
      </motion.span>
    </span>
  )
}

export default function Odometer({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [go, setGo] = useState(false)
  useEffect(() => { if (inView) setGo(true) }, [inView])
  const digits = String(value).split("").map(Number)
  return (
    <span ref={ref} className={`inline-flex items-start tabular-nums ${className ?? ""}`} aria-label={`${value}${suffix}`}>
      {digits.map((d, i) => (
        <Digit key={i} value={go ? d : 0} delay={i * 0.12} />
      ))}
      <span className="leading-none">{suffix}</span>
    </span>
  )
}
