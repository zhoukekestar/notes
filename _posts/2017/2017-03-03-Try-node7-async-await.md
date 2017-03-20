---
layout: post
title:  "Try async/await on node7.6"
date: 2017-03-03
tags: [async, nodejs, promise]
---

# Attention!
Demos should run on nodejs 7.6+

# simple-demo
```js
const https = require('https');

const request = function (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {

      let result = '';
      res.on('data', (d) => (result += d));

      res.on('end', () => resolve({
        body: result,
        statusCode: res.statusCode,
        headers: res.headers
      }));

    }).on('error', (e) => reject(e));
  });
}

const start = async function () {
  const d = await request('https://www.baidu.com/');
  console.log(JSON.stringify(d, null, 2));
}

start();
console.log('Starting...')

```

# Sugar
async/await is just a sugar for Promise.

```js
const https = require('https');

const request = function (url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {

      let result = '';
      res.on('data', (d) => (result += d));

      res.on('end', () => resolve({
        body: result,
        statusCode: res.statusCode,
        headers: res.headers
      }));

    }).on('error', (e) => reject(e));
  });
}

const start = function () {
  request('https://www.baidu.com').then((d) => {
    console.log(JSON.stringify(d, null, 2))
  })
}

start();
console.log('Starting...')

```

# Promise.all & Promise.race

## async/await
```js
const https = require('https');

const timeout = function(t) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(t);
    }, t)
  })
}

const start = async function() {

  console.time('await');
  let d = await timeout(1000)
  console.log('await: ', d);
  d = await timeout(2000);
  console.log('await: ', d);
  console.timeEnd('await');

  console.time('Promise.all');
  d = await Promise.all([timeout(1000), timeout(2000)]);
  console.log('Promise.all: ', d);
  console.timeEnd('Promise.all');

  console.time('Promise.race');
  d = await Promise.race([timeout(1000), timeout(2000)]);
  console.log('Promise.race: ', d);
  console.timeEnd('Promise.race');
}

start();
console.log('Starting...')
/*
Starting...
await:  1000
await:  2000
await: 3017.619ms
Promise.all:  [ 1000, 2000 ]
Promise.all: 2006.204ms
Promise.race:  1000
Promise.race: 1000.938ms
 */
```

## es5 - demo1
```js
const https = require('https');

const timeout = function(t) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(t);
    }, t)
  })
}

const start = function() {

  console.time('await');
  timeout(1000).then((d) => {
    console.log('await: ', d);
    return timeout(2000);
  }).then((d) => {
    console.log('await: ', d);
    console.timeEnd('await');
  })


  console.time('Promise.all');
  Promise.all([timeout(1000), timeout(2000)]).then((d) => {
    console.log('Promise.all: ', d);
    console.timeEnd('Promise.all');
  })


  console.time('Promise.race');
  Promise.race([timeout(1000), timeout(2000)]).then((d) => {
    console.log('Promise.race: ', d);
    console.timeEnd('Promise.race');    
  })

}

start();
console.log('Starting...')

/*
Starting...
await:  1000
Promise.race:  1000
Promise.race: 1000.029ms
Promise.all:  [ 1000, 2000 ]
Promise.all: 2003.478ms
await:  2000
await: 3004.421ms
 */
```

## es5 - demo2
```js
const https = require('https');

const timeout = function(t) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(t);
    }, t)
  })
}

const start = function() {

  console.time('await');
  timeout(1000).then((d) => {
    console.log('await: ', d);
    return timeout(2000);
  }).then((d) => {
    console.log('await: ', d);
    console.timeEnd('await');
  }).then(() => {
    console.time('Promise.all');
    return Promise.all([timeout(1000), timeout(2000)])
  }).then((d) => {
    console.log('Promise.all: ', d);
    console.timeEnd('Promise.all');
  }).then(() => {
    console.time('Promise.race');
    return Promise.race([timeout(1000), timeout(2000)])
  }).then((d) => {
    console.log('Promise.race: ', d);
    console.timeEnd('Promise.race');    
  })

}

start();
console.log('Starting...')

/*
Starting...
await:  1000
await:  2000
await: 3020.579ms
Promise.all:  [ 1000, 2000 ]
Promise.all: 2017.770ms
Promise.race:  1000
Promise.race: 1007.638ms
 */
```
