import { Container } from './Container'
import { profile } from '../../data/profile'

/**
 * Rodapé.
 *
 * É a última chance de conversão da página: quem chegou até aqui leu tudo e
 * está decidindo. Por isso ele repete os quatro caminhos de contato em vez de
 * só assinar embaixo — ninguém deve ter que rolar de volta para achar o e-mail.
 */

const LINKS = [
  { label: 'Email', href: `mailto:${profile.links.email}`, external: false },
  { label: 'LinkedIn', href: profile.links.linkedin, external: true },
  { label: 'GitHub', href: profile.links.github, external: true },
  { label: 'Download CV', href: profile.links.cv, external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-line/60 py-14">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div>
            <p className="font-mono text-sm text-ink">
              {profile.name}
              <span className="text-primary-deep">.</span>
            </p>
            <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted">
              {profile.role} · {profile.availability}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="group inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-primary-deep"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line/60 pt-6 text-xs text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono">
            Built with React, Three.js and Tailwind ·{' '}
            <a
              href="https://github.com/RaulRodriguexz/portfolio-3d-v2"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-4 transition-colors hover:text-primary-deep"
            >
              source
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
