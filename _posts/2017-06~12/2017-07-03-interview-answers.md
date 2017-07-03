---
layout: post
title:  "笔记补充：阿里、网易、滴滴共十次前端面试碰到的问题"
date:   2017-07-03
tags: [interview]
commentIssueId: 17
---

对[](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html)的补充说明。
* 浏览暖气渲染流程
* 前端优化
* 安全优化
* BFC、IFC
* 栅格系统
* vue的模仿
* require.js 和 webpack

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

## BFC, IFC, GFC, FFC
BFC: Block Formatting Contexts
* 块元素，比如：div, p, h1等

IFC: Inline Formatting Contexts
* 行内元素，比如：em，strong，del等

GFC: GridLayout Formatting Contexts,
FFC: Flex Formatting Contexts,

## 栅格系统

## Vue的模仿

## require.js 和 webpack
