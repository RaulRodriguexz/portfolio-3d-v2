# WORKFLOW — método de execução

**Versão 3.0 — 05/09/2026**

**Este documento é método, não plano.** O plano eram os dez passos que levaram
o site do zero ao ar; todos foram executados, e a lista saiu daqui na v3.0
(decisão D-47) junto com o ciclo de branches, que nunca chegou a ser usado — o
projeto sempre teve uma `main` só. O que sobrou é o que continua verdadeiro: as
regras, como se escreve um pedido bom, os prompts auxiliares, e o que fazer
quando o trabalho trava.

**A fonte do próximo passo é a seção 0 do `docs/PRD.md`, e só ela.**

---

## 1. As cinco regras

1. **Um passo por sessão.** Abriu o Claude Code, executou um passo, testou,
   commitou, fechou. Passo pela metade não vira commit.
2. **Todo pedido cita o PRD.** "Faz o hero bonito" é um pedido ruim. "Implemente
   o RF-06 e a seção 5.2 do PRD, só o hero" é um pedido bom.
3. **O plano vem antes do código.** Todo pedido de trabalho termina exigindo que o
   Claude descreva o que vai mudar e espere sua confirmação. Essa é a linha mais
   importante do documento — é ela que transforma um gerador de código em um par
   que pensa antes de mexer.
4. **Ideia nova vai para `docs/BACKLOG.md`,** nunca para a branch atual. Anotar
   custa 10 segundos; refazer custa uma semana.
5. **Se `npm run build` não passa, o passo não terminou.** Sem exceção.

---

## 2. Anatomia de um bom prompt

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

## 3. Prompts auxiliares

Use quando precisar, em qualquer item da fila.

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

## 4. Quando você travar

Sinais de que o passo está grande demais:

- **você não consegue dizer o que muda em até 3 linhas** — nem antes de
  começar, nem depois de terminar
- o build quebrou duas vezes seguidas
- você está aceitando código que não entendeu

O limiar antigo era "mexeu em mais de cinco arquivos". Ele foi aposentado na
v3.0: o commit do D-31 tocou 12 arquivos e passou no build e na medição. Contar
arquivo não discrimina passo grande de passo largo; conseguir descrever a
mudança, sim.

**O procedimento:** `git checkout .`, apaga tudo, quebra o passo em dois e
recomeça pelo menor. Jogar 40 minutos fora é mais barato que arrastar um projeto
quebrado por três semanas — foi exatamente isso que aconteceu na v1.

E se a vontade for de adicionar mais uma coisinha: `docs/BACKLOG.md`. Sempre.
