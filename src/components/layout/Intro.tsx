import { useEffect, useState } from 'react'

/**
 * Cortina de entrada (M-19).
 *
 * Cobre a tela e sobe nos primeiros instantes. Serve a dois propósitos, e o
 * segundo é o técnico: ela esconde o quadro em que as fontes ainda não
 * chegaram e o texto pisca na fonte de fallback.
 *
 * Regras que a mantêm honesta:
 *  • dura 900 ms no total e nunca bloqueia — o conteúdo já está no DOM atrás
 *    dela, e ela não espera nada carregar;
 *  • `pointer-events: none` assim que começa a subir, então nunca engole um
 *    clique;
 *  • fora da árvore de acessibilidade, e desligada com `prefers-reduced-motion`.
 */
export function Intro() {
  const [state, setState] = useState<'in' | 'out' | 'gone'>('in')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('gone')
      return
    }
    const up = window.setTimeout(() => setState('out'), 420)
    const off = window.setTimeout(() => setState('gone'), 1300)
    return () => {
      window.clearTimeout(up)
      window.clearTimeout(off)
    }
  }, [])

  if (state === 'gone') return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-canvas transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        state === 'out' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <span
        className={`font-mono text-sm tracking-[0.2em] text-muted transition-opacity duration-300 ${
          state === 'out' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        RAUL RODRIGUES
      </span>
    </div>
  )
}
