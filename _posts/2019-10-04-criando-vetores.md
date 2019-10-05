---
title: "Uma introdução a biblioteca Numpy - Parte 1 :1234: :man_juggling:"
date: 2019-10-04
permalink: /posts/numpy-parte1/
tags: [Python, Numpy]
comments: true
excerpt: "Python, Numpy"
header:
  teaser: "/images/numpy.png"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/numpy.png){: .align-center}

Vetores, matrizes e tensores são ferramentas essenciais para a ciências de dados, são usados para armazenar os dados de treinamento, bem como os parâmetros dos modelos de Machine Learning.

Quando uma operação é repetida para um conjunto de valores de entrada, é natural e vantajoso representar os dados como Arrays Multidimensionais(Vetores, Matrizes e tensores) e operações que são feitas sobre arrays são ditas vetorizadas. Operações vetorizadas eliminam a necessidade de loops explícitos sobre os elementos de uma matriz, o resultado é um código conciso, mais legível, e permitindo delegar a implementação de operações elemento a elemento a linguagens de baixo nível(C, C++ e Fortran) que são mais eficientes.

## O que é Numpy?

No mundo pythonico, Numpy é uma poderosa biblioteca usada principalmente para realizar cálculos em Arrays. O núcleo de Numpy é implementado em C, fornecendo assim funções eficientes para manipular e processar matrizes. À primeira vista os objetos numpy aparentam ser listas python, mas como nem tudo é ouro, vamos as diferenças:

- Arrays Numpy são tipadas, ou seja, na sua criação é definido o tipo dos dados armazenados.
- São homogêneos, definindo o tipo de dado da criação, todos os elementos devem ser deste tipo, diferente de uma lista comum python, onde você pode inserir qualquer tipo de objeto.
- São de tamanho fixo, significa que um Array Numpy não pode ser redimensionado, a menos que você crie um novo array.

Por esses e outros motivos, operações em Arrays Numpy são mais eficientes que listas Python. Além das estruturas de dados Arrays, Numpy também fornece uma grande coleção de funções poderosas, nas áreas de álgebra linear, cálculo e estatística.

Neste post veremos as estruturas básicas de Numpy e como criar esses objetos, também veremos funções que mostram informações importantes.

[**aqui**]({{ "/posts/top5-bibs-python/" | relative_url }}) você aprende como instalar Numpy em sua máquina

## Importando a biblioteca

Para ser usada, primeiro precisamos importar a biblioteca para nosso programa, por convenção Numpy é apelidada([**alias**](https://pt.wikipedia.org/wiki/Alias_(comando) )) para *np*, assim:

```python
import numpy as np
```

## O objeto Array Numpy

O core da biblioteca Numpy é a estrutura de dados para representar arrays multidimensionais e dados homogêneos, a principal estrutura é a classe *ndarray*, que além da capacidade de armazenamento de dados possui vários atributos de informações([**metadata**](https://pt.wikipedia.org/wiki/Metadados)) sobre o array, como o tamanho, tipo dos dados e outros atributos.

Descrição de alguns atributos


| Atributos     | Descrição |
| ------------- | ------------- |
| shape         | Uma tupla que contém o número de elementos(o tamanho) de cada eixo(axis) do array  |
| size          | O total de elementos do array  |
| ndim          | Número de dimensões do array  |
| nbytes        | Número de bytes para armazenar os dados  |
| dtype         | O tipo dos dados armazenados  |

Uma lista completa de todos atributos do objeto *ndarray* pode ser vista com o comando: help(np.ndarray)

Segue um exemplo de criação de um objeto ndarray e o uso de seus atributos:

```python
dados = np.array([[1, 2], [3, 4], [5, 6]])
print(type(dados)) # <class 'numpy.ndarray'>
print(dados) # array([[1, 2], [3, 4], [5, 6]])
print(dados.ndim) # 2
print(dados.shape) # (3, 2)
print(dados.size) # 6
print(dados.dtype) # dtype('int64')
print(dados.nbytes) # 48
```

## Conclusão

No exemplo acima criamos um array usando a função *np.array*, depois de criado, acessamos alguns atributos, os dados estão dispostos em um array de duas dimensões(*dados.ndim*) de shape 3x2 apresentado com *dados.shape* e possui um total de seis elementos(*dados.size*) do tipo int64(*dados.dtype*) o que equivale a um tamanho total de 48 bytes(*dados.nbytes*)

Em posts futuros veremos outras formas de criar um array.

Até a próxima :v:
