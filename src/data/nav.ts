/** RF-01 / RF-02 — navegação por âncora. Ordem aqui = ordem no menu. */

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

/**
 * Ordem canônica das seções na página, para a numeração dos rótulos (D-33).
 * Não confundir com `navItems`, que é o menu: a Location não está no menu mas
 * está na contagem. Mudou a ordem aqui, a numeração acompanha sozinha — é o
 * que impede `02 / WORK` de continuar dizendo 02 depois de uma seção entrar
 * no meio.
 */
export const sectionOrder = ['about', 'projects', 'stack', 'location', 'contact']

/** Devolve `01`, `02`... para o id, ou null se a seção estiver fora da contagem. */
export function sectionNumber(id: string): string | null {
  const i = sectionOrder.indexOf(id)
  return i < 0 ? null : String(i + 1).padStart(2, '0')
}
