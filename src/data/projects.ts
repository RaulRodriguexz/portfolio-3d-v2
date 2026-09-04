/**
 * Conteúdo aprovado em docs/CONTENT.md (03/09/2026), decisão D-14 do PRD:
 * três projetos na v1 — um em destaque, dois compactos.
 *
 * Regra: se você não consegue escrever `impact`, o projeto não entra no site.
 */

export type Project = {
  id: string
  title: string
  /** O problema na língua do cliente, não na do dev. */
  problem: string
  /** O que você construiu. Uma ou duas frases. */
  solution: string
  /** O resultado. Número sempre que possível. */
  impact: string
  stack: string[]
  repo?: string
  demo?: string
  /** Capa 1200×630 em public/images/projects/ */
  cover?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: 'cover-letter-assistant',
    title: 'Cover Letter Assistant',
    problem:
      'Job seekers rewrite the same cover letter dozens of times and stop tailoring it per company — which is exactly what makes an application land.',
    solution:
      'A live tool: a static front end talking to a Cloudflare Worker that prompts the OpenAI API. No server to maintain, no API key exposed in the browser.',
    impact:
      'Turns a 30-minute writing task into under a minute, at effectively zero hosting cost.',
    stack: ['JavaScript', 'OpenAI API', 'Cloudflare Workers'],
    demo: 'https://raulrodriguexz.github.io/cover-letter-api',
    featured: true,
  },
  {
    id: 'titanic-ml',
    title: 'Titanic ML',
    problem:
      'Before claiming to work with machine learning, I wanted a public, reproducible result instead of a certificate.',
    solution:
      'A full pipeline — exploratory analysis, feature engineering, model comparison and validation — with every decision documented in the README.',
    impact: '0.78 on Kaggle, with the reasoning written down end to end.',
    stack: ['Python', 'scikit-learn', 'pandas'],
    repo: 'https://github.com/RaulRodriguexz/titanic-machine-learning',
  },
  {
    id: 'this-site',
    title: 'This site',
    problem:
      'A PDF CV doesn’t prove someone can ship. A portfolio that is itself a working product does.',
    solution:
      'Built from a written product spec: React, React Three Fiber and Tailwind, with the 3D scene code-split so the content renders before the WebGL bundle loads.',
    impact:
      '70 KB of JavaScript before the 3D loads — and fully usable with WebGL switched off.',
    stack: ['React', 'TypeScript', 'React Three Fiber', 'Tailwind'],
    repo: 'https://github.com/RaulRodriguexz/portfolio-3d-v2',
  },
]
