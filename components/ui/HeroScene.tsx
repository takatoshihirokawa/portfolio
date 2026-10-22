"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "@/lib/theme"

function makeSheetTexture(line: string, edge: string, label: string, sub: string, ink: string) {
  const size = 512
  const c = document.createElement("canvas")
  c.width = c.height = size
  const ctx = c.getContext("2d")!
  ctx.clearRect(0, 0, size, size)
  ctx.strokeStyle = line
  ctx.lineWidth = 1
  const step = size / 16
  for (let i = 0; i <= 16; i++) {
    const p = Math.round(i * step) + 0.5
    ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, size); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(size, p); ctx.stroke()
  }
  ctx.strokeStyle = edge
  ctx.lineWidth = 3
  ctx.strokeRect(1.5, 1.5, size - 3, size - 3)
  ctx.fillStyle = ink
  ctx.font = "500 44px 'Noto Sans JP', system-ui, sans-serif"
  ctx.textBaseline = "top"
  ctx.fillText(label, 36, 36)
  ctx.font = "400 18px Inter, system-ui, sans-serif"
  ctx.letterSpacing = "4px"
  ctx.fillText(sub, 38, 92)
  ctx.beginPath(); ctx.moveTo(36, 128); ctx.lineTo(36 + 48, 128); ctx.lineWidth = 2; ctx.strokeStyle = edge; ctx.stroke()
  const t = new THREE.CanvasTexture(c)
  t.anisotropy = 4
  return t
}

const SHEETS = [
  { pos: [-2.1, 1.0, -3.0], rot: [0.08, 0.35, -0.06], scale: 1.7, accent: false, label: "相談", sub: "LISTEN" },
  { pos: [2.3, -0.4, -2.6], rot: [-0.1, -0.4, 0.05], scale: 1.8, accent: true, label: "企画", sub: "PLAN" },
  { pos: [-0.8, -1.9, -2.2], rot: [0.25, 0.15, 0.08], scale: 1.3, accent: false, label: "制作", sub: "MAKE" },
  { pos: [1.5, 1.7, -3.8], rot: [-0.2, -0.2, -0.12], scale: 1.5, accent: false, label: "導入", sub: "RUN" },
  { pos: [-2.8, -0.9, -4.2], rot: [0.12, 0.5, 0.1], scale: 1.6, accent: true, label: "改善", sub: "IMPROVE" },
] as const

function Sheets({ line, edge, accent, ink }: { line: string; edge: string; accent: string; ink: string }) {
  const group = useRef<THREE.Group>(null)
  const refs = useRef<(THREE.Mesh | null)[]>([])
  const fan = useRef(0)
  const { pointer } = useThree()
  const textures = useMemo(
    () => SHEETS.map((s) => makeSheetTexture(line, s.accent ? accent : edge, s.label, s.sub, ink)),
    [line, edge, accent, ink]
  )
  useEffect(() => () => { textures.forEach((t) => t.dispose()) }, [textures])

  useEffect(() => {
    const onFlip = () => { fan.current = 1 }
    window.addEventListener("theme:flip", onFlip)
    return () => window.removeEventListener("theme:flip", onFlip)
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    fan.current = THREE.MathUtils.damp(fan.current, 0, 1.6, delta)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.22, 2.5, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.16, 2.5, delta)
    refs.current.forEach((m, i) => {
      if (!m) return
      const s = SHEETS[i]
      const f = fan.current
      m.position.set(
        s.pos[0] * (1 + f * 0.9) + Math.sin(t * 0.35 + i * 1.7) * 0.08,
        s.pos[1] * (1 + f * 0.9) + Math.cos(t * 0.3 + i * 2.1) * 0.08,
        s.pos[2] + Math.sin(t * 0.25 + i) * 0.1
      )
      m.rotation.set(s.rot[0] + Math.sin(t * 0.2 + i) * 0.03, s.rot[1] + f * (i % 2 ? 1 : -1) * 1.2, s.rot[2] + f * 0.6)
    })
  })

  return (
    <group ref={group}>
      {SHEETS.map((s, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el }} scale={s.scale}>
          <planeGeometry args={[1, 1.3]} />
          <meshBasicMaterial map={textures[i]} transparent opacity={0.9} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  const theme = useTheme()
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setEnabled(fine && !reduce && window.innerWidth >= 768)
  }, [])
  if (!enabled) return null
  const light = theme === "light"
  const line = light ? "rgba(12,12,12,0.07)" : "rgba(240,240,240,0.06)"
  const edge = light ? "rgba(12,12,12,0.12)" : "rgba(240,240,240,0.12)"
  const accent = light ? "rgba(43,43,255,0.35)" : "rgba(232,255,71,0.32)"
  const ink = light ? "rgba(12,12,12,0.28)" : "rgba(240,240,240,0.26)"
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <Sheets line={line} edge={edge} accent={accent} ink={ink} />
      </Canvas>
    </div>
  )
}
