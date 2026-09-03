import { useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  /** Atraso antes da primeira palavra, em ms. */
  delay?: number
  /** Intervalo entre palavras, em ms. */
  stagger?: number
  /** Só começa quando o bloco entra na tela, em vez de no carregamento. */
  whenVisible?: boolean
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
 */
export function WordReveal({
  text,
  delay = 120,
  stagger = 70,
  whenVisible = false,
  className = '',
}: Props) {
  const [ready, setReady] = useState(false)
  const host = useRef<HTMLSpanElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
  }, [delay, whenVisible])

  const words = text.split(' ')

  return (
    <span ref={host} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // overflow-hidden recorta a palavra enquanto ela sobe; o pb/-mb dá
          // espaço para as descidas (g, j, p, y) não serem cortadas.
          // O espaço entre palavras é MARGEM, não whitespace: um espaço comum
          // ficaria dentro da área recortada e sumiria, colando as palavras.
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
          style={{ marginRight: i < words.length - 1 ? '0.26em' : undefined }}
        >
          <span
            className="inline-block will-change-transform"
            style={{
              transform: ready ? 'translateY(0)' : 'translateY(105%)',
              opacity: ready ? 1 : 0,
              transition: reduced.current
                ? 'none'
                : `transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * stagger}ms, opacity 500ms ease-out ${i * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
