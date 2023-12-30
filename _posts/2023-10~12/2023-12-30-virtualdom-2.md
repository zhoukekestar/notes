---
layout: post
title:  "再谈 Virtual DOM（二）"
date:  2023-12-20
tags: [note]
---


  接上次 [再谈 Virtual DOM（一）](https://zhoukekestar.github.io/notes/2023/12/20/virtualdom.html)

* 背景：是从一开始的静态页面，发展到了 WebApp
* Web Application：WebApp 所遇到的问题和挑战
* 维护 DOM：是最大的挑战之一
* 更新 DOM：方案与优劣


# 更新 DOM

  现代框架的主要工作之一，便是维护、更新 DOM，所以，不同的框架便有了不同的实现。VirtualDOM 只是其中之一。

  以下是现有主流框架对于更新 DOM 的不同实现：

### Virtual DOM (Facebook)



### Incremental DOM (Google)

  通过 `elementOpen`, `elementClose` 等函数，在真实 DOM 上做移动（比如 open 就进入子节点，close 就出子节点等等）、对比（tagname、属性是否相同等等）、标记（用于创建新节点、删除没有访问到的节点等等），将每次的 render 后的代码指令（就是 render 函数本身），通过 patch 做一步一步的执行，最终维护 DOM 的更新。

  此方案的优势，就是节省内存（相比 VDOM），劣势是每次都要比对（相比 Lit），且无法有效复用节点，可以查看 [此视频](https://github.com/zhoukekestar/toy-lit-html/tree/main/idom)。

```
var data = {
  text: 'Hello World!',
  someCondition: true
};

function render(data) {
  elementVoid('input', '', [ 'type', 'text' ]);
  elementOpen('div', '', null);
    if (data.someCondition) {
      text(data.text);
    }
  elementClose('div');
}

patch(document.body, function() {
  render(data);
});

```

* https://github.com/google/incremental-dom
* https://auth0.com/blog/incremental-dom/
* https://github.com/zhoukekestar/toy-lit-html/tree/main/idom
* https://www.reddit.com/r/Angular2/comments/8ytfc1/reacts_virtual_dom_vs_angulars_change_detection/


### Lit DOM (Google)

  Lit 的

* https://zhoukekestar.github.io/notes/2023/12/24/lit-html-flow.html
* https://github.com/zhoukekestar/toy-lit-html
* https://lit.dev/docs/templates/overview/



### 其他

* Ember Glimmer
  * Stream Tree
  * https://auth0.com/blog/face-off-virtual-dom-vs-incremental-dom-vs-glimmer/
  * https://engineering.linkedin.com/blog/2017/06/glimmer--blazing-fast-rendering-for-ember-js--part-2
* React Virtual DOM
* Vue Virtual DOM

# HTML 的进化

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
