import { useEffect, useRef, useState, type RefObject } from 'react'

/** Sensibilidade do arrasto: ~90° a cada 300 px percorridos. */
const SENSITIVITY = 0.005
/** Teto da velocidade residual, em radianos por segundo. */
const MAX_VELOCITY = 4
/** Quanto o gesto precisa andar, em px, antes de ser classificado. */
const DECISION_THRESHOLD = 8
/** Folga em volta do quadrado do planeta, em px (D-54). */
const MARGEM_DA_ZONA = 40
/**
 * O quanto o eixo horizontal precisa dominar o vertical para virar arrasto
 * (D-29). Vale 1 — 45° cravados. Antes eram 1,4, o que matava qualquer puxão
 * levemente diagonal. Afrouxar é seguro porque a garantia de que a rolagem
 * vertical nunca é roubada passa a vir do `touch-action` nativo, não daqui.
 */
const HORIZONTAL_BIAS = 1

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
  /**
   * D-55 — verdadeiro depois de um arrasto, falso depois de uma rolagem.
   *
   * O `lastInteraction` diz **quando** houve interação; este diz **de onde ela
   * veio**, e é essa distinção que resolve um conflito que nenhum número
   * resolve. Rolar é ler, e quem lê merece Dublin de frente; arrastar é
   * brincar, e quem brinca não quer que o brinquedo se arrume sozinho.
   * Enquanto for verdadeiro, o assentamento automático fica suspenso e o globo
   * gira livre por tempo indeterminado — até a próxima rolagem.
   */
  livre: boolean
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
 * 4. **Os listeners moram na `<section>`, não no canvas** (D-29). Eventos de
 *    ponteiro borbulham de qualquer descendente, então a seção inteira responde
 *    ao arrasto — inclusive por cima do texto e das áreas onde o canvas não
 *    chega. Nada precisa mexer em `pointer-events`: um filho com
 *    `pointer-events: none` só deixa o evento cair na seção, que é quem escuta.
 *
 * 5. **A zona limita onde o gesto COMEÇA, nunca onde ele continua** (D-54).
 *    Um `pointerdown` nascido longe do planeta é ignorado; um arrasto já em
 *    curso segue valendo mesmo com o cursor longe da bola. Limitar a
 *    continuação faria o globo escapar da mão no meio do movimento, o que é
 *    pior que o problema original. Os listeners **continuam na `<section>`**:
 *    tirá-los de lá reintroduziria o defeito do canvas menor que a área
 *    aparente, que é o que o D-29 consertou.
 *
 * Devolve um **callback ref**, não um ref comum: o canvas nasce depois, quando
 * o chunk lazy do `GlobeScene` resolve. Com `useRef` o efeito rodava uma única
 * vez, com o elemento ainda `null`, e os listeners nunca chegavam a ser presos.
 */
export function useGlobeDrag<T extends HTMLElement>(
  zona?: RefObject<HTMLElement | null>,
): [(node: T | null) => void, RefObject<GlobeDragState>] {
  const [element, setElement] = useState<T | null>(null)
  const state = useRef<GlobeDragState>({
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    dragging: false,
    lastInteraction: 0,
    livre: false,
  })

  useEffect(() => {
    const el = element
    if (!el) return
    // quem pediu menos movimento não ganha arrasto nem inércia (ver D-26)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // `pinch-zoom` explícito: `pan-y` sozinho desliga o zoom de pinça, e isso
    // seria uma regressão de acessibilidade numa seção inteira (D-29)
    el.style.touchAction = 'pan-y pinch-zoom'

    /**
     * Quadrado centrado na caixa da cena, com folga. A caixa é bem mais larga
     * que alta no desktop e o planeta é redondo: usar o retângulo inteiro
     * deixaria o gesto começar onde não há globo nenhum.
     */
    const naZona = (e: PointerEvent) => {
      const z = zona?.current
      if (!z) return true
      const r = z.getBoundingClientRect()
      if (!r.width || !r.height) return true
      const lado = Math.min(r.width, r.height) / 2 + MARGEM_DA_ZONA
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      return Math.abs(e.clientX - cx) <= lado && Math.abs(e.clientY - cy) <= lado
    }

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
      el.style.userSelect = 'none'
      lastX = e.clientX
      lastY = e.clientY
      lastTime = performance.now()
    }

    const onDown = (e: PointerEvent) => {
      if (pointerId !== null) return
      // D-54 — só a ORIGEM é restrita
      if (!naZona(e)) return
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
      // D-54 — a mão só aparece onde o gesto pode começar, e é ela que ENSINA
      // onde pegar. Vive aqui e não no `<div>` da cena porque aquele elemento é
      // `pointer-events: none` e nunca recebe ponteiro: um `cursor-grab` ali é
      // inerte, e era exatamente o que estava no código.
      if (pointerId === null && e.pointerType === 'mouse') {
        el.style.cursor = naZona(e) ? 'grab' : ''
      }
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
        // soltou depois de girar: o globo fica livre até alguém rolar (D-55)
        state.current.livre = true
        if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
      }
      el.style.cursor = ''
      el.style.userSelect = ''
      pointerId = null
      mode = 'undecided'
    }

    // rolar conta como atividade tanto quanto arrastar (D-28)
    const onScroll = () => {
      state.current.lastInteraction = performance.now()
      // voltou a ler: o globo volta a se arrumar e a apontar Dublin (D-55)
      state.current.livre = false
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
