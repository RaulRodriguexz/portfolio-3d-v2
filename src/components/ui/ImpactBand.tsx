import { useEffect, useRef, useState } from 'react'
import { Container } from '../layout/Container'
import { profile } from '../../data/profile'

/** Duração da contagem, em ms. */
const DURACAO = 900

/**
 * D-34 / M-24 — a faixa de impacto. Uma linha, sem rótulo e sem título: é o
 * número que o recrutador leva embora da página.
 *
 * O número conta uma vez, quando entra na tela, e nunca mais. A largura fica
 * reservada com `tabular-nums` e `min-w-[2ch]` — e aqui o `ch` é a unidade
 * certa, porque para dígitos ele é exatamente a largura do glifo, que é
 * justamente o que o D-39 mostrou que ele não é para prosa.
 */
export function ImpactBand() {
  const ref = useRef<HTMLDivElement>(null)
  const [valor, setValor] = useState(0)
  const { count, suffix } = profile.impact

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // menos movimento: o número aparece pronto, sem contagem
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValor(count)
      return
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        const entrada = entradas[0]

        // Salto instantâneo — clique numa âncora do menu, por exemplo — pode
        // atravessar o elemento sem nunca satisfazer o threshold. Sem isto o
        // número ficaria parado em 0, o que não é uma animação inacabada: é
        // uma afirmação falsa na tela. Se já passou por cima, mostra o final.
        if (!entrada.isIntersecting) {
          if (entrada.boundingClientRect.top < 0) {
            observador.disconnect()
            setValor(count)
          }
          return
        }

        observador.disconnect() // uma vez só
        const inicio = performance.now()
        const passo = (agora: number) => {
          const t = Math.min(1, (agora - inicio) / DURACAO)
          setValor(Math.round(count * (1 - Math.pow(1 - t, 3))))
          if (t < 1) requestAnimationFrame(passo)
        }
        requestAnimationFrame(passo)
      },
      { threshold: 0.4 },
    )

    observador.observe(el)
    return () => observador.disconnect()
  }, [count])

  return (
    <div ref={ref} className="border-t border-line/60 py-16 sm:py-24">
      <Container>
        <p className="text-3xl font-bold tracking-tight sm:text-5xl">
          <span className="inline-block min-w-[2ch] tabular-nums text-primary-deep">{valor}</span>
          {suffix}
        </p>
      </Container>
    </div>
  )
}
