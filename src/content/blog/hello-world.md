---
title: Olá, mundo
date: 2026-05-23
description: O primeiro post deste blog — uma nota curta sobre por que decidi começar a escrever aqui.
tags: [blog, tech]
---

Este é o primeiro post do blog. A ideia é usar este espaço para registrar notas curtas sobre engenharia de software, sistemas distribuídos e o que tenho aprendido construindo produtos com IA.

## Por que um blog estático

O sistema funciona assim: cada post é um arquivo `.md` versionado junto ao código. Não há banco de dados, não há CMS — só Vite resolvendo os arquivos em build-time. O resultado é simples, rápido e fácil de manter.

Algumas vantagens:

- **Zero infraestrutura.** Tudo vive no mesmo repositório do site.
- **Markdown.** Escrever um post é tão simples quanto criar um arquivo.
- **Versionado.** Histórico, diff e revisão saem de graça do git.

## Um exemplo de código

```ts
interface Post {
  slug: string
  title: string
  date: string
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(date))
}
```

## Próximos passos

Tenho algumas ideias na fila: notas sobre arquitetura de agentes, padrões de integração com LLMs em backends Java/Go, e debugging de pipelines de inferência. Se quiser acompanhar, basta voltar aqui de tempos em tempos — ou me mandar uma mensagem no [LinkedIn](https://www.linkedin.com/in/daniel-nunes-dev).

> O importante não é publicar muito, é publicar o que vale a pena ler.
