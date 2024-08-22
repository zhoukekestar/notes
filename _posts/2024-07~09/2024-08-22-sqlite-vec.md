---
layout: post
title:  "使用 sqlite-vec 做向量搜索"
date:  2024-08-22
tags: [js]
---

  使用 sqlite-vec 做向量搜索，得益于 sqlite 的极致轻量，对小场景下，是有相当强的诱惑力的。

# sqlite-vec

* [sqlite-vec](https://github.com/asg017/sqlite-vec)
* [JS 样例](https://github.com/asg017/sqlite-vec/blob/main/examples/simple-node/demo.mjs)

# 依赖安装

* `npm i sqlite-vec`
* `npm i better-sqlite3`

# better-sqlite3 依赖问题

安装 better-sqlite3 依赖的时候，可能会出现 [ModuleNotFoundError: No module named 'distutils'](https://github.com/WiseLibs/better-sqlite3/issues/1154) 的问题。

没有 [distutils](https://stackoverflow.com/questions/69919970/no-module-named-distutils-util-but-distutils-installed) 是因为 python3.12 已经移除了。

所以，需要在安装依赖的时候，指定 python 版本和 python 路径。且根据 `node-gyp` 的文档，python 版本需要[大于 3.6](https://unpkg.com/browse/node-gyp@9.4.0/lib/find-python.js)，所以，当指定 python2 的时候，是无法生效的。

  最终指定python版本的命令如下（自行指定大于`3.6`且小于`3.12`的python版本）：

```
npm i better-sqlite3 --python='/opt/homebrew/opt/python@3.11/bin/python3.11'
```


