---
title: "Construindo um Chatbot com o DialogFlow"
date: 2019-10-24
permalink: /posts/chatbot-dialogflow/
tags: [Chatbot]
comments: true
excerpt: "Chatbot"
header:
  teaser: "/images/chatbot.jpg"
---

Com Chatbots conseguimos automatizar conversas, agilizar o atendimento e dar mais atenção para os casos mais complexos.

![image-center]({{ site.url }}{{ site.baseurl }}/images/chatbot.gif){: .align-center}

Chatbot é uma aplicação de inteligência artificial que vem se tornando uma vantagem competitiva para as empresas, simulando uma conversa humana em um chat. Dessa forma, é possível automatizar tarefas repetitivas e burocráticas, como dúvidas frequentes, na forma de diálogo pré-definido entre o usuário e um “robô”.

Existem muitas ferramentas que propõem a criação de chatbots, hoje eu quero te mostrar o [**Dialogflow**](https://dialogflow.com/). Através dele é possível configurar um diálogo em alguns minutos, com as respostas esperadas e com possibilidades de implantações na web ou rede sociais como Facebook messenger.

## Cadastrando-se no Dialogflow
Para começar você precisa ter uma conta no Google e criar uma conta no Dialogflow a partir dela. É só você acessar o Console do Dialogflow, clicar no botão escrito Google e permitir as solicitações. Será apresentado os termos de serviço e outras perguntas, então você deverá concordar com eles.

![image-center]({{ site.url }}{{ site.baseurl }}/images/login-df.png){: .align-center}

## Criando um Agente
Depois de entrar no Console, você tem as seguintes opções. Clique na opção Create Agent, Digite o nome do agente, selecione o idioma português do Brasil e clique no botão Create. No lugar do botão aparecerá o texto Working...

![image-center]({{ site.url }}{{ site.baseurl }}/images/criando-agente-df.gif){: .align-center}

Já temos um agente criado. Vamos configurá-lo! Inicialmente, os agentes tem duas **intents**, que são **Default Fallback Intent** para quando ele não compreende o que o usuário disse, e **Default Welcome Intent** para saudar o usuário em sua primeira mensagem. Vamos testar nosso chatbot.

![image-center]({{ site.url }}{{ site.baseurl }}/images/teste-df.gif){: .align-center}

## Criando uma Intent

Intent é um componente que define como o agente vai responder em determinadas situações. Clique no botão Create Intent, adicione o nome “nome” no campo Intent name. Na seção Training phrases, adicione as seguintes sentenças:  
- Qual o seu nome?  
- Você tem um nome?  
- nome  


Na seção Responses adicione a sentença:  
- Meu nome é Amigo Chatbot  

Clique no botão Save.

## Testando nosso chatbot
Chegou a hora de testar nosso chatbot! No lado direito do Console tem uma opção Try it now.
![image-center]({{ site.url }}{{ site.baseurl }}/images/teste-df2.gif){: .align-center}

## Definindo parâmetros com Entities  
Entities é um componente que defini um atributo de uma sentença que nosso Chatbot entende. Crie uma nova intent chamada “Idiomas” com as seguintes frases de treinamento:  
- Eu sei inglês  
- Eu falo francês  
- Eu sei escrever em alemão  

Para cada idioma, selecione-o e indique a variável @sys.language.
![image-center]({{ site.url }}{{ site.baseurl }}/images/param-df.png){: .align-center}

Cadastre uma resposta com a mensagem: Top! Eu não sabia que você conhecia $language !! e clique no botão Save.

Quando terminar o cadastro da nova intent, teste algumas vezes com a frase: Eu sei português

![image-center]({{ site.url }}{{ site.baseurl }}/images/teste-def3.gif){: .align-center}

Ele reconheceu que "português" é um idioma. Isto significa que nosso chatbot está aprendendo a lidar com diversas formas de interação, sem restrição às mensagens cadastradas. Quanto mais entradas distintas ele receber, melhor ele vai acertar as novas respostas.

## Testando com Web Demo
Existem várias integrações no DialogFlow, como: Slack, Twitter,Messenger do Facebook, entre outros. Vamos testar nosso chatbot online, para isso na aba Integrations habilite o item Web Demo, depois clique no link gerado.

![image-center]({{ site.url }}{{ site.baseurl }}/images/webdemo.gif){: .align-center}

Uma nova aba será aberta em seu navegador, e seu chatbot terá uma cara de chat, vamos testa-lo:

![image-center]({{ site.url }}{{ site.baseurl }}/images/final-teste-df.gif){: .align-center}

Espero que você tenha gostado do Dialogflow e que tenha conseguido aplicar as práticas que apresentei. Esse tutorial foi criado a partir do texto original na [**documentação**](https://dialogflow.com/docs). Lá tem explicações muito mais detalhadas e mais funções que podem ser criadas utilizando esta poderosa ferramenta.

Até a próxima :v:
