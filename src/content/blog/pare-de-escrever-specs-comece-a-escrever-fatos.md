---
title: "Pare de Escrever Specs. Comece a Escrever Fatos."
description: "Um teste escrito em junho de 2025 passou no CI sem modificação através do Sonnet 3.5, 3.7, 4 e Opus 4.5+. A spec de 1.500 palavras que descreve o mesmo endpoint precisou de quatro reinterpretações. O que isso diz sobre o futuro do Spec-Driven Development?"
date: 2026-06-05
tags: ["ia", "engenharia-agentiva", "testes", "arquitetura", "produtividade"]
---

# Pare de Escrever Specs. Comece a Escrever Fatos.

Em março de 2026, "Spec-Driven Development" atingiu pico 100 no Google Trends. Em maio, tinha caído para 52. Dois meses. Esse é o ciclo de vida de uma metodologia que chegou como salvação e começa a mostrar suas rachaduras.

O argumento de Jarosław Wasowski, que viralizou no Medium com quase 900 aplausos, é direto: um teste executável que ele escreveu em junho de 2025 passou no CI sem uma única modificação através do Sonnet 3.5, Sonnet 3.7, Sonnet 4 e Opus 4.5+. A spec de 1.500 palavras descrevendo o mesmo endpoint precisou de quatro reinterpretações.

Esse dado conta uma história sobre o que envelhece bem no desenvolvimento guiado por IA e o que não envelhece.

---

## O que é Spec-Driven Development e por que explodiu

Para entender o debate, é preciso entender o contexto. Em 2024 e 2025, o "vibe coding" tornou-se o termo dominante para uma prática crescente: descrever o que você quer em linguagem natural, deixar o agente construir, revisar, corrigir, iterar. Rápido e fluido.

O problema emergiu na escala. Projetos maiores, times múltiplos, codebases legados. O vibe coding funciona quando o contexto vive na sua cabeça. Quando são três devs usando agentes no mesmo repositório, sem estrutura compartilhada, o resultado é inconsistência: cada agente toma decisões diferentes sobre o mesmo problema.

O Spec-Driven Development surgiu como resposta. A ideia central: a especificação é a fonte da verdade. O código é um artefato gerado que implementa o spec. Se código e spec divergem, você corrige o código, não o spec.

O fluxo padrão é:

1. **Especificar** — você descreve o que está construindo, casos de uso, edge cases, critérios de aceitação
2. **Planejar** — o agente produz um plano de implementação baseado no spec e nas restrições técnicas
3. **Decompor** — o plano vira tarefas concretas e testáveis
4. **Implementar** — o agente trabalha nas tarefas usando o spec como âncora de contexto

Ferramentas como o GitHub Spec Kit (72 mil estrelas), o AWS Kiro e o BMAD rapidamente foram adotadas. O argumento parecia sólido: modelos de linguagem são bons em completar padrões, mas ruins em ler mentes. Quanto mais contexto e estrutura você fornece, melhor o output. Uma spec detalhada é contexto de alta qualidade.

Parecia perfeito. Então as rachaduras apareceram.

---

## O problema fundamental das specs

Uma spec é um documento em linguagem natural. E linguagem natural é ambígua por design.

Wasowski documentou o problema com precisão cirúrgica: a mesma spec que funcionava com o Sonnet 3.5 precisou ser reescrita quando o Sonnet 3.7 chegou, e de novo com o Sonnet 4. Cada nova versão do modelo interpretava as mesmas palavras de forma ligeiramente diferente. Frases como "siga os padrões existentes" ou "trate erros de forma robusta" não têm significado fixo. Elas são resolvidas pela interpretação do modelo no momento da execução.

Um teste, por outro lado, é executável. Ele não tem interpretação. Passa ou não passa. Essa propriedade — ser verificável de forma determinística — é exatamente o que faz testes sobreviverem à rotatividade de modelos.

Isso não é uma crítica ao SDD. É uma observação sobre o que persiste.

---

## A distinção que importa: declarativo vs. executável

O debate SDD vs. iteração está enquadrado errado. A distinção útil não é entre escrever specs ou não escrever specs. É entre artefatos declarativos e artefatos executáveis.

