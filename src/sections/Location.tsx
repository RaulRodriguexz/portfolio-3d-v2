import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Container } from '../components/layout/Container'
import { useCanRender3D } from '../hooks/useCanRender3D'
import { useElementProgress } from '../hooks/useElementProgress'
import { useGlobeDrag } from '../hooks/useGlobeDrag'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/profile'
import { sectionNumber } from '../data/nav'

const GlobeScene = lazy(() => import('../components/three/GlobeScene'))

const DUBLIN_COORDS = '53.3498° N, 6.2603° W'

/** Relógio de Dublin, ao vivo. Não é enfeite: diz que ele pensa no fuso de lá. */
function DublinClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-IE', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Europe/Dublin',
        timeZoneName: 'short',
      }).format(new Date())

    setTime(format())
    const id = window.setInterval(() => setTime(format()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  // suppressHydrationWarning não é necessário aqui (não há SSR), mas o valor
  // inicial vazio evita um salto de layout no primeiro quadro
  return <span className="tabular-nums">{time || '—:—'}</span>
}

/**
 * Seção de localização. O globo gira e se aproxima de Dublin conforme a seção
 * atravessa a tela (decisão D-19).
 *
 * RNF-04: sem WebGL, no mobile, ou com `prefers-reduced-motion`, a seção some
 * inteira? Não — ela continua, sem o globo. As coordenadas e o relógio são a
 * informação; o globo é a embalagem.
 */
export function Location() {
  const section = useRef<HTMLElement>(null)
  // o arrasto escuta a seção inteira (D-29), não só o canvas
  const progress = useElementProgress(section)
  const canRender3D = useCanRender3D()
  const [attachDrag, drag] = useGlobeDrag<HTMLElement>()
  const textRef = useReveal<HTMLDivElement>(0.3)

  return (
    <section
      ref={(node) => {
        section.current = node
        attachDrag(node)
      }}
      id="location"
      className="relative flex min-h-[86vh] items-center overflow-hidden border-t border-line/60 py-24 sm:py-32"
    >
      {/* o globo ocupa a metade direita no desktop e o fundo no mobile */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full cursor-grab opacity-60 sm:w-[56%] sm:opacity-100"
        aria-hidden="true"
      >
        {canRender3D && (
          <Suspense fallback={null}>
            <GlobeScene progress={progress} drag={drag} />
          </Suspense>
        )}
      </div>

      <Container className="relative z-10">
        <div ref={textRef} className="reveal max-w-[24ch]">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-deep">
            {sectionNumber('location')} / Based in
          </p>
          <h2 className="text-[2.4rem] font-bold leading-[1.05] tracking-tight sm:text-[3.2rem]">
            Dublin,
            <br />
            Ireland
          </h2>
          <dl className="mt-8 space-y-2 font-mono text-sm text-muted">
            <div className="flex gap-3">
              <dt className="text-muted/70">coords</dt>
              <dd>{DUBLIN_COORDS}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="text-muted/70">local time</dt>
              <dd>
                <DublinClock />
              </dd>
            </div>
            {/* D-35 — o trajeto, ao lado das coordenadas: dado, não enfeite */}
            <div className="flex gap-3">
              <dt className="text-muted/70">route</dt>
              <dd className="text-primary-deep">{profile.route}</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  )
}
