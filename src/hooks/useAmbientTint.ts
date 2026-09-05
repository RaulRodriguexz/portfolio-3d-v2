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
/**
 * D-57 — dois jogos de paradas, um por tema.
 *
 * **Este hook era o bloqueador do modo escuro.** Ele escreve `--ambient` com um
 * `rgb()` absoluto, e o `<html>` faz `background-color: var(--ambient,
 * var(--color-canvas))`. O fallback só valeria se a variável não existisse — e
 * com o hook rodando ela existe sempre. Sem os dois jogos, o M-10
 * sobrescreveria o fundo em claro a cada quadro de rolagem, para sempre, e o
 * tema escuro simplesmente não pintaria: sem erro, sem aviso, com build verde.
 *
 * ⚠ **Dependência da frente 7 (o botão), medida e não suposta:** `apply()` só
 * roda em evento de scroll. Quem alternar o tema **parado no topo** não vê o
 * fundo mudar até rolar. Na carga normal isso não aparece, porque o script
 * inline da frente 6 define o `data-theme` antes do React montar e o primeiro
 * `apply()` já lê o tema certo — mas o botão **tem** de forçar um reapply ao
 * alternar. Medido em 06/09: com o tema trocado em `scroll: 0`, o `--ambient`
 * ficou em `rgb(251 251 254)`, a parada clara.
 *
 * As paradas escuras saem da faixa fixada no adendo do D-44,
 * `oklch(0.19 0.02 303.724)` e vizinhas — **fundo escuro com um toque da matiz
 * da marca, nunca preto puro**, porque roxo saturado sobre preto absoluto causa
 * halation: a cor parece vibrar nas bordas e cansa a vista.
 */
const PARADAS = {
  claro: [
    { r: 251, g: 251, b: 254 }, // canvas
    { r: 248, g: 245, b: 252 }, // lilás muito lavado
    { r: 249, g: 250, b: 253 }, // neutro frio
  ],
  escuro: [
    { r: 22, g: 18, b: 27 }, // oklch(0.19 0.02 303.724)
    { r: 28, g: 20, b: 37 }, // oklch(0.21 0.035 303.724) — o lilás do escuro
    { r: 20, g: 17, b: 25 }, // oklch(0.185 0.018 303.724) — mais frio
  ],
}

type Parada = (typeof PARADAS)['claro'][number]

function mix(a: Parada, b: Parada, t: number) {
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

      // lido a cada quadro em vez de observado: ler um dataset é mais barato
      // que manter um MutationObserver, e reage ao toggle sozinho
      const stops =
        document.documentElement.dataset.theme === 'dark' ? PARADAS.escuro : PARADAS.claro

      // p em [0,1] percorrendo as três paradas
      const scaled = p * (stops.length - 1)
      const i = Math.min(stops.length - 2, Math.floor(scaled))
      const t = scaled - i

      document.documentElement.style.setProperty('--ambient', mix(stops[i], stops[i + 1], t))
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // D-44 frente 7 — sem isto, trocar de tema parado no topo não repinta:
    // `apply()` só roda em evento, e o botão não gera scroll
    window.addEventListener('tema:mudou', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('tema:mudou', onScroll)
      if (frame) cancelAnimationFrame(frame)
      document.documentElement.style.removeProperty('--ambient')
    }
  }, [])
}
