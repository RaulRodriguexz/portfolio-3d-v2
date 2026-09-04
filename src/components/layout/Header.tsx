import { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from './Container'
import { navItems } from '../../data/nav'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'

/**
 * RF-02 — header fixo.
 *
 * Três comportamentos, todos com função e nenhum decorativo:
 *  • esconde ao descer e volta ao subir — devolve a tela para o conteúdo, e
 *    reaparece no instante em que a pessoa demonstra que quer navegar;
 *  • marca a seção que está sendo lida;
 *  • barra fina de progresso, para dar noção de quanto falta.
 *
 * A barra e o esconde/mostra escrevem direto no DOM via ref, sem passar por
 * state: acontecem a cada quadro de scroll.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const lastY = useRef(0)

  const ids = useMemo(() => navItems.map((i) => i.id), [])
  const active = useActiveSection(ids)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)

      // progresso de leitura
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) {
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
      }

      // esconde descendo, mostra subindo — só depois de sair do hero
      const el = header.current
      if (el) {
        const goingDown = y > lastY.current
        el.style.transform = goingDown && y > 400 ? 'translateY(-100%)' : 'translateY(0)'
      }
      lastY.current = y
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      ref={header}
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-300 ${
        scrolled ? 'border-b border-line/70 bg-surface/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      {/*
        `wide` de propósito (D-42): o hero usa `Container wide`, e sem isto o
        header ficava numa largura máxima menor. A 1440 px as duas coincidiam
        por acaso — ambas presas ao padding — mas a 1920 px davam 60 px de
        diferença à esquerda e 64 px à direita. Duas bordas quase iguais são
        piores que duas claramente diferentes: é o que se lê como "torto".
      */}
      <Container wide className="relative flex h-16 items-center justify-between">
        {/* marca: um laptop desenhado em SVG em vez de emoji — emoji muda de
            desenho a cada sistema operacional e não aceita a cor da paleta */}
        <a
          href="#top"
          aria-label={`${profile.name} — back to top`}
          className="group -ml-1 inline-flex items-center gap-2.5 p-1 transition-opacity hover:opacity-80"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-primary-deep"
          >
            <rect
              x="3.2"
              y="4.6"
              width="17.6"
              height="11.4"
              rx="1.8"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M1.6 18.6h20.8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* cursor piscando dentro da tela — o único detalhe animado da marca */}
            <rect x="6.6" y="8" width="4.6" height="1.5" rx="0.75" fill="currentColor" opacity="0.45" />
            <rect x="6.6" y="11.2" width="2.6" height="1.5" rx="0.75" fill="currentColor">
              <animate
                attributeName="opacity"
                values="1;1;0;0;1"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
          <span className="font-mono text-sm tracking-tight text-ink">
            {profile.name.split(' ')[0]}
            <span className="text-primary-deep">.</span>
          </span>
        </a>

        {/*
          Centrada no container por posicionamento absoluto, não por
          `justify-between`: com três itens de larguras diferentes, o do meio
          só fica no centro por coincidência. A ordem no DOM continua
          marca → navegação → ação, que é a ordem visual (RNF-06).
        */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 sm:flex"
          aria-label="Main"
        >
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative text-sm transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
                {/* sublinhado que cresce a partir do centro */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px w-full origin-center bg-primary-deep transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center">
          {/* âncora, não botão: o header é fino e continua fino (D-42) */}
          <a
            href="#contact"
            className="group -mr-1 hidden items-center gap-1.5 p-1 text-sm text-primary-deep transition-opacity hover:opacity-75 sm:inline-flex"
          >
            {profile.ctaLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>

          <button
            type="button"
            className="-mr-2 p-2 text-sm text-muted sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line/70 bg-surface/95 backdrop-blur-md sm:hidden"
          aria-label="Mobile"
        >
          <Container wide className="flex flex-col py-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={`py-3 text-sm transition-colors ${
                  active === item.id ? 'text-primary-deep' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/*
              D-42 — no mobile o CTA não cabe ao lado do botão Menu sem apertar
              a marca, então ele vira o último item do menu, destacado por cor e
              por uma linha acima. Continua sendo um caminho de contato a um
              toque, que é o que a decisão pede.
            */}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center gap-1.5 border-t border-line/60 py-3 text-sm text-primary-deep"
            >
              {profile.ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
          </Container>
        </nav>
      )}

      {/* barra de progresso de leitura */}
      <span
        ref={bar}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary-deep"
      />
    </header>
  )
}
