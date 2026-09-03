import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { WordReveal } from '../components/ui/WordReveal'
import { useReveal } from '../hooks/useReveal'
import { profile } from '../data/profile'

/**
 * O que saiu do hero (decisão D-17): posicionamento, contexto e CTAs.
 *
 * Aparece com o scroll — a headline palavra por palavra quando o bloco entra na
 * tela, o resto em cascata logo atrás. É o segundo tempo da leitura: o hero diz
 * quem é, este bloco diz o que ele resolve e o que fazer a respeito.
 */
export function Statement() {
  const ref = useReveal<HTMLDivElement>(0.2)

  return (
    <section className="border-t border-line/60 py-24 sm:py-32">
      <Container>
        <h2 className="max-w-[18ch] text-[2.1rem] font-bold leading-[1.08] tracking-tight sm:text-[3rem] lg:text-[3.4rem]">
          <WordReveal text={profile.headline} whenVisible stagger={65} />
        </h2>

        <div ref={ref} className="reveal" style={{ transitionDelay: '420ms' }}>
          <p className="mt-9 max-w-[52ch] text-base leading-relaxed text-muted sm:text-lg">
            {profile.subheadline}
          </p>

          <div className="mt-11 flex flex-wrap gap-4">
            <Button href="#projects">See the work</Button>
            <Button href="#contact" variant="ghost">
              Get in touch
            </Button>
          </div>

          <p className="mt-9 font-mono text-xs text-muted">{profile.availability}</p>
        </div>
      </Container>
    </section>
  )
}
