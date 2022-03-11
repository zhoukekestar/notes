---
layout: post
title: "VSCode Web"
date: 2022-03-03
tags: [note]
---

本文为 VSCode Web 版本的简易搭建教程。

## Prerequisites

see [https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites](https://github.com/microsoft/vscode/wiki/How-to-Contribute#prerequisites)

- Git
- Node 14.19
- Yarn
- Python

## Quick Start

- git clone --depth=1 https://github.com/microsoft/vscode.git
  - 请勿直接下载 Zip 包，会报 Error: Command failed: git config pull.rebase merges fatal: not in a git directory
- cd vscode
- yarn
- yarn gulp vscode-web-min
  - 参考：https://github.com/Felx-B/vscode-web/blob/main/build.js

## 预览

构建完成后，会有以下目录：

- out-build
- out-vscode-web
- out-vscode-web-min

在 out-vscode-web 目录下，参考 [官方 workbench](https://github.com/microsoft/vscode/blob/main/src/vs/code/browser/workbench/workbench.html), 新增 index.html，内容如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta id="vscode-workbench-web-configuration" data-settings="{}" />
    <link rel="stylesheet" href="./vs/workbench/workbench.web.main.css" />
  </head>

  <body></body>
  <script src="./vs/loader.js"></script>
  <script>
    self.webPackagePaths = {
      "@microsoft/applicationinsights-web":
        "https://unpkg.com/@microsoft/applicationinsights-web@2.7.4/dist/applicationinsights-web.min.js",
      "@vscode/iconv-lite-umd":
        "https://unpkg.com/@vscode/iconv-lite-umd@0.7.0/lib/iconv-lite-umd.js",
      "@vscode/vscode-languagedetection":
        "https://unpkg.com/@vscode/vscode-languagedetection@1.0.21/dist/lib/index.js",
      jschardet: "https://unpkg.com/jschardet@3.0.0/dist/jschardet.min.js",
      "tas-client-umd":
        "https://unpkg.com/tas-client-umd@0.1.5/lib/tas-client-umd.js",
      "vscode-oniguruma":
        "https://unpkg.com/vscode-oniguruma@1.6.2/release/main.js",
      "vscode-textmate":
        "https://unpkg.com/vscode-textmate@6.0.0/release/main.js",
      xterm: "https://unpkg.com/xterm@4.18.0/lib/xterm.js",
      "xterm-addon-search":
        "https://unpkg.com/xterm-addon-search@0.8.2/lib/xterm-addon-search.js",
      "xterm-addon-unicode11":
        "https://unpkg.com/xterm-addon-unicode11@0.3.0/lib/xterm-addon-unicode11.js",
      "xterm-addon-webgl":
        "https://unpkg.com/xterm-addon-webgl@0.11.4/lib/xterm-addon-webgl.js",
    };
    require.config({
      baseUrl: location.href,
      recordStats: true,
      trustedTypesPolicy: window.trustedTypes?.createPolicy("amdLoader", {
        createScriptURL(value) {
          return value;
        },
      }),
      paths: self.webPackagePaths,
    });
  </script>
  <script src="./vs/workbench/workbench.web.main.nls.js"></script>
  <script src="./vs/workbench/workbench.web.main.js"></script>
  <script src="./vs/code/browser/workbench/workbench.js"></script>
</html>
```

在 vscode 项目根路径下，运行 `npx http-server -c 0 --cors` 进行文件静态代理。
并打开 `http://127.0.0.1:8080/out-vscode-web/` 即可。

效果如下：

![](https://img.alicdn.com/imgextra/i2/O1CN01tafiGA22XagsEKxIG_!!6000000007130-2-tps-1040-563.png)


## 插件 Hello World

修改 index.html 如下：

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta id="vscode-workbench-web-configuration" data-settings="{}" />
		<meta
			id="vscode-workbench-builtin-extensions"
			data-settings='[{"extensionPath":"../../","packageJSON":{"enabledApiProposals":["resolvers","fileSearchProvider","textSearchProvider"],"activationEvents":["*"],"browser":"out-vscode-web/test.js"}}]'
		/>
		<link rel="stylesheet" href="./vs/workbench/workbench.web.main.css" />
	</head>

	<body></body>
	<script src="./vs/loader.js"></script>
	<script>
		self.webPackagePaths = {
			"@microsoft/applicationinsights-web":
				"https://unpkg.com/@microsoft/applicationinsights-web@2.7.4/dist/applicationinsights-web.min.js",
			"@vscode/iconv-lite-umd":
				"https://unpkg.com/@vscode/iconv-lite-umd@0.7.0/lib/iconv-lite-umd.js",
			"@vscode/vscode-languagedetection":
				"https://unpkg.com/@vscode/vscode-languagedetection@1.0.21/dist/lib/index.js",
			jschardet: "https://unpkg.com/jschardet@3.0.0/dist/jschardet.min.js",
			"tas-client-umd":
				"https://unpkg.com/tas-client-umd@0.1.5/lib/tas-client-umd.js",
			"vscode-oniguruma":
				"https://unpkg.com/vscode-oniguruma@1.6.2/release/main.js",
			"vscode-textmate":
				"https://unpkg.com/vscode-textmate@6.0.0/release/main.js",
			xterm: "https://unpkg.com/xterm@4.18.0/lib/xterm.js",
			"xterm-addon-search":
				"https://unpkg.com/xterm-addon-search@0.8.2/lib/xterm-addon-search.js",
			"xterm-addon-unicode11":
				"https://unpkg.com/xterm-addon-unicode11@0.3.0/lib/xterm-addon-unicode11.js",
			"xterm-addon-webgl":
				"https://unpkg.com/xterm-addon-webgl@0.11.4/lib/xterm-addon-webgl.js",
		};
		require.config({
			baseUrl: location.href,
			recordStats: true,
			trustedTypesPolicy: window.trustedTypes?.createPolicy("amdLoader", {
				createScriptURL(value) {
					return value;
				},
			}),
			paths: self.webPackagePaths,
		});
	</script>
	<script src="./vs/workbench/workbench.web.main.nls.js"></script>
	<script src="./vs/workbench/workbench.web.main.js"></script>
	<script src="./vs/code/browser/workbench/workbench.js"></script>
</html>
```

然后我们写一个最简单的插件，代码如下：

```js
!(() => {
	console.log('hi, test.js');
	const vscode = require('vscode');
	debugger;
	console.log(vscode);
	vscode.window.showErrorMessage('hi');
})();
```

效果如下：

![](https://img.alicdn.com/imgextra/i3/O1CN01CSFOC81JCNdj9mu3t_!!6000000000992-2-tps-1431-916.png)


## 加载机制

* `*.nls.js` https://www.npmjs.com/package/vscode-nls, 用于语言的本地化，阅读时可直接忽略。

* `out-vscode-web/vs/code/browser/workbench/workbench.js` 用于浏览器端的账号、 UI 控制
  * workspaceProvider
  * settingSyncOptions
  * credentialsProvider
* `out-vscode-web/vs/workbench/workbench.web.main.js`
  * `out-vscode-web/vs/workbench/services/extensions/worker/webWorkerExtensionHostIframe.html`
    * 桥接页面
    * var worker = new Worker(`out-vscode-web/vs/base/worker/workerMain.js`);
      * 名称为：'DebugWorkerExtensionHost' 或 'WorkerExtensionHost'
      * worker.onmessage
      * loadCode('vs/workbench/api/worker/extensionHostWorker')
        *
    * worker.postMessage('vs/workbench/api/worker/extensionHostWorker');


 // if (environmentService.isBuilt) {


## Context

当我们 `import vscode from 'vscode'` 时，导出的是：`vs/workbench/api/common/extHost.api.impl.ts`;

所以，需要测试 `vscode` 接口的时候，可以直接导出

```js
self.extHostCommands = extHostCommands;
self.extHostConsumerFileSystem = extHostConsumerFileSystem;
console.log('extHostCommands => ', extHostCommands);
console.log('extHostConsumerFileSystem => ', extHostConsumerFileSystem);
```

这样，我们可以直接测试一下命令
```js
self.extHostCommands.executeCommand('workbench.extensions.search')
```

或者使用 vscode 内置的 filesystem

```js
const textDecoder = new TextDecoder
const content = await self.extHostConsumerFileSystem.value.readFile({
  authority: "",
  fragment: "",
  path: "/20220311T144037/window.log",
  query: "",
  scheme: "vscode-log"
})
console.log(textDecoder.decode(content))
```


搜索 `this._fakeModules`，在文件 `vs/workbench/api/worker/extHostExtensionService.ts`
在其后面添加 `self.require = self._require`



## 插件体系

* 浏览器内置插件 `vs/workbench/services/extensionManagement/browser/builtinExtensionsScannerService.ts`
  * IWorkbenchEnvironmentService isBuiltIn
    * 搜索 `IWorkbenchEnvironmentService {` 可看到此接口实现为：
    * `vs/workbench/services/environment/browser/environmentService.ts`
    * `get isBuilt(): boolean { return !!this.productService.commit; }`
    * `// Web environment or unknown`
      * 在构建产物中添加 `product.commit = 0;`,


## References

- [vscode](https://github.com/microsoft/vscode)
- [vscode-web-playground](https://github.com/microsoft/vscode-web-playground)
- [vscode-web](https://github.com/Felx-B/vscode-web)
