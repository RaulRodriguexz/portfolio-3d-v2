# Arquitetura de agentes — portfólio

**Escrita em 11/09/2026, a partir do que funcionou e do que desperdiçou tempo.**

## A ideia, em uma frase

**O nível de esforço é a arquitetura.** Os três papéis não diferem tanto no que
fazem; diferem em **quanto pensamento cada um merece** — e foi misturar os três
numa sessão só que produziu uma rodada de 34 minutos.

| Agente | Esforço | Para quê | Custo |
|---|---|---|---|
| **medidor** | `xhigh` | achar causa, provar aceite, reprovar requisito com número | alto, e vale |
| **aplicador** | `medium` | escrever código de decisão já tomada | baixo |
| **guardiao** | `medium`, modelo menor | auditar os documentos | muito baixo |

## Por que só três

A sugestão original tinha "QA funcional, revisor crítico e orquestrador". Neste
projeto:

- **O revisor crítico já existe e é o Cowork** — quem escreve o PRD e discute a
  decisão. Duplicar o papel gastaria token para produzir a mesma opinião.
- **O orquestrador é o Raul.** Ele lê os dois relatórios e decide. Nenhum modelo
  precisa fingir esse papel, e dizer a um modelo que ele "é o orquestrador" não
  concede capacidade nenhuma — o que orquestra é o **contrato escrito**, e o
  contrato é o PRD.
- **QA funcional virou `medidor`**, com um recorte mais duro: ele não testa, ele
  **mede** — e não aplica o conserto, porque quem mede e conserta na mesma
  passada tende a enxergar o que confirma a própria correção.

## A regra que separa os dois primeiros

Se a pergunta é **"por que isso acontece?"** → `medidor`, `xhigh`.
Se a pergunta é **"escreva o que está no PRD"** → `aplicador`, `medium`.

Uma sessão que faz as duas coisas paga `xhigh` pela metade que não precisava.

## Onde se troca, na mão

- `/effort` — abre o seletor; ou direto: `/effort medium`, `/effort xhigh`.
  `Enter` salva como padrão, `s` aplica só nesta sessão.
- `/model` — troca o modelo, mesma lógica de `Enter` e `s`.
- Ao iniciar: `claude --model opus --effort xhigh`.

## Como invocar os agentes

Os três vivem em `.claude/agents/`. Chame pelo nome na conversa, digite `@`
para escolher da lista, ou inicie direto com `claude --agent medidor`.

**O frontmatter de cada arquivo carrega o próprio `model` e `effort`** — ou
seja, chamar o `aplicador` já entra em `medium` sem você trocar nada na mão. É
isso que faz a economia acontecer sozinha em vez de depender da sua memória.
