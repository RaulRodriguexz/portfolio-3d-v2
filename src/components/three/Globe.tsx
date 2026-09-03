import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { GlobeDragState } from '../../hooks/useGlobeDrag'
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

/** Inclinação vertical máxima: ±60°, para o globo nunca virar de cabeça para baixo. */
const MAX_TILT = Math.PI / 3
/** Tempo sem interação, em ms, até o globo voltar a apontar Dublin. */
const RETURN_DELAY = 3000
/** Abaixo disso o offset conta como zerado e o giro ocioso volta a correr. */
const IDLE_EPS = 0.0005

/** Velocidade do giro ocioso, em rad/s — uma volta a cada ~52 s (D-27). */
const IDLE_SPEED = 0.12
/** Oscilação com Dublin de frente: ±0,045 rad = ±2,6° (D-27). */
const SWAY_AMPLITUDE = 0.045
/** Frequência da oscilação, em rad/s — um ciclo a cada ~14 s (D-27). */
const SWAY_SPEED = 0.45

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
  /** Rotação somada pelo arrasto do usuário (M-22). Tem prioridade sobre o scroll. */
  drag: RefObject<GlobeDragState>
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
export function Globe({ progress, drag }: Props) {
  const group = useRef<Group>(null)
  /** Rotação que o scroll comanda, guardada à parte do que o arrasto soma. */
  const base = useRef({ x: 0, y: 0 })
  /** Relógio do giro ocioso. Congela enquanto o usuário tem o controle. */
  const spin = useRef(0)
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
    const d = drag.current

    // p vai de 0 (seção entrando) a 1 (seção saindo); o interessante acontece
    // no meio, então remapeio 0.15–0.75 para 0–1
    const raw = progress.current ?? 0
    const p = Math.min(1, Math.max(0, (raw - 0.15) / 0.6))
    const eased = p * p * (3 - 2 * p) // smoothstep

    // o usuário tem prioridade (D-24): enquanto ele manda, o giro ocioso
    // congela — senão o globo escorregaria por baixo do dedo
    const userActive =
      d.dragging || Math.abs(d.offset.x) > IDLE_EPS || Math.abs(d.offset.y) > IDLE_EPS
    if (!userActive) spin.current += delta

    // D-27 — o tipo de movimento muda com a proximidade, não só a intensidade.
    // Ao longe, giro contínuo; de perto, oscilação em torno de Dublin. Girar no
    // eixo Y e manter Dublin de frente são incompatíveis, e nenhum piso de
    // intensidade concilia os dois: 0,06 rad/s com 0,334 de força restante dava
    // 1,15°/s, uma volta a cada 5 min — abaixo do limiar de percepção.
    // Os dois regimes leem o mesmo `spin`, que congela sob controle do usuário,
    // então o arrasto (M-22) continua tendo prioridade sobre ambos.
    const spinning = -spin.current * IDLE_SPEED
    const swaying = target.y + Math.sin(spin.current * SWAY_SPEED) * SWAY_AMPLITUDE
    const wantY = spinning * (1 - eased) + swaying * eased
    const wantX = target.x * eased
    const wantScale = 1 + eased * 0.42

    const k = 1 - Math.pow(0.002, delta)
    base.current.y += (wantY - base.current.y) * k
    base.current.x += (wantX - base.current.x) * k
    g.scale.setScalar(g.scale.x + (wantScale - g.scale.x) * k)

    if (!d.dragging) {
      // inércia: continua girando e desacelera depois de soltar
      d.offset.y += d.velocity.y * delta
      d.offset.x += d.velocity.x * delta
      const friction = Math.pow(0.12, delta)
      d.velocity.y *= friction
      d.velocity.x *= friction

      // passados ~3 s sem interação o offset volta a zero. Zerar o offset é,
      // por construção, devolver o comando ao scroll e reapontar Dublin
      if (performance.now() - d.lastInteraction > RETURN_DELAY) {
        const back = 1 - Math.pow(0.15, delta)
        d.offset.y -= d.offset.y * back
        d.offset.x -= d.offset.x * back
        d.velocity.y = 0
        d.velocity.x = 0
      }
    }

    // o limite vale sobre o valor composto, não só sobre o offset; corrigir o
    // offset na parede evita que ele acumule um crédito invisível de rotação
    const composedX = base.current.x + d.offset.x
    const clampedX = Math.min(MAX_TILT, Math.max(-MAX_TILT, composedX))
    if (clampedX !== composedX) {
      d.offset.x = clampedX - base.current.x
      d.velocity.x = 0
    }

    g.rotation.y = base.current.y + d.offset.y
    g.rotation.x = clampedX

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
