---
layout: post
title:  "Java Proxy"
date:  2022-11-08
tags: [note]
---

  在 RPC 框架中，很多时候，调用方仅需要引用 Interface 就能方便地调用远程的 RPC 服务。所以，简单看一下这里的实现原理。

# 使用

  这里以 [Spring Dubbo](https://github.com/apache/dubbo-spring-boot-project) 为例

```java
@EnableAutoConfiguration
public class DubboAutoConfigurationConsumerBootstrap {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @DubboReference(version = "1.0.0", url = "dubbo://127.0.0.1:12345")
    private DemoService demoService;

    public static void main(String[] args) {
        SpringApplication.run(DubboAutoConfigurationConsumerBootstrap.class).close();
    }

    @Bean
    public ApplicationRunner runner() {
        return args -> {
            logger.info(demoService.sayHello("mercyblitz"));
        };
    }
}
```

# 原理

  这里比较好奇，为什么注解注入的对象，能给 Interface 对象正常使用。通过文档的查阅，发现 Java 有 [Proxy](https://xperti.io/blogs/java-dynamic-proxies-introduction/) 的能力，和 JavaScript 的 Proxy 一致。

```java
package com.alibaba.faas;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Test {

    interface Hello {
        void hi();
    }

    static class Handler implements InvocationHandler {
        public Object invoke(Object proxy, Method method, Object[] args) {
            //method.invoke()
            System.out.println("invoke");
            return null;
        }
    }

    public static void main(String[] args) {
        Handler handler = new Handler();
        Hello hello = (Hello) Proxy.newProxyInstance(Hello.class.getClassLoader(), new Class[] { Hello.class }, handler);
        hello.hi();
    }
}
```


