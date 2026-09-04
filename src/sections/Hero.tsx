import { Container } from '../components/layout/Container'
import { WordReveal } from '../components/ui/WordReveal'
import { HeroHalo, HeroStage } from '../components/three/HeroVisual'
import { profile } from '../data/profile'

/**
 * Seção 1 do PRD — layout de cantos (decisão D-22).
 *
 * Nome ancorado no canto superior esquerdo, função no canto superior direito, e
 * o Memoji ocupando o centro da dobra. Texto centralizado verticalmente parece
 * indeciso; texto ancorado nos cantos cria uma moldura e deixa o meio livre para
 * a cena respirar.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[94vh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      <HeroHalo />

      <Container wide className="relative z-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
          {/* canto superior esquerdo — quem é */}
          <div>
            <p className="mb-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary-deep sm:text-xs sm:tracking-[0.2em]">
              {profile.location}
            </p>
            <h1 className="text-[3.1rem] font-bold leading-[0.96] tracking-tight sm:text-[4.4rem] lg:text-[5.4rem]">
              <WordReveal text={profile.name} stagger={110} />
            </h1>
          </div>

          {/* canto superior direito — o que faz */}
          <p className="shrink-0 font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-muted sm:max-w-[13ch] sm:pt-2 sm:text-right sm:text-sm">
            {profile.role}
          </p>
        </div>
      </Container>

      {/* D-41 — o palco ocupa a altura que sobra: não pode colidir com o texto */}
      <HeroStage />

      {/* dica de scroll */}
      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        aria-hidden="true"
      >
        <span className="block h-12 w-px animate-[scrollHint_2.4s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-primary to-transparent" />
        <style>{`@keyframes scrollHint {
          0%, 100% { opacity: 0.25; transform: scaleY(0.6); transform-origin: top; }
          50%      { opacity: 1;    transform: scaleY(1);   transform-origin: top; }
        }`}</style>
      </div>
    </section>
  )
}
