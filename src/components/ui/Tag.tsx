export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-primary hover:text-primary-deep">
      {children}
      {/*
        D-75 — o espaco existe NO TEXTO, nao no CSS. Sem ele o textContent de
        uma lista de tags vira 'JavaScriptOpenAI APICloudflare Workers', e quem
        le textContent nao e so o corretor: e o leitor de tela e o buscador.

        Espaco no fim de um trecho em linha nao e desenhado — ele fica
        pendurado no fim da linha —, entao isto nao mexe no visual. Foi
        conferido pixel a pixel. Mesmo padrao do 'Dublin, Ireland' do D-45.
      */}
      {' '}
    </span>
  )
}
