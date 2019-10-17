---
title: "Python: Checando se uma lista é vazia :snake: :man_juggling:"
date: 2019-10-04
permalink: /posts/lista-vazia/
tags: [Python]
comments: true
excerpt: "Python"
header:
  teaser: "/images/python.png"
mathjax: "true"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/python.png){: .align-center}

Em Python temos uma forma muito rápida de verificar se uma lista é vazia:

Vamos criar duas listas:

```python
Amigos = ['Daniel', 'Patricia', 'Marcos', 'Lucas', 'Maria']
```

```python
Inimigos = []
```

No próprio *if* podemos verificar:

```python
if Amigos:
    print('Lista não é vazia') # Lista não é vazia
if Inimigos:
    print('Lista não é vazia') #
```

Em Python uma lista não vazia resulta um *True* em condicionais, por isso o segundo *if* é *False* e não é printado a mensagem.

{% include pseudocode.html id="1" code="
\begin{algorithm}
\caption{Quicksort}
\begin{algorithmic}
\PROCEDURE{Quicksort}{$A, p, r$}
    \IF{$p < r$} 
        \STATE $q = $ \CALL{Partition}{$A, p, r$}
        \STATE \CALL{Quicksort}{$A, p, q - 1$}
        \STATE \CALL{Quicksort}{$A, q + 1, r$}
    \ENDIF
\ENDPROCEDURE
\PROCEDURE{Partition}{$A, p, r$}
    \STATE $x = A[r]$
    \STATE $i = p - 1$
    \FOR{$j = p$ \TO $r - 1$}
        \IF{$A[j] < x$}
            \STATE $i = i + 1$
            \STATE exchange
            $A[i]$ with     $A[j]$
        \ENDIF
        \STATE exchange $A[i]$ with $A[r]$
    \ENDFOR
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
" %}

Até a próxima :v:
