---
layout: post
title:  "梳理：Event-Loop, Queue, Stack, Heap, Tasks, Microtask"
date:   2017-07-26
tags: [js]
commentIssueId: 40
---

* Event Loop
* Stack
* Heap
* Microtask

## Event Loop
关于[Event Loop 在 MDN 上的解释](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop).

> JavaScript 的并发模型基于 “事件循环”


![tim 20170726111057](https://user-images.githubusercontent.com/7157346/28602884-33c30a1a-71f3-11e7-97a0-5d15629e05a5.png)

事件循环的实现类似于：

```js
// 如果当前没有任何消息，queue.waitForMessage 会同步等待消息到来。
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

每一个事件循环就是处理一条消息，每一条消息中都有对应的任务需要去执行。

### 执行至完成

> 每一个消息执行完成后，其它消息才会被执行。当你分析你的程序时，这点提供了一些优秀的特性，包括当一个函数运行时，它不能被取代且会在其它代码运行前先完成（而且能够修改这个函数控制的数据）。这点与C语言不同。例如，C语言中当一个程序在一个线程中运行时，它可以在任何点停止且可以在其它线程中运行其它代码。

消息必须，且保证依次处理，每条消息是 `Queue` 中对应的一条 `Task`。顺序的保证是因为 `JS` 是单线程的，不存在像 `C` 那样的资源竞争和多线程。

> 这个模型的一个缺点在于当一个消息的完成耗时过长，网络应用无法处理用户的交互如点击或者滚动。浏览器用“程序需要过长时间运行”的对话框来缓解这个问题。一个比较好的解决方案是使消息处理变短且如果可能的话，将一个消息拆分成几个消息。

由于单线程的特性，如果 `Task` 处理时间过长，就会无法响应用户操作，没有像 `Android` 那样，有一个单独的 `UI` 线程去处理用户操作。有耗时操作的，也可以采用“多线程”，使用 `worker` 去处理。

### 添加消息

> 在浏览器里，当一个事件出现且有一个事件监听器被绑定时，消息会被随时添加。如果没有事件监听器，事件会丢失。所以点击一个附带点击事件处理函数的元素会添加一个消息。其它事件亦然。

当添加一个事件监听，且在用户触发相应的事件时，会添加一个消息。

#### 使用 setTimeout 添加消息

> 调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。这个时间段作为函数的第二个参数被传入。如果队列中没有其它消息，消息会被马上处理。但是，如果有其它消息，setTimeout 消息必须等待其它消息处理完。因此第二个参数仅仅表示最少的时间 而非确切的时间。

这个有个注意点，第二个参数仅仅表示最少的时间，不能保证在指定的时间后一定运行。

### 多个运行时互相通信

> 一个 web worker 或者一个跨域的 iframe 都有它们自己的栈，堆和消息队列。两个不同的运行时只有通过 postMessage 方法进行通信。这个方法会给另一个运行时添加一个消息如果后者监听了 message 事件。

`postMessage` 也可以作为跨域解决手段。

## stack

在浏览器直接运行以下代码，并断点：

```js
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7));

// 这是一个在浏览器控制台断点调试的小技巧
//@ sourceURL=/stack
```

可以看到执行到 `foo` 时的 `JS Stack`

![tim 20170726110736](https://user-images.githubusercontent.com/7157346/28602844-fa1098e6-71f2-11e7-8560-44b459ee366c.png)

## Heap

> 对象被分配在一个堆中，一个用以表示一个内存中大的未被组织的区域。

除了一些基本数据类型，可以直接在 `stack` 中被保存，其他的一些复杂对象，需要保存在 `Heap`，在 `stack` 中，保留对对象的引用即可。其中基本数据类型包括：`Undefined`, `String`, `Boolean`, `Null`, `Number`, `Symbol`(共 6 种). 对象类型包括: `Object`, `Array`, `Function`, `Date` 等. [详细可参考 Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

```js
// 基础类型助记
var a;    => undefined
a = '123';=> string
a = +a;   => number
a = !!a;  => bool
a = null; => null
=> ES6 Symbol
```

## Microtask

这个看最经典的文章: [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

### Promise vs setTimeout
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

new Promise(resolve => {
  console.log('new Promise 1');
  resolve();
  console.log('new Promise 2');
}).then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');
//@ sourceURL=/promise
```

output:

```
script start
new Promise 1
// 立即执行，可参考 Promise 源码解析：
// https://zhoukekestar.github.io/notes/2017/07/24/promise-source.html
new Promise 2
script end
promise1
promise2
undefined // 注意，此处，由于 `JS Stack` 执行 `(anonymous)` 完成，所以，返回值在这里打印
setTimeout
```



### Microtask vs JS Stack

```js
function a() {
  console.log('script start');

  setTimeout(function() {
    console.log('setTimeout');
  }, 0);

  new Promise(resolve => {
    console.log('new Promise 1');
    resolve();
    console.log('new Promise 2');
  }).then(function() {
    console.log('promise1');
  }).then(function() {
    console.log('promise2');
  });

  console.log('script end');
}

a();
console.log('after a')
//@ sourceURL=/promise
```

output:

```
script start
new Promise 1
new Promise 2
script end
after a
// 虽然 a 函数执行完了，也从当前的 JS Stack 退出，但是 JS Stack 中，还有 anonymous 还没有退出
// 所以，还不能执行 then 方法
promise1
promise2
undefined
setTimeout
```

![untitled](https://user-images.githubusercontent.com/7157346/28607112-e1d9f438-720c-11e7-89f4-979a8c5913d7.png)

### 注意点
* `new Promise` 是立即执行的，`then` 为异步
* `microtasks` 只能在 `stack` 为空，才能执行
