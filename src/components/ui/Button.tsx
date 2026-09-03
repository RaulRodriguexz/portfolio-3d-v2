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

export function Button({ href, children, variant = 'solid', external = false }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-normal transition-colors duration-200 ${styles[variant]}`}
    >
      {children}
    </a>
  )
}
