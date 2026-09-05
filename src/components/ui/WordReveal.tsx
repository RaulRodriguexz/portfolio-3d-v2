import { Fragment, useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  /** Atraso antes da primeira palavra, em ms. */
  delay?: number
  /** Intervalo entre palavras, em ms. */
  stagger?: number
  /** Só começa quando o bloco entra na tela, em vez de no carregamento. */
  whenVisible?: boolean
  /**
   * Controle externo (M-26). Quando definido, manda no lugar do temporizador e
   * do observer próprio: quem decide o instante é quem já observa o bloco —
   * nos `h2`, o `useReveal` da `<Section>`. Evita um segundo
   * IntersectionObserver olhando exatamente o mesmo elemento.
   */
  start?: boolean
  className?: string
}

/**
 * M-2 do PRD 5.2.1 — texto que aparece palavra por palavra.
 *
 * Só `transform` e `opacity`: o navegador compõe isso na GPU sem recalcular
 * layout. Cada palavra é um span inline-block dentro de um span com
 * `overflow: hidden`, então ela sobe de dentro da linha em vez de surgir do nada.
 *
 * Acessibilidade: o texto completo está no DOM desde o primeiro quadro — só a
 * apresentação é animada. Com `prefers-reduced-motion`, aparece tudo de uma vez.
 *
 * **O espaço entre palavras é um nó de texto de verdade, fora do recorte.** Ele
 * já foi uma `margin`, o que parecia equivalente e não era: margem separa na
 * tela mas não existe no `textContent`, então `h1.textContent` devolvia
 * "RaulRodrigues" e a frase de posicionamento virava uma palavra só de 56
 * caracteres. Quem lê a página por máquina — leitor de tela, indexador,
 * copiar-colar — via texto colado. Colocado fora do `<span>` com
 * `overflow: hidden`, o espaço sobrevive ao recorte e ao DOM.
 */
export function WordReveal({
  text,
  delay = 120,
  stagger = 70,
  whenVisible = false,
  start,
  className = '',
}: Props) {
  const controlado = start !== undefined
  const [ready, setReady] = useState(false)
  const host = useRef<HTMLSpanElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // comandado de fora: nada de temporizador nem de observer aqui
    if (controlado) return
    if (reduced.current) {
      setReady(true)
      return
    }

    if (!whenVisible) {
      const id = window.setTimeout(() => setReady(true), delay)
      return () => window.clearTimeout(id)
    }

    const el = host.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setReady(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setReady(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, whenVisible, controlado])

  const words = text.split(' ')
  const visivel = controlado ? start : ready

  return (
    <span ref={host} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            // overflow-hidden recorta a palavra enquanto ela sobe; o pb/-mb dá
            // espaço para as descidas (g, j, p, y) não serem cortadas
            className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          >
            <span
              className="inline-block will-change-transform"
              style={{
                transform: visivel ? 'translateY(0)' : 'translateY(105%)',
                opacity: visivel ? 1 : 0,
                transition: reduced.current
                  ? 'none'
                  : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, opacity 500ms ease-out ${i * stagger}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {/* espaço de verdade, FORA do recorte: é o que faz o textContent
              devolver "Raul Rodrigues" em vez de "RaulRodrigues" */}
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}
