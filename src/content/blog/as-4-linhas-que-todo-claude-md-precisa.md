---
title: "As 4 Linhas que Todo CLAUDE.md Precisa"
description: "Um repositório com 4 linhas de comportamento no CLAUDE.md viralizou com 144 mil estrelas no GitHub. Entenda por que essas linhas funcionam e como aplicá-las no seu projeto."
date: 2026-03-15
tags: ["claude-code", "ia", "produtividade", "engenharia-agentiva"]
---

# As 4 Linhas que Todo CLAUDE.md Precisa

Em janeiro de 2026, Andrej Karpathy publicou uma observação sobre como agentes de IA falham. Não por falta de capacidade técnica, mas por três comportamentos específicos que sabotam qualquer sessão:

1. Assumir silenciosamente e seguir em frente sem verificar
2. Transformar 50 linhas de código em 500 sem necessidade
3. Modificar código que não deveria ser tocado

Um desenvolvedor chamado Forrest Chang leu isso e transformou as observações em quatro linhas de instrução no `CLAUDE.md`. O repositório chegou a 144 mil estrelas em semanas.

Neste post, você vai entender por que essas linhas funcionam, o que cada uma resolve, e como construir um `CLAUDE.md` que realmente muda o comportamento do Claude Code.

---

## O que é o CLAUDE.md

O `CLAUDE.md` é um arquivo que o Claude Code lê automaticamente no início de toda sessão. Ele funciona como um prompt de sistema persistente, disponível em todas as conversas, sem precisar repetir nada.

Sem ele, o Claude começa cada sessão sem contexto: precisa explorar o repositório, fazer suposições sobre suas preferências, e descobrir o que pode ou não pode fazer. Com um bom `CLAUDE.md`, ele começa já informado.

Coloque o arquivo na raiz do projeto, junto ao `package.json` ou `pom.xml`. Em monorepos, você pode ter um na raiz com regras globais e um por módulo com regras específicas.

---

## Os três padrões de falha que o arquivo resolve

Antes de ver as 4 linhas, vale entender os problemas que elas atacam.

**Suposições silenciosas.** O agente encontra ambiguidade, escolhe uma direção, implementa 200 linhas, e só então você descobre que a direção estava errada. Tempo perdido, contexto comprometido.

**Over-engineering automático.** O agente recebe uma tarefa simples e retorna uma solução com abstrações desnecessárias, interfaces extras, e complexidade que ninguém pediu. É um padrão comum porque os modelos foram treinados em código "sofisticado".

**Mudanças ortogonais.** Você pede para corrigir um bug no módulo de autenticação. O agente corrige o bug e também "melhora" três outros arquivos que não faziam parte do escopo. Algumas melhorias quebram coisas.

---

## As 4 linhas

```markdown
- Pense passo a passo antes de agir
- Não over-engineer
- Modifique apenas o que for necessário
- Quando incerto, pergunte
```

Simples assim. Cada linha ataca um dos padrões de falha diretamente.

### "Pense passo a passo antes de agir"

Esta linha força o agente a explorar e planejar antes de executar. Na prática, o Claude vai descrever o que entendeu do problema e a abordagem que pretende usar antes de escrever qualquer código.

O que parece lento é na verdade mais rápido: você corrige a direção antes de 200 linhas serem escritas na direção errada.

### "Não over-engineer"

Esta linha combate a tendência de adicionar abstrações que não foram pedidas. Se você pediu uma função que lê um arquivo CSV, o agente deve retornar essa função, não um framework de parsing configurável com suporte a múltiplos formatos.

A versão mais específica desta instrução é: "Implemente a solução mais simples que resolve o problema descrito. Não adicione flexibilidade para casos de uso que não foram mencionados."

### "Modifique apenas o que for necessário"

Esta linha define o escopo de cada tarefa. O agente só deve tocar arquivos diretamente relacionados ao que foi pedido. Qualquer "melhoria" fora do escopo precisa de aprovação explícita.

Isso é especialmente importante em bases de código grandes, onde um agente muito "prestativo" pode introduzir mudanças em arquivos críticos que você vai descobrir apenas na revisão do PR.

### "Quando incerto, pergunte"

Esta linha é a que mais aumenta a qualidade do output. Em vez de o agente assumir e seguir em frente, ele para e pergunta. A pergunta pode ser chata no momento, mas é infinitamente melhor do que 30 minutos de implementação na direção errada.

---

## Como estruturar o restante do CLAUDE.md

As 4 linhas são o núcleo comportamental, mas um CLAUDE.md completo tem mais contexto. A estrutura que funciona na prática:

