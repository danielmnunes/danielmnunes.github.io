---
title: "Métodos Numéricos: Derivada Numérica - Parte II"
date: 2020-03-19
permalink: /posts/devirada-numerica2/
tags: [Matemática, Computação]
comments: true
excerpt: "Matemática, Computação"
mathjax: "true"
header:
  teaser: "/images/derivada.png"
---

# Aproximando a primeira derivada

## Derivada Forward e backward

Considere uma discretização de um intervalo $$[a, b]$$ em $$N + 1$$ pontos igualmente espaçados, chame-os de: $$x_{1}, x_{2}, \cdots , x_{N}$$. Chame o espaçamento entre os ponto de $$h$$, ou seja, $$h = x_{i+1} - x_{i}$$. Suponha que conheçamos valores de função:  

$$
f(x_{1}), f(x_{2}), \cdots , f(x_{N})
$$

portanto, conheçemos f apenas nos pontos e não na curva inteira, como no gráfico da figura abaixo.
![image-center]({{ site.url }}{{ site.baseurl }}/images/pontos.png){: .align-center}
