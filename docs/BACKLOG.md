# BACKLOG — o que fica para depois da v1

Toda ideia que aparecer durante a construção vem para cá **na hora**, e a sessão
continua no passo em que estava. Anotar custa 10 segundos. Perseguir custa a v1.

Formato de uma entrada nova: `- <data> — <ideia>. Motivo: <por que eu quis>.`

---

## Cortado da v1 por decisão registrada

Itens que já estiveram no escopo e saíram. O ID aponta para o log de decisões do
PRD (seção 14).

| Item | Decisão | Por que saiu |
|---|---|---|
| ~~Alternância de idioma PT/EN~~ | D-06, revertida pela **D-61** | Saiu em 03/09 porque o público é Dublin. **Voltou ao escopo em 07/09**, por pedido do Raul: o problema não era falta de português, era o português **errado** que o tradutor do navegador já produzia. Entra por último, depois da revisão do inglês e **depois do lançamento de 10/10** |
| Seção Serviços | D-07 | Os cards de projeto já respondem "dá para contratar?" |
| Notebook 3D em `.glb` no hero | D-10 | O Memoji como textura entrega o mesmo efeito por 100 KB em vez de 3 MB |

## Fila da v2

Ordenado por quanto cada item ajuda o objetivo de negócio, não por quão
divertido é de construir.

**Alto impacto**

- Estudo de caso em página própria para os dois projetos-âncora de AI
- Ícone de cada tecnologia na seção de stack (leitura mais rápida para recrutador)
- Capas de projeto (1200 × 630) nos cards
- Seção de certificados e cursos

**Médio impacto**

- Memoji em vídeo na cena do hero, com captura facial do iPhone
- Notebook 3D com os projetos rodando na tela
- Cena 3D reagindo ao scroll
- Blog técnico curto: 2 ou 3 posts sobre os agentes construídos
- ~~Alternância de idioma PT/EN~~ — **promovida para a v1 em 07/09** (D-61), e
  é o último item da fila
- ~~Alternância de tema claro/escuro~~ — **promovido para a v1 em 05/09**, por
  pedido repetido do Raul. Ver D-44 no PRD: entra por último na fila, com o
  custo escrito, e é o primeiro item a ser cortado se o prazo apertar.

**Baixo impacto / manutenção**

- ~~Fontes self-hospedadas em `public/fonts/`, saindo do Google Fonts~~ — **feita em 07/09** (D-62 a), e não por capricho de manutenção: a folha do Google bloqueava a pintura por 825 ms e valia **14 pontos** de Lighthouse no celular
- Formulário de contato com backend
- Seção Serviços
- Testes automatizados, se o site ganhar lógica de verdade

---

## ~~Boas práticas a aplicar no Passo 9~~ — ✅ todas aplicadas

- **JSON-LD `schema.org/Person`** no `<head>`: dá ao Google nome, cargo, cidade,
  e-mail e perfis externos. É o que faz o nome aparecer como entidade na busca.
- `robots.txt` e `sitemap.xml` estáticos.
- `font-synthesis-weight: none` no CSS: se um peso faltar, o texto fica mais
  leve em vez de deformado. Cinto de segurança com a Sansation, que só tem
  300/400/700 — e, desde a D-62 (a), o site **só embarca 400 e 700**, porque a
  varredura não achou nenhum itálico nem uso real do 300. Ou seja, o cinto vale
  mais agora do que valia quando esta linha foi escrita.

*Passo 9 fechado em 07/09: JSON-LD, `robots.txt` e `sitemap.xml` no ar, e o
`@vercel/analytics` ligado. Fica aqui como registro do que foi aplicado.*

---

## Ideias novas

- 2026-09-11 — **arquitetura de agentes (QA funcional, revisor crítico, modelo por
  papel)**, sugerida pelo vaccari. Motivo para adiar, não para descartar: agentes
  pagam em desenvolvimento contínuo em muitos arquivos, e **a fila de código deste
  projeto está vazia** — o que falta é conteúdo, uma pessoa revisando inglês e
  publicar. Montar agora custa token num prazo (10/10) cujo item bloqueante é
  humano. **Observação que vale guardar:** a separação já existe informalmente e
  é o motivo de a semana de 05–07/09 ter funcionado — o Cowork escreve o PRD e
  decide, o Claude Code mede e codifica, e os melhores achados vieram da fricção
  entre os dois (a hipótese do mecanismo da atmosfera foi minha e estava errada;
  a medição dele corrigiu). Ou seja: **revisor crítico e QA funcional já estão
  rodando**, só não têm nome. Fazer de verdade **depois de publicar**, nos
  projetos de IA, quando houver repositório vivo e já se souber quais papéis
  fazem falta.

  **13/09 — o `docs/AGENTES.md` foi recolhido para cá.** O documento descrevia
  os três agentes como se estivessem instalados (*"os três vivem em
  `.claude/agents/`"*), e **a pasta nunca foi criada** — só existe o
  `CLAUDE.md` ali. O Raul não chegou a colar o conteúdo dos arquivos. Um
  documento em `docs/` que descreve infraestrutura inexistente é a mesma falha
  muda do README "esqueleto": bem escrito, coerente e falso. **O desenho não
  se perde** — está inteiro em `9788a5b:docs/AGENTES.md` (2.434 bytes), e
  `git show` o traz de volta quando os agentes forem instalados de verdade.

- ~~2026-09-04 — **links e botões magnéticos**~~ — ✅ **entregue como M-27 em
  05/09**, e medido: 0 px longe, 4 px a meio raio, 8 px no teto, 0 px ao sair;
  no toque o ímã nem chega a ser instalado. Saiu do backlog e está no PRD.
- 2026-09-04 — **unificar a linguagem visual das duas cenas 3D**: as órbitas do
  hero passam a usar o mesmo motivo de pontos do globo, para a página ler como
  um lugar só em vez de dois enfeites separados. Custo zero em KB — é a mesma
  geometria com outro material. Motivo: hoje o hero e o globo não se parecem.

<!-- Exemplo:
- 2026-09-10 — cursor customizado no hero. Motivo: vi num site e achei bonito.
-->

---

## Regra deste arquivo

Uma ideia entregue **não some daqui em silêncio**: fica riscada, com a data e o
ID de onde ela virou realidade. Backlog que só cresce vira lista de compras;
backlog que registra a saída vira memória de para onde o projeto foi.

E o inverso também vale, e aconteceu duas vezes: um item **cortado** pode
voltar — o tema escuro (D-44) e o bilíngue (D-61) saíram e voltaram. Quando
voltar, a linha do corte é atualizada em vez de apagada, para que o motivo
antigo continue visível ao lado do novo.
