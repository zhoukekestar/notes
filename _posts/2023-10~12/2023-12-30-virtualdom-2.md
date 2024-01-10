---
layout: post
title:  "再谈 Virtual DOM（二）"
date:  2023-12-30
tags: [note]
---


  接上次 [再谈 Virtual DOM（一）](https://zhoukekestar.github.io/notes/2023/12/20/virtualdom.html)

* 背景：是从一开始的静态页面，发展到了 WebApp
* Web Application：WebApp 所遇到的问题和挑战
* 维护 DOM：是最大的挑战之一
* 更新 DOM：方案与优劣
* 编写 DOM：HTML 的进化


# 更新 DOM

  现代框架的主要工作之一，便是维护、更新 DOM，所以，不同的框架便有了不同的实现。VirtualDOM 只是其中之一。

  以下是现有主流框架对于更新 DOM 的不同实现：

### Virtual DOM (Facebook)

  此处挖坑

### Incremental DOM (Google)

  通过 `elementOpen`, `elementClose` 等函数，在真实 DOM 上做移动（比如 open 就进入子节点，close 就出子节点等等）、对比（tagname、属性是否相同等等）、标记（用于创建新节点、删除没有访问到的节点等等），将每次的 render 后的代码指令（就是 render 函数本身），通过 patch 做一步一步的执行，最终维护 DOM 的更新。

  此方案的优势，就是节省内存（相比 VDOM，基本没有额外的大内存开销），劣势是每次都要比对（相比 Lit），且无法有效复用节点，可以查看 [此视频](https://github.com/zhoukekestar/toy-lit-html/tree/main/idom)。

```js
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

  Lit 的 DOM 维护，在目前这个时间点，个人看来是最优的，也是个人近期项目用的最多的方式。Demo 如下：

```js
import { html, render } from './lit.js';

const helloTemplate = (name1, name2) => html`
  <div>hi ${name1} !</div>
  <div>hello ${name2} ?</div>
`

render(helloTemplate('foo', 'bar'), document.body)
```

  Lit 总体上看，和 Chrome 浏览器（或者说是标准浏览器接口）做了非常多的复用，使得整体框架非常的简约、优雅。

* 首先是使用 `Template Literals` 创建模板（strings、values）
  * [Tagged Templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)
* 通过 `<template>` 创建并解析生成 DOM
* 然后使用 `document.createTreeWalker` 的 walker 遍历一次 template 中的变量
* `document.importNode` 到渲染容器中，绑定 template 中的变量（引用并放置到数组中），并做实时的更新
* 后续的所有更新，直接拿 `Tagged Templates` 的 values 数组，即可做到索引级的更新
  * 无需对比 diff、无需 patch、无额外高内存消耗

  可以查看一下 [toy-lit-html](https://github.com/zhoukekestar/toy-lit-html) 源码，查看 Demo 的运行逻辑。

* https://zhoukekestar.github.io/notes/2023/12/24/lit-html-flow.html
* https://github.com/zhoukekestar/toy-lit-html
* https://lit.dev/docs/templates/overview/



### 其他

Ember Glimmer

  使用 Handlebars 模板编写:

```hbs
<div>
  <p>{{this.count}}</p>
  <button type="button" {{on "click" this.increment}}>+1</button>
  <button type="button" {{on "click" this.decrement}}>-1</button>
</div>
```

  并用 glimmer 组件进行 client 渲染和处理

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CounterComponent extends Component {
  @tracked count = 0;

  @action
  increment() {
    debugger;
    this.count = this.count + 1;
  }

  @action
  decrement() {
    this.count = this.count - 1;
  }
}
```



  ![image](https://github.com/zhoukekestar/notes/assets/7157346/e6250507-f0fc-4e21-a7f7-4557a37486bd)


  [@glimmer/compiler](https://github.com/glimmerjs/glimmer-vm/blob/2ddbbc4a9b97db4f326c4d92021f089c464ab093/packages/%40glimmer/compiler/test/compiler-test.ts)

  https://github.com/glimmerjs/glimmer-vm/blob/2ddbbc4a9b97db4f326c4d92021f089c464ab093/packages/%40glimmer/validator/lib/meta.ts#L19
  *

  * Stream Tree

* React Virtual DOM
* Vue Virtual DOM

# 编写 DOM：HTML 的进化

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
