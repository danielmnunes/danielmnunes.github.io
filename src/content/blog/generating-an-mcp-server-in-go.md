---
title: "Introdução ao MCP em Go: construindo seu primeiro servidor"
description: "Aprenda o que é o Model Context Protocol, como ele funciona e como criar um servidor MCP em Go com o SDK oficial, expondo tools, resources e prompts para agentes de IA."
date: 2026-06-05
tags: ["go", "mcp", "ai-agents", "llm", "tutorial"]
---

# Introdução ao MCP em Go: construindo seu primeiro servidor

Agentes de IA precisam de contexto. Precisam consultar APIs, ler arquivos, executar buscas, chamar bancos de dados. O problema é que cada integração era feita de forma ad hoc: um plugin para cá, um wrapper para lá, sem padronização alguma.

O **Model Context Protocol (MCP)** surgiu para resolver isso. É um protocolo aberto, criado pela Anthropic, que define como aplicações de IA se comunicam com servidores que expõem capacidades externas. Pense nele como uma "porta USB" para agentes: qualquer ferramenta que implemente o protocolo funciona com qualquer cliente compatível.

Neste post, você vai entender o que é o MCP, como ele funciona por baixo e como criar um servidor funcional em Go usando o SDK oficial.

## O que é MCP, afinal?

MCP define uma interface padronizada entre três atores:

- **Host**: a aplicação que usa um LLM (Claude Desktop, Cursor, sua própria app)
- **Client**: o componente dentro do host que fala MCP
- **Server**: um processo separado que expõe capacidades ao client

O servidor MCP não é o LLM. Ele é o processo que você escreve para expor suas ferramentas. O LLM, via client, descobre o que o servidor oferece e decide quando e como usar.

A comunicação usa JSON-RPC 2.0. O transporte padrão local é `stdio` (stdin/stdout). Para uso remoto, existe o transporte HTTP com Server-Sent Events (SSE) e o mais recente Streamable HTTP.

## Os três primitivos do MCP

Todo servidor MCP pode expor três tipos de capacidades:

**Tools** são funções que o agente pode chamar. Recebem argumentos, executam lógica e retornam um resultado. São o equivalente a "ações": buscar clima, criar um arquivo, consultar um banco.

**Resources** são dados identificados por URI que o agente pode ler. Pense em arquivos, registros de banco, resultados de API. O agente lê, não modifica.

**Prompts** são templates de mensagem que o servidor disponibiliza. Permitem padronizar como o agente deve formular certas perguntas ou instruções.

Na prática, a maioria dos servidores MCP começa expondo apenas tools. Resources e prompts são úteis em cenários mais avançados.

## Instalando o SDK oficial de Go

O SDK oficial é mantido pela Anthropic em colaboração com o Google:

```bash
go get github.com/modelcontextprotocol/go-sdk
```

Com o módulo instalado, você já tem tudo para criar servidor e cliente.

## Criando um servidor MCP simples

Vamos criar um servidor que expõe uma única tool: cumprimentar alguém pelo nome.

```go
package main

import (
    "context"
    "log"

    "github.com/modelcontextprotocol/go-sdk/mcp"
)

// Input define os argumentos da tool.
// A tag jsonschema vira a descrição no schema gerado automaticamente.
type Input struct {
    Name string `json:"name" jsonschema:"o nome da pessoa a cumprimentar"`
}

// Output define o retorno estruturado da tool.
type Output struct {
    Greeting string `json:"greeting" jsonschema:"a saudação gerada"`
}

// SayHi é o handler da tool. Recebe o contexto, a requisição e o input tipado.
func SayHi(ctx context.Context, req *mcp.CallToolRequest, input Input) (
    *mcp.CallToolResult,
    Output,
    error,
) {
    return nil, Output{Greeting: "Olá, " + input.Name + "!"}, nil
}

func main() {
    // Cria o servidor com nome e versão
    server := mcp.NewServer(&mcp.Implementation{
        Name:    "greeter",
        Version: "v1.0.0",
    }, nil)

    // Registra a tool "greet" com seu handler
    mcp.AddTool(server, &mcp.Tool{
        Name:        "greet",
        Description: "Cumprimenta uma pessoa pelo nome",
    }, SayHi)

    // Sobe o servidor via stdio — o cliente fala pelo stdin/stdout
    if err := server.Run(context.Background(), &mcp.StdioTransport{}); err != nil {
        log.Fatal(err)
    }
}
```

Três coisas acontecem aqui que valem destaque:

O `mcp.AddTool` usa generics para inferir automaticamente o JSON Schema dos tipos `Input` e `Output`. Você não precisa escrever o schema na mão: as struct tags `jsonschema` viram as descrições dos campos.

O handler recebe um `Input` já desserializado e validado. O SDK cuida de extrair os argumentos JSON da requisição, validar contra o schema e passar o struct pronto para você.

O transporte `stdio` significa que esse servidor roda como um processo filho. O cliente o inicia, se comunica pelo stdin/stdout e termina quando o client desconecta.

## Como o cliente se conecta

Para testar o servidor programaticamente, você pode criar um cliente em Go:

```go
package main

import (
    "context"
    "log"
    "os/exec"

    "github.com/modelcontextprotocol/go-sdk/mcp"
)

func main() {
    ctx := context.Background()

    client := mcp.NewClient(&mcp.Implementation{
        Name:    "mcp-client",
        Version: "v1.0.0",
    }, nil)

    // Conecta ao servidor iniciando o binário como subprocesso
    transport := &mcp.CommandTransport{
        Command: exec.Command("./greeter"),
    }

    session, err := client.Connect(ctx, transport, nil)
    if err != nil {
        log.Fatal(err)
    }
    defer session.Close()

    // Chama a tool "greet"
    res, err := session.CallTool(ctx, &mcp.CallToolParams{
        Name:      "greet",
        Arguments: map[string]any{"name": "Daniel"},
    })
    if err != nil {
        log.Fatalf("CallTool falhou: %v", err)
    }

    for _, c := range res.Content {
        log.Print(c.(*mcp.TextContent).Text)
    }
}
```

