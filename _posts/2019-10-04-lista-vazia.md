---
title: "Python: Checando se uma lista é vazia :snake: :man_juggling:"
date: 2019-10-04
permalink: /posts/lista-vazia/
tags: [Python]
comments: true
excerpt: "Python"
header-includes:
  - \usepackage{algorithm2e}
header:
  teaser: "/images/python.png"
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
\caption{SLAM}
\begin{algorithmic}
\PROCEDURE{SLAM}{$X_{t-1}, u_t, z_t$}
    \STATE $\bar{X}_t = X_t = \empty$
    \FOR{$m = 1$ \TO $M$}
        \STATE $x_t^{[k]} = $ \CALL{MotionUpdate}{$u_t, x_{t-1}^{[k]}$}
        \STATE $w_t^{[k]} = $ \CALL{SensorUpdate}{$z_t, x_{t}^{[k]}$}
        \STATE $m_t^{[k]} = $ \CALL{UpdateOccupancyGrid}{$z_t, x_{t}^{[k]}, m_{t-1}^{[k]}$}
        \STATE $\bar{X}_t = \bar{X}_t + \left < x_{t}^{[k]}, w_{t}^{[k]} \right >$
    \ENDFOR
    \FOR{$k = 1$ \TO $M$}
        \STATE draw $i$ with probability $w_t^{[i]}$ 
        \STATE add $\left < x_t^{[i]}, m_t^{[i]} \right >$ \TO $X_t$
    \ENDFOR
    \RETURN $X_t$ 
\ENDPROCEDURE
\end{algorithmic}
\end{algorithm}
" %}

$$ \sum \theta $$

Até a próxima :v:
