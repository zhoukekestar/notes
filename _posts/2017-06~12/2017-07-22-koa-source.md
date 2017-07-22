---
layout: post
title:  "koa 源码浅析"
date:   2017-07-22
tags: [js]
commentIssueId: 37
---

kao 源码浅析:
* use middleware
* listen -> callback -> compose
* handleRequest
* createContext -> middleware -> response

## 部分子模块
* [koa-compose](https://github.com/koajs/compose/blob/master/index.js): 组合和遍历`middleware`
* [on-finished](https://github.com/jshttp/on-finished/blob/master/index.js): Execute a callback when a HTTP request closes, finishes, or errors.
* [statuses](https://www.npmjs.com/package/statuses): HTTP status utility for node.
* [cookies](https://www.npmjs.com/package/cookies): Cookies 工具集。
* [accepts](https://www.npmjs.com/package/accepts): Accepts 工具集。

## 主要流程

点击查看大图

[![koa](https://user-images.githubusercontent.com/7157346/28489690-d58f9fbc-6efa-11e7-9614-b408858eff8a.jpg)](https://user-images.githubusercontent.com/7157346/28489690-d58f9fbc-6efa-11e7-9614-b408858eff8a.jpg)
