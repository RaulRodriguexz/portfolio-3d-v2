import type { Tema } from '../../hooks/useTema'

/**
 * D-44, frente 2 — as cores das duas cenas 3D, por tema.
 *
 * **Por que existe este arquivo.** As cores do WebGL não podem vir do CSS: um
 * material recebe valor, não propriedade herdada, e `var(--color-primary)` não
 * significa nada dentro de um `<Canvas>`. Antes desta frente havia doze
 * literais espalhados por cinco arquivos de `three/`, cada um com a paleta
 * clara assada dentro. Duplicar isso por tema daria vinte e quatro. Aqui é um
 * lugar só, e a diferença entre os temas fica legível de uma vez.
 *
 * **A regra que atravessa a tabela inteira:** em fundo escuro a mistura sobe de
 * um piso muito baixo, então cada ponto de opacidade rende mais — e com
 * `AdditiveBlending` rende muito mais, porque ele SOMA luz e o preto é zero.
 * Por isso quase toda opacidade **cai** no escuro em vez de subir. É o mesmo
 * mecanismo já medido no grão (frente 3) e no fio (frente 5).
 *
 * A matiz é 303.724 nos dois temas, como manda o D-44: o que muda é
 * luminosidade e croma, nunca a matiz — mexer nela trocaria a cor da marca em
 * vez de adaptá-la.
 */
export type Paleta = {
  /** Hero — anel largo e a faísca que corre nele (M-5). */
  anelLargo: string
  anelLargoOpacidade: number
  /** Hero — anel menor, girando ao contrário. */
  anelPequeno: string
  anelPequenoOpacidade: number
  /** Hero — a poeira em volta do Memoji. */
  poeira: string
  poeiraOpacidade: number
  /** Hero — as três paradas do halo atrás do Memoji, já com alfa. */
  halo: [string, string, string]
  /** Hero — as três paradas da sombra de contato sob o Memoji. */
  sombra: [string, string, string]
  /** Globo — o corpo da esfera, que faz o papel de oceano. */
  oceano: string
  /** Globo — multiplicador da textura dos continentes (o material multiplica). */
  continentes: string
  /** Globo — a malha de triângulos por cima da esfera (D-56). */
  malha: string
  malhaOpacidade: number
  /** Globo — a casca de atmosfera, em `AdditiveBlending`. */
  atmosferaOpacidade: number
  /** Globo — o pin de Dublin e a faixa escura do anel de radar (D-25, D-56). */
  pin: string
  /** Globo — a faixa clara do anel de radar. */
  anelClaro: string
}

