---
layout: post
title:  "理想中的组件化"
date:   2017-08-07
tags: [framework]
commentIssueId: 45
---

# 理想中的组件化
Chrome 54+ Only!

> 这个样例不太现实，这是面向未来编程！Yeah ~~ <br>
框架只是过客，标准才是未来。（此话略偏激，不用太在意）

# What's this?

这个一个我想象中的、理想的开发状态，用了最新的`组件化`去编写页面。 虽然，在实际项目中，可能并没有什么用，但目标总归在哪儿了。虽说，给人的感觉又是在造轮子，但我更愿意把他称之为：`拼积木`。把一些小而美的东西，拼接起一个更漂亮的东西。

PS: 就因为喜欢小而美的东西，老想着想把一些好玩东西，拆成小零件（比如：`vue` 抽取各种模块单独使用），汗，没想到，小时候拆收音机的习惯还在。。。

# 几点思考

我用 `Vue`, `React` 等框架的想法，或最看重他们的一些什么特点？
* 组件化，组件化，组件化
* 模板
* 数据流的管理，组件间的通讯
* 双向绑定
* Virtual Dom

## Virtual Dom

关于 `virtual dom`, 可能说是他们的一大亮点，也确实因为 `virtual dom` 把页面性能提高了很多。性能提高主要也有两点：
* 采用了 `AST` 去生成代码，并 `render` 出 `view`
* 采用 `diff` 算法，动态、局部更新 `view`

### AST
关于第一点，使用纯 `JS` 去构建一颗树，而不采用 `real dom` 的原因是，因为 `real dom` 有太多的属性和特性了，这点是 `W3C` 的标准，标准就定哪儿，没办法，使用了 `virtual dom` 后，因为可以去掉很多无用的属性，一些需要用到的，比如: `click`, 这些，也可以通过在 `AST` 上添加一个对象属性就完成了，所以，确实有优化很多。做了不少努力，也是值得肯定的。

