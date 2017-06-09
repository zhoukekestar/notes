---
layout: post
title:  "笔记：阿里、网易、滴滴共十次前端面试碰到的问题"
date:   2017-06-07
tags: [interview]
commentIssueId: 17
---

# 前言
虽然我很讨厌[whiteboard](http://zhoukekestar.github.io/notes/2017/03/16/hiring-without-whiteboards.html)面试，但我还是决定整理一下。毕竟，作为几年前端的我，有点虚。。。一直在创业公司工作，知识体系的特点是大、散、浅，来一个问题，解决一个问题，然后没后续了 。相比大企业的小、专、精，还是需要努力努力的。

关于这种 whiteboard 面试，我的态度是：给我Google，我能给你一个更满意的答案。

文章来源: [阿里、网易、滴滴共十次前端面试碰到的问题](https://segmentfault.com/a/1190000009662029)

# 文章还是编辑修改中，由于内容太多了，欢迎一起编辑讨论

# HTML

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

Input，[详细文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
  * 可以指定type，url, email, 可以方便地检测单行数据。还是指定为file, submit, button, checkbox, radio, datetime, color等，改变input的样式和行为，简直不要太丰富哈。
  * 输入初始化需要用value指定属性值
  * 宽高只能通过css指定

Textarea, [详细文档](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
  * 可以输入多行文字
  * 输入值初始化需要用标签对包裹，并可以夹杂 HTML 代码，而不会被浏览器解析（这个蛮好用的）
    ```html
    <textarea><h1>h1</h1></textarea>
    ```
  * 宽高能用 CSS 或 rows, cols 指定

相同
  * 都可以使用 maxlength & minlength 限制输入长度

## 用一个div模拟textarea的实现

这个，貌似加个 contenteditable 就可以了，不知道是不是出题人的意思。在 real-world 中，在 Github 中搜索 `rich editor` 就行了，或者搜索 `WYSIWYG` (what you see is what you get), 百度的 [ueditor](http://ueditor.baidu.com/website/umeditor.html) 也是不错的

# CSS

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
ul li {
  margin-top: 10px;
}
</style>
  * position: absolute + padding, 这个写得最多，最常见的
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
  * flex，这个是比较流行的趋势，这个推荐
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
    * 百度了一下，float 方案，需要三层 div，不是很优雅，不喜欢，不贴了。这个可以自己百度
    * 又百度了一下，参考了 [alonia](http://blog.csdn.net/alonia/article/details/50957511), 挖到东西了，calc属性~~~~

    ```html
    <div class='example-4 auto-width'>
      <style>
        .example-4 {
          height: 100px;
          width: 60%;
        }
        .example-4:after {
          clear: both;
        }
        .example-4 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          float: left;
        }
        .example-4 .right {
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
    <div class='example-4 auto-width'>
      <style>
        .example-4 {
          height: 100px;
          width: 60%;
        }
        .example-4:after {
          clear: both;
        }
        .example-4 .left {
          width: 100px;
          height: 100%;
          background: #0f0;
          float: left;
        }
        .example-4 .right {
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

用得比较多的会有：
  * transform 转换
    * 2D 转换
      * rotate 旋转，图片转个90或180度什么的
      * translate 位置移动
      * scale, skew, matrix 等
    * 3D 转换
      * rotate(XYZ) 根据x,y,z轴旋转
      * translate(XYZ), scale(XYZ) 同理
      * perspective 透视，这个很多3D效果都要设置一下，不然3D还是会"2D"的效果
  * transition 过渡，好多简单的动画，移个位置，变个长短，其实直接用这个属性去设置就行了
  * flex, flex布局，继 table 和 div 后的趋势，不了解或不熟悉的可以参考[cssreference](http://cssreference.io/flexbox/), 如果要考我的话，我也不知道，记不住，都是要用到，然后去查一下。
  * border-radius 圆角, @font-face 字体, box-shadow text-shadow 文本和框的阴影
  * 还有word-wrap, background-size, background-origin, border-image, box-sizing等等，好多用得挺多，但不知道它是CSS3的, ==!
  * 还有 calc, linear-gradient 等不经常用的
  * 还有伪类选择器：如:`:target`, `:enabled`, `:disabed`, `:first-child`, `last-child`等等
  * @media 媒体查询也用得多，特别是一些响应式布局中

ps: 想到啥就写啥了，具体查看[文档](https://developer.mozilla.org/en/docs/Web/CSS/CSS3)，或百度吧

## BFC、IFC

看到这两个词，一脸懵逼，Google之~ 直接上[文章](http://www.cnblogs.com/dingyufenglian/p/4845477.html)吧

## 对栅格的理解

## 水平居中有哪些实现方式
* `<center></center>`
  ```html
  <center>center</center>
  ```
  <center>center</center>
* `text-align: center`
  ```html
  <p style='text-align: center'>text-align: center<p>
  ```
  <p style='text-align: center'>text-align: center<p>
* `margin: 0 auto;`
  ```html
  <div style='width: 10em; margin: 0 auto;'>margin<div>
  ```
  <div style='width: 6em; margin: 0 auto;'>margin<div>
* `justify-content: center;`
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
* 通过`@media`媒体查询，查询当前设置的屏幕倍率，统一设置`transform`, 参考[移动端(手机)1像素边框真正实现](http://blog.csdn.net/zfangls/article/details/53338665)
* 模仿淘宝(不确定是不是来自淘宝的)，设置屏幕宽度为设计师的设计尺寸(一般为750)。程序员：设计师，我可都是按你的标准来的哦~
  ```html
  <meta name="viewport" content="width=750, user-scalable=no">
  ```

# JavaScript

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

## 事件委托
和DOM解绑，利用冒泡和e.target来确定事件和元素

## 实现extend函数
浅拷贝使用 Object.assign 就够了，深拷贝

## 为什么会有跨域的问题以及解决方式

## jsonp原理、postMessage原理

## 拖拽功能
比如把5个兄弟节点中的最后一个节点拖拽到节点1和节点2之间

## 动画：setTimeout何时执行，requestAnimationFrame的优点

## 手写parseInt的实现
要求简单一些，把字符串型的数字转化为真正的数字即可，但不能使用JS原生的字符串转数字的API，比如Number()


## 分页器组件
为了减少服务端查询次数，点击“下一页”怎样能确保还有数据可以加载（请求数据不会为空）？

## ES6新增了哪些特性，使用过哪些，也有当场看代码说输出结果的

## JS模块化的实践

## require.js的实现原理

###如果使用过webpack，进一步会问，两者打包的异同及优缺点

## promise的实现原理，进一步会问async、await是否使用过
async & await 只是语法糖吧

[参考](http://zhoukekestar.github.io/notes/2017/03/03/Try-node7-async-await.html)

## 实现gulp的功能


## 使用框架(vue/react等)带来好处(相对jQuery)
* MVVC 的好处

## vue双向数据绑定的实现
* Object.defineProperty

[参考](http://zhoukekestar.github.io/notes/2017/02/22/observer.html)

## 单页应用，如何实现其路由功能
* hash
* history

# 性能优化

## 项目中使用过哪些优化方法
* 页面静态化
* CDN加速
* 前端渲染(Data + View) / 后端渲染(SSR, SEO等), 视具体情况灵活选择
* [缓存](http://zhoukekestar.github.io/notes/browser/cache/last-modified/expire/2016/10/06/browser-cache.html)
  * Cache-Control/Expires 前端缓存
  * Last-Modified/Etag 服务器端缓存，304


## 输入一个URL，Enter之后发生了什么
* dns
* tcp/ip
  * ssh
* http(s) TLS
  * header
  * domain
  * body
* gateway/nginx
* server
* html

参考[what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN)

## （承上）页面的渲染过程
* dom-tree加载和CSS的渲染。。。这块还挺深的

参考[what-happens-when-zh_CN](https://github.com/skyline75489/what-happens-when-zh_CN)

## 静态资源或者接口等如何做缓存优化
* redis/memcache 做缓存
* SQL 查询做缓存
* 指定 Cache-Control/Expires 缓存时间
* Last-Modified/Etag 返回304
* 如果是和native混合开发的，还可以使用native缓存


## 页面DOM节点太多，会出现什么问题？如何优化？
* virtual DOM
* 即使移走页面不用的dom
* 用更少的div写页面，精简div

# 项目经历

## 前端安全问题：CSRF和XSS
参考[security-guide-for-developers](https://github.com/FallibleInc/security-guide-for-developers)

# 贡献和参与该文章

如果你发现了什么问题，或文章中有什么不对的地方，欢迎，点击右边的编辑按钮。或者，你有什么补充的，也欢迎修改。
