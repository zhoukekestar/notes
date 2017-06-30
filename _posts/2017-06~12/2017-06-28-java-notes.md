---
layout: post
title:  "Java Notes"
date:   2017-06-26
tags: [java, notes]
commentIssueId: 28
---

# java-notes
Java Notes。虽然是个前端，但之前也接触过java，所以，就当复习做个笔记吧。该文档来自[java-note/README.md](https://github.com/zhoukekestar/java-notes)。

# 准备工作
* 安装Gradle，[查看具体操作](https://github.com/zhoukekestar/java-notes/wiki/Eclipse%E5%AE%89%E8%A3%85Gradle)
* 安装MySQL，[查看具体操作](https://github.com/zhoukekestar/java-notes/wiki/%E5%AE%89%E8%A3%85MySQL)

# 其它推荐资源
* [awesome-java](https://github.com/akullpp/awesome-java)
* [关于java的一些文档](https://github.com/EbookFoundation/free-programming-books/blob/master/free-programming-books-zh.md#java)
* [在线阅读: Spring Boot参考指南](https://qbgbook.gitbooks.io/spring-boot-reference-guide-zh/content/)
* [Spring Boot Samples](https://github.com/spring-projects/spring-boot/tree/master/spring-boot-samples)
* [mybatis文档](http://www.mybatis.org/mybatis-3/zh/index.html)

# Projects
* `SpringBootHelloWorld`: 使用`Spring Boot`框架，用`maven`构建的`HelloWorld`项目
* `SpringBootHelloWorld-Gradle`: 使用`Spring Boot`框架，用`gradle`构建的`HelloWorld`项目
* `MyBatisHelloWorld`: 使用`mybatis`框架编写的`HelloWorld`项目
*  `SpringBoot-Mybatis`: 未完成
* `MybatisCRUD`

  * `mybatis-config.xml` 元素的声明循序必须按照
    ```
    properties?,settings?,typeAliases?,typeHandlers?,objectFactory?,objectWrapperFactory?,plugins?,environments?,databaseIdProvider?,mappers?
    ```

    ```xml
    <!-- 这样是可以的 -->
    <configuration>
      <properties resource="config.properties"></properties>

      <typeAliases></typeAliases>
    </configuration>

    <!-- 这样是不可以的，会报错 -->
    <configuration>
      <typeAliases></typeAliases>

      <properties></properties>
    </configuration>
    ```
* `CustomAnnotation`: 自定义注解
  * 方法名注解样例
  * 方法参数注解样例

    ```java
    @AutoRun(times = 3)
    public static void showMsgThreeTimes() {
      System.out.println("AutoRun showMsgThreeTimes!");
    }

    @AutoRun
    public static void showSingleMsg() {
      System.out.println("AutoRun showSingleMsg!");
    }

    public void showEmail(@Email String email) {
      System.out.println("email :" + email);
    }

    /* 输出
    AutoRun showSingleMsg!
    AutoRun showMsgThreeTimes!
    AutoRun showMsgThreeTimes!
    AutoRun showMsgThreeTimes!
    Jun 28, 2017 7:45:35 PM org.hibernate.validator.internal.util.Version <clinit>
    INFO: HV000001: Hibernate Validator 5.2.4.Final
    values:email size: 0 msg:
    values:abc size: 1 msg:Email is invalid.
    */
    ```
* java-reflect
  * Reflect.java
    ```java
    package io.github.zhoukekestar;

    public class Reflect {

    	private String message = null;
    	public Reflect() {
    	}

    	public Reflect(String msg) {
    		this.message = msg;
    	}

    	public void show() {
    		System.out.println("Hello " + this.message);
    	}

    	public static void show(String msg) {
    		System.out.println("Hello " + msg);
    	}
    }
    ```
  * App.java
    ```java
    package io.github.zhoukekestar;

    import java.lang.reflect.InvocationTargetException;
    import java.lang.reflect.Method;

    public class App {

    	public static void main(String[] args) throws IllegalAccessException, IllegalArgumentException, InvocationTargetException, NoSuchMethodException, SecurityException, ClassNotFoundException {
    		Class reflect = Class.forName("io.github.zhoukekestar.Reflect");
    		Method show = reflect.getDeclaredMethod("show", String.class);
    		show.invoke(null, "World! by show(msg)");

    		show = reflect.getDeclaredMethod("show");
    		show.invoke(new Reflect("World! by show()"));
    	}
    }
    /*
    输出：
    Hello World! by show(msg)
    Hello World! by show()
     */
    ```
## 一些概念

### DAO
查看Stackoverflow上的回答: [data-access-object-dao-in-java](https://stackoverflow.com/questions/19154202/data-access-object-dao-in-java)

一个[DAO样例](http://www.tutorialspoint.com/design_pattern/data_access_object_pattern.htm)。

### AOP
> 作者：知乎用户<br>
链接：https://www.zhihu.com/question/24863332/answer/48376158<br>
来源：知乎<br>
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。<br>
面向切面编程（AOP是Aspect Oriented Program的首字母缩写） ，我们知道，面向对象的特点是继承、多态和封装。而封装就要求将功能分散到不同的对象中去，这在软件设计中往往称为职责分配。实际上也就是说，让不同的类设计不同的方法。这样代码就分散到一个个的类中去了。这样做的好处是降低了代码的复杂程度，使类可重用。<br>但是人们也发现，在分散代码的同时，也增加了代码的重复性。什么意思呢？比如说，我们在两个类中，可能都需要在每个方法中做日志。按面向对象的设计方法，我们就必须在两个类的方法中都加入日志的内容。也许他们是完全相同的，但就是因为面向对象的设计让类与类之间无法联系，而不能将这些重复的代码统一起来。<br>也许有人会说，那好办啊，我们可以将这段代码写在一个独立的类独立的方法里，然后再在这两个类中调用。但是，这样一来，这两个类跟我们上面提到的独立的类就有耦合了，它的改变会影响这两个类。那么，有没有什么办法，能让我们在需要的时候，随意地加入代码呢？**这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。**<br>一般而言，我们管切入到指定类指定方法的代码片段称为切面，而切入到哪些类、哪些方法则叫切入点。有了AOP，我们就可以把几个类共有的代码，抽取到一个切片中，等到需要时再切入对象中去，从而改变其原有的行为。这样看来，AOP其实只是OOP的补充而已。OOP从横向上区分出一个个的类来，而AOP则从纵向上向对象中加入特定的代码。有了AOP，OOP变得立体了。如果加上时间维度，AOP使OOP由原来的二维变为三维了，由平面变成立体了。从技术上来说，AOP基本上是通过代理机制实现的。<br>AOP在编程历史上可以说是里程碑式的，对OOP编程是一种十分有益的补充。

### [JavaBeans](https://zh.wikipedia.org/wiki/JavaBeans)
> JavaBeans是Java中一种特殊的类，可以将多个对象封装到一个对象（bean）中。特点是可序列化，提供无参构造器，提供getter方法和setter方法访问对象的属性。名称中的“Bean”是用于Java的可重用软件组件的惯用叫法。

### IoC & DI
可参考：[Java之控制反转和依赖注入](http://www.cnblogs.com/devinzhang/p/3862942.html)。

> 控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。

其中 [Angular](https://zh.wikipedia.org/wiki/AngularJS) 也用到了这种思想：
> Angular遵循软件工程的MVC模式，并鼓励展现，数据，和逻辑组件之间的松耦合。通过依赖注入（dependency injection），Angular为客户端的Web应用带来了传统服务端的服务，例如独立于视图的控制。因此，后端减少了许多负担，产生了更轻的Web应用。

## 其他基础
* IO
* 网络编程
* 多线程
