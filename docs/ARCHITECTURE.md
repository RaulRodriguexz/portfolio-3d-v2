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
│   ├── DECISOES-ARQUIVADAS.md    o MOTIVO das decisões D-01 a D-53 e o
│   │                             changelog antigo, tirados do PRD em 07/09
│   │                             para ele voltar a caber numa sessão. É
│   │                             CONGELADO: nada se edita aqui, só se lê
│   ├── ARCHITECTURE.md           este arquivo
│   ├── WORKFLOW.md               MÉTODO: as regras e os prompts auxiliares.
│   │                             Os dez passos saíram na D-47 — a fila mora
│   │                             na seção 0 do PRD, e só lá
│   ├── CONTENT.md                os textos como foram APROVADOS em 03/09.
│   │                             ⚠ o site mudou depois (D-52, D-53): a
│   │                             verdade do texto é `src/data/`, não este
│   └── BACKLOG.md                onde as ideias novas esperam a v2
│
├── index.html                 ← Não é só a casca. A ordem REAL do `<head>`,
│                                 medida em 07/09, é: script anti-flash do tema
│                                 (l. 20, frente 6 do D-44) → `<title>` (43) →
│                                 `canonical` (66) → JSON-LD (81) → preload das
│                                 duas faces da fonte (133 e 140). O anti-flash
│                                 tem de continuar ANTES da folha de estilo; o
│                                 preload é o ÚLTIMO do `<head>`, e é essa
│                                 ordem que deu os 94 no celular. Mexer aqui é
│                                 mexer em comportamento medido
│
├── vite.config.ts             ← Os grupos de chunk. O grupo `react` vem ANTES
│                                 dos grupos `three` e `r3f`, e essa ordem é o
│                                 RNF-02 (ver regra 2 abaixo)
│
├── public/                    ← ARQUIVOS ESTÁTICOS servidos como estão.
│   ├── fonts/                    Sansation 400 e 700 em .woff2, self-hospedadas
│   │                             desde a D-62 (a), com o OFL.txt ao lado. Saiu
│   │                             do Google Fonts porque a folha bloqueava a
│   │                             pintura por 825 ms — 14 pontos de Lighthouse
│   ├── models/                   modelos 3D .glb (v2 — vazio por enquanto)
│   ├── images/
│   │   ├── projects/             capas dos projetos, 1200×630
│   │   ├── memoji.png            o Memoji, textura da cena do hero
│   │   ├── memoji.webp           o mesmo, para o fallback sem WebGL
│   │   └── world-dots.png        continentes do globo, 15,6 KB (D-19, D-56,
│   │                             D-58a). O nome é de quando eram pontos; desde
│   │                             o D-58a a terra é maciça. Proveniência e as duas
│   │                             armadilhas de regeração no README da pasta
│   ├── images/README.md          proveniência das imagens — leia antes de
│   │                             regerar o `world-dots.png`
│   └── fonts/README.md           de onde vieram os `.woff2` e por que só duas
│   ├── cv.pdf                    seu currículo (você coloca)
│   ├── og.png                    imagem de preview em redes sociais
│   ├── favicon.svg
│   ├── robots.txt                RNF-07
│   └── sitemap.xml               RNF-07
│
└── src/                       ← CÓDIGO.
    ├── main.tsx                  ponto de entrada, não mexer
    ├── App.tsx                   monta o layout e a ordem das seções
    ├── index.css                 TEMA: cores, fontes, animações base
    │
    ├── data/                  ← TODO O CONTEÚDO do site vive aqui.
    │   ├── profile.ts            você, headline, about, links, metadados
    │   ├── projects.ts           lista de projetos
    │   ├── stack.ts              ferramentas agrupadas
    │   └── nav.ts                navItems (o menu) E sectionOrder (a numeração)
    │
    ├── sections/              ← As faixas da página, uma por arquivo.
    │   ├── Hero.tsx              nome e função nos cantos, palco do Memoji
    │   ├── Statement.tsx         a frase de posicionamento (D-17)
    │   ├── About.tsx  Projects.tsx  Stack.tsx  Contact.tsx
    │   └── Location.tsx          globo 3D, coordenadas e relógio (D-19)
    │
    ├── components/
    │   ├── layout/               a casca da página e as camadas de fundo:
    │   │                         Container, Section, Header, Footer, Intro,
    │   │                         Thread (o fio do D-37), ThemeToggle (D-44)
    │   ├── ui/                   peças reutilizáveis, usadas mais de uma vez
    │   │                         ou parametrizadas por dado: Button, Tag,
    │   │                         ProjectCard, WordReveal, Emphasis, Marquee,
    │   │                         CopyEmail, ImpactBand, EmptyState
    │   └── three/                TUDO de 3D fica isolado aqui: HeroScene,
    │                             HeroVisual, MemojiCard, Backdrop,
    │                             GlobeScene, Globe, Marker, e paleta.ts — as
    │                             cores das cenas por tema (D-44, frente 2), que
    │                             existem porque material de WebGL recebe valor
    │                             e não enxerga `var(--color-*)`
    │
    └── hooks/                    comportamentos reaproveitáveis, os dez:
                                  useReveal, useScrollProgress,
                                  useElementProgress, useActiveSection,
                                  useAmbientTint, useCanRender3D,
                                  useGlobeDrag, useMagnetic (o ímã do M-27),
                                  useSmoothScroll, useTema
