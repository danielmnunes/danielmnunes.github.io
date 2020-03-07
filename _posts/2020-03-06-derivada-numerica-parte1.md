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
header-includes:
  \usepackage[ruled,vlined,linesnumbered]{algorithm2e}
---

A série de Taylor e o teorema de Taylor desempenham um papel fundamental nas aproximações de derivadas por métodos de diferenças finitas. Começamos este post com uma revisão desses resultados importantes.  

Série de Taylor: Se uma função f é infinita vezes diferenciável em $$ \mathbb{R}$$, então para qualquer ponto $$x_{0}$$ escolhido, temos:  

# Algorithm 1
Just a sample algorithmn
$$
\begin{algorithm}[H]
\DontPrintSemicolon
\SetAlgoLined
\KwResult{Write here the result}
\SetKwInOut{Input}{Input}\SetKwInOut{Output}{Output}
\Input{Write here the input}
\Output{Write here the output}
\BlankLine
\While{While condition}{
    instructions\;
    \eIf{condition}{
        instructions1\;
        instructions2\;
    }{
        instructions3\;
    }
}
\caption{While loop with If/Else condition}
\end{algorithm} 
$$
