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

Conforme as características do conjunto $$\Omega$$ e as propriedades das funções objetivo, teremos os diferentes problemas de otimização. Por exemplo, as funções envolvidas no problema podem ser contínuas ou não, diferenciáveis ou não, lineares ou não. O caso particular em que a função objetivo e as funções que definem $$\Omega$$ são funções lineares é conhecido como um *Problema de Programação Linear* (PPL) e é resolvido por métodos específicos, como o famoso *Método Simplex*. Esta abordagem foi vista [**Aqui**]({{ "/posts/pl-introducao/" | relative_url }}). Veremos aqui problemas onde todas as funções usadas para defini-los são continuamente diferenciáveis e, normalmente, não lineares, isto é, estudaremos o problema geral de *Programação Não Linear* (PNL).

Um caso particular é o problema irrestrito, quando $$ \Omega =  \mathbb{R}^n$$ O problema irrestrito pode ser considerado simples em comparação com o problema geral de PNL e o estudo de suas propriedades bem como dos métodos que o resolvem é de fundamental importância em otimização, porque muitos métodos para resolver o problema geral de PNL fazem uso dos métodos que resolvem o caso irrestrito.

É conhecido na literatura que se o conjunto viável $$\Omega$$ é formado apenas por restrições de igualdade e $$ x^* \in \Omega $$ é um minimizador, então existe $$ \lambda^* \in  \mathbb{R}^m$$ tal que

$$
\bigtriangledown f(x^{*}) + \sum_{i=1}^{m} \lambda^{*}\bigtriangledown h_{i}(x^{*}) = 0
$$

As componentes do vetor $$ \lambda^{*} $$ são chamadas de Multiplicadores de Lagrange e a condição acima é um resultado central na teoria de otimização.
