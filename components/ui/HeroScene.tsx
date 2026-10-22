"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useTheme } from "@/lib/theme"

function Wire({ accent, fg }: { accent: string; fg: string }) {
  const group = useRef<THREE.Group>(null)
  const spin = useRef(0)
  const { pointer } = useThree()

  const { geo, inner } = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(1.35, 1)
    const pos = base.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i)
      const n = 1 + 0.06 * Math.sin(v.x * 3.1) * Math.cos(v.y * 2.7) * Math.sin(v.z * 2.3)
      v.multiplyScalar(n)
      pos.setXYZ(i, v.x, v.y, v.z)
    }
    base.computeVertexNormals()
    return { geo: new THREE.WireframeGeometry(base), inner: new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.8, 1)) }
  }, [])

  useEffect(() => {
    const onFlip = () => { spin.current = 14 }
    window.addEventListener("theme:flip", onFlip)
    return () => window.removeEventListener("theme:flip", onFlip)
  }, [])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    spin.current = THREE.MathUtils.damp(spin.current, 0, 2.2, delta)
    g.rotation.y += delta * (0.08 + spin.current)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, pointer.y * 0.35 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08, 2, delta)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, -pointer.x * 0.25, 2, delta)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geo}>
        <lineBasicMaterial color={accent} transparent opacity={0.16} />
      </lineSegments>
      <lineSegments geometry={inner} rotation={[0.6, 0.2, 0]}>
        <lineBasicMaterial color={fg} transparent opacity={0.08} />
      </lineSegments>
      <points geometry={geo}>
        <pointsMaterial color={accent} size={0.03} transparent opacity={0.45} sizeAttenuation />
      </points>
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
  const accent = theme === "light" ? "#2b2bff" : "#e8ff47"
  const fg = theme === "light" ? "#0c0c0c" : "#f0f0f0"
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <Wire accent={accent} fg={fg} />
      </Canvas>
    </div>
  )
}
