---
layout: post
title:  "使用Vue编写非单页应用 (Code non-SPA application in Vue)"
date:   2017-07-10
tags: [vue]
commentIssueId: 31
---

编写非单页应用：
* 前言
* 指定 `webpack` 输出形式为 `UMD` 模式
* 编写自定义 `webpack` 插件，修改默认输出为 `Vue.component`
* 页面引用和使用 `Vue` 组件
* 在线预览 & 源码

## 前言

因为典型的 `Vue` 项目都是 `SPA` 应用，但实际过程中，因为是按组件化的思想写的，可以参考 [Riot](http://riotjs.com/) 。所以，总的想法是，所有的原有组件都重写成 `Vue` 组件，即，单个 `Single File Compoent` 编译成 JS 文件。然后，页面需要用到什么组件，自己手动引用即可。总之，是想把之前的组件化换成 Vue 的组件化，并把迁移成本降到最低。

还有，因为项目的复杂性，采用 `SPAs` 模式也有很多不方便，比如，配置文件会变大而复杂。所以，采用组件直接使用 js 文件引用的方式，更为直观，需要做后期优化的，也可以加一个 comb 服务器。

## 指定 UMD 模式

```js
output: {
  path: path.resolve(__dirname, './dist'),
  publicPath: './dist/',
  library: "[name]",
  libraryTarget: "umd",
  filename: '[name].js'
},
```

## 自定义插件

编写自定义 `webpack` 插件，修改默认输出为 `Vue.component`。因为默认输出为 `root['App'] = factory()`, 所以，需要修改成 `root.Vue.component('App', factory());`.

```js
class UMDPlugin {
  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {

      Object.keys(compilation.assets).map(file => {
        if (/\.js$/.test(file)) {
          var source = compilation.assets[file].source() + '';
          source = source.replace(/root\["(\S*?)"\] = factory\(\);/g, 'root.Vue && root.Vue.component("$1", factory());')

          compilation.assets[file] = {
            source: () => {
              return source;
            },
            size: () => {
              return source.length;
            }
          }
        }
      });

      callback();
    });
  }
}
```

## 页面应用 Vue 组件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>hello-vue</title>
  </head>
  <body>
    <div id="vue">
      <hello></hello>
      <app></app>
    </div>
    <script src="https://cdn.bootcss.com/vue/2.3.4/vue.js"></script>
    <script src='./dist/app.js'></script>
    <script src='./dist/hello.js'></script>
    <script>
      new Vue({
        el: '#vue',
      })
    </script>
  </body>
</html>

```

## 在线预览 & 源码

[在线预览](https://zhoukekestar.github.io/drafts/non-spa-vue/index.html)

[drafts/non-spa-vue](https://github.com/zhoukekestar/drafts/tree/master/non-spa-vue)
