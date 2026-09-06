import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, CanvasTexture, SRGBColorSpace, type Mesh, type Points } from 'three'
import { useTema } from '../../hooks/useTema'
import { PALETAS, type Paleta } from './paleta'

/**
 * M-5 do PRD 5.2.1 — o que orbita o Memoji.
 *
 * O truque que tira a cara de "PNG colado": os anéis ficam **centrados em
 * z = 0 e inclinados**, então metade da órbita passa na frente do Memoji e
 * metade atrás. O Memoji escreve profundidade (`alphaTest` no material), então
 * o navegador esconde de verdade o trecho que está atrás dele.
 *
 * Oclusão é a pista de profundidade mais forte que existe. Sombra e escala
 * ajudam; oclusão convence.
 */

function OrbitRing({
  radius,
  thickness,
  color,
  opacity,
  tilt,
  spin,
}: {
  radius: number
  thickness: number
  color: string
  opacity: number
  tilt: [number, number, number]
  spin: number
}) {
  const ref = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * spin
  })

  return (
    // o grupo externo dá a inclinação; o mesh interno gira no próprio eixo,
    // então a órbita mantém o ângulo e só a partícula "anda" nela
    <group rotation={tilt} position={[0, -0.45, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 10, 160]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
    </group>
  )
}

/** Um ponto de luz correndo na órbita — dá direção ao movimento. */
function OrbitSpark({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number
  tilt: [number, number, number]
  speed: number
  color: string
}) {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
  })

  return (
    <group rotation={tilt} position={[0, -0.45, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

/**
 * Halo por trás do Memoji: um gradiente radial desenhado num canvas 2D.
 * É o que faz o recorte parar de flutuar sobre o branco — ele passa a estar
 * sobre alguma coisa.
 */
function Halo({ paleta }: { paleta: Paleta }) {
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    g.addColorStop(0, paleta.halo[0])
    g.addColorStop(0.45, paleta.halo[1])
    g.addColorStop(1, paleta.halo[2])
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const t = new CanvasTexture(canvas)
    t.colorSpace = SRGBColorSpace
    return t
    // a textura é redesenhada quando o tema muda; sem `paleta` nas dependências
    // o halo ficaria com a cor do tema em que a cena montou
  }, [paleta])

  return (
    <mesh position={[0, 0.1, -1.2]}>
      <planeGeometry args={[5.4, 5.4]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

function Dust({ paleta, count = 380, radius = 3.2 }: { paleta: Paleta; count?: number; radius?: number }) {
  const ref = useRef<Points>(null)

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.65 + Math.random() * 0.35)
      array[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8
      array[i * 3 + 2] = r * Math.cos(phi) * 0.7
    }
    return array
  }, [count, radius])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.04
    ref.current.rotation.x += delta * 0.012
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={paleta.poeira}
        transparent
        opacity={paleta.poeiraOpacidade}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}

export function Backdrop() {
  const paleta = PALETAS[useTema()]

  return (
    <>
      <Halo paleta={paleta} />

      {/* órbita larga, quase deitada — cruza o Memoji na altura do peito */}
      <OrbitRing
        radius={2.05}
        thickness={0.011}
        color={paleta.anelLargo}
        opacity={paleta.anelLargoOpacidade}
        tilt={[Math.PI * 0.42, 0.18, 0]}
        spin={0.09}
      />
      <OrbitSpark
        radius={2.05}
        tilt={[Math.PI * 0.42, 0.18, 0]}
        speed={0.32}
        color={paleta.anelLargo}
      />

      {/* órbita menor, mais inclinada, girando ao contrário */}
      <OrbitRing
        radius={1.62}
        thickness={0.008}
        color={paleta.anelPequeno}
        opacity={paleta.anelPequenoOpacidade}
        tilt={[Math.PI * 0.56, -0.32, 0.1]}
        spin={-0.14}
      />

      <Dust paleta={paleta} />
    </>
  )
}
