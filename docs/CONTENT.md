# CONTENT — os textos do site

**Rascunho 3 — 03/09/2026.** Escrito a partir do que você já tinha escrito sobre
si mesmo — no LinkedIn e em textos anteriores seus — mais o que você me contou
hoje. A maior parte deste documento **é texto seu**, só reorganizado. O que é
meu está marcado.

**Status:** ✅ **aprovado em 03/09/2026.** Headline, e-mail e estratégia de
projetos decididos. Este texto está pronto para ir para `src/data/` no Passo 2.

> ## ⚠️ Status: HISTÓRICO. A verdade do texto é `src/data/`
>
> Aprovado em 03/09/2026 e **superado pelo código**. Medido em 07/09: seis
> campos que estão no ar **nunca existiram aqui** — `role`, `ctaLabel`, `route`,
> o sufixo da faixa de impacto e os dois blocos de metadados de seção — mais os
> quatro rótulos do menu; e **três passagens foram reescritas depois da
> aprovação** (a citação de abertura do About saiu de dentro do parágrafo 2 na
> D-52, o parágrafo 2 foi emendado por causa disso, e o subtítulo do hero virou
> dois períodos). Há ainda duas divergências sistemáticas: o apóstrofo é reto
> aqui e tipográfico no código, e as quatro linhas da Stack ganharam ênfase
> `**…**` que não existe aqui.
>
> **Consequência prática, e é a que importa:** qualquer pacote de revisão de
> texto — a D-64 inclusive — sai de **`src/data/`**, dos componentes, do
> `index.html` e do `404.html`. Saindo daqui, o revisor não veria dez trechos
> que estão no ar e revisaria três que já não estão.
>
> **Este arquivo continua valendo para uma coisa:** o *porquê* de cada texto —
> de onde veio, o que foi descartado e com que motivo. Isso o código não
> guarda. O andaime de decisão (conflitos e opções de headline) foi para o
> `DECISOES-ARQUIVADAS.md` em 07/09, já resolvido.

**Convenção de ênfase (D-38):** um par de `**` marca o único trecho destacado
do parágrafo. O site o renderiza em `primary-deep` pelo componente `Emphasis`.
Um por parágrafo — dois destaques na mesma frase anulam um ao outro.

Idioma do site: **inglês**. A tradução embaixo de cada bloco é só para
conferência.

---

## 1. Headline — a frase do hero

**A.** ⭐ *(recomendada — é uma frase sua, só aparada)*
> I build systems that take repetitive work off people's calendars.

*PT: Construo sistemas que tiram o trabalho repetitivo da agenda das pessoas.*

**B.** *(também sua — a outra metade da mesma frase)*
> I connect apps, models and APIs so information moves on its own.

*PT: Conecto aplicativos, modelos e APIs para a informação andar sozinha.*

**C.** *(minha)*
> I find where a company is losing time and money, and I automate it away.

*PT: Descubro onde uma empresa perde tempo e dinheiro, e automatizo isso.*

**D.** *(minha)*
> AI automation for companies still doing it by hand.

*PT: Automação com IA para empresas que ainda fazem tudo na mão.*

> **Por que a A.** Ela já era a melhor frase que você tinha escrito, e você a
> escreveu sem pensar em headline. Fala de calendário e de pessoas, não de
> tecnologia — é a linguagem de quem contrata. A B é a versão técnica da mesma
> ideia e funciona melhor como subtítulo do que como título.

**Escolhida:** ✅ **A** — `I build systems that take repetitive work off people's calendars.`

---

## 2. Subtítulo do hero

*(sua linguagem do LinkedIn + o método que você me descreveu hoje)*

> A self-taught AI and automation developer. I work where things are ambiguous
> — turning messy problems into clear plans, then into systems that connect
> apps, models and APIs so **information moves on its own**. Running in
> production for companies in marketing, legal, transport and dental since 2025.

*PT: Desenvolvedor autodidata de IA e automação. Trabalho onde as coisas são
ambíguas e desestruturadas — transformo problemas bagunçados em planos claros, e
depois em sistemas que conectam apps, modelos e APIs para a informação andar
sozinha. Rodando para empresas de marketing, jurídico, transporte e odontologia
desde 2025.*

> *Este parágrafo é quase todo seu: "I like working where things are ambiguous
> and unstructured: turning messy problems into clear plans" veio do About do
> seu LinkedIn, e é exatamente o método que você me descreveu hoje.*

**Campos curtos do hero:**

- **location:** `Brazil → Dublin, Ireland · October 2026`
- **availability:** `Open to AI / automation roles in Dublin and to freelance projects`
- **alternativa mais sua** *(do seu headline do LinkedIn)*: `Building AI tools in public · Open to roles in Dublin and freelance work`

---

## 3. Sobre

*(sua história, do jeito que você me contou hoje)*

> I got into technology as a kid, the day a computer showed up at home. Python
> first, then Java, C++ and C# — and eventually the AI tools that turned
> curiosity into work.
>
> Since 2025 I have worked directly with company owners, and the pattern
> repeats: **the team is not slow, the process is**. Information gets lost
> between people, payments are handled by hand, and the website does not
> connect to anything.
>
> My job is to work where things are ambiguous: turn a messy problem into a
> clear plan, **and only then build**. Usually the answer is an automation, an
> AI assistant, or a system that finally has everything in one place.
>
> In **October 2026** I move to Dublin to study at SEDA College and keep
> building inside the European tech ecosystem.

