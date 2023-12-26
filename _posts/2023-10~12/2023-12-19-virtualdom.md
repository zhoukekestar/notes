---
layout: post
title:  "再谈 Virtual DOM"
date:  2023-12-20
tags: [note]
---


* 背景
  * 什么事 Virtual DOM （what）
  * 为什么需要 Virtual DOM（why）
* 实现原理 how
  * 简单版本
  * 引用，index、key
  * patch
  * diff
* Diff 原理
  *
* Virtual DOM 的其他场景
  * nodejs
  * weex
  * 小程序
  * 鸿蒙 taro


# 背景

  回顾历史，计算机应用从 CS（Client-Server） 架构往 BS（Browser-Server） 迁移后，应用的开发方式发生了变化。

  从 1991 年第一次公开 HTML 以来，再到 1995 年 Netscape 推出客户端脚本 Javascript 之后，再到 2000 年，Gmail 大规模使用 AJAX 来异步更新页面。前端浏览器页面，从无到有，从静态到动态，从动态到复交互形态。

  Web 页面从仅仅是静态展示，慢慢变成 Web 应用（即 Web Application）。

* https://en.wikipedia.org/wiki/Web_application
* https://en.wikipedia.org/wiki/Ajax_(programming)

# Web Application

  既然是应用，相比之前的 HTML 静态页面，就变得复杂了。

  在原有静态页面的时代，HTML 页面的内容是相对静态的，页面的真实渲染一般也由后端服务器使用模板语言来生成。

  比如：[Vecolity](https://velocity.apache.org/engine/1.7/user-guide.html), [JSP](https://www.geeksforgeeks.org/introduction-to-jsp/), [ASP](https://learn.microsoft.com/en-us/previous-versions/aspnet/h59db326(v=vs.100)), [art-template](https://aui.github.io/art-template/zh-cn/) 等等

  像 ASP.NET 的方案，通过 `runat=server` 可以将 click 事件，都放在服务端处理，并在点击后返回整个 HTML 页面。

```html
  <form id="form1" runat="server">
    <asp:Button id="Button1"
      Text="Submit"
      OnClick="SubmitBtn_Click"
      runat="server"/>
  </form>
```

  原有的模板方案，数据一般都在服务端维护（包括页面路由等），且多以展现为主，并无强烈的页面状态维护等诉求。

  一切都被 Gmail 打破了，在使用 AJAX 方案后，大幅减少了服务器流量（从原有的整体页面请求到页面区块的请求），且显著增强了应用程序性能和用户体验。

  <!-- DOM 是 Document Object Model 的简写，是 -->


# 维护 DOM

  一开始的网页，由于偏静态化，所以，一般没有复杂的 DOM 维护操作。

  通常情况，HTML DSL 即为 DOM，较少更新 DOM，即使是必须更新 DOM。
  * 在 `jQuery` 时代，会使用 `$('p').replaceWith('<b>hello world</b>')`
  * 或使用原生 DOM API `document.querySelector('p').innerHTML = '<b>hello wrold</b>'`

  后续随着网页往 `WebApp` 发展，网页趋于动态、复杂化。随着而来的，便是复杂的页面状态，以及复杂的 DOM 更新。


# 现在 Web 应用更新 DOM 的方法

* Angluar Incremental DOM
  * https://www.reddit.com/r/Angular2/comments/8ytfc1/reacts_virtual_dom_vs_angulars_change_detection/
* Ember Glimmer
  * Stream Tree
  * https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
  * https://engineering.linkedin.com/blog/2017/06/glimmer--blazing-fast-rendering-for-ember-js--part-2
* React Virtual DOM

# 编写模板

* JSX
* Template
* Handlebars



# Virtual DOM 核心作用

![image](https://github.com/zhoukekestar/notes/assets/7157346/9db66f3b-d2f0-4797-b407-e1e1862e1c88)

from:
* https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
* https://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html



* DSL vs JSX
* Ecosystem
  * Three.JS
  *
*

> The big improvements that React brought to the mainstream were componentization, and popularizing declarative rendering.
> https://news.ycombinator.com/item?id=34621279

> For some reason I thought the virtual DOM was a native feature of the browser
> https://news.ycombinator.com/item?id=34633339

# VDom is not just VDOM

> Note that a virtual DOM is pure overhead if you already have a real DOM to work with.
> https://news.ycombinator.com/item?id=34616031
>


# Steps

* diff
  * https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js
* patch



# Diff Alogrithm

### RTED

> RTED requires O(n2) space as the most space-efficient competitors, and its runtime complexity of O(n3) in the worst case is optimal.


# Virtual DOM 简写

  使用 JSX 简写


# References

* https://news.ycombinator.com/item?id=34612162
* https://svelte.dev/blog/virtual-dom-is-pure-overhead
* https://github.com/mbasso/asm-dom
* https://github.com/patrick-steele-idem/morphdom
* https://zhoukekestar.github.io/notes/2017/08/07/webcomponents-demo.html
* https://zhoukekestar.github.io/notes/2017/08/07/beyond-framework.html
* https://github.com/WebReflection/hyperHTML
* https://github.com/AFASSoftware/maquette

* https://en.wikipedia.org/wiki/Virtual_DOM
  * https://svelte.dev/blog/virtual-dom-is-pure-overhead
  * https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/


* [RTED: A Robust Algorithm for the Tree Edit Distance](https://vldb.org/pvldb/vol5/p334_mateuszpawlik_vldb2012.pdf)
* [Minimal Edit-Based Diffs for Large Trees](https://dl.acm.org/doi/pdf/10.1145/3340531.3412026)
* [Detecting Changes in XML Documents](https://people.cs.rutgers.edu/~amelie/papers/2002/diff.pdf)
* [Google String diff-match-patch](https://github.com/google/diff-match-patch)
