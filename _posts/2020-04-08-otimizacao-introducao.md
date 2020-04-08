---
title: "Otimização: Introdução"
date: 2020-04-08
permalink: /posts/otimizacao-introducao/
tags: [Matemática, Computação]
comments: true
excerpt: "Matemática, Computação"
mathjax: "true"
header:
  teaser: "/images/otimizacao.png"
---
Otimização, direta ou indiretamente, faz parte do nosso dia a dia. Muitas vezes nem nos damos conta, mas estamos otimizando algo.

Mais formalmente, podemos dizer que otimização consiste em encontrar pontos de mínimo ou de máximo de uma função real sobre um conjunto $$ \Omega \subseteq \mathbb{R}^{n} $$. Isto pode ser colocado na forma:

$$
\begin{array}{ll}
\text{minimizar}  & f(x) \\
\text{sujieto a}& x \in \Omega
\end{array}
$$

Em geral, o conjunto $$\Omega$$ é definido por restrições de igualdade e/ou desigualdade, ou seja,

$$
\Omega = \left \{ x \in \mathbb{R}^{n} | g(x) \leq 0, h(x)=0 \right \},
$$

onde $$ g: \mathbb{R}^n \rightarrow \mathbb{R}^p $$ e $$ h: \mathbb{R}^n \rightarrow \mathbb{R}^m $$ são funções quaisquer. O problema de otimização pode então ser reescrito como:

$$
\begin{array}{ll}
\text{minimizar}  & f(x) \\
\text{sujieto a}& g(x) \leq 0 \\
                & h(x) = 0
\end{array}
$$
