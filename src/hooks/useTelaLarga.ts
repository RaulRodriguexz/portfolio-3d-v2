import { useEffect, useState } from 'react'

/**
 * A ÚNICA definição de "tela pequena" do projeto (D-69).
 *
 * 640 px é o limiar que o `useCanRender3D` já usava para não montar a cena 3D.
 * Ele passou a morar aqui para ser **um número só**: dois números para o mesmo
 * conceito é como nascem telas em que o 3D já saiu e o fio ainda está lá.
 */
export const LARGURA_MINIMA = 640

/**
 * Diz se a tela é larga o bastante para o que só faz sentido numa coluna
 * larga — hoje, o fio roxo do D-37 / M-25 e o ponto do M-28.
 *
 * **Acompanha o resize, e o `useCanRender3D` não.** A diferença é de propósito
 * e não descuido: o limiar é o mesmo, o que muda é *quando* cada um pergunta.
 * O fio nasce da geometria MEDIDA da página e já se remede a cada resize
 * (`ResizeObserver` no `<body>` mais o `resize` da janela), então a decisão de
 * existir tem de chegar pelo mesmo caminho — arrastar a janela de 1440 para
 * 360 px precisa desmontá-lo, senão ele segue se redesenhando numa largura em
 * que a margem que ele costura não existe mais. Uma cena 3D não tem esse
 * problema, porque não se reconstrói a partir do texto; trocar o critério dela
 * seria outra decisão, e não é esta.
 *
 * Custo: um listener de `matchMedia`, que só acorda ao cruzar o limiar — não
 * é um handler de resize contínuo.
 */
export function useTelaLarga() {
  const [larga, setLarga] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${LARGURA_MINIMA}px)`)
    const aplicar = () => setLarga(media.matches)

    aplicar()
    media.addEventListener('change', aplicar)
    return () => media.removeEventListener('change', aplicar)
  }, [])

  return larga
}
