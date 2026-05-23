---
title: "Factory Method em Java Moderno: do Java 17 ao 25"
description: "Aprenda o padrão Factory Method do zero e veja como as features mais recentes do Java (sealed classes, records, pattern matching, switch expressions) tornam a implementação mais elegante e segura em tempo de compilação."
date: 2026-05-23
tags: ["java", "design-patterns", "java21", "java25", "sealed-classes", "records"]
---

# Factory Method em Java Moderno: do Java 17 ao 25

Você já se pegou escrevendo um `if/else` gigante dentro de um método de criação de objetos? Algo como: "se for esse tipo, cria esse objeto; se for aquele, cria aquele outro"? Esse é exatamente o problema que o padrão Factory Method resolve, e nos últimos anos o Java ganhou ferramentas que tornam essa solução ainda mais expressiva.

Neste post, você vai aprender o padrão Factory Method do zero e ver como aplicá-lo usando as features mais modernas do Java, de sealed classes e records (Java 17+) até pattern matching for switch e primitive patterns (Java 21/25).

---

## O problema: o `new` espalhado pelo código

Imagine que você está construindo um sistema de logística. No início, só há transporte por caminhão. Fácil:

```java
// Java "clássico" - o problema
public class LogisticsService {
    public void planDelivery(String type) {
        if (type.equals("TRUCK")) {
            Truck truck = new Truck();
            truck.deliver();
        } else if (type.equals("SHIP")) {
            Ship ship = new Ship();
            ship.deliver();
        }
        // E quando vier DRONE? Mais um else if...
    }
}
```

Parece inofensivo, mas esse código tem um problema sério: ele viola o **Princípio Aberto/Fechado**. Toda vez que um novo modal de transporte surgir, você precisa abrir essa classe e alterar o `if/else`. Em sistemas maiores, esses `new Truck()` e `new Ship()` aparecem em dezenas de lugares diferentes.

O Factory Method propõe uma saída elegante: **delegue a criação do objeto para um método especializado**, e permita que subclasses decidam qual objeto concreto criar.

---

## A solução: o padrão Factory Method

A ideia central é simples. Em vez de chamar `new` diretamente, você chama um método de fábrica que encapsula essa decisão:

```
Creator
  └── createTransport()     ← factory method (abstrato ou com default)
  └── planDelivery()        ← usa o objeto criado pelo factory method

ConcreteCreator
  └── createTransport()     ← decide QUAL objeto concreto criar
```

A classe base define o "esqueleto" do algoritmo. As subclasses preenchem a lacuna de criação. O código cliente nunca precisa saber qual implementação concreta está rodando, pois só enxerga a interface.

---

## Modelando o domínio com Java moderno

Antes de implementar o padrão em si, vamos usar algumas features modernas para definir nosso domínio de forma mais segura e expressiva.

### Sealed interface + records (Java 17)

`sealed interface` permite declarar explicitamente quais tipos podem implementar uma interface. Isso dá ao compilador a capacidade de verificar exaustividade nos pattern matchings. Já `record` elimina o boilerplate de classes de dados imutáveis.

```java
// Resultado de uma entrega: imutável e sem boilerplate
public record DeliveryResult(
    String trackingCode,
    String carrier,
    int estimatedDays
) {}

// Sealed interface: o compilador sabe TODOS os transportes possíveis
public sealed interface Transport
        permits Truck, Ship, Drone {

    DeliveryResult deliver(String destination);
    String carrierName();
}
```

Agora vamos implementar cada transporte. Repare como `record` torna as implementações concisas:

