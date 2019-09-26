---
title: "Machine Learning & Álgebra Linear: Uma Introdução"
date: 2019-08-21
permalink: /posts/hello/
tags: [Python, Data Science, Algebra Linear]
comments: true
mathjax: "true"
excerpt: "Python, Data Science, Algebra Linear"
---

Álgebra Linear é um ramo da matemática relacionado a vetores, matrizes e transformações lineares.

É uma base fundamental para a área de aprendizado de máquina, desde notações matemáticas usadas para descrever os passos de um algoritmo até de fato a sua implementação.

Vamos a um exemplo:

![image-center]({{ site.url }}{{ site.baseurl }}/images/flor.jpg){: .align-center}


O que você vê quando olha para a imagem acima? Você provavelmente disse uma flor, não é muito difícil. Mas, se eu pedir para você escrever um algoritmo para que um computador possa fazer o mesmo por você - será uma tarefa muito difícil.

Você conseguiu identificar a flor porque o cérebro humano passou por milhões de anos de evolução. Não entendemos o que se passa no fundo para saber se a cor da imagem é vermelha ou preta. De alguma forma, treinamos nosso cérebro para executar automaticamente essa tarefa.

Você provavelmente sabe que os computadores de hoje são projetados para processar apenas 0 e 1. Então, como uma imagem como a acima, com vários atributos como cores, pode ser armazenada em um computador? Isso é obtido armazenando as intensidades de pixel em um objeto chamado Matriz. Então, essa matriz pode ser processada para identificar cores.


Portanto, qualquer operação que você deseja executar nesta imagem provavelmente usaria Álgebra Linear e matrizes por debaixo dos panos.

### Notações importantes


Nosso primeiro objeto de estudo é o **vetor**, denotaremos ele por $$ x $$ (minúsculo) ele é basicamente uma lista de número, um individuou de um [dataset](https://www.aquare.la/datasets-o-que-sao-e-como-utiliza-los/) com todas suas variáveis explicativas  pode ser entendido como um vetor.

Matematicamente ele é definido assim: Seja $$ \mathbb{R}^{n } $$ o espaço vetorial de tamanho n:


$$ x \in \mathbb{R}^{n} \Rightarrow x = \begin{bmatrix} x_{1}\\  \vdots \\  x_{n} \end{bmatrix} $$

Nos referimos a $$ x_{i} $$ como o i-ésimo elemento de $$ x $$ .

Em Python podemos criar um vetor da seguinte forma:

Primeiro importando a biblioteca **numpy** citada [**aqui**]({{ "/posts/top5-bibs-python/" | relative_url }})

```python
import numpy as np
```
