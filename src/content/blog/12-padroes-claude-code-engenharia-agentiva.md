---
title: "12 Padrões que Engenheiros Agenticos Usam com o Claude Code"
description: "A diferença entre usar o Claude Code como um autocomplete avançado e usá-lo como um engenheiro autônomo está nesses 12 padrões. Do gerenciamento de contexto à paralelização de sessões."
date: 2026-02-05
tags: ["claude-code", "ia", "engenharia-agentiva", "produtividade", "boas-praticas"]
---

# 12 Padrões que Engenheiros Agenticos Usam com o Claude Code

Existe uma diferença fundamental entre usar o Claude Code como um autocomplete sofisticado e usá-lo como um engenheiro autônomo. A primeira abordagem produz ganhos incrementais de produtividade. A segunda muda a natureza do trabalho.

Engenharia agentica é o termo que surgiu em 2025 para descrever o modo de trabalho onde você define o que quer construir, e o agente descobre como construir. Você descreve objetivos, revisa resultados, e redireciona quando necessário. O agente explora, planeja e implementa.

Esta mudança tem uma curva de aprendizado. Não nos modelos, mas nos padrões de trabalho. O que funciona num chatbot não funciona num agente.

---

## Por que a maioria dos padrões resolve o mesmo problema

Antes de ver os padrões, entenda a restrição central do Claude Code:

> **A janela de contexto enche rápido e a performance degrada conforme ela enche.**

Toda sessão de debugging, toda exploração de codebase, todo arquivo lido consome tokens. Quando a janela fica cheia, o Claude começa a "esquecer" instruções anteriores e a cometer mais erros.

A maior parte dos 12 padrões a seguir existe para gerenciar essa restrição.

---

## Padrão 1: Explore primeiro, planeje depois, então codifique

Deixar o Claude pular direto para o código é o erro mais comum. O resultado é código que resolve o problema errado.

Use o modo de planejamento (`Shift+Tab` para alternar) para separar exploração de execução:

```
[Modo planejamento]
Leia src/auth/ e entenda como gerenciamos sessões.
Também veja como tratamos variáveis de ambiente para secrets.

[Ainda no modo planejamento]
Quero adicionar OAuth com Google. Quais arquivos precisam mudar?
Qual é o fluxo de sessão? Crie um plano.

[Fora do modo planejamento]
Implemente o fluxo OAuth do seu plano.
Escreva testes para o callback handler e rode a suite.
```

A exploração e o planejamento acontecem sem nenhuma modificação de arquivo. Você valida a direção antes de qualquer código ser escrito.

---

## Padrão 2: Dê ao Claude uma forma de verificar o próprio trabalho

Sem um critério de verificação, o Claude para quando o trabalho "parece pronto". Isso coloca você no loop de verificação: cada erro espera você notar.

Forneça algo que retorne uma aprovação ou falha:

```
Implemente a função validateEmail.
Casos de teste: user@example.com é true, "invalid" é false, "user@.com" é false.
Rode os testes após implementar e itere até todos passarem.
```

Isso serve para UI também:

```
[cole screenshot]
Implemente este design. Tire um screenshot do resultado
e compare com o original. Liste as diferenças e corrija.
```

O loop se fecha sozinho. Você pode monitorar ou sair e voltar.

---

## Padrão 3: Escreva um PRD antes de sessões longas

Para features complexas, um PRD (Documento de Requisitos de Produto) define o escopo antes de qualquer sessão começar. O Claude lê o PRD e sabe exatamente o que está dentro e fora do escopo.

Você pode deixar o próprio Claude criar o PRD por você:

```
Quero construir [descrição breve]. Me entreviste em detalhes.

Pergunte sobre implementação técnica, UX, edge cases e tradeoffs.
Não pergunte o óbvio, vá fundo nas partes difíceis que eu ainda não considerei.

Continue entrevistando até cobrirmos tudo, então escreva um spec completo em SPEC.md.
```

Depois que o spec está pronto, comece uma sessão nova para a implementação. Contexto limpo, focado exclusivamente na execução.

---

## Padrão 4: Use `/clear` entre tarefas não relacionadas

Uma sessão que começa com um bugfix, vai para uma review de código, depois refatora um módulo diferente acumula contexto irrelevante. O Claude começa a misturar informações de diferentes contextos.

`/clear` reseta a janela de contexto completamente. Use entre tarefas que não têm relação direta.

