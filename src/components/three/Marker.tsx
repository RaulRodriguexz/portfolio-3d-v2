import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Vector3 } from 'three'

const PRIMARY_DEEP = '#6e11b0'

/** Haste fina e curta: marcador, não bandeira (D-25). */
const HASTE_RAIO = 0.006
const HASTE_ALTURA = 0.22
const PONTA_RAIO = 0.03

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
export function Marker({ position }: { position: Vector3 }) {
  const anel = useRef<Mesh>(null)

  useFrame((state) => {
    if (!anel.current) return
    // pulso de 2 s: cresce e some, como um sinal de radar
    const t = (state.clock.elapsedTime % 2) / 2
    anel.current.scale.setScalar(1 + t * 2.2)
    const material = anel.current.material as { opacity: number }
    material.opacity = (1 - t) * 0.55
  })

  const paraFora = position.clone().multiplyScalar(2)

  return (
    <group
      name="dublin-marker"
      position={position}
      onUpdate={(self) => self.lookAt(paraFora)}
    >
      {/* anel de radar — continua na BASE, rente à superfície */}
      <mesh ref={anel} position={[0, 0, 0.001]}>
        <ringGeometry args={[0.032, 0.042, 32]} />
        <meshBasicMaterial color={PRIMARY_DEEP} transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* pé da haste, para ela não parecer flutuando */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.018, 20]} />
        <meshBasicMaterial color={PRIMARY_DEEP} toneMapped={false} />
      </mesh>

      {/* haste: o cilindro nasce deitado no eixo Y, então gira 90° para subir
          pelo +Z local, que é a normal da esfera neste ponto */}
      <mesh position={[0, 0, HASTE_ALTURA / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[HASTE_RAIO, HASTE_RAIO, HASTE_ALTURA, 8]} />
        <meshBasicMaterial color={PRIMARY_DEEP} toneMapped={false} />
      </mesh>

      {/* a cabeça do pin */}
      <mesh position={[0, 0, HASTE_ALTURA]}>
        <sphereGeometry args={[PONTA_RAIO, 16, 16]} />
        <meshBasicMaterial color={PRIMARY_DEEP} toneMapped={false} />
      </mesh>
    </group>
  )
}
