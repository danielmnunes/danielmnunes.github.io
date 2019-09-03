---
title: "Família Exponencial"
date: 2019-09-03
tags: [Estatística, Inferência]
excerpt: "Estatística, Inferência"
mathjax: "true"
---
![image-center]({{ site.url }}{{ site.baseurl }}/images/inferencia.gif){: .align-center}

Uma família de fdps ou fps é chamada exponencial, se puder ser expressa como:

$$ f(x; \theta ) = exp^{\left \{  c(\theta) T(x) + d(\theta) + S(x)\right \}} \:\:  com \: \: \:  x \in A $$

Onde $$ c $$ e $$ d $$ são funções reais de $$ \theta $$ (que não dependem de $$ x $$) e $$ T $$, $$ S $$ são funções de $$ x $$ (Elas não dependem de $$ \theta $$).

Vamos com um exemplo bem simples, seja $$ X $$ uma variável aleatória com distribuição de Bernoulli($$ \theta $$), com função de probabilidade:

$$ f(x; \theta) = \theta^{x}(1- \theta)^{1-x}  $$

 Então, podemos reescrevê-la  como:

 $$ f(x; \theta) = \left ( \frac{ \theta}{1- \theta} \right )^{x}(1- \theta) $$

 Aplicando as funções exponencial e logaritmo(Inversas entre si) ficamos com:

 $$ f(x; \theta) =  exp^{\: x \, log\left ( \frac{ \theta}{1- \theta} \right ) \,  +\,  log(1 - \theta)} $$

 Lembrando que $$ x $$ pertence ao conjunto $$ \left \{ 0, 1  \right \} $$.

 Chegamos ao resultado pretendido, reescrevemos a função de probabilidade da distribuição Bernoulli na forma da família exponencial:

$$ c(  \theta ) =  log\left ( \frac{ \theta}{1- \theta} \right ) ; $$
$$ T(x) =  x ; $$
$$ d( \theta ) =  log(1 - \theta) ; $$
$$ S( x ) = 0  $$


Vamos agora ver mais um exemplo, seja $$ X $$ uma variável aleatória com distribuição de Normal($$ \mu ; \sigma^{2} $$), onde $$ \mu $$ é média da distribuição e $$ \sigma^{2} $$ a Variância. A função densidade de probabilidade é:

$$ f(x; \theta) = \frac{1}{\sqrt[]{2\pi} \sigma }exp^{-\frac{(x-\mu)^{2}}{2\sigma^{2}}} $$

Aplicando exponencial e logaritmo e fazendo um pequeno algebrismo chegamos em:

$$ exp^{ \left \{  -ln( \sqrt{2 \pi}) - ln( \sigma) - \frac{x^{2}}{2 \sigma^{2}} + \frac{ \mu x}{ \sigma^{2}} - \frac{ \mu}{2 \sigma^{2}} \right \} } $$





