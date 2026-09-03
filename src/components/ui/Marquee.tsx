type Props = {
  items: string[]
  /** Segundos para uma volta completa. Maior = mais lento. */
  duration?: number
}

/**
 * Fita rolando com as tecnologias.
 *
 * A faixa é duplicada e a animação translada exatamente -50%: no instante em
 * que a primeira cópia termina de sair, a segunda está no lugar dela, então o
 * loop não tem emenda visível.
 *
 * A cópia duplicada fica fora da árvore de acessibilidade — o leitor de tela
 * não pode ouvir a lista duas vezes.
 */
export function Marquee({ items, duration = 42 }: Props) {
  const track = [...items, ...items]

  return (
    <div
      className="relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div
        className="flex w-max animate-[marquee_var(--marquee-duration)_linear_infinite] gap-10 will-change-transform motion-reduce:animate-none"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-sm uppercase tracking-[0.16em] text-muted/70"
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`@keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }`}</style>
    </div>
  )
}
