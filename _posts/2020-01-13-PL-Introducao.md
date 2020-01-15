---
title: "Introdução a Programação Linear"
date: 2020-01-13
permalink: /posts/pl-introducao/
tags: [Pesquisa Operacional, Programação Linear]
comments: true
excerpt: "Pesquisa Operacional, Programação Linear"
mathjax: "true"
header:
  teaser: "/images/po.png"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/po.png){: .align-center}

## Introdução

No post passado vimos que  a Pesquisa Operacional vem sendo aplicada em diversos segmentos industriais e comerciais (estratégia, marketing, finanças, operações e logística, recursos humanos, entre outros), a fim de decidir sobre a utilização mais eficaz de recursos. A programação linear (PL) é uma das principais ferramentas da PO, e sua aplicação está cada vez mais difundida.

Em um problema de programação linear, a função objetivo e todas as restrições do modelo são representadas por funções lineares. Adicionalmente, as variáveis de decisão devem ser todas contínuas, ou seja, devem assumir quaisquer valores em um intervalo de números reais. O objetivo consiste em maximizar ou minimizar determinada função linear de variáveis de decisão, sujeita a um conjunto de restrições representadas por equações ou inequações lineares, incluindo as de não negatividade das variáveis de decisão.

Desde o desenvolvimento do método Simplex por George B. Dantzig em 1947, a PL vem sendo utilizada para a otimização de problemas reais em diversos setores. Como exemplos, podemos citar os setores de comércio, de serviços, bancário, de transporte, automobilístico, de aviação, naval, alimentício, de bebidas, agropecuário, de saúde, imobiliário, de siderurgia, de metalurgia, de mineração, de papel e celulose, de energia elétrica, de petróleo, gás e combustíveis, de computadores e de telefonia, entre outros.

## Formulação Matemática de um Modelo Geral de PL

Os problemas de programação linear buscam determinar valores ótimos para as variáveis de decisão $$ x_{1}, x_{2}, x_{3}, \cdots x_{n} $$ que devem ser contínuas, a fim de maximizar ou minimizar a função linear $$ z $$, sujeita a um conjunto de $$ m $$ restrições lineares de igualdade(equações com sinal do tipo $$ = $$) e/ou de desigualdade (inequações com sinal do tipo $$\leq$$ ou $$\geq $$ ).

As soluções que satisfazem todas as restrições, inclusive as de não negatividade das variáveis de decisão, são chamadas de soluções viáveis. A solução viável que apresenta melhor valor da função objetivo é chamada de solução ótima.

A formulação de um modelo geral de programação linear pode ser representada matematicamente como:

$$ \begin{alignat}{6}
  \max \mbox{ou} \min \quad & z = &  c_{1} x_{1}  & + & c_{2} x_{2}  & \cdots &  c_{n} x_{n}  &    && \\
  \mbox{s.t.} \quad         &     &  a_{11} x_{1} & + & a_{12} x_{2} & \cdots &  a_{1n} x_{n} & \left \{ \leqslant , = , \geqslant  \right \} b_{1} && \tag{Restrição 1} \\
                            &     &  a_{21} x_{1} & + & a_{22} x_{2} & \cdots &  a_{2n} x_{n} & \left \{ \leqslant , = , \geqslant  \right \} b_{2} && \tag{Restrição 2} \\
                            &     &  \vdots       &   & \vdots  &  &    & \vdots &&  \\
                            &     &  a_{m1} x_{1} & + & a_{m2} x_{2} & \cdots &  a_{mn} x_{n} & \left \{ \leqslant , = , \geqslant  \right \} b_{m} && \tag{Restrição m} \\
                            &     & \rlap{x_j \ge 0, j = 1, 2, \cdots ,n }
\end{alignat}
$$

em que:  
$$z$$ é a função objetivo;  
$$x_{j}$$ é a j-ésima variável de decisão, $$j = 1, 2, \cdots, n$$  
$$a_{ij}$$ é a constante da i-ésima restrição da j-ésima variável, $$i = 1, 2, \cdots, m$$, $$j = 1, 2, \cdots, n$$  
$$b_{i}$$ é o termo independente ou quantidade de recursos disponíveis da i-ésima restrição, $$i = 1, 2, \cdots, m$$  
$$c_{j}$$ é a constante da j-ésima variável da função objetivo, $$j = 1, 2, \cdots, n$$  

O problema padrão de programação linear também pode ser escrito de forma matricial:

$$ \begin{alignat}{3}
            \max \mbox{ou} \min \quad & \textbf{z} = &  \textbf{cx} & && \\
            \mbox{s.t.}         \quad &              &  \textbf{Ax} & \textbf{= b} && \\
                                      &              &  \textbf{x} \geqslant \textbf{0}
  \end{alignat}
$$

