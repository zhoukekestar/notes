---
layout: post
title:  "JS 内存管理，如何处理4种常见的内存溢出"
date:   2017-10-31
tags: [js]
commentIssueId: 62
---

JS 不像 C，C++ 那样，有 `malloc` 和 `free` 这样的语句可以手动管理内存。JS 的内存是由 `垃圾回收` 这样机制管理。感觉 JS 开发者是不需要去关心内存管理的，但事实上，这是个错误。这里，根据 [这篇优秀的文章](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec) 梳理一下内存管理的坑。

## 内存生命周期以及什么是内存？
### 内存周期
![1-slxxgq_to38tgtokpwa_jq](https://user-images.githubusercontent.com/7157346/32205415-1e08ea94-bdbd-11e7-993f-96b1837ffc56.png)
* 分配内存：当程序需要使用内存的时候，程序需要向操作系统申请内存空间。像 C 这类语言，开发人员需要自己使用命令去申请。更高级一些的语言（ JS 这类的），内存申请已经在语言层帮你搞定了。
* 使用内存：当你申请完内存后，程序就可以通过你指定的变量（其实也就是内存地址）去读和写对应的数据了。
* 释放内存：当你使用完内存后，你需要释放内存，在高级语言中，这一步，容器会自动帮你做。但在稍底层的语言中，这一步也需要手动触发。

### 内存是什么
在硬件层面，内存是由一系列的[触发器](https://zh.wikipedia.org/wiki/%E8%A7%A6%E5%8F%91%E5%99%A8)组成的，每一个触发器又是由多个二极管组成的，可以存储一个 bit，并有一个唯一的 ID，所以，我们才能在它们哪儿读写数据。

在内存中存储了包括：
* 程序需用用到的所有变量和数据
* 程序代码（包括操作系统代码）

当编译器编译代码的时候，编译器会自动计算程序所需要的空间，并在执行的时候去申请一个栈 (stack)。之所以为称为栈，是因为，在程序执行的过程中，新的内存空间总是会被分配到当前内存的“最上面”，当程序执行完成后，也会从内存的“最上面”开始释放，遵循 LIFO (last-in, first-out) 的规则。

```c
int n; // 4 bytes
int x[4]; // array of 4 elements, each 4 bytes
double m; // 8 bytes
```
以上代码，就需要 `4 + 4 × 4 + 8 = 28 bytes.`

### 动态分配
为什么会有动态分配？这是因为有些内存空间在代码编译期间是无法知道的。比如以下代码：

```c
int n = readInput(); // reads input from the user
...
// create an array with "n" elements
```
程序需要动态分配一个 n 长度的数组内存，而 n 又是由用户输入决定的。这个数组内存只能在程序运行的时候才能知道，所以，我们还需要一个堆（heap)。以下是堆和栈的区别：

![1-qy-yrqwgi-dls3zrhyhm9a](https://user-images.githubusercontent.com/7157346/32205418-1f9d1a7e-bdbd-11e7-98ed-341d3d8d0a88.png)

| 栈 | 堆 |
|:--|:--|
| 在编译期间大小就能被确定的 | 编译期间无法知道明确的内存大小，只能在运行的时候才可以知道 |
| 存储在栈中 | 存储在堆中 |
| FILO | 无序 |


## JS 内存

### 基于引用计数的垃圾回收
当内存的引用计数为 0 的时候，可以被回收。

### 循环引用导致无法被回收
循环引用导致引用计数始终不等于0，从而导致内存无法被回收。
```js
function f() {
  var o1 = {};
  var o2 = {};
  o1.p = o2; // o1 references o2
  o2.p = o1; // o2 references o1. This creates a cycle.
}

f();
```

![1-gf3p99cqpzkx3ukgyvkshw](https://user-images.githubusercontent.com/7157346/32206073-07462232-bdc1-11e7-824d-fc45de62ffd9.png)

### 标记删除算法
从 root 对象（即 window 对象）查找引用，并标记，当遍历所有对象后，未标记的对象则可视为未被使用的内存，即可以被回收。

![1-wvtok3bv0ngu95mpxk9cng](https://user-images.githubusercontent.com/7157346/32206153-77b9fde0-bdc1-11e7-9923-eca5f5ce8b98.gif)


## 内存溢出
内存溢出是当应用实际上不再需要某些内存的时候，但由于某些原因无法被系统正常回收而导致的。

### 全局变量
```js
function foo() {
    this.var1 = "potential accidental global";
}
// Foo called on its own, this points to the global object (window)
// rather than being undefined.
foo();
```

当变量无意中将 scope 设置到 window 的时候，导致变量在全局对象中而导致无法释放。

解决方法：

添加 `use strict` 标记，这样可以有效避免在程序执行过程中，在全局意外添加变量。

### 被遗忘的定时器和回调

```js
var serverData = loadData();
setInterval(function() {
    var renderer = document.getElementById('renderer');
    if(renderer) {
        renderer.innerHTML = JSON.stringify(serverData);
    }
}, 5000); //This will be executed every ~5 seconds.
```

因为 setInterval 函数一直是运行的，在没有手动结束他之前，定时函数是无法被清理的。当 renderer 节点被删除后，由于定时函数还持有 serverData 的引用，所以，serverData 可能会一直无法被回收。

### 闭包

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) // a reference to 'originalThing'
      console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log("message");
    }
  };
};
setInterval(replaceThing, 1000);
```

每次运行 replaceThing 的时候，因为 unused 中引用了 originalThing，虽然 unused 没有被使用，但因为有可能通过外部作用域的 theThing 去调用 someMethod 方法，导致 longStr 无法被正常地回收。

代码的关键在于，闭包是共享作用域的。
> 在创建 someMethod 闭包的时候，是和 unused 共享作用域的。由于 unused 有一个 originalThing 的引用，虽然 unused 从来未被使用，但 someMethod 可能通过 replaceThing 外的作用域 theThing 变量来使用。两个闭包的作用域共享后，unused 对 originalThing 的引用会一直保持。所以，就有内存溢出了。

有关该内存溢出的详情可以参考 [meteor 团队的的文章](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)。

### Dom 引用

```js
var elements = {
    image: document.getElementById('image')
};
function doStuff() {
    elements.image.src = 'http://example.com/image_name.png';
}
function removeImage() {
    // The image is a direct child of the body element.
    document.body.removeChild(document.getElementById('image'));
    // 虽然 image 被移除了，但 elements 依然保持了对它 的引用，导致 image 无法被正常地回收。
}
```

另外一个例子是，当你引用了表格中的某个 cell 的时候，如果某天，table 被删除了，但由于你引用了这个 table 的 cell，将会导致整个 table 无法被正常回收。

针对这个问题，我们可以在引用的时候，使用 weakmap 或 weakset 去保存相应的引用，以确保当 dom 不存在时，被正常合理地回收。

## References
* 原文：[How JavaScript works: memory management + how to handle 4 common memory leaks](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)
* 作者的其他优秀文章：[sessionstack](https://blog.sessionstack.com/tagged/tutorial)
  * 其他的好文: [How JavaScript works: an overview of the engine, the runtime, and the call stack](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
* 信息来源：[精读《JS 中的内存管理》](https://github.com/dt-fe/weekly/issues/40)
