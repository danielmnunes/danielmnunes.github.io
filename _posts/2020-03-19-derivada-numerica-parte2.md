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

portanto, conheçemos $$f$$ apenas nos pontos e não na curva inteira, como no gráfico da figura abaixo.
![image-center]({{ site.url }}{{ site.baseurl }}/images/pontos.png){: .align-center}

Queremos calcular $$f{}'(x_{0})$$ apenas com essa informação limitada. Lembrando a definição da derivada é:

$$
f{}'(x) = \lim\limits_{h\to 0} \frac{f(x+h) - f(x)}{h}
$$

um primeiro palpite em aproximar $$f{}'(x)$$ é usar uma das seguintes abordagens:
- Derivada forward com dois pontos: $$ f{}'(x_{i}) \approx \lim\limits_{h\to 0} \frac{f(x_{i+1}) - f(x_{i})}{h} $$
- Derivada backward com dois pontos: $$ f{}'(x_{i}) \approx \lim\limits_{h\to 0} \frac{ f(x_{i}) - f(x_{i-1})}{h} $$

Ilustrações dessas abordagens são mostradas na figura abaixo. Essas duas aproximações da derivada são simplesmente as inclinações entre os pontos adjacentes.
![image-center]({{ site.url }}{{ site.baseurl }}/images/pontos1.png){: .align-center}

Perguntas importantes a serem feitas sobre essas aproximações são "Qual a precisão delas?" e "Uma dessas aproximações é melhor que a outra?" As respostas para essas perguntas podem ser determinadas na série Taylor. Seja h o espaçamento entre os pontos, como um parâmetro. Esperamos que, à medida que h diminua, as aproximações de derivada forward e backward devem se aproximar do valor real de $$f{}'(x_{i})$$ (assumindo que não há erro de arredondamento significativo, o que não deve ser um problema se h não for muito pequeno). Usando o teorema de Taylor com $$x_{0} = x_{i}$$ e escolher $$x = x_{i + 1}$$ temos:

$$
f(x_{i+1}) = f(x_{i}) + f{}'(x_{i})(x_{i+1} - x_{i}) + \frac{f{}''(c)}{2!}(x_{i+1} - x_{i})^{2}
$$

Para algum $$ x_{i} \leq  c \leq x_{i+1} $$. Tome $$h = x_{i+1} - x_{i}$$, isso reduz a:

$$
f(x_{i+1}) = f(x_{i}) + hf{}'(x_{i}) + \frac{h^{2}f{}''(c)}{2!}
$$

Agora, fazendo algumas manipulações algebricas temos:

$$
\frac{f(x_{i+1}) - f(x_{i})}{h} - f{}'(x_{i}) = \frac{h^{2}f{}''(c)}{2!}
$$

Observe que o lado esquerdo da igualdade é precisamente a diferença entre a derivada numérica e a derivada real $$f{}'(x_{i})$$. Assim, provamos o seguinte resultado.

__**Teorema:**__ Seja $$f$$ uma função duas vezes diferenciável no intervalo $$[x_{i} x_{i+1}]$$ Então o erro entre a aproximação numérica e $$f{}'(x_{i})$$ é limitado por:

$$
\max\limits_{x \to 1} x^{2}
$$
