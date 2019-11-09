---
title: "A sequência de Fibonacci em Python"
date: 2019-11-08
permalink: /posts/fibonacci-python/
tags: [Python]
comments: true
excerpt: "Python"
header:
  teaser: "/images/fib.gif"
---

![image-center]({{ site.url }}{{ site.baseurl }}/images/fib.gif){: .align-center}

Vista em vários fenômenos do nosso cotidiano, como mãos humanas, estrofes de poemas e até nas pirâmides do Egito! A sequência de Fibonacci é uma sucessão de números, que inicia com 0 e 1, os números seguintes são sempre a dos dois números anteriores, então depois 0 e 1 vêm 1, 2, 3, 5, 8, 13…

O primeiro valor da sequência é 0, o quarto é 2, e seguindo a lógica um n-ésimo termo é dado da seguinte forma: $$ f(n) = f(n-1) + f(n-2) $$

Para tentar resolver o problema de gerar o n-ésino termo da sequência de Fibonacci  vou apresentar alguns métodos.

## Primeira tentativa recursiva

A função fib descrita acima pode ser facilmente traduzida em uma função Python recursiva(Uma função recursiva é uma função chama a si mesma) Esse código será nossa primeira tentativa de abordagem.

```python
def fib(n: int) -> int:
    return fib(n - 1) + fib(n - 2)
```

Vamos testar nosso algoritmo solicitando o quinto termo da sequência de Fibonacci:

```python
if __name__ == "__main__":
    print(fib(5))
```

Se tentarmos rodar no código recebemos o seguinte erro:

```
RecursionError: maximum recursion depth exceeded
```

O erro diz que estamos rodando a função infinita vezes, sem um resultado final, como um loop infinito.

## Utilizando casos bases

A razão para a recursão infinita é que nunca especificamos um caso base. Em uma função recursiva, um caso base serve como um ponto de parada.

No caso da função Fibonacci, temos dois casos de base 0 e 1. Nem 0 nem 1 são a soma dos dois números anteriores na sequência. Em vez disso, eles são os dois primeiros valores da sequência. Vamos especificá-los como casos básicos no algoritmo.


```python
def fib(n: int) -> int:
    if n < 2:  # caso base
        return n
    return fib(n - 2) + fib(n - 1)  # caso recursivo
```

Agora nossa função fib pode ser chamada sem que entre em um loop infinito.

```python
if __name__ == "__main__":
    print(fib(5))
    print(fib(10))
```

Não tente executar para fib(50). Isso nunca terminará de executar! Por quê? Cada chamada para fib() resulta em mais duas chamadas para fib() por meio das chamadas recursivas fib(n - 1) e fib(n - 2). Em outras palavras, a árvore de chamadas cresce exponencialmente. Por exemplo, uma chamada de fib(4) resulta em todo esse conjunto de chamadas:

```
fib2(4) -> fib2(3), fib2(2)
fib2(3) -> fib2(2), fib2(1)
fib2(2) -> fib2(1), fib2(0)
fib2(2) -> fib2(1), fib2(0)
fib2(1) -> 1
fib2(1) -> 1
fib2(1) -> 1
fib2(0) -> 0
fib2(0) -> 0
```

Se você contá-las (e como você verá se adicionar algumas chamadas de impressão), há 9 chamadas para fib() apenas para calcular o quarto elemento! E fica pior. São necessárias 15 chamadas para calcular o elemento 5, 177 chamadas para calcular o elemento 10 e 21.891 chamadas para calcular o elemento 20. Mas calma podemos fazer melhor.

## Memoização para o resgate

Você leu certo, a técnica se chama **Memoização**, é uma técnica na qual você armazena os resultados das tarefas computacionais quando elas são concluídas, para que, quando você precisar delas novamente, possa procurá-las em vez de precisar computá-las uma segunda(ou milionésima) vez.

![image-center]({{ site.url }}{{ site.baseurl }}/images/memo.png){: .align-center}

Vamos criar uma nova versão da função Fibonacci que utiliza um dicionário Python para fins de memoização.

```python
from typing import Dict
memo: Dict[int, int] = {0: 0, 1: 1}  # our base cases

def fib(n: int) -> int:
    if n not in memo:
        memo[n] = fib(n - 1) + fib(n - 2)  # memoização
    return memo[n]
```

Agora você pode chamar com segurança fib(50).

```python
if __name__ == "__main__":
    print(fib(5))
    print(fib(50))
```
Uma chamada para fib(20) resultará em apenas 39 chamadas de fib(), em oposição aos 21.891 de fib() sem memoização. O dicionário memo é preenchido com os casos base 0 e 1, e vai salvando os casos seguintes a medida que é solicitado.

## Memoização automática

O código anterior pode ser simplificado. Python possui um decorador padrão para memoizar automaticamente qualquer função. no código abaixo, o decorador *@functools.lru_cache ()* é usado com a função recursiva que utiliza os casos bases. Cada vez que fib() é executado com um novo argumento, o decorador faz com que o valor de retorno seja armazenado em cache. Em chamadas futuras de fib() com o mesmo argumento, o valor de retorno anterior de fib() para esse argumento é recuperado do cache e retornado.

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:  # base case
        return n
    return fib(n - 2) + fib(n - 1)  # caso recursivo

if __name__ == "__main__":
    print(fib(5))
    print(fib(50))
```

Observe que somos capazes de calcular fib(50) instantaneamente, mesmo que o corpo da função seja a mesma que a estratégia de usar apenas casos bases. A propriedade maxsize de @lru_cache indica quantas das chamadas mais recentes da função que está decorando devem ser armazenadas em cache. Definir como *None* indica que não há limite.

## Seja simples, Fibonacci bottom-up

Existe uma opção ainda mais eficiente. Podemos resolver Fibonacci com uma abordagem iterativa bottom-up(De baixo para cima), ou seja, construímos nossa sequência sem o uso de recursão.


```python
def fib(n: int) -> int:
    if n == 0: return n  # special case
    last: int = 0  # initially set to fib(0)
    next: int = 1  # initially set to fib(1)
    for _ in range(1, n):
        last, next = next, last + next
    return next


if __name__ == "__main__":
    print(fib(2))
    print(fib(50))
```

Com essa abordagem, o loop for será executado no máximo n - 1 vezes. Em outras palavras, esta é a versão mais eficiente ainda. Compare 19 execuções do loop for com 21.891 chamadas recursivas de fib() para o 20º termo de Fibonacci. Isso pode fazer uma diferença enorme em uma aplicação real.

Lembre-se de que qualquer problema que possa ser resolvido recursivamente também pode ser resolvido iterativamente.

Até a próxima :v:
