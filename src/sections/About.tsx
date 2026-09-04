import { Section } from '../components/layout/Section'
import { useReveal } from '../hooks/useReveal'
import { EmptyState } from '../components/ui/EmptyState'
import { profile } from '../data/profile'

/** Seção 2 do PRD — responde "por que confiar nele?". */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="How I work">
      {profile.about.length === 0 ? (
        <EmptyState step="Passo 2" file="src/data/profile.ts → about" />
      ) : (
        <div className="max-w-[68ch] space-y-5 text-base leading-relaxed text-muted">
          {profile.about.map((paragraph, i) => (
            <Paragraph key={paragraph.slice(0, 24)} text={paragraph} index={i} />
          ))}
        </div>
      )}
    </Section>
  )
}

/** Cada parágrafo entra por conta própria, escalonado — a leitura ganha ritmo. */
function Paragraph({ text, index }: { text: string; index: number }) {
  const ref = useReveal<HTMLParagraphElement>(0.2)
  return (
    <p ref={ref} className="reveal" style={{ transitionDelay: `${index * 110}ms` }}>
      {text}
    </p>
  )
}
