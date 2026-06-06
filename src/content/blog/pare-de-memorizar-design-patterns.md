---
title: "Pare de Memorizar Design Patterns: Use Esta Árvore de Decisão"
description: "Você não precisa decorar os 23 padrões GoF. Aprenda a identificar o problema certo e escolher o padrão certo com uma árvore de decisão prática, com exemplos em Java."
date: 2026-04-08
tags: ["design-patterns", "java", "arquitetura", "boas-praticas"]
---

# Pare de Memorizar Design Patterns: Use Esta Árvore de Decisão

Você já tentou estudar os 23 padrões do GoF de uma vez? Singleton, Factory, Builder, Adapter, Decorator, Observer, Strategy... a lista não termina. E no dia seguinte, na frente de um problema real, a pergunta continua a mesma: "qual padrão eu uso aqui?"

O problema não é falta de memória. É que decorar padrões sem entender o diagnóstico que os precede não funciona. Padrões são soluções para problemas específicos. Se você aprende a identificar o problema, o padrão emerge naturalmente.

Neste post, você vai aprender a pensar sobre design patterns como um médico pensa sobre diagnósticos: primeiro o sintoma, depois o tratamento.

---

## A pergunta que você deve fazer primeiro

Antes de pensar em qualquer padrão, faça esta pergunta:

> **Onde está a dificuldade? Na criação de objetos, na composição de objetos, ou na comunicação entre eles?**

Essa divisão não é arbitrária. É exatamente a taxonomia que o GoF usou para organizar os 23 padrões em três categorias: **Criacional**, **Estrutural** e **Comportamental**.

Cada categoria resolve uma fonte diferente de complexidade.

---

## Categoria 1: Criacional — o problema está na criação

Use padrões criacionais quando a lógica de criação de objetos vaza para o código de negócio.

**Sintomas:**
- Construtores com 8+ parâmetros
- `if/else` para decidir qual classe instanciar
- Código de negócio que conhece detalhes de inicialização
- Dificuldade em trocar implementações em testes

**Os padrões:**

| Padrão | Use quando... |
|--------|---------------|
| **Factory Method** | Subclasses devem decidir qual objeto criar |
| **Abstract Factory** | Precisa criar famílias de objetos relacionados |
| **Builder** | Criação envolve muitas etapas ou configurações opcionais |
| **Prototype** | Clonar um objeto existente é mais simples do que criar do zero |
| **Singleton** | Exatamente uma instância deve existir no sistema |

**Exemplo prático — antes:**

```java
// O problema: a lógica de criação vaza para o serviço
public class NotificationService {
    public void send(String type, String message) {
        if (type.equals("EMAIL")) {
            EmailClient client = new EmailClient("smtp.server.com", 587, true);
            client.connect();
            client.send(message);
        } else if (type.equals("SMS")) {
            SmsClient client = new SmsClient(System.getenv("SMS_API_KEY"));
            client.authenticate();
            client.send(message);
        }
    }
}
```

**Depois, com Factory Method:**

```java
// Cada subclasse sabe como criar o sender correto
public abstract class NotificationFactory {
    public abstract NotificationSender createSender();

    public void send(String message) {
        NotificationSender sender = createSender();
        sender.send(message);
    }
}

public class EmailNotificationFactory extends NotificationFactory {
    @Override
    public NotificationSender createSender() {
        return new EmailSender("smtp.server.com", 587);
    }
}

public class SmsNotificationFactory extends NotificationFactory {
    @Override
    public NotificationSender createSender() {
        return new SmsSender(System.getenv("SMS_API_KEY"));
    }
}
```

A lógica de criação ficou isolada em cada factory. O `NotificationService` não sabe mais como os senders são construídos.

---

## Categoria 2: Estrutural — o problema está na composição

Use padrões estruturais quando componentes não se encaixam, ou quando você precisa adicionar comportamento sem modificar classes existentes.

**Sintomas:**
- Interfaces incompatíveis entre dois sistemas
- Comportamento que precisa ser adicionado dinamicamente
- Hierarquias de herança que crescem sem controle
- Subsistemas complexos que precisam ser simplificados

**Os padrões:**

| Padrão | Use quando... |
|--------|---------------|
| **Adapter** | Precisa fazer duas interfaces incompatíveis conversarem |
| **Decorator** | Quer adicionar comportamento sem subclasses |
| **Facade** | Quer simplificar um subsistema complexo |
| **Proxy** | Precisa controlar acesso a um objeto |
| **Composite** | Trata objetos simples e compostos de forma uniforme |
| **Bridge** | Quer separar abstração de implementação |
| **Flyweight** | Precisa compartilhar estado entre muitos objetos pequenos |

**Exemplo prático — Decorator:**

Você tem um `OrderService` e precisa adicionar logging e cache, sem alterar o código original:

```java
// Interface original
public interface OrderService {
    Order findById(Long id);
}

// Implementação base
public class OrderServiceImpl implements OrderService {
    @Override
    public Order findById(Long id) {
        return repository.findById(id).orElseThrow();
    }
}

// Decorator de cache
public class CachingOrderService implements OrderService {
    private final OrderService delegate;
    private final Cache<Long, Order> cache;

    public CachingOrderService(OrderService delegate, Cache<Long, Order> cache) {
        this.delegate = delegate;
        this.cache = cache;
    }

    @Override
    public Order findById(Long id) {
        return cache.computeIfAbsent(id, delegate::findById);
    }
}

// Decorator de logging
public class LoggingOrderService implements OrderService {
    private final OrderService delegate;
    private final Logger log = LoggerFactory.getLogger(getClass());

    public LoggingOrderService(OrderService delegate) {
        this.delegate = delegate;
    }

    @Override
    public Order findById(Long id) {
        log.info("Buscando pedido {}", id);
        Order order = delegate.findById(id);
        log.info("Pedido {} encontrado", id);
        return order;
    }
}

// Composição na configuração
OrderService service = new LoggingOrderService(
    new CachingOrderService(
        new OrderServiceImpl(repository),
        caffeine
    )
);
```

