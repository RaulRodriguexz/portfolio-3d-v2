type Props = {
  children: React.ReactNode
  className?: string
  /**
   * Largura estendida, só para o hero (D-31): o nome e a função chegam mais
   * perto das bordas reais da tela do que o resto do site, o que é o que dá ao
   * layout de cantos do D-22 a sensação de moldura.
   */
  wide?: boolean
}

/** Largura máxima e respiro lateral. Uma fonte de verdade só. */
export function Container({ children, className = '', wide = false }: Props) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 xl:px-16 ${
        wide ? 'max-w-[104rem]' : 'max-w-[96rem]'
      } ${className}`}
    >
      {children}
    </div>
  )
}
