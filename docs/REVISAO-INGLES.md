# Revisão do inglês — D-64 / RNF-09

**Revisado em 11/09/2026, a partir de `src/data/`** (não do `CONTENT.md`, que é
histórico). Cada item traz o texto atual, a correção e **o motivo** — sem o
motivo, uma revisão de texto vira gosto pessoal.

**Veredicto geral:** o texto está bom. Não há erro de gramática grave, a voz é
consistente e o ritmo funciona. Os problemas reais são **três**; os outros oito
são frases que um falante nativo escreveria de outro jeito — soam traduzidas,
não erradas.

---

## 1. Erros de fato — corrigir

| # | Onde | Está | Fica | Por quê |
|---|---|---|---|---|
| 1 | `profile.subheadline[1]` | …companies in marketing, legal, **transport and dental** since 2025. | …companies in marketing, **law, logistics and dentistry** since 2025. | **`dental` não existe como nome de setor** em inglês — é adjetivo. "in dental" soa como frase pela metade. `law` e `dentistry` são os nomes dos setores; `logistics` é mais preciso que `transport` para quem contrata. |
| 2 | `projects[0].impact` | **Turns a 30-minute writing task into under a minute**, at effectively zero hosting cost. | **Cuts a 30-minute writing task to under a minute**, at effectively zero hosting cost. | `turn X into Y` exige que X e Y sejam a mesma categoria. Aqui transforma **uma tarefa** em **uma duração** — a frase não fecha. `cut … to` é o verbo certo para tempo. |
| 3 | `profile.about[1]` | …and **the website** does not connect to anything. | …and **their website** doesn't connect to anything. | `the website` aparece sem nada antes que a defina — o leitor procura qual site e não acha. O dono é a empresa da frase anterior: `their`. |

## 2. Soam traduzidas — recomendo trocar

| # | Onde | Está | Fica | Por quê |
|---|---|---|---|---|
| 4 | `profile.subheadline[0]` e `about[2]` | I work **where things are ambiguous** | `subheadline`: I do my best work **where the problem isn't defined yet**.<br>`about[2]`: My job **starts where the problem isn't defined yet**: turn a mess into a clear plan, and only then build. | É a tradução literal de "trabalho onde as coisas são ambíguas". Em inglês `ambiguous` descreve **texto**, não situação de trabalho. E hoje a mesma frase aparece **duas vezes** — a segunda, `"My job is to work where things are ambiguous"`, ainda é circular: "meu trabalho é trabalhar onde…". |
| 5 | `profile.contactPitch` | …and **I read everything that arrives**. | …and **I reply to every message**. | `everything that arrives` é literal de "tudo que chega". E prometer que **lê** é fraco: o que a pessoa quer saber é se vai ter resposta. |
| 6 | `profile.about[3]` | …and keep building **inside the European tech ecosystem**. | …and keep building **from inside the European tech scene**. | `ecosystem` virou palavra de sala de reunião; `scene` é o que uma pessoa diz. E `from inside` marca que ele passa a estar **dentro**, que é o ponto da frase. |
| 7 | `projects[0].problem` | …stop tailoring it **per company** | …stop tailoring it **to each company** | `per company` é jargão de planilha. |
| 8 | `profile.subheadline[1]` | **Running in production** for companies in… | **In production** for companies in… | Sem sujeito, `Running` fica pendurado — gramaticalmente o sujeito seria a frase inteira anterior. `In production for…` é telegráfico de propósito e não tem esse problema. |
| 9 | `profile.availability` | Open to AI / automation roles in Dublin **and to freelance projects** | Open to AI / automation roles in Dublin **and freelance projects** | O segundo `to` não acrescenta nada e trava a leitura de uma linha que é curta de propósito. |

## 3. Consistência — escolher um e aplicar

| # | O quê | Situação |
|---|---|---|
| 10 | **Contrações** | O site mistura: `does not connect` e `I'm open`, `doesn't prove`. Não é erro, mas lê como dois autores. **Recomendo contrair sempre** — combina com a voz direta do resto e é o padrão de portfólio. |

## 4. Não é inglês, é número — conferir

| # | Onde | Está | Problema |
|---|---|---|---|
| 11 | `projects[2].impact` | **70 KB** of JavaScript before the 3D loads | O build de 11/09 dá **64,17 KB crus / 19,51 KB gzip** no chunk inicial, e **138 KB** na carga completa. O número de 70 KB é de antes da D-62 e da D-63. **Um portfólio que afirma um número precisa que ele esteja certo** — é o tipo de coisa que um entrevistador confere. Decidir qual métrica citar e atualizar. |

---

## O que NÃO mudar

`headline`, `aboutQuote`, `about[0]`, os três `solution`, o `problem` e o
`impact` do Titanic, o `problem` do "This site" e as quatro linhas da Stack
estão **idiomáticos e com ritmo**. `"A PDF CV doesn't prove someone can ship"`
e `"The team is not slow, the process is"` são as duas melhores frases do site
— não tocar.

Nomes próprios, nomes de tecnologia, o e-mail e os títulos dos projetos ficam
como estão.

---

## Limite desta revisão, dito com honestidade

Isto cobre gramática, idiomatismo e frase que soa traduzida. **O que não cobre:**
convenção local do mercado irlandês — se alguma expressão soa datada ou
corporativa demais em Dublin especificamente. Esse risco é pequeno para um
portfólio e é reversível em cinco minutos depois de publicado. Se aparecer
alguém fluente, vale uma leitura; não vale esperar por ela para publicar.
