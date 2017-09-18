---
layout: post
title:  "Chrome Module"
date:   2017-09-18
tags: [js, chrome]
commentIssueId: 55
---

Chrome 61 支持 [script(type='module')](http://caniuse.com/#feat=es6-module) 了！
* defer & async
* demo

## Defer & Async
* defer 是渲染完执行
* async 是下载后执行

![asyncdefer](https://html.spec.whatwg.org/images/asyncdefer.svg)


## Demo

html
```html
<script type='module'>
    import { sayHello } from './utils.js'
    sayHello();
</script>
```

utils.js
```js
export const sayHello = () => {
    console.log('hello');
    alert('hello');
};
```

## References
* [spec](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-type)
* [ES6标准解读：Module的加载实现](http://geek.csdn.net/news/detail/235469?utm_source=tuicool&utm_medium=referral)
* [es6-in-depth-modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
