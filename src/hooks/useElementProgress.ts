import { useEffect, useRef, type RefObject } from 'react'

/**
 * Progresso de 0 a 1 conforme um elemento atravessa a viewport.
 *
 * 0 = o topo do elemento acabou de entrar por baixo
 * 1 = o elemento acabou de sair por cima
 *
 * Devolve um **ref**, não state: quem consome é o `useFrame` do R3F, que lê a
 * cada quadro. Colocar isso em state re-renderizaria a árvore 60 vezes por
 * segundo — exatamente o que engasga a animação.
 */
export function useElementProgress(target: RefObject<HTMLElement | null>) {
  const progress = useRef(0)

  useEffect(() => {
    const update = () => {
      const el = target.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // total percorrido: da entrada (top = vh) até a saída (bottom = 0)
      const total = rect.height + vh
      const travelled = vh - rect.top
      progress.current = Math.min(1, Math.max(0, travelled / total))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [target])

  return progress
}