export const PALETAS: Record<Tema, Paleta> = {
  claro: {
    anelLargo: '#6e11b0',
    anelLargoOpacidade: 0.55,
    anelPequeno: '#8c62ac',
    anelPequenoOpacidade: 0.5,
    poeira: '#8c62ac',
    poeiraOpacidade: 0.6,
    halo: ['rgba(140, 98, 172, 0.30)', 'rgba(140, 98, 172, 0.12)', 'rgba(140, 98, 172, 0)'],
    sombra: ['rgba(110, 17, 176, 0.42)', 'rgba(110, 17, 176, 0.16)', 'rgba(110, 17, 176, 0)'],
    oceano: '#8c62ac',
    continentes: '#ffffff',
    malha: '#c9a8e2',
    malhaOpacidade: 0.12,
    atmosferaOpacidade: 0.11,
    pin: '#6e11b0',
    anelClaro: '#f4f1f8',
  },
  escuro: {
    /*
     * Os papéis dos dois roxos **invertem de luminosidade sem trocar de
     * função**, exatamente como nos tokens do CSS: no claro o `primary-deep` é
     * o escuro e desenha o anel largo por contraste contra a página branca; no
     * escuro ele é o claro — `rgb(205,156,255)` — e desenha o mesmo anel por
     * contraste contra a página preta. Sem esta troca o anel largo some, que
     * foi o primeiro defeito visível quando o Raul olhou a cena escura: medido
     * no pixel, ele dava **1,31:1** contra o fundo, ante 3,20:1 no claro.
     *
     * ⚠ **Aqui a regra do "cai no escuro" NÃO vale, e o D-44 supôs que valeria.**
     * Ele previu que "as órbitas com `AdditiveBlending` estouram" — mas as
     * órbitas nunca foram aditivas: `OrbitRing` usa `meshBasicMaterial` com
     * `transparent`, que é mistura normal. Só a POEIRA é aditiva. Em mistura
     * normal a opacidade é um cursor entre o fundo e a cor, e para chegar ao
     * mesmo contraste do claro ela tem de ficar quase igual. Medido e resolvido
     * contra o fundo local e conferido no pixel: 0,50 devolve 3,22:1 contra os
     * 3,20:1 do tema claro.
     */
    anelLargo: '#cd9cff',
    anelLargoOpacidade: 0.5,
    anelPequeno: '#bf81ff',
    anelPequenoOpacidade: 0.36,

    /*
     * D-58b — a poeira fica BRANCA no escuro, e a intensidade CAI. É decisão
     * por tema e não troca global: partícula branca sobre a página quase branca
     * do tema claro simplesmente sumiria. E como o material é `Additive`, no
     * escuro ele soma sobre quase zero: manter 0,6 estouraria os pontos.
     *
     * O número não busca paridade com o claro, e não deveria: medido no pixel,
     * a poeira do tema CLARO dá 1,08:1 — ela é praticamente invisível, porque
     * somar luz sobre uma página quase branca não tem para onde subir. Igualar
     * isso no escuro seria apagar a poeira. O alvo aqui é o oposto: ficar
     * acima do que o Raul viu e achou perdido (1,53:1) sem saturar. Com branco
     * a 0,34 dá 2,01:1, e o canal máximo da cena continua vindo do Memoji, não
     * da poeira — 13 pixels saturados na cena inteira.
     */
    poeira: '#ffffff',
    poeiraOpacidade: 0.34,

    /*
     * O halo deixa de ser lavado claro e vira brilho, que é o que o D-44
     * previu. A cor sobe para o roxo decorativo do escuro e o alfa cai: sobre
     * fundo preto um halo com o mesmo alfa lê como uma mancha, não como luz.
     */
    halo: ['rgba(191, 129, 255, 0.20)', 'rgba(191, 129, 255, 0.08)', 'rgba(191, 129, 255, 0)'],

    /*
     * A sombra de contato é o único item que NÃO inverte. Ela existe para
     * assentar o Memoji, e assentar é escurecer o que está embaixo; um brilho
     * no lugar dela faria o recorte flutuar de novo, que é o defeito que o D-18
     * consertou. Ela passa a ser quase preta com um toque da matiz — sobre o
     * halo, que é claro, ela continua tendo o que escurecer.
     */
    sombra: ['rgba(9, 5, 14, 0.55)', 'rgba(9, 5, 14, 0.22)', 'rgba(9, 5, 14, 0)'],

    /*
     * O globo é o item que se comporta ao contrário de todo o resto, e o D-56
     * já tinha previsto: "no tema escuro o oceano roxo escurece e os
     * continentes claros ganham contraste". O oceano NÃO recebe o roxo
     * decorativo do escuro — uma bola de `rgb(191,129,255)` ocupando meia tela
     * sobre uma página quase preta seria um farol. Ele escurece, e é a página
     * que se afasta dele.
     */
    oceano: '#754ba3',
    /*
     * Os continentes são a mesma textura, multiplicada. Deixá-la em branco
     * puro dá 16:1 contra a página — massa branca gritando no escuro. O
     * multiplicador baixa para o mesmo lugar em que a massa fica clara sem
     * virar lâmpada, e o par continente/oceano mantém a leitura do D-56.
     */
    continentes: '#e6e0ee',
    malha: '#d9c2f2',
    malhaOpacidade: 0.1,
    /* `AdditiveBlending` sobre fundo escuro: a atmosfera cai, não sobe. */
    atmosferaOpacidade: 0.07,
    /*
     * O pin continua ESCURO nos dois temas, e isso é deliberado: ele pousa
     * sobre o continente, que é claro nos dois temas. Segui-lo pelo token o
     * tornaria claro no escuro — claro sobre claro — e o marcador sumiria
     * justamente em cima da única coisa da cena que carrega informação.
     */
    pin: '#5a0d91',
    anelClaro: '#f4f1f8',
  },
}
