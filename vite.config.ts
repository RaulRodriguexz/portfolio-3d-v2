import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// RNF-02: o Three.js vai para um chunk próprio, carregado depois do conteúdo.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // O chunk do Three.js é grande por natureza — o que importa é que ele
    // seja baixado só depois do conteúdo (HeroScene entra por React.lazy).
    chunkSizeWarningLimit: 1000,

    /**
     * D-62 (b) — tira `three` e `r3f` da lista de pré-carga do HTML.
     *
     * **O defeito que isto conserta.** O `React.lazy` sempre esteve certo e o
     * `useCanRender3D` também: abaixo de 640 px a cena nunca é montada, e o LCP
     * do celular é o `memoji.webp`, ou seja o fallback estático entra como
     * planejado. Mas o Vite escreve `<link rel="modulepreload">` no `index.html`
     * para os chunks que ele **consegue** alcançar a partir da entrada, e essa
     * dica é estática: ela não sabe que existe uma regra de 640 px morando
     * dentro de um `useEffect`. Resultado medido pelo Lighthouse: o celular
     * baixava 183 KB de `three` mais 54 KB de `r3f` antes de o React sequer
     * decidir — 202 KiB de JS não usado numa página de 372 KiB, mais 466 ms de
     * avaliação do `r3f` numa tela que não tem nada 3D.
     *
     * **Por que aqui e não no código de produto.** O empacotador é quem emite a
     * dica, então é nele que a dica se corrige. Mexer no `React.lazy` ou nas
     * cenas seria trocar código que está certo para contornar configuração que
     * está errada.
     *
     * `deps` são todos os chunks que o Vite pré-carregaria; devolver a lista
     * sem os dois faz o `modulepreload` sumir do HTML. **Nada quebra quando a
     * cena é necessária:** no desktop o `import()` do `React.lazy` continua
     * buscando os dois na hora em que a cena monta. O que se perde é a corrida
     * antecipada, que no desktop custa uma ida à rede e no celular custava
     * 237 KB por nada.
     */
    modulePreload: {
      resolveDependencies: (_url, deps) =>
        deps.filter((d) => !/[\/](three|r3f)-[^\/]*\.js$/.test(d)),
    },
    rollupOptions: {
      output: {
        codeSplitting: {
          /**
           * D-63 — a ORDEM destes grupos é o conserto, não a existência deles.
           *
           * O `react` vem primeiro de propósito. Antes havia só `three` e
           * `r3f`, e o agrupador varreu **`react-dom` e `scheduler` para dentro
           * do grupo do 3D** — o chunk chamado `r3f` não continha só
           * `@react-three`. Como o `main.tsx` precisa de `react-dom` para o
           * `createRoot`, a **entrada passou a importar estaticamente o chunk
           * `r3f`**, que por sua vez importa o `three`. Resultado medido a
           * 412 px: 237,5 KB de 3D baixados num aparelho onde o
           * `useCanRender3D` nunca monta a cena.
           *
           * **Import estático não se resolve com dica de preload**, e foi por
           * isso que a D-62 (b) não bastou: tirar o `modulepreload` mudou a
           * prioridade do download, não a existência dele. O que quebra a
           * aresta é dar à família do React um destino próprio, para o grupo 3D
           * voltar a conter só 3D.
           *
           * Os três pacotes andam juntos porque são um só grafo: o `react-dom`
           * depende de `scheduler` e de `react`, e separá-los criaria a mesma
           * aresta noutro lugar.
           *
           * **Custo assumido:** mudar fronteira de chunk troca o hash de todos
           * os arquivos afetados e invalida o cache do site inteiro. Aqui isso
           * é de graça — o site ainda não tem público. Em novembro custaria uma
           * visita lenta para todo mundo.
           */
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
            { name: 'three', test: /node_modules[\\/]three[\\/]/ },
            { name: 'r3f', test: /node_modules[\\/]@react-three[\\/]/ },
          ],
        },
      },
    },
  },
})