O fluxo é simples: crie um `Client`, conecte usando um transporte e chame ferramentas com `CallTool`. O `CommandTransport` inicia o servidor como subprocesso e gerencia o ciclo de vida automaticamente.

## Expondo Resources

Resources são dados identificados por URI. O padrão é que o agente possa listá-los e lê-los:

```go
resources := map[string]string{
    "file:///config.yaml": "timeout: 30\nretries: 3",
    "file:///readme.md":   "# Meu projeto\nDescrição aqui.",
}

handler := func(ctx context.Context, req *mcp.ReadResourceRequest) (*mcp.ReadResourceResult, error) {
    uri := req.Params.URI
    content, ok := resources[uri]
    if !ok {
        return nil, mcp.ResourceNotFoundError(uri)
    }
    return &mcp.ReadResourceResult{
        Contents: []*mcp.ResourceContents{{URI: uri, Text: content}},
    }, nil
}

server.AddResource(&mcp.Resource{URI: "file:///config.yaml"}, handler)
server.AddResource(&mcp.Resource{URI: "file:///readme.md"}, handler)
```

Você também pode registrar **resource templates** com padrões de URI para cobrir coleções inteiras. O template `file:///docs/{filename}` serviria qualquer arquivo dentro de `docs/`, por exemplo.

## Expondo Prompts

Prompts são templates que o cliente pode listar e expandir com argumentos:

```go
promptHandler := func(ctx context.Context, req *mcp.GetPromptRequest) (*mcp.GetPromptResult, error) {
    nome := req.Params.Arguments["nome"]
    return &mcp.GetPromptResult{
        Description: "Template de revisão de código",
        Messages: []*mcp.PromptMessage{
            {
                Role: "user",
                Content: &mcp.TextContent{
                    Text: "Revise o seguinte código de " + nome + " e aponte problemas de legibilidade:",
                },
            },
        },
    }, nil
}

server.AddPrompt(&mcp.Prompt{
    Name: "code-review",
    Arguments: []*mcp.PromptArgument{
        {Name: "nome", Description: "nome do autor do código", Required: true},
    },
}, promptHandler)
```

## Usando com Claude Desktop ou Cursor

Para conectar seu servidor a um host como o Claude Desktop, adicione ao arquivo `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "greeter": {
      "command": "/caminho/para/greeter"
    }
  }
}
```

O host inicia o processo, descobre as tools via handshake MCP e as disponibiliza ao LLM. A partir daí, quando você perguntar algo que exija cumprimentar alguém, o modelo saberá que tem a tool `greet` disponível.

## Armadilhas comuns

**Descrições ruins quebram a descoberta.** O LLM usa a `Description` da tool para decidir quando chamá-la. Uma descrição vaga como "executa ação" é inútil. Escreva o que a tool faz, em que contexto usar e o que ela retorna.

**Retornar erros dentro do resultado, não fora.** Em MCP, a distinção é importante: um erro Go (`error`) indica falha de protocolo. Um erro de negócio (arquivo não encontrado, permissão negada) deve ser retornado via `IsError: true` no `CallToolResult`. O SDK cuida disso automaticamente quando você retorna um `error` do handler.

**Não confundir servidor MCP com o LLM.** O servidor MCP é um processo comum em Go. Ele não tem inteligência. Ele apenas expõe capacidades que o LLM decide quando usar.

**Stdio bloqueia até o cliente desconectar.** O `server.Run` com `StdioTransport` bloqueia a goroutine principal. Para servidores que precisam fazer outras coisas, use goroutines separadas.

## Resumo

- MCP é um protocolo aberto para conectar LLMs a ferramentas e dados externos de forma padronizada
- Um servidor MCP expõe três primitivos: tools (ações), resources (dados) e prompts (templates)
- O SDK oficial de Go (`github.com/modelcontextprotocol/go-sdk`) infere schemas JSON a partir de structs Go usando generics e struct tags
- O transporte `stdio` é o mais simples para uso local; para uso remoto existe HTTP/SSE
- Descrições de tools bem escritas são essenciais para que o LLM saiba quando e como usá-las

## Próximos passos

- [Go MCP SDK - Quick Start](https://go.sdk.modelcontextprotocol.io/quick_start/) - documentação oficial
- [Referência do pacote mcp](https://pkg.go.dev/github.com/modelcontextprotocol/go-sdk/mcp) - API completa
- [Exemplos do repositório oficial](https://github.com/modelcontextprotocol/go-sdk/tree/main/examples) - servidores e clientes de exemplo
- [Especificação MCP](https://modelcontextprotocol.io/specification/2025-06-18) - detalhes do protocolo
- [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) - ferramenta para inspecionar e debugar servidores MCP

## Referências

- [Go MCP SDK - Official Repository](https://github.com/modelcontextprotocol/go-sdk)
- [Go MCP SDK - Quick Start](https://go.sdk.modelcontextprotocol.io/quick_start/)
- [Go MCP SDK - Server Features](https://go.sdk.modelcontextprotocol.io/server/)
- [Building a Model Context Protocol Server in Go - Navendu Pottekkat](https://navendu.me/posts/mcp-server-go/)
- [Model Context Protocol - Introduction](https://modelcontextprotocol.io/introduction)
