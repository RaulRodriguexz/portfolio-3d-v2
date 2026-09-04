/**
 * Conteúdo aprovado em docs/CONTENT.md (03/09/2026).
 * Regra do projeto (RF-03): nenhum texto é escrito direto no JSX.
 *
 * Para mudar qualquer frase do site, é aqui.
 */

export const profile = {
  name: 'Raul Rodrigues',

  /** Linha curta de função, logo abaixo do nome no hero. */
  role: 'AI & Automation Developer',

  /** A frase mais importante do site (PRD, decisão D-12). */
  headline: 'I build systems that take repetitive work off people’s calendars.',

  subheadline:
    'A self-taught AI and automation developer. I work where things are ambiguous — turning messy problems into clear plans, then into systems that connect apps, models and APIs so **information moves on its own**. Running in production for companies in marketing, legal, transport and dental since 2025.',

  location: 'Brazil → Dublin, Ireland · October 2026',

  availability: 'Open to AI / automation roles in Dublin and to freelance projects',

  /** Seção About — uma frase por item. */
  about: [
    'I got into technology as a kid, the day a computer showed up at home. Python first, then Java, C++ and C# — and eventually the AI tools that turned curiosity into work.',
    'Since 2025 I have worked directly with company owners, and the pattern repeats: **the team is not slow, the process is**. Information gets lost between people, payments are handled by hand, and the website does not connect to anything.',
    'My job is to work where things are ambiguous: turn a messy problem into a clear plan, **and only then build**. Usually the answer is an automation, an AI assistant, or a system that finally has everything in one place.',
    'In **October 2026** I move to Dublin to study at SEDA College and keep building inside the European tech ecosystem.',
  ],

  /**
   * Coluna curta de metadados das seções cuja metade direita ficava vazia
   * (D-32). É informação, não enfeite — por isso mono, e por isso vive aqui.
   */
  sectionMeta: {
    /** About — contexto de experiência: onde ele já esteve. */
    about: ['Since 2025', 'Marketing · Legal · Transport · Dental', 'Self-taught'],
    /** Contact — o que a pessoa pode fazer agora. */
    contact: ['Dublin, IE', 'Open to roles', 'Freelance too'],
  },

  /**
   * D-34 / M-24 — o único número grande da página. Um só: dois viram painel e
   * o efeito se anula (princípio nº 3 da seção 5.2.1 do PRD).
   */
  impact: {
    count: 30,
    suffix: ' min → under a minute',
  },

  /** D-35 — o trajeto, em mono, junto das coordenadas do globo. */
  route: 'BR → IE',

  /** Chamada final da seção de contato. */
  contactPitch:
    'If your team is **losing hours every week** to something a machine should be doing, tell me about it. I’m open to roles in Dublin and to freelance work, and I read everything that arrives.',

  links: {
    email: 'raulrodrigues.mldev@gmail.com',
    github: 'https://github.com/RaulRodriguexz',
    linkedin: 'https://www.linkedin.com/in/raulrodriguexz',
    cv: '/cv.pdf',
  },
}
