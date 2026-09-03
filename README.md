# portfolio-3d-v2

Portfólio pessoal do Raul Rodrigues. Página única, tema escuro, com uma cena 3D
no hero. Recomeço planejado do projeto anterior.

> **Este repositório é um esqueleto.** O conteúdo, o design final e a cena 3D
> ainda não existem — são construídos passo a passo, seguindo `docs/WORKFLOW.md`.

## Comece por aqui

1. `docs/PRD.md` — o que o site é, e principalmente o que ele **não** é
2. `docs/WORKFLOW.md` — os 10 passos e o modelo de prompt para o Claude Code
3. `docs/ARCHITECTURE.md` — onde cada tipo de arquivo mora

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tem que passar antes de qualquer commit
npm run preview   # ver a versão de produção
```

## Stack

Vite 8 · React 19 · TypeScript · Tailwind CSS v4 · React Three Fiber

O tema (cores e fontes) fica em `src/index.css`, no bloco `@theme`.
Não existe `tailwind.config.js` — no Tailwind v4 a configuração é o CSS.

## Regra de ouro

Nada entra no código se não estiver no PRD. Ideia nova vai para
`docs/BACKLOG.md` e espera a v2.