**Artefatos declarativos** descrevem a intenção em linguagem natural. Specs, PRDs, CLAUDE.md, design docs. São excelentes para comunicar contexto e intenção. Envelhecem quando os modelos mudam ou quando os requisitos evoluem.

**Artefatos executáveis** verificam comportamento de forma determinística. Testes unitários, testes de integração, contratos de API, schemas de banco. Não têm ambiguidade. Passam ou falham. Sobrevivem a mudanças de modelo porque não dependem de interpretação.

A tese de "comece a escrever fatos" é: priorize artefatos executáveis. Não porque specs são inúteis, mas porque fatos são mais duradouros.

Código que acompanha a intenção:

```java
// Spec (declarativa): "A criação de usuário deve validar email único"
// Fato (executável):
@Test
void deveLancarExcecaoParaEmailDuplicado() {
    userRepository.save(new User("daniel@email.com"));
    
    assertThatThrownBy(() -> userService.create("daniel@email.com", "senha"))
        .isInstanceOf(EmailAlreadyExistsException.class)
        .hasMessage("Email já cadastrado: daniel@email.com");
}
```

Esse teste não precisa de reinterpretação. Ele documenta o comportamento esperado de forma que qualquer modelo, qualquer desenvolvedor, e qualquer versão futura do sistema pode verificar.

---

## Quando specs ainda fazem sentido

Isso não é um argumento para abandonar documentação ou planejamento. É um argumento para saber o que você está produzindo e qual é seu prazo de validade.

**Specs fazem sentido quando:**

Você está trabalhando em um time e precisa de um artefato que comunique intenção para outros humanos. O agente não é o único leitor. Uma spec clara reduz reuniões e mal-entendidos.

Você está num projeto complexo com muitas partes interdependentes. Uma spec que define como dez componentes se relacionam previne decisões inconsistentes do agente em diferentes partes do sistema. Isso é especialmente valioso em codebases legados com padrões estabelecidos.

Você quer trabalhar de forma assíncrona. Se você escreve specs durante o dia e roda agentes à noite, ter contexto estruturado torna a execução mais confiável. O agente tem o que precisa sem poder fazer perguntas.

**Specs não fazem sentido quando:**

A tarefa é pequena e bem definida. Escrever uma spec para corrigir um bug é burocracia desnecessária.

Você está explorando. Se você ainda não sabe o que quer construir, escrever uma spec prematura gera trabalho que vai ser descartado.

O custo de uma primeira tentativa errada é baixo. Se você pode gerar, revisar e regenerar em 10 minutos, iterar é mais eficiente do que especificar.

---

## A hierarquia dos artefatos

Uma forma prática de pensar sobre isso:

```
Alta durabilidade / Alta confiabilidade
├── Testes automatizados (passa/falha, determinístico)
├── Schemas e contratos de API (tipados, verificáveis)
├── Migrations de banco (executáveis, versionadas)
│
Média durabilidade
├── CLAUDE.md / AGENTS.md (contexto estável, mas interpretado)
├── Arquitetura documentada (útil, mas se baseia em interpretação)
│
Baixa durabilidade
├── Specs de features em linguagem natural (ambíguas, envelhecem)
└── Comentários sobre intenção (úteis no curto prazo)
```

Quanto mais para cima nessa hierarquia, mais confiável o artefato ao longo do tempo. Quanto mais para baixo, mais útil para comunicação humana no curto prazo.

O que o debate SDD revela é que muita equipe está apostando alto em artefatos de baixa durabilidade e ficando surpresa quando eles precisam de manutenção constante.

---

## A abordagem pragmática

O que funciona na prática não é uma metodologia única. É a capacidade de escolher o artefato certo para o problema certo.

Para comunicar intenção ao time: escreva uma spec clara. Para comunicar comportamento ao agente de forma duradoura: escreva um teste.

O fluxo que combina os dois:

```
1. Escreva uma spec curta (1-2 páginas) para alinhar o time
2. Converta os critérios de aceitação em testes ANTES de implementar
3. Peça ao agente para implementar até os testes passarem
4. A spec pode evoluir; os testes são o contrato que permanece
```

