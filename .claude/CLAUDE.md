# Memória do projeto — portfolio-3d-v2

Lido automaticamente pelo Claude Code sempre que este repositório é aberto.
É a memória permanente do projeto. Curto e verdadeiro; nada de aspiração.

## O que é este projeto

Portfólio pessoal do Raul Rodrigues (RaulRodriguexz). Página única, **tema
claro**, com uma cena 3D no hero. O objetivo é converter recrutador ou cliente
B2B em contato dentro de 90 segundos — não impressionar tecnicamente.

**Documentos que mandam, nesta ordem:**

1. `docs/PRD.md` — escopo, requisitos numerados (RF/RNF), o que está fora, log
   de decisões. Se um pedido conflita com o PRD, **aponte o conflito antes de
   escrever código**.
2. `docs/WORKFLOW.md` — os dez passos e o prompt pronto de cada um.
3. `docs/CONTENT.md` — o texto do site, em rascunho, antes de virar dado.
4. `docs/BACKLOG.md` — onde toda ideia nova espera a v2.

## Stack (travada — não trocar sem registrar no log do PRD)

- Vite 8 · React 19 · TypeScript
- React Three Fiber (`@react-three/fiber`) + `@react-three/drei`
- Tailwind CSS v4 — o tema mora em `src/index.css`, dentro de `@theme`.
  **Não existe `tailwind.config.js` neste projeto.**
- Deploy: Vercel, automático a partir da `main`

## Regras de código

1. **Conteúdo nunca é escrito no JSX** (RF-03). Todo texto, projeto, link e item
   de stack vive em `src/data/`. Componente só consome.
2. **Uma cena 3D, só no hero.** Nada de canvas em outras seções.
3. **Nada de `.glb`, física, pós-processamento ou shader customizado.** O
   elemento central do hero é o **Memoji do Raul como textura** num plano dentro
   da cena R3F, com geometria roxa em volta (PRD 5.2). Se pedirem laptop 3D,
   avatar `.glb` ou vídeo na cena, isso é v2 — aponte a seção 6 do PRD antes de
   codar.
4. **Tudo que importa `three` entra por `React.lazy`**, nunca em import estático
   no caminho principal (RNF-02, RNF-03).
5. **Seções usam o componente `<Section>`.** Não recriar espaçamento à mão.
6. **Cores só pelos tokens do `@theme`.** Nada de hex solto no `className`.
   Tokens: `canvas` (fundo), `surface` (cards), `line` (bordas), `ink` (texto),
   `muted` (secundário), `primary` (roxo suave, decorativo), `primary-deep`
   (roxo forte — links, botões e todo texto colorido).
   `primary` fica em 4,6:1 sobre o fundo: **para texto pequeno use sempre
   `primary-deep`**.
7. **Pesos de fonte: só 300, 400 e 700.** A Sansation não tem 500 nem 600 —
   `font-medium` e `font-semibold` viram peso sintético e ficam borrados.
8. **Componente acima de ~150 linhas deve ser quebrado.**
9. **Comentários em português; texto visível no site em inglês.**
10. **Acessibilidade não é opcional** (RNF-06): foco visível, contraste AA,
    canvas com `aria-hidden`, ordem de tabulação seguindo a ordem visual.

## Protocolo de trabalho

- **Um passo por sessão.** Os passos estão em `docs/WORKFLOW.md`.
- **Antes de escrever código,** diga em até 3 linhas o que vai mudar e em quais
  arquivos, e **espere a confirmação do Raul**.
- Não toque em arquivo fora da lista do passo. Se precisar, peça.
- Ideia nova durante a sessão: anote em `docs/BACKLOG.md` e volte ao passo.

## Como validar antes de dizer que terminou

```bash
npm run build     # sem erro e sem warning
npm run preview   # abrir e olhar em 360 px e 1440 px
```

Checar também: console limpo, texto do hero aparecendo antes do canvas, e o site
utilizável com o WebGL desligado.

## Fora de escopo (não implementar sem pedido explícito)

Mundo 3D navegável, câmera controlada pelo scroll, qualquer `.glb`, blog, CMS,
backend, login, formulário de contato, alternância PT/EN, alternância de tema,
seção Serviços, cursor customizado, preloader, testes automatizados.

Exceção: **Vercel Analytics é permitido** e faz parte da v1 (RF-09, decisão
D-05). Nenhum outro rastreador — o site não pode criar cookies (RNF-10).

## Estado atual

**O site está pronto. Falta publicar.**

Passos 1 a 9 concluídos (o 9 sem o `@vercel/analytics`, que depende da conta).
Movimento M-1 a M-20 entregue. Auditoria do Passo 8 rodada em 03/09: zero erro
de console, zero overflow em 360/768/1024/1440, um único `<h1>`, todas as
âncoras com destino, todo `target="_blank"` com `rel="noreferrer"`, canvas com
`aria-hidden`, zero cookies.

Bundle inicial: **70 KB gzip**. `three` num chunk separado de 184 KB, carregado
depois, compartilhado pelas duas cenas.

**Falta, e depende do Raul:** criar o repositório no GitHub, registrar o
domínio, importar na Vercel, ligar o `@vercel/analytics`, e a revisão do inglês
por uma pessoa fluente (RNF-09).

**Próximo passo: Passo 10 — deploy.**
