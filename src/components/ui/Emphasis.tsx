/**
 * D-38 — ênfase tipográfica que vem do dado, não do JSX (RF-03).
 *
 * Um par de `**` marca o trecho destacado. **No máximo um por parágrafo:**
 * dois destaques na mesma frase anulam um ao outro, e o olho volta a não ter
 * onde pousar. Sempre `primary-deep` — `primary` fica em 4,6:1 e a regra 6 do
 * CLAUDE.md o proíbe em texto pequeno.
 *
 * Se houver mais de um par, só o primeiro vira destaque e o resto é devolvido
 * intacto: a regra não some texto da tela por causa de um asterisco a mais.
 */
/**
 * `comFundo` distingue os dois contextos, e a distinção é a regra do D-53: o
 * marca-texto do D-52 vale só para **prosa corrida**. Em grade, etiqueta e
 * rodapé a ênfase é cor mais peso, sem fundo — quatro caixas de grade com
 * fundo colorido viram painel manchado, e o destaque deixa de destacar.
 */
export function Emphasis({ text, comFundo = true }: { text: string; comFundo?: boolean }) {
  const partes = text.split('**')
  if (partes.length < 3) return <>{text}</>

  const [antes, trecho, ...resto] = partes
  return (
    <>
      {antes}
      {/*
        D-52 (b) — marca-texto atrás do trecho. `box-decoration-clone` faz o
        fundo e o arredondamento se repetirem em cada linha quando o destaque
        quebra, em vez de virar uma faixa só cortada ao meio. O `-mx-1`
        devolve o espaço que o `px-1` tomou, para o texto não desalinhar.
      */}
      <strong
        className={
          comFundo
            ? 'box-decoration-clone -mx-1 rounded-[3px] bg-primary/15 px-1 font-bold text-primary-deep'
            : 'font-bold text-primary-deep'
        }
      >
        {trecho}
      </strong>
      {resto.join('**')}
    </>
  )
}
