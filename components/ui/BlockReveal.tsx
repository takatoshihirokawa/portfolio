"use client"

import { motion } from "framer-motion"
import { useMotionTheme } from "@/lib/theme"
import Scramble from "@/components/ui/Scramble"

export default function BlockReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "span" | "p" | "h1" | "h2"
}) {
  const { speed, theme } = useMotionTheme()
  // On the dark side, plain-text headings decrypt from random glyphs as they wipe in.
  const content = theme === "dark" && typeof children === "string" ? <Scramble text={children} delay={delay + 0.2} /> : children
  const d = 0.9 * speed
  const ease = [0.76, 0, 0.24, 1] as const
  const MotionTag = motion[Tag]
  return (
    <span className={`relative inline-block align-top ${className ?? ""}`}>
      <MotionTag
        className="block"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{ duration: d * 0.5, ease, delay: delay + d * 0.5 }}
      >
        {content}
      </MotionTag>
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-[var(--accent)] pointer-events-none"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0 0 100%)"] }}
        viewport={{ once: true, margin: "-60px 0px" }}
        transition={{ duration: d, ease, times: [0, 0.5, 1], delay }}
      />
    </span>
  )
}
