import { useEffect, useRef } from 'react'

/**
 * RF-08 — anima a entrada de um bloco quando ele aparece na tela.
 * Uso: const ref = useReveal<HTMLDivElement>()  →  <div ref={ref} className="reveal">
 *
 * O segundo parâmetro é opcional e serve para **outra animação pegar carona
 * neste observer** em vez de criar o seu (M-26): ele é chamado no mesmo
 * instante em que a classe `is-visible` entra. Aditivo — quem só quer o ref
 * continua chamando `useReveal()` como antes.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15, onReveal?: () => void) {
  const ref = useRef<T>(null)
  const avisar = useRef(onReveal)

  // fora das dependências do efeito: um callback novo a cada render não pode
  // religar o observer
  useEffect(() => {
    avisar.current = onReveal
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sem IntersectionObserver ou com movimento reduzido: mostra direto.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      avisar.current?.()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
            avisar.current?.()
          }
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
