# Arquitetura e organização de pastas

## Por que cada coisa tem seu lugar

Na v1 o conteúdo morava dentro do JSX, o 3D morava junto do layout e não havia
onde guardar referência nem fonte. Resultado: mudar uma frase exigia caçar em
qual componente ela estava. Aqui, cada tipo de coisa tem uma pasta e só uma.

---

## Árvore

```
portfolio-3d-v2/
│
├── .claude/
│   └── CLAUDE.md              ← MEMÓRIA do projeto para o Claude Code.
│                                 Lido automaticamente toda vez que ele abre
│                                 a pasta. Regras, stack, o que não fazer.
│
├── docs/                      ← PLANEJAMENTO. Não vai para o site.
│   ├── PRD.md                    o que o site é e o que não é
│   ├── ARCHITECTURE.md           este arquivo
│   ├── WORKFLOW.md               os passos e os prompts certos
│   ├── CONTENT.md                rascunho dos TEXTOS antes de virarem código
│   └── BACKLOG.md                onde as ideias novas esperam a v2
│
├── references/                ← REFERÊNCIAS visuais. Fora do build.
│                                 Prints de sites que você gosta, paletas,
│                                 esboços. Serve para você mostrar ao Claude
│                                 "quero algo assim".
│
├── public/                    ← ARQUIVOS ESTÁTICOS servidos como estão.
│   ├── fonts/                    fontes self-hosted (quando sair do Google)
│   ├── models/                   modelos 3D .glb (v2 — vazio por enquanto)
│   ├── images/
│   │   └── projects/             capas dos projetos, 1200×630
│   ├── cv.pdf                    seu currículo (você coloca)
│   ├── og.png                    imagem de preview em redes sociais
│   └── favicon.svg
│
└── src/                       ← CÓDIGO.
    ├── main.tsx                  ponto de entrada, não mexer
    ├── App.tsx                   monta o layout e a ordem das seções
    ├── index.css                 TEMA: cores, fontes, animações base
    │
    ├── data/                  ← TODO O CONTEÚDO do site vive aqui.
    │   ├── profile.ts            você, headline, about, links
    │   ├── projects.ts           lista de projetos
    │   ├── stack.ts              ferramentas agrupadas
    │   └── nav.ts                itens do menu
    │
    ├── sections/              ← As faixas da página, uma por arquivo.
    │   ├── Hero.tsx  About.tsx  Projects.tsx  Stack.tsx  Contact.tsx
    │
    ├── components/
    │   ├── layout/               Container, Section, Header, Footer
    │   ├── ui/                   peças reutilizáveis (Button, Tag, Card...)
    │   └── three/                TUDO de 3D fica isolado aqui
    │
    └── hooks/                    comportamentos reaproveitáveis
```

---

## As quatro regras que sustentam isso

**1. Conteúdo em `src/data/`, nunca no JSX.**
Trocar uma frase do site = editar um arquivo `.ts` de dados. Nenhum componente
contém texto de verdade. É isso que permite adicionar tradução PT/EN depois sem
reescrever o site.

**2. Todo o 3D isolado em `components/three/`.**
Nada fora dessa pasta importa `three` diretamente. A pasta inteira entra por
`React.lazy`, então o Three.js vira um chunk separado que só é baixado depois do
conteúdo aparecer. É o que segura a performance no celular (RNF-02, RNF-03).

**3. Seções não desenham espaçamento.**
Toda seção usa `<Section>`, que já resolve âncora, respiro, título e animação de
entrada. Se você precisa mexer no ritmo da página, mexe em um arquivo só.

**4. Cor e fonte só via tokens.**
Definidos em `src/index.css`, dentro de `@theme`. No Tailwind v4 o tema mora no
CSS — **não existe `tailwind.config.js` neste projeto**. Nada de `#5eead4` solto
no meio de um `className`; use `text-accent`, `border-line`, `bg-ink`.

---

## Onde colocar cada coisa nova

| Você tem... | Vai para |
|---|---|
| Um texto do site | `src/data/` |
| Um rascunho de texto ainda cru | `docs/CONTENT.md` |
| Um print de inspiração | `references/` |
| Uma imagem que aparece no site | `public/images/` |
| Um modelo 3D | `public/models/` |
| Uma fonte baixada | `public/fonts/` |
| Um efeito, geometria ou shader | `src/components/three/` |
| Um botão, tag, card | `src/components/ui/` |
| Uma faixa nova da página | `src/sections/` + registrar em `App.tsx` e `data/nav.ts` |
| Uma ideia para depois | `docs/BACKLOG.md` |
| Uma regra que o Claude tem que lembrar sempre | `.claude/CLAUDE.md` |

---

## Fluxo de dados

```
src/data/*.ts  →  src/sections/*.tsx  →  src/components/**  →  tela
     ↑
   você edita aqui na maior parte do tempo
```

Se para mudar uma frase você precisou abrir um componente, alguma dessas regras
foi quebrada — conserte antes de seguir.
