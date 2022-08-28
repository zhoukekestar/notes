---
layout: post
title:  "Javascript prototype"
date: 2017-02-15
tags: [javascript, prototype]
---

# Code

```js
function Foo() { console.log('Foo()') }
Foo.prototype.name = 'Bob';
Foo.prototype.getYear = function () {
  return 2000;
};

var f1 = new Foo()
```

![img](https://user-images.githubusercontent.com/7157346/187056906-334c586d-b276-4bc6-b047-ce6ef5ee5fe2.png)

```js
// line-1
f1.__proto__ === Foo.prototype // true

// line-2
Foo.prototype === Foo.prototype // true

// line-3
Foo.prototype.constructor === Foo // true
Foo.toString() // function Foo() { console.log('Foo()') }

// line-3.1
Foo.constructor === Function.constructor
Function.constructor.toString() // function Function() { [native code] }

// line-4
Foo.__proto__ === Function.prototype // true

// line-5
Foo.prototype.__proto__ === Object.prototype // true

// line-6
({}).__proto__ === Object.prototype // true

// line-7
// =_=, it's a mistake, same as line-6

// line-8
Object.prototype === Object.prototype // true

// line-9
Object.prototype.constructor === Object // true
Object.toString() // function Object() { [native code] }

// line-10
Object.prototype.__proto__ === null // true

// line-11
Function.prototype.__proto__ === Object.prototype // true

// line-12
Object.__proto__ === Function.prototype // true

// line-13
Function.prototype === Function.prototype // true

// line-14
Function.prototype.constructor === Function // true
Function.toString() // function Function() { [native code] }

// line-15
Function.__proto__ === Function.prototype // true

```

# Function & Object

```js
Function.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype // true
Function.prototype.__proto__ === Object.prototype // true
Object.prototype.__proto__ === null // true

Object instanceof Function // true
Object instanceof Object // true
Function instanceof Object // true
Function instanceof Function // true

({}) instanceof Object // true
({}) instanceof Function // false
(function() {}) instanceof Object // true
(function() {}) instanceof Function // true
```

# new & hasOwnProperty

```js
var obj = {};
obj instanceof Foo; // false

obj.__proto__ = Foo.prototype;
Foo.call(obj);
// This code is the same as "obj = new Foo()"

obj instanceof Foo; // true

obj.b = 'b';
for (var i in obj) {
  console.log(i);
}
/*
  b
  name
  getYear
*/
for (var i in obj) {
  obj.hasOwnProperty(i) && console.log(i);
}
/*
  b
*/

```

# Links
* [prototype](http://www.cnblogs.com/wangfupeng1988/p/3979533.html)
