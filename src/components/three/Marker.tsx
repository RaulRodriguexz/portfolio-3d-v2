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
 * O pé é menor que a cabeça, e agora isso é verificável.
 *
 * Era 0.018, e quando a cabeça caiu para 0.015 ele passou a ser **maior que
 * ela**: 16,6 px contra 14,5 px, ou seja 115%. Passou despercebido porque no
 * tema claro de então o pé era escuro sobre continente branco e lia como sombra
 * da haste. Com a inversão do D-60 ele virou **claro sobre a Irlanda roxa**, e
 * um disco claro de 16,6 px sobre uma ilha de ~20×22 px apaga a ilha em vez de
 * marcar um ponto nela.
 *
 * A 0.011 ele dá 10,2 px: **70% da cabeça**, ainda 1,8× a largura da haste — o
 * bastante para continuar lendo como base e não como emenda — e metade do lado
 * estreito da ilha, contra os 83% de antes.
 *
 * O teto é 0.0157, que é onde o pé empataria com a cabeça. Quem mexer em
 * `PONTA_RAIO` mexe neste teto junto: os dois são projetados pela mesma câmera,
 * e a única diferença é o pé estar ~4,4% mais longe dela.
 */
const PE_RAIO = 0.011

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
          <meshBasicMaterial
            color={paleta.anelEscuro}
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>
        <mesh ref={faixaClara} position={[0, 0, 0.0002]}>
          <ringGeometry args={[0.038, 0.044, 32]} />
          <meshBasicMaterial color={paleta.anelClaro} transparent opacity={0.5} toneMapped={false} />
        </mesh>
      </group>

      {/*
        Pé da haste, para ela não parecer flutuando. É a única peça do pin que
        fica **rente à superfície**, então é a única que segue o continente
        (D-60): escura sobre a Irlanda branca do tema escuro, clara sobre a
        Irlanda roxa do tema claro.
      */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[PE_RAIO, 20]} />
        <meshBasicMaterial color={paleta.pinNaSuperficie} toneMapped={false} />
      </mesh>

      {/*
        Haste: o cilindro nasce deitado no eixo Y, então gira 90° para subir
        pelo +Z local, que é a normal da esfera neste ponto.

        Ela e a cabeça **saem da superfície**, e por isso não são vistas contra
        a terra em momento nenhum: o que fica atrás delas é o oceano ou o fundo
        da página. Daí a segunda polaridade do D-60.
      */}
      <mesh position={[0, 0, HASTE_ALTURA / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[HASTE_RAIO, HASTE_RAIO, HASTE_ALTURA, 8]} />
        <meshBasicMaterial color={paleta.pinAcimaDaSuperficie} toneMapped={false} />
      </mesh>

      {/* a cabeça do pin — branca no escuro, roxa no claro, sempre o oposto do
          oceano que fica atrás dela */}
      <mesh position={[0, 0, HASTE_ALTURA]}>
        <sphereGeometry args={[PONTA_RAIO, 16, 16]} />
        <meshBasicMaterial color={paleta.pinAcimaDaSuperficie} toneMapped={false} />
      </mesh>
    </group>
  )
}
