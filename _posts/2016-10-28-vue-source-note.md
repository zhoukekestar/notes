---
layout: post
title:  "Vue 学习笔记"
date:   2016-10-28 10:42:00 +0800
categories: vue source code read note 笔记 learn 学习
tags: [vue, note]
---


## 目录结构
* `benchmarks` vue的各项性能测试页面
* `build` vue构建目录，用于将src代码输出至dist
  * `build.js` 构建脚本，依赖于`config.js`
* `dist` vue代码输出路径
* `examples` 样例展示
* `flow` flow目录，用于代码可维护性和常规类型检测
  * 比如`function numVowels(word: string): number { return word.length;}` 检测函数输入和输出类型，[官网地址](https://flowtype.org/)
* `src` 主体代码
* `test` 各类测试目录
* `types` typescript目录，主要用于代码可维护性
* `package.json`
  * [karma](https://github.com/karma-runner/karma) 用于单元测试
  * [de-indent](https://github.com/yyx990803/de-indent) 删除多余的空格
  * [he](https://www.npmjs.com/package/he) HTML实体的编码和解码
  * [rollup](http://rollupjs.org/) 项目打包工具

## src目录结构
* `entries` 构建dist和packages目录下的文件的脚本文件，具体配置在`build/config.js`中
  * `web-runtime.js` -> `dist/vue.common.js`
  *  `web-runtime-with-compiler.js` -> `dist/vue.js & vue.min.js`
  *  `web-compiler.js` -> `packages/vue-template-compiler/build.js`
  *  `web-server-render.js` -> `packages/vue-server-render/build.js`
  * 备注：其中`web/compiler/index` 中 `web`的路径在`build/alias.js`中定义，如：`web/compiler/index`的实际路径为`src/platforms/web/compiler/index`
* `sfc`
  * `parser.js` 解析单个`*.vue`文件
* `shared`
  * `util.js` 各类工具函数

## 从vue.js的生成看vue.js

通常，项目的最终文件在`dist`下，在p`ackage.json`中的命令是`npm build`，所以，通过build命令看到`node build/build.js`，vue的生成通过build.js，build.js 依赖于config.js，
而在config.js中，我们可以看到vue.js的生成的脚本：`src/entries/web-runtime-with-compiler.js`

### 其他笔记：[Vue.js 源码学习笔记 by 勾三股四](http://jiongks.name/blog/vue-code-review/)

### 思维导图链接:
* Vue文件结构：[http://naotu.baidu.com/file/f7a6110b19f68324d3361a4009059e07?token=53add7e50171f98d](http://naotu.baidu.com/file/f7a6110b19f68324d3361a4009059e07?token=53add7e50171f98d)
* Vue程序结构：[http://naotu.baidu.com/file/d41e4d227d8603e0a4e738fd8dbf5c9f?token=eb9acb070112b067](http://naotu.baidu.com/file/d41e4d227d8603e0a4e738fd8dbf5c9f?token=eb9acb070112b067)
