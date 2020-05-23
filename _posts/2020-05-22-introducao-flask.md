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
O próximo passo é criar uma instância de Flask, setando seu nome com a variável especial *\_\_name\_\_* e atribuindo e variável *app*.
```python
app = Flask(__name__)
```
Agora precisamos dizer para o flask o que ele deve fazer quando alguém acessar a  página inicial da nossa aplicação, faremos isso definindo uma função python e inserindo um decorador *route* com caminho raiz da aplicação, ou seja, *’/’*.
```python
@app.route('/')
def index():
    return '<h1> Olá Mundo!! </h1>'
```
A função *index* retorna apenas uma string com um cabeçalho h1 do html.

Nosso último passo é colocar nossa aplicação no ar, para isso utilizaremos a método *run* da nossa instância flask *app*.
```python
app.run()
```

Nosso arquivo *hello.py* ficou assim:
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1> Olá Mundo!! </h1>'

app.run()
```
### Executando a aplicação  
Vamos então vê com ficou, para isso basta executar nosso arquivo *hello.py*, em um terminal no mesmo diretório digite.
```
python hello.py
```
Se tudo ocorrer bem você receberá no terminal algo próximo de.
```
* Serving Flask app "hello" (lazy loading)
* Environment: production
  WARNING: This is a development server. Do not use it in a production deployment.
  Use a production WSGI server instead.
* Debug mode: off
* Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```
Nossa aplicação já está funcionando, para visualizar abra o endereço recebido no terminal em um navegador(espero que você não utilize o I.E.)  


![image-center]({{ site.url }}{{ site.baseurl }}/images/flask-intro.PNG){: .align-center}