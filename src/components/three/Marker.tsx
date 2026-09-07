import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh, Vector3 } from 'three'
import type { Paleta } from './paleta'

/** Haste fina e curta: marcador, não bandeira (D-25). */
const HASTE_RAIO = 0.006
const HASTE_ALTURA = 0.22
/**
 * A cabeça pousa sobre a Irlanda, não a cobre.
 *
 * Com os continentes sólidos do D-58a deu para medir a ilha: ~20×22 px, e a
 * cabeça a 0.03 dava ~29 px — maior que o país que ela aponta. Metade do raio
 * dá ~14,5 px, 72% do lado estreito da ilha.
 *
 * O número é uma razão pura, e por isso a conta fecha sem remedir: o centro da
 * cabeça fica em HASTE_ALTURA ao longo da normal, **independente do raio**, e a
 * câmera e a escala não mudam — então o diâmetro projetado é linear em
 * PONTA_RAIO. Ilha e cabeça foram medidas na mesma sessão e na mesma unidade,
 * então a comparação não depende de qual unidade era.
 *
 * Piso: a cabeça tem de continuar lendo como cabeça. A 0.015 ela ainda é 2,5×
 * o raio da haste; encostar em HASTE_RAIO transformaria o pin num palito.
 */
const PONTA_RAIO = 0.015

/**
 * O marcador de Dublin (M-23 / D-25).
 *
 * Um círculo rente à superfície some no meio dos continentes e não lê como
 * localização — some porque nada o separa do desenho embaixo dele. A haste
 * resolve por profundidade em vez de por contraste: o pin sai do plano.
 *
 * **A oclusão é de graça e é o ponto.** O grupo fica em `RADIUS * 1.005`, logo
 * acima da esfera opaca, e a haste sobe pela normal. Quando Dublin gira para o
 * outro lado, a própria esfera cobre o pin pelo teste de profundidade — nada de
 * esconder por opacidade, que é o que deixaria um fantasma atravessando a bola.
 * É a mesma técnica que tirou a cara de PNG do Memoji (D-18).
 *
 * O grupo olha para fora do centro, então o **+Z local é a normal da
 * superfície**: tudo aqui dentro é posicionado ao longo dele.
 */
export function Marker({ position, paleta }: { position: Vector3; paleta: Paleta }) {
  const anel = useRef<Group>(null)
  const faixaEscura = useRef<Mesh>(null)
  const faixaClara = useRef<Mesh>(null)

  useFrame((state) => {
    if (!anel.current) return
    // pulso de 2 s: cresce e some, como um sinal de radar
    const t = (state.clock.elapsedTime % 2) / 2
    anel.current.scale.setScalar(1 + t * 2.2)
    const opacidade = (1 - t) * 0.55
    for (const faixa of [faixaEscura.current, faixaClara.current]) {
      if (faixa) (faixa.material as { opacity: number }).opacity = opacidade
    }
  })

  const paraFora = position.clone().multiplyScalar(2)

  return (
    <group
      name="dublin-marker"
      position={position}
      onUpdate={(self) => self.lookAt(paraFora)}
    >
      {/*
        Anel de radar, na BASE e rente à superfície — em DUAS faixas depois do
        D-56. O pulso cresce 2,2× e atravessa a costa, então cruza as duas
        superfícies do globo novo, e medindo elas não têm cor comum: sobre o
        oceano `rgb(154,103,183)` o `primary-deep` dá 2,11:1 e some; sobre o
        continente `rgb(237,231,244)` o branco dá 1,21:1 e some. Nenhuma cor
        única resolve. Com uma faixa clara e uma escura, uma das duas sempre
        contrasta, seja onde for que o pulso esteja passando.
      */}
      <group ref={anel} position={[0, 0, 0.001]}>
        <mesh ref={faixaEscura}>
          <ringGeometry args={[0.032, 0.038, 32]} />
          <meshBasicMaterial color={paleta.pin} transparent opacity={0.5} toneMapped={false} />
        </mesh>
        <mesh ref={faixaClara} position={[0, 0, 0.0002]}>
          <ringGeometry args={[0.038, 0.044, 32]} />
          <meshBasicMaterial color={paleta.anelClaro} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>

      {/* pé da haste, para ela não parecer flutuando */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.018, 20]} />
        <meshBasicMaterial color={paleta.pin} toneMapped={false} />
      </mesh>

      {/* haste: o cilindro nasce deitado no eixo Y, então gira 90° para subir
          pelo +Z local, que é a normal da esfera neste ponto */}
      <mesh position={[0, 0, HASTE_ALTURA / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[HASTE_RAIO, HASTE_RAIO, HASTE_ALTURA, 8]} />
        <meshBasicMaterial color={paleta.pin} toneMapped={false} />
      </mesh>

      {/* a cabeça do pin */}
      <mesh position={[0, 0, HASTE_ALTURA]}>
        <sphereGeometry args={[PONTA_RAIO, 16, 16]} />
        <meshBasicMaterial color={paleta.pin} toneMapped={false} />
      </mesh>
    </group>
  )
}
