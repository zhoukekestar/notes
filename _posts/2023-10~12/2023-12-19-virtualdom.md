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

# DOM

  DOM 是 Document Object Model 的简写，是


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
