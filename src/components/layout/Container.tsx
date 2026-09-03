type Props = {
  children: React.ReactNode
  className?: string
}

/** Largura máxima e respiro lateral. Uma fonte de verdade só. */
export function Container({ children, className = '' }: Props) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  )
}
