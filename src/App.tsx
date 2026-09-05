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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-white"
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
    </>
  )
}
