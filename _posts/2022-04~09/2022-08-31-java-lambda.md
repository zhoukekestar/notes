---
layout: post
title:  "Java Lambda"
date:  2022-08-31
tags: [java]
---

  Intro to Java Lambda.

# Demo

  Lambda 的本质，虽然看上去是函数，但依旧可以当成对象 + 方法名去看。

```java
public class Test {
    public static void main(String[] args) {

        Convert c = new Convert() {
            @Override
            public int convert(int a) {
                return a * a;
            }
        };

        Convert c2 = a -> a * a;

        System.out.println(c.convert(10));
        System.out.println(c2.convert(10));
    }

    public interface Convert {
        int convert(int a);
    }
}
```

# Stream And Lambda

  Stream 中的处理非常适合采用 Lamdda 来实现。

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {

        // A function implement by lambda
        Function<String, Stream<String>> appendFunction = t -> Stream.of(t + " - appended");
        System.out.println(
                appendFunction
                        .apply("hello")
                        .collect(Collectors.toList())
        );

        // Add each string by lambda
        List<String> strings = Arrays.asList("hello", "world");
        List<String> strings2 = strings
                .stream()
                .flatMap(appendFunction)
                .collect(Collectors.toList());
        System.out.println(strings2);
    }
}

```

# References

* [Lambda](https://www.runoob.com/java/java8-lambda-expressions.html)
* [Stream](https://www.runoob.com/java/java8-streams.html)