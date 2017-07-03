---
layout: post
title:  "笔记补充：阿里、网易、滴滴共十次前端面试碰到的问题"
date:   2017-07-03
tags: [interview]
commentIssueId: 17
---

## 浏览器优化和渲染流程
[http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/](http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/)


## 前端优化
* 语义化网页（Semantic Elements）
* `dns-prefetch` 预先解析DNS
* `preload` 预先加载可能需要用到的页面（参考Twitter）
* 缓存
  * `Cache-Control` 本地缓存
  * `304` 请求缓存
  * `manifest` 应用缓存

## 安全优化
* 双重认证机制（可参考Github的双重认证机制）
* 异地登陆记录（包括Apple，Twitter，Google在内，都有类似的机制）
