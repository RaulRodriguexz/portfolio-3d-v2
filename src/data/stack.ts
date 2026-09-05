/**
 * Conteúdo aprovado em docs/CONTENT.md (03/09/2026).
 * Agrupado por uso, não por "nível de proficiência" — nada de barra de 80%.
 */

export type StackGroup = {
  label: string
  /** Uma frase dizendo o que você resolve com esse grupo. */
  summary: string
  items: string[]
}

export const stackGroups: StackGroup[] = [
  {
    label: 'AI & Agents',
    summary: 'Turning language models into systems that **actually do work**.',
    items: ['LLM APIs', 'RAG', 'OpenAI API', 'AI support assistants'],
  },
  {
    label: 'Automation',
    summary: 'Taking repetitive work **off the calendar**.',
    items: ['Python', 'n8n', 'API integrations', 'Document data extraction'],
  },
  {
    label: 'Data',
    summary: 'Getting from raw records **to a decision**.',
    items: ['pandas', 'scikit-learn', 'Machine learning'],
  },
  {
    label: 'Web',
    summary: 'Shipping the interface that makes the **work visible**.',
    items: [
      'JavaScript',
      'TypeScript',
      'React / Next.js',
      'Tailwind',
      'Three.js',
      'Cloudflare Workers',
    ],
  },
]

/** Linha discreta no fim da seção — aparece para filtro de currículo sem diluir o foco. */
export const alsoStudied = 'Also studied: Java, C++, C#'
