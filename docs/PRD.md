# PRD — Portfólio de Raul Rodrigues

| | |
|---|---|
| **Versão** | 3.0 |
| **Última revisão** | 04/09/2026 |
| **Responsável** | Raul Rodrigues ([@RaulRodriguexz](https://github.com/RaulRodriguexz)) |
| **Status** | Aprovado — em execução (Passos 1 a 8 concluídos, 9 parcial) |
| **Prazo de publicação** | 10/10/2026 (embarque para Dublin: 26/10/2026) |
| **Repositório** | `portfolio-3d-v2` |

> ### ⚠️ Regra de manutenção deste documento
>
> A **seção 0** e o **changelog** são mantidos pelo Claude (Cowork), que audita
> o site em produção e a pasta `docs/`. O **Claude Code atualiza estado** —
> mover linha de "a fazer" para "concluído", marcar `✅` no inventário de
> movimento, e acrescentar o que foi de fato implementado ao final de uma
> decisão existente.
>
> **O Claude Code não reescreve nem reordena este documento**, não apaga
> decisões, não renumera IDs e não altera a estrutura das seções. Ideia nova de
> escopo vai para `docs/BACKLOG.md`, decisão nova entra ao **final** do log com
> o próximo ID livre. Se algo aqui parecer errado, **aponte em vez de
> corrigir** — três vezes em 04/09 o que parecia erro era leitura apressada, e
> uma vez o documento estava certo e o diagnóstico é que estava errado.
>
> A seção 0 já ficou obsoleta quatro vezes em dois dias. Se você entregou algo,
> **atualize o estado dela na mesma sessão** — é a única linha de manutenção
> que é sua.

> **Como ler este documento.** A seção 0 é o painel: estado atual e fila de
> trabalho. As seções 5 e 6 são o contrato: o que entra e o que não entra. A
> seção 14 é o log de decisões — nada muda sem passar por lá.
> Todo pedido de código feito ao Claude Code deve citar um `RF-xx` ou `RNF-xx`
> daqui. Se um pedido não encontra respaldo neste documento, o pedido está
> errado ou o documento está desatualizado; resolva isso antes de escrever
> código.

---

## Changelog

| Versão | Data | O que mudou |
|---|---|---|
| 3.0 | 04/09/2026 | M-22 fechado — arrasto testado à mão pelo Raul. D-38 (ênfase) e D-36 (grão) entregues (`bdf9906`); contraste medido em 7,48:1 no pior caso. `CLAUDE.md` corrigido e `PRD-1.md` apagado — as duas dívidas de documentação estão quitadas. |
| 2.9 | 04/09/2026 | D-39 e o lote D-32 a D-35 + M-24 entregues (`d7fa5dc`). Backlog recebe as duas ideias adiadas de 04/09. Corrigida a contradição entre a regra 2 do `CLAUDE.md` e a D-19. |
| 2.8 | 04/09/2026 | Auditoria medida no site em produção: sem overflow em 360–1920 px, fallback de mobile correto, mas o limite de leitura do D-31 falhou (D-39). |
| 2.7 | 04/09/2026 | D-29, D-30 e D-31 entregues e em produção (`a3755ec`). Adicionados D-36 (grão), D-37 (fio roxo), D-38 (ênfase tipográfica no conteúdo) e M-25. RNF-08 confirmado na prática. |
| 2.6 | 04/09/2026 | Revisão do site no ar. Log reordenado (D-28 estava antes do D-27). Adicionados D-29 a D-35 e M-24. RNF-05 passa a incluir 1920 px. Fila da seção 0 corrigida: itens marcados "a fazer" já tinham sido entregues. |
| 2.5 | 03/09/2026 | Site publicado na Vercel. Log de decisões reordenado por ID. Adicionados M-22, M-23 e D-23 a D-25. Criada a seção 0 (fila de trabalho). |
| 2.4 | 03/09/2026 | M-18 a M-20 (inércia, cortina de entrada, tilt). Passo 8 auditado e aprovado. CV corrigido e rodapé refeito. |
| 2.3 | 03/09/2026 | Movimento M-12 a M-16. SEO, JSON-LD, robots, sitemap, favicon e og.png prontos. Auditoria do CV (D-20). |
| 2.2 | 03/09/2026 | Seção Location com globo 3D (D-19). Movimento M-6 a M-11 entregue. Passos 5 e 6 concluídos. |
| 2.1 | 03/09/2026 | Adicionada a seção 5.2.1 (linguagem de movimento) com o inventário M-1 a M-6. RF-08 reescrito para apontar para ela. |
| 2.0 | 03/09/2026 | Revisão completa. Resolvidas 4 contradições internas (analytics, PT/EN, seção Serviços, fallback). Adicionadas: calendário com datas reais, definição de pronto para publicar, requisitos de idioma e privacidade, matriz de suporte, licenças, log de decisões. |
| 1.3 | 03/09/2026 | Hero definido como Memoji dentro de cena R3F; `.glb` volta a ser proibido. |
| 1.2 | 03/09/2026 | Hero migrado para modelo `.glb` (revertido em 1.3). |
| 1.1 | 03/09/2026 | Passo 1 executado: tema claro, paleta roxa, tipografia Sansation. |
| 1.0 | 03/09/2026 | Documento inicial. |

---

## 0. Onde estamos

> **Leia esta seção primeiro.** Ela é o painel do projeto: o que já está no ar,
> o que está sendo feito agora e o que falta. Mantenha-a atualizada ao fim de
> cada passo — é ela que impede a próxima sessão de recomeçar do zero.

**🟢 No ar:** <https://portfolio-3d-v2-gilt.vercel.app>
Repositório: <https://github.com/RaulRodriguexz/portfolio-3d-v2> · Deploy automático a partir da `main`

### Concluído

| | |
|---|---|
| **Passos 1 a 8** | identidade visual, conteúdo, hero, cena 3D, projetos, stack, contato, auditoria |
| **Passo 9** | parcial — SEO, JSON-LD, robots, sitemap, favicon e og.png prontos; falta o `@vercel/analytics` |
| **Passo 10** | parcial — repositório e deploy feitos; faltam domínio, HTTPS e Lighthouse |
| **Movimento** | M-1 a M-22 e M-24 entregues (seção 5.2.1) |
| **Qualidade** | auditoria do Passo 8 sem erros · bundle inicial 70 KB gzip · zero cookies |
| **Arrasto do globo** | D-29 e D-30 entregues — captura na `<section>`, critério a 45°, `touch-action: pan-y pinch-zoom`, inércia dobrada na `base` |
| **Largura e leitura** | D-31 e D-39 entregues — Container 96 rem, hero 104 rem, prosa em `rem` com máximo medido de 74 caracteres por linha |
| **Ritmo e densidade** | D-32 a D-35 e M-24 entregues — coluna de metadados por seção, numeração derivada do `id`, faixa de impacto, marcador `BR → IE` |
| **Ênfase e material** | D-38 e D-36 entregues — cinco destaques em `primary-deep`, um por parágrafo; grão a 2,8% com contraste medido em 7,48:1 no pior caso |
| **Produção** | `bdf9906` · deploy automático da `main` confirmado na prática (RNF-08) |

### 🔨 Em andamento

| Ordem | Item | Onde | Estado |
|---|---|---|---|
| 1 | Fio roxo ligando hero e globo (D-37 · M-25) | novo `ui/Thread.tsx`, `App.tsx` | a fazer |
| 2 | Pin de Dublin com haste (M-23, D-25) | `three/Globe.tsx` → extrair `three/Marker.tsx` | a fazer |
| 3 | `WordReveal`: `h1.textContent` sem espaço | `ui/WordReveal.tsx` | a fazer |
| 4 | Diagnóstico do `WORKFLOW.md` e do `ARCHITECTURE.md` | `docs/` | a fazer |
| 5 | Reveal palavra a palavra nos `h2` (M-26) | `layout/Section.tsx` | a fazer — **depende do item 3** |
| 6 | Links e botões magnéticos (M-27, promovido do BACKLOG) | CTAs do Statement, copiar e-mail, baixar CV | a fazer |
| 7 | Parágrafo de abertura do About em corpo maior (D-40) | `sections/About.tsx` | a fazer |

Um commit por item, com confirmação do Raul entre eles.

**Dependência entre itens 3 e 5:** aplicar o reveal aos `h2` antes de corrigir o
espaço do `WordReveal` transforma um defeito num `h1` em seis — `SelectedWork`,
`HowIwork` e os demais. O item 3 vem antes, ou no mesmo commit.

**Sob observação:** a medição cobre largura, overflow, fallback de mobile,
caracteres por linha e contraste — tudo verificado. O arrasto do globo foi
testado à mão pelo Raul em 04/09 e **funciona**; falta só o teste com **dedo**
no celular, que é o caso onde o gesto ainda pode roubar a rolagem da página. O
julgamento estético do conjunto também segue com ele. A extração do `Marker`
para arquivo próprio já está **autorizada** (regra 8 do `CLAUDE.md`).

**Limitação de ferramenta:** o conector da Vercel devolve lista vazia em
`list_projects` no time AVVIA, apesar de o projeto existir e publicar. É
permissão do conector, não do projeto. Enquanto durar, a confirmação de deploy
sai pela API do GitHub, que registra os deployments criados pela Vercel.

### ⏳ Fila depois disso

| Item | Depende de | Bloqueia |
|---|---|---|
| Teste do arrasto com **dedo** no celular (D-29) | o Raul, num aparelho real — é onde o gesto pode roubar a rolagem | — |
| Hero: o miolo abaixo do Memoji está oco — vão grande até a headline | decisão de layout junto com D-34 e D-37 | — |
| `@vercel/analytics` (RF-09) | conta na Vercel — já existe | checklist §10 |
| Domínio `raulrodrigues.dev` + HTTPS | registro do domínio pelo Raul | §10 e a URL do `og:image` |
| Lighthouse na URL de produção (RNF-01) | site no ar — já está | §10 |
| Revisão do inglês por pessoa fluente (RNF-09) | o Raul encontrar o revisor | **lançamento** |
| 4º card de projeto: B2B com geolocalização (D-21) | número de impacto que só o Raul tem | — |

### Não esquecer

- O site é **em inglês**. Se abrir traduzido, é o Chrome — use "Mostrar original".
- Abaixo de 640 px a cena 3D não é montada, de propósito. O Memoji vira imagem.
- `prefers-reduced-motion` desliga o movimento. Hoje ele desliga também as
  cenas 3D inteiras, o que é excessivo — a revisão desse comportamento é a
  **D-26**, ainda aberta.

---

## 1. Por que este documento existe

A primeira tentativa do site 3D falhou. O motivo não foi falta de capacidade
técnica — foi falta de fronteira. Sem escopo escrito, cada sessão de código
adicionava um efeito novo, o projeto nunca chegava a um estado "pronto", e o
custo de manter o que já existia cresceu até travar.

Este PRD responde três perguntas antes de qualquer linha de código:

1. O que este site precisa fazer para ser considerado um sucesso?
2. O que ele explicitamente **não** vai fazer na v1?
3. Como eu sei que terminei?

**Regra do projeto:** nada entra no código se não estiver aqui. Ideia nova vai
para `docs/BACKLOG.md`, não para a branch atual.

---

## 2. Objetivo de negócio

O site não é uma peça de arte. É um **instrumento de conversão de carreira**.

**Objetivo primário.** Fazer com que um recrutador, fundador ou cliente B2B na
Europa — foco em Dublin — entre em contato em até 90 segundos de visita, mesmo
sem o Raul ter diploma concluído.

**Objetivos secundários.**

- Provar competência técnica sem credencial formal: o próprio site é a evidência.
- Posicionar o Raul como **AI + negócio**, não como "mais um dev front-end". O
  3D chama atenção; o conteúdo tem que falar de receita, custo e automação.
- Servir de vitrine para os projetos-âncora que virão (revenue-leak detector,
  agente em Python puro), além dos já entregues.
- Estar online e estável antes de 26/10/2026.

**Não-objetivos.** Virar referência de WebGL. Ganhar prêmio de Awwwards. Ser um
showcase técnico de Three.js. Impressionar outros desenvolvedores.

---

## 3. Público-alvo

| Persona | Quem é | O que procura em 30 s | O que a faz sair |
|---|---|---|---|
| **Recrutador tech (Dublin / UE)** | Recruiter ou hiring manager de startup ou consultoria | Stack, provas de entrega, se dá para contratar sem diploma, disponibilidade e situação de visto | Site lento, sem CV, sem contato claro, inglês ruim |
| **Fundador / cliente B2B** | Dono de empresa média (jurídico, odontologia, transporte, marketing) | "Esse cara resolve o meu problema? Já fez isso para alguém como eu?" | Jargão técnico sem resultado de negócio |
| **Par técnico / comunidade** | Devs, mentores, gente de hackathon e de programas como o EEML | GitHub, qualidade de código, se o projeto é real | Projeto que não abre, repositório vazio |

**Regra de desempate:** quando impressionar visualmente conflitar com converter o
recrutador, **o recrutador ganha**.

---

## 4. Princípios do produto

1. **Conteúdo primeiro, 3D depois.** O site tem que fazer sentido com o WebGL
   desligado.
2. **Uma cena 3D, bem feita.** Não várias medianas.
3. **Toda seção responde a uma pergunta do visitante.** Se não responde, é
   decoração — corta.
4. **Performance é requisito, não otimização futura.** O recrutador abre no
   celular, no 4G, entre duas reuniões.
5. **Terminar vale mais que perfeito.** V1 no ar vale mais que v2 na cabeça.

---

## 5. Escopo da v1

### 5.1 Arquitetura de informação

Uma página, sete blocos, nesta ordem:

| # | Bloco | Pergunta que responde | Conteúdo obrigatório | Passo |
|---|---|---|---|---|
| 1 | **Hero** | "Quem é?" | Nome, função em uma linha, localização, cena 3D com o Memoji. **Nada mais** (D-17) | 3, 4 |
| 1b | **Statement** | "O que ele resolve?" | A frase de posicionamento em tipografia grande, o parágrafo de contexto, os dois CTAs e a disponibilidade — revelados no scroll | 3 |
| 2 | **Sobre** | "Por que confiar nele?" | 3 a 4 frases: autodidata, freelance para empresas reais desde 2025, foco AI + negócio, mudança para Dublin | 2 |
| 3 | **Projetos** | "O que ele já entregou?" | 3 a 5 cards: problema de negócio → o que construiu → impacto → stack → links | 5 |
| 4 | **Stack** | "Ele sabe o que eu preciso?" | Agrupado por uso: AI & Agentes, Automação, Dados, Web. Sem barra de proficiência | 6 |
| 4b | **Location** | "Onde ele está?" | Globo 3D que gira e aproxima Dublin no scroll, coordenadas e relógio local ao vivo (D-19) | extra |
| 5 | **Contato** | "Como falo com ele?" | E-mail, LinkedIn, GitHub, download do CV. Sem formulário | 7 |
| 6 | **Rodapé** | "Como falo com ele, se rolei até aqui?" | Nome, função, disponibilidade, os quatro caminhos de contato (e-mail, LinkedIn, GitHub, CV), copyright e link do repositório | ✅ |

A seção **Serviços** foi cortada da v1 (ver 6 e log de decisões D-07).

**Adição de 04/09 (D-34):** entre o bloco 1b (Statement) e o bloco 3 (Projetos)
entra uma faixa curta com **um** número de impacto em tipografia grande. Não é
uma seção nova com rótulo e título — é uma linha, sem cabeçalho, cuja função é
dar um pico de hierarquia no ponto em que a página hoje é mais monótona.

### 5.2 A cena 3D do hero

**Decisão:** o Memoji do Raul como elemento central, dentro de uma cena
React Three Fiber real. Sem modelo `.glb`.

**Fundamento.** O Memoji só existe como imagem — a Apple não exporta modelo 3D.
Mas uma imagem dentro de uma cena WebGL continua sendo 3D: tem profundidade,
sombra, iluminação, reage ao mouse e ao scroll. Custa ~100 KB em vez de 3 MB, e é
a única rota que entrega "o Raul aparece no hero" dentro do prazo.

**Especificação.**

- Uma cena única, ocupando a metade direita da primeira dobra no desktop.
- O Memoji entra como textura em um plano dentro da cena (billboard), com sombra
  projetada e leve inclinação — não é um adesivo colado sobre a página.
- Em volta dele, geometria real na paleta roxa: anel, partículas ou placas
  flutuantes, com profundidade de verdade.
- Parallax suave seguindo o mouse; leve afastamento ao rolar a página.
- Textura trocável: se um dia houver um Memoji em vídeo ou uma captura de tela
  dos projetos, troca-se a textura e a cena continua a mesma.

**Restrições duras.**

| | |
|---|---|
| Asset | `public/images/memoji.png` — 694 × 781, 102 KB, fundo transparente. Versão `.webp` de 30 KB para o fallback. **Pronto.** |
| Carregamento | A cena inteira entra por `React.lazy`. Nada de `three` no bundle inicial |
| Ordem de renderização | O texto do hero aparece e é utilizável **antes** de a cena carregar |
| Degradação | Sem WebGL, sem suporte, ou com `prefers-reduced-motion`: o mesmo PNG aparece como `<img>` comum, e o site continua 100% funcional |
| Timebox | Duas sessões. Depois disso, congela do jeito que estiver |

### 5.2.1 Linguagem de movimento

*Adicionado em 03/09/2026. O que se aproveita da referência
eric-cole.framer.website não é a aparência — é a técnica.*

**Três princípios, nesta ordem de prioridade:**

1. **Tipografia grande com muito vazio em volta.** Custa zero: é espaçamento.
   Responde por metade da sensação de "site caro".
2. **Movimento amarrado ao scroll e ao mouse**, não animação que roda sozinha.
   O elemento reage à pessoa — é isso que prende.
3. **Contenção.** Uma ideia visual, repetida. Site amador tem cinco efeitos
   brigando entre si.

**Inventário de movimento da v1** — tudo com `transform` e `opacity` apenas,
que é o que a GPU compõe de graça. Nenhuma biblioteca nova.

| # | Animação | Onde | Passo | Estado |
|---|---|---|---|---|
| M-1 | Entrada das seções em cascata ao rolar | todas as seções | — | ✅ pronto (`useReveal`) |
| M-2 | Headline aparecendo palavra por palavra | Hero | 3 | ✅ pronto (`WordReveal`) |
| M-3 | Memoji com parallax no mouse | Hero | 4 | ✅ pronto (`HeroScene` → `Rig`) |
| M-4 | Memoji se afastando levemente no scroll | Hero | 4 | ✅ pronto (`useScrollProgress`) |
| M-5 | Anel / partículas girando devagar em volta do Memoji | Hero | 4 | ✅ pronto (`Backdrop`) |
| M-6 | Brilho seguindo o cursor dentro dos cards, e hover nas tags | Projetos, Stack | 5, 6 | ✅ pronto |
| M-7 | Frase de posicionamento palavra por palavra ao entrar na tela | Statement | 3 | ✅ pronto |
| M-8 | Globo girando continuamente; após 1,5 s em repouso assenta com Dublin de frente (D-28). A aproximação segue ligada ao scroll | Location | extra | ✅ pronto |
| M-9 | Fita de tecnologias rolando em loop sem emenda | Stack | 6 | ✅ pronto |
| M-10 | Tom do fundo da página mudando de forma quase imperceptível ao rolar | global | extra | ✅ pronto |
| M-11 | Relógio de Dublin ao vivo | Location | extra | ✅ pronto |
| M-12 | Header que esconde ao descer e volta ao subir | global | extra | ✅ pronto |
| M-13 | Item do menu marcando a seção que está sendo lida | global | extra | ✅ pronto |
| M-14 | Barra fina de progresso de leitura | global | extra | ✅ pronto |
| M-15 | Parágrafos do Sobre entrando em cascata | About | extra | ✅ pronto |
| M-16 | Botão de e-mail com feedback de "copiado" | Contato | 7 | ✅ pronto |
| M-17 | Setas do rodapé avançando no hover | Rodapé | 7 | ✅ pronto |
| M-18 | Rolagem com inércia (Lenis, 6 KB) | global | extra | ✅ pronto |
| M-19 | Cortina de entrada da página | global | extra | ✅ pronto |
| M-20 | Cards inclinando 3,5° com o mouse | Projetos | extra | ✅ pronto |
| M-21 | Cursor piscando dentro do ícone de laptop do header | global | extra | ✅ pronto |
| M-22 | Globo girando por arrasto do mouse, com inércia e retorno a Dublin | Location | extra | ✅ pronto — testado à mão em 04/09, com mouse |
| M-23 | Marcador de Dublin como pin com haste, ocultado pelo globo quando gira para trás | Location | extra | 🔨 em andamento |
| M-24 | Número de impacto contando até o valor final ao entrar na tela, uma vez só | Statement → Projetos | extra | ✅ pronto |
| M-25 | Fio roxo desenhando-se ao rolar, do hero até o globo, por `stroke-dashoffset` | global | extra | ✅ pronto |

**Regras duras do movimento.**

- Só `transform` e `opacity`. Animar `width`, `height`, `top` ou `left` obriga o
  navegador a recalcular layout a cada quadro e derruba o desempenho no celular.
  **Única exceção autorizada:** `stroke-dashoffset` no fio do M-25 — é uma
  propriedade de pintura de SVG, não dispara recálculo de layout, e é a única
  forma de desenhar um traço progressivamente sem redesenhar a geometria.
- Toda animação respeita `prefers-reduced-motion` (RF-08, RNF-06).
- Nada de animação que bloqueie a leitura: o texto do hero tem que estar legível
  mesmo se o JavaScript falhar.
- **Se um efeito não está nesta tabela, ele não entra na v1.** Ideia nova de
  animação vai para `docs/BACKLOG.md`.
- **Degradar para verdade, nunca para mentira.** Todo elemento cujo estado
  animado, interpretado ou parcial carrega significado precisa de um estado de
  repouso correto. Se a animação não rodar, se o parser não casar, se o dado
  vier torto — o que sobra na tela ainda tem que ser verdade. Um contador
  parado em zero e um parágrafo com metade do texto sumida não são falhas
  estéticas, são afirmações falsas. Origem: D-34 e D-38.

### 5.3 Requisitos funcionais

| ID | Requisito | Verificação |
|---|---|---|
| **RF-01** | Página única com navegação por âncora e scroll suave | Clicar em cada item do menu leva à seção certa, sem cortar o título sob o header |
| **RF-02** | Header fixo com versão mobile funcional | Abre e fecha em 360 px; fecha ao clicar num item |
| **RF-03** | Todo conteúdo vem de `src/data/`, nunca escrito no JSX | `grep` por texto visível nos componentes não retorna nada |
| **RF-04** | Cada card de projeto abre repositório e demo em nova aba | `target="_blank"` + `rel="noreferrer"` em todos |
| **RF-05** | Download do CV em PDF | `public/cv.pdf` existe e o botão baixa |
| **RF-06** | Cena 3D do hero conforme 5.2 | Ver restrições duras acima |
| **RF-07** | Tema claro como padrão, sem alternância | Um tema só na v1 |
| **RF-08** | Movimento conforme o inventário da seção 5.2.1 (M-1 a M-6) | Só `transform`/`opacity`; todos respeitam `prefers-reduced-motion` |
| **RF-09** | Medição de audiência sem cookies | Vercel Analytics ativo em produção (ver D-05) |

### 5.4 Requisitos não-funcionais

| ID | Requisito | Meta | Como medir |
|---|---|---|---|
| **RNF-01** | Lighthouse em produção, mobile | Performance ≥ 80 · Acessibilidade ≥ 90 · Best Practices ≥ 90 · SEO ≥ 90 | pagespeed.web.dev |
| **RNF-02** | Bundle JS inicial | ≤ 150 KB gzip, com `three` em chunk próprio carregado sob demanda | Saída do `npm run build` |
| **RNF-03** | Primeiro conteúdo visível | Texto do hero renderizado antes de qualquer JS de 3D | DevTools → Network, throttle 4G |
| **RNF-04** | Degradação sem WebGL | Site 100% utilizável; o Memoji aparece como imagem estática | Desligar WebGL no navegador |
| **RNF-05** | Responsivo | Sem scroll horizontal e sem texto cortado em 360, 768, 1024, 1440 e 1920 px. Nenhuma linha de texto corrido passando de ~75 caracteres em tela larga (D-31) | DevTools responsivo |
| **RNF-06** | Acessibilidade | Navegável só com Tab; contraste AA (4.5:1 em texto normal); canvas com `aria-hidden`; foco sempre visível | WAVE + navegação por teclado |
| **RNF-07** | SEO e preview social | `<title>`, meta description, Open Graph com imagem 1200×630, `robots.txt`, `sitemap.xml` | opengraph.xyz |
| **RNF-08** | Deploy | Push na `main` publica sozinho, em menos de 2 minutos | Painel da Vercel |
| **RNF-09** | Qualidade do inglês | Zero erro de gramática ou naturalidade no texto visível | Revisão por ferramenta **e** por uma pessoa fluente |
| **RNF-10** | Privacidade | Sem cookies, sem rastreador de terceiros, sem formulário — logo, sem banner de consentimento | Aba Application → Cookies vazia |
| **RNF-11** | Console limpo | Zero erro e zero warning em produção | DevTools → Console |

### 5.5 Suporte

| | |
|---|---|
| Navegadores | Chrome, Edge, Firefox e Safari — duas últimas versões |
| Sistemas | Windows, macOS, iOS, Android |
| Telas | 360 px a 1440 px |
| Sem WebGL | Suportado por degradação (RNF-04) |
| Internet Explorer | Não suportado |

---

## 6. Fora de escopo da v1

Isto **não** será construído agora. Não abra exceção; anote em `docs/BACKLOG.md`.

**3D**

- Mundo navegável, sala virtual, câmera controlada pelo scroll.
- Qualquer modelo `.glb` — nem notebook, nem avatar.
- Física, pós-processamento (bloom, DOF), shaders customizados.
- Memoji em vídeo ou avatar animado.

**Produto**

- Seção Serviços (D-07).
- Alternância de idioma PT/EN (D-06) e alternância claro/escuro.
- Página própria por projeto / estudo de caso.
- Blog, CMS, painel administrativo.
- Formulário de contato com backend, newsletter.
- Autenticação, área logada, banco de dados.

**Enfeite**

- Cursor customizado, preloader elaborado, transições entre páginas.
- **Emoji de bandeira** em qualquer lugar do site, e **foto da Irlanda** ou de
  Dublin (D-35). A origem é sinalizada em tipografia, não em imagem.

**Engenharia**

- Testes automatizados. O projeto não tem lógica de negócio que os justifique;
  a verificação é o `npm run build` mais a checagem visual de cada passo.

---

## 7. Inventário de conteúdo

O site vazio é um site morto. Nada disto é opcional para o lançamento.

| Item | Onde vive | Status |
|---|---|---|
| Frase de posicionamento (inglês, 1 linha) | `src/data/profile.ts` | ✅ pronto |
| Subtítulo do hero | `src/data/profile.ts` | ✅ pronto |
| Texto do Sobre (3–4 frases, inglês) | `src/data/profile.ts` | ✅ pronto |
| 3 projetos com impacto declarado | `src/data/projects.ts` | ✅ pronto |
| Stack agrupada por uso | `src/data/stack.ts` | ✅ pronto |
| Chamada final de contato | `src/data/profile.ts` | ✅ pronto |
| URL do LinkedIn | `src/data/profile.ts` | ✅ pronto |
| CV em PDF, em inglês | `public/cv.pdf` | ✅ pronto — versão corrigida (D-20) |
| Memoji recortado | `public/images/memoji.png` | ✅ pronto |
| Imagem Open Graph 1200×630 | `public/og.png` | ✅ pronto — gerada com o Memoji, 59 KB |
| Favicon próprio | `public/favicon.svg` | ✅ pronto — “R” na cor da marca |
| Capas dos projetos (opcional na v1) | `public/images/projects/` | ⬜ opcional |

**Projetos candidatos.** Cover Letter API (front estático + Cloudflare Worker +
OpenAI); automações B2B para clientes, descritas por setor sem quebrar sigilo;
Titanic no Kaggle (~0.78); e este próprio site.

**Regra do card de projeto.** Se você não consegue escrever o campo `impact`, o
projeto ainda não está pronto para entrar no site. "Usei React e Tailwind" não é
impacto. "Transforma uma tarefa de 30 minutos em menos de um minuto" é.

---

## 8. Métricas de sucesso

**Métrica de saída — a única que importa de verdade:** pelo menos **3 contatos
qualificados** (recrutador, fundador ou convite) originados do site nos três
primeiros meses no ar.

**Métricas de processo**

| Métrica | Meta | Fonte |
|---|---|---|
| Site publicado e estável | até 10/10/2026 | Vercel |
| Lighthouse performance (mobile) | ≥ 80 | pagespeed.web.dev |
| Visitantes que rolam até a seção Projetos | ≥ 60% | Vercel Analytics |
| Cliques no CTA de contato | ≥ 5% das visitas | Vercel Analytics |
| Erros no console em produção | 0 | DevTools |

---

## 9. Calendário

Cinco semanas até a publicação, com 16 dias de folga antes do embarque. Um passo
por sessão; uma a duas sessões por semana já cumprem o cronograma.

| Semana | Datas | Passos | Entregável verificável |
|---|---|---|---|
| — | 03/09 | ~~Passo 1 — Identidade visual~~ | ✅ Paleta e tipografia aplicadas nos tokens |
| **1** | 04–10/09 | Passo 2 — Conteúdo do perfil | Nenhum placeholder na tela; texto em inglês |
| **2** | 11–17/09 | Passos 3 e 4 — Hero e cena 3D | Memoji na cena, reagindo ao mouse, com fallback |
| **3** | 18–24/09 | Passos 5 e 6 — Projetos e Stack | 3+ cards com impacto real; stack agrupada |
| **4** | 25/09–01/10 | Passos 7 e 8 — Contato/CV e acessibilidade | CV baixa; site navegável só por teclado |
| **5** | 02–08/10 | Passos 9 e 10 — SEO e deploy | Link publicado, card bonito no WhatsApp |
| **Folga** | 09–10/10 | Revisão de inglês e feedback | Enviado a 5 pessoas; correções aplicadas |
| — | 26/10 | Embarque para Dublin | — |

**Semanas inegociáveis:** 1 e 3. São as de conteúdo. Um site sem cena 3D
converte; um site sem projetos, não.

---

## 10. Definição de pronto para publicar

O site só é divulgado quando **todas** estas linhas estiverem marcadas. Sem
exceção, sem "depois eu arrumo".

**Conteúdo**

- [ ] Nenhum placeholder, nenhum "TODO", nenhum `EmptyState` visível
- [ ] Todos os itens da seção 7 marcados como prontos
- [ ] Todo card de projeto tem `impact` preenchido com resultado, não com feature
- [ ] Texto em inglês revisado por ferramenta **e** por uma pessoa fluente (RNF-09)

**Técnico**

- [ ] `npm run build` passa sem erro e sem warning
- [ ] Zero erro no console em produção (RNF-11)
- [ ] Lighthouse mobile ≥ 80 / 90 / 90 / 90 (RNF-01)
- [ ] Testado em 360, 768, 1024 e 1440 px sem scroll horizontal (RNF-05)
- [ ] Site inteiro navegável só com Tab, com foco visível (RNF-06)
- [ ] Testado com o WebGL desligado (RNF-04)
- [ ] Nenhum cookie criado (RNF-10)

**Publicação**

- [ ] Todos os links externos abrem e apontam para o lugar certo
- [ ] `og.png`, `favicon`, `robots.txt` e `sitemap.xml` no lugar (RNF-07)
- [ ] Preview do link conferido no WhatsApp e no LinkedIn
- [ ] Domínio apontado e HTTPS ativo
- [ ] Link enviado para 5 pessoas e feedback aplicado antes da divulgação ampla

---

## 11. Riscos

| Risco | Probabilidade | Por que acontece | Mitigação |
|---|---|---|---|
| **Escopo escorregando** | Alta | Foi o que matou a v1 | A seção 6 é lei. Ideia nova vai para `BACKLOG.md` na mesma hora |
| **Site bonito e vazio** | Alta | Escrever é mais difícil que codar | A seção 7 é bloqueante. Semanas 1 e 3 são inegociáveis |
| **Perfeccionismo na cena 3D** | Alta | Luz e posição nunca ficam "boas o bastante" | Timebox de 2 sessões no Passo 4. Depois, congela |
| **Inglês com erro no hero** | Média | Não é a língua nativa e o hero é a primeira coisa que o recrutador lê | RNF-09: revisão dupla, uma delas humana |
| **Retrabalho por prompt vago** | Média | Causa principal da falha da v1 | Prompts prontos no `WORKFLOW.md`, cada um citando RF/RNF |
| **Performance no mobile** | Média | Three.js é pesado por natureza | RNF-02 e RNF-03 conferidos a cada passo, não no fim |
| **Prazo da viagem** | Baixa | 26/10 é data fixa | Meta interna 10/10, com 16 dias de folga |
| **Perder o trabalho** | Baixa | Branch quebrada, arquivo sobrescrito | Um commit por passo; `main` só recebe merge do que buildou |

---

## 12. Decisões técnicas travadas

Mudar qualquer item exige uma razão escrita no log da seção 14 — não um impulso.

| Área | Decisão |
|---|---|
| **Stack** | Vite 8 · React 19 · TypeScript · React Three Fiber · drei · Tailwind CSS v4 |
| **Tema** | O tema mora em `src/index.css`, dentro de `@theme`. **Não existe `tailwind.config.js`** |
| **Paleta** | Fundo `#fbfbfe` · superfície `#ffffff` · texto `#000000` · secundário `#4a4a5a` · borda `#e7e4ef` · roxo suave `#8c62ac` (decorativo) · roxo forte `oklch(0.438 0.218 303.724)` = `#6e11b0` (links, botões, todo texto colorido) |
| **Tipografia** | Sansation via Google Fonts — pesos 300, 400 e 700 apenas. Mono do sistema para detalhes técnicos. **Nunca usar `font-medium` ou `font-semibold`**: a fonte não tem esses pesos e o navegador sintetiza um resultado feio |
| **Idioma** | Inglês. Sem versão em português na v1 |
| **Hero** | Memoji como textura em cena R3F, sem `.glb` |
| **Repositório** | `portfolio-3d-v2`, novo e limpo |
| **Branches** | Uma branch por passo (`passo-4-cena-3d`). `main` só recebe merge do que passou no build |
| **Deploy** | Vercel, automático a partir da `main` |
| **Analytics** | Vercel Analytics — sem cookies, sem banner |
| **Modo de trabalho** | Esqueleto e documentação montados com o Claude; cada passo executado pelo Raul no Claude Code, um por sessão |

---

## 13. Licenças e créditos

| Ativo | Origem | Situação |
|---|---|---|
| Sansation | Google Fonts | Livre para uso na web |
| Memoji | Apple, gerado pelo próprio Raul | Recurso da Apple, feito para uso dentro dos apps dela. Uso pessoal no próprio portfólio é comum, mas **não é um ativo que o Raul possui**. Se o site virar peça comercial, trocar por um avatar próprio é uma linha de código |
| Ícone da Apple no notebook do Memoji | Apple | Único logo de marca do site. Pode ser removido por retoque, se preferir |
| React, Three.js, R3F, drei, Tailwind | MIT | Livres |

---

## 14. Log de decisões

Toda mudança de rumo vive aqui, com data e motivo. É a memória do projeto.

| ID | Data | Decisão | Motivo | Status |
|---|---|---|---|---|
| **D-01** | 03/09 | Recomeçar do zero com PRD, em vez de consertar a v1 | A v1 travou por falta de escopo escrito, não por falta de código | Ativa |
| **D-02** | 03/09 | Site clássico com toques 3D, não mundo navegável | Mundo 3D é meses de trabalho e conflita com o prazo de 26/10 | Ativa |
| **D-03** | 03/09 | React + R3F em vez de Three.js puro | Ecossistema pronto para 90% do que o site precisa; menos código manual quebrando | Ativa |
| **D-04** | 03/09 | Tema claro com roxo, tipografia Sansation | Escolha do Raul. Contraste conferido: preto 20,3:1 e roxo forte 8,6:1 sobre o fundo | Ativa |
| **D-05** | 03/09 | Vercel Analytics entra na v1 | A seção 8 promete métricas de rolagem e clique; sem medição, aquelas metas eram ficção. O Vercel Analytics não usa cookies, então não exige banner na UE | Ativa |
| **D-06** | 03/09 | Sem PT/EN na v1 | O público-alvo é Dublin. A alternância dobrava o trabalho de conteúdo sem aumentar a conversão | Ativa |
| **D-07** | 03/09 | Seção Serviços cortada | Os cards de projeto já respondem "dá para contratar?". Uma seção a menos é uma semana a menos | Ativa |
| **D-08** | 03/09 | Hero com notebook 3D em `.glb` | Referência do eric-cole.framer.website | **Revertida por D-10** |
| **D-09** | 03/09 | Referência eric-cole.framer.website inspecionada | Descoberto que o site **não usa 3D**: a TV é um PNG e a tela é um `.mp4`. O efeito vem de animação de scroll, não de WebGL | Ativa |
| **D-10** | 03/09 | Hero com o Memoji como textura em cena R3F, sem `.glb` | O Memoji não existe em 3D — a Apple só exporta imagem. Textura dentro de cena WebGL entrega o mesmo efeito por 100 KB em vez de 3 MB | Ativa |
| **D-11** | 03/09 | Memoji extraído da versão de 1024 px, não da transparente de 512 | A de 512 estava cortada no topo e embaixo. O fundo `#171717` foi removido por preenchimento a partir das bordas, preservando a camiseta escura | Ativa |
| **D-12** | 03/09 | Headline: *"I build systems that take repetitive work off people's calendars"* | Frase do próprio Raul. Fala de calendário e de pessoas, não de tecnologia — a linguagem de quem contrata | Ativa |
| **D-13** | 03/09 | E-mail do site: `raulrodrigues.mldev@gmail.com` | É o que já consta no CV. Precisa bater com o Contact info do LinkedIn | Ativa |
| **D-14** | 03/09 | A v1 sobe com 3 projetos: 1 em destaque, 2 compactos | Os projetos grandes de IA virão depois do site e assumirão o destaque. O trabalho com clientes aparece como linha de credibilidade no Sobre, não como card | Ativa |
| **D-15** | 03/09 | Títulos de seção corrigidos para inglês | O site é em inglês mas quatro títulos estavam em português. Menu em inglês e conteúdo em português é erro visível na primeira dobra | Ativa |
| **D-16** | 03/09 | Criada a seção 5.2.1 — linguagem de movimento, com os 6 efeitos permitidos na v1 | O que torna a referência impressionante é técnica (tipografia grande, movimento ligado ao scroll, contenção), não estilo. Listar os efeitos permitidos evita que "mais uma animação" vire o novo vetor de escopo escorregando | Ativa |
| **D-17** | 03/09 | Hero reduzido a nome + função; posicionamento, CTAs e disponibilidade descem para uma seção `Statement` revelada no scroll | Primeira dobra com uma ideia só é o que faz o site parecer caro — era o princípio nº 3 da seção 5.2.1 aplicado ao conteúdo, não só ao movimento. O contato continua a um clique no menu fixo, então a conversão não perde caminho | Ativa |
| **D-18** | 03/09 | Memoji com `alphaTest` e `depthWrite`, e órbitas centradas em z=0 | Sem isso o recorte parecia um PNG colado. Com profundidade escrita, o trecho da órbita que passa atrás dele é ocultado de verdade — oclusão é a pista de profundidade mais forte que existe | Ativa |
| **D-19** | 03/09 | Segunda cena WebGL permitida: o globo da seção Location | A regra "uma cena só" existia por causa de peso, não por dogma. O globo reaproveita o chunk do Three.js já baixado pelo hero, e a textura dos continentes foi **gerada aqui** a partir dos contornos do Natural Earth já na cor da marca — 11 KB, contra 1–2 MB de uma foto de satélite. Custo marginal quase zero, e uma foto da Terra brigaria com a paleta. Teto fixado em duas cenas | Ativa |
| **D-20** | 03/09 | CV reescrito e corrigido | Três erros: (1) usava `raulbilu1982@gmail.com` enquanto o site usa o `.mldev`; (2) apontava para `linkedin.com/in/raul-rodrigues-6744043b1`, URL antiga e quebrada; (3) o cabeçalho dizia "Dublin, Ireland" e o perfil logo abaixo dizia "now relocating to Dublin". Corrigidos, mais dois projetos que faltavam (Cover Letter e Titanic com links) e TypeScript/RAG na lista de skills | Resolvida |
| **D-21** | 03/09 | O CV revelou material para um 4º card: "B2B Websites with Geolocation" | É trabalho pago, para cliente real, e casa com a seção do globo. Se entrar, é o card mais forte depois do Cover Letter. Falta só o número de impacto | Aberta |
| **D-22** | 03/09 | Hero em layout de cantos: nome em cima à esquerda, função em cima à direita, cena no centro. Marca do header virou um ícone de laptop | Texto centralizado verticalmente parece indeciso; ancorado nos cantos ele cria uma moldura e libera o miolo para a cena. O ícone é SVG e não emoji: emoji muda de desenho a cada sistema e não aceita a cor da paleta | Ativa |
| **D-23** | 03/09 | Container passa de 1024 px para 1280 px de largura máxima | Em telas de 1440 px ou mais, sobrava margem lateral demais e o conteúdo ficava encolhido no centro. O respiro lateral cresce junto (`lg:px-12`) para o texto não encostar na borda | **Ampliada pelo D-31** |
| **D-24** | 03/09 | Globo passa a ser arrastável com o mouse, com o usuário tendo prioridade sobre o scroll | Interação direta vale mais que animação assistida — mas os dois disputavam o mesmo eixo de rotação. Regra: o arrasto assume o controle, e após ~3 s sem interação o globo volta a apontar Dublin e devolve o comando ao scroll. No toque, só gesto horizontal é capturado, para o dedo nunca prender a rolagem da página. **Prazo revisado para 1,5 s pelo D-28**, que unificou repouso de scroll e de arrasto num carimbo só | Ativa |
| **D-25** | 03/09 | Marcador de Dublin vira pin com haste, no lugar do círculo rente à superfície | Um círculo colado na esfera some no meio dos continentes e não lê como localização. A haste resolve, e a oclusão pela esfera opaca esconde o pin sozinha quando Dublin gira para trás — mesma técnica que tirou a cara de PNG do Memoji (D-18) | Ativa |
| **D-26** | 03/09 | `prefers-reduced-motion` hoje desliga as cenas 3D inteiras, não só o movimento | A preferência pede menos MOVIMENTO, não menos conteúdo. Proposta em avaliação: montar as cenas congeladas — sem parallax, sem rotação contínua, sem reação ao scroll — em vez de removê-las. Afeta `useCanRender3D`, que governa as duas cenas (hero e globo), por isso não entra no mesmo lote das mudanças locais D-23/D-24/D-25 | Aberta |
| **D-27** | 03/09 | O movimento ocioso do globo muda de **tipo** com a proximidade, não só de intensidade: giro ao longe, oscilação de perto | Girar no eixo Y e manter Dublin de frente são objetivos incompatíveis, e nenhum piso de intensidade concilia os dois — medido: 0,06 rad/s × 0,334 de força restante dá 1,15°/s, uma volta a cada 5 minutos, abaixo do limiar de percepção. Uma fração de uma velocidade imperceptível continua imperceptível. A troca por oscilação (`sin`, ±2,6°) resolve mantendo Dublin centralizada, e segue o mesmo princípio da respiração lenta do Memoji no hero: o objeto nunca parece congelado sem sair do lugar. A velocidade base do giro sobe de 0,06 para 0,12 rad/s. Altera o M-8 | **Substituída por D-28** |
| **D-28** | 03/09 | O gatilho do "apontar Dublin" deixa de ser a POSIÇÃO do scroll e passa a ser o REPOUSO | O D-27 tratou o sintoma e errou a causa: o regime de giro livre só existia com `eased` baixo, e `eased` só é baixo quando a seção está mal entrando pela borda — quando dá para ver o globo, ele está travado; quando ele gira, ninguém está olhando. Nenhum ajuste de número conserta isso, porque a variável de controle estava errada. Girar e manter Dublin de frente são incompatíveis **quando disputam o mesmo instante**; amarrar cada um a um estado diferente — em movimento / em repouso — elimina a disputa em vez de administrá-la. Regra: gira a 0,2 rad/s continuamente, independente da posição da seção; após 1,5 s sem rolagem **e** sem arrasto, desacelera e assenta com Dublin de frente; ao voltar a rolar, retoma. Um carimbo de tempo só (`lastInteraction`, no `useGlobeDrag`) passa a governar scroll e arrasto juntos — por isso os ~3 s do D-24 caem para 1,5 s | Ativa |
| **D-29** | 04/09 | A captura do arrasto sai do `<canvas>` e passa a cobrir a área visível do globo; o critério de classificação do gesto é afrouxado | Teste no navegador: o globo só responde em algumas regiões e a algumas direções iniciais. Duas causas somadas. (1) Os listeners estão presos ao canvas, cuja caixa é menor que a área onde o globo aparenta estar — fora dela o gesto não chega a existir. (2) A classificação exige `\|dx\| > \|dy\| * 1.4` no primeiro movimento além de 8 px: um puxão levemente diagonal é marcado como `scroll` e fica morto até o `pointerup`. Nova regra: zona de captura cobrindo a seção, e critério afrouxado **sem** perder a garantia de que o gesto vertical no toque nunca é roubado da página — essa garantia é inegociável e prevalece sobre a comodidade do arrasto. **Implementado:** os listeners passaram para a `<section>` — eventos de ponteiro borbulham de qualquer descendente, então a seção inteira responde sem precisar mexer em `pointer-events` de ninguém —, o critério caiu para `|dx| > |dy|` (45°) e a seção recebeu `touch-action: pan-y pinch-zoom`. Não houve trade-off: a garantia da rolagem vertical passou a vir do `touch-action` nativo, que o navegador honra à revelia do JS, então o limiar em JS deixou de ser a defesa e virou só preferência. O `pinch-zoom` é explícito porque `pan-y` sozinho desligaria o zoom de pinça na seção toda | Ativa |
| **D-30** | 04/09 | A velocidade do gesto passa a sobreviver ao `pointerup`: soltar o globo o deixa girando e desacelerando | Hoje o movimento morre no instante em que o dedo ou o mouse solta, o que faz o globo parecer preso a um trilho em vez de ter massa. Causa provável: durante o arrasto só o `offset` se move e a `base` fica congelada, e no release a velocidade acumulada é descartada. A inércia tem de entrar **no mesmo valor de `base`** que o giro do D-28 usa; dois sistemas de movimento escrevendo em valores diferentes trazem de volta exatamente o salto que o D-28 eliminou. Depois de desacelerar, o ciclo de repouso segue igual: 1,5 s de silêncio e assenta em Dublin. **Implementado:** na borda de soltura o `offset` é dobrado dentro da `base` e a velocidade do gesto vira a velocidade angular da própria `base`, que decai até se fundir com os −0,2 rad/s do giro normal. Fora do arrasto o `offset` é sempre zero, então existe um sistema de movimento só — que é exatamente a condição que o D-28 exigia | Ativa |
| **D-31** | 04/09 | O Container vai a **96 rem** (1536 px) **e** todo texto corrido ganha limite de leitura de 68 ch. Substitui o número do D-23 | O D-23 diagnosticou certo e resolveu pela metade: alargar a casca sem limitar a prosa troca um defeito por outro. Linha acima de ~75 caracteres faz o olho perder o começo da linha seguinte — é o motivo pelo qual jornal e livro nunca usam a largura da página. Regra: cards, grades, fita de stack e rodapé usam a largura nova inteira; parágrafos ficam capados. O hero é a exceção e vai mais largo que o padrão, para o nome e a função se aproximarem das bordas reais da tela, mantendo o layout de cantos do D-22 — ficou em 104 rem, contra 96 rem do padrão. **Nota:** a faixa de 72–76 rem avaliada na redação original era menor que os 80 rem que o D-23 já tinha entregue, e teria encolhido o site; 96 rem foi a escolha do Claude Code na execução, e o Raul aprovou depois do fato. O parágrafo do Statement também foi unificado em 68 ch, abrindo mão dos 52 ch que o D-17 usava para criar tensão tipográfica — decisão consciente, em favor de uma medida de leitura só no site inteiro | Ativa |
| **D-32** | 04/09 | Seções com metade direita vazia recebem uma coluna curta de metadados em mono | Diagnóstico a partir da captura do site no ar: `How I work` e `Let's talk` ocupam uma coluna à esquerda com metade da tela morta. A coluna (`2025 — now`, `Dublin, IE`, `Open to roles`) preenche com **informação**, não com enfeite, e cria a assimetria que o D-22 já provou funcionar no hero. É a mesma técnica da referência do D-09 **Implementado:** `Section.tsx` ganhou uma prop opcional `meta`; sem ela o corpo segue em coluna única. Texto em `profile.sectionMeta` (RF-03). Nota: as duas seções recebem as mesmas três linhas, como especificado — a repetição é visível na página **Revisto:** a especificação original dava as mesmas três linhas às duas seções, e a repetição era visível na página. Diferenciadas: o About recebe contexto de experiência (`Since 2025`, as quatro indústrias, `Self-taught`) e o Contact recebe o que a pessoa pode fazer agora (`Dublin, IE`, `Open to roles`, `Freelance too`). Medida da linha mais longa em 12 px mono: **339 px**, uma linha só de 1024 px para cima; a 360 px quebra em duas, sem overflow. Custo colateral: a 1024 px a coluna espreme a prosa do About de 576 para 510 px, ou 68 caracteres — dentro do teto do D-39 | Ativa |
| **D-33** | 04/09 | Rótulos de seção ganham numeração: `01 / ABOUT`, `02 / WORK`, `03 / STACK` | A página é uma pilha de sete blocos de forma idêntica — rótulo, título, texto, respiro, repete. Minimalismo só lê como intenção quando alguma coisa marca o ritmo; a única seção que quebra o padrão hoje (o globo) é a mais bem resolvida da página, e isso não é coincidência. Custo: uma linha no `Section.tsx` e um campo no dado **Implementado:** o número é derivado do `id` contra `sectionOrder` em `data/nav.ts`, não passado à mão por seção, então a contagem não sai de sincronia se a ordem mudar. A Location entrou como `04` apesar de não usar `<Section>`, para a sequência não ter buraco. Verificado no DOM: `01 / About`, `02 / Work`, `03 / Stack`, `04 / Based in`, `05 / Contact` | Ativa |
| **D-34** | 04/09 | Um número de impacto sai de dentro do card e vira tipografia grande entre o Statement e os Projetos | "0.78 no Kaggle" e "30 minutos → menos de um minuto" hoje são texto miúdo dentro de card, ao lado de outros seis campos. Um número em corpo grande é a coisa que o recrutador leva embora da página, e é adição sem decoração: nenhum pixel novo de enfeite, só hierarquia. **Um só** — dois viram painel e o efeito se anula (princípio nº 3 da 5.2.1). Anima contando ao entrar na tela, uma vez (M-24), com largura reservada em `tabular-nums` para o número não empurrar o layout a cada quadro **Implementado:** faixa entre o About e os Projetos, uma linha, sem rótulo. `tabular-nums` com `min-w-[2ch]` — para dígitos o `ch` é a unidade correta, ao contrário do que o D-39 mostrou para prosa. Defeito encontrado na verificação e corrigido antes do commit: um salto instantâneo de âncora podia atravessar o elemento sem satisfazer o threshold, deixando `0 min → under a minute` na tela — o que não é animação inacabada, é afirmação falsa. Agora, se o elemento já passou por cima, o valor final aparece direto **Regra geral que sai daqui, e que vale além do M-24:** todo elemento cujo estado animado carrega significado precisa de um **estado de repouso correto** — se a animação não rodar, o que fica na tela ainda tem que ser verdade. Um contador parado em zero, uma revelação que não revelou, uma barra que não encheu: nenhum deles é uma animação inacabada, são afirmações falsas. O caminho mais provável para isso não é o navegador falhar, é o salto instantâneo de um link de âncora do próprio menu. Vale para qualquer contador ou revelação futura | Ativa |
| **D-35** | 04/09 | Bandeira em emoji e foto da Irlanda **rejeitadas**; a origem é sinalizada por um marcador `BR → IE` em mono, na cor da marca | Emoji muda de desenho a cada sistema operacional — no Windows a bandeira irlandesa nem renderiza, sai como "IE" — e não aceita a cor da paleta; é o mesmo motivo que fez a marca do header virar SVG no D-22. Foto da Irlanda seria o elemento mais genérico da página, brigaria com a paleta clara e competiria com o globo, que já diz "Dublin" com mais personalidade por 11 KB (D-19). A intenção — sinalizar a mudança de país — é legítima e continua atendida, no veículo certo | Ativa |
| **D-36** | 04/09 | Grão: uma textura de ruído sobre a página inteira, opacidade ~0,02, `pointer-events: none` | Fundo branco chapado é o que faz um site parecer template. O grão devolve materialidade — a página passa a ler como papel, não como tela vazia — e é o maior ganho de percepção por kilobyte disponível: ~2 KB em `data:` URI, um elemento, zero JavaScript, zero requisição. Restrições: `position: fixed` com `pointer-events: none` para nunca interceptar clique nem arrasto do globo; opacidade travada abaixo de 0,03, porque acima disso vira sujeira visível e prejudica o contraste AA do RNF-06; e o contraste do texto **tem de ser reconferido** depois de aplicado **Implementado:** o ruído é um `feTurbulence` de SVG num data: URI de ~250 bytes — **zero JS e zero requisição de rede**. Fica num `body::before` com `position: fixed`, para não repintar a cada quadro de scroll, e `z-index: -1`, para ficar **atrás do conteúdo de verdade** e não apenas incapaz de interceptar clique. Isso exigiu mover o `background-color` do `<body>` para o `<html>`, o que foi barato porque o `--ambient` do M-10 já era escrito no `<html>`. Pseudo-elemento com `content: ''` não entra na árvore de acessibilidade, o que cumpre o papel do `aria-hidden` — atributo que pseudo-elemento não aceita. Opacidade 0,028. **Contraste medido por screenshot da página renderizada**, 24.960 pixels amostrados na margem, em três posições de scroll: `muted` sobre o fundo dá 7,84 / 8,10 / 8,32:1, e o pixel mais escuro do ruído dá 7,48:1 no pior caso — contra os 4,5:1 do RNF-06. `ink` fica em 18,97:1 e `primary-deep` em 8,00:1. Nenhuma redução de opacidade foi necessária | Ativa |
| **D-37** | 04/09 | Um fio roxo único atravessa a página: nasce numa órbita do hero, desce pela lateral passando atrás dos números das seções, e termina junto ao globo. Desenha-se conforme o scroll (M-25) | Hoje a página são sete blocos que não se conhecem — é o que a torna monótona apesar de cada bloco estar correto. O fio é **uma ideia só, repetida do topo ao fim**, que é o princípio nº 3 da seção 5.2.1 aplicado ao desenho e não ao movimento, e amarra as duas cenas 3D (D-19) numa narrativa em vez de deixá-las como dois enfeites separados. Custa um `<svg>` com um `<path>` e uma variável de scroll que o projeto já tem (`useScrollProgress`). Restrições: `aria-hidden`, atrás de todo conteúdo, `pointer-events: none`, e sumir por completo sob `prefers-reduced-motion` — sem ele a página continua íntegra, porque o fio não carrega informação **Implementado:** o caminho **não é um `<path>` escrito à mão**. A coluna dos números começa em 13,3% da largura a 1920 px, 4,7% a 1024 px e 6,7% a 360 px — nenhuma porcentagem única acerta as três, e a alternativa seria um número mágico por breakpoint. Em vez disso o caminho é gerado da geometria real: mede o `<p>` do rótulo de cada seção (o irmão anterior do `<h2>`, sem atributo novo), passa uma curva Catmull-Rom pelos centros, do hero até o globo, e remede no `ResizeObserver`. Os rótulos abaixo da Location são descartados, senão o fio desceria até o Contact e voltaria para cima, cruzando a si mesmo. **Camada:** `z-index: -1` como filho do `<body>`, acima do grão (que é `body::before`, mesmo nível, anterior na ordem de árvore) e abaixo de todo conteúdo; não cria contexto de empilhamento próprio. Exigiu `body { position: relative }`, senão `inset: 0` resolveria contra o bloco contentor inicial e o fio teria altura de viewport, não de documento. **⚠️ O `<body>` não pode voltar a ter `background-color`: isso apagaria o grão e o fio de uma vez, sem erro no console.** **Verificado por pixel, não por DOM:** A/B fotografando 140×140 px sobre o traço em três posições de scroll — 201/15/193 pixels roxos com o fio contra 0/0/0 com ele escondido, e a cor mais saturada em `rgb(193,171,212)`, que é exatamente a mistura de `#8c62ac` a 50% sobre o fundo. Comprimento desenhado cresce 1771 → 3895 → 5896, provando o `stroke-dashoffset` ligado ao scroll. Em 1920/1024/768/360 px o caminho é gerado sem overflow; sob `prefers-reduced-motion` o fio não é renderizado (paths na página caem de 2 para 1) | Ativa |
| **D-38** | 04/09 | O conteúdo passa a admitir ênfase tipográfica: um trecho por parágrafo pode ser destacado, e o destaque vive no dado, não no JSX | Nas capturas do site no ar, todo texto de apoio tem exatamente o mesmo peso e a mesma cor — o olho não tem onde pousar e o parágrafo vira uma faixa cinza que ninguém lê. A melhor frase do site inteiro (*"the team is not slow, the process is"*) está enterrada no meio do segundo parágrafo do About. Regra: sintaxe `**...**` dentro das strings de `src/data/`, interpretada por um componente `Emphasis` de ~10 linhas que não usa biblioteca de Markdown; **no máximo um trecho por parágrafo** — dois destaques na mesma frase anulam um ao outro; o destaque usa `primary-deep` (nunca `primary`, que fica em 4,6:1 e reprova em texto pequeno, regra 6 do `CLAUDE.md`). Mantém o RF-03 intacto: o texto continua saindo de `src/data/` **Implementado:** `ui/Emphasis.tsx`, sem biblioteca de Markdown — divide a string no par de `**` e envolve o trecho num `<strong>` em `primary-deep`. Se houver mais de um par, só o primeiro vira destaque e o resto volta intacto: a regra limita a ênfase, não some texto da tela. Texto novo aplicado em `subheadline`, `about[1..3]` e `contactPitch`; `about[0]` e a headline (D-12) intocados; o `impact` de `this-site` ganhou número, como a seção 7 exige. Verificado no DOM: zero `**` visíveis, exatamente 5 `<strong>` em `oklch(0.438 0.218 303.724)`, peso 700, **um por parágrafo**. `docs/CONTENT.md` sincronizado, com a convenção do `**` explicada no cabeçalho | Ativa |
| **D-39** | 04/09 | O limite de leitura sai de `ch` e passa a ser declarado em `rem`, com aceite por medição. **O D-31 não está entregue** | Auditoria feita no site em produção (`a3755ec`), medindo com `canvas.measureText` a largura média real de caractere em Sansation e dividindo pela largura de cada bloco. Dois defeitos independentes. (1) **A unidade mente:** `ch` é a largura do glifo `0`, e em Sansation o `0` é bem mais largo que a minúscula média — `68ch` entrega **100 caracteres por linha**, não 68. Medido em 1920, 1440 e 1024 px: 100 caracteres no `subheadline`; 91 em 768 px nas descrições de card. A meta escrita no próprio D-31 era ~75. (2) **A regra quase não foi aplicada:** só o `subheadline` (884 px) e o `contactPitch` (748 px) têm `max-width`; os quatro parágrafos do About e as seis descrições de projeto estão em `max-width: none` e só são estreitados por acidente da grade. Nova regra: cap em `rem` por tamanho de fonte (~36 rem para 16 px, ~38 rem para 18 px, ~32 rem para 14 px) e **aceite por medição, nunca por unidade** — nenhum bloco de prosa acima de 78 caracteres por linha em 1920 px. Lição registrada: `ch` não significa "caractere" **Implementado e medido:** 36 rem para os 16 px do About e do contactPitch, 38 rem para os 18 px do subheadline, 30 rem para os 14 px dos cards e da stack. Medição por CDP em 1920 px sobre o build de produção: **13 blocos de prosa, máximo de 74 caracteres** — o pior caso caiu de 100 para 74. Nota: os 32 rem sugeridos para 14 px dariam 78,2 caracteres pela largura média medida (6,55 px/caractere), estourando o teto de 78 por dois décimos; 30 rem foi escolhido porque o aceite é por medição, não por unidade. Segunda nota: a causa (b) da redação original era artefato de medida — os parágrafos do About e as descrições dos cards já estavam capados pelo `<div>` e pelo `<dl>` que os contêm, então `getComputedStyle(p).maxWidth` lia `none` enquanto a largura renderizada já era limitada. A causa real era só a unidade Terceira nota: **o aceite vale por largura de tela, não só a 1920 px**, porque tamanho de fonte responsivo muda a conta — um cap fixo em `rem` com fonte menor rende MAIS caracteres, não menos, que é a mesma armadilha do `ch` num eixo diferente. Medido nas cinco larguras: 74 caracteres em 1920, 1440, 1024 e 768 px, e 43 em 360 px. Não estourou porque a única fonte responsiva da prosa é o `sm:text-lg` do subheadline, que cai para 16 px só abaixo de 640 px, onde a viewport já aperta mais que o cap; com um breakpoint `lg:` no lugar do `sm:` o bloco teria estourado a 768 px. Qualquer classe de fonte responsiva nova em prosa obriga a remedir | Ativa |

---

## 15. Backlog v2

Vive em `docs/BACKLOG.md`. Resumo do que já está lá: tema claro/escuro, PT/EN,
seção Serviços, estudo de caso por projeto, cena reagindo ao scroll, Memoji em
vídeo, notebook 3D com os projetos rodando na tela, formulário de contato,
certificados, blog técnico, fontes self-hospedadas.

**Depois da v1:** os projetos-âncora de AI (revenue-leak detector e o agente em
Python puro) entram como novos cards. O site vira a vitrine deles — não o
contrário.
