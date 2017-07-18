---
layout: post
title:  "requirejs 源码浅析"
date:   2017-07-18
tags: [js]
commentIssueId: 35
---

requirejs 源码浅析
* kitty.js - 简化版的 requirejs
* requirejs 加载流程
* AMD vs CommonJS vs UMD
* UML 基础知识

## kitty.js
[`kitty.js`](https://github.com/zengjialuo/kittyjs/blob/master/src/kitty.js) 是一个简化版的 `require.js`。

链接：
* [点击查看在线 Demo。](https://zhoukekestar.github.io/drafts/requirejs/)
* [源码解析、注释。](https://github.com/zhoukekestar/drafts/blob/master/requirejs/kitty.js)

几个记录点：
* 收集依赖：通过将代码`toString`, 并正则匹配 `require` 关键字就可以了

  ```js
  factory.toString()
    .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, '')
    .replace(/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g, function(match, dep) {
      deps.push(dep);
    });
  ```
* 模块的一个大致生命

  ```js
  var STATUS = {
    UNFETCH: 0,   // 未加载
    FETCHING: 1,  // 正在请求模块资源
    FETCHED: 2,   // 模块资源请求完成
    LOADING: 3,   // 正在请求资源的依赖模块
    LOADED: 4,    // 模块和模块的依赖都已加载完成
    EXECUTED: 5   // 已执行完毕
  };
  ```

## 大致的流程图
[![requirejs](https://user-images.githubusercontent.com/7157346/28310938-9d8952b0-6be0-11e7-91c3-27ba012de58f.jpg)](https://drive.google.com/file/d/0B9dg6tL91XqfRWN6MHVRRlFjYU0/view?usp=sharing)

## AMD vs CommonJS vs UMD

### AMD
```js
//    filename: foo.js
define(['jquery', 'underscore'], function ($, _) {
    //    methods
    function a(){};    //    private because it's not returned (see below)
    function b(){};    //    public because it's returned
    function c(){};    //    public because it's returned

    //    exposed public methods
    return {
        b: b,
        c: c
    }
});
```

### CommonJS
```js
//    filename: foo.js
var $ = require('jquery');
var _ = require('underscore');

//    methods
function a(){};    //    private because it's omitted from module.exports (see below)
function b(){};    //    public because it's defined in module.exports
function c(){};    //    public because it's defined in module.exports

//    exposed public methods
module.exports = {
    b: b,
    c: c
};
```

### UMD

```js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery', 'underscore'], factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory(require('jquery'), require('underscore'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.jQuery, root._);
    }
}(this, function ($, _) {
    //    methods
    function a(){};    //    private because it's not returned (see below)
    function b(){};    //    public because it's returned
    function c(){};    //    public because it's returned

    //    exposed public methods
    return {
        b: b,
        c: c
    }
}));
```

## UML 基础
![151457489864](https://user-images.githubusercontent.com/7157346/28311068-16f42ef4-6be1-11e7-8453-cf8f0b018b0c.jpg)


## References
* [RequireJS进阶:配置文件的学习](https://segmentfault.com/a/1190000002401665)
* [What Is AMD, CommonJS, and UMD?](http://davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/)
