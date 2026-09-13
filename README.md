# portfolio-3d-v2

Portfólio de **Raul Rodrigues** — AI Solutions Engineer.
No ar em **[raulrodrigues.dev](https://raulrodrigues.dev)**.

Página única, tema claro e escuro, com duas cenas 3D: o Memoji no hero e um
globo que aponta Dublin. O site é também o argumento — foi construído a partir
de uma especificação escrita, e cada decisão está registrada.

| | |
|---|---|
| **Carga no celular** | 138 KB — o pacote 3D **não** é baixado lá |
| **Lighthouse** | 99 desktop · 94 mobile · 100 em acessibilidade, boas práticas e SEO |
| **Sem WebGL** | o site continua inteiro, com imagem no lugar da cena |
| **Cookies** | zero |

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · React Three Fiber · Vercel

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tem que passar antes de qualquer commit
npm run preview   # a versão de produção, que é a que vale para julgar
```

## Os documentos

O projeto é dirigido por documento, não por memória. Quem for mexer aqui
começa por estes:

| Arquivo | O que é |
|---|---|
| `docs/PRD.md` | **O contrato.** O que o site é, o que ele não é, e o log de todas as decisões com o motivo de cada uma. A seção 0 é o painel: leia-a primeiro |
| `docs/ARCHITECTURE.md` | Onde cada tipo de arquivo mora e as cinco regras que sustentam isso |
| `docs/DECISOES-ARQUIVADAS.md` | O motivo das decisões antigas, tirado do PRD para ele continuar legível. **Congelado** — só se lê |
| `docs/WORKFLOW.md` | O método: como se escreve um pedido bom e o que fazer quando trava |
| `docs/BACKLOG.md` | Ideia nova espera aqui |

## Quatro coisas que quebram em silêncio

Estão detalhadas na **seção 16 do PRD**, que cataloga as falhas deste projeto que
não geram erro nenhum. As quatro que mais custam:

1. **`background-color` no `<body>`** faz o grão e o fio sumirem juntos. Build
   verde, lint limpo, zero erro no console. O fundo mora no `<html>`.
2. **Não existe `tailwind.config.js`.** No Tailwind v4 o tema é o CSS — está em
   `src/index.css`, no bloco `@theme`.
3. **A ordem dos grupos em `vite.config.ts` é o RNF-02.** O grupo `react` vem
   antes dos grupos 3D; invertendo, 237 KB de Three.js voltam a ser baixados
   por celulares que nunca montam a cena.
4. **Chunk próprio não é o mesmo que não ser baixado.** O RNF-02 se mede por
   carga real em largura de celular, nunca pela saída do `npm run build`.

## Regra de ouro

Nada entra no código se não estiver no PRD. Ideia nova vai para o
`docs/BACKLOG.md` e espera.

E decisão se escreve pelo **resultado observável**, não pela lista de mudanças:
lista vira checklist que alguém executa sem conferir; resultado vira teste que
alguém confere.
