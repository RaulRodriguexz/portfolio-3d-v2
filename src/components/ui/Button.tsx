import { useMagnetic } from '../../hooks/useMagnetic'

type Props = {
  href: string
  children: React.ReactNode
  variant?: 'solid' | 'ghost'
  external?: boolean
}

const styles = {
  solid:
    'bg-primary-deep text-white hover:bg-primary hover:text-white',
  ghost:
    'border border-line text-ink hover:border-primary hover:text-primary-deep',
}

/**
 * O `Button` é a **ação primária** do site, e por isso é magnético (M-27): os
 * três usos são os dois CTAs do Statement e o baixar CV, todos grandes e
 * isolados. Se um dia um `Button` for para dentro de uma lista densa, o ímã
 * tem de sair antes — elemento que foge do cursor entre vizinhos próximos
 * atrapalha o clique. Menu e rodapé usam `<a>` cru justamente por isso.
 */
export function Button({ href, children, variant = 'solid', external = false }: Props) {
  const magnetico = useMagnetic<HTMLAnchorElement>()

  return (
    <a
      ref={magnetico}
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-normal transition-[color,background-color,border-color,transform] duration-200 ${styles[variant]}`}
    >
      {children}
    </a>
  )
}
