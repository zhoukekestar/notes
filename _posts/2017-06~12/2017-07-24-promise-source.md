---
layout: post
title:  "Promise & co 源码浅析"
date:   2017-07-24
tags: [js, source]
commentIssueId: 38
---

之前写了一个超小的，`Demo`版的 `Promise` 。不过，出于严谨的考虑，也想更全面的了解一下 `Promise` 的实现，决定再读一读 `Promise` 的源码，顺便把 `TJ` 大神的 `co` 模块也简要分析一下。<br>
分析的这个 Promise 库，是[`github/fetch`](https://github.com/github/fetch) 中推荐的一个 `polyfill` 库，因为它比较小巧简单，但也兼容了 `Promises/A+` 标准，所以，就决定分析这个库了：[promise-polyfill](https://github.com/taylorhakes/promise-polyfill/blob/master/promise.js)
* 自己的 Demo 版 Promise
* promise-polyfill 简要流程图
* co 模块简要流程图


## Demo 版 Promise

```js
/*
 * 注意！ 本样例为了最简化，未添加reject, all, rece等功能
 * 测试： https://github.com/zhoukekestar/drafts/blob/master/promise/simple-promise.js
 *
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
```

## promise-polyfill

点击查看大图

[![promise](https://user-images.githubusercontent.com/7157346/28515993-37e92adc-7092-11e7-959c-345ec2929369.jpg)](https://user-images.githubusercontent.com/7157346/28515993-37e92adc-7092-11e7-959c-345ec2929369.jpg)

## co

【未完待续】我记得我当初使用 co 的时候，是因为 `function* () {}` 和 `yield` 没有办法自动化执行，现在因为有了 `async` 和 `await`，用的比较少了。所以，简单些，我们从测试样例 `test/promises` 出发，简要分析一下。

点击查看大图
