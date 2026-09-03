import { Container } from './Container'
import { useReveal } from '../../hooks/useReveal'

type Props = {
  id: string
  /** Rótulo curto acima do título — dá ritmo à página. */
  eyebrow?: string
  title: string
  children: React.ReactNode
}

/**
 * Casca padrão de toda seção: âncora, espaçamento, cabeçalho e
 * animação de entrada (RF-08). Nenhuma seção define isso por conta própria.
 */
export function Section({ id, eyebrow, title, children }: Props) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id={id} className="scroll-mt-20 border-t border-line/60 py-20 sm:py-28">
      <Container>
        <div ref={ref} className="reveal">
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary-deep">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {children}
        </div>
      </Container>
    </section>
  )
}
