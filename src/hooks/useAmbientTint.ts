import { useEffect } from 'react'

/**
 * Muda o tom do fundo da página conforme o scroll, quase imperceptivelmente.
 *
 * Três paradas: começo neutro, meio levemente lilás, fim de novo neutro mas um
 * grau mais frio. A diferença entre elas é pequena de propósito — o efeito só
 * funciona se ninguém notar que existe.
 *
 * Escreve uma variável CSS no `<html>` a cada quadro de scroll, com rAF: sem
 * state do React, sem re-render, e o navegador só repinta o fundo.
 */
const STOPS = [
  { r: 251, g: 251, b: 254 }, // canvas
  { r: 248, g: 245, b: 252 }, // lilás muito lavado
  { r: 249, g: 250, b: 253 }, // neutro frio
]

function mix(a: (typeof STOPS)[number], b: (typeof STOPS)[number], t: number) {
  const c = (x: number, y: number) => Math.round(x + (y - x) * t)
  return `rgb(${c(a.r, b.r)} ${c(a.g, b.g)} ${c(a.b, b.b)})`
}

export function useAmbientTint() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0

    const apply = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0

      // p em [0,1] percorrendo as três paradas
      const scaled = p * (STOPS.length - 1)
      const i = Math.min(STOPS.length - 2, Math.floor(scaled))
      const t = scaled - i

      document.documentElement.style.setProperty('--ambient', mix(STOPS[i], STOPS[i + 1], t))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--ambient')
    }
  }, [])
}
