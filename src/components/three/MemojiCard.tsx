import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { CanvasTexture, SRGBColorSpace, type Group } from 'three'
import { useTema } from '../../hooks/useTema'
import { PALETAS, type Paleta } from './paleta'

/** Proporção real do arquivo: 694 × 781. */
const WIDTH = 2.55
const HEIGHT = WIDTH * (781 / 694)

/**
 * Sombra suave gerada em código: um gradiente radial desenhado num canvas 2D e
 * usado como textura. Um PNG de sombra custaria mais um download; isto custa
 * alguns kilobytes de memória e nada de rede.
 */
function useShadowTexture(paleta: Paleta) {
  return useMemo(() => {
    const size = 128
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, paleta.sombra[0])
    gradient.addColorStop(0.5, paleta.sombra[1])
    gradient.addColorStop(1, paleta.sombra[2])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new CanvasTexture(canvas)
    texture.colorSpace = SRGBColorSpace
    return texture
  }, [paleta])
}

/**
 * O Memoji como textura num plano dentro da cena (PRD 5.2).
 *
 * `meshBasicMaterial` de propósito: o Memoji já vem com luz e sombra pintadas
 * pela Apple. Iluminar de novo com um material que reage à luz suja as cores e
 * deixa o rosto acinzentado.
 *
 * A inclinação leve (M-3) é aplicada aqui, não no grupo inteiro: o cartão
 * inclina um pouco mais que o cenário em volta, o que dá a sensação de que ele
 * está à frente.
 */
export function MemojiCard() {
  const group = useRef<Group>(null)
  const texture = useTexture('/images/memoji.png')
  const shadow = useShadowTexture(PALETAS[useTema()])

  texture.colorSpace = SRGBColorSpace

  useFrame((state, delta) => {
    if (!group.current) return

    // respiração lenta, para a cena nunca parecer congelada
    const t = state.clock.elapsedTime
    group.current.position.y = Math.sin(t * 0.55) * 0.045

    // inclinação própria, um pouco mais forte que a do rig
    const targetX = -state.pointer.y * 0.13
    const targetY = state.pointer.x * 0.17
    const k = 1 - Math.pow(0.0015, delta)
    group.current.rotation.x += (targetX - group.current.rotation.x) * k
    group.current.rotation.y += (targetY - group.current.rotation.y) * k
  })

  return (
    <group ref={group}>
      {/* sombra: atrás e abaixo, achatada */}
      <mesh position={[0, -HEIGHT * 0.46, -0.35]} rotation={[0, 0, 0]} scale={[1.55, 0.4, 1]}>
        <planeGeometry args={[WIDTH, WIDTH]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
      </mesh>

      {/* alphaTest + depthWrite: o Memoji passa a EXISTIR no buffer de
          profundidade só onde é opaco. É isso que faz o trecho da órbita que
          está atrás dele desaparecer de verdade, em vez de atravessar. */}
      <mesh rotation={[0, -0.06, 0]}>
        <planeGeometry args={[WIDTH, HEIGHT]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.35}
          depthWrite
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
