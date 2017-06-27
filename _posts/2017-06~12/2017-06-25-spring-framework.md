---
layout: post
title:  "Spring Framework"
date:   2017-06-26
tags: [java]
---

## 准备
* 下载安装STS(Sprint Tool Suite), [下载地址](https://spring.io/tools)。
  > 如果出现：Java was started but returned exit code=13 的提示，一般情况下，你是STS下错了，此处估计踩坑的人比较多。因为STS默认下载32位的，而一般情况下，大多数人安装的JDK是64位的。

* 安装Gradle，[查看具体操作](https://github.com/zhoukekestar/java-notes/wiki/Eclipse%E5%AE%89%E8%A3%85Gradle)
* 安装MySQL，[查看具体操作](https://github.com/zhoukekestar/java-notes/wiki/%E5%AE%89%E8%A3%85MySQL)

项目对应源码可以在[java-notes](https://github.com/zhoukekestar/java-notes)中找到

## Spring Boot
听说 Spring Boot 适合微服务项目。

* 打开STS，新建一个Maven项目
* [Maven 配置](https://zh.wikipedia.org/wiki/Apache_Maven)
  * groupId: 项目的包名，比如：io.github.zhoukekestar
  * artifactId: 项目名称，比如：HelloWorld
  > 修改Maven文件后，如果依赖依然没有被导入，可以点击项目 -> 右击 -> maven -> update project -> 选中 Force Update of Snapshots/Releases -> 点击OK

  ```xml
    <parent>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-parent</artifactId>
      <version>1.5.4.RELEASE</version>
    </parent>

    <dependencies>
      <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
      </dependency>
    </dependencies>
  ```
* 按照[官方教程](http://projects.spring.io/spring-boot/)写了一个HelloWorld

  ```java
  package hello;

  import org.springframework.boot.*;
  import org.springframework.boot.autoconfigure.*;
  import org.springframework.stereotype.*;
  import org.springframework.web.bind.annotation.*;

  @Controller
  @EnableAutoConfiguration
  public class SampleController {

      @RequestMapping("/")
      @ResponseBody
      String home() {
          return "Hello World!";
      }

      public static void main(String[] args) throws Exception {
          SpringApplication.run(SampleController.class, args);
      }
  }
  ```
* Run as `Sprint Boot`, 就是这么简单。。。


## Mybatis
根据[官方教程](http://www.mybatis.org/mybatis-3/zh/index.html)编写的HelloWorld项目。[查看具体的代码](https://github.com/zhoukekestar/java-notes)。
* 新建一个`maven`项目
* 加入`mybatis`依赖
* 新建一个 `source` 文件夹
* 添加`mybatis.xml` 配置文件
* 添加`mapper`文件
* 通过`mybatis`查询数据

  ```java
  public class App {
  	public static SqlSessionFactory sqlSessionFactory;

  	public static void main(String[] args) throws IOException {
  		String resource = "mybatis.xml";
  		InputStream inputStream = Resources.getResourceAsStream(resource);
  		sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

  		SqlSession session = sqlSessionFactory.openSession();
  		User name = session.selectOne("mapper.user.getNameByID", 2);

  		System.out.println("Hello " + name.getName() + "!");
  	}
  }

  ```
## Sprint Boot & Mybatis

## Java 概念补充:
* JavaBeans
* 面向切面编程（AOP）
* 控制反转（IoC, Inversion of Control），依赖注入（DI, Dependency Injection）
* DAO
* 反射（Reflect）
* 注解（Announce）

### [JavaBeans](https://zh.wikipedia.org/wiki/JavaBeans)
> JavaBeans是Java中一种特殊的类，可以将多个对象封装到一个对象（bean）中。特点是可序列化，提供无参构造器，提供getter方法和setter方法访问对象的属性。名称中的“Bean”是用于Java的可重用软件组件的惯用叫法。

### AOP

### DI
> 控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。

其中 [Angular](https://zh.wikipedia.org/wiki/AngularJS) 也用到了这种思想：
> Angular遵循软件工程的MVC模式，并鼓励展现，数据，和逻辑组件之间的松耦合。通过依赖注入（dependency injection），Angular为客户端的Web应用带来了传统服务端的服务，例如独立于视图的控制。因此，后端减少了许多负担，产生了更轻的Web应用。
