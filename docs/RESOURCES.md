# RESOURCES — onde buscar cada coisa

Lista curta e testada. A regra é a mesma da arquitetura: cada tipo de recurso
alimenta uma pasta específica do projeto.

---

## 1. Cor e paleta → alimenta `src/index.css` (`@theme`)

| Site | Para quê |
|---|---|
| [coolors.co](https://coolors.co) | Gerar e travar paletas rápido. Comece pelo fundo escuro e escolha UMA cor de destaque |
| [realtimecolors.com](https://realtimecolors.com) | Testar a paleta num layout real antes de commitar. O melhor para não se enganar |
| [uicolors.app/create](https://uicolors.app/create) | Gerar a escala 50→950 de uma cor, no formato do Tailwind |
| [huemint.com](https://huemint.com) | Paletas geradas por IA quando você travou na cor |
| [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/) | Conferir contraste AA (RNF-06). Texto normal precisa de 4.5:1 |

**Conselho:** um fundo quase-preto, um cinza para texto secundário, uma cor de
destaque. Três cores. Portfólio com cinco cores parece trabalho de faculdade.

## 2. Tipografia → alimenta `index.html` e `public/fonts/`

| Site | Para quê |
|---|---|
| [fonts.google.com](https://fonts.google.com) | O padrão. Inter, Geist, Space Grotesk, JetBrains Mono |
| [fontshare.com](https://www.fontshare.com) | Fontes gratuitas com cara de fonte paga (Satoshi, General Sans, Clash Display) |
| [fontsource.org](https://fontsource.org) | Instalar a fonte via npm e self-hospedar — é o caminho do BACKLOG |
| [typescale.com](https://typescale.com) | Definir a escala de tamanhos (h1, h2, corpo) com proporção |
| [fontpair.co](https://www.fontpair.co) | Combinar duas fontes sem errar |

**Conselho:** duas fontes no máximo — uma para texto, uma mono para os detalhes
técnicos. Uma só também funciona.

## 3. Inspiração → alimenta `references/inspiracao/`

| Site | Para quê |
|---|---|
| [godly.website](https://godly.website) | O melhor acervo de sites com 3D e animação |
| [awwwards.com](https://www.awwwards.com) | Referência de ponta. Filtre por "portfolio" |
| [land-book.com](https://land-book.com) | Landing pages limpas, sem exagero |
| [minimal.gallery](https://minimal.gallery) | Quando você quiser puxar para o sóbrio |
| [bento.me](https://bento.me) e [read.cv](https://read.cv) | Como outras pessoas de tech se apresentam |
| [refero.design](https://refero.design) | Padrões de interface reais, por seção |

**Como usar:** salve o print em `references/inspiracao/` e diga ao Claude Code
*"olhe `references/inspiracao/hero-x.png`, quero esse tipo de respiro"*. Mostrar
funciona muito melhor que descrever.

## 4. Aprender e construir o 3D → alimenta `src/components/three/`

| Site | Para quê |
|---|---|
| [r3f.docs.pmnd.rs](https://r3f.docs.pmnd.rs/) | Documentação oficial do React Three Fiber. Comece aqui |
| [drei.docs.pmnd.rs](https://drei.docs.pmnd.rs/) | Os helpers prontos (Float, Environment, OrbitControls, Text3D) |
| [threejs.org/docs](https://threejs.org/docs/) | Referência de geometrias, materiais e luzes |
| [threejs-journey.com](https://threejs-journey.com) | Curso pago, mas é O curso de Three.js. Os capítulos gratuitos já ajudam |
| [codrops](https://tympanus.net/codrops/) | Tutoriais de efeito com código completo |
| [thebookofshaders.com](https://thebookofshaders.com) | Se você for mexer com shader (só depois da v1) |
| [poimandres.github.io/market](https://market.pmnd.rs/) | Modelos leves prontos para R3F |

**Para o Passo 4, você não precisa de modelo nenhum.** Geometria gerada por
código (icosaedro, partículas, plano distorcido) pesa quase zero e é o que o PRD
pede. Modelo `.glb` é assunto de v2.

## 5. Modelos 3D e HDRI (só se um dia precisar) → `public/models/`

| Site | Para quê |
|---|---|
| [polyhaven.com](https://polyhaven.com) | HDRIs, texturas e modelos, tudo CC0 — sem pegadinha de licença |
| [sketchfab.com](https://sketchfab.com) | Acervo enorme; filtre por "Downloadable" e cheque a licença |
| [quaternius.com](https://quaternius.com) | Modelos low-poly gratuitos, ótimos para web |
| [gltf.report](https://gltf.report) | Inspecionar e **otimizar** um `.glb` antes de colocar no site |

**Regra:** modelo acima de 2 MB não entra. Passe pelo gltf.report antes.

## 6. Ícones → `src/components/ui/`

| Site | Para quê |
|---|---|
| [lucide.dev](https://lucide.dev) | Conjunto limpo, instala por npm, combina com qualquer coisa |
| [phosphoricons.com](https://phosphoricons.com) | Mais estilos de peso, bonito |
| [simpleicons.org](https://simpleicons.org) | Logos de tecnologias (Python, React, OpenAI) para a seção de stack |
| [heroicons.com](https://heroicons.com) | Do time do Tailwind, integra sem esforço |

## 7. Imagens e capas de projeto → `public/images/projects/`

| Site | Para quê |
|---|---|
| [unsplash.com](https://unsplash.com) / [pexels.com](https://www.pexels.com) | Fotos gratuitas, quando precisar |
| [shots.so](https://shots.so) / [screenshot.rocks](https://screenshot.rocks) | Transformar print de projeto em capa apresentável |
| [squoosh.app](https://squoosh.app) | Comprimir para `.webp` antes de subir. Sempre |
| [og-playground.vercel.app](https://og-playground.vercel.app) | Montar a imagem Open Graph (1200×630) do Passo 9 |
| [realfavicongenerator.net](https://realfavicongenerator.net) | Gerar o favicon em todos os formatos |

**Conselho:** print do seu próprio projeto vale dez vezes mais que foto de banco
de imagens. Capa de projeto é screenshot, não foto de escritório bonito.

## 8. Documentação da stack (quando o Claude Code errar, confira aqui)

| Site | Para quê |
|---|---|
| [tailwindcss.com/docs/theme](https://tailwindcss.com/docs/theme) | Tailwind v4 — o tema é CSS, **não existe `tailwind.config.js`** |
| [react.dev](https://react.dev) | React 19 |
| [vite.dev/config](https://vite.dev/config/) | Configuração do Vite |
| [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) | TypeScript |
| [developer.mozilla.org](https://developer.mozilla.org) | A referência final de HTML, CSS e JS |

## 9. Deploy e domínio → Passo 10

| Site | Para quê |
|---|---|
| [vercel.com](https://vercel.com) | Importar o repo do GitHub; cada push publica sozinho |
| [vercel.com/docs/frameworks/vite](https://vercel.com/docs/frameworks/vite) | Configuração de projeto Vite (detecta sozinho, mas confira) |
| [tld-list.com](https://tld-list.com) | Comparar preço de domínio antes de comprar |
| [namecheap.com](https://www.namecheap.com) / [porkbun.com](https://porkbun.com) | Registrar. Um `.dev` ou `.com` com seu nome |

## 10. Verificar antes de divulgar → Passo 8 e 9

| Site | Para quê |
|---|---|
| [pagespeed.web.dev](https://pagespeed.web.dev) | Lighthouse online. A meta do PRD é ≥ 80 no mobile |
| [responsively.app](https://responsively.app) | Ver vários tamanhos de tela ao mesmo tempo |
| [wave.webaim.org](https://wave.webaim.org) | Achar problemas de acessibilidade |
| [opengraph.xyz](https://www.opengraph.xyz) | Ver como o link aparece no WhatsApp e LinkedIn |
| [bundlephobia.com](https://bundlephobia.com) | Antes de instalar qualquer pacote: quanto ele pesa? |

## 11. Currículo → `public/cv.pdf`

| Site | Para quê |
|---|---|
| [flowcv.com](https://flowcv.com) | CV limpo, gratuito, exporta PDF que passa em filtro automático |
| [rxresu.me](https://rxresu.me) | Alternativa open source |
| [europa.eu/europass](https://europa.eu/europass/) | Formato reconhecido na Europa — útil para Irlanda |

---

## Ordem de uso, para não se perder

Passo 1 usa a seção **1 e 2**. Passo 3 usa a **3**. Passo 4 usa a **4**.
Passo 5 usa a **7**. Passo 9 usa a **7** de novo. Passo 10 usa a **9**.
A seção **10** é a última coisa antes de mandar o link para alguém.

Não abra as onze de uma vez. Abra a do passo em que você está.
