import { useEffect, useRef, useState, type RefObject } from 'react'

/** Sensibilidade do arrasto: ~90° a cada 300 px percorridos. */
const SENSITIVITY = 0.005
/** Teto da velocidade residual, em radianos por segundo. */
const MAX_VELOCITY = 4
/** Quanto o gesto precisa andar, em px, antes de ser classificado. */
const DECISION_THRESHOLD = 8
/** O quanto o eixo horizontal precisa dominar o vertical para virar arrasto. */
const HORIZONTAL_BIAS = 1.4

export type GlobeDragState = {
  /** Rotação que o usuário somou por cima da que o scroll comanda. */
  offset: { x: number; y: number }
  /** Velocidade residual, que vira inércia depois de soltar. */
  velocity: { x: number; y: number }
  /** Verdadeiro enquanto o ponteiro está pressionado e arrastando. */
  dragging: boolean
  /**
   * `performance.now()` da última atividade do usuário — **rolagem ou arrasto**
   * (D-28). Um carimbo só governa os dois repousos; não existe um segundo.
   */
  lastInteraction: number
}

/**
 * Rotação do globo por arrasto (M-22, D-24).
 *
 * O hook só interpreta gestos e acumula estado num ref; quem desenha é o
 * `Globe`. Mesmo padrão do `useElementProgress`: um ref atravessa a cena até o
 * `useFrame`, sem re-renderizar React a cada quadro.
 *
 * Duas decisões que valem explicação:
 *
 * 1. **O offset é somado, não substituído.** O scroll continua dono da rotação
 *    base; o arrasto só empurra por cima. Como o offset decai a zero, "voltar
 *    ao normal" e "voltar a apontar Dublin" viram a mesma coisa — sem os dois
 *    disputarem o mesmo eixo.
 *
 * 2. **No toque, só gesto horizontal é capturado.** `touch-action: pan-y`
 *    entrega a rolagem vertical ao navegador — é a defesa que vale mesmo se o
 *    JS aqui errar. A classificação no primeiro movimento é a segunda camada.
 *
 * 3. **A rolagem também alimenta `lastInteraction`** (D-28). "Rolou" e
 *    "arrastou" são o mesmo fato — atividade — então o repouso do globo é uma
 *    leitura só, e não dois temporizadores competindo.
 *
 * Devolve um **callback ref**, não um ref comum: o canvas nasce depois, quando
 * o chunk lazy do `GlobeScene` resolve. Com `useRef` o efeito rodava uma única
 * vez, com o elemento ainda `null`, e os listeners nunca chegavam a ser presos.
 */
export function useGlobeDrag<T extends HTMLElement>(): [
  (node: T | null) => void,
  RefObject<GlobeDragState>,
] {
  const [element, setElement] = useState<T | null>(null)
  const state = useRef<GlobeDragState>({
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    dragging: false,
    lastInteraction: 0,
  })

  useEffect(() => {
    const el = element
    if (!el) return
    // quem pediu menos movimento não ganha arrasto nem inércia (ver D-26)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // o container da seção é pointer-events-none e o canvas herda isso; aqui é
    // o único lugar onde o elemento do globo volta a receber ponteiro
    el.style.pointerEvents = 'auto'
    el.style.touchAction = 'pan-y'
    el.style.cursor = 'grab'

    let pointerId: number | null = null
    let mode: 'undecided' | 'drag' | 'scroll' = 'undecided'
    let allowVertical = false
    let startX = 0
    let startY = 0
    let lastX = 0
    let lastY = 0
    let lastTime = 0

    const clamp = (v: number) => Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, v))

    const begin = (e: PointerEvent) => {
      mode = 'drag'
      state.current.dragging = true
      el.setPointerCapture(e.pointerId)
      el.style.cursor = 'grabbing'
      lastX = e.clientX
      lastY = e.clientY
      lastTime = performance.now()
    }

    const onDown = (e: PointerEvent) => {
      if (pointerId !== null) return
      pointerId = e.pointerId
      allowVertical = e.pointerType === 'mouse'
      startX = lastX = e.clientX
      startY = lastY = e.clientY
      lastTime = performance.now()

      const s = state.current
      s.velocity.x = 0
      s.velocity.y = 0
      s.lastInteraction = lastTime

      // o mouse não precisa de arbitragem: não existe rolagem por arrasto nele
      if (allowVertical) begin(e)
      else mode = 'undecided'
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId || mode === 'scroll') return
      const s = state.current

      if (mode === 'undecided') {
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        // ainda não andou o suficiente para decidir de que gesto se trata
        if (Math.abs(dx) < DECISION_THRESHOLD && Math.abs(dy) < DECISION_THRESHOLD) return
        // vertical dominante é rolagem da página: sai e não volta neste gesto
        if (Math.abs(dx) <= Math.abs(dy) * HORIZONTAL_BIAS) {
          mode = 'scroll'
          return
        }
        begin(e)
        return
      }

      const now = performance.now()
      const dt = Math.max((now - lastTime) / 1000, 0.001)
      const moveY = (e.clientX - lastX) * SENSITIVITY
      const moveX = allowVertical ? (e.clientY - lastY) * SENSITIVITY : 0

      s.offset.y += moveY
      s.offset.x += moveX
      // média exponencial: um quadro isolado não manda na inércia inteira
      s.velocity.y = clamp(s.velocity.y * 0.6 + (moveY / dt) * 0.4)
      s.velocity.x = clamp(s.velocity.x * 0.6 + (moveX / dt) * 0.4)
      s.lastInteraction = now

      lastX = e.clientX
      lastY = e.clientY
      lastTime = now
    }

    const onEnd = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return
      if (mode === 'drag') {
        state.current.dragging = false
        state.current.lastInteraction = performance.now()
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      }
      el.style.cursor = 'grab'
      pointerId = null
      mode = 'undecided'
    }

    // rolar conta como atividade tanto quanto arrastar (D-28)
    const onScroll = () => {
      state.current.lastInteraction = performance.now()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onEnd)
    el.addEventListener('pointercancel', onEnd)

    return () => {
      window.removeEventListener('scroll', onScroll)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onEnd)
      el.removeEventListener('pointercancel', onEnd)
    }
  }, [element])

  return [setElement, state]
}