Isso é essencialmente Test-Driven Development com um agente de IA no papel de implementador. O TDD sempre valorizou a escrita de testes antes do código pelos mesmos motivos: força clareza de intenção, cria documentação executável, e dá um critério objetivo de conclusão.

Com agentes de IA, esse critério objetivo importa ainda mais. Sem ele, "parece pronto" é o único sinal disponível.

---

## O que isso muda no dia a dia

Se você usa Claude Code ou qualquer agente de IA, algumas mudanças práticas emergem dessa perspectiva:

**Antes de uma feature, escreva os testes de aceitação.** Não a spec. Os testes. Eles forçam a mesma clareza de intenção que uma spec, mas produzem algo que você pode dar ao agente como critério de verificação.

**Use o CLAUDE.md para contexto estável, não para comportamento específico.** Padrões de arquitetura, convenções de código, comandos de build. Essas coisas mudam devagar. Comportamento específico de feature deve estar em testes, não em instruções em linguagem natural.

**Trate testes como a documentação principal.** Um teste bem escrito comunica intenção melhor que um comentário e melhor que uma spec. Ele também não envelhece da mesma forma.

**Itere specs rapidamente, mantenha testes rigorosamente.** Se você escreve uma spec e ela se mostrou errada, atualize e siga em frente. Mas se você escreve um teste e ele passa, proteja-o. Testes que passaram documentam comportamento validado.

---

## Armadilhas comuns

**Escrever specs longas para tarefas pequenas.** O overhead de produzir e manter uma spec de 1.500 palavras para um endpoint simples não se justifica. A regra prática: se você consegue descrever o comportamento esperado em 3-5 testes, não precisa de spec.

**Confundir spec com contrato.** Uma spec descreve intenção. Um teste verifica comportamento. São artefatos diferentes com funções diferentes. Usar spec como se fosse contrato é o que leva à frustração quando o agente "interpreta diferente".

**Abandonar specs completamente.** O SDD tem problemas reais, mas specs ainda têm valor para comunicação de time, onboarding, e decisões arquiteturais. O argumento não é "não escreva specs", é "entenda o que uma spec pode e não pode fazer".

**Não revisar o output do agente.** Specs ou fatos, você ainda precisa revisar o que o agente produz. Nenhum artefato de contexto garante conformidade. Ele melhora a taxa de acerto, não a elimina.

---

## Resumo

- O Spec-Driven Development surgiu como resposta ao vibe coding caótico e tem casos de uso legítimos
- O problema: specs em linguagem natural são ambíguas e precisam de reinterpretação quando modelos mudam
- Testes executáveis são mais duradouros porque não dependem de interpretação — passam ou falham
- A distinção útil não é "spec vs. não spec", mas "declarativo vs. executável"
- Use specs para comunicar intenção ao time; use testes para comunicar comportamento ao agente
- TDD com agente de IA como implementador é a abordagem que combina os dois

---

## Próximos passos

- [Stop Writing Specs. Start Writing Facts. — Jarosław Wasowski](https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26)
- [Spec-Driven Development 2026: AI or Waterfall? — Alex Cloudstar](https://www.alexcloudstar.com/blog/spec-driven-development-2026/)
- [How to Write a Good Spec for AI Agents — Addy Osmani](https://addyosmani.com/blog/good-spec/)
- [Structured-Prompt-Driven Development — Martin Fowler](https://martinfowler.com/articles/structured-prompt-driven/)

---

## Referências

- [Stop Writing Specs. Start Writing Facts. - Jarosław Wasowski, Medium](https://medium.com/@wasowski.jarek/stop-writing-specs-start-writing-facts-the-entire-sdd-movement-is-already-obsolete-9045f7061e26)
- [Spec-Driven Development 2026: AI or Waterfall? - Alex Cloudstar](https://www.alexcloudstar.com/blog/spec-driven-development-2026/)
- [Spec-Driven Development with AI Coding Agents - Medium/Predict](https://medium.com/predict/spec-driven-development-with-ai-coding-agents-the-definitive-guide-453fba1baf39)
- [Spec-Driven Development: From Code to Contract - arXiv](https://arxiv.org/abs/2602.00180)
- [How to Write a Good Spec for AI Agents - Addy Osmani](https://addyosmani.com/blog/good-spec/)
