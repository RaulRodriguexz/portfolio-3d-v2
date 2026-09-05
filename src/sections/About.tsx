import { Section } from '../components/layout/Section'
import { useReveal } from '../hooks/useReveal'
import { EmptyState } from '../components/ui/EmptyState'
import { profile } from '../data/profile'
import { Emphasis } from '../components/ui/Emphasis'

/** Seção 2 do PRD — responde "por que confiar nele?". */
export function About() {
  return (
    <Section id="about" eyebrow="About" title="How I work" meta={profile.sectionMeta.about}>
      {/*
        D-52 (a) — a citação abre a seção, em corpo maior que os parágrafos e
        menor que o `h2`. Contraste ENTRE blocos: cinco parágrafos do mesmo
        tamanho continuam cinco parágrafos do mesmo tamanho, por mais colorido
        que seja o trecho dentro de cada um.
      */}
      <p className="mb-10 max-w-[34rem] text-xl font-normal leading-snug text-ink sm:text-2xl">
        <span aria-hidden="true" className="text-primary-deep">
          “
        </span>
        {profile.aboutQuote}
        <span aria-hidden="true" className="text-primary-deep">
          ”
        </span>
      </p>

      {profile.about.length === 0 ? (
        <EmptyState step="Passo 2" file="src/data/profile.ts → about" />
      ) : (
        <div className="max-w-[36rem] space-y-5 text-base leading-relaxed text-muted">
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
      <Emphasis text={text} />
    </p>
  )
}
