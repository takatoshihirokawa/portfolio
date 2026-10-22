"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"

const LABELS: Record<string, string> = { view: "VIEW", open: "OPEN", spin: "SPIN", link: "" }

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [mode, setMode] = useState<string | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const dotX = useSpring(mouseX, { stiffness: 300, damping: 28 })
  const dotY = useSpring(mouseY, { stiffness: 300, damping: 28 })
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setIsTouch(true); return }
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setVisible(true)
    }
    const handleOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor], a, button") as HTMLElement | null
      if (!t) { setMode(null); return }
      const explicit = t.getAttribute("data-cursor") ?? t.closest("[data-cursor]")?.getAttribute("data-cursor")
      if (explicit) setMode(explicit)
      else if (t.tagName === "A" && (t as HTMLAnchorElement).target === "_blank") setMode("open")
      else setMode("link")
    }
    const handleLeave = () => setVisible(false)
    window.addEventListener("mousemove", handleMove)
    document.addEventListener("mouseover", handleOver)
    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.removeEventListener("mouseover", handleOver)
      document.documentElement.removeEventListener("mouseleave", handleLeave)
    }
  }, [mouseX, mouseY])

  if (isTouch) return null
  const label = mode ? LABELS[mode] ?? "" : ""
  const big = Boolean(label)

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full bg-[var(--accent)]"
          animate={{ width: big ? 0 : mode === "link" ? 6 : 12, height: big ? 0 : mode === "link" ? 6 : 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="rounded-full border border-[var(--accent)] flex items-center justify-center overflow-hidden"
          animate={{
            width: big ? 72 : mode === "link" ? 48 : 40,
            height: big ? 72 : mode === "link" ? 48 : 40,
            backgroundColor: big ? "color-mix(in srgb, var(--accent) 92%, transparent)" : "rgba(0,0,0,0)",
            opacity: big ? 1 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <AnimatePresence mode="wait">
            {label && (
              <motion.span
                key={label}
                className="font-display text-[10px] tracking-[0.3em] text-[var(--bg)]"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}
