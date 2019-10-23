---
title: "Teorema - Desigualdade de Cauchy-Schwarz"
date: 2019-10-22
permalink: /posts/cauchy-schwarz/
tags: [Matemática, Estatística]
comments: true
excerpt: "Matemática, Estatística"
mathjax: "true"
header:
  teaser: "/images/math.gif"
---

**Teorema:** Para todo $$x$$ e $$y$$ vetores $$\in \mathbb{R}^{n}$$ a seguinte desigualdade é válida:

$$\left | \sum_{i=1}^{n}x_{i}y_{i} \right |\leq \left ( \sum_{i=1}^{n}x_{i}^{2} \right )^{\frac{1}{2}} \left ( \sum_{i=1}^{n}y_{i}^{2} \right )^{\frac{1}{2}}$$

**Prova:** Para qualquer $$t$$ escalar real temos:

$$
\begin{align}
& 0 \leq \sum_{i=1}^{n} \left ( x_{i} + ty_{i} \right )^{2}\\
& = \sum_{i=1}^{n}x_{i}^{2} + 2t\sum_{i=1}^{n}x_{i}y_{i} + t^{2}\sum_{i=1}^{n}y_{i}^{2}\\
& = c + bt + at^{2}
\end{align}
$$

Onde $$a = \sum_{i=1}^{n}y_{i}^{2}$$, $$b = 2\sum_{i=1}^{n}x_{i}y_{i}$$ e $$c =  \sum_{i=1}^{n}x_{i}^{2}$$

Como $$c + bt + at^{2} \geq 0$$ para todo escalar t real, a equação quadrática $$c + bt + at^{2}$$ não tem duas raízes reais, portanto $$ b^{2} - 4ac \leq 0 $$, ou seja:

$$ \left ( \frac{b}{2} \right )^{2} \leq ac $$

Aplicando raiz quadrada na desigualdade acima chegamos ao resultado desejado.

$$
\begin{align}
& \frac{b}{2} \leq \sqrt{ac} \\
& = \left ( \sum_{i=1}^{n}x_{i}^{2} \right )^{\frac{1}{2}} \left ( \sum_{i=1}^{n}y_{i}^{2} \right )^{\frac{1}{2}}
\end{align}
$$
