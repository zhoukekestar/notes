---
layout: post
title:  "笔记：阿里、网易、滴滴共十次前端面试碰到的问题"
date:   2017-06-07
tags: [interview]
commentIssueId: 17
---

## 前言
虽然我很讨厌[whiteboards](http://zhoukekestar.github.io/notes/2017/03/16/hiring-without-whiteboards.html)面试，但我还是决定整理一下。毕竟，作为几年前端的我，看到这些题目确实有点虚。。。一直在创业公司工作，知识体系的特点是大、散、浅，来一个问题，解决一个问题，然后没后续了 。相比大企业的小、专、精，还是需要努力努力的（如果有想转大公司的想法的话）。

关于这种 whiteboards 面试，我的态度是：给我Google，我能给你一个更满意的答案。

文章来源: [阿里、网易、滴滴共十次前端面试碰到的问题](https://segmentfault.com/a/1190000009662029)

文章还是编辑修改中，由于内容太多了，欢迎一起编辑讨论

## HTML5新增了哪些内容或API，使用过哪些

参考Wiki上对[HTML5](https://zh.wikipedia.org/wiki/HTML5)的解释, 你可以查看一下[W3C school](http://www.w3school.com.cn/html5/index.asp) 的内容
  * 在API层，HTML5 增加了更多样化的`应用程序接口`
    * `canvas`: 用来写游戏还是很不错的，推荐开源游戏框架：[pixi.js](https://github.com/pixijs/pixi.js)
    * `离线`: 想起 Cache Manifest , 和 Cache APIs 。如果再加上 Service Worker 的特性，想想还有点小兴奋的。
    * `拖放`: Drag & Drop , 对用户体验有很大的提升。推荐开源库：[dragula](https://github.com/bevacqua/dragula)
    * `历史`: 简而言之就是可以使用`history`对象控制 url 地址了，一般会被单页应用用作路由控制，如果不支持，然后降级为hash。[具体的接口点这里](https://developer.mozilla.org/en-US/docs/Web/API/History)
    * `网络存储`: `sessionStorage` & `localStorage` ，这个应该不陌生，一些大的数据需要保存，或者不适合放在Cookie的，就用网络存储。 类似的还有 `IndexedDB` 和 `WebSQL`。 推荐开源库：[localForage](https://github.com/localForage/localForage)
    * 还有更多的，就看 [wiki](https://zh.wikipedia.org/wiki/HTML5) 吧
  * 元素与属性，这个在wiki上讲的还是挺清楚和简单明了的
    * 新元素:
      * `<section>` 写文章的时候会经常用到，w3school的说法是：[文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。](http://www.w3school.com.cn/tags/tag_section.asp)
      * `<video>` 和 `<audio>` 这个也不用多说，需要用到，自然而然会去用。相关开源库：[video.js](https://github.com/videojs/video.js)
      * `<footer>` 和 `<header>` 这个也很自然，把之前`<div class='footer OR header'></div>` 换成html5 标签就行了，这样是为了`语义化`，也是推荐这样做的。
      * `<mark>` 标记高亮一个词
      * `<datalist>` 这个挺好用的，可以看一下 w3school 的 [demo](http://www.w3school.com.cn/tiy/t.asp?f=html5_datalist)，可以提醒用户可以输入哪些。
      * 还有一些 `<nav>` 表示导航，还要更多的标签，一切都是为了写出更好的 HTML ，为了语义化。这儿对于 JS 大行其道有个个人观点：
        > 能用HTML写，绝不用CSS和JS，能用CSS写，绝不用JS，只能用JS的，才用JS。对于 JS去写CSS，甚至HTML，我是不赞成的。

## input和textarea的区别

参考了[一篇博客](http://www.cnblogs.com/abcd1234/p/4709486.html) 和 [stackoverflow上的回答](https://stackoverflow.com/questions/21698065/whats-the-difference-between-textarea-and-input-type-text-in-angularjs)

不同：

`input`, [详细文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
  * 可以指定 type 为 url, email, 可以方便地检测用户输入。还是指定为 file, submit, button, checkbox, radio, datetime, color等，改变`input`的样式和行为。
  * 输入初始化需要用value指定属性值
  * 宽高只能通过css指定

`textarea`, [详细文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
  * 可以输入多行文字
  * 输入值初始化需要用标签对包裹，并可以夹杂 HTML 代码，而不会被浏览器解析（这个蛮好用的）
    ```html
    <textarea><h1>h1</h1></textarea>
    ```
  * 宽高能用 CSS 或 `rows`, `cols` 指定

相同：
  * 都可以使用 `maxlength`, `minlength`等限制输入

## 用一个div模拟textarea的实现

这个，貌似加个 contenteditable 就可以了，不知道是不是出题人的意思。

在项目中如果需要用到富文本，在 Github 中搜索 `rich editor` 就行了，或者搜索 `WYSIWYG` (what you see is what you get), 百度的 [ueditor](http://ueditor.baidu.com/website/umeditor.html) 也是不错的。

## 左右布局：左边定宽、右边自适应，不少于3种方法
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
  * absolute + padding
    ```html
    <div class='example-1 auto-width'>
      <style>
        .example-1 {
          position: relative;
          height: 100px;
          width: 300px;
          padding-left: 100px;
        }
        .example-1 .left {
          position: absolute;
          width: 100px;
          left: 0;
          height: 100%;
          background: #0f0;
        }
        .example-1 .right {
          background: #f00;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```
    <div class='example-1 auto-width'>
      <style>
        .example-1 {
          position: relative;
          height: 100px;
          width: 300px;
          padding-left: 100px;
        }
        .example-1 .left {
          position: absolute;
          width: 100px;
          left: 0;
          height: 100%;
          background: #0f0;
        }
        .example-1 .right {
          background: #f00;
          width: 100%;
          height: 100%;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
  * flex，趋势，推荐!
    ```html
    <div class='example-2 auto-width'>
      <style>
        .example-2 {
          display: flex;
          height: 100px;
          width: 300px;
        }
        .example-2 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
        }
        .example-2 .right {
          background: #f00;
          height: 100%;
          flex-grow: 1;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```
    <div class='example-2 auto-width'>
      <style>
        .example-2 {
          display: flex;
          height: 100px;
          width: 300px;
        }
        .example-2 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
        }
        .example-2 .right {
          background: #f00;
          height: 100%;
          flex-grow: 1;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
  * table，我实在想不出来了，凑合着使吧（为了做题目而做题目）
    ```html
    <div class='example-3 auto-width'>
      <style>
        .example-3 {
          display: table;
          height: 100px;
          width: 60%;
        }
        .example-3 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          display: table-cell;
        }
        .example-3 .right {
          background: #f00;
          height: 100%;
          display: table-cell;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```
    <div class='example-3 auto-width'>
      <style>
        .example-3 {
          display: table;
          height: 100px;
          width: 60%;
        }
        .example-3 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          display: table-cell;
        }
        .example-3 .right {
          background: #f00;
          height: 100%;
          display: table-cell;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>

  * float 解决方案
    ```html
    <div class='example-4 auto-width'>
      <style>
        .example-4 {
          height: 100px;
          width: 300px;
        }
        .example-4 .left {
          float: left;
          width: 100px;
          height: 100%;
          background: #0f0;
        }
        .example-4 .right {
          background: #f00;
          overflow: hidden;
          height: 100%;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```

    <div class='example-4 auto-width'>
      <style>
        .example-4 {
          height: 100px;
          width: 300px;
        }
        .example-4 .left {
          float: left;
          width: 100px;
          height: 100%;
          background: #0f0;
        }
        .example-4 .right {
          background: #f00;
          overflow: hidden;
          height: 100%;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
  * 参考：[alonia](http://blog.csdn.net/alonia/article/details/50957511), `calc` 属性！

    ```html
    <div class='example-5 auto-width'>
      <style>
        .example-5 {
          height: 100px;
          width: 60%;
        }
        .example-5:after {
          clear: both;
        }
        .example-5 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          float: left;
        }
        .example-5 .right {
          background: #f00;
          height: 100%;
          width: calc(100% - 100px);
          float: right;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>
    ```
    <div class='example-5 auto-width'>
      <style>
        .example-5 {
          height: 100px;
          width: 60%;
        }
        .example-5:after {
          clear: both;
        }
        .example-5 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          float: left;
        }
        .example-5 .right {
          background: #f00;
          height: 100%;
          width: calc(100% - 100px);
          float: right;
        }
      </style>
      <div class='left'>left</div>
      <div class='right'>right</div>
    </div>

## CSS3用过哪些新特性

关于CSS3，可以先查看一下[文档](https://developer.mozilla.org/en/docs/Web/CSS/CSS3)

新特性有：
  * `border-radius` 圆角, `@font-face` 字体, `box-shadow` `text-shadow` 文本和框的阴影
  * `word-wrap`, `background-size`, `background-origin`, `border-image`, `box-sizing`, `calc`, `linear-gradient` 等等
  * `transform` 转换
    * 2D 转换
      * `rotate` 旋转，图片转个90或180度什么的
      * `translate` 位置移动
      * `scale`, `skew`, `matrix` 等
    * 3D 转换
      * `rotate(XYZ)` 根据x,y,z轴旋转
      * `translate(XYZ)`, `scale(XYZ)` 同理
      * `perspective` 透视，这个很多3D效果都要设置一下，不然3D还是会"2D"的效果
  * `transition`: 过渡，好多简单的动画，移个位置，变个长短，其实直接用这个属性去设置就行了
  * `animation`: 动画，3D可以调用硬件渲染。
  * 定义了新的相对字体长度单位：`rem` 和 `ch` ，相对视口长度单位：`vw`，`vh`，`vmax` 和 `vmin` 。
  * 通过 CSS `@font-face` @ 规则来支持可下载字体。
  * `clip-path`: 绘制路径，类似`SVG`技术。 [国外炫酷产品](http://species-in-pieces.com/)。
  * `flex`: `flex`布局，继 `table` 和 `div` 后的趋势，不了解或不熟悉的可以参考[cssreference](http://cssreference.io/flexbox/)。
  * 伪类选择器：如:`:target`, `:enabled`, `:disabed`, `:first-child`, `last-child`等等
  * `@media` 媒体查询，适用于一些响应式布局中
  * `column`: 分栏布局。
  * `will-change`: 改善渲染性能, 参考[使用CSS3 will-change提高页面滚动、动画等渲染性能](http://www.zhangxinxu.com/wordpress/2015/11/css3-will-change-improve-paint/)


具体查看[文档](https://developer.mozilla.org/en/docs/Web/CSS/CSS3)，或 Google 吧

## BFC、IFC

`BFC`: 'Block Formatting Context', BFC 表现原则: 内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素,自成一方天地。


`IFC`: Inline Formatting Contexts, 直译为"内联格式化上下文",个人理解为`行内盒子模型`。

参考：[深入理解流体特性和BFC特性](http://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)，
[css行高line-height的一些深入理解及应用](http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/)

## 对栅格的理解
以规则的网格阵列来指导和规范网页中的版面布局以及信息分布，更利于代码层的开发和维护工作。

## 水平居中有哪些实现方式
* `<center>` (不推荐使用，遵循 HTML 样式分离)
  ```html
  <center>center</center>
  ```
  <center>center</center>
* `margin`
  ```html
  <div style='width: 3em; margin: 0 auto;'>margin<div>
  ```
  <div style='width: 3em; margin: 0 auto;'>margin<div>

* `text-align` (兼容性佳, 包括IE6, IE7)
  ```html
  <div style='text-align: center'>
    <span>text-align</span>
  </div>
  ```
  <div style='text-align: center'>
    <span>text-align</span>
  </div>

* `table + margin` ( 兼容性佳， IE8+ )

  `display: table` 在表现上类似 block 元素，但是宽度为内容宽。无需设置父元素样式。
  ```
  <div>
    <div style='display: table; margin: 0 auto;'>table + margin</div>
  </div>
  ```
  <div>
    <div style='display: table; margin: 0 auto;'>table + margin</div>
  </div>
* `transform`
  ```
  <div>
    <div style='position: relative; left: 50%; transform: translateX(-50%); display: inline-block;'>transform</div>
  </div>
  ```
  <div>
    <div style='position: relative; left: 50%; transform: translateX(-50%); display: inline-block;'>transform</div>
  </div>

* `flex + justify-content`
  ```html
  <div style='display: flex; justify-content: center;'>
    <div>flex</div>
  </div>
  ```
  <div style='display: flex; justify-content: center;'>
    <div>flex</div>
  </div>

## 1像素边框问题
这个我默认是移动端的问题好了。由于移动端一般都会设置屏幕宽度为设备宽度，`width=device-width,initial-scale=1`, 而有些屏幕是2倍屏，导致在移动端上设置`1px`就是看上去的`2px`。

解决方法：
* 通过`transform`将宽度缩小一半，`transform:scaleY(0.5)`
* 通过`@media`媒体查询，查询当前设置的屏幕倍率，统一设置`transform`, 参考: [移动端(手机)1像素边框真正实现](http://blog.csdn.net/zfangls/article/details/53338665)
* 模仿淘宝(不确定是不是来自淘宝的)，设置屏幕宽度为设计师的设计尺寸(一般为750)。程序员：设计师，我可都是按你的标准来的哦~
  ```html
  <meta name="viewport" content="width=750, user-scalable=no">
  ```

## 图片懒加载
实现过一个简单的[图片懒加载](https://github.com/zhoukekestar/modules/blob/master/src/lazyload/lazyload.js)工具。支持 `<img>` 和 `background-image`

核心代码时检测当前元素是否在当前视图中：
```js
function elementInViewport(el) {
    var rect = el.getBoundingClientRect()

    // For invisible element.
    if (rect.top + rect.bottom + rect.left + rect.right + rect.height + rect.width === 0) {
      return false;
    }

    return (
       rect.top   >= 0
    // Pre load.
    && rect.top   <= ((window.innerHeight || document.documentElement.clientHeight) + 100)
    && rect.left  >= 0
    // Hide carousel except the first image. Do not add equal sign.
    && rect.left  < (window.innerWidth || document.documentElement.clientWidth)
    )
  }
```

## 实现页面加载进度条
这个需要描述一下[PACE](https://github.com/HubSpot/PACE/)的实现原理。
* AJAX
* Elements
* Document
* Event Lag

## 事件委托
利用`事件冒泡`和`e.target`来确定事件和元素。在`jQuery`中有`$.delegate`方法去代理事件。使用委托代理的原因：
* 需要绑定事件的元素很多，且处理逻辑类似。
* 元素是动态创建，或频繁增加、删除，导致元素绑定事件过于复杂的。

```js
// 参考 https://github.com/zenorocha/delegate/blob/master/src/delegate.js
const delegate = (element, selector, type, callback) => {
  element.addEventListener(type, (e) => {
    let target = e.path.find(ele => ele.matches(selector))
    if (target) {
      callback.call(element, e);
    }
  });
};
```

## 实现 extend 函数
浅拷贝使用 `Object.assign` 就够了，大多数情况下，使用该方法。

深拷贝: (参考: [zepto extend](https://github.com/madrobby/zepto/blob/master/src/zepto.js#files))
```js
var class2type = {}
function type(obj) {
  return obj == null ? String(obj) :
    class2type[toString.call(obj)] || "object"
}
function isFunction(value) { return type(value) == "function" }
function isWindow(obj)     { return obj != null && obj == obj.window }
function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
function isObject(obj)     { return type(obj) == "object" }
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
}
var isArray = Array.isArray ||
    function(object){ return object instanceof Array }

function extend(target, source, deep) {
  for (key in source)
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key]))
        target[key] = {}
      if (isArray(source[key]) && !isArray(target[key]))
        target[key] = []
      extend(target[key], source[key], deep)
    }
    else if (source[key] !== undefined) target[key] = source[key]
}
```

直接 `Clone` 一个 `Nested Object` 的简便方法:
```js
var origin = {"a": "a"}
var copy = JSON.parse(JSON.stringify(origin));
```

## 为什么会有跨域的问题以及解决方式

参考[前端解决跨域问题的8种方案](http://blog.csdn.net/joyhen/article/details/21631833), [HTTP访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS), [浏览器的同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

> 出于安全考虑，浏览器会限制从脚本内发起的跨域HTTP请求。例如，XMLHttpRequest 和 Fetch 遵循同源策略。

> 同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。

* JSONP(JSON with Padding)
* CORS(Cross-Origin Resource Sharing)
* WebSockt

## JSONP原理、postMessage原理
参考[can-anyone-explain-what-jsonp-is-in-layman-terms](https://stackoverflow.com/questions/3839966/can-anyone-explain-what-jsonp-is-in-layman-terms)
* `JSONP` 原理是加在一个 `script`，并执行一段回调 JS ，因为加载 JS 是没有跨域问题的，但由此也带来了`JSONP`的一些问题
  * 无法发送特定的头部
  * 只能是 GET 请求
  * 无法发送 body
* [postMessage 文档](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)

## 拖拽功能
比如把5个兄弟节点中的最后一个节点拖拽到节点1和节点2之间

```html
<ul id='drag'>
  <li draggable="true">1</li>
  <li draggable="true">2</li>
  <li draggable="true">3</li>
  <li draggable="true">4</li>
  <li draggable="true">5</li>
</ul>
<script>
  var ele;
  document.querySelector('#drag').addEventListener('dragstart', function (e) {
    ele = e.target;
    ele.classList.add('draging');
  })
  document.querySelector('#drag').addEventListener('dragover', function (e) {
    e.preventDefault();

    if (e.target.nodeName === 'LI') {
      e.target.parentNode.insertBefore(ele, e.target);
    }
  })
  document.querySelector('#drag').addEventListener('drop', function (e) {
    ele.classList.remove('draging');
  })
</script>
```

<style>
  #drag {
    margin: 10px 0;
    padding: 0;
    border: dashed 2px #ccc;
  }
  #drag li {
    background: #f00;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 10px;
    display: inline-block;
    color: #fff;
  }
  #drag li.draging {
    opacity: .3;
  }
</style>
<ul id='drag'>
  <li draggable="true">1</li>
  <li draggable="true">2</li>
  <li draggable="true">3</li>
  <li draggable="true">4</li>
  <li draggable="true">5</li>
</ul>
<script>
  var ele;
  document.querySelector('#drag').addEventListener('dragstart', function (e) {
    ele = e.target;
    ele.classList.add('draging');
  })
  document.querySelector('#drag').addEventListener('dragover', function (e) {
    e.preventDefault();

    if (e.target.nodeName === 'LI') {
      e.target.parentNode.insertBefore(ele, e.target);
    }
  })
  document.querySelector('#drag').addEventListener('drop', function (e) {
    ele.classList.remove('draging');
  })
</script>

## 动画

#### `setTimeout` 何时执行:

关于`setTimeout`, `Promise`, `Events Loop`等概念的执行，推荐: [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

#### `requestAnimationFrame`的优点
按照[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)的说法:
> window.requestAnimationFrame() 方法告诉浏览器您希望执行动画，并请求浏览器调用指定的函数在下一次重绘之前更新动画。该方法将在重绘之前调用的回调作为参数。

它的主要优点是：
* 在浏览器重绘前调用，保证浏览器渲染效率和性能
* 可以精准地控制动画的每一帧

它的主要场景在游戏，动画方面，用这个方法可以保持较高帧率和效率。比如一个60帧率的游戏，`requestAnimationFrame`一般会以16ms的间隔调用一次。


PS: 关于`Event Loop`, `Tasks`,` Microtasks`, `JS Stack`, `Queue`等概念及执行先后顺序，我也是记不清，文章看过一次，记一次，然后又忘了。说实话，主要是实践中用得太少了。

## 手写 parseInt 的实现
要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()

==, 这题目，我都不知道我在干什么，为什么不用Number....

```js
const parseInt = (str) => {
  let n = 0;
  let i = 1;
  str.split('').reverse().map(s => {
    n += i * (s.charCodeAt(0) - 48);
    i *= 10;
  })
  return n;
}
```

@YAOHAO9 提供的方法
```js
const parseInt = str => str - 0;
const parseInt = str => str / 1;
const parseInt = str => str * 1;
```
此外，通过`+`运算也能得到类似的效果：
```js
const parseInt = str => +str;
```


## 分页器组件
为了减少服务端查询次数，点击“下一页”怎样能确保还有数据可以加载（请求数据不会为空）？

这是在考服务端吗？还是我没有理解对题目？
* 服务器需要返回总数，当前偏移量，没毛病吧。。。
* 或者，参考微信的接口，给一个下一页的起始项的id，如果当前页最后一个id和下一页起始id相同，就是最后一页。

## ES6新增了哪些特性

这个直接参考[ECMAScript 6 入门](http://es6.ruanyifeng.com/)吧

## require.js的实现原理

require.js 实现原理

### 与webpack相比，两者打包的异同及优缺点
同：
* 都以模块化方式组织代码

异：
* requirejs 只能加载JS文件
* webpack 可以打包JS，CSS，甚至是图片


与webpack相比，两者打包的异同及优缺点

## Promise 的实现原理

Promise 简易实现, 参考: [Promise简单实现](http://www.jianshu.com/p/473cd754311f)
```js
/*
 * 注意！ 本样例为了最简化，未添加reject, all, rece等功能
 * 完整的Promise实现可参考：https://github.com/taylorhakes/promise-polyfill/blob/master/promise.js
 */
class MyPromise {
  constructor (fn) {
    this.deferreds = [];
    this.state = 'pending';

    // 创建完Promise后，需要异步执行回调
    setTimeout(() => {
      fn(this.resolve.bind(this));
    }, 0);

    return this;
  }
  resolve(value) {
    this.state = "fulfilled";
    // 所有回调执行完成
    if (this.deferreds.length === 0) return;

    let result = this.deferreds.shift()(value);
    // 回调后返回新的Promise，需要将后续的回调复制给新Promise
    if (result instanceof MyPromise) {
      result.deferreds = this.deferreds;
      return result;
    }
    // 返回如果不是Promise，则异步执行下一个回调
    setTimeout(() => {
      this.resolve()
    }, 0)
  }
  // then就是不断push回调函数
  then(fn) {
    this.deferreds.push(fn);
    return this;
  }
}

// 以下是测试样例
new MyPromise((resolve) => {
  setTimeout(() => {
    resolve('first promise')
  }, 1000)
}).then(v => {
  console.log(v)
  return new MyPromise(resolve => {
    setTimeout(() => {
      resolve('second promise')
    }, 1000)
  })
}).then((v) => {
  console.log(v);
}).then(v => {
  console.log(v)
})
/*
输出：
first promise
second promise
undefined
 */
```

## 进一步会问 async、await 是否使用过

async & await 异步代码书写十分优雅，例如
```
async function () {
  let file = await readFile('xxx');
  console.log(file.toString());
}
```
看起来完全是同步的书写方式，解决了异步代码中
* 开发者需要不断跳跃的阅读异步代码
* 回调地狱

参考: [Try-node7-async-await](http://zhoukekestar.github.io/notes/2017/03/03/Try-node7-async-await.html)

## 实现 gulp 的功能

这题我就当是在考`Stream`这个知识点了。

```js
const fs = require('fs');
const { Transform } = require('stream');
class Uglify extends Transform {
  constructor(options) {
    super(options);
  }
  _transform(chunk, encoding, callback) {
    this.push(`${chunk}\n // This file is uglified. this.push.`);
    // callback(null, `${chunk}\n // This file is uglified. callback.`);
  }
};

const glup = {
  stream: null,
  src(p) {
    glup.stream = fs.createReadStream(p);
    return glup;
  },
  pipe(fn) {
    return glup.stream.pipe(fn);
  },
  dest(p) {
    return fs.createWriteStream(p);
  },
}

glup.src('test.js')
  .pipe(new Uglify())
  .pipe(glup.dest('test.min.js'));

```

## 使用框架 ( vue / react 等)带来好处( 相对jQuery )
* MVVC 的好处

## vue双向数据绑定的实现
* `Object.defineProperty`
* `Proxy`

推荐: [vue2.17源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)

参考: [observer](http://zhoukekestar.github.io/notes/2017/02/22/observer.html)

## 单页应用，如何实现其路由功能
* Hash
  ```js
  window.addEventListener('hashchange', () => {
    // 隐藏其他页面
    Array.from(document.querySelectorAll('.page')).map(page => {
      page.style.display = 'none';
    });
    // 根据hash值显示对应的页面
    document.querySelector(location.hash).style.display = 'block';
  });
  // 参考：https://github.com/zhoukekestar/modules/blob/master/src/views/views.js
  ```
  使用`HASH`实现的简单路由，[在线测试](http://zhoukekestar.github.io/modules/src/views/index.html)
* History
  ```js
  // push 页面
  history.pushState('', '', url);
  // pop 页面
  window.onpopstate = (e) => {
  };
  // 参考：https://github.com/zhoukekestar/modules/blob/master/src/loadpage/loadpage.js
  ```
  使用`History`实现的简单路由, [在线测试](http://zhoukekestar.github.io/modules/src/loadpage/demo1.html)

## 项目中使用过哪些优化方法
* 页面静态化，（如：Jada, Pug在静态编译后部署）
* `CDN`加速, 多地缓存
* 前端渲染 (Data + View) / 后端渲染( SSR, SEO 等), 视具体情况选择，如：
  * 前端渲染，适合大流量的场景
  * 后端渲染，适合SEO优化，用户体验提升等场景
* 缩减域名，以减少`DNS`解析时间，（可采用`<link rel="dns-prefetch" href="//xxx.com">`进行优化）
  * 如果遇到域名解析的问题，可尝试`HTTPDNS`方案
* `Combo`服务器合并`CSS`，`JS`请求, 减少第一屏网络请求。（如果采用`HTTPS`方案，资源合并可省略）
* 异步加载`非核心业务`和`逻辑资源`
* 资源和请求[缓存](http://zhoukekestar.github.io/notes/browser/cache/last-modified/expire/2016/10/06/browser-cache.html)，可参考缓存的答案
  * `Cache-Control`/`Expires` 前端缓存
  * `Last-Modified`/`Etag` 服务器端缓存，304
* 如果是和`Native`混合开发的，还可以使用`Native`缓存
* `DNS`就近解析应用服务器，需要和`CDN`配合使用


## 输入一个URL，Enter之后发生了什么
此答案忽略了与Web关联性不大的回答，包括（物理按键原理，系统中断等）
* 浏览器解析`URL`, 如: `https://www.google.com.hk/#newwindow=1&q=hello`包括
  * 协议：`http`, `https`等
  * 域名：`www.google.com.hk`
  * 资源路径: `/`
  * 参数查询：`q=hello`, 关键词`hello`
* DNS
  * 浏览器 DNS 缓存
  * HOSTS 查询
  * DNS 服务器查询
  * ARP 查询
* TCP 握手, TLS 握手
* HTTP(s), (或SPDY， 或HTTP2.0)
  * Header
  * Domain
  * Body
* Gateway / Nginx，网关和负载均衡服务器
  * 查询本地缓存
  * 请求上游应用服务器
* 浏览器解析HTML，并请求资源
  * CSS
  * JS
  * 图片
* 生成 DOM-Tree，结合CSS进行渲染

更为完整详细的答案请参考: [what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN)

## 页面的渲染过程
* 解析整个HTML，得到`DOM`树和样式树
* DOM树和样式树，经过渲染，得到一颗渲染树
* 根据渲染树，开始布局，计算各个节点宽度，位置，高度等
* 然后开始绘制整个页面并显示
* 在渲染过程中如果使用了GPU，还可以进行GPU渲染

参考: [what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN),
[在前端开发中，页面渲染指什么](https://www.zhihu.com/question/20117417)

## 静态资源或者接口等如何做缓存优化
* `redis`/`memcache` 做数据缓存
* `SQL` 查询做缓存
* 指定 `Cache-Control`/`Expires` 缓存时间
* `Last-Modified`/`Etag` 缓存 ( 304 ) 方案
* `网关服务器`做缓存，需要更新时，再回源到`应用服务器`
* `CDN`多机房，多网关缓存


## 页面DOM节点太多，会出现什么问题？如何优化？
问题
  * 页面卡顿，帧率下降

优化：
* 采用`Virtual Dom`技术，可参考: [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
* 多次操作`DOM`，改为批量一次操作`DOM`
* 及时移走页面不用的`DOM`
* 避免不必要的`DIV`嵌套

## 前端安全问题：CSRF和XSS
* CSRF [Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery) 跨站请求伪造
  * 简单描述：
    > 跨站请求伪造（英语：Cross-site request forgery），也被称为 one-click attack 或者 session riding，通常缩写为 CSRF 或者 XSRF， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。[1] 跟跨网站脚本（XSS）相比，XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
    --- 参考: [跨站请求伪造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)

  * 防御措施
    * 检查`referer`, `X-Requested-With`, `Orign`头
    * 使用`POST`代替`GET`
    * 添加校验`Token`至表单中
    * 添加验证码或其他人机验证手段，如 `Google` 的 [recaptcha](https://github.com/google/recaptcha)
    * 把`Token`放到自定义的`HTTP Header`, [Cookie-to-Header Token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Prevention)
* XSS:
[Cross-site_scripting](https://en.wikipedia.org/wiki/Cross-site_scripting)
  * 简单描述:
    > 跨站脚本（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是代码注入的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了HTML以及用户端脚本语言。---参考：[跨站脚本](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)

  * 防御措施
    * 过滤特殊字符串 ( encoding / escaping )
    * 保护`Cookie`, 使用`HttpOnly`字段防止被`JS`获取，（因为攻击通常会采集敏感信息）
    * 使用`HTTPs`代替`HTTP`，（运营商经常会通过注入广告）
    * 禁用`JS`，（这个不太现实）
    * 推荐！设置`CSP`: [Content_Security_Policy 介绍](https://en.wikipedia.org/wiki/Content_Security_Policy)，[Content-Security-Policy 文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)。这个在`Github`有使用：
      ```
      Content-Security-Policy:default-src 'none'; base-uri 'self'; block-all-mixed-content; child-src render.githubusercontent.com; connect-src 'self' uploads.github.com status.github.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com; font-src assets-cdn.github.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; img-src 'self' data: assets-cdn.github.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com; media-src 'none'; script-src assets-cdn.github.com; style-src 'unsafe-inline' assets-cdn.github.com
      ```
    * 设置 `X-XSS-Protection` 头
* [HTTP 安全头](https://www.owasp.org/index.php/OWASP_Secure_Headers_Project)
  * `Strict-Transport-Security`: `Strict-Transport-Security: max-age=31536000 ; includeSubDomains`
  * `Public-Key-Pins`: `Public-Key-Pins: pin-sha256="d6qzRu9zOECb90Uez27xWltNsj0e1Md7GkYYkVoZWmM="; pin-sha256="E9CZ9INDbd+2eRQozYqqbQ2yXLVKB9+xcprMF+44U1g="; report-uri="http://example.com/pkp-report"; max-age=10000; includeSubDomains`
  * `X-Frame-Options`: `X-Frame-Options: deny`
  * `X-XSS-Protection`: `X-XSS-Protection: 1; mode=block`
  * `X-Content-Type-Options`: `X-Content-Type-Options: nosniff`
  * `Content-Security-Policy`: `Content-Security-Policy: script-src 'self'`
  * `X-Permitted-Cross-Domain-Policies`: `X-Permitted-Cross-Domain-Policies: none`
  * `Referrer-Policy`: `Referrer-Policy: no-referrer`

参考: [安全 checklist](https://github.com/FallibleInc/security-guide-for-developers/blob/master/security-checklist-zh.md) [security-guide-for-developers](https://github.com/FallibleInc/security-guide-for-developers)，[浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)

# 贡献和参与该文章

如果你发现了什么问题，或文章中有什么不对的地方，欢迎，点击右边的编辑按钮。或者，你有什么补充的，也欢迎修改。

贡献和参与文章的作者：
<style>
  .person-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .person-list li {
    display: inline-block;
    padding: 8px;
  }
  main.page-content .post-content .person-list a {
    text-align: center;
    color: #111;
    display: block;
    text-decoration: none;
    line-height: 2em;
    width: 80px;
    word-wrap: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .person-list img {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 4px;
  }
</style>
<ul class='person-list'>
  <li>
    <a href="https://github.com/mydaoyuan">
      <img src="https://avatars2.githubusercontent.com/u/16152141?v=3&s=460">
      <span>mydaoyuan</span>
    </a>
  </li>
  <li>
    <a href="https://github.com/mydaoyuan">
      <img src="https://avatars2.githubusercontent.com/u/7157346?v=3&s=460">
      <span>zhoukeke</span>
    </a>
  </li>
</ul>