Se você corrigiu o mesmo problema mais de duas vezes na mesma sessão, o contexto está contaminado com abordagens fracassadas. `/clear` e recomece com um prompt melhor que incorpora o que você aprendeu.

---

## Padrão 5: Delegue investigações para subagentes

Quando o Claude investiga um codebase, ele lê muitos arquivos. Cada arquivo consome contexto da sua sessão principal. Subagentes resolvem isso: eles rodam em janelas de contexto separadas e reportam apenas os resultados.

```
Use subagentes para investigar como nosso sistema de autenticação 
trata renovação de tokens, e se temos algum utilitário OAuth que 
eu deveria reutilizar.
```

O subagente explora os arquivos, lê o que for necessário, e retorna um resumo. Sua sessão principal fica limpa para a implementação.

Use subagentes também para revisão:

```
Use um subagente para revisar este código em busca de edge cases
que eu possa ter perdido.
```

---

## Padrão 6: Crie comandos para workflows repetidos

Se você digita o mesmo prompt duas vezes, ele deveria ser um comando. Comandos são arquivos markdown em `.claude/commands/` que definem workflows reutilizáveis.

```markdown
# .claude/commands/review-pr.md
Revise o PR atual:
1. Liste todos os arquivos modificados
2. Para cada arquivo, identifique: bugs potenciais, edge cases não tratados, violações de convenção
3. Verifique se há testes para as mudanças críticas
4. Retorne um relatório organizado por severidade: crítico, importante, sugestão
```

Digitar `/review-pr` executa esse workflow sem reescrever o prompt. Comandos são versionados junto com o projeto.

---

## Padrão 7: Defina subagentes especializados

Para tarefas que exigem foco específico, subagentes especializados funcionam melhor do que o agente principal sobrecarregado com contexto diverso.

```markdown
# .claude/agents/security-reviewer.md
---
name: security-reviewer
description: Revisa código em busca de vulnerabilidades de segurança
tools: Read, Grep, Glob, Bash
model: opus
---
Você é um engenheiro de segurança sênior. Revise código em busca de:
- Injeção de SQL, XSS, injeção de comandos
- Falhas de autenticação e autorização
- Credenciais ou secrets hardcoded
- Manipulação insegura de dados

Forneça referências de linha específicas e sugestões de correção.
```

```
Use o subagente security-reviewer para revisar o módulo de pagamento
antes de fazer o merge.
```

---

## Padrão 8: Configure o CLAUDE.md como código

O `CLAUDE.md` não é documentação. É configuração. Trate-o como tal.

Revise quando algo der errado. Pode: quando o Claude deixar de seguir uma regra, o arquivo provavelmente está muito longo ou a regra está mal escrita.

Regras eficazes:
- São específicas: "NUNCA execute `npm run build`" em vez de "cuidado com builds"
- Têm razão: "NUNCA faça commit direto em main — o CI valida em branches"
- São acionáveis: se a regra não causa um comportamento específico, delete-a

Mantenha abaixo de 200 linhas. Acima disso, o agente começa a ignorar partes.

---

## Padrão 9: Use checkpoints para experimentos arriscados

O Claude faz um snapshot dos arquivos antes de cada mudança. Se algo der errado, você pode restaurar.

Isso muda a forma de trabalhar: em vez de planejar cada passo com cuidado, você pode dizer ao Claude para tentar algo arriscado. Se não funcionar, `Esc + Esc` ou `/rewind` para abrir o menu de checkpoints e restaurar.

Checkpoints persistem entre sessões. Você pode fechar o terminal e ainda fazer rewind depois.

---

## Padrão 10: Sessões paralelas para velocidade e qualidade

Você pode rodar múltiplas sessões do Claude Code em paralelo usando worktrees do git, cada uma em seu próprio checkout isolado.

O padrão mais útil é Writer/Reviewer:

**Sessão A (escrita):**
```
Implemente um rate limiter para os endpoints da nossa API
```

**Sessão B (revisão):**
```
Revise a implementação do rate limiter em @src/middleware/rateLimiter.ts.
Procure por edge cases, race conditions e consistência com os 
outros middlewares existentes.
```

**Sessão A (correção):**
```
Aqui está o feedback da revisão: [output da Sessão B].
Endereça esses problemas.
```

