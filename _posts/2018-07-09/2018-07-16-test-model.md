---
layout: post
title:  "测试模型"
date:   2018-07-16
tags: [test]
commentIssueId: 91
---

测试金字塔模型从下到上，可分为单元测试（UT）、集成测试（Integration）、端到端测试( E2E)，UI 测试。看到两张不错的图片，特此记录一下。



## Test

![image](https://user-images.githubusercontent.com/7157346/42757906-45326d0a-8934-11e8-93ad-80f4b2eabf27.png)

#### Unit Tests

Tests that verify the behavior of class methods or functions inside a service. These tests take a code file from the service’s codebase, and execute its functions or class methods using different inputs, while verifying the output of the functions for each input.

> 单元测试是对项目和服务做代码级的测试，根据各个函数、方法做不同输入，验证函数输出结果

#### Integration Tests

Tests that verify the external behavior of a single service. The test framework starts an instance of the service, and then uses the service’s external interface to execute the business logic of the service in the same way that an external service would integrate with the tested service. For example, a REST API service would be tested by making HTTP requests to the service.

> 根据服务、类提供的能力、接口，做不同输入，从而串联各个函数、方法，从而达到集成测试的目的。

#### End to End Tests

Tests that verify the behavior of multiple services that communicate with each other. These tests are accomplished by running multiple services in an isolated environment where they can actually communicate with each other. End to end tests initiate a network request to a service, such as a REST API, then verify that other dependent backend services have updated in response to the input to the first service.

> 验证各个服务之间串联的功能点，比如，通过测试网关，验证整体后端的可用性。

#### UI Tests

Tests that verify the behavior of an entire platform by starting from the client user interface. This tests both the client’s logic as well as the backend system, to verify that the client is able to communicate with the backend system and that state is updated and persisted properly between the client and the backend.

> 站在用户侧，验证用户功能点。



![image](https://user-images.githubusercontent.com/7157346/42757914-49cad4b0-8934-11e8-9f5c-f9535c7dce98.png)





## References

* [Microservice Testing: Introduction](https://medium.com/@nathankpeck/microservice-testing-introduction-347d2f74095e)