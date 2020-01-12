---
title: "Pesquisa Operacional: Visão Geral"
date: 2020-01-11
permalink: /posts/po-visao-geral/
tags: [Pesquisa Operacional]
comments: true
excerpt: "Pesquisa Operacional"
header:
  teaser: "/images/po.png"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/po.png){: .align-center}

## Um pouco de Historia
A Pesquisa Operacional, ou simplesmente PO, surgiu na Inglaterra durante a Segunda Guerra Mundial (1939-1945) para a solução de problemas de natureza logística, tática e de estratégia militar, quando um grupo de cientistas foi convocado para decidir sobre a utilização mais eficaz dos recursos militares limitados, marcando a primeira atividade formal desse campo de estudo. Dentre os problemas estudados, destacam-se: projeto, manutenção e inspeção de aviões; projeto de explosivos, tanques e motores; melhoria da utilização de radar, canhões antiaéreos e táticas de bombardeios a submarino; dimensionamento de frota, entre outros.

Os resultados positivos alcançados pelo grupo de cientistas ingleses fi zeram com que a Pesquisa Operacional fosse disseminada nos Estados Unidos e, em 1947, a equipe liderada por George B. Dantzig deu origem ao método Simplex para resolução de problemas de programação linear. Desde então, esse conhecimento vem sendo aplicado, com sucesso, para a otimização de recursos em diversos segmentos industriais e comerciais de várias áreas de negócio (estratégia, marketing, finanças, microeconomia, operações e logística, recursos humanos, entre outras).

## O que é Pesquisa Operacional
Em termos gerais, podemos dizer que a Pesquisa Operacional consiste na utilização de um método científico (modelos matemáticos, estatísticos e algoritmos computacionais) para a tomada de decisões. Dessa forma, a PO atua cada vez mais em um ramo multidisciplinar, envolvendo áreas de engenharia de produção, matemática aplicada, ciência da computação e gestão de negócios.


## Modelagem para Tomada de Decisão
Um modelo é a representação simplificada de um sistema real, podendo ser um projeto já existente ou um projeto futuro. No primeiro caso, pretende-se reproduzir o funcionamento do sistema real existente, de forma a aumentar a produtividade, enquanto no segundo caso o objetivo é definir a estrutura ideal do futuro sistema.

O comportamento de um sistema real é influenciado por diversas variáveis envolvidas no processo de tomada de decisão. Devido à grande complexidade desse sistema, torna-se necessária a sua simplificação, a partir de um modelo, de forma que as principais variáveis envolvidas no sistema ou projeto que se pretende entender ou controlar sejam consideradas na sua construção, conforme mostra a figura abaixo.

![image-center]({{ site.url }}{{ site.baseurl }}/images/POmodelo.png){: .align-center}

Um modelo é composto por três elementos principais: a) variáveis de decisão e parâmetros; b) função objetivo; c) restrições.

### a) Variáveis de Decisão e Parâmetros
As variáveis de decisão são as incógnitas, ou valores desconhecidos, que serão determinados pela solução do modelo. Podem ser classificadas de acordo com as seguintes escalas de mensuração: variáveis contínuas, discretas ou binárias. As variáveis de decisão devem assumir valores não negativos.

As variáveis **contínuas** podem assumir quaisquer valores em um intervalo de números reais (conjunto infinito ou não enumerável de valores). Como exemplos de variáveis de decisão contínuas, podemos citar: a) quantidade ótima a ser produzida (em litros) de cada tipo de refrigerante em uma empresa de bebidas; b) quantidade ótima a fabricar (em kg) de cada tipo de cereal em uma empresa alimentícia; c) porcentagens ótimas de cada ativo a ser alocado na carteira de investimento.

As variáveis **discretas** podem assumir valores dentro de um conjunto finito ou uma quantidade enumerável de valores, sendo aquelas provenientes de determinada contagem. Como exemplos de variáveis discretas, podemos listar: a) número ideal de funcionários por turno de trabalho; b) unidades a fabricar de cada tipo de caminhão em uma indústria automobilística.

As variáveis **binárias**, também conhecidas por variáveis **dummy**, podem assumir dois possíveis valores: 1 (quando a característica de interesse está presente na variável) ou 0 (caso contrário). Como exemplos de variáveis de decisão binárias, podemos mencionar: a) fabricar ou não determinado produto; b) abrir ou não uma nova localidade; c) percorrer ou não determinado roteiro.

Os **parâmetros** são os valores fixos previamente conhecidos do problema. Como exemplos de parâmetros contidos em um modelo matemático, podemos citar: a) demanda de cada produto para um problema de mix de produção; b) custo variável para produzir determinado tipo de móvel; c) lucro ou custo por unidade de produto fabricado; d) custo por funcionário contratado; e) margem de contribuição unitária quando da fabricação e venda de determinado eletrodoméstico.

### b) Função Objetivo
A função objetivo é uma função matemática que determina o valor-alvo que se pretende alcançar ou a qualidade da solução, em função das variáveis de decisão e dos parâmetros, podendo ser uma função de maximização (lucro, receita utilidade, nível de serviço, riqueza, expectativa de vida, entre outros atributos) ou de minimização (custo, risco erro, entre outros).

Como exemplos, podemos citar: a) minimização do custo total de produção de diversos tipos de chocolates; b) minimização do risco de crédito de uma carteira de clientes; c) minimização do número de funcionários envolvidos em determinado serviço; d) maximização do retorno sobre o investimento em fundos de ações e de renda fi xa; e maximização do lucro líquido na fabricação de diversos tipos de refrigerantes.

### c) Restrições
As restrições podem ser definidas como um conjunto de equações (expressões matemáticas de igualdade) e inequações (expressões matemáticas de desigualdade) que as variáveis de decisão do modelo devem satisfazer. As restrições são adicionadas ao modelo de forma a considerar as limitações físicas do sistema, e afetam diretamente os valores das variáveis de decisão.

Como exemplos de restrições a serem consideradas em um modelo matemático, podemos citar: a) capacidade máxima de produção; b) risco máximo a que determinado investidor está disposto a se submeter; c) número máximo de veículos disponíveis; d) demanda mínima aceitável de um produto.

## Ferramentas da Pesquisa Operacional

A partir do trabalho de Eom e Kim (2006), uma classificação das ferramentas da Pesquisa Operacional é proposta, conforme mostra a figura abaixo.

![image-center]({{ site.url }}{{ site.baseurl }}/images/POFerramentas.png){: .align-center}

As ferramentas da Pesquisa Operacional podem ser divididas em modelos determinísticos e estocásticos. As principais características dos modelos determinísticos são: todas as variáveis envolvidas no processo são fixas; uma única solução é gerada; utilizam-se, geralmente, de métodos analíticos para sua solução; garantem a solução ótima. Com relação aos modelos estocásticos, as principais características são: pelo menos uma das variáveis envolvidas no processo é aleatória; geram mais de uma solução e buscam analisar os diferentes cenários; utilizam-se, geralmente, de métodos numéricos (programas de computador) para sua solução; não garantem a solução ótima. Dentre os modelos determinísticos, destacam-se: programação linear, programação binária e inteira, programação em redes, programação
por metas ou multiobjetivo, programação não linear e programação dinâmica determinística. Dentre os modelos estocásticos, podemos citar: teoria das filas, simulação, programação dinâmica estocástica (cadeias de Markov) e teoria dos jogos.

No próximo post entraremos com mais detalhes na técnica de programação linear.

Até a próxima :v:

