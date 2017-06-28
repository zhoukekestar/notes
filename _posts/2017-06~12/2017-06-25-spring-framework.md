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
待补充

## [java-notes 项目](https://github.com/zhoukekestar/java-notes)
