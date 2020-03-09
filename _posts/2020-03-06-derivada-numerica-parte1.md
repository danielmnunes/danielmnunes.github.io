---
title: "Métodos Numéricos: Derivada Numérica - Parte I"
date: 2020-03-06
permalink: /posts/devirada-numerica1/
tags: [Matemática, Computação]
comments: true
excerpt: "Matemática, Computação"
mathjax: "true"
header:
  teaser: "/images/derivada.png"
---

A série de Taylor e o teorema de Taylor desempenham um papel fundamental nas aproximações de derivadas por métodos de diferenças finitas. Começamos este post com uma revisão desses resultados importantes.  

**Série de Taylor:** Se uma função $$f$$ é infinita vezes diferenciável em $$ \mathbb{R}$$, então para qualquer ponto $$x_{0}$$ escolhido, temos:  

$$
f(x) = f(x_{0}) + f{}'(x_{0})(x - x_{0}) + \frac{f{}''(x_{0})}{2!}(x - x_{0})^{2} + \frac{f{}'''(x_{0})}{3!}(x - x_{0})^{3}
$$

Teorema de Taylor: Se uma função $$f$$ é $$n+1$$ vezes diferenciável em um intervalo em torno de  $$x_{0}$$, então, para todo número real $$x$$ no intervalo, existe um número $$c \in [x, x_{0}]$$ tal que:

$$
\begin{align}
& f(x) = f(x_{0}) + f{}'(x_{0})(x - x_{0}) + \frac{f{}''(x_{0})}{2!}(x - x_{0})^{2}\\
& + \cdots + \frac{f^{(n)}(x_{0})}{n!}((x - x_{0}))^{n} + \frac{f^{(n+1)}(c)}{(n+1)!}((x - x_{0}))^{n+1}
\end{align}
$$

A importância do teorema de Taylor é que podemos escolher um ponto $$x_{0}$$ e, em seguida, representar a função $$f(x)$$, não importa o quão "confuso" seja, pelo polinômio $$ f(x) = f(x_{0}) + f{}'(x_{0})(x - x_{0}) + \frac{f{}''(x_{0})}{2!}(x - x_{0})^{2} + \cdots  + \frac{f^{(n)}(x_{0})}{n!}((x - x_{0}))^{n} $$. O erro é dado pelo termo único $$ \frac{f^{(n+1)}(c)}{(n+1)!}((x - x_{0}))^{n+1} $$. Embora não conheçamos $$c$$, sabemos que ele está em $$[x, x_{0}]$$. Em muitos casos, esse termo pode ser estimado para fornecer um limite superior ao erro na aproximação de uma função por um polinômio de Taylor.
