---
title: "Python: Checando se uma lista é vazia :snake: :man_juggling:"
date: 2019-10-04
permalink: /posts/lista-vazia/
tags: [Python]
comments: true
excerpt: "Python"
mathjax: "true"
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


Até a próxima :v:
