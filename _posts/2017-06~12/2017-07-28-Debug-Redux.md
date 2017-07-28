---
layout: post
title:  "Debug Redux"
date:   2017-07-28
tags: [react]
commentIssueId: 43
---

* 下载 `Todos` 样例
* 添加 `Debug` 代码
* 安装插件
* 运行


## 下载样例

* 下载 [Todos 代码](https://github.com/reactjs/redux/tree/master/examples/todos)
* 安装依赖 `npm install`

## 安装调试插件

[Chrome 商店](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

## 添加`Debug` 代码

根据官方文档，需要在 `createStore` 中添加以下代码。

```js
const store = createStore(
  reducer, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

## 运行截图
* 使用 `npm start` 启动服务器
* 打开游览器访问页面
* 开启调试，并切换至 `Redux`

![tim 20170728153716](https://user-images.githubusercontent.com/7157346/28707764-34ad434a-73ac-11e7-8d25-8cac06ec80be.png)
