---
layout: post
title:  "Chrome Headless 小试"
date:   2017-07-27
tags: [test, chrome]
commentIssueId: 42
---

该测试样例运行在 `windows` 上，是一次在 `windows` 上的 `chrome headless` 的测试。
* 下载 `Cancry` 并安装
* 开启 `Chrome Debug`
* 编写测试脚本
* 安装 `chromeless` 依赖
* 运行测试样例
* 样例截图

## 下载 `Canary` 并安装

该步骤省略

## 开启 Chrome Debug

运行 `chrome --remote-debugging-port=9222 --disable-gpu --headless`，开启 `Debug`

如果未开启就运行测试脚本，会得到错误

```
{ Error: connect ECONNREFUSED 127.0.0.1:9222
    at Object.exports._errnoException (util.js:1026:11)
    at exports._exceptionWithHostPort (util.js:1049:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1136:14)
  code: 'ECONNREFUSED',
  errno: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 9222 }
```

## 编写测试脚本

```js
// File: index.js
const { Chromeless } = require('chromeless')

async function run() {
  const chromeless = new Chromeless()

  const screenshot = await chromeless
    .goto('https://www.google.com.hk')
    .type('chromeless', 'input[name="q"]')
    .press(13)
    .wait('#resultStats')
    .screenshot()

  console.log(screenshot) // prints local file path or S3 url

  await chromeless.end()
}

run().catch(console.error.bind(console))
```

## 安装 `chromeless` 依赖

`npm install chromeless`

## 运行测试样例

运行前，需要在 `C` 盘下新建一个 `tmp` 目录，否则会报以下错误

```
{ Error: ENOENT: no such file or directory, open 'C:\tmp\cj5lskbqv0000mkuvnbypcaqp.png'
    at Object.fs.openSync (fs.js:638:18)
    at Object.fs.writeFileSync (fs.js:1287:33)
    at LocalRuntime.<anonymous> (C:\Users\Administrator\Desktop\node_modules\chromeless\dist\src\chrome\local-runtime.js:340:
    at step (C:\Users\Administrator\Desktop\node_modules\chromeless\dist\src\chrome\local-runtime.js:32:23)
    at Object.next (C:\Users\Administrator\Desktop\node_modules\chromeless\dist\src\chrome\local-runtime.js:13:53)
    at fulfilled (C:\Users\Administrator\Desktop\node_modules\chromeless\dist\src\chrome\local-runtime.js:4:58)
    at <anonymous>
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\tmp\\cj5lskbqv0000mkuvnbypcaqp.png' }
```

新建完后，就可以愉快得运行测试了：`node index.js`

## 样例截图

![cj5lst2zw000030uvalj3dwv0](https://user-images.githubusercontent.com/7157346/28651482-b67f1c8e-72b4-11e7-8031-96e4444f2fdc.png)
