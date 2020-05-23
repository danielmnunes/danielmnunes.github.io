---
title: "Criando a primeira aplicação flask"
date: 2020-05-22
permalink: /posts/introducao-flask/
tags: [python, flask]
comments: true
excerpt: "Python, Flask"
header:
  teaser: "/images/flask-logo.png"
---

Como criar uma aplicação web simples, robusta e com poucas linhas códigos python, é algo que gostaria de saber ?

Então continue lendo…

Em Python temos várias opções de ferramentas para desenvolvimento web, como: Django, Flask, Bottle, Pyramid, TurboGears, Falcon, entre outros. Hoje falaremos sobre [**Flask**](https://palletsprojects.com/p/flask/).

### Uma breve introdução  
O Flask é uma ferramenta que foi desenvolvida em 01 de abril de 2010. Ela é muito utilizada	para criar aplicações Web, que é o que veremos brevemente aqui. As aplicações criadas com Flask têm diversas vantagens, devido à flexibilidade que a ferramenta proporciona para criação de APIs	com áreas administrativas, para gerenciar os dados enviados e recebidos. Com Flask, podemos fazer tudo isso de forma segura, eficaz e muito simples.

### Instalando o Flask  
Assumo que você tenha instalado a linguagem python em sua máquina, caso contrário veja [**aqui**]({{ "/posts/install-python/" | relative_url }}) como instalar.  

Flask é uma lib do Python e como qualquer outra precisa	ser	instalado para funcionar. Rode o comando a seguir para instalar o Flask em seu [**virtualenv**](https://virtualenv.pypa.io/en/latest/).
```
pip install flask
```
### Escrevendo o código da aplicação  
Agora em um editor de código ou IDE de sua preferência(sugiro o [**vs code**](https://code.visualstudio.com/)), crie um arquivo python chamado *hello.py*. Vamos iniciar importando a classe Flask.
```python
from flask import Flask
```
