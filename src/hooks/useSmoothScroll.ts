import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Rolagem com inércia (M-18).
 *
 * Muda a sensação do site inteiro: o scroll ganha peso e desacelera em vez de
 * parar seco. É a mudança de menor custo e maior efeito percebido de toda a
 * lista de movimento.
 *
 * Três cuidados:
 *  • `prefers-reduced-motion` desliga tudo — rolagem alterada é justamente o
 *    tipo de coisa que causa enjoo em quem é sensível a movimento;
 *  • o `scroll-behavior: smooth` do CSS precisa sair, senão os dois brigam e a
 *    navegação por âncora fica travada. Por isso a classe `lenis` no <html>;
 *  • os links de âncora passam a ser tratados aqui, para o destino chegar com
 *    a mesma inércia e respeitando a altura do header fixo.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.05,
      // curva exponencial: começa rápido e assenta devagar
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // no toque, a rolagem nativa é melhor que qualquer emulação
      syncTouch: false,
    })

    document.documentElement.classList.add('lenis')

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')!.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      event.preventDefault()
      // 80px = altura do header fixo mais um respiro
      lenis.scrollTo(target, { offset: -80 })
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('lenis')
      lenis.destroy()
    }
  }, [])
}
