---
layout: post
title:  "再谈 Virtual DOM（三）"
date:  2024-01-10
tags: [note]
---

  解决维护 DOM 问题的各种方案。
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

[Ember Glimmer](https://zhoukekestar.github.io/notes/2024/01/09/ember-glimmer.html)

