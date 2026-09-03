# WORKFLOW — método de execução

**Versão 2.0 — 03/09/2026**

A v1 não falhou por falta de código. Falhou por falta de **pedido pequeno,
delimitado e verificável**. Este documento é o antídoto: as regras, o ciclo, e os
dez prompts prontos para copiar e colar no Claude Code.

---

## 1. As cinco regras

1. **Um passo por sessão.** Abriu o Claude Code, executou um passo, testou,
   commitou, fechou. Passo pela metade não vira commit.
2. **Todo pedido cita o PRD.** "Faz o hero bonito" é um pedido ruim. "Implemente
   o RF-06 e a seção 5.2 do PRD, só o hero" é um pedido bom.
3. **O plano vem antes do código.** Todo prompt aqui termina exigindo que o
   Claude descreva o que vai mudar e espere sua confirmação. Essa é a linha mais
   importante do documento — é ela que transforma um gerador de código em um par
   que pensa antes de mexer.
4. **Ideia nova vai para `docs/BACKLOG.md`,** nunca para a branch atual. Anotar
   custa 10 segundos; refazer custa uma semana.
5. **Se `npm run build` não passa, o passo não terminou.** Sem exceção.

---

## 2. O ciclo de cada passo

```bash
# 1. Branch com o nome do passo — nunca trabalhe direto na main
git checkout main && git pull
git checkout -b passo-4-cena-3d

# 2. Abra o Claude Code na raiz do projeto
claude

#    Cole o prompt do passo (seção 4 deste documento).
#    Confirme o plano. Só então deixe ele escrever código.

# 3. Verifique com os próprios olhos
npm run dev          # abra em 360 px e em 1440 px
npm run build        # tem que passar limpo, sem warning

# 4. Commit descritivo, referenciando o requisito
git add -A
git commit -m "feat(hero): cena 3D com o Memoji (RF-06, PRD 5.2)"

# 5. Merge só depois do build verde
git checkout main && git merge passo-4-cena-3d
git push
```

**Convenção de commit:** `tipo(escopo): o que mudou (RF-xx)`.
Tipos: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`.

---

## 3. Anatomia de um bom prompt

Todos os prompts da seção 4 seguem esta estrutura. Entender **por que** cada
bloco existe é o que vai te permitir escrever os seus depois.

| Bloco | Para que serve |
|---|---|
| **Contexto** | Força a leitura do PRD e do `CLAUDE.md` antes de qualquer suposição. Sem isso, o modelo inventa convenções próprias |
| **Objetivo** | Uma frase. Se você não consegue escrever em uma frase, o passo está grande demais |
| **Requisitos atendidos** | Amarra o trabalho a um `RF-xx`/`RNF-xx`. É o que permite recusar um pedido fora de escopo depois |
| **Escopo desta sessão** | A lista fechada do que fazer. Tudo que não está aqui, não se faz |
| **Fora de escopo agora** | O bloco mais subestimado. Sem ele, o modelo "melhora" coisas que você não pediu e o diff explode |
| **Arquivos que podem ser tocados** | Limita o raio de dano. Se o Claude precisar de outro arquivo, ele tem que pedir |
| **Critério de aceite** | Como você vai saber que terminou, em termos observáveis — não em termos de sentimento |
| **Protocolo** | "Descreva o plano e espere confirmação." Sempre por último, para ser a última instrução lida |

---

## 4. Os dez passos, com os prompts prontos

Cada passo é uma sessão. Não pule, não junte dois.

---

### ✅ Passo 1 — Identidade visual *(concluído em 03/09/2026)*

Paleta e tipografia aplicadas nos tokens do `@theme`, em `src/index.css`.
Contraste conferido. Nada a fazer.

---

### Passo 2 — Conteúdo do perfil

**Este passo é escrita, não código.** É o mais difícil e o mais importante do
projeto: um site bonito e vazio não converte ninguém. Faça primeiro no
`docs/CONTENT.md`, em rascunho, sem se preocupar com formato.

Só depois de ter o texto escolhido é que você abre o Claude Code:

```
Contexto: leia docs/PRD.md (seções 2, 3, 5.1 e 7) e .claude/CLAUDE.md antes de
qualquer coisa. O conteúdo aprovado está em docs/CONTENT.md.

