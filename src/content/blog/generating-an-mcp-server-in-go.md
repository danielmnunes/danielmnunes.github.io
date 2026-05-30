---
title: "Gerando um servidor MCP em Go com Protobuf"
description: "Veja como a Oblique Security gerou um servidor MCP automaticamente a partir de definições Protobuf, mantendo descrições de ferramentas precisas e um loop de avaliação eficiente para depurar o comportamento dos agentes."
date: 2026-05-30
tags: ["go", "mcp", "protobuf", "grpc", "ai-agents", "llm"]
---

# Gerando um servidor MCP em Go com Protobuf

MCP (Model Context Protocol) virou pré-requisito para qualquer produto que queira ser acessível a agentes de IA. Mas implementar um servidor MCP manualmente levanta um problema clássico: como garantir que as descrições das ferramentas se mantêm precisas conforme a API evolui?

Este post explora a abordagem da [Oblique Security](https://oblique.security/blog/mcp/), que resolveu isso gerando o servidor MCP automaticamente a partir das definições Protobuf. Veremos o raciocínio por trás dessa decisão, os detalhes técnicos da implementação e como eles constroem um sistema de avaliação para depurar o comportamento dos agentes.

---

## Por que MCP e não outra coisa?

Existem muitas formas de expor capacidades a um agente: ferramentas de linha de comando, interfaces SQL, transpilação para TypeScript. Cada alternativa tem seus defensores.

Mas MCP tem uma vantagem que as outras não têm: é o denominador comum para agentes autônomos externos. Se você quer expor dados para o workflow de um cliente, precisa falar MCP. Plataformas como Claude Code e Codex Automations esperam essa interface.

O ponto central não é o protocolo em si. É o que qualquer protocolo exige: manter a documentação das interfaces atualizada. Para MCP, isso significa descrições de ferramentas e schemas de entrada precisos.

---

## O problema com documentação manual

A Oblique tem uma regra: tudo que o usuário pode fazer na UI deve ser possível via Terraform, REST e MCP. Eles já geram bindings a partir da interface gRPC, então a pergunta foi natural: por que não gerar o servidor MCP também?

A alternativa, escrever as descrições manualmente, cria drift. Um campo novo na API não atualiza automaticamente a descrição da ferramenta MCP. Um enum sem documentação confunde o modelo. Eles chegaram a ter um bug onde valores de enum estavam comentados, mas os valores em si não apareciam no schema gerado.

A solução: gerar tudo a partir do Protobuf.

---

## Como funciona a geração

### Do .proto ao tool definition

Um método gRPC como este:

```proto
service Oblique {
  // Fetch a user by name, or using the alias "users/me" to return the currently
  // authenticated user.
  rpc GetUser(GetUserRequest) returns (User) {
    option (google.api.http) = {get: "/api/v1/{name=users/*}"};
  }
}

message GetUserRequest {
  // Name of the user of the format "users/{id}". The alias "users/me" is also
  // supported and resolves to the currently authenticated user.
  string name = 1 [
    (google.api.field_behavior) = REQUIRED
  ];
}
```

Gera automaticamente um JSON de definição de ferramenta com nome, descrição, `inputSchema` e `outputSchema` completos, incluindo campos obrigatórios e descrições dos campos.

### O problema dos comentários

Comentários de código-fonte não sobrevivem à compilação do proto plugin do Go. Eles ficam disponíveis apenas no arquivo `.proto` original, não nos arquivos `.pb.go` gerados.

A solução é gerar um **descriptor file** (um arquivo binário que representa o proto compilado) e embutí-lo no servidor Go com `//go:embed`:

```go
//go:embed descriptor_set.binpb
var descriptor []byte

var descriptorFiles *protoregistry.Files

func init() {
    opts := protodesc.FileOptions{AllowUnresolvable: true}
    set := &descriptorpb.FileDescriptorSet{}
    if err := proto.Unmarshal(descriptor, set); err != nil {
        panic("parsing descriptor: " + err.Error())
    }
    files, err := opts.NewFiles(set)
    if err != nil {
        panic("resolving files: " + err.Error())
    }
    descriptorFiles = files
}
```

Com isso, o pacote `protodesc` permite acessar os comentários ao percorrer os descritores de mensagem. O pacote `protoreflect` faz a travessia dos campos.

### Criando a definição da ferramenta

O código de geração percorre os descritores de método e produz um `*mcp.Tool` para o Go MCP SDK:

```go
func newTool(md protoreflect.MethodDescriptor) (*mcp.Tool, error) {
    desc, err := descriptorFiles.FindDescriptorByName(fullName)
    // ...
    description := desc.ParentFile().SourceLocations().ByDescriptor(desc).LeadingComments

    isDestructive := strings.HasPrefix(string(md.Name()), "Delete")
    isReadOnly := false
    for _, p := range []string{"Get", "List", "BatchGet"} {
        if isReadOnly = strings.HasPrefix(string(md.Name()), p); isReadOnly {
            break
        }
    }

    return &mcp.Tool{
        Name:        string(md.Name()),
        Description: description,
        InputSchema: inputSchema,
        OutputSchema: outputSchema,
        Annotations: &mcp.ToolAnnotations{
            DestructiveHint: &isDestructive,
            ReadOnlyHint:    isReadOnly,
        },
    }, nil
}
```

Note como as anotações `ReadOnlyHint` e `DestructiveHint` são derivadas do próprio nome do método, sem necessidade de configuração manual.

---

## Filtrando o output para economizar tokens

A resposta completa da REST API de um usuário tem 185 tokens. A versão enviada pelo MCP tem 97. Metade.

Campos como `createTime`, `updateTime` e outros metadados raramente são relevantes para um agente. O gerador usa `protoreflect` para limpar esses campos antes de retornar a resposta. O resultado é uma resposta mais limpa, mais barata e que direciona melhor o modelo para o que importa.

Esse tipo de otimização faz diferença em chamadas longas onde múltiplas ferramentas são invocadas em sequência.

---

## Avaliando o comportamento do agente

A parte mais interessante do post é o sistema de avaliação que eles construíram para depurar problemas.

O report mais comum de bug era: *"o modelo está confuso com X."* Sem um sistema de avaliação, identificar a causa raiz é um trabalho lento e manual.

### Modo stdio para desenvolvimento

O servidor MCP roda em modo `stdio` durante os testes, o que permite invocar o Claude Code de forma programática:

```bash
claude -p "$PROMPT" \
    --mcp-config "$MCP_CONFIG" \
    --append-system-prompt-file "$SYSTEM_PROMPT" \
    --strict-mcp-config \
    --mcp-debug \
    --permission-mode dontAsk \
    --allowedTools mcp__oblique \
    --output-format stream-json
```

O formato `stream-json` do Claude Code emite eventos detalhados sobre o funcionamento interno: quais ferramentas foram selecionadas na busca semântica, quais chamadas de ferramenta foram feitas e com quais argumentos.

Isso permite ver se a descrição de uma ferramenta está atraindo os prompts certos:

```json
{
  "type": "user",
  "tool_use_result": {
    "matches": [
      "mcp__oblique__GetUser",
      "mcp__oblique__SearchUsers"
    ],
    "query": "select:mcp__oblique__GetUser,mcp__oblique__SearchUsers"
  }
}
```

### Sistema de evals automatizado

O script bash evoluiu para um programa Go de ~300 linhas que:

- Consome uma biblioteca de prompts
- Chama o Claude Code em paralelo para cada prompt
- Parseia o output com `json.Decoder` em modo streaming
- Produz um relatório por prompt com ferramentas carregadas, chamadas realizadas e erros

O resultado de um prompt bem-sucedido:

```yaml
- prompt: What teams am I on?
  tool_calls:
    - name: mcp__oblique__SearchTeamMembers
      input: '{"parent":"teams/-","filter":"member=\"users/me\""}'
    - name: mcp__oblique__BatchGetTeams
      input: '{"names":["teams/engineering","teams/puzzle-box"]}'
  tool_errors: []
  result: |-
    You're on 3 teams:
    - Engineering
    - Spanish conversation group
    - Puzzle Box
```

Quando chega um bug report, eles adicionam um prompt à biblioteca de evals e rodam o sistema. Em minutos conseguem ver onde o modelo está travando.

---

## Armadilhas comuns

**Comentários são a parte mais crítica.** Eles descobriram que descrições escritas por humanos superam qualquer coisa gerada automaticamente na capacidade de direcionar o modelo. Se o modelo consegue gerar um comentário, provavelmente já tem a informação de qualquer forma. O valor está em comentários que um desenvolvedor humano escreveria: contexto, intenção, exemplos de valores válidos.

**Enum sem valores documentados quebra.** Se você tem um campo enum, não basta comentar o campo. Os valores individuais precisam de descrição para o modelo saber o que usar.

**O schema de output importa tanto quanto o de input.** Definir `outputSchema` ajuda o modelo a interpretar a resposta corretamente e a construir chamadas de ferramentas em cadeia.

**Acoplamento REST-MCP tem prós e contras.** Manter os dois acoplados garante que mudanças na API chegam ao MCP, mas requer lógica condicional para campos que não fazem sentido no contexto de um agente.

---

## Resumo

- MCP se tornou o protocolo padrão para agentes externos; manter as descrições de ferramentas precisas é o desafio central
- Gerar o servidor MCP a partir do Protobuf elimina drift entre a API e as descrições das ferramentas
- Comentários Protobuf não estão disponíveis nos arquivos `.pb.go` gerados; a solução é embutir um descriptor file e usar `protodesc` + `protoreflect`
- Filtrar campos de output por relevância reduz o consumo de tokens e melhora o foco do modelo
- Um sistema de evals automatizado com Claude Code no modo `stream-json` é essencial para depurar comportamento de agentes em escala

---

## Próximos passos

- [Go MCP SDK](https://pkg.go.dev/github.com/modelcontextprotocol/go-sdk/mcp) - SDK oficial para Go
- [protoreflect](https://pkg.go.dev/google.golang.org/protobuf/reflect/protoreflect) - API de reflexão do Protobuf em Go
- [protodesc](https://pkg.go.dev/google.golang.org/protobuf/reflect/protodesc) - Conversão de FileDescriptorSet para tipos de reflexão
- [buf descriptors](https://buf.build/docs/reference/descriptors/) - Referência sobre descriptor files no ecossistema Buf
- [Claude Code headless mode](https://code.claude.com/docs/en/headless) - Documentação do modo programático do Claude Code

---

## Referências

- [Generating an MCP server in Go - Oblique Security](https://oblique.security/blog/mcp/)
- [Type-safe frontend APIs - Oblique Security](https://oblique.security/blog/type-safe-frontend-apis/)
- [Go MCP SDK - pkg.go.dev](https://pkg.go.dev/github.com/modelcontextprotocol/go-sdk/mcp)
- [protoreflect - pkg.go.dev](https://pkg.go.dev/google.golang.org/protobuf/reflect/protoreflect)
