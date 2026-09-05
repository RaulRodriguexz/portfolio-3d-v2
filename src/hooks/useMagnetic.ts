import { useEffect, useRef } from 'react'

/** Alcance do ímã, em px além da borda do elemento. */
const RAIO = 60
/** Deslocamento máximo. Mais que isto vira brinquedo e erra o clique. */
const MAXIMO = 8

/**
 * M-27 — o elemento se inclina na direção do cursor quando ele chega perto.
 *
 * É a interação que faz a pessoa mexer o mouse de propósito para ver de novo.
 * Só nos alvos grandes e isolados — os dois CTAs do Statement, o copiar e-mail
 * e o baixar CV. **Nunca em lista densa** (menu, rodapé): elemento que foge do
 * cursor no meio de vários atrapalha o clique em vez de convidar.
 *
 * Três cuidados:
 *
 * 1. **Só `transform`, escrito direto no DOM.** Mover o mouse não pode
 *    reconstruir árvore de React — mesmo princípio do M-6 e do M-20 no
 *    `ProjectCard`. O rAF garante uma escrita por quadro, no máximo.
 *
 * 2. **A distância é medida até a BORDA, não até o centro.** Medindo do centro,
 *    um botão largo exigiria o cursor mais perto só por ser largo, e o ímã
 *    ficaria mais fraco justamente no elemento maior.
 *
 * 3. **No dedo o ímã não é instalado.** `(hover: none)` ou `(pointer: coarse)`
 *    saem antes de registrar qualquer listener, então não existe `transform`
 *    residual capaz de deslocar a área de toque — o que quebraria o clique no
 *    celular em vez de enfeitá-lo.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let quadro = 0
    let x = 0
    let y = 0

    const aplicar = () => {
      quadro = 0
      el.style.transform = x || y ? `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)` : ''
    }

    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(aplicar)
    }

    const aoMover = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const r = el.getBoundingClientRect()
      if (!r.width) return

      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)

      // o quanto o cursor está FORA da caixa, por eixo
      const foraX = Math.max(0, Math.abs(dx) - r.width / 2)
      const foraY = Math.max(0, Math.abs(dy) - r.height / 2)
      const distancia = Math.hypot(foraX, foraY)

      if (distancia > RAIO) {
        if (x || y) {
          x = 0
          y = 0
          agendar()
        }
        return
      }

      // vetor unitário na direção do cursor: o teto de MAXIMO vale em qualquer
      // direção, sem precisar de clamp por eixo
      const comprimento = Math.hypot(dx, dy) || 1
      const forca = (1 - distancia / RAIO) * MAXIMO
      x = (dx / comprimento) * forca
      y = (dy / comprimento) * forca
      agendar()
    }

    const aoSair = () => {
      x = 0
      y = 0
      agendar()
    }

    window.addEventListener('pointermove', aoMover, { passive: true })
    window.addEventListener('pointerdown', aoSair)
    window.addEventListener('blur', aoSair)

    return () => {
      window.removeEventListener('pointermove', aoMover)
      window.removeEventListener('pointerdown', aoSair)
      window.removeEventListener('blur', aoSair)
      if (quadro) cancelAnimationFrame(quadro)
      el.style.transform = ''
    }
  }, [])

  return ref
}
