import { useState } from 'react'

/** Deslocamento do círculo que morde o disco, por tema. */
const MORDIDA = { claro: 'translate(10px, -9px)', escuro: 'translate(-5.5px, -4px)' }

/**
 * D-44, frente 7 — o botão de tema.
 *
 * **Um desenho só que se transforma**, não dois ícones trocados: o disco é
 * recortado por uma máscara cujo círculo desliza para dentro e morde a borda,
 * virando crescente, enquanto os raios recolhem. Sol e lua são o mesmo objeto.
 *
 * **Nunca emoji.** Emoji é desenhado pelo sistema, chega com a cor assada
 * dentro e ignora `currentColor` — ou seja, não trocaria de cor no tema
 * escuro, que é justamente a função deste botão.
 *
 * **A transição vive no ÍCONE, nunca no fundo.** O tom ambiente do M-10
 * reescreve a cor de fundo a cada quadro de rolagem; uma transição no
 * `background` arrastaria essa cor e a página inteira ficaria com um rastro
 * durante o scroll.
 *
 * Sem sombra macia e sem relevo: neumorfismo briga com a linguagem chapada do
 * site e com a legibilidade de um controle de ação.
 */
export function ThemeToggle() {
  const [escuro, setEscuro] = useState(
    () => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark',
  )
  const semMovimento =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const alternar = () => {
    const proximo = !escuro
    setEscuro(proximo)

    const html = document.documentElement
    if (proximo) {
      html.dataset.theme = 'dark'
      html.style.colorScheme = 'dark'
    } else {
      delete html.dataset.theme
      html.style.colorScheme = ''
    }
    try {
      localStorage.setItem('tema', proximo ? 'dark' : 'light')
    } catch {
      // janela privada: o tema vale para esta sessão e não persiste
    }

    /**
     * ⚠ Sem isto o botão não pinta nada até a pessoa rolar. O `useAmbientTint`
     * só recalcula `--ambient` em evento de scroll, e é ele quem manda no fundo
     * do `<html>` (D-57).
     *
     * É evento próprio, e não um `scroll` sintético, de propósito: um scroll
     * falso também diria ao globo que a pessoa rolou e zeraria o `livre` do
     * D-55, fazendo o planeta parar de girar e se arrumar sozinho só porque
     * alguém trocou de tema.
     */
    window.dispatchEvent(new Event('tema:mudou'))
  }

  const transicao = semMovimento ? 'none' : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={escuro}
      aria-label="Dark theme"
      className="-mr-1 inline-flex items-center p-1 text-muted transition-colors duration-200 hover:text-primary-deep"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <mask id="mordida-do-tema">
          <rect width="24" height="24" fill="white" />
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="black"
            style={{ transform: escuro ? MORDIDA.escuro : MORDIDA.claro, transition: transicao }}
          />
        </mask>

        <circle cx="12" cy="12" r="6.2" fill="currentColor" mask="url(#mordida-do-tema)" />

        <g
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          style={{
            opacity: escuro ? 0 : 1,
            transform: escuro ? 'scale(0.35)' : 'scale(1)',
            transformOrigin: 'center',
            transition: semMovimento ? 'none' : `${transicao}, opacity 220ms ease-out`,
          }}
        >
          <path d="M12 1.6v2.2M12 20.2v2.2M1.6 12h2.2M20.2 12h2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M19.4 4.6l-1.6 1.6M6.2 17.8l-1.6 1.6" />
        </g>
      </svg>
    </button>
  )
}
