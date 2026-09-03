import { useEffect, useState } from 'react'

/**
 * Qual seção está ocupando a tela agora.
 *
 * A "linha de leitura" fica a 45% da altura da janela: a seção ativa é a que
 * cruza essa linha. Isso é mais estável que usar o topo da viewport, que faz o
 * menu piscar entre dois itens durante a rolagem.
 *
 * Aqui o state é aceitável — muda algumas vezes por página, não a cada quadro.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const pick = () => {
      const line = window.innerHeight * 0.45
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) current = id
      }
      setActive((prev) => (prev === current ? prev : current))
    }

    pick()
    window.addEventListener('scroll', pick, { passive: true })
    window.addEventListener('resize', pick)
    return () => {
      window.removeEventListener('scroll', pick)
      window.removeEventListener('resize', pick)
    }
  }, [ids])

  return active
}
