---
layout: post
title:  "面向未来的中后台场景'伪'微前端几点想法"
date:  2020-06-08
tags: [js]
commentIssueId: 110
---



也聊 **Micro Frontends** 的落地和实践。

> 如有格式上的问题，可访问 [原文链接](https://zhoukekestar.github.io/notes/2020/06/08/micro-frontends.html)



## 什么是 Micro Frontends

来自 [**Michael Geers**](http://geers.tv/) 最 [具代表性的文章](https://micro-frontends.org/) 中提到，Micro Frontends 是：

> Techniques, strategies and recipes for building a **modern web app** with **multiple teams** that can **ship features independently**.

文中提到的 Micro Frontends 是一种能让 多团队进行独立特性部署的形式 来构建现代 web 应用的技术、策略 或 做法。

既然是技术、策略和做法，那我们把中后台拆成 npm 包的方式开发，也能成为某种意义上的 Micro Frontends，我们在组织层面上，做相关的划分，也是同样的影子，但是，这同时也将相关的问题锐化了。

这里就先重点从 Modern Web App 和 Multiple Team & Independently 展开聊一下。



#### Modern Web App

这里的现代 web 应用是什么？这个解释来自 [Sites vs. Apps defined: the Documents‐to‐Applications Continuum.](https://ar.al/notes/the-documents-to-applications-continuum/)

![](https://img.alicdn.com/tfs/TB1P0h.JpY7gK0jSZKzXXaikpXa-1606-412.png)

这里比较清晰地解释了 Documents 和 Applications 的区别，原来的 Web 是以内容、文档为中心的站点，而现在的 Web 是以用户行为为中心的应用。

这种变化也和互联网的发展有很大的关系，软硬件的发展，带动人机交互往更为复杂的方向发展，从原来的图片、文字、超链接，到现在的 Online-Plus-X，也让 Web 承担了更大的历史责任。



##### Old School

所以，虽然之前没有这个概念，但原有很多以内容为中心的 "Micro Frontends" 其实也是存在的，比如前后端耦合的时候，End-to-End 开发其实在某种意义上也是一种 “Micro Frontends”，DA - DAO - Service - Controller - View，这里特别说一下 View，当我们在 JSP 模板中使用以下语法的时候，是不是也是一种 "Micro Frontends" 呢？

```jsp
<jsp:include page="header"></jsp:include>
<jsp:include page="TeamA/main"></jsp:include>
<jsp:include page="footer"></jsp:include>
```

所以，社区有同学做了类似的尝试，[hinclude](https://github.com/mnot/hinclude)

```html
<script src="/lib/hinclude.js" type="text/javascript"></script>
<hx:include src="/other/document/here.html"></hx:include>
```

这也一种非常不错的尝试和实践。



##### 搭建

包括现在比较火热的搭建，特别是导购场景的页面搭建，其实也有 "Micro Frontends" 的影子，以组件为中心的开发模式，通过一个模块注册中心，在搭建平台进行拖拽，然后生成搭建 Schema，最后，无论是在编译时、运行时去解析并最终渲染成页面。这种方案，其实都挺成熟的了。比如：

```json
[{
	component: 'banner',
	props: { images: [...]}
},{
	component: 'offers',
	props: { list: [...]}
}]
```

这里的组件其实是能做到 `multiple teams that can ship features independently. ` ，并没有 “Micro Frontends” 所提到的问题。

但是注意一点，导购场景的搭建其实算是上面提到的 "content-centric"，而不是 "behaviour-centric"，但这么说，大家肯定会说，像云凤蝶、飞冰这种搭建方案，就是以 "bahaviour-centric" 为中心的 "modern web app" ？是不是就不需要 "Micro Frontends" 了呢？

但？构建现代应用的问题只有团队协同的问题吗？或搭建解决的核心问题，可能并不是团队协同、独立部署？





#### Multiple Team & Independently

为什么 **multiple teams** that can **ship features independently** 如此重要？前端到底怎么了？

 [Frontend Monolith](https://www.youtube.com/watch?v=pU1gXA0rfwc) 是目前前端遇到较为痛的点，看下面的一张图：

![](https://micro-frontends.org/ressources/diagrams/organisational/monolith-frontback-microservices.png)



我们可以看到，随着技术的发展，后端逐渐演化出 "Microservices" 的思路，最具代表性的就是 Spring Cloud、Dubbo、gRPC 等等，通过将原有的系统拆解为 Provider、Consumer，并由一个 Registry 来管理相关的服务注册、发现、调用等等。

后端通过这一套思路，能够非常丝滑地做拆分、扩展、复用，也有非常好的可测试性、CI/CD 的能力，成功地 Break the Monolith，但是前端呢？Frontend Monolith 依旧在哪里！

在就在呗，有啥问题吗？其实问题挺大的，最大的问题，莫过于前端软件的整体 「可维护性」以及「持续地可维护性」。

PS: 当然，如果，有些代码（比如导购场景的活动组件）可能就是用一次就丢的那种，就没那么必要。



## Micro Frontends 原则

同样来自官网的摘录：

* 技术无关性，你可以使用任何框架或库。

  >  有人会说，这个真的那么重要吗？会不会是一个伪诉求呢？统一技术栈并不是一件难事，老板一句话的事嘛！但我想表达一个观点，依旧从 “可维护性” 出发，框架统一是统一了，当下统一也是容易的事，但是未来呢？框架有 Breaking Change 呢？升还是不升？
  >
  > 所以，这里的技术无关，不仅仅是当下，选择 1 还是 选择 2 的问题，更有选择过去、现在、未来的问题。

* 团队代码独立。原则上不允许共享运行时库，即使是用同一个库，也不行！

  > 这里必须要遵循 [SCS ( Self-Contained Systems)](http://scs-architecture.org/)  原则，不依赖任何外部状态、运行时、库、全局变量等等。这里也会有很多疑问，`webpack externals`  多好啊，页面用同一个框架、UI 库，还省了好多网络带宽呢，为什么不让呢？
  >
  > 我的立场，必须 Self Contained，不然还是会打破 “可维护性”，无法做到 Independently, Micro Frontends 还是会成为一种幻想。 那复用、共享的事呢？目前来说有其他解法！

* 建立团队 Prefix，这是较为常见的约定，无论是 css、event、storage 等等，都用 prefix 划清界限。

  > 非常有必要，也是很 old school 的做法，没人不同意，但怎么用工程的手段，还是 Java 的包命名也好，前端需要一种方式来更好地做 namespace 落地。

* 用原生浏览器接口而不是自定义接口。

  > 这个，I can't agree anymore. 所有的软件，都有其周期，看很多框架火，也看很多框架落寞。当被几个框架洗礼后，才深知标准、规范的宝贵。如果框架能覆盖或伴随着应用软件生命周期，那也何尝不可。
  >
  > 当然，W3C 规范也有它的时间和生命周期，比如 font 标签这种，只是和框架比起来，它更具备可靠性、持续性。Long Live  W3C ~

* 构建弹性的站点

  > 这个要考虑 JS 不能运行的情况，这个，容我们再缓一缓，WebComponet 还没支持 SSR。



#### Frameworkless

这里再从原生接口的原则说起。

首先是一张来自 [Longevity (or Lack Thereof) in JavaScript Frameworks](https://www.bitovi.com/blog/longevity-or-lack-thereof-in-javascript-frameworks) 的图片

![](https://www.bitovi.com/hubfs/Imported_Blog_Media/Screenshot-2015-07-08-02_49_41.png)



放这张图，只想说明一个问题，框架有其自身的生命周期，而不是永远在哪儿屹立不倒，时代滚滚向前，不进步就意味着衰亡。



jQuery 的时代崛起，是原生 JS 比较难以处理不同浏览器之间的接口差异导致的，这是一段波折的历史。jQuery 事实上也推动了 web 标准更好地向前一步，但当规范趋于成熟时，jQuery 的时代便过去了，[You might not need jQuery](http://youmightnotneedjquery.com/) 这个网站，详细列举了如何用 Vanilla JavaScript 替换原来 jQuery 的写法。

在我看来 Vue、React 也是过渡的产物，他们都很好地推动了组件式的开发方式，以及如何拆解大型应用的方式，W3C 也在积极地吸收，推出 Custom Element，ES Module 等等的规范。

首先，我们必须积极肯定框架的时代意义，既然是热门，那么它必然是找到了开发者当下的痛点，以及给出了较好的解决之道。而这里的 Frameworkless 也不是一味地否定框架，而是从客观、事实的角度，以及从可维护性的角度出发，所以：

> 如何在 Framework 中汲取当下时代的先进性、以及如何保持软件长期的可维护性，这是一个值得我们深思的问题。



当然，社区有人也有类似的想法，比如：[**Frameworkless Movement**](https://www.frameworklessmovement.org/) 的运动，其中讨论了框架的技术债的问题，我们不排斥框架，Good Enough、可维护性是检验它好与坏不错的参考。





## Micro Frontends 理想画面

Frameworkless 是目标，我也希望正如和 PikaCDN 网站上所说的

> Move the Web Forward.

所以，我决定尝试最为理想的方式，直接上 WebComponet，以面向未来编程的视角来看现在的 Micro Frontends.

参考 MicroService，从 Provider、Consumer、Registry、BFF 几个方面来简单聊一聊。

* Provider：组件独立开发、部署
* Registry：需要 NPM 这种的注册中心吗？
* BFF：如何粘合 Provider
* Consumer：如何运行、消费、管理



#### Provider

对 Micro Frontends ，Provider 就是组件生产，这里需要解决

* 模块管理、复用
* 组件注册
* 框架、技术无关
* 组件打包工程、发布
* 依赖解析、管理

所以，我们做了以下尝试：

* 模块管理、复用，其实本身是个模块加载器的问题，我们之前有 require.js、sea.js 等等的管理，有 AMD、CMD、UMD 规范，但一旦采用某个模块加载器，整个应用都被这个加载器接管，这么重要的一个角色，浏览器有官方替代方案吗？答案是肯定的，ESM

  * [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
  * [What are CJS, AMD, UMD, and ESM in Javascript?](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm)

* 组件注册，在许多的 Micro Frontends 框架中，都有自己的一套注册系统，背后的原因其实就是为了磨平浏览器的兼容问题，和当前 jQuery 做的事的类型的。直接用 Custom Element V1 来注册，原生支持

  * [caniuse](https://caniuse.com/#feat=custom-elementsv1)

* 框架、技术无关，如果使用前面的模块管理和组件注册，其实技术无关是很自然的事

* 工程打包、发布，这里很感谢 [snowpack](https://www.snowpack.dev/) 给的灵感，通过 snowpack，无需 bundle 编译的过程，在本地进行快速的 bundle-less 部署。这里，我也很希望浏览器特性快速的弥补，能早日让 webpack 推出历史舞台。

* 依赖解析、管理，npm 转 esm 是件原来让我很头痛的事，这里很感谢有 PikaCDN 的存在，当然 unpkg 也有类似的功能。

  * [pika.dev](https://www.pika.dev/) 其中前文提到的 Move The Web Forward. 也来自于此，还有他们的使命也非常赞~ We're on a mission to make the web 90% faster.

    *  PS：90% 的网站代码来自开源社区，如果都用 PikaCDN 的话，这些 90% 的资源都将得到复用，而不是一个个的 bundle.

    * PPS: 作者非常赞，反馈的一个 CDN bug 解决非常之迅速！

      ![](https://img.alicdn.com/tfs/TB1umCEJrY1gK0jSZTEXXXDQVXa-1544-518.png)

  * unpkg CDN，通过制定 `?module` 参数，会自动映射为 esm 模块，比如 `https://unpkg.com/preact?module`



自此，Provider 的几个比较核心的问题，都有了相关解法。唯一的问题，是太依赖于浏览器，而不依赖于第三方 “垫片框架”，这在一定程度上导致了兼容问题，但从面向未来的角度和长期“可维护性” 的角度来看，这无疑是最佳的。

可能的代码如下：

```html
<script type="module">
  import React from "https://cdn.pika.dev/react@^16.13.1";
  import ReactDOM from "https://cdn.pika.dev/react-dom@^16.13.1";

  class ReactComp extends HTMLElement {
    connectedCallback() {
      ReactDOM.render(React.createElement('h1', {}, 'Hello React'), this)
    }
  }
  customElements.define('react-comp', ReactComp);
</script>
```



#### Registry

Dubbo 有注册中心，NPM 有包管理中心，Maven 也有类似的注册中心，我们为什么需要注册中心呢？

微服务的注册中心，承担这服务注册、发现、路由的角色，在 web 的视角看来，就是 DNS 和负载均衡的角色，Micro Frontends 中需要这样的角色吗？我们还需要 NPM 吗？

在 [Deno is a Browser for Code](https://kitsonkelly.com/posts/deno-is-a-browser-for-code/) 的文章中，答案是不需要，我们不需要一个中心化的注册中心，HTTP 就够了，这本身就具备去中心化的特性。

我们只需要一个在浏览器运行时，组件的注册中心即可，但组件本身的发现和注册，我们不希望有个中心化的平台，而是基于自由的、Decentralized 的 HTTP .



#### "BFF"

带引号的 “BFF”，对于微服务来说，BFF 是粘合的作用。对于 Micro Frontends，这层也是粘合的作用，如何将 Provider 进行 UI 级别的粘合，并最终呈现给用户页面。

目前来说，可能动态的 Manifest 声明是一种比较好的方式。目前 Manifest 的规范有：

* [App Manifest](https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/Firefox_OS_apps/Building_apps_for_Firefox_OS/Manifest)
* [Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest)
* [Web Extension manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)
* [webpack manifest](https://webpack.js.org/concepts/manifest/)

均无法满足 Micro Frontends 的诉求，而社区的相关实践还是比较有意思的，比如：

* [Aliyun Console OS](https://aliyun.github.io/alibabacloud-console-os/guides/intro) 的 `manifest.json`,（现在是 `page-data.json` ），这个有点类似我想要的了

  ```
  {
    componentChunkName: "xxx",
    path: "/path",
    result: {
      pageMeta: {
        sideNav: {...}
      },
      siteMeta: {
      	topNav: [{...}]
      }
    }
  }
  ```

* [mooa](https://github.com/phodal/mooa) 的 app.json，

  ```
  [
    {
      "name": "app1",
      "selector": "app-app1",
      "baseScriptUrl": "/assets/app1",
      "styles": [
        "styles.bundle.css"
      ],
      "prefix": "app/app1",
      "scripts": [
        "inline.bundle.js",
        "polyfills.bundle.js",
        "main.bundle.js"
      ]
    }
  ]
  ```

除去那些 React/Vue Router 的，我们希望做到技术无关，而不是将路由和某个框架强绑在一起。当然，当 Web App Manifest 和社区实践相结合的规范定了之后，相关的实现就可以多种多样了。



#### Consumer

这一层映射到 Micro Frontends，核心需要做的是 App Shell ，核心解决以下问题（额，我承认这一层的映射比较勉强）：

* 应用路由
* 组件加载和布局
* 管理生命周期
* 沙盒机制
* 通讯机制

相关解法：

* 应用路由。传统的后端路由，或 hash、history 的路由，核心目的是需要做路径和组件集的映射关系。对此两者都有优缺点，目前还无法下定论。

  > qiankun 2.0 带来的最大变化便是 qiankun 的定位将由 **微前端框架** 转变为 **微应用加载器**。
  >
  > 我觉得这个定位的变化，非常地切中要害，要是再将 manifest 规范化（定义好 interface），再将生命周期和 WebComponet 结合得更紧密、友好些，有望做成基础的 Universal 微应用加载器。

* 组件按需加载，这块需要依赖于 Manifest 的解析以及 Schema 本身的设计，目前还在探寻中，但组件的布局是另外一个比较有意思的话题。好在搭建的火热，带动了这块 schema 的规范制定和落地，也有 [Formily](https://github.com/alibaba/formily) 在表单布局领域的实践，如 MegaLayout

* 生命周期，相比比较流行的 Single-SPA 的 bootstrap、mount、unmount 的三种生命周期，个人更倾向于基于 [HTMLElement 的生命周期](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 管理。constructor、connectedCallback、disconnectedCallback、attributeChangedCallback 等等。而 Shell 对组件的挂在也十分简洁，通过原生 DOM API，`innerHTML` 或 `appendChild` 即可

  ```
  document.body.innerHTML = '<custom-element></custom-element>';
  document.body.appendChild(document.createElement('custom-element'));
  ```

* 沙盒机制，这块社区的经验比较多，Proxy、闭包、镜像、worker 等等，可以参考 [qiankun sandbox](https://github.com/umijs/qiankun/blob/master/src/sandbox/index.ts)

* 通讯机制，按照 Micro Frontends 的尽可能用原生接口的原则，其实用 CustomEvent 是不是就足够了？但从经验上来说，这可能是不太够的，相比较后端的架构而言，他们有 RocketMQ、MetaQ 等消息通讯中间件。

  所以，从通讯机制的设计上讲，CustomEvent 这种机制能满足大多情况，但还是非常不够的，比如：在微应用存在依赖以及先后顺序的情况下，如何保证消息至少消费一次、至多消费一次、广播、指定消费者等等。





## Micro Frontends 理想架构简易实践

* 技术、框架无关，在线 Demo：[multiple-frameworks](https://zhoukekestar.github.io/esm-demos/multiple-frameworks/index.html)，PS: 以下代码无需编译，可在浏览器直接运行

  * 同时使用 react 和 preact 框架，
  * 模块可复用
  * 无 webpack externals 的全局污染
  * 极强的可维护性

  ```html
  <react-comp></react-comp>
  <preact-comp></preact-comp>

  <script type="module">
  import React from "https://cdn.pika.dev/react@^16.13.1";
  import ReactDOM from "https://cdn.pika.dev/react-dom@^16.13.1";

  class ReactComp extends HTMLElement {
    connectedCallback() {
    	ReactDOM.render(React.createElement('h1', {}, 'Hello React'), this)
    }
  }
  customElements.define('react-comp', ReactComp);
  </script>

  <script type="module">
  import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

  class PreactComp extends HTMLElement {
    connectedCallback() {
    	render(html`<h1>Hello Preact!</h1>`, this)
    }
  }
  customElements.define('preact-comp', PreactComp);
  </script>
  ```

* 利用 Snowpack 的工程，并用 PikaCDN 的 ESM 能力，整合 AntD 组件实例

  源码参考： [snowpack-antd-webcom](https://github.com/zhoukekestar/esm-demos/tree/master/snowpack-antd-webcom)

  构建后的在线 Demo：[snowpack-antd-webcom](https://zhoukekestar.github.io/esm-demos/snowpack-antd-webcom/build/index.html)



## 参考

* [micro-frontends.org](https://micro-frontends.org/)

* [Frontend Monolith](https://www.youtube.com/watch?v=pU1gXA0rfwc)

* [frameworklessmovement](https://www.frameworklessmovement.org/)

* [Sites vs. Apps defined: the Documents‐to‐Applications Continuum.](https://ar.al/notes/the-documents-to-applications-continuum/)

* [Deno is a Browser for Code](https://kitsonkelly.com/posts/deno-is-a-browser-for-code/)

* 现有方案
  
  * [single-spa](https://single-spa.js.org/) 
  * qiankun [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
    * qiankun 2.0 [目标是最完善的微前端解决方案 - qiankun 2.0](https://www.atatech.org/articles/170069)
  * [ice](https://ice.alibaba-inc.com/)
* [mooa](https://github.com/phodal/mooa)
  * [hinclude](https://github.com/mnot/hinclude)
  * [console-os](https://github.com/aliyun/alibabacloud-console-os?) by Aliyun
  
* 工程侧依赖
  * [snowpack](https://www.snowpack.dev/)
  * [pika.dev](https://www.pika.dev/)

* 布局&中后台参考

  > 在我们看来，Micro Frontends 解决了部分问题，但中后台的大量工作集中在 Form 和 List，能用解耦的方式（JSON Schema）解决 From 和 List，提效也非常可观

  * [Formily](https://github.com/alibaba/formily)
  * [Alist](https://alistjs.netlify.app/)

* 样例代码：[ESM Demos](https://github.com/zhoukekestar/esm-demos)
