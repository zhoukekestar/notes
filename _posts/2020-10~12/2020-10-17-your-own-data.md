---
layout: post
title:  "构建你自己的数据中心"
date:  2020-10-17
tags: [tool]
commentIssueId: 117
---



本文通过 Github Actions + Dingtalk Robot + Google Sheet，来每天定时抓取网页数据（使用Github Actions），并通过 Dingtalk Robot 来每天推送消息，并使用 Google Sheet 做历史数据的持久化。构建一套基础设施全免费的数据中心，其中包括跑脚本的机器资源免费、消息推送通道免费、数据持久化免费。



## 定时抓取数据

不了解 Github Actions 的同学，可以先看一下[阮一峰](http://www.ruanyifeng.com/) 的这篇 [《GitHub Actions 入门教程》](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)。

还可以看一下丰富的 [Actions 样例](https://github.com/zhoukekestar/sz-real-estate-actions/actions/new)

* [定时执行样例](https://github.com/actions/starter-workflows/blob/08ff79c7b930315861d16bed4903ddd90bf7c05c/automation/stale.yml)
* [Node 自定义任务样例](https://github.com/actions/starter-workflows/blob/08ff79c7b930315861d16bed4903ddd90bf7c05c/ci/node.js.yml)
* [手动触发工作流样例](https://github.com/actions/starter-workflows/blob/08ff79c7b930315861d16bed4903ddd90bf7c05c/automation/manual.yml) ，方便写完工作流之后，快速地做测试

写完 Actions 之后，放入 `.github/workflows` 目录即可。

我整体的 Action 配置如下：

```
name: Push to DingTalk V5

on:
  # 每天早上 2点（东8区，所以需要-8小时，为 18 ） 拉取最新数据
  schedule:
  - cron: "0 18 * * *"

jobs:
  dingtalk:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm i
    - run: npm run dingtalk
```

功能是每天在北京时间凌晨 2 点，开始执行 `npm run dingtalk` 这条命令。

更多详细的文档可以查看 [这里](https://github.com/features/actions)



## Dingtalk 推送

本身的消息推送没什么特别的，看文档就行。

这里需要重点说明一下，就是 `secrets` 功能。为了保护 Robot 的 accesstoken，我们需要用到 Actions 的 Secrets 功能，打开项目的 `Setting` - `Secrets` 即可配置：

![image](https://user-images.githubusercontent.com/7157346/96334407-274cf280-10a3-11eb-8e69-b81c5dc8d4a6.png)



配置完后，我们就能在 workflow 中使用变量了。

最终钉钉的推送效果如下（凌晨两点定时执行了，很是欣慰）：

![image](https://user-images.githubusercontent.com/7157346/96334534-1f418280-10a4-11eb-887e-b9502961b32b.png)



## Google Sheet

Google Sheet 的对接比较花时间，主要是理解 Google 的授权机制和丰富的接口，当然，本地运行还有最大的拦路虎是网络连通性的问题。



#### 授权

![image](https://user-images.githubusercontent.com/7157346/96334582-7b0c0b80-10a4-11eb-9727-a9cba6bd3a6c.png)



授权机制有三套，API 密钥和 OAuth 是直接面向用户的，显然不符合我们的场景（机器人抓取保存数据），所以，需要使用服务账号体系，在`创建凭据` 中，选择服务账号即可。

更为详细的说明，可参考：[How to read or modify spreadsheets from Google Sheets using Node.js ?](https://codingfundas.com/how-to-read-edit-google-sheets-using-node-js/index.html)



#### 操作对接

这里比较容易忽略的是，需要在 Sheet 中设置共享人。

![image](https://user-images.githubusercontent.com/7157346/96334654-ee158200-10a4-11eb-97c8-cfc28a001c84.png)



其他更为复杂的表格操作接口直接参考 [官方文档](https://developers.google.com/sheets/api/quickstart/nodejs) 即可。



#### 本地网络问题

需要解决 Socks 代理问题，以及 Socks 转 HTTP Proxy 的问题。

具体可以参考 [如何查看、设置 Mac Terminal Proxy](https://zhoukekestar.github.io/notes/2020/10/03/mac-proxy.html)，其中在代码中，使用带有 Proxy 能力的库就行了，不过，好在 [googleapis](https://www.npmjs.com/package/googleapis/v/61.0.0#using-a-proxy) 天然提供了这个能力。

```js
const fetch = require('node-fetch-with-proxy');
fetch('https://www.google.com', { timeout: 5000 } )
  .then(d => {
    console.log('sucess')
  })
  .catch(err => {
    console.log('network error');
  })
```

运行：

```
$ node test/network.js
network error
$ HTTPS_PROXY=http://127.0.0.1:8080 HTTP_PROXY=http://127.0.0.1:8080 node test/network.js
sucess
```



除文中提到的，还有一点是本地测试，为了避免写环境变量写到怀疑人生，建议使用 `.env` 文件进行配置。

```
# .env
# network
HTTPS_PROXY=http://127.0.0.1:8080
HTTP_PROXY=http://127.0.0.1:8080
```

然后执行 `node -r dotenv/config test/sheet.js` 即可。



## 总结

一套计算、存储资源全免费的方案，是真香。通过这种技术方案，你可以构建自己的一套的互联网数据中心。

比如：每天抓取你感兴趣的数据，然后做持久化的存储，方便后续的数据分析和趋势的变化。 