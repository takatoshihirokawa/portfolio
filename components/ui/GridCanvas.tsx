"use client"

import { useEffect, useRef } from "react"
import { LAKE } from "@/lib/kawaguchiko"

const CELL = 24
type Ripple = { x: number; y: number; t0: number; amp: number; speed: number; life: number }

export default function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduce) return
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    document.documentElement.classList.add("grid-canvas")

    let w = 0, h = 0, dpr = 1, originX = 0
    const ripples: Ripple[] = []
    let raf = 0
    let last = { x: -999, y: -999 }
    let idleFrames = 0

    const color = () => {
      const light = document.documentElement.dataset.theme !== "dark"
      return light ? "rgba(12,12,12,0.05)" : "rgba(240,240,240,0.045)"
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      originX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--grid-x")) || 0
      draw(performance.now())
    }

    let poly: [number, number][] | null = null
    const updateLake = () => {
      const el = document.getElementById("lake-outline")
      if (!el) { poly = null; return }
      const r = el.getBoundingClientRect()
      poly = LAKE.points.map(([px, py]) => [r.left + px * r.width, r.top + py * r.height])
    }
    const inside = (x: number, y: number) => {
      if (!poly) return false
      let hit = false
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
      }
      return hit
    }

    const displace = (x: number, y: number, now: number) => {
      let dx = 0, dy = 0
      for (const r of ripples) {
        const age = (now - r.t0) / 1000
        const radius = age * r.speed
        const ddx = x - r.x, ddy = y - r.y
        const d = Math.hypot(ddx, ddy)
        const band = d - radius
        if (Math.abs(band) > 90) continue
        const env = Math.exp(-(band * band) / 1800) * Math.max(0, 1 - age / r.life)
        const s = Math.sin(band * 0.09) * r.amp * env
        if (d > 0.001) { dx += (ddx / d) * s; dy += (ddy / d) * s }
      }
      if ((dx !== 0 || dy !== 0) && !inside(x, y)) return [0, 0]
      return [dx, dy]
    }

    const draw = (now: number) => {
      updateLake()
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = color()
      ctx.lineWidth = 1
      const active = ripples.length > 0
      const step = 6
      ctx.beginPath()
      for (let x = originX % CELL; x <= w; x += CELL) {
        if (!active) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); continue }
        for (let y = 0; y <= h + step; y += step) {
          const [dx, dy] = displace(x, y, now)
          if (y === 0) ctx.moveTo(x + 0.5 + dx, y + dy); else ctx.lineTo(x + 0.5 + dx, y + dy)
        }
      }
      for (let y = 0; y <= h; y += CELL) {
        if (!active) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); continue }
        for (let x = 0; x <= w + step; x += step) {
          const [dx, dy] = displace(x, y, now)
          if (x === 0) ctx.moveTo(x + dx, y + 0.5 + dy); else ctx.lineTo(x + dx, y + 0.5 + dy)
        }
      }
      ctx.stroke()
    }

    const loop = (now: number) => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        if ((now - ripples[i].t0) / 1000 > ripples[i].life) ripples.splice(i, 1)
      }
      draw(now)
      if (ripples.length > 0 || idleFrames++ < 2) raf = requestAnimationFrame(loop)
      else raf = 0
    }
    const wake = () => { idleFrames = 0; if (!raf) raf = requestAnimationFrame(loop) }

    const onMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y)
      if (dist < 55) return
      last = { x: e.clientX, y: e.clientY }
      updateLake()
      if (!inside(e.clientX, e.clientY)) return
      if (ripples.length > 8) ripples.shift()
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now(), amp: 3.6, speed: 240, life: 1.5 })
      wake()
    }
    const onDown = (e: MouseEvent) => {
      updateLake()
      if (!inside(e.clientX, e.clientY)) return
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now(), amp: 7, speed: 320, life: 2.2 })
      wake()
    }
    const mo = new MutationObserver(() => draw(performance.now()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "style"] })

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mousedown", onDown)
    return () => {
      cancelAnimationFrame(raf)
      mo.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      document.documentElement.classList.remove("grid-canvas")
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />
}