Passo 2 — Conteúdo do perfil
Objetivo: transferir o conteúdo aprovado do CONTENT.md para os arquivos de dados,
sem inventar nem reescrever nada.
Requisitos atendidos: RF-03, seção 7 do PRD.

Escopo desta sessão:
- preencher src/data/profile.ts: headline, subheadline, location, availability,
  about e links, exatamente com o texto que está no CONTENT.md
- remover os placeholders que aparecem quando os campos estão vazios
- apontar para mim qualquer campo do CONTENT.md que esteja ambíguo ou faltando,
  em vez de preencher por conta própria

Fora de escopo agora:
- reescrever, "melhorar" ou traduzir o meu texto
- mexer em projects.ts, stack.ts ou em qualquer componente
- qualquer alteração visual

Arquivos que podem ser tocados:
- src/data/profile.ts

Critério de aceite:
- npm run build passa sem erro
- nenhum texto de placeholder visível no hero nem na seção Sobre
- o texto na tela é idêntico ao do CONTENT.md, palavra por palavra

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### Passo 3 — Hero (ainda sem 3D)

```
Contexto: leia docs/PRD.md (seções 4, 5.1 e 5.4) e .claude/CLAUDE.md.

Passo 3 — Acabamento do hero, ainda sem cena 3D
Objetivo: deixar o hero com ritmo, hierarquia e respiro corretos em todas as
larguras, usando só o gradiente estático de fundo.
Requisitos atendidos: RF-01, RF-02, RNF-05, RNF-06.

Escopo desta sessão:
- ajustar escala tipográfica, espaçamentos e largura máxima do texto do hero
- garantir hierarquia clara: headline > subheadline > CTAs > disponibilidade
- reservar visualmente a metade direita da primeira dobra, que no Passo 4 vai
  receber a cena 3D — no desktop o texto não deve ocupar a largura toda
- revisar o header em 360 px: abertura, fechamento e área de toque do botão
- conferir foco visível por teclado nos dois CTAs
- implementar M-2 do PRD 5.2.1: headline aparecendo palavra por palavra
  (só transform e opacity, respeitando prefers-reduced-motion)

Fora de escopo agora:
- qualquer coisa de Three.js, React Three Fiber ou canvas
- tocar nas outras seções
- mudar cores ou fontes (isso foi travado no Passo 1 — PRD seção 12)

Arquivos que podem ser tocados:
- src/sections/Hero.tsx
- src/components/layout/Header.tsx
- src/components/ui/Button.tsx

Critério de aceite:
- npm run build passa sem erro
- em 360 px: sem scroll horizontal, sem texto cortado, CTAs empilhados e clicáveis
- em 1440 px: o texto ocupa no máximo a metade esquerda; a direita fica livre
- Tab percorre header → CTAs na ordem visual, com foco sempre visível

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### Passo 4 — Cena 3D com o Memoji

Pré-requisito **já resolvido**: `public/images/memoji.png` (694 × 781, 102 KB) e
`public/images/memoji.webp` (30 KB) estão no projeto.

Timebox: **duas sessões**. Depois disso, congela do jeito que estiver.

```
Contexto: leia docs/PRD.md (seção 5.2 inteira, RF-06, RNF-02, RNF-03, RNF-04) e
.claude/CLAUDE.md.

Passo 4 — Cena 3D do hero com o Memoji
Objetivo: colocar o Memoji dentro de uma cena React Three Fiber real, com
profundidade e reação ao mouse, sem atrasar o texto do hero.
Requisitos atendidos: RF-06, RNF-02, RNF-03, RNF-04, RNF-06.

Escopo desta sessão:
- criar src/components/three/ com:
  - HeroScene.tsx  — o <Canvas>, luzes e composição, export default
  - MemojiCard.tsx — o Memoji como textura em um plano, com sombra e inclinação
  - Backdrop.tsx   — geometria decorativa em volta, na paleta roxa