```

---

## As cinco regras que sustentam isso

**1. Conteúdo em `src/data/`, nunca no JSX.**
Trocar uma frase do site = editar um arquivo `.ts` de dados. Nenhum componente
contém texto de verdade. É isso que permite adicionar tradução PT/EN depois sem
reescrever o site.

**2. Todo o 3D isolado em `components/three/`.**
Nada fora dessa pasta importa `three` diretamente — vale hoje, verificado por
`grep`. O que entra por `React.lazy` são as **cenas** (`HeroScene`,
`GlobeScene`), não a pasta inteira: `HeroVisual` é importado normalmente pelo
`Hero`, porque é ele quem decide, com o `useCanRender3D`, se monta a cena ou o
`<img>` de fallback. Essa decisão precisa existir antes de qualquer chunk de 3D
ser buscado. O resultado é o que importa: o Three.js fica num chunk próprio,
baixado só depois de o conteúdo aparecer (RNF-02, RNF-03).

**⚠ Chunk próprio não é o mesmo que não ser baixado, e o projeto aprendeu isso
da pior forma.** Da D-19 até a D-63 o chunk existia, o `React.lazy` estava
certo — e mesmo assim 237 KB de `three` e `r3f` desciam em todo celular, onde a
cena nunca chega a montar. Duas causas em série: o `modulepreload` que o Vite
escrevia no HTML (D-62 b) e, embaixo dele, o grupo `r3f` do `codeSplitting`
tendo **engolido `react-dom` e `scheduler`**, o que fazia a entrada depender
estaticamente do chunk 3D (D-63). Por isso o `vite.config.ts` declara hoje um
grupo **`react` antes dos grupos 3D**, e mexer nessa ordem é mexer no RNF-02.
E por isso o RNF-02 passou a ser medido por **carga real em largura de
celular**, não pela saída do `npm run build`: tamanho de chunk não diz quem o
baixa.

**3. Seções não desenham espaçamento.**
Toda seção usa `<Section>`, que já resolve âncora, respiro, título e animação de
entrada. Se você precisa mexer no ritmo da página, mexe em um arquivo só.

**4. Cor e fonte só via tokens.**
Definidos em `src/index.css`, dentro de `@theme`. No Tailwind v4 o tema mora no
CSS — **não existe `tailwind.config.js` neste projeto**. Nada de `#8c62ac` solto
no meio de um `className`; use `text-primary-deep`, `border-line`, `bg-surface`.

Os **oito** tokens, e só eles: `canvas` (fundo), `surface` (cards e header),
`line` (bordas), `ink` (texto principal), `muted` (texto secundário), `primary`
(roxo suave — decorativo, 3D, hover), `primary-deep` (roxo forte — **todo texto
colorido**, porque `primary` fica em 4,6:1 e reprova em corpo pequeno) e
`on-primary` (o que se escreve **por cima** do `primary-deep`).

O oitavo nasceu no modo escuro e é o tipo de coisa que só aparece medindo: no
tema escuro o `primary-deep` é **claro**, então `text-white` sobre ele caía a
2,1:1. Cada token tem par escuro em `:root[data-theme='dark']` — a matiz
**303.724 não muda em nenhum dos dois**, é a identidade da marca; o que muda é
luminosidade e saturação (D-44).

**Cor de cena 3D não sai daqui.** Material de WebGL recebe valor e não enxerga
`var(--color-*)`, então as cenas têm paleta própria em
`components/three/paleta.ts`, por tema. Trocar de tema **troca a cor no
material que já existe** — nunca remonta a cena, porque remontar zeraria o giro
do globo (D-60).

**5. O `<body>` não pode ter `background-color`.**
Esta é a regra mais fácil de quebrar sem perceber, e por isso está escrita aqui
e não só num comentário de CSS.

O fundo da página mora no `<html>`. O `<body>` é transparente de propósito,
porque **duas camadas decorativas vivem atrás do conteúdo dele**, em
`z-index: -1`:

| Camada | Onde | O que é |
|---|---|---|
| Grão | `body::before`, em `index.css` | ruído a 2,8% de opacidade (D-36) |
| Fio | `layout/Thread.tsx` | o traço roxo desenhado no scroll (D-37) |

As duas pintam **acima** do fundo do `<html>` e **abaixo** de todo o conteúdo.
Entre elas, quem vem antes na ordem de árvore pinta primeiro: o grão é o papel,
o fio é desenhado sobre ele.

**O sintoma, para alguém reconhecer quando acontecer:** devolver
`background-color` ao `<body>` faz o grão e o fio **sumirem os dois de uma vez**.
Sem erro no console, sem aviso do TypeScript, com o `npm run build` verde e o
lint limpo. A página simplesmente fica lisa, e nada aponta para a causa.

O `<body>` também precisa continuar `position: relative` — sem isso o `inset: 0`
do fio resolveria contra o bloco contentor inicial e ele teria altura de
viewport em vez de altura de documento.

---

## Onde colocar cada coisa nova

| Você tem... | Vai para |
|---|---|
| Um texto do site | `src/data/` |
| Um rascunho de texto ainda cru | `docs/CONTENT.md` |
| Uma imagem que aparece no site | `public/images/` |
| Um modelo 3D | `public/models/` |
| Uma fonte baixada | `public/fonts/` |
| Um efeito, geometria ou shader | `src/components/three/` |
| Um botão, tag, card — algo usado mais de uma vez ou parametrizado por dado | `src/components/ui/` |
| Uma camada da página inteira, usada uma vez, atrás do conteúdo | `src/components/layout/` — foi por isso que o `Thread` saiu de `ui/` (D-48) |
| Uma faixa nova da página | `src/sections/` + montar em `App.tsx` + registrar em **`sectionOrder`** de `data/nav.ts` para ela receber número (D-33), e em `navItems` **só se ela entra no menu** — a Location está em `sectionOrder` e não em `navItems`, e é por isso que ela tem número mas não aparece no menu |
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
