---
layout: post
title: "Spring Boot + MyBatis"
date: 2022-03-15
tags: [note]
---

回顾一下 Spring Boot + MyBatis，重新记录一下 Spring Boot + MyBatis 这种最常用的 Java 配合。

## Download IDE

IDE 选择免费且最简单的 [Eclipse](https://www.eclipse.org/downloads/packages/) 。

因为是 Mac M1 Pro，所以选择 Java EE (MacOs AArch64)


## 初始化 Spring 项目

进入：https://start.spring.io/ 下载

## 导入 maven 项目

开发一个简单的 Hello World 服务器，参考：https://spring.io/quickstart

![](https://spring.io/images/quick-img-1-dark-fa196953fc04a4d6ab1133c05a622787.png)

* 依赖添加

```xml
	<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>
```

* 编写代码

```java
package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {


    public static void main(String[] args) {
      SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
      return String.format("Hello %s!", name);
    }

}
```

## MyBatis

#### 配置 Mysql 链接

在 application.properties
```
spring.datasource.url = jdbc:mysql://rm-xxx.mysql.rds.aliyuncs.com:3306/mysql
spring.datasource.username = xxx
spring.datasource.password = xxx
```

#### 配置 Bean

```java
package com.example.demo;

public class City {
	private String Host;
	private String Db;
	private String User;

	public String getHost() {
		return Host;
	}
	public void setHost(String host) {
		Host = host;
	}
	public String getDb() {
		return Db;
	}
	public void setDb(String db) {
		Db = db;
	}
	public String getUser() {
		return User;
	}
	public void setUser(String user) {
		User = user;
	}

	@Override
	public String toString() {
		return "host: " + this.Host + " db:" + this.Db + " user: "+ this.User;
	}
}
```

#### 配置 mapper

```java
package com.example.demo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.context.annotation.Bean;

@Mapper
public interface CityMapper {

	@Select("SELECT * from mysql.db")
	public List<City> find();
}
```


#### 查询

```java

@SpringBootApplication
public class DemoApplication implements CommandLineRunner{

	@Autowired
	private CityMapper cityMapper;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		List<City> list = this.cityMapper.find();
		System.out.println(list);
	}
}
```

最终打印出：

```
[host: % db:mysql user: xxx, host: % db:test user: xxx, host: localhost db:performance_schema user: mysql.session, host: localhost db:sys user: mysql.sys]
```

## References

* https://www.javaguides.net/2019/08/spring-boot-mybatis-mysql-example.html
* https://start.spring.io/
* https://spring.io/quickstart