- carregar a cena com React.lazy a partir do Hero, nunca com import estático
- usar public/images/memoji.png como textura, com useTexture do drei
- implementar M-3, M-4 e M-5 do PRD 5.2.1: parallax no mouse com interpolação,
  leve afastamento no scroll, e anel/partículas girando devagar em volta
- não montar a cena quando: não houver WebGL, a tela for menor que 640 px, ou
  prefers-reduced-motion estiver ativo
- nesses casos, renderizar public/images/memoji.webp como <img> comum
- o canvas recebe aria-hidden="true" e pointer-events: none

Fora de escopo agora:
- qualquer modelo .glb, física, pós-processamento ou shader customizado
  (PRD seção 6 — se você achar que precisa de algum, pare e me diga por quê)
- animação ligada ao scroll
- mexer no texto do hero ou em qualquer outra seção

Arquivos que podem ser tocados:
- src/components/three/* (novos)
- src/sections/Hero.tsx (apenas para montar a cena)
- src/hooks/* (se precisar de um hook de detecção)

Critério de aceite:
- npm run build passa sem erro, e a saída mostra o chunk do three separado
- o texto do hero aparece antes de o chunk 3D carregar (conferir em 4G no DevTools)
- com o WebGL desligado, o Memoji aparece como imagem e o site continua usável
- em 360 px o canvas não é montado
- zero erro no console

Protocolo: antes de escrever qualquer código, descreva em até 5 linhas a
composição da cena — posição da câmera, luzes e o que fica em volta do Memoji —
e liste os arquivos. Espere a minha confirmação.
```

---

### ✅ Passo 5 — Cards de projeto *(concluído em 03/09/2026)*

```
Contexto: leia docs/PRD.md (seções 5.1, 7 e RF-04) e .claude/CLAUDE.md. O
conteúdo dos projetos está aprovado em docs/CONTENT.md.

Passo 5 — Cards de projeto
Objetivo: criar o componente de card e publicar de 3 a 5 projetos reais.
Requisitos atendidos: RF-03, RF-04, RNF-06.

Escopo desta sessão:
- criar src/components/ui/ProjectCard.tsx
- ordem dos blocos dentro do card, sem alterar: título → problema de negócio →
  o que foi construído → impacto → stack → links
- o campo "impacto" recebe destaque visual (cor primary-deep)
- preencher src/data/projects.ts com o conteúdo do CONTENT.md
- renderizar em grid de 2 colunas no desktop e 1 no mobile
- links de repositório e demo abrem em nova aba, com rel="noreferrer"
- se algum projeto do CONTENT.md estiver sem o campo de impacto, me avise em vez
  de inventar um

Fora de escopo agora:
- página própria por projeto, modal, filtro ou ordenação (PRD seção 6)
- imagens de capa — ficam para depois, se sobrar tempo
- mexer no hero ou na cena 3D

Arquivos que podem ser tocados:
- src/components/ui/ProjectCard.tsx (novo)
- src/components/ui/Tag.tsx (novo, se precisar)
- src/sections/Projects.tsx
- src/data/projects.ts

Critério de aceite:
- npm run build passa sem erro
- todo card exibe um impacto que descreve resultado, não funcionalidade
- em 360 px os cards empilham sem estourar a largura
- o EmptyState não aparece mais nessa seção

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### ✅ Passo 6 — Stack *(concluído em 03/09/2026)*

```
Contexto: leia docs/PRD.md (seção 5.1, bloco 4) e .claude/CLAUDE.md.

Passo 6 — Seção de stack
Objetivo: mostrar as ferramentas agrupadas por uso, de forma que um recrutador
ache as palavras-chave dele em cinco segundos.
Requisitos atendidos: RF-03, RNF-06.

Escopo desta sessão:
- preencher src/data/stack.ts com quatro grupos: AI & Agents, Automation, Data,
  Web — cada um com uma frase dizendo o que se resolve com ele
- renderizar os itens como tags, reaproveitando o componente Tag
- grid de 2 colunas no desktop, 1 no mobile

Fora de escopo agora:
- barra de proficiência, porcentagem, nota ou estrela — proibido pelo PRD
- ícone de cada tecnologia (fica para o backlog)
- qualquer outra seção

Arquivos que podem ser tocados:
- src/data/stack.ts
- src/sections/Stack.tsx
- src/components/ui/Tag.tsx

Critério de aceite:
- npm run build passa sem erro
- os quatro grupos aparecem com a frase de contexto
- nenhuma métrica de proficiência na tela
- o EmptyState não aparece mais nessa seção

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### ✅ Passo 7 — Contato e CV *(concluído em 03/09/2026)*

```
Contexto: leia docs/PRD.md (seção 5.1 bloco 5, RF-05) e .claude/CLAUDE.md.

Passo 7 — Seção de contato
Objetivo: tornar trivial falar comigo a partir de qualquer ponto da página.
Requisitos atendidos: RF-03, RF-05, RNF-06.

Escopo desta sessão:
- mover a chamada final do Contact.tsx para src/data/profile.ts (RF-03)
- preencher a URL do LinkedIn
- garantir que o botão de CV aponta para /cv.pdf e baixa de verdade
- estados de hover e foco visíveis em todos os links da seção

Fora de escopo agora:
- formulário de contato, backend, captcha, newsletter (PRD seção 6)
- qualquer outra seção

Arquivos que podem ser tocados:
- src/data/profile.ts
- src/sections/Contact.tsx

Critério de aceite:
- npm run build passa sem erro
- clicar em "Download CV" baixa o PDF
- nenhum texto visível escrito direto no Contact.tsx
- todos os links da seção são alcançáveis por Tab, com foco visível

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### ✅ Passo 8 — Responsividade e acessibilidade *(auditado em 03/09/2026, sem erros)*

```
Contexto: leia docs/PRD.md (RNF-05, RNF-06, RNF-11) e .claude/CLAUDE.md.

Passo 8 — Auditoria de responsividade e acessibilidade
Objetivo: garantir que o site funciona em qualquer tela e para quem não usa mouse.
Requisitos atendidos: RNF-05, RNF-06, RNF-11.

Escopo desta sessão:
- auditar o site inteiro em 360, 768, 1024 e 1440 px e corrigir o que quebrar
- garantir hierarquia correta de headings (um único h1, h2 por seção)
- alt text em todas as imagens; aria-hidden no que é decorativo
- área de toque mínima de 44 px em todos os elementos clicáveis no mobile
- conferir contraste de todo texto sobre todo fundo
- ordem de tabulação seguindo a ordem visual
- eliminar qualquer warning do console

Antes de corrigir, me entregue a lista do que encontrou, separada em
"quebrado" e "melhoria opcional". Eu escolho o que entra.

Fora de escopo agora:
- redesenhar qualquer seção
- adicionar funcionalidade nova

Arquivos que podem ser tocados:
- qualquer um em src/, desde que a mudança conste na lista que eu aprovei

Critério de aceite:
- npm run build passa sem erro nem warning
- nenhuma das quatro larguras tem scroll horizontal
- o site inteiro é navegável só com Tab, com foco sempre visível
- console limpo

Protocolo: primeiro a auditoria, em lista. Sem escrever código. Espere eu
escolher o que corrigir.
```

---

### ◐ Passo 9 — SEO, preview social e analytics *(parcial — falta o @vercel/analytics e o domínio final)*

```
Contexto: leia docs/PRD.md (RNF-07, RNF-09, RNF-10, RF-09) e .claude/CLAUDE.md.

Passo 9 — SEO, preview social e medição
Objetivo: fazer o link ser encontrável no Google e apresentável quando colado no
WhatsApp e no LinkedIn.
Requisitos atendidos: RF-09, RNF-07, RNF-10.

Escopo desta sessão:
- title e meta description finais, derivados da headline do profile.ts
- Open Graph e Twitter Card completos, com a URL final do domínio
- criar public/robots.txt e public/sitemap.xml
- instalar e ativar o @vercel/analytics (RF-09)
- confirmar que nenhum cookie é criado (RNF-10)
- favicon próprio em public/favicon.svg

Pré-requisitos que eu forneço: public/og.png em 1200x630 e o domínio final.

Fora de escopo agora:
- Google Analytics, Tag Manager, pixel de rede social — proibidos pelo RNF-10
- qualquer mudança visual

Arquivos que podem ser tocados:
- index.html
- public/robots.txt, public/sitemap.xml, public/favicon.svg (novos)
- src/main.tsx (apenas para o componente de Analytics)

Critério de aceite:
- npm run build passa sem erro
- opengraph.xyz mostra o card corretamente
- aba Application → Cookies vazia
- Lighthouse SEO ≥ 90

Protocolo: antes de escrever qualquer código, liste em até 3 linhas o que vai
mudar e em quais arquivos. Espere a minha confirmação.
```

---

### Passo 10 — Deploy e lançamento

```
Contexto: leia docs/PRD.md (RNF-01, RNF-08 e a seção 10 inteira) e
.claude/CLAUDE.md.

Passo 10 — Deploy e verificação final
Objetivo: publicar na Vercel e percorrer a definição de pronto do PRD.
Requisitos atendidos: RNF-01, RNF-08.

Escopo desta sessão:
- me guiar na criação do repositório no GitHub e na importação pela Vercel
- conferir a configuração de build (Vite detectado, comando e diretório corretos)
- me guiar no apontamento do domínio e na confirmação do HTTPS
- rodar o Lighthouse na URL de produção e me entregar os quatro números
- percorrer comigo, item por item, a checklist da seção 10 do PRD, marcando o
  que passou e listando o que falta

Fora de escopo agora:
- qualquer alteração de código que não seja para corrigir um item reprovado
  na checklist

Critério de aceite:
- push na main publica sozinho em menos de 2 minutos
- Lighthouse mobile ≥ 80 / 90 / 90 / 90
- todos os itens da seção 10 do PRD marcados

Protocolo: conduza um item por vez, esperando eu confirmar cada um antes de
seguir para o próximo.
```

---

## 5. Prompts auxiliares

Use quando precisar, fora do fluxo dos dez passos.

### Revisar antes de commitar

```
Revise o diff atual (git diff) contra docs/PRD.md e .claude/CLAUDE.md.
Aponte, em lista:
1. qualquer coisa fora do escopo do passo que eu pedi
2. qualquer violação das regras de código do CLAUDE.md
3. texto escrito direto no JSX que deveria estar em src/data/ (RF-03)
4. cor ou tamanho fora dos tokens do @theme
Não corrija nada ainda. Só a lista.
```

### Investigar um bug

```
Sintoma: <o que eu vejo acontecer>
Esperado: <o que deveria acontecer>
Onde: <navegador, largura de tela, passo a passo para reproduzir>

Antes de propor qualquer correção, me dê as duas hipóteses mais prováveis da
causa e como distinguir uma da outra. Não altere arquivo nenhum ainda.
```

### Cortar um componente que cresceu demais

```
O arquivo <caminho> passou de 150 linhas (limite do CLAUDE.md).
Proponha como quebrá-lo, sem mudar comportamento nenhum:
- quais componentes extrair e por quê
- o que vai para src/components/ui/ e o que fica na seção
Só a proposta. Espere eu aprovar antes de mexer.
```

### Registrar uma ideia sem perder o foco

```
Adicione ao final de docs/BACKLOG.md, na seção "Ideias novas":
- <data> — <ideia em uma linha>. Motivo: <por que eu quis>.
Não faça mais nada. Volte imediatamente para o passo em que estávamos.
```

---

## 6. Quando você travar

Sinais de que o passo está grande demais:

- o Claude mexeu em mais de cinco arquivos
- o build quebrou duas vezes seguidas
- você não consegue explicar em uma frase o que mudou
- você está aceitando código que não entendeu

**O procedimento:** `git checkout .`, apaga tudo, quebra o passo em dois e
recomeça pelo menor. Jogar 40 minutos fora é mais barato que arrastar um projeto
quebrado por três semanas — foi exatamente isso que aconteceu na v1.

E se a vontade for de adicionar mais uma coisinha: `docs/BACKLOG.md`. Sempre.
