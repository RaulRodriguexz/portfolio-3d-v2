# PRD — Portfólio de Raul Rodrigues

| | |
|---|---|
| **Versão** | 7.3 |
| **Última revisão** | 08/09/2026 |
| **Responsável** | Raul Rodrigues ([@RaulRodriguexz](https://github.com/RaulRodriguexz)) |
| **Status** | Aprovado — **fila de código encerrada**. Os dez passos estão fechados; o que falta para lançar não é código |
| **Prazo de publicação** | 10/10/2026 (embarque para Dublin: 26/10/2026) |
| **Repositório** | `portfolio-3d-v2` |

> ### ⚠️ Regra de manutenção deste documento
>
> **Este documento inteiro é escrito pelo Claude (Cowork)**, que audita o site
> em produção e a pasta `docs/`, e grava direto aqui — decisões novas, seção 0,
> changelog e inventário de movimento. O **Claude Code atualiza estado** —
> mover linha de "a fazer" para "concluído", marcar `✅` no inventário de
> movimento, e acrescentar o que foi de fato implementado ao final de uma
> decisão existente.
>
> **O Claude Code não reescreve nem reordena este documento**, não apaga
> decisões, não renumera IDs e não altera a estrutura das seções. **O alcance
> dessa proibição é este PRD**, porque aqui os IDs são referências que outros
> documentos citam. Num arquivo que ele foi encarregado de reescrever — como o
> `WORKFLOW.md` na D-47 — renumerar seções é parte do saneamento: deixar §1,
> §3, §5 e §6 seria cicatriz visível. Ideia nova de
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

> ### 🔋 Como trabalhar sem queimar a sessão
>
> O Raul já perdeu **quatro sessões** por estouro de contexto. Numa conversa
> longa, **cada mensagem reenvia tudo o que veio antes** — não é uma coisa
> cara, é tudo somado e repetido a cada turno. As regras, por ordem de ganho:
>
> 1. **Sessão nova a cada bloco de trabalho.** É de longe o maior ganho, e é
>    seguro: **este documento é a passagem de bastão**, e a seção 0 diz onde
>    retomar. Nada se perde.
> 2. **Relatar em uma linha:** item, hash do commit, e a pergunta. **Nunca
>    colar o relatório inteiro do Claude Code** — o estado real está aqui.
> 3. **Pedir verificação dirigida**, não auditoria completa: seção 0 mais a
>    última decisão é onde o erro aparece. Auditoria inteira só quando algo
>    estiver visivelmente estranho.
> 4. **Não repetir medição que já veio no relatório.**
> 5. **Respostas curtas dos dois lados.**

---

## Changelog

| Versão | Data | O que mudou |
|---|---|---|
| 7.3 | 08/09/2026 | **D-63 entregue (`8833165`) e a fila de código fecha.** O grupo `react` entrou **antes** dos grupos 3D, a família do React ganhou destino próprio e o grupo `r3f` voltou a conter só 3D. **Conferido no grafo do build, não na configuração:** a entrada agora importa `rolldown-runtime` e `react`, e mais nada — `three` e `r3f` só são alcançáveis pelos chunks das cenas. **RNF-02 cumprido pelo critério que o reprovava:** a 412 px em produção os dois **não aparecem na rede**; peso total de 372 KiB para **138 KiB**, JS não usado de 202 KiB para **28 KiB**. **Lighthouse: mobile 94** (era 82), **desktop 99** (era 98), as outras seis em 100. **Regressão conferida:** a 1350 px as duas cenas ainda montam. O caminho inteiro da semana no mobile foi **68 → 82 → 94**. |
| 7.2 | 07/09/2026 | **Aberta a D-63 — a causa real dos 237 KB.** A D-62 (b) tirou as dicas de `modulepreload` do HTML, e mesmo assim `three` e `r3f` continuaram baixando a 412 px: o preload só **antecipava** um download que aconteceria de qualquer jeito. A amarra é um **import estático da entrada**, porque o grupo `r3f` do `codeSplitting` **engoliu `react-dom` e `scheduler`**, e o `main.tsx` precisa deles para o `createRoot`. Conserto: grupo próprio para a família do React, declarado antes dos grupos 3D. Registrado que invalidar o cache do site inteiro é aceitável **agora**, porque o site ainda não tem público — e caro depois. **A lição ficou escrita na decisão:** o defeito passou pelo build, pelo lint, pelo TypeScript e pelo Lighthouse (82 com os 237 KB descendo); só o critério novo do RNF-02 reprovou, e ele se justificou na primeira vez que rodou. |
| 7.1 | 08/09/2026 | **D-62 entregue, e o aceite passou: mobile 82** (era 68), desktop **98** (era 95), as outras seis notas em 100 sem regressão. **Quem entregou os 14 pontos foi a (a) sozinha** — `9d8d99c`, fonte self-hospedada: o bloqueio de renderização caiu de **825 ms do Google Fonts + 155 ms do CSS** para **150 ms só do CSS**, e o site deixou de ter qualquer chamada a serviço do Google. Seis faces viraram **duas**, escolhidas por varredura do código: nenhum itálico e nenhum 300 eram usados. **A (b) foi implementada (`fc96578`) e NÃO atingiu o objetivo dela**, e a medição nova do RNF-02 é que pegou: `three` e `r3f` **continuam baixando** 237,5 KB a 412 px. A premissa estava incompleta — a dica de `modulepreload` só antecipava o download; a amarra é um **import estático** da entrada para o chunk `r3f`, que contém **`react-dom` e `scheduler`** além do `@react-three`. Conserto apontado e **não feito**, porque é desenho de chunk e não filtro de preload. **Pé do pin** de volta a menor que a cabeça (`72b39fd`): 10,2 px contra 14,5. |
| 7.0 | 07/09/2026 | **Aberta a D-62 — o conserto da nota 68 no mobile**, a partir das duas causas que o Lighthouse mediu: a folha do Google Fonts bloqueando a pintura por 825 ms (conserto: self-hospedar e cortar de seis faces para as usadas) e 237 KB de 3D que o celular **baixa e nunca monta**, porque o `modulepreload` do Vite não sabe do `useCanRender3D` (conserto: filtrar `three` e `r3f` em `build.modulePreload.resolveDependencies`). **O segundo conserta uma contradição do próprio documento:** o RNF-02 exige `three` carregado sob demanda, o chunk existe desde o Passo 4 e a demanda nunca foi respeitada — e a medição escrita no RNF-02 nunca pegaria, porque olha o tamanho dos chunks e não quem os baixa. **A medição do RNF-02 muda:** carga real em largura de celular, provando que os chunks 3D não aparecem na rede. Entraram também na fila o **pé do pin**, que no tema claro agora clareia a Irlanda, e a divergência **apex × www**, que é do painel. |
| 6.9 | 07/09/2026 | **Fila de código zerada e tudo publicado.** Os três commits locais foram ao ar e a produção passou por `91cd9fb` e `79eb442`. **O botão do painel foi ligado:** `/_vercel/insights/script.js` responde **200** — o Passo 9 fecha. Entregues o **prazo do `livre`** (`4ffa808`), a **inversão por tema mais as duas polaridades do pin** (`885881f`) e o **`canonical`** (`79eb442`). **Lighthouse rodado, e só uma das oito notas ficou abaixo:** desktop 95/100/100/100, mobile **68**/100/100/100. Duas causas medidas, nenhuma proposta ainda: a folha do Google Fonts bloqueia a renderização por **825 ms**, e o HTML traz `modulepreload` de **237 KB** de bibliotecas 3D que o mobile **nunca monta** — 202 KiB de JS não usado numa página de 372 KiB. Anotado também que o apex **redireciona 308 para `www`**, enquanto os quatro sinais de SEO apontam para o apex. |
| 6.8 | 07/09/2026 | A fila deixou de ter só o globo: entraram os **três commits locais ainda sem push** (o `git push` é o que leva o analytics e o pin menor ao ar), o **`canonical` ausente** — conferido no ar, o `index.html` não tem um, e o domínio acabou de mudar — e o **Lighthouse só depois do push**, senão mede a versão velha. Registrado o que já foi conferido em produção e está certo: `og:url`, `og:image` (200), JSON-LD, `robots.txt` e `sitemap.xml` no domínio novo. |
| 6.7 | 07/09/2026 | **Três defeitos do olho do Raul, e dois deles a auditoria confirmou que eram maiores do que ele viu.** (1) O globo não volta a Dublin: não é regressão — a flag `livre` do D-55 **só é desligada por rolagem**, então quem arrasta e continua olhando nunca vê o assentamento; adendo no D-55 dando **prazo de ~10 s** à flag. (2) e (3) O pin não é branco no escuro **e a inversão por tema nunca foi implementada** — os dois temas têm oceano roxo, e as quatro peças do pin compartilham uma cor. Adendo de auditoria no D-60 com o diff entre o que foi especificado e o que foi ao ar, e a causa: **a D-60 não estava no PRD quando a frente 2 foi executada**. Aberta a **D-61 — site bilíngue**, escrito e não traduzido, com duas URLs e `hreflang`, **por último e depois da revisão do inglês**. |
| 6.6 | 07/09/2026 | **Domínio no ar: `raulrodrigues.dev`**, comprado pela própria Vercel — DNS e certificado automáticos, sem registro `A` manual. Conferido no ar: `og:url`, `og:image` (200), JSON-LD, `robots.txt` e `sitemap.xml` **já no domínio novo**; `/_vercel/insights/script.js` ainda responde **404**, o que confirma que falta o botão do painel. O endereço antigo `.vercel.app` passou a responder `DEPLOYMENT_NOT_FOUND` e foi marcado como morto na seção 0. **Buraco tapado: a D-60 tinha sido implementada e nunca escrita** — a decisão da inversão por tema e das duas polaridades do pin viajou só dentro do prompt daquela sessão, e o log pulava do D-59 para o backlog. Agora está no log, com a restrição de não remontar a cena. Corrigidas três linhas velhas: inventário de movimento (dizia M-25, é M-28), Passo 10 e a lista de dependências, que ainda cobravam domínio e HTTPS. |
| 6.5 | 06/09/2026 | **Sessão de 06/09 publicada:** os seis commits do modo escuro e do globo foram para a `main`, e a produção saiu de `f724e23` para `7797d5c`. **`@vercel/analytics` ligado** (`3e060fc`), fechando o Passo 9 em código — e o **zero cookie do RNF-10 foi conferido em três camadas**, com um achado que vale registro: existe **um** caminho de cookie, o comando opt-in `va('enableCookie')`, que mora só no script remoto e **não existe dentro do pacote npm** — nenhuma atualização de dependência o liga sozinho. **Cabeça do pin reduzida à metade** (`5431c38`): `PONTA_RAIO` de 0.03 para 0.015, de ~29 px para **~14,5 px**, contra uma Irlanda de 20×22 px. Falta um passo que **não é código**: ligar Web Analytics no painel da Vercel. |
| 6.4 | 06/09/2026 | Acrescentado ao topo o bloco **"como trabalhar sem queimar a sessão"** — o Raul já perdeu quatro sessões por estouro de contexto, e o remédio principal é começar sessão nova a cada bloco, porque este documento é a passagem de bastão. |
| 6.3 | 06/09/2026 | **Frente 7 entregue** (`f724e23`) — botão medido com a página parada, e a decisão de usar evento próprio em vez de `scroll` sintético **evitou desfazer o D-55**. Aberta a **D-59: regressão — o globo parou de voltar a Dublin**, com três suspeitos e o que instrumentar. **Limpeza:** a seção 9 (Calendário) descrevia os dez passos por semana, todos executados em três dias — reescrita com o que de fato resta, que não é código. A fila "depois disso" foi reordenada por bloqueio e perdeu o item do hero oco, já resolvido. |
| 6.2 | 06/09/2026 | Aberta a **D-58**, do Raul olhando o tema escuro: os continentes do globo passam a ser **sólidos** — o D-56 trocou a cor mas manteve o pontilhado, e o pedido era massa branca —, e as partículas do hero ficam **brancas no escuro**, por tema e dentro da frente 2. A regeração da textura traz de volta o risco de projeção: **aceite é o pin cair sobre a Irlanda**. |
| 6.1 | 06/09/2026 | **Frente 6 entregue** (`dd32ee9`): zero flash, provado com 45 amostras desde antes do documento existir. Duas decisões fora da especificação e ambas certas — `color-scheme` inline fecha a janela em que nenhuma regra de fundo existe ainda; e **não** escrever `background-color` inline, porque a técnica anti-flash padrão teria **desfeito a frente 4**. Modo escuro: **3 de 7 frentes**. |
| 6.0 | 06/09/2026 | **D-57 entregue** (`d17ee23`) — o bloqueador saiu, o `<html>` segue as paradas escuras e o tema claro não regrediu. Achado que atravessa frentes: o `apply()` só roda em scroll, então **o botão da frente 7 tem de forçar reapply**. A **paleta escura derivada e medida** foi colada dentro do D-44 para não ser recalculada. Modo escuro: **1 de 7 frentes**. |
| 5.9 | 06/09/2026 | **D-56 entregue** (`653b66b`) — e a textura **não foi regerada**: o PNG é indexado de 1 bit, e trocar três bytes do `PLTE` deu o mesmo arquivo com a cor nova, byte a byte. Regerar arriscaria a projeção; recolorir por canvas dava 155 KB. O anel virou **duas faixas concêntricas**, porque a medição mostrou que nenhuma cor única serve às duas superfícies. Registrado no D-44 o desenho do botão: sol e lua são **um desenho que se transforma**, não dois que se trocam. **Resta um item de código: o D-44.** |
| 5.8 | 06/09/2026 | **Fila enxugada:** os 10 itens concluídos de 05–06/09 saíram de "em andamento" e viraram uma linha de resumo. **Restam dois: D-56 e D-44.** |
| 5.7 | 06/09/2026 | Adendo ao **D-44, frente 7** — o desenho do botão, a partir de uma referência do Raul: ficam os **ícones sol/lua em SVG**, a transição de 0,3 s **no ícone** e o `localStorage`; saem o **neumorfismo** (sombra macia e baixo contraste brigam com a linguagem chapada do site e com a acessibilidade do botão) e a **transição no fundo** (com o `useAmbientTint` reescrevendo a cada quadro, arrastaria a cor durante a rolagem). |
| 5.6 | 06/09/2026 | Inventário do modo escuro feito em cima do código, antes de qualquer linha, e ele mudou o plano. Aberta a **D-57 — bloqueador**: o `useAmbientTint` escreve `--ambient` absoluto e o tema escuro **não pintaria**. Descoberto que o **D-56 é pré-requisito da frente 2** e dissolve o problema da textura: partindo de cinza claro, uma textura só serve os dois temas. Ordem fixada: **D-56 → D-57 → 1 → 6 → 7 → 3 → 5 → 2**. Registrado o corte limpo: se apertar, corta-se o item **inteiro**, nunca o meio. Acrescentado ao D-56 o que sobrevive e o que quebra na inversão (o anel de radar). |
| 5.5 | 06/09/2026 | Acrescentado ao **D-56** o que sobrevive à inversão (giro, arrasto e oclusão, verificados no código) e o que quebra: o **anel de radar** atravessa a costa e some no oceano roxo. |
| 5.4 | 06/09/2026 | Aberta a **D-56**: o globo inverte — oceano roxo, continentes cinza-claros, mais uma malha de triângulos —, a partir de uma referência do Envato que o Raul trouxe. Referência, **não ativo**: é vídeo, e vídeo como textura mataria o arrasto. Entra **antes** do D-44, que passa a adaptar este desenho em vez de inventar outro. |
| 5.3 | 05/09/2026 | **D-54 entregue** (`7d84734`) — as quatro alegações da leitura confirmadas no código, teto removido, e o rebobinamento do eixo X medido na fórmula: 6π de percurso sem o conserto, 0π com o ângulo congruente. Aberta a **D-55**: soltar o globo deixa de assentar em Dublin — quem arrastou quer brincar, quem rolou quer ler. **Fim da sessão de 05/09.** |
| 5.2 | 05/09/2026 | **D-54 reescrita depois de ler o código**, e a versão anterior estava errada: a rotação nos dois eixos **já existe e funciona** — o que impede a volta completa é a constante `MAX_TILT` e o clamp. O item passa a ser "remover o teto e dar ao eixo X o mesmo ângulo congruente que o D-28 deu ao Y", mais restringir **onde o arrasto começa**. Achado extra: o `<div>` do globo tem `cursor-grab` e `pointer-events-none` juntos, então o cursor de mão nunca aparece. |
| 5.1 | 05/09/2026 | **D-53 entregue** (`9027b50`), com uma correção à minha especificação: o `h3` da Stack já era `ink`; faltava corpo, não cor. Aberta a **D-54** — o globo ganha rotação nos dois eixos com o mouse e a captura encolhe para perto dele; no toque nada muda, porque prender a rolagem no celular perde o visitante. Entra **antes** do modo escuro, que vai repintar essa cena. |
| 5.0 | 05/09/2026 | **Auditoria de foco e página 404 entregues** (`9ff3498`). Dois defeitos reais achados no `CopyEmail` — anel cortado e a 1,79:1, nos dois únicos controles do caminho de contato. Nova regra na 5.2.1: **simular o gatilho não é o gatilho** — `element.focus()` não ativa `:focus-visible`, e a primeira auditoria estava medindo o anel do navegador, não o do site. |
| 4.9 | 05/09/2026 | Adendo à **D-44**: a paleta do tema escuro. O roxo de texto sobe de luminosidade (o `primary-deep` some sobre fundo escuro), o decorativo ganha saturação, a matiz 303.724 não muda, e o fundo **não é preto puro** — roxo saturado sobre preto causa *halation*. Grão com menos opacidade, `AdditiveBlending` com menos intensidade. |
| 4.8 | 05/09/2026 | O Raul aprovou o destaque do About e apontou o oposto abaixo dele → **D-53**: a hierarquia desce para a Stack e o rodapé. Junto, a regra que impede o efeito colateral: **o marca-texto vale só para prosa corrida; em grade e rodapé a ênfase é cor mais peso, sem fundo.** |
| 4.7 | 05/09/2026 | **D-52 entregue** (`6148274`) — os três movimentos no ar, marca-texto medido em 6,9:1 e nenhum estouro de leitura. Duas ocorrências novas da regra "medir o que a pessoa enxerga": `getBoundingClientRect()` em elemento que quebra linha, e o próprio medidor de leitura, que desde o D-39 respondia "quantos caberiam" em vez de "quantos há". Critério corrigido; máximo real da página é 75 caracteres por linha. |
| 4.6 | 05/09/2026 | **M-28 entregue** (`39e2bfb`) — o ponto lê a ponta do mesmo `<path>` no mesmo `rAF` que escreve o `strokeDashoffset`, então acompanha a curva sozinho; erro de 0 px em três posições. **O inventário de movimento fecha em M-1 a M-28: nada entra depois.** Nova regra na 5.2.1 sobre regex atravessando camadas de escape. |
| 4.5 | 05/09/2026 | Aberta a **D-52 — contraste entre blocos**, em três movimentos: citação de abertura no About, marca-texto atrás da ênfase (com contraste a medir) e o subtítulo do hero quebrado em dois. **Absorve e substitui o D-40**, cujo *lead* era hierarquia tímida demais para o problema. |
| 4.4 | 05/09/2026 | **M-27 entregue** (`0b43a10`) — ímã dentro do `Button`, medido em três cenários; no toque o hook nem registra listener, e sob `reduced-motion` quatro eventos chegaram com deslocamento zero. Nova regra na 5.2.1: **zero só prova alguma coisa se o estímulo tiver chegado.** |
| 4.3 | 05/09/2026 | Aberta a **D-51 / M-28**: ponto de luz na ponta do fio, que **fecha o inventário de movimento em 28**. Era uma das duas ideias de 04/09 que ficaram em aberto sem decisão registrada; a outra — unificar a linguagem visual das duas cenas 3D — permanece no `BACKLOG` como v2. Fila renumerada para oito itens. |
| 4.2 | 05/09/2026 | **M-26 entregue** (`ba10fb4`) — o `WordReveal` passou a aceitar um `start` externo e o `useReveal` um `onReveal`, então os `h2` revelam sem um segundo `IntersectionObserver`; medido, um observer por seção. Aberta a **D-50**: o `h2` da Location fica fora do reveal de propósito, porque uniformizar desfaria o conserto do `<br />`. **Corrigido um erro meu:** o D-49 tinha sido inserido antes do D-45, quebrando a ordem do log. |
| 4.1 | 05/09/2026 | **D-48 entregue** (`f320780`), com o `Thread.tsx` movido por rename real. A varredura achou que o `ARCHITECTURE.md` descrevia errado o mecanismo do `React.lazy` desde que o `HeroVisual` existe → nova regra na 5.2.1: **ninguém checa um mecanismo quando o resultado bate**. Aberta a **D-49**: o contrato de camadas e o modo escuro colidem, e o D-44 é o gatilho mais provável da falha. |
| 4.0 | 05/09/2026 | **D-47 entregue** (`dc46b1b`): o `WORKFLOW.md` foi de 520 para 112 linhas e o `CLAUDE.md` deixou de rotear para ele — a fonte do próximo passo passa a ser a seção 0 deste documento. Acrescentada à 5.2.1 a regra **"reduzir sem deixar ponteiro solto"**. Esclarecido o alcance da proibição de renumerar: vale para este PRD, não para arquivo que o Claude Code foi encarregado de reescrever. |
| 3.9 | 05/09/2026 | Diagnóstico dos dois documentos concluído → **D-47** (o `WORKFLOW.md` perde o plano e vira método; o `CLAUDE.md` deixa de rotear para ele) e **D-48** (o `ARCHITECTURE.md` é corrigido, o contrato de camadas passa a ser documentado, o `Thread.tsx` vai para `layout/`). **Corrigida uma mentira deste PRD:** a seção 12 afirmava "uma branch por passo" desde a v1 — o histórico sempre teve uma `main` só. |
| 3.8 | 05/09/2026 | **Fechamento da sessão de 05/09**: cinco commits no ar, produção em `1413e18`, D-46 entregue. Fila renumerada — restam seis itens, começando pelo diagnóstico do `WORKFLOW.md` e do `ARCHITECTURE.md`. Acrescentado à seção 0 o bloco "onde a próxima sessão pega o trabalho". |
| 3.7 | 05/09/2026 | Varredura de texto concluída (D-45): `<br />` da Location corrigido em `2c96e11`; fita da Stack e irmãos por `gap` ficam como estão, com o motivo escrito para não serem "consertados" depois. Aberta a D-46 (setas decorativas com `aria-hidden`, 4 lugares). Nova regra na 5.2.1: detector que acusa demais tem critério errado, não código errado. |
| 3.6 | 05/09/2026 | **Contradição interna removida:** a seção 0 ainda trazia a nota "modo escuro: recusado para a v1" enquanto a fila, três linhas acima, mandava implementá-lo (D-44). Fila enxugada: o `WordReveal` saiu de "em andamento" para "concluído" e entrou o `<br />` da Location com a varredura de texto. Duas dependências marcadas como resolvidas. |
| 3.5 | 05/09/2026 | `WordReveal` corrigido (`f2e42ab`) — o defeito não era do `h1`: a frase do Statement, que é a D-12, virava uma palavra de 56 caracteres. Terceiro caso achado na varredura, o `<br />` da Location. Escrita a regra "o que o olho lê e o que a máquina lê têm de ser a mesma frase" na 5.2.1. |
| 3.4 | 05/09/2026 | Pin de Dublin entregue (M-23, D-25) — o inventário de movimento fecha em M-1 a M-25, faltando só M-26 e M-27. Acrescentada à 5.2.1 a regra "medição vazia não é prova de código quebrado", tirada de dois diagnósticos falsos seguidos. |
| 3.3 | 05/09/2026 | Memoji centralizado (D-43 entregue). **D-44 — modo escuro entra na v1**, por pedido repetido, com o custo escrito e posição de último na fila; a seção 6 deixa de proibi-lo. Acrescentada à fila a auditoria de foco e a página 404. |
| 3.2 | 05/09/2026 | D-41 (alinhamento do hero) e D-42 (nav centrada com CTA) entregues. Escritas as decisões que só existiam na fila: D-40 (lead do About), M-26 e M-27. Adicionada a D-43 — o Memoji volta ao centro, e o experimento de alinhá-lo à direita fica registrado como descartado, com as três razões. |
| 3.1 | 04/09/2026 | Fio roxo entregue (`3ce9431`), caminho gerado da geometria medida e confirmado por A/B de pixel. Crítica externa recebida: hero desalinhado e nav a centralizar → D-41 e D-42, que passam à frente da fila. Modo escuro pedido e recusado para a v1. |
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

**🟢 No ar:** <https://raulrodrigues.dev> — domínio próprio, HTTPS ativo (07/09)
> ⚠ O endereço antigo `portfolio-3d-v2-gilt.vercel.app` **responde `DEPLOYMENT_NOT_FOUND`** desde a troca. Não é defeito: o domínio novo virou o principal. **Não use mais o `.vercel.app` em lugar nenhum** — currículo, LinkedIn, assinatura
Repositório: <https://github.com/RaulRodriguexz/portfolio-3d-v2> · Deploy automático a partir da `main`

### Concluído

| | |
|---|---|
| **Passos 1 a 8** | identidade visual, conteúdo, hero, cena 3D, projetos, stack, contato, auditoria |
| **Passo 9** | **concluído em código** — SEO, JSON-LD, robots, sitemap, favicon, og.png e o `@vercel/analytics` ligado (`3e060fc`). Falta **ligar Web Analytics no painel da Vercel**, que é um botão, não código |
| **Passo 10** | parcial — repositório, deploy, **domínio e HTTPS** feitos (`raulrodrigues.dev`, 07/09). **Falta só o Lighthouse** |
| **Movimento** | **Inventário fechado: M-1 a M-28 entregues** (seção 5.2.1). Nada novo entra depois do M-28 (D-51) |
| **Qualidade** | auditoria do Passo 8 sem erros · bundle inicial 70 KB gzip · **zero cookies, agora conferido com o analytics ligado** (ver a linha do RF-09) |
| **Arrasto do globo** | D-29 e D-30 entregues — captura na `<section>`, critério a 45°, `touch-action: pan-y pinch-zoom`, inércia dobrada na `base` |
| **Largura e leitura** | D-31 e D-39 entregues — Container 96 rem, hero 104 rem, prosa em `rem` com máximo medido de 74 caracteres por linha |
| **Ritmo e densidade** | D-32 a D-35 e M-24 entregues — coluna de metadados por seção, numeração derivada do `id`, faixa de impacto, marcador `BR → IE` |
| **Modo escuro, frente 7 (botão)** | Sol e lua como um desenho só que se transforma, transição no ícone. Medido com a página parada no topo: fundo de `rgb(251,251,254)` para `rgb(22,18,27)` **sem nenhuma rolagem** — a dependência da frente 4 fechada por evento próprio `tema:mudou`, não por scroll sintético, que zeraria o `livre` do D-55. Foco 2px/offset 3px a 8,51:1, `aria-pressed` alternando |
| **Modo escuro, frente 6 (sem flash)** | Script inline no `<head>` antes de folha e bundle, com `color-scheme` inline fechando a janela anterior ao CSS. Medido com gravador instalado antes do documento: **0 quadros claros em 45 amostras**, e o bastão passa de script inline → folha → tom ambiente sem lacuna |
| **Modo escuro, frente 1 (tokens)** | Variante escura em `:root[data-theme='dark']`, sem uma linha de `body { background-color }`. Precisou de um **oitavo token**, `on-primary`: no escuro o `primary-deep` é claro e `text-white` sobre ele caía a 2,1:1. Medido — claro sem nenhuma regressão; escuro com ink 13,65, muted 7,35, primary-deep 8,62, primary 6,86; marca-texto do D-52 em 6,9 e 6,64; ênfase do D-53 em 8,58 e 8,62 |
| **Modo escuro, frente 4 (D-57)** | Bloqueador removido — o `useAmbientTint` ganhou jogo próprio de paradas escuras. Medido: `<html>` em `rgb(28 20 37)` e `rgb(20 17 25)` no escuro, e inalterado no claro. **Pendência amarrada:** o botão da frente 7 tem de forçar reapply, senão alternar parado no topo não repinta |
| **Modo escuro, frente 2 (cenas 3D)** | Última frente entregue (`51d6964`) — doze literais em cinco arquivos viram `three/paleta.ts` por tema, lido pelo `useTema` no mesmo `tema:mudou` do botão. **Derrubou uma suposição do D-44:** as órbitas nunca foram `AdditiveBlending`, só a poeira é — em mistura normal a opacidade quase não cai. Anel largo medido no pixel: 3,20:1 no claro, **1,31:1 no escuro antes**, 3,26:1 agora. Globo escuro com continente × oceano em 4,31:1 e pin em 7,45:1. Alternar pelo botão repinta as cenas sem recarregar, e o globo segue parado depois de duas trocas — 0,07% |
| **Modo escuro, frente 5 (fio)** | Entregue (`f06e08a`) — quase de graça, como o inventário previu: o `stroke` já era token. A opacidade não era, e virou `--thread-opacity`. Traço contra o próprio fundo: 0,50 dá 1,948:1 no claro; no escuro o mesmo 0,50 daria 2,630:1, e 0,36 devolve 1,946:1. O ponto da ponta (M-28) **não precisou de par**, medido: halo 1,216 contra 1,280, núcleo 6,389 contra 6,514 |
| **Modo escuro, frente 3 (grão)** | Entregue (`5f3836f`) — medido com o conteúdo escondido, para a variação ser só da camada de ruído: claro a 0,028 dá 1,0174:1; escuro a 0,028 dá 1,0281:1, **62% mais forte**; escuro a 0,020 empata. Texto miúdo remedido no escuro pelo pior pixel de fundo dentro da caixa de cada trecho: de 7,13:1 (coords) a 13,05:1 (prosa), todos acima de 4,5 |
| **Continentes sólidos (D-58a)** | Entregue (`2894e85`) — textura regerada do mesmo Natural Earth land-110m, mesma projeção, mesmo PNG indexado de 1 bit: 15,6 KB contra 11,4 KB. Projeção provada por comparação com o próprio PNG antigo — 96,90% dos 4.740 centros de ponto caem em terra cravada, 99,56% dentro de meia célula — e por 28 de 30 cidades de controle. **Aceite do D-58 cumprido, com o marcador escondido para poder olhar embaixo:** o centro do globo assentado é continente, na borda leste de uma ilha de 20×22 px com o Mar da Irlanda a leste. A armadilha foi a Antártida, que circunda o polo e cujo anel volta ao início por um salto atravessando o mapa — fechado assim, o preenchimento repartia o continente em faixas |
| **Globo: regressão do assentamento (D-59)** | Entregue (`6c13caf`) — e não era nenhum dos três suspeitos, que ficam verificados. Era o **clique parado**: pelo D-29 o mouse pula a classificação e `mode` nasce `'drag'`, então soltar sem ter movido ligava o `livre` do D-55. Medido na caixa de 773 px: um clique sem mover dava 15,47% dos pixels mudando e o marcador 161,6 px fora do centro; agora dá 0,14% e Δ 0,0 px. Arrasto de verdade segue livre em 12,42% |
| **Medição de audiência (RF-09 / D-05)** | `@vercel/analytics` ligado no `App` (`3e060fc`). **Zero cookie conferido em três camadas**, porque o RNF-10 promete "aba Application → Cookies vazia" e isso não quebra build nem lint: (1) o pacote npm não toca em `document.cookie`, `localStorage`, `sessionStorage` nem `indexedDB` — o único "cookie" do pacote está no *entrypoint* de servidor, que **repassa** o header da requisição recebida e não cria nada, e esse entrypoint não é importado aqui; (2) o script que a Vercel serve em `/_vercel/insights/script.js`, lido do próprio arquivo publicado (3.106 bytes): **nenhuma** API de cookie ou de armazenamento, e a resposta **sem `Set-Cookie`**; (3) o bundle construído: nenhum `document.cookie`, e o único `localStorage` que sobra é o do botão de tema. **O achado:** existe **um** caminho de cookie e ele é **opt-in** — o comando `va('enableCookie')` dispara um GET cuja resposta cria o cookie. Ele mora só no script remoto e **não existe dentro do pacote**, então nenhuma atualização de dependência o liga sozinha: alguém tem de escrever a chamada. Ficou comentado no `App.tsx` como o único jeito de derrubar o RNF-10 daqui. Custo: **986 bytes gzip** no chunk inicial, de 73.185 para 74.171. **Pendência que não é código:** enquanto o Web Analytics não for ligado no painel, `/_vercel/insights/script.js` responde **404** — conferido em produção — e a medição final do RNF-10 na aba Application só pode ser feita depois disso |
| **Cabeça do pin contra a ilha** | Entregue (`5431c38`) — `PONTA_RAIO` de 0.03 para **0.015**, e só o número: haste, pé, anel de duas faixas e a oclusão por profundidade ficaram como estavam. Foram os continentes sólidos do D-58a que tornaram a ilha mensurável, e a medida acusou o desproporcional: Irlanda ~20×22 px, cabeça ~29 px. Agora **~14,5 px**, 72% do lado estreito da ilha. **Não precisou de nova medição de tela, e o motivo importa:** o centro da cabeça fica em `HASTE_ALTURA` ao longo da normal **independente do raio**, e câmera, posição e escala não mudam — o diâmetro projetado é **linear** em `PONTA_RAIO`, então a correção é uma razão pura; ilha e cabeça saem da mesma sessão e da mesma unidade, então a comparação não depende de qual unidade era. Conferência pela geometria da cena (fov 34, câmera em 9.4, RADIUS 1.6, escala de 1 a 1.42): a cabeça a 0.03 dá 15,8 px CSS no zoom cheio, que vezes o teto de dpr 1,75 do `Canvas` dá 27,7 — os ~29 px medidos, ou seja o modelo reproduz a medição antiga antes de escalar a nova. Visibilidade preservada nos dois temas: a cor não mudou e o pin já era escuro nos dois de propósito (D-44, frente 2), a 7,70:1 sobre o continente. **Apontado, não corrigido:** o **pé da haste** (`circleGeometry` de raio 0.018) projeta ~16,6 px nas mesmas unidades — agora maior que a própria cabeça e perto dos 20 px da ilha. Se a pegada ainda incomodar, o próximo ajuste é esse raio |
| **RNF-02 finalmente cumprido (D-63)** | Entregue (`8833165`) — **um arquivo, 31 linhas, 237,5 KB a menos no celular.** O grupo `react` declarado **antes** dos grupos 3D: a família do React ganha destino próprio e o `r3f` volta a conter só 3D. A **ordem** é o conserto. Conferido no **grafo do build**: a entrada importa `rolldown-runtime` e `react` e mais nada, e os chunks 3D só são alcançáveis pelas cenas. Prova de rede a 412 px em produção: `three` e `r3f` **ausentes**, peso total **372 → 138 KiB**, JS não usado **202 → 28 KiB**, bundle inicial em **80 KB** contra o teto de 150. Lighthouse **mobile 94, desktop 99**. Regressão conferida a 1350 px: as duas cenas ainda montam. **Último item de código do projeto** |
| **Tipografia self-hospedada (D-62 a)** | Entregue (`9d8d99c`) — e foi ela sozinha que tirou a nota mobile de 68 para 82. A folha do Google Fonts era **render-blocking num domínio de terceiro**: 825 ms antes de a página pintar qualquer letra. Agora os `.woff2` saem do mesmo domínio, o `@font-face` mora no `index.css` e o `index.html` traz só o `preload` — necessário porque a fonte é referenciada de dentro do CSS, então sem ele o navegador só a descobriria depois de baixar e interpretar a folha. **Seis faces viraram duas**, por varredura: nenhum itálico e nenhum 300 eram usados de verdade — 13,9 KB somados, subset `latin` apenas. **Licença conferida, não presumida:** OFL 1.1, © 2011 Bernd Montag, com o `OFL.txt` ao lado dos binários. **O `404.html` foi junto**, senão a promessa de "nenhuma chamada a serviço do Google" seria falsa na página de erro. Não resta nenhuma referência a `googleapis` ou `gstatic` no repositório, o que também reforça o zero cookies do D-05 |
| **Pé do pin menor que a cabeça** | Entregue (`72b39fd`) — raio de 0.018 para **0.011**, só o número. Ele tinha ficado **maior que a cabeça** sem ninguém notar: quando ela caiu para 0.015, o pé seguiu em 0.018 e passou a projetar 16,6 px contra 14,5, ou seja **115%**. Passou despercebido porque no tema claro de então o pé era escuro sobre continente branco e lia como sombra da haste; a inversão do D-60 trocou o fundo debaixo dele e virou disco **claro** apagando a Irlanda roxa. Agora **10,2 px = 70% da cabeça**, ainda 1,8× a largura da haste e metade do lado estreito da ilha. O número virou constante `PE_RAIO` com o **teto de 0.0157 escrito junto** — foi a ausência desse vínculo que deixou o defeito entrar quando a cabeça encolheu |
| **Globo: a inversão por tema e as duas polaridades do pin (D-60)** | Entregue (`885881f`) — as duas partes que a auditoria de 07/09 achou faltando, juntas porque uma muda a resposta da outra: inverter o claro troca a superfície que o pé do pin pisa. **(a)** O tema claro volta a ser o oposto do escuro — oceano `#fbfafd`, continentes `#8c62ac` —, e o par é **exatamente o que existia antes do D-56**, de propósito: não é número novo, é o estado que o Raul já tinha visto e aprovado. Zero KB novos, a textura é a mesma multiplicada. **(b)** `pin` vira `pinNaSuperficie` (o pé) e `pinAcimaDaSuperficie` (haste e cabeça), e o comentário que dizia "o pin continua escuro nos dois temas" saiu — ele estava **meio certo, que é pior que errado inteiro**. **O anel não segue nenhuma das duas, e essa foi a parte que quase passou batido:** o pulso cresce 2,2× e atravessa a costa, então amarrar a faixa escura à cor do pé deixaria as **duas faixas claras** no tema claro e o anel sumiria inteiro sobre o oceano — por isso entrou `anelEscuro` próprio. **Efeito colateral consertado junto, e só visível com a inversão:** a atmosfera lia `paleta.oceano`, o que passava despercebido porque os dois temas tinham oceano roxo; com o claro invertido virava halo branco somado sobre página branca, ou seja sumia. Voltou a ter token próprio, como antes do D-56 |
| **Contrastes do globo nos dois temas (D-60)** | Continentes × oceano: **4,53:1** no claro e **4,94:1** no escuro puros; **3,79:1** e **4,13:1** com a malha composta por cima das duas superfícies. Cabeça do pin: **8,52:1** contra o oceano e **8,58:1** contra o fundo no claro; **6,38:1** e **18,48:1** no escuro. O anel se mede pela garantia do D-56 — **ao menos uma faixa acima de 3:1 em cada superfície**, e as outras duas combinações são baixas de propósito, que é justamente o motivo de as faixas serem duas: claro/oceano **8,52** (escura), claro/continente **4,21** (clara), escuro/oceano **5,71** (clara), escuro/continente **8,55** (escura). Pior caso entre tudo que foi pedido: **3,79:1**. **Método:** sem navegador nesta sessão, é contraste WCAG calculado das cores de material, com a malha composta analiticamente e a textura multiplicada como o material faz — **não é leitura de pixel de captura**, como foram as medições do D-56 e do D-58a |
| **Globo: o giro livre ganha prazo (D-55)** | Entregue (`4ffa808`) — `LIVRE_TIMEOUT` de 10 s. Não era regressão nem briga entre o D-55 e o D-28: era **especificação faltando**, porque a flag só era desligada por rolagem e quem arrasta olhando a seção nunca rola. **Não entrou um segundo temporizador**, e isso foi deliberado: o prazo se mede contra o mesmo `lastInteraction` que já governa o repouso do D-28 — um carimbo só, como aquela decisão exigiu. Um `setTimeout` daria o mesmo resultado hoje, criaria o relógio paralelo que o D-28 evitou de propósito e ainda precisaria ser cancelado e rearmado a cada gesto. A flag é **apagada de verdade** ao vencer, e não só ignorada na conta, para o estado não passar a mentir para quem o ler depois |
| **`canonical` e o domínio** | Entregue (`79eb442`) e conferido no ar. Aponta para o apex, no mesmo endereço que `og:url`, `sitemap.xml` e `robots.txt` já declaram — quatro sinais concordando. ⚠ **Mas o servidor discorda dos quatro:** o apex responde **308 para `www.raulrodrigues.dev`**, porque a Vercel pôs o `www` como domínio principal na compra. Canônico apontando para endereço que redireciona não é erro — o buscador segue o redirecionamento —, mas é sinal torto. **O conserto é no painel, não no código:** trocar o domínio principal para o apex. A alternativa oposta é mover os quatro para `www`; o que não pode é ficar como está |
| **Medição de audiência ligada de verdade** | O botão do painel foi ligado: `/_vercel/insights/script.js` responde **200** com 3.106 bytes, contra o 404 de 06 e 07/09. Com o `3e060fc` no ar, o **Passo 9 fecha**. O bundle publicado foi conferido **byte a byte** contra o build local, então o que está medindo é o código desta sessão |
| **Globo invertido** | D-56 entregue — oceano roxo e continentes claros com 3,47:1 entre si, malha custando 0,42 de contraste, anel de radar em duas faixas para cruzar as duas superfícies. Textura recolorida na paleta: 11.372 bytes, os mesmos |
| **Globo: giro livre depois do arrasto** | D-55 entregue — soltar suspende o assentamento; medido 6,6% de pixels mudando por 800 ms depois de 8 s sem rolagem, contra 0,18% depois de uma rolagem |
| **Globo: volta completa e zona de arrasto** | D-54 entregue — teto de ±60° removido com assentamento congruente no eixo X (sem ele o percurso chegava a 6π para trás), gesto só **começa** perto do planeta, e o `cursor-grab` que era inerte passou a funcionar |
| **Hierarquia na Stack e rodapé** | D-53 entregue — títulos em 20 px/700 com 20,12:1, uma ênfase por grupo **sem fundo** (5 em prosa com, 4 em grade sem), rodapé em 700 contra 400 |
| **Foco e 404** | RNF-06 auditado com **Tab real** em 1440 e 360 px — dois defeitos achados no `CopyEmail`, os **dois únicos controles do caminho de contato**: anel cortado pelo `overflow-hidden` e a 1,79:1. Depois: 0 de 23 e 0 de 25 paradas, contraste de 8,3 a 8,9:1. Página 404 própria, autocontida, 3,4 KB, respondendo **HTTP 404 de verdade** — soft-404 seria indexado como página válida |
| **Contraste entre blocos** | D-52 entregue — citação de abertura no About em 24 px, marca-texto com `box-decoration-clone` medido em **6,9:1**, subtítulo do hero em dois parágrafos. Máximo real de leitura: 75 caracteres por linha |
| **Ênfase e material** | D-38 e D-36 entregues — cinco destaques em `primary-deep`, um por parágrafo; grão a 2,8% com contraste medido em 7,48:1 no pior caso |
| **Fio roxo** | D-37 e M-25 entregues — caminho gerado da geometria medida dos rótulos, `ResizeObserver`, confirmado por A/B de pixel em três posições de scroll |
| **Ponto na ponta do fio** | M-28 entregue — posição lida do próprio `<path>`; erro de 0 px contra o comprimento desenhado em três posições de scroll. **Fecha o inventário de movimento** |
| **Links magnéticos** | M-27 entregue — medido: 0 px longe, 4 px a meio raio, 8 px no teto, 0 px ao sair; no toque o ímã nem é instalado |
| **Reveal nos títulos** | M-26 entregue — os `h2` revelam palavra a palavra pegando carona no observer do `useReveal`; medido: exatamente 1 observer por `h2`, nenhum novo |
| **Documentos** | D-47 e D-48 entregues — `WORKFLOW` vira método (520 → 112 linhas), `ARCHITECTURE` corrigido com o contrato de camadas escrito, `Thread` movido para `layout/` |
| **Setas decorativas** | D-46 entregue — os dez links com seta têm nome acessível limpo; zero setas lidas por leitor de tela |
| **Texto legível por máquina** | Varredura da página inteira: os 14 títulos (`h1`, `h2`, `h3`) leem como frases corretas; `<br />` da Location corrigido — `"Dublin, Ireland"` |
| **Texto de máquina** | D-45 resolvida — varredura completa: 14 títulos corretos, `<br />` da Location consertado (`2c96e11`); fita da Stack e irmãos por `gap` ficam como estão, com o motivo escrito |
| **`WordReveal`** | Espaço real fora do recorte — `textContent` do `h1` e da frase de posicionamento voltam a ter espaços; larguras caíram 5,6 px e 24,7 px |
| **Pin de Dublin** | M-23 e D-25 entregues — `Marker` em arquivo próprio, haste e cabeça, oclusão confirmada por arrasto real; `Globe.tsx` de 226 para 195 linhas |
| **Header** | D-42 entregue — nav centrada, `Get in touch` à direita, e a mesma largura de container do hero; tinta alinhada com 0 px à esquerda e −1 px à direita |
| **Alinhamento do hero** | D-41 entregue — palco em coluna própria com `flex-1`; gutter de 43 a 626 px e folga vertical de 101 a 169 px na cena 3D, zero colisão em seis larguras e três alturas |
| **Produção** | Deploy automático da `main` confirmado na prática (RNF-08). **O hash corrente sai de `git log origin/main -1`** — hash fixo aqui envelhece no commit seguinte, inclusive neste |

### 🔨 Em andamento

| Ordem | Item | Onde | Estado |
|---|---|---|---|
| 1 | **Globo: `livre` sem prazo** — arrastar e não rolar trava o assentamento para sempre (adendo do D-55) | `hooks/useGlobeDrag.ts`, `three/Globe.tsx` | ✅ **feito** — `4ffa808` |
| 2 | **Pin com as duas polaridades** (D-60) — haste e cabeça brancas no escuro; pé e faixa escura seguem escuros | `three/paleta.ts`, `three/Marker.tsx` | ✅ **feito** — `885881f` |
| 3 | **Inversão por tema, que nunca foi feita** (D-60) — o tema claro tem de ter **oceano branco e continentes roxos** | `three/paleta.ts` | ✅ **feito** — `885881f`, junto com o item 2 |
| 4 | **Publicar o que está local** — `3e060fc` (analytics), `5431c38` (pin) e `91cd9fb` (docs) | — | ✅ **publicado** — produção em `79eb442` |
| 5 | **`<link rel="canonical">`** | `index.html` | ✅ **feito** — `79eb442`, e conferido no ar |
| 6 | Lighthouse em produção (RNF-01), em `raulrodrigues.dev` | — | ✅ **rodado** — 7 das 8 notas passam; **performance mobile 68** fica em aberto, com causa medida |
| 7 | ⚠ **Performance mobile (RNF-01)** — 68 contra a meta de 80 | `index.html`, empacotamento | ✅ **resolvido** — **82** no aceite de 08/09, entregue pela (a) sozinha |
| 8 | **D-62 (a)** — self-hospedar a fonte e cortar de seis faces para as usadas | `index.html`, `index.css`, `public/fonts/` | ✅ **feito** — `9d8d99c`. Duas faces, subset `latin`, 13,9 KB; `404.html` foi junto |
| 9 | **D-62 (b)** — `modulePreload.resolveDependencies` filtrando `three` e `r3f` | `vite.config.ts` | ⚠ **feito e insuficiente** — `fc96578`. As dicas sumiram, os 237,5 KB **continuam baixando**. Causa medida no bloco acima |
| 10 | **Pé do pin grande demais no tema claro** — ~16,6 px contra uma ilha de ~20×22 | `three/Marker.tsx` | ✅ **feito** — `72b39fd`. Raio 0.018 → 0.011, **10,2 px = 70% da cabeça** |
| 11 | **Domínio principal: apex × www** — o apex responde **308 para www**, mas `canonical`, `og:url`, `sitemap` e `robots` apontam todos para o apex. Conserto é **no painel da Vercel**, do Raul | painel | a fazer |
| 12 | ⚠ **RNF-02 continua descumprido** — `three` e `r3f` baixam no celular por **import estático** | `vite.config.ts` | ✅ **resolvido pela D-63** — 0 KB na rede a 412 px |
| 13 | **D-63** — grupo próprio para `react`/`react-dom`/`scheduler`, antes dos grupos 3D | `vite.config.ts` | ✅ **feito** — `8833165`. **Último item de código do projeto** |
| último | **Site bilíngue (D-61)** — depois da revisão do inglês | textos, roteamento, header | a fazer |

### 📊 Lighthouse em `raulrodrigues.dev` (RNF-01) — 08/09, depois da D-63

**Fecha o Passo 10 e a fila de código. As oito notas passam, e as oito
melhoraram ou ficaram iguais desde que a D-62 começou.**

| | Performance | Acessibilidade | Best Practices | SEO |
|---|---|---|---|---|
| **Desktop** | **99** ✅ (95 → 98 → 99) | **100** ✅ | **100** ✅ | **100** ✅ |
| **Mobile** | **94** ✅ (68 → 82 → 94) | **100** ✅ | **100** ✅ | **100** ✅ |

Mobile: FCP **2,1 s** · LCP **2,6 s** · TBT **40 ms** · CLS 0.
Desktop: FCP **0,6 s** · LCP **0,7 s** · TBT **40 ms** · CLS 0.

A meta do RNF-01 era 80 no mobile. Chegou a **94**, e o caminho tem duas
metades bem diferentes: a **D-62 (a)** tirou o bloqueio de renderização de
terceiro e valeu 14 pontos; a **D-63** tirou 237,5 KB do fio e valeu outros 12.

### ✅ RNF-02 cumprido, pelo critério que o reprovava

**A prova, carga real a 412 px em produção — `three` e `r3f` não aparecem:**

| | KB | |
|---|---|---|
| `/` (documento) | 3,1 | |
| `/fonts/sansation-400.woff2` | 6,8 | D-62 (a) |
| `/fonts/sansation-700.woff2` | 7,1 | D-62 (a) |
| `/assets/index-*.js` | **20,2** | era 75,1 |
| `/assets/react-*.js` | 59,0 | chunk novo da D-63 |
| `/assets/rolldown-runtime-*.js` | 0,8 | |
| `/assets/index-*.css` | 8,1 | |
| `/images/memoji.webp` | 30,2 | o LCP do celular |
| `/_vercel/insights/*` | 1,9 | RF-09 |
| `/favicon.svg` | 0,5 | |
| **total** | **138,1** | era 372 |

| | 08/09, antes da D-63 | agora |
|---|---|---|
| `three` + `r3f` na rede | **237,5 KB** | **0 KB** ✅ |
| peso total | 372 KiB | **138 KiB** |
| JS não usado | 202 KiB | **28 KiB** |

O outro lado do RNF-02 — teto de 150 KB gzip no bundle inicial — também passa,
com folga: **80 KB** somando entrada, `react` e runtime.

**Regressão obrigatória, e ela era o risco real da D-63:** mexer em fronteira de
chunk podia quebrar o carregamento tardio. Não quebrou. A 1350 px o
`HeroScene`, o `GlobeScene`, o `paleta` e a textura do globo **continuam sendo
buscados**, ou seja as duas cenas montam.

**O método foi calibrado antes de valer como prova** — que é o que faltava no
RNF-02 antigo. A corrida de 07/09, no mesmo Chrome headless, já baixava
`HeroScene` e `GlobeScene` no desktop e **nenhum dos dois** no mobile. Então
ausência no desktop significaria regressão de verdade, e não limitação do
headless. Sem essa calibração, "não apareceu" não distinguiria conserto de
cena quebrada.

**O que NÃO foi reverificado, e é honesto dizer:** o arrasto e o assentamento do
globo não foram medidos de novo nesta sessão — não há como dirigir a página pelo
Lighthouse. O argumento é outro, e é verificável: o commit da D-63 **tocou um
arquivo só, o `vite.config.ts`**, então `useGlobeDrag.ts` e `Globe.tsx` estão
byte a byte como na medição do D-59 e do adendo do D-55. O que mudou foi em que
pacote o código viaja, não o código.

**A fila anterior tinha esvaziado.**
sessão de 06/09 e estão em **Concluído**, acima: a regressão do globo (D-59,
`6c13caf`), os continentes sólidos (D-58a, `2894e85`) e as três frentes que
faltavam do modo escuro — 3 (`5f3836f`), 5 (`f06e08a`) e 2 (`51d6964`).

**Modo escuro: 7 de 7 frentes.** O D-44 está completo, e o corte limpo que o
próprio D-44 previa — parar depois da frente 7, com as cenas 3D ainda
calibradas para claro — **não precisou ser usado**.

O que resta para publicar deixou de ser lista. **Atualização de 07/09, fim da
sessão:** o domínio e o HTTPS saíram (`raulrodrigues.dev`, comprado pela própria
Vercel, DNS e certificado automáticos), **o botão do Web Analytics foi ligado**
— o script responde 200 e o Passo 9 fecha — e o **Lighthouse foi rodado**.

Sobrou **uma** linha do Passo 10, e ela é de código: a **performance mobile do
RNF-01, em 68 contra a meta de 80**. As duas causas estão medidas no bloco
acima, e nenhum conserto foi proposto ainda, que era o combinado. Fora isso, o
que trava é humano: a revisão do inglês.

**⚠ Dependência entre frentes:** ✅ **resolvida**. O `apply()` do tint só roda
em evento de scroll, e o botão da frente 7 força o reapply por evento próprio
`tema:mudou`. A frente 2 passou a pendurar as cenas 3D **no mesmo evento**, e
foi medido que ele não acorda o globo: depois de duas trocas de tema, 0,07%
dos pixels mudam em 800 ms. O scroll sintético teria quebrado isso.

**O pin maior que a Irlanda:** ✅ **resolvido** em `5431c38`. `PONTA_RAIO`
caiu de 0.03 para 0.015 e a cabeça foi de ~29 px para **~14,5 px**, contra
uma ilha de 20×22 px — ela pousa sobre a Irlanda em vez de cobri-la. Só o
número mudou: `HASTE_ALTURA` ficou onde estava, e haste, pé, anel e
oclusão não foram tocados. **Fica um ponto para o seu olho:** o **pé da
haste** projeta ~16,6 px nas mesmas unidades, ou seja agora ele é maior
que a cabeça e continua perto dos 20 px da ilha. Se a pegada ainda
incomodar na tela, o próximo ajuste é esse raio.

**Também para o seu olho:** o arquivo continua se chamando `world-dots.png` e
não tem mais ponto nenhum dentro. O caminho está escrito nesta seção e no
`ARCHITECTURE.md`, então preferi apontar a renomear.

**Concluídos nesta fila (05–06/09):** 11 itens, todos em produção — D-47, D-48,
M-26, M-27, M-28/D-51, D-52, D-53, foco + 404, D-54, D-55 e D-56. O detalhe de
cada um está em **Concluído**, acima, e no log da seção 14.

Um commit por item, com confirmação do Raul entre eles.

**Dependência do M-26 com o `WordReveal`:** ✅ **resolvida** em `f2e42ab`. O
reveal dos `h2` só podia entrar depois do conserto do espaço, senão o defeito de
um `h1` viraria seis títulos colados. Com o conserto no ar, o M-26 está livre.

**Dependência do fio (M-25) com o D-41:** ✅ **resolvida**. O caminho é gerado
por medição e se reajustou sozinho às três mudanças de hero.

**Sob observação:** a medição cobre largura, overflow, fallback de mobile,
caracteres por linha e contraste — tudo verificado. O arrasto do globo foi
testado à mão pelo Raul em 04/09 e **funciona**; falta só o teste com **dedo**
no celular, que é o caso onde o gesto ainda pode roubar a rolagem da página. O
julgamento estético do conjunto também segue com ele.

**Onde a próxima sessão pega o trabalho — 08/09, fim do dia.**

## 🏁 A fila de código está encerrada.

O `8833165` é o **último item de código do projeto**. Os dez passos estão
fechados, os dois requisitos que estavam descumpridos — RNF-01 e RNF-02 —
passaram pelos seus próprios critérios, e não sobrou item de produto em aberto.

**O que falta para lançar não é código, e nenhum deles é meu:**

| O quê | De quem | Trava o lançamento? |
|---|---|---|
| **Revisão do inglês** por pessoa fluente (RNF-09) | o Raul achar o revisor | **sim — é o único bloqueante** |
| **Domínio principal no painel** da Vercel: o apex responde 308 para `www`, e `canonical`, `og:url`, `sitemap` e `robots` apontam para o apex | o Raul, no painel | não, mas é sinal torto para o buscador |
| **Teste do arrasto com dedo** num celular real (D-29) | o Raul, num aparelho | não |
| **D-61, site bilíngue** | depois da revisão do inglês | não — é v2 |

**Se alguém for mexer em código depois disto, o aviso é um só:** o RNF-02 agora
é medido por **comportamento** (ninguém baixa o chunk) e não por **artefato** (o
chunk existe e tem tal tamanho). Rodar `npm run build` e ver os tamanhos **não**
é conferir o RNF-02 — foi exatamente assim que 237 KB passaram por quatro
passos. A medição é carga real em largura de celular.

---

*Registro anterior — 08/09, manhã.* Os três
commits daquela leva estão em produção, em `72b39fd`.

| Commit | O quê |
|---|---|
| `9d8d99c` | D-62 (a) — fonte self-hospedada, seis faces viram duas |
| `fc96578` | D-62 (b) — `modulepreload` filtrado (feito, mas insuficiente) |
| `72b39fd` | pé do pin de 16,6 px para 10,2 px |
| este commit de docs | esta seção, o changelog e a nota de entrega da D-62 |

**A fila de código está vazia de novo, com uma exceção que precisa de decisão
antes de virar código:** o RNF-02 continua descumprido, e agora com a causa
medida e escrita no bloco acima. Quem pegar isso **não precisa medir de novo** —
precisa decidir se `react`/`react-dom`/`scheduler` ganham grupo próprio no
`codeSplitting`, e conferir pela medição nova do RNF-02, que é a única que
reprova o defeito.

**O que trava o lançamento continua sendo humano:** a revisão do inglês
(RNF-09). E segue pendente, no painel da Vercel e não no código, o domínio
principal — o apex responde 308 para `www`.

---

*Registro anterior — sessão de 07/09.* **Nada
ficou local** — os três commits que esperavam desde 06/09 foram publicados no
começo desta sessão, e os quatro desta sessão foram atrás. Produção em
`79eb442` mais o commit de documentação.

| Commit | O quê | No ar? |
|---|---|---|
| `3e060fc` · `5431c38` · `91cd9fb` | a dívida de 06/09 — analytics, pin menor e docs | ✅ publicados no início da sessão |
| `4ffa808` | prazo de 10 s para o `livre` do D-55 | ✅ sim |
| `885881f` | inversão por tema + duas polaridades do pin (D-60) | ✅ sim |
| `79eb442` | `<link rel="canonical">` (RNF-07) | ✅ sim |
| este commit de docs | esta seção, o changelog, D-55 e D-60 | ✅ vai junto |

**O próximo item é o único de código que sobrou: a performance mobile.** As
duas causas já estão medidas no bloco do Lighthouse, acima — a folha do Google
Fonts bloqueando 825 ms, e os 237 KB de 3D que o celular baixa e não usa. A
sessão que pegar isso **não precisa medir de novo**: precisa decidir o conserto
de cada uma e conferir que a nota subiu. O segundo caso mexe em como o bundle é
montado, então vale abrir decisão antes de escrever código — ele contradiz o
RNF-02 na letra, e essa contradição é do documento, não só do código.

**Duas coisas que são do Raul, não de código:** o domínio principal no painel
da Vercel (o apex redireciona para `www`, e os quatro sinais de SEO apontam
para o apex) e a revisão do inglês, que segue sendo o único bloqueante do
lançamento.

**Limitação de ferramenta:** o conector da Vercel devolve lista vazia em
`list_projects` no time AVVIA, apesar de o projeto existir e publicar. É
permissão do conector, não do projeto. Enquanto durar, a confirmação de deploy
sai pela API do GitHub, que registra os deployments criados pela Vercel.

### ⏳ Fila depois disso

| Item | Depende de | Bloqueia |
|---|---|---|
| **Revisão do inglês** por pessoa fluente (RNF-09) | o Raul encontrar o revisor | **lançamento — é o único bloqueante** |
| ~~**Domínio** `raulrodrigues.dev` + HTTPS~~ | ✅ **feito em 07/09** — comprado pela Vercel, DNS e certificado automáticos | — |
| ~~**Ligar Web Analytics no painel** da Vercel (RF-09)~~ | ✅ **feito em 07/09** — o script responde 200, o Passo 9 fecha | — |
| **Domínio principal no painel**: o apex responde 308 para `www`, e `canonical`, `og:url`, `sitemap` e `robots` apontam para o apex | o Raul, no painel da Vercel | nada trava, mas é sinal torto para o buscador |
| ~~Lighthouse na URL de produção (RNF-01)~~ | ✅ **rodado em 07/09** — 7 das 8 notas passam | — |
| **Performance mobile em 68** (RNF-01, meta 80) | decidir o conserto das duas causas já medidas | checklist §10 |
| Teste do arrasto com **dedo** no celular (D-29) | o Raul, num aparelho real | — |
| 4º card de projeto: B2B com geolocalização (D-21) | número de impacto que só o Raul tem | — |

*Saiu daqui em 06/09: "hero com o miolo oco" — resolvido pelo D-43 mais a faixa
do D-34 e o fio do M-25, e confirmado nas capturas do tema escuro.*

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
| M-23 | Marcador de Dublin como pin com haste, ocultado pelo globo quando gira para trás | Location | extra | ✅ pronto |
| M-24 | Número de impacto contando até o valor final ao entrar na tela, uma vez só | Statement → Projetos | extra | ✅ pronto |
| M-25 | Fio roxo desenhando-se ao rolar, do hero até o globo, por `stroke-dashoffset` | global | extra | ✅ pronto |
| M-26 | Títulos de seção revelando palavra a palavra, reusando o `WordReveal` com stagger menor que o do hero | todas as seções | extra | ✅ pronto |
| M-27 | Links e botões magnéticos: o elemento se desloca até ~8 px na direção do cursor a ~60 px e volta ao sair | CTAs do Statement, copiar e-mail, baixar CV | extra | ✅ pronto |
| M-28 | Ponto de luz na ponta do fio, acompanhando o traço enquanto ele se desenha no scroll | global | extra | ✅ pronto |

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
- **Medir o que a pessoa enxerga, não o que é conveniente de medir.** Já falhou
  três vezes neste projeto: `ch` entregando 100 caracteres onde a unidade
  prometia 68 (D-39); medição do `<img>` de fallback reportada como se fosse a
  cena 3D (D-41); e `getBoundingClientRect` medindo a caixa com padding em vez
  da tinta, o que quase provocou a "correção" de um alinhamento correto (D-42).
  Antes de aceitar um número, pergunte se ele descreve o que aparece na tela ou
  só o que a API devolve mais fácil. **Quarta e quinta ocorrências, no D-52:**
  `getBoundingClientRect()` num `<strong>` que quebra de linha devolve a
  **união** das caixas — 580 × 43 px de espaço quase todo vazio —, e amostrar
  ali media o fundo da página em vez do marca-texto, devolvendo o contraste
  errado; `getClientRects()`, que dá uma caixa por linha, resolveu. E o próprio
  medidor de leitura, em uso desde o D-39, calculava largura da caixa ÷ largura
  média de caractere — o que responde "quantos **caberiam**", não "quantos
  **há** por linha". Acusava três estouros inexistentes. O critério passou a
  dividir o texto pelo número de linhas que ele de fato ocupa; o máximo real da
  página é **75 caracteres**.
- **O que o olho lê e o que a máquina lê têm de ser a mesma frase.** Já
  apareceu por três caminhos diferentes, todos com build verde: no `h1`, onde a
  separação entre palavras era `margin` e não espaço, devolvendo
  `"RaulRodrigues"`; na frase do Statement (M-7), pela mesma causa, onde uma
  sentença de 56 caracteres virava **uma palavra só** — e é a frase da D-12,
  escrita pelo Raul, a que o Google indexa junto do `h1`; e no título da
  Location, onde um `<br />` sem espaço produzia `"Dublin,Ireland"`. Não é um
  bug, é uma classe: **separação visual não é separação textual.** `margin`,
  `<br>`, `position`, `flex gap` e pseudo-elementos separam pixels e não
  separam texto. Regra: qualquer componente que quebre uma frase em pedaços —
  para animar, para quebrar linha, para estilizar — é aceito só depois de
  conferir o `textContent` renderizado. Vale para leitor de tela, indexação e
  copiar-colar, ou seja, RNF-06 e RNF-07 ao mesmo tempo.
- **Simular o gatilho não é o gatilho.** No item de foco, `element.focus()` por
  script **não ativa `:focus-visible`** no Chrome — a medição estava lendo o
  anel padrão do navegador (3 px, offset 0), não o do site (2 px, offset 3 px).
  O estímulo chegou, mas era **outro** estímulo, e o site teria passado numa
  auditoria que nunca olhou para o que a pessoa vê ao apertar Tab. Refeito com
  `Input.dispatchKeyEvent` disparando Tab de verdade, apareceram dois defeitos
  reais. É o degrau seguinte da regra abaixo: não basta o estímulo chegar, ele
  tem de ser **o mesmo** que o do uso real.
- **Zero só prova alguma coisa se o estímulo tiver chegado.** Testar que um
  efeito está *desligado* exige duas medidas, não uma: que o gatilho ocorreu
  **e** que nada aconteceu. No M-27, o ímã sob `prefers-reduced-motion` mediu
  0 px de deslocamento — mas isso, sozinho, é indistinguível de "nenhum evento
  chegou". A prova veio de contar os `pointermove`: quatro chegaram, e o
  deslocamento continuou zero. Sem essa contagem, a guarda não estava
  verificada, estava só não contrariada. O contraexemplo apareceu no mesmo
  item: a primeira medição deu zero em tudo porque o botão estava a `top: -872`,
  fora da viewport, onde despachar mouse não gera evento nenhum — código certo,
  teste mudo.
- **Regex atravessando camadas de escape é a parte mais frágil do teste.** No
  M-28 o instrumento falhou três vezes seguidas e nas três o código estava
  certo: um regex escapado através de `bash` → Python → template literal do JS
  não casou com um atributo que estava ali no DOM; e `"\s"` virou `"s"` dentro
  de string JS, então `/\s+/` passou a dividir na letra **s** e o `split`
  devolvia um elemento só. Preferir `split(' ')` e comparação literal a regex
  em script que atravessa camadas — a elegância do regex não sobrevive ao
  escape, e o custo do erro é "consertar" código que não tem defeito.
- **Medição vazia não é prova de código quebrado — desconfie primeiro do
  instrumento.** Aconteceu duas vezes, do mesmo jeito: o teste devolvia nada e
  a conclusão fácil era "não renderiza". No fio (M-25), o recorte da captura
  estava em coordenadas erradas e fotografava outro lugar. No pin (M-23),
  `Page.captureScreenshot` com `clip` e sem `captureBeyondViewport` interpreta
  as coordenadas em espaço de **documento**, e a foto saiu do topo da página
  com a seção renderizada logo abaixo — além de `scrollIntoView` e
  `window.scrollTo` em chamadas separadas não rolarem nada, porque o rAF do
  Lenis desfaz a posição entre uma chamada e outra: a rolagem tem de acontecer
  dentro de um único script na página. Regra: antes de declarar que algo não
  renderiza, confirme pelo DOM — contexto WebGL vivo, `reveal` com
  `is-visible`, opacidade 1. **DOM íntegro e foto vazia = defeito do
  instrumento.**
- **Ninguém checa um mecanismo quando o resultado bate.** O `ARCHITECTURE.md`
  afirmou por semanas que "a pasta `three/` inteira entra por `React.lazy`".
  Não entra: o `Hero` importa o `HeroVisual` normalmente, porque é ele que
  decide, com o `useCanRender3D`, se monta a cena ou o `<img>` — e essa decisão
  tem de acontecer **antes** de qualquer chunk de 3D ser buscado. A frase
  sobreviveu porque a **conclusão** estava certa: o `three` fica em chunk
  próprio e nada fora da pasta o importa. Regra: quando o resultado bate,
  ninguém volta para conferir como ele foi obtido — então a descrição do
  mecanismo é onde a mentira se esconde por mais tempo. Vale para a regra 4 do
  `CLAUDE.md`, que está **certa** e não deve ser "corrigida" junto: ela fala de
  quem **importa** `three`, e o `HeroVisual` não importa.
- **Reduzir sem deixar ponteiro solto.** Tirar conteúdo de um documento não é
  apagar linhas: é remover o que saiu **e** o que apontava para ele. Na D-47,
  cortar os dez passos deixaria três resíduos — uma regra dizendo "todo prompt
  **aqui**" quando os prompts tinham acabado de sair, uma seção abrindo com
  "fora do fluxo dos dez passos", e um limiar duplicado com o que o substituiu.
  Referência que aponta para o vazio é exatamente o defeito que a redução
  existia para corrigir. Vale para código igual: remover uma função e deixar o
  comentário que a explicava é o mesmo erro.
- **Detector que acusa demais não achou nada — só fez barulho.** Na varredura
  da D-45, o primeiro detector marcou mais de 100 ocorrências, quase todas
  falso positivo, porque contava vãos sem distinguir irmãos de bloco
  (parágrafos, cards) de elementos inline dentro de uma frase. O sinal útil só
  apareceu na segunda passada, olhando **nome acessível** em vez de
  `textContent` cru. Regra: quando um teste acusa muito, o problema costuma ser
  o critério, não o código — refine o critério antes de sair corrigindo.

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
| **RNF-02** | Bundle JS inicial | ≤ 150 KB gzip, com `three` em chunk próprio carregado sob demanda | **Carga real em largura de celular, provando que `three` e `r3f` não aparecem na aba de rede** (D-62). A medição antiga — saída do `npm run build` — olhava o **tamanho** dos chunks e não **quem os baixa**, e por isso deixou passar 237 KB pré-carregados num aparelho que nunca monta a cena |
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
- Alternância de idioma PT/EN (D-06). ~~Alternância claro/escuro~~ — **saiu de
  fora de escopo em 05/09 por pedido explícito do Raul, repetido. Ver D-44**,
  que traz o custo escrito e a posição na fila. É o último item, e o primeiro a
  ser cortado se o prazo apertar.
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

**Reescrita em 06/09.** O calendário original planejava os dez passos por
semana, de 04/09 a 08/10 — e **os dez foram executados em três dias**, entre 03
e 06/09. Um cronograma que descreve trabalho já feito é a mesma doença que a
D-47 diagnosticou no `WORKFLOW.md`: documento de plano fica falso no dia em que
o plano acaba. O que sobrou é curto e não é código.

| Data | O que | Depende de |
|---|---|---|
| **em aberto** | Revisão do inglês por pessoa fluente (RNF-09) | o Raul achar o revisor — **é o único item bloqueante do lançamento** |
| **07/09** | ✅ Domínio + HTTPS — `raulrodrigues.dev` | feito. Metadados conferidos no ar: `og:url`, `og:image` (200), JSON-LD, `robots.txt` e `sitemap.xml` **já apontam para o domínio novo** |
| ✅ **07/09** | Web Analytics ligado no painel (RF-09) | feito — o script responde 200 |
| ✅ **07/09** | Lighthouse rodado (RNF-01) | 7 das 8 notas passam |
| **em aberto** | **Performance mobile: 68 contra a meta de 80** (RNF-01) | as duas causas estão medidas na seção 0; falta decidir o conserto |
| **10/10** | Meta de publicação divulgável | os quatro acima |
| **26/10** | Embarque para Dublin | — |

**A ordem que importa agora é outra:** o que trava não é mais escrever código,
é o que depende de terceiros e de calendário. A revisão do inglês e o domínio
deveriam ter começado antes do modo escuro.

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
- [x] Domínio apontado e HTTPS ativo — `raulrodrigues.dev`, 07/09
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
| **Branches** | **Uma `main` só.** Todo commit vai direto nela, e o build tem de passar antes do push. Este documento afirmou até 05/09 que havia "uma branch por passo" — era falso desde o primeiro commit; o histórico nunca teve outra branch. Corrigido pelo D-47 |
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
| **D-05** | 03/09 | Vercel Analytics entra na v1 | A seção 8 promete métricas de rolagem e clique; sem medição, aquelas metas eram ficção. O Vercel Analytics não usa cookies, então não exige banner na UE. **ENTREGUE em `3e060fc`**, e a promessa de "não usa cookies" deixou de ser confiança e virou medição, em três camadas: o **pacote npm** não toca em `document.cookie` nem em armazenamento do navegador; o **script remoto** `/_vercel/insights/script.js`, lido do arquivo publicado, não tem nenhuma API de cookie e sua resposta não traz `Set-Cookie`; e o **bundle construído** não tem `document.cookie`. **Mas a promessa tem uma condição, e ela não estava escrita aqui:** o script aceita o comando `va('enableCookie')`, que dispara um GET cuja resposta **cria** um cookie. É opt-in, mora só no script remoto e **não existe dentro do pacote npm** — então nenhuma atualização de dependência o liga sozinha, alguém tem de escrever a chamada. Está comentado no `App.tsx` como o único jeito de derrubar o RNF-10 daqui. **Falta ligar o Web Analytics no painel da Vercel:** sem isso o script responde 404 em produção (conferido) e a medição final do RNF-10 na aba Application não tem o que medir | Ativa |
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
| **D-25** | 03/09 | Marcador de Dublin vira pin com haste, no lugar do círculo rente à superfície | Um círculo colado na esfera some no meio dos continentes e não lê como localização. A haste resolve, e a oclusão pela esfera opaca esconde o pin sozinha quando Dublin gira para trás — mesma técnica que tirou a cara de PNG do Memoji (D-18). **Adendo de 06/09 — a cabeça encolheu pela metade (`5431c38`):** `PONTA_RAIO` de 0.03 para 0.015. O pin resolveu o problema de 03/09, mas criou outro que só ficou visível depois do D-58a: com continentes sólidos deu para **medir a ilha**, e a Irlanda tem ~20×22 px contra uma cabeça de ~29 px — o marcador era maior que o país que ele marca. Agora **~14,5 px**. **A correção não precisou de nova medição de tela**, e a razão é geométrica: o centro da cabeça fica em `HASTE_ALTURA` ao longo da normal **independente do raio**, e câmera, posição e escala não mudam — logo o diâmetro projetado é **linear** em `PONTA_RAIO` e basta uma razão. O modelo foi validado antes de ser usado: pela geometria da cena a cabeça a 0.03 dá 15,8 px CSS no zoom cheio, e vezes o teto de dpr 1,75 do `Canvas` dá 27,7 — os ~29 px que já estavam medidos. **`HASTE_ALTURA` não mudou:** encurtar a haste junto devolveria o defeito que este D-25 consertou, que é o marcador rente à superfície sumindo no continente. **Apontado e não corrigido:** o pé da haste (`circleGeometry` de raio 0.018) projeta ~16,6 px, agora **maior que a cabeça** e perto dos 20 px da ilha | Ativa |
| **D-25a** | 04/09 | Nota de execução do M-23: o pin lê como **ponto** na pose de repouso | Consequência geométrica, não defeito: a haste sai perpendicular à superfície e o D-28 assenta Dublin **de frente para a câmera**, que é exatamente o ângulo onde a haste fica encurtada a zero. Girando o globo ela aparece inteira, com cabeça e sombra própria. **A oclusão foi confirmada por arrasto real** (eventos de mouse do CDP, 960 px ≈ 275°): a 180° a haste sai de trás da silhueta com a base cortada pela esfera — se o teste de profundidade estivesse falhando, o disco e o anel apareceriam por cima da face do globo. O pin **não some por completo** quando Dublin passa para trás, e isso também é geometria: por causa da inclinação em X que o D-28 aplica, o caminho de Dublin passa perto do topo, e um pin radial na borda projeta para fora da silhueta — como um pin de verdade num globo de verdade. Se um dia se quiser que ele leia como pin também em repouso, o caminho é inclinar a haste alguns graus fora da normal ou assentar Dublin ligeiramente fora do centro — os dois mexem no D-25 ou no D-28, e nenhum é conserto de bug | Ativa |
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
| **D-40** | 04/09 | O primeiro parágrafo do About vira *lead*: corpo maior, o resto inalterado | Os quatro parágrafos do About têm hoje o mesmo peso, então o olho não sabe por onde entrar. O lead é recurso editorial clássico — sinaliza "comece aqui" e cria hierarquia dentro do texto, que é o destaque que o D-38 sozinho não dá. Restrições: o limite de leitura do D-39 acompanha o tamanho novo e é **medido**, não presumido (máximo 78 caracteres por linha em 1920 px); pesos continuam 300/400/700 (regra 7 do `CLAUDE.md`) — corpo maior, não peso novo; e **um lead só** no site, senão o recurso deixa de significar "comece aqui" e vira ruído | **Absorvida pelo D-52** |
| **D-41** | 04/09 | O hero passa a ter uma linha de alinhamento compartilhada: o palco do Memoji vira coluna própria à direita a partir de `lg`, e um filho flex que ocupa a altura restante em qualquer largura | Crítica externa, confirmada por medição em produção (`3ce9431`) nos **dois** caminhos de renderização. A causa eram dois eixos independentes. **Horizontal:** o Memoji era ancorado ao centro da viewport (`left-1/2` no `<img>`; deslocamento fixo de mundo que projetava em centro+125 px na cena 3D) enquanto o `h1` era ancorado ao padding do container. Como o `h1` tem largura fixa de 567 px a partir de `lg`, o vão encolhia junto com a viewport: sobreposição de 118 px no `<img>` a 1440 px e de 310 px a 1024 px. **Vertical:** o Memoji era ancorado à base do hero e o texto ao topo, então a folga era o que sobrasse de `94vh` — 318 px a 1440×1080, mas **−39 px a 1440×700**, altura de notebook real. É essa combinação que punha as últimas letras sobre o ombro; em tela de 1080 px as projeções se cruzavam mas os pixels não. **Correção:** o halo continua sangrando a dobra, mas o palco saiu da camada `inset-0` e virou filho flex com `flex-1` — colisão vertical deixa de ser possível por construção, em vez de depender de um deslocamento que colapsa em janela baixa. A partir de `lg` ele ganha `ml-auto` e largura própria, então o vão acompanha o layout. O `<img>` passa a ser dimensionado pela altura disponível, com teto de 28 rem para não inchar de 400 para 655 px em tela alta; abaixo de 640 px o dimensionamento antigo fica intacto. Na cena 3D o deslocamento `x = 0.55` foi removido — com o palco já à direita, ele movia duas vezes — e a escala subiu de 0,9 para 1,3, porque a cena é dimensionada pela altura do canvas e o palco ficou mais baixo. **Medido depois:** gutter de 43 a 626 px e folga vertical de 101 a 169 px na cena 3D; gutter de 224 a 459 px e folga vertical de 32 a 320 px no `<img>`, com zero colisão em 1920/1440/1200/1024/768/360 e em alturas de 1080, 800 e 700 px. Zero overflow horizontal. O fio (M-25) sobreviveu porque é gerado por medição: mudou de forma (5896 → 5704 a 1440 px), não quebrou. **Revisão de 04/09 — o deslocamento lateral era resíduo.** A coluna própria à direita foi criada para abrir um vão horizontal até o nome, mas isso era cinto e suspensório: assim que a separação vertical virou **estrutural** (palco como filho flex, colisão impossível por construção), o vão deixou de ser necessário e o que sobrou foi um Memoji **357 px à direita do eixo do conteúdo**. O palco voltou à largura cheia, então seu centro é o centro do container — que é o eixo do conteúdo, porque o container é centrado. Medido: desvio caiu de +357 px para **+10 px na cena 3D e +9 px no `<img>`**, constante em 1920, 1440, 1024, 768 e 360 px, e as faixas horizontais passam a se cruzar em até 256 px **sem se tocarem**, porque a folga vertical fica entre 48 e 185 px. Centralizar não é alinhar à grade: é simetria, e simetria precisa de eixo, não de aresta — o eixo é o vão entre as duas colunas de texto do D-22. **Nada disso é feito em unidades de mundo na cena**: unidade de mundo não acompanha breakpoint, que foi o que reprovou o experimento de empurrar o Memoji para a borda direita (alinhava a −2 px em 1920 e +4 px em 1440, mas estourava 46 px a 1200 e 1024). **⚠️ A órbita, não a pele, define o espaço lateral que a cena precisa.** O `Backdrop` desenha uma elipse bem mais larga que o Memoji, e foi ela que reprovou aquele experimento: empurrado para a borda, o Memoji fazia a elipse ser cortada pelo canvas e virar um arco aberto. Antes desta revisão ela já raspava a borda direita (4 pixels nas colunas extremas a 1440×900); depois, **zero em todas as larguras**. Qualquer reposicionamento futuro do Memoji tem de ser julgado pela órbita, não pela pele | Ativa |
| **D-42** | 04/09 | O header vira três partes — marca, navegação centrada, ação — e ganha um `Get in touch` fixo apontando para `#contact` | A nav encostada à direita deixava o canto direito sem função e o topo sem caminho de contato, que é o objetivo nº 1 da seção 2. **Descoberta no caminho:** o header usava `Container` (96 rem) e o hero usa `Container wide` (104 rem). A 1440 px as duas coincidiam por acaso, porque ambas estavam presas ao padding; a 1920 px davam **60 px de diferença à esquerda e 64 px à direita**. Duas bordas quase iguais leem como torto — é pior que duas claramente diferentes. Header passou a `wide`. **Centragem:** a nav é centrada por posicionamento absoluto sobre o container, não por `justify-between` — com três itens de larguras diferentes, o do meio só ficaria no centro por coincidência. Ela centra sobre a área de conteúdo, o que dá 7 px de diferença do centro da viewport: é a metade da barra de rolagem, e é o comportamento certo, porque o que a pessoa vê como página é a área de conteúdo. **CTA:** âncora e não botão, para o header seguir fino. No mobile não cabe ao lado do `Menu` sem apertar a marca, então virou o último item do menu, destacado por cor e por uma linha acima. **Medido depois, na tinta e não na caixa** (`Range` sobre os nós de texto, ignorando padding): borda esquerda com **0 px** de diferença entre o ícone da marca e o `h1`, e borda direita com **−1 px** entre o CTA e a função do hero, constantes em 1920, 1440 e 1024 px. A diferença de 4 px na caixa é o `p-1` com `-mr-1`, a mesma compensação óptica da marca à esquerda. Ordem de tabulação segue a ordem visual: marca → navegação → ação. **Mudança de grade, fora da especificação original:** passar o header de 96 rem para `wide` altera a grade da página inteira, não só do header, e por isso fica registrada aqui em vez de ficar só no commit — o header é o único elemento presente em todas as seções, então a largura dele é a régua contra a qual tudo o mais é lido. Antes: 60 px de divergência à esquerda e 64 px à direita a 1920 px, 0 px a 1440 px. Depois: 0 px e −1 px de tinta em 1920, 1440 e 1024. **Os dois links para `#contact` ficam** — "Contact" é navegação e "Get in touch" é chamada, rótulos diferentes servindo intenções diferentes, e `navItems` também alimenta o `useActiveSection`, então remover custaria mais do que ganharia | Ativa |
| **D-43** | 05/09 | O Memoji volta ao **centro** da área de conteúdo. O experimento de alinhá-lo à borda direita foi testado e **descartado** | Duas decisões numa. **O experimento (descartado):** alinhar a borda óptica do Memoji à borda direita do conteúdo falhou por três motivos, dois observáveis. (1) A elipse do `Backdrop` é mais larga que o Memoji: empurrado para a borda, ela bate no limite do canvas e deixa de ser elipse fechada — vira arco truncado. **Consequência geral, e é a parte que vale guardar: quem define o espaço lateral que a cena precisa é a órbita, não a pele.** (2) Um deslocamento fixo em unidades de mundo não acompanha breakpoint — alinhava a −2 px em 1920 e passava 46 px da margem em 1200 e 1024, porque abaixo de `xl` o padding do container cai de 64 para 48 px. Consertar exigiria número por breakpoint, exatamente o que se evitou no fio (M-25). (3) O Memoji é uma silhueta curva: o ponto mais à direita é a tangente do cabelo, não uma aresta — e a órbita cruza qualquer linha que se tente compartilhar. **A decisão (ativa):** o Memoji estava 335 px à direita do centro (centro dele em 1055, centro da tela em 720, medido em 1440×900), resíduo lateral do D-41 que deixou de ser necessário quando a separação nome/cena virou estrutural — folga vertical de +151 px, ele está inteiramente abaixo do `h1`. Centralizar devolve a intenção original do D-22 (nome à esquerda, função à direita, **cena no meio**) e preenche o miolo oco do hero. Feito por **layout**, nunca por deslocamento em unidades de mundo, pelo motivo (2) acima. As três razões do experimento são todas contra empurrar para a **direita**; nenhuma impede centralizar, porque o centro afasta a órbita das duas bordas e simetria precisa de eixo, não de aresta | Aberta |
| **D-44** | 05/09 | **Modo escuro com botão de alternância entra na v1**, e entra por último. Reverte a exclusão da seção 6 | Pedido explícito do Raul, repetido duas vezes — o segundo pedido é o que mudou a decisão: ideia repetida é vontade, ideia dita uma vez é impulso. O custo, escrito para ninguém subestimar depois: (1) tokens do `@theme` em variante escura, com **contraste AA remedido nos dois temas** — o que passa no claro não passa automaticamente no escuro; (2) as **duas cenas 3D** foram calibradas para fundo claro (D-18, D-19) — halo do Memoji, sombra de contato, textura de pontos do globo, cor das órbitas e poeira precisam de variante; (3) o grão (D-36) a 2,8% sobre branco não é 2,8% sobre preto: recalibrar e remedir o contraste do texto miúdo; (4) o tom ambiente do M-10 precisa de par escuro; (5) o fio roxo (M-25) a 50% de opacidade pode sumir ou berrar; (6) **persistência sem flash branco na primeira pintura** — script inline antes do paint; um toggle que pisca branco em quem escolheu escuro é pior que não ter toggle; (7) o botão acessível por teclado, com estado anunciado. **Posição na fila: último.** É o único item cuja ausência não impede o lançamento, e por isso é o primeiro a ser cortado se o prazo de 10/10 apertar — um site claro no ar em Dublin vale mais que um site de dois temas em construção. Se qualquer frente custar mais do que o previsto, o Claude Code avisa **antes** de começar: cortar com clareza é melhor que entregar pela metade. **Adendo de 05/09 — a paleta escura, pedida pelo Raul ("o roxo pode ficar mais brilhante no escuro?"). Sim, e é obrigatório:** o `primary-deep` tem luminosidade 0,438 em OKLCH, isto é, é um roxo **escuro**, desenhado para fundo claro — sobre um fundo escuro ele reprova o contraste AA e some. O tema escuro recebe **par próprio de roxos**, não os mesmos tokens: o roxo de **texto** sobe de luminosidade até passar 4,5:1 sobre o fundo escuro (ponto de partida a medir, algo em torno de `oklch(0.78 0.16 303.724)`), e o **decorativo** pode ganhar saturação, porque cor viva sobre fundo escuro é onde ela realmente rende. A **matiz 303.724 não muda em nenhum dos dois** — é a identidade da marca, e mexer nela troca a cor em vez de adaptá-la. **O fundo não pode ser preto puro:** roxo saturado sobre preto absoluto causa *halation* — a cor parece vibrar e sangrar nas bordas, cansa a vista e é bem pior para quem tem astigmatismo. Usar um fundo bem escuro com um toque da própria matiz da marca, na faixa de `oklch(0.19 0.02 303.724)`. Consequências que caem nas outras frentes: o **grão** (D-36) lê mais forte sobre escuro e precisa de opacidade menor, não igual; o **fio** (M-25) e as órbitas com `AdditiveBlending` **estouram** com facilidade em fundo escuro, então a intensidade tende a **cair**, não subir; e o halo branco atrás do Memoji deixa de ser lavado claro e vira brilho. Tudo isso **medido nos dois temas** — a regra da 5.2.1 vale aqui em dobro. **Adendo de 06/09 — o plano, depois do inventário feito em cima do código.** Custo por frente: **(1) tokens** — 7 tokens × 2 temas, médio; **(2) as duas cenas 3D** — 12 cores fixas em 5 arquivos de `three/`, alto, e é onde mora a única incerteza; **(3) grão** — uma regra, baixo; **(4) tom ambiente** — ver **D-57, é bloqueador**; **(5) fio** — **de graça**, e não era esperado: o `Thread` já usa `var(--color-primary)` e `var(--color-primary-deep)` no traço e nos dois círculos do M-28, então acompanha o tema sozinho; sobra decidir se `strokeOpacity 0.5` cai no escuro, que é um número; **(6) persistência sem flash** — `index.html`, baixo; **(7) botão** — `Header.tsx`, baixo. **Ordem obrigatória: D-56 → frente 4 (D-57) → 1 → 6 → 7 → 3 → 5 → 2.** O D-56 primeiro porque a textura clara dissolve o problema da frente 2; a 4 logo depois porque **sem ela nada pinta**; a 2 por último porque é onde está a incerteza. **O que a frente 1 obriga a remedir e não é óbvio:** o marca-texto do D-52 (`primary/15` sob `primary-deep`) e a ênfase sem fundo do D-53 dependem os dois de roxo sobre `canvas` — com par próprio de roxos, **os dois números mudam** e precisam passar de novo pelos 4,5:1. **Corte limpo, se o calendário apertar:** parar depois da frente 7 — interface escura completa com as duas cenas 3D ainda calibradas para claro. **Não entregar assim.** Cenas claras sobre fundo escuro são inconsistência visível, e entre isso e não ter modo escuro, **não ter é melhor**. O corte é o item inteiro, não o meio dele. **Adendo de 06/09 — o desenho do botão (frente 7), a partir de uma referência que o Raul trouxe.** Ele colou um prompt genérico de "botão dark mode" e pediu **a vibe**, não a execução. O que se aproveita e vira especificação: **ícones de sol e lua**, desenhados em **SVG**, nunca emoji — mesma razão do D-22 e do D-35: emoji muda de desenho a cada sistema e não aceita a cor da paleta; **transição suave de 0,3 s** no ícone e no estado do botão; **preferência salva em `localStorage`**, que a frente 6 já exige, somada ao script inline antes da primeira pintura. O que se **descarta, com motivo**: **(a) neumorfismo — não.** É estilo de sombra macia e baixo contraste, briga com a linguagem chapada e clara deste site e tem problema conhecido de acessibilidade justamente em botão de ação; o pedido real do Raul foi "moderno e minimalista", e minimalista é o que o site já é. **(b) transição de 0,3 s no FUNDO da página — não.** Com o `useAmbientTint` reescrevendo `--ambient` a cada quadro de rolagem (D-57), transição no fundo faz a página inteira **arrastar a cor durante o scroll**. A transição fica no ícone e no botão, não no `background`. **(c) separar em `index.html`, `style.css` e `script.js` — impossível aqui:** o projeto é React + Vite + Tailwind v4, o tema mora em `src/index.css` dentro de `@theme`, e esses arquivos não existem. **Restrições que continuam valendo:** botão fino, à altura do header do D-42; alcançável por teclado com estado anunciado (`aria-pressed` ou `role="switch"`), foco visível no padrão auditado; e a lua/sol respeitam `prefers-reduced-motion` como todo o resto. **O sol e a lua são UM desenho que se transforma, não dois que se trocam.** O Raul gostou da ideia dos dois ícones; a execução em SVG entrega mais do que emoji entregaria: os raios do sol se recolhem para dentro do círculo enquanto um segundo círculo desliza por cima e morde a borda, virando a lua crescente — um caminho só, na duração de 0,3 s, e o ícone **conta a mudança** em vez de piscar de uma figura para outra. Emoji só permite a troca seca. Motivo de fundo, o mesmo do D-22 e do D-35: emoji é desenhado pelo sistema operacional (no Windows o sol é um borrão laranja chapado, no iPhone é detalhado), traz **cor assada dentro** — laranja e amarelo numa paleta de roxo, preto e quase branco — e **não aceita `currentColor`**, ou seja, não conseguiria trocar de cor no tema escuro, que é literalmente a função deste botão. **A PALETA ESCURA, JÁ DERIVADA E MEDIDA (06/09) — não recalcular, é trabalho feito:** fundo `oklch(0.19 0.02 303.724)` = `rgb(22,18,27)`; texto `oklch(0.90 0.02 303.724)` = `rgb(225,219,233)`, **13,65:1**; muted `oklch(0.72 0.03 303.724)` = `rgb(168,160,180)`, **7,35:1**; roxo de texto `oklch(0.78 0.16 303.724)` = `rgb(205,156,255)`, **8,62:1**; roxo decorativo `oklch(0.72 0.19 303.724)` = `rgb(191,129,255)`, **6,87:1**; surface `oklch(0.26 0.03 303.724)` = `rgb(39,32,48)`; line `oklch(0.30 0.03 303.724)` = `rgb(49,42,58)`. O roxo de texto a 8,62:1 dá a **mesma folga** que o `primary-deep` tem no claro — a paleta escura nasce simétrica à clara, que era o objetivo. Continuam por remedir na frente 1 o marca-texto do D-52 e a ênfase do D-53. **FRENTE 6 ENTREGUE (`dd32ee9`) — zero flash, provado quadro a quadro.** Um gravador instalado **antes do documento** amostrou o fundo do `<html>` desde o primeiro quadro: **45 amostras, 0 quadros claros**, com o bastão passando sem lacuna entre os três donos do fundo, todos na mesma luminância 0,0068 — script inline aos 3,9 ms, folha de estilo aos 49 ms, tom ambiente aos 706 ms. **Duas decisões que não estavam na especificação e valem mais que ela.** (1) **`color-scheme` inline, além do `data-theme`:** entre o script e a folha de estilo **não existe regra de fundo nenhuma**, e o canvas do navegador é branco por padrão — só o `data-theme` não fecharia essa janela; o `color-scheme` faz o próprio navegador pintar escuro nela. (2) **NÃO escrever `background-color` inline no `<html>`** — que é a técnica anti-flash mais comum e aqui teria sido um tiro no pé: um valor literal inline **venceria a regra do CSS e mataria o tom ambiente do M-10**, que trabalha pela variável `--ambient`. Ou seja, **a frente 6 feita do jeito padrão desfaria a frente 4**. Fica registrado como exemplo: em base com camadas, a solução mais comum de um problema costuma ignorar as outras camadas. Detalhes: primeira visita sem nada gravado segue `prefers-color-scheme`, porque a pessoa já declarou isso ao configurar o aparelho; e tudo dentro de `try`, porque `localStorage` lança em janela privada de alguns navegadores — tema que derruba a página é pior que tema errado. **FRENTE 7 ENTREGUE (`f724e23`).** Medido com a página **parada no topo**, sem rolagem entre as leituras: fundo `rgb(251,251,254)` → clique → `rgb(22,18,27)` com `data-theme="dark"`, `aria-pressed="true"` e `dark` salvo → clique → volta. A dependência amarrada na frente 4 está fechada. Foco: 8ª parada de `Tab`, anel de 2 px com offset 3 px a **8,51:1**, no padrão da auditoria do RNF-06. **A decisão que evitou estragar o D-55, e é a melhor da frente:** o jeito óbvio de forçar o reapply seria `dispatchEvent(new Event('scroll'))`, já que o hook escuta isso — **mas o `useGlobeDrag` também escuta**, e o listener dele zera o giro livre do D-55. Um scroll sintético diria ao globo que a pessoa rolou, e **trocar de tema faria o planeta parar de girar e se arrumar sozinho**. Foi usado um evento próprio, `tema:mudou`, que só o tom ambiente escuta. Duas frentes atrás isso teria passado despercebido. **FRENTE 3 ENTREGUE (`5f3836f`).** Grão medido com o conteúdo do body escondido, para a variação ser só da camada de ruído — a primeira tentativa mediu uma região do hero e deu amplitude 1,000:1, porque ali por baixo passava a cena 3D e não havia fundo liso nenhum. Razão entre o percentil 1 e o 99 de luminância: claro a 0,028 dá 1,0174:1; escuro a 0,028 dá 1,0281:1, **62% mais forte**; escuro a 0,020 empata. Abaixo de 0,016 a medição perde sentido — o passo de 8 bits fica maior que o efeito. Texto miúdo remedido no escuro pelo pior pixel de fundo **dentro da caixa de cada trecho**, com o texto escondido: de 7,13:1 (coords) a 13,05:1 (prosa). **FRENTE 5 ENTREGUE (`f06e08a`).** O `stroke` já era token e acompanhava sozinho; a opacidade não, e virou `--thread-opacity`. Traço contra o próprio fundo: 0,50 dá 1,948:1 no claro, o mesmo 0,50 daria 2,630:1 no escuro, e 0,36 devolve 1,946:1. O ponto da ponta (M-28) **não precisou de par**, medido: halo 1,216 contra 1,280, núcleo 6,389 contra 6,514 — ele nasce parelho porque as duas pontas da mistura mudam juntas. **FRENTE 2 ENTREGUE (`51d6964`), e ela derrubou uma suposição deste próprio adendo.** Estava escrito aqui que as órbitas com `AdditiveBlending` estouram, e daí que toda opacidade cairia no escuro. **As órbitas nunca foram aditivas:** `OrbitRing` usa `meshBasicMaterial` com `transparent`, que é mistura normal; só a poeira é aditiva. Em mistura normal a opacidade é um cursor entre fundo e cor, e para dar o mesmo contraste do claro ela tem de ficar **quase igual** — 0,50 contra 0,55. Aplicar a regra do grão e do fio aqui teria deixado o anel apagado com um número que parecia certo. Medido no pixel: anel largo contra o fundo do hero, 3,20:1 no claro, **1,31:1 no escuro antes** — que é o que o Raul viu — e 3,26:1 agora. Os doze literais de cinco arquivos viraram `three/paleta.ts`, lido pelo `useTema`, que escuta o mesmo `tema:mudou`; dentro de um `<Canvas>` não existe `var(--color-*)`, porque material recebe valor e não propriedade herdada. **Três decisões da frente 2 que valem registro:** (1) **o globo anda ao contrário de todo o resto** — o oceano ESCURECE em vez de clarear, porque uma bola de `rgb(191,129,255)` ocupando meia tela sobre página quase preta seria um farol; quem se afasta é a página. Continente × oceano vai a 4,31:1, melhor que os 3,65 do claro, como o D-56 previu. (2) **o pin fica escuro nos dois temas**, porque ele pousa sobre o continente, que é claro nos dois — segui-lo pelo token o tornaria claro sobre claro e ele sumiria em cima da única coisa da cena que carrega informação. (3) **a sombra de contato é o único item que não inverte**: ela existe para assentar o Memoji, e assentar é escurecer; virar brilho faria o recorte flutuar de novo, que é o defeito que o D-18 consertou. **D-58b dentro desta frente:** poeira branca a 0,34, dando ~1,9:1 contra o 1,53:1 que o Raul achou perdido — e paridade com o claro seria o alvo errado, porque a poeira do tema claro mede 1,08:1, praticamente invisível: somar luz sobre página quase branca não tem para onde subir. **Verificado no botão, sem recarregar:** claro → escuro → claro, com o globo voltando às cores dominantes idênticas às originais, e parado depois de duas trocas de tema (0,07% dos pixels em 800 ms) — o `tema:mudou` não acorda o planeta. **Modo escuro: 7 de 7 frentes. O corte limpo não precisou ser usado** | Aberta |
| **D-45** | 05/09 | Varredura de texto visual × texto de máquina concluída. **Corrigido:** o `<br />` da Location. **Decidido NÃO corrigir:** a fita da Stack e os irmãos separados por `gap` | Auditoria completa, feita depois dos três casos que geraram a regra da 5.2.1. Resultado: os 14 títulos da página leem como frase correta, e rótulos numerados, faixa de impacto, coluna de metadados e rodapé estão limpos. Só o `<br />` da Location era da mesma classe — corrigido em `2c96e11`, `"Dublin,Ireland"` → `"Dublin, Ireland"`. **Duas coisas ficam como estão, e o motivo importa mais que a decisão.** (1) **A fita da Stack (M-9) repete a lista três vezes no texto da página** — a trilha é duplicada para o loop sem emenda e os mesmos itens já aparecem na grade acima. Para leitor de tela é inofensivo: o contêiner tem `aria-hidden="true"` e é ignorado inteiro. Para indexação é fraco, não fatal — repetir lista de palavras-chave é ruído, não penalidade. E os dois consertos possíveis custam mais que o problema: não existe em HTML um nó limpo que a extração de texto ignore, e gerar a segunda trilha por CSS tira conteúdo do DOM de um jeito que atrapalha mais do que ajuda. **Fica.** (2) **Irmãos separados por `gap`** — nav, tags dos cards, linhas do `<dl>`, CTAs — aparecem colados no `textContent` bruto, mas cada um é elemento próprio com nome acessível próprio, e o leitor de tela anuncia separadamente. Só apareceria para quem concatenasse o texto cru da página. **Não é defeito.** Registrado para ninguém "consertar" no futuro achando que é a mesma coisa do `<br />` | Resolvida |
| **D-46** | 05/09 | As setas decorativas dos links ganham `aria-hidden="true"` — quatro lugares | Metade das setas do site já é decorativa e metade entra no nome acessível: `Live demo →` e `Code →` nos cards, `GitHub →` e `LinkedIn →` no Contato são anunciados com a seta junto, enquanto o rodapé e o `Get in touch` do header já a escondem. Não é a classe do `<br />` — ali faltava separação, aqui **sobra um caractere decorativo dentro do nome acessível**. É inconsistência, não escolha: o padrão certo já existe no próprio código, em dois lugares. Conserto: `aria-hidden="true"` no `<span>` da seta, como o rodapé faz. Serve o RNF-06. **Implementado:** os quatro links passaram ao padrão do rodapé — `group inline-flex items-center gap-1.5` com a seta num `<span aria-hidden>`. Efeito colateral desejado: o avanço no hover passa a ser da **seta** e não do link inteiro, que é o que o M-17 descreve e o que o rodapé já fazia; antes o `Live demo` deslocava o rótulo junto. Medido depois: os **dez** links com seta do site têm nome acessível limpo, e zero setas são lidas por leitor de tela | Ativa |
| **D-47** | 05/09 | O `WORKFLOW.md` perde o plano e vira **documento de método**. O `CLAUDE.md` deixa de apontá-lo como fonte do "próximo passo" | Diagnóstico medido: o documento descreve os dez passos como trabalho a fazer quando todos já foram executados, prescreve um ritual de branches que o projeto **nunca usou** (o histórico tem uma `main` só), e o prompt do Passo 3 manda "reservar a metade direita da primeira dobra" — uma sessão que o executasse **desfaria o D-43**, entregue anteontem. O dano não é hipotético: o `CLAUDE.md` roteia toda sessão nova para lá em dois pontos, para buscar "o próximo passo". **Um documento de plano fica falso no dia em que o plano acaba** — e este acabou. O que sobrevive é bom e fica: as cinco regras (§1), a anatomia de um bom prompt (§3) e os prompts auxiliares (§5). Sai: o ciclo de branches (§2) e a lista de dez passos (§4). O limiar do §6 ("mais de cinco arquivos = passo grande demais") também sai: o D-31 tocou 12 arquivos e passou em build e medição, o D-42 tocou 3 — o número deixou de discriminar. O sinal que substitui é o que a prática já usa: **se você não consegue dizer o que muda em até 3 linhas, o passo está grande demais.** A partir daqui, a fonte do "próximo passo" é a **seção 0 deste PRD**, e só ela | Aberta |
| **D-48** | 05/09 | O `ARCHITECTURE.md` é corrigido, e o **contrato de camadas** passa a ser documentado. O `Thread.tsx` muda de `ui/` para `layout/` | O documento envelheceu por **omissão**, não por contradição — por isso ajuda e é corrigido em vez de reduzido. Suas quatro regras estruturais continuam verdadeiras, e o isolamento do `three` foi verificado mecanicamente: nada fora de `components/three/` importa `three` ou `@react-three`. Correções: faltam `Statement.tsx` (D-17) e `Location.tsx` (D-19) na árvore — e omitir a Location esconde **metade do WebGL do projeto**; a regra 4 cita um token `accent` que **não existe** (`grep` retorna zero), e o exemplo não compila; falta `robots.txt`, `sitemap.xml` e `world-dots.png` na lista de `public/`; e a receita de "faixa nova da página" está incompleta desde o D-33, porque `nav.ts` passou a ter duas listas — `navItems` e `sectionOrder` — e seguir a receita como está deixaria a seção nova sem número. **O acréscimo mais caro é o que não estava lá:** o contrato de camadas criado pelo D-36 e pelo D-37. Grão e fio vivem em `z-index: -1` como camadas do `<body>`, e **o `<body>` não pode voltar a ter `background-color`** — se voltar, os dois somem juntos, sem erro no console e com o build verde. Isso é arquitetura e é armadilha de falha silenciosa; hoje existe só como comentário dentro do `index.css`. Por fim, o `Thread.tsx` sai de `ui/`, descrita como "peças reutilizáveis", para `layout/`: é camada decorativa da página inteira, usada uma vez, com `z-index` negativo. Move-se o arquivo em vez de afrouxar a descrição da pasta — o documento fica verdadeiro, e não acomodando exceção | Aberta |
| **D-49** | 05/09 | **O contrato de camadas e o modo escuro colidem — e o D-44 é o gatilho mais provável da falha.** Antes de qualquer código de tema, releia a regra 5 do `ARCHITECTURE.md` | Ninguém escreve `body { background-color }` por acaso. Escreve-se **ao implementar um tema** — é o primeiro instinto de quem vai pintar a página de escuro. E é exatamente o que faz o grão (D-36) e o fio (D-37), ambos em `z-index: -1` como camadas do `<body>`, desaparecerem juntos: sem erro no console, sem quebrar o build, sem nada nos testes. A página fica lisa e o motivo é invisível. O fundo mora no `<html>` desde o D-36, e é lá que a variante escura tem de morar também. Registrado como decisão própria, e não como nota dentro do D-44, porque advertência enterrada num parágrafo de sete frentes é advertência que ninguém lê no momento em que importa | Aberta |
| **D-50** | 05/09 | O `h2` da Location fica **fora** do reveal do M-26, de propósito | O título "Dublin, Ireland" é montado à mão, fora do `Section.tsx`, e usa um `<br />` para quebrar as duas linhas. O `WordReveal` divide o texto por espaços — passaria por cima justamente do `<br />` consertado no `2c96e11`, que existe para o `textContent` devolver `"Dublin, Ireland"` e não `"Dublin,Ireland"`. Ou seja: uniformizar a animação **desfaria** uma correção de acessibilidade e de indexação. Cinco dos seis `h2` revelam; esse não. O custo de igualar é ensinar o `WordReveal` a preservar quebras de linha, o que é bem mais que um item de animação — vai para o `BACKLOG` se algum dia incomodar. Registrado porque a inconsistência é visível e alguém vai querer "consertar": **a inconsistência é a escolha certa aqui** | Ativa |
| **D-51** | 05/09 | O fio (M-25) ganha um **ponto de luz na ponta** que acompanha o traço enquanto ele se desenha — M-28. **Fecha o inventário de movimento: nada entra depois** | Hoje a linha termina exatamente onde o scroll parou, cortada no vazio — o fio parece **interrompido**, não em desenho. Um ponto na extremidade inverte a leitura: passa a parecer que alguma coisa está desenhando a linha, que é o que o efeito sempre quis dizer. Não é decoração nova: é a mesma técnica do `OrbitSpark` que já existe no hero desde o M-5, aplicada a uma geometria que o projeto já calcula. Custo quase nulo, e termina uma entrega que hoje está **incompleta, não errada**. Restrições: segue as regras do fio — `aria-hidden`, `pointer-events: none`, atrás de todo conteúdo, e some por completo sob `prefers-reduced-motion`; a posição sai da mesma geometria medida do `Thread`, sem número mágico; e a luz não pode competir com a faixa de impacto (D-34) nem com o Memoji — é um ponto, não um farol. **Contexto de registro:** esta era uma das duas ideias de 04/09 que ficaram em aberto. A outra — unificar a linguagem visual das duas cenas 3D, dando às órbitas do hero o motivo de pontos do globo — **permanece no `BACKLOG` como v2**, por escolha do Raul de levar duas das quatro ideias e não as quatro | Aberta |
| **D-52** | 05/09 | **Contraste entre blocos**, em três movimentos. Absorve e substitui o D-40 | O Raul olhou a página depois do D-38 e disse que continua "sem destaque". A leitura está certa e o diagnóstico é preciso: o D-38 entregou contraste **dentro do parágrafo** — uma frase em roxo por bloco — mas a página não tem contraste **entre blocos**. Cinco parágrafos do mesmo tamanho, com um trecho colorido em cada, ainda são cinco parágrafos do mesmo tamanho. **(a) Citação de abertura no About.** A melhor frase do site — *"the team is not slow, the process is"* — está enterrada no meio do segundo parágrafo. Ela sai de lá e vira a **abertura da seção**, em corpo grande, antes dos parágrafos; o parágrafo 2 é reescrito para não repeti-la. É o mesmo recurso do D-34, que já provou funcionar com um número, aplicado a uma sentença. Substitui o *lead* do D-40: um parágrafo maior é hierarquia tímida, uma frase solta em corpo grande é hierarquia de verdade. **(b) Marca-texto atrás da ênfase.** Hoje o destaque do D-38 é cor mais peso 700. Ganha também um fundo em `primary` de baixa opacidade atrás do trecho, como marca-texto. É o maior ganho de destaque percebido por linha de código do que resta — **e exige medir contraste**: texto `primary-deep` sobre `primary` translúcido sobre `canvas` tem de continuar acima de 4,5:1 (RNF-06). Se não passar, a opacidade cai até passar; se não passar em nenhuma, o movimento (b) é descartado. **(c) O subtítulo do hero quebra em dois.** Tem 298 caracteres, cerca de quatro linhas, e é a **segunda coisa** que a pessoa lê. Vira dois parágrafos, o primeiro curto e direto. É a única regra de copywriting genérico que se aplica a este site: parágrafo de no máximo três linhas. **Limites que continuam valendo:** um trecho destacado por parágrafo (D-38), uma citação só e um número só na página inteira — dois de cada viram painel e o efeito se anula —, e nada de lista de benefícios, porque os cards `problema → construí → impacto` são prova e lista de benefício é promessa | Ativa |
| **D-53** | 05/09 | **A hierarquia do D-52 desce para a metade de baixo da página**: Stack e rodapé. E uma regra nova separa onde o marca-texto entra | O Raul aprovou o destaque do About e apontou o oposto abaixo dele: da Stack para baixo a página volta a ser bloco cinza uniforme — títulos de grupo, descrições e rodapé todos no mesmo peso e na mesma cor. É o mesmo diagnóstico do D-52, na metade que ficou de fora. **(a) Títulos de grupo da Stack** — `AI & Agents`, `Automation`, `Data`, `Web` — ganham hierarquia de verdade: corpo maior que o das etiquetas e cor `ink`, não `muted`. Hoje competem em pé de igualdade com o texto que descrevem, e por isso não organizam nada. **(b) Uma ênfase por descrição de grupo**, com o `Emphasis` que já existe: *"systems that **actually do work**"*, *"**off the calendar**"*, *"raw records **to a decision**"*, *"makes the **work visible**"*. São quatro linhas curtas numa grade, não prosa corrida — uma cada mantém o padrão do D-38 sem virar ruído. **(c) O rodapé deixa de ser um bloco cinza único**: o nome e a linha de função passam a ter pesos diferentes entre si, em vez de tudo em `muted` no mesmo tamanho. **REGRA NOVA, e é ela que impede o efeito colateral: o marca-texto do D-52 vale só para PROSA CORRIDA** — About, Statement, Contato. Em grade, etiqueta, rodapé ou qualquer contexto compacto, a ênfase é **cor mais peso, sem fundo**. Quatro caixas de grade com fundo colorido dentro viram um painel manchado, e o recurso que funciona por escassez se anula. **Limites:** pesos só 300/400/700 (regra 7 do `CLAUDE.md`); a citação continua única na página; e nada de negrito adicional fora do que está listado aqui. **Correção de 05/09:** a premissa de (a) estava errada — o `h3` já era `ink`, não `muted`. O que faltava era **corpo**: 18 px em negrito, entre blocos de 14 e 12 px, lê como linha em negrito e não como título de grupo. Subiu para 20 px | Ativa |
| **D-54** | 05/09 | O globo passa a girar **volta completa nos dois eixos**, inclusive de cabeça para baixo, e o arrasto só **começa** perto do planeta. **Escrita depois de ler o código, corrigindo uma especificação minha que estava errada** | O Raul pediu duas coisas. Antes de especificar, li `Globe.tsx`, `useGlobeDrag.ts` e `Location.tsx` — e a leitura mudou o item inteiro. **(b) A rotação nos dois eixos JÁ EXISTE e já funciona.** O hook define `allowVertical = e.pointerType === 'mouse'` e acumula `offset.x`; o `Globe` aplica `g.rotation.x`, transfere a inércia de inclinação na soltura (`tiltVel`) e assenta o eixo X no repouso. Nada disso precisa ser construído. **O que impede a volta completa é uma constante:** `MAX_TILT = Math.PI / 3` — ±60°, com o comentário dizendo literalmente "para o globo nunca virar de cabeça para baixo" — e o bloco de clamp que a aplica sobre o valor composto. Liberar é remover o teto. **Mas removê-lo quebra o assentamento**, e essa é a parte que não pode ser esquecida: o repouso do eixo X persegue `target.x` **cru**, então depois de algumas cambalhotas ele desenrolaria várias voltas para trás — exatamente o defeito que o D-28 resolveu no eixo Y com o ângulo congruente mais próximo (`Math.round((base.y − target.y) / 2π)`). O eixo X passa a precisar do mesmo tratamento. **Consequência assumida:** `rotation.x` e `rotation.y` são ângulos de Euler; passando de ±90° em X, o arrasto horizontal **inverte a sensação**, porque o "cima" do globo virou. Isso é inerente a rotação estilo turntable e só se resolve com acumulação por quaternião (trackball de verdade). **Decisão: aceitar a inversão nesta versão** — objeto real de cabeça para baixo se comporta assim, e trocar por quaternião é reescrever o núcleo de rotação que custou D-28 e D-30. Se incomodar na tela, vira item próprio. **(a) Onde o arrasto começa.** Os listeners estão na `<section>` (D-29) e continuam lá — mexer nisso reintroduz o defeito do canvas menor que a área aparente. O que muda é a **origem**: um `pointerdown` que nasce fora da caixa do globo é ignorado. Restringe-se onde o gesto **começa**, nunca onde ele continua — soltar o globo porque o mouse saiu da bola no meio do arrasto seria pior que o problema original. A caixa sai do `<div>` que embrulha a cena, que já é bem menor que a seção (56% da largura no desktop), aproximada a um quadrado centrado com margem. **Achado extra da leitura:** esse `<div>` tem `cursor-grab` **e** `pointer-events-none` ao mesmo tempo — o cursor de mão nunca aparece, porque o elemento não recebe ponteiro. Hoje só existe `grabbing`, durante o arrasto. Com a zona menor, mostrar `grab` ao entrar nela deixa de ser enfeite e vira o que **ensina** onde pegar. **Limite duro:** nada pode desfazer D-28, D-29 ou D-30 | Ativa |
| **D-55** | 05/09 | **Soltar o globo depois de girá-lo deixa de assentar em Dublin: quem arrastou quer brincar, quem rolou quer ler.** O repouso passa a distinguir o TIPO de interação, não só o tempo desde a última | Depois do D-54 o Raul girou o globo e reclamou: solta e ele para. **Não é defeito — é o D-28 executando o que está escrito.** A inércia decai em ~0,7 s (`0.25^delta`) e, a 1,5 s sem interação, `resting` assenta em Dublin e trava. "Mostrar Dublin parado" e "mundinho girando" são **incompatíveis por construção**, e nenhum ajuste de número concilia os dois — mesma armadilha do D-27, que tentou resolver com intensidade um conflito que era de regime. A saída é a mesma do D-28, um degrau acima: aquele unificou rolagem e arrasto num **carimbo** só; este os separa por **intenção**. Rolar é ler a página, e o leitor merece ver Dublin de frente. Arrastar é brincar, e quem brinca não quer que o brinquedo se arrume sozinho. Regra: **um arrasto suspende o assentamento automático**; o globo mantém o giro livre indefinidamente, e volta a apontar Dublin **na próxima rolagem** — que é exatamente o instante em que a mensagem "eu moro em Dublin" volta a importar. Implementação esperada: um sinalizador ligado na soltura do arrasto e desligado no `scroll`, lido junto de `resting`. O `lastInteraction` do D-28 continua existindo e continua único; o que se acrescenta é *de onde* veio a última interação. **Não** mexer no decaimento da inércia nem no `REST_DELAY`: o problema não é a velocidade, é o destino  **Adendo de 07/09 — o `livre` precisa de prazo, e sem ele o D-55 come o D-28.** Relato do Raul: *"o mundinho quando para não volta para Dublin"*. Lido no código, não é regressão nova: `resting = !dragging && !livre && agora - lastInteraction > REST_DELAY`, e **a flag `livre` só é desligada por um evento de rolagem**. Quem arrasta e continua olhando a seção nunca rola — então `livre` fica ligada para sempre, o globo gira indefinidamente e **o assentamento do D-28 nunca roda**. Os dois pedidos do Raul são compatíveis; o que faltou foi um prazo. **Regra:** `livre` **expira sozinha** depois de uma janela generosa sem interação — ordem de **10 s**, contra os 1,5 s do `REST_DELAY` —, e aí o globo volta a apontar Dublin sem a pessoa fazer nada. A rolagem continua limpando na hora, como hoje. O número tem de ser grande o bastante para o giro livre ainda ser sentido como "ele continua rodando" (era o pedido original do D-55) e pequeno o bastante para a pessoa ver a volta antes de sair da seção. **Aceite:** arrastar, soltar e **não tocar em mais nada** — o globo gira por ~10 s e depois assenta em Dublin; medido, não olhado. **ENTREGUE em `4ffa808`.** Entrou `LIVRE_TIMEOUT = 10_000`, e a decisão de execução que vale registro é **como** o prazo é contado: ele se mede contra o mesmo `lastInteraction` que já governa o repouso do D-28, e **não** por um `setTimeout`. O resultado hoje seria o mesmo, mas o temporizador criaria o relógio paralelo que o D-28 evitou de propósito — aquela decisão diz textualmente "um carimbo só governa os dois repousos; não existe um segundo" — e ainda precisaria ser cancelado e rearmado a cada gesto, que é superfície para o mesmo tipo de bug do D-59. Segunda escolha: quando o prazo vence, a flag é **apagada de verdade** em vez de apenas ignorada na conta do `resting`, para o estado não passar a mentir para quem o ler depois. A rolagem continua limpando na hora, como o adendo pediu. | Ativa |
| **D-56** | 06/09 | **O globo inverte: oceano roxo, continentes cinza-claros.** Mais uma malha de triângulos por cima da esfera. Vem **antes** do D-44 | Referência trazida pelo Raul: um loop 3D do Envato Elements (`3d-globe-seamlessly-rotating-purple`, autor PixoArt). **É referência, não ativo** — é um vídeo por assinatura, e vídeo como textura mataria o arrasto do M-22 e do D-54: não se gira um vídeo. Mas a geometria já é nossa; o que faz a referência parecer o que parece é **material e textura**, e os dois estão sob nosso controle. **A inversão.** Hoje: esfera quase branca (`#fbfafd`) com continentes em pontos roxos. Passa a ser: **esfera em roxo** e **continentes em cinza claro**. Exige regerar o `world-dots.png` com os continentes claros, pelo mesmo caminho que o criou — contornos do Natural Earth (`land-110m`, domínio público) rasterizados, 11 KB, sem foto de satélite (D-19). **A malha.** Uma esfera *wireframe* de baixa contagem de polígonos, um fio maior que o corpo, em roxo mais claro e opacidade baixa: é ela que dá o ar técnico da referência, custa ~10 linhas e zero KB. **O que precisa ser reavaliado junto:** a casca de atmosfera (`BackSide` + `AdditiveBlending`) foi calibrada para brilhar sobre um corpo **claro** — sobre um corpo roxo ela pode sumir ou saturar; e o pin de Dublin (M-23) e seu anel foram escolhidos para contrastar com o branco. **Correção de um risco que eu levantei e estava errado:** eu disse que um globo roxo brigaria com texto por cima no mobile. Não brigaria — abaixo de 640 px a cena **não é montada** (RNF-04), então não existe texto sobre o globo em nenhuma largura. O risco real é outro e é de gosto: um corpo saturado grande numa página `#fbfbfe`. Mitigação: usar o `primary` suave (`#8c62ac`), não o `primary-deep`, e julgar na tela. **Ordem:** este item vem **antes** do D-44, porque o modo escuro vai repintar esta cena e fazer na ordem inversa é retrabalho garantido. No tema escuro o mesmo esquema tende a ficar ainda melhor — o oceano roxo escurece e os continentes claros ganham contraste —, então o D-44 **adapta** este desenho em vez de inventar outro. **Medir:** contraste dos continentes contra o oceano, e que a malha não empaste a leitura dos continentes. **O que sobrevive intacto, verificado no código (06/09):** giro, arrasto, inércia e assentamento são `g.rotation` no grupo — material não os toca, então D-28, D-30, D-54 e D-55 seguem iguais; e a **oclusão do pin continua de graça**, porque ela depende da esfera opaca escrever profundidade e a esfera continua opaca, só muda de cor. **O que NÃO sobrevive, e é preciso:** o `Marker` inteiro é `#6e11b0` — roxo escuro sobre esfera quase branca, hoje com contraste altíssimo. Depois da inversão, **o pin fica bem**, porque Dublin está na Irlanda e a Irlanda vira continente cinza-claro; **o anel de radar é que quebra**: ele cresce 2,2× para fora, **atravessa a costa** e vai pulsar no oceano roxo, onde roxo escuro sobre roxo médio some. O anel precisa de valor próprio — claro, ou com contorno —, decidido contra **as duas** superfícies que ele cruza, não só contra a terra. **Detalhe da malha:** o *wireframe* não pode cruzar por cima do marcador, senão embaralha a única coisa da cena que carrega informação; ou fica atrás dele, ou é sutil o bastante para não competir. **⚠ O D-56 é PRÉ-REQUISITO da frente 2 do D-44, e dissolve o problema dela.** O inventário do modo escuro achou que os continentes são um PNG com a cor assada dentro, desenhado com `<meshBasicMaterial map={texture} />` sem `color` — e cor de material **multiplica** a textura: dá para escurecer, nunca para clarear. Com a textura roxa atual, o tema escuro só teria a saída de gerar um **segundo PNG** (+11 KB e um par de ativos a manter) ou aceitar continentes apagados. **A textura clara do D-56 elimina a escolha:** partindo de cinza quase branco, multiplicar chega a qualquer valor nos dois temas com **uma textura só**. E o oceano deixa de ser textura e vira `color` sólida, que é trivialmente temável. Fazer o D-44 antes do D-56 é escolher entre duas saídas ruins de um problema que o D-56 apaga. **Entregue em `653b66b`, e a textura NÃO foi regerada — a execução achou um caminho melhor.** O `world-dots.png` é PNG **de 1 bit, indexado**, com paleta de duas entradas: `[0]` transparente e `[1]` o roxo. Os contornos do Natural Earth já estavam lá dentro; a cor eram **três bytes num chunk `PLTE`**. Trocar esses três bytes e recalcular o CRC deu 11.372 bytes — **exatamente os mesmos**, geometria byte a byte idêntica. Por que isso importa mais do que economia: **regerar teria de reproduzir a mesma projeção equirretangular, e meio grau de deslocamento poria Dublin no meio do Atlântico sem quebrar build, lint nem teste.** Trocar a paleta tem risco zero disso. O caminho óbvio foi tentado antes e falhou: recolorir por canvas e reexportar deu **155 KB contra 11 KB**, porque o encoder do canvas escreve RGBA cru e perde o indexado — teria destruído o "custo marginal quase zero" que justificou a segunda cena no D-19. **Lição geral: mudar a apresentação do dado é mais seguro que regerar o dado.** **O anel virou duas faixas concêntricas, e a medição provou que precisava:** nenhuma cor única serve — a faixa escura dá 7,32:1 sobre o continente e 2,11:1 sobre o oceano; a clara dá 4,20:1 sobre o oceano e 1,21:1 sobre o continente. Com duas faixas, onde uma some a outra aparece, em qualquer ponto do pulso. **Medições finais:** continentes `rgb(237,231,244)` contra oceano `rgb(154,103,183)` = **3,47:1**, ou 3,89:1 sem a malha — o custo da malha é 0,42 e o resultado segue acima do limiar de 3:1 para gráfico não textual. A malha ficou em `RADIUS × 1.003`, entre continentes e marcador, com `depthWrite: false`, então **nunca cruza por cima do pin por construção**, não por ajuste; afinada de 24×16 para 18×12 porque os meridianos convergindo no polo criavam um estrelado denso. A atmosfera sobreviveu: mudou de sentido — era brilho roxo sobre corpo claro, virou halo pálido em volta de bola roxa — e continua lendo como atmosfera. **Ponto em aberto, para o olho do Raul:** nesta escala o pin é **maior que a Irlanda**, então cobre a ilha em vez de pousar sobre ela. A geometria não mudou; ficou aparente porque o continente agora é claro. Se incomodar, é reduzir cabeça e pé do pin — número, não estrutura | Ativa |
| **D-57** | 06/09 | **⚠ BLOQUEADOR: o `useAmbientTint` (M-10) impede o tema escuro de pintar.** É a primeira frente do D-44, antes de qualquer token | Achado pelo Claude Code no inventário, antes de escrever código — exatamente o que a exigência de "traga o plano antes" existe para produzir. O hook escreve `--ambient` com um `rgb()` **absoluto** (`rgb(251 251 254)` e companhia), e o `<html>` usa `background-color: var(--ambient, var(--color-canvas))`. **O fallback só vale se a variável não existir** — e com o hook rodando ela sempre existe. Consequência: o M-10 sobrescreve o fundo a cada quadro de rolagem, em claro, para sempre. Isso **não** é "o tom ambiente fica esquisito no escuro"; é **"o modo escuro não funciona"** — e seria descoberto no meio da implementação, com meia paleta pronta e ninguém entendendo por que a página continua branca. O hook passa a conhecer o tema e a ter jogo próprio de paradas. **Parentesco com a D-49:** as duas são a mesma família — algo pintando o fundo por um caminho que o tema não controla. A D-49 avisou sobre o `body { background-color }` que alguém *ia* escrever; esta é a versão que **já está no código**. **Entregue em `d17ee23`.** Medido: com `data-theme="dark"`, o `<html>` segue as paradas escuras — `rgb(28 20 37)` no meio e `rgb(20 17 25)` no fim —, e o tema claro ficou byte a byte como antes, sem regressão. **⚠ Achado que atravessa frentes:** o `apply()` só roda em evento de **scroll**, então alternar o tema **parado no topo não repinta** até a primeira rolagem. Na carga normal o script inline da frente 6 resolve; mas **o botão da frente 7 tem de forçar um reapply do tint ao trocar de tema**, senão a pessoa clica no sol e a página só muda quando ela rola. Anotado também em comentário no `useAmbientTint.ts`, para não virar "bug misterioso" duas frentes adiante | Ativa |
| **D-58** | 06/09 | Duas correções do Raul olhando o tema escuro na tela: **(a) os continentes do globo passam a ser SÓLIDOS, não pontilhados** — a textura é regerada de verdade; **(b) as partículas do hero ficam brancas no escuro** | **(a) O D-56 entregou metade do pedido.** A textura sempre foi um mosaico de pontos — está escrito no D-19, "textura pontilhada" — e trocar os três bytes do `PLTE` manteve os pontos, mudando só a cor deles. O pedido original era **continente branco**, massa sólida, e é o que a referência do Envato mostra. Agora a regeração é inevitável, e o risco que o D-56 evitou volta: reproduzir a projeção equirretangular e não deslocar a geografia. **Mitigação obrigatória, e é verificável:** depois de gerar, conferir que **o pin de Dublin cai sobre a Irlanda** e que a linha de costa fecha — se o pin cair no mar, a projeção está errada, e isso não quebra build, lint nem teste. Manter o PNG **indexado de 1 bit**, como o atual, para não repetir os 155 KB do caminho por canvas; terra preenchida comprime bem, e o teto continua sendo a promessa de custo marginal quase zero do D-19. **Consequência a remedir:** com massa sólida em vez de pontos, o contraste contra o oceano roxo **sobe**, e o pin, o anel de duas faixas (D-56) e a malha *wireframe* precisam ser reconferidos sobre a superfície nova. **(b) Partículas brancas.** No escuro o roxo decorativo se perde contra o fundo escuro — o Raul viu e está certo. **Mas é decisão POR TEMA, não troca global:** partícula branca sobre a página quase branca do tema claro simplesmente some. Então roxo no claro, branco no escuro, e a intensidade **cai** no escuro em vez de subir, porque `AdditiveBlending` sobre fundo escuro estoura (já registrado no adendo do D-44). Isto pertence à **frente 2** do D-44 e é feito lá, não antes. **Reforço de 06/09:** o pedido é o desenho da referência do Envato — **massa branca sólida**, não pontilhado recolorido. **(a) ENTREGUE em `2894e85`.** Regerado do mesmo Natural Earth land-110m, mesma projeção, mesmo PNG indexado de 1 bit: 15,6 KB contra 11,4 KB. **A mitigação exigida foi cumprida por medição:** os 4.740 pontos do PNG antigo tiveram o **centro** comparado com a terra nova — 96,90% em terra cravada, 99,56% dentro de meia célula do próprio retículo; o resto é franja de costa, porque o gerador antigo marcava a célula e o centro dela podia cair na água. Mais 28 de 30 cidades e mares de controle. E o aceite literal, com o marcador **escondido** para poder olhar embaixo dele: o centro do globo assentado é continente, na borda leste de uma ilha de 20×22 px, com o Mar da Irlanda e a Grã-Bretanha a leste. **A armadilha real não era a prevista.** Não houve deslocamento de projeção; o que quase estragou o mapa foi a **Antártida**: ela circunda o polo, e o anel dela vai de -180° para leste até 178,3° e volta ao início por um salto que atravessa o mapa inteiro em -84,5°. Fechado assim, o preenchimento par-ímpar repartia o continente em faixas — a costa em -70° saindo água e o polo também. O fecho tem de ser **pelo polo**. Registrado no `README.md` de `public/images/`, porque não quebra build, lint nem teste: só faz o mapa mentir. Medição extra: o filtro de linha do PNG fica em `None`, porque com `Up` o arquivo sobe para 17,6 KB — o deflate já casa a linha inteira com a de cima e o filtro destrói esse casamento. **Consequências remedidas:** continente × oceano 3,65:1 sem malha e 3,49:1 com ela (custo da malha caiu de 0,42 para 0,16); pin 7,70:1 sobre o continente; as duas faixas do anel continuam se revezando. Nada a ajustar no pin, no anel ou na malha. **(b) ENTREGUE dentro da frente 2 do D-44** (`51d6964`), como este item mandava | Aberta |
| **D-59** | 06/09 | **⚠ REGRESSÃO: o globo parou de voltar a apontar Dublin.** Diagnosticar antes de mexer | Relato do Raul na tela: quando o globo para, ele **não volta mais a assentar em Dublin**. Pelo D-55 o comportamento correto é: **arrastar** suspende o assentamento e o globo gira livre indefinidamente; **rolar** limpa a suspensão e o globo volta a apontar Dublin. Se ele nunca mais assenta, alguma coisa está deixando a suspensão ligada para sempre — ou ligando-a sem arrasto. **Suspeitos, em ordem, e cada um verificável:** (1) o sinalizador do D-55 é ligado na soltura mas **não é limpo** no `scroll`, ou é limpo num caminho que não roda; (2) alguma coisa **liga o sinalizador sem arrasto** — vale conferir se o `pointerdown` que o D-54 passou a ignorar fora da zona ainda assim marca estado; (3) o `resting` do D-28 depende de `lastInteraction`, e se algo carimba esse valor a cada quadro o globo nunca alcança os 1,5 s de repouso — **candidato forte: o `tema:mudou` ou o próprio tom ambiente**. **Não corrigir por tentativa.** Instrumentar e me dizer, em três instantes após soltar o globo sem rolar: o valor do sinalizador do D-55, o `resting` do D-28, e `performance.now() − lastInteraction`. O que estiver errado aparece nesses três números. **ENTREGUE em `6c13caf`, e não era nenhum dos três suspeitos — os três ficam verificados:** o `livre` É limpo no `scroll`; o `pointerdown` fora da zona sai antes de marcar estado; e o `tema:mudou` **não toca** em `lastInteraction`. O culpado era um quarto, no cruzamento de duas decisões antigas: pelo **D-29** o mouse pula a classificação de gesto e `mode` já nasce `'drag'` no `pointerdown`, e o `onEnd` ligava o `livre` do **D-55** só de ver `mode === 'drag'` — ou seja, **um clique parado sobre o globo era tratado como arrasto** e suspendia o assentamento para sempre. Entrou um sinalizador `moveu`: o `livre` só liga se o gesto girou alguma coisa. Medido na caixa de 773 px, dois quadros a 800 ms: sem tocar em nada 0,15%; um clique sem mover **15,47% antes e 0,14% depois**, com o marcador saindo de 161,6 px fora do centro para Δ 0,0 px; arrasto de verdade 12,42%, ou seja o D-55 continua de pé. **A lição é sobre o método:** instrumentar em vez de chutar valeu mesmo com os três palpites errados — foi reproduzindo a regressão com o conserto revertido que a causa ficou provada, e não suposta | Aberta |
| **D-60** | 06/09 | **O globo inverte por tema** — claro: oceano branco + continentes roxos; escuro: oceano roxo + continentes brancos. **Uma textura só serve os dois.** O **pin ganha duas polaridades**. Azul descartado: a matiz continua 303.724 | Pedido do Raul olhando os dois temas na tela. Ele chegou a escrever "continente azul" e **corrigiu: foi erro de digitação, é roxo**. Fica o motivo escrito para ninguém reabrir: o site é **uma matiz só**, e o D-44 já travou que ela não muda em nenhum dos dois temas — uma segunda matiz no globo não seria adaptar a cor, seria trocá-la, no único objeto grande e saturado da página. **A inversão é barata por causa do D-56:** depois dele o oceano é `color` sólida (trivialmente temável) e os continentes são **textura multiplicada pela cor do material**. Multiplicação só escurece, então, partindo de uma textura **clara**, `color` branco devolve continentes claros e `color` roxo devolve roxos — **com o mesmo arquivo**. Zero KB novos, nenhum segundo PNG para manter. Pré-requisito duro: a textura clara e sólida do **D-58a**. **O pin não é uma cor só por tema, e essa foi a parte contraintuitiva.** O `Marker` tem quatro peças em **duas situações**: **anel** e **pé** ficam rentes à superfície, sobre continente ou oceano; **haste** e **cabeça** sobem pela normal e são vistas contra o **oceano e o fundo**, nunca contra a terra. Todas eram `#6e11b0`. No escuro, cabeça roxa contra oceano roxo é roxo sobre roxo — foi o que o Raul viu. Mas pintar o pin inteiro de branco **troca o problema de lugar**: o pé branco cairia sobre a Irlanda branca. Regra: **a peça escolhe a cor pela superfície que cruza, não pelo tema** — acima da superfície segue o oposto do **oceano**, na superfície segue o oposto do **continente**. É a lógica das duas faixas do anel (D-56) estendida ao marcador inteiro. **Restrição de execução, e valeu mais que a paleta:** trocar de tema **não pode remontar a cena** — o globo guarda estado vivo em refs (`base`, `spinVel`, `tiltVel`, o carimbo de repouso), e remontar zeraria tudo, matando o giro livre do D-55 a cada clique no botão. A cor troca no material que já existe, sem tocar `g.rotation` e sem trocar `key`; o tema chega pelo `data-theme` e pelo evento `tema:mudou` da frente 7, sem criar um segundo canal. **Entregue dentro da frente 2 do D-44 (`51d6964`)**, e a medição confirmou que a restrição foi respeitada: depois de duas trocas de tema, **0,07% dos pixels mudam em 800 ms** — o globo não acorda. **Adendo de 07/09 — auditoria: DUAS das três partes desta decisão não chegaram ao código, e a causa está identificada.** O Raul viu na tela que *"o pin no modo escuro não está branco"*, e a leitura de `paleta.ts` e `Marker.tsx` mostrou mais do que ele viu. **(a) A inversão por tema não existe.** Os dois temas têm **oceano roxo**: `claro.oceano = '#8c62ac'` com `continentes = '#ffffff'`, e `escuro.oceano = '#754ba3'` com `continentes = '#e6e0ee'`. O tema escuro é o claro um pouco mais escuro, não o inverso dele. O que esta decisão pede para o tema **claro** é o contrário: **oceano quase branco, continentes roxos**. **(b) O pin tem uma cor só por tema.** `paleta.escuro.pin = '#5a0d91'`, e há um comentário no arquivo dizendo que *"o pin continua escuro nos dois temas"*, deliberadamente, porque pousa sobre continente claro. Esse raciocínio está certo **para o pé e para a faixa escura do anel** e errado para a **haste e a cabeça**, que sobem pela normal e são vistas contra o **oceano**, nunca contra a terra — é exatamente a distinção que esta decisão criou, e ela não foi aplicada: as quatro peças compartilham `paleta.pin`. **(c) O que chegou certo:** a estrutura por tema (`PALETAS` com `claro`/`escuro`, cores fora dos componentes), a textura única multiplicada, e a restrição de não remontar a cena — o que era a parte difícil. **A causa é documental, não técnica, e é a lição:** esta decisão **não estava no PRD** quando a frente 2 foi executada — ela viajou só dentro do prompt daquela sessão, e o log pulava do D-59 para o backlog. Sem o texto na pasta, quem executou reconstruiu a regra de memória e escolheu uma saída plausível e diferente. **Foi escrita no log só em 07/09** (v6.6), depois de implementada. Registrado aqui porque é a demonstração mais limpa do motivo da regra de manutenção no topo deste documento: **prompt não é contrato; o PRD é.** **(a) e (b) ENTREGUES em `885881f`**, no mesmo commit, porque uma muda a resposta da outra: inverter o tema claro troca a superfície que o pé do pin pisa, e portanto troca a cor que ele precisa ter. **A inversão usa o par que existia antes do D-56** — oceano `#fbfafd`, continentes `#8c62ac` — de propósito: não é número novo, é o estado que o Raul já tinha visto e aprovado, que é exatamente o que esta decisão pede de volta. **O pin virou dois tokens:** `pinNaSuperficie` (o pé) e `pinAcimaDaSuperficie` (haste e cabeça). **O que esta decisão não tinha previsto, e a execução obrigou a resolver:** o **anel não pode seguir nenhuma das duas regras**. Ele está rente à superfície, então pela letra do texto acima seguiria o continente — mas o pulso cresce 2,2× e **atravessa a costa**, então cada faixa cruza as duas superfícies dentro do mesmo ciclo. Amarrar a faixa escura à cor do pé deixaria as **duas faixas claras** no tema claro, e o anel sumiria inteiro sobre o oceano — desfazendo o D-56. Por isso entrou `anelEscuro` próprio, e a regra do anel fica sendo a do D-56: **o par é sempre uma escura e uma clara, nos dois temas**, e a garantia é ao menos uma acima de 3:1 em cada superfície. **Efeito colateral consertado junto, e ele só existia por causa do acaso que esta decisão denuncia:** a atmosfera lia `paleta.oceano`, o que passava despercebido porque os dois temas tinham oceano roxo; com o claro invertido ela viraria halo branco somado sobre página branca, ou seja sumiria. Voltou a ter token próprio, como tinha antes do D-56. **Medido, mínimo 3:1, pior caso 3,79:1**, com os números na seção 0 — e com o método declarado, porque muda a confiança: é contraste WCAG calculado das cores de material, com a malha composta analiticamente, e **não** leitura de pixel de captura como no D-56 e no D-58a, porque não havia navegador na sessão. **Fica apontado e não corrigido:** no tema claro o pé do pin é claro sobre a Irlanda roxa, e projeta ~16,6 px contra uma ilha de ~20×22 px — a pegada já estava anotada na seção 0, e com a inversão ela fica mais visível, porque agora o pé clareia a ilha em vez de escurecê-la. | Ativa |
| **D-61** | 07/09 | **O site passa a ser bilíngue — inglês e português, com troca manual.** O texto em português é **escrito**, não traduzido por máquina. **Vai por último**, depois de tudo | Pedido do Raul: *"quero em dois idiomas [...] quando traduz pelo Google tá indo tudo feio, só quero corrigir isso pra ficar bonito nas duas línguas — mas isso deixa por último"*. **O problema real não é falta de português, é o português errado que já existe.** Hoje o site é `lang="en"` e qualquer visitante brasileiro cai na tradução automática do navegador, que quebra justamente o que este site tem de melhor: o `WordReveal` recorta palavra a palavra, os títulos foram medidos em caracteres por linha (D-39, 74 no máximo), e o fio do M-25 é gerado da **geometria medida dos rótulos**. Texto trocado por baixo por um tradutor muda largura, quebra de linha e contagem de palavras — o layout medido deixa de bater com o texto exibido. Ou seja: **o site não fica só mal escrito em português, ele fica torto.** **Decisões que já dá para travar:** (1) **texto escrito, não traduzido** — a voz do Raul em português não é a tradução da voz dele em inglês; expressões como "I work where things are ambiguous" viram outra frase, não a mesma frase em português; (2) **duas URLs de verdade**, `/` e `/pt`, não só um botão que troca strings na memória — sem URL própria o Google não indexa a versão portuguesa e metade do ganho se perde; (3) **`<html lang>` acompanha a página**, e cada versão declara a outra com `hreflang` — é isso que faz o navegador parar de oferecer tradução automática, que é a origem da reclamação; (4) **`og:locale`, `sitemap.xml` e o JSON-LD** passam a ter as duas; (5) **o seletor de idioma é irmão do botão de tema** no header (D-42, D-44), com o mesmo padrão de foco auditado no RNF-06; (6) **a escolha persiste em `localStorage`**, mesmo mecanismo do tema, **mas a primeira visita segue a URL, não o idioma do navegador** — quem chega em `/` vindo de um recrutador tem de ver inglês, mesmo com o Windows em português. **O que precisa ser remedido, e não é óbvio:** as medidas de leitura do D-39 e do D-52 foram feitas **no texto inglês**; português é tipicamente 15–25% mais longo, então **a contagem de caracteres por linha e a altura das seções precisam ser remedidas na versão portuguesa** — o mesmo `max-width` não dá o mesmo resultado. E o `WordReveal` e o fio do M-25 precisam ser conferidos com o texto português no ar, pela mesma razão. **Custo honesto:** é a maior mudança de conteúdo desde o Passo 7, mexe em todos os textos e no roteamento, e **não é bloqueante do lançamento** — o site em inglês publica em 10/10 sem ela. **Posição na fila: última, depois do Lighthouse.** Se o calendário apertar, esta é a primeira a sair, e sai inteira: **meio bilíngue é pior que monolíngue** — página em inglês com header em português é a cara de site inacabado. **Pré-requisito de qualidade:** a revisão do inglês (RNF-09) vem **antes**, senão a versão portuguesa seria escrita a partir de um inglês ainda não revisado | Aberta |
| **D-62** | 07/09 | **A performance mobile de 68 tem conserto, e são dois — cada um ataca uma causa medida.** (a) **A fonte passa a ser self-hospedada**, saindo do Google Fonts; (b) **o `modulePreload` do Vite para de pré-carregar as cenas 3D**, que o celular baixa e nunca monta | O Lighthouse de 07/09 deu 95 no desktop e **68 no mobile**, com sete das oito notas passando. As duas causas foram medidas, não deduzidas, e cada uma tem um conserto de baixo risco. **(a) A folha do Google Fonts bloqueia a renderização por 825 ms, contra 155 ms do CSS próprio.** Os `preconnect` que já existem no `index.html` não resolvem: eles encurtam o *handshake*, e o problema é a folha ser **render-blocking** — o navegador não pinta nada enquanto ela não chega, e ela mora em outro domínio. Hoje o `index.html` pede `family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700`, ou seja **seis faces** para uma página que usa 400 e 700 em peso e quase nada em itálico. **O conserto:** baixar os `.woff2` (a Sansation servida pelo Google está sob OFL, então redistribuir é permitido — **confirmar o arquivo de licença junto com os binários**), guardar em `public/fonts/`, declarar `@font-face` **dentro do CSS que já existe** com `font-display: swap`, e dar `<link rel="preload" as="font" crossorigin>` **só nas faces realmente usadas**. Isso remove um domínio terceiro do caminho crítico, elimina uma requisição bloqueante inteira e, de brinde, tira do site a única chamada a um serviço do Google — o que combina com a promessa de zero cookies do D-05. **Já existe `public/fonts/README.md` prevendo este passo.** Ele deixa de ser "depois" e vira agora. **Cortar as faces é parte do conserto, não um extra:** seis faces em vez de duas ou três é peso que ninguém vê. **(b) 237 KB de 3D que o celular baixa e nunca monta.** O `useCanRender3D` recusa a cena abaixo de 640 px e **recusa certo** — o LCP do celular é o `memoji.webp`. Mas o `index.html` construído traz `modulepreload` de `three` (183 KB) e `r3f` (54 KB), então **o navegador baixa antes de o React decidir**: 202 KiB de JS não usado numa página de 372 KiB, mais 466 ms de avaliação do r3f numa tela que não tem nada 3D. **O conserto é de configuração, não de código de produto:** `build.modulePreload.resolveDependencies` no `vite.config.ts`, filtrando os chunks `three` e `r3f` da lista de pré-carga. O `React.lazy` continua igual; some só o palpite do empacotador. **⚠ Isto conserta uma contradição do próprio documento, não só uma nota.** O RNF-02 exige `three` "em chunk próprio **carregado sob demanda**". O chunk próprio existe desde o Passo 4; **a demanda nunca foi respeitada** — e a medição escrita no RNF-02 (`npm run build`) jamais pegaria, porque ela olha o **tamanho** dos chunks e não **quem os baixa**. **A medição do RNF-02 muda junto:** passa a ser uma carga real em largura de celular provando que `three` e `r3f` **não aparecem na aba de rede**. Critério que falha quando o defeito volta é o único que vale. **Ordem e risco:** (a) antes de (b) — a fonte está no caminho crítico da primeira pintura e o 3D não. Nenhum dos dois toca conteúdo, layout ou as cenas; se um dos dois estourar o custo, o outro entrega sozinho. **Aceite:** Lighthouse mobile **≥ 80** (meta do RNF-01) rodado em produção **depois** do deploy, com as outras sete notas sem regressão. **ACEITE CUMPRIDO em 08/09: mobile 82, desktop 98, as outras seis em 100 sem regressão** — mas o crédito é todo da (a), e as duas partes terminaram em lugares muito diferentes. **(a) ENTREGUE em `9d8d99c` e funcionou como previsto.** O bloqueio de renderização caiu de 825 ms do Google Fonts mais 155 ms do CSS próprio para **150 ms do CSS próprio e mais nada**; FCP de 4,6 s para 2,7 s. **Duas faces, não seis, e a escolha veio de varredura em vez de palpite**, como esta decisão exigiu: `font-bold` 12 vezes, `font-normal` 4, **nenhum itálico** e **nenhum uso real de 300** — a única ocorrência de `font-light` estava dentro de um comentário do `index.css`, ou seja o peso era anunciado pela documentação e não usado por ninguém. Só o subset `latin`, porque os outros três não têm caractere nenhum deste site. Licença conferida no `METADATA.pb` do `google/fonts` em vez de presumida: OFL 1.1, © 2011 Bernd Montag, e o `OFL.txt` viaja ao lado dos binários, que é a condição. **O `404.html` foi junto**, porque ele também chamava o Google Fonts e deixá-lo assim faria a promessa de "nenhuma chamada a serviço do Google" ser falsa justamente na página de erro. **(b) ENTREGUE em `fc96578` e NÃO atingiu o objetivo — a premissa desta decisão estava incompleta.** O `resolveDependencies` está lá e as duas dicas sumiram do HTML, mas `three` e `r3f` **continuam baixando 237,5 KB a 412 px**. A dica de `modulepreload` nunca foi a amarra: ela apenas **antecipava** um download que aconteceria de qualquer forma. A amarra é um **import estático** do chunk de entrada para o `r3f`, que por sua vez importa o `three` — e import estático o navegador tem de resolver antes de executar o módulo. **E a razão de a entrada depender do `r3f` não é o 3D:** aquele chunk **não contém só `@react-three`**, ele carrega também **`react-dom` e `scheduler`**, de que o `main.tsx` precisa para o `createRoot`. O agrupador varreu a família do React para dentro do grupo do `@react-three`. O `React.lazy` e o `useCanRender3D` estão certos e não foram tocados. **Conserto apontado e não feito**, porque mexeria no desenho dos grupos de `codeSplitting` — fronteira de chunk e cache do site inteiro — e não em filtrar preload, que foi o que esta decisão autorizou; é **decisão nova**. **A lição, e ela é sobre medição:** o defeito passou pelo `npm run build`, pelo lint, pelo TypeScript e **pelo próprio Lighthouse**, que deu 82 com os 237 KB ainda sendo baixados. Só a medição nova do RNF-02 — carga real em largura de celular — reprovou. **Nota boa não é prova de contrato cumprido**, e um critério que não falha quando o defeito existe não é critério | Aberta |
| **D-63** | 07/09 | **O grupo `r3f` engoliu a família do React, e é por isso que 237 KB de 3D baixam num celular que nunca monta a cena.** Os três pacotes do React ganham grupo próprio, antes dos grupos 3D | A prova de rede do RNF-02, medida a 412 px em produção depois da D-62 (b): `three` (183,4 KB) e `r3f` (54,2 KB) **continuam baixando**. A D-62 (b) funcionou no que prometia — as dicas de `modulepreload` sumiram do HTML — mas **a premissa dela estava incompleta**: o `modulepreload` só **antecipava** um download que aconteceria de qualquer jeito. **A amarra real é um import estático da entrada.** O `codeSplitting.groups` do `vite.config.ts` declara `three` e `r3f` por regex sobre `node_modules`, e o agrupador varreu **`react-dom` e `scheduler` para dentro do grupo do 3D**. Como o `main.tsx` precisa de `react-dom` para o `createRoot`, a **entrada passa a depender estaticamente do chunk `r3f`** — que importa o `three`. O `React.lazy` e o `useCanRender3D` **estão certos e não são o problema**: a cena de fato nunca monta a 412 px, e o LCP é o `memoji.webp`. O que baixa é a biblioteca, por uma aresta de empacotamento. **O conserto:** um grupo explícito para `react`, `react-dom` e `scheduler`, **declarado antes** dos grupos `three` e `r3f`, para que a família do React tenha destino próprio e o grupo 3D volte a conter só 3D. **O que isto mexe e por que não é trivial:** fronteira de chunk muda o nome com hash de **todos** os arquivos afetados, então invalida o cache do site inteiro. Aqui o custo é aceitável e vale registrar por quê: **o site ainda não tem público** — invalidar cache antes do lançamento não custa nada, depois custaria uma visita lenta para todo mundo. Fazer agora é mais barato do que fazer em novembro. **Aceite, e ele é o mesmo critério que reprovou:** carga real a 412 px em produção **sem `three` nem `r3f` na aba de rede**; no desktop, as duas cenas ainda montam (Memoji e globo), e o Lighthouse não regride em nenhuma das oito notas. **A lição, e ela é a maior da semana:** este defeito passou pelo `npm run build`, pelo lint, pelo TypeScript **e pelo próprio Lighthouse**, que deu 82 com os 237 KB ainda descendo. Só o critério novo do RNF-02 reprovou — o critério **justificou a si mesmo na primeira vez que rodou**. Um requisito medido pelo artefato ("o chunk existe e tem tal tamanho") não é o mesmo que medido pelo comportamento ("ninguém baixa esse chunk"), e a diferença entre os dois escondeu 237 KB por quatro passos. **ENTREGUE em `8833165`, e o aceite passou inteiro.** O grupo `react` entrou antes dos grupos 3D, e a **ordem é o conserto** — não a existência do grupo. **Conferido no grafo do build, como esta decisão exigiu, e não só na configuração:** a entrada passou a importar `rolldown-runtime` e `react`, e mais nada; `r3f` importa `react` e `three`; `HeroScene` e `GlobeScene` importam `three`, `r3f` e `paleta`. Ou seja os dois chunks 3D **só são alcançáveis pelas cenas**, que é o que o `React.lazy` sempre quis dizer e nunca conseguiu entregar. **A prova de rede, a 412 px em produção:** `three` e `r3f` **ausentes**; peso total de 372 KiB para **138 KiB**; JS não usado de 202 KiB para **28 KiB**; o teto de 150 KB gzip do RNF-02 fica em **80 KB**. **Lighthouse: mobile 94, desktop 99**, as outras seis notas em 100 — o percurso da semana no mobile foi 68 → 82 → 94. **A regressão obrigatória não aconteceu:** a 1350 px o `HeroScene`, o `GlobeScene`, o `paleta` e a textura do globo continuam sendo buscados, então as duas cenas montam. **E o método de verificar isso foi calibrado antes de valer como prova** — a corrida de 07/09, no mesmo Chrome headless, já baixava as duas cenas no desktop e nenhuma no mobile, então ausência no desktop significaria regressão real e não limitação da ferramenta; sem essa calibração, "não apareceu" não distinguiria conserto de cena quebrada. **O que não foi reverificado, dito na cara:** arrasto e assentamento do globo não foram medidos de novo, porque não há como dirigir a página pelo Lighthouse. O argumento é outro e é conferível: o commit **tocou um arquivo só**, o `vite.config.ts`, então `useGlobeDrag.ts` e `Globe.tsx` seguem byte a byte como nas medições do D-59 e do adendo do D-55 — mudou o pacote em que o código viaja, não o código. **Fecha o Passo 10 e a fila de código do projeto** | Aberta |
---

## 15. Backlog v2

Vive em `docs/BACKLOG.md`. Resumo do que já está lá: tema claro/escuro, PT/EN,
seção Serviços, estudo de caso por projeto, cena reagindo ao scroll, Memoji em
vídeo, notebook 3D com os projetos rodando na tela, formulário de contato,
certificados, blog técnico, fontes self-hospedadas.

**Depois da v1:** os projetos-âncora de AI (revenue-leak detector e o agente em
Python puro) entram como novos cards. O site vira a vitrine deles — não o
contrário.
