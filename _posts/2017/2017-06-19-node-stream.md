---
layout: post
title:  "Node Stream"
date:   2017-06-22
tags: [nodejs]
commentIssueId: 22
---

Some notes about nodejs stream after reading [dive-into-node-stream](http://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/) written by [barretlee](https://github.com/barretlee).
* Readdable Streams
* Writable Streams
* Duplex Streams
* Transform Streams

All images & a part of code is come from [dive-into-node-stream](https://github.com/barretlee/dive-into-node-stream). Thanks.

<style>
.highlighter-rouge {
  max-height: 500px;
  overflow-y: scroll;
}
</style>

## Readdable Streams

![Readdable](https://raw.githubusercontent.com/barretlee/dive-into-node-stream/master/graphic/Readable.png)

#### Flowing Mode

```js
const Readable = require('stream').Readable;
const data = [];

let index = 0;
let total = 10;

while (total--) {
  data.push(String(Buffer.alloc(3, '-')));
}

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
      // 根据hightWaterMark 动态push
      let ok = this.push(data[index]);
      console.log(`push数据至缓冲池 index: ${index}, ok: ${ok}, data: ${data[index]} buffer-length: ${this._readableState.buffer.length} length: ${this._readableState.length}`);
      while (ok) {
        console.log('缓冲池未满，可以继续push');
        index++;
        ok = this.push(data[index])
        if (ok) {
          console.log(`循环，继续push index: ${index}, ok: ${ok}, data: ${data[index]} buffer-length: ${this._readableState.buffer.length} length: ${this._readableState.length}`);
        } else {
          console.log(`循环，缓冲池已满 index: ${index}, ok: ${ok}, data: ${data[index]} buffer-length: ${this._readableState.buffer.length} length: ${this._readableState.length}`);
        }
      }
      console.log('缓冲池已满，等待下次 _read')
      index++;

      // 实验证明：如果 push 返回 false（即已经到达 highWaterMark 的时候）
      // 你还是可以继续push的，如果内存足够大的话，输出结果也是一样
      // 此处留下了一个疑问：highWaterMark 的具体的作用？
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

console.log(`初始化：index: ${index} buffer-length: ${rr._readableState.buffer.length} length: ${rr._readableState.length}`)

rr.on('data', (chunk) => {
  console.log(`读取数据 (${chunk.length}): ${chunk} buffer-length: ${rr._readableState.buffer.length} length: ${rr._readableState.length}\n`);

  // 隔1s读一次
  rr.pause();
  setTimeout(() => {
    rr.resume();
  }, 1000)
});

rr.on('end', () => {
  console.log('read finished!')
})
```

输出：

```
初始化：index: 0 buffer-length: 0 length: 0
push数据至缓冲池 index: 0, ok: true, data: --- buffer-length: 1 length: 3
缓冲池未满，可以继续push
循环，继续push index: 1, ok: true, data: --- buffer-length: 2 length: 6
缓冲池未满，可以继续push
循环，继续push index: 2, ok: true, data: --- buffer-length: 3 length: 9
缓冲池未满，可以继续push
循环，缓冲池已满 index: 3, ok: false, data: --- buffer-length: 4 length: 12
缓冲池已满，等待下次 _read
push数据至缓冲池 index: 4, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

push数据至缓冲池 index: 5, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

push数据至缓冲池 index: 6, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

push数据至缓冲池 index: 7, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

push数据至缓冲池 index: 8, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

push数据至缓冲池 index: 9, ok: false, data: --- buffer-length: 5 length: 15
缓冲池已满，等待下次 _read
读取数据 (3): --- buffer-length: 4 length: 12

读取数据 (3): --- buffer-length: 3 length: 9

读取数据 (3): --- buffer-length: 2 length: 6

读取数据 (3): --- buffer-length: 1 length: 3

读取数据 (3): --- buffer-length: 0 length: 0

read finished!
```
查看[nodejs/_stream_readable.js](https://github.com/nodejs/node/blob/master/lib/_stream_readable.js#L431-L464)代码。
由于`read`函数在调用`_read`后，虽然push了多次，但返回ret为空，所以，没有调用`ondata`函数。

当第二次调用`read`函数，依旧先调用`_read`函数，这时返回ret不为空，调用`ondata`函数，所以，data函数在出现两次false之后，才被调用。

还需要注意的是：
从`_readableState`中拿到的buffer是一个bufferList对象。
![bufferlist](https://user-images.githubusercontent.com/7157346/27435053-634fbc68-578d-11e7-8300-00bd808d6a5d.png)

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
