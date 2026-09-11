import { Analytics } from '@vercel/analytics/react'
import { useAmbientTint } from './hooks/useAmbientTint'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useTelaLarga } from './hooks/useTelaLarga'
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
  const telaLarga = useTelaLarga()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary-deep focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Skip to content
      </a>

      <Intro />

      {/*
        D-69 — o fio roxo não existe abaixo de 640 px.

        Ele foi construído a partir da geometria medida dos rótulos das seções
        (D-37 / M-25) para costurar uma coluna LARGA, serpenteando na margem que
        sobra ao lado do texto. Num viewport de 360 px essa margem não existe, a
        curva se achata contra a coluna, e o que era um traço passando por trás
        do conteúdo vira um risco vertical atravessando o texto. O mesmo desenho,
        em outra largura, deixa de ser o mesmo desenho.

        **Não montar, não esconder por CSS.** `display: none` deixaria de pé o
        `ResizeObserver`, o `rAF` do scroll e o cálculo do caminho a partir da
        geometria: trabalho contínuo no aparelho mais fraco para desenhar o que
        ninguém vê. É a lição do D-62 e do D-63 — o custo não é o que aparece, é
        o que roda.

        O ponto de luz do M-28 sai junto, e não por simetria: ele lê a ponta do
        próprio `<path>` com `getPointAtLength`, então sem fio ele não tem de
        onde ler e viraria um ponto solto flutuando.

        O grão (D-36) FICA no celular — é `body::before`, CSS puro, textura e
        não movimento, e não disputa espaço com o texto. O
        `prefers-reduced-motion` continua desligando o fio em qualquer largura;
        esta regra é adicional àquela, não a substitui.
      */}
      {telaLarga && <Thread />}

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
