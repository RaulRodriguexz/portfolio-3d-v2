import { Container } from './Container'
import { useReveal } from '../../hooks/useReveal'
import { sectionNumber } from '../../data/nav'

type Props = {
  id: string
  /** Rótulo curto acima do título — dá ritmo à página. */
  eyebrow?: string
  title: string
  /**
   * Coluna curta de metadados à direita (D-32). Só as seções cuja metade
   * direita ficava vazia recebem; sem ela o corpo continua em coluna única.
   */
  meta?: string[]
  children: React.ReactNode
}

/**
 * Casca padrão de toda seção: âncora, espaçamento, cabeçalho e
 * animação de entrada (RF-08). Nenhuma seção define isso por conta própria.
 *
 * A numeração do rótulo (D-33) é derivada do `id` contra a ordem canônica em
 * `data/nav.ts` — nenhuma seção passa número à mão, então a contagem não sai
 * de sincronia quando a ordem da página mudar.
 */
export function Section({ id, eyebrow, title, meta, children }: Props) {
  const ref = useReveal<HTMLDivElement>()
  const numero = sectionNumber(id)

  return (
    <section id={id} className="scroll-mt-20 border-t border-line/60 py-20 sm:py-28">
      <Container>
        <div ref={ref} className="reveal">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-deep">
              {numero && `${numero} / `}
              {eyebrow}
            </p>
          )}
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {meta ? (
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
              <div>{children}</div>
              <ul className="space-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted lg:pt-1 lg:text-right">
                {meta.map((linha) => (
                  <li key={linha}>{linha}</li>
                ))}
              </ul>
            </div>
          ) : (
            children
          )}
        </div>
      </Container>
    </section>
  )
}