```java
public record Truck(String licensePlate) implements Transport {

    @Override
    public DeliveryResult deliver(String destination) {
        return new DeliveryResult(
            "TRK-" + licensePlate + "-" + destination.hashCode(),
            carrierName(),
            3
        );
    }

    @Override
    public String carrierName() {
        return "RoadFreight (" + licensePlate + ")";
    }
}

public record Ship(String vesselName, String port) implements Transport {

    @Override
    public DeliveryResult deliver(String destination) {
        return new DeliveryResult(
            "SHP-" + vesselName + "-" + destination.hashCode(),
            carrierName(),
            15
        );
    }

    @Override
    public String carrierName() {
        return "SeaLogistics - " + vesselName + " via " + port;
    }
}

public record Drone(String droneId, double maxWeightKg) implements Transport {

    @Override
    public DeliveryResult deliver(String destination) {
        return new DeliveryResult(
            "DRN-" + droneId + "-" + destination.hashCode(),
            carrierName(),
            1
        );
    }

    @Override
    public String carrierName() {
        return "AirDrop Drone #" + droneId;
    }
}
```

Nenhum getter, nenhum construtor, nenhum `equals`/`hashCode` manual. O `record` cuida de tudo.

---

## Implementando o Factory Method

Agora vem o padrão propriamente dito. O Creator define o contrato de criação e a lógica de negócio que depende dele:

```java
// Creator abstrato
public abstract class LogisticsCreator {

    // O factory method: subclasses decidem qual Transport criar
    protected abstract Transport createTransport();

    // Lógica de negócio que usa o produto criado
    public DeliveryResult planDelivery(String destination) {
        var transport = createTransport();   // var: inferência de tipo local (Java 10+)

        System.out.printf("Iniciando entrega via %s para %s%n",
            transport.carrierName(), destination);

        var result = transport.deliver(destination);

        System.out.printf("Código de rastreio: %s | Prazo: %d dias%n",
            result.trackingCode(), result.estimatedDays());

        return result;
    }
}
```

Os criadores concretos simplesmente implementam o método de fábrica:

```java
public class RoadLogistics extends LogisticsCreator {
    private final String truckPlate;

    public RoadLogistics(String truckPlate) {
        this.truckPlate = truckPlate;
    }

    @Override
    protected Transport createTransport() {
        return new Truck(truckPlate);
    }
}

public class SeaLogistics extends LogisticsCreator {
    private final String vesselName;
    private final String port;

    public SeaLogistics(String vesselName, String port) {
        this.vesselName = vesselName;
        this.port = port;
    }

    @Override
    protected Transport createTransport() {
        return new Ship(vesselName, port);
    }
}

public class DroneLogistics extends LogisticsCreator {
    private final String droneId;
    private final double maxWeight;

    public DroneLogistics(String droneId, double maxWeight) {
        this.droneId = droneId;
        this.maxWeight = maxWeight;
    }

    @Override
    protected Transport createTransport() {
        return new Drone(droneId, maxWeight);
    }
}
```

---

## Pattern matching for switch no registro do modal (Java 21)

Uma das situações mais comuns é precisar selecionar qual Creator instanciar com base em alguma configuração. Em versões antigas do Java, isso virava um `if/else` cheio de `instanceof`. Com pattern matching for switch (finalizado no Java 21), fica muito mais limpo:

```java
// Um enum para representar tipos de modal
public enum TransportMode { ROAD, SEA, DRONE }

// Factory que cria o Creator correto usando switch expression (Java 14+)
// com pattern matching no enum (Java 21)
public class LogisticsFactory {

    public static LogisticsCreator forMode(TransportMode mode, String... params) {
        return switch (mode) {
            case ROAD  -> new RoadLogistics(params[0]);
            case SEA   -> new SeaLogistics(params[0], params[1]);
            case DRONE -> new DroneLogistics(params[0], Double.parseDouble(params[1]));
        };
        // Repare: sem 'default'! O compilador garante exaustividade
        // graças ao enum. Se um novo caso surgir no enum sem cobertura,
        // o código não compila.
    }
}
```

Sem `default`, sem risco de esquecer um novo modal. Isso é **segurança em tempo de compilação**.

---

## Tirando proveito do sealed interface com pattern matching

