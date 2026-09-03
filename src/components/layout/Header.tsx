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
      <Container className="flex h-16 items-center justify-between">
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

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Main">
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

        <button
          type="button"
          className="-mr-2 p-2 text-sm text-muted sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line/70 bg-surface/95 backdrop-blur-md sm:hidden"
          aria-label="Mobile"
        >
          <Container className="flex flex-col py-2">
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
