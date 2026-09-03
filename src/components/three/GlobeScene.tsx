import { Suspense, type Ref, type RefObject } from 'react'
import { Canvas } from '@react-three/fiber'
import { Globe } from './Globe'
import type { GlobeDragState } from '../../hooks/useGlobeDrag'

type Props = {
  progress: RefObject<number>
  drag: RefObject<GlobeDragState>
  /** Vai para o elemento <canvas>, onde o arrasto escuta os ponteiros. */
  canvasRef: Ref<HTMLCanvasElement>
}

/**
 * Cena do globo. Segunda cena WebGL do site (decisão D-19 do PRD) — o que a
 * torna aceitável é que ela reaproveita o chunk do Three.js já baixado pelo
 * hero, então o custo marginal é a textura de 11 KB e mais nada.
 *
 * `style` cai na div que embrulha o canvas, e `ref` no canvas em si. Por isso a
 * div continua sem receber ponteiro: quem volta a recebê-lo é só o canvas, e
 * isso é feito no `useGlobeDrag` (M-22).
 */
export default function GlobeScene({ progress, drag, canvasRef }: Props) {
  return (
    <Canvas
      ref={canvasRef}
      camera={{ position: [0, 0, 9.4], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Globe progress={progress} drag={drag} />
      </Suspense>
    </Canvas>
  )
}