Aqui a combinação de `sealed interface` + `switch` brilha. Como o compilador sabe exatamente quais tipos implementam `Transport`, ele exige que todos os casos sejam cobertos:

```java
public class DeliveryReporter {

    // Pattern matching for switch com sealed hierarchy (Java 21)
    public String formatSummary(Transport transport, String destination) {
        return switch (transport) {
            case Truck t  -> """
                    Modal: Caminhão
                    Placa: %s
                    Destino: %s
                    """.formatted(t.licensePlate(), destination);

            case Ship s   -> """
                    Modal: Navio
                    Embarcação: %s
                    Porto de origem: %s
                    Destino: %s
                    """.formatted(s.vesselName(), s.port(), destination);

            case Drone d  -> """
                    Modal: Drone
                    ID: %s
                    Carga máxima: %.1f kg
                    Destino: %s
                    """.formatted(d.droneId(), d.maxWeightKg(), destination);
        };
        // Sem default necessário: o compilador verifica exaustividade
        // porque Transport é sealed e seus permits são conhecidos.
    }
}
```

O uso de **text blocks** (Java 15) deixa as strings multilinhas muito mais legíveis do que concatenações com `\n`.

---

## Guard patterns: condicionais dentro do switch (Java 21)

O Java 21 também permite adicionar condições (`when`) dentro dos cases do switch. Isso é chamado de **guarded pattern**:

```java
public class WeightValidator {

    public String validateAndDescribe(Transport transport, double weightKg) {
        return switch (transport) {
            case Drone d when weightKg > d.maxWeightKg() ->
                "Carga de %.1f kg excede o limite do drone #%s (máx: %.1f kg)"
                    .formatted(weightKg, d.droneId(), d.maxWeightKg());

            case Drone d ->
                "Drone #%s aprovado para carga de %.1f kg"
                    .formatted(d.droneId(), weightKg);

            case Truck t ->
                "Caminhão %s: sem limite de peso configurado".formatted(t.licensePlate());

            case Ship s ->
                "Navio %s: capacidade de contêiner aplicada externamente".formatted(s.vesselName());
        };
    }
}
```

---

## Juntando tudo: exemplo de uso completo

```java
public class Main {

    public static void main(String[] args) {
        // Criando os logistics creators
        var roadLogistics  = LogisticsFactory.forMode(TransportMode.ROAD,  "ABC-1234");
        var seaLogistics   = LogisticsFactory.forMode(TransportMode.SEA,   "Titan", "Santos");
        var droneLogistics = LogisticsFactory.forMode(TransportMode.DRONE, "D-042", "2.5");

        var reporter   = new DeliveryReporter();
        var validator  = new WeightValidator();

        // O cliente só conhece LogisticsCreator; não sabe o tipo concreto
        for (var creator : new LogisticsCreator[]{ roadLogistics, seaLogistics, droneLogistics }) {
            var result = creator.planDelivery("São Paulo");
            System.out.println("---");
        }

        // Demonstrando pattern matching com guard
        var drone = new Drone("D-042", 2.5);
        System.out.println(validator.validateAndDescribe(drone, 1.8));  // aprovado
        System.out.println(validator.validateAndDescribe(drone, 5.0));  // excede limite
    }
}
```

Saída esperada:

```
Iniciando entrega via RoadFreight (ABC-1234) para São Paulo
Código de rastreio: TRK-ABC-1234-... | Prazo: 3 dias
---
Iniciando entrega via SeaLogistics - Titan via Santos para São Paulo
Código de rastreio: SHP-Titan-... | Prazo: 15 dias
---
Iniciando entrega via AirDrop Drone #D-042 para São Paulo
Código de rastreio: DRN-D-042-... | Prazo: 1 dias
---
Drone #D-042 aprovado para carga de 1,8 kg
Carga de 5,0 kg excede o limite do drone #D-042 (máx: 2,5 kg)
```

