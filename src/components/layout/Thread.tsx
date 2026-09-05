import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '../../hooks/useScrollProgress'

type Ponto = { x: number; y: number }

/**
 * Converte uma sequência de pontos numa curva suave (Catmull-Rom → Bézier).
 * Sem isto o fio seria uma poligonal de cantos duros entre as seções.
 */
function suavizar(p: Ponto[]) {
  if (p.length < 2) return ''
  let d = `M ${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i]
    const b = p[i]
    const c = p[i + 1]
    const e = p[i + 2] ?? c
    // tensão 1/6: o padrão da conversão Catmull-Rom para cúbica
    const c1 = { x: b.x + (c.x - a.x) / 6, y: b.y + (c.y - a.y) / 6 }
    const c2 = { x: c.x - (e.x - b.x) / 6, y: c.y - (e.y - b.y) / 6 }
    d += ` C ${c1.x.toFixed(1)} ${c1.y.toFixed(1)}, ${c2.x.toFixed(1)} ${c2.y.toFixed(1)}, ${c.x.toFixed(1)} ${c.y.toFixed(1)}`
  }
  return d
}

/**
 * D-37 / M-25 — o fio roxo.
 *
 * Nasce na cena do hero, desce passando **atrás dos números das seções** e
 * termina junto ao globo, desenhando-se conforme o scroll.
 *
 * O caminho não é um `<path>` escrito à mão: ele é gerado da geometria real da
 * página. A coluna dos números começa em 13,3% da largura a 1920 px, 4,7% a
 * 1024 px e 6,7% a 360 px — nenhuma porcentagem única acerta as três, e a
 * alternativa seria um número mágico por breakpoint. Medindo os rótulos, "atrás
 * dos números" vira verdade em qualquer largura, e o resize só remede.
 *
 * Camada: `z-index: -1` como filho do `<body>`, acima do grão (que é
 * `body::before`, mesmo nível, anterior na ordem de árvore) e abaixo de todo
 * conteúdo. Não cria contexto de empilhamento próprio.
 */
export function Thread() {
  const caminho = useRef<SVGPathElement>(null)
  const luz = useRef<SVGGElement>(null)
  const [d, setD] = useState('')
  const [altura, setAltura] = useState(0)
  const [distancia, setDistancia] = useState(1)
  const progresso = useScrollProgress(distancia)

  // mede a geometria e gera o caminho; refaz no resize
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const medir = () => {
      const doc = document.documentElement
      const topo = window.scrollY
      const alturaDoc = doc.scrollHeight
      setAltura(alturaDoc)
      setDistancia(Math.max(1, alturaDoc - window.innerHeight))

      const pontos: Ponto[] = []

      // nasce na cena do hero, que ocupa a metade direita da primeira dobra
      const hero = document.querySelector('section')
      if (hero) {
        const r = hero.getBoundingClientRect()
        pontos.push({ x: r.right - r.width * 0.26, y: r.top + topo + r.height * 0.42 })
      }

      // o fio termina no globo, e o Contact fica DEPOIS da Location — sem este
      // corte ele desceria até o Contact e voltaria para cima, cruzando a si mesmo
      const local = document.getElementById('location')
      const fimY = local ? local.getBoundingClientRect().top + topo + local.getBoundingClientRect().height * 0.55 : Infinity

      // passa pelo centro de cada rótulo numerado — o <p> antes do <h2>
      document.querySelectorAll('h2').forEach((h2) => {
        const rotulo = h2.previousElementSibling
        if (!rotulo || rotulo.tagName !== 'P') return
        const r = rotulo.getBoundingClientRect()
        const y = r.top + topo + r.height / 2
        if (y >= fimY) return
        pontos.push({ x: r.left + r.width * 0.45, y })
      })

      // termina junto ao globo, na metade direita da seção Location
      if (local) {
        const r = local.getBoundingClientRect()
        pontos.push({ x: r.right - r.width * 0.28, y: fimY })
      }

      setD(pontos.length > 1 ? suavizar(pontos) : '')
    }

    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(document.body)
    window.addEventListener('resize', medir)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  // desenha conforme o scroll, escrevendo direto no DOM: mover a página não
  // pode reconstruir árvore de React (RNF-01)
  useEffect(() => {
    const p = caminho.current
    if (!p || !d) return

    const total = p.getTotalLength()
    p.style.strokeDasharray = String(total)
    p.style.strokeDashoffset = String(total)

    let quadro = 0
    const aplicar = () => {
      quadro = 0
      const avanco = progresso.current ?? 0
      const desenhado = total * avanco
      p.style.strokeDashoffset = String(total - desenhado)

      // M-28 — o ponto sai da MESMA geometria: é a ponta do traço, lida do
      // próprio `<path>` pelo comprimento já desenhado. Nenhum segundo cálculo
      // de caminho, nenhum número mágico; se a curva mudar, o ponto acompanha.
      const g = luz.current
      if (g) {
        const ponta = p.getPointAtLength(desenhado)
        g.setAttribute('transform', `translate(${ponta.x.toFixed(1)} ${ponta.y.toFixed(1)})`)
      }
    }
    const aoRolar = () => {
      if (quadro) return
      quadro = requestAnimationFrame(aplicar)
    }

    aplicar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      if (quadro) cancelAnimationFrame(quadro)
    }
  }, [d, progresso])

  if (!d) return null

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-[1] motion-reduce:hidden"
      width="100%"
      height={altura}
      fill="none"
    >
      <path
        ref={caminho}
        d={d}
        stroke="var(--color-primary)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/*
        M-28 — o ponto de luz na ponta. Sem ele a linha termina cortada no
        vazio e lê como interrompida; com ele, lê como estando sendo desenhada.
        Mesma técnica do `OrbitSpark` do hero (M-5), aplicada a uma geometria
        que o fio já calculava.

        Ponto, não farol: 3 px de raio com um halo fraco, para não competir com
        a faixa de impacto (D-34) nem com o Memoji. Herda do `<svg>` o
        `aria-hidden`, o `pointer-events: none`, a camada e o
        `motion-reduce:hidden`.
      */}
      <g ref={luz}>
        <circle r="7" fill="var(--color-primary)" fillOpacity="0.16" />
        <circle r="3" fill="var(--color-primary-deep)" fillOpacity="0.85" />
      </g>
    </svg>
  )
}
