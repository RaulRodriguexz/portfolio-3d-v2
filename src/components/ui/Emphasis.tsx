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
export function Emphasis({ text }: { text: string }) {
  const partes = text.split('**')
  if (partes.length < 3) return <>{text}</>

  const [antes, trecho, ...resto] = partes
  return (
    <>
      {antes}
      <strong className="font-bold text-primary-deep">{trecho}</strong>
      {resto.join('**')}
    </>
  )
}
