---
layout: post
title:  "笔记补充：阿里、网易、滴滴共十次前端面试碰到的问题"
date:   2017-07-03
tags: [interview]
commentIssueId: 17
---

对[笔记：阿里、网易、滴滴共十次前端面试碰到的问题](https://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html)的补充说明。
* 浏览暖气渲染流程
* 前端优化
* 安全优化
* BFC、IFC
* 栅格系统
* vue的模仿
* require.js 和 webpack
* 左右布局：左边定宽、右边自适应，

## 浏览器优化和渲染流程
[optimising-the-front-end-for-the-browser](http://jinlong.github.io/2017/05/08/optimising-the-front-end-for-the-browser/)


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

#### BFC: Block Formatting Contexts

一个块格式化上下文由以下之一创建：
* 根元素或其它包含它的元素
* 浮动 (元素的 float 不是 none)
* 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
* 内联块 inline-blocks (元素具有 display: inline-block)
* 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
* 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
* 块元素具有overflow ，且值不是 visible
* display: flow-root

#### IFC: Inline Formatting Contexts
* 行内元素，比如：em，strong，del等

#### FFC: Flex Formatting Contexts
* display: flex


#### GFC: [Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) Formatting Contexts
* display: grid

References:
* [浅析CSS中的BFC和IFC](http://www.cnblogs.com/Candybunny/p/6222939.html)
* [视觉格式化模型](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Visual_formatting_model)
* [块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## 栅格系统

> 在一个有限的、固定的平面上，用水平线和垂直线（虚拟的线，“参考线”），将平面划分成有规律的一系列“格子”（虚拟的格子），并依托这些格子、或以格子的边线为基准线，来进行有规律的版面布局。 by 钱争予

> 栅格设计系统（又称网格设计系统、标准尺寸系统、程序版面设计、瑞士平面设计风格、国际主义平面设计风格），是一种平面设计的方法与风格。运用固定的格子设计版面布局，其风格工整简洁，在二战后大受欢迎，已成为今日出版物设计的主流风格之一。

> 栅格设计的特点是重视比例、秩序、连续感和现代感。 以及对存在于版面上的元素进行规划、组合、保持平衡或者打破平衡，以便让信息可以更快速、更便捷、更系统和更有效率的读取；另外最重要的一点是，负空间的规划（即：留白）也是栅格系统设计当中非常重要的部分。

```html
<!-- 仅支持Chrome 57以上， http://caniuse.com/#feat=css-grid -->
<div class="grid-wrapper">
  <div style="grid-column: 1 / 3; grid-row: 1;">One</div>
  <div style="grid-column: 2 / 4; grid-row: 1 / 3;">Two</div>
  <div style="grid-row: 2 / 5; grid-column: 1;">Three</div>
  <div style="grid-column: 3; grid-row: 3;">Four</div>
  <div style="grid-column: 2; grid-row: 4;">Five</div>
  <div style="grid-column: 3;grid-row: 4;">Six</div>
</div>

<style>
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.grid-wrapper > div {
  border: 2px solid rgb(233,171,88);
  border-radius: 5px;
  background-color: rgba(233,171,88,.5);
  padding: 1em;
  color: #d9480f;
}
</style>
```

<div class="grid-wrapper">
  <div style="grid-column: 1 / 3; grid-row: 1;">One</div>
  <div style="grid-column: 2 / 4; grid-row: 1 / 3;">Two</div>
  <div style="grid-row: 2 / 5; grid-column: 1;">Three</div>
  <div style="grid-column: 3; grid-row: 3;">Four</div>
  <div style="grid-column: 2; grid-row: 4;">Five</div>
  <div style="grid-column: 3;grid-row: 4;">Six</div>
</div>

<style>
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.grid-wrapper > div {
  border: 2px solid rgb(233,171,88);
  border-radius: 5px;
  background-color: rgba(233,171,88,.5);
  padding: 1em;
  color: #d9480f;
}
</style>

References:
* [栅格设计](https://zh.wikipedia.org/wiki/%E6%A0%85%E6%A0%BC%E8%AE%BE%E8%AE%A1)
* [什么是栅格化设计？](https://www.zhihu.com/question/19602912)
* [CSS_Grid_Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
* [css_reference/grid](https://tympanus.net/codrops/css_reference/grid)

## Vue的模仿
riot 源码阅读？

## require.js 和 webpack

## 左右布局：左边定宽、右边自适应
<style>
.auto-width {
  animation-name: auto-width;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  box-sizing: border-box;
}
@keyframes auto-width {
  0 { width: 60%;}
  50% {width: 100%;}
  100% {width: 60%;}
}
</style>
  * grid
    ```html
    <div class='example-1 auto-width'>
      <style>
        .example-1 {
          display: grid;
          grid-template-columns: 150px 1fr;
          height: 100px;
          width: 60%;
        }
        .example-1 .left {
          background: #0f0;
        }
        .example-1 .right {
          background: #f00;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```
    <div class='example-1 auto-width'>
      <style>
        .example-1 {
          display: grid;
          grid-template-columns: 150px 1fr;
          height: 100px;
          width: 60%;
        }
        .example-1 .left {
          background: #0f0;
        }
        .example-1 .right {
          background: #f00;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
