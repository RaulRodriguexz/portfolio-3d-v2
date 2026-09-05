import { Section } from '../components/layout/Section'
import { Button } from '../components/ui/Button'
import { CopyEmail } from '../components/ui/CopyEmail'
import { Emphasis } from '../components/ui/Emphasis'
import { profile } from '../data/profile'

/**
 * Seção 6 do PRD. Sem formulário na v1 (RF-05) — um e-mail direto converte mais
 * e não precisa de backend.
 *
 * PASSO 7 — escrever a chamada, ligar o LinkedIn e colocar o CV em public/.
 */
export function Contact() {
  const { email, github, linkedin, cv } = profile.links

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s talk" meta={profile.sectionMeta.contact}>
      <p className="max-w-[36rem] text-base leading-relaxed text-muted">
        <Emphasis text={profile.contactPitch} />
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <CopyEmail email={email} />
        <Button href={cv} variant="ghost" external>
          Download CV
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap gap-6 text-sm">
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary-deep"
        >
          GitHub
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </a>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-primary-deep"
          >
            LinkedIn
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        )}
      </div>
    </Section>
  )
}
