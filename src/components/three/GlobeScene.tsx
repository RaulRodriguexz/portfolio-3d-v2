import { Suspense, type RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { Globe } from './Globe'

/**
 * Cena do globo. Segunda cena WebGL do site (decisão D-19 do PRD) — o que a
 * torna aceitável é que ela reaproveita o chunk do Three.js já baixado pelo
 * hero, então o custo marginal é a textura de 11 KB e mais nada.
 */
export default function GlobeScene({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 9.4], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Globe progress={progress} />
      </Suspense>
    </Canvas>
  )
}
