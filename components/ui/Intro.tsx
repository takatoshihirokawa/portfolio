"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AvatarIllust from "@/components/ui/AvatarIllust"

type IntroState = { ready: boolean; replay: number }
const IntroContext = createContext<IntroState>({ ready: true, replay: 0 })
export const useIntro = () => useContext(IntroContext)

const EASE = [0.76, 0, 0.24, 1] as const

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "done">("loading")
  const [replay, setReplay] = useState(0)
  const [progress, setProgress] = useState(0)
  const durationRef = useRef(1400)

  const run = (duration: number) => {
    durationRef.current = duration
    setProgress(0)
    setPhase("loading")
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - t0) / duration, 1)
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) requestAnimationFrame(tick)
      else window.setTimeout(() => setPhase("done"), 160)
    }
    requestAnimationFrame(tick)
  }

  useEffect(() => {
    run(1400)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onFlip = () => { setReplay((n) => n + 1); run(1000) }
    window.addEventListener("theme:flip", onFlip)
    return () => window.removeEventListener("theme:flip", onFlip)
  }, [])

  useEffect(() => {
    document.body.style.overflow = phase === "loading" ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [phase])

  return (
    <IntroContext.Provider value={{ ready: phase === "done", replay }}>
      {children}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key={`intro-${replay}`}
            className="fixed inset-0 z-[80] bg-[var(--bg)] text-[var(--fg)] flex flex-col"
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.85, ease: EASE } }}
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              <motion.div
                className="w-24 h-24 rounded-full bg-[var(--fg)] text-[var(--bg)] overflow-hidden flex items-end justify-center"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="w-[112%] translate-y-[10%]"
                  animate={{ x: [0, 3, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AvatarIllust compact className="w-full" />
                </motion.div>
              </motion.div>
              <div className="w-40 h-px bg-[var(--border)] overflow-hidden">
                <div className="h-full bg-[var(--accent)]" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="px-6 sm:px-12 pb-8 flex items-end justify-between">
              <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[var(--muted-fg)]">Takatoshi Hirokawa</span>
              <span className="font-display text-5xl sm:text-6xl font-light tabular-nums leading-none">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </IntroContext.Provider>
  )
}