Cada decorator faz uma coisa. Você pode combinar na ordem que quiser.

---

## Categoria 3: Comportamental — o problema está na comunicação

Use padrões comportamentais quando a lógica de coordenação entre objetos fica acoplada demais, ou quando algoritmos precisam variar independentemente de quem os usa.

**Sintomas:**
- `switch/case` que precisa crescer com o tempo
- Objetos que precisam reagir a mudanças uns nos outros
- Algoritmos que precisam ser trocados em tempo de execução
- Encadeamento de responsabilidades sem acoplamento rígido

**Os padrões mais usados:**

| Padrão | Use quando... |
|--------|---------------|
| **Strategy** | O algoritmo deve ser trocável sem mudar o cliente |
| **Observer** | Mudanças em um objeto devem notificar outros automaticamente |
| **State** | O comportamento muda conforme o estado interno |
| **Command** | Quer encapsular requisições como objetos |
| **Chain of Responsibility** | Uma requisição passa por uma cadeia de handlers |
| **Template Method** | O esqueleto do algoritmo é fixo, mas etapas variam |

**Exemplo prático — Strategy:**

Cálculo de desconto que varia conforme o tipo de cliente:

```java
// Estratégia
public interface DiscountStrategy {
    BigDecimal calculate(Order order);
}

// Implementações
public class RegularDiscountStrategy implements DiscountStrategy {
    @Override
    public BigDecimal calculate(Order order) {
        return order.getTotal().multiply(BigDecimal.valueOf(0.05));
    }
}

public class PremiumDiscountStrategy implements DiscountStrategy {
    @Override
    public BigDecimal calculate(Order order) {
        return order.getTotal().multiply(BigDecimal.valueOf(0.15));
    }
}

// Cliente não sabe qual estratégia usa
public class OrderPricingService {
    private final DiscountStrategy discountStrategy;

    public OrderPricingService(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public BigDecimal finalPrice(Order order) {
        BigDecimal discount = discountStrategy.calculate(order);
        return order.getTotal().subtract(discount);
    }
}
```

Para adicionar um novo tipo de desconto, você cria uma nova classe, sem tocar no `OrderPricingService`.

---

## A árvore de decisão completa

```
Qual é o problema?
│
├── Criação de objetos é complexa ou vaza para o negócio?
│   ├── Uma única instância no sistema → Singleton
│   ├── Subclasses decidem o que criar → Factory Method
│   ├── Famílias de objetos relacionados → Abstract Factory
│   ├── Muitas etapas ou configurações → Builder
│   └── Clonar é mais fácil que criar → Prototype
│
├── Composição ou estrutura não se encaixa?
│   ├── Interfaces incompatíveis → Adapter
│   ├── Adicionar comportamento dinamicamente → Decorator
│   ├── Simplificar subsistema complexo → Facade
│   ├── Controlar acesso a um objeto → Proxy
│   ├── Tratar partes e todos uniformemente → Composite
│   └── Separar abstração de implementação → Bridge
│
└── Comunicação ou algoritmo precisa variar?
    ├── Algoritmo trocável em tempo de execução → Strategy
    ├── Notificar objetos sobre mudanças → Observer
    ├── Comportamento muda com estado interno → State
    ├── Encapsular requisições → Command
    ├── Encadear handlers → Chain of Responsibility
    └── Esqueleto fixo, etapas variáveis → Template Method
```

---

## Armadilhas comuns

**Forçar um padrão onde não há problema.** Não crie uma factory para um objeto que nunca vai variar. Complexidade desnecessária é o maior antipadrão.

**Usar Singleton para tudo.** Singleton resolve o problema de uma instância única, não o de acesso global. Use injeção de dependência em vez de `getInstance()` espalhado pelo código.

**Confundir Decorator com herança.** Decorator adiciona comportamento por composição. Se você está criando `EmailServiceWithLogging extends EmailService`, provavelmente está no caminho errado.

**Aplicar Strategy quando if/else é suficiente.** Se você tem dois casos que nunca vão crescer, um `if` é mais claro. Strategy vale quando a lista de casos tende a crescer.

---

## Resumo

- Antes de escolher um padrão, identifique a categoria do problema: criação, composição ou comunicação
- Padrões criacionais isolam como objetos são criados
- Padrões estruturais organizam como objetos se relacionam
- Padrões comportamentais definem como objetos se comunicam
- Use a árvore de decisão como guia, não como lei. Contexto importa mais do que regra

---

## Próximos passos

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612) — o livro original do GoF
- [Refactoring.Guru](https://refactoring.guru/design-patterns) — catálogo visual com exemplos em múltiplas linguagens
- [Head First Design Patterns](https://www.oreilly.com/library/view/head-first-design/9781492077992/) — abordagem mais acessível para quem está começando

---

## Referências

- [Design Patterns Cheat Sheet - GeeksforGeeks](https://www.geeksforgeeks.org/system-design/design-patterns-cheat-sheet-when-to-use-which-design-pattern/)
- [Creational vs Structural vs Behavioral Design Patterns - GoFPattern](https://www.gofpattern.com/design-patterns/module2/three-types-design-patterns.php)
- [Behavioral vs Structural vs Creational: When to Use Each - MomentsLog](https://www.momentslog.com/development/design-pattern/behavioral-vs-structural-vs-creational-design-patterns-when-to-use-each)
