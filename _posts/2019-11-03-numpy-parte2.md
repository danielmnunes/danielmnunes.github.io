---
title: "Uma introdução a biblioteca Numpy - Parte 2"
date: 2019-11-03
permalink: /posts/numpy-parte2/
tags: [Python, Numpy]
comments: true
excerpt: "Python, Numpy"
header:
  teaser: "/images/numpy.png"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/numpy.png){: .align-center}

Na post anterior, vimos a estrutura de dados básica do NumPy para representar matrizes, a classe ndarray e os atributos básicos dessa classe. Neste post, focaremos nas funções da biblioteca NumPy que podem ser usadas para criar instâncias ndarray.

Arrays Numpy podem ser criados de várias maneiras, dependendo das propriedades para o quais serão usadas. Como vimos no post anterior, uma maneira de inicializar um Array Numpy é usando a função ```np.array``` e uma lista Python, de forma explicita. 

```python
dados = np.array([[1, 2],
                  [3, 4],
                  [5, 6]])
```

É fácil vê que esse método é limitado a pequenos Arrays.

Em muitas situações é necessários gerar Arrays que seguem uma regra, como preenchido com valores constantes, números inteiros crescentes, números distribuídos uniformemente, números aleatórios, etc. Em outras situações é necessários criar Arrays lido de um arquivo de dados como: csv, txt ou json. As possibilidades são das mais variadas mas Numpy oferece um grande conjunto de funções para gerar Arrays de vários tipos.

Segue um listas das funções mais usadas para geração de Arrays.

| Função        | Tipo de Array     |
| ------------- | ------------- |
| ```np.array```| Cria um Array com os elementos fornecidos por um objeto semelhante a matriz, que, por exemplo, pode ser uma lista Python   |
| ```np.zeros```| Cria um Array de zeros |
| ```np.ones```| Cria um Array de Uns |
| ```np.diag```| Cria um Array diagonal, ou seja, valores definidos na diagonal e zeros no restante do Array|
| ```np.arange```| Cria um Array com valores espaçados igualmente entre um valor inicial até um valor final, com um valor de incremento especificado|
| ```np.linspace```| Cria um Array com valores espaçados igualmente entre um valor inicial e final especificados, usando um número especificado de elementos|
| ```np.loadtxt```| Cria um Array a partir dos dados lidos de um arquivo de texto, por exemplo, um arquivo CSV |
| ```np.random.rand```| Crie um Array com números aleatórios que são distribuídos uniformemente entre 0 e 1. Outros tipos de distribuições também estão disponíveis no módulo np.random |

Vamos exemplificar algumas das funções acima:

Um vetor a partir de uma lista Python
```python
vetor = np.array([1, 2, 3, 4, 5])
# [1, 2, 3, 4, 5]
```

Um vetor de zeros
```python
vetor = np.zeros(5)
# [0, 0, 0, 0, 0]
```

Um vetor de uns
```python
vetor = np.ones(5)
# [1, 1, 1, 1, 1]
```

Uma matriz com valores da diagonal especificados
```python
matriz = np.diag([1,2,3])
# [[1, 0, 0],
#  [0, 2, 0],
#  [0, 0, 3]]
```

Um vetor utilizando *np.arange*
```python
vetor = np.arange(1, 10)
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Um vetor utilizando *np.linspace*
```python
vetor = np.linspace(1, 10, 5)
# [ 1, 3.25, 5.5, 7.75, 10]
```

Um vetor de números aleatórios
```python
vetor = np.random.rand(5)
# [0.158347, 0.60529 , 0.814093, 0.50863, 0.682685]
```
Esses são alguns métodos de criação de Arrays presentes na biblioteca Numpy. No próximo post falarei de indexação e fatiamento de Arrays Numpy, até a proxima :v:

