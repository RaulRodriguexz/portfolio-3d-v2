/**
 * Conteúdo aprovado em docs/CONTENT.md (03/09/2026), decisão D-14 do PRD:
 * três projetos na v1 — um em destaque, dois compactos.
 *
 * **D-21 (12/09): são QUATRO.** O quarto é o único trabalho pago do site;
 * os três primeiros são projetos pessoais. Isto rompe a conta do D-14:
 * a grade dos compactos tem duas colunas e agora são três compactos,
 * então **um card fica sozinho na última linha**. Medido e relatado ao
 * Raul; a escolha entre reorganizar a grade e promover um segundo card
 * a destaque é dele, e até lá a grade fica como está.
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
      'Job seekers rewrite the same cover letter dozens of times and stop tailoring it to each company — which is exactly what makes an application land.',
    solution:
      'A live tool: a static front end talking to a Cloudflare Worker that prompts the OpenAI API. No server to maintain, no API key exposed in the browser.',
    impact:
      'Cuts a 30-minute writing task to under a minute, at effectively zero hosting cost.',
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
      '138 KB over the wire on a phone: the 3D bundle never downloads there. Fully usable with WebGL switched off.',
    stack: ['React', 'TypeScript', 'React Three Fiber', 'Tailwind'],
    repo: 'https://github.com/RaulRodriguexz/portfolio-3d-v2',
  },
  {
    /**
     * D-21 — o único card de trabalho PAGO do site, e por isso o mais
     * importante dos quatro: os outros três são projetos pessoais, e um
     * portfólio de AI Solutions Engineer sem prova de cliente mostra estudo,
     * não entrega.
     *
     * **Sem `repo` e sem `demo`, de propósito:** é código de cliente e não é
     * público. É o único card sem link, e o `ProjectCard` já omite o bloco
     * inteiro quando não há nenhum dos dois — não sobra rótulo vazio.
     */
    id: 'ai-automation-smbs',
    title: 'AI automation for four companies',
    problem:
      'Leads were sitting unanswered for up to two weeks. By the time anyone replied the enquiry had gone cold — the delay was costing the sale, not just the hours.',
    solution:
      'AI automation across the channels the leads actually arrive on — email, WhatsApp Business, a chatbot and the spreadsheets the team already lived in — so an enquiry gets picked up, sorted and routed without anyone watching an inbox.',
    impact:
      'Leads that used to wait up to two weeks are now picked up and routed automatically.',
    stack: ['Python', 'n8n', 'OpenAI API', 'WhatsApp Business'],
  },
]
