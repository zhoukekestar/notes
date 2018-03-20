---
layout: post
title:  "__proto__ vs prototype"
date:   2018-03-01
tags: [note]
commentIssueId: 74
---

js 基础复习: __proto__ & prototype, 温故而知新.

## ES5 继承


![20160314212504_39150](https://user-images.githubusercontent.com/7157346/37191401-4699864c-239a-11e8-9aa6-f8f1ceeca619.png)

```js
function Super() {}

function Sub() {}
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

var sub = new Sub();

console.assert(Sub.prototype.constructor === Sub) // ② true
console.assert(sub.constructor === Sub); // ④ true
console.assert(sub.__proto__ === Sub.prototype); // ⑤ true
console.assert(Sub.__proto__ !== Super
               && Sub.__proto__ === Object.__proto__); // ⑥ true this is different from ES6
console.assert(Sub.prototype.__proto__ == Super.prototype); // ⑦ true
console.assert(Sub.prototype instanceof Super);
console.assert(Object.getPrototypeOf(Sub) !== Super
               && Object.getPrototypeOf(Sub) === Object.__proto__); // this is different from ES6
```



## ES6 继承

![20160116201909_44777](https://user-images.githubusercontent.com/7157346/37191400-45033f12-239a-11e8-9d33-282135572b34.png)

```js
class Super {}

class Sub extends Super {}

var sub = new Sub();

// sub is an empty object has no properties but object properties included `__proto__`, `constructor` and so on.

console.assert(Sub.prototype.constructor === Sub); // ② true
console.assert(sub.constructor === Sub); // ④ true
console.assert(sub.__proto__ === Sub.prototype); // ⑤ true
console.assert(Sub.__proto__ === Super); // ⑥ true this is different from ES5
console.assert(Sub.prototype.__proto__ === Super.prototype); // ⑦ true
console.assert(Sub.prototype instanceof Super);
console.assert(Object.getPrototypeOf(Sub) === Super); // this is different from ES5
```



## Array 继承方式 ( ES5 extends Example )

```js
// Array ---> Object ---> null
console.assert(Array.prototype.constructor === Array);
console.assert([].constructor === Array);
console.assert([].__proto__ === Array.prototype);
console.assert(Array.__proto__ !== Object && Array.__proto__ === Object.__proto__);
console.assert(Array.prototype.__proto__ === Object.prototype);
console.assert(Array.prototype instanceof Object);
console.assert(Object.getPrototypeOf(Array) !== Object && Object.getPrototypeOf(Array) === Object.__proto__);
```



## HTMLElement ( ES6 extends Example )

```js
// HTMLImageElement ---> HTMLElement ---> xxx
var img = new Image();
console.assert(HTMLImageElement.prototype.constructor === HTMLImageElement);
console.assert(img.constructor === HTMLImageElement);
console.assert(img.__proto__ === HTMLImageElement.prototype);
console.assert(HTMLImageElement.__proto__ === HTMLElement);
console.assert(HTMLImageElement.prototype.__proto__ === HTMLElement.prototype);
console.assert(HTMLImageElement.prototype instanceof HTMLElement);
console.assert(Object.getPrototypeOf(HTMLImageElement) === HTMLElement);
```



## new operator

```Js
var o = new Foo();
// is equal to
var o = new Object();
o.__proto__ = Foo.prototype;
Foo.call(o);
```

Hack new operator

```js
function new(clazz) {
    var o = new Object();
    o.__proto__ = Clazz.prototype;
    Clazz.call(o);
    return o;
}
```



## Babel loose mode

Enable babel loose will effects `HTMLDivElement.__proto__ === HTMLElement`

The answer is **NO**. [See babel source code](https://github.com/babel/babel/blob/4da3f3bc64841e0b4b7906c6c26af73920264095/packages/babel-helpers/src/helpers.js#L439)

![](https://user-images.githubusercontent.com/7157346/37185467-6f948b60-237b-11e8-9b3b-6eda32a4527b.png)



## Conclusion

How to detect whether a Sub-Class inherits a Super-Class whitout new Sub-Class ?

ES5 Syntax

* `Sub.prototype.__proto__ === Super.prototype`
* `Sub.prototype instanceof Super`

ES6 Syntax (or Babel)

* `Sub.prototype.__proto__ === Super.prototype `
* `Sub.prototype instanceof Super`
* `Sub.__proto__ === Super`
* `Object.getPrototypeOf(Sub) === Super`

## References

* [MDN: Inheritance_and_the_prototype_chain](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [MDN: new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
* [ES5和ES6中的继承](http://keenwon.com/1524.html)
* [理解prototype、proto和constructor等关系](https://alexzhong22c.github.io/2017/08/08/js-proto/)
