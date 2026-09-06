import { useEffect, useState } from 'react'

export type Tema = 'claro' | 'escuro'

/**
 * D-44, frente 2 — o tema atual, para quem não pode usar CSS.
 *
 * Dentro de um `<Canvas>` não existe classe do Tailwind nem `var(--color-*)`:
 * material de WebGL recebe cor como valor, não como propriedade herdada. Então
 * as cenas precisam **ler** o tema, e re-renderizar quando ele muda.
 *
 * Escuta o mesmo evento `tema:mudou` que o botão da frente 7 dispara. Não é um
 * `MutationObserver` no `<html>` porque o evento já existe e é mais barato; e
 * não é um `scroll` sintético pela razão do D-55 — um scroll falso faria o
 * globo parar de girar só porque alguém trocou de tema.
 */
export function useTema(): Tema {
  const [tema, setTema] = useState<Tema>(() =>
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark'
      ? 'escuro'
      : 'claro',
  )

  useEffect(() => {
    const ler = () =>
      setTema(document.documentElement.dataset.theme === 'dark' ? 'escuro' : 'claro')
    ler()
    window.addEventListener('tema:mudou', ler)
    return () => window.removeEventListener('tema:mudou', ler)
  }, [])

  return tema
}
