---
layout: post
title:  "管理 APIs 工具"
date:   2018-05-27
tags: [tool]
commentIssueId: 81
---



APIs 管理在项目推进中始终是团队效率的关键，在此，收集一波现阶段已有的接口管理工具，以备不时之需。PS：之前看到技术的高低不是技术本身？而是工程化思维的成熟度？
* Swagger
* Rap
* apidoc
* Spring REST Docs
* yapi
* PostMan
* 国内其他平台
* httpbin



## 管理工具列表



### Swagger

`免费` `开源`

快速查看 Demo [Click Here](https://editor.swagger.io/) , 这是一款比较适合 RESTful 风格接口的管理工具，可以在线测试，推荐！

* 可以 Spring 完美地结合在一起使用，具体可查看 [SPRING BOOT RESTFUL API DOCUMENTATION WITH SWAGGER 2](https://springframework.guru/spring-boot-restful-api-documentation-with-swagger-2/)
* 可以通过 jsdoc 将 swagger 结合在一起，可参考：[swagger-koa](https://www.npmjs.com/package/swagger-koa)

同时 Swagger 还对 `OAS (OpenAPI Specification)` 进行了规范和标准化，参考：[OpenAPI Specification](https://swagger.io/specification/)



### Rap

`免费` `开源`

[Rap](http://rapapi.org/org/index.do) 是阿里妈妈 MUX 团队出品的，之前还以为不维护了，很心寒。巧的是，最近 Rap 2.0 发布了，新的开源地址是：[https://github.com/thx/rap2-delos](https://github.com/thx/rap2-delos), 在线地址：http://rap2.taobao.org/，他的主打功能有 Mock 数据、接口管理等。



### apidoc

`免费` `开源`

主要面向 NodeJS 的一个接口工具，[apidoc](https://github.com/apidoc/apidoc)。

如果你想从 apidoc 转换成 swagger，可以使用 [apidoc-swagger](https://github.com/fsbahman/apidoc-swagger) 进行。



### Spring REST Docs

`免费` `开源`

[spring-restdocs](http://projects.spring.io/spring-restdocs/) 面向 Spring 的官方提供的一个工具，但貌似只提供了文档化功能，没 Swagger 那么强大。



#### yapi

`免费` `开源`

[yapi](https://github.com/ymfe/yapi) YApi 是一个可本地部署的、打通前后端及QA的、可视化的接口管理平台



### PostMan

`付费`

本地测试开发利器，团队同步是个大问题（付费能解决）。



### 平台

`付费`  `国内` 

###### eolinker [eolinker](https://www.eolinker.com/#/)

###### easyapi [easyapi](https://www.easyapi.com/) 做的事更偏网关层

Sosoapi  [sosoapi](http://www.sosoapi.com/) 使用的是 swagger 技术





## Test

一个用于 CRUD 操作、 AJAX 、 fetch 、 GET、POST、DELETE、PATCH、PUT 的测试链接：[httpbin](https://httpbin.org/)



## References

* [介绍几款常用的在线API管理工具](https://zhuanlan.zhihu.com/p/33174371)
* [rap2-delos](https://github.com/thx/rap2-delos)
* [有没有开源的api管理系统？](https://www.zhihu.com/question/30434095)