```markdown
# [NOME DO PROJETO]

## Visão geral
[2-3 frases: o que é o projeto, quem usa, o que faz]
Stack: [Framework] · [Banco] · [Auth]

## Arquitetura
- `src/domain/` — entidades e regras de negócio
- `src/application/` — casos de uso
- `src/infrastructure/` — adapters, repos, configs
- `src/api/` — controllers e DTOs

## Regras (nunca viole)
- NUNCA execute `mvn clean install` sem aviso — demora 4 minutos
- NUNCA faça commit direto em main
- NUNCA modifique arquivos em `src/infrastructure/security/` sem aprovação explícita
- Pense passo a passo antes de agir
- Não over-engineer
- Modifique apenas o que for necessário
- Quando incerto, pergunte

## Stack e convenções
- Java 21 com Spring Boot 3.x
- Lombok para reduzir boilerplate
- Records para DTOs imutáveis
- Testes com JUnit 5 + Mockito, integração com Testcontainers

## Comandos
- `./mvnw test` — roda os testes unitários
- `./mvnw verify` — testes + integração
- `docker compose up -d` — sobe dependências locais

## Contexto atual
Trabalhando em: [feature atual]
Status: [Em andamento / Testando / Pronto para review]
```

---

## A seção mais subestimada: Contexto atual

A maioria dos desenvolvedores escreve o `CLAUDE.md` uma vez e nunca atualiza. O resultado é um arquivo que descreve o projeto como era seis meses atrás.

A seção "Contexto atual" deve ser atualizada no início de cada sessão de trabalho. É a diferença entre um agente que entende o que você está fazendo agora e um que precisa ser contextualizado a cada mensagem.

```markdown
## Contexto atual
Trabalhando em: integração com Stripe para assinaturas
Status: webhook funcionando, UI do formulário em andamento
Bloqueadores: webhooks do Stripe em modo de teste precisam de ngrok
Próximo passo: completar o fluxo de checkout e testar end-to-end
```

---

## O que não colocar no CLAUDE.md

Tão importante quanto o que incluir é o que deixar fora.

**Credenciais e segredos.** Jamais. Use `.env` para isso.

**Informações que mudam frequentemente.** Se muda toda semana, use o chat da sessão. O `CLAUDE.md` é para o que é estável.

**O que o Claude já faz por padrão.** Não documente convenções que o Claude segue automaticamente. Se você escreve "use nomes descritivos para variáveis", está desperdiçando tokens.

**Documentação que pertence ao código.** Javadoc e comentários inline existem para isso. O `CLAUDE.md` não é um README.

O guia prático: mantenha abaixo de 200 linhas. Acima disso, as instruções começam a se perder.

---

## Regras como restrições, não como preferências

A forma como você escreve uma regra importa tanto quanto o conteúdo dela.

**Preferência (fraca):**
> "Tente manter as funções curtas"

**Restrição (forte):**
> "NUNCA deixe uma função exceder 30 linhas. Decomponha em funções menores."

O Claude trata `NUNCA` como uma restrição rígida, não uma sugestão. Use linguagem imperativa e ativa. "NUNCA faça X" é mais eficaz que "Evite X quando possível".

Para regras que você quer que nunca sejam violadas, use `NUNCA [ação] sem [condição]`. Isso deixa claro o que está proibido e o que seria necessário para a exceção.

---

## Armadilhas comuns

**CLAUDE.md muito longo.** Se o arquivo tem 500 linhas, as regras importantes se perdem no meio. Seja implacável na poda. Se o Claude já faz algo corretamente sem a instrução, delete-a.

**Regras sem razão.** "NUNCA use `--legacy-peer-deps`" deixa o agente travado quando há um conflito de dependência real. Complete com a direção: "NUNCA use `--legacy-peer-deps`; resolva conflitos atualizando o pacote para uma versão compatível."

**Não versionar o arquivo.** O `CLAUDE.md` deve estar no git. Assim o time todo contribui e as regras evoluem com o projeto.

---

## Resumo

- O `CLAUDE.md` é o prompt de sistema persistente do Claude Code, carregado no início de cada sessão
- As 4 linhas essenciais atacam: suposições silenciosas, over-engineering, mudanças fora do escopo e incerteza não comunicada
- Escreva regras como restrições (`NUNCA`) e não como preferências ("tente")
- Mantenha abaixo de 200 linhas — arquivo longo é arquivo ignorado
- Atualize a seção de contexto atual no início de cada sessão de trabalho

---

## Próximos passos

- [Best practices for Claude Code — Documentação oficial](https://code.claude.com/docs/en/best-practices)
- [CLAUDE.md Best Practices — DataCamp](https://www.datacamp.com/tutorial/writing-the-best-claude-md)
- [AGENTS.md vs CLAUDE.md — Guia definitivo](https://blink.new/blog/agents-md-vs-claude-md)

---

## Referências

- [Best practices for Claude Code - Anthropic](https://code.claude.com/docs/en/best-practices)
- [CLAUDE.md Best Practices - Blink Blog](https://blink.new/blog/claude-md-best-practices)
- [The 4 Lines Every CLAUDE.md Needs - Level Up Coding](https://levelup.gitconnected.com/the-4-lines-every-claude-md-needs-2717a46866f6)
- [Writing the Best CLAUDE.md - DataCamp](https://www.datacamp.com/tutorial/writing-the-best-claude-md)
