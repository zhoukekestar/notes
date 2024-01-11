---
layout: post
title:  "再谈 Virtual DOM（二）"
date:  2024-01-10
tags: [note]
---

# Virtual DOM


### 典型 VirtualDOM

  典型的 [virtual-dom](https://github.com/Matt-Esch/virtual-dom) 主要包含以下步骤：

* `createElement` 创建 `VNode`，并通过 `children` 关联生成一个 `VTree`
* `render` 将组件渲染成 `VirtualDOM`
  * 首次渲染，调用 `document.createElement` 创建 `RealDOM`
  * 二次渲染
    * `render` 生成第二棵 `VirtualDOM 2`
    * `diff` 计算两棵 `VirtualDOM 1` 和 `VirtualDOM 2` 的差异
    * `patch` 将差异 批量 应用到 `RealDOM`

缺点：
* 运行内存占用较多，并有两颗 VirtualDOM 树

![image](https://github.com/zhoukekestar/notes/assets/7157346/9db66f3b-d2f0-4797-b407-e1e1862e1c88)

* https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
* https://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html


### Preact

  [Preact Build](https://unpkg.com/browse/preact@1.2.0/src/preact.js#L273)

* `createElement` 创建 `VNode`，并通过 `children` 关联生成一个 `VTree`
* `render` 将组件渲染成 `VirtualDOM`
  * 首次渲染，调用 `document.createElement` 创建 `RealDOM`
  * 二次渲染
    * `render` 第二次生成 `VirtualDOM`（注意：此处是第二次，不是第二棵）
    * `build` 计算 `RealDOM` 和 `VirtualDOM` 的差异并依次更新（注意：此处是依次更新，不是批量更新）

优点：
* 策略简单，内存占用少


### React

* https://github.com/maoxiaoxing/react-study/tree/master/Fiber
* https://juejin.cn/post/6993973502852202503


# Diff 算法

### 典型 XML Diff

  一个典型的 Diff 算法复杂度为 O(n^3)

* [https://github.com/acdlite/react-fiber-architecture](https://github.com/acdlite/react-fiber-architecture)
* [https://legacy.reactjs.org/docs/reconciliation.html](https://legacy.reactjs.org/docs/reconciliation.html)
* [https://github.com/facebook/react/issues/6170](https://github.com/facebook/react/issues/6170)
* [A Survey on Tree Edit Distance and Related Problems](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)


# 权衡

  React 引入 VirtualDOM 及其出现，另外一个主要原因是 [React Native](https://reactnative.dev/docs/handling-text-input) 的存在。

  由于 VirtualDOM 的存在，使得 React UI 描述成为一种更为通用的存在，比如：NodeJS、Web、iOS、Android、PC Native 等等，可以做到 Learn once, write anywhere.

  这是【跨端需求、多端开发效率】与【单端性能、单端开发效率】之间平衡，并没有绝对的优劣，正如 VirtualDOM 的一棵树和二棵树的区别，也是一种平衡。

> Note that a virtual DOM is pure overhead if you already have a real DOM to work with.
> https://news.ycombinator.com/item?id=34616031


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