如果像未来看，可能结果又不太一样了，随着浏览器性能的提升，正如 [`morphdom`](https://github.com/patrick-steele-idem/morphdom) 中说的（里面也有一个[性能对比图](https://github.com/patrick-steele-idem/morphdom#benchmarks)）：
> No, the DOM data structure is not slow. The DOM is a key part of any web browser so it must be fast. Walking a DOM tree and reading the attributes on DOM nodes is not slow. <br>
---- from https://github.com/patrick-steele-idem/morphdom#isnt-the-dom-slow

受他影响，我觉得，浏览器的 `dom` 以后应该不会太慢吧？ `Dom` 速度的优化应该交给浏览器去做，而不是框架层面。我也`盲目乐观`地想着：`Let Chrome do this, let it go.`。 当然，也给自己留了条后路，万一浏览器不实现呢？给个 `document.createVirtualDocumentFragment` 也行啊，留条活路啊！~


### diff

`diff` 算法是主要的功臣，要是浏览器原生实现的话，那就爽翻了，简直不敢想！回到现实，`diff` 还是需要的，可预见的未来，浏览器也不打算做这块。所以，在 `TemplateMustache` 的 `render` 函数中，可以用 `morphdom` 优化一下页面的渲染。

使用`morphdom`的前后对比：

![before](https://user-images.githubusercontent.com/7157346/28958284-55a214dc-7928-11e7-8a1b-681ce30e41f4.gif)

![after](https://user-images.githubusercontent.com/7157346/28958286-55cfdee4-7928-11e7-97b9-1c6eb71b3712.gif)


## 数据双向绑定

使用 `Object.defineProperty` 会有更好的兼容，如果兼容性要求比较高的话，还是用这个会比较好。但面向未来的话，在组件内部天然定义了 `set` 和 `get` 方法，可以对属性进行监控，从而对 `view` 进行更新。当然 `vue` 在这块做了很多工作，而 `WebComponents` 只是仅仅对组件属性可以做相应的 `observe`。

面向未来的话，还可以使用 `Proxy` 来进行双向绑定，从而也可以解决：
> 无法监听数据的 length，导致 arr.length 这样的数据改变无法被监听 <br>
通过角标更改数据，即类似 arr[2] = 1 这样的赋值操作，也无法被监听 <br>
参考：http://jiongks.name/blog/vue-code-review/

在源码中也可以写：

```js
await sleep();
letter.webcomponents.length = 4;
await sleep();
letter.webcomponents[0] = webcomponents[0];
```

## 数据流的管理

这个，`redux` 设计之初就是通用的，所以，直接拿来主义就行了，一个小而美的库。

`Todo`: 数据的修改通过 `store` 去 `dispatch` 数据，而不是直接修改数据，这是一个可优化选项。


## 模板

这个一个既轻松又沉重的话题。轻松是因为，官方给的标准就是一个 `template`, 很简单。沉重是，太简单而无法满足项目需求，而且，各种模板层出不穷。包括 `mustache`, `art-template`, `jade`, `pug`. 还有各个框架有各个框架的一套 `template` 语法。

我实际项目的升级改造中，`template` 语法的切换时一个大工作。就是因为没有统一的标准，也没被标准化，所以，这块其实是挺痛苦的。

在样例中，我采用了 `mustache` ，主要是因为它小巧，但不足也有，很多时候无法满足项目需求。

在模板语法的各种标准中，我会更倾向 `HTML-based` 或 `DOM-friendly` 的语法。虽然它不会像 `mustache` 那样去破坏 `HTML` 语法。但也会因此而破坏原有 `Element` 的属性标准。两者比起来，我会更倾向于后者。这个也是受 `Vue` 模板的影响。

这么想起来，对比`mustache`, `vue` 和 `polymer`:

* mustache

```
{ { # list } }
<li>{ { . } }</li>
{ { / list } }
```

* vue

```
<li v-for='item in list'>{{item}}</li>
```

* polymer

```
<template is="dom-repeat" items="{{employees}}">
  <div>{{item.first}}</div>
</template>
```

写到这儿，我有点想明白为什么 `polymer` 要这样做了，我也能隐隐约约能感受到，`polymer` 正推动着前端`标准模板`往哪儿方向走了。
* 破坏标准，肯定不行，`HTML` 和 `XML` 语法摆在哪儿
* 私有属性太多也不行，原有元素的属性已经够多了，还加模板语法？感觉也不太行的样子
* 所以。。。未来的模板标准会是 `polymer` 目前的样子吗？


## 组件化，组件化，组件化

这个，不用多说，标准已经定好了。在未来，无论是组件的可维护性，测试性，持久性，按标准来会有更好的前景。前段时间看了 `React` 能兼容 `WebComponents`, 也是蛮欣慰的。


# 最后一点

还有最后一个问题没写。我觉得好的地方。

## 变化中求不变

前端发展太快，需要学的东西也很多。想当初，`vue` 刚推出来哪会儿，几百的 `star` 的，大概看了一下当初简单的官网，主要就双向绑定功能，看上去感觉没什么（知道双向绑定，但没具体看源码）。双向绑定在哪会儿，概念也挺多了的，所以没在意。之后，随着它越来越火，看到了`组件化` 的概念，然后又接触了 `Custome Element v0`，然后就开始自己搞自己的组件化（在这儿就不献丑之前的源码了），基本上也就是 `html`, `css`, `js` 的混合。

然后，发现 `React`, `Polymer`, `WebComponents`等，发现，虽然他们框架，用法，语法都各异，但组件化的思想都一样。比如，我们可以类比`React`:
* `constructor` 都一样
* `extends React.component`, 和 `Fancybutton extends HTMLElementButton`
* `componentDidMount` 和 `connectedCallback`
* `componentWillUnMount` 和 `disconnectedCallback`
* `componentWillReviceProps` 和 `attributesCallback`

所以，在平时的学习，不变的就是标准的 `WebComponents`, 很多框架只是在 `WebComponents` 这个核心上，添加各种功能，锦上添花。所以，我觉得好的地方是：`抓住了核心不放松，任儿东西南北风`.

## 小而美

组件化中使用 `morphdom` 和 `mustache`, 数据流还可以用 `redux`, 我偏爱小而美的库。小而美的库，专注做自己本分的事，虽然大项目，大框架也会做大量测试，但总感觉小而美的库会更好，更易于测试。而且，比较重要的一点是，各个库相互隔离，且可替代。比如，不喜欢`mustache` 语法的话，可以选择其他模板语言，甚至是自己设计也行。

## 无编译

不用 `webpack`, 不用 `glup`, 不用 `grunt`, `rollup`, 只要浏览器，升级你的浏览器，买不了吃亏，买不了上当。。。`HelloWorld`, 写起代码就上浏览器！==

# 理想与现实

关于兼容这块，一直比较欠缺，也是比较抗拒去做一些 IE 上的兼容，实在被逼无奈也会硬着头皮上，查各种 IE hack手段。

我一直想象着，在面向小众系统的应用架构上，能使用最新的前端技术去解决问题。比如，公司内部的系统，要是能请个客，吃个饭，把用户群体的浏览器升级上去，解决浏览器升级的问题的话，那该会多好啊！

喂！醒醒吧！别睡了，该写你的 `vue` 代码了！

# References

* [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements)
* [mustache](https://github.com/janl/mustache.js)
* [morphdom](https://github.com/patrick-steele-idem/morphdom)
* [Custom Elements v1: Reusable Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
