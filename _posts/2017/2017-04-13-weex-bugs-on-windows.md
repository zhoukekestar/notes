---
layout: post
title:  "Weex bugs on windows"
date:   2017-04-13
tags: [weex, note]
commentIssueId: 9
---


#  Cannot resolve module

Error Message:

```
ERROR in ./examples/web-entry/vue/hello.js?entry=true
Module not found: Error: Cannot resolve module '....uehello.vue' in D:\Github\apache-weex\examples\web-entry\vue
 @ ./examples/web-entry/vue/hello.js?entry=true 1:10-40

ERROR in ./examples/web-entry/vue/animation.js?entry=true
Module not found: Error: Cannot resolve module '....ueanimation.vue' in D:\Github\apache-weex\examples\web-entry\vue
 @ ./examples/web-entry/vue/animation.js?entry=true 1:10-44

ERROR in ./examples/web-entry/vue/iconfont.js?entry=true
Module not found: Error: Cannot resolve module '....ueiconfont.vue' in D:\Github\apache-weex\examples\web-entry\vue
 @ ./examples/web-entry/vue/iconfont.js?entry=true 1:10-43
```

Solution:

```js
// File name: /build/webpack.examples.web.config.js
function getEntryFileContent (entryPath, vueFilePath) {
  let relativePath = path.relative(path.join(entryPath, '../'), vueFilePath);

  relativePath = relativePath.replace(/\\/g, '/');
  // Default char is `\` on windows, so we get code like:
  //  var App = require('..\..\vue\hello.vue');
  // To fix it, just replace all `\` to `/`;

  return 'var App = require(\'' + relativePath + '\')\n'
    + 'App.el = \'#root\'\n'
    + 'new Vue(App)\n'
}
```

# weex-picker

Error Message:

```
(node:9212) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: 'default' is not exported by node_modules\weex-picker\js\build\main.js (imported by html5\render\browser\extend\packer.js). For
help fixing this error see https://github.com/rollup/rollup/wiki/Troubleshooting#name-is-not-exported-by-module
(node:9212) DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

Solution:

Find weex-picker in `node_modules`, edit package.json field `main` from  `./js/build/main.js` to `./js/src/index.js`.
