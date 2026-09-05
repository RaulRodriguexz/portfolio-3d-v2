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
| Alternância de idioma PT/EN | D-06 | O público é Dublin. Dobrava o trabalho de conteúdo sem aumentar conversão |
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
- Alternância de idioma PT/EN
- ~~Alternância de tema claro/escuro~~ — **promovido para a v1 em 05/09**, por
  pedido repetido do Raul. Ver D-44 no PRD: entra por último na fila, com o
  custo escrito, e é o primeiro item a ser cortado se o prazo apertar.

**Baixo impacto / manutenção**

- Fontes self-hospedadas em `public/fonts/`, saindo do Google Fonts
- Formulário de contato com backend
- Seção Serviços
- Testes automatizados, se o site ganhar lógica de verdade

---

## Boas práticas a aplicar no Passo 9

- **JSON-LD `schema.org/Person`** no `<head>`: dá ao Google nome, cargo, cidade,
  e-mail e perfis externos. É o que faz o nome aparecer como entidade na busca.
- `robots.txt` e `sitemap.xml` estáticos.
- `font-synthesis-weight: none` no CSS: se um peso faltar, o texto fica mais
  leve em vez de deformado. Cinto de segurança com a Sansation, que só tem
  300/400/700.

---

## Ideias novas

- 2026-09-04 — **links e botões magnéticos**: ao chegar a ~60 px do cursor, o
  elemento se inclina levemente na direção dele e volta ao sair. ~15 linhas, só
  `transform`, sem biblioteca. Motivo: é a interação que faz a pessoa mexer o
  mouse de propósito para ver de novo. **Não** é cursor customizado, que segue
  proibido na seção 6 do PRD. Adiada em 04/09 junto com a de baixo, para o lote
  de mágica da v1 ficar em duas ideias em vez de quatro.
- 2026-09-04 — **unificar a linguagem visual das duas cenas 3D**: as órbitas do
  hero passam a usar o mesmo motivo de pontos do globo, para a página ler como
  um lugar só em vez de dois enfeites separados. Custo zero em KB — é a mesma
  geometria com outro material. Motivo: hoje o hero e o globo não se parecem.

<!-- Exemplo:
- 2026-09-10 — cursor customizado no hero. Motivo: vi num site e achei bonito.
-->
