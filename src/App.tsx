import { Analytics } from '@vercel/analytics/react'
import { useAmbientTint } from './hooks/useAmbientTint'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Intro } from './components/layout/Intro'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './sections/Hero'
import { Statement } from './sections/Statement'
import { Location } from './sections/Location'
import { About } from './sections/About'
import { Projects } from './sections/Projects'
import { ImpactBand } from './components/ui/ImpactBand'
import { Thread } from './components/layout/Thread'
import { Stack } from './sections/Stack'
import { Contact } from './sections/Contact'

/**
 * Uma página só (RF-01). A ordem das seções é a ordem do PRD:
 * quem é → por que confiar → o que entregou → o que domina → como falar.
 */
export default function App() {
  useAmbientTint()
  useSmoothScroll()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>

      <Intro />
      <Thread />
      <Header />
      <main>
        <Hero />
        <Statement />
        <About />
        <ImpactBand />
        <Projects />
        <Stack />
        <Location />
        <Contact />
      </main>
      <Footer />

      {/*
        Medição de audiência (RF-09 / D-05). Sem cookie e sem banner, que é o
        que o RNF-10 exige: o pacote não toca em `document.cookie` nem em
        `localStorage`, e o script que a Vercel serve só cria cookie se alguém
        chamar `va('enableCookie')` — comando que não existe dentro do pacote e
        que este projeto não chama. **Não chamar:** é o único jeito de este
        componente passar a criar cookie e derrubar o RNF-10.
      */}
      <Analytics />
    </>
  )
}