*PT: Entrei em tecnologia ainda criança, no dia em que um computador apareceu em
casa. Python primeiro, depois Java, C++ e C# — e no fim as ferramentas de IA que
transformaram curiosidade em trabalho. Desde 2025 trabalho direto com donos de
empresa, e o padrão se repete: o time não é lento, o processo é. A informação se
perde entre as pessoas, o pagamento é feito na mão, e o site não conversa com
nada. Meu trabalho é sentar com esse problema primeiro, escrever um plano, e só
então construir. Em outubro de 2026 me mudo para Dublin, para estudar no SEDA
College.*

---

## 4. Chamada final — contato

*(fecha com uma frase sua: "I read everything that arrives")*

> If your team is **losing hours every week** to something a machine should be
> doing, tell me about it. I'm open to roles in Dublin and to freelance work,
> and I read everything that arrives.

*PT: Se o seu time perde horas por semana com algo que uma máquina deveria estar
fazendo, me conta. Estou aberto a vagas em Dublin e a trabalho freelance, e leio
tudo que chega.*

---

## 5. Projetos

**Decisão de 03/09:** a v1 sobe com **três projetos**, sendo um em destaque e
dois compactos. Os projetos grandes de IA que você vai construir depois entram
como destaque, e estes três descem para o segundo plano.

**Onde o trabalho com clientes aparece:** não como card, mas como **linha de
credibilidade** no subtítulo e no Sobre — *"running for companies in marketing,
legal, transport and dental since 2025"*. Você ganha a prova de que empresas
reais te pagam, sem precisar expor cliente nem inventar número.

> **Um alerta honesto.** A seção de projetos é a que converte: é onde o
> recrutador decide. Três cards bem escritos convertem; três cards apressados,
> não. Como esta é a única seção que fica "provisória" até os projetos grandes,
> vale escrever bem agora, não depois.

### 01 — Cover Letter Assistant ⭐ destaque

- **Problema:** Job seekers rewrite the same cover letter dozens of times and
  stop tailoring it per company — which is exactly what makes an application land.
- **O que você construiu:** A live tool: a static front end talking to a
  Cloudflare Worker that prompts the OpenAI API. No server to maintain, no API
  key exposed in the browser.
- **Impacto:** Turns a 30-minute writing task into under a minute, at
  effectively zero hosting cost.
- **Stack:** JavaScript · OpenAI API · Cloudflare Workers
- **Demo:** https://raulrodriguexz.github.io/cover-letter-api
- **Por que é o destaque:** é o único que qualquer pessoa pode abrir e usar
  agora. Um link que funciona vale mais que uma descrição.

### 02 — Titanic ML

- **Problema:** Before claiming to work with machine learning, I wanted a
  public, reproducible result instead of a certificate.
- **O que você construiu:** A full pipeline — exploratory analysis, feature
  engineering, model comparison and validation — with every decision documented
  in the README.
- **Impacto:** 0.78 on Kaggle, with the reasoning written down end to end.
- **Stack:** Python · scikit-learn · pandas
- **Repo:** https://github.com/RaulRodriguexz/titanic-machine-learning

### 03 — This site

- **Problema:** A PDF CV doesn't prove someone can ship. A portfolio that is
  itself a working product does.
- **O que você construiu:** Built from a written product spec: React, React
  Three Fiber and Tailwind, with the 3D scene code-split so the content renders
  before the WebGL bundle loads.
- **Impacto:** 70 KB of JavaScript before the 3D loads — and fully usable
  with WebGL switched off.
- **Stack:** React · TypeScript · React Three Fiber · Tailwind
- **Repo:** https://github.com/RaulRodriguexz/portfolio-3d-v2

---

## 6. Stack

*(suas tecnologias, reagrupadas por uso)*

- **AI & Agents** — *Turning language models into systems that actually do work.*
  LLM APIs · RAG · OpenAI API · AI support assistants
- **Automation** — *Taking repetitive work off the calendar.*
  Python · n8n · API integrations · document data extraction
- **Data** — *Getting from raw records to a decision.*
  pandas · scikit-learn · machine learning
- **Web** — *Shipping the interface that makes the work visible.*
  JavaScript · TypeScript · React / Next.js · Tailwind · Three.js · Cloudflare Workers

**Linha final da seção:** `Also studied: Java, C++, C#`

---

## 7. Links e arquivos — o que já existe

| Item | Valor recuperado | Ação |
|---|---|---|
| CV em PDF | `raulrodriguexz.github.io/CV_Raul_Rodrigues.pdf` | ✅ existe — **baixe e coloque em `public/cv.pdf`**, para o site não depender de outro domínio |
| Domínio pretendido | `raulrodrigues.dev` | Confira se está livre |
| GitHub | `github.com/RaulRodriguexz` | ✅ |
| E-mail | `raulrodrigues.mldev@gmail.com` | Confirmar (conflito 1) |
| LinkedIn | `linkedin.com/in/raulrodriguexz` | ✅ confirmado no print |
| Referências visuais do v1 | pszostak.pl · aaabadcode.com | Copie os prints para `references/inspiracao/` |

---

## Notas do rascunho

- **Não inventei nenhum número.** O único impacto quantificado é o 0.78 do
  Kaggle, que é seu e é verificável.
- O melhor texto deste documento é seu. A frase *"systems that take repetitive
  work off people's calendars"* é boa demais para ficar escondida — por isso
  virou a headline.
- Anotei no BACKLOG as boas práticas de SEO para o Passo 9 (JSON-LD de
  `schema.org/Person`, robots, sitemap, Open Graph).

---
