import { useEffect, useRef } from 'react'

/**
 * Progresso do scroll de 0 a 1 ao longo dos primeiros `distance` pixels.
 *
 * Devolve um **ref**, não um state: o valor muda a cada quadro do scroll, e
 * disparar re-render do React nessa frequência é justamente o que engasga a
 * animação. Quem consome (o `useFrame` do R3F) lê `ref.current` direto.
 */
export function useScrollProgress(distance = 600) {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      progress.current = Math.min(1, Math.max(0, window.scrollY / distance))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [distance])

  return progress
}
