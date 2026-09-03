/** RF-01 / RF-02 — navegação por âncora. Ordem aqui = ordem no menu. */

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]
