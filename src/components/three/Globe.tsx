import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import {
  AdditiveBlending,
  BackSide,
  SRGBColorSpace,
  Vector3,
  type Group,
  type Mesh,
} from 'three'

const PRIMARY = '#8c62ac'
const PRIMARY_DEEP = '#6e11b0'

const RADIUS = 1.6

/** Dublin — as coordenadas que aparecem escritas na seção. */
const DUBLIN = { lat: 53.3498, lon: -6.2603 }

/**
 * Latitude/longitude → ponto na esfera.
 *
 * A convenção precisa casar exatamente com a de `SphereGeometry` do three,
 * senão o marcador cai no oceano. Esta é a que corresponde a uma textura
 * equirectangular padrão (0° de longitude no centro do arquivo).
 */
function latLonToVector3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)
  return new Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

/** Marcador pulsando sobre Dublin. */
function Marker({ position }: { position: Vector3 }) {
  const ring = useRef<Mesh>(null)

  useFrame((state) => {
    if (!ring.current) return
    // pulso de 2 s: cresce e some, como um sinal de radar
    const t = (state.clock.elapsedTime % 2) / 2
    const s = 1 + t * 2.2
    ring.current.scale.setScalar(s)
    const material = ring.current.material as { opacity: number }
    material.opacity = (1 - t) * 0.55
  })

  // o marcador precisa ficar "de pé" na superfície: olhando para fora do centro
  const lookAt = position.clone().multiplyScalar(2)

  return (
    <group position={position} onUpdate={(self) => self.lookAt(lookAt)}>
      <mesh>
        <circleGeometry args={[0.024, 24]} />
        <meshBasicMaterial color={PRIMARY_DEEP} toneMapped={false} />
      </mesh>
      <mesh ref={ring} position={[0, 0, 0.001]}>
        <ringGeometry args={[0.032, 0.042, 32]} />
        <meshBasicMaterial color={PRIMARY_DEEP} transparent opacity={0.5} toneMapped={false} />
      </mesh>
    </group>
  )
}

type Props = {
  /** Progresso de 0 a 1 da seção na viewport — comanda o giro e a aproximação. */
  progress: RefObject<number>
}

/**
 * O globo. Três camadas, nesta ordem de dentro para fora:
 *
 *  1. uma esfera sólida quase branca, que faz o papel de "oceano" e impede que
 *     os pontos do outro lado da bola vazem através dela;
 *  2. a malha de continentes, como textura pontilhada com fundo transparente;
 *  3. uma casca maior renderizada pelo lado de dentro (`BackSide`), que produz
 *     o brilho de atmosfera na borda.
 *
 * A textura tem 11 KB: os continentes foram rasterizados a partir dos contornos
 * do Natural Earth (domínio público) já na cor da marca, em vez de usar uma
 * fotografia da Terra de 1 a 2 MB. Além de leve, combina com a paleta — uma
 * foto de satélite brigaria com o roxo.
 */
export function Globe({ progress }: Props) {
  const group = useRef<Group>(null)
  const texture = useTexture('/images/world-dots.png')
  texture.colorSpace = SRGBColorSpace

  const dublin = useMemo(() => latLonToVector3(DUBLIN.lat, DUBLIN.lon, RADIUS * 1.005), [])

  /**
   * Rotação que traz Dublin para a frente da câmera.
   * Em Y: o quanto girar para o ponto cruzar o eixo +Z.
   * Em X: o quanto inclinar para ele subir até a linha do olhar.
   */
  const target = useMemo(
    () => ({
      y: -Math.atan2(dublin.x, dublin.z),
      x: Math.asin(dublin.y / (RADIUS * 1.005)),
    }),
    [dublin],
  )

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return

    // p vai de 0 (seção entrando) a 1 (seção saindo); o interessante acontece
    // no meio, então remapeio 0.15–0.75 para 0–1
    const raw = progress.current ?? 0
    const p = Math.min(1, Math.max(0, (raw - 0.15) / 0.6))
    const eased = p * p * (3 - 2 * p) // smoothstep

    // giro contínuo lento antes da aproximação, que vai cedendo lugar ao alvo
    const idle = -_.clock.elapsedTime * 0.06
    const wantY = idle * (1 - eased) + target.y * eased
    const wantX = target.x * eased
    const wantScale = 1 + eased * 0.42

    const k = 1 - Math.pow(0.002, delta)
    g.rotation.y += (wantY - g.rotation.y) * k
    g.rotation.x += (wantX - g.rotation.x) * k
    g.scale.setScalar(g.scale.x + (wantScale - g.scale.x) * k)
  })

  return (
    <group ref={group}>
      {/* 1 — corpo opaco */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.995, 48, 48]} />
        <meshBasicMaterial color="#fbfafd" />
      </mesh>

      {/* 2 — continentes */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      <Marker position={dublin} />

      {/* 3 — atmosfera */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.14, 48, 48]} />
        <meshBasicMaterial
          color={PRIMARY}
          transparent
          opacity={0.11}
          side={BackSide}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
