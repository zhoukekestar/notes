---
layout: post
title:  "Node Stream"
date:   2017-06-19
tags: [nodejs]
commentIssueId: 22
---

Some notes about nodejs stream after reading [dive-into-node-stream](http://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/) written by [barretlee](https://github.com/barretlee).
* Readdable Streams
* Writable Streams
* Duplex Streams
* Transform Streams

All images & a part of code is come from [dive-into-node-stream](https://github.com/barretlee/dive-into-node-stream). Thanks.

## Readdable Streams

![Readdable](https://raw.githubusercontent.com/barretlee/dive-into-node-stream/master/graphic/Readable.png)

#### Flowing Mode

```js
const Readable = require('stream').Readable;
const getRandomNumber = () => String(~~(Math.random() * 10));

// const TOTAL = 10;
const data = [
  new Array(5).fill('-').join(''),
  new Array(3).fill('-').join(''),
  new Array(15).fill('-').join(''),
  new Array(5).fill('-').join(''),
  new Array(5).fill('-').join(''),
  new Array(3).fill('-').join(''),
]
let index = 0;

class CustomReadable extends Readable {
  constructor(options) {

    options = Object.assign({
      encoding: 'utf8'
    }, options || {});

    console.log(`options: ${JSON.stringify(options, null, 2)}`);
    super(options);

    this.on('drain', () => {
      console.log('drain');
    });
  }
  _read() {

    if (index < data.length) {
      let ok = this.push(data[index]);
      console.log(`# -IF- # index: ${index}, ok: ${ok}, data: ${data[index]}`);
      while (ok) {
        index++;
        ok = this.push(data[index])
        if (ok) {
          console.log(`# WHILE Go # index: ${index}, ok: ${ok}, data: ${data[index]}`);
        } else {
          console.log(`# WHILE STOP # index: ${index}, ok: ${ok}, data: ${data[index]}`);
        }
      }
      index++;
      // for (; index < data.length; index += 1) {
      //   this.push(data[index]);
      // }

    // No more data can be read.
    } else {
      this.push(null);
    }
  }
}

const rr = new CustomReadable({
  highWaterMark: 10
});

rr.on('data', (chunk) => {
  console.log(`chunk (${chunk.length}): ${chunk}`);
  if (index > 5) {
    rr.pause();
    setTimeout(() => {
      rr.resume();
    }, 100)
  }
});

rr.on('end', () => {
  console.log('read finished!')
})
```

#### No-Flow Mode

```js
const Readable = require('stream').Readable;
const getRandomNumber = () => String(~~(Math.random() * 10));

const data = [
  new Array(1e7).fill('-').join(''),
  new Array(1e6).fill('-').join(''),
  new Array(1e5).fill('-').join(''),
  new Array(1e4).fill('-').join('')
];

class CustomReadable extends Readable {
  constructor(dataSource, options) {

    // We read it begin with position 0
    options = Object.assign({
      index: 0,
    }, options || {});

    super(options);
    this.options = options;

    this.on('drain', () => {
      console.log('drain');
    });
  }
  _read() {

    // We still have data ready
    if (this.options.index < data.length) {
      this.push(data[this.options.index]);
      this.options.index++;
      // setTimeout(() => this.push(data), 100)
    // No more data can be read.
    } else {
      this.push(null);
    }
  }
}

const rr = new CustomReadable();

rr.on('readable', () => {
  let chunk;
  while (null !== (chunk = rr.read())) {
    console.log(`Received ${chunk.length} bytes of data.`);
    rr.pause();
  }
});

rr.on('end', () => {
  console.log('read finished!')
})
```
