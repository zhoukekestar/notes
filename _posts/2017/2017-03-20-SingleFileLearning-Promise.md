---
layout: post
title:  "Single file learning: Promise"
date: 2017-03-20
tags: [single file learning, javscript]
---

# Promise
* [Document by MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [Document By ruanyifeng](http://es6.ruanyifeng.com/#docs/promise)
* [Timeout VS Promise](https://zhuanlan.zhihu.com/p/25407758?utm_source=tuicool&utm_medium=referral)
* [EventLoop on MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop), [EventLoop Talk](https://webapplog.com/event-loop/), [EventLoop on nodejs](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
* [tasks microtasks queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

```js
const promise = (time, err) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      } else {
        resolve(time);
      }
    }, time);
  })
);


// Basic Usage
promise(1000).then((res) => {
  console.log(`Promise.then: ${res}`);
});

promise(2000, new Error('CustomeError')).then((res) => {
  console.log(`Promise.then: ${res}`);
}).catch((err) => {
  console.log(`Promise.catch: ${err}`);
});

// Promise.then & Promise.race


console.time('Promise.all-time');
Promise.all([promise(4000), promise(3000)]).then((res) => {
  console.log(`Promise.all: ${res}`);
  console.timeEnd('Promise.all-time');
});

console.time('Promise.race-time');
Promise.race([promise(4000), promise(3000)]).then((res) => {
  console.log(`Promise.race: ${res}`);
  console.timeEnd('Promise.race-time');
});

// Read more: https://developers.google.com/web/fundamentals/getting-started/primers/promises#error_handling
console.time('Promise-chain-time');
promise(5000).then((res) => {
  console.log(`Promise chain: ${res}`);
  return 0; // return just a number
  // return new Promise(() => 0);
  // return Promise.resolve(0);
}).then((res) => {
  console.log(`Promise chain: ${res}`);
  return promise(1000);
}).then((res) => {
  console.log(`Promise chain: ${res}`);
  console.timeEnd('Promise-chain-time');
});

```