---

## Armadilhas comuns

**Usar Factory Method quando não precisa.** Se sua aplicação tem apenas um tipo de produto e não há previsão de variação, o padrão adiciona complexidade sem benefício. Prefira criação direta nesses casos.

**Confundir Factory Method com Static Factory Method.** O padrão Factory Method envolve herança e polimorfismo. Um método estático como `Transport.of(mode)` é chamado de Static Factory Method e resolve outro tipo de problema. São padrões distintos, não intercambiáveis.

**Não aproveitar sealed + switch juntos.** Sem `sealed`, o compilador não pode verificar exaustividade no switch. Você acaba precisando de um `default` que silencia erros quando um novo tipo é adicionado. Use `sealed` sempre que conhecer todos os subtipos possíveis em tempo de design.

**Colocar lógica de negócio no factory method.** O método de fábrica deve criar e configurar o objeto, não executar a lógica que usa o objeto. Essa lógica pertence ao Creator base (como o `planDelivery` no exemplo acima).

**Records mutáveis por acidente.** Records são imutáveis por design, mas se um campo for uma coleção, o conteúdo ainda pode ser mutado. Use `List.copyOf()` ou `Collections.unmodifiableList()` para garantir imutabilidade completa.

---

## Resumo

- O **Factory Method** delega a criação de objetos para subclasses, desacoplando o código cliente das implementações concretas.
- **Sealed interfaces** (Java 17) documentam e restringem a hierarquia de produtos, tornando o domínio explícito e seguro.
- **Records** (Java 16) eliminam boilerplate em classes de dados imutáveis que representam produtos ou resultados.
- **Switch expressions com pattern matching** (Java 21) substituem cadeias de `instanceof` e `if/else` por código declarativo e verificado pelo compilador.
- **Guarded patterns** (`when`) permitem condicionais elegantes diretamente nos cases do switch.
- **Text blocks** (Java 15) e **var** (Java 10) completam o conjunto tornando o código mais legível sem perder tipagem estática.
- A combinação de `sealed` + `switch` sem `default` oferece **exaustividade em tempo de compilação**: adicionar um novo tipo sem cobri-lo no switch é um erro de compilação, não um bug silencioso em produção.

---

## Próximos passos

Para aprofundar o que foi visto aqui, vale explorar:

- [Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory) é a evolução natural do Factory Method quando você precisa criar famílias inteiras de objetos relacionados.
- [JEP 409: Sealed Classes](https://openjdk.org/jeps/409) e [JEP 441: Pattern Matching for switch](https://openjdk.org/jeps/441) nas especificações oficiais do OpenJDK.
- [JEP 440: Record Patterns](https://openjdk.org/jeps/440) para desconstruir records diretamente em pattern matching: `case DeliveryResult(var code, var carrier, var days)`.
- O livro [Effective Java (3ª edição)](https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/) do Joshua Bloch, em especial o Item 1 ("Consider static factory methods instead of constructors"), que complementa o entendimento das variações do padrão.

---

## Referências

- [Factory Method - Refactoring.Guru](https://refactoring.guru/design-patterns/factory-method)
- [JEP 409: Sealed Classes (Java 17)](https://openjdk.org/jeps/409)
- [JEP 395: Records (Java 16)](https://openjdk.org/jeps/395)
- [JEP 441: Pattern Matching for switch (Java 21)](https://openjdk.org/jeps/441)
- [JEP 440: Record Patterns (Java 21)](https://openjdk.org/jeps/440)
- [Java 21 Released - InfoQ](https://www.infoq.com/news/2023/09/java21-released/)
- [Java 24 Delivers New Features - InfoQ](https://www.infoq.com/news/2025/03/java24-released/)
- [Modern Java Language Features - Java Code Geeks](https://www.javacodegeeks.com/2025/12/modern-java-language-features-records-sealed-classes-pattern-matching.html)