O revisor roda em contexto fresco, sem viés pela implementação que acabou de escrever.

---

## Padrão 11: Modo não-interativo para automação

Com `claude -p "prompt"` você roda o Claude sem sessão interativa. Isso permite integrar em pipelines de CI, pre-commit hooks, ou qualquer automação:

```bash
# Verificar se há problemas de segurança antes do commit
claude -p "Analise os arquivos modificados e liste qualquer issue de segurança" \
  --output-format json

# Migrar múltiplos arquivos em paralelo
for file in $(cat migration-list.txt); do
  claude -p "Migre $file de REST para gRPC. Retorne OK ou FAIL." \
    --allowedTools "Edit,Bash(git commit *)" &
done
wait
```

Use `--allowedTools` para restringir o que o Claude pode fazer em execuções autônomas.

---

## Padrão 12: Revise o diff antes de considerar pronto

Antes de fechar uma sessão longa ou dar o trabalho como concluído, use um subagente para revisar o diff contra os critérios da tarefa:

```
Use um subagente para revisar o diff atual contra SPEC.md.
Verifique se cada requisito está implementado, se os edge cases 
mencionados têm testes, e se nada fora do escopo foi modificado.
Reporte lacunas, não preferências de estilo.
```

O revisor roda com contexto limpo, avalia apenas o resultado, sem o raciocínio que produziu a mudança. Lacunas que o autor não vê ficam visíveis.

---

## O fluxo completo de uma feature

Juntando os padrões:

```
1. [SPEC.md] Entreviste o Claude para criar o spec da feature

2. [Nova sessão, contexto limpo]
   [Modo planejamento] Explore os arquivos relevantes
   [Modo planejamento] Crie o plano de implementação

3. [Fora do modo planejamento]
   Implemente o plano. Rode os testes. Itere.

4. [Subagente] Revise o diff contra o spec

5. [Sessão B paralela] Review independente do código

6. Faça o commit e abra o PR
```

Cada etapa tem contexto apropriado. A exploração não contamina a implementação. A revisão não tem viés da escrita.

---

## Armadilhas comuns

**A sessão kitchen sink.** Você começa com uma tarefa, adiciona outra não relacionada, vai e volta. O contexto vira uma mistura de informação irrelevante. Use `/clear` entre tarefas distintas.

**Corrigir repetidamente.** Corrigir o mesmo problema mais de duas vezes é sinal de contexto contaminado. Pare, `/clear`, recomece com um prompt melhor.

**CLAUDE.md longo demais.** Regras importantes se perdem. Pode impiedosamente: se o Claude já faz algo sem a instrução, delete-a.

**Exploração infinita.** Pedir ao Claude para "investigar" sem escopo resulta em centenas de arquivos lidos e contexto esgotado. Escope as investigações ou use subagentes.

---

## Resumo

- O contexto é o recurso mais importante. Gerencie-o ativamente
- Explore e planeje antes de implementar — separe as fases
- Dê ao Claude critérios de verificação que ele pode executar sozinho
- Use subagentes para investigação e revisão — mantêm o contexto principal limpo
- Comandos e subagentes especializados tornam workflows repetidos reutilizáveis
- Sessões paralelas multiplicam saída e melhoram qualidade com revisão independente
- `/clear` entre tarefas não relacionadas é um hábito, não uma medida de emergência

---

## Próximos passos

- [Best practices for Claude Code — Documentação oficial](https://code.claude.com/docs/en/best-practices)
- [How Claude Code works — Documentação oficial](https://code.claude.com/docs/en/how-claude-code-works)
- [Claude Code Best Practices: 5 Agentic Engineering Techniques — ClaudeFast](https://claudefa.st/blog/guide/development/agentic-engineering-best-practices)

---

## Referências

- [Claude Code Best Practices: 12 Patterns Agentic Engineers Use - Level Up Coding](https://levelup.gitconnected.com/claude-code-best-practices-12-patterns-agentic-engineers-use-65264e3eb919)
- [Best practices for Claude Code - Anthropic](https://code.claude.com/docs/en/best-practices)
- [Claude Code Best Practices for Agentic Coding - ThoughtMinds](https://thoughtminds.ai/blog/claude-code-best-practices-for-agentic-coding-in-modern-software-development)
- [Agentic Engineering Best Practices - ClaudeFast](https://claudefa.st/blog/guide/development/agentic-engineering-best-practices)
