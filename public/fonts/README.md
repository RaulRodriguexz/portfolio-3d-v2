# Fontes self-hospedadas

Feito na D-62 (a), 07/09/2026. Este arquivo previa o passo desde 03/09,
quando dizia "trocar para self-hosting é item do BACKLOG"; deixou de ser
item de backlog e virou o que está aqui.

## O que tem nesta pasta

| Arquivo | O que é |
|---|---|
| `sansation-400.woff2` | Sansation regular, subset `latin` — 6,8 KB |
| `sansation-700.woff2` | Sansation bold, subset `latin` — 7,1 KB |
| `OFL.txt` | a licença, que é a condição para redistribuir |

## Licença

SIL Open Font License 1.1 — © 2011 Bernd Montag, com Reserved Font Name
"Sansation". Redistribuir os binários é permitido **desde que a licença
viaje junto**, e é por isso que o `OFL.txt` está nesta pasta e não numa
gaveta de documentação. O Reserved Font Name só proíbe reusar o nome numa
versão **modificada**; estes arquivos são os originais do Google Fonts,
sem alteração, então o nome continua correto.

## Por que só duas faces

O `<link>` antigo pedia seis: `ital,wght@0,300;0,400;0,700;1,300;1,400;1,700`.
A varredura do código antes de escolher — que é o que a D-62 mandou fazer em
vez de presumir — achou `font-bold` 12 vezes, `font-normal` 4 vezes,
**nenhum itálico** e **nenhum uso real do 300**: a única ocorrência de
`font-light` estava dentro de um comentário do `src/index.css`. O
`public/404.html` usa os mesmos 400 e 700.

## Por que só o subset `latin`

O Google serve a Sansation em quatro subsets. Os outros três — cyrillic,
greek e latin-ext — não têm nenhum caractere que este site use. O `latin`
cobre U+00C0–00FF, então os acentos do português estão dentro. Os dois
caracteres do site fora dessa faixa são `→` (U+2192) e `⚠` (U+26A0); o
segundo só aparece em comentário, e o primeiro **a Sansation não tem em
nenhum subset**, então ele já vinha da fonte de sistema antes desta
mudança e continua vindo.

## Como trocar ou acrescentar uma face

1. Pegue a URL do `.woff2` no `css2` do Google **com User-Agent de navegador
   moderno** — com UA antigo ele devolve `.ttf`, que é 3× maior.
2. Confira a assinatura: os quatro primeiros bytes têm de ser `wOF2`
   (`774f4632` em hex). Um HTML de erro salvo com nome `.woff2` passa
   despercebido até alguém abrir o site.
3. Declare em `@font-face` no `src/index.css`, com `font-display: swap`.
4. `preload` no `index.html` **só se a face for usada acima da dobra** —
   preload de face não usada é peso morto e o navegador avisa no console.
5. `crossorigin` é obrigatório no preload mesmo sendo o mesmo domínio:
   fonte sempre viaja em modo CORS, e sem isso o arquivo é baixado duas vezes.

## O que não fazer

Não volte a apontar para `fonts.googleapis.com`. A folha de lá é
**render-blocking em outro domínio** — 825 ms medidos antes da primeira
pintura no celular, que foi metade do motivo da nota 68 do Lighthouse. E o
site deixou de fazer qualquer chamada a serviço do Google, o que combina com
a promessa de zero cookies do D-05.
