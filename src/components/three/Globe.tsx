import { useMemo, useRef, type RefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { GlobeDragState } from '../../hooks/useGlobeDrag'
import { Marker } from './Marker'
import {
  AdditiveBlending,
  BackSide,
  SRGBColorSpace,
  Vector3,
  type Group,
} from 'three'

const PRIMARY = '#8c62ac'

const RADIUS = 1.6

/** Tempo sem rolagem nem arrasto, em ms, até o globo assentar em Dublin (D-28). */
const REST_DELAY = 1500
/** Velocidade do giro contínuo, em rad/s — uma volta a cada ~31 s (D-28). */
const SPIN_SPEED = 0.2

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
  /** Rotação de repouso/giro, guardada à parte do que o arrasto soma. */
  const base = useRef({ x: 0, y: 0 })
  /** Velocidade angular da base, em rad/s. Repousa em -SPIN_SPEED (D-30). */
  const spinVel = useRef(-SPIN_SPEED)
  /** Idem para a inclinação, que sempre decai a zero. */
  const tiltVel = useRef(0)
  /** Detecta a borda de soltura para transferir o gesto à base uma vez só. */
  const wasDragging = useRef(false)
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

    // p vai de 0 (seção entrando) a 1 (seção saindo). Depois do D-28 ele governa
    // só a aproximação; a rotação não olha mais para a posição da seção
    const raw = progress.current ?? 0
    const p = Math.min(1, Math.max(0, (raw - 0.15) / 0.6))
    const eased = p * p * (3 - 2 * p) // smoothstep

    // D-28 — o regime é decidido pelo REPOUSO, não pela posição da seção. Um
    // D-55 — `livre` suspende o assentamento depois de um arrasto. Não é um
    // segundo temporizador: o carimbo continua único, e o que entra é a
    // ORIGEM da última interação. Sem isso, "Dublin de frente" e "mundinho
    // girando" ficam incompatíveis por construção, e tentar conciliá-los com
    // número foi exatamente o erro que o D-27 cometeu.
    // carimbo só (`lastInteraction`) recebe rolagem e arrasto, então "parou de
    // rolar" e "soltou o globo" são o mesmo evento, e não há dois prazos.
    const resting =
      !d.dragging && !d.livre && performance.now() - d.lastInteraction > REST_DELAY

    const k = 1 - Math.pow(0.002, delta)

    // D-30 — na soltura, o que o gesto acumulou passa para a base: o offset é
    // dobrado dentro dela e a velocidade do arrasto vira a velocidade angular
    // da própria base. Fora do arrasto o offset é sempre zero, então existe um
    // sistema de movimento só — é isso que impede o salto que o D-28 resolveu.
    if (wasDragging.current && !d.dragging) {
      base.current.y += d.offset.y
      base.current.x += d.offset.x
      d.offset.y = 0
      d.offset.x = 0
      spinVel.current = d.velocity.y
      tiltVel.current = d.velocity.x
      d.velocity.y = 0
      d.velocity.x = 0
    }
    wasDragging.current = d.dragging

    // arrastando, a base congela e só o offset se move: prioridade do M-22
    if (!d.dragging) {
      if (resting) {
        // assenta no ângulo congruente mais próximo. Depois de girar livre,
        // `base.y` acumulou dezenas de radianos; perseguir `target.y` cru
        // desenrolaria várias voltas para trás em vez de no máximo meia
        const turns = Math.round((base.current.y - target.y) / (Math.PI * 2))
        base.current.y += (target.y + turns * Math.PI * 2 - base.current.y) * k

        // D-54 — o eixo X passa a precisar do MESMO tratamento. Enquanto havia
        // teto de ±60° ele nunca dava volta, e perseguir `target.x` cru era
        // inofensivo; sem teto, algumas cambalhotas põem `base.x` a várias
        // voltas do alvo e o globo rebobinaria para trás na cara de quem olha.
        const voltasX = Math.round((base.current.x - target.x) / (Math.PI * 2))
        base.current.x += (target.x + voltasX * Math.PI * 2 - base.current.x) * k
        spinVel.current = -SPIN_SPEED
        tiltVel.current = 0
      } else {
        // a velocidade do gesto desacelera até se fundir com o giro normal
        spinVel.current += (-SPIN_SPEED - spinVel.current) * (1 - Math.pow(0.25, delta))
        tiltVel.current *= Math.pow(0.12, delta)
        base.current.y += spinVel.current * delta
        base.current.x += tiltVel.current * delta
      }
    }

    // a aproximação segue ligada ao scroll (D-19) — ela não disputa nada
    const wantScale = 1 + eased * 0.42
    g.scale.setScalar(g.scale.x + (wantScale - g.scale.x) * k)

    // D-54 — sem teto: o globo dá volta completa nos dois eixos, inclusive de
    // cabeça para baixo. `rotation.x` e `rotation.y` são ângulos de Euler, então
    // passando de ±90° em X o arrasto horizontal inverte a sensação; é inerente
    // a rotação turntable e sair disso exigiria quaternião, ou seja, reescrever
    // o núcleo que custou o D-28 e o D-30. Consequência assumida, não defeito.
    g.rotation.y = base.current.y + d.offset.y
    g.rotation.x = base.current.x + d.offset.x
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
