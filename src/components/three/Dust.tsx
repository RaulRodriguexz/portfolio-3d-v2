import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { AdditiveBlending, Vector3, type Points } from 'three'
import type { Paleta } from './paleta'

/** Interpolação suave de Hermite, a mesma curva do `smoothstep` de GLSL. */
function suave(inicio: number, fim: number, valor: number) {
  const t = Math.min(1, Math.max(0, (valor - inicio) / (fim - inicio)))
  return t * t * (3 - 2 * t)
}

/**
 * Onde a queda começa, em coordenadas normalizadas de tela (0 no centro do
 * canvas, 1 na borda). Antes disto a partícula tem opacidade cheia; daqui até
 * a borda ela decai a zero.
 */
const INICIO_DA_QUEDA = 0.45

/**
 * D-72 — a poeira do hero, e por que ela decai perto da borda.
 *
 * **O problema não era o degradê.** A medição de 11/09 mostrou que a aresta
 * horizontal do hero vale **1,19% de contraste de Weber** — invisível. O que se
 * enxergava era o **campo de partículas cortado em retângulo**: o WebGL pinta
 * dentro do canvas, e onde o canvas acaba as estrelas acabam, numa linha reta.
 *
 * **A queda é em espaço de TELA, e isso não é preciosismo.** Uma queda radial
 * em 3D — que seria mais barata, porque poderia ser calculada uma vez só — não
 * resolve aqui, e a geometria diz por quê: a nuvem é uma esfera e o canvas é um
 * retângulo **2,5× mais largo que alto**. Uma esfera inscrita no retângulo
 * deixa os lados vazios; uma que cubra os lados é **cortada em cima e embaixo**.
 * Não existe raio que faça as duas coisas. Em NDC, `max(|x|, |y|)` é um
 * quadrado, que é exatamente a forma do canvas — então a partícula chega à
 * borda já em zero, **por construção**, em qualquer proporção de tela.
 *
 * Custo: uma projeção por partícula por quadro. São duas multiplicações de
 * matriz em cada uma — a mesma conta que o `useFrame` do globo já faz para o
 * assentamento —, e o buffer de cor que sobe são 3 floats por ponto.
 *
 * A cor continua vindo do material (`paleta.poeira`); o que vai no atributo é
 * só o **fator**, em cinza, que o material multiplica. Assim o tema segue
 * mandando na cor e este arquivo não sabe que existem dois temas.
 */
export function Dust({
  paleta,
  count = 1000,
  radius = 4.6,
}: {
  paleta: Paleta
  count?: number
  radius?: number
}) {
  const ref = useRef<Points>(null)
  const ponto = useMemo(() => new Vector3(), [])

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

  // nasce em 1: se algum quadro falhar, a poeira aparece inteira em vez de sumir
  const cores = useMemo(() => new Float32Array(count * 3).fill(1), [count])

  useFrame((state, delta) => {
    const pts = ref.current
    if (!pts) return

    pts.rotation.y += delta * 0.04
    pts.rotation.x += delta * 0.012
    pts.updateMatrixWorld()

    const pos = pts.geometry.attributes.position
    const cor = pts.geometry.attributes.color
    for (let i = 0; i < count; i++) {
      ponto.fromBufferAttribute(pos, i).applyMatrix4(pts.matrixWorld).project(state.camera)
      // em NDC a borda do canvas é |x| = 1 e |y| = 1; o máximo dos dois é a
      // distância à borda mais próxima medida como quadrado, não como círculo
      const f = 1 - suave(INICIO_DA_QUEDA, 1, Math.max(Math.abs(ponto.x), Math.abs(ponto.y)))
      cores[i * 3] = cores[i * 3 + 1] = cores[i * 3 + 2] = f
    }
    cor.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[cores, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={paleta.poeira}
        vertexColors
        transparent
        opacity={paleta.poeiraOpacidade}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  )
}
