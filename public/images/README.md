Imagens do site.

memoji.png   - Memoji do Raul, fundo transparente, 694x781, ~100 KB.
               Extraido da versao de 1024 px (a de 512 estava cortada no topo
               e embaixo). Fundo #171717 removido por flood fill a partir das
               bordas, com alpha suave e descontaminacao de cor na borda.
               Usado como textura na cena 3D do hero (PRD 5.2) E como
               fallback estatico quando nao ha WebGL.
memoji.webp  - mesma imagem, 30 KB. Use no <img> do fallback.
og.png       - 1200x630, preview em redes sociais (Passo 9).
world-dots.png - continentes do globo 3D (D-19, D-56, D-58a). 2048x1024, PNG
               indexado de 1 bit, 15,6 KB. Indice 0 transparente (oceano, que
               e a cor do material) e indice 1 = rgb(240,238,245), o
               continente. O nome ficou de quando o desenho era pontilhado;
               desde o D-58a a terra e macica.
               Origem: Natural Earth land-110m (dominio publico), via
               world-atlas@2, rasterizado em projecao equirretangular pura:
               x = (lon+180)/360*2048, y = (90-lat)/180*1024, varredura por
               linha com regra par-impar.
               Duas armadilhas, as duas ja pagas:
               (1) a Antartida circunda o polo e o anel dela vai de -180 ate
                   178,3 e volta ao inicio por um salto que atravessa o mapa
                   em -84,5. Fechado assim o preenchimento reparte o
                   continente em faixas. O fecho tem de ser PELO POLO: descer
                   em 180, correr o fundo, subir em -180.
               (2) filtro de linha None, medido: com filtro Up o arquivo sobe
                   de 15,6 KB para 17,6 KB, porque o deflate ja casa a linha
                   inteira com a de cima e o filtro destroi esse casamento.
                   Estrategia Z_FILTERED no deflate.
               (3) a MESMA regra par-impar inverteu a paridade em 43 linhas, e
                   isso so foi achado na D-73, em 11/09. Quando a varredura
                   passa exatamente por um vertice, a contagem de cruzamentos
                   erra por um e terra e oceano TROCAM dali em diante. As
                   linhas 110-141 (70,6 a 65,1 N) estavam invertidas por
                   inteiro: Siberia e Groenlandia liam como oceano e o Mar da
                   Noruega lia como terra. No globo isso vira um PARALELO
                   completo, ou seja um arco atravessando o planeta.
                   Reparado assim: 110-141 invertidas de volta (geografia
                   exata), 105-109 e 603-608 copiadas das linhas limpas
                   vizinhas, porque ali a inversao e parcial e cresce ao longo
                   da longitude. Nao regerado — o gerador nao esta no
                   repositorio, so o metodo, aqui.
                   Sobra UM defeito conhecido: as linhas 0-35 tem ~2 px de
                   terra numa coluna so, que no polo vira um espigao radial
                   fino. Medido, documentado e NAO consertado.
               Conferencia obrigatoria ao regerar (D-58): o pin de Dublin tem
               de cair sobre a Irlanda. Se cair no mar, a projecao esta errada
               e nem build, nem lint, nem teste acusam.
