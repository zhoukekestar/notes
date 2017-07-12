---
layout: post
title:  "PWA Practice"
date:   2017-07-12
tags: [pwa]
commentIssueId: 32
---

PWA Articles & Resources:
* [Lavas](https://lavas.baidu.com/): 基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题
* [饿了么的PWA升级实践](http://geek.csdn.net/news/detail/210535)
* [GoogleChrome/sw-precache](https://github.com/GoogleChrome/sw-precache): A node module to generate service worker code that will precache specific resources so they work offline.
* [浅谈 HTTP/2 Server Push](https://zhuanlan.zhihu.com/p/26757514)

## 饿了么PWA升级

* `SPAs` 可能用 `MPA`( `Multi Pages Application` ) 表示更为合理。
* `PRPL` 模式
  * `Push/Preload`: 推送/预加载初始URL路由所需的关键资源
  * `Render`: 渲染初始路由，尽快让应用可被交互
  * `Precache`: 用Service Worker预缓存剩下的路由
  * `Lazy-Load`: 按需懒加载、懒实例化剩下的路